# OpenSpec: XLT 10 Documentation Update

**Status:** Draft / Active Specification  
**Target Version:** XLT 10.0.0  
**Scope:** XLT Core Manual, Advanced Guides, How-Tos, Release Notes, and Reporting  
**Last Updated:** September 2026  

---

## 1. Executive Summary & Goals

This specification outlines the comprehensive documentation overhaul for **XLT 10**. Version 10 represents a major architectural milestone for Xceptance LoadTest, shifting the runtime baseline to **Java 21 LTS**, introducing **Virtual Threads** as the default load execution model, upgrading reporting with **AI Data v2** (`ai-data.md`), **Executive PDF Reports**, **Groovy in Scorecards**, **Interactive Dynamic Overview Charts**, and formalizing **Private Machine Mode** behind corporate firewalls.

### Key Objectives
1. **Modernize Baselines**: Transition all documentation, code snippets, Maven/Gradle dependencies, and IDE guides to Java 21 LTS and XLT 10.
2. **Document Concurrency & Scaling**: Deep dive into Virtual Threads, carrier thread tuning, and capacity planning for tens of thousands of concurrent users per agent.
3. **Expand Analysis & Reporting**: Thoroughly document Labeling Rules, AI Data export (v2) for LLMs, Executive PDF generation, and Groovy-based Scorecards.
4. **Clarify Execution Boundaries**: Clearly explain the execution lifecycle of Groovy in properties vs. native streaming merge rules.
5. **Complete Release & Migration Guides**: Consolidate beta-1 through beta-4 notes and provide a structured migration checklist from XLT 9.x.

---

## 2. Release Notes & Migration Specification

### 2.1 File: `content/en/xlt/release-notes/10_0_x.md`
Consolidate all beta iterations (`10.0.0-beta-1` to `beta-4` and GA) into a complete, structured release note.

#### Consolidated Change Log
* **Virtual Threads Execution**: Default execution with Java 21 virtual threads (`com.xceptance.xlt.virtualThreads.enabled = true`).
* **Private Machine Mode**: Agent controller reverse-tunnel support (`xtc-xlt-relay.xceptance.com:443`) for network-isolated environments.
* **AI Data Export v2**: Report generator creates structured `ai-data.md` for LLM analysis.
* **Executive PDF Report & Rating Injection**: Printable executive summary reports and CLI/property rating injection (`-rating <value>`).
* **Groovy in Scorecards**: Programmatic rule validation using Groovy and GPath XML traversal.
* **Dynamic Overview Charts**: Tooltip enhancements (count/s), min-max band zoom retention, and report timezone localization.
* **Multi-Moving Averages**: Support for multiple percentage- and time-window moving averages starting from data point zero.
* **Steady-State Reports**: Automated creation of reports that exclude ramp-up periods.
* **DNS Override & Logging**: Advanced DNS resolution options and query logging via dnsjava.
* **API Modernization**:
  * `XltFirefoxDriver.Builder` migrated to `FirefoxOptions` (deprecated `FirefoxBinary` and `FirefoxProfile` removed).
  * `ReportProviderConfiguration` interface updated for moving average collections.

#### 2.2 Migration Checklist (XLT 9.x $\rightarrow$ XLT 10)
1. **JDK Upgrade**: Install JDK 21 on all development and load test machines. Update Maven `pom.xml` / Gradle `build.gradle` compiler targets to Java 21.
2. **Refactor ThreadGroup Contexts**:
   * *Problem*: Virtual threads do not belong to user-defined `ThreadGroup`s.
   * *Fix*: Replace `Map<ThreadGroup, Context>` lookups with `InheritableThreadLocal<Context>` or XLT's `ThreadContext`.
3. **Update WebDriver Initialization**:
   * *Fix*: Update any `XltFirefoxDriver.Builder` invocations to configure `FirefoxOptions` instead of passing `FirefoxProfile` / `FirefoxBinary`.
4. **Update Report Generator Moving Averages**:
   * *Fix*: Update `<xlt>/config/reportgenerator.properties` to the new `commonAverage` and `averages.<n>` property syntax.

---

## 3. Virtual Threads & Concurrency Architecture

### 3.1 Files: `manual/load-configuration.md`, `manual/test-suite-configuration.md`, `how-tos/test-sizing.md`

