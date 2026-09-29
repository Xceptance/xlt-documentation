## 1. Static Configuration & Code Search Indexing

- [x] 1.1 Update `blume.config.ts` to set `deployment: { output: "static" }` (removing Node server adapter), disable server-side Ask AI, and configure `search: { indexing: { includeCodeBlocks: true } }`. Verify configuration loads without schema errors.
- [x] 1.2 Delete local development proxy and wrapper scripts: delete `scripts/vertex-proxy.mjs`, `scripts/test-proxy.mjs`, `scripts/dev.mjs`, `scripts/prod.mjs`, and `.env.example`.
- [x] 1.3 Update `package.json` to simplify npm scripts to standard Blume CLI commands (`dev: blume dev`, `build: blume build`, `preview: blume preview`, `validate: blume validate`) and remove the unused `@ai-sdk/openai-compatible` dependency.
- [x] 1.4 Update `pages/index.astro` to remove the `/mcp` hero pill and terminal section (`#mcp-server-section`), update the hero search bar label to focus on instant documentation search, and clean up the client-side interactivity script.
- [x] 1.5 Execute `npm run build` and verify that static output is generated directly into `dist/` containing `index.html`, `blume-search.json`, `llms-full.txt`, and `.htaccess` without any `dist/server/` directory.
- [x] 1.6 Execute `npm run validate` and verify that all internal links, anchors, and document schemas validate cleanly with exit code 0.

## 2. Documentation & Executive Presentation Material

- [x] 2.1 Update `README.md` to document pure static hosting, standard Blume commands, Apache deployment steps, code block search indexing, static machine-readable documentation artifacts (`llms-full.txt` and `.md` mirrors), and how `llms-full.txt` can be mounted as an MCP resource.
- [x] 2.2 Finalize `PULL_REQUEST_DESCRIPTION.md` containing the ready-to-use executive summary, proxy deletion benefits, and Hugo/Docsy comparison text for managerial review.
