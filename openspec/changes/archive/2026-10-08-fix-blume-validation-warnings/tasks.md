# Tasks: Fix Blume Validation Warnings

## 1. Fix Callout Directive Syntax

- [x] 1.1 Reformat run-on directives and unbracketed opening lines in `content/en/xlt/advanced/jenkins.mdx` (lines 72, 76, 102, 159, 222) into standard multi-line `:::note` blocks, and verify remark-directive diagnostics for this file are cleared
- [x] 1.2 Reformat unbracketed opening line in `content/en/xlt/how-tos/debug-data-result-browser.mdx` (line 47) into standard multi-line `:::note` block, and verify no text is discarded
- [x] 1.3 Reformat run-on directive in `content/en/xlt/quick-start/evaluate-a-test.mdx` (line 17) into standard multi-line `:::note` block
- [x] 1.4 Reformat run-on directive in `content/en/xlt/release-notes/v4_13_x.mdx` (line 34) into standard multi-line `:::note` block

## 2. Fix Code Syntax Languages & Anchor Links

- [x] 2.1 Replace unsupported code block language `dos` with `text` in `content/en/xlt/manual/test-evaluation.mdx` (line 245)
- [x] 2.2 Replace unsupported code block language `cfg` with `properties` in `content/en/xlt/manual/test-suite-configuration.mdx` (line 157)
- [x] 2.3 Replace unsupported code block language `dos` with `bash` (command line) and `log` (console output) in `content/en/xlt/manual/xlt-test-execution.mdx` (lines 44, 55)
- [x] 2.4 Update camelCase anchor `#SuccessCriteriaValidationTool` to `#success-criteria-validation-tool` in `content/en/xlt/release-notes/v4_11_x.mdx` (line 358)

## 3. Convert GitHub Alert Markdown to MDX

- [x] 3.1 Rename `content/en/xlt/test-suites/base-rest-test-suite.md` to `base-rest-test-suite.mdx` and replace `> [!WARNING]` with standard `:::warning` directive syntax

## 4. Validation & Verification

- [x] 4.1 Run `npm run validate` and verify the output exits with status code 0 and reports 0 warnings and 0 errors
- [x] 4.2 Run `npm run build` and verify static production build completes successfully with all pages and search index generated