### 3.2 Conceptual Overview
* **Platform Threads vs. Virtual Threads**:
  * Traditional platform threads map 1:1 to OS threads, consuming significant stack memory (typically ~1MB per thread) and hitting OS scheduling limits at thousands of users.
  * Virtual threads run on a small pool of carrier platform threads, allowing agents to scale to tens of thousands of concurrent virtual users with minimal memory footprint.
* **Preserving the Programming Model**:
  * The synchronous, sequential, developer-friendly "one-thread-per-user" paradigm remains unchanged.

### 3.3 Configuration & Tuning
```properties
## Enable/disable virtual threads (default: true)
com.xceptance.xlt.virtualThreads.enabled = true
```

#### Carrier Pool Sizing in `jvmargs.cfg`
To control the maximum number of native carrier threads spawned by the JVM scheduler:
```properties
-Djdk.virtualThreadScheduler.maxPoolSize=256
```

---

## 4. Labeling Feature Specification

### 4.1 Files: `advanced/labeling-rules.md` (New), `manual/report-configuration.md`, `manual/properties.md`

### 4.2 Concept: Semantic Tagging vs. Merge Rules
* **Merge Rules**: Destructive/Aggregating. Renames requests and collapses distinct URLs into single named buckets.
* **Labeling Rules**: Non-destructive. Attaches space-separated metadata tags to Transactions (`T`), Actions (`A`), and Requests (`R`) without changing item names.

### 4.3 Full Parameter Reference Matrix

| Property Key (`...labelingRules.<id>.*`) | Category Code | Description | Scope |
|---|---|---|---|
| `newLabels` | — | Label string to assign. Space-delimited for multiple labels. Supports `{category:index}` and `{category}` placeholders. | `T`, `A`, `R` |
| `types` | — | Target item types: `T` (Transaction), `A` (Action), `R` (Request). Comma-separated. | `T`, `A`, `R` |
| `namePattern` | `[n]` | Regex matching item name. | `T`, `A`, `R` |
| `labelPattern` | `[l]` | Regex matching existing labels (enables chained rule tagging). | `T`, `A`, `R` |
| `transactionPattern` | `[t]` | Regex matching parent transaction name. | `A`, `R` |
| `actionPattern` | `[a]` | Regex matching parent action name. | `R` |
| `agentPattern` | `[g]` | Regex matching agent identifier. | `T`, `A`, `R` |
| `urlPattern` | `[u]` | Regex matching request URL. | `R` |
| `urlText` | `[u]` | High-performance plaintext substring match on request URL. | `R` |
| `statusCodePattern` | `[s]` | Regex matching HTTP response status code (e.g., `(4..\|5..)`). | `R` |
| `contentTypePattern` | `[c]` | Regex matching HTTP response content type header. | `R` |
| `methodPattern` | `[m]` | Regex matching HTTP method (`GET`, `POST`, `PUT`, `DELETE`). | `R` |
| `runTimeRanges` | `[r]` | Runtime boundary in milliseconds (`min,max` or `min,`). | `T`, `A`, `R` |
| `stopOnMatch` | — | Stop evaluating subsequent labeling rules upon match (default: `true`). | `T`, `A`, `R` |
| `<pattern>.exclude` | — | Negation condition: Rule will NOT apply if this pattern matches. | `T`, `A`, `R` |

### 4.4 Downstream Integrations
* **Interactive HTML Report Filtering**: Interactive badge chips in Transactions, Actions, and Requests tables.
* **Report Colorization**: Target specific labels using `com.xceptance.xlt.reportgenerator.requests.table.colorization.<Group>.matching.label = <label>`.
* **Scorecard Evaluation**: Group SLA criteria by label in `scorecard-config.json`.
* **AI-Assisted Analysis**: Categorizes metrics by label in `ai-data.md`.
* **Trend & Comparison Reports**: Slices release-over-release performance by domain label.

