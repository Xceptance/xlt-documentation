# Design

## Context

See `proposal.md` for motivation.

Blume's `directory: "card"` mechanism automatically derives card data for subdirectories from each subdirectory's `meta.ts` (or `index.md`). In the previous change (`add-directory-card-icons`), icons were added to 127 individual child articles, but chapter `meta.ts` files were left without icons to avoid rendering icons on sidebar accordion group headers (`.blume-nav-summary-link`).

By pairing chapter `meta.ts` icon definitions with CSS rules in `theme.css`, we can display icons on the top-level product overview cards while maintaining a clean, text-only sidebar tree that spotlights only the Release Notes section.

## Goals / Non-Goals

**Goals:**
- Provide contextual Lucide icons on Directory Index Cards across `/xlt/`, `/neodymium/`, and `/xtc/`.
- Maintain plain-text typography in sidebar navigation across all product sections, preserving only the Release Notes megaphone icon.
- Maintain accordion toggle chevron functionality and accessibility across all sidebar groups.
- Maintain strict build and validation cleanliness (`blume validate --strict` and `blume build`).

**Non-Goals:**
- Modifying individual child article frontmatter (already completed in `add-directory-card-icons`).
- Re-architecting product index pages with manual card markup instead of Blume's native `directory: "card"` feature.
- Changing route paths, sidebar ordering, or group hierarchy.

## Decisions

### 1. Assign Icons Directly in Chapter Metadata and Page Frontmatter

Define `icon: "<name>"` in each chapter's `meta.ts` and in `content/en/xtc/privacy.md` frontmatter.

*Rationale*: Blume automatically propagates metadata from `meta.ts` into parent directory cards (`data-blume-card="true"`).

*Alternative considered*: Hardcoding manual `<CardGroup>` and `<Card>` JSX in product index pages. Rejected because it bypasses Blume's declarative directory card engine, duplicates descriptions and titles, and introduces maintenance overhead.

### 2. Suppress Sidebar Group Header Icons via CSS

Update `theme.css` to hide SVG icons inside `.blume-nav-summary-link`, while specifically exempting links whose `href` contains `release-notes`:

```css
/* Suppress sidebar icons to keep navigation plain text, preserving only the Release Notes icon */
.blume-nav-link svg,
.blume-nav-summary-link svg {
  display: none;
}

.blume-nav-summary-link[href*="release-notes"] svg {
  display: inline-block;
}
```

*Rationale*: 
- In Blume's `NavTree.astro`, the chapter icon is placed directly inside `<a class="blume-nav-summary-link">`.
- The accordion chevron (`>`) is rendered inside a sibling `<span class="shrink-0 ...">`, outside `.blume-nav-summary-link`.
- Therefore, hiding `.blume-nav-summary-link svg` suppresses the chapter icon without affecting the chevron.
- Scoping the exception to `[href*="release-notes"]` targets `/xlt/release-notes`, `/xtc/xtc-release-notes`, and `/neodymium/release-notes`, keeping the megaphone visible on all three.

### 3. Icon Mapping Taxonomy

The selected Lucide icons match the technical purpose of each chapter:

- **XLT**:
  - `about` -> `info`
  - `quick-start` -> `rocket`
  - `manual` -> `book-open`
  - `advanced` -> `sliders-horizontal`
  - `test-suites` -> `folder-tree`
  - `release-notes` -> `megaphone` *(already set)*
  - `how-tos` -> `list-checks`
  - `knowledgebase` -> `graduation-cap`
- **Neodymium**:
  - `quick-start` -> `rocket`
  - `setup-execution` -> `terminal`
  - `cheat-sheet` -> `file-code`
  - `test-suites` -> `folder-tree`
  - `framework` -> `layers`
  - `browsers` -> `globe`
  - `configuration` -> `settings`
  - `features` -> `sparkles`
  - `integrations` -> `blocks`
  - `miscellaneous` -> `archive`
  - `release-notes` -> `megaphone` *(already set)*
- **XTC**:
  - `basics` -> `compass`
  - `loadtesting` -> `activity`
  - `monitoring` -> `heart-pulse`
  - `integrations` -> `blocks`
  - `xtc-release-notes` -> `megaphone` *(already set)*
  - `privacy` -> `shield-check`

## Risks / Trade-offs

- **[Risk] Selector drift if Blume updates sidebar markup**  
  *Mitigation*: The classes `.blume-nav-link` and `.blume-nav-summary-link` are part of Blume's standard documented theme structure. Verified against Blume 2.2.1 markup in `node_modules/blume/src/components/layout/NavTree.astro`.
- **[Risk] Unrecognized icon names**  
  *Mitigation*: All icons are verified present in `@iconify-json/lucide` and validated during `blume build`.

