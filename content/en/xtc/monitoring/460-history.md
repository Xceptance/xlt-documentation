---
title: "History"

weight: 460
type: docs

description: >
  Monitoring History
---

### History

{{% permission type="project" least="true" role="reviewer" %}}

{{% permission type="project" least="true" role="tester" action="view execution logs and measurements" %}}

**History** provides more information about the latest scenario executions. Here you can define the time range to view (maximum: the time range shown in _Configuration > Data Persistence > History_) and select the type of tests to display in the top left (successful, warnings, errors, aborted and/or running tests). 

{{< image src="xtc/monitoring_history.png" >}}
The history view of a monitoring project.
{{< /image >}}

By clicking the names of the scenarios, a detail view will open, containing different options and information depending on whether the scenario is running, was successful, was aborted, or returned errors or warnings.

{{< image src="xtc/monitoring_history_detailsE.png" >}}
Detail view of a scenario that finished with errors. You will get the complete stack trace here.
{{< /image >}}

{{< image src="xtc/monitoring_history_detailsS.png" >}}
Detail view of a successful scenario run with more information. You can view the execution log and download measurements (links top right).
{{< /image >}}