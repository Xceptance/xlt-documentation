---
title: "Load Testing"

weight: 20
type: docs

description: >
  How to set up your first load testing project in XTC.
---

## XTC Load Testing Basics

To run a load test in XTC, we assume you have an [XLT Test Suite](../../../load-testing/manual/060-test-development/) available in the [repository](#repository) of your choice. 

Below we will show you how to quickly set up your first load test in XTC. For more information on load testing features and details, please refer to the [XTC user manual](../../200-manual/120-load-testing/).

## Creating a New Load Test

To create a new load test, navigate to the _Load Tests_ overview of your load test project. You can either duplicate (and probably edit) an existing test run, or create a completely new test setup:

{{< image src="xtc/loadtest_newOrDuplicate.png" >}}
Create a new load test or duplicate an existing one.
{{< /image >}}

You will be prompted to enter a name and description for the new load test. XTC will then either make a copy of the selected test or create a completely new test with default settings under the chosen name. The test status will be _New_ either way. 

You can then enter the configuration by clicking the name of the newly created test, which will take you to the settings of this test.

## Define the Test Suite Repository

As the very first step of every test run, XTC will download your test suite from the repository you defined for the project. The repository itself will be defined for the test project, while the repository branch used in a test run can also be overridden in the [test settings](#test-settings) if needed.

### Test Settings

The _Settings_ tab contains all settings for the test run. Some of these are mandatory, you need to set them before the test run can be started (to learn more about all possible settings, please refer to the [user manual](../../200-manual/120-load-testing/).

#### Repository

Every load test needs a repository to download its load test suite from. This repository is defined in the load test project settings, but the branch to be used can be overwritten per load test. 

To configure the repository and authentication, select **Configuration** in the project menu on the left to check in the _Repository_ tab whether the project repository and branch for the test suite is correctly set and can be accessed using the provided authentication.

#### Machine Configuration

The most important part of the test setup is the configuration of the test machines to be used. 

The machines to be used can be entered in _Google Machines_ or _Custom Machines_ (or you use a combination of both). 

If you want to use machines in the **Google Cloud**, you just enter configuration details and the selected machines will automatically be started prior to the load test and terminated afterwards by XTC. To edit the Google Cloud machine configuration, click the editing button next to the _Google Machines_ headline. There you can
* specify which _regions_ the machines should run in (you can pick several, the machines will be spread over the selected regions as evenly as possible), 
* pick an _instance template_ for your machines (currently tiny, small, medium or xlarge), depending on how much computing power you think you'll need,
* select the number of machine instances to start (_instance count_), and
* select the number of _agents per instance_.

Instead of starting and terminating Google Machines per XTC, you can also use other machines for testing. You can define these in **Custom Machines**: just enter a list of host names and the agents per instance for your machines, and make sure these are running while the test is executed. 

As **[test sizing](../../../load-testing/how-tos/test-sizing/)** is a whole topic in itself, you might want to check the CPU usage after your test and maybe adjust the number of machines for the next test run.

### Start the Load Test

To actually start the load test, click the link on top of the load test contents:

{{< image src="xtc/loadtest_start.png" >}}
Start the configured load test.
{{< /image >}}

You will be prompted to confirm that you want to start the load test with the given settings now. If you click _Start Load Test_ XTC will start the load test by downloading the current state of the test suite project from the repository, building the project, provisioning the requested agents and, if this was successful, run the provided test scenarios for the configured time.

While the test is running, the **Status** tab of the load test contains a list of the steps carried out in the load test phases _Preparation_, _Execution_,  and _Results and Clean Up_ which will be marked done while the test progresses, or failed, if the respective step failed for some reason (like timeouts or failed authentication), so you can see why and at which step the test does not progress or was aborted. 

During the actual test run, the **Scenario Status** tab provides an overview of all test scenarios that are executed in this load test, containing scenario name and state and other useful information such as currently running users, average scenario runtime and especially the number of events and errors that occurred in this scenario.

### After the Load Test

XTC will automatically download test results and [create a report](../../../load-testing/manual/320-test-evaluation/) at the end of the load test. These will be available in the _Results_ and the _Reports_ tabs. You may create intermediate reports in the middle of your test run as well as more reports using custom settings after the run. 

If you used Google Cloud machines for testing, XTC will shut down these machines automatically after everything is finished.