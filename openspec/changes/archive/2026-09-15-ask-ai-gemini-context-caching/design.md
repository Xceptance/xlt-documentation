## Context

The documentation site is built with Blume on Astro and Vite, generating static HTML in `dist/`. During `blume build`, Blume automatically compiles the complete Markdown documentation of every page into a single structured file at `dist/llms-full.txt` (~279,000 words, ~360,000 tokens).

Blume's built-in Ask AI island in `components/islands/ask-ai.tsx` delegates queries to an external streaming endpoint via `ai.ask.endpoint`. See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**
- Maintain 100% static hosting for the documentation site on `https://docs.xceptance.com/` with zero server maintenance.
- Achieve sub-second time-to-first-token by caching the full documentation corpus in Google Vertex AI.
- Ensure strict Git hygiene: zero API keys, credentials, or personal/company GCP project IDs committed to the repository.
- Provide distinct environment profiles (`.env.development` and `.env.production`) to prevent test pollution of production resources.
- Fail fast with a clear error if `GCP_PROJECT_ID` is missing, preventing ambient CLI context from accidentally polluting or overwriting production.
- Provide a robust automated test suite covering happy paths, error cases, and special/edge cases with zero external GCP dependency.
- Document the latest model (`gemini-2.5-flash` or newest caching-supported model) in code comments and `README.md`.

**Non-Goals:**
- Committing real GCP project IDs, service account keys, or environment files into version control.
- Guessing or falling back to ambient `gcloud` CLI project defaults, which could inadvertently target the wrong environment.
- Implementing user login, session persistence, or personalized account data injection in the documentation chat.
- Building a standalone vector database (Pinecone, Milvus, pgvector) since Context Caching holds the entire corpus directly.

## Decisions

### Decision 1: Scale-to-Zero Cloud Function vs. Dedicated VM
- **Choice:** Google Cloud Function (2nd Gen / Cloud Run) with `min-instances: 0`.
- **Rationale:** Documentation traffic is sporadic. A scale-to-zero serverless function costs $0 when idle and requires zero OS patching, daemon monitoring, or server management.
- **Alternatives Considered:** Running Ollama/vLLM on a dedicated Linux VM was rejected due to hardware cost (needs 16GB+ RAM / GPU), fixed monthly bills, and server operational burden.

### Decision 2: Google Vertex AI Context Caching vs. Traditional RAG
- **Choice:** Vertex AI Context Caching over `dist/llms-full.txt`.
- **Rationale:** At ~360,000 tokens, the corpus comfortably exceeds Google's 32,768 token threshold and fits well inside Gemini's 1M context window. Context caching pre-computes neural activations on Google TPUs, cutting query costs by 75–85% and giving the model full-corpus visibility without search chunking misses.
- **Alternatives Considered:** In-memory Orama or vector chunking was rejected because it splits related topics across chapters and cannot answer holistic comparison questions.

### Decision 3: Model Configuration via Synchronized Variable
- **Choice:** Set `GEMINI_MODEL="${GEMINI_MODEL:-gemini-2.5-flash}"` in both `refresh-cache.mjs` and `index.js`, accompanied by clear code comments and documentation.
- **Rationale:** Context Caching requires that the cache generation model and query model match exactly (KV cache weights cannot be transferred across model architectures). Centralizing this into a variable ensures that upgrading to a newer model updates both the cache creator and query handler simultaneously.
- **Alternatives Considered:** Hardcoding model strings was rejected as it causes cache invalidation errors when models are upgraded.

### Decision 4: Environment Profiles & Strict Git Hygiene
- **Choice:**
  - Update `.gitignore` to ignore `.env*` while permitting only `.env.example`.
  - Commit only `services/ask-ai/.env.example` with sanitized placeholders (e.g. `GCP_PROJECT_ID="your-gcp-project-id"`).
  - Actual development values (such as `antigravity-rbaumgarten`) and production project IDs are kept strictly in uncommitted local `.env.development` or `.env.production` files.
  - Require explicit `GCP_PROJECT_ID`: if `GCP_PROJECT_ID` is missing from the environment or loaded profile, `deploy.sh` and `refresh-cache.mjs` immediately exit with a non-zero status code and print: `Error: GCP_PROJECT_ID is required but not set. Specify it in your environment or local .env file.`
  - `blume.config.ts` reads `process.env.ASK_AI_ENDPOINT` without any hardcoded project-specific URL fallback.
