---
title: "Properties Reference"
weight: 1000
type: docs
description: >
  A comprehensive reference of all XLT configuration properties for load testing, report generation, and development.
---

XLT is highly configurable through various properties files. This reference lists supported properties, their default values, and usage.

## Property Files Overview

* **`default.properties`**: Contains global defaults for the test suite. Located in `<testsuite>/config/`.
* **`project.properties`**: Project-specific settings. Overrides `default.properties`. Located in `<testsuite>/config/`.
* **`test.properties`**: Load test profile configuration (user counts, arrival rates). Referenced by `project.properties`.
* **`dev.properties`**: Developer-specific overrides, active only in development mode.
* **`reportgenerator.properties`**: Reporting configuration. Located in `<xlt>/config/`.

This list might not be complete. Please check the individual files for more properties and a more extensive explanation.

---

## Load Testing Properties

These properties control the execution of load tests, network behavior, and general framework settings.

### General Framework

| Property | Description | Default |
| :--- | :--- | :--- |
| `com.xceptance.xlt.result-dir` | The directory where results will be stored relative to the test suite. | `./results` |
| `com.xceptance.xlt.maxErrors` | The maximum number of errors allowed before an agent terminates. Useful for aborting tests in case of severe server issues. | `1000` |
| `com.xceptance.xlt.stopTestOnHttpErrors.page` | Abort a transaction if an HTTP error occurs while loading a page. | `true` |
| `com.xceptance.xlt.stopTestOnHttpErrors.embedded` | Abort a transaction if an HTTP error occurs while loading an embedded resource. | `false` |
| `com.xceptance.xlt.stopTestOnJavaScriptErrors` | Abort a transaction if a JavaScript error occurs. | `false` |
| `com.xceptance.xlt.useHighPrecisionTimer` | Use `System.nanoTime()` for timing instead of `System.currentTimeMillis()` to avoid issues with system clock adjustments. | `true` |

### Network & Proxy

| Property | Description | Default |
| :--- | :--- | :--- |
| `com.xceptance.xlt.proxy` | Enable usage of an HTTP proxy. | `false` |
| `com.xceptance.xlt.proxy.host` | Hostname or IP of the proxy server. | `127.0.0.1` |
| `com.xceptance.xlt.proxy.port` | Port of the proxy server. | `8888` |
| `com.xceptance.xlt.proxy.userName` | Username for proxy authentication (if required). | *(empty)* |
| `com.xceptance.xlt.proxy.password` | Password for proxy authentication. | *(empty)* |
| `com.xceptance.xlt.proxy.bypassForHosts` | Space-separated list of regex patterns for hosts that should bypass the proxy. | *(empty)* |
| `com.xceptance.xlt.http.retry.enabled` | Enable automatic retry of failed requests. | `true` |
| `com.xceptance.xlt.http.retry.count` | Number of retries for failed requests. | `3` |
| `com.xceptance.xlt.http.retry.nonIdempotentRequests` | Allow retrying non-idempotent requests (POST, PATCH). | `true` |
| `com.xceptance.xlt.timeout` | Connection and socket timeout in milliseconds. | `30000` |
| `com.xceptance.xlt.http.keepAlive` | Use keep-alive HTTP connections. | `true` |
| `com.xceptance.xlt.http.gzip` | Request compressed content (GZIP). | `true` |

### Web Client & Browser Emulation

| Property | Description | Default |
| :--- | :--- | :--- |
| `com.xceptance.xlt.browser` | Browser to simulate (e.g., `FF`, `CH`, `EDGE`). | `FF` |
| `com.xceptance.xlt.loadStaticContent` | Load images and other static content. | `true` |
| `com.xceptance.xlt.staticContent.downloadThreads` | Number of threads for asynchronous static content downloading. | `4` |
| `com.xceptance.xlt.javaScriptEngineEnabled` | Enable the HtmlUnit JavaScript engine. | `true` |
| `com.xceptance.xlt.javaScriptEnabled` | Execute JavaScript on web pages. Requires engine to be enabled. | `true` |
| `com.xceptance.xlt.cssEnabled` | Enable CSS evaluation. | `true` |

### Timing & Execution

| Property | Description | Default |
| :--- | :--- | :--- |
| `com.xceptance.xlt.thinktime.action` | Mean think time between actions in ms. | `100` |
| `com.xceptance.xlt.thinktime.action.deviation` | Maximum random deviation for action think time in ms. | `50` |
| `com.xceptance.xlt.abortLongRunningTransactions` | Abort transactions that exceed a maximum runtime. | `false` |
| `com.xceptance.xlt.maximumTransactionRunTime` | Maximum runtime in ms if abortion is enabled. | `900000` (15m) |

### Test Suite Configuration

