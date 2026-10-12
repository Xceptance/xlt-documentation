# Proposal

## Why

While Directory Index Cards on chapter landing pages display contextual Lucide icons, the top-level product overview pages (`/xlt/`, `/neodymium/`, and `/xtc/`) still display text-only cards for chapters (except for Release Notes). Setting icons on chapter metadata enables visual consistency across all directory card catalogs while keeping sidebar accordion headers plain text and preserving the distinctive Release Notes megaphone icon.

## What Changes

- Add contextual Lucide icons to chapter `meta.ts` files across XLT (`about`, `quick-start`, `manual`, `advanced`, `test-suites`, `how-tos`, `knowledgebase`).
- Add contextual Lucide icons to chapter `meta.ts` files across Neodymium (`quick-start`, `setup-execution`, `cheat-sheet`, `test-suites`, `framework`, `browsers`, `configuration`, `features`, `integrations`, `miscellaneous`).
- Add contextual Lucide icons to chapter `meta.ts` files and standalone pages across XTC (`basics`, `loadtesting`, `monitoring`, `integrations`, and `privacy.md`).
- Update `theme.css` to suppress group header icons in the sidebar (`.blume-nav-summary-link svg`) while explicitly preserving the Release Notes megaphone icon (`.blume-nav-summary-link[href*="release-notes"] svg`), ensuring sidebar typography remains plain text.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `docs-site`: Update requirement `Directory Index Card Icons and Sidebar Typography` to cover top-level product overview cards and sidebar group header icon suppression.

## Impact

- Content metadata: 7 XLT `meta.ts`, 10 Neodymium `meta.ts`, 4 XTC `meta.ts`, and 1 XTC frontmatter file (`content/en/xtc/privacy.md`).
- Site styling: `theme.css` updated to hide group header icons in `.blume-nav-summary-link` except for release notes.
- Zero breaking changes to navigation structure, routes, or links.

