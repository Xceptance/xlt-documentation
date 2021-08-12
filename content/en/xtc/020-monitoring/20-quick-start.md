---
title: "Quick Start"

weight: 20
type: docs

description: >
  How to set up monitoring in XTC.
---

Now we got you all excited about XTC's [monitoring features](./01-features), let's dive in and set up your monitoring project. 

### How to Set Up Monitoring

{{< TODO >}}To be done...{{< /TODO >}}

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
