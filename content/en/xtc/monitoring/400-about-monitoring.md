---
title: "About"

weight: 400
type: docs

description: >
  What a monitoring project is and how XTC can help you monitor your applications.
---

## Monitoring Basics

XTC can be used up to monitor your application's performance and availability by regularly running test cases, providing valuable data and insights over time. It can also notify specified recipients as soon as something unexpected happens, thus minimizing downtimes by addressing any issue as soon as possible.

All of this can be achieved in [**XTC monitoring projects**]({{< relref "../basics/050-projects/#xtc-project-types" >}}).  

## Prerequisites

To monitor your application in XTC, we assume you have a **Maven project** that defines at least one **Java class** containing one or more **JUnit testcases** that interact with your application available in the repository of your choice. You might want to use one of our [**sample test suites**]({{< relref "../../xlt/load-testing/test-suites/" >}}) to get started. The necessary **hardware** will be assigned to your project by Xceptance.

## XTC Monitoring Features

This is a rough overview of the features XTC offers for monitoring your application:

* [Configuration]({{< relref "420-monitoring-configuration" >}}) allows you to adjust your settings for the whole monitoring project, including the definition of 
  * [Scenario Defaults]({{< relref "420-monitoring-configuration/#scenario-defaults" >}}),
  * [Notification Lists]({{< relref "../monitoring/420-monitoring-configuration/#notification-lists" >}}) for specified recipients, and
  * [Quality Sensors]({{< relref "../monitoring/420-monitoring-configuration/#quality-sensors" >}}) that define success metrics for your scenarios,
* [Quiet Periods]({{< relref "425-quiet-periods" >}}) allows you to pause notifications for the whole project or even pause running any scenario,
* in [Scenarios]({{< relref "430-scenarios" >}}) you can define and configure your monitoring scenarios including the quality sensors to be applied,
* the [Dashboard]({{< relref "410-dashboard" >}}) of a monitoring project provides a rough overview of the scenarios that are currently set up and their recent performance,
* [Metrics]({{< relref "450-metrics" >}}) are offering graphical live data for different parameters,
* the [History]({{< relref "460-history" >}}) view contains details about all recent scenario executions, and
* [Exports]({{< relref "480-exports" >}}) allows you to download monthly exports of your monitoring data.

To learn more about each feature, please check out the linked resources. 