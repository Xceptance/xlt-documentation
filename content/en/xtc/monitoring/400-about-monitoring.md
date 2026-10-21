---
title: About
icon: info
description: Overview of XTC monitoring projects, capabilities, and automated test execution.
sidebar:
  order: 400
---

## Monitoring basics

XTC tracks web app performance and availability by executing automated test cases on a recurring schedule. It alerts designated recipients when issues arise, helping teams resolve incidents, and preventing downtime.

Configure these capabilities within [**XTC monitoring projects**](/xtc/basics/projects/#xtc-project-types).

## Prerequisites

To set up monitoring in XTC, supply a **Maven project** containing a **Java class** with **JUnit test cases** in a Git repository. For a recommended reference project, explore the [monitoring template](https://github.com/Xceptance/xtc-monitoring-template).

## Features

XTC offers the following core monitoring features:

* [Configuration](/xtc/monitoring/monitoring-configuration/): manage global project settings, including [Scenario Defaults](/xtc/monitoring/monitoring-configuration/#scenario-defaults), [Notification Lists](/xtc/monitoring/monitoring-configuration/#notification-lists), and [Quality Sensors](/xtc/monitoring/monitoring-configuration/#quality-sensors).
* [Quiet Periods](/xtc/monitoring/quiet-periods/): pause alerts across the project or suspend scheduled scenario executions.
* [Scenarios](/xtc/monitoring/scenarios/): configure execution intervals, environments, and quality sensor assignments for individual test cases.
* [Dashboard](/xtc/monitoring/dashboard/): review scenario health, recent performance histograms, and recent failures.
* [Metrics](/xtc/monitoring/metrics/): inspect graphical live charts across transactions, runtimes, and HTTP statuses.
* [History](/xtc/monitoring/history/): audit execution logs, status results, and transaction traces for completed runs.
* [Exports](/xtc/monitoring/exports/): download monthly archive exports of monitoring telemetry and data.

To learn more about each feature, explore the linked chapters.
