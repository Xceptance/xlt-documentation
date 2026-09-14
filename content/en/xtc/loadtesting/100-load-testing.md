---
title: About
description: "What Load Testing is used for, what you need and how it's usually done.\n"
sidebar:
  order: 100
---

## Load Testing Basics

XTC helps you to streamline your load testing work by providing helpful features it puts on top of what's already included in [XLT](/xlt/):

* It simplifies the test setup and allows to duplicate tests for similar reruns.
* It will make sure you stay on top of things by giving you an easy overview of test setups as well as results.
* It starts and stops all agent machines for you. You only have to define where you want the agents to be placed and how many agent you need. Thus, no machine time will be wasted.
* It automatically starts and stops a test, collects all results, and creates a report.
* It allows to share test results quickly either as a secret public link or within your project setup.

As XTC is still in development it will be continuously improved, in part by your feedback.

## Prerequisites

To run a load test in XTC, we assume you have an [XLT Test Suite](/xlt/manual/test-development/) available in the [repository](/xtc/basics/project-configuration/#repository) of your choice. (For more information on what to prepare and think about before load testing, see our recommendations for a load testing [workflow](/xlt/manual/workflow/).)

## Workflow

**Running a load test with XTC** usually consists of the following steps which you can also learn more about in the [load testing documentation](/xtc/loadtesting/load-testing/):

* [create a new load test run](/xtc/loadtesting/create-lt/),
* adjust the [test settings](/xtc/loadtesting/lt-settings/) for this run,
* [start the load test](/xtc/loadtesting/start-lt/),
* [monitor](/xtc/loadtesting/monitor-lt/) your test while it's running,
* [create test reports](/xtc/loadtesting/reports/) and
* [evaluate](/xtc/loadtesting/evaluation/) the test results.

To learn more about each step, please check out the linked resources.
