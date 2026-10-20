# Spec Delta: docs-site

## Purpose

The documentation portal provides developers, performance engineers, and test automation architects with comprehensive, up-to-date guidance, configuration references, and operational best practices for XLT, XTC, and Neodymium.

## ADDED Requirements

### Requirement: XLT 10 Consistent Beta Dependency Specification
The system SHALL document Java 21 LTS as the continuing runtime baseline and update all current-version Maven dependency coordinates to `10.0.0-beta-5` across `manual/installation.mdx`, `quick-start/installation.mdx`, and `advanced/maven-builds.mdx`, with explicit notices indicating XLT 10 beta/preview status.

#### Scenario: Multi-page dependency consistency
- **WHEN** a user reviews Maven setup instructions in the quick-start, manual, or advanced Maven guide
- **THEN** all three documents specify `com.xceptance:xlt:10.0.0-beta-5` with `provided` scope and contain no references to `9.2.x` as current versions.

#### Scenario: Java 21 baseline documentation
- **WHEN** a user reviews installation prerequisites
- **THEN** the documentation specifies Java 21 LTS or higher as the runtime baseline.

### Requirement: Consolidated XLT 10.0.0 Beta Release Note and Index Card
The system SHALL provide a single consolidated XLT 10 beta release note in `content/en/xlt/release-notes/v10_0_x.mdx` with a prominent `:::warning[Beta Release]` banner, complete feature summaries, migration checklist from XLT 9.x, and a compact beta-history table, and SHALL mark the release card in `release-notes/index.mdx` as beta.

#### Scenario: Release note structure and beta banner
- **WHEN** a user navigates to `/xlt/release-notes/v10_0_x/`
- **THEN** the page renders a `:::warning[Beta Release]` banner, details all accumulated features across beta-1 through beta-5, provides a migration checklist, and ends with a compact beta history table.

#### Scenario: Release notes hub card labeling
- **WHEN** a user visits `/xlt/release-notes/`
- **THEN** the card for 10.0.x is labeled "XLT 10.0.x — Beta: Next-Generation Performance".

### Requirement: Virtual Threads Concurrency Model & Capacity Sizing Guidance
The system SHALL document the Java 21 Virtual Threads execution architecture, carrier thread scheduler tuning (`-Djdk.virtualThreadScheduler.maxPoolSize`), `ThreadGroup` to `InheritableThreadLocal` migration, and overhaul `how-tos/test-sizing.md` with capacity planning for scaling tens of thousands of concurrent users per agent.

#### Scenario: Virtual threads activation and fallback
- **WHEN** a user configures test suite execution
- **THEN** the manual documents that `com.xceptance.xlt.virtualThreads.enabled` defaults to `true` and demonstrates how to fall back to platform threads when necessary.

#### Scenario: Agent memory and concurrency sizing
- **WHEN** a user plans hardware for high-concurrency load testing
- **THEN** `test-sizing.md` provides memory sizing formulas comparing traditional platform thread stacks (~1MB) to virtual thread heap objects, alongside carrier pool recommendations.

#### Scenario: Restrictions and tuning page completion
- **WHEN** a user views `manual/limitations.md`
- **THEN** the draft status is removed and the Concurrency and JVM Tuning sections provide concrete guidance and cross-links to Virtual Threads and JFR.

### Requirement: Canonical Semantic Request Labeling Rules & Downstream Integration
The system SHALL provide a canonical deep-dive guide for non-destructive Labeling Rules in `content/en/xlt/advanced/labeling-rules.mdx`, specifying parameter definitions, placeholder substitutions, and downstream report/SLA integrations, while keeping secondary manual pages concise to prevent drift.

#### Scenario: Parameter reference matrix
- **WHEN** a user views `advanced/labeling-rules.mdx`
- **THEN** the guide defines all supported criteria (`newLabels`, `types`, `namePattern`, `labelPattern`, `transactionPattern`, `actionPattern`, `agentPattern`, `urlPattern`, `urlText`, `statusCodePattern`, `contentTypePattern`, `methodPattern`, `runTimeRanges`, `stopOnMatch`, and `<pattern>.exclude`).

#### Scenario: Downstream consumption recipes
- **WHEN** a user reads the labeling rules guide
- **THEN** concrete recipes are provided for business funnel tagging, 3rd-party/CDN traffic isolation, dynamic regex capture placeholders (`service:{u:1}`), and dynamic SLA violation tagging.

### Requirement: Groovy Execution Boundary Specification (Properties vs Merge Rules)
The system SHALL document the execution boundary of Groovy script evaluation, distinguishing between JVM startup configuration evaluation (`${groovy: ...}`) and post-test log streaming merge rules, explaining why per-request Groovy evaluation is not supported during report generation.

