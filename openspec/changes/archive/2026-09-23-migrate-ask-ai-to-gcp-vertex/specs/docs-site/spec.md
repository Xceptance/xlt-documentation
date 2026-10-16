## MODIFIED Requirements

### Requirement: Ask AI Assistant Integration
The documentation site SHALL provide an in-page Ask AI chat assistant integrated into the header navigation, displaying XLT-specific starter question suggestions and routing user queries via Blume's built-in OpenAI-compatible chat backend to a Google Cloud Vertex AI gateway proxy configured for the Google Cloud project ID (`GCP_PROJECT`) and location (`GCP_LOCATION`), dynamically configured via `ASK_AI_ENDPOINT` without hardcoding `localhost`.

#### Scenario: Ask AI button and panel rendering
- **WHEN** a user navigates to any documentation page with Ask AI enabled (`ASK_AI_ENDPOINT` is configured)
- **THEN** the header displays an Ask AI button and opening the panel displays an interactive chat interface.

#### Scenario: Starter question suggestions display
- **WHEN** a user opens the Ask AI chat panel with an empty conversation
- **THEN** three clickable prompt suggestions are displayed: "How do I configure load profiles in XLT?", "How do I evaluate test results?", and "How do I configure DNS settings in XLT?".

#### Scenario: Native gateway query routing
- **WHEN** a user submits a question through the Ask AI chat panel
- **THEN** the system processes the request through Blume's internal RAG retrieval pipeline, builds dynamic documentation context excerpts, and streams the answer from Google Cloud Vertex AI (`gemini-2.5-flash` or configured `ASK_AI_MODEL`) via the Vertex proxy using IAM / Application Default Credentials with `GCP_PROJECT` and `GCP_LOCATION`.

#### Scenario: Corpus-optimized RAG retrieval sizing
- **WHEN** Blume constructs the grounded context prompt for an Ask AI query
- **THEN** the retrieval pipeline uses an excerpt window of up to 4,500 characters per document, a total context budget of 32,000 characters, and up to 6 search results so that complete guide pages and code examples are provided to `gemini-2.5-flash` without truncation or dropped search hits.

#### Scenario: External endpoint delegation
- **WHEN** the environment variable `ASK_AI_ENDPOINT` is provided via environment or `.env`
- **THEN** `blume.config.ts` dynamically sets `baseUrl` to that endpoint URL and enables Ask AI without relying on any hardcoded `localhost` fallback in the configuration source.

#### Scenario: Endpoint absence warning and graceful degradation
- **WHEN** `ASK_AI_ENDPOINT` is unset or empty during config evaluation
- **THEN** `blume.config.ts` logs a warning indicating `ASK_AI_ENDPOINT is not configured. Ask AI is disabled.` and sets `enabled: false`, allowing the site to build and validate cleanly without schema errors.

#### Scenario: Global location endpoint routing
- **WHEN** `GCP_LOCATION` is set to `global` (or omitted as default)
- **THEN** the Vertex AI gateway proxy routes requests to Google Cloud's global Vertex endpoint `https://aiplatform.googleapis.com/v1/projects/{GCP_PROJECT}/locations/global/publishers/google/models/{MODEL}:streamGenerateContent` for dynamic global capacity allocation.

### Requirement: Secret and API Key Git Hygiene
The documentation project SHALL exclude all real API keys, cloud project credentials, secret-bearing environment files, and local credential stores from Git version control, maintaining only non-sensitive placeholder templates in `.env.example`.

#### Scenario: Git exclusion of environment secrets
- **WHEN** git status or repository changes are inspected with local `.env` or `.env.*` files present
- **THEN** all actual secret files are ignored by git and prevented from being staged or committed.

#### Scenario: Configuration references environment variable name only
- **WHEN** `blume.config.ts` is configured for Ask AI
- **THEN** the configuration specifies `apiKeyEnv: "ASK_AI_API_KEY"` (the name of the environment variable holding a local non-sensitive placeholder) and contains no raw API keys or token strings.

#### Scenario: IAM-based authentication without static keys
- **WHEN** the Vertex AI gateway proxy authenticates with Google Cloud Vertex AI
- **THEN** authentication is performed dynamically via Google Cloud IAM (Application Default Credentials, local `gcloud` CLI, or GCP Metadata Server) with in-memory token caching and zero static API keys stored in configuration or committed to Git.
