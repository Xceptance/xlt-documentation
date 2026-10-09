## Why

The documentation repository contains legacy Hugo/Docsy meta-pages (`xlt/about/000-demo` and `xlt/about/software.md`) that describe obsolete Hugo shortcodes, permalinks, and unused libraries (jQuery, Bootstrap, Docsy). These pages clutter user-facing XLT product documentation, while `README.md` still instructs contributors to install Hugo Extended and run `hugo server`. Modernizing `README.md` and retiring these pages aligns the repository with Blume.

## What Changes

- **Retire Demo Page**: Remove `content/en/xlt/about/000-demo/` (and associated `test.png`) from XLT product documentation.
- **Retire Documentation Software Page**: Remove `content/en/xlt/about/software.md` from the XLT chapter, moving site framework credits to `README.md`.
- **Modernize `README.md`**: Rewrite `README.md` with current Blume prerequisites (Node.js >= 20), build/dev/validation commands (`npm run dev`, `npm run build`, `npm run validate`), and a concise authoring guide covering callout directives (`:::note`, `:::tip`, `:::warning`, `:::danger`, `:::info`), Markdown rules, and contribution steps.
- **Update Redirects**: Clean up obsolete `/documentation-helpers` and `/writing-documentation` redirects in `blume.config.ts`.

## Capabilities

### New Capabilities
<!-- No new capabilities -->

### Modified Capabilities
- `docs-site`: Restricts product documentation sections strictly to product content by retiring legacy website meta-documentation pages and standardizing contributor build and authoring guidance in `README.md`.

## Impact

- `content/en/xlt/about/`: Cleans up the "About" section navigation so it contains only genuine XLT product pages.
- `README.md`: Reflects accurate Blume workflow and authoring conventions for developers and contributors.
- `blume.config.ts`: Eliminates stale redirects pointing to deleted demo paths.
- No broken links: `npx blume validate` will verify site integrity.

