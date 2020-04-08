---
title: "Real Time Monitoring"

type: docs

weight: 100

description: >
    How to Watch Perfomance Data Instantly in Your Graphite Instance
---

While a load test is running, the master controller only shows basic information about the load test status. In interactive mode, you could at least download [intermediate results](../../manual/320-test-evaluation#intermediate-results) and generate a report to see how the test is going. In automated environments, however, you would have to wait until the test run is finished before you can actually do so.

Wouldn’t it be great if you could watch the results in real time and see how the performance varies over time while the test is still running? To this end, we have added the support of Graphite, a well-known data collection and graphing tool. During a load test, XLT could push selected metrics to Graphite. Using Graphite’s graphing capabilities or another graphing/dashboard tool on top of Graphite, you can watch the most important performance data instantly:

{{< image src="how-to/graphite/realtime-reporting.png" large="how-to/graphite/realtime-reporting.png" >}}
Load Testing Dashboard
{{< /image >}}

See below for the XLT settings needed to enable and configure real-time reporting:

```bash
## Whether real-time reporting is enabled (default: false).
xlt.reporting.enabled = true

## The time period [s] after which updated metrics are sent to the 
## reporting system (default: 5).
xlt.reporting.interval = 15

## The text to be prepended to the name of any reported metric (default: "").
## Use this prefix to create a separate metrics branch for each XLT load test
## project in your reporting system.
xlt.reporting.metricNamePrefix = xlt.MyProject.

## The Graphite Carbon server's host and port (default: localhost/2003).
xlt.reporting.graphite.host = my.graphite.machine
xlt.reporting.graphite.port = 2003
```
If enabled, XLT reports the following metrics to Graphite:

- runtime statistics (in total and per name), errors (in total and per name) and counts (in total) for
	- transactions,
	- actions,
	- requests, and
	- custom timers,
- arrival rates (in total and per transaction name),
- bytes/sent received (in total and per request name),
- event count (in total), and
- agent metrics such as the total CPU usage and heap usage.

Since not all performance details are sent to Graphite, you will only get a first impression of the application’s behavior. For a detailed analysis, the load test report is still the tool of choice.

{{% note notitle %}}
[Graphite](http://graphite.readthedocs.org/en/latest/install.html) is not bundled with XLT. You need to install, configure, and run it yourself.
{{% /note %}}