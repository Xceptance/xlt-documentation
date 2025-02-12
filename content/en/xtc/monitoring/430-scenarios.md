---
title: "Scenarios"

weight: 430
type: docs

description: >
  How to set up and manage monitoring scenarios in XTC.
---

{{% permission type="project" least="true" role="tester" action="view monitoring scenarios" %}}

{{% permission type="project" least="true" role="test manager" action="create, edit and delete monitoring scenarios" %}}

## Setting Up Monitoring Scenarios

The basis for all monitoring scenarios is a set of [XLT test cases]({{< relref "/xlt/load-testing/manual/060-test-development" >}}) that will be run continuously. These tests are preferably organized in a test suite, which is located in the repository you defined in the monitoring [project configuration]({{< relref "../basics/060-project-configuration#repository" >}}). 

XLT tests are basically Java classes containing JUnit tests. These classes will be built by XTC so it can then run the test scenarios contained in them.

## Adding a New Scenario

To add a new monitoring scenario to your project, just click the `+` button at the top of the scenarios list. You will be asked to enter a **Name** (which must be unique across all scenarios in this project) and **Description** and, most importantly, the **Java Class** (including class path) in your repository that contains this scenario as a JUnit test case. 

{{< image src="xtc/monitoring_newScenario.png" >}}
Creating a new monitoring scenario.
{{< /image >}}  

The new scenario will now show up in the list. It will be enabled by default and it will automatically use the [scenario default settings]({{< relref "420-monitoring-configuration/#scenario-defaults" >}}). You can now adjust these settings as needed by [editing the scenario]({{< relref "#managing-existing-scenarios" >}}). 

{{% note notitle %}}
New scenarios are disabled by default to give you time to finish customizing the scenario settings. Don't forget to enable the scenario when done.
{{% /note %}}

## Managing Existing Scenarios

In the _Scenarios_ table you may manage the monitoring scenarios of your project, add new scenarios, **edit settings** for the existing ones, quickly **enable or disable scenarios** or their **notifications**, **pause and unpause** the execution or **delete** scenarios that are no longer needed by choosing these actions from the scenario's context menu.

{{< image src="xtc/monitoring_scenarios_overview.png" >}}
Overview of all existing scenarios in the project.
{{< /image >}}

## Scenario Details

You can open the detail view of a scenario by clicking the scenario name. There you can adjust the [scenario settings]({{< relref "#scenario-settings" >}}) and [quality sensors]({{< relref "#quality-sensors" >}}) as needed, and update basic [notification settings]({{< relref "#notifications" >}}). Otherwise the [scenario defaults]({{< relref "420-monitoring-configuration/#scenario-defaults" >}}) will be used. 

### Scenario Settings

On the _Settings_ tab, you may adjust how your scenario is run. 

You can simply switch between the default and your overwritten values for any setting by checking _Use Default_ in any settings section. You will be asked to confirm your decision.

{{< image src="xtc/monitoring_scenario_useDefault.png" >}}
Switch between default and custom values by using the _Use Default_ checkbox.
{{< /image >}}

#### General 

In _General_ you set the scenario name and description, and the Java class containing this scenario. 

#### Execution

In _Execution_ you define how the scenarios should be executed: 
* you define an **interval** (how often a scenario should be started, e.g. every minute) between 1 second and 24 hours, and
* what the **maximum runtime** for a scenario is (if this time is exceeded, the scenario will be aborted).

#### Retry

In _Retry_ you define the retry behavior of this scenario:
* retry can be active/inactive, and
* if it is active you can define the **interval**, i.e. after which time period the scenario shall be retried, and 
* a **count**, i.e. how many retries are allowed before the scenario counts as failed).

#### Locations

In _Locations_ you define where to run the scenario from (available locations will depend on the location of the machines that were provisioned for your monitoring project) - you may show or hide locations of unprovisioned machines here).

#### Properties

In _Properties_ you may add test properties to use for scenario execution. These properties may be entered as free text, so make sure your input is valid!

### Notifications

{{% permission type="project" least="true" role="test manager" action="enable or disable scenario notifications" %}}

On the _Notifications_ tab you can enable or disable notifications entirely for the current scenario if desired, and set a default reply-to address for email notifications. 

When an alert is triggered and to whom notifications are sent is defined by the scenario's [**quality sensors**]({{< relref "#quality-sensors" >}}) and the [**notification lists**]({{< relref "420-monitoring-configuration/#notification-lists" >}})) these sensors are linked to. Learn more on their respective doc pages.

### Quality Sensors

The most crucial part of the settings is to define **success metrics** which will be validated during the scenario execution. Violations cause the scenario to be treated as failed. Success metrics are defined as [quality sensors]({{< relref "420-monitoring-configuration/#quality-sensors" >}})) in the monitoring project's configuration. 

Multiple quality sensors can be assigned to a scenario. You can add them by clicking the `+` symbol at the top of the _Quality Sensors_ tab and picking one of the sensors you have defined in your project configuration.

Note that the quality sensors of a scenario are **evaluated in the order listed** (you can change the order at any time by selecting _Move Up_ or _Move Down_ from the quality sensor's context menu).

Failing sensors can optionally cause the following sensors to be ignored (check _Stops Evaluation_ on adding a new sensor or change this setting in the quality sensor's context menu). Use this feature, for example, to avoid alerting anyone about performance issues if the scenario fails completely.

{{< image src="xtc/monitoring_scenario_qualitySensors.png" >}}
List of quality sensors for a monitoring scenario.
{{< /image >}}