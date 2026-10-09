# Tasks

## 1. Audit and Migration Script

- [x] 1.1 Create a migration script to identify code blocks across `content/en/` marked with `bash` or `sh` that contain Java properties key-value lines and detect surrounding file name context (e.g. `project.properties`, `default.properties`, `test.properties`, `dev.properties`, `reportgenerator.properties`), verifying that genuine shell commands are excluded.
- [x] 1.2 Execute the migration script across `content/en/` to update code fence markers to `properties` (with `title="..."` where context specifies a file), and verify the diff summary.

## 2. Review and Fine-Tuning

- [x] 2.1 Review and fine-tune updated code blocks in XLT manual and quick-start pages (`content/en/xlt/manual/`, `content/en/xlt/quick-start/`), verifying correct file titles and formatting.
- [x] 2.2 Review and fine-tune updated code blocks in XLT advanced guides and how-tos (`content/en/xlt/advanced/`, `content/en/xlt/how-tos/`).
- [x] 2.3 Review and fine-tune updated code blocks in release notes (`content/en/xlt/release-notes/`, `content/en/xtc/`, `content/en/neodymium/`).
- [x] 2.4 Verify that genuine shell commands and CLI execution examples across all documentation files remain marked with `bash`, `sh`, or `console`.

## 3. Validation and Build Verification

- [x] 3.1 Run `npm run build` to verify that all pages compile cleanly with zero Shiki syntax errors or markdown warnings.
- [x] 3.2 Spot check the built HTML output to verify that code blocks render `properties` highlighting without Bash terminal icons.

