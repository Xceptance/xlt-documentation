---
title: "Quick Start"

weight: 110
type: docs

description: >
  How to start, stop and evaluate a predefined load test.
---

{{% permission type="project" least="true" role="tester" action="start, stop and abort load tests" %}}

## How to Run a Predefined Load Test

As a tester, XTC enables you to start, stop and review predefined load tests (which have been already prepared and configured) very easily. We will give you a quick overview on how to do this - if you need more information, we have a more detailed documentation for every step.

### Navigate to the Load Test

Navigate to the [load tests overview]({{< relref "140-overview" >}}) by selecting **Load Tests** in the menu on the left and find the load test you want to start (its status should be _New_ as it has not run yet). Click the name of the test to view test details.

Alternatively, you may have got a link to directly access the test you want to start. Clicking its _Status_ tab should display the information "This load test was not started yet."

### Start the Load Test

To start the prepared and configured load test, click the _Start_ context menu item in the load test table or the _Start_ button on the load test details page:

{{< image src="xtc/loadtest_start1.png" >}}
Start or schedule the configured load test via context menu.
{{< /image >}}

{{< image src="xtc/loadtest_start2.png" >}}
Start or schedule the configured load test on the test page.
{{< /image >}}

You will be prompted to confirm that you want to start the load test with the given settings now. If you click _Start Load Test_ XTC will start the load test by downloading the current state of the test suite project from the repository, building the project, provisioning the requested agents and, if this was successful, run the provided test scenarios for the configured time.

### Monitor the Load Test

After the load test has been started, you can check which steps are currently carried out in the [**Status**]({{< relref "170-monitor-lt#test-status" >}}) tab. Steps will be marked as _done_ or _failed_ as the test progresses.

{{< image src="xtc/loadtest_status.png" >}}
The status view for a running load test.
{{< /image >}}

The [**Scenario Status**]({{< relref "170-monitor-lt#scenario-status" >}})  tab only contains information while the test is actually running or finished. This is an overview of all test scenarios that are executed in this load test, containing scenario name and state and other useful information such as currently running users, average scenario runtime and especially the number of events and errors that occurred in this scenario:

{{< image src="xtc/loadtest_scenarioStatus.png" >}}
The scenario status view for a running load test.
{{< /image >}}

### Finish the Load Test

XLT simplifies finishing load tests for you, as load tests will be **stopped automatically** after the run is complete. XLT will take care to deprovision the agents that were used for the test run and it will automatically download [results]({{< relref "results" >}}) and [create a report]({{< relref "reports" >}}).

However there might be several reasons why you'd want to **abort a load test** before it has finished. In these situations, you can just abort the test run by clicking _Abort Load Test_ on the top right.

{{< image src="xtc/loadtest_abort_click.png" >}}
Abort the load test.
{{< /image >}}

### Load Test Reports

XTC will automatically [create a report]({{< relref "test-evaluation" >}}) at the end of the load test. You can find the generated report in the _Reports_ tab. All generated reports will be available inside XTC to browse and evaluate them, and also as compressed archive ready for download if you need them on your local machine.

### Rerun the Same Load Test

To rerun a test, XTC allows you to duplicate tests. This copies the complete configuration to a new load test run. To duplicate a load test, navigate to the _Load Tests_ overview of your load test project, then select _Duplicate_ in the test's context menu:

{{< image src="xtc/loadtest_duplicate.png" >}}
Duplicate an existing load test.
{{< /image >}}

You can then start, monitor and finish the load test like described [above](#start-the-load-test).
