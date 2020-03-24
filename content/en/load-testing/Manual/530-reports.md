---
title: "Reports"

weight: 530
type: docs


description: >
  All about the XLT reports.
---

As the most important tool for analyzing the results of a load test run, XLT offers three types of load test reports, which are thoroughly illustrated in the sections below: load test reports, comparison reports and trend reports. 

## Load Test Report

A report for a single test run or a manually combined set of runs. The Load and Performance Test Report gives you all the information needed for a detailed analysis of a load test run. This is what you will probably need most often, so you'll find the basic info on how to [create](../../quick-start/40-run-a-test/#generate-a-test-report) and [evaluate](../../quick-start/50-evaluate-a-test/) a load test report in the Quick View section, and more details about [report options](../540-report-customization) in the Manual. 

## Comparison Report

(Also known as: difference report) The Performance Comparison Report gives you a quick overview on performance improvements (green color tones) and performance declines (red color tones) between two test runs. The initial test run is labeled _baseline_. The test run being compared to the baseline is labeled _measurement run_.

Every section of the comparison report displays a table with performance changes and is divided into three parts:

- **Count**: The percentage values show the development of the performance in comparison to the baseline.  Positive numbers in the count section indicate an improvement of the throughput over the baseline. Negative values indicate a decrease in throughput.
- **Errors**: Positive numbers indicate an increase in the number of errors, negative numbers a decrease. An infinite sign indicates the occurrence of errors in comparison to an error-free baseline.
- **Runtime**: Positive values indicate a poorer performance, negative values an improvement (smaller runtime values) over the baseline.

When you hover the mouse over the columns of the report table, you can see the actual measurement results, which lets you determine whether or not the reported percentage change is significant.

{{< image src="user-manual/comparison_report_1-small.png" large="user-manual/comparison_report_1.png" >}}
Performance Comparison Report - Overview
{{< /image >}}

{{< image src="user-manual/comparison_report_2-small.png" large="user-manual/comparison_report_2.png" >}}
Performance Comparison Report
{{< /image >}}

### Sections

#### Overview

The overview section shows general information about both load tests. It lets you compare settings, runtime, and profiles. In the later sections, the percentage values depict the development of the performance in comparison to the baseline. Note that the total columns (total throughput and total errors) might present misleading values if the load tests used different runtime configurations. All other values are normalized with respect to the runtime and therefore easily comparable. Positive numbers in the count section stand for an improvement of the throughput over the baseline, negative values for a decrease in throughput. An increase in the number of errors is indicated with positive numbers, a decrease with negative numbers. An infinite sign indicates the occurrence of errors in comparison to an error-free baseline. For all runtime numbers, positive values signify a poorer performance, negative values an improvement, or smaller runtime values, over the baseline. Added or removed transactions, actions, or requests are displayed, but for them no comparison is provided.

#### Transactions

* Count
* Errors
* Events
* Runtime

#### Actions, Requests, Custom Timers

* Count
* Errors
* Runtime

### Create a Performance Comparison Report

A performance comparison report can only be generated between two existing load and performance test reports. That is, you first have to create both of these reports.

Then you can generate a performance comparison report using the following command (in `<XLT>/bin`):

```bash
./create_diff_report.sh <reportDir1> <reportDir2> [options]
```

For example:

```bash
./create_diff_report.sh ../reports/20190503-152920 ../reports/20190503-160520
```

## Trend Report

This report offers a comparison of multiple test runs (and is not used very often). A trend report depicts the development of the performance over time. Multiple measurements are taken into account and evaluated against each other. It shows how your system performs over time, how your tuning effort pays out, and how your live environment acts under a changing load situation if used as monitoring.

Two trend report types are available:
- Difference to First Run and
- Difference to Previous Run.

The **Difference to First Run** reports the changes compared to your first test run, mostly referred to as baseline. Each table column displays the difference between your baseline run and the run you're interested in. The quality of your baseline run defines how valuable this report may be. You can also look at it as a long-term performance trend report.

The **Difference to Previous Run** visualizes the improvements between two adjacent test runs, which lets you recognize how your last change or tuning effort payed out in comparison to the previous run. It helps you to see whether or not you are on the right track regarding the improvement of your application's performance. It also emphasizes sudden improvements or set-backs and can be seen as a short-term performance trend report.

When you hover the mouse over the columns of the trend report table, you can see the actual measurement results. This will give you a better idea whether or not the reported percentage change is significant. Please keep in mind that changes up to 10% are measurement fluctuation most of the time.

{{< image src="user-manual/performance_trend_1-small.png" large="user-manual/performance_trend_1.png" >}}
Performance Trend Report - Overview
{{< /image >}}

{{< image src="user-manual/performance_trend_2-small.png" large="user-manual/performance_trend_2.png" >}}
Performance Trend Report
{{< /image >}}

Similar to the other reports, the trend report is divided into the following sections, each containing the tables and charts mentioned above:
- Overview
- Transactions
- Actions
- Requests
- Custom Timers

### Create a Performance Trend Report

To generate a performance trend report on several test reports, use the command below (from `<XLT>/bin`):

```bash
./create_trend_report.sh <reportDir1> ... <reportDirN> [options]
```

For example:
```bash
./create_trend_report.sh ../reports/20190503-152920 \
        ../reports/20190503-160520 \
        ../reports/20190503-161030 \
        ../reports/20190503-171030
        ```
