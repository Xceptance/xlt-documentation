# Proposal

## Why

Following the migration of over 300 documentation pages from Hugo to Blume, automated verification is required to guarantee content integrity—ensuring that no documentation prose, instructions, code snippets, or assets were lost, corrupted, or unintentionally altered. 

Because the migration necessitated deliberate syntax transformations (such as converting Hugo shortcodes to Blume MDX directives, moving navigation frontmatter into `meta.ts`, and annotating Java properties code fences), a standard text diff produces false positives. A deterministic, strictly non-destructive parity audit is needed to compare the current Blume documentation against the pre-migration `develop` branch baseline, normalizing syntax differences while proving prose equivalence and generating a documented audit report.

## What Changes

- **Non-Destructive Parity Verification Engine**: Introduce a read-only verification runner (`scripts/verify-migration-content.ts`) that streams original file contents directly from Git (`git show <base>:<path>`) and compares them against current files on disk without modifying, formatting, or creating any files in `content/en/`.
- **Git Baseline Verification against `develop`**: Compare documentation content against the `develop` branch (resolving `develop` or `origin/develop`, with `--base <ref>` option to override if needed).
- **Inventory Reconciliation & Path Mapping**: Account for known structural migrations, such as release note prefixing (`{number}.md` → `v{number}.md`), flattened section indices (`_index.md` → `index.md`), pruned Hugo theme demo stubs (`xlt/about/000-demo`, `software.md`), and new `meta.ts` navigation files.
- **Syntax Normalization Pipeline**: Strip syntax artifacts that differ purely due to framework mechanics while preserving content integrity:
  - Frontmatter: exclude navigation/weight metadata while verifying title and core page metadata.
  - Callouts: normalize Hugo `{{% note %}}` / `{{% warning %}}` and Blume `:::note` / `:::warning` containers to canonical semantic blocks.
  - Shortcodes & Links: normalize Hugo `{{< relref >}}`, `{{< image >}}`, `{{% kbd %}}`, and `{{% ctext %}}` into their markdown equivalents.
  - Code Blocks: ignore code fence header metadata differences (`bash` vs `properties title="..."`) while strictly verifying that code block bodies match byte-for-byte.
- **Audit Documentation and Reporting**: Generate a comprehensive verification report documenting all inspected files, parity classification (identical, normalized match, deliberate structural change, unexpected discrepancy), and clear actionable diffs if discrepancies occur.

## Capabilities

### Modified Capabilities
- `docs-site`: Adds requirements for documentation migration parity verification, non-destructive audit execution, inventory reconciliation, and audit report generation.

## Impact

- **Tools & Scripts**: Adds `scripts/verify-migration-content.ts` (executable via `npx tsx scripts/verify-migration-content.ts` or `npm run test:migration-parity`).
- **Content Files**: Strictly zero changes to `content/en/**` or `blume.config.ts`.
- **Audit Deliverable**: Emits a structured audit report (`migration-audit-report.md`) detailing the exact verification coverage, normalization rules applied, and audit findings.
