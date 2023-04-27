---
title: "Audit Log"

weight: 70
type: docs

description: >
    Information about which user did what in a project.
---

{{% permission type="organization" least="true" role="organization administrator" action="view the audit log for an organization" %}}

{{% permission type="project" least="true" role="project administrator" action="view the audit log for a project" %}}

XTC comes with an Audit Log. Use this feature to learn which activity has been performed by which user at which time. This can be useful to check whether another user or the system triggered a change, and what exactly has been changed.

The _Audit Log_ page in your **organization** shows just organization-related activities while the _Audit Log_ page in a **project** lists activities for that project only. 

{{< TODO / >}} Build screenshot with neutral usernames etc.

Entries in the audit log expire automatically after 180 days.

### Filtering the Audit Log

Use the search/filter controls available at the audit log tables to narrow down the list of activities. The search bar allows to filter for user names, whereas in the filter popup you can define a time range in which to look for events as well as the event types (you can select one or more from a dropdown list).

{{< TODO / >}} Build screenshot with neutral usernames for search

{{< image src="xtc/auditlog_filter.png" >}}
Filtering the audit logs for a time range and event type.
{{< /image >}}

{{% note notitle %}}
Note that the audit log feature is not complete yet. The events which are logged and the data that is added to each event will be fine-tuned over the next few releases and more activity types might be added. We will add a comprehensive list here in the future.
{{% /note %}}



