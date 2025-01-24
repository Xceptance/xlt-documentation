---
title: "Exports"

weight: 480
type: docs

description: >
  Export of Scenario Execution Data
---

{{% permission type="project" least="true" role="reviewer" %}}

## Export of Scenario Execution Data

Sometimes you need to know in retrospect when the monitoring scenarios reported issues with your site in the past and what happened exactly. XTC is not able to store this information forever, but deletes it after a certain time. 

### Automatically Exported Execution Data

However, to enable you to analyze issues at a later time, XTC **automatically exports** scenario execution data in condensed form as a CSV file **once a month**. The file contains the most important data of each scenario execution only, i.e. neither screenshots nor logs. 

You can download the exported files from the _Exports_ page in your monitoring project:

{{< image src="xtc/monitoring_exports_export.png" >}}
Download automatically generated execution data by clicking the filename.
{{< /image >}}  

### Manual Export of Execution Data

It is also possible to manually export scenario executions from the last 31 days, either all available executions or only those that ended with a certain result or match a certain search phrase in the chosen time range. To this end, open the _History_ page of your monitoring project, [filter the entries as needed]({{< relref "460-history" >}}), and click the _Export_ button to download the resulting CSV file to your disk:

{{< image src="xtc/monitoring_history_export.png" >}}
Download execution data from history by clicking _Export to CSV_.
{{< /image >}}  