### 4.5 Configuration Recipes
```properties
## Recipe 1: Business Funnel Tagging
com.xceptance.xlt.reportgenerator.labelingRules.10.types = T
com.xceptance.xlt.reportgenerator.labelingRules.10.namePattern = T(GuestOrder|RegisteredCheckout)
com.xceptance.xlt.reportgenerator.labelingRules.10.newLabels = checkout critical
com.xceptance.xlt.reportgenerator.labelingRules.10.stopOnMatch = false

## Recipe 2: 3rd-Party & CDN Traffic Isolation
com.xceptance.xlt.reportgenerator.labelingRules.20.types = R
com.xceptance.xlt.reportgenerator.labelingRules.20.urlPattern = (google-analytics|hotjar|criteo|paypal)
com.xceptance.xlt.reportgenerator.labelingRules.20.newLabels = 3rd-party
com.xceptance.xlt.reportgenerator.labelingRules.20.stopOnMatch = true

## Recipe 3: Microservice Path Extraction
com.xceptance.xlt.reportgenerator.labelingRules.30.types = R
com.xceptance.xlt.reportgenerator.labelingRules.30.urlPattern = /api/v[0-9]+/([a-z0-9_-]+)/
com.xceptance.xlt.reportgenerator.labelingRules.30.newLabels = api service:{u:1}
com.xceptance.xlt.reportgenerator.labelingRules.30.stopOnMatch = false

## Recipe 4: Dynamic SLA Violation Tagging
com.xceptance.xlt.reportgenerator.labelingRules.40.types = R
com.xceptance.xlt.reportgenerator.labelingRules.40.namePattern = Search.*
com.xceptance.xlt.reportgenerator.labelingRules.40.runTimeRanges = 2000,
com.xceptance.xlt.reportgenerator.labelingRules.40.newLabels = {l} slow-sla
```

---

## 5. Groovy in Properties & Limitations with Merge Rules

### 5.1 Files: `advanced/merge-rules.md`, `manual/test-suite-configuration.md`

### 5.2 Groovy in Properties Files
* **Syntax & Capability**: Supports executing Groovy expressions in `${groovy: ...}` / `${...}` property values to compute dynamic test configuration at startup (e.g., date math, random values, calculated timeouts).
* **Execution Phase**: Evaluates **once at configuration initialization time** inside the JVM.

### 5.3 The Limitation with Merge Rules
* **Configuration-Time vs. Log-Stream Processing**:
  * Merge rules operate on millions of lines in `timers.csv` during post-test report generation.
  * Groovy in properties evaluates once at startup; it cannot execute per-request on each CSV row.
* **No Runtime Request Context**:
  * The Groovy property evaluation environment has no access to individual request URLs, status codes, response times, or regex capturing groups.
* **Throughput Considerations**:
  * Interpreting Groovy scripts per request row would degrade report generation speed across gigabytes of timer logs.
* **Solution**: Use XLT's native high-performance regex engine and placeholders (`{u:1}`, `{n:1}`, `{s}`, `{r}`) and `urlText`.

---

## 6. Groovy in Scorecards

### 6.1 Files: `manual/scorecard.md`

### 6.2 Architecture & Execution Model
* Unlike Merge Rules, the **Scorecard evaluates once on summarized report XML data** (`testreport.xml`) at the end of report generation.
* Executing Groovy here provides maximum scripting flexibility with zero performance penalty.

### 6.3 Schema & Script Bindings in `scorecard-config.json`
* `report`: The parsed XML root of `testreport.xml` accessible via Groovy's `GPathResult` (`XmlSlurper`).
* `testReport`: The structured Java report model.
* `scorecard`: The current scorecard evaluation context.

### 6.4 Groovy Check Example
```json
{
  "id": "checkoutSlaRule",
  "name": "Checkout Endpoints SLA",
  "description": "All checkout requests must have P95 <= 1200ms and error rate < 0.5%",
  "points": 10,
  "failsTest": true,
  "checks": [
    {
      "type": "groovy",
      "script": "def checkoutRequests = report.requests.request.findAll { it.labels.text().contains('checkout') }; return checkoutRequests.every { it.percentiles.p95.toInteger() <= 1200 && it.errors.percentage.toDouble() < 0.5 }",
      "description": "Verify P95 and error limits for all checkout requests"
    }
  ]
}
```

---

## 7. AI Data Export (`ai-data.md` Version 2)

### 7.1 Files: `manual/ai-assisted-analysis.md` (New), `manual/reports.md`, `manual/report-configuration.md`

