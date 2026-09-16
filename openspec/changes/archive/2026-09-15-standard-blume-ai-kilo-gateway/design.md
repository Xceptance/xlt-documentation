## Context

See `proposal.md` for the motivation. The XLT documentation currently utilizes Blume v1.6.6. Previously, an external Google Cloud Function proxy in `services/ask-ai/` was planned to bridge Blume to Vertex AI Context Caching. However, deployment of the standalone Cloud Function is blocked by GCP project service enablement permissions (`cloudfunctions.googleapis.com`). Meanwhile, the user already has a working Kilo Gateway account with Bring Your Own Key (BYOK) enabled for Google AI Studio, supporting `google/gemini-3.8-flash`. Blume v1.6.6 natively supports OpenAI-compatible gateways and dynamic server execution.

## Goals / Non-Goals

**Goals:**
- Connect Blume's built-in Ask AI directly to Kilo Gateway (`https://api.kilo.ai/api/gateway`) targeting `google/gemini-3.8-flash`.
- Enable Blume server output with the bundled Node adapter (`adapter: "node"`) for full Ask AI and MCP support.
- Enable Blume's Model Context Protocol (MCP) server (`/mcp`) for IDE agent integration (Cursor, Claude Code).
- Configure "Open in chat" actions for Claude, ChatGPT, and Cursor.
- Add required peer dependency `@ai-sdk/openai-compatible`.
- Clean up obsolete `services/ask-ai/` custom proxy files.
- Provide comprehensive code comments in `blume.config.ts` and developer documentation in `README.md`.

