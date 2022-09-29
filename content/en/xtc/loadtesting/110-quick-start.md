---
title: "Quick Start"

weight: 110
type: docs

description: >
  How to start, stop and evaluate a predefined load test.
---

{{% permission type="project" least="true" role="tester" action="start, stop and abort load tests" %}}

## How to Run a Predefined Load Test

As a tester, XTC enables you to start, stop and review load tests very easily. We will give you a quick overview on how to do this - if you need more information, we have a more detailed documentation for every step.

### Navigate to the Load Test
(TODO navigieren die Kunden sich selbst wohin oder schicken wir ihnen direkte Testlinks?) Navigate to the [load tests overview]({{<relref "160-start-lt">}}) by selecting **Load Tests** in the menu on the left and find the load test you want to start (its status should be _New_ as it has not run yet). Alternatively, you may have got a link to directly access the test you want to start. Clicking its _Status_ tab should display the information "This load test was not started yet."

### Start the Load Test
To start the load test, click the _Start_ context menu item in the load test table or the _Start_ button on the load test details page:

{{< image src="xtc/loadtest_start1.png" >}}
Start or schedule the configured load test via context menu.
{{< /image >}}

{{< image src="xtc/loadtest_start2.png" >}}
Start or schedule the configured load test on the test page.
{{< /image >}}

You will be prompted to confirm that you want to start the load test with the given settings now. If you click _Start Load Test_ XTC will start the load test by downloading the current state of the test suite project from the repository, building the project, provisioning the requested agents and, if this was successful, run the provided test scenarios for the configured time.

### Monitor the Load Test

After the load test has been started, you can check which steps are currently carried out in the [**Status**]({{<relref "170-monitor-lt#test-status">}}) tab. Steps will be marked as _done_ or _failed_ as the test progresses.

{{< image src="xtc/loadtest_status.png" >}}
The status view for a running load test.
{{< /image >}}

The [**Scenario Status**]({{<relref "170-monitor-lt#scenario-status">}})  tab only contains information while the test is actually running or finished. This is an overview of all test scenarios that are executed in this load test, containing scenario name and state and other useful information such as currently running users, average scenario runtime and especially the number of events and errors that occurred in this scenario:

{{< image src="xtc/loadtest_scenarioStatus.png" >}}
The scenario status view for a running load test.
{{< /image >}}

### Finish the Load Test 

XLT simplifies finishing load tests for you, as load tests will be **stopped automatically** after the run is complete. XLT will take care to deprovision the agents that were used for the test run and it will automatically download [results]({{< relref "175-results" >}}) and [create a report]({{< relref "180-reports" >}}).

However there might be several reasons why you'd want to **abort a load test** before it has finished. In these situations, you can just abort the test run by clicking _Abort Load Test_ on the top right. 

{{< image src="xtc/loadtest_abort_click.png" >}}
Abort the load test.
{{< /image >}}

### Load Test Reports

XTC will automatically [create a report]({{< relref "/xlt/load-testing/manual/320-test-evaluation" >}}) at the end of the load test. You can find the generated report in the _Reports_ tab. All generated reports will be available inside XTC to browse and evaluate them, and also as compressed archive ready for download if you need them on your local machine.

While the test is still running you can also generate [intermediate reports]({{< relref "/xlt/load-testing/manual/320-test-evaluation#intermediate-results" >}}) by clicking _Generate Intermediate Report_ on top of the load test contents. The Intermediate Report will always be created for the complete runtime of the test up to the point of report creation, including the ramp up. Clicking _Accept_ will start the report creation (which may take several minutes).

After the load test has finished, you can create as many [custom reports]({{< relref "180-reports#custom-reports" >}}) with adjusted report settings as you need.

### Rerun the Same Load Test

To rerun a test, XTC allows you to duplicate tests. 
