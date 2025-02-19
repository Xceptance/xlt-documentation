---
title: "Dashboard"

weight: 410
type: docs

description: >
  The starting point and overview for any monitoring project.
---

On entering an XTC monitoring project, you will be presented the **Dashboard**, containing a first overview of your application's recent performance: here you will find a histogram visualizing the proportions of all execution results over the last 1-48 hours (in addition to the time window you can filter for successful, failed and aborted runs and runs with errors), the current status for each test scenario, and a quick link to the last issue for each scenario within the last 24 hours. 


{{< image src="xtc/monitoring_dashboard.png" >}}
The dashboard of a monitoring project.
{{< /image >}}

On a scenario tile, you can use the _Bell_ icon to quickly enable or disable notifications for this scenario. To pause a scenario for a specified time, click the _Clock_ icon, or the _Paused_ icon to finish the pause.

{{% permission type="project" least="true" role="test manager" action="enable or disable scenario notifications and pause or unpause scenarios on the monitoring project dashboard" %}}