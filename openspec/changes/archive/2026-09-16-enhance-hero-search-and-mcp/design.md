## Context

Blume provides an integrated search dialog component (`<blume-search>`) and an MCP server endpoint (`/mcp`). Currently:
1. Blume's `<blume-search>` custom element registers its click listener exclusively on `this.querySelector("[data-blume-search-open]")`, leaving external triggers in `pages/index.astro` inert when clicked.
2. The keyboard badge in the hero currently renders static `⌘K` markup, ignoring Windows and Linux users whose keyboards lack the command key.
3. The MCP server endpoint at `/mcp` is active but unadvertised on the landing page, and documentation references used the tool-specific prefix `xlt-docs` instead of the comprehensive `xceptance-docs`.

This design preserves 100% upstream compatibility with future Blume releases by using public DOM interfaces and standard Astro page-level scripting without touching package internals.

## Goals / Non-Goals

**Goals:**
- Provide reliable mouse and touch activation on the hero search launchpad, opening Blume's native modal search dialog with Ask AI and full-text indexing.
- Dynamically adapt the keyboard shortcut badge based on user platform (`⌘K` for macOS/iOS, `Ctrl K` for Windows/Linux).
- Highlight the `/mcp` endpoint on the homepage hero via an interactive status badge.
- Add an accessible "AI Coding Agents & MCP" homepage feature section with a 1-click clipboard copy action for `claude mcp add --transport http xceptance-docs https://docs.xceptance.com/mcp`.
- Align all MCP documentation and setup commands to the `xceptance-docs` identifier.
- Preserve zero-overhead Blume framework upgradability.

**Non-Goals:**
- Modifying Blume core code or overriding `<Search.astro>`.
- Changing suggested pathway chips into search pre-fillers (retaining fast direct navigation links).
- Introducing external client-side UI libraries.

## Decisions

### Decision 1: Resilient Multi-Tier Search Triggering
- **Approach**: In `pages/index.astro`, listen for clicks on `#hero-search-button` and invoke Blume's search dialog through a cascading strategy:
  1. Trigger click on `blume-search [data-blume-search-open]` (activates Blume's primary click handler).
  2. Fallback: Call `.open()` on the custom element instance `document.querySelector("blume-search")`.
  3. Fallback: Dispatch synthetic `KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })` on `document`.
- **Rationale**: Ensures the search modal opens reliably regardless of DOM initialization timing or future internal refactorings within Blume.

### Decision 2: Astro ClientRouter Lifecycle Integration
- **Approach**: Encapsulate setup logic in a reusable function executed on initial DOM load and registered with `document.addEventListener("astro:page-load", setup)`.
- **Rationale**: Blume uses Astro's `ClientRouter` for client-side navigation. Registering on `astro:page-load` ensures the click handler and platform badge remain active across route transitions.

### Decision 3: Platform Detection for Keyboard Badge
- **Approach**: Check `/mac|iphone|ipad|ipod/iu.test(navigator.platform)` in the client script.
  - If Apple platform: display `⌘K`.
  - If Windows/Linux/other: display `Ctrl K`.
  - Render a clean initial badge during SSR with `id="hero-search-kbd"` that hydrates seamlessly without layout shift.
- **Rationale**: Mirrors the exact detection pattern used in Blume's header (`Search.astro` line 425), ensuring visual consistency across the entire site.

### Decision 4: Homepage MCP Section Architecture & Clipboard Action
- **Approach**:
  - Add an MCP badge in the hero banner: `<a href="#mcp-section" ...>⚡ MCP Server available at /mcp</a>`.
  - Add a dedicated `<section id="mcp-section">` on the homepage featuring:
    - Overview of the Model Context Protocol endpoint for AI coding agents.
    - Supported clients list: Claude Code, Cursor, Windsurf, VS Code (Cline / Roo Code).
    - Code block with copy button: `claude mcp add --transport http xceptance-docs https://docs.xceptance.com/mcp`.
    - Client-side clipboard handler with visual feedback ("Copied!" tooltip/toast).
- **Rationale**: Developers evaluating the suite can immediately connect their agents without searching through docs or reading raw source configuration.

### Decision 5: Standardizing Server Name to `xceptance-docs`
- **Approach**: Replace `xlt-docs` with `xceptance-docs` in `README.md`, homepage copy, and configuration comments.
- **Rationale**: The documentation hub is the unified knowledge base for XLT, XTC, and Neodymium; `xceptance-docs` accurately communicates this scope.

## Risks / Trade-offs

- **[Risk]** Astro client-router re-renders could produce duplicate click handlers.  
  → **Mitigation**: Remove previous event listeners or guard using a dataset flag (e.g. `button.dataset.bound = "true"`).
- **[Risk]** Clipboard API failure in non-secure or restricted browser contexts.  
  → **Mitigation**: Use `navigator.clipboard.writeText` wrapped in try/catch with fallback to `document.execCommand("copy")`.
- **[Risk]** Blume future major version updates.  
  → **Mitigation**: All changes reside strictly in `pages/index.astro` and `README.md`; no files in `node_modules` are touched, ensuring `npm update blume` runs safely.

