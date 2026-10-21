# Tasks

## 1. Test Setup & Rule Processing Skills

- [ ] 1.1 Author `skills/xlt-load-setup/SKILL.md` covering user count vs. arrival rate models, concurrency ceilings, linear/stepped ramp-ups, dynamic load functions, load factors, Java 21 virtual threads, and test sizing, verifying valid YAML frontmatter
- [ ] 1.2 Author `skills/xlt-merge-rules/SKILL.md` covering request bucketing, pattern matchers (`namePattern`, `urlPattern`, `urlText`, `statusCodePattern`), capturing group placeholders (`{n:1}`, `{u:2}`), exclusion rules, and flow control (`stopOnMatch`, `dropOnMatch`), verifying valid YAML frontmatter
- [ ] 1.3 Author `skills/xlt-labeling-rules/SKILL.md` covering non-destructive semantic tags for transactions, actions, and requests, multi-pass pipelines (`stopOnMatch = false`), dynamic placeholders (`{n}`, `{l}`), and downstream integrations, verifying valid YAML frontmatter

## 2. Reporting, Quality Gating & Evaluation Skills

- [ ] 2.1 Refine `skills/xlt-scorecards/SKILL.md` to ensure comprehensive coverage of Groovy DSL bindings, `xpathBuilder` helpers, label-based queries, dynamic rule generation with `data.getList`, and `./bin/update_scorecard.sh` workflows
- [ ] 2.2 Author `skills/xlt-report-colorization/SKILL.md` covering `<green> <target> <red>` threshold syntax, `mean` and percentile boundaries, one-sided rules, and name/label matching rules in `reportgenerator.properties`
- [ ] 2.3 Author `skills/xlt-report-evaluation/SKILL.md` covering three-layer latency triage (backend vs client vs thinktime), arrival rate stability, error burst vs sustained drift analysis, web vitals, and agent resource health across HTML and `ai-data.md` reports

## 3. Documentation Catalog & In-Doc Cross-Linking

- [ ] 3.1 Update `content/en/xlt/how-tos/ai-agent-skills.mdx` with catalog entries, Claude Code install commands, and IDE curl scaffolding for all 6 XLT skills
- [ ] 3.2 Add contextual Blume `:::tip[Agent Skill]` callouts to `content/en/xlt/manual/load-configuration.mdx` and `content/en/xlt/how-tos/load-model.md` pointing to `xlt-load-setup`
- [ ] 3.3 Add contextual Blume `:::tip[Agent Skill]` callout to `content/en/xlt/advanced/merge-rules.mdx` pointing to `xlt-merge-rules`
- [ ] 3.4 Add contextual Blume `:::tip[Agent Skill]` callout to `content/en/xlt/advanced/labeling-rules.mdx` pointing to `xlt-labeling-rules`
- [ ] 3.5 Add contextual Blume `:::tip[Agent Skill]` callout to `content/en/xlt/manual/report-configuration.mdx` pointing to `xlt-report-colorization`
- [ ] 3.6 Add contextual Blume `:::tip[Agent Skill]` callout to `content/en/xlt/manual/test-evaluation.mdx` pointing to `xlt-report-evaluation`

## 4. Build, Discovery Catalog & Link Validation

- [ ] 4.1 Run `npm run validate` and verify that zero broken links, invalid directives, or frontmatter errors are reported
- [ ] 4.2 Run `npm run build` and verify that `dist/.well-known/agent-skills/index.json` contains all published skills and all `SKILL.md` files are generated in `dist/`
