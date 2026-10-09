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
The system SHALL configure top-level navigation tabs for XLT (`/xlt`), XTC (`/xtc`), and Neodymium (`/neodymium`), dynamically scoping the sidebar navigation strictly to active product documentation (excluding website tooling and demo pages), ordering and labeling section chapters according to configured section metadata, rendering section groups as collapsible accordion subtrees, rendering topic chapter landing pages as visual Directory Index Card catalogs of child articles, hiding empty index placeholders from sidebar navigation, and displaying standalone topics as direct page links.

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

#### Scenario: Directory Index Cards on chapter landing pages
- **WHEN** a user navigates to a topic chapter landing page (such as `/xlt/about`, `/xlt/manual`, `/xlt/advanced`, `/xlt/how-tos`, `/xlt/knowledgebase`, `/xtc/basics`, `/xtc/loadtesting`, `/xtc/monitoring`, or Neodymium chapters)
- **THEN** the page renders a visual Directory Index Card grid of its child articles with titles, icons, and descriptions, transforming previously empty or minimal landing pages into navigational catalogs.

#### Scenario: Suppression of directory cards for changelog archives
- **WHEN** a user navigates to a release notes or historical changelog section (such as `/xlt/release-notes` or `/xtc/xtc-release-notes`)
- **THEN** the page does not generate an unpaginated card flood and instead retains its structured accordion release-series layout or sidebar list navigation.

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
The system SHALL parse and render callout directives (`:::note`, `:::warning`, `:::tip`, `:::danger`, `:::info`) in `.mdx` files without requiring explicit component imports, and SHALL enforce well-formed directive opening syntax and valid Shiki code block language identifiers.

#### Scenario: Role permission callout rendering
- **WHEN** an MDX document contains a `:::info[Role Required]` directive
- **THEN** the system renders a styled informational callout with the title "Role Required" and the enclosed role requirement text.

#### Scenario: Callout directive syntax formatting
- **WHEN** an MDX document contains a directive callout such as `:::note` or `:::warning`
- **THEN** the opening fence is separated from body content by whitespace or newline, or provides an explicit bracketed title `:::note[Title]`, preventing unrecognized directive names or discarded opening text.

#### Scenario: Supported code block syntax highlighting languages
- **WHEN** a fenced code block specifies a programming or configuration language
- **THEN** the language matches a valid Shiki language identifier or alias (such as `bash`, `cmd`, `java`, `properties`, `ini`, or `text`), avoiding unmapped fallback warnings during build validation.

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
The documentation system SHALL render Release Hubs in MDX for XLT (`/xlt/release-notes/`), XTC (`/xtc/xtc-release-notes/`), and Neodymium (`/neodymium/release-notes/`), each featuring a spotlight section for the latest release, a card grid for recent releases, and collapsible accordions for historical archives. The system SHALL display clean section titles and sidebar labels without emoji characters, display the standard Lucide megaphone icon across all three products, set `sidebar.label: Overview` on each landing page, and preserve complete sidebar visibility for all individual release files.

#### Scenario: Clean title and standard navigation icon
- **WHEN** a user views any Release Notes section or navigates the sidebar in XLT, XTC, or Neodymium
- **THEN** all section titles and sidebar labels display "Release Notes" without emoji characters (e.g., removing `📢` from XTC), each section metadata defines `icon: "megaphone"` and `directory: "none"`, and each landing page defines `sidebar.label: Overview`.

#### Scenario: Latest release spotlight
- **WHEN** a user visits a product's Release Notes landing page
- **THEN** the page renders a prominent spotlight card for the latest release (XLT 10.0.x, XTC v117, or Neodymium 5.3.0) summarizing key marquee features and linking directly to the corresponding release notes document.

#### Scenario: Recent release series card grid
- **WHEN** a user views the recent releases section on any product's Release Notes Hub
- **THEN** the system displays a responsive 2-column card grid summarizing recent stable releases (XLT 9.2.x–8.x, XTC v116–v113, Neodymium 5.2.0–4.x) with feature descriptions and links.

