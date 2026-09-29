## Why

The current Blume documentation proof-of-concept was initially configured for Node.js server execution (`deployment.output: "server"`) to support live Ask AI chat and a streaming MCP endpoint. To support this in local development, the repository contains custom local development proxy scripts (`scripts/vertex-proxy.mjs`, `scripts/test-proxy.mjs`), custom dev/prod wrappers (`scripts/dev.mjs`, `scripts/prod.mjs`), GCP environment requirements (`.env.example`), and dynamic `/mcp` connection widgets on the homepage (`pages/index.astro`).

However, maintaining and monitoring an active Node server and managing cloud API credentials introduces unnecessary operational overhead when the primary goal is hosting high-performance, maintenance-free static documentation like the current Hugo + Docsy deployment. Deleting all local development proxy scripts, server wrappers, and GCP environment templates completely eliminates cloud credential dependencies and local maintenance debt.

Furthermore, technical users frequently search for specific Java class names, configuration property keys (e.g., `com.xceptance.xlt.*`), XML tags, and CLI options that appear in code blocks. Currently, code blocks are stripped from search indexing.

Additionally, we want to maintain clean machine-readable AI discoverability artifacts (`llms-full.txt`, `llms.txt`, and raw Markdown mirrors) in the static build without needing live server processes, with `llms-full.txt` available to be mounted as an MCP resource in any Model Context Protocol server. Finally, the homepage (`pages/index.astro`) needs to be updated to align with the static architecture by replacing the dynamic `/mcp` server section and Ask AI placeholders with search and navigation wayfinding.

## What Changes

- **Static Deployment Configuration**: Configure `blume.config.ts` for pure static generation (`deployment.output: "static"` or omitted default), producing zero server runtime artifacts and compiling directly to `dist/` with full Apache `.htaccess` compatibility.
- **Delete Local Development Proxy & Server Scripts**: Delete `scripts/vertex-proxy.mjs`, `scripts/dev.mjs`, `scripts/prod.mjs`, `scripts/test-proxy.mjs`, and `.env.example`. Remove the `@ai-sdk/openai-compatible` dependency and standardize `package.json` scripts on standard Blume CLI commands (`dev: blume dev`, `build: blume build`, `preview: blume preview`, `validate: blume validate`).
- **Update Homepage (`pages/index.astro`)**: Remove the live `/mcp` banner pill and interactive `/mcp` server connection section. Update search inputs to focus on instant full-text search (`⌘K`) and code block search, and clean up client interactivity scripts.
- **Code Block Search Indexing**: Enable fenced code block indexing in `blume.config.ts` via `search.indexing.includeCodeBlocks: true`, making properties, annotations, XML elements, and CLI flags searchable in the `⌘K` command palette.
- **Machine-Readable AI Documentation Artifacts**: Ensure static emission of `/llms.txt`, `/llms-full.txt` (which can be directly exposed as an MCP resource), and per-page `.md` mirrors for AI crawlers, LLMs, and developer tooling.
- **Hugo/Docsy vs. Blume Static Executive Comparison**: Provide an executive-ready comparison document and Pull Request description template summarizing real technical and authoring advantages to justify the migration.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `docs-site`: Update deployment requirements from server-rendered Node execution to pure static HTML generation, delete local development proxy and server wrapper scripts, update the homepage to remove dynamic server dependencies, enable code block search indexing, and document static AI discoverability artifacts (including MCP resource feasibility).

## Impact

- **Configuration**: `blume.config.ts` changes `deployment` and `search` configuration.
- **Scripts & Dependencies**: Deletes local proxy and wrapper scripts in `scripts/`, removes `@ai-sdk/openai-compatible` dependency from `package.json`, and simplifies npm scripts to pure Blume commands.
- **Environment**: Eliminates `.env` and `.env.example` requirements (no GCP project, location, or API keys needed).
- **Homepage**: `pages/index.astro` is updated to remove dynamic `/mcp` widgets and reflect static search and documentation capabilities.
- **Build Output**: `blume build` emits directly to `dist/` (instead of `dist/client/` and `dist/server/`).
- **Documentation**: Updates `README.md` and provides a PR description template for management review.
