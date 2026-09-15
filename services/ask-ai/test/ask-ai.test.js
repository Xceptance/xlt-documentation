import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { handleAskAi, isOriginAllowed } from '../index.js';

/**
 * Creates a mock HTTP response object capturing headers, status code, and written body.
 */
function createMockRes() {
  const headers = {};
  let statusCode = 200;
  let body = '';
  let ended = false;

  const res = {
    headers,
    headersSent: false,
    setHeader(name, val) {
      headers[name.toLowerCase()] = val;
    },
    getHeader(name) {
      return headers[name.toLowerCase()];
    },
    status(code) {
      statusCode = code;
      return this;
    },
    write(chunk) {
      res.headersSent = true;
      body += chunk;
      return true;
    },
    end(chunk) {
      res.headersSent = true;
      if (chunk) body += chunk;
      ended = true;
      return this;
    },
    json(data) {
      res.headersSent = true;
      headers['content-type'] = 'application/json';
      body = JSON.stringify(data);
      ended = true;
      return this;
    },
    getBody() {
      return body;
    },
    getStatusCode() {
      return statusCode;
    },
    isEnded() {
      return ended;
    },
  };

  return res;
}

/**
 * Creates a mock Gemini AI client for offline testing.
 */
function createMockAiClient({ chunks = ['Hello', ' from', ' XLT!'], shouldFail = false, onCall } = {}) {
  return {
    models: {
      async generateContentStream(params) {
        if (onCall) onCall(params);
        if (shouldFail) {
          throw new Error('Vertex AI quota exceeded');
        }
        return (async function* () {
          for (const text of chunks) {
            yield { text };
          }
        })();
      },
    },
  };
}

describe('Ask AI Service - isOriginAllowed', () => {
  test('returns false when origin or allowed string is missing', () => {
    assert.equal(isOriginAllowed('', 'http://localhost:4321'), false);
    assert.equal(isOriginAllowed('http://localhost:4321', ''), false);
    assert.equal(isOriginAllowed(null, 'http://localhost:4321'), false);
  });

  test('allows exact match against single origin', () => {
    assert.equal(isOriginAllowed('http://localhost:4321', 'http://localhost:4321'), true);
    assert.equal(isOriginAllowed('https://evil.com', 'http://localhost:4321'), false);
  });

  test('allows match in comma-separated origin list with whitespace trimming', () => {
    const list = 'http://localhost:4321, https://docs.xceptance.com , http://localhost:3000';
    assert.equal(isOriginAllowed('https://docs.xceptance.com', list), true);
    assert.equal(isOriginAllowed('http://localhost:3000', list), true);
    assert.equal(isOriginAllowed('https://other.com', list), false);
  });

  test('allows any origin when wildcard * is configured', () => {
    assert.equal(isOriginAllowed('https://anywhere.com', '*'), true);
    assert.equal(isOriginAllowed('http://localhost:9999', '*'), true);
  });
});

