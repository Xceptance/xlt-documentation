# Tasks

## 1. Inventory Discovery and Git Baseline Streaming

- [x] 1.1 Implement Git baseline resolver in `scripts/verify-migration-content.ts` defaulting to the `develop` branch (resolving `develop` or `origin/develop`, with `--base <ref>` CLI override) and verify baseline commit resolution via command line invocation.
- [x] 1.2 Implement pre-migration baseline file streamer via `git ls-tree` and `git show <base>:<path>` without disk extraction, and verify file listing on baseline commit.
- [x] 1.3 Implement path mapping and inventory reconciliation table for renamed release notes (`v{number}.md`), flattened indices (`index.md`), pruned demo stubs, and new `meta.ts` files, and verify complete inventory accounting.

## 2. Syntax Normalization Pipeline

- [x] 2.1 Implement frontmatter sanitization to extract and compare page `title` while isolating migrated Hugo `weight`, `linkTitle`, and `layout` fields, and verify normalization on sample frontmatter.
- [x] 2.2 Implement callout and container normalizer converting Hugo `{{% note %}}` and Blume `:::note` structures to canonical blocks, and verify bidirectional equivalence.
- [x] 2.3 Implement inline shortcode normalizer converting `{{< relref >}}`, `{{< image >}}`, `{{% kbd %}}`, and stripping `{/* TODO */}` comments, and verify against sample shortcode strings.
- [x] 2.4 Implement code fence normalizer verifying verbatim equality of code block bodies while ignoring fence header metadata shifts (`bash` vs `properties title="..."`), and verify against configuration snippets.

## 3. Comparison Engine and Non-Destructive Invariant

- [x] 3.1 Implement line-by-line parity comparison engine with unified diff generation for content mismatches, and verify diff reporting on test fixtures.
- [x] 3.2 Implement read-only working tree guard asserting that `git status --porcelain content/en/` remains strictly clean before and after execution, and verify assertion behavior.

## 4. Audit Reporting and Verification Execution

- [x] 4.1 Implement structured markdown report generator emitting `migration-audit-report.md` with executive summary, inventory reconciliation tables, normalization documentation, and discrepancy diagnostics, and verify generated report format.
- [x] 4.2 Execute full parity audit across all 300+ documentation pages against the `develop` branch baseline, inspect audit metrics, and verify zero file modifications in the workspace.
- [x] 4.3 Add `npm run test:migration-parity` shortcut to `package.json` and verify the script runs cleanly through npm.
