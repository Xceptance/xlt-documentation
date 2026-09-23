#!/usr/bin/env node

/**
 * Lightweight OpenAI-compatible proxy for Google Cloud Vertex AI.
 *
 * Exposes:
 *   POST /v1/chat/completions and POST /chat/completions
 *   GET /v1/models
 *   GET /health
 *
 * Features:
 *   - 100% Blume compatible: translates standard OpenAI chat completions to Vertex AI streamGenerateContent.
 *   - Translates Vertex AI SSE chunks to standard OpenAI SSE chunks (data: {"choices":[{"delta":{"content":"..."}}]}).
 *   - Multi-tier dynamic token acquisition: GCP Compute Metadata Server (Cloud Run/GCE), local gcloud ADC/user, or GCP_ACCESS_TOKEN.
 *   - In-memory OAuth2 token cache (45-minute TTL) avoiding subprocess overhead.
 *   - Supports GCP_LOCATION=global (aiplatform.googleapis.com) for global dynamic capacity, as well as regional endpoints.
 *   - Zero external runtime dependencies (pure Node.js http and fetch).
 *   - Zero secrets stored in Git: relies strictly on IAM credentials and untracked environment variables.
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const ENV_PATH = path.resolve(ROOT_DIR, ".env");

// Load .env if present
if (fs.existsSync(ENV_PATH)) {
  const envContent = fs.readFileSync(ENV_PATH, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

export function resolveGcpProject() {
  const envProj = (process.env.GCP_PROJECT || "").trim();
  if (envProj && envProj !== "your-gcp-project-id") {
    return envProj;
  }
  try {
    const detected = execSync("gcloud config get-value project", {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
    if (detected && detected !== "(unset)") {
      return detected;
    }
  } catch {}
  return "";
}

export const CONFIG = {
  project: resolveGcpProject(),
  location: (process.env.GCP_LOCATION || "global").trim(),
  defaultModel: (process.env.ASK_AI_MODEL || "gemini-2.5-flash").trim(),
  port: parseInt(process.env.PROXY_PORT || process.env.ASK_AI_PORT || "4000", 10),
};

// Model alias mapping: Normalize OpenAI / Blume requested models to Vertex AI canonical model names
const MODEL_ALIASES = {
  "gemini-3.8-flash": "gemini-2.5-flash",
  "google/gemini-3.8-flash": "gemini-2.5-flash",
  "google/gemini-2.5-flash": "gemini-2.5-flash",
  "google/gemini-2.5-pro": "gemini-2.5-pro",
  "google/gemini-1.5-flash": "gemini-1.5-flash",
  "google/gemini-1.5-pro": "gemini-1.5-pro",
};

export function resolveVertexModel(requestedModel) {
  if (!requestedModel) return CONFIG.defaultModel;
  const clean = requestedModel.trim();
  if (MODEL_ALIASES[clean]) {
    return MODEL_ALIASES[clean];
  }
  if (clean.startsWith("google/")) {
    const stripped = clean.slice("google/".length);
    if (MODEL_ALIASES[stripped]) return MODEL_ALIASES[stripped];
    return stripped;
  }
  return clean;
}

export function getVertexEndpoint(targetModel, method) {
  const isGlobal = !CONFIG.location || CONFIG.location === "global";
  const host = isGlobal ? "aiplatform.googleapis.com" : `${CONFIG.location}-aiplatform.googleapis.com`;
  const locationPath = isGlobal ? "global" : CONFIG.location;
  return `https://${host}/v1/projects/${CONFIG.project}/locations/${locationPath}/publishers/google/models/${targetModel}:${method}`;
}

let cachedToken = null;
let tokenExpiresAt = 0;

/**
 * Multi-tier token acquisition:
 * 1. Explicit GCP_ACCESS_TOKEN env variable (CI / testing)
 * 2. GCP Compute Metadata Server (Cloud Run, GKE, Compute Engine VM)
 * 3. Local gcloud CLI Application Default Credentials (ADC) or active user login
 */
