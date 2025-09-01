---
title: "Quiet Periods"

weight: 425
type: docs

description: >
  How to pause notifications for a monitoring project.
---

{{% permission type="project" least="true" role="test manager" action="configure the quiet periods" %}}

To pause [notifications]({{< relref "420-monitoring-configuration/#notification-lists" >}}) altogether, you can define **Quiet Periods** for your monitoring projects. These are time spans in which no notifications will be sent (and, if you configure this, no scenarios will run). 

To add a new quiet period, click the `+` symbol at the top of the _Quiet Periods_ list. You may then define a label, a start time and an end time, and configure whether or not scenarios should be executed in this period. The newly created quiet period will then show up in the list. All periods in the list can be edited, disabled or removed, no matter whether they are in the future, in the past or currently active.

XLT also allows you to pause notifications [for single scenarios]({{< relref "430-scenarios/#notifications" >}}) or for single [notification lists]({{< relref "420-monitoring-configuration/#pausing-or-disabling-notifications" >}}) only, or [disable notifications entirely]({{< relref "420-monitoring-configuration/#pausing-or-disabling-notifications" >}}) for the whole project.