# docs-site Specification

## Purpose

Provides the documentation website architecture, content rendering, search, navigation tabs, and build validation for Xceptance tools (XLT, XTC, and Neodymium).

## Requirements

### Requirement: Content Root & Layout
The system SHALL mount documentation content from `content/en` as the content root and serve pages relative to the site base path.

#### Scenario: Root route rendering
- **WHEN** a user navigates to the root URL `/`
- **THEN** the system serves the documentation hub landing page rendered from `pages/index.astro`.

### Requirement: Multi-Product Navigation Tabs
The system SHALL configure top-level navigation tabs for XLT (`/xlt`), XTC (`/xtc`), and Neodymium (`/neodymium`), dynamically scoping the sidebar navigation strictly to active product documentation (excluding website tooling and demo pages), ordering and labeling section chapters according to configured section metadata, rendering section groups as collapsible accordion subtrees, hiding empty index placeholders from sidebar navigation, and displaying standalone topics as direct page links.

#### Scenario: Section navigation scoping
- **WHEN** a user navigates to a route under `/xlt/`
- **THEN** the XLT header tab is highlighted and the sidebar renders only pages and groups belonging to the XLT section without falling back to top-level site links.

#### Scenario: Section chapter ordering and labeling
- **WHEN** a user views the XLT sidebar navigation
- **THEN** the top-level chapters are displayed in the configured logical order: About, Quick Start, Base Manual, Advanced, Test Suites, Release Notes, How-Tos, and Knowledge Base.

#### Scenario: Product chapter content scoping
- **WHEN** a user navigates the XLT About chapter
- **THEN** the sidebar and section display genuine product documentation pages and omit legacy website framework credits or demo pages.

#### Scenario: Collapsible group disclosure and state
- **WHEN** a user views the sidebar navigation for any product section
- **THEN** section groups render as collapsible accordion disclosure trees with chevrons, keeping the group for the active route open and all other groups collapsed by default, and allowing users to expand or collapse groups without navigating away.

#### Scenario: Empty section index placeholder suppression
- **WHEN** a section group contains an `index.md` placeholder with no body content (such as `integrations`, `loadtesting`, or `manual`)
- **THEN** the placeholder is hidden from the sidebar navigation tree and the group displays only its actual child content pages, preventing duplicate headings and links to blank pages.

#### Scenario: Meaningful section introduction labeling
- **WHEN** a section group contains an `index.md` with introductory body text (such as `xtc/basics`, `xlt/about`, or `xlt/test-suites`)
- **THEN** the landing page link is labeled "Overview" in the sidebar rather than duplicating the section group heading.

#### Scenario: Standalone page representation
- **WHEN** a topic consists of a single document with no child subpages (such as `xtc/privacy`)
- **THEN** the item renders as a direct single page link in the sidebar rather than a collapsible group.

### Requirement: Interactive Card Hub Landing Page
The system SHALL render the documentation hub landing page as a custom full-width page via `pages/index.astro` using `PageLayout` (omitting docs sidebar and table of contents), retaining the primary heading "Documentation Hub", featuring an Xceptance corporate gradient hero banner (`#004682` to `#0f172a`) with a direct search modal launch trigger, displaying XTC, XLT, and Neodymium product cards with descriptions, preview screenshots, and pill-shaped action links, and providing a quick-access wayfinding section for common guide pathways.

#### Scenario: Card hub display
- **WHEN** a user views the documentation hub homepage
- **THEN** the page displays the primary heading "Documentation Hub", a brand-aligned gradient hero banner with an integrated search trigger, three distinct product cards (XTC, XLT, Neodymium) with screenshots and pill-shaped action links to manuals and release notes, and a quick-wayfinding section without displaying the documentation sidebar or table of contents.

#### Scenario: Hero search launch
- **WHEN** a user activates the search bar trigger inside the homepage hero banner
- **THEN** the system opens Blume's native modal search dialog with Ask AI and full-text documentation indexing.

### Requirement: Native Directives and MDX Callouts
The system SHALL parse and render callout directives (`:::note`, `:::warning`, `:::tip`, `:::danger`, `:::info`) in `.mdx` files without requiring explicit component imports.

