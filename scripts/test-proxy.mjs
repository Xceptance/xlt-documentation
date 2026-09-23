import assert from "node:assert";
import http from "node:http";
import {
  resolveVertexModel,
  getVertexEndpoint,
  convertOpenAIToVertex,
  createServer,
  CONFIG,
} from "../scripts/vertex-proxy.mjs";

console.log("▶ Testing model alias resolution...");
assert.strictEqual(resolveVertexModel("gemini-3.8-flash"), "gemini-2.5-flash");
assert.strictEqual(resolveVertexModel("google/gemini-3.8-flash"), "gemini-2.5-flash");
assert.strictEqual(resolveVertexModel("google/gemini-2.5-flash"), "gemini-2.5-flash");
assert.strictEqual(resolveVertexModel("gemini-2.5-pro"), "gemini-2.5-pro");
console.log("✓ Model alias resolution verified.");

console.log("▶ Testing global vs regional endpoint generation...");
const globalUrl = getVertexEndpoint("gemini-2.5-flash", "streamGenerateContent?alt=sse");
assert(
  globalUrl.startsWith("https://aiplatform.googleapis.com/v1/projects/"),
  `Unexpected global URL prefix: ${globalUrl}`
);
assert(
  globalUrl.includes("/locations/global/publishers/google/models/gemini-2.5-flash:streamGenerateContent?alt=sse"),
  `Unexpected global URL path: ${globalUrl}`
);
console.log("✓ Global endpoint URL generation verified:", globalUrl);

console.log("▶ Testing OpenAI to Vertex payload conversion...");
const converted = convertOpenAIToVertex({
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello" },
    { role: "assistant", content: "Hi there!" },
    { role: "user", content: "How do I use XLT?" },
  ],
  temperature: 0.7,
  max_tokens: 1024,
});

assert.strictEqual(converted.systemInstruction.parts[0].text, "You are a helpful assistant.");
assert.strictEqual(converted.contents.length, 3);
assert.strictEqual(converted.contents[0].role, "user");
assert.strictEqual(converted.contents[0].parts[0].text, "Hello");
assert.strictEqual(converted.contents[1].role, "model");
assert.strictEqual(converted.contents[1].parts[0].text, "Hi there!");
assert.strictEqual(converted.contents[2].role, "user");
assert.strictEqual(converted.contents[2].parts[0].text, "How do I use XLT?");
assert.strictEqual(converted.generationConfig.temperature, 0.7);
assert.strictEqual(converted.generationConfig.maxOutputTokens, 1024);
console.log("✓ OpenAI to Vertex payload conversion verified.");

console.log("▶ Testing consecutive role message merging...");
const merged = convertOpenAIToVertex({
  messages: [
    { role: "user", content: "Part 1" },
    { role: "user", content: "Part 2" },
  ],
});
assert.strictEqual(merged.contents.length, 1);
assert.strictEqual(merged.contents[0].parts[0].text, "Part 1\n\nPart 2");
console.log("✓ Consecutive message merging verified.");

console.log("▶ Testing HTTP server handler routes (/health, /v1/models)...");
const server = createServer();

// Simulate /health request
const healthReq = new http.IncomingMessage(null);
healthReq.method = "GET";
healthReq.url = "/health";
healthReq.headers = { host: "localhost:4000" };

let healthData = "";
const healthRes = new http.ServerResponse(healthReq);
healthRes.write = (chunk) => { healthData += chunk; return true; };
healthRes.end = (chunk) => {
  if (chunk) healthData += chunk;
  const json = JSON.parse(healthData);
  assert.strictEqual(json.status, "ok");
  assert.strictEqual(json.service, "vertex-openai-proxy");
  assert.strictEqual(json.location, "global");
  console.log("✓ /health endpoint response verified:", json);
};

server.emit("request", healthReq, healthRes);

// Simulate /v1/models request
const modelsReq = new http.IncomingMessage(null);
modelsReq.method = "GET";
modelsReq.url = "/v1/models";
modelsReq.headers = { host: "localhost:4000" };

let modelsData = "";
const modelsRes = new http.ServerResponse(modelsReq);
modelsRes.write = (chunk) => { modelsData += chunk; return true; };
modelsRes.end = (chunk) => {
  if (chunk) modelsData += chunk;
  const json = JSON.parse(modelsData);
  assert.strictEqual(json.object, "list");
  assert(json.data.some(m => m.id === "gemini-2.5-flash"));
  console.log("✓ /v1/models endpoint response verified:", json.data.map(m => m.id));
};

server.emit("request", modelsReq, modelsRes);

console.log("\n🎉 ALL PROXY LOGIC TESTS PASSED SUCCESSFULLY!\n");

