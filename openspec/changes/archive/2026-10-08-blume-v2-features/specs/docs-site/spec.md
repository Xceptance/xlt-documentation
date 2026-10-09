# Spec Delta: docs-site

## MODIFIED Requirements

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

## ADDED Requirements

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

