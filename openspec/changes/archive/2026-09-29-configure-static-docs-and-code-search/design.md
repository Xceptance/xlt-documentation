## Context

See [`proposal.md`](./proposal.md) for background and motivation.

Currently, the Blume documentation proof-of-concept is configured with `deployment.output: "server"` and `adapter: "node"` in `blume.config.ts` to support dynamic server endpoints (`/api/ask` and `/mcp`). To support this in local development, the repository contains:
- Local development proxy scripts: `scripts/vertex-proxy.mjs` and `scripts/test-proxy.mjs`
- Server process orchestration wrappers: `scripts/dev.mjs` and `scripts/prod.mjs`
- GCP project and credential configuration requirements: `.env.example` and `.env`
- An extra runtime dependency: `@ai-sdk/openai-compatible`
- Dynamic server promotional elements on the landing page (`pages/index.astro`), including an `/mcp` announcement pill, an interactive terminal widget with client tabs, and an "Ask AI" search placeholder

In production, Xceptance hosts documentation as a pure static website via Apache. In local development, contributors only need standard preview and authoring tools. Maintaining local proxy scripts, Node server wrappers, and GCP credentials adds unnecessary complexity when static documentation fulfills all requirements. By deleting all local proxy and wrapper scripts, removing cloud environments, and aligning the homepage, the repository becomes completely self-contained, maintenance-free, and 100% static.

## Goals / Non-Goals

**Goals:**
- Transition `blume.config.ts` to pure static output (`deployment.output: "static"` or default), compiling directly to `dist/`.
- Delete all local development proxy and wrapper scripts (`scripts/vertex-proxy.mjs`, `scripts/test-proxy.mjs`, `scripts/dev.mjs`, `scripts/prod.mjs`).
- Retire GCP environment requirements (`.env.example`, `.env`), eliminating all cloud project, location, and credential dependencies.
- Simplify `package.json` scripts to standard Blume commands (`dev`, `build`, `validate`, `preview`) and remove `@ai-sdk/openai-compatible`.
- Update `pages/index.astro` to remove dynamic `/mcp` connection widgets, update search placeholders to focus on instant documentation search, and simplify client interactivity scripts.
- Ensure 100% drop-in compatibility with Apache static hosting using the existing `public/.htaccess`.
- Enable fenced code block search indexing (`search.indexing.includeCodeBlocks: true`) to index properties, annotations, XML tags, and CLI options.
- Maintain static machine-readable documentation artifacts (`llms-full.txt`, `llms.txt`, and raw `.md` mirrors) for developer tools, AI assistants, and MCP servers.
- Document that `llms-full.txt` can be directly mounted as an MCP resource in any Model Context Protocol server.
- Provide a structured Hugo/Docsy vs. Blume comparison and Pull Request description template for management review.

**Non-Goals:**
- Preserving or maintaining any proxy scripts, server wrappers, or background Node processes — both local development and production workflows rely strictly on standard Blume CLI commands (`blume dev`, `blume build`).

## Decisions

### 1. Pure Static Output Mode
- **Decision**: Configure `blume.config.ts` to omit `output: "server"` / set `output: "static"`.
- **Rationale**: Eliminates the operational complexity, monitoring, and hosting costs of running Node.js in production. `blume build` emits directly to `dist/`, which is copied directly to Apache/Nginx just like Hugo's `public/` directory.
- **Alternatives Considered**: Keeping `output: "server"` with Node.js on a container (Cloud Run or VM). Rejected because the operational overhead is unnecessary for documentation, and static hosting is more reliable and zero-cost to maintain.

### 2. Deletion of Local Development Proxy Scripts & Cloud Credentials
- **Decision**: Delete `scripts/vertex-proxy.mjs`, `scripts/dev.mjs`, `scripts/prod.mjs`, `scripts/test-proxy.mjs`, and `.env.example`. Remove `@ai-sdk/openai-compatible` from `package.json` dependencies.
- **Rationale**: With pure static hosting, no live proxy is needed in production, and local development is significantly simpler using native `blume dev`. Deleting the proxy scripts eliminates the requirement for developers to configure Google Cloud IAM, `gcloud` Application Default Credentials, or GCP project IDs just to run the documentation site locally. Standard Blume CLI commands handle everything out of the box with zero external dependencies.
- **Alternatives Considered**: Keeping the proxy as an optional local script. Rejected because it introduces maintenance debt, confusing contributors into believing a backend proxy is required for docs.

