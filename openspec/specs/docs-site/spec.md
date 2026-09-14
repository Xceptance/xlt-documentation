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
The system SHALL configure top-level navigation tabs for XLT (`/xlt`), XTC (`/xtc`), and Neodymium (`/neodymium`), dynamically scoping the sidebar navigation to the active product section.

#### Scenario: Section navigation scoping
- **WHEN** a user navigates to a route under `/xlt/`
- **THEN** the XLT header tab is highlighted and the sidebar renders only pages and groups belonging to the XLT section.

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
