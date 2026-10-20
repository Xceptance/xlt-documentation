# Proposal

## Why

XLT 10 introduces a major architectural evolution for Xceptance LoadTest—anchored by Virtual Threads by default (on Java 21 LTS), non-destructive semantic Labeling Rules, AI Data Report (v2) for LLMs, Executive PDF Reports, Groovy-driven Scorecards, and Private Machine Mode. With XLT 10 currently in active beta (`10.0.0-beta-5`) and corresponding features shipped across XTC v110–v117, the documentation portal must consolidate all beta iterations into a single cohesive release note, align current-version references across all installation guides, author deep-dive canonical guides, and update XTC reporting/API documentation.

## What Changes

- **Single Consolidated Beta Release Note**: Consolidate all shipped beta capabilities (beta-1 through beta-5) into [content/en/xlt/release-notes/v10_0_x.mdx](file:///home/rschwietzke/projects/GIT/xlt-documentation/content/en/xlt/release-notes/v10_0_x.mdx) with a `:::warning[Beta Release]` banner, full feature summaries, complete migration checklist from XLT 9.x, and a compact beta-history summary table. Update [content/en/xlt/release-notes/index.mdx](file:///home/rschwietzke/projects/GIT/xlt-documentation/content/en/xlt/release-notes/index.mdx) card to reflect beta status.
- **Consistent Beta Version References**: Bump all current-version Maven coordinates to `10.0.0-beta-5` across `manual/installation.mdx`, `quick-start/installation.mdx`, and `advanced/maven-builds.mdx`, fixing typographical errors.
- **Canonical Deep Dives with Anti-Duplication**:
  - `content/en/xlt/advanced/labeling-rules.mdx` (new): Full parameter reference matrix, placeholders, downstream integrations, and 4 configuration recipes.
  - `content/en/xlt/manual/ai-data-report.mdx` (new): AI Data Report (v2) schema, standalone LLM workflows (web chat, IDEs, Ollama, CI/CD PR bots), and 6-recipe prompt cookbook.
  - `content/en/xlt/how-tos/java-flight-recorder.mdx` (new): Low-overhead JVM runtime profiling via HotSpot JFR and `jvmargs.cfg` (kept strictly as a how-to; not a release-note feature).
- **Concurrency & Sizing**: Document Virtual Threads default execution, carrier thread pool tuning (`-Djdk.virtualThreadScheduler.maxPoolSize`), `ThreadGroup` to `InheritableThreadLocal` migration, and overhaul `how-tos/test-sizing.md` with capacity planning for scaling tens of thousands of concurrent users per agent. Complete `manual/limitations.md` concurrency/JVM tuning sections and remove `draft: true`.
- **Groovy Scripting Boundaries**: Clearly document the JVM startup configuration lifecycle of Groovy in properties (`${groovy: ...}`) vs. post-test log-streaming merge rules, contrasting with high-performance regex capture and non-destructive labeling rules.
- **Scorecards & Rating Injection**: Document Groovy rule checks (`XmlSlurper` / `GPathResult` bindings: `report`, `testReport`, `scorecard`) and external rating injection via CLI (`-rating <value>`) and property (`com.xceptance.xlt.scorecard.rating`) in `manual/scorecard.md`.
- **Executive PDF Reporting**: Document automated PDF report creation (`com.xceptance.xlt.reportgenerator.pdf.enabled = true`, `filename`) and rating badge integration in `manual/reports.mdx` and `manual/report-options.md`. Fix malformed link syntax in `manual/reports.mdx`.
- **Comprehensive Properties Reference**: Add verified entries to `manual/properties.mdx` for `labelingRules.*`, `aiData.*`, `pdf.*`, `scorecard.rating`, moving averages, and private machines.
- **XTC Documentation Scope**: Update XTC docs to reflect v110–v117 capabilities: AI Analysis report type and PDF downloads in `180-reports.mdx`, AI data downloads in `175-results.mdx`, AI resource usage tracking in `400-resource-usage.mdx`, API endpoints (`noRampUp`, `createPdf`) in `integrations/500-api.mdx`, and machine scaling in `155-lt-settings.mdx`.

## Capabilities

### Modified Capabilities
- `docs-site`: Update the XLT and XTC documentation portal with comprehensive coverage of XLT 10 beta capabilities, canonical deep dives, configuration properties, reporting features, concurrency architecture, and migration procedures.

## Impact

- **Documentation Content**: Updates and additions across `content/en/xlt/` (release notes, manual, advanced, how-tos) and `content/en/xtc/` (loadtesting, integrations).
- **Navigation & Search**: Adds new topics to sidebar navigation and directory card indexes (`labeling-rules.mdx`, `ai-data-report.mdx`, `java-flight-recorder.mdx`) and indexes all new Java properties into the client-side Orama search index (`dist/blume-search.json`).
- **Dependencies & Runtime**: Zero runtime impact (100% static output, verified by `npm run validate` and `npm run build`).
