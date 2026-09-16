## MODIFIED Requirements

### Requirement: Interactive Card Hub Landing Page
The system SHALL render the documentation hub landing page as a custom full-width page via `pages/index.astro` using `PageLayout` (omitting docs sidebar and table of contents), featuring a prominent top announcement pill linking to the MCP server endpoint (`Connect your Agent via /mcp (Antigravity, Claude Code...) →`), displaying the primary heading "Documentation Hub", an active mouse-clickable search launchpad trigger and platform-adaptive keyboard shortcut badge (`⌘K` on macOS/iOS, `Ctrl K` on Windows/Linux), direct navigation suggestion chips, showcasing XTC, XLT, and Neodymium product cards with descriptions, preview screenshots, and pill-shaped action links, and providing quick wayfinding alongside a dedicated AI Coding Agents & MCP feature section.

#### Scenario: Card hub display
- **WHEN** a user views the documentation hub homepage
- **THEN** the page displays a top announcement pill for connecting IDE agents, the primary heading "Documentation Hub", a brand-aligned gradient hero banner with an interactive search launchpad and suggested pathway chips, three distinct product cards (XTC, XLT, Neodymium) with screenshots and pill-shaped action links, a quick-wayfinding section, and a dedicated MCP coding agent connection section without displaying the documentation sidebar or table of contents.

#### Scenario: Top hero agent announcement pill
- **WHEN** a user views the hero banner
- **THEN** it displays a top announcement pill stating `Connect your Agent via /mcp (Antigravity, Claude Code...)` that links smoothly to the `#mcp-server-section` on click.

#### Scenario: Hero search launch
- **WHEN** a user activates the search bar trigger inside the homepage hero banner via mouse click or keyboard
- **THEN** the system opens Blume's native modal search dialog with Ask AI and full-text documentation indexing, focusing the search query input.

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
- **THEN** the page displays a dedicated "AI Coding Agents & MCP" section providing instructions, supported tools (Google Antigravity, Claude Code, Cursor, Windsurf, VS Code), and a 1-click copy button for the connection snippets using the `xceptance-docs` identifier.

