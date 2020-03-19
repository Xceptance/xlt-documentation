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

## Components
To generate enough load, usually a distributed load generation environment made up of a cluster of test machines is required. 

{{< image src="user-manual/suite-controller-agents.svg" >}}
High Level Overview
{{< /image >}}
{{< TODO >}}resize/png?{{< /TODO >}}

* **Test Suite**: your test code and configuration. 
* **MC/Master controller**: Can be seen as the “brain” of the load test environment. Deploys the test suite to all load machines, evenly distributes the load, and starts/stops the load test. A test cluster may only have one master controller. It is loosely coupled, so you can use another one to interact or continue.
* **Agents**: Actually execute the test suite against the system under test. All agents are started and stopped by the **agent controller**. Agents can be anywhere
* **Grafana** provides realtime test information


**what to know...**
* know your scenarios
* have a test environment that mimics the live site as accurately as possible (but think of payment providers, order management etc)
* ???

**...and install**
* Latest JDK 8 (or 11)
* Java IDE of choice
* Latest [Apache Ant](https://ant.apache.org/)
* Maven [version?]

* further info in installation/workflow/test development


