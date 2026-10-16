# Tasks

## 1. Theme Styling for Sidebar Icon Suppression

- [x] 1.1 Update `theme.css` to suppress group header icons in `.blume-nav-summary-link svg` while preserving `.blume-nav-summary-link[href*="release-notes"] svg`, and verify the CSS rules compile without syntax errors.

## 2. XLT Chapter Metadata Icons

- [x] 2.1 Add `icon: "info"` to `content/en/xlt/about/meta.ts` and verify the file exports valid metadata.
- [x] 2.2 Add `icon: "rocket"` to `content/en/xlt/quick-start/meta.ts` and verify the file exports valid metadata.
- [x] 2.3 Add `icon: "book-open"` to `content/en/xlt/manual/meta.ts` and verify the file exports valid metadata.
- [x] 2.4 Add `icon: "sliders-horizontal"` to `content/en/xlt/advanced/meta.ts` and verify the file exports valid metadata.
- [x] 2.5 Add `icon: "folder-tree"` to `content/en/xlt/test-suites/meta.ts` and verify the file exports valid metadata.
- [x] 2.6 Add `icon: "list-checks"` to `content/en/xlt/how-tos/meta.ts` and verify the file exports valid metadata.
- [x] 2.7 Add `icon: "graduation-cap"` to `content/en/xlt/knowledgebase/meta.ts` and verify the file exports valid metadata.

## 3. Neodymium Chapter Metadata Icons

- [x] 3.1 Add `icon: "rocket"` to `content/en/neodymium/quick-start/meta.ts` and verify the file exports valid metadata.
- [x] 3.2 Add `icon: "terminal"` to `content/en/neodymium/setup-execution/meta.ts` and verify the file exports valid metadata.
- [x] 3.3 Add `icon: "file-code"` to `content/en/neodymium/cheat-sheet/meta.ts` and verify the file exports valid metadata.
- [x] 3.4 Add `icon: "folder-tree"` to `content/en/neodymium/test-suites/meta.ts` and verify the file exports valid metadata.
- [x] 3.5 Add `icon: "layers"` to `content/en/neodymium/framework/meta.ts` and verify the file exports valid metadata.
- [x] 3.6 Add `icon: "globe"` to `content/en/neodymium/browsers/meta.ts` and verify the file exports valid metadata.
- [x] 3.7 Add `icon: "settings"` to `content/en/neodymium/configuration/meta.ts` and verify the file exports valid metadata.
- [x] 3.8 Add `icon: "sparkles"` to `content/en/neodymium/features/meta.ts` and verify the file exports valid metadata.
- [x] 3.9 Add `icon: "blocks"` to `content/en/neodymium/integrations/meta.ts` and verify the file exports valid metadata.
- [x] 3.10 Add `icon: "archive"` to `content/en/neodymium/miscellaneous/meta.ts` and verify the file exports valid metadata.

## 4. XTC Chapter Metadata and Standalone Page Icons

- [x] 4.1 Add `icon: "compass"` to `content/en/xtc/basics/meta.ts` and verify the file exports valid metadata.
- [x] 4.2 Add `icon: "activity"` to `content/en/xtc/loadtesting/meta.ts` and verify the file exports valid metadata.
- [x] 4.3 Add `icon: "heart-pulse"` to `content/en/xtc/monitoring/meta.ts` and verify the file exports valid metadata.
- [x] 4.4 Add `icon: "blocks"` to `content/en/xtc/integrations/meta.ts` and verify the file exports valid metadata.
- [x] 4.5 Add `icon: shield-check` to `content/en/xtc/privacy.md` frontmatter and verify frontmatter parses correctly.

## 5. Build Validation and Verification

- [x] 5.1 Execute `npm run validate` and verify zero broken links, invalid references, or frontmatter errors.
- [x] 5.2 Execute `blume build` and verify that all directory cards on `/xlt/`, `/neodymium/`, and `/xtc/` render with 20px Lucide icons in static HTML output while sidebar summary links remain plain text (except for Release Notes).

