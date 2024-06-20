---
title: "Audit Log"

weight: 70
type: docs

description: >
    Information about which user did what in a project.
---

{{% permission type="organization" least="true" role="organization administrator" action="view the audit log for an organization" %}}

{{% permission type="project" least="true" role="project administrator" action="view the audit log for a project" %}}

XTC comes with an Audit Log. Use this feature to learn which activity has been performed by which user, or which API calls have been performed by which client ID at which time. This can be useful to check whether another user or the system triggered a change, and what exactly has been changed.

The _Audit Log_ page in your **organization** shows just organization-related activities while the _Audit Log_ page in a **project** lists activities for that project only. Both pages show the **User Audit Log** and the **API Audit Log** on separate tabs.

**Entries in the audit log expire automatically after 180 days.**

### User Audit Log

In the user audit log, a table displays the most important details for organization- or project-related activities, such as time, activity type, user name and email. Each log entry can be expanded to show additional details, such as activity data where applicable.

{{< image src="xtc/auditlog.png" >}}
The user audit log table of a load testing project.
{{< /image >}}

### API Audit Log

The API audit log is conceptually similar to the user audit log, but contains different information. A table displays the most important details for an API call, such as time, activity type, request method, and URL. Each log entry can be expanded to show additional details, such as the client ID used, the user agent string, and additional input/output data where applicable.

{{< image src="xtc/audit_log_api.png" >}}
The API audit log table of a load testing project.
{{< /image >}}

{{% note notitle %}}
Note that only API v2 endpoints are fully instrumented. The API v1 endpoints generate certain audit events, especially on error, but lack full coverage.
{{% /note %}}

### Filtering the Audit Log

Use the search/filter controls available at the audit log tables to narrow down the list of activities. The search bar allows to filter events by user name or email address.

{{< image src="xtc/auditlog_search.png" >}}
Filtering the audit log by email address.
{{< /image >}}

In the filter popup you can define a time range in which to look for events as well as the event types you are interested in (you can select one or more from a dropdown list).

{{< image src="xtc/auditlog_filter.png" >}}
Filtering the audit log for a time range and event type.
{{< /image >}}

Search and filter can also be combined.

{{% note notitle %}}
Note that the audit log feature is not complete yet. The events which are logged and the data that is added to each event will be fine-tuned over the next releases and more activity types might be added. We will add a comprehensive list here in the future.
{{% /note %}}

