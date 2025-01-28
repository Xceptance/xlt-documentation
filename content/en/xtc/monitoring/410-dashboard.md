---
title: "Dashboard"

weight: 410
type: docs

description: >
  The starting point and overview for any monitoring project.
---

## Dashboard

On entering an XTC monitoring project, you will be presented the **Dashboard**, containing a first overview of your application's recent performance: here you will find a histogram visualizing the proportions of all execution results over the last 1-48 hours (in addition to the time window you can filter for successful, failed and aborted runs and runs with errors), the current status for each test scenario, and a quick link to the last issue for each scenario within the last 24 hours. 


{{< image src="xtc/monitoring_dashboard.png" >}}
The overview on the dashboard of a monitoring project.
{{< /image >}}

You can use the bell icon to quickly enable or disable notifications for each scenario.

{{% permission type="project" least="true" role="test manager" action="enable or disable scenario notifications on the monitoring project dashboard" %}}