---
title: "Monitoring"

weight: 30
type: docs

description: >
  How to set up monitoring in XTC.
---

XTC can be used to monitor your applications. By regularly running test cases, XTC will provide you an overview of the performance and availability of your application over time, providing lots of data and possibly valuable insights.

Let's dive in and set up your first monitoring project (for a complete list of options and more detailed info, please see the [user manual](../../200-manual/420-monitoring)):

## Monitoring Project Configuration

Like in load test projects, also monitoring projects needs a repository to download its test suite from. The scenarios from this test suite will then be run continously against the app, making sure the performance is stable and there are no essential features broken.

The repository is defined in the monitoring project settings: to configure the repository and authentication, select **Configuration** in the project menu on the left to check in the _Repository_ tab whether the project repository and branch for the test suite is correctly set and can be accessed using the provided authentication.

You can define the branch to use by either specifying its name (static branch) or by defining a URL of a resource from which the branch name can be extracted dynamically using a regular expression. (This may be useful if you want to make the used test scenario code dependent on your currently deployed app version.)

The following settings are for your information only and can be changed by XTC administrators only:

* _Data Persistence_ (how long certain data, like Execution History, will be persisted), and
* _Execution Environment_ (IP addresses of the machines where monitoring scenarios are running).

## Setting Up Monitoring Scenarios

The basis for all monitoring scenarios is a set of [XLT test cases](../../../load-testing/manual/060-test-development/) that will be run continuously. These tests are preferably organized in a test suite, which is located in the repository you defined in the monitoring [project configuration](#project-configuration). 

XLT tests are basically Java classes containing JUnit tests. These classes will be built by XTC so it can then run the test scenarios contained in them.

In the _Scenarios_ section you will find two tabs: _Scenarios_, which allows you to manage the monitoring scenarios for your project, and _Scenario Defaults_, where you can define default settings to be used for all monitoring scenarios. These defaults can be overwritten for each individual scenario. You might want to define **Notifications** in the default settings, i.e. manage the notification recipients or temporarily disable notifications.

To add a new monitoring scenario to your project, just click the `+` button at the top of the scenarios list. You will be asked to enter a name and description and, most importantly, the name (including class path) of the Java class in your repository that contains this scenario as a JUnit test case. 

{{< image src="xtc/monitoring_newScenario.png" >}}
Creating a new monitoring scenario.
{{< /image >}}  

The new scenario will now show up in the list. It will be enabled by default and it will automatically use the scenario default settings.  

{{% warning notitle %}}
New scenarios are enabled by default and will be run according to the default execution interval, so if you want to take some time to make adjustments, make sure to disable your scenario right after creation.  
{{% /warning %}}

By selecting "Edit" from the menu in the right of each scenario's name, you can adjust the scenario settings as needed. You might want to adjust the following:

* **Execution**: where and how the scenarios should be executed, i.e.
    * you define an interval (how often a scenario should be started, e.g. every minute), 
    * the retry behavior (retry can be active/inactive, and if it is active you can define the interval, i.e. after which time period the scenario shall be retried, and a count, i.e. how many retries are allowed before the scenario counts as failed),
    * what the maximum runtime for a scenario is (if this time is exceeded, the scenario will be aborted), and
    * the locations to run the scenario from (available locations will depend on the location of the machines that were provisioned for your monitoring project) - you may show or hide locations of unprovisioned machines here).
* **Criteria**: define _criteria_ which will be validated during the scenario execution. Violations cause the scenario to be treated as failed. You may define several criteria, each of which will be validated individually (i.e. if one criterion fails, the scenario will be treated as failed and a notification will be sent).

    You may add criteria by clicking the `+` symbol at the top of the list. You can then pick a criterion to use from a given list (e.g. Maximum Request Runtime, or Maximum Request Errors) and define a threshold for this criterion.