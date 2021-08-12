---
title: "Monitoring with XTC"

weight: 20
type: docs

description: >
  What you need to set up monitoring in XTC.
---

## Monitoring in XTC

XTC can be used to monitor your applications. By regularly running test cases, XTC will provide you an overview of the performance and availability of your application over time, providing lots of data and possibly valuable insights. 

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

### How to Set Up Monitoring

To this end, you will need an XTC monitoring project, and ...other stuff, test suite etc, TBD

* Dashboard: current status for all scenarios (example screenshot: 
    * overall status last execution successful, issues in last 24 hours, 
    * scenario status with time of last run/success rate/no of issues in last 24 hours,
    * scenario errors for last 15 mins..2 days, exportable as csv)
* Scenarios: Manage the monitoring scenarios of this project. 
    * Scenarios:
    * Add new Scenario:
    * Scenario Defaults:
* Metrics: basically an included ->Grafana dashboard like you could set up in XLT. Short overview about Grafana features?
* History: List of scenarios (pick type in top left slider: success, warning, error, aborted, running), clickable for more details, slider defines time range (max: persisted data range)
* Quiet Periods: configure when notifications should not be sent (and scenarios should be disabled, if you want this) - TODO can you schedule quiet periods, like every night between 11pm and 5am or something like this? Or do only dates work in time range (yet)?
* Configuration: Repository/Branch/Auth like in XTC Basics (TODO: branch name as regex??); special settings for monitoring projects are _Data Persistence_ (how long certain data will be persisted, single settings for different types of data) and _Execution Environment_ (IP addresses where monitoring scenarios are running)
* Exports: Find and download monthly exports of test execution data (generated automatically)
