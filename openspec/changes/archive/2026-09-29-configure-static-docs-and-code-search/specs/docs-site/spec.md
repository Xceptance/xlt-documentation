## ADDED Requirements

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

## MODIFIED Requirements

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

## REMOVED Requirements

### Requirement: Ask AI Assistant Integration
The documentation site SHALL NOT host an active server process or live Vertex AI gateway proxy for dynamic chat, relying instead on static full-text search with code block indexing and machine-readable exports.

### Requirement: Model Context Protocol (MCP) Server Endpoint
The documentation site SHALL NOT host a live server-side `/mcp` streaming endpoint, relying instead on static machine-readable documentation files (`/llms-full.txt` and raw `.md` mirrors) for external tool ingestion.

### Requirement: Secret and API Key Git Hygiene
The documentation project SHALL NOT require or manage Google Cloud project credentials, IAM tokens, or `.env` configuration files for documentation hosting.