- **Rationale:** Guarantees zero credential or personal project ID leakage into Git histories and prevents accidental corruption of production caches caused by ambient local `gcloud` CLI contexts.

### Decision 5: Plain UTF-8 Chunked Streaming
- **Choice:** Stream raw text chunks with `Content-Type: text/plain; charset=utf-8` using `res.write()`.
- **Rationale:** Blume's client-side hook (`useAskAI`) uses `TextDecoder` to read plain stream chunks directly. It does not expect Server-Sent Events (`data: JSON`) envelopes.
- **Alternatives Considered:** SSE was rejected as it would require custom client-side parsing not supported by Blume's native island.

## Testing Strategy & Test Matrix

The service includes an automated test suite (`services/ask-ai/test/ask-ai.test.js`) executed via Node's native test runner (`node --test`). Tests run with a mocked Gemini client, allowing 100% offline execution in CI without GCP credentials or billing costs.

| Category | Test Case | Expected Behavior |
| :--- | :--- | :--- |
| **Happy Path** | Standard single question | Returns HTTP 200, `Content-Type: text/plain; charset=utf-8`, streams chunks. |
| **Happy Path** | Multi-turn conversation | Transforms previous user + assistant turns into Gemini model format correctly. |
| **Happy Path** | Page context injection | Appends `[Context: The user is currently reading <path>]` to prompt when `page.path` is present. |
| **Happy Path** | Missing page context | Gracefully processes question without failing when `page` is omitted or null. |
| **Error Cases** | Non-POST HTTP methods (`GET`, `PUT`, `DELETE`) | Returns HTTP 405 Method Not Allowed with `Allow: POST, OPTIONS` header. |
| **Error Cases** | Missing body or malformed payload | Returns HTTP 400 Bad Request with descriptive JSON error. |
| **Error Cases** | Empty `messages` array | Returns HTTP 400 Bad Request. |
| **Error Cases** | Invalid message structure (missing role or content) | Returns HTTP 400 Bad Request. |
| **Error Cases** | Upstream Gemini API failure | Catches exception, logs error, and returns friendly error message stream without process crash. |
| **Special Cases** | CORS preflight (`OPTIONS`) from allowed origin | Returns HTTP 204 with `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`. |
| **Special Cases** | CORS preflight (`OPTIONS`) from disallowed origin | Returns HTTP 204 or 403 without `Access-Control-Allow-Origin` header for that origin. |
| **Special Cases** | Multi-origin comma-separated parsing | Correctly matches any origin listed in `ALLOWED_ORIGIN` (e.g. `localhost:4321,localhost:3000`). |

In addition to unit testing, local integration testing is enabled via `@google-cloud/functions-framework` (`npm run dev`), letting developers run `curl` against a local HTTP port (8080) with real GCP Application Default Credentials.

## Risks / Trade-offs

- **[Cache Expiration]** → Gemini context caches have an initial TTL (up to 30 days). The refresh script sets a 30-day TTL, and the deployment / CI workflow re-runs cache creation whenever documentation changes are published.
- **[Model KV Cache Incompatibility]** → If a new model version is released, an old cache cannot be queried with it. Both scripts read `GEMINI_MODEL`, ensuring the cache is generated with the exact model used for querying.
- **[Public Endpoint Abuse]** → Cloud Functions have public URLs. Mitigation: CORS headers strictly restrict browser access to `https://docs.xceptance.com` (and `localhost:4321` in dev), and request body schemas are validated before calling Gemini.

## Migration and Deployment Plan

1. **Development Phase:**
   - Configure local uncommitted `.env.development` with your development project ID.
   - Deploy function using `./deploy.sh dev`.
   - Run cache refresh script against local `dist/llms-full.txt`.
   - Run automated test suite (`npm test`).
   - Test locally with `npm run dev` in docs pointing `ASK_AI_ENDPOINT` to the dev function.
2. **Production Transition:**
   - Product Owner provisions dedicated company GCP project.
   - Configure local uncommitted `.env.production` with production project ID and `ALLOWED_ORIGIN="https://docs.xceptance.com"`.
   - Run `./deploy.sh prod`.
   - Configure production CI/CD pipeline to deploy static docs and refresh cache on release.
