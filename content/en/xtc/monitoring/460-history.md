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

**History** provides more information about the latest scenario executions. Define the time range to view (maximum: the time range shown in _Configuration > Data Persistence > History_) in the top right and you will find a histogram visualizing the proportions of all execution results during this timespan, followed by a table of all scenarios including further information, including start date, server location and details about the execution result. By using the context menu of each scenario, you can directly access [scenario details] or view the scenario's execution log or result browser.

{{< image src="xtc/monitoring_history.png" >}}
The history view of a monitoring project. The context menu allows you to view details for each scenario execution.
{{< /image >}}

### Filtering

In addition to the time range you select at the top, the histogram and the scenarios table can be filtered for several criteria. 

In the **histogram**, you can enable or disable scenario executions that were successful, failed, returned an error, were aborted or are currently running by clicking the buttons at the top left. By hovering the histogram entries, you will see more details about the timespan covered by a given entry and the actual number of executions for each selected status during this timespan.

{{< image src="xtc/monitoring_history_histogram.png" >}}
The histogram in the history view. You can select a time range to display and which statuses to be displayed.
{{< /image >}}

{{% note notitle %}}
The histogram will only contain entries that also appear in the table, so make sure the data you want to view (e.g. successful scenario executions) are also visible below.
{{% /note %}}

In the **table** below the histogram you can search directly for scenario names, enable or disable the different execution statuses, or filter by scenarios or server locations. 

{{< image src="xtc/monitoring_history_table.png" >}}
The scenarios table in the history view. At the top of the table you have different possibilities for filtering.
{{< /image >}}

## Scenario Details

By clicking the names of the scenarios, a detail view will open, containing different options and information depending on whether the scenario is running, was successful, was aborted, or returned errors or warnings. By clicking the links at the top right, you can view the execution log and result browser and download measurements.

{{< image src="xtc/monitoring_history_detailsE.png" >}}
Detail view of a scenario that finished with errors. You will get the complete stack trace here.
{{< /image >}}

{{< image src="xtc/monitoring_history_detailsS.png" >}}
Detail view of a successful scenario run with more information. 
{{< /image >}}

{{% note notitle %}}
Note that not meeting one of the success metrics does not necessarily cause the scenario execution to fail. Learn more in [quality sensors]({{< relref "420-monitoring-configuration/#quality-sensors" >}}).
{{% /note %}}