#### Scenario: Role permission callout rendering
- **WHEN** an MDX document contains a `:::info[Role Required]` directive
- **THEN** the system renders a styled informational callout with the title "Role Required" and the enclosed role requirement text.

### Requirement: Internal Link Integrity
The system SHALL resolve all internal links to valid content routes and asset targets.

#### Scenario: Strict link validation
- **WHEN** the validation command `blume validate --strict` is executed
- **THEN** the process exits with status code 0 and reports zero broken internal links, anchor targets, or missing images.

### Requirement: Brand Theme and Styling
The system SHALL apply Xceptance corporate brand identity styling across light and dark modes, utilizing primary corporate blue `#004682`, display font `Roboto Condensed`, body font `Roboto`, monospace font `Ubuntu Mono`, and display the official Xceptance SVG wordmark (`/images/xceptance_only.svg`) in the site header.

#### Scenario: Typography and accent application
- **WHEN** a documentation page is rendered
- **THEN** headings apply the `Roboto Condensed` font family, body copy applies `Roboto`, code blocks apply `Ubuntu Mono`, and primary brand accents utilize `#004682`.

#### Scenario: Header brand logo display
- **WHEN** any documentation page is loaded
- **THEN** the site header displays the official Xceptance SVG mark (`/images/xceptance_only.svg`) paired with the "Docs" title link.

### Requirement: WCAG Accessibility Conformance
The documentation hub and theme SHALL conform to WCAG 2.1 / 2.2 Level AA requirements (and Level AAA for text contrast), ensuring minimum 4.5:1 contrast for normal text and 3:1 for large text / UI elements across light and dark modes, providing visible keyboard focus rings on all interactive elements, maintaining strict semantic heading hierarchy, and specifying descriptive accessible names for all controls and imagery.

#### Scenario: Color contrast compliance
- **WHEN** text or interactive elements are rendered in light or dark mode
- **THEN** body text against backgrounds satisfies at least 4.5:1 contrast, the primary brand accent `#004682` against white satisfies at least 7.0:1 contrast (exceeding AAA), buttons with brand accent backgrounds pair with white foreground text satisfying at least 7.0:1 contrast, and hero banner text against the `#004682` to `#0f172a` gradient satisfies at least 7.0:1 contrast.

#### Scenario: Keyboard focus indicators
- **WHEN** a user navigates interactive elements using keyboard navigation (Tab / Shift+Tab)
- **THEN** every focused link, button, and search trigger displays a visible focus ring with clear boundary separation.

#### Scenario: Semantic heading and landmark hierarchy
- **WHEN** assistive technology parses the homepage
- **THEN** the document structure begins with a single `h1` ("Documentation Hub"), follows with `h2` for major layout sections, and `h3` for individual tool cards.

### Requirement: Build and Schema Conformance
The system SHALL validate all page frontmatter against Blume's strict schema and generate a static production build.

#### Scenario: Strict build execution
- **WHEN** `blume build --strict` is run against the documentation source
- **THEN** the static HTML output is generated in `dist/` without any frontmatter schema errors or dropped pages.

### Requirement: Contributor Documentation and Authoring Guidance
The repository SHALL provide contributor setup instructions, local development commands, and Blume Markdown/MDX authoring conventions in the repository root `README.md` rather than within user-facing product documentation.

#### Scenario: Contributor guidance availability
- **WHEN** a contributor views `README.md`
- **THEN** it provides accurate prerequisites for Node.js, npm commands for Blume (`dev`, `build`, `validate`), and documentation formatting conventions including callout directives.

#### Scenario: Ask AI retrieval parameter documentation
- **WHEN** a contributor or developer inspects `README.md`
- **THEN** it documents the Ask AI retrieval parameters (`excerptChars`, `contextBudget`, `maxResults`), explains why they were tuned for the repository's documentation corpus (4,067-char median guide size) and `gemini-3.8-flash`, and references the official Blume Ask AI retrieval size documentation.

#### Scenario: Theme tokens and WCAG layout documentation
- **WHEN** a contributor or developer inspects `README.md`
- **THEN** it documents the Xceptance corporate theme tokens (colors, typography, logo), the homepage layout architecture in `pages/index.astro`, and the WCAG 2.1 AA/AAA contrast and accessibility standards applied across the site.

