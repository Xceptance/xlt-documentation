---
title: "Quick Start"

weight: 20
type: docs

description: >
  How to set up monitoring in XTC.
---

Now we got you all excited about XTC's [monitoring features](../01-features), let's dive in and set up your monitoring project.

## Monitoring Configuration

### Project Configuration

The _Configuration_ of a monitoring project is very similar to the basic [project configuration](../../010-xtc-basics/#project-configuration), there are just a few special settings for this project type: 

* you need to define values for _Data Persistence_ (how long certain data, like Execution History, will be persisted), and
* enter the _Execution Environment_ (IP addresses where monitoring scenarios are running).

Another specialty for _Repository Configuration_ is that you can define which branch to use by specifying either its name (static branch) or determine the branch dynamically by defining a URL of a resource from which the branch name can be extracted using a regular expression. (This may be useful if you want to make the used test scenario code dependent on your currently deployed app version.)

### Quiet Periods

You can define _Quiet Periods_ for your monitoring projects. These are time spans in which no [notifications](#notifications) will be sent (and, if you configure this, no scenarios will run). 

To add a new quiet period, click the Plus Symbol on top of the Quiet Periods list. You may then define a label, a start time and an end time, and switch whether or not scenarios should be executed in this period. The newly created quiet period will then show up in the list. All periods in the list can be edited, disabled or removed, no matter whether they are in the future, in the past or currently active. 

## Setting Up Monitoring Scenarios

The basis for all monitoring scenarios is a set of [XLT test cases](../../../load-testing/manual/060-test-development/) that will be run continuously. These tests are preferrably organised in a test suite, which is located in the repository you defined in the monitoring [project configuration](#project-configuration). 

XLT tests are basically Java classes containing JUnit tests. These classes will be built by XTC so it can then run the test scenarios contained in them.

### Defining Scenario Defaults

In the _Scenarios_ section you will find two tabs: _Scenarios_, which allows you to manage the monitoring scenarios for your project, and _Scenario Defaults_, where you can define default settings to be used for all monitoring scenarios. These defaults can be overwritten for each individual scenario. To view or edit scenario defaults, use the toggle on the right to expand the default section, where you will find one or more editing buttons next to the settings:

{{< image src="xtc/monitoring_scenarioDefaults.png" >}}
The scenario defaults tab with expand toggle and editing button.
{{< /image >}}

#### Execution

In _Execution_ you define where and how the scenarios should be executed: 
* you define an interval (how often a scenario should be started, e.g. every minute), 
* the retry behavior (retry can be active/inactive, and if they are active you can define the interval, i.e. after which time period the scenario shall be retried, and a count, i.e. how many retries are allowed before the scenario counts as failed),
* what the maximum runtime for a scenario is (if this time is exceeded, the scenario will be aborted), and
* the locations to run the scenario from (available locations will depend on the location of the machines you added as your [Execution Environment](#project-configuration) - you may show or hide locations of unprovisioned machines here).

#### Properties

In _Properties_ you may add test properties to use for scenario execution. These properties may be entered as free text, so make sure your input is valid!

#### Notifications

In _Notifications_ you can manage the notification recipients or temporary disable notifications. You will find a toggle to deactivate notifications completely (this can be overwritten in each individual scenario). For active notifications you may define
* a _Send Threshold_, i.e. a fail count (how many executions must fail to send a notification) and the number of considered executions (how many of the last executions should be considered to validate the fail count against, e.g. if the fail count is 2 and you consider 2 executions, a notification will be sent if two consecutive executions fail, but if you consider 5 executions for the same fail count, a notification will be already sent as soon as two out of five consecutive executions fail), 
* a _Reply-To Address_ (the default reply address for received notification mails - if none is set this is a no-reply service address, but we recommend using any sensible contact in your project for this), and
* a _Subscription List_, which consists of one or more recipients for your monitoring notifications, which may be added as a user (project member with predefined mail address) or custom entry (custom mail address or phone number). For each subscriber you may choose whether to send notifications via e-mail or text message (or both). The subscriber data can be edited anytime, subscribers can also be deactivated or removed entirely.

#### Criteria

The most crucial part of the settings is to define _criteria_ which will be validated during the scenario execution. Violations cause the scenario to be treated as failed. You may define several criteria, each of which will be validated individually (i.e. if one criterion fails, the scenario will be treated as failed and a notification will be sent).

You may add criteria by clicking to `+` symbol on top of the list. You can then pick a criterion to use from a given list (e.g. Maximum Request Runtime, or Maximum Request Errors) and define a threshold for this criterion.

### Managing Existing Scenarios

In the _Scenarios_ tab you may manage the monitoring scenarios of your project, add new scenarios, edit settings for the existing ones or delete them if they are no longer needed.

You can open an overview of a scenario's current settings by clicking the scenario name or the expand button right of the scenario row in the list:

{{< image src="xtc/monitoring_scenarioOverview.png" >}}
Expanded scenario information in the scenarios list.
{{< /image >}}

By selecting "Edit" from the menu in the right of the scenario row, you can adjust the scenario settings as needed. Otherwise the [scenario defaults](#defining-scenario-defaults) will be used. The settings we explained in [scenario defaults](#defining-scenario-defaults) are available for each individual scenario, and in addition you have the basic scenario settings in _General_ (scenario name and description, and the Java class containing this scenario). 

Scenarios with overwritten settings are indicated by a small "(Defaults overwritten)" note next to the scenario name. In the settings overview, the overwritten scenarios are highlighted in blue:

{{< image src="xtc/monitoring_overwrittenSettings.png" >}}
Scenario information containing an overwritten setting.
{{< /image >}}

If you do not need a scenario you can disable it temporarily or delete it entirely by choosing these actions from the scenario's context menu.

{{< image src="xtc/monitoring_scenarioMenu.png" >}}
The context menu for a monitoring scenario.
{{< /image >}}

### Adding a New Scenario

To add a new monitoring scenario to your project, just click the `+` button on top of the scenarios list. To define a new scenario, you will be asked to enter a name and description and, most importantly, the name (including class path) of the Java class inside the repository you defined in the [project configuration](#project-configuration) that contains this scenario as a JUnit test case. 

{{< image src="xtc/monitoring_newScenario.png" >}}
Creating a new monitoring scenario.
{{< /image >}}  

The new scenario will now show up in the list. It will be enabled by default and it will automatically use the [scenario default settings](#defining-scenario-defaults) right after being created. You can overwrite these settings by [editing the scenario](#managing-existing-scenarios). 

{{% warning notitle %}}
New scenarios are automatically added in enabled mode and will run as soon as the code is built, so if you want to take some time to make adjustments, make sure to disable your scenario right after creation.  
{{% /warning %}}
