## Context

In Blume's default configuration, `navigation.sidebar.display` defaults to `"flat"`. The generated filesystem sidebar turns directories into structural groups and every Markdown file inside that directory into a page link under that group.

When a folder contains an `index.md` with the same name as the folder, `flat` mode produces a static heading followed by an identical link (e.g., **Basics** heading followed by **Basics** link), and all sections remain open simultaneously.

However, an audit of the repository reveals that most `index.md` files (like `xtc/integrations`, `xtc/loadtesting`, `xtc/monitoring`, `xlt/manual`, `xlt/advanced`, etc.) have **zero body content**—they were strictly taxonomy placeholders required by Hugo Docsy. Labeling all of them "Overview" would result in links leading to blank pages. Furthermore, single-page articles (like `xtc/privacy/index.md`) would become awkward one-item accordion groups.

See `proposal.md` for motivation and background.

## Goals / Non-Goals

**Goals:**
- Configure `navigation.sidebar.display: "group"` in `blume.config.ts` to enable standard collapsible accordion groups across all documentation sections.
- Keep the active route's group open automatically while keeping other groups collapsed by default.
- Hide empty Hugo taxonomy placeholder `index.md` files from the sidebar via `sidebar: { hidden: true }`, ensuring groups expand directly to their actual content pages without duplicate headers or blank page links.
- Set `sidebar.label: "Overview"` exclusively on section landing pages that contain genuine introductory content (`xtc/basics`, `xlt/about`, `xlt/test-suites`).
- Flatten single-article directories (`xtc/privacy/index.md` → `xtc/privacy.md`) so they render as direct page links instead of one-item groups.
- Verify that internal links, route integrity, and build validation pass with zero errors.

**Non-Goals:**
- Do not hardcode explicit sidebars in `blume.config.ts`; retain Blume's dynamic filesystem-derived navigation.
- Do not modify `node_modules/blume` source.
- Do not break existing routes or URLs.

## Decisions

### Decision 1: Configure global `display: "group"` in `blume.config.ts`
- **Choice**: Add `navigation: { sidebar: { display: "group" } }` in `blume.config.ts`.
- **Rationale**: Uses Blume's built-in `<details>` disclosure sidebar renderer. Groups display rotating chevrons, collapse by default, and automatically expand when a user is on any child page within that group.
- **Alternatives considered**:
  - `display: "page"`: Slides the sidebar into sub-panels; requires more clicks/transitions when scanning chapters.
  - `display: "flat"`: Current behavior; keeps all groups expanded and cluttered.

### Decision 2: Content-aware treatment of section `index.md` files

Rather than a blanket "Overview" label, files are classified into three distinct tiers:

1. **Tier 1 — Empty Hugo Placeholders (`sidebar: { hidden: true }`)**:
   - Files: `xtc/integrations/index.md`, `xtc/loadtesting/index.md`, `xtc/monitoring/index.md`, `xtc/xtc-release-notes/index.md`, `xlt/quick-start/index.md`, `xlt/manual/index.md`, `xlt/advanced/index.md`, `xlt/how-tos/index.md`, `xlt/release-notes/index.md`, `xlt/knowledgebase/index.md`, `neodymium/browsers/index.md`, `neodymium/configuration/index.md`, `neodymium/features/index.md`, `neodymium/framework/index.md`, `neodymium/integrations/index.md`, `neodymium/miscellaneous/index.md`, `neodymium/quick-start/index.md`, `neodymium/release-notes/index.md`.
   - Rationale: Hiding them from the sidebar preserves the folder group while eliminating the duplicate heading and preventing users from clicking into blank pages. In Blume, `sidebar.hidden: true` keeps the page route functional (in case any direct URL links to it) while omitting it from the navigation list.

2. **Tier 2 — Genuine Introductions (`sidebar.label: "Overview"`)**:
   - Files: `xtc/basics/index.md`, `xlt/about/index.md`, `xlt/test-suites/index.md`.
   - Rationale: These pages have real introductory content explaining the section. Labeling them "Overview" in `sidebar.label` clearly distinguishes the landing page from the collapsible section header without triggering `BLUME_NAV_INDEX_TITLE_MISMATCH` diagnostics.

3. **Tier 3 — Standalone Articles (Flatten directory to `.md`)**:
   - Files: Move `content/en/xtc/privacy/index.md` to `content/en/xtc/privacy.md`.
   - Rationale: `privacy` is a single document with no child pages. In Blume, `privacy.md` produces route `/xtc/privacy` and renders as a top-level page link in the sidebar, matching the original Hugo site layout.

## Risks / Trade-offs

- **[Risk] Route changes when flattening `privacy/index.md`** → In Blume, both `xtc/privacy/index.md` and `xtc/privacy.md` resolve to the exact same canonical route `/xtc/privacy`. Zero URLs change and zero links break.
- **[Risk] Hidden index pages breaking inbound links** → Setting `sidebar.hidden: true` only removes the item from the sidebar navigation tree; the page remains fully built and routable in the static output.
