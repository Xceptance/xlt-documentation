# Xceptance Documentation

Documentation for **XLT**, **XTC**, and **Neodymium**, built with [Blume](https://github.com/blumedocs/blume) on [Astro](https://astro.build/) and [Vite](https://vite.dev/).

---

## Architecture & Hosting

This site is configured as a **100% pure static documentation site**:
- **Zero Node.js Runtime in Production**: Compiles directly to static HTML, CSS, JavaScript, and search indexes in `dist/`.
- **Zero Cloud API Keys & Zero Proxies**: No backend servers, external proxies, or Google Cloud IAM credentials required.
- **Apache Web Server Drop-in**: The output directory `dist/` contains the production `.htaccess` with pre-configured caching, Gzip/Brotli compression, and security headers.
- **Instant Search with Code Indexing**: Orama client-side search indexing covers headings, paragraphs, and fenced code blocks (`search.indexing.includeCodeBlocks: true`).
- **Machine-Readable AI Discoverability**: Emits `/llms.txt`, `/llms-full.txt`, and per-page `.md` mirrors for LLMs, AI agents, and developer tooling.

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

   Starts the Blume local development server on `http://localhost:4321` with instant hot-module reloading.

3. **Validate site integrity**:

   ```bash
   npm run validate
   ```

   Verifies internal links, redirects, and document structure.

4. **Build for production**:

   ```bash
   npm run build
   ```

   Generates optimized static HTML, search indexes, and `.htaccess` directly into `dist/`.

5. **Preview the production build**:

   ```bash
   npm run preview
   # or specify a custom port:
   npx blume preview --port=8080
   ```

   Spins up a local static file server to test the built output in `dist/` before deployment.

6. **Alternative: Test with Python HTTP Server**:

   Because Blume compiles directly to `dist/` in static mode (rather than `dist/client/`), point Python's HTTP server directly to `dist`:

   ```bash
   python3 -m http.server 8080 -d dist
   ```

---

## Deployment (Apache HTTP Server)

The production build in `dist/` is completely self-contained and drop-in compatible with Apache HTTP Server:

1. Run the build:
   ```bash
   npm run build
   ```

2. Synchronize the `dist/` directory to your web server document root (e.g. `/var/www/html/`):
   ```bash
   rsync -avz --delete dist/ user@webserver:/var/www/html/
   ```

3. Ensure Apache has `mod_rewrite`, `mod_headers`, and `mod_deflate` enabled to take full advantage of the included `.htaccess`.

---

## Staging & Test Deployments

A dedicated staging deployment workflow is available to test documentation builds and verify pre-production changes before deploying to production:

- **Staging URL**: [https://docs-test.xceptance.com](https://docs-test.xceptance.com)
- **Workflow File**: `.github/workflows/deploy-test.yml`

### Automated Triggers

The test deployment workflow triggers automatically on push to:
- `poc-migrate-to-blume` (active migration branch)
- Any branch matching `test/**` (e.g. `test/new-navigation`)
- Any branch matching `preview/**` (e.g. `preview/xlt-8-manual`)

### Manual Trigger via GitHub UI (`workflow_dispatch`)

You can manually trigger a deployment of **any** branch to the staging server:
1. Navigate to the **Actions** tab in the GitHub repository.
2. In the left workflow list, select **Deploy documentation (Test / Staging)**.
3. Click the **Run workflow** dropdown button.
4. Select the target branch you want to build and deploy.
5. (Optional) Provide a deployment note or reason.
6. Click **Run workflow** to initiate the deployment.

### Required Repository Secrets

The test deployment requires three encrypted GitHub Actions repository secrets configured under **Settings** $\rightarrow$ **Secrets and variables** $\rightarrow$ **Actions**:

| Secret Name | Description | Example |
| :--- | :--- | :--- |
| `FTP_TEST_HOST` | Hostname or IP address of the staging FTP server | `ftp.example.com` |
| `FTP_TEST_USERNAME` | FTP username for the staging account | `test-docs-user` |
| `FTP_TEST_PASSWORD` | Password for the staging FTP account | `••••••••••••` |

> [!NOTE]
> **Secret Security & Isolation**: GitHub Actions secrets are encrypted at rest using libsodium sealed boxes, never exposed in workflow run logs (automatically masked with `***`), and bound to the repository rather than individual personal accounts. The test workflow runs under its own concurrency group (`deploy-test-documentation`) and uses separate credentials from the production deployment pipeline (`main.yml`).

---

## Code Block Search Indexing

By default, documentation search indexes headings, titles, and body prose. For developer-focused documentation like XLT and Neodymium, users frequently search for:
- Java property keys (e.g. `com.xceptance.xlt.*`)
- Java annotations (e.g. `@Test`, `@XltTest`)
- XML configuration tags and parameters
- Command-line flags and options

Fenced code block indexing is enabled in `blume.config.ts`:

```ts
search: {
  indexing: {
    includeCodeBlocks: true,
  },
},
```

All fenced code block contents are tokenized into `dist/blume-search.json`, making code snippets instantly searchable via the `⌘K` modal.

---

## AI Discoverability & Model Context Protocol (MCP)

In pure static mode, the documentation site produces complete machine-readable representations alongside standard HTML:

1. **Full Documentation Corpus (`/llms-full.txt`)**: A clean, single-file Markdown export of the entire ~1.9 MB documentation corpus.
2. **Curated Index (`/llms.txt`)**: A high-level overview of core sections, guides, and manuals.
3. **Raw Markdown Mirrors (`/{route}.md`)**: Every documentation page has a raw Markdown mirror accessible by appending `.md` to the URL.
4. **Direct Chat Actions**: Pages include direct links to open the active guide's Markdown in external AI assistants (Claude, ChatGPT, Cursor).

### Exposing Docs as an MCP Resource
Because Blume automatically builds and outputs the complete documentation into `/llms-full.txt`, any Model Context Protocol (MCP) server can easily expose it as an MCP Resource (e.g. `docs://manual` or via resource templates).

This enables AI coding assistants (such as Google Antigravity, Claude Code, Cursor, or VS Code) to read and query the entire documentation corpus directly with zero server-side infrastructure and zero web scraping.

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

Configured in `blume.config.ts` and automatically downloaded and self-hosted at build time by Blume:
- **Headings & Display**: `Roboto Condensed` (`weights: [500, 700]`) — technical, modern sans-serif.
- **Body Text**: `Roboto` — clean, highly readable document prose.
- **Code & Monospace**: `Ubuntu Mono` — monospace for code blocks, CLI snippets, and shortcuts.

### Homepage Architecture (`pages/index.astro`)

The documentation hub homepage is built as a custom full-width page via Blume's `<PageLayout>`:
1. **Corporate Gradient Hero**: High-impact banner styled with `#004682` to `#0f172a` with ambient radial glow.
2. **Prominent Search Launchpad**: Active mouse-clickable search launchpad with dynamic OS keyboard shortcut detection (`⌘K` on Apple devices, `Ctrl K` on Windows/Linux) that triggers Blume's native modal search dialog with full-text and code block indexing.
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
- **Search**: Built-in static index with Orama
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Styling**: Tailwind CSS & Vanilla CSS
- **Typography**: Roboto Condensed, Roboto, and Ubuntu Mono

---

## License

This documentation and its source code are licensed under the [Apache License 2.0](LICENSE).
