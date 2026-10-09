## MODIFIED Requirements

### Requirement: Interactive Card Hub Landing Page
The system SHALL render the documentation hub landing page as a custom full-width page via `pages/index.astro` using `PageLayout` (omitting docs sidebar and table of contents), retaining the primary heading "Documentation Hub", featuring an Xceptance corporate gradient hero banner (`#004682` to `#0f172a`) with an active mouse-clickable search launchpad trigger and platform-adaptive keyboard shortcut badge (`⌘K` on macOS/iOS, `Ctrl K` on Windows/Linux), displaying an MCP server status badge and direct navigation suggestion chips, showcasing XTC, XLT, and Neodymium product cards with descriptions, preview screenshots, and pill-shaped action links, and providing quick wayfinding alongside a dedicated AI Coding Agents & MCP feature section.

#### Scenario: Card hub display
- **WHEN** a user views the documentation hub homepage
- **THEN** the page displays the primary heading "Documentation Hub", a brand-aligned gradient hero banner with an interactive search launchpad and MCP status badge, three distinct product cards (XTC, XLT, Neodymium) with screenshots and pill-shaped action links, a quick-wayfinding section, and an MCP coding agent connection section without displaying the documentation sidebar or table of contents.

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
- **THEN** the page displays an interactive MCP status badge in the hero banner and a dedicated "AI Coding Agents & MCP" section providing instructions, supported tools (Claude Code, Cursor, Windsurf, VS Code), and a 1-click copy button for the CLI connection command using the `xceptance-docs` identifier.

### Requirement: Model Context Protocol (MCP) Server Endpoint
The documentation site SHALL host a live Model Context Protocol (MCP) server endpoint at `/mcp` to allow developer IDE coding agents (such as Claude Code and Cursor) to search, inspect, and retrieve documentation pages and site navigation dynamically across all suite tools (XLT, XTC, and Neodymium) using the unified identifier `xceptance-docs`.

#### Scenario: MCP endpoint availability
- **WHEN** an MCP-compliant client connects via HTTP to `/mcp`
- **THEN** the server establishes an MCP session and advertises available documentation tools including search, page retrieval, and navigation structure across XLT, XTC, and Neodymium.

#### Scenario: Developer MCP usage documentation
- **WHEN** a developer inspects the project `README.md` or homepage MCP section
- **THEN** it documents how to connect IDE assistants (Claude Code, Cursor, Windsurf, and VS Code) to the `/mcp` endpoint using the `xceptance-docs` identifier with copy-and-paste connection commands and settings.

