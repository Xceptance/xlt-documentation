---
title: "Features"

weight: 1
type: docs

description: >
  How XTC can help you to monitor your applications.
---

XTC offers a lot of features to make monitoring easier for you, however as it is still growing this page can just give you a first glimpse on what is possible.

### Monitoring Features - A Rough Overview

On entering an XTC monitoring project, you will be presented the **Dashboard**, containing a first overview of your application's performance: here you will find the overall status, the current status for each test scenario, and an overview of the latest scenario errors.

{{< image src="xtc/monitoring_dashboard.png" >}}
The overview on the dashboard of a monitoring project.
{{< /image >}}

**History** provides more information about the latest test scenarios: here you can define the time range to view (maximum: the time range you defined in _Configuration > Data Persistence > History_) and select the type of tests to display in the top left (successful, warnings, errors, aborted and/or running tests). 

{{< image src="xtc/monitoring_history.png" >}}
The history view of a monitoring project.
{{< /image >}}

By clicking the names of the scenarios, a detail view will open, containing different options and information depending on whether the scenario is running, was successful, aborted, or returned errors or warnings.

{{< image src="xtc/monitoring_history_detailsE.png" >}}
Detail view of a scenario that finished with errors. You will get the complete stacktrace here.
{{< /image >}}

{{< image src="xtc/monitoring_history_detailsS.png" >}}
Detail view of a successful scenario with more measurement details. You can view the execution log and download measurements (links top right).
{{< /image >}}

{{< TODO >}}To be done...{{< /TODO >}}