**Non-Goals:**
- Custom RAG or chunking algorithms (relying strictly on Blume's built-in lexical heading-aware retrieval).
- Custom MCP tool implementations (relying strictly on Blume's native documentation tools: search, page inspection, navigation).
- Maintaining dual backends (the Cloud Function proxy will be fully retired in favor of native Blume).

## Decisions

### Decision: Use Blume Native `openai-compatible` Provider with Kilo Gateway
- **Rationale**: Kilo Gateway exposes a standard OpenAI-compatible `/v1` endpoint at `https://api.kilo.ai/api/gateway`. By pointing Blume to this gateway and setting model `google/gemini-3.8-flash`, requests are routed through Kilo's BYOK integration directly to the user's Google AI Studio account, avoiding any GCP infrastructure deployment hurdles.
- **Alternatives Considered**:
  - *Keep standalone Cloud Function proxy*: Requires GCP project owner permissions to enable APIs and manage Cloud Functions Gen 2.
  - *Google AI Studio direct without Kilo*: Requires custom token handling or direct Google SDK integration that is not natively bundled in Blume's pre-configured provider list.

### Decision: Server Output Mode with Node Adapter
- **Rationale**: Both Blume's Ask AI streaming endpoint (`/api/ask`) and the MCP endpoint (`/mcp`) require a runtime compute backend. Blume ships with `@astrojs/node` built-in. This enables testing directly via `blume dev` on `localhost:4321` and provides a production-ready Node server entry point (`dist/server/entry.mjs`).
- **Alternatives Considered**:
  - *Static output with external proxy*: Lacks MCP server support and requires maintaining external proxy services.

### Decision: Retire `services/ask-ai/`
- **Rationale**: The code in `services/ask-ai/` was built specifically as a workaround proxy for Vertex AI Context Caching. With Blume managing the model streaming natively through Kilo Gateway, the entire directory is redundant and should be cleanly removed.

## Annotated Configuration Design (blume.config.ts)

When implemented, `blume.config.ts` will include comprehensive comments explaining the architecture and security controls:

```ts
import { defineConfig } from "blume";

export default defineConfig({
  title: "Xceptance Documentation Hub",
  description: "Documentation for XLT, XTC, and Neodymium by Xceptance.",

  // Server runtime configuration:
  // Both the Ask AI streaming endpoint (/api/ask) and the Model Context Protocol
  // server (/mcp) require dynamic server execution. We use the Node adapter bundled with Blume.
  deployment: {
    output: "server",
    adapter: "node",
  },

  ai: {
    // In-browser Ask AI chat assistant
    ask: {
      enabled: true,
      // Use Blume's OpenAI-compatible backend to connect to Kilo Gateway
      provider: "openai-compatible",
      baseUrl: "https://api.kilo.ai/api/gateway",
      // SECURITY REQUIREMENT: Only the environment variable NAME is stored here.
      // The secret token is loaded at runtime from process.env.KILO_API_KEY (gitignored).
      apiKeyEnv: "KILO_API_KEY",
      // Model routed through Kilo BYOK (Bring Your Own Key) to Google AI Studio
      model: "google/gemini-3.8-flash",
      // Starter question prompts shown when opening the Ask AI drawer
      suggestedQuestions: [
        "How do I configure load profiles in XLT?",
        "How do I evaluate test results?",
        "How do I configure DNS settings in XLT?",
      ],
    },

    // Model Context Protocol (MCP) server
    // Exposes a Streamable-HTTP endpoint at /mcp for developer IDE coding agents
    // (Claude Code, Cursor, VS Code) to search, list, and read documentation directly.
    mcp: {
      enabled: true,
      route: "/mcp",
    },

    // Page actions menu: Direct links to open the active page's Markdown in external AI tools
    openInChat: ["claude", "chatgpt", "cursor"],
  },

  // ... (Existing navigation, search, and branding configurations preserved)
});
```

## Model Context Protocol (MCP) Developer Usage Guide

The MCP server hosted by Blume enables AI coding assistants in developers' IDEs to browse, search, and read the XLT documentation corpus while writing tests or configuring tools.

### Available MCP Tools & Resources
- **`search_docs`**: Full-text lexical search across the documentation corpus, returning relevant page excerpts, titles, and paths.
- **`get_page`**: Fetches the clean, structured Markdown representation of any specific page by route.
- **`list_pages`**: Enumerates all documentation pages, routes, and content types.
- **`get_navigation`**: Returns the complete sidebar hierarchy, section groups, and table of contents.
- **Resources**: Every documentation page is published as an MCP resource (`resources/list` and `resources/read`).

### Connecting Developer IDEs

#### 1. Claude Code CLI
To attach the XLT documentation MCP server to Claude Code:
```bash
# For local development:
claude mcp add --transport http xlt-docs http://localhost:4321/mcp

# For production deployment:
claude mcp add --transport http xlt-docs https://docs.xceptance.com/mcp
```

#### 2. Cursor IDE
1. Open Cursor Settings (`Cmd + ,` on macOS).
2. Navigate to **Features** → **MCP**.
3. Click **Add New MCP Server**.
4. Configure:
   - **Name**: `xlt-docs`
   - **Type**: `SSE` / `HTTP` (Streamable HTTP)
   - **Server URL**: `http://localhost:4321/mcp` (or production URL)
5. Cursor will connect, verify tools (`search_docs`, `get_page`, etc.), and display a green active indicator.

#### 3. VS Code (Cline / Roo Code / Continue)
Add the server entry to your MCP settings file (e.g. `cline_mcp_settings.json`):
```json
{
  "mcpServers": {
    "xlt-docs": {
      "url": "http://localhost:4321/mcp"
    }
  }
}
```

## Risks / Trade-offs

- **Risk**: Accidentally committing raw API keys or secrets to Git.
  - **Mitigation (STRICT CONSTRAINT)**: `blume.config.ts` must ONLY specify `apiKeyEnv: "KILO_API_KEY"` (the name of the environment variable). Never hardcode the raw key string. All `.env` and `.env.*` files containing real secrets are strictly ignored by `.gitignore` (`.env`, `.env.*`, `!.env.example`). Only `.env.example` with blank placeholders is committed.
- **Risk**: User runs `blume dev` without setting `KILO_API_KEY`.
  - **Mitigation**: Blume gracefully handles missing API keys by disabling or warning in the UI. We will document `KILO_API_KEY` in root `.env.example`.
- **Risk**: Retrieval quality difference between Blume's RAG and full-corpus context caching.
  - **Mitigation**: Blume's lexical BM25 indexing with heading-level section extraction reliably retrieves the exact relevant chapters and code snippets up to 10,000 characters, while offering lower latency and zero cache management maintenance.
