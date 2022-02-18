---
title: "About"

weight: 100
type: docs

description: >
  What Load Testing is used for, what you need and how it's usually done.
---

## Load Testing Basics

XTC helps you to streamline your [usual load testing work]({{< relref "/load-testing" >}}) by a mass of helpful features it puts on top of what's already included in [XLT]({{< relref "/load-testing/manual/010-basics#what-is-xlt" >}}): 

* It simplifies the test setup and allows to duplicate tests for similar reruns.
* It will make sure you stay on top of things by giving you an easy overview of test setups as well as results.
* It starts and stops all agent machines for you. You only have to define where you want the agents to be placed and how many agent you need. Thus, no machine time will be wasted.
* It automatically starts and stops a test, collects all results, and creates a report.
* It allows to share test results quickly either as a secret public link or within your project setup.

As XTC is still in development it will be continuously improved, in part by your feedback.

## Prerequisites

To run a load test in XTC, we assume you have an [XLT Test Suite]({{< relref "/load-testing/manual/060-test-development" >}}) available in the [repository]({{< relref "../060-project-configuration/#repository" >}}) of your choice. (For more information on what to prepare and think about before load testing, see our recommendations for a load testing [workflow]({{< relref "/load-testing/manual/050-workflow" >}}).)

## Workflow

**Running a load test with XTC** usually consists of the following steps which you can also learn more about in the [load testing documentation]({{< relref "/load-testing" >}}):

* [create a new load test run]({{< relref "150-create-lt" >}}),
* adjust the [test settings]({{< relref "155-lt-settings" >}}) for this run, 
* [start the load test]({{< relref "160-start-lt" >}}),
* [monitor]({{< relref "170-monitor-lt" >}}) your test while it's running,
* [create test reports]({{< relref "180-reports" >}}) and
* [evaluate]({{< relref "190-evaluation" >}}) the test results.

To learn more about each step, please check out the linked resources.