export async function getAccessToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt) {
    return cachedToken;
  }

  // 1. Direct environment variable override (if injected by container/test runner)
  if (process.env.GCP_ACCESS_TOKEN?.trim()) {
    cachedToken = process.env.GCP_ACCESS_TOKEN.trim();
    tokenExpiresAt = now + 45 * 60 * 1000;
    return cachedToken;
  }

  // 2. Google Cloud Metadata Server (Cloud Run, GKE, Compute Engine VM)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000); // 1s quick probe
    const metaRes = await fetch(
      "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token",
      {
        headers: { "Metadata-Flavor": "Google" },
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);
    if (metaRes.ok) {
      const metaData = await metaRes.json();
      if (metaData.access_token) {
        cachedToken = metaData.access_token;
        const expiresInMs = (metaData.expires_in ? metaData.expires_in - 300 : 2700) * 1000;
        tokenExpiresAt = now + Math.max(expiresInMs, 60000);
        return cachedToken;
      }
    }
  } catch {
    // Not running inside GCP with metadata service; fall through to local CLI
  }

  // 3. Local gcloud CLI (Application Default Credentials, then active user login)
  let raw = "";
  try {
    raw = execSync("gcloud auth application-default print-access-token", {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    });
  } catch (adcErr) {
    try {
      raw = execSync("gcloud auth print-access-token", {
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
      });
    } catch (userErr) {
      console.error("\n[Vertex Proxy Error] Google Cloud authentication failed!");
      console.error("Neither GCP Metadata Server nor local gcloud credentials could obtain an access token.");
      console.error("For local development, please run in your terminal:");
      console.error("  gcloud auth application-default login\n");
      throw new Error("Google Cloud authentication failed. Please run 'gcloud auth application-default login'.");
    }
  }

  const match = raw.match(/ya29\.[a-zA-Z0-9_\-]+/);
  const token = match ? match[0] : raw.trim().split("\n")[0].trim();

  if (!token || (!token.startsWith("ya29.") && token.length < 20)) {
    throw new Error(`Invalid Google Cloud token format received: ${raw.slice(0, 100)}`);
  }

  cachedToken = token;
  tokenExpiresAt = now + 45 * 60 * 1000; // cache for 45 min
  return token;
}

export function convertOpenAIToVertex(openAiBody) {
  const messages = openAiBody.messages || [];
  let systemText = "";
  const contents = [];

  for (const msg of messages) {
    if (msg.role === "system") {
      systemText += (systemText ? "\n\n" : "") + msg.content;
      continue;
    }

    const vertexRole = msg.role === "assistant" ? "model" : "user";
    const textContent = typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content);

    // Merge consecutive messages with the same role to prevent Vertex AI 400 Bad Request
    if (contents.length > 0 && contents[contents.length - 1].role === vertexRole) {
      contents[contents.length - 1].parts[0].text += "\n\n" + textContent;
    } else {
      contents.push({
        role: vertexRole,
        parts: [{ text: textContent }],
      });
    }
  }

  // Vertex requires at least one user content message
  if (contents.length === 0) {
    contents.push({
      role: "user",
      parts: [{ text: "Hello" }],
    });
  }

  const vertexPayload = { contents };

  if (systemText) {
    vertexPayload.systemInstruction = {
      parts: [{ text: systemText }],
    };
  }

  if (openAiBody.temperature !== undefined) {
    vertexPayload.generationConfig = vertexPayload.generationConfig || {};
    vertexPayload.generationConfig.temperature = openAiBody.temperature;
  }
  if (openAiBody.max_tokens !== undefined) {
    vertexPayload.generationConfig = vertexPayload.generationConfig || {};
    vertexPayload.generationConfig.maxOutputTokens = openAiBody.max_tokens;
  }

  return vertexPayload;
}

