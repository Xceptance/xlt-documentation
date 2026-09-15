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
The system SHALL render the documentation hub landing page as a custom full-width page via `pages/index.astro` using `PageLayout` (omitting docs sidebar and table of contents), displaying XTC, XLT, and Neodymium product cards with descriptions, preview screenshots, and action links in a responsive grid.

#### Scenario: Card hub display
- **WHEN** a user views the documentation hub homepage
- **THEN** three distinct product cards are displayed in a responsive grid, each containing the tool logo/screenshot, summary, and direct action links to manuals and release notes without displaying the documentation sidebar or table of contents.

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
The system SHALL apply Xceptance brand identity styling across light and dark modes, utilizing primary accent `#a00000`, display font `Outfit`, body font `Inter`, and monospace font `Ubuntu Mono`.

#### Scenario: Typography and accent application
- **WHEN** a documentation page is rendered
- **THEN** headings apply the `Outfit` font family, body copy applies `Inter`, code blocks apply `Ubuntu Mono`, and primary accents utilize `#a00000`.

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

### Requirement: Documentation Page Feedback Rating Suppression
The documentation system SHALL suppress the reader feedback rating widget ("Was this page helpful?") across all documentation pages until an analytics provider or feedback handling backend is explicitly configured.

#### Scenario: Feedback widget suppression
- **WHEN** a reader navigates to any documentation page
- **THEN** the "Was this page helpful?" rating widget and its buttons are not displayed below the article content.

### Requirement: Ask AI Assistant Integration
The documentation site SHALL provide an in-page Ask AI chat assistant integrated into the header navigation, displaying XLT-specific starter question suggestions and routing user queries to a configured streaming endpoint.

#### Scenario: Ask AI button and panel rendering
- **WHEN** a user navigates to any documentation page with Ask AI enabled
- **THEN** the header displays an Ask AI button and opening the panel displays an interactive chat interface.

#### Scenario: Starter question suggestions display
- **WHEN** a user opens the Ask AI chat panel with an empty conversation
- **THEN** three clickable prompt suggestions are displayed: "How do I configure load profiles in XLT?", "How do I evaluate test results?", and "How do I configure DNS settings in XLT?".

#### Scenario: External endpoint delegation
- **WHEN** the environment variable `ASK_AI_ENDPOINT` is provided during build or runtime
- **THEN** the Ask AI chat panel delegates queries to the specified external endpoint URL without requiring server runtime output from the documentation site build.