### 3. Homepage Refresh for Static-First Architecture (`pages/index.astro`)
- **Decision**: Update `pages/index.astro` to remove server-dependent features:
  - Remove top hero pill linking to `#mcp-server-section`.
  - Update hero search bar text to "Search documentation..." (focusing on instant `⌘K` search).
  - Remove the terminal tabs widget (`#mcp-server-section`) advertising `https://docs.xceptance.com/mcp`.
  - Simplify `setupHomepageInteractivity` in the client script by removing terminal tab switching and copy-to-clipboard handlers for `/mcp`.
- **Rationale**: The homepage should accurately represent the site's capabilities. Promoting a live `/mcp` HTTP stream endpoint that doesn't exist on static hosting would confuse users and IDE agents.

### 4. Enable Code Block Search Indexing
- **Decision**: Add `search.indexing.includeCodeBlocks: true` under `search` in `blume.config.ts`.
- **Rationale**: XLT, XTC, and Neodymium documentation heavily features Java configuration keys (e.g. `com.xceptance.xlt.auth.*`), JUnit annotations (`@Test`, `@BeforeClass`), XML elements, and CLI flags (`-auto -embedded`). Stripping code blocks causes zero search hits for these critical technical terms.
- **Alternatives Considered**: Keeping code blocks excluded to reduce index size. Rejected because developer search satisfaction drops significantly when property names cannot be found.

### 5. Static Machine-Readable AI Artifacts & MCP Resource Feasibility
- **Decision**: Preserve `llms-full.txt`, `llms.txt`, and raw `.md` mirrors generated directly by `blume build`, and document that `llms-full.txt` can serve as an MCP resource.
- **Rationale**: In the Model Context Protocol (MCP), resources are static data endpoints (`docs://manual`). Because Blume automatically aggregates the entire documentation corpus into a clean 1.9 MB Markdown file (`llms-full.txt`), any MCP server can easily mount it as an MCP Resource without building scrapers, vector databases, or running a dedicated documentation server.
- **Alternatives Considered**: Disabling machine-readable outputs. Rejected because generating static text files incurs zero runtime overhead and high developer utility.

## Risks / Trade-offs

- **[Risk] Search Index Size Growth** → Indexing code blocks will increase the size of `blume-search.json` (approx. 20–30% increase).
  - *Mitigation*: The Apache server already compresses JSON via `mod_deflate` / `mod_gzip` in `.htaccess`. If the site grows significantly in the future, Blume provides a one-line switch to **Pagefind** (`search: { provider: "pagefind" }`), which shards the index into 20KB chunks on demand.
- **[Risk] Disabling Live Chatbot in Production** → The in-browser "Ask AI" floating chat panel will not be live in static production.
  - *Mitigation*: Readers retain "Open in ChatGPT / Claude / Cursor" buttons and "Copy as Markdown" on every page, and AI crawlers receive `/llms.txt` and `/llms-full.txt`.

## Migration Plan

1. Update `blume.config.ts` to set static output, disable server-side Ask AI, and enable code block search indexing.
2. Delete local development proxy scripts (`scripts/vertex-proxy.mjs`, `scripts/test-proxy.mjs`, `scripts/dev.mjs`, `scripts/prod.mjs`) and `.env.example`.
3. Clean up `package.json` scripts (`dev`, `build`, `preview`, `validate`) and remove `@ai-sdk/openai-compatible`.
4. Update `pages/index.astro` to remove dynamic `/mcp` server widgets and update search placeholders.
5. Execute `npm run build` and verify output directory structure directly in `dist/`.
6. Validate site integrity via `npm run validate`.
7. Update `README.md` to reflect static hosting, standard Blume commands, and MCP resource feasibility.
8. Update the PR description template with the Hugo/Docsy feature comparison and cleanup benefits.
