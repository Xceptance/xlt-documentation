# Design: Fix Blume Validation Warnings

## Context

Following the upgrade to Blume 2.2.1, `blume validate` performs deep AST linting of content files. It reported 14 non-fatal content warnings across 7 files. See [proposal.md](proposal.md) for background and motivation.

## Goals / Non-Goals

**Goals:**
- Eliminate all 14 validator warnings so `npm run validate` completes with 0 warnings and 0 errors.
- Ensure all directive callouts render as intended with zero dropped text.
- Provide valid Shiki syntax highlighting languages for code fences.
- Maintain identical URL routing, page titles, navigation hierarchy, and visual fidelity.

**Non-Goals:**
- Modifying site configuration (`blume.config.ts`) or build tooling.
- Rewriting documentation prose beyond fixing syntax tags and formatting fences.
- Adding new pages or altering navigation metadata.

## Decisions

### 1. Multi-line Remark-Directive Formatting
**Decision**: Reformat all run-on directive tags (`:::noteNote`, `:::noteWhen`, `:::noteWindows`, `:::noteFor`) to multi-line directive blocks with explicit opening and closing lines:
```markdown
:::note
Note that with the default configuration...
:::
```
For unbracketed opening lines (`:::note Feel free to look at...`), move the text into the block body.

*Alternatives considered*:
- Using bracketed titles `:::note[Feel free to look at...]`: Rejected for long multi-line sentences, as callout titles should be brief headings, not full explanatory paragraphs. Placing the full text in the block body is cleaner and preserves readability.

### 2. Shiki Language Mapping
**Decision**: Map unsupported code block language identifiers to recognized Shiki language IDs:
- `manual/test-evaluation.mdx:245` (`dos` interactive menu) -> `text`
- `manual/test-suite-configuration.mdx:157` (`cfg` JVM argument) -> `properties`
- `manual/xlt-test-execution.mdx:44` (`dos` terminal commands `cd <XLT>/bin; ./agentcontroller.sh`) -> `bash`
- `manual/xlt-test-execution.mdx:55` (`dos` log timestamps and levels) -> `log`

*Rationale*: Shiki provides syntax tokens for `bash`, `properties`, and `log`, while falling back safely to `text`. None of these snippets represent DOS batch scripts.

### 3. Convert `base-rest-test-suite.md` to `.mdx`
**Decision**: Rename `content/en/xlt/test-suites/base-rest-test-suite.md` to `.mdx` and convert `> [!WARNING]` to standard Blume directive `:::warning ... :::`.

*Rationale*: Blume does not transform `> [!WARNING]` to component callouts in `.md` files (it renders as a literal quote block with the text `[!WARNING]`). Blume treats `.md` and `.mdx` identically for URL generation (`/xlt/test-suites/base-rest-test-suite/`), so route paths remain unchanged.

### 4. Anchor Slug Normalization
**Decision**: Update `[Success Criteria Validation Tool](#SuccessCriteriaValidationTool)` in `release-notes/v4_11_x.mdx:358` to `#success-criteria-validation-tool`.

*Rationale*: Heading slugification produces lowercase kebab-case IDs from heading titles (`#### Success Criteria Validation Tool` -> `id="success-criteria-validation-tool"`).

## Risks / Trade-offs

- **[Risk]** Renaming `.md` to `.mdx` in `base-rest-test-suite` could cause MDX parse issues if unescaped `<` or `{` characters are present.
  → **Mitigation**: Inspect the file contents beforehand; `base-rest-test-suite.md` contains only plain text, bullet points, bold markers, and standard markdown links.

