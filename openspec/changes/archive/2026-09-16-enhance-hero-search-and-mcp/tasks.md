## 1. Hero Search Click Activation & Platform Keyboard Shortcut

- [x] 1.1 Add client-side click event listener for `#hero-search-button` in `pages/index.astro` (supporting Astro client-router lifecycle) and verify clicking the hero search launchpad opens Blume's native modal search dialog.
- [x] 1.2 Implement dynamic OS detection in `pages/index.astro` and verify that the keyboard shortcut badge displays `⌘K` on Apple devices and `Ctrl K` on Windows/Linux devices.
- [x] 1.3 Add an MCP status badge / pill to the hero banner in `pages/index.astro` advertising the `/mcp` endpoint and linking smoothly to the MCP details section.

## 2. Homepage AI Coding Agents & MCP Feature Section

- [x] 2.1 Add the "AI Coding Agents & MCP" section to `pages/index.astro` displaying agent capabilities, supported tools (Claude Code, Cursor, Windsurf, VS Code), and the connection command using `xceptance-docs`.
- [x] 2.2 Implement 1-click clipboard copy button with visual feedback ("Copied!") in `pages/index.astro` and verify that clicking copies `claude mcp add --transport http xceptance-docs https://docs.xceptance.com/mcp` to the clipboard.

## 3. Documentation & Verification

- [x] 3.1 Update `README.md` to standardize on `xceptance-docs` across all MCP connection examples and document the homepage search and MCP features.
- [x] 3.2 Run `npx blume validate` and verify 0 configuration or link errors.
- [x] 3.3 Run `npx blume build --isolated` and verify successful production build generation and WCAG contrast conformance.

