# Proposal

## Why

AI coding assistants (such as Claude Code, Cursor, Windsurf, and Antigravity) are increasingly used by performance engineers to configure load tests and analyze results. However, foundational LLMs often hallucinate outdated properties, improper concurrency settings, or invalid XPath expressions when dealing with specialized XLT configurations. 

To ensure automated assistants generate production-grade XLT configurations and correctly interpret load test results, the documentation portal needs to publish a dedicated suite of task-specific, RFC-compliant Agent Skills covering the full testing lifecycle from profile setup to report evaluation.

## What Changes

- Author and publish five new dedicated Agent Skills (and refine the existing scorecard skill) under `./skills/` conforming to the Agent Skills Discovery RFC (v0.2.0):
  1. `xlt-load-setup`: Load profile modeling (arrival rate vs concurrent users, linear/stepped ramp-ups, dynamic load functions, load factors, Java 21 virtual threads, and test sizing).
  2. `xlt-scorecards`: Quality gating and automated SLA assertions using the XLT 10 Groovy DSL (`config/scorecard.groovy`, `xpathBuilder`, `data.getList`, and `./bin/update_scorecard.sh`).
  3. `xlt-merge-rules`: Request consolidation, REST URL parameter normalization, regex capturing groups, and drop rules (`config/merge-rules.properties`).
  4. `xlt-labeling-rules`: Non-destructive semantic tagging across transactions, actions, and requests, multi-pass pipelines, and downstream scorecard/report integrations.
  5. `xlt-report-colorization`: Threshold-based table cell colorization in test reports (`mean`, percentiles, `<green> <target> <red>` bounds, matching by regex or semantic label).
  6. `xlt-report-evaluation`: Systematic test result evaluation across HTML reports, `ai-data.md` (Schema v2), and `testreport.xml`, covering 3-layer bottleneck triage, arrival rate delivery validation, error burst triage, and agent resource health.
- Update the documentation skill catalog in `content/en/xlt/how-tos/ai-agent-skills.mdx` with catalog descriptions, one-liner `claude skill install` commands, and IDE curl scaffolding instructions.
- Add contextual callout directives across core manual pages linking directly to the corresponding skills.

## Capabilities

### Modified Capabilities
- `docs-site`: Adds requirements and testable scenarios for publishing, serving, and discovering dedicated XLT Agent Skills under `/.well-known/agent-skills/` and indexing them in `blume-search.json` and `/.well-known/agent-skills/index.json`.

## Impact

- **Skills Directory**: Creates new playbooks in `skills/xlt-load-setup/SKILL.md`, `skills/xlt-merge-rules/SKILL.md`, `skills/xlt-labeling-rules/SKILL.md`, `skills/xlt-report-colorization/SKILL.md`, `skills/xlt-report-evaluation/SKILL.md`, and refines `skills/xlt-scorecards/SKILL.md`.
- **Documentation**: Updates `content/en/xlt/how-tos/ai-agent-skills.mdx` and adds cross-references in `content/en/xlt/manual/load-configuration.mdx`, `content/en/xlt/advanced/merge-rules.mdx`, `content/en/xlt/advanced/labeling-rules.mdx`, `content/en/xlt/manual/report-configuration.mdx`, and `content/en/xlt/manual/test-evaluation.mdx`.
- **Build / Runtime**: Pure static generation through Blume's native `agents.skills` pipeline. No additional npm dependencies or server runtimes.
