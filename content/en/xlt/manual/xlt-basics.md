---
title: "Basics"

weight: 10
type: docs

description: >
  An overview of XLT's capabilities and what you need to start developing and running a load test suite.
---

## What is XLT?

XLT (Xceptance Load Test) is a regression and performance testing tool. The first prototype was released in 2005, and it has been improving ever since. The tool is used daily at [Xceptance](https://xceptance.com), so our developers understand the needs of our load testers.

XLT is platform independent (you can develop and run your tests on any platform with a JDK) and open source, available under the Apache License 2.0 since February 2020. It is simple to deploy and highly scalable, provides ready to use reports (for single or multiple test runs, allowing you to compare runs or see trends), and offers real time test monitoring. Nothing about XLT is proprietary; no custom IDE is needed. You can use your existing toolchain and knowledge.

## How does it work?

To use XLT, you will model the expected user actions on your application as a set of JUnit tests. You can develop and check these on your own machine in your preferred IDE (see [Workflow]({{< relref "workflow" >}}) for details on how this is usually done), using XLT libraries or even starting with one of our [sample test suites]({{< relref "test-suites" >}}). To consolidate your test cases, XLT builds a [result browser]({{< relref "result-browser" >}}) for every test run (regardless of whether it was run from your IDE or in a load test environment). This provides further insights into what happened, in addition to the information output to the console or logs.

Load testing means executing the tests from your test suite against your application, with many virtual users running many tests simultaneously (XLT allows you to [easily configure]({{< relref "load-configuration" >}}) the exact load). To run a load test, a distributed load generation environment consisting of a cluster of test machines is usually required to generate sufficient load. XLT includes tools to set up your cluster using [Google Cloud]({{< relref "cloud-setup#google-cloud-gc" >}}) or [Amazon Web Services]({{< relref "cloud-setup#amazon-web-services-aws" >}})).

The results of your load test are neatly summarized in a [test report]({{< relref "reports" >}}), which may also contain links to the result browsers of individual tests within this load test run (e.g., if something went wrong, allowing you to check the cause of any error).

## Load Test Components

This is a rough overview of the components:

{{< image src="user-manual/suite-controller-agents.png" >}}
High Level Overview
{{< /image >}}

### Test Suite

A test suite contains your test code, data, and configuration. Developed on your own machine, it can reside in your preferred version control tool and be shared easily.

### MC/Master Controller

The MC can be seen as the “brain” of the load test environment. It deploys the test suite to all load machines, evenly distributes the load, starts/stops the load test, and can be used to get agent information and create test reports. A test cluster may have only one master controller. It is loosely coupled, so you can (re-)attach to running tests if you need to interact with them.

### AC/Agent Controller

The MC communicates with the AC. The AC waits for, receives, and distributes the workload. There is usually one AC per hardware box (though more are possible), which typically listens on port 8500. The AC spawns the test agents. All agents are started and stopped by the AC. ACs are not aware of other ACs; they function independently and do not interact with one another.

### Agents

The agents are the workhorses of the load test, as they actually execute the test suite against the system under test. Basically, an agent is a JVM that runs the users. Each user is a thread with subthreads (inactive threads are possible). The MC is responsible for calculating user distribution across agents, but the agents are still a component to watch, as memory tuning and sizing (total and relative to the box) are important for good and consistent test results. Still, a stalled agent does not block other agents.

### Grafana

Graphite/Grafana can be used to display real time test information. It shows response times, errors, machine utilization, transaction and action runtimes, and can also be paired with infrastructure monitoring. For more details, see [Real Time Reporting with Graphite]({{< relref "real-time-monitoring" >}}).

## How to start using XLT

### What to think about

The goal of your load test should be to mimic the expected traffic on your application as accurately as possible. Therefore, you should know the typical scenarios for a user of your application. For example, if you want to test your web shop, these scenarios might include: users visiting only the homepage and then leaving, users browsing or searching for products but never ordering, and users placing an order either as a guest or as a registered user. We have built some [sample test suites]({{< relref "test-suites" >}}) with what we think are plausible test cases, so feel free to take a look.

Also, your test environment should mimic the app as accurately as possible. You can test on live systems, but be aware that the load might be too much for your system (after all, you are testing to determine just that). Also, consider the processes that might be triggered by the tests (you don't want to deal with thousands of fake test orders, and neither does your payment provider).

While you develop your test cases, the app you want to test should be in a stable state. It's pointless to write tests that mimic user requests that will be changed the next day, so finish your app first, then finish your tests.

### What to install

To run XLT, you will need the following:

* Latest JDK 21.
* Java IDE of your choice.
* [Maven](https://maven.apache.org/).

Installing XLT is described in more detail [here]({{< relref "installation" >}}).

### How to proceed

The [Quick Start]({{< relref "quick-start" >}}) section offers guidance on how to start using XLT, from installation to your first local load test. For further information, you might want to return to this [User Manual]({{< relref "workflow" >}}), where you can learn all the details about developing and configuring your tests, setting up remote machines to generate load, and everything in between. Happy testing!
