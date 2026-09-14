---
title: About
description: "What a monitoring project is and how XTC can help you monitor your
  applications.\n"
sidebar:
  order: 400
---

## Monitoring Basics

XTC can be used up to monitor your application's performance and availability by regularly running test cases, providing valuable data and insights over time. It can also notify specified recipients as soon as something unexpected happens, thus minimizing downtimes by addressing any issue as soon as possible.

All of this can be achieved in [**XTC monitoring projects**](/xtc/basics/projects/#xtc-project-types).  

## Prerequisites

To monitor your application in XTC, we assume you have a **Maven project** that defines at least one **Java class** containing one or more **JUnit testcases** that interact with your application available in the repository of your choice. Please take a look at our [monitoring template](https://github.com/Xceptance/xtc-monitoring-template).

## Features

This is a high-level overview of the features XTC offers to monitor your web application:

* [Configuration](/xtc/monitoring/monitoring-configuration/) allows you to adjust your settings for the whole monitoring project, including the definition of
  * [Scenario Defaults](/xtc/monitoring/monitoring-configuration/#scenario-defaults),
  * [Notification Lists](/xtc/monitoring/monitoring-configuration/#notification-lists) for specified recipients, and
  * [Quality Sensors](/xtc/monitoring/monitoring-configuration/#quality-sensors) that define success metrics for your scenarios,
* [Quiet Periods](/xtc/monitoring/monitoring-configuration/#quiet-periods) allows you to pause notifications for the whole project or even pause running any scenario,
* in [Scenarios](/xtc/monitoring/monitoring-configuration/#scenarios) you can define and configure your monitoring scenarios including the quality sensors to be applied,
* the [Dashboard](/xtc/monitoring/dashboard/) of a monitoring project provides a rough overview of the scenarios that are currently set up and their recent performance,
* [Metrics](/xtc/monitoring/metrics/) are offering graphical live data for different parameters,
* the [History](/xtc/monitoring/history/) view contains details about all recent scenario executions, and
* [Exports](/xtc/monitoring/exports/) allows you to download monthly exports of your monitoring data.

To learn more about each feature, please check out the linked resources.