#### Scenario: Collapsible historical archive
- **WHEN** a user views older release series on any product's Release Notes Hub
- **THEN** earlier releases are organized inside collapsible accordion sections categorized by major series or platform eras (such as 6 era brackets for XTC and 5 series brackets for Neodymium), providing direct links to historical release notes while keeping the initial page layout clean.

#### Scenario: Complete sidebar release visibility and URL preservation
- **WHEN** a user navigates the sidebar tree or accesses bookmarked links
- **THEN** all individual release note documents (including all 102 XTC releases and 10 Neodymium releases) remain directly visible in the sidebar navigation without `sidebar.hidden: true`, and the existing path `/xtc/xtc-release-notes/` remains intact without redirection or broken bookmarks.

### Requirement: Standard Site Footer and Navigation Hygiene
The system SHALL render a standard site footer across all documentation pages featuring corporate copyright, company links (Blog, Website, Privacy Policy, Imprint), and social profile icons (GitHub, LinkedIn, X), while maintaining a clean top header navigation focused on documentation products.

#### Scenario: Footer content and social links
- **WHEN** any documentation page is rendered
- **THEN** the page footer displays the current corporate copyright notice, navigation links for Blog, Xceptance, Privacy Policy, and Imprint, and brand social profile icons for GitHub, LinkedIn, and X.

#### Scenario: Header navigation decluttering
- **WHEN** the top header navigation is rendered
- **THEN** external repository and blog links are removed from `navigation.featured` in favor of the dedicated site footer.

### Requirement: Enhanced Markdown External Links and Metadata
The system SHALL automatically decorate all external markdown links with new-tab targets, visual indicators, and accessibility hints, SHALL display Git commit-derived "Last updated" timestamps on documentation pages, and SHALL provide reader-facing PDF export actions.

#### Scenario: External link decoration and new tab behavior
- **WHEN** a documentation page contains a link pointing to an external domain (e.g. `https://www.xceptance.com/`)
- **THEN** the link renders with `target="_blank"`, `rel="noreferrer"`, an external link icon, and screen-reader accessibility announcements.

#### Scenario: Git commit last-modified timestamp
- **WHEN** a user views a documentation page
- **THEN** the page displays a "Last updated" date stamp derived from the page's Git commit history.

#### Scenario: Reader PDF export action
- **WHEN** a user views the reader page action bar
- **THEN** an "Export as PDF" action is available alongside AI chat assistant actions.

### Requirement: Configuration Snippet Language Annotation
The system SHALL annotate Java properties configuration snippets with the `properties` language identifier (and include descriptive file titles such as `title="project.properties"` when the target configuration file is referenced in surrounding context), and SHALL reserve shell languages (`bash`, `sh`, `console`) exclusively for executable command-line demonstrations and shell scripts.

#### Scenario: Java properties configuration snippet formatting
- **WHEN** documentation displays Java property key-value configurations or settings
- **THEN** the code block fence specifies `properties` rather than `bash` or `sh`, rendering Java property syntax coloring and omitting shell terminal icons.

#### Scenario: Contextual configuration file title attribution
- **WHEN** a configuration snippet pertains to a specific file identified in surrounding context (such as `project.properties`, `default.properties`, `dev.properties`, or `reportgenerator.properties`)
- **THEN** the code block fence includes `title="<filename>"` in its fence meta to display the file name in the block header tab.

#### Scenario: Executable command code fence reservation
- **WHEN** documentation illustrates command-line commands to be executed in a shell
- **THEN** the code block fence uses `bash`, `sh`, or `console` to accurately reflect executable terminal input.

### Requirement: Migration Parity and Read-Only Verification
The documentation verification tool SHALL verify content parity between the pre-migration `develop` branch baseline and current documentation files without modifying, deleting, formatting, or creating any files in the documentation content directories.