### 7.2 Purpose
* Generates a token-efficient, highly structured Markdown file (`ai-data.md`) in the report directory, tailored for direct ingestion by Large Language Models (LLMs) such as Google Gemini, Claude, and GPT.

### 7.3 Version 2 Enhancements
1. **Semantic Label Slicing**: Metrics partitioned by business labels (`checkout`, `api`, `3rd-party`).
2. **Phase Awareness**: Distinguishes warmup/ramp-up phases from steady-state load.
3. **Contextual Error Clustering**: Error types grouped with affected actions and sanitized stack samples.
4. **Scorecard Integration**: Embeds scorecard ratings, verdicts, and rule violations.
5. **Token Economy**: High-density markdown tables with normalized metric units (ms).

### 7.4 Markdown Document Schema
```markdown
---
format_version: 2
test_name: "TOrder_Peak_1000Users"
start_time: "2026-08-17T14:00:00Z"
duration: "1h 00m"
total_transactions: 12540
total_requests: 348920
error_rate: "0.14%"
scorecard_rating: "A (Passed)"
---

# Test Overview & Configuration
* Target Load: 1,000 concurrent users (Arrival Rate: 12,000 trans/h)
* Target Environment: Staging US-East

# Transaction & Action Summary
| Transaction / Action | Count | Errors (%) | Mean (ms) | P95 (ms) | P99 (ms) |
|---|---|---|---|---|---|
| TGuestOrder | 8,400 | 0.08% | 1,420 | 2,100 | 3,450 |
| TVisit | 4,140 | 0.24% | 450 | 850 | 1,200 |

# Labeled Domain Breakdown
## Label: [checkout]
* Requests: 54,200 | Error Rate: 0.05% | P95: 1,120ms
* Slowest Endpoint: `POST /api/v2/checkout/pay` (P95: 2,400ms)

# Error Categorization & Diagnostics
* `504 Gateway Timeout` (42 occurrences) - Concentrated in `EnterPayment` action.

# Infrastructure & Agent Health
* Agent CPU Utilization: Mean 38%, Peak 64%.

# Scorecard Evaluation
* Verdict: PASSED (96.5% score)
```

### 7.5 Configuration Properties
```properties
## Enable generation of AI data file (ai-data.md)
com.xceptance.xlt.reportgenerator.aiData.enabled = true

## Specify AI Data format version (default: 2)
com.xceptance.xlt.reportgenerator.aiData.version = 2

## Optional: Include sanitized stack traces in error diagnostics
com.xceptance.xlt.reportgenerator.aiData.includeErrorTraces = true
```

### 7.6 Standalone & Independent AI Workflows (Beyond XTC)
The `ai-data.md` file is fully decoupled from the XTC cloud platform. Developers and QA engineers running standalone XLT locally or in self-hosted CI/CD can use `ai-data.md` across various AI tools:
* **Interactive Web Chat**: Drag-and-drop `ai-data.md` directly into Google Gemini, Claude, or ChatGPT for conversational exploratory analysis.
* **IDE AI Assistants (Cursor, Copilot, Antigravity)**: Reference `@ai-data.md` in your IDE chat to ask questions while reviewing test code.
* **Local LLMs (Ollama / llama.cpp / LM Studio)**: Run air-gapped, privacy-compliant offline analysis scripts against local models (e.g., Llama 3, Mistral, Qwen).
* **Automated CI/CD PR Bots**: Script a lightweight GitHub Action / GitLab CI step that passes `ai-data.md` to an LLM API to post automated performance review summaries directly on pull requests.

### 7.7 Demo Prompt Cookbook

#### Recipe 1: Deep Root Cause Analysis (RCA) & Bottleneck Diagnosis
> **Goal:** Identify what failed, why it failed, and provide remediation steps.
>
> **Prompt:**
> ```text
> Act as a Principal Performance Engineer. Analyze the attached XLT load test data (ai-data.md).
> 
> Please provide:
> 1. Executive Bottleneck Summary: The top 3 slowest transactions and endpoints (focusing on P95 and P99).
> 2. Error Correlation: Analyze whether errors were isolated to specific endpoints, and correlate them with transaction volume or agent CPU load.
> 3. Root Cause Hypothesis: Based on the error types (e.g., 504 timeouts vs connection resets vs assertions), what is the most likely architectural bottleneck (database connection pool, backend service starvation, third-party dependency)?
> 4. Remediation Action Plan: 3 concrete, prioritized technical recommendations for the engineering team.
> ```

