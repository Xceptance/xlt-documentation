---
title: "Monitoring"

weight: 170
type: docs

description: >
  How to monitor a load test in XTC.
---

{{< TODO comment="check all the links!!" / >}}

## Monitoring the Test 

### Test Status

The _Status_ tab contains an overview of the test status. This is a list of the steps carried out in the load test phases _Preparation_, _Execution_,  and _Results and Clean Up_ which will be marked done while the test progresses. 

{{< image src="xtc/loadtest_status.png" >}}
The status view for a running load test.
{{< /image >}}

Steps that failed due to errors (like timeouts or failed authentication) will be marked as failed here, so you can see why and at which step the test does not progress or was aborted.

### Scenario Status

The _Scenario Status_ tab only contains information while the test is actually running or finished. This is an overview of all test scenarios that are executed in this load test, containing scenario name and state and other useful information such as currently running users, average scenario runtime and especially the number of events and errors that occurred in this scenario:

{{< image src="xtc/loadtest_scenarioStatus.png" >}}
The scenario status view for a running load test.
{{< /image >}}