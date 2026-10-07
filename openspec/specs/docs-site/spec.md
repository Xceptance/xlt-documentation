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
The system SHALL render the documentation hub landing page as a custom full-width page via `pages/index.astro` using `PageLayout` (omitting docs sidebar and table of contents), featuring the primary heading "Documentation Hub", an active mouse-clickable search launchpad trigger and platform-adaptive keyboard shortcut badge (`⌘K` on macOS/iOS, `Ctrl K` on Windows/Linux), direct navigation suggestion chips, showcasing XTC, XLT, and Neodymium product cards with descriptions, preview screenshots, and pill-shaped action links, and providing quick wayfinding without dynamic server connection widgets.

#### Scenario: Card hub display
- **WHEN** a user views the documentation hub homepage
- **THEN** the page displays the primary heading "Documentation Hub", a brand-aligned gradient hero banner with an interactive search launchpad and suggested pathway chips, three distinct product cards (XTC, XLT, Neodymium) with screenshots and pill-shaped action links, and a quick-wayfinding section without displaying the documentation sidebar, table of contents, or dynamic server widgets.

#### Scenario: Top hero agent announcement pill
- **WHEN** a user views the hero banner
- **THEN** the top announcement pill for server-side `/mcp` endpoints is removed to reflect pure static hosting.

#### Scenario: Hero search launch
- **WHEN** a user activates the search bar trigger inside the homepage hero banner via mouse click or keyboard
- **THEN** the system opens Blume native modal search dialog with full-text documentation and code block indexing, focusing the search query input.

#### Scenario: Platform-adaptive keyboard shortcut hint
- **WHEN** the homepage is viewed on a macOS or iOS device
- **THEN** the hero search badge displays the Mac shortcut `⌘K`.
- **WHEN** the homepage is viewed on a Windows, Linux, or other non-Apple device
- **THEN** the hero search badge displays the keyboard shortcut `Ctrl K`.

#### Scenario: Suggested pathway chips
- **WHEN** a user clicks on any suggested chip in the hero banner (such as "Quick Start", "Load Profiles", "XTC Cloud", or "Neodymium")
- **THEN** the browser navigates directly to the corresponding documentation page.

#### Scenario: Homepage MCP agent discovery section
- **WHEN** a developer views the homepage
- **THEN** dynamic server-rendered `/mcp` terminal tabs and copy buttons are removed, focusing the landing page on documentation discovery and search.

### Requirement: Native Directives and MDX Callouts
The system SHALL parse and render callout directives (`:::note`, `:::warning`, `:::tip`, `:::danger`, `:::info`) in `.mdx` files without requiring explicit component imports.

#### Scenario: Role permission callout rendering
- **WHEN** an MDX document contains a `:::info[Role Required]` directive
- **THEN** the system renders a styled informational callout with the title "Role Required" and the enclosed role requirement text.

### Requirement: Internal Link Integrity
The system SHALL resolve all internal links, anchor targets, and referenced static assets to valid destinations, eliminating all validator warnings and broken references across documentation pages.

#### Scenario: Strict link validation
- **WHEN** the validation command `blume validate --strict` is executed
- **THEN** the process exits with status code 0 and reports zero broken internal links, anchor targets, or missing images.

#### Scenario: Standard validation cleanliness
- **WHEN** the validation command `npm run validate` (or `blume validate`) is executed
- **THEN** the process completes successfully with zero warnings and zero errors reported across all documentation content.

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
The system SHALL validate all page frontmatter against Blume strict schema and generate a pure static production build in `dist/` ready for standard web server hosting (Apache, Nginx, or S3/CDN) with zero Node.js server runtime dependency.

#### Scenario: Strict build execution
- **WHEN** `blume build` is run against the documentation source
- **THEN** the static HTML output, asset bundles, and search index are generated directly in `dist/` without any frontmatter schema errors or dropped pages.

#### Scenario: Static Apache hosting compatibility
- **WHEN** the contents of `dist/` are deployed to an Apache web server
- **THEN** the bundled `.htaccess` provides URL rewriting, gzip/deflate compression, and custom 404 handling without server-side execution.

### Requirement: Contributor Documentation and Authoring Guidance
The repository SHALL provide contributor setup instructions, local development commands, Blume Markdown/MDX authoring conventions, code search indexing details, and a Hugo/Docsy feature comparison in the repository root `README.md` and pull request documentation rather than within user-facing product documentation.

#### Scenario: Contributor guidance availability
- **WHEN** a contributor views `README.md`
- **THEN** it provides accurate prerequisites for Node.js, standard npm commands for Blume (`dev`, `build`, `validate`, `preview`), documentation formatting conventions including callout directives, and search indexing options.

#### Scenario: Ask AI retrieval parameter documentation
- **WHEN** a contributor or developer inspects `README.md`
- **THEN** it documents that dynamic Ask AI retrieval and Vertex AI proxies are retired in favor of pure static hosting and code-inclusive search indexing.

