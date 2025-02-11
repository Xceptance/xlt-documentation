---
title: "Notifications and Quiet Periods"
linkTitle: "Notifications"

weight: 425
type: docs

description: >
  How monitoring sends notifications.
---

## Notifications

In _Notifications_ you can manage the notification recipients or temporary disable notifications. You will find a toggle to deactivate notifications completely (this can be overwritten in each individual scenario). For active notifications you may define
* a _Send Threshold_, i.e. a fail count (how many executions must fail to send a notification) and the number of considered executions (how many of the last executions should be considered to validate the fail count against, e.g. if the fail count is 2 and you consider 2 executions, a notification will be sent if two consecutive executions fail, but if you consider 5 executions for the same fail count, a notification will be already sent as soon as two out of five consecutive executions fail), 
* a _Reply-To Address_ (the default reply address for received notification mails - if none is set this is a no-reply service address, so we recommend using any sensible contact in your project for this), and
* a _Subscription List_, which consists of one or more recipients for your monitoring notifications, which may be added as a user (project member with predefined mail address) or a custom entry (custom mail address or phone number). For each subscriber you may choose whether to send notifications via e-mail or text message (or both). The subscriber data can be edited anytime, subscribers can also be deactivated or removed entirely.

## Quiet Periods

{{% permission type="project" least="true" role="test manager" action="configure the quiet periods" %}}

You can define _Quiet Periods_ for your monitoring projects. These are time spans in which no [notifications]({{< relref "440-notifications" >}}) will be sent (and, if you configure this, no scenarios will run). 

To add a new quiet period, click the `+` symbol at the top of the Quiet Periods list. You may then define a label, a start time and an end time, and configure whether or not scenarios should be executed in this period. The newly created quiet period will then show up in the list. All periods in the list can be edited, disabled or removed, no matter whether they are in the future, in the past or currently active. 

