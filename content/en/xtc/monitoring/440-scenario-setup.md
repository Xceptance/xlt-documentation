---
title: "Scenario Setup"

weight: 440
type: docs

description: >
  How to set up monitoring scenarios in XTC.
---

{{% permission type="project" least="true" role="tester" action="view monitoring scenarios" %}}

{{% permission type="project" least="true" role="test manager" action="create, edit and delete monitoring scenarios and scenario defaults" %}}

## Setting Up Monitoring Scenarios

The basis for all monitoring scenarios is a set of [XLT test cases]({{< relref "/xlt/load-testing/manual/060-test-development" >}}) that will be run continuously. These tests are preferably organized in a test suite, which is located in the repository you defined in the monitoring [project configuration]({{< relref "../basics/060-project-configuration#repository" >}}). 

XLT tests are basically Java classes containing JUnit tests. These classes will be built by XTC so it can then run the test scenarios contained in them.

## Adding a New Scenario

To add a new monitoring scenario to your project, just click the `+` button at the top of the scenarios list. You will be asked to enter a **Name** (which must be unique across all scenarios in this project) and **Description** and, most importantly, the **Java Class** (including class path) in your repository that contains this scenario as a JUnit test case. 

{{< image src="xtc/monitoring_newScenario.png" >}}
Creating a new monitoring scenario.
{{< /image >}}  

The new scenario will now show up in the list. It will be enabled by default and it will automatically use the [scenario default settings]({{< relref "#defining-scenario-defaults" >}}). You can now adjust these settings as needed by [editing the scenario]({{< relref "#managing-existing-scenarios" >}}). 

{{% note notitle %}}
New scenarios are disabled by default to give you time to finish customizing the scenario settings. Don't forget to enable the scenario when done.
{{% /note %}}

## Managing Existing Scenarios

In the _Scenarios_ tab you may manage the monitoring scenarios of your project, add new scenarios, edit settings for the existing ones, quickly enable or disable scenarios or delete them if they are no longer needed.

{{< image src="xtc/monitoring_scenarios_overview.png" >}}
Overview of all existing scenarios in the project.
{{< /image >}}

You can open the detail view of a scenario by clicking the scenario name. There you 
can adjust the [scenario settings]({{< relref "#scenario-settings" >}}) and [notifications]({{< relref "#notifications" >}}) as needed. Otherwise the [scenario defaults]({{< relref "420-monitoring-configuration/#defining-scenario-defaults" >}}) will be used. 

You can reset any overwritten default setting by simply removing it via this setting's context menu or by deleting all overwritten 

{{< image src="xtc/monitoring_drop_overwritten_settings.png" >}}
Deleting the overwritten criteria settings for a scenario to use default again.
{{< /image >}}

If you do not need a scenario you can **disable** it temporarily or **delete** it entirely by choosing these actions from the scenario's context menu.

## Scenario Settings

### General 

In _General_ you set the scenario name and description, and the Java class containing this scenario. 

### Execution

In _Execution_ you define where and how the scenarios should be executed: 
* you define an interval (how often a scenario should be started, e.g. every minute), 
* the retry behavior (retry can be active/inactive, and if it is active you can define the interval, i.e. after which time period the scenario shall be retried, and a count, i.e. how many retries are allowed before the scenario counts as failed),
* what the maximum runtime for a scenario is (if this time is exceeded, the scenario will be aborted), and
* the locations to run the scenario from (available locations will depend on the location of the machines that were provisioned for your monitoring project) - you may show or hide locations of unprovisioned machines here).

### Properties

In _Properties_ you may add test properties to use for scenario execution. These properties may be entered as free text, so make sure your input is valid!

### Criteria

The most crucial part of the settings is to define _criteria_ which will be validated during the scenario execution. Violations cause the scenario to be treated as failed. You may define several criteria, each of which will be validated individually (i.e. if one criterion fails, the scenario will be treated as failed and a notification will be sent).

You may add criteria by clicking the `+` symbol at the top of the list. You can then pick a criterion to use from a given list (e.g. Maximum Request Runtime, or Maximum Request Errors) and define a threshold for this criterion.

## Notifications

In _Notifications_ you can manage the notification recipients or temporary disable notifications. You will find a toggle to deactivate notifications completely (this can be overwritten in each individual scenario). For active notifications you may define
* a _Send Threshold_, i.e. a fail count (how many executions must fail to send a notification) and the number of considered executions (how many of the last executions should be considered to validate the fail count against, e.g. if the fail count is 2 and you consider 2 executions, a notification will be sent if two consecutive executions fail, but if you consider 5 executions for the same fail count, a notification will be already sent as soon as two out of five consecutive executions fail), 
* a _Reply-To Address_ (the default reply address for received notification mails - if none is set this is a no-reply service address, so we recommend using any sensible contact in your project for this), and
* a _Subscription List_, which consists of one or more recipients for your monitoring notifications, which may be added as a user (project member with predefined mail address) or a custom entry (custom mail address or phone number). For each subscriber you may choose whether to send notifications via e-mail or text message (or both). The subscriber data can be edited anytime, subscribers can also be deactivated or removed entirely.