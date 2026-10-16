## 1. Vertex AI Proxy Implementation

- [x] 1.1 Create `scripts/vertex-proxy.mjs` using pure Node.js built-ins (`node:http`, `node:child_process`, `fetch`) to expose OpenAI-compatible `/v1/chat/completions` and `/chat/completions` endpoints, translating requests and streaming SSE responses to and from Vertex AI. Verify syntax with `node -c scripts/vertex-proxy.mjs`.
- [x] 1.2 Implement multi-tier IAM token acquisition in `scripts/vertex-proxy.mjs` supporting GCP Compute Metadata Server, local `gcloud` CLI (Application Default Credentials), and `GOOGLE_APPLICATION_CREDENTIALS`, with in-memory 45-minute caching and clear login error messages. Verify by checking token acquisition logic.
- [x] 1.3 Implement global location routing in `scripts/vertex-proxy.mjs` targeting `https://aiplatform.googleapis.com/.../locations/global/...` when `GCP_LOCATION` is `global`, and regional host prefix when regional, with model alias resolution to `gemini-2.5-flash`. Verify with proxy self-test / health endpoint check.

## 2. Process Runners and Package Scripts

- [x] 2.1 Implement unified dev runner in `scripts/dev.mjs` that spawns `scripts/vertex-proxy.mjs` on port 4000 followed by `blume dev`, forwarding signals (SIGINT/SIGTERM) for clean process termination. Verify runner syntax with `node -c scripts/dev.mjs`.
- [x] 2.2 Implement production server runner in `scripts/prod.mjs` that launches `vertex-proxy.mjs` alongside the built Blume Node server for container/server deployments. Verify runner syntax with `node -c scripts/prod.mjs`.
- [x] 2.3 Update `package.json` to configure `"dev": "node scripts/dev.mjs"`, `"start": "node scripts/prod.mjs"`, `"dev:proxy": "node scripts/vertex-proxy.mjs"`, and `"dev:docs": "blume dev"`. Verify script definitions with `npm run`.

## 3. Blume Configuration and Environment Hygiene

- [x] 3.1 Update `blume.config.ts` to eliminate hardcoded `localhost` by dynamically reading `process.env.ASK_AI_ENDPOINT?.trim()`. If unset, log a clear warning (`⚠️ [Ask AI] ASK_AI_ENDPOINT is not configured. Ask AI is disabled.`) and set `enabled: false`; if present, configure `baseUrl: askAiEndpoint`, `apiKeyEnv: "ASK_AI_API_KEY"`, and `model`, preserving tuned retrieval parameters (`excerptChars: 4500`, `contextBudget: 32000`, `maxResults: 6`). Verify schema validation with `npm run validate`.
- [x] 3.2 Update `.env.example` to remove `KILO_API_KEY` and define `ASK_AI_ENDPOINT=http://localhost:4000/v1`, `ASK_AI_MODEL=gemini-2.5-flash`, `ASK_AI_API_KEY=local-dev`, `GCP_PROJECT=your-gcp-project-id`, and `GCP_LOCATION=global`. Verify `.env.example` contains no real secrets.
- [x] 3.3 Verify Git secret hygiene ensuring `.gitignore` rules prevent `.env` and `.env.*` from being tracked, and confirm that `git status` reports zero credentials or secret files staged.

## 4. End-to-End Verification and Documentation

- [x] 4.1 Update `README.md` to document the Google Cloud Vertex AI gateway architecture, local prerequisite (`gcloud auth application-default login`), local development instructions (`npm run dev`), production server usage (`npm start`), and the zero-secrets security policy.
- [x] 4.2 Execute `npm run build` and `npm run validate` to verify the documentation hub compiles cleanly and satisfies all Blume strict build checks.
- [x] 4.3 Verify proxy connectivity and health endpoint response on `http://localhost:4000/health` confirming proper project, location, and model configuration.
