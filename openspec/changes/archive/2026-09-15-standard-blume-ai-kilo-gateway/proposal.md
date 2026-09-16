## Why

Deploying and maintaining a standalone Google Cloud Function proxy with Vertex AI context caching requires specialized GCP project permissions (`cloudfunctions.googleapis.com`, Service Usage Admin) and custom deployment scripts that create infrastructure friction. Adopting Blume's standard out-of-the-box Ask AI configuration via the Kilo Gateway (`https://api.kilo.ai/api/gateway`) with Bring Your Own Key (BYOK) for Google AI Studio gives us standard, vendor-aligned Ask AI on `google/gemini-3.8-flash` billed directly to our Google account, while also unlocking Blume's built-in Model Context Protocol (MCP) server for IDE coding agents with zero custom proxy infrastructure.

## What Changes

- **Switch Ask AI to Blume Native Provider**: Configure `ai.ask` in `blume.config.ts` using `provider: "openai-compatible"`, base URL `https://api.kilo.ai/api/gateway`, API key environment variable `KILO_API_KEY`, and model `google/gemini-3.8-flash`.
- **Enable Server Output with Node Adapter**: Set `deployment.output: "server"` and `deployment.adapter: "node"` in `blume.config.ts` so Blume serves the native Ask AI chat endpoint and live MCP server.
- **Enable Model Context Protocol (MCP)**: Configure `ai.mcp.enabled: true` in `blume.config.ts` to host a live `/mcp` endpoint for developer IDE tools (Cursor, Claude Code, VS Code).
- **Configure Open in Chat**: Set `ai.openInChat: ["claude", "chatgpt", "cursor"]` to provide direct page actions to external chat assistants.
- **Add Dependencies**: Install `@ai-sdk/openai-compatible` in the root documentation project.
- **Retire Standalone Cloud Function Proxy**: Remove or deprecate the standalone `services/ask-ai` directory, deployment script, and manual cache refresh tooling.
- **Update Environment Configuration**: Update root `.env.example` to document `KILO_API_KEY`.

## Capabilities

### New Capabilities
<!-- No new standalone capabilities; existing capabilities are modified to reflect the architecture transition. -->

### Modified Capabilities
- `docs-site`: Update Ask AI requirement to use Blume's built-in `openai-compatible` provider via Kilo Gateway (`google/gemini-3.8-flash`), add requirements for the live Model Context Protocol (MCP) server endpoint, and specify server output with the Node adapter.
- `ask-ai-service`: Deprecate the standalone Cloud Function and Vertex AI cache management pipeline in favor of Blume's native built-in provider architecture.

## Impact

- `blume.config.ts`: Updated with server deployment mode, Kilo Gateway Ask AI settings, and MCP server configuration.
- `package.json`: Adds `@ai-sdk/openai-compatible` dependency.
- `.env.example` / `.env`: Configures `KILO_API_KEY` for local development.
- `services/ask-ai/`: Retired as custom proxy is replaced by native Blume capabilities.