#### Recipe 2: 3-Paragraph Executive Briefing (Management Ready)
> **Goal:** Create a concise summary suitable for engineering leadership or release managers.
>
> **Prompt:**
> ```text
> You are summarizing load test results for a VP of Engineering. Review the attached ai-data.md file and write a 3-paragraph executive summary:
> 
> - Paragraph 1 (Scale & Readiness): Total transactions achieved, peak concurrency, overall error rate, and whether the system met release criteria.
> - Paragraph 2 (Key Findings): Highlight the best and worst performing business domains (using the labeled groups like checkout/search), noting P95 response times.
> - Paragraph 3 (Release Verdict & Next Steps): State a clear GO / NO-GO recommendation with any critical caveats or required follow-ups before production launch.
> 
> Keep the tone professional, objective, and data-backed. Avoid jargon.
> ```

#### Recipe 3: Release-over-Release Regression Comparison
> **Goal:** Compare two test runs (e.g., v1.4 vs v1.5) by attaching two `ai-data.md` files.
>
> **Prompt:**
> ```text
> I have attached two XLT AI data files:
> - Baseline Run: [Attach baseline ai-data.md or paste as Baseline]
> - Candidate Run: [Attach current ai-data.md or paste as Candidate]
> 
> Compare the two load test runs and generate a Performance Delta Report:
> 1. Highlight any transaction or request where P95 degraded by more than 10%.
> 2. Identify any new error types or increased error rates.
> 3. Highlight any positive performance improvements or throughput gains.
> 4. Summarize the comparison in a Markdown delta table with columns: [Endpoint/Action, Baseline P95, Candidate P95, Delta %, Status (Improved/Regressed/Stable)].
> ```

#### Recipe 4: SLA Compliance Gate Verification
> **Goal:** Validate test metrics strictly against custom business SLAs.
>
> **Prompt:**
> ```text
> Review the attached ai-data.md file against the following non-negotiable SLAs:
> - SLA-1: Overall error rate must be < 0.20%.
> - SLA-2: All endpoints in the [checkout] label must have P95 <= 1,500ms and P99 <= 3,000ms.
> - SLA-3: Total transaction throughput must be >= 10,000 completed transactions.
> - SLA-4: Agent CPU utilization must not exceed 80% (ensuring valid test harness health).
> 
> For each SLA, state [PASS / FAIL], the actual measured value vs the target threshold, and provide a final Quality Gate Decision: [APPROVED / REJECTED].
> ```

#### Recipe 5: Automated Jira Defect Ticket Generation
> **Goal:** Convert performance failures and error spikes into formatted bug reports.
>
> **Prompt:**
> ```text
> Review the error diagnostics and slowest endpoints in the attached ai-data.md. Generate Jira issue descriptions in Markdown for the top 2 performance defects found:
> 
> Include for each ticket:
> - Title: [Concise summary with endpoint name and error code/latency]
> - Severity: [Critical / Major / Minor]
> - Component / Labeled Domain: [e.g., checkout, auth, search]
> - Observed Behavior: [Exact error rate, status codes, P95/P99 latencies, and sample error traces]
> - Expected Behavior: [Normal SLA expectations]
> - Impact on Load Test: [Number of affected transactions and user impact]
> - Suggested Investigation Areas: [Specific logs, queries, or configs to inspect]
> ```

#### Recipe 6: CI/CD Pull Request Summary (JSON Output for Webhooks)
> **Goal:** Extract structured JSON output to drive automated CI/CD comments or status checks.
>
> **Prompt:**
> ```text
> Analyze the attached ai-data.md file. Output ONLY a valid JSON object matching the following structure (no markdown fences, no conversational text):
> {
>   "testName": string,
>   "verdict": "PASSED" | "FAILED" | "WARNING",
>   "overallScore": number,
>   "totalRequests": number,
>   "errorPercentage": number,
>   "slowestEndpoints": [
>     {"name": string, "p95_ms": number, "error_rate": number}
>   ],
>   "criticalErrors": [
>     {"code": string, "count": number, "summary": string}
>   ],
>   "executiveSummary": string
> }
> ```


