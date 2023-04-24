---
title: "Monitoring the Test Run"

weight: 170
type: docs

description: >
  How to monitor a load test in XTC.
---

## Monitoring the Load Test 

{{% permission type="project" least="true" role="reviewer" action="view the load test and scenario status" %}}

### Test Status

The _Status_ tab contains an overview of the test status. This is a list of the steps carried out in the load test phases _Preparation_, _Execution_,  and _Results and Clean Up_ which will be marked done while the test progresses. 

{{< image src="xtc/loadtest_status.png" >}}
The status view for a running load test.
{{< /image >}}

Steps that failed due to errors (like timeouts or failed authentication) will be marked as failed here, so you can see why and at which step the test does not progress or was aborted.

### Scenario Status

The _Scenario Status_ tab only contains information while the test is actually running or finished. After the [live metrics]({{< relref "#live-metrics" >}}) follows an overview of all test scenarios that are executed in this load test, containing scenario name and state and other useful information such as currently running users, average scenario runtime and especially the number of events and errors that occurred in this scenario:

{{< image src="xtc/loadtest_scenarioStatus.png" >}}
The scenario status view for a running load test.
{{< /image >}}

#### Live Metrics

The graph on top of the scenario status table is updated while the load test is running. It displays information on the number of currently active users as well as the user limit for each test scenario. Hovering over the graph displays a popup with the values for this point in time (user limit in parentheses).

Since there might be a lot of information, you can **filter** in the dropdown for single or several test scenarios or just display total values. If you want to see more details in the chart, selecting a higher **scaling factor** will make the chart taller. 

Red vertical bars are displayed when scenario errors occurred. These are bound to the respective scenarios, i.e. when you select a single scenario only the errors for this scenario will be visible in the graph. When you select _Total_, the sum of all scenario errors will be displayed.

{{% note notitle %}}
Please note that there may be gaps in the live metrics even though the test was running fine during that time - this might happen due to a restart or relocation of the status updater (which regularly fetches the test status from the agents). Also, if the status updater does not receive any status from the agents for whatever reason, the charts will contain a gap for that period. 
{{% /note %}}

The data for the scenario status chart is available for a limited period of time only (7 days after the load test has ended). After that time the chart will no longer be displayed as it would be empty anyway.

