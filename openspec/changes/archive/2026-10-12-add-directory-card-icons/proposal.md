# Proposal: Add Directory Card Icons Across All Chapters

## Why

Topic chapter landing pages across XLT, XTC, and Neodymium use Blume's native Directory Index Cards (`directory: "card"` in `meta.ts`) to present child articles as navigational cards. Currently, child articles specify only `title` and `description` without icons, resulting in visual monotony where every card is a plain text block. Adding contextual Lucide icons to child articles improves visual scannability and topic distinction. 

At the same time, the project's navigation design intentionally reserves sidebar icons exclusively for the **Release Notes** section (`icon: megaphone`) to maintain a clean, text-first sidebar while spotlighting updates. Applying icons to documentation pages must enrich chapter directory cards without cluttering the sidebar.

## What Changes

- **Frontmatter Icons Across Child Articles**:
  - Add contextual Lucide icon identifiers (`icon: <name>`) to the frontmatter of all child `.md` and `.mdx` articles across all chapters in `content/en/xlt/`, `content/en/xtc/`, and `content/en/neodymium/`.
  - Exclude release note archives (`xlt/release-notes/` and `xtc/xtc-release-notes/`), which use custom MDX release hubs with `directory: "none"`.
- **Sidebar Typography and Icon Suppression**:
  - Update `theme.css` with a targeted CSS rule (`.blume-nav-link svg { display: none; }`) to suppress page-level icons in the sidebar navigation.
  - Preserve group section header icons so that the `megaphone` icon on **Release Notes** remains prominently visible.
- **Chapter Overview Card Enrichment**:
  - Chapter overview cards automatically render the 20px Lucide icons in the theme accent color (`#004682`) above each article title.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `docs-site`: Extend the site styling and navigation specification to cover directory card icons across chapter landing pages while keeping sidebar page links strictly plain text.

## Impact

- **Content Files**: Frontmatter updates to ~85 `.md` and `.mdx` files across `content/en/{xlt,xtc,neodymium}/*/`.
- **Styling**: One rule added to `theme.css`.
- **Build / Runtime**: Fully static build-time icon resolution using Blume's bundled `@iconify-json/lucide` set; zero additional runtime JavaScript or CSS dependencies.

