# Xceptance Documentation

Documentation for **XLT**, **XTC**, and **Neodymium**, built with [Blume](https://github.com/blumedocs/blume) on [Astro](https://astro.build/) and [Vite](https://vite.dev/).

---

## Prerequisites

- **Node.js**: Version 20 or newer (Node.js 22+ recommended).
- **Package Manager**: `npm` (bundled with Node.js) or `pnpm`.

---

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the local development server**:

   ```bash
   npm run dev
   ```

   The documentation will be available at [http://localhost:4321](http://localhost:4321) with hot reloading.

3. **Validate site integrity**:

   ```bash
   npm run validate
   ```

   Verifies internal links, redirects, and document structure.

4. **Build for production**:

   ```bash
   npm run build
   ```

   Generates optimized static HTML in the `dist/` directory.

5. **Preview the production build**:

   ```bash
   npm run preview
   ```

---

## AI Features & Model Context Protocol (MCP)

This documentation hub includes built-in AI capabilities powered by Blume:

### In-Browser Ask AI
The site provides a native Ask AI assistant in the navigation header powered by Google Gemini (`google/gemini-3.8-flash`) via the Kilo Gateway (`https://api.kilo.ai/api/gateway`).

To enable Ask AI in local development:
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Set your `KILO_API_KEY` in `.env` (obtainable from [app.kilo.ai/profile](https://app.kilo.ai/profile)).
3. Start the dev server (`npm run dev`).

> **Security Note**: Never commit `.env` or real API keys to Git. `.env` is ignored by `.gitignore`.

### Ask AI Context & Retrieval Sizing

Blume automatically grounds Ask AI answers in documentation content by performing request-time lexical search (Orama), excerpting relevant sections around matched query terms, and injecting them into the system prompt.

The retrieval parameters are configured in [`blume.config.ts`](./blume.config.ts) under `ai.ask.retrieval`:

```ts
retrieval: {
  excerptChars: 4500,   // Characters extracted per document chunk (default: 2000)
  contextBudget: 32000, // Total character ceiling across all injected chunks (default: 10000)
  maxResults: 6,        // Maximum number of documentation hits retrieved (default: 6)
}
```

#### Why these parameters are tuned for this repository:
- **`excerptChars: 4500` (Chunk Size)**: An analysis of the repository's 162 core guides and manuals showed a median page length of **4,067 characters**. The default limit of 2,000 characters cuts multi-section guides in half, often truncating code examples, XML snippets, and configuration tables. Sizing to 4,500 characters allows median guide pages to fit entirely within the prompt window.
- **`contextBudget: 32000` (Total Budget)**: When a user asks a question from an active documentation page, Blume injects the viewed page first and then iterates through the search hits. Under default settings (10,000 characters), hits 5 and 6 are discarded due to budget exhaustion. A budget of 32,000 characters (~8,000 tokens) accommodates the active page plus all 6 retrieved hits without dropping context:
  $$\text{Max Injection} = (1 \text{ active page} + 6 \text{ search hits}) \times 4,500 = 31,500 \text{ characters} \le 32,000$$
- **`maxResults: 6`**: Provides comprehensive cross-product coverage across XLT, XTC, and Neodymium.
- **Model Efficiency**: `google/gemini-3.8-flash` features a 1M+ token context window, sub-second prefill latency (<200ms for ~8,000 tokens), and near-zero input token costs, making this expanded context highly cost-effective and accurate.

For full configuration options and details on how Blume handles section scoring and lead-in windows, see the [Blume Ask AI Retrieval Documentation](https://blume.sh/docs/configuration/ask-ai#retrieval-size).

### Model Context Protocol (MCP) Server
Blume serves a live Model Context Protocol (MCP) server endpoint at `/mcp` allowing coding agents in developer IDEs to search, inspect, and read the XLT documentation directly without web scraping.

Exposed MCP tools:
- `search_docs`: Full-text lexical search across the documentation corpus.
- `get_page`: Retrieve the clean Markdown content of any specific page.
- `list_pages`: List all documentation pages and routes.
- `get_navigation`: Inspect the sidebar tree and section hierarchy.

#### Connecting from Claude Code
```bash
# Local development server:
claude mcp add --transport http xlt-docs http://localhost:4321/mcp

# Production server:
claude mcp add --transport http xlt-docs https://docs.xceptance.com/mcp
```

#### Connecting from Cursor
1. Go to **Settings** (`Cmd + ,` / `Ctrl + ,`) → **Features** → **MCP**.
2. Click **Add New MCP Server**.
3. Set:
   - **Name**: `xlt-docs`
   - **Type**: `SSE` / `HTTP` (Streamable HTTP)
   - **Server URL**: `http://localhost:4321/mcp` (or your deployed URL)

#### Connecting from VS Code (Cline / Roo Code / Continue)
Add to your MCP settings JSON (e.g. `cline_mcp_settings.json`):
```json
{
  "mcpServers": {
    "xlt-docs": {
      "url": "http://localhost:4321/mcp"
    }
  }
}
```

---

## Authoring Guide

Documentation content lives in the `content/en/` directory, partitioned into product tabs:
- `content/en/xlt/`: Xceptance LoadTest (XLT)
- `content/en/xtc/`: Xceptance Test Center (XTC)
- `content/en/neodymium/`: Neodymium test automation framework

### Frontmatter

Every Markdown (`.md`) and MDX (`.mdx`) page starts with YAML frontmatter:

```yaml
---
title: Getting Started with XLT
description: A quick start guide to installing and running your first test.
sidebar:
  label: Quick Start     # Optional: override label in the sidebar
  order: 10              # Optional: numerical sort order
  hidden: true           # Optional: hide empty index placeholder from sidebar
---
```

### Callout Directives

Blume supports native GitHub/rehype callout directives without needing component imports:

```markdown
:::note
Informational note with standard title.
:::

:::tip[Best Practice]
A tip with a custom header and markdown formatting.
:::

:::warning
Cautionary advice or potential pitfall.
:::

:::danger
High-priority danger or breaking change alert.
:::

:::info[Role Required]
Contextual requirement or permission indicator.
:::
```

### Internal Links & Assets

- **Internal Links**: Use standard root-relative markdown links:
  ```markdown
  See the [XLT Manual](/xlt/manual/) or [Release Notes](/xlt/release-notes).
  ```
- **Images**: Place images in `public/images/` and reference them directly:
  ```markdown
  ![Architecture Overview](/images/xlt-architecture.png)
  ```

---

## How to Contribute

We welcome your contributions! To suggest changes or add new content:

1. **Fork the Repository**: Create your fork on GitHub.
2. **Create a Branch**:
   ```bash
   git checkout -b feature/your-topic-name
   ```
3. **Make Edits**: Add or modify files in `content/en/`.
4. **Test & Validate**:
   ```bash
   npm run dev       # verify in browser
   npm run validate  # verify links and frontmatter
   npm run build     # ensure clean build
   ```
5. **Commit and Push**:
   ```bash
   git add .
   git commit -m "docs: describe your changes"
   git push origin feature/your-topic-name
   ```
6. **Open a Pull Request**: Submit your pull request to the `master` branch.

---

## Built With

- **Framework**: [Blume](https://github.com/blumedocs/blume) (built on [Astro](https://astro.build/) and [Vite](https://vite.dev/))
- **Search**: Built-in static index with [Pagefind](https://pagefind.app/) / Orama
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Styling**: Tailwind CSS & Vanilla CSS
- **Typography**: Outfit, Inter, and Ubuntu Mono

---

## License

This documentation and its source code are licensed under the [Apache License 2.0](LICENSE).
