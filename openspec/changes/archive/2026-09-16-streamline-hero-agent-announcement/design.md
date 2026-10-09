## Context

In `pages/index.astro`, the hero banner previously had a static category badge at the top (`Xceptance Quality & Performance Suite`) and a wide MCP discovery pill placed below the suggested search chips. This resulted in visual repetition (two wide translucent pill components stacked around the search bar) and competed with the search bar for the user's primary focus.

See `proposal.md` for background context and motivation.

## Goals / Non-Goals

**Goals:**
- Upgrade the top hero badge into an interactive announcement pill linking directly to `#mcp-server-section`.
- Use concise, action-oriented copy (`Connect your Agent via /mcp (Antigravity, Claude Code...) →`).
- Remove the redundant bottom MCP pill under the suggested search chips to restore clean visual hierarchy.
- Ensure the search launchpad remains the central, unobstructed focal point of the hero.

**Non-Goals:**
- Modifying the `#mcp-server-section` layout or terminal tabs below.
- Altering the search trigger modal or keyboard shortcut detection.

## Decisions

### 1. Interactive Announcement Pill at Hero Top
- **Structure**: Render an `<a>` element wrapping an agent icon (`bot`), clear call-to-action text, highlighted `/mcp` monospace code, ellipsis, and right arrow icon (`arrow-right`).
- **Styling**: Translucent glass (`rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-slate-200 backdrop-blur-md mb-6 hover:bg-white/20 hover:border-white/40 hover:text-white transition-all`).
- **Rationale**: Elevates developer agent capabilities to the highest-visibility position upon page load while keeping the footprint compact and elegant.

### 2. Removal of Redundant Bottom Pill
- **Structure**: Delete the `mt-5 flex justify-center` container enclosing the bottom MCP link.
- **Rationale**: Eliminates the "pill stack" clutter where two identical translucent shapes competed for attention on either side of the suggested chips.

## Risks / Trade-offs

- **[Risk]** Users scanning only downwards might miss the MCP endpoint if it is only at the top of the hero.
  - **→ Mitigation**: The dedicated `#mcp-server-section` below remains fully featured with tabbed configurations for Google Antigravity and Claude Code. The top pill also uses an arrow icon and hover state to clearly indicate interaction.

