## Why

When navigating to `/xlt`, the left sidebar fails to display the XLT documentation tree and instead falls back to displaying top-level site links (`Blog`, `GitHub`, `XLT`, `XTC`, `Neodymium`). This occurs because a demo page (`content/en/xlt/about/000-demo/index.mdx`) contains `slug: this is just an overwritten url`, which Blume interprets as an absolute root route override. During sidebar generation, this rogue route corrupts the parent `xlt` folder group's path to `"/this is just an overwritten url"`, preventing Blume's tab-scoping logic from matching `/xlt`. Additionally, the XLT chapters currently lack explicit ordering and metadata configuration, defaulting to alphabetical sorting rather than the logical sequence from the original site.

## What Changes

- Remove the rogue `slug: this is just an overwritten url` from `content/en/xlt/about/000-demo/index.mdx`, allowing the page and its parent folder hierarchy (`/xlt/about/...`) to resolve cleanly under `/xlt`.
- Configure `content/en/xlt/meta.ts` using Blume's `defineMeta` to enforce the canonical XLT chapter ordering (`about`, `quick-start`, `manual`, `advanced`, `test-suites`, `release-notes`, `how-tos`, `knowledgebase`).
- Configure chapter `meta.ts` files where needed to match legacy section titles (e.g., `manual` $\rightarrow$ "Base Manual", `how-tos` $\rightarrow$ "How-Tos", `knowledgebase` $\rightarrow$ "Knowledge Base").
- Verify that navigating to `/xlt` renders the complete, properly ordered XLT navigation tree in the left sidebar and passes `blume validate --strict` and `blume build --strict`.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `docs-site`: Refine the multi-product navigation tab scoping and section ordering requirements so that navigating to `/xlt` renders the full XLT chapter tree in the defined logical sequence with correct group labels.

## Impact

- Affected files:
  - `content/en/xlt/about/000-demo/index.mdx` (frontmatter fix)
  - `content/en/xlt/meta.ts` (new section metadata for chapter ordering)
  - `content/en/xlt/manual/meta.ts`, `content/en/xlt/how-tos/meta.ts`, `content/en/xlt/knowledgebase/meta.ts` (group title metadata)
- No external APIs or dependencies changed.

