---
title: "Dashboard"

weight: 125
type: docs

description: >
  The Dashboard page of loadtest projects and its use.
---

On entering an XTC loadtest project, you will be presented the Dashboard, which lists the most important load tests and reports as well as a quick overview over recent project activity. 

{{< image src="xtc/loadtest_dashboard.png" >}}
The dashboard of a load test project.
{{< /image >}}

This currently includes:
* two **charts** visualizing the state and rating of this project's load tests and an activity chart showing the number of load tests per day over the last six months,
* **Recent Load Tests**, i.e. all load tests that completed within the last 24 hours or, if there were none, the most recent completed load test, and upcoming (i.e. scheduled) load tests,
* **Pinned Load Tests** and
* **Pinned Load Test Reports**.

## Pinning

Load tests, load test results, and load test reports that are of special interest and worth keeping can be pinned.

* Pinning an artifact marks it as important. The pin icon makes the artifact stand out and easy to identify.
* Pinned artifacts cannot be deleted. Note that an unpinned load test with pinned results or reports cannot be deleted either.
* Pinned load tests and reports are displayed on the project dashboard.

To pin an artifact, navigate to the table containing the artifact (load tests overview/load test results/reports) and select _Pin_ from the context menu. Pinned artifacts can be unpinned from the same context menu. 

{{% permission type="project" least="true" role="tester" action="pin or unpin artifacts" %}}