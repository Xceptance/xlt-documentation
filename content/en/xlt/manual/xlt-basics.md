---
title: Basics
icon: info
description: "An overview of XLT's capabilities and what you need to start
  developing and running a load test suite.\n"
sidebar:
  order: 10
---

## What is XLT?

XLT (Xceptance Load Test) is an open-source load and performance testing tool released under the Apache License 2.0. Developed and actively maintained by [Xceptance](https://xceptance.com), XLT is designed for scalable, developer-centric performance testing.

Key architectural characteristics include:

* **Platform Independence**: Develop and execute tests on any operating system with Java 21 or higher.
* **Standard Tooling**: Write tests in standard Java using JUnit. No proprietary scripting languages or vendor-locked IDEs are required.
* **High Scalability**: Scale test execution from a single developer laptop to thousands of concurrent users distributed across machines.
* **Rich Diagnostics**: Generate detailed HTML reports, diffable execution trends, real-time metric streams, and visual [Result Browsers](/xlt/manual/result-browser/) capturing full DOM snapshots and network HARs.

## How XLT Works

1. **Model Scenarios in Code**: Implement user journeys as JUnit test cases using XLT action classes or Selenium WebDriver. Follow the [Workflow](/xlt/manual/workflow/) guide or start with one of the provided [sample test suites](/xlt/manual/test-suites/).
2. **Validate Locally**: Run test cases directly inside your IDE. XLT generates a local [Result Browser](/xlt/manual/result-browser/) for every run, allowing you to inspect requests, responses, headers, and DOM state.
3. **Configure Load Profiles**: Define arrival rates, concurrency ceilings, ramp-up schedules, and durations in `test.properties`. See [Load Configuration](/xlt/manual/load-configuration/).
4. **Deploy to a Cluster**: Distribute the test suite across agent machines on-premises, in [Google Cloud](/xlt/advanced/cloud-setup/#google-cloud-gcp), or in [Amazon Web Services](/xlt/advanced/cloud-setup/#amazon-web-services-aws).
5. **Analyze Results**: Review performance metrics, percentiles, error rates, and resource utilization in the generated [Test Report](/xlt/manual/reports/).

## Architecture & Components

A distributed XLT load testing environment consists of four core components:

![XLT Architecture Overview](/images/user-manual/suite-controller-agents.png)
*Figure: Master Controller, Agent Controllers, and Agents in an XLT cluster.*

### Test Suite

The test suite is a standalone project containing test code, dataset files, third-party dependencies, and configuration. Version control your test suite alongside application code in Git.

<a id="mcmaster-controller"></a>
### Master Controller (MC)

The Master Controller coordinates the load test environment:

* Packages and uploads the test suite to all target machines.
* Distributes virtual users and arrival rates across available agent controllers.
* Synchronizes test start and stop signals.
* Downloads measurements from all agents and compiles the final HTML report.
* Supports non-blocking re-attachment to ongoing test runs.

Each cluster uses exactly one Master Controller.

<a id="acagent-controller"></a>
### Agent Controller (AC)

The Agent Controller is a background daemon that runs on each load generation host (typically listening on port 8500):

* Receives test suite archives from the Master Controller.
* Spawns, monitors, and terminates agent worker processes.
* Collects local machine metrics (CPU, memory, network).
* Functions independently without communicating with peer agent controllers.

### Agents

Agents are JVM processes spawned by the Agent Controller to execute test scenarios:

* Each virtual user executes in a dedicated thread or Java 21 virtual thread.
* Agents record transaction durations, action runtimes, HTTP metrics, and error stack traces to disk.
* Stalled or failing agents fail independently without blocking other agents in the cluster.

### Real-Time Monitoring (Graphite / Grafana)

For live monitoring during test execution, configure agents to stream metrics to Graphite and visualize them via Grafana dashboards. Track response times, error rates, and agent system utilization in real time. See [Real-Time Reporting](/xlt/advanced/real-time-monitoring/).

## Getting Started

### Planning Considerations

* **Identify Realistic Journeys**: Model representative user behavior, such as catalog browsing, search workflows, account logins, and checkout funnels.
* **Isolate Test Data**: Prepare test credentials, payment tokens, and inventory that do not conflict with production systems or live payment gateways.
* **Verify System Stability**: Ensure the target environment and test scripts are stable before initiating large-scale load tests.

### System Requirements

To develop and execute tests, install:

* Java Development Kit (JDK) 21 or higher
* A Java IDE (IntelliJ IDEA, Eclipse, or VS Code)
* Apache Maven

For step-by-step setup instructions, proceed to the [Installation](/xlt/manual/installation/) guide or walk through the [Quick Start](/xlt/quick-start/) tutorial.
