# Tasks

## 1. Release Note, Beta History & Version Bumps

- [x] 1.1 Update `content/en/xlt/manual/installation.mdx` with XLT `10.0.0-beta-5` Maven dependency, Java 21 LTS runtime baseline, fix "derivatiove" typo, and add preview notice
- [x] 1.2 Update and consolidate `content/en/xlt/release-notes/v10_0_x.mdx` under `## XLT 10.0.0 (beta)` as a single release note covering Virtual Threads, Private Machines, AI Data v2, Executive PDF, Groovy in Scorecards, Dynamic Charts, Moving Averages, Steady-State reports, DNS override, and migration checklist
- [x] 1.3 Add `:::warning[Beta Release]` banner and compact Beta History table to `v10_0_x.mdx`, and update 10.0.x card in `release-notes/index.mdx` to reflect beta status
- [x] 1.4 Bump Maven coordinates to `10.0.0-beta-5` in `quick-start/installation.mdx` and `advanced/maven-builds.mdx` with beta notices
- [x] 1.5 Verify Milestone 1 intermediate outcome by running `npm run validate` and `npm run build` to confirm zero broken links and clean compilation

## 2. Concurrency Architecture & Runtime Profiling (Virtual Threads & JFR)

- [x] 2.1 Update `content/en/xlt/manual/load-configuration.mdx` with the Virtual Threads execution model, properties, and platform thread fallback options
- [x] 2.2 Update `content/en/xlt/manual/test-suite-configuration.mdx` with carrier thread pool tuning and ThreadGroup refactoring
- [x] 2.3 Overhaul `content/en/xlt/how-tos/test-sizing.md` with capacity planning, RAM calculations, and scaling tens of thousands of users per agent with Virtual Threads
- [x] 2.4 Complete Concurrency and JVM Tuning sections in `content/en/xlt/manual/limitations.md` and remove `draft: true`
- [x] 2.5 Create canonical how-to `content/en/xlt/how-tos/java-flight-recorder.mdx` using Blume directives, profiling flags, parameter table, and analysis workflows
- [x] 2.6 Cross-reference JFR profiling in `content/en/xlt/manual/test-suite-configuration.mdx` under `jvmargs.cfg` and `manual/environment-configuration.mdx`
- [x] 2.7 Verify Milestone 2 intermediate outcome by running `npm run validate` and `npm run build` and previewing `/xlt/how-tos/java-flight-recorder/` and `/xlt/how-tos/test-sizing/`

## 3. Semantic Tagging & Rule Processing (Labeling Rules & Groovy Boundaries)

- [x] 3.1 Create canonical deep dive `content/en/xlt/advanced/labeling-rules.mdx` with concept, full verified parameter matrix, downstream integrations, and 4 configuration recipes
- [x] 3.2 Update `content/en/xlt/advanced/merge-rules.mdx` documenting Groovy property execution lifecycle vs streaming CSV merge rules, and contrasting with Labeling Rules
- [x] 3.3 Update `content/en/xlt/manual/test-suite-configuration.mdx` documenting `#{...}` syntax, string quoting requirement, and startup evaluation lifecycle
- [x] 3.4 Update `content/en/xlt/manual/scorecard.mdx` documenting Groovy rule checks (`builder`, `xpathBuilder`, `properties`, `data`, `log`), rating injection, and label grouping
- [x] 3.5 Update `content/en/xlt/manual/report-configuration.mdx` keeping labeling to a summary plus canonical link to `advanced/labeling-rules.mdx`
- [x] 3.6 Verify Milestone 3 intermediate outcome by running `npm run validate` and `npm run build` and previewing `/xlt/advanced/labeling-rules/` and `/xlt/manual/scorecard/`

## 4. Advanced Reporting & AI Workflows (AI Data Report v2 & Executive PDF)

- [x] 4.1 Create canonical deep dive `content/en/xlt/manual/ai-data-report.mdx` (AI Data Report, v2 schema, standalone workflows, and 6-recipe prompt cookbook)
- [x] 4.2 Update `content/en/xlt/manual/reports.mdx` with Executive PDF report section, AI Data Report overview, and fix malformed link syntax at line 20
- [x] 4.3 Update `content/en/xlt/manual/report-options.md` with `-rating-score` / `-rating-summary` parameters, PDF options, and steady-state reports (`-noRampUp`)
- [x] 4.4 Update `content/en/xlt/manual/report-configuration.mdx` with AI Data export, PDF reports, moving averages, and labeling rules settings
- [x] 4.5 Verify Milestone 4 intermediate outcome by running `npm run validate` and `npm run build` and previewing `/xlt/manual/ai-data-report/` and `/xlt/manual/reports/`

## 5. Properties Reference & XTC v110–v117 Documentation Alignment

- [x] 5.1 Comprehensively update `content/en/xlt/manual/properties.mdx` with all new XLT 10 property groups (`privateMachine.*`, `aiData.*`, `pdf.*`, `labelingRules.*`, `charts.commonAverage.*`, `charts.averages.*`, `scorecard.rating`)
- [x] 5.2 Update `content/en/xlt/manual/private-machines.mdx` and `content/en/xtc/loadtesting/156-private-machines.mdx` aligning beta status language
- [x] 5.3 Update `content/en/xtc/loadtesting/180-reports.mdx` and `175-results.mdx` with AI Analysis report type, PDF companion, steady-state shortcuts, and AI data downloads
- [x] 5.4 Update `content/en/xtc/loadtesting/400-resource-usage.mdx` documenting AI usage tracking by project and organization
- [x] 5.5 Update `content/en/xtc/integrations/500-api.mdx` documenting `noRampUp`, `createPdf`, and report artifact download endpoints
- [x] 5.6 Update `content/en/xtc/loadtesting/155-lt-settings.mdx` documenting load-factor machine scaling
- [x] 5.7 Verify Milestone 5 intermediate outcome by running `npm run validate` and `npm run build`

## 6. Final Site-Wide Audit & Search Verification

- [x] 6.1 Execute full site validation with `npm run validate` (0 broken links, 0 warnings)
- [x] 6.2 Execute production build with `npm run build` and verify `dist/blume-search.json` contains indexed properties
- [x] 6.3 Verify Directory Index Cards across `/xlt/manual/`, `/xlt/advanced/`, and `/xlt/how-tos/`
