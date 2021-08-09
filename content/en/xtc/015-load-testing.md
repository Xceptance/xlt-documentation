---
title: "Load Testing with XTC"

weight: 15
type: docs

description: >
  What you need to set up and run a load test in XTC.
---

## XTC Load Testing Basics

To run a load test in XTC, we assume you have an [XLT Test Suite](../../load-testing/manual/060-test-development/) available in the [repository](#select-the-test-suite-repository) of your choice. (For more information on what to prepare and think about before load testing, see our recommendations for a load testing [workflow](../../load-testing/manual/050-workflow/).)

XTC enables you to quickly get an [overview of previous test runs](#view-load-tests), offering plenty of information. 

Below we will show you how to [run load tests with XTC](#run-a-load-test), which usually consists of these steps which you can also learn more about in the [load testing documentation](../../load-testing):

* [create a new load test run](#create-a-new-load-test),
* adjust the [test settings](#test-settings) for this run, 
* [start the load test](#start-the-load-test),
* [monitor](#monitor-the-test) your test while it's running,
* [create test reports](#create-a-report) and
* [evaluate](#evaluate-the-test-run) the test results.

## Select the Test Suite Repository

As the very first step of every test run, XTC will download your test suite from the repository you defined for the project. The repository itself will be defined for the test project, while the repository branch used in a test run can also be overridden in the [test settings](#test-settings) if needed.

To define your repository location, select **Configuration** in the menu on the left to check in the _Repository_ tab whether the [project repository and branch](../010-xtc-basics/#project-configuration) for the test suite is correctly set and can be accessed using the [provided authentication](../010-xtc-basics/#repository-authentication).

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

The _Settings_ tab contains all settings for the test run. Some of these are mandatory, you need to set them before the test run can be started.

#### Load Profile

Under _Load Profile_ you can override your test suite's settings for the [test properties file to be used](../../load-testing/manual/480-test-suite-configuration/#test-properties-file). In addition to that, you can override the settings for test duration and [load factor](../../load-testing/manual/470-load-configuration/#load-factor). 

As this is a very limited set of directly accessible properties, please note that not every value makes sense here (as, for example, [ramp-up times](../../load-testing/manual/470-load-configuration/#ramp-up-load-profile) are still read from the property file).

These settings are only needed if you want to override your test suite settings for some reason, e.g. quickly changing the test duration or load factor without pushing changes to the repository, or switching between your prepared test property files. If the fields are left empty, the test suite's settings will be used.

Learn more in our _Load Testing_ section about [configuring load profiles](../../load-testing/manual/470-load-configuration) for your test run.

#### Repository

Under _Repository_ you can enter a branch of the project repository to be used for this test run. This is only necessary if you want to use another branch than the one you [configured for the project](#select-the-test-suite-repository). If this is left empty, the project or default branch will be used.

#### Machine Configuration

The most important (and therefore mandatory) part of the test setup is the configuration of the test machines to be used. 

In _Common Machine Configuration_ you can enter a password for the communication between the master and all agent machines (a random password will be generated by default).

The machines to be used can either be entered in _Google Machines_ or _Custom Machines_ (or you use a combination of both). 

If you want to use machines in the **Google Cloud**, you just enter conifguration details and the selected machines will automatically be started prior to the load test and terminated afterwards by XTC. To edit the Google Cloud machine configuration, click the editing button next to the _Google Machines_ headline. There you can
* specify which _regions_ the machines should run in (you can pick several, the machines will be spread over the selected regions as evenly as possible), 
* pick an _instance template_ for your machines (currently tiny, small, medium or xlarge), depending on how much computing power you think you'll need,
* select the number of agent instances to start (_instance count_), and
* select the number of _agents per instance_.

Instead of starting and terminating Google Machines per XTC, you can also use other machines for testing. You can define these in **Custom Machines**: just enter the host names and agents per instance for your machines, and make sure these are running while the test is executed. 

As **[test sizing](../../load-testing/how-tos/test-sizing/)** is a whole topic in itself, you might want to check the CPU usage after your test and maybe adjust the number of machines for the next test run.

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

#### Report Settings

On creating a final report, there will be a popup for report settings to be chosen: you will be prompted to enter a _label_ and _description_ for the report, and may choose a _time range_ to create the report for (when you create an intermediate report, the complete testing time up to report creating will be included). The default time range is always the complete test duration, but you may determine the start time and end time by several options, similar to the [report creation](../../load-testing/manual/540-report-options/#defining-a-reporting-timeframe) in XLT. To check whether your settings are correct, the effective report time range will be displayed at the end of this section:

{{< image src="xtc/loadtest_report_timerange.png" >}}
Basic settings for creating a new load test report: adjusting the time range.
{{< /image >}}

By clicking **Show Advanced Settings** four more sections will appear:
* _Include/Exclude Patterns_ can be defined either for [test cases](../../load-testing/manual/540-report-options/#excluding-test-scenarios) or [agents](../../load-testing/manual/540-report-options/#report-for-a-subset-of-agents),
* in _Report Generator Properties_ you can define completely a [custom report configuration](../../load-testing/manual/550-report-configuration/),
* in _Merge Rules_ you can override the project's [merge rules](../../load-testing/advanced/010-merge-rules/) (to avoid unexpected side effects we recommend to paste your complete set of merge rules here, even the ones that may have been already defined in the project), and 
* you can even add _Additional Command Line Arguments_ for report generation (learn more about [report generation by command line](../../load-testing/manual/540-report-options/)).

These advanced settings are by no means trivial, so make sure you know what you're doing. 

On clicking **Accept** report creation will be started, the report will appear in the list of reports, showing a little progress/refresh icon left to its name. After the report creation has finished, you will be able to click the name to open and [read it](../../load-testing/manual/320-test-evaluation/#reading-a-test-report).

### Evaluate the Test Run

After the test has finished, you can add a short summary, a rating and a more detailed evaluation to the test in the _Evaluation_ tab. Summary and rating will show up in the load tests overview table then. To edit a scenario, click the pencil button:

{{< image src="xtc/loadtest_summary.png" >}}
The evaluation for a finished load test.
{{< /image >}}
