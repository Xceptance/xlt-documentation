# Design: Blume 2.x Features and Chapter Directory Catalogs

## Context

Following the upgrade from Blume 1.7 to 2.2.1, the documentation site has multiple chapter landing pages with minimal or empty bodies. In Blume 1.x, these pages had `sidebar: hidden: true` to prevent readers from landing on blank pages. Blume 2.x provides native Directory Index Cards (`directory: "card"` in `meta.ts`), a native `footer` configuration, automatic external link decoration, and Git-based last-modified stamps.

## Goals / Non-Goals

**Goals:**
- Transform empty or single-sentence chapter landing pages across XLT, XTC, and Neodymium into visual, browsable card catalogs.
- Configure Blume's native footer with Xceptance corporate links, copyright, and social profile icons, clearing repository and external links out of the top navigation header.
- Enable automatic external link decoration (`target="_blank"`, `rel="noreferrer"`, external link badge).
- Enable "Last updated" Git-derived date stamps on documentation pages.
- Enable reader-facing PDF export actions.
- Preserve the custom Xceptance corporate styling of `pages/index.astro` and retain the search keyboard shortcut badge (`⌘K` / `Ctrl K`).

**Non-Goals:**
- Replacing `pages/index.astro` with an MDX page (the custom Astro design is intentionally maintained to match `xceptance.com`).
- Applying `directory: "card"` to release note folders (`xlt/release-notes` already uses a custom version-family accordion; `xtc/xtc-release-notes` contains 100+ releases which would overwhelm a card layout).
- Altering existing URLs, content routing, or documentation hierarchy.

## Decisions

### 1. Selective Adoption of Directory Index Cards
- **Topic chapters**: Set `directory: "card"` in `meta.ts` for folders containing 2–15 conceptual or practical child guides:
  - **XLT**: `about`, `quick-start`, `manual`, `advanced`, `test-suites`, `how-tos`, `knowledgebase`.
  - **XTC**: `basics`, `loadtesting`, `monitoring`, `integrations`.
  - **Neodymium**: `browsers`, `configuration`, `features`, `framework`, `integrations`, `miscellaneous`.
- **Changelog chapters**: Do NOT enable `directory: "card"` in `xlt/release-notes` or `xtc/xtc-release-notes`. They either maintain custom Accordion component layouts or vertical sidebar listings.

### 2. Standard Footer Configuration
- Add `footer` in `blume.config.ts`:
  - `copyright`: `© ${new Date().getFullYear()} Xceptance Software Technologies GmbH`
  - `links`: Blog, Xceptance homepage, Privacy Policy, Imprint.
  - `socials`: GitHub, LinkedIn, X.
- Remove `navigation.featured` to prevent cluttering the top header navigation.

### 3. Markdown and Page Action Enhancements
- Set `markdown.externalLinks: true` in `blume.config.ts`.
- Set `lastModified: "git"` in `blume.config.ts`.
- Set `export: { pdf: true }` in `blume.config.ts`.

### 4. Homepage Search Trigger Hygiene
- Keep `pages/index.astro` intact with its corporate gradient `#004682`, product screenshot cards, and `<span id="hero-search-kbd">⌘K</span>` badge.
- Remove redundant custom event listeners that attempted synthetic keydowns or custom element method lookups, letting Blume's native `data-blume-search-open` handle the click.

## Risks / Trade-offs

- **[Risk]** A child page without a `description` frontmatter field may render an empty description in its card.
  → **Mitigation**: Blume gracefully renders cards with just titles and icons when descriptions are absent. The primary guides already have well-formed descriptions.
- **[Risk]** `directory: "card"` inherits down the folder hierarchy to nested subdirectories.
  → **Mitigation**: For any deeply nested subfolder that should not render cards, explicitly specify `directory: "none"` in its `meta.ts`.

