# Proposal: Fix Blume Validation Warnings

## Why

Following the upgrade to Blume 2.2.1, `npm run validate` (`blume validate`) detected 14 content validation warnings across 7 documentation files. These warnings represent malformed remark-directive opening tags, unbracketed callout titles causing content loss, unrecognized Shiki code highlight languages, unsupported alert syntax in a standard `.md` file, and an invalid camelCase anchor target.

Fixing these warnings ensures full Blume 2 validation conformance (0 warnings, 0 errors), eliminates silently discarded callout text, restores proper syntax highlighting, fixes broken in-page navigation anchors, and ensures callouts render properly across all documentation pages.

## What Changes

- **Fix remark-directive syntax**: Add necessary newlines and whitespace after `:::note` opening tags across `jenkins.mdx`, `evaluate-a-test.mdx`, and `v4_13_x.mdx` so directive names are recognized (`note` instead of `noteNote`, `noteWhen`, `noteWindows`, `noteFor`).
- **Fix unbracketed directive titles / opening text**: Move inline opening text into directive bodies for `jenkins.mdx` and `debug-data-result-browser.mdx` so text is not dropped by the remark-directive parser.
- **Normalize Shiki code block languages**: Replace unsupported language identifiers `dos` and `cfg` with valid Shiki IDs or plain text (`bash`, `text`, `properties`) in `test-evaluation.mdx`, `test-suite-configuration.mdx`, and `xlt-test-execution.mdx`.
- **Convert GitHub alert to MDX**: Convert `base-rest-test-suite.md` to `.mdx` (and standard `:::warning` callout syntax) so that GitHub alert callouts render as styled components rather than raw markdown quote text.
- **Fix broken internal anchor target**: Correct the camelCase anchor `#SuccessCriteriaValidationTool` to the generated kebab-case slug `#success-criteria-validation-tool` in `v4_11_x.mdx`.
- **Verify validation**: Ensure `npm run validate` passes cleanly with 0 warnings.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `docs-site`: Clarify callout directive syntax conformance, supported Shiki code highlighting languages, and zero-warning validator cleanliness across content files.

## Impact

- Documentation content files in `content/en/xlt/`:
  - `content/en/xlt/advanced/jenkins.mdx`
  - `content/en/xlt/how-tos/debug-data-result-browser.mdx`
  - `content/en/xlt/manual/test-evaluation.mdx`
  - `content/en/xlt/manual/test-suite-configuration.mdx`
  - `content/en/xlt/manual/xlt-test-execution.mdx`
  - `content/en/xlt/quick-start/evaluate-a-test.mdx`
  - `content/en/xlt/release-notes/v4_11_x.mdx`
  - `content/en/xlt/release-notes/v4_13_x.mdx`
  - `content/en/xlt/test-suites/base-rest-test-suite.md` -> `.mdx`
- No build configuration (`blume.config.ts`), package dependencies, or public URLs/routes are changed.

