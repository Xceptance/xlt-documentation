---
title: "Evaluate a Test"

weight: 40
type: docs

description: >
  How to evaluate a load test result
---

You will get results and even reports out of your load test fairly quickly, but evaluating a load test and drawing the correct conclusions from the data needs some practice. 

## Questions to Ask

You might have to ask first:
- Was the setup correct?
- Is the result expected?
- Does it prove my point?
- Is there anything known or unknown in the result?
- What can I learn from the test?
- What do I have to do next?
- Was it my fault?

## Overview

### Load Setup
To check whether the load setup was correct, control these points on the overview of your test report:
- **Transactions**: were the right scenarios executed?
- Does the **measurement period** match your configuration?
- Was the **thinktime** like you expected?
(The arrival rate setting does not guarantee, hence you cannot check anything here.)

{{< image src="quickstart/load-profile.png" >}}
Load Profile
{{< /image >}}

### Concurrent User Chart
Also on your test report overview, in *General Information*, you will find the Concurrent User Chart right at the top. 
- Is the ramp up visible?
- Max users = Max number of concurrently used session = Max possible concurrent requests {{< TODO >}}this should be a sensible sentence{{< /TODO >}}
- Are there any spikes up or down? How nervous is the user chart (arrival rate)? 

{{< image src="quickstart/concurrent-users.png" >}}
Concurrent Users Chart
{{< /image >}}

### Requests
Right below the Concurrent User Chart you'll find the Requests Per Second and Request Runtime Charts. 
- In the Requests Per Second, are there any spikes? Is the ramp up visible?
- Are the requests in the ballpark? 
- Are there runtime patterns, spikes or waves?

{{< image src="quickstart/RequestsPerSecond-2.png" >}}
Requests Per Second Chart
{{< /image >}}

{{< image src="quickstart/RequestRuntime.png" >}}
Request Runtime Chart
{{< /image >}}

### Errors
Further below is the Transaction Errors Chart.
- Do we have any errors?
- Do we have a pattern?
- Did we expect errors?

{{< image src="quickstart/TransactionErrors.png" >}}
Transaction Errors Chart
{{< /image >}}

### Misc
- Was the right timezone used for testing?
- Was PXX set correctly?
- Was SLA set correctly?
- Did the test run in the right time frame?
- Do the links to the results work?
- Was there any external data configured?

## Agents
In the top menu of the report you'll find the point *agents*. This contains all data for your machines and some more charts. Look for the following (and check all the agents that were used):
- Was the overall CPU usage per box <40%?
- Also check the agent CPU usage.
- Was the memory curve nice and steady, not hitting the max value?
- GC information {{< TODO >}}what's this supposed to mean?{{< /TODO >}}

{{< image src="quickstart/agent-CpuUsage.png" >}}
Agents
{{< /image >}}

## Transactions
{{< TODO >}}WRITE{{< /TODO >}}

## Actions
{{< TODO >}}WRITE{{< /TODO >}}

## Requests
{{< TODO >}}WRITE{{< /TODO >}}

## Network
{{< TODO >}}WRITE{{< /TODO >}}

## Errors
{{< TODO >}}WRITE{{< /TODO >}}

For more details on how to read and interpret your test reports, see the [Manual]({{< relref "/load-testing/manual/320-test-evaluation" >}}).