describe('Ask AI Service - Happy Path', () => {
  beforeEach(() => {
    process.env.ALLOWED_ORIGIN = 'http://localhost:4321,https://docs.xceptance.com';
    process.env.GCP_PROJECT_ID = 'test-project';
    process.env.GEMINI_MODEL = 'gemini-2.5-flash';
  });

  test('single question answers with plain text chunk stream', async () => {
    let capturedParams = null;
    const aiClient = createMockAiClient({
      chunks: ['Configuring', ' load profiles', ' in XLT...'],
      onCall: (params) => { capturedParams = params; },
    });

    const req = {
      method: 'POST',
      headers: { origin: 'http://localhost:4321' },
      body: {
        messages: [{ role: 'user', content: 'How do I configure load profiles in XLT?' }],
      },
    };
    const res = createMockRes();

    await handleAskAi(req, res, { aiClient });

    assert.equal(res.getStatusCode(), 200);
    assert.equal(res.getHeader('content-type'), 'text/plain; charset=utf-8');
    assert.equal(res.getHeader('access-control-allow-origin'), 'http://localhost:4321');
    assert.equal(res.getBody(), 'Configuring load profiles in XLT...');
    assert.equal(res.isEnded(), true);

    // Verify model input parameters
    assert.equal(capturedParams.model, 'gemini-2.5-flash');
    assert.equal(capturedParams.contents.length, 1);
    assert.equal(capturedParams.contents[0].role, 'user');
    assert.equal(capturedParams.contents[0].parts[0].text, 'How do I configure load profiles in XLT?');
  });

  test('multi-turn history transforms assistant to model role', async () => {
    let capturedParams = null;
    const aiClient = createMockAiClient({
      chunks: ['Yes, exactly.'],
      onCall: (params) => { capturedParams = params; },
    });

    const req = {
      method: 'POST',
      headers: { origin: 'https://docs.xceptance.com' },
      body: {
        messages: [
          { role: 'user', content: 'What is XLT?' },
          { role: 'assistant', content: 'XLT is a load testing framework.' },
          { role: 'user', content: 'Can it run headless?' },
        ],
      },
    };
    const res = createMockRes();

    await handleAskAi(req, res, { aiClient });

    assert.equal(res.getStatusCode(), 200);
    assert.equal(capturedParams.contents.length, 3);
    assert.equal(capturedParams.contents[0].role, 'user');
    assert.equal(capturedParams.contents[1].role, 'model');
    assert.equal(capturedParams.contents[2].role, 'user');
  });

  test('page context is appended to the latest user message', async () => {
    let capturedParams = null;
    const aiClient = createMockAiClient({
      chunks: ['Answer with context'],
      onCall: (params) => { capturedParams = params; },
    });

    const req = {
      method: 'POST',
      headers: { origin: 'http://localhost:4321' },
      body: {
        messages: [{ role: 'user', content: 'How do I configure DNS?' }],
        page: { path: '/xlt/manual/load-configuration' },
      },
    };
    const res = createMockRes();

    await handleAskAi(req, res, { aiClient });

    assert.equal(res.getStatusCode(), 200);
    const lastContent = capturedParams.contents[0].parts[0].text;
    assert.match(lastContent, /How do I configure DNS\?/);
    assert.match(lastContent, /\[Context: The reader is currently viewing documentation at "\/xlt\/manual\/load-configuration"/);
  });

  test('processes request cleanly when page context is omitted or null', async () => {
    let capturedParams = null;
    const aiClient = createMockAiClient({
      chunks: ['All good'],
      onCall: (params) => { capturedParams = params; },
    });

    const req = {
      method: 'POST',
      headers: { origin: 'http://localhost:4321' },
      body: {
        messages: [{ role: 'user', content: 'General question' }],
        page: null,
      },
    };
    const res = createMockRes();

    await handleAskAi(req, res, { aiClient });

    assert.equal(res.getStatusCode(), 200);
    assert.equal(capturedParams.contents[0].parts[0].text, 'General question');
    assert.equal(res.getBody(), 'All good');
  });
});

describe('Ask AI Service - Error Cases', () => {
  beforeEach(() => {
    process.env.ALLOWED_ORIGIN = 'http://localhost:4321';
    process.env.GCP_PROJECT_ID = 'test-project';
  });

  test('rejects GET requests with HTTP 405 Method Not Allowed', async () => {
    const req = { method: 'GET', headers: {} };
    const res = createMockRes();

    await handleAskAi(req, res);

    assert.equal(res.getStatusCode(), 405);
    assert.equal(res.getHeader('allow'), 'POST, OPTIONS');
    const json = JSON.parse(res.getBody());
    assert.match(json.error, /Method not allowed/i);
  });

  test('rejects PUT and DELETE requests with HTTP 405', async () => {
    for (const method of ['PUT', 'DELETE']) {
      const req = { method, headers: {} };
      const res = createMockRes();
      await handleAskAi(req, res);
      assert.equal(res.getStatusCode(), 405);
    }
  });

  test('rejects missing body with HTTP 400 Bad Request', async () => {
    const req = { method: 'POST', headers: {}, body: null };
    const res = createMockRes();

    await handleAskAi(req, res);

    assert.equal(res.getStatusCode(), 400);
    const json = JSON.parse(res.getBody());
    assert.match(json.error, /Invalid request/i);
  });

  test('rejects empty messages array with HTTP 400 Bad Request', async () => {
    const req = { method: 'POST', headers: {}, body: { messages: [] } };
    const res = createMockRes();

    await handleAskAi(req, res);

    assert.equal(res.getStatusCode(), 400);
    const json = JSON.parse(res.getBody());
    assert.match(json.error, /messages.*non-empty/i);
  });

  test('rejects message with empty content or invalid role with HTTP 400', async () => {
    const invalidPayloads = [
      { messages: [{ role: 'user', content: '   ' }] },
      { messages: [{ role: 'system', content: 'hello' }] },
      { messages: [{ role: 'invalid', content: 'hello' }] },
      { messages: [null] },
    ];

    for (const body of invalidPayloads) {
      const req = { method: 'POST', headers: {}, body };
      const res = createMockRes();
      await handleAskAi(req, res);
      assert.equal(res.getStatusCode(), 400);
    }
  });

  test('handles upstream Gemini error without crashing and returns error message stream', async () => {
    const aiClient = createMockAiClient({ shouldFail: true });
    const req = {
      method: 'POST',
      headers: { origin: 'http://localhost:4321' },
      body: { messages: [{ role: 'user', content: 'trigger failure' }] },
    };
    const res = createMockRes();

    await handleAskAi(req, res, { aiClient });

    assert.equal(res.getStatusCode(), 502);
    assert.match(res.getBody(), /Error: Unable to generate response/);
    assert.match(res.getBody(), /Vertex AI quota exceeded/);
    assert.equal(res.isEnded(), true);
  });
});

describe('Ask AI Service - Special Cases & CORS', () => {
  beforeEach(() => {
    process.env.ALLOWED_ORIGIN = 'http://localhost:4321,https://docs.xceptance.com';
  });

  test('handles CORS preflight OPTIONS from allowed origin with HTTP 204', async () => {
    const req = {
      method: 'OPTIONS',
      headers: { origin: 'https://docs.xceptance.com' },
    };
    const res = createMockRes();

    await handleAskAi(req, res);

    assert.equal(res.getStatusCode(), 204);
    assert.equal(res.getHeader('access-control-allow-origin'), 'https://docs.xceptance.com');
    assert.equal(res.getHeader('access-control-allow-methods'), 'POST, OPTIONS');
    assert.equal(res.isEnded(), true);
  });

  test('rejects CORS preflight OPTIONS from disallowed origin with HTTP 403', async () => {
    const req = {
      method: 'OPTIONS',
      headers: { origin: 'https://malicious-site.com' },
    };
    const res = createMockRes();

    await handleAskAi(req, res);

    assert.equal(res.getStatusCode(), 403);
    assert.equal(res.getHeader('access-control-allow-origin'), undefined);
    assert.equal(res.isEnded(), true);
  });
});

