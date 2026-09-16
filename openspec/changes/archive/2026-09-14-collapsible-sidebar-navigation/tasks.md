## 1. Global Navigation Configuration

- [x] 1.1 Configure `navigation.sidebar.display: "group"` in `blume.config.ts` and verify configuration loads cleanly

## 2. Content-Aware Section Index Updates

- [x] 2.1 Set `sidebar: { hidden: true }` on empty placeholder `index.md` files in XTC (`integrations`, `loadtesting`, `monitoring`, `xtc-release-notes`)
- [x] 2.2 Set `sidebar: { hidden: true }` on empty placeholder `index.md` files in XLT (`quick-start`, `manual`, `advanced`, `how-tos`, `release-notes`, `knowledgebase`)
- [x] 2.3 Set `sidebar: { hidden: true }` on empty placeholder `index.md` files in Neodymium (`browsers`, `configuration`, `features`, `framework`, `integrations`, `miscellaneous`, `quick-start`, `release-notes`)
- [x] 2.4 Set `sidebar.label: "Overview"` on index pages containing genuine introduction content (`content/en/xtc/basics/index.md`, `content/en/xlt/about/index.md`, `content/en/xlt/test-suites/index.md`)
- [x] 2.5 Flatten `content/en/xtc/privacy/index.md` to `content/en/xtc/privacy.md` so Privacy renders as a direct single page link
## 3. Build & Navigation Verification

- [x] 3.1 Run `npx blume validate` to verify zero broken links, zero navigation errors, and zero index title mismatch warnings
- [x] 3.2 Run `npx blume build --isolated` to verify that all static documentation pages build cleanly into `dist/`
- [x] 3.3 Test interactive navigation on the development server at `http://localhost:4321/xtc` and `http://localhost:4321/xlt` to confirm accordion groups collapse/expand, active page section remains open, no duplicate titles exist, and no blank pages are linked
