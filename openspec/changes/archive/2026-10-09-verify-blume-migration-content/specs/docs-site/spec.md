# Spec Delta

## ADDED Requirements

### Requirement: Migration Parity and Read-Only Verification
The documentation verification tool SHALL verify content parity between the pre-migration `develop` branch baseline and current documentation files without modifying, deleting, formatting, or creating any files in the documentation content directories.

#### Scenario: Non-destructive verification execution
- **WHEN** the content parity verification script is executed against a Git baseline
- **THEN** all files under `content/en/` and site configuration files retain identical checksums, timestamps, and git status before and after execution.

#### Scenario: Baseline branch selection
- **WHEN** the content parity verification script is executed
- **THEN** the script fetches baseline content from the `develop` branch (resolving `develop` or `origin/develop`), supports overriding the target reference via `--base <ref>`, and aborts with a descriptive error message if the reference cannot be resolved.

### Requirement: Syntax Normalization and Equivalence Comparison
The verification system SHALL normalize framework-specific syntax variations between Hugo and Blume prior to diffing, ensuring true markdown prose and semantic equivalence is measured without false positives from structural syntax migration.

#### Scenario: Shortcode and directive equivalence
- **WHEN** comparing Hugo callout shortcodes (`{{% note %}}`, `{{% warning %}}`, `{{% tip %}}`, `{{% danger %}}`) against Blume directives (`:::note`, `:::warning`, `:::tip`, `:::danger`)
- **THEN** the normalizer treats them as equivalent semantic blocks and verifies that the enclosed markdown prose matches identically.

#### Scenario: Inline shortcode normalization
- **WHEN** baseline content contains Hugo inline shortcodes (`{{< relref >}}`, `{{< image >}}`, `{{% kbd %}}`, `{{% ctext %}}`, `{/* TODO */}`)
- **THEN** the normalizer extracts the inner text, link targets, or keyboard keys to compare against standard Blume markdown links and formatted inline text.

#### Scenario: Code block body fidelity
- **WHEN** documentation code fences differ in language metadata annotations (such as Hugo `bash` or `sh` updated to Blume `properties title="project.properties"`)
- **THEN** the comparison ignores fence language tag differences and strictly asserts that every line within the code fence body matches identically.

#### Scenario: Frontmatter normalization
- **WHEN** baseline frontmatter contains navigation weight or link title properties that were migrated to Blume `meta.ts`
- **THEN** the normalizer validates page title and frontmatter parity while ignoring migrated sidebar ordering properties.

### Requirement: Inventory Reconciliation and Path Mapping
The verification system SHALL account for all historical files present in the Git baseline against current Blume files, tracking renames, flattening, deliberate removals, and additions.

#### Scenario: Release note version prefix mapping
- **WHEN** auditing release notes previously named `{number}.md` in Hugo that were renamed to `v{number}.md` in Blume
- **THEN** the system maps the pre-migration path to the renamed Blume path and verifies content parity.

#### Scenario: Index file flattening
- **WHEN** auditing Hugo section indices (`_index.md`) that were restructured to Blume (`index.md`)
- **THEN** the system maps the file paths and verifies the content parity.

#### Scenario: Inventory reconciliation accounting
- **WHEN** inventory includes known pruned demo pages (e.g., Hugo theme demo pages `xlt/about/000-demo`, `software.md`, `search.md`) or new Blume `meta.ts` navigation files
- **THEN** the system classifies them as deliberate structural adjustments rather than missing or orphaned documentation.

### Requirement: Parity Audit Reporting and Documentation
The verification system SHALL generate a documented audit report detailing verification methodology, normalizations applied, coverage statistics, and detailed diffs for any detected discrepancies.

#### Scenario: Comprehensive audit summary output
- **WHEN** the verification script completes
- **THEN** it outputs an audit report summarizing total pre-migration files, total Blume files, 100% matched pages, normalized matches, deliberate inventory changes, and discrepancy counts.

#### Scenario: Discrepancy reporting and diagnostics
- **WHEN** unintended textual divergence or content loss is detected in a document
- **THEN** the audit report records the exact file path, line numbers, and a contextual unified diff illustrating the missing or altered text, exiting with a non-zero exit code.
