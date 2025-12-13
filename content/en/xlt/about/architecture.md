---
title: "Architecture"
linkTitle: "Architecture"

type: docs

weight: 30

description: >
    An overview of the XLT architecture.
---

## Architecture

This section covers the master controller, agents, test suites, and monitoring.

* Test Suite Code and configuration
* Mastercontroller (MC)
* Agents: The test executors
* Deployments
* Grafana for real-time test information
 
* The Master Controller (MC) is loosely coupled.
* You can use another MC to interact or continue a test.


* There is no need to stay connected to the MC.
* You can reattach to the MC later and continue your work.
* Tests can be handed over to colleagues.
* Intermediate results can be retrieved at any time.
* Run multiple tests from one machine.
* The test machine can be located elsewhere (Remote MC).
* XLT does not require a database; results and reports are easily archivable.
* Reports can be generated from results at any time.
* Results and reports preserve test setups, making it easy to repeat tests.

{{< TODO >}}This page is still a work in progress.{{< /TODO >}}