# Pull Request: Migration to Blume (Static-First Documentation Hub)

## Executive Summary

This pull request completes the migration of the Xceptance Documentation Hub (covering **XLT**, **XTC**, and **Neodymium**) from Hugo + Docsy to **Blume** (built on Astro and Vite).

Crucially, this setup is configured as a **100% pure static site**:
- **Zero Node.js servers, zero cloud API keys, and zero background processes in production**: The build emits standard static HTML, CSS, JavaScript, and search indexes directly into `dist/` for drop-in deployment to our existing Apache hosting infrastructure with our production `.htaccess`.
- **Deletion of Local Development Proxy Scripts & Cloud Credentials**: All local development proxy scripts (`scripts/vertex-proxy.mjs`, `scripts/dev.mjs`, `scripts/prod.mjs`, `scripts/test-proxy.mjs`), GCP project configurations, and `.env.example` have been deleted. Developers no longer need Google Cloud IAM credentials or project setups to contribute or preview docs locally.
- **Homepage Refresh**: The landing page (`pages/index.astro`) has been updated to remove dynamic `/mcp` server connection widgets and server-side chat placeholders, focusing visitors on instant `⌘K` documentation search and product wayfinding.
- **Code Block Search**: Fenced code blocks are fully indexed (`search.indexing.includeCodeBlocks: true`), enabling direct searches for Java properties, annotations, XML elements, and CLI options.

---

## Why Migrate? Key Advantages over Hugo + Docsy

| Area | Previous Solution (Hugo + Docsy) | New Solution (Blume Static) | Real Business & Engineering Value |
| :--- | :--- | :--- | :--- |
| **Search Experience** | **Lunr.js** (client-side in-memory index). Client downloads multi-MB `offline-search.json` and parses/indexes it in browser RAM. | **Orama** pre-indexed full-text search. Instant `⌘K` modal with live preview (`⌘J`), section-tiered scoring, and popular links. | **Zero client lag**. Search results appear instantly without draining user laptop/mobile CPU or battery. |
| **Code Block Search** | Fenced code blocks were stripped or unstructured. | **Code blocks fully indexed** (`includeCodeBlocks: true`). | Developers can now search directly for Java property keys (e.g. `com.xceptance.xlt.*`), annotations (`@Test`), XML elements, and CLI options. |
| **Frontend Weight & Web Vitals** | Monolithic Bootstrap 4/5 CSS (~250 KB), jQuery/Bootstrap JS bundles, FontAwesome webfonts on every single page. | **Astro Islands Architecture**: **0 KB client JavaScript** for reading documentation. Utility-scoped Tailwind CSS. Inline Lucide SVGs. | **Near-perfect Core Web Vitals (Lighthouse 95–100)** and instant page loads. |
| **Authoring Syntax** | Proprietary Hugo shortcodes (`{{% alert %}}`, `{{< tabpane >}}`). Breaks standard linters and IDE Markdown previews. | Standard **Markdown Directives** (`:::note`, `:::tip`, `:::warning`) and MDX. Universal CommonMark/GFM. | Clean, portable Markdown. Previews flawlessly in VS Code, GitHub, and AI tools with zero custom imports. |
| **Site Quality & Link Checking** | Hugo has no built-in link checker; requires external third-party CI scripts to catch 404s. | Native **`npm run validate`** (`blume validate`). | Automatically catches broken internal links, invalid anchor tags, and schema errors before deployment. |
| **Privacy & GDPR Compliance** | Docsy by default links to external Google Fonts CDNs and external scripts. | Automatically **downloads and self-hosts** all fonts (`Roboto`, `Ubuntu Mono`) and SVG icons locally. | 100% air-gapped and GDPR-compliant with zero third-party tracking or network requests. |
| **AI Readiness (Static)** | None. Exposing LLM summaries requires custom Go templates. | Automatically generates **`/llms.txt`**, **`/llms-full.txt`**, raw `.md` mirrors, and "Open in Claude/ChatGPT/Cursor" buttons. | Future-proof. Ready for developer AI assistants, IDE tools, and crawlers with zero server cost. |
| **Hosting & Ops Complexity** | Pure static files copied to Apache. | **Pure static files copied to Apache (`dist/`)**. | **Zero change to hosting infrastructure or costs**. No servers or cloud proxies to maintain. |

---

## Static Architecture & AI Discoverability

In pure static mode, the documentation site produces complete machine-readable representations alongside standard HTML:
1. **`/llms-full.txt`**: A clean, single-file Markdown export of the entire ~1.9 MB documentation corpus.
2. **`/{route}.md`**: Direct raw Markdown mirrors for every documentation guide.
3. **`⌘K` Full-Text Search**: Pre-built client-side search index covering headings, paragraphs, and fenced code blocks.

### Model Context Protocol (MCP) Resource Feasibility
Because Blume compiles the entire documentation corpus into `/llms-full.txt`, any Model Context Protocol (MCP) server can easily expose it as an MCP Resource (e.g. `docs://manual`). This allows AI coding assistants (like Claude Code, Cursor, or Google Antigravity) to access the complete documentation corpus directly, without requiring a dedicated documentation backend service or running multiple servers.

---

## Verification & Build Results

1. **Validation**: `npm run validate` passes with exit code 0 (zero broken links, zero invalid anchors).
2. **Build**: `npm run build` compiles clean static HTML to `dist/` with `.htaccess` in place.
3. **Preview**: Tested locally with `npm run preview` to verify responsive layout, search modal, and dark/light modes.