---

## 8. Executive PDF Report & Rating Injection

### 8.1 Files: `manual/reports.md`, `manual/report-options.md`, `manual/scorecard.md`

### 8.2 Executive PDF Report
* Formatted, publication-ready multi-page PDF designed for stakeholders and management.
* Contains top-level KPIs, scorecard verdict badges, overview chart snapshots, and error summaries.
* **Configuration / CLI**:
  ```properties
  com.xceptance.xlt.reportgenerator.pdf.enabled = true
  com.xceptance.xlt.reportgenerator.pdf.filename = executive-summary.pdf
  ```

### 8.3 Rating Injection (External Rating Override)
* **Purpose**: Allows CI/CD pipelines, external quality gates, or QA engineers to pass an external verdict into the report generation engine.
* **CLI Parameter**:
  ```bash
  ./create_report.sh ../results/20260902-140000 -rating "Passed with Exceptions"
  ```
* **Property Override**:
  ```properties
  com.xceptance.xlt.scorecard.rating = A
  ```
* **Effect**: Overrides the rating badge on the PDF report cover, HTML report header, Scorecard tab, and XML data exports (`scorecard.xml`, `testreport.xml`).

---

## 9. Private Machine Mode & Network-Isolated Testing

### 9.1 Files: `manual/private-machines.md`, `xtc/loadtesting/156-private-machines.md`

### 9.2 Architecture
* Agent controllers run inside corporate networks or private VPCs without inbound public ports.
* Outbound HTTPS reverse-tunnel established to `xtc-xlt-relay.xceptance.com:443`.
* Full resource tracking and hybrid mixing with public cloud generators.

---

## 10. Housekeeping, Properties & Dependency Updates

### 10.1 `manual/installation.md`
* Update Maven dependency snippet from `9.2.1` to `10.0.0`.
* Confirm Java 21 LTS baseline requirement.

### 10.2 `manual/properties.md`
Add full reference documentation for:
* `com.xceptance.xlt.agentcontroller.privateMachine.*`
* `com.xceptance.xlt.reportgenerator.aiData.*`
* `com.xceptance.xlt.reportgenerator.pdf.*`
* `com.xceptance.xlt.reportgenerator.labelingRules.*`
* `com.xceptance.xlt.reportgenerator.charts.commonAverage.*`
* `com.xceptance.xlt.reportgenerator.charts.averages.*`
* `com.xceptance.xlt.scorecard.rating`

---

## 11. Java Flight Recorder (JFR) Profiling How-To & Configuration

### 11.1 Files: `how-tos/java-flight-recorder.md` (New), `manual/test-suite-configuration.md`

### 11.2 Purpose & Architectural Context
* Capture low-overhead (<1–2%) JVM runtime profiling data directly on agent machines during load test execution without distorting transaction response times or throughput measurements.
* Leverage built-in HotSpot JVM event-tracing engine (JFR) to identify CPU bottlenecks, lock contention, memory allocation pressure, and GC pauses on the load generators themselves.

### 11.3 Agent JVM Configuration (`jvmargs.cfg`)
To enable profiling across all agent processes, configure the following flags in `<testsuite>/config/jvmargs.cfg` (or globally in `<xlt>/config/jvmargs.cfg`):

```properties
-XX:+UnlockDiagnosticVMOptions
-XX:+DebugNonSafepoints
-XX:StartFlightRecording=delay=3m,disk=true,duration=15m,settings=profile,filename=./results/jfr-results.jfr,dumponexit=true,path-to-gc-roots=true
```

#### Parameter Breakdown Reference