| Property | Description | Default |
| :--- | :--- | :--- |
| `com.xceptance.xlt.testPropertiesFile` | The name of the property file containing the active load profile settings. | `test.properties` |
| `com.xceptance.xlt.projectName` | Name of the project, displayed in reports. | *(empty)* |
| `com.xceptance.xlt.loadtests.<TestCase>.class` | Mapping of a test case name to its fully qualified Java class. | *(auto-discovered)* |

## Report Generation Properties

These properties configure the XLT report generator, including output location, charts, apdex scores, and data formatting. All properties typically reside in `reportgenerator.properties` or can be overridden in `project.properties`.

### General Reporting

| Property | Description | Default |
| :--- | :--- | :--- |
| `com.xceptance.xlt.reportgenerator.reports` | Directory where generated reports are stored (relative to XLT home). | `reports` |
| `com.xceptance.xlt.reportgenerator.linkToResultBrowsers` | Create links from error entries in the report to the collected result data on disk. | `false` |
| `com.xceptance.xlt.reportgenerator.resultsBaseUri` | Base URI to prepend to result browser links (e.g., `http://jenkins/results`). | *(empty)* |
| `com.xceptance.xlt.reportgenerator.threads` | Limit the number of threads used for report generation (CPUs used). | *(max available)* |
| `com.xceptance.xlt.reportgenerator.maskPropertiesRegex` | Regex for property names whose values should be masked in the report (e.g., passwords). | `(?i)password` |

### Charts & Data

| Property | Description | Default |
| :--- | :--- | :--- |
| `com.xceptance.xlt.reportgenerator.charts.width` | Width of generated charts in pixels. | `900` |
| `com.xceptance.xlt.reportgenerator.charts.height` | Height of generated charts in pixels. | `300` |
| `com.xceptance.xlt.reportgenerator.charts.scale` | Y-axis scale for runtime charts (`linear` or `logarithmic`). | `linear` |
| `com.xceptance.xlt.reportgenerator.charts.cappingValue` | Cap runtime charts at this value [ms]. Can be suffixed with `.transactions`, `.actions`, `.requests`. | *(none)* |
| `com.xceptance.xlt.reportgenerator.charts.cappingFactor` | Cap runtime charts at `factor * mean`. Can be suffixed with `.transactions`, etc. | *(none)* |
| `com.xceptance.xlt.reportgenerator.runtimePercentiles` | Percentiles shown in data tables. | `50, 95, 99, 99.9` |

### Apdex Configuration

Configure Apdex thresholds for specific actions.

| Property | Description |
| :--- | :--- |
| `com.xceptance.xlt.reportgenerator.apdex.<Group>.actions` | Regex matching the action names for this group. |
| `com.xceptance.xlt.reportgenerator.apdex.<Group>.threshold` | Apdex threshold [s] for this group. |
| `com.xceptance.xlt.reportgenerator.apdex.default.threshold` | Default threshold for actions not matching any group. |

**Example:**

```bash
com.xceptance.xlt.reportgenerator.apdex.Checkout.actions = CO.*
com.xceptance.xlt.reportgenerator.apdex.Checkout.threshold = 3.0
```

### Request Table Colorization

Colorize request table cells based on performance thresholds. For a detailed guide and examples, see [Report Colorization]({{< relref "report-configuration#report-colorization" >}}) and the [4.10.x Release Notes]({{< relref "/xlt/release-notes/4_10_x#colored-request-table-cells" >}}).

| Property | Description |
| :--- | :--- |
| `...colorization.<Group>.matching` | Regex for matching request names. |
| `...colorization.<Group>.mean` | Thresholds for mean runtime: `green target red`. |
| `...colorization.<Group>.percentile.<ID>` | Thresholds for specific percentiles (e.g., p95). |

**Example:**

```bash
com.xceptance.xlt.reportgenerator.requests.table.colorization.default.mean = 100 200 500
```

### Development Mode Properties

These properties are typically used in `dev.properties` to aid in compiling and debugging test cases.

| Property | Description | Default |
| :--- | :--- | :--- |
| `com.xceptance.xlt.random.initValue` | Seed for random number generator to ensure reproducibility during debugging. | *(time-based)* |
| `com.xceptance.xlt.results.openResultBrowser` | Automatically open the result browser after a test run (IDE only). | `false` |
| `com.xceptance.xlt.output2disk` | Write page content to disk (`never`, `onError`, `always`). | `onError` |
| `com.xceptance.xlt.output2disk.size` | Number of pages kept in memory for `onError`. | `3` |
| `com.xceptance.xlt.output2disk.onError.dumpMode` | Dump `modifiedAndFinalPages` or `finalPagesOnly`. | `finalPagesOnly` |
