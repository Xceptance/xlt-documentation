## 1. Dependencies, Configuration, and Documentation

- [x] 1.1 Install `@ai-sdk/openai-compatible` in the root documentation project and verify package resolution with `npm ls @ai-sdk/openai-compatible`.
- [x] 1.2 Update `blume.config.ts` with comprehensive inline code comments explaining server output, Kilo Gateway Ask AI settings, secret handling, and MCP routes. Configure `deployment: { output: "server", adapter: "node" }`, `ai.ask` with `provider: "openai-compatible"`, `baseUrl: "https://api.kilo.ai/api/gateway"`, `apiKeyEnv: "KILO_API_KEY"`, `model: "google/gemini-3.8-flash"`, `ai.mcp: { enabled: true }`, and `ai.openInChat: ["claude", "chatgpt", "cursor"]`. Verify configuration validity with `npx blume validate`.
- [x] 1.3 Update `.env.example` to document the `KILO_API_KEY` placeholder, ensure actual secrets reside only in local uncommitted `.env`, and verify via `git status` that `.env` is ignored and no secrets are staged or tracked.
- [x] 1.4 Update root `README.md` with an "AI & Model Context Protocol (MCP)" section detailing how to connect Claude Code, Cursor, and VS Code to the `/mcp` endpoint with copy-and-paste commands and configuration snippets.

## 2. Legacy Proxy Cleanup

- [x] 2.1 Remove the obsolete `services/ask-ai/` directory containing the standalone Cloud Function proxy, cache refresh script, and deployment tooling.

## 3. Verification and Testing

- [x] 3.1 Run `npm run build` (`npx blume build`) and verify the Node server output builds cleanly into `dist/server/entry.mjs` without build or schema errors.
- [x] 3.2 Start the local dev server (`npx blume dev`) with `KILO_API_KEY` set, verify the Ask AI panel is visible in the UI on `http://localhost:4321/xlt`, and verify the `/mcp` endpoint responds to HTTP requests.
