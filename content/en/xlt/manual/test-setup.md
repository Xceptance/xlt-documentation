---
title: Test Setup
icon: settings-2
description: "How to setup the test suite to run as performance test and how to
  configure the load.\n"
sidebar:
  order: 300
---

Configuring an XLT load test involves setting up load profiles, test suite parameters, cluster topology, and report generation options. This guide outlines the configuration files and their roles in the testing lifecycle.

## Configuration Architecture

XLT separates configuration into distinct tiers:

| Configuration Scope | Primary File | Purpose |
|---|---|---|
| **Load Profile** | `<suite>/config/test.properties` | Defines active test scenarios, concurrency, arrival rates, ramp-up, and test duration. |
| **Project & Target System** | `<suite>/config/project.properties` | Defines target hostnames, environment URLs, and custom test data mappings. |
| **Local Development** | `<suite>/config/dev.properties` | Overrides settings during local test execution in your IDE (ignored during cluster load tests). |
| **Default Fallbacks** | `<suite>/config/default.properties` | Baseline framework defaults. Do not edit directly; override in `project.properties`. |
| **Cluster Orchestration** | `<xlt>/config/mastercontroller.properties` | Configures target agent controllers, suite upload paths, and execution timeouts. |
| **Agent Daemon** | `<xlt>/config/agentcontroller.properties` | Configures network ports, machine sizing, and agent execution parameters. |
| **Reporting** | `<xlt>/config/reportgenerator.properties` | Configures chart generation, sampling intervals, error limits, and percentiles. |

---

## 1. Load Profile Configuration

Configure target load in `test.properties` (or an alternative profile referenced by `com.xceptance.xlt.testPropertiesFile`):

* **Concurrency vs. Arrival Rate**: Apply load via fixed [concurrent user counts](/xlt/about/glossary/#concurrent-users) or dynamic [arrival rates](/xlt/about/glossary/#constant-arrival-rate).
* **Load Scaling**: Adjust global or scenario-specific load dynamically using the [load factor](/xlt/manual/load-configuration/#load-factor).
* **Profiles**: Choose between static load, phased ramp-ups, or stepped load profiles.

For details and syntax, see [Load Configuration](/xlt/manual/load-configuration/) and [Load Test Profile Configuration](/xlt/manual/test-suite-configuration/#load-test-profile-configuration).

---

## 2. Test Suite & Environment Properties

* **Project Properties (`project.properties`)**: Contains application-wide settings, such as the base URL of the System Under Test (`store-url`), shared credential paths, and default timeout thresholds.
* **Development Properties (`dev.properties`)**: Takes highest priority when running test cases locally from an IDE. Use this to enable verbose logging or point to local mock services without altering production load configurations.
* **Default Properties (`default.properties`)**: Shipped with XLT templates. Defines fallback timeouts, parser behaviors, and network socket limits.

For property resolution rules and precedence, see [Test Suite Configuration](/xlt/manual/test-suite-configuration/).

---

## 3. Distributed Cluster Configuration

Distributed test runs require coordination between the Master Controller and Agent Controllers:

* **Master Controller**: Set `com.xceptance.xlt.mastercontroller.testSuitePath` to the path of your test suite, and specify the list of agent controller hostnames and ports in `com.xceptance.xlt.mastercontroller.agentcontrollers.default.agents`.
* **Agent Controller**: Ensure the agent controller daemon is running on port 8500 on all load generator hosts, or configure [Private Machine Mode](/xlt/manual/private-machines/) for corporate networks.

For network settings and cluster communication, see [Environment Configuration](/xlt/manual/environment-configuration/).

---

## 4. Report Generation

Upon test completion, the Master Controller downloads measurement logs from all agents and invokes the report generator:

* Configure sampling intervals, percentile calculations (e.g. 50th, 95th, 99th), and request filtering in `reportgenerator.properties`.
* Customize visual themes, error thresholds, and scorecard rules in [Report Configuration](/xlt/manual/report-configuration/) and [Report Options](/xlt/manual/report-options/).

