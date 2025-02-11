---
title: "Quality Sensors"

weight: 428
type: docs

description: >
  How to define the circumstances under which an alert is to be sent and which user groups are alerted.
---

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