export function createServer() {
  return http.createServer(async (req, res) => {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const pathname = parsedUrl.pathname;

    // Health check endpoint
    if (pathname === "/health" || pathname === "/") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: "ok",
          service: "vertex-openai-proxy",
          project: CONFIG.project,
          location: CONFIG.location,
          defaultModel: CONFIG.defaultModel,
        })
      );
      return;
    }

    // Models endpoint
    if (pathname === "/v1/models" || pathname === "/models") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          object: "list",
          data: [
            { id: "gemini-2.5-flash", object: "model", created: Date.now(), owned_by: "google" },
            { id: "gemini-2.5-pro", object: "model", created: Date.now(), owned_by: "google" },
            { id: "gemini-3.8-flash", object: "model", created: Date.now(), owned_by: "google" },
          ],
        })
      );
      return;
    }

    // Chat completions endpoint
    if (pathname === "/v1/chat/completions" || pathname === "/chat/completions") {
      if (req.method !== "POST") {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: { message: "Method not allowed. Use POST." } }));
        return;
      }

      let bodyText = "";
      req.on("data", (chunk) => {
        bodyText += chunk;
      });

      req.on("end", async () => {
        let openAiBody;
        try {
          openAiBody = JSON.parse(bodyText);
        } catch (err) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: { message: "Invalid JSON in request body" } }));
          return;
        }

        const requestedModel = openAiBody.model || CONFIG.defaultModel;
        const targetModel = resolveVertexModel(requestedModel);
        const isStreaming = openAiBody.stream !== false; // Default to streaming

        let token;
        try {
          token = await getAccessToken();
        } catch (authErr) {
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              error: {
                message: authErr.message,
                type: "auth_error",
              },
            })
          );
          return;
        }

        const vertexPayload = convertOpenAIToVertex(openAiBody);
        const method = isStreaming ? "streamGenerateContent?alt=sse" : "generateContent";
        const vertexUrl = getVertexEndpoint(targetModel, method);

        try {
          const vertexRes = await fetch(vertexUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Goog-User-Project": CONFIG.project,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(vertexPayload),
          });

          if (!vertexRes.ok) {
            const errBody = await vertexRes.text();
            console.error(`[Vertex Proxy] Vertex AI responded with ${vertexRes.status}:`, errBody);
            res.writeHead(vertexRes.status, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                error: {
                  message: `Vertex AI error (${vertexRes.status}): ${errBody}`,
                  type: "vertex_ai_error",
                },
              })
            );
            return;
          }

          const completionId = `chatcmpl-${crypto.randomUUID()}`;
          const createdTimestamp = Math.floor(Date.now() / 1000);

          if (!isStreaming) {
            const vertexJson = await vertexRes.json();
            const text = vertexJson.candidates?.[0]?.content?.parts?.[0]?.text || "";
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                id: completionId,
                object: "chat.completion",
                created: createdTimestamp,
                model: requestedModel,
                choices: [
                  {
                    index: 0,
                    message: { role: "assistant", content: text },
                    finish_reason: "stop",
                  },
                ],
              })
            );
            return;
          }

          // Streaming SSE response
          res.writeHead(200, {
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          });

          // Read the incoming SSE stream from Vertex AI
          const reader = vertexRes.body.getReader();
          const decoder = new TextDecoder("utf-8");
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data:")) continue;

              const jsonStr = trimmed.slice(5).trim();
              if (!jsonStr) continue;

              try {
                const chunkData = JSON.parse(jsonStr);
                const textChunk = chunkData.candidates?.[0]?.content?.parts?.[0]?.text;
                if (textChunk) {
                  const openAiChunk = {
                    id: completionId,
                    object: "chat.completion.chunk",
                    created: createdTimestamp,
                    model: requestedModel,
                    choices: [
                      {
                        index: 0,
                        delta: { content: textChunk },
                        finish_reason: null,
                      },
                    ],
                  };
                  res.write(`data: ${JSON.stringify(openAiChunk)}\n\n`);
                }
              } catch (parseErr) {
                // Ignore partial JSON chunks
              }
            }
          }

          // Send finish reason and [DONE]
          const stopChunk = {
            id: completionId,
            object: "chat.completion.chunk",
            created: createdTimestamp,
            model: requestedModel,
            choices: [
              {
                index: 0,
                delta: {},
                finish_reason: "stop",
              },
            ],
          };
          res.write(`data: ${JSON.stringify(stopChunk)}\n\n`);
          res.write("data: [DONE]\n\n");
          res.end();
        } catch (streamErr) {
          console.error("[Vertex Proxy] Error forwarding request to Vertex AI:", streamErr);
          if (!res.headersSent) {
            res.writeHead(500, { "Content-Type": "application/json" });
          }
          res.end(JSON.stringify({ error: { message: streamErr.message } }));
        }
      });
      return;
    }

    // 404 for unknown endpoints
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: { message: `Not found: ${pathname}` } }));
  });
}

// Self-test helper
async function runSelfTest() {
  console.log("------------------------------------------------------------");
  console.log("  Testing Vertex AI OpenAI-Compatible Proxy");
  console.log(`  Project:   ${CONFIG.project || "(unset)"}`);
  console.log(`  Location:  ${CONFIG.location}`);
  console.log(`  Model:     ${CONFIG.defaultModel}`);
  console.log("------------------------------------------------------------");

  if (!CONFIG.project) {
    console.error("✗ Self-test FAILED: GCP_PROJECT is not set in .env or environment.");
    process.exit(1);
  }

  try {
    const token = await getAccessToken();
    console.log(`✓ Token acquired successfully (length: ${token.length}, prefix: ${token.slice(0, 10)}...)`);

    const testPayload = convertOpenAIToVertex({
      messages: [{ role: "user", content: "Test ping" }],
    });

    const targetModel = resolveVertexModel(CONFIG.defaultModel);
    const url = getVertexEndpoint(targetModel, "generateContent");
    console.log(`▶ Pinging Vertex AI endpoint: ${url}`);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Goog-User-Project": CONFIG.project,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testPayload),
    });

    if (!res.ok) {
      throw new Error(`Vertex AI returned ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    console.log(`✓ Live Vertex AI communication succeeded! Response: "${reply}"`);
    console.log("✓ Self-test PASSED.");
    process.exit(0);
  } catch (err) {
    console.error(`✗ Self-test FAILED: ${err.message}`);
    process.exit(1);
  }
}

if (process.argv.includes("--test")) {
  runSelfTest();
} else if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const server = createServer();
  server.listen(CONFIG.port, () => {
    console.log("------------------------------------------------------------");
    console.log(`  XLT Documentation AI Gateway (Vertex AI)`);
    console.log(`  Listening on: http://localhost:${CONFIG.port}/v1`);
    console.log(`  Project:      ${CONFIG.project || "(set GCP_PROJECT in .env)"}`);
    console.log(`  Location:     ${CONFIG.location} (Global dynamic routing)`);
    console.log(`  Default Model:${CONFIG.defaultModel}`);
    console.log("------------------------------------------------------------");
  });

  const shutdown = () => {
    server.close(() => {
      process.exit(0);
    });
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

