---
name: xtc-ai-data-prompts
description: Formulate high-precision diagnostic prompts and recipes for analyzing XLT and XTC AI Data Reports (ai-data.md, Schema v2). Covers 3-layer bottleneck attribution, steady-state isolation, SLA auditing, differential baseline comparisons, and CI/CD executive rating injection.
---

# XTC AI Data Report Prompting

XLT and XTC automatically generate `ai-data.md` (Schema Version 2) alongside standard HTML reports. Engineered specifically for Large Language Models (LLMs) and automated agents, `ai-data.md` combines a concise YAML metadata header with dense Markdown tables for time series, transactions, actions, requests, response codes, agent metrics, and grouped error traces.

## Core Concepts

### 1. Schema Version 2 Anatomy

- **YAML Header**: Explicitly defines measurement units (`responseTimes: ms`, `periods: s`, `rates: per second`), test duration, `rampUpPeriod`, and XTC run identifiers (`organization`, `project`, `loadTestRunId`).
- **Time Series**: Chronological bucket intervals (typically 60–120 dynamic rows) recording `Elapsed`, `Time`, and 9 layer metrics (Transaction Mean, Transactions/s, Transaction Errors/s, Action Mean, Actions/s, Action Errors/s, Request Mean, Requests/s, Request Errors/s).
- **Tabular Breakdowns**: Aggregated summaries for Requests, Actions, Transactions, Agent hardware, Response Codes, and top Grouped Error Traces.

### 2. The Three-Layer Bottleneck Diagnosis Rule

When evaluating latency, instruct the model to compare the three layer means across the same time row:

| Metric Pattern | Diagnosed Layer | Root Cause & Remediation |
|---|---|---|
| **Request Mean** increases | **Backend Server** | Database query latency, downstream API bottlenecks, or server thread starvation. |
| **Action Mean** increases while Request Mean is flat | **Client / Browser / Test Code** | Client-side JavaScript execution, DOM rendering delay, or test harness synchronization waits. |
| **Transaction Mean** increases while Action Mean is flat | **Think Time / Test Logic** | High configured think times or long algorithmic processing loops between actions. |

### 3. Warm-up vs. Steady-State Isolation

Never evaluate throughput or average latency against whole-test aggregates when `rampUpPeriod > 0`. Instruct the model to slice the Time Series table where `Elapsed >= rampUpPeriod` to isolate true steady-state performance.

---

## Standard Prompt Recipes

### Recipe 1: Bottleneck Root Cause Analysis

```markdown
You are a Senior Performance Testing Architect. Analyze the following XLT/XTC load test data:

[paste contents of ai-data.md]

Task:
1. Identify the top 3 bottleneck requests by P95 and mean response time.
2. Using the Three-Layer Diagnosis Rule (Request Mean vs Action Mean vs Transaction Mean), determine whether latency originated in backend server processing, network transfer, or client-side execution.
3. Cite the exact column headers, elapsed timestamps, and metric values that substantiate your conclusion.
```

### Recipe 2: Steady-State SLA & Quality Gate Audit

```markdown
Analyze the steady-state performance of this load test:

[paste contents of ai-data.md]

Evaluation Criteria:
- Ramp-up ends at Elapsed = {rampUpPeriod} seconds. Discard prior rows for throughput calculations.
- Request SLA: P95 <= 800 ms across all requests.
- Error Rate SLA: Request errors < 0.05% during steady state.
- Agent Health: Max Agent CPU < 85%.

Deliverables:
- State PASS or FAIL for each criterion.
- List any non-compliant requests with observed metrics.
- Provide a summary verdict in 3 bullet points.
```

### Recipe 3: Error Burst vs. Sustained Drift Triage

```markdown
Triage test errors and failure patterns:

[paste contents of ai-data.md]

Task:
1. Correlate the Time Series `Request Errors/s` column with the Grouped Errors section.
2. Determine whether errors occurred in an isolated burst (e.g., connection shock during ramp-up) or as a sustained wave indicating resource exhaustion.
3. List the top distinct error signatures with their frequency and affected actions.
```

### Recipe 4: Differential Baseline Comparison

```markdown
Compare the baseline load test against the candidate release:

Baseline Run:
[paste baseline ai-data.md]

Candidate Run:
[paste candidate ai-data.md]

Task:
1. Verify test equivalence: Check duration, virtual user counts, and ramp-up in the YAML header.
2. Compute the delta percentage for steady-state throughput (Requests/s) and P95 latency.
3. Flag any transaction or request with latency degradation greater than 10%.
4. Identify any new error messages present in Candidate but absent in Baseline.
```

### Recipe 5: CI/CD External Rating Generation

Generate CLI parameters for injecting an executive rating into XLT's report generator:

```markdown
Analyze this test run and output CLI arguments for XLT `create_report.sh`:

[paste contents of ai-data.md]

Generate three formatted parameters:
1. `--rating`: Grade from [A+, A, B, C, D, F] based on SLA compliance and error severity.
2. `--rating-summary`: A single-sentence executive headline (under 100 characters).
3. `--rating-comment-file`: Markdown assessment summarizing strengths, bottlenecks, and recommendations.
```

---

## Anti-Hallucination Guardrails

When constructing prompts, include these constraints:
- **Cite Exact Numbers**: Instruct the model to cite only numbers present in the tables; forbid estimating unmeasured percentiles.
- **Respect Units**: Explicitly instruct the model to follow the `units` block (`ms` for response times, `s` for periods, `bytes` for data sizes).
- **Do Not Conflate Layers**: Remind the model that Request metrics measure network/server HTTP exchanges, whereas Action metrics measure user-visible page interactions.

## Where to Look

- [AI Data Report Guide](https://docs.xceptance.com/xlt/manual/ai-data-report.md): Schema specification, configuration properties, and sample exports.
- [Executive PDF Reports](https://docs.xceptance.com/xlt/manual/reports.md): External rating injection and report customization.
- [XTC Basics](https://docs.xceptance.com/xtc/basics.md): Xceptance Test Center test execution and reporting.
