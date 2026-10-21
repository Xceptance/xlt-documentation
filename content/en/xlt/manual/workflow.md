---
title: Workflow
icon: workflow
description: Step-by-step roadmap from initial test design to executing and analyzing a load test.
sidebar:
  order: 50
---

## Load Testing Roadmap

Executing a successful load test with XLT follows a structured six-stage lifecycle:

```text
1. Test Suite Scaffolding ──> 2. Test Planning ──> 3. Local Scripting
                                                            │
6. Report Analysis <── 5. Distributed Execution <── 4. Load Configuration
```

---

### 1. Scaffold Your Test Suite

All test scenarios reside inside a [Test Suite](/xlt/manual/test-suites/). An XLT test suite is a standard Maven Java project containing your scenario scripts, configuration files, and dependencies.

- **Sample Suites**: Clone one of the pre-configured [Sample Test Suites](/xlt/manual/test-suites/) to start with proven project structures and baseline dependencies.
- **IDE Setup**: Import the project into your preferred IDE (IntelliJ IDEA, Eclipse, or VS Code) as a standard Maven project.

---

### 2. Plan Scenarios and Load Profiles

Define your objectives before authoring test scripts:

- **Target Throughput & Concurrency**: Estimate required traffic volumes based on production analytics (such as peak holiday traffic or expected concurrent users).
- **Core User Journeys**: Identify essential user paths through the application (browsing, searching, adding to cart, checkout).
- **Target Environment**: Ensure test environments match production architecture as closely as possible. Bypass third-party services (such as external payment gateways or SMS providers) to avoid uncontrolled latency bottlenecks.
- **Pre-Test Data**: Prepare system accounts, product inventories, and seeded databases to support concurrent test execution.

---

### 3. Develop and Stabilize Scenarios Locally

Author test scenarios locally in your IDE using standard JUnit and XLT abstractions:

- **Modular Design**: Decompose interactions into granular **Actions** (single clicks/requests) and composite **Flows** (reusable business transactions like login or checkout). See the [Test Development Guide](/xlt/manual/test-development/) for patterns.
- **Local Validation**: Execute tests against target environments directly from your IDE to ensure functional stability before applying load.
- **Debugging**: Inspect the [Result Browser](/xlt/manual/result-browser/) to examine request headers, response bodies, and visual traces for failed steps.

---

### 4. Configure Load Profiles and Infrastructure

Configure load execution parameters in `project.properties` and environment settings:

- **Load Model**: Choose between user-count modeling (fixed concurrent users) or arrival-rate modeling (target transactions per second). Learn more in [Load Configuration](/xlt/manual/load-configuration/).
- **Pacing & Limits**: Configure think times, request timeouts, and error thresholds.
- **Agent Allocation**: Map scenarios to agent machines (local machines, on-premises servers, or cloud agents via [Cloud Setup](/xlt/advanced/cloud-setup/)).

---

### 5. Execute the Load Test

Run your test using the XLT master controller:

- **Local Execution**: For low-load smoke tests, run scenarios directly on your local workstation.
- **Distributed Execution**: For production-scale tests, run `mastercontroller.sh` to upload the test suite, synchronize cloud or dedicated agent controllers, and stream runtime metrics.
- **Automated CI/CD**: Trigger non-interactive test runs via CLI flags or the [XLT Jenkins Plugin](/xlt/advanced/jenkins/). See [XLT Test Execution](/xlt/manual/xlt-test-execution/) for command-line syntax.

---

### 6. Analyze Results and Reports

When test execution completes, XLT compiles a comprehensive performance report:

- **Load Test Report**: Review transaction percentiles, error rates, throughput charts, and resource metrics in the [HTML Report](/xlt/manual/test-evaluation/).
- **Trend & Comparison Reports**: Compare current metrics against previous baselines to identify performance regressions using [Report Options](/xlt/manual/report-options/).
- **Executive PDF & AI Data**: Generate high-level KPI summaries via [Executive PDF Reports](/xlt/manual/reports/#executive-pdf-reports) and export structured machine-readable metrics via [AI Data Reports](/xlt/manual/ai-data-report/).
