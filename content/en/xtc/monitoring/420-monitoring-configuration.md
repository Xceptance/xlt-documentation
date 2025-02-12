---
title: "Configuration"

weight: 420
type: docs

description: >
  Special configuration settings for monitoring in XTC.
---

{{% permission type="project" least="true" role="tester" action="view a monitoring project's configuration" %}}

{{% permission type="project" least="true" role="test manager" action="edit the configuration" %}}

## General

The _Configuration_ of a monitoring project is very similar to the basic [project configuration]({{< relref "../basics/060-project-configuration" >}}), but there are a few special settings for this project type. The following settings are for your information only and can be changed by XTC administrators only:

* _Data Persistence_ (how long certain data, like Execution History, will be persisted), and
* _Execution Environment_ (IP addresses of the machines where monitoring scenarios are running).

## Dynamic Repository Branch

{{% permission type="project" least="true" role="test manager" action="edit the repository configuration" %}}

Another specialty for _Repository_ configuration is that you can define the branch to use by either specifying its name (static branch) or by defining a URL of a resource from which the branch name can be extracted dynamically using a regular expression. (This may be useful if you want to make the used test scenario code dependent on your currently deployed app version.)

## Scenario Defaults

On the _Scenario Defaults_ tab in _Configuration_ you can define [default settings]({{< relref "430-scenarios/#scenario-settings" >}}) to be used for all monitoring scenarios. These defaults can be overwritten for each individual scenario. To edit scenario defaults, use the edit button on the right of any section:

{{< image src="xtc/monitoring_scenario_defaults.png" >}}
The scenario defaults tab with expand toggle and editing button.
{{< /image >}}

## Notification Lists

{{% TODO / %}}

XTC uses a flexible approach to configuring when an alert is triggered and to whom notifications are sent. Instead of having a single list of recipients where all recipients are notified in every case, you can define your own lists of who gets notified and how (**notification lists**) and under which circumstances these alerts should be sent (**quality sensors**). For example, scenario failures should only alert the on-call team, while performance degradations should only be sent to the application development team. 

Both notification lists and quality sensors are managed globally for a project, in the project configuration's respective tabs. 

To pause notifications altogether (and, if you configure this, pause scenario execution) you may configure [**Quiet Periods**]({{< relref "#quiet-periods" >}}).

{{< TODO >}}Below is the old text from Scenario Setup:{{< /TODO >}}

In _Notifications_ you can manage the notification recipients or temporary disable notifications. You will find a toggle to deactivate notifications completely (this can be overwritten in each individual scenario). For active notifications you may define
* a _Send Threshold_, i.e. a fail count (how many executions must fail to send a notification) and the number of considered executions (how many of the last executions should be considered to validate the fail count against, e.g. if the fail count is 2 and you consider 2 executions, a notification will be sent if two consecutive executions fail, but if you consider 5 executions for the same fail count, a notification will be already sent as soon as two out of five consecutive executions fail), 
* a _Reply-To Address_ (the default reply address for received notification mails - if none is set this is a no-reply service address, so we recommend using any sensible contact in your project for this), and
* a _Subscription List_, which consists of one or more recipients for your monitoring notifications, which may be added as a user (project member with predefined mail address) or a custom entry (custom mail address or phone number). For each subscriber you may choose whether to send notifications via e-mail or text message (or both). The subscriber data can be edited anytime, subscribers can also be deactivated or removed entirely.

## Quality Sensors 

{{< TODO >}}Text copied from releasenotes. Put notification infos on notifications page, improve that and this page by detailed instructions and screenshots.{{< /TODO >}}

A **quality sensor** defines the circumstances under which an alert is to be sent and which user groups are alerted. The configuration includes:

* A set of conditions that must all be met or the scenario will fail. Select criteria from these groups:
    * General: Check for execution errors or scenario failures.
    * Event: Check the timing of page load events.
    * Web Vitals: Check user experience criteria.
    * XLT: Check for basic runtime limits and request errors.
* The number of consecutive scenario executions that should be evaluated before an alert is raised (for example, on every failure or only if the scenario fails 3 times in a row).
* A set of notification lists to be notified in the event of an alert.

Similar to notification lists, multiple quality sensors can exist in a project. To manage quality sensors, see the new *Quality Sensors* tab on the *Configuration* page of your monitoring project.

When you are finished configuring quality sensors, you can assign them to your scenarios as needed. See the new *Quality Sensors* tab on a scenario's detail page. Note that the quality sensors of a scenario are evaluated in the order listed, and failing sensors can optionally cause the following sensors to be ignored. Use this feature, for example, to avoid alerting anyone about performance issues if the scenario fails at all.

#### Migration

The configuration of existing monitoring projects is automatically migrated. For each scenario, you will get a separate quality sensor and a separate notification list (both named like their scenario). Together they will reproduce exactly the same alerting behavior that the scenario had before.

#### Cleanup

To reduce the number of sensors and lists, go through them and try to extract a reasonable set of sensors and lists. Typically there will be only a few. In a simple project, this might look like this:

Notification Lists

* **On-Call Team**: Evaluates scenario failures and takes necessary actions (perhaps alerting other people).
* **Monitoring Dev Team**: Maintains the monitoring scenarios.
* **App Dev Team**: Addresses performance issues in the monitored application.

Quality Sensors

* **Preparation**: Verifies that the scenario is ready to run and notifies the Monitoring Dev Team list if necessary. Blocks the execution of the following quality sensors.
* **Stability**: Verifies that the scenario has run successfully and otherwise notifies the On-Call Team list and possibly the Monitoring Dev Team list. Blocks the execution of the following quality sensors.
* **Performance**: Verifies that selected performance parameters are within specified limits. If not, notifies the App Dev Team.

All of these quality sensors are then assigned to each scenario in this order.

If you need a specific behavior for a single or subset of scenarios, you must define a separate quality sensor and/or notification list.

## Quiet Periods

{{% permission type="project" least="true" role="test manager" action="configure the quiet periods" %}}

To pause [notifications]({{< relref "#notification-lists" >}}) altogether, you can define **Quiet Periods** for your monitoring projects. These are time spans in which no notifications will be sent (and, if you configure this, no scenarios will run). 

To add a new quiet period, click the `+` symbol at the top of the Quiet Periods list. You may then define a label, a start time and an end time, and configure whether or not scenarios should be executed in this period. The newly created quiet period will then show up in the list. All periods in the list can be edited, disabled or removed, no matter whether they are in the future, in the past or currently active.