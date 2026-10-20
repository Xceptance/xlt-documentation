# Design

## Context

The Xceptance documentation portal is built with Blume on Astro and Vite. It compiles to a 100% pure static site in `dist/` with Orama search indexing, root-relative internal linking, native markdown callout directives (`:::note`, `:::tip`, `:::warning`, `:::danger`), and Shiki syntax highlighting.

The target version is **XLT 10.0.0 (currently in beta: `10.0.0-beta-5`)**, paired with XTC releases v110–v117.

## Goals / Non-Goals

**Goals:**
- **Single Consolidated Beta Release Note**: Consolidate all shipped beta capabilities (beta-1 through beta-5) into a single page headed `## XLT 10.0.0 (beta)` with a `:::warning[Beta Release]` banner and a compact beta-history table.
- **Canonical Ownership & Anti-Duplication**: Enforce that deep dives own complete tables, schemas, and recipes, while general manual pages keep at most 2–3 paragraphs plus a link to the canonical page.
- **Unified Current-Version Coordinates**: Bump all current-version Maven snippets to `10.0.0-beta-5` across `manual/installation.mdx`, `quick-start/installation.mdx`, and `advanced/maven-builds.mdx`.
- **Accurate Feature Attribution**: Treat Java 21 LTS as the continuing runtime baseline (introduced in XLT 9.0) and Virtual Threads as the new execution feature. Keep JFR strictly as a how-to guide, not an XLT release note feature.
- **XTC Scope Integration**: Update XTC documentation (`180-reports`, `175-results`, `400-resource-usage`, `500-api`, `155-lt-settings`, `156-private-machines`) to reflect cloud integration of AI Data, PDF reports, steady-state shortcuts, and API flags.
- **Incremental Verifiability**: Maintain structured milestones where each milestone concludes with `npm run validate` and `npm run build`.

**Non-Goals:**
- Declaring XLT 10 GA prematurely (all references remain explicitly marked as beta).
- Modifying underlying Blume framework code or Astro layouts.
- Altering documentation for releases older than XLT 9.x.

## Decisions

### Decision 1: One Consolidated Beta Release Note
* **Choice**: Keep `content/en/xlt/release-notes/v10_0_x.mdx`. Prepend a `:::warning[Beta Release]` banner, consolidate all shipped changes into a unified changelog, add a compact beta-history table, and update the 10.0.x card in `release-notes/index.mdx` to "XLT 10.0.x — Beta: Next-Generation Performance".
* **Rationale**: Prevents changelog fragmentation while maintaining full traceability across beta iterations.

### Decision 2: Canonical Placement Matrix & Anti-Duplication Rule
* **Choice**: Deep-dive pages own full references and recipes; manual pages summarize and link.

| Shipped Item | Canonical Deep Dive | Secondary References | Release Note |
|---|---|---|---|
| Java 21 baseline | `manual/installation.mdx` | `xlt-basics.md`, `quick-start/installation.mdx` | Omit from feature highlights (baseline since 9.0) |
| Virtual Threads | `manual/test-suite-configuration.mdx` §Virtual Threads | `properties.mdx`, `load-configuration.mdx`, `test-sizing.md`, `limitations.md` | Framework change |
| Carrier pool tuning | `test-suite-configuration.mdx` §Carrier Thread Pool Tuning | `environment-configuration.mdx`, `limitations.md` | Brief note |
| ThreadGroup migration | `test-suite-configuration.mdx` §Code Migration | `limitations.md`, release note migration | Migration step |
| Private Machine Mode | `manual/private-machines.md` | `properties.mdx`, `environment-configuration.mdx`, XTC `156`/`155`/`400` | Feature |
| AI Data v2 | `manual/ai-data-report.mdx` (new) | `reports.mdx`, `report-configuration.mdx`, `properties.mdx`, XTC `180`/`175`/`500` | Feature |
| Executive PDF | `manual/reports.mdx` §PDF Report | `report-options.md`, `properties.mdx`, `scorecard.md`, XTC `180`/`500` | Feature |
| Rating injection | `manual/scorecard.md` §Rating Injection | `report-options.md`, `properties.mdx`, XTC `180` | Feature |
| Groovy scorecards | `manual/scorecard.md` §Groovy Checks | `report-configuration.mdx`, `ai-data-report.mdx` | Feature |
| Groovy in properties | `manual/test-suite-configuration.mdx` §Groovy Expressions | `advanced/merge-rules.mdx` limitation | Feature/limitation |
| Labeling rules | `advanced/labeling-rules.mdx` (new) | `report-configuration.mdx`, `properties.mdx`, `scorecard.md`, `ai-data-report.mdx` | Feature |
| Dynamic overview charts | `manual/report-configuration.mdx` §Dynamic Overview Charts | release note | Feature |
| Multi-moving averages | `manual/properties.mdx` + `report-configuration.mdx` | release note | Feature |
| Steady-state reports | `manual/report-options.md` §Excluding the Ramp-Up Phase | `reports.mdx`, XTC `175`/`180` | Feature |
| DNS override/logging | `advanced/dns.mdx` | release note | Brief note |
| HtmlUnit 5.x | Release note migration | `limitations.md` | Migration |
| FirefoxOptions migration | Release note migration | `client-performance.mdx` | Migration |
| ReportProviderConfiguration | Release note migration | — | Migration |
| HttpClientConverter removal | Release note migration | `test-development.mdx` | Migration |
| JFR profiling | `how-tos/java-flight-recorder.mdx` (new) | `test-suite-configuration.mdx` L530, `limitations.md` | **Omit from release note** (JDK capability) |
| XTC AI usage tracking | XTC `400-resource-usage.mdx` | XTC v117 note | XTC only |
| XTC load-factor scaling | XTC `155-lt-settings.mdx` | XTC v117 note | XTC only |
| XTC report API endpoints | XTC `integrations/500-api.mdx` | XTC v117 note | XTC only |

### Decision 3: Naming Convention
* **Choice**: Name the XLT guide `content/en/xlt/manual/ai-data-report.mdx` (Title: **AI Data Report**). Reserve **AI-Assisted Analysis** for interactive XTC platform documentation.
* **Rationale**: Aligns terminology with functional reality: XLT generates a static data artifact (`ai-data.md`), while XTC provides interactive conversational analysis.

### Decision 4: Suggested Information Architecture & Sidebar Ordering
* `advanced/labeling-rules.mdx`: `icon: tags`, `order: 20` (after Merge Rules at 10)
* `manual/ai-data-report.mdx`: `icon: bot`, `order: 565` (between Report Options at 560 and Scorecard at 570)
* `how-tos/java-flight-recorder.mdx`: `icon: activity`, `order: 270`

## Risks / Trade-offs

- **[Risk: Stale `9.2.x` current-version references]** → *Mitigation*: Update all three files (`manual/installation.mdx`, `quick-start/installation.mdx`, `advanced/maven-builds.mdx`) and run grep verification.
- **[Risk: Broken internal links]** → *Mitigation*: Run `npm run validate` after every milestone.
- **[Risk: Confusion over preview status]** → *Mitigation*: Use `:::warning[Beta Release]` in the release note and `:::info[Beta Release]` in installation guides.
