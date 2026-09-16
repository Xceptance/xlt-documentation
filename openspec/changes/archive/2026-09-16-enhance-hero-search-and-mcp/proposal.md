## Why

The homepage hero search launchpad ("Search documentation or Ask AI...") cannot currently be activated by mouse click because Blume's `<blume-search>` custom element only binds click events to the trigger button inside the header chrome. Additionally, the keyboard shortcut badge hardcodes macOS `⌘K`, which is unfamiliar to Windows/Linux users who expect `Ctrl K`. Furthermore, while the documentation hub provides a live Model Context Protocol (MCP) server endpoint at `/mcp`, it is not prominently showcased to developers and AI agents on the landing page, and previous connection snippets used `xlt-docs` instead of the comprehensive `xceptance-docs` name.

## What Changes

- **Active Hero Search Activation**: Wire a client-side click handler in `pages/index.astro` that triggers Blume's native modal search dialog (`blume-search [data-blume-search-open]`) with keyboard shortcut fallback.
- **Dynamic OS Keyboard Shortcut Detection**: Detect the client operating system dynamically (matching Blume's header implementation) to display `⌘K` on macOS/iOS and `Ctrl K` on Windows/Linux.
- **Homepage MCP Server Visibility**:
  - Add an interactive MCP status badge / pill in the hero banner informing developers that a live MCP server is available at `/mcp`.
  - Add a dedicated "AI Coding Agents & MCP" feature block to the homepage displaying connection instructions and a 1-click copyable command for Claude Code (`claude mcp add --transport http xceptance-docs https://docs.xceptance.com/mcp`).
  - Keep suggested chips (`Quick Start`, `Load Profiles`, etc.) as direct navigation links.
- **MCP Naming Alignment**: Update references across the landing page and `README.md` to use the unified server name `xceptance-docs` representing XLT, XTC, and Neodymium.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `docs-site`: Update requirements for `Interactive Card Hub Landing Page` to specify active click handling, platform-adaptive shortcut badges, and homepage MCP developer discovery, and update `Model Context Protocol (MCP) Server Endpoint` connection naming to `xceptance-docs`.

## Impact

- `pages/index.astro`: Adds client script for search modal triggering and dynamic OS badge, hero MCP badge, and MCP quick-connect section.
- `README.md`: Updates MCP CLI setup commands from `xlt-docs` to `xceptance-docs` and documents the homepage MCP section.
- Framework compatibility: 100% vanilla Astro and HTML DOM APIs; no modifications to Blume internals, ensuring uninterrupted Blume npm updates.

