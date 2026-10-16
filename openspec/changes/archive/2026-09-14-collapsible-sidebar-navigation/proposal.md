## Why

In Blume's default `display: "flat"` sidebar configuration, all section folders render open as static text headings, immediately followed by their folder `index.md` page links. This produces visually redundant, duplicated navigation entries (such as a bold **Basics** section heading immediately followed by a normal **Basics** link, **Integrations** followed by **Integrations**, etc.) and creates cluttered, long sidebars across all products.

Furthermore, many of these `index.md` files were empty taxonomy placeholders required by Hugo Docsy with zero body text. Setting a blanket "Overview" label across every folder would lead readers to blank pages and turn single-article pages (like Privacy) into awkward one-item accordion groups.

Switching to Blume's standard collapsible accordion mode (`display: "group"`) combined with a content-aware strategy—hiding empty placeholder index pages, labeling genuine intro pages as "Overview", and flattening single-article folders—restores the clean, foldable navigation hierarchy familiar from the original Docsy site.

## What Changes

- Configure `navigation.sidebar.display: "group"` globally in `blume.config.ts`, converting all sidebar section folders into collapsible accordion disclosures with chevrons that keep the active route open and other groups collapsed by default.
- Set `sidebar: { hidden: true }` on empty legacy index pages (`index.md` files with zero body text such as `integrations`, `loadtesting`, `monitoring`, `manual`, `advanced`, etc.) so the collapsible group expands directly to its actual content pages without duplicate headers or blank page links.
- Set `sidebar.label: "Overview"` on folder landing pages that contain genuine introductory content (`xtc/basics`, `xlt/about`, `xlt/test-suites`).
- Flatten single-page section directories with no child pages (such as `content/en/xtc/privacy/index.md` to `content/en/xtc/privacy.md`) so they render as clean, standalone page links instead of single-item accordion groups.
- Verify internal link integrity, frontmatter schema validation (`npx blume validate`), and production build (`npx blume build --isolated`).

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `docs-site`: Update multi-product sidebar navigation requirements to mandate collapsible group subtrees (`display: "group"`), hiding empty section index placeholders, and labeling genuine section introductions as "Overview".

## Impact

- `blume.config.ts`: Added `navigation.sidebar.display: "group"`.
- `content/en/xtc/`, `content/en/xlt/`, and `content/en/neodymium/`: Index page frontmatter updated (`sidebar.hidden: true` for empty placeholders, `sidebar.label: "Overview"` for genuine intros).
- `content/en/xtc/privacy/`: Converted from `privacy/index.md` to `privacy.md`.
- Navigation UI: Clean, compact accordion groups matching Hugo Docsy behavior, with zero blank page links and zero duplicate titles.
