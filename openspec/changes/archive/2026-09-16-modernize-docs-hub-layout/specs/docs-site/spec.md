## ADDED Requirements

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

## MODIFIED Requirements

### Requirement: Brand Theme and Styling
The system SHALL apply Xceptance corporate brand identity styling across light and dark modes, utilizing primary corporate blue `#004682`, display font `Roboto Condensed`, body font `Roboto`, monospace font `Ubuntu Mono`, and display the official Xceptance SVG wordmark (`/images/xceptance_only.svg`) in the site header.

#### Scenario: Typography and accent application
- **WHEN** a documentation page is rendered
- **THEN** headings apply the `Roboto Condensed` font family, body copy applies `Roboto`, code blocks apply `Ubuntu Mono`, and primary brand accents utilize `#004682`.

#### Scenario: Header brand logo display
- **WHEN** any documentation page is loaded
- **THEN** the site header displays the official Xceptance SVG mark (`/images/xceptance_only.svg`) paired with the "Docs" title link.

### Requirement: Interactive Card Hub Landing Page
The system SHALL render the documentation hub landing page as a custom full-width page via `pages/index.astro` using `PageLayout` (omitting docs sidebar and table of contents), retaining the primary heading "Documentation Hub", featuring an Xceptance corporate gradient hero banner (`#004682` to `#0f172a`) with a direct search modal launch trigger, displaying XTC, XLT, and Neodymium product cards with descriptions, preview screenshots, and pill-shaped action links, and providing a quick-access wayfinding section for common guide pathways.

#### Scenario: Card hub display
- **WHEN** a user views the documentation hub homepage
- **THEN** the page displays the primary heading "Documentation Hub", a brand-aligned gradient hero banner with an integrated search trigger, three distinct product cards (XTC, XLT, Neodymium) with screenshots and pill-shaped action links to manuals and release notes, and a quick-wayfinding section without displaying the documentation sidebar or table of contents.

#### Scenario: Hero search launch
- **WHEN** a user activates the search bar trigger inside the homepage hero banner
- **THEN** the system opens Blume's native modal search dialog with Ask AI and full-text documentation indexing.

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
