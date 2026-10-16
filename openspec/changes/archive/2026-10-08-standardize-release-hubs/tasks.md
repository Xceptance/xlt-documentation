# Tasks

## 1. XTC Release Hub Implementation

- [x] 1.1 Update `content/en/xtc/xtc-release-notes/meta.ts` to clean the title to `"Release Notes"`, add `icon: "megaphone"`, and retain `directory: "none"`, verifying that the raw emoji is removed.
- [x] 1.2 Remove `content/en/xtc/xtc-release-notes/index.md` and create `content/en/xtc/xtc-release-notes/index.mdx` implementing the 3-tier layout:
  - Frontmatter with `title: "Release Notes"`, description, and `sidebar.label: Overview`.
  - Tier 1 Spotlight `<Card>` for XTC v117 with call-to-action link.
  - Tier 2 Recent Releases `<CardGroup cols={2}>` for v116, v115, v114, and v113.
  - Tier 3 Historical Archive `<Accordion>` grouping all 102 releases across 6 platform eras (`v110–v117`, `v100–v109`, `v90–v99`, `v70–v89`, `v40–v69`, `v14–v39`).
  - Verify that all relative links resolve to valid XTC release documents.

## 2. Neodymium Release Hub Implementation

- [x] 2.1 Update `content/en/neodymium/release-notes/meta.ts` to add `icon: "megaphone"`, retaining `title: "Release Notes"` and `directory: "none"`.
- [x] 2.2 Remove `content/en/neodymium/release-notes/index.md` and create `content/en/neodymium/release-notes/index.mdx` implementing the 3-tier layout:
  - Frontmatter with `title: "Release Notes"`, description, and `sidebar.label: Overview`.
  - Tier 1 Spotlight `<Card>` for Neodymium 5.3.0 with call-to-action link.
  - Tier 2 Recent Releases `<CardGroup cols={2}>` for 5.2.0, 5.1.x, 5.0.x, and 4.x.
  - Tier 3 Historical Archive `<Accordion>` grouping all releases across 5 major series (`5.x`, `4.x`, `3.x`, `2.x`, `1.x & 0.x`).
  - Verify that all relative links resolve to valid Neodymium release documents.

## 3. Site Validation & Navigation Verification

- [x] 3.1 Execute `npm run validate` to verify schema conformance, MDX component rendering, and link integrity across the entire documentation site.
- [x] 3.2 Verify that all 102 XTC releases and 10 Neodymium releases remain visible in the sidebar navigation tree and that `/xtc/xtc-release-notes/` functions as expected.

