# Tasks

## 1. Metadata and Navigation Configuration

- [x] 1.1 Create `content/en/xlt/release-notes/meta.ts` configuring group title "Release Notes" and icon "megaphone", and verify that the file exports a valid `defineMeta` configuration.
- [x] 1.2 Verify `content/en/xlt/meta.ts` retains `release-notes` in the `pages` array and confirms section ordering in the XLT sidebar.

## 2. Release Notes Hub MDX Implementation

- [x] 2.1 Remove legacy empty stub `content/en/xlt/release-notes/index.md` and create `content/en/xlt/release-notes/index.mdx` with frontmatter `title: "Release Notes"` and `sidebar.label: "Overview"`, and verify file existence.
- [x] 2.2 Add the featured Spotlight section for XLT 10.0.x highlighting key innovations (Java 21 virtual threads, dynamic overview charts, moving averages, private machine mode) and linking to `./v10_0_x`, and verify card rendering and link target.
- [x] 2.3 Add the Recent Releases `<CardGroup cols={2}>` for XLT 9.2.x, 9.1.x, 9.0.x, and the 8.x series with summary descriptions, and verify all relative links resolve to existing release documents.
- [x] 2.4 Add the Historical Archive collapsible `<Accordion>` blocks grouping legacy release series (7.x, 6.x, 5.x, 4.x, and 3.x), and verify all 44 version links are accessible and valid.

## 3. Validation and Build

- [x] 3.1 Run `npm run validate` and verify that all internal links, anchors, and metadata pass with zero errors and zero warnings.
- [x] 3.2 Run `npm run build` and verify that the static production build completes successfully with the Release Notes Hub included.

