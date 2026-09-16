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

## Branding, Theming & Accessibility

The documentation hub uses Xceptance's modern corporate visual identity (matching [xceptance.com](https://www.xceptance.com/en/)) and conforms to WCAG 2.1 / 2.2 accessibility standards.

### Corporate Brand Tokens

| Token | Value | Role & Usage |
| :--- | :--- | :--- |
| **Primary Blue** | `#004682` | Primary brand accent (`theme.accent`), primary pill buttons, icons, card highlights |
| **Hover Blue** | `#005fb0` | Interactive hover state for primary buttons (`hover:bg-[#005fb0]`), lighter & brighter |
| **Brand Red** | `#dc3545` / `#c8102e` | Signature Xceptance red mark ("X"), highlight badges, alert states |
| **Slate Navy** | `#0f172a` | Dark endpoint for hero gradient (`linear-gradient(135deg, #004682, #0f172a)`) |
| **Slate Medium** | `#1e293b` | Dark surface backgrounds and bold dark titles |
| **Body Slate** | `#334155` / `#475569` | High-readability body copy and descriptive metadata |
| **Light Surfaces** | `#ffffff`, `#f8fafc` | Card backgrounds, search launchpads, and subtle borders (`#e2e8f0`) |

### Typography

Configured in [`blume.config.ts`](./blume.config.ts) and automatically downloaded and self-hosted at build time by Blume:
- **Headings & Display**: `Roboto Condensed` (`weights: [500, 700]`) — technical, modern sans-serif.
- **Body Text**: `Roboto` — clean, highly readable document prose.
- **Code & Monospace**: `Ubuntu Mono` — monospace for code blocks, CLI snippets, and shortcuts.

### Homepage Architecture (`pages/index.astro`)

The documentation hub homepage is built as a custom full-width page via Blume's `<PageLayout>`:
1. **Corporate Gradient Hero**: High-impact banner styled with `#004682` to `#0f172a`, ambient radial glow, and official badge.
2. **Prominent Search Launchpad**: Instant search bar with keyboard shortcut `⌘K` that delegates to Blume's native modal search dialog (`data-blume-search-open`) with full-text indexing and Ask AI.
3. **Core Testing Tools (3-Column Grid)**: Parallel product cards for XTC, XLT, and Neodymium featuring screenshots, value summaries, feature highlights, and pill action buttons (`rounded-full`). Includes smooth physics-based elevation on hover (`hover:-translate-y-1.5 hover:shadow-xl`).
4. **Quick Wayfinding**: Fast navigation cards to popular developer pathways (Quick Start, Load Profiles, Neodymium Patterns, Release Notes).

### WCAG 2.1 / 2.2 Accessibility Conformance

The documentation hub is engineered to satisfy WCAG Level AA (and Level AAA for contrast):
- **Contrast Ratios (AAA)**:
  - Corporate Blue (`#004682`) on White: **9.55:1** (exceeds AAA requirement of 7.0:1)
  - White text on Hero Gradient (`#004682` $\rightarrow$ `#0f172a`): **9.55:1 – 17.85:1** (exceeds AAA)
  - White text on Button Hover (`#005fb0`): **6.43:1** (exceeds AA requirement of 4.5:1)
  - Slate body text (`#334155`) on White: **10.35:1** (exceeds AAA)
- **Keyboard Navigation**: Explicit `:focus-visible` focus rings (`focus-visible:ring-2 focus-visible:ring-accent`) on all interactive buttons, cards, and links.
- **Semantic Landmark Hierarchy**: Strict document structure with a single `h1` (`Documentation Hub`), `h2` section headers (`Core Testing Tools`, `Quick Wayfinding`), and `h3` component cards.
- **Assistive Technology**: Informative `aria-label` attributes on action buttons and descriptive `alt` text on all screenshots.

---

## Built With

- **Framework**: [Blume](https://github.com/blumedocs/blume) (built on [Astro](https://astro.build/) and [Vite](https://vite.dev/))
- **Search**: Built-in static index with [Pagefind](https://pagefind.app/) / Orama
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Styling**: Tailwind CSS & Vanilla CSS
- **Typography**: Roboto Condensed, Roboto, and Ubuntu Mono

---

## License

This documentation and its source code are licensed under the [Apache License 2.0](LICENSE).
