---
title: "Load Testing with XTC"

weight: 15
type: docs

description: >
  What you need to set up and run a load test in XTC.
---

When you select a load test project, you will be shown the load test project dashboard. 

## Select the Test Suite Repository

Select **Configuration** in the menu on the left to check in the **Repository** tab whether the project repository and branch for the test suite is correctly set and can be accessed using the [provided authentication](../010-xtc-basics/#repository-authentication).

## View Load Tests

By selecting **Load Tests** in the menu on the left you will be taken to the load tests overview. This is a table of all existing load tests (which have been created for this project at some point, but have not necessarily run). Along with the test name you will see the status:
* _New_ for newly created tests,
* _Running_ for currently running tests, 
* _Finished_ for successfully finished tests, 
* _Aborted_ for aborted tests, or 
* _Error_ for test runs that finished with an exception.

Also, the table contains the start date of the test run (if it has been started yet), a summary and rating for finished tests that already have been evaluated in XTC, and a menu toggle. 

{{< image src="xtc/loadtests_table.png" >}}
The load tests overview of a project.
{{< /image >}}

By clicking a test name in the table, you will be taken to the details of this test. Depending on the test status, you will find different information in the following tabs:

* **Status** contains an overview of the [test status](#monitor-the-test) which will be constantly updated while the test progresses. 
* **Settings** contains the settings for the current test: you can override the load profile (test properties and duration) of your test suite, define another repository than the one you set for the project, and this is also the place where you define Google machines or Custom machines the test should be run on. Of course these settings must be entered before the test is started. 
* The **Scenario Status** contains an overview of all executed [test scenarios and their status](#monitor-the-test), which is only displayed while the test is running or finished. 
* The **Results** tab contains the test results which are automatically downloaded at the end of the test, and also intermediate results you may have downloaded manually during the test run. Results can be downloaded or deleted in the menu on the right.
* The **Reports** tab contains all test reports (final and intermediate) that were created for the test. Reports can be edited (to enter a new name or description), downloaded, shared or deleted in the menu on the right. By clicking the **+** Button you can [add new reports](#create-a-report) (e.g. to change report settings or merge rules used for report creation).
* In **Evaluation** you can add a short summary, a rating and a more detailed [evaluation](#evaluate-the-test-run) to the test. 

## Run a Load Test

### Create a New Load Test

To create a new load test, navigate to your load test project's _Load Tests_ overview. You can either duplicate (and probably edit) an existing test run, or create a completely new test setup:

{{< image src="xtc/loadtest_newOrDuplicate.png" >}}
Create a new load test or duplicate an existing one.
{{< /image >}}

You will be prompted to enter a test name and description for the new load test. XTC will then either make a copy of the selected test's setup or create a completely new test with default settings under the chosen name. The test status will be _New_ either way. 

You can then enter the configuration by clicking the name of the newly created test, which will take you to the test's settings.

### Test Settings

In the _Settings_ tab

{{< TODO >}}Test settings. Link to Load Testing Chapters for Load/Test/Environment Configuration{{< /TODO >}}

* load profile: overrides load profile in test suite (if set)
* repository: overrides project repository
* master/agent controller password (default: random string)
* MANDATORY: machines to be used (Google machines: specify region(s), instance template, instance count, agents per instance/or Custom Machines: specify host name(s) and agents per instance)

### Start the Load Test

To actually start the load test, click the link on top of the load test contents:

{{< image src="xtc/loadtest_start.png" >}}
Start the configured load test.
{{< /image >}}

You will be prompted to confirm that you want to start the load test with the given settings now. If you click _Yes, Proceed_ XTC will start the load test by downloading the current state of the project from the repository, building the project, provisioning the requested agents and, if this was successful, run the provided test scenarios for the configured time.

<!--Soon (?) to come: test scheduling-->

### Monitor the Test 

The _Status_ tab contains an overview of the test status. This is a list of the test steps for Preparation, Execution, Results and Clean Up which will be marked done while the test progresses. 

{{< image src="xtc/loadtest_status.png" >}}
The status view for a running load test.
{{< /image >}}

Steps that failed due to errors (like timeouts, or failed authentication) will also be marked as failed here, so you can see why and at which step the test does not progress or was aborted.

The _Scenario Status_ tab only contains information while the test is actually running or finished. This is an overview of all test scenarios that are executed in this load test, containing scenario name and state and other useful information such as currently running users, average scenario runtime and especially the number of events and errors that occurred in this scenario:

{{< image src="xtc/loadtest_scenarioStatus.png" >}}
The status view for a running load test.
{{< /image >}}

### Create a Report

XTC will automatically download test results and [create a report](../../load-testing/manual/320-test-evaluation/) at the end of the load test. These will be available in the _Results_ and the _Reports_ tabs. Both will be available as compressed archives ready for downloading if you need them on your local machine. All generated reports will be available inside XTC to browse and evaluate them, and XTC can also generate a link for public sharing (you can adjust when this link is supposed to expire).

However you can generate as many final reports as you like, with adjusted report settings, after the test has finished. 

While the test is still running you can also generate [intermediate reports](../../load-testing/manual/320-test-evaluation/#intermediate-results) by clicking _Generate Intermediate Report_ on top of the load test contents.

{{< TODO >}}Report settings. Also: which settings will be used for automatic report generation at end of test{{< /TODO >}}

### Evaluate the Test Run

After the test has finished, you can add a short summary, a rating and a more detailed evaluation to the test in the _Evaluation_ tab. Summary and rating will show up in the load tests overview table then. To edit a scenario, click the pencil button:

{{< image src="xtc/loadtest_summary.png" >}}
The evaluation for a finished load test.
{{< /image >}}
