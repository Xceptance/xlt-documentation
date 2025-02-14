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

XTC uses a flexible approach to configuring when an alert is triggered and to whom notifications are sent. Instead of having a single list of recipients where all recipients are notified in every case, you can define your own lists of who gets notified and how (**notification lists**) and under which circumstances these alerts should be sent (**quality sensors**). 

Notification lists are managed globally for a project, on the project configuration's _Notification Lists_ tab. 

In a simple project, the setup of notification lists might look like this:

* **On-Call Team**: Evaluates scenario failures and takes necessary actions (perhaps alerting other people).
* **Monitoring Dev Team**: Maintains the monitoring scenarios.
* **App Dev Team**: Addresses performance issues in the monitored application.

The default **Reply-To Address** for all notification e-mails can be defined in the _General_ settings on the _Notification Lists_ tab. If none is set this will be a no-reply service address, so we recommend using any sensible contact in your project for this.

### Defining a Notification List

To add a new notification list, go to the _Quality Sensors_ tab in _Configuration_ and click _New_ at the top right. You will be asked to set a name for your list and, if needed, add a description.

The newly created notification list will then show up in the overview table. 

{{< image src="xtc/monitoring_notificationLists_overview.png" >}}
Notification lists overview table.
{{< /image >}}

By clicking its context menu you may **edit** the name and description defined before, **duplicate** it in order to create another similar list or **delete** it (you will be asked for confirmation). You can also [**pause or disable**]({{< relref "#pausing-or-disabling-notifications" >}}) notifications for a single list here. 

To view and edit the subscribers and check assignments of a notification list, either click the list's name or select **view** from the context menu. 

{{< image src="xtc/monitoring_notificationLists_details.png" >}}
Notification list detail view.
{{< /image >}}

To add new subscribers to a notification list, got to the _Subscribers_ tab in the list detail view and click _Add_. You may add **XTC user subscribers** (existing XTC account with predefined contact data) or **custom subscribers** (custom mail address or phone number). For each subscriber you may choose whether to send notifications via e-mail or text message (or both). You can also add a [**slack channel**]({{< relref "../integrations/510-slack/" >}}) to the subscribers list. The subscriber data can be edited anytime, subscribers can also be deactivated or removed entirely.

### Notification List Assignments

When you are finished configuring a notification list, you can [use it in quality sensors]({{< relref "#defining-a-quality-sensor" >}}). You can check which quality sensors the notification list is assigned to in the notification list's details page on the _Assignments_ tab. You can use this to check which alerts you might affect by changing any notification list.

### Pausing or Disabling Notifications

On the project configuration's _Notification Lists_ tab, you can globally **disable** and enable notifications for the whole project. 

To **pause** notifications (and, if you configure this, pause scenario execution) for a predefined period in time you may configure [**Quiet Periods**]({{< relref "#quiet-periods" >}}).

To enable or disable notifications or define notification pauses for any **single notification list** you can use this list's context menu in the notification lists overview. The list's notification state will be indicated by a symbol in the overview table.

{{< image src="xtc/monitoring_notificationLists_pausedDisabled.png" >}}
Notification lists that (temporarily) won't receive notifications.
{{< /image >}}

## Quality Sensors 

A **quality sensor** defines the circumstances under which an alert is to be sent and which user groups are alerted. Because these metrics are applicable to multiple scenarios, they are configured project-wide, and then applied to test scenarios as needed. Multiple quality sensors can exist in a project, and multiple quality sensors can be assigned to any scenario.

### Defining a Quality Sensor

To add a new quality sensor, go to the _Quality Sensors_ tab in _Configuration_ and click _New_ at the top right. You can define a name, description, and a number of failed executions for a number of consecutive executions (for example, 1/1 raises an alert on every failure, 3/3 raises an alert if the the scenario fails 3 times in a row, 3/10 raises an alert if 3 out of 10 consecutive executions failed).

{{< image src="xtc/monitoring_qualitySensors_add.png" >}}
Adding a new quality sensor to the project.
{{< /image >}}

{{< image src="xtc/monitoring_qualitySensors_overview.png" >}}
Quality sensors overview.
{{< /image >}}

The quality sensor will then appear in the overview table. By clicking its context menu you may **edit** the basic quality sensor data defined before, **duplicate** it in order to create another sensor with similar settings, or **delete** it (you will be asked for confirmation). To view and edit the quality sensor details (e.g. the success metrics or notification list to be alerted on failure), either click the quality sensor's name or select **view** from the context menu. 

{{< image src="xtc/monitoring_qualitySensors_details.png" >}}
Quality sensor detail view.
{{< /image >}}

In the quality sensor's details' _Configuration_ tab, you can add **metrics**, which are basically a set of conditions that must all be met or the scenario will fail. Select criteria from these groups:

* **General**: Check for execution errors or scenario failures.
* **Event**: Check the timing of [page load events]({{< relref "../../xlt/load-testing/manual/600-client-performance/#metrics-for-perceived-performance" >}}) (_DomContentLoaded_, _First Contentful Paint_, _First Paint_, _Load Event_).
* **Web Vitals**: Check [user experience criteria](https://web.dev/articles/vitals) (_Cumulative Layout Shift_, _First Contentful Paint_, _First Input Delay_, _Interaction to Next Paint_, _Largest Contentful Paint_, _Time to First Byte_).
* **XLT**: Check for basic runtime limits (for transactions, actions or requests) and request errors.

Depending on the selected metric, the threshold you will be asked to select will be just "on occurrence", a time in milliseconds or some more specific parameter. All defined metrics can be edited or deleted afterwards using their context menu. 

Not meeting one of the defined thresholds may cause an alert to be raised (remember that this happens only after the number of consecutive failures you set before), which is then sent to the set of [**notification lists**]({{< relref "#notification-lists" >}}) defined below.  

### Quality Sensor Assignments

When you are finished configuring quality sensors, you can [assign them to your scenarios]({{< relref "430-scenarios/#quality-sensors" >}}) as needed. You can check which scenarios the quality sensor is assigned to in the quality sensor's details page on the _Assignments_ tab. You can use this to check which scenarios' executions you might affect by changing any quality sensor.

In a simple project, the quality sensors might look like this:

* **Preparation**: Verifies that the scenario is ready to run and notifies the Monitoring Dev Team list if necessary. Blocks the execution of the following quality sensors. (e.g. execution errors)
* **Stability**: Verifies that the scenario has run successfully and otherwise notifies the On-Call Team list and possibly the Monitoring Dev Team list. Blocks the execution of the following quality sensors. (e.g. test failures)
* **Performance**: Verifies that selected performance parameters are within specified limits. If not, notifies the App Dev Team. (e.g. runtime thresholds) {{< TODO >}}Example metrics??{{< /TODO >}}

All of these quality sensors are then assigned to each scenario in this order.

If you need a specific behavior for a single or subset of scenarios, you must define a separate quality sensor and/or notification list.

## Quiet Periods

{{% permission type="project" least="true" role="test manager" action="configure the quiet periods" %}}

To pause [notifications]({{< relref "#notification-lists" >}}) altogether, you can define **Quiet Periods** for your monitoring projects. These are time spans in which no notifications will be sent (and, if you configure this, no scenarios will run). 

To add a new quiet period, click the `+` symbol at the top of the Quiet Periods list. You may then define a label, a start time and an end time, and configure whether or not scenarios should be executed in this period. The newly created quiet period will then show up in the list. All periods in the list can be edited, disabled or removed, no matter whether they are in the future, in the past or currently active.