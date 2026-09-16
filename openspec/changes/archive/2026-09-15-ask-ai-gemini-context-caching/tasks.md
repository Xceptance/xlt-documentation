## 1. Documentation Site Configuration

- [x] 1.1 Update root `.gitignore` to exclude all `.env*` files while preserving `!.env.example`
- [x] 1.2 Configure `ai.ask` in `blume.config.ts` to dynamically resolve `endpoint` from `process.env.ASK_AI_ENDPOINT` without hardcoded project URLs, and verify `npm run validate` exits with code 0
- [x] 1.3 Add the three XLT starter suggestions ("How do I configure load profiles in XLT?", "How do I evaluate test results?", "How do I configure DNS settings in XLT?") and verify the config schema validates

## 2. Serverless Ask AI Service Module (`services/ask-ai/`)

- [x] 2.1 Scaffold `services/ask-ai/package.json` with `@google/genai`, `@google-cloud/functions-framework`, and `npm test` script configuration
- [x] 2.2 Create sanitized `services/ask-ai/.env.example` template with documentation and placeholders (`your-gcp-project-id`), ensuring no real project IDs are tracked by Git
- [x] 2.3 Implement `services/ask-ai/index.js` providing CORS preflight handling (`OPTIONS`), request schema validation, and plain UTF-8 chunked streaming from Vertex AI Gemini using the active Context Cache
- [x] 2.4 Implement comprehensive automated test suite in `services/ask-ai/test/ask-ai.test.js` covering happy path (single query, multi-turn history, page context), error cases (bad methods, malformed body, upstream errors), and special cases (allowed vs disallowed CORS, multi-origins, missing page context)
- [x] 2.5 Implement `services/ask-ai/refresh-cache.mjs` to ingest `dist/llms-full.txt` into Google Vertex AI Context Caching with a 30-day TTL, enforcing explicit `GCP_PROJECT_ID` with immediate exit on omission
- [x] 2.6 Implement `services/ask-ai/deploy.sh` supporting environment targets (`./deploy.sh dev` and `./deploy.sh prod`), fail-fast validation requiring explicit `GCP_PROJECT_ID`, and model synchronization code comments
- [x] 2.7 Author `services/ask-ai/README.md` detailing architecture, test suite execution, local testing via Functions Framework, company production deployment steps, and model upgrade procedures

## 3. Verification & Validation

- [x] 3.1 Run automated test suite `npm test` in `services/ask-ai/` and verify that all happy path, error, and special case tests pass
- [x] 3.2 Execute `npm run build` in documentation root and verify that `dist/llms-full.txt` (~360,000 tokens) is generated cleanly without errors
- [x] 3.3 Verify Git status confirms that all `.env*` files with real project IDs remain untracked and excluded from version control
- [x] 3.4 Run `npm run validate` across the documentation site to ensure strict conformance and zero regressions
