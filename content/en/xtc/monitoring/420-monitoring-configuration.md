---
title: "Configuration"

weight: 420
type: docs

description: >
  Special configuration settings for monitoring in XTC.
---

## Monitoring Configuration

{{% permission type="project" least="true" role="tester" action="view a monitoring project's configuration" %}}

### Read-Only Settings

The _Configuration_ of a monitoring project is very similar to the basic [project configuration]({{< relref "../basics/060-project-configuration" >}}), but there are a few special settings for this project type. The following settings are for your information only and can be changed by XTC administrators only:

* _Data Persistence_ (how long certain data, like Execution History, will be persisted), and
* _Execution Environment_ (IP addresses of the machines where monitoring scenarios are running).

### Dynamic Repository Branch

{{% permission type="project" least="true" role="test manager" action="edit the repository configuration" %}}

Another specialty for _Repository Configuration_ is that you can define the branch to use by either specifying its name (static branch) or by defining a URL of a resource from which the branch name can be extracted dynamically using a regular expression. (This may be useful if you want to make the used test scenario code dependent on your currently deployed app version.)

### Defining Scenario Defaults

On the _Scenario Defaults_ tab in _Configuration_ you can define [default settings]({{< relref "430-scenario-setup/#scenario-settings" >}}) and [manage notification settings]({{< relref "425-notifications" >}}) to be used for all monitoring scenarios. These defaults can be overwritten for each individual scenario. To view or edit scenario defaults, use the toggle on the right to expand the default section, where you will find one or more editing buttons next to the settings:

{{< image src="xtc/monitoring_scenario_defaults.png" >}}
The scenario defaults tab with expand toggle and editing button.
{{< /image >}}

## Notification Lists, Quality Sensors and Quiet Periods

{{% permission type="project" least="true" role="test manager" action="configure notification lists, quality sensors and quiet periods" %}}

XTC uses a flexible approach to configuring when an alert is triggered and to whom notifications are sent. Instead of having a single list of recipients where all recipients are notified in every case, you can define your own lists of who gets notified and how (**notification lists**) and under which circumstances these alerts should be sent (**quality sensors**). For example, scenario failures should only alert the on-call team, while performance degradations should only be sent to the application development team. 

Both notification lists and quality sensors are managed globally for a project, in the project configuration's respective tabs. To learn more, see [**Notification Lists**]({{< relref "425-notifications" >}}) and [**Quality Sensors**]({{< relref "428-quality-sensors" >}}).

To pause notifications altogether (and, if you configure this, pause scenario execution) you may configure [**Quiet Periods**]({{< relref "425-notifications/#quiet-periods" >}}).