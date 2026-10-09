## Why

Ask AI in the XLT documentation currently relies on Kilo Gateway (`api.kilo.ai`) and a static `KILO_API_KEY` to route requests to Google AI Studio. This introduces an unnecessary external third-party intermediary, requires manual API key management, and poses risk of accidental key exposure.

By switching to direct Google Cloud Vertex AI utilizing Google Cloud IAM Application Default Credentials (`gcloud auth`) and a Google Cloud Project ID (`GCP_PROJECT`), the documentation hub can leverage enterprise-grade Google infrastructure, support global multi-region dynamic capacity (`GCP_LOCATION=global`), support dual-mode execution (local dev and remote production server), and ensure that no static API keys or secret credentials ever exist in Git.

## What Changes

- **Corporate Vertex AI Gateway Proxy (`scripts/vertex-proxy.mjs`)**: Introduce a zero-dependency Node.js proxy that exposes an OpenAI-compatible endpoint (`/v1/chat/completions`) for Blume's Ask AI and translates requests/responses to and from Google Cloud Vertex AI using Google's global endpoint (`https://aiplatform.googleapis.com/.../locations/global/...`) or regional endpoints.
- **Dynamic Token Management (Local & Production Server)**: Acquire OAuth2 access tokens dynamically via a tiered authentication chain: local `gcloud` CLI (Application Default Credentials), GCP Compute Metadata Server (for Cloud Run / GCE / GKE server deployment), and `GOOGLE_APPLICATION_CREDENTIALS` (for external production servers), caching tokens in-memory for 45 minutes.
- **Unified Local Runner (`scripts/dev.mjs`)**: Provide a single development runner (`npm run dev`) that boots both the Vertex AI proxy (port 4000) and the Blume dev server, ensuring coordinated startup and clean shutdown on SIGINT/SIGTERM.
- **Production Server Start Script (`scripts/prod.mjs`)**: Provide a production server entrypoint (`npm start`) that runs the proxy alongside the built Blume Node server in a deployed production environment.
- **Blume Configuration Alignment (`blume.config.ts`)**: Update Ask AI settings to point `baseUrl` to `http://localhost:4000/v1` (configurable via `ASK_AI_ENDPOINT`), set `apiKeyEnv: "ASK_AI_API_KEY"`, and default `model` to `gemini-2.5-flash` (configurable via `ASK_AI_MODEL`).
- **Environment & Security Variable Hygiene (`.env.example`, `.env`, `.gitignore`)**:
  - Retire `KILO_API_KEY`.
  - Maintain existing variable conventions: `ASK_AI_ENDPOINT`, `ASK_AI_MODEL`, and dummy `ASK_AI_API_KEY=local-dev`.
  - Introduce explicit GCP variables: `GCP_PROJECT` and `GCP_LOCATION=global`.
  - Guarantee that `.env` remains gitignored and no Google API keys exist.
- **Package Scripts (`package.json`)**: Update `dev` to run `scripts/dev.mjs`, add `start` to run `scripts/prod.mjs`, and add standalone helper scripts `dev:proxy` and `dev:docs`.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `docs-site`: Update the Ask AI Assistant Integration and Secret Hygiene requirements to retire Kilo Gateway and `KILO_API_KEY`, routing queries to Google Cloud Vertex AI using the project ID (`GCP_PROJECT`) and global location (`GCP_LOCATION`), authenticated securely via IAM / Application Default Credentials without committing keys to Git.

## Impact

- **Affected Code**: `blume.config.ts`, `package.json`, `.env.example`, `scripts/vertex-proxy.mjs` (new), `scripts/dev.mjs` (new), `scripts/prod.mjs` (new), `openspec/specs/docs-site/spec.md`, `README.md`.
- **Ask AI UX**: Zero breaking changes to the reader-facing Ask AI chat assistant; responses stream seamlessly with low latency from Vertex AI's global fleet.
- **Developer Workflow**: Developers run `gcloud auth application-default login` once, set `GCP_PROJECT` in local `.env`, and start dev with `npm run dev`.
- **Production Deployment**: Enables production container/server deployments where Blume's Node server communicates with the co-located Vertex proxy running under Google Cloud service account IAM permissions.

