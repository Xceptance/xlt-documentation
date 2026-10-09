# Design

## Context

See [proposal.md](file:///Users/rbaumgarten/checkouts/xlt-documentation/openspec/changes/verify-blume-migration-content/proposal.md) for motivation.

The documentation was migrated from Hugo to Blume across more than 300 content files. During this migration:
- Hugo shortcodes (`{{% note %}}`, `{{< relref >}}`, `{{< image >}}`, `{{% kbd %}}`) were converted to Blume MDX directives (`:::note`) and standard markdown syntax.
- Navigation metadata (`weight`, `linkTitle`) was extracted from page frontmatter into Blume `meta.ts` files.
- Code blocks had their language annotations refined (e.g., `bash` changed to `properties title="..."`).
- File paths were reorganized (e.g., XTC release note numbers prefixed with `v`, `_index.md` files renamed to `index.md`, and Hugo demo stubs pruned).

The verification must run strictly read-only against the pre-migration `develop` branch baseline (resolving `develop` or `origin/develop`, with `--base <ref>` override support) without writing or formatting any files in `content/en/`.

## Goals / Non-Goals

**Goals:**
- Provide a standalone, zero-dependency audit tool (`scripts/verify-migration-content.ts`) executable via `npx tsx scripts/verify-migration-content.ts`.
- Guarantee zero modification to documentation files (`content/en/**`) and configuration files by reading baseline files via `git show <base>:<path>` and current files via read-only file streams.
- Target the `develop` branch by default as the pre-migration baseline (resolving local `develop`, then remote `origin/develop`), with `--base <ref>` support to allow overriding when necessary.
- Implement a 4-stage verification architecture: Inventory Reconciliation → Path Mapping → Syntax Normalization → Parity Diffing & Report Generation.
- Provide 100% coverage accounting: every single file on the pre-migration baseline must be accounted for (as identical, normalized equivalent, renamed, or deliberately pruned).
- Generate a detailed, human-readable markdown audit report (`migration-audit-report.md`) and rich terminal summary with unified diffs for any discrepancies.

**Non-Goals:**
- Automatically modifying, formatting, or patching content files (any issues discovered by the audit must be reported, not silently edited).
- Validating rendered HTML/CSS styling or visual browser screenshots.
- Replacing the existing static docs build check (`blume build`) or markdown linter.

## Decisions

### 1. In-Memory Git Streaming without Worktrees or Disk Mutations
- **Decision**: Read baseline files directly using `git show <base>:<path>` into memory buffers, and read current files directly via `fs.readFileSync()`.
- **Rationale**: Completely eliminates any risk of accidental file writes, worktree creation, git index corruption, or file timestamp modifications in `content/en/`.
- **Alternatives Considered**:
  - `git worktree add /tmp/...`: Creates temporary file checkouts on disk, requires disk space, and risks leaving orphaned directories or tripping sandbox file permissions.
  - `git checkout <base>`: Mutates the active working tree; completely prohibited by the non-destructive requirement.

### 2. Multi-Stage Deterministic Normalization Pipeline
- **Decision**: Process baseline and target contents through a series of pure normalization transforms before comparing:
  1. *Frontmatter Sanitization*: Extract `title` (and `description` if present). Strip Hugo navigation metadata (`weight`, `linkTitle`, `type`, `layout`, `draft`) and Blume-specific frontmatter (`sidebar`, `toc`).
  2. *Callout & Container Alignment*: Convert Hugo `{{% note %}}...{{% /note %}}`, `{{% warning %}}`, `{{% tip %}}`, `{{% danger %}}` to standardized `:::note`, `:::warning`, `:::tip`, `:::danger` tokens.
  3. *Shortcode Expansion*:
     - `{{< relref "target" >}}` → `target`
     - `{{< image "src" ... >}}` → markdown image reference `![...](src)`
     - `{{% kbd "KEY" %}}` → `<kbd>KEY</kbd>`
     - `{{% ctext %}}` → inline code/text
     - Strip `{/* TODO */}` comments.
  4. *Code Fence Alignment*: Normalize fence open tags (` ```properties title="..." ` vs ` ```bash ` or ` ```properties `) to a generic ` ```code ` token, while strictly asserting that every interior line of code matches byte-for-byte.
  5. *Whitespace Canonicalization*: Strip trailing whitespace on lines, normalize line endings (`\r\n` → `\n`), and collapse multiple empty lines to a single blank line.
- **Rationale**: Keeps diffs clean and focused on actual prose and technical accuracy, avoiding false positives from framework syntax shifts.
- **Alternatives Considered**:
  - Remark/Unified AST diffing: Parsing ASTs for Hugo shortcodes inside markdown often fails or treats shortcodes as malformed raw HTML text, resulting in brittle AST comparisons. A targeted regex-based normalizer is transparent, deterministic, and easily debugged.

### 3. Explicit Inventory Reconciliation Table
- **Decision**: Maintain a declarative mapping table in the verification script for known architectural migrations:
  - *Release Notes Renaming*: Maps `content/en/xtc/xtc-release-notes/{N}.md` → `content/en/xtc/xtc-release-notes/v{N}.md`.
  - *Index Flattening*: Maps `content/en/{section}/_index.md` → `content/en/{section}/index.md`.
  - *Deliberate Pruning*: Explicit list of files pruned during migration:
    - Hugo demo pages: `content/en/xlt/about/000-demo/**`
    - Stubs: `content/en/xlt/about/software.md`, `content/en/search.md`
    - Removed Hugo templates: `content/en/**/_index.html`
  - *Blume Additions*: Explicit list of valid new files:
    - `content/en/**/meta.ts` navigation descriptors.
    - New Overview hubs for release notes.
- **Rationale**: Prevents genuine content loss from being dismissed as "just a rename", while ensuring no orphan files are ignored.

### 4. Comprehensive Markdown Audit Report Structure
- **Decision**: Emit both a concise terminal report with colored ANSI status and an artifact report `migration-audit-report.md` structured as:
  1. *Executive Summary*: Total pre-migration files, total Blume files, match rate percentage, deliberate changes count, discrepancy count.
  2. *Verification Methodology & Normalizations*: Documentation of all rules applied during comparison.
  3. *Inventory Accounting*: Categorized tables of matched files, renamed files, and pruned demo files.
  4. *Discrepancy Log*: Detailed unified diffs and file locations for any file with unmatched content.

## Risks / Trade-offs

- **[Risk]** The `develop` branch ref is not yet fetched or checked out in the local clone.
  → **Mitigation**: The runner attempts to resolve `develop` locally, then checks `origin/develop`. If neither exists locally, the runner provides an actionable error message guiding the user to fetch the `develop` branch (`git fetch origin develop:develop`), or allows specifying `--base <ref>` as an override.
- **[Risk]** Normalization could inadvertently mask genuine text deletions.
  → **Mitigation**: Normalizer rules only strip known framework wrapper tags (delimiters); all inner prose text, list structures, tables, and code block bodies are strictly compared. Any diff inside the body is flagged as a mismatch.
- **[Risk]** Read-only verification accidentally writes to disk or modifies git worktree.
  → **Mitigation**: The runner contains an assertion check before exiting that runs `git status --porcelain content/en/` to confirm that the working tree remains 100% untouched.