### Requirement: Documentation Page Feedback Rating Suppression
The documentation system SHALL suppress the reader feedback rating widget ("Was this page helpful?") across all documentation pages until an analytics provider or feedback handling backend is explicitly configured.

#### Scenario: Feedback widget suppression
- **WHEN** a reader navigates to any documentation page
- **THEN** the "Was this page helpful?" rating widget and its buttons are not displayed below the article content.

### Requirement: Ask AI Assistant Integration
The documentation site SHALL provide an in-page Ask AI chat assistant integrated into the header navigation, displaying XLT-specific starter question suggestions and routing user queries to Blume's built-in OpenAI-compatible chat backend configured for Kilo Gateway and Google Gemini, or to an optional external endpoint when specified.

#### Scenario: Ask AI button and panel rendering
- **WHEN** a user navigates to any documentation page with Ask AI enabled
- **THEN** the header displays an Ask AI button and opening the panel displays an interactive chat interface.

#### Scenario: Starter question suggestions display
- **WHEN** a user opens the Ask AI chat panel with an empty conversation
- **THEN** three clickable prompt suggestions are displayed: "How do I configure load profiles in XLT?", "How do I evaluate test results?", and "How do I configure DNS settings in XLT?".

#### Scenario: Native gateway query routing
- **WHEN** a user submits a question through the Ask AI chat panel
- **THEN** the system processes the request through Blume's internal RAG retrieval pipeline, builds dynamic documentation context excerpts, and streams the answer from Kilo Gateway using `google/gemini-3.8-flash` via the configured `KILO_API_KEY`.

#### Scenario: Corpus-optimized RAG retrieval sizing
- **WHEN** Blume constructs the grounded context prompt for an Ask AI query
- **THEN** the retrieval pipeline uses an excerpt window of up to 4,500 characters per document, a total context budget of 32,000 characters, and up to 6 search results so that complete guide pages and code examples are provided to `google/gemini-3.8-flash` without truncation or dropped search hits.

#### Scenario: External endpoint delegation
- **WHEN** the environment variable `ASK_AI_ENDPOINT` is provided during build or runtime
- **THEN** the Ask AI chat panel delegates queries to the specified external endpoint URL instead of the default gateway provider.

### Requirement: Model Context Protocol (MCP) Server Endpoint
The documentation site SHALL host a live Model Context Protocol (MCP) server endpoint at `/mcp` to allow developer IDE coding agents (such as Claude Code and Cursor) to search, inspect, and retrieve documentation pages and site navigation dynamically.

#### Scenario: MCP endpoint availability
- **WHEN** an MCP-compliant client connects via HTTP to `/mcp`
- **THEN** the server establishes an MCP session and advertises available documentation tools including search, page retrieval, and navigation structure.

#### Scenario: Developer MCP usage documentation
- **WHEN** a developer inspects the project `README.md`
- **THEN** it documents how to connect IDE assistants (Claude Code, Cursor, and VS Code) to the `/mcp` endpoint with copy-and-paste connection commands and settings.

### Requirement: Open in External Chat Assistants
The documentation site SHALL provide direct page actions to open the current document's raw Markdown mirror in supported external AI chat tools, configured for Claude, ChatGPT, and Cursor.

#### Scenario: External chat action triggering
- **WHEN** a user clicks an "Open in" option from the page actions menu
- **THEN** the browser opens the chosen assistant (Claude, ChatGPT, or Cursor) pre-filled with a prompt referencing the current page's raw Markdown URL.

### Requirement: Secret and API Key Git Hygiene
The documentation project SHALL exclude all real API keys, secret-bearing environment files (including `KILO_API_KEY`), and local credential stores from Git version control, maintaining only non-sensitive placeholder templates in `.env.example`.

#### Scenario: Git exclusion of environment secrets
- **WHEN** git status or repository changes are inspected with local `.env` or `.env.*` files present
- **THEN** all actual secret files are ignored by git and prevented from being staged or committed.

#### Scenario: Configuration references environment variable name only
- **WHEN** `blume.config.ts` is configured for Ask AI
- **THEN** the configuration specifies `apiKeyEnv: "KILO_API_KEY"` (the name of the environment variable) and contains no raw API keys or token strings.



