# Agent Guidelines for Xceptance Documentation (`xlt-documentation`)

Welcome! This repository hosts the official documentation portal for **XLT** (Xceptance LoadTest), **XTC** (Xceptance Test Center), and **Neodymium**, built with [Blume](https://github.com/blumedocs/blume) on [Astro](https://astro.build/) and [Vite](https://vite.dev/).

---

## 1. Core Architectural Constraints

- **100% Pure Static Output**: Compiles static HTML, CSS, JS, and Orama search indexes into `dist/`. There is **zero Node.js runtime in production**, zero cloud proxies, and zero external backend credentials.
- **Apache Drop-in Compatibility**: The build outputs an Apache `.htaccess` with caching, compression (Gzip/Brotli), and security headers. Do not introduce server-side API endpoints or SSR handlers.
- **AI Discoverability**: Blume automatically generates `/llms.txt`, `/llms-full.txt`, and per-page clean Markdown mirrors (`/{route}.md`). Respect this static pipeline.
- **Code Block Search Indexing**: `blume.config.ts` has `search.indexing.includeCodeBlocks: true`. Java properties (`com.xceptance.xlt.*`), annotations (`@Test`), CLI flags, and XML configs are indexed into `dist/blume-search.json`.

---

## 2. Essential Commands

Always execute commands from the repository root:

| Command | Action | Agent Usage |
| :--- | :--- | :--- |
| `npm run dev` | Starts Blume dev server at `http://localhost:4321` with HMR | Preview local changes live |
| `npm run validate` | Runs `blume validate` | **Mandatory** before concluding any content change |
| `npm run lint:prose` | Runs `vale content/` | Check technical prose quality, style, and terminology |
| `npm run build` | Runs `ASTRO_TELEMETRY_DISABLED=1 blume build` | **Mandatory** to verify clean static compilation into `dist/` |
| `npm run preview` | Runs `blume preview` (or `npx blume preview --port=8080`) | Preview the production bundle |

---

## 3. Repository Structure

```text
xlt-documentation/
├── .agents/                 # Workspace agent customizations
│   ├── skills/              # Blume and OpenSpec skills
│   └── workflows/           # opsx-* OpenSpec change workflows
├── content/en/              # Documentation source root
│   ├── xlt/                 # Xceptance LoadTest documentation
│   ├── xtc/                 # Xceptance Test Center documentation
│   └── neodymium/           # Neodymium test automation framework
├── pages/
│   └── index.astro          # Custom documentation hub homepage (PageLayout)
├── openspec/                # OpenSpec specifications and change proposals
│   └── specs/               # Capability specifications
├── public/                  # Static assets (images, icons, wordmarks)
│   └── images/              # Referenced as /images/...
├── blume.config.ts          # Core Blume configuration (navigation, theme, search)
├── theme.css                # Custom CSS token overrides (content width, icon rules)
└── package.json             # Scripts and blume dependency
```

---

## 4. Content Authoring Guidelines

### 4.1 Frontmatter Standards

Every `.md` and `.mdx` file must begin with YAML frontmatter conforming to Blume's schema:

```yaml
---
title: Load Profile Modeling
description: How to define and tune arrival rate and user count models.
icon: gauge                  # Lucide icon name (for Directory Index Cards)
sidebar:
  label: Load Profiles       # Optional: override sidebar label
  order: 20                  # Optional: explicit numeric sort order
  hidden: false              # Set to true only for empty index placeholders
---
```

### 4.2 Built-in Callout Directives (No Component Imports)

Blume supports native directive callouts. **Do not** import JSX callout components:

```markdown
:::note
Informational note with standard title.
:::

:::tip[Best Practice]
Tip with a custom bracketed title.
:::

:::warning
Cautionary note or critical pitfall.
:::

:::danger
High-priority warning or breaking change alert.
:::

:::info[Role Required]
Contextual requirement or permission indicator.
:::
```

> **Syntax Rule**: Ensure a space or newline follows the directive tag, or use `:::directive[Title]` syntax.

### 4.3 Code Blocks & Shiki Syntax Highlighting

Always specify a valid Shiki language identifier for code blocks. Valid aliases include:
`java`, `properties`, `ini`, `bash`, `cmd`, `xml`, `json`, `yaml`, `ts`, `js`, `html`, `css`, `text`.

Avoid unrecognized syntax tags that cause build validator warnings.

### 4.4 Navigation, Directory Cards & Icons

1. **Chapter & Section Overview Pages**:
   - Set `directory: "card"` in the folder's `meta.ts` to render visual Directory Index Cards for child articles.
   - For historical release notes archives (`/xlt/release-notes`, `/xtc/xtc-release-notes`), set `directory: "none"` to prevent card flood.
2. **Sidebar Navigation Icon Policy**:
   - Sidebar navigation is intentionally kept plain text via `theme.css`.
   - Only the Release Notes section displays a sidebar icon (`megaphone`). Do not attempt to force icons into other sidebar links.
3. **No Emojis in Headings or Labels**:
   - Keep titles, headings, and `sidebar.label` values clean and professional (e.g., use "Release Notes", not "📢 Release Notes").
4. **Introductory Index Pages**:
   - If a folder has an `index.md` with introductory text, set `sidebar.label: Overview` to prevent duplicating the parent group's title.

### 4.5 Internal Linking & Asset Paths

- **Internal Links**: Always use root-relative links (e.g., `[XLT Manual](/xlt/manual/)` or `[Release Notes](/xlt/release-notes/)`). Never use relative dot-paths like `../../manual`.
- **Images**: Store images in `public/images/` and reference them with absolute root paths: `![Diagram](/images/xlt-architecture.png)`.

### 4.6 Prose Quality, Style & Linting (Vale)

All technical documentation must adhere to high clarity, conciseness, and consistent style enforced by [Vale](https://vale.sh/):

1. **Active Voice & Imperative Instructions**:
   - Write instructions in the active voice and imperative mood (*"Configure the agent"* instead of *"The agent should be configured"*).
   - Avoid empty openers (*"There is"*, *"There are"*).
2. **Controlled Sentence Length**:
   - Aim for $\le 20\text{--}22$ words per sentence.
   - Decompose multi-clause run-on sentences into bulleted lists or sequential steps to support non-native English speakers and optimize LLM embeddings (`/llms-full.txt`).
3. **Avoid Weasel Words & Time-Bound Phrasing**:
   - Eliminate vague adverbs (*"completely"*, *"significantly"*, *"fairly"*).
   - Avoid ephemeral temporal markers in reference docs (*"currently in active beta"* $\rightarrow$ *"in active beta"*).
4. **Vocabulary & Terminology Management**:
   - Technical terms, acronyms, and product names (`XLT`, `XTC`, `HtmlUnit`, `WebDriver`, `Groovy`, `Scorecard`) are managed in [`styles/config/vocabularies/XLT/accept.txt`](styles/config/vocabularies/XLT/accept.txt).
   - If Vale flags a valid project name or technical acronym as a misspelling (`Vale.Spelling`), add it to `accept.txt` rather than silencing or disabling the rule.
5. **Agent Workflow for Vale**:
   - Run `npm run lint:prose` or target specific files: `vale content/en/xlt/path/to/file.mdx`.
   - Use the `vale` skill (`.agents/skills/vale/SKILL.md`) for guidance on triaging alerts, fixing prose, and inspecting readability scores (`vale ls-metrics`).

---

## 5. Design Tokens & Accessibility (WCAG 2.1/2.2 AA/AAA)

Follow the corporate styling configured in `blume.config.ts` and `theme.css`:

- **Brand Tokens**:
  - Primary Corporate Blue: `#004682` (Accent)
  - Hover Blue: `#005fb0`
  - Accent / Error Red: `#dc3545`
  - Slate Dark: `#0f172a` (Hero background gradient endpoint)
  - Body Slate: `#334155`
- **Typography**:
  - Display / Headings: `Roboto Condensed` (weights: 500, 700)
  - Body: `Roboto`
  - Code / Monospace: `Ubuntu Mono`
- **Responsive Width**:
  - Displays `< 1536px`: Blume default `42rem` (672px).
  - Displays `>= 1536px` (`2xl`): Overridden to `52rem` (832px) in `theme.css` via `--blume-content-width`.
- **Accessibility**:
  - Maintain WCAG AA/AAA contrast ratios (e.g., `#004682` on white is `9.55:1`).
  - Preserve strict semantic heading hierarchy (`h1` → `h2` → `h3`).
  - Ensure all interactive elements retain visible `:focus-visible` rings.

---

## 6. OpenSpec & Spec-Driven Development

Site architecture, navigation requirements, and features are tracked formally with OpenSpec under `openspec/`:
- **Specifications**: Capability specifications live under `openspec/specs/`.
- **Workflows**: When planning or proposing architectural changes, use the workflows in `.agents/workflows/`:
  - `/opsx-explore`: Explore concepts and audit requirements.
  - `/opsx-propose`: Create formal delta proposals.
  - `/opsx-apply`: Implement tasks systematically.
  - `/opsx-sync`: Synchronize delta specs with the main spec.
  - `/opsx-archive`: Finalize and archive completed changes.

---

## 7. Agent Pre-Completion Checklist

Before finishing any task, you **MUST**:
1. Run `npm run validate` and verify that zero broken links, invalid directives, or frontmatter errors are reported.
2. Run `npm run lint:prose` (or `vale <modified-files>`) to ensure edited prose meets quality, style, and terminology standards without introducing new errors.
3. Run `npm run build` and ensure the site builds cleanly into `dist/`.
4. Check that no unintentional temporary files, broken anchors, or unmapped code blocks were committed.
