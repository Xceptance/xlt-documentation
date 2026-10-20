---
name: xlt-scorecards
description: Author, tune, and debug automated Groovy quality gates and scorecards (scorecard.groovy) for Xceptance LoadTest (XLT 10). Covers fluent assertions, xpathBuilder helpers, live report inspection, dynamic rule loops, and update_scorecard CLI.
---

# XLT Groovy Scorecards

In XLT 10, automated quality gating and SLA verification are defined using a programmable Groovy DSL (`config/scorecard.groovy`). Rules inspect transaction rates, request response times, error counts, and agent resource utilization during report generation to compute an overall quality rating.

## Setup

1. Create `config/scorecard.groovy` in your test suite root directory.
2. In `config/project.properties`, register the scorecard configuration:

```properties title="project.properties"
com.xceptance.xlt.scorecard.config = scorecard.groovy
```

3. Generate the report:

```bash
./bin/create_report.sh ./results/20260901-100000
```

To re-evaluate scorecards on existing report results without re-running tests or regenerating HTML charts:

```bash
./bin/update_scorecard.sh ./results/20260901-100000
```

See [Scorecard Manual](https://docs.xceptance.com/xlt/manual/scorecard.md).

## Core Concepts

The scorecard script runs inside a secured sandbox with pre-injected bindings:

- **`builder` (`ScorecardBuilder`)**: Primary DSL builder for declaring `rules`, `groups`, and `ratings`.
- **`xpathBuilder` (`XPathBuilder`)**: Helper that generates XPath expressions for common report metrics.
- **`data` (`ReportData`)**: Query engine for live inspection of `testreport.xml` data during script evaluation.
- **`properties` (`XltProperties`)**: Access to test suite properties (`properties.getInt(...)`).
- **`log` (`Logger`)**: Logging interface (`log.info`, `log.warn`, `log.error`).

## Common Tasks

### 1. Define Request Response Time SLA Rules

Use `xpathBuilder` methods to assert response time percentiles:

```groovy
builder.rules {
    rule {
        id 'homepage_p95'
        name 'Homepage Response Time P95'
        points 10
        failsTest true
        checks {
            check {
                selector xpathBuilder.requestP95('^Homepage')
                isLessThanOrEqualTo 500
            }
        }
        messages {
            success "Homepage response time within SLA (<= 500 ms)"
            fail "Homepage response time exceeded 500 ms"
        }
    }
}
```

### 2. Assert Agent Machine Health and CPU Limits

Ensure agent hardware did not bottleneck test results:

```groovy
builder.rules {
    rule {
        id 'agent_cpu'
        name 'Agent CPU Utilization'
        points 5
        checks {
            check {
                selector xpathBuilder.agentCpuMax()
                isLessThan 85
            }
        }
    }
}
```

### 3. Generate Dynamic Rules from Test Report Data

Avoid hardcoding transaction names by querying `data` at evaluation time:

```groovy
builder.rules {
    data.getList('/testreport/transactions/transaction/@name').each { txName ->
        rule {
            id "sla_tx_${txName}"
            name "SLA for Transaction: ${txName}"
            points 5
            checks {
                check {
                    selector xpathBuilder.transactionP95("^${txName}\$")
                    isLessThan 2000
                }
            }
        }
    }
}
```

### 4. Configure Rule Groups and Modes

Group rules logically and configure group evaluation mode (`allPassed` or `anyPassed`):

```groovy
builder.groups {
    group {
        id 'runtime'
        name 'Runtime & Latency SLAs'
        mode 'allPassed'
        rules(['homepage_p95', 'agent_cpu'])
    }
}
```

### 5. Define Overall Rating Thresholds

Set percentage thresholds and test-failure flags for final grades:

```groovy
builder.ratings {
    rating { id 'F'; value 69.99; failsTest true }
    rating { id 'C'; value 79.99; failsTest false }
    rating { id 'B'; value 89.99; failsTest false }
    rating { id 'A'; value 100.0; failsTest false }
}
```

## Gotchas

- **Return Expression**: In `scorecard.groovy`, ensure `builder` is the last expression or returned explicitly so the runtime collects the configuration.
- **Points 0 for Informational Checks**: If a rule should be checked without affecting the percentage score (e.g. logging an informational metric), set `points 0`.
- **Sandbox Security**: Groovy execution runs with security sandboxing; file I/O and arbitrary reflection are restricted. Use `properties` and `data` bindings for external lookups.
- **Regular Expressions**: When using `matchesRegex` or regex selectors in `xpathBuilder`, escape backslashes appropriately (e.g. `^Homepage.*`).

## Where to Look

- [Scorecard Guide](https://docs.xceptance.com/xlt/manual/scorecard.md): Full DSL syntax, fluent assertions, and XPath reference.
- [Report Configuration](https://docs.xceptance.com/xlt/manual/report-configuration.md): Quality gate options and property keys.
- [Executive PDF Reports](https://docs.xceptance.com/xlt/manual/reports.md): Scorecard summaries in printable executive reports.