#### Scenario: Understanding merge rule limitations
- **WHEN** a user reviews merge rules documentation
- **THEN** the guide explains the architectural difference between one-time startup evaluation and streaming CSV row processing, pointing to regex capturing groups and `urlText` as high-performance alternatives.

### Requirement: Groovy Rule Validation & Rating Injection in Scorecards
The system SHALL document Groovy script rule checks within `scorecard-config.json` and external rating injection via CLI parameters and configuration properties in `content/en/xlt/manual/scorecard.md`.

#### Scenario: Groovy check execution on testreport.xml
- **WHEN** a user authors a scorecard rule check
- **THEN** the scorecard manual explains how Groovy checks evaluate against the parsed `testreport.xml` DOM via `XmlSlurper` / `GPathResult` (`report`), Java report model (`testReport`), and `scorecard` context.

#### Scenario: Rating injection overrides
- **WHEN** a load test is executed with `-rating <value>` or `com.xceptance.xlt.scorecard.rating`
- **THEN** the documentation states how the external rating overrides badges in the executive PDF cover, HTML report header, scorecard tab, and XML reports.

### Requirement: Canonical AI Data Report (ai-data.md v2) and Prompt Cookbook
The system SHALL document the AI Data Report feature in `content/en/xlt/manual/ai-data-report.mdx`, including its YAML frontmatter schema, token-efficient structure, standalone AI workflows, and a 6-recipe prompt cookbook for LLM analysis.

#### Scenario: AI Data v2 document structure
- **WHEN** a user enables `com.xceptance.xlt.reportgenerator.aiData.enabled = true`
- **THEN** the documentation details the generated `ai-data.md` schema, including semantic label breakdown, warmup vs steady-state separation, error clusters, and scorecard verdicts.

#### Scenario: Prompt cookbook recipes
- **WHEN** a user inspects `ai-data-report.mdx`
- **THEN** ready-to-use prompts are provided for Root Cause Analysis, 3-paragraph executive briefing, release-over-release regression comparisons, SLA compliance verification, Jira bug generation, and CI/CD JSON webhooks.

### Requirement: Executive PDF Report Documentation
The system SHALL document the automated creation of printable Executive PDF reports via `com.xceptance.xlt.reportgenerator.pdf.*` properties and CLI options across `manual/reports.mdx` and `manual/report-options.md`, fixing any malformed markdown links.

#### Scenario: PDF report generation options
- **WHEN** a user configures reporting options
- **THEN** the manual details `pdf.enabled` and `pdf.filename` configuration for executive summaries.

### Requirement: Java Flight Recorder (JFR) Profiling How-To
The system SHALL provide a dedicated how-to guide `content/en/xlt/how-tos/java-flight-recorder.mdx` adhering to Blume directives and standards for profiling agent JVM execution with low runtime overhead, while excluding JFR from the XLT feature release notes.

#### Scenario: Agent jvmargs profiling setup
- **WHEN** a user reads the JFR profiling guide
- **THEN** the guide provides complete `-XX:StartFlightRecording` configurations for `<testsuite>/config/jvmargs.cfg` using the `profile.jfc` template with delay, duration, and disk streaming flags.

### Requirement: XLT 10 Configuration Properties Reference
The system SHALL document all newly introduced XLT 10 configuration properties in `content/en/xlt/manual/properties.mdx`, categorized by functional area with defaults and descriptions.

#### Scenario: Comprehensive property reference coverage
- **WHEN** a user searches `properties.mdx`
- **THEN** valid entries exist for Private Machine mode (`com.xceptance.xlt.agentcontroller.privateMachine.*`), AI Data export (`...aiData.*`), PDF reports (`...pdf.*`), Labeling Rules (`...labelingRules.*`), Moving Averages (`...charts.commonAverage.*`, `...charts.averages.*`), and Scorecard rating (`...scorecard.rating`).

### Requirement: XTC v110–v117 Documentation Alignment
The system SHALL update XTC documentation across reports, results, resource usage, API integrations, and load test settings to align with capabilities shipped in XTC v110–v117.

#### Scenario: XTC report and result documentation
- **WHEN** a user inspects `xtc/loadtesting/180-reports.mdx` or `175-results.mdx`
- **THEN** the pages document the AI Analysis report type, executive PDF downloads, steady-state shortcuts, and AI data downloads.

#### Scenario: XTC resource usage and API documentation
- **WHEN** a user inspects `xtc/loadtesting/400-resource-usage.mdx` or `xtc/integrations/500-api.mdx`
- **THEN** the documentation covers AI usage tracking by project and organization, and API parameters for `noRampUp`, `createPdf`, and report artifact downloads.
