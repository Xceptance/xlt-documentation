---
title: "Quick Start"

weight: 10
type: docs

description: >
  What you need to set up and run a load test in XTC.
---

## Log In

To use Xceptance Test Center, you need an account. You can easily sign up on https://xtc.xceptance.com/.

{{< TODO >}}How are roles assigned? Can I be my own admin? What is the default customer role?{{< /TODO >}}

## Basic UI Structure

After logging in, you will see a dashboard containing the organizations (tenants) and projects assigned to your account. You can select both via dashboard links, or by clicking the links in the header, next to the _XTC_ logo:

{{< image src="xtc/topmenu.png" >}}
The XTC top menu allows you to select tenant and project directly. 
{{< /image >}}

{{% note %}}
Please note that the menu on the left offers different options, depending on whether you are currently viewing the dashboard, an organization, or a project.
{{% /note %}}

To set up any kind of test, either for load testing or monitoring, you need to navigate to the right project. A project can either be load testing or for monitoring, never for both at the same time. The project type will be indicated in the project panel on the organization's dashboard:

{{< image src="xtc/organizations_monitoringProject.png" >}}
A monitoring project on the dashboard of the _Xceptance_ organization.
{{< /image >}}

The project menu on the left side will look a bit different, depending on whether you selected a load testing or a monitoring project:

{{< image src="xtc/project_menus.png" >}}
The menu of a monitoring project (left) and a load testing project (right).
{{< /image >}}

In any case, you will see the project members and the configuration. In the project configuration, there are two tabs on the right side, _General_ and _Repository_. In _General_, you can see information like the project name and avatar. In _Repository_, you can define where the test suite repository is located, which branch should be used and how to resolve the test suite root within the repository. If the access to the remote repository is restricted, you can also provide authentication. Note that in load test projects, you can configure specific repository settings per load test that override the general repository settings at the project for this load test.

## Load Testing

When you select a load test project, you will be shown the load test project dashboard. 

### Select the Test Suite Repository

Select **Configuration** in the menu on the left to check in the **Repository** tab whether the project repository and branch for the test suite is correctly set and can be accessed using the provided authentication.

### View Load Tests

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

* **Status** contains an overview of the test status. This is a list of the test steps for Preparation, Execution, Results and Clean Up which will be marked done while the test progresses. 

{{< image src="xtc/loadtest_status.png" >}}
The status view for a running load test.
{{< /image >}}

* **Settings** contains the settings for the current test: you can override the load profile (test properties and duration) of your test suite, define another repository than the one you set for the project, and this is also the place where you define Google machines or Custom machines the test should be run on. Of course these settings must be entered before the test is started. 
* The **Scenario Status** only contains information while the test is actually running or finished. This is an overview of all test scenarios that are executed in this load test, containing scenario name and state and other useful information such as currently running users, average scenario runtime and especially the number of events and errors that occurred in this scenario:

{{< image src="xtc/loadtest_scenarioStatus.png" >}}
The status view for a running load test.
{{< /image >}}

* The **Results** tab contains the test results which are automatically downloaded at the end of the test, and also intermediate results you may have downloaded manually during the test run. Results can be downloaded or deleted in the menu on the right.
* The **Reports** tab contains all test reports (final and intermediate) that were created for the test. Reports can be edited (to enter a new name or description), downloaded, shared or deleted in the menu on the right. By clicking the `+` Button you can [add new reports](#create-a-report) (e.g. to change report settings or merge rules used for report creation).
* In **Evaluation** you can add a short summary, a rating and a more detailed evaluation to the test. Summary and rating will show up in the load tests overview table then. To edit a scenario, click the pencil button:

{{< image src="xtc/loadtest_summary.png" >}}
The evaluation for a finished load test.
{{< /image >}}


### Start a New Load Test

* project: 
    * load tests: 
        * table shows name, date (if already started), state, summary, rating (if available)
        * load test details: status (steps in test run and their state), settings (editable while test is not started), scenario status (like report status in MC), results (final and intermediate), reports (final and intermediate), evaluation (if available, with rating, can be added after test finished) 
        * add new or copy existing
* new load test: 
    * set name and description > status = New
    * click test name: enter configuration (settings): 
        * load profile: overrides load profile in test suite (if set)
        * repository: overrides project repository
        * master/agent controller password (default: random string)
        * MANDATORY: machines to be used (Google machines: specify region(s), instance template, instance count, agents per instance/or Custom Machines: specify host name(s) and agents per instance)
    * start load test by start symbol top right
    * see status in status tab
    * generate intermediate report by report symbol top right (automatically downloads intermediate results), report and results will be available in results/reports tab
    * after test run: add evaluation in evaluation tab, summary and rating will be shown on load test overview

### Create a Report

## Monitoring

{{< TODO >}}To be done...{{< /TODO >}}