#### Scenario: Theme tokens and WCAG layout documentation
- **WHEN** a contributor or developer inspects `README.md`
- **THEN** it documents the Xceptance corporate theme tokens (colors, typography, logo), the homepage layout architecture in `pages/index.astro`, and the WCAG 2.1 AA/AAA contrast and accessibility standards applied across the site.

#### Scenario: Hugo and Docsy comparison documentation
- **WHEN** a maintainer or stakeholder reviews the migration documentation or pull request description
- **THEN** it provides a clear, structured comparison of search performance, frontend footprint (0 KB JS reading vs. Bootstrap/Lunr), authoring syntax (directives vs. shortcodes), and static deployment simplicity.

#### Scenario: Static AI and machine-readable docs documentation
- **WHEN** a developer inspects the project documentation
- **THEN** it documents the availability of `/llms-full.txt`, `/llms.txt`, and raw `.md` mirrors, and notes the ability to mount `/llms-full.txt` as a resource in an MCP server.

### Requirement: Documentation Page Feedback Rating Suppression
The documentation system SHALL suppress the reader feedback rating widget ("Was this page helpful?") across all documentation pages until an analytics provider or feedback handling backend is explicitly configured.

#### Scenario: Feedback widget suppression
- **WHEN** a reader navigates to any documentation page
- **THEN** the "Was this page helpful?" rating widget and its buttons are not displayed below the article content.

### Requirement: Open in External Chat Assistants
The documentation site SHALL provide direct page actions to open the current document's raw Markdown mirror in supported external AI chat tools, configured for Claude, ChatGPT, and Cursor.

#### Scenario: External chat action triggering
- **WHEN** a user clicks an "Open in" option from the page actions menu
- **THEN** the browser opens the chosen assistant (Claude, ChatGPT, or Cursor) pre-filled with a prompt referencing the current page's raw Markdown URL.

### Requirement: Code Block Search Indexing
The documentation search system SHALL index fenced code block content during build time, enabling readers to search for technical identifiers, configuration property keys, class names, annotations, XML tags, and CLI options.

#### Scenario: Code block identifier search
- **WHEN** a user searches for a configuration property, class name, or CLI option defined inside a fenced code block via the search dialog (`⌘K`)
- **THEN** the search engine matches the term, ranks the containing document in the search results, and displays the code context in the result excerpt.

#### Scenario: Code indexing configuration
- **WHEN** `search.indexing.includeCodeBlocks` is set to `true` in `blume.config.ts`
- **THEN** the build compiles the code block content into the static client search index (`blume-search.json`) without indexing raw code fence backticks or language tags.

### Requirement: Static Machine-Readable AI Artifacts Generation
The documentation build SHALL generate self-contained, machine-readable artifacts (`/llms-full.txt`, `/llms.txt`, and per-page `.md` mirrors) in the static root to enable external developer tools, coding assistants, search engines, and MCP servers to consume documentation without requiring a separate live Blume server runtime.

#### Scenario: Full corpus export generation
- **WHEN** the static build command `blume build` is executed
- **THEN** the build emits `/llms-full.txt` containing the complete, structured Markdown documentation corpus of all published pages, formatted for ingestion as a single MCP resource or long-context LLM prompt.

#### Scenario: Raw Markdown mirror resolution
- **WHEN** an external tool or coding agent requests documentation by route
- **THEN** the static web server serves the clean Markdown mirror directly at `/{route}.md` without web scraping or HTML parsing.

### Requirement: Release Notes Hub and Navigation Icon
The documentation system SHALL render `/xlt/release-notes/` as a structured Release Hub in MDX featuring a spotlight section for the latest release series, a card grid for recent releases, and collapsible accordions for historical archives. The system SHALL display the section title and sidebar label without emoji characters and display a standard megaphone icon.

#### Scenario: Clean title and standard navigation icon
- **WHEN** a user views the Release Notes page or navigates the XLT sidebar
- **THEN** the page title and sidebar label display "Release Notes" without the raw megaphone emoji `📢`, and the navigation entry displays the standard Lucide megaphone icon.

#### Scenario: Latest release spotlight
- **WHEN** a user visits `/xlt/release-notes/`
- **THEN** the page renders a prominent spotlight card for XLT 10.0.x summarizing key features (Java 21 virtual threads, dynamic overview charts, moving averages, private machine mode) and linking directly to the XLT 10.0.x release notes.

#### Scenario: Recent release series card grid
- **WHEN** a user views the recent releases section on the Release Notes Hub
- **THEN** the system displays a responsive grid of cards for recent release series (such as XLT 9.2.x, 9.1.x, 9.0.x, and 8.x) with version summaries and links to their respective release documents.

#### Scenario: Collapsible historical archive
- **WHEN** a user views older release series on the Release Notes Hub
- **THEN** release series from XLT 7.x down to 3.x are organized inside collapsible accordion sections, preserving access to all historical release documents without cluttering the main view.

