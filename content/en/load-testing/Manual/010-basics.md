---
title: "Basics"

weight: 10
type: docs

description: >
  What XLT can do for you, and what you need to start developing and running a load test suite.
---

## What is XLT?
XLT, the Xceptance Load Test tool, is a regression and performance testing tool. The first prototype was released in 2005 and it has been improved ever since. The tool is used on a daily basis at [Xceptance](https://xceptance.com), so our developers know what our load testers need. 

**XLT is the right tool for you if...**
* you are a Software Engineer or a Software Engineer in Test
* you love detailed data with the ability to postprocess
* you need strong validation
* you want to combine automation with truly understanding the application
* you have a preferred IDE
* your tests should be flexible but predictable

**XLT isn't your tool if...**
* you need Capture & Replay
* property files, source code, and version control scare you
* the command line isn't your cup of tea

XLT is platform independent (you can develop and run your tests on any platform with a JDK), and is open source, available under Apache License 2.0 starting February 2020. It is simple to deploy and highly scalable, provides ready to use reports (for single or multiple test runs, so you can also compare runs or see trends) and realtime test monitoring. Nothing about XLT is proprietary, no custom IDE is needed, you can just use your tool chain and existing knowledge. 

## How does it work?
With XLT, you can develop test cases and check them on your own machine, in your preferred IDE (see [Workflow](../050-workflow) for details how you usually do that). To generate enough load, usually a distributed load generation environment made up of a cluster of test machines is required. 

So this is a rough overview of the components:

{{< image src="user-manual/suite-controller-agents.png" >}}
High Level Overview
{{< /image >}}
{{< TODO >}}find/make better image{{< /TODO >}}

### Test Suite
A test suite contains your test code, data and configuration. Developed on your own machine, it can live in your favorite version control tool and be shared easily. 

### MC/Master Controller
The MC can be seen as the “brain” of the load test environment. It deploys the test suite to all load machines, evenly distributes the load, starts/stops the load test and can be used to get agent information and create test reports. A test cluster may only have one master controller. It is loosely coupled, you can (re-)attach to running tests to interact or continue.

### AC/Agent Controller 
The MC communicates with the AC. The AC waits, receives and distributes the workload. There is usually one AC per hardware box (but more are possible), which listens typically on port 8500. The AC spawns the test agents. All agents are started and stopped by the AC. It does not know anything about other ACs.

### Agents
The agents are the workhorses of the load test, as they actually execute the test suite against the system under test. Basically, an agent is a JVM that runs the users, and each user is a thread with subthreads (inactive threads are possible). The MC is responsible for calculating the user distribution across the agents, but still the agents are a component to watch, as memory tuning and sizing (total and in relation to the box) is important for good and consistent test results. Still, a stalling agent does not block other agents.

### Grafana
Grpahite/Grafana may be used to provide realtime test information. It shows response times, errors, machine utilization, transaction and action runtimes and can also be paired with infrastructure monitoring. For more details, see [Real-Time Reporting with Graphite](../../how-tos/graphite/).

## How to start using XLT

### What to think about
The goal of your load test should be to mimic the expected traffic on your application as accurate as possible. Therefore, you should know the typical scenarios for a user of your application. For example, if you want to test your web shop, these scenarios might be: users just visit the homepage and disappear, users browse or search products but never order, users make an order either as a guest or as a registered user. We built some [sample test suites](../../test-suites) with what we think might be plausible test cases, so feel free to have a look.

Also your test environment should mimic the app as accurately as possible. You can test on live systems, but be aware that the load might be too much for your system (after all, you are testing to find out about that). Also, think about the processes that might be triggered by the tests (you don't want to deal with thousands of fake test orders, and your payment provider doesn't want to, either).

While you develop your test cases, the app you want to test should be in a stable state. It's no use writing tests that mimic user requests that will be changed the next day, so first finish your app, then finish your tests.

### What to install
To run XLT, you will need the following:
* latest JDK 8 (or 11)
* Java IDE of choice
* Latest [Apache Ant](https://ant.apache.org/)
* [Maven](https://maven.apache.org/)

How to install XLT is described in more detail [here](../040-installation).

### How to proceed
The [Quick Start](../../quick-start) section offers some guidance on how to start using XLT, from installation to your first local load test. For further info you might want to return to this [User Manual](../050-workflow), where you can learn all the details about developing and configuring your tests, setting up remote machines to generate the load and everything in between. Happy testing!


