## Why

Readers navigating Xceptance documentation (XLT, XTC, and Neodymium) need quick, conversational answers grounded directly in the documentation without manually searching or navigating through hundreds of pages. 

Blume supports an in-page "Ask AI" assistant, but running it in production without dedicated server infrastructure requires:
1. Keeping the documentation site 100% static (`deployment.output: "static"` on CDN/S3/Nginx).
2. Delegating the AI streaming backend to a scale-to-zero serverless endpoint (Google Cloud Function).
3. Utilizing Google Vertex AI's Gemini Context Caching over the pre-compiled `dist/llms-full.txt` (~360,000 tokens) to achieve sub-second time-to-first-token, eliminate RAG chunking misses, and keep operational costs negligible (<$1–$5/month).
4. Providing complete environment parameterization (`GCP_PROJECT_ID`, `GEMINI_MODEL`, `ALLOWED_ORIGIN`) with strict Git hygiene, ensuring no personal or company GCP project IDs or credentials are ever committed to Git, and requiring explicit project identifiers to prevent unintended deployments.

## What Changes

- **Ask AI Client Integration in Documentation Site**:
  - Configure `ai.ask` in `blume.config.ts` with clickable starter prompts:
    - *"How do I configure load profiles in XLT?"*
    - *"How do I evaluate test results?"*
    - *"How do I configure DNS settings in XLT?"*
  - Connect the client island to an external endpoint via `ASK_AI_ENDPOINT` environment variable without hardcoded project URLs.
- **Serverless Ask AI Service (`services/ask-ai/`)**:
  - Implement a Node.js 22 Cloud Function (`index.js`) that handles CORS preflight (`OPTIONS`) and streaming `POST /ask-ai` requests.
  - Implement a context cache refresh CLI script (`refresh-cache.mjs`) that reads `dist/llms-full.txt` and provisions a long-lived Gemini context cache in Google Vertex AI.
  - Implement an environment-aware deployment script (`deploy.sh`) supporting variable `GCP_PROJECT_ID` with fail-fast enforcement (exits with error if missing, never guessing from ambient gcloud state), `GCP_REGION`, `ALLOWED_ORIGIN`, and `GEMINI_MODEL`.
- **Dynamic Model Versioning**:
  - Configure `GEMINI_MODEL` with default `gemini-2.5-flash` (or newer model with Context Caching support), ensuring both the cache creator and the streaming function stay synchronized.
  - Document model selection, context caching mechanics, and upgrade procedures with code comments and a comprehensive `services/ask-ai/README.md`.
- **Git Hygiene and Environment Security**:
  - Exclude all `.env*` files from Git tracking in `.gitignore`, committing only a sanitized `.env.example` with generic placeholders.
  - Prevent committing any personal or company GCP project IDs to Git.
  - Require explicit project configuration to eliminate risk of accidentally targeting or corrupting production caches.
- **Automated Test Suite**:
  - Add comprehensive automated unit tests covering happy paths, error cases, and special cases with zero external GCP dependency.

## Capabilities

### New Capabilities
- `ask-ai-service`: Google Cloud Function proxy and Vertex AI Gemini Context Caching pipeline that serves streaming documentation answers grounded in `dist/llms-full.txt`.

### Modified Capabilities
- `docs-site`: Add Ask AI assistant configuration, external endpoint delegation, and XLT-specific starter question suggestions to the documentation site.

## Impact

- **Code & Configuration**:
  - `.gitignore`: Updated to ignore `.env*` while preserving `.env.example`.
  - `blume.config.ts`: Updated `ai.ask` block with suggestions and endpoint resolution from environment.
  - `services/ask-ai/`: New directory containing `package.json`, `index.js`, `refresh-cache.mjs`, `deploy.sh`, `test/ask-ai.test.js`, `.env.example`, and `README.md`.
- **Infrastructure & Dependencies**:
  - Google Cloud Platform (Vertex AI, Cloud Functions Gen 2 / Cloud Run).
  - Production build remains 100% static HTML in `dist/`. No server process is required to host the documentation site.