| Parameter | Purpose |
|---|---|
| `-XX:+UnlockDiagnosticVMOptions` | Unlocks advanced JVM diagnostic options required for low-level profiling. |
| `-XX:+DebugNonSafepoints` | Instructs the JVM to generate accurate instruction pointer information and call stacks outside of JVM safepoints. Avoids sampling bias towards safepoint operations and yields precise CPU hot-spot analysis. |
| `delay=3m` | Delays the start of the recording by 3 minutes to allow load test ramp-up and JVM warmup to complete, focusing solely on steady-state load. |
| `disk=true` | Streams recorded event buffers to temporary disk storage rather than retaining them in JVM heap/memory, keeping memory footprint minimal and predictable. |
| `duration=15m` | Sets recording duration (15 minutes). Concludes and saves automatically once the duration elapses. |
| `settings=profile` | Uses the comprehensive `profile.jfc` template built into the JDK (captures CPU samples, memory allocations, thread locks, and I/O events). |
| `filename=./results/jfr-results.jfr` | Specifies output path for `.jfr` file. Placing in `./results` ensures recording is preserved alongside test run results. |
| `dumponexit=true` | Flushes buffered in-flight data to the `.jfr` file upon agent JVM process termination. |
| `path-to-gc-roots=true` | Enables reference chain tracking back to GC roots for allocated objects, facilitating object retention and leak analysis. |

### 11.4 Analysis Workflows & Tooling
* **JDK Mission Control (JMC)**: Primary deep-dive GUI tool for exploring JFR events, thread allocation hot spots, and GC metrics.
* **IntelliJ IDEA Profiler**: *Help > Open Process Data / Profiler Dump* or drag-and-drop `.jfr` file into IDE.
* **VisualVM**: Inspect `.jfr` snapshots for thread, memory, and CPU breakdown.
* **JDK CLI (`jfr`)**:
  ```bash
  jfr summary jfr-results.jfr
  jfr print --events "jdk.ExecutionSample" jfr-results.jfr
  ```

#### Key Inspection Targets
* **Method Profiling & CPU Hot Spots**: Expensive helper methods, repetitive XML/JSON parsing, regex compilation inside transaction loops.
* **Memory & Allocation Pressure**: TLAB allocation churn triggering high Young-Gen garbage collections.
* **Thread Contention & Synchronization**: Lock contention (`jdk.JavaMonitorEnter`) or thread blocking.
* **Garbage Collection Pauses**: GC pause durations and frequency correlating with throughput dips.

### 11.5 Local Development Mode
Pass JVM options during local execution or test debugging:
* **IntelliJ IDEA**: VM options in *Run/Debug Configurations > JUnit*.
* **Eclipse**: VM arguments in *Run Configurations > Arguments*.
* **Maven CLI**:
  ```bash
  mvn test -Dtest=TAuthor -DargLine="-XX:+UnlockDiagnosticVMOptions -XX:+DebugNonSafepoints -XX:StartFlightRecording=disk=true,settings=profile,filename=target/jfr-debug.jfr"
  ```

### 11.6 Complete Target Document: `content/en/xlt/how-tos/java-flight-recorder.md`
````markdown
---
title: "How to Profile Load Tests with Java Flight Recorder (JFR)"
linkTitle: "Profile with JFR"

weight: 270
type: docs

description: >
  Learn how to capture low-overhead JVM profiling data during load tests using Java Flight Recorder (JFR).
---

## Overview

When running load tests, understanding the performance characteristics and resource consumption of your load test agents is crucial. Inefficient test code, excessive object allocations, thread synchronization bottlenecks, or frequent garbage collection pauses on the load generator can distort test results and throttle maximum throughput.

**Java Flight Recorder (JFR)** is a profiling and event-tracing framework built directly into the HotSpot JVM. Because JFR is integrated into the JVM kernel, it operates with negligible overhead (typically less than 1–2%), making it safe to use even during full-scale load tests.

## Configuring JFR for Load Test Execution

XLT agents read their JVM configuration directly from the `<testsuite>/config/jvmargs.cfg` file (or globally from `<xlt>/config/jvmargs.cfg`).

To enable JFR profiling across all agent processes, add the following JVM arguments to `jvmargs.cfg`:

```properties
-XX:+UnlockDiagnosticVMOptions
-XX:+DebugNonSafepoints
-XX:StartFlightRecording=delay=3m,disk=true,duration=15m,settings=profile,filename=./results/jfr-results.jfr,dumponexit=true,path-to-gc-roots=true
```

{{% note title="Location of jvmargs.cfg" %}}
Settings in `<testsuite>/config/jvmargs.cfg` are applied automatically to each agent process launched by the Agent Controller when executing load tests.
{{% /note %}}

## Parameter Breakdown

Here is a detailed explanation of each parameter used in the configuration:

| Parameter | Purpose |
|---|---|
| `-XX:+UnlockDiagnosticVMOptions` | Unlocks advanced JVM diagnostic options required for low-level profiling. |
| `-XX:+DebugNonSafepoints` | Instructs the JVM to generate accurate instruction pointer information and call stacks outside of JVM safepoints. This avoids sampling bias towards safepoint operations and yields precise CPU hot-spot analysis. |
| `delay=3m` | Delays the start of the recording by 3 minutes. This allows the load test to complete its ramp-up and warmup phase so that the recording focuses solely on steady-state load. |
| `disk=true` | Streams recorded event buffers to temporary disk storage rather than keeping them solely in JVM memory, keeping the memory footprint minimal and predictable. |
| `duration=15m` | Sets the recording duration (in this case, 15 minutes). After this window elapses, the recording automatically concludes and saves the data. |
| `settings=profile` | Uses the comprehensive `profile.jfc` configuration template built into the JDK. This profile collects CPU method execution samples, memory allocations, thread locks, and I/O events (more detailed than the lightweight `default` template). |
| `filename=./results/jfr-results.jfr` | Specifies the output path for the `.jfr` recording file. Placing it in `./results` ensures that the file is written to the active test results directory and preserved alongside the run. |
| `dumponexit=true` | Ensures that any buffered in-flight data is flushed to the `.jfr` file when the agent JVM process shuts down. |
| `path-to-gc-roots=true` | Enables reference chain tracking back to GC roots for allocated objects, allowing deep inspection of object retention and potential memory leaks. |

## Analyzing JFR Recordings

Once the load test finishes, you can collect the generated `jfr-results.jfr` file from the agent results directory and open it with profiling tools:

1. **JDK Mission Control (JMC)**: The official, deep-dive GUI tool provided by OpenJDK/Oracle for analyzing JFR files.
2. **IntelliJ IDEA**: Built-in JFR profiler interface (*Help > Open Process Data / Profiler Dump* or dragging the `.jfr` file into the editor).
3. **VisualVM**: Supports opening `.jfr` snapshots for thread, memory, and CPU inspection.
4. **Command-Line (`jfr` tool)**: The JDK includes a CLI utility to inspect recordings:
   ```bash
   jfr summary jfr-results.jfr
   jfr print --events "jdk.ExecutionSample" jfr-results.jfr
   ```

### Key Areas to Inspect

* **Method Profiling & CPU Hot Spots**: Look for unexpectedly slow helper methods, repetitive XML/JSON parsing, or regex compilation occurring inside transaction loops.
* **Memory & Object Allocations**: Identify classes causing high allocation pressure in the TLAB (Thread-Local Allocation Buffer) that trigger excessive Young-Generation garbage collections.
* **Thread Contention & Synchronization**: Detect lock contention (`jdk.JavaMonitorEnter`) or thread blocking that limits agent scaling.
* **Garbage Collection Pauses**: Check GC pause durations and verify whether garbage collection is causing throughput dips during the measurement period.

## Profiling in Local Development Mode

To profile an individual test scenario during local execution or debugging in your IDE, supply the same JVM arguments in your IDE's Run Configuration:

* **IntelliJ IDEA**: Add the arguments to **VM options** under *Run/Debug Configurations > JUnit*.
* **Eclipse**: Add them to **VM arguments** under *Run Configurations > Arguments*.
* **Maven CLI**: Pass them via the `-DargLine` parameter:
   ```bash
   mvn test -Dtest=TAuthor -DargLine="-XX:+UnlockDiagnosticVMOptions -XX:+DebugNonSafepoints -XX:StartFlightRecording=disk=true,settings=profile,filename=target/jfr-debug.jfr"
   ```
````

### 11.7 Manual Cross-Reference Update (`content/en/xlt/manual/test-suite-configuration.md`)
In `content/en/xlt/manual/test-suite-configuration.md` under the section describing `<testsuite>/config/`:
```diff
- - `jvmargs.cfg`: JVM settings for the agents and therefore only used in load test mode, e.g., settings for Java garbage collector tuning.
+ - `jvmargs.cfg`: JVM settings for the agents and therefore only used in load test mode, e.g., settings for Java garbage collector tuning or [Java Flight Recorder (JFR) profiling]({{< relref "java-flight-recorder" >}}).
```

