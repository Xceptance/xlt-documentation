---
title: "Real Time Monitoring"

type: docs

weight: 100

description: >
    How to Watch Performance Data Instantly in Your Graphite Instance
---

While a load test is running, the master controller only shows basic information about the load test status. In interactive mode, you could at least download [intermediate results]({{< relref "../manual/320-test-evaluation#intermediate-results" >}}) and generate a report to see how the test is going. In automated environments, however, you would have to wait until the test run is finished before you can actually do so.

XLT supports several ways that enable you to watch the results in real time and see how the performance varies over time while the test is still running:

## Real-Time Reporting of Errors and Events via OpenTelemetry

XLT can be configured to report error and event data to an external system while the load test is still running. This allows you to analyze errors and events as they occur without having to download the full result data and to create a load test report.

XLT uses [OpenTelemetry](https://opentelemetry.io/) to report this data, specifically via OpenTelemetry's *Logs* interface. As the receiving system, we recommend using an [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/). Configure this collector as needed to further process and export the data to your actual log storage, such as Google Cloud Logs.

If you want to use this feature, see below for what you need to configure in your load test suite:

```properties
### Whether OpenTelemetry real-time reporting is enabled.
xlt.reporting.otel.enabled = true

### Log Record Exporter
otel.logs.exporter = otlp
otel.exporter.otlp.endpoint = http://localhost:4318
otel.exporter.otlp.protocol = http/protobuf
## Custom headers
otel.exporter.otlp.headers =

### Batch Log Record Processor
#otel.blrp.schedule.delay = 2000
#otel.blrp.max.queue.size = 2048
#otel.blrp.max.export.batch.size = 512

## Resource attributes
otel.resource.attributes = project=MyShop,loadTest=42
```

After enabling the feature, you need to configure how to reach your OpenTelemetry collector. You can then define custom headers, e.g. with authorization information, etc. Optionally, you can also reconfigure the OpenTelemetry batch log record processor.

Finally, define a set of custom attributes to be attached to all sent log entries. Attributes are OpenTelemetry's equivalent of metadata. They are specified as a list of key/value pairs.

Use attributes to categorize the log entries in your log storage backend, for example, to separate the log entries emitted by one load test from the log entries emitted by other load tests.

See the [OpenTelemetry for Java Configuration](https://opentelemetry.io/docs/languages/java/configuration/) page for all available configuration options.

{{% note notitle %}}
Please note that this feature is currently considered experimental. However, we have released it publicly to allow a wider audience to try it out and provide feedback. So if you use this feature, be prepared for possible changes.
{{% /note %}}

## Performance Graphing via Graphite

Another possibility for real-time monitoring is Graphite, a well-known data collection and graphing tool. During a load test, XLT could push selected metrics to Graphite. Using Graphite’s graphing capabilities or another graphing/dashboard tool on top of Graphite, you can watch the most important performance data instantly:

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

### Page load timings in Graphite

In older versions of XLT, page load timings were reported as custom timers to Graphite. Since XLT 4.12.0, page load timing data is promoted from custom timers to a dedicated data type (a bug caused the data not to be sent to Graphite at all before this was fixed in v5.1.2). 

This data is stored to the "pageLoadTimings" subtrees. The bucket name structure for both specific page load timing records and summary records is similar to that of actions and custom timers. See below for an example how page load timing data is reported to Graphite:

```txt
xlt.Posters.ac001.pageLoadTimings.Homepage__FirstContentfulPaint_.errors 0 1592575693
xlt.Posters.ac001.pageLoadTimings.Homepage__FirstContentfulPaint_.runtime.max 543 1592575693
xlt.Posters.ac001.pageLoadTimings.Homepage__FirstContentfulPaint_.runtime.mean 543.00 1592575693
xlt.Posters.ac001.pageLoadTimings.Homepage__FirstContentfulPaint_.runtime.min 543 1592575693
...
xlt.Posters.ac001.summary.pageLoadTimings.count 18 1592575693
xlt.Posters.ac001.summary.pageLoadTimings.errors 0 1592575693
xlt.Posters.ac001.summary.pageLoadTimings.runtime.max 543 1592575693
xlt.Posters.ac001.summary.pageLoadTimings.runtime.mean 270.17 1592575693
xlt.Posters.ac001.summary.pageLoadTimings.runtime.min 20 1592575693
```
