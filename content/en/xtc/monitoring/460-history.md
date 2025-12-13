---
title: "History"

weight: 460
type: docs

description: >
  The insights provided by scenario execution history.
---

## Overview

{{% permission type="project" least="true" role="reviewer" %}}

{{% permission type="project" least="true" role="tester" action="view execution logs and measurements" %}}

**History** provides more information about the latest scenario executions. Define the time range to view (maximum: the time range shown in _Configuration > Data Persistence > History_) in the top right and you will find a histogram visualizing the proportions of all execution results during this timespan, followed by a table of all scenario executions with further information, including start date, server location and details about the execution result. By using the context menu of a scenario, you can directly access [scenario details] or view the scenario's execution log or result browser.

{{< image src="xtc/monitoring_history.png" >}}
The history view of a monitoring project. The context menu allows you to view details for each scenario execution.
{{< /image >}}

### Filtering

In addition to the time range you select at the top, the histogram and the scenario executions table can be filtered for several criteria.

In the **histogram**, you can enable or disable scenario executions with the [status]({{< relref "#execution-statuses" >}}) _successful_, _fail_, _error_, _fatal_, _aborted_ or _running_ by clicking the buttons at the top left. By hovering the histogram entries, you will see more details about the timespan covered by a given entry and the actual number of executions for each selected status during this timespan.

{{< image src="xtc/monitoring_history_histogram.png" >}}
The histogram in the history view. You can select a time range to display and which statuses to be displayed.
{{< /image >}}

{{% note notitle %}}
The histogram will only contain entries that also appear in the table, so make sure the data you want to view (e.g. successful scenario executions) are also visible below.
{{% /note %}}

In the **table** below the histogram you can search directly for scenario names and filter by [execution statuses]({{< relref "#execution-statuses" >}}), [quality sensor states]({{< relref "#quality-sensor-states" >}}), scenarios, or monitoring locations.

{{< image src="xtc/monitoring_history_table.png" >}}
The scenario executions table in the history view. At the top of the table you have different possibilities for filtering.
{{< /image >}}

### Execution Statuses

Every scenario execution has a status, which can be one of the following:

* **Success**: The scenario was successfully executed without errors, all success metrics were met.
* **Failed**: The scenario ran to completion but additional [quality criteria]({{< relref "430-scenarios/#quality-sensors" >}}) were not met (e.g. Web vital thresholds were exceeded).
* **Error**: The scenario was executed but terminated prematurely with an error (for example, an assertion error).
* **Fatal**: The monitoring scenario could not be executed at all (e.g. due to compilation errors in the test suite).
* **Aborted**: The monitoring scenario was aborted before the execution terminated, e.g. because the [maximum runtime]({{< relref "430-scenarios/#execution" >}}) was exceeded.
* **Running**: The scenario execution is still in progress; the state will change as soon as it terminates.

### Quality Sensor States

In addition to the state of the scenario execution status, the quality sensors also return a state after scenario execution:

* **Passed**: All success metrics defined in the scenario's quality sensor(s) were met.
* **Failed**: One or more success metrics were not met.
* **None**: No success metrics are defined.
* **Unknown**: The success metrics for the scenario have not been evaluated, either because the scenario is still running or because it could not run at all (fatal).

## Scenario Details

By clicking the names of the scenarios, a detail view will open, containing different options and information depending on whether the scenario is running, was successful, was aborted, or returned errors or warnings. By clicking the links at the top right, you can view the execution log and result browser and download measurements.

{{< image src="xtc/monitoring_history_detailsE.png" >}}
Detail view of a scenario that finished with errors. You will get the complete stack trace here.
{{< /image >}}

{{< image src="xtc/monitoring_history_detailsS.png" >}}
Detail view of a successful scenario run with more information.
{{< /image >}}
