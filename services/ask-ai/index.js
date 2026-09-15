/**
 * Xceptance Documentation Ask AI - Serverless Gemini Context Caching Proxy
 *
 * This Cloud Function Gen 2 acts as a streaming proxy between the Blume docs client
 * and Google Vertex AI's Gemini model with Context Caching.
 *
 * Features:
 * - CORS preflight and origin verification (supporting dev and production origins)
 * - Strict schema validation on incoming messages
 * - Context injection from reader's current page path
 * - Raw UTF-8 chunked streaming directly to the browser
 * - Graceful error handling and disconnection tolerance
 */

import * as functions from '@google-cloud/functions-framework';
import { GoogleGenAI } from '@google/genai';

/**
 * Checks if an origin is permitted by the configured ALLOWED_ORIGIN variable.
 * Supports comma-separated origin lists or wildcard '*'.
 *
 * @param {string} [origin]
 * @param {string} [allowedOriginsStr]
 * @returns {boolean}
 */
export function isOriginAllowed(origin, allowedOriginsStr) {
  if (!origin) return false;
  if (!allowedOriginsStr) return false;
  const origins = allowedOriginsStr.split(',').map((s) => s.trim()).filter(Boolean);
  return origins.includes('*') || origins.includes(origin);
}

/**
 * Handles incoming Ask AI HTTP requests.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {object} [deps] - Optional injected dependencies for testing
 */
export async function handleAskAi(req, res, deps = {}) {
  const allowedOrigins = process.env.ALLOWED_ORIGIN || 'http://localhost:4321';
  const requestOrigin = req.headers?.origin || req.headers?.Origin;

  const allowed = isOriginAllowed(requestOrigin, allowedOrigins);
  if (allowed) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
  }

  // Handle CORS preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    if (requestOrigin && !allowed) {
      return res.status(403).json({ error: 'Origin not allowed' });
    }
    return res.status(204).end();
  }

  // Reject unsupported HTTP methods
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // Validate request body
  const body = req.body;
  if (!body || typeof body !== 'object' || !Array.isArray(body.messages) || body.messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request: "messages" must be a non-empty array.' });
  }

  for (const msg of body.messages) {
    if (
      !msg ||
      typeof msg !== 'object' ||
      typeof msg.content !== 'string' ||
      !msg.content.trim() ||
      !['user', 'assistant'].includes(msg.role)
    ) {
      return res.status(400).json({
        error: 'Invalid message in "messages": role ("user" | "assistant") and non-empty "content" string are required.',
      });
    }
  }

  // Configure Gemini client and model
  const projectId = process.env.GCP_PROJECT_ID;
  const location = process.env.GCP_REGION || 'europe-west3';

  // Default to gemini-2.5-flash (or latest model with Vertex AI Context Caching support)
  const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const cacheName = process.env.GEMINI_CACHE_NAME || undefined;

  let ai = deps.aiClient;
  if (!ai) {
    if (!projectId) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.status(500).end('Server misconfiguration: GCP_PROJECT_ID is not configured.');
    }
    process.env.GOOGLE_CLOUD_PROJECT = projectId;
    process.env.GCLOUD_PROJECT = projectId;
    ai = new GoogleGenAI({ vertexai: true, project: projectId, location });
  }

  // Map messages to Gemini format (user -> 'user', assistant -> 'model')
  const contents = body.messages.map((m, index) => {
    let text = m.content;
    // If page context is present, inject it into the latest user query
    if (index === body.messages.length - 1 && m.role === 'user' && body.page?.path) {
      text += `\n\n[Context: The reader is currently viewing documentation at "${body.page.path}". Prioritize relevant details from this manual/guide if applicable.]`;
    }
    return {
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text }],
    };
  });

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Accel-Buffering', 'no');

  try {
    const stream = await ai.models.generateContentStream({
      model: modelName,
      contents,
      config: {
        ...(cacheName ? { cachedContent: cacheName } : {}),
        systemInstruction: {
          parts: [
            {
              text: `You are the AI documentation assistant for Xceptance tools (XLT, XTC, and Neodymium).
Answer user questions accurately, helpfully, and concisely based on the documentation.
Format commands, properties, and code samples with standard GitHub-flavored Markdown.
When referring to other manual sections, provide standard Markdown links.
If the requested information is not covered in the documentation, acknowledge that clearly rather than inventing details.`,
            },
          ],
        },
      },
    });

    for await (const chunk of stream) {
      if (chunk.text) {
        res.write(chunk.text);
      }
    }
    res.end();
  } catch (err) {
    console.error('Gemini streaming error:', err);
    if (!res.headersSent) {
      res.status(502);
    }
    res.write(`\n\n[Error: Unable to generate response from documentation service. ${err.message || 'Please try again later.'}]`);
    res.end();
  }
}

functions.http('askAi', (req, res) => handleAskAi(req, res));