#### Scenario: Non-destructive verification execution
- **WHEN** the content parity verification script is executed against a Git baseline
- **THEN** all files under `content/en/` and site configuration files retain identical checksums, timestamps, and git status before and after execution.

#### Scenario: Baseline branch selection
- **WHEN** the content parity verification script is executed
- **THEN** the script fetches baseline content from the `develop` branch (resolving `develop` or `origin/develop`), supports overriding the target reference via `--base <ref>`, and aborts with a descriptive error message if the reference cannot be resolved.

### Requirement: Syntax Normalization and Equivalence Comparison
The verification system SHALL normalize framework-specific syntax variations between Hugo and Blume prior to diffing, ensuring true markdown prose and semantic equivalence is measured without false positives from structural syntax migration.

#### Scenario: Shortcode and directive equivalence
- **WHEN** comparing Hugo callout shortcodes (`{{% note %}}`, `{{% warning %}}`, `{{% tip %}}`, `{{% danger %}}`) against Blume directives (`:::note`, `:::warning`, `:::tip`, `:::danger`)
- **THEN** the normalizer treats them as equivalent semantic blocks and verifies that the enclosed markdown prose matches identically.

#### Scenario: Inline shortcode normalization
- **WHEN** baseline content contains Hugo inline shortcodes (`{{< relref >}}`, `{{< image >}}`, `{{% kbd %}}`, `{{% ctext %}}`, `{/* TODO */}`)
- **THEN** the normalizer extracts the inner text, link targets, or keyboard keys to compare against standard Blume markdown links and formatted inline text.

#### Scenario: Code block body fidelity
- **WHEN** documentation code fences differ in language metadata annotations (such as Hugo `bash` or `sh` updated to Blume `properties title="project.properties"`)
- **THEN** the comparison ignores fence language tag differences and strictly asserts that every line within the code fence body matches identically.

#### Scenario: Frontmatter normalization
- **WHEN** baseline frontmatter contains navigation weight or link title properties that were migrated to Blume `meta.ts`
- **THEN** the normalizer validates page title and frontmatter parity while ignoring migrated sidebar ordering properties.

### Requirement: Inventory Reconciliation and Path Mapping
The verification system SHALL account for all historical files present in the Git baseline against current Blume files, tracking renames, flattening, deliberate removals, and additions.

#### Scenario: Release note version prefix mapping
- **WHEN** auditing release notes previously named `{number}.md` in Hugo that were renamed to `v{number}.md` in Blume
- **THEN** the system maps the pre-migration path to the renamed Blume path and verifies content parity.

#### Scenario: Index file flattening
- **WHEN** auditing Hugo section indices (`_index.md`) that were restructured to Blume (`index.md`)
- **THEN** the system maps the file paths and verifies the content parity.

#### Scenario: Inventory reconciliation accounting
- **WHEN** inventory includes known pruned demo pages (e.g., Hugo theme demo pages `xlt/about/000-demo`, `software.md`, `search.md`) or new Blume `meta.ts` navigation files
- **THEN** the system classifies them as deliberate structural adjustments rather than missing or orphaned documentation.

### Requirement: Parity Audit Reporting and Documentation
The verification system SHALL generate a documented audit report detailing verification methodology, normalizations applied, coverage statistics, and detailed diffs for any detected discrepancies.

#### Scenario: Comprehensive audit summary output
- **WHEN** the verification script completes
- **THEN** it outputs an audit report summarizing total pre-migration files, total Blume files, 100% matched pages, normalized matches, deliberate inventory changes, and discrepancy counts.

#### Scenario: Discrepancy reporting and diagnostics
- **WHEN** unintended textual divergence or content loss is detected in a document
- **THEN** the audit report records the exact file path, line numbers, and a contextual unified diff illustrating the missing or altered text, exiting with a non-zero exit code.



