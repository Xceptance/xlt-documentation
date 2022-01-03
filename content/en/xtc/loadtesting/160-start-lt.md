---
title: "Starting and Stopping"

weight: 160
type: docs

description: >
  How to start and stop a load test
---

## Starting the Load Test

To actually start the load test, click the link on top of the load test contents:

{{< image src="xtc/loadtest_start.png" >}}
Start the configured load test.
{{< /image >}}

You will be prompted to confirm that you want to start the load test with the given settings now. If you click _Start Load Test_ XTC will start the load test by downloading the current state of the test suite project from the repository, building the project, provisioning the requested agents and, if this was successful, run the provided test scenarios for the configured time.

<!--Soon (?) to come: test scheduling-->

## Stopping a Load Test

XLT simplifies finishing load tests for you, as load tests will be stopped automatically after the run is complete. XLT will take care to deprovision the agents that were used for the test run and it will automatically download [results](../175-results) and [create a report](../180-reports).

{{% note notitle %}}
Please note that only [Google Machines](../155-lt-settings/#machine-configuration) provisioned by XTC itself will be deprovisioned automatically after the test is finished. You will need to shut down any Custom Machines you added yourself.
{{% /note %}}

If XTC fails to terminate an agent machine, it will mark the _Terminate Agents_ step on the _Status_ tab of the load test as failed.

### Aborting a Load Test

However there might be several reasons why you'd want to abort a load test before it has finished: maybe you noticed too late that you missed some [configuration setting](../155-lt-settings), or you notice a lot of unexpected errors popping up on the [scenario overview](../170-monitor-lt/#scenario-overview) or your app server is already collapsing halfway through the run, to just name a few. In these situations, you can just abort the test run by clicking _Abort Load Test_ on the top right. 

{{< image src="xtc/loadtest_abort_click.png" >}}
Abort the load test.
{{< /image >}}

This will open a popup which prompts you to confirm that you want to abort the current run. Depending on the test status (whether any test scenarios have run already, thus producing result data) you may select which result artifacts should be downloaded and whether a report should be created. By deselecting unneeded artifacts, result browsers for example, the initial download may progress much faster and, consequently, storing the result and load test report to persistent storage later on may take less time as well.

XTC will then stop the running test scenarios and deprovision all agents.

{{< image src="xtc/loadtest_abort.png" >}}
Popup after clicking _Abort Load Test_ in a test run which is currently STARTING.
{{< /image >}}

Right after a user has clicked the _Abort Load Test_ button, the button will be disabled for the current user as well as _for all other users_. This is to indicate that the abort procedure is in progress.

{{% note notitle %}}
Please note that only [Google Machines](../155-lt-settings/#machine-configuration) provisioned by XTC itself will be deprovisioned automatically after the test is aborted. You will need to shut down any Custom Machines you added yourself.
{{% /note %}}

If XTC fails to terminate an agent machine, it will mark the _Terminate Agents_ step on the _Status_ tab of the load test as failed.

