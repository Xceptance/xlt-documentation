## Why

In the current documentation hub hero banner, having both a wide search input and a wide MCP server pill stacked vertically creates visual repetition (multiple translucent oval pills) and dilutes the hero's visual hierarchy. In addition, developers increasingly interact with documentation through agentic IDEs rather than manual browsing. Elevating the MCP server discovery to an interactive top announcement pill highlights this capability immediately while giving the search launchpad and suggested pathway chips clean, unobstructed focus.

## What Changes

- **Hero Top Announcement Pill**: Replace the static suite badge with an interactive announcement link to `#mcp-server-section`: `Connect your Agent via /mcp (Antigravity, Claude Code...) →`.
- **Remove Redundant Bottom Pill**: Delete the bottom MCP pill positioned underneath the suggested chips, eliminating shape and component repetition.
- **Hero Visual Hierarchy**: Ensure the hero banner presents a clear progression: Top Announcement Pill -> Heading & Subtitle -> Hero Search Launchpad -> Suggested Pathway Chips.

## Capabilities

### New Capabilities
<!-- No new capabilities introduced -->

### Modified Capabilities
- `docs-site`: Update `Interactive Card Hub Landing Page` requirement scenarios to reflect the top-banner agent announcement pill and removal of the bottom pill.

## Impact

- `pages/index.astro`: Update hero section markup and styling.
- `openspec/specs/docs-site/spec.md`: Delta spec sync on archive.

