## Context

Blume's Ask AI assistant utilizes `@ai-sdk/openai-compatible` to send standard OpenAI chat completion payloads (`POST /v1/chat/completions` or `/chat/completions`). Google Cloud Vertex AI uses its own streaming protocol (`POST .../publishers/google/models/{model}:streamGenerateContent?alt=sse`) and enforces IAM OAuth2 Bearer token authentication rather than static API keys.

In this repository, Ask AI previously used Kilo Gateway with `KILO_API_KEY`. To retire Kilo Gateway, use the organization's Google Cloud project directly, and guarantee zero keys in Git, this design adapts the lightweight proxy pattern proven in `logodata-documentation-with-blume`, extending it with global location support, production server readiness, and clean environment-driven endpoint configuration without hardcoded `localhost`.

See `proposal.md` for motivation and `specs/docs-site/spec.md` for requirements.

## Goals / Non-Goals

**Goals:**
- Provide a zero-dependency, pure Node.js proxy (`scripts/vertex-proxy.mjs`) translating OpenAI chat completions to Google Cloud Vertex AI streaming requests.
- Stream Vertex AI SSE chunks back to Blume as standard OpenAI-compatible chunks (`data: {"choices":[{"delta":{"content":"..."}}]}`).
- Eliminate hardcoded `localhost` from `blume.config.ts`; dynamically read `ASK_AI_ENDPOINT` from environment/.env.
- Gracefully degrade with a warning (`⚠️ [Ask AI] ASK_AI_ENDPOINT is not configured. Ask AI is disabled.`) and set `enabled: false` when `ASK_AI_ENDPOINT` is omitted.
- Support `GCP_LOCATION=global` utilizing Vertex AI's global dynamic capacity endpoint (`https://aiplatform.googleapis.com/...`), with seamless fallback to regional endpoints (`https://{location}-aiplatform.googleapis.com/...`).
- Provide multi-tier dynamic token acquisition supporting both local development (`gcloud` CLI / ADC) and production server deployment (GCP Compute Metadata Server, `GOOGLE_APPLICATION_CREDENTIALS`).
- Maintain an in-memory token cache with a 45-minute TTL to eliminate subprocess latency during active chat sessions.
- Provide single-command runners for local dev (`npm run dev` via `scripts/dev.mjs`) and production server (`npm start` via `scripts/prod.mjs`) with graceful signal handling.
- Maintain strict Git secret hygiene: `.env` remains gitignored, `.env.example` documents setup templates, and no static API keys or credentials ever touch Git.

**Non-Goals:**
- No custom frontend UI components or modifications to Blume's internal RAG retrieval pipeline.
- No heavy external proxy frameworks (e.g. Python, LiteLLM, Docker requirement for local dev).
- No hardcoded project IDs or credentials in code or version control.

## Decisions

### 1. Zero-Hardcoding Configuration & Graceful Degradation in `blume.config.ts`
- **Choice:** Do not hardcode `http://localhost:4000/v1` in `blume.config.ts`.
  - Read `const askAiEndpoint = process.env.ASK_AI_ENDPOINT?.trim()`.
  - If unset: log `console.warn("⚠️  [Ask AI] ASK_AI_ENDPOINT is not configured. Ask AI assistant is disabled.")` and set `ai.ask.enabled: false`.
  - If set: set `ai.ask.enabled: true`, `ai.ask.baseUrl: askAiEndpoint`, `ai.ask.apiKeyEnv: "ASK_AI_API_KEY"`.
- **Rationale:** Prevents environment assumptions in tracked code. Allows local dev (`.env` setting `http://localhost:4000/v1`), production servers (injecting container or internal proxy URL), and CI builds (clean build without warnings/errors when no endpoint is configured).
- **Alternatives considered:**
  - *Defaulting to `localhost:4000` in config:* Rejected because it leaks local workstation assumptions into production/CI builds.

### 2. Pure Node.js Built-in Proxy (`node:http`, `node:child_process`, `fetch`)
- **Choice:** Build `scripts/vertex-proxy.mjs` using only Node.js standard libraries.
- **Rationale:** Instant startup (<50ms), zero external dependencies, 100% compatible with the Node.js 22+ environment already running Blume.
- **Alternatives considered:**
  - *LiteLLM / Python proxy:* Rejected because it introduces Python, `pip`, and virtual environment management to a JavaScript/TypeScript docs repo.
  - *Direct connection without proxy:* Impossible because Blume's `@ai-sdk/openai-compatible` cannot natively authenticate with Vertex AI IAM Bearer tokens or parse Vertex SSE chunks.

