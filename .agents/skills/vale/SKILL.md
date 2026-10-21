---
name: vale
description: Lint and improve documentation prose with Vale. Use when configuring Vale (.vale.ini), syncing style guides (Google, Microsoft, proselint, write-good), fixing prose alerts, managing technical vocabularies (accept.txt), running triage on alert backlogs, or comparing prose before and after style optimization.
---

# Vale Prose Linter for Documentation

Vale is an extensible, open-source linter for technical prose. It enforces editorial style guides, readability thresholds, terminology standards, and grammar rules across Markdown and MDX documents.

## Core Capabilities

- **Setup & Styles**: Configure `.vale.ini` with standard packages (`Google`, `Microsoft`, `proselint`, `write-good`).
- **Targeted Linting**: Check individual pages or documentation directories (`vale content/en/...`).
- **Terminology & Vocabularies**: Maintain approved technical terms in `styles/config/vocabularies/<Project>/accept.txt` to eliminate false positives on project-specific names (e.g., `XLT`, `XTC`, `HtmlUnit`, `WebDriver`).
- **Triaging & Backlog Management**: Group alerts by rule and severity to systematically address errors, downgrade warnings, or tune configurations.
- **Agent Fix Workflows**: Safely fix mechanical prose issues (passive voice, wordiness, heading punctuation) while preserving technical accuracy, code blocks, and Blume directives (`:::note`, `:::tip`).

---

## Configuration (`.vale.ini`)

A standard `.vale.ini` at the root of the repository:

```ini
StylesPath = styles
MinAlertLevel = suggestion

# Packages to download via `vale sync`
Packages = Google, proselint, write-good

# Global settings for Markdown and MDX files
[*.{md,mdx}]
BasedOnStyles = Vale, Google

# Ignore MDX import/export statements and Blume custom directives
BlockIgnores = (?s)(^---$.*?^---$), \
               (?s)(^:::[a-z]+(\[.*?\])?$.*?^:::$), \
               (?s)(^<[A-Z][A-Za-z0-9]*\b.*?/>)

TokenIgnores = `[^`]+`
```

> **Important**: Add `styles/` (except `styles/config/vocabularies/`) to `.gitignore` since downloaded style packages are build artifacts.

---

## Essential Commands

| Command | Action |
| :--- | :--- |
| `vale sync` | Download and update packages declared in `.vale.ini` |
| `vale content/` | Lint all files in `content/` with standard output |
| `vale --output=line <file>` | Output one alert per line (`file:line:col:rule:message`) |
| `vale --output=JSON <path>` | Output full structured JSON for agent analysis and scripting |
| `vale ls-config` | Verify active configuration and style paths |

---

## Vocabulary Management (`accept.txt`)

To teach Vale project-specific nouns without disabling spelling rules:

1. Create `styles/config/vocabularies/XLT/accept.txt`.
2. Add project-specific terms, one regex pattern per line:
   ```text
   XLT
   XTC
   Neodymium
   HtmlUnit
   WebDriver
   Scorecard
   Scorecards
   Groovy
   Virtual Threads
   ```
3. Enable in `.vale.ini`:
   ```ini
   Vocab = XLT
   ```

---

## Writing & Review Workflow

When applying Vale suggestions to documentation:
1. **Preserve Technical Meaning**: Never alter technical definitions or property names (`com.xceptance.xlt.*`) to appease a style rule.
2. **Prioritize Active Voice**: Replace passive constructions (*"The scenario is dispatched by the master"*) with direct active voice (*"The master dispatches the scenario"*).
3. **Trim Wordiness**: Replace phrases like *"in order to scale"* with *"to scale"*, and *"utilize"* with *"use"*.
4. **Cap Sentence Length**: Aim for under 22 words per sentence to maintain clarity for non-native English speakers.
5. **Protect Blume Directives**: Never alter or break directive tags (`:::note`, `:::warning[Title]`, `:::tip`).
