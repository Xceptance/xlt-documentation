## REMOVED Requirements

### Requirement: Serverless Streaming API Endpoint
**Reason**: Replaced by Blume's native built-in `openai-compatible` Ask AI integration running directly in the documentation server.
**Migration**: Use Blume's built-in Ask AI endpoint configured via `blume.config.ts` targeting Kilo Gateway (`https://api.kilo.ai/api/gateway`).

### Requirement: Gemini Context Caching Pipeline
**Reason**: Replaced by Blume's native heading-aware lexical RAG retrieval and Kilo Gateway with BYOK Google AI Studio.
**Migration**: Document questions are answered dynamically using Blume's built-in retrieval; manual cache creation and refresh scripts are deprecated.

### Requirement: Environment Configuration and Project Portability
**Reason**: Standalone Cloud Function deployment profiles (`.env.development`, `.env.production`) and `deploy.sh` are no longer needed.
**Migration**: Configure environment variables (such as `KILO_API_KEY`) directly in the root `.env` for the documentation server.

### Requirement: Secret and Project Identifier Git Hygiene
**Reason**: Handled at the repository root level.
**Migration**: Maintain `.env` exclusions in the root `.gitignore`.

