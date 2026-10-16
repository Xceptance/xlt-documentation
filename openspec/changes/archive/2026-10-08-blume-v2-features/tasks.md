# Tasks

## 1. Configuration & Site Modernization

- [x] 1.1 Add standard Blume 2.x `footer` with copyright, corporate links (Blog, Xceptance, Privacy Policy, Imprint), and social profiles (GitHub, LinkedIn, X) to `blume.config.ts`, and verify with `npm run validate`.
- [x] 1.2 Remove `navigation.featured` external links from `blume.config.ts` to declutter the top header navigation.
- [x] 1.3 Enable `markdown.externalLinks: true`, `lastModified: "git"`, and `export: { pdf: true }` in `blume.config.ts`.

## 2. Directory Index Cards for Topic Chapters

- [x] 2.1 Update XLT chapter `meta.ts` files (`about`, `quick-start`, `manual`, `advanced`, `test-suites`, `how-tos`, `knowledgebase`) and product root `xlt/meta.ts` with `directory: "card"`, and verify that `xlt/release-notes` remains excluded (`directory: "none"`).
- [x] 2.2 Update XTC chapter `meta.ts` files (`basics`, `loadtesting`, `monitoring`, `integrations`) and product root `xtc/meta.ts` with `directory: "card"`, and verify that `xtc/xtc-release-notes` remains excluded (`directory: "none"`).
- [x] 2.3 Update Neodymium chapter `meta.ts` files (`quick-start`, `browsers`, `configuration`, `features`, `framework`, `integrations`, `miscellaneous`) and product root `neodymium/meta.ts` with `directory: "card"`, and verify that `release-notes` remains excluded (`directory: "none"`).
- [x] 2.4 Update chapter `index.md` files from `sidebar: hidden: true` to `sidebar: label: "Overview"` across all topic chapters so their overview landing pages with directory cards are exposed in the sidebar navigation.

## 3. Homepage Search Polish

- [x] 3.1 Streamline the search trigger script in `pages/index.astro` to rely on standard `data-blume-search-open` while preserving the visual `<kbd id="hero-search-kbd">⌘K</kbd>` badge and macOS/Windows detection.

## 4. Build & Validation

- [x] 4.1 Run `npm run validate` (and `blume validate --strict`) to confirm zero broken links, schema diagnostics, or navigation warnings.
- [x] 4.2 Run `npm run build` to verify end-to-end static site generation with all directory card hubs and footer elements.

