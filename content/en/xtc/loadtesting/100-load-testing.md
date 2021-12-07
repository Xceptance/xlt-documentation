---
title: "About"

weight: 100
type: docs

description: >
  What Load Testing is used for, what you need and how it's usually done.
---

## Load Testing Basics

Load Tests are used to evaluate performance over time. By running tests containing predefined use cases for the application under test and measuring everything from runtimes to errors under varying load conditions (e.g. with a different amount of virtual users active at the same time), XTC offers valuable insights into your application's performance under load. 

To learn more about [load testing with XLT](../../../load-testing/manual/010-basics/) and the underlying [concepts](../../../load-testing/manual/030-concepts/), see the [load testing manual](../../../load-testing/manual/).

## Prerequisites

To run a load test in XTC, we assume you have an [XLT Test Suite](../../../load-testing/manual/060-test-development/) available in the [repository](../../060-project-configuration/#repository) of your choice. (For more information on what to prepare and think about before load testing, see our recommendations for a load testing [workflow](../../../load-testing/manual/050-workflow/).)

## Workflow

**Running a load test with XTC** usually consists of the following steps which you can also learn more about in the [load testing documentation](../../../load-testing):

* [create a new load test run](../150-create-lt),
* adjust the [test settings](../155-lt-settings) for this run, 
* [start the load test](../160-start-lt),
* [monitor](../170-monitor-lt) your test while it's running,
* [create test reports](../180-reports) and
* [evaluate](../190-evaluation) the test results.

To learn more about each step, please check out the linked resources.