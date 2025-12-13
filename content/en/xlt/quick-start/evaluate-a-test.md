---
title: "Evaluate a Test"

weight: 40
type: docs

description: >
  How to evaluate a load test result
---

## Generating a Test Report

When your load test has finished, you might want to render a report based on the gathered data and open it in the browser of your choice:

```bash
$> ./create_report.sh ../results/20200202-123400
$> firefox ../reports/20200202-123400/index.html
```

{{% note notitle %}}For more information on how to customize your reports, see the [Manual]({{< relref "report-options" >}}).{{% /note %}}

## Reading a Test Report

The Load and Performance Test Report gives you all the information needed for a detailed analysis of a load test run. It provides several sections, each consisting of at least one table and one or more charts visualizing the graphic development of relevant measurements over time. The sections are: the [Overview]({{< relref "test-evaluation#overview" >}}) (which contains general information, load setup, requests per second, concurrent user and error charts), [Transactions]({{< relref "test-evaluation#transactions" >}}), [Actions]({{< relref "test-evaluation#actions" >}}) and [Requests]({{< relref "test-evaluation#requests-1" >}}), [Network]({{< relref "test-evaluation#network" >}}) (all about incoming and outgoing traffic, hosts, response codes etc.), [Page Load Timings]({{< relref "test-evaluation#page-load-timings" >}}) (page loading performance of real browsers - recorded only when using `XltChromeDriver` or `XltFirefoxDriver` to run the browser), [Custom Timers]({{< relref "test-evaluation#custom-timers--values" >}}) and [Custom Values]({{< relref "test-evaluation#custom-timers--values" >}}), [External Data]({{< relref "test-evaluation#external-data" >}}), [Errors]({{< relref "test-evaluation#errors-1" >}}) and their stack traces, [Events]({{< relref "test-evaluation#events" >}}), [Agents]({{< relref "test-evaluation#agents" >}}) (which reports the resource utilization of each user agent), and details about the load test [configuration]({{< relref "test-evaluation#configuration" >}}).

You will get results and even reports out of your load test fairly quickly, but evaluating a load test and drawing the correct conclusions from the data needs some practice. For more information please see the [Manual]({{< relref "test-evaluation" >}}).






