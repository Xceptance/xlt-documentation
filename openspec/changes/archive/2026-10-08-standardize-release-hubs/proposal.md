# Proposal

## Why

While XLT's release notes section was upgraded to a modern 3-tier "Release Hub" (current release spotlight, recent releases card grid, and historical archive accordions), XTC and Neodymium still have empty landing pages (`index.md`) with `sidebar.hidden: true` and missing or inconsistent metadata (such as raw emoji in XTC's section title and missing icons). Readers navigating to `/xtc/xtc-release-notes/` or `/neodymium/release-notes/` find blank pages rather than structured discovery hubs.

Standardizing the Release Hub architecture across all three products will deliver a unified, polished reading experience, improve discoverability of major platform releases, and eliminate legacy metadata quirks—while strictly preserving existing external bookmarks and keeping all release notes visible in the sidebar navigation.

## What Changes

- **Standardized Release Hub Architecture**:
  - Replace empty `content/en/xtc/xtc-release-notes/index.md` with a structured `index.mdx` Release Hub featuring Tier 1 Spotlight (v117), Tier 2 Recent Grid (v116–v113), and Tier 3 Historical Archive with 6 era-based accordions (v110–v117 down to v14–v39).
  - Replace empty `content/en/neodymium/release-notes/index.md` with a structured `index.mdx` Release Hub featuring Tier 1 Spotlight (5.3.0), Tier 2 Recent Grid (5.2.0–4.x), and Tier 3 Historical Archive with 5 series-based accordions (5.x down to 0.x).
- **Navigation & Metadata Hygiene**:
  - Set `sidebar.label: Overview` on both XTC and Neodymium `index.mdx` landing pages so the landing page is clickable and labeled at the top of the sidebar group.
  - Update `content/en/xtc/xtc-release-notes/meta.ts` to replace `title: "Release Notes 📢"` with `title: "Release Notes"` and add `icon: "megaphone"`.
  - Update `content/en/neodymium/release-notes/meta.ts` to add `icon: "megaphone"`.
  - Maintain `directory: "none"` in both `meta.ts` configurations to suppress unpaginated Directory Index Cards in favor of custom MDX layout.
- **Compatibility & Integrity Guardrails**:
  - Preserve all 102 XTC release files and 10 Neodymium release files in the sidebar navigation (no releases are hidden).
  - Preserve the established URL `/xtc/xtc-release-notes/` so external bookmarks, documentation references, and backlinks remain unbroken.

## Capabilities

### New Capabilities

*(None)*

### Modified Capabilities

- `docs-site`: Extend the "Release Notes Hub and Navigation Icon" requirement to mandate the 3-tier Release Hub architecture, Lucide megaphone icons, clean titles without raw emojis, and `Overview` landing sidebar entries across all three documentation products (XLT, XTC, and Neodymium).

## Impact

- **Affected Files**:
  - `content/en/xtc/xtc-release-notes/index.md` (removed)
  - `content/en/xtc/xtc-release-notes/index.mdx` (created)
  - `content/en/xtc/xtc-release-notes/meta.ts` (modified)
  - `content/en/neodymium/release-notes/index.md` (removed)
  - `content/en/neodymium/release-notes/index.mdx` (created)
  - `content/en/neodymium/release-notes/meta.ts` (modified)
- **APIs & Dependencies**: No dependency changes or breaking changes. Uses existing Blume native components (`<Card>`, `<CardGroup>`, `<Accordion>`, `<AccordionItem>`).
- **External URLs**: 100% backward-compatible. No URL paths are renamed or removed.

