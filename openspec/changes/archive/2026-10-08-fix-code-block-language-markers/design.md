# Design

## Context

See `proposal.md` for motivation. Currently, roughly 199 code blocks across 31+ files in `content/` use ```` ```bash ```` to display Java configuration settings (primarily XLT and Neodymium property keys such as `com.xceptance.xlt.* = ...`). In Blume, Shiki renders a GNU Bash terminal icon and "Bash" tab title for these blocks, misleading users into thinking they are terminal commands rather than file configuration.

## Goals / Non-Goals

**Goals:**
- Convert all Java properties configuration blocks across `content/en/` from `bash` / `sh` to `properties`.
- Add `title="<filename>"` (e.g. `title="project.properties"`, `title="default.properties"`, `title="test.properties"`) whenever surrounding context names the specific configuration file.
- Preserve `bash`, `sh`, and `console` markers for genuine executable terminal commands and CLI scripts.
- Ensure all updated blocks render with correct syntax highlighting and zero build warnings or errors in Blume.

**Non-Goals:**
- Changing non-configuration snippets (such as Java source code, XML descriptors, YAML, JSON).
- Rewriting or modifying the actual content of properties or documentation prose.
- Creating custom Shiki language extensions (Shiki already bundles `properties` natively).

## Decisions

### 1. Language marker: `properties`
- **Choice**: Use standard Shiki `properties` identifier.
- **Rationale**: `properties` is natively supported by Shiki, colors dotted Java package keys (`com.xceptance.xlt...`), delimiters (`=`, `:`), values, and comments (`#`, `!`) correctly, and avoids showing a shell terminal icon.
- **Alternatives considered**:
  - `ini`: Highlights `[sections]` and generic `key = val`, but handles dotted keys poorly.
  - `text` / `plaintext`: Provides no syntax highlighting.

### 2. File title attribution: `title="<filename>"`
- **Choice**: Add `title="..."` attribute to the fence header when the immediate context specifies the target file (e.g., ```` ```properties title="project.properties" ````).
- **Rationale**: Blume's Shiki transformer promotes `title="..."` into `data-title`, displaying the file name directly in the header bar instead of the generic word `properties`. Where no specific file is mentioned in context, use bare ```` ```properties ````.

### 3. Inspection and Conversion Strategy
- **Choice**: Combination of an automated migration script and targeted manual validation:
  1. Scan all fenced code blocks in `content/en/**/*.md` and `content/en/**/*.mdx`.
  2. Identify blocks currently tagged as `bash` or `sh` whose contents are property key-value assignments (e.g. `com.xceptance.*` or `key = value` format with `#` comments).
  3. Extract nearby file mentions (e.g. `project.properties`, `default.properties`, `dev.properties`, `test.properties`, `reportgenerator.properties`) in the preceding paragraph to assign `title="..."`.
  4. Ensure shell command indicators (e.g., `cd `, `./bin`, `mvn `, `git `, `export `, `curl `) are never converted.
  5. Validate via `npm run build` and visual spot checks.

## Risks / Trade-offs

- **[Risk] Mistagging shell environment variables (`export KEY=val` or `KEY=val command`) as properties**:
  - *Mitigation*: Script checks for shell command structures and excludes any block containing shell commands or execution prompts.
- **[Risk] Multiple property files mentioned in introductory text**:
  - *Mitigation*: If multiple filenames are referenced or the target file is ambiguous, use bare ```` ```properties ```` without `title="..."`.
- **[Risk] Build or syntax highlighter failure**:
  - *Mitigation*: Verify Shiki parsing across the entire site by running `npm run build` and `blume check`.