### 3. Multi-Tier Dynamic IAM Token Acquisition
- **Choice:** In `scripts/vertex-proxy.mjs`, resolve Google Cloud access tokens via a tiered waterfall:
  1. **GCP Compute Metadata Server**: If running in Google Cloud (Cloud Run, GCE, GKE), query `http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token` with header `Metadata-Flavor: Google`.
  2. **Local `gcloud` CLI**: If running on a developer workstation, query `gcloud auth application-default print-access-token` (falling back to `gcloud auth print-access-token`).
  3. **Service Account Key File**: If `GOOGLE_APPLICATION_CREDENTIALS` is set, read the file or defer to standard credential loading.
- **Rationale:** Enables developers to run locally with `gcloud auth application-default login` without managing any key files, while allowing seamless deployment to production containers or VMs.
- **Alternatives considered:**
  - *Static Google API Key:* Rejected because Vertex AI enterprise features require IAM OAuth2 tokens, and static keys risk accidental commit to Git.

### 4. Global Location Endpoint Routing (`locations/global`)
- **Choice:** Support `GCP_LOCATION=global` as the default location.
  - When `GCP_LOCATION === "global"`: endpoint host is `aiplatform.googleapis.com` (no region prefix):
    `https://aiplatform.googleapis.com/v1/projects/${GCP_PROJECT}/locations/global/publishers/google/models/${targetModel}:${method}`
  - When `GCP_LOCATION` is regional (e.g. `europe-west3`): endpoint host is `${GCP_LOCATION}-aiplatform.googleapis.com`:
    `https://${GCP_LOCATION}-aiplatform.googleapis.com/v1/projects/${GCP_PROJECT}/locations/${GCP_LOCATION}/publishers/google/models/${targetModel}:${method}`
- **Rationale:** The global endpoint dynamically routes queries across Google's global capacity, avoiding local quota exhaustion and `429` rate limits.
- **Alternatives considered:**
  - *Fixed regional endpoint:* Works, but restricts queries to a single datacenter region.

### 5. Coordinated Process Lifecycle Management (`dev.mjs` and `prod.mjs`)
- **Choice:**
  - `scripts/dev.mjs`: Spawns `vertex-proxy.mjs` (defaulting port to 4000) and `blume dev`.
  - `scripts/prod.mjs`: Spawns `vertex-proxy.mjs` and the built Blume server (`dist/server/entry.mjs` or `blume preview`).
  - Both runners trap `SIGINT` and `SIGTERM` to gracefully kill child processes.
- **Rationale:** Developers and server containers interact with a single command (`npm run dev` or `npm start`) without leaving orphaned port 4000 processes behind.

## Risks / Trade-offs

- **[Risk] Developer workstation missing `gcloud` authentication**  
  → *Mitigation:* Proxy tests token acquisition at startup and on error, printing clear remediation: `[Vertex Proxy] Please run 'gcloud auth application-default login'`.
- **[Risk] Missing `ASK_AI_ENDPOINT` in `.env`**  
  → *Mitigation:* `blume.config.ts` outputs a visible console warning: `⚠️ [Ask AI] ASK_AI_ENDPOINT is not configured in .env. Ask AI is disabled.` and builds cleanly without throwing schema errors.
- **[Risk] Port 4000 already in use**  
  → *Mitigation:* Support configurable port via `PROXY_PORT` or `ASK_AI_PORT`, defaulting to `4000`.
- **[Risk] Model name variance**  
  → *Mitigation:* Include alias normalization in the proxy mapping `gemini-3.8-flash`, `google/gemini-3.8-flash`, and `google/gemini-2.5-flash` to Vertex AI's canonical `gemini-2.5-flash`.
- **[Risk] Accidental secret commit**  
  → *Mitigation:* `.gitignore` continues strictly ignoring `.env` and `.env.*`; `.env.example` contains only template placeholders; verification tasks check git status before completion.
