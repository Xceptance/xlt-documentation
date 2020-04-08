---
title: "Test Evaluation"

weight: 320
type: docs

description: >
  How to execute tests, collect results, and evaluate intermediate results.
---

## Generating a Test Report

When your load test has finished, you might want to render a report based on the gathered data and open it in the browser of your choice:

```bash
$> ./create_report.sh ../results/20200202-123400
$> firefox ../reports/20200202-123400/index.html
```

{{% note notitle %}}For more infos on how to customize your reports, please have a look at the [Report Options](../540-report-customization).{{% /note %}}

## Reading a Test Report

The Load and Performance Test Report gives you all the information needed for a detailed analysis of a load test run. It provides several sections, each consisting of at least one table and one or more charts visualizing the graphic development of relevant measurements over time. Let's have a look at the top menu sections of each load test report:

### Overview

This section shows some general information about the load test (e.g. start and end time, duration), the load profile and the test comment (if any was given). It also displays a performance summary and network statistic for HTTP/HTML-based load tests.

#### Load Setup

To check whether the load setup was correct, control these points on the overview of your test report:
- **Transactions**: were the right scenarios executed?
- Does the **measurement period** match your configuration?
- Was the **thinktime** like you expected?
(The arrival rate setting does not guarantee, hence you cannot check anything here.)

{{< image src="quickstart/load-profile.png" >}}
Load Profile
{{< /image >}}

#### Concurrent User Chart

Also on your test report overview, in *General Information*, you will find the Concurrent User Chart right at the top. 
- Is the ramp up visible?
- Are there any spikes up or down? How nervous is the user chart (arrival rate)? 

{{< image src="quickstart/concurrent-users.png" >}}
Concurrent Users Chart
{{< /image >}}

#### Requests

Right below the Concurrent User Chart you'll find the Requests Per Second and Request Runtime Charts. 
- In the Requests Per Second, are there any spikes? Is the ramp up visible?
- Are the requests in the ballpark? 
- Are there runtime patterns, spikes or waves?

{{< image src="quickstart/RequestsPerSecond-2.png" >}}
Requests Per Second Chart
{{< /image >}}

{{< image src="quickstart/RequestRuntime.png" >}}
Request Runtime Chart
{{< /image >}}

#### Errors

Further below is the Transaction Errors Chart.
- Do we have any errors?
- Do we have a pattern?
- Did we expect errors?

{{< image src="quickstart/TransactionErrors.png" >}}
Transaction Errors Chart
{{< /image >}}

#### Misc

- Was the right timezone used for testing?
- Was PXX set correctly?
- Was SLA set correctly?
- Did the test run in the right time frame?
- Do the links to the results work?
- Was there any external data configured?

### Transactions

Also in the top menu you'll find the point *Transactions*. A transaction is a completed test case. The test case consists of one or more actions. The displayed transaction runtime includes the runtime of all actions within the test case, think times, and the processing time of the test code itself. If the test path of the test case is heavily randomized, the runtime of transactions might vary significantly. The average runtime shows the development of tests over time and especially helps to evaluate the outcome of long-running tests.

### Actions

An action is part of a test case and consists of prevalidation, execution, and postvalidation. The data shown here indicates the time spent in the execution routine of an action. Therefore, its runtime includes the runtime of a request, e.g. an HTTP operation, and the time necessary to prepare, send, wait, and receive the data.

### Requests

The request section is the most important statistics section when testing web applications. It directly reflects the loading time of pages or page components. Each row holds the data of one specific request. Its name is defined within the test case as timer name. The Count section of the table shows the total number of executions (Total), the calculated executions per seconds (1/s), minute (1/min), as well as projections or calculations of the executions per hour (1/h) and day (1/d). The Error section displays the total amount (Total) of errors that occurred throughout page or page component loading. The error count doesn’t include errors detected during the post-validation of the data received. Typical error situations are HTTP response codes such as 404 and 505, timeouts, or connection resets. The runtime section of the table shows the arithmetic mean, the minimum and maximum runtime encountered as well as the standard deviation of all data within that series. The runtime segmentation sections depicts several runtime segments and the number of requests within the segment’s definition. If the runtime of the test case is shorter than the displayed time period, e.g. test runtime was 30 min and the time period is hour, the numbers will be a linear projection. That means they will show a possible outcome of a longer test run if load and application behavior remained the same.

### Network

The network section covers the areas of incoming and outgoing traffic during the load test. Sent Bytes is an estimated number based on the data given to the network layer. Cookies, for instance, are not included. Received Bytes is an accurate number because it’s based on the data received and includes HTTP header information. Depending on the test runtime, the numbers per hour and per day might be estimations based on a linear projection of the available data. If the test run included web activities or other activities returning an HTTP response code, it can be found here as well. Furthermore, all hosts that participated in the test run are listed in a separate table along with the appropriate number of requests that hit this host. Last but not least, this section contains a table that breaks down the received content to their announced type.

### Page Load Timings

The Page Load Timings section offers a deeper insight into the page loading performance of real browsers. During a page load, a browser typically goes through different phases and reaches different states. This section outlines what time it took to reach a certain state. The timings listed here include primarily page load timings, but since the _perceived_ page loading performance is often influenced by how fast something is displayed on the page, paint timings are listed here as well.

{{% note notitle %}}These timings will be recorded only when using `XltChromeDriver` or `XltFirefoxDriver` to run the browser. These are special WebDriver implementations that install an extension into the browser which is able to gather all the timings and report them to XLT.{{% /note %}}

### Custom Timers & Values

The custom timers includes all timers that have been placed individually within the test code. The chart and data description is identical to the request section. In case custom samplers have been run during the test, the collected data is shown in the *Custom Values* section.

### External Data

All external data gathered by other tools during the test run is shown here according to the configuration. Please see [External Data](../../advanced/050-custom-data/) for details on how to include external data in the report.

### Errors

This section consists of a table that contains all errors and their stack traces thrown by the test cases along with an overview of all error types. 

The Overview section lists the error message and the count. It ignores the stack trace to sum up common problems without relating them to the test case. The Details section beneath lists the full stack trace next to the test case and the directory in which you can find the data dump for further analysis.

### Events

Events are used to indicate that the test has encountered a special situation that is not an error but too important to ignore or to write to the log only. This section consists of a single table that lists all events that occurred during the test run including their name, amount, detail message and the name of the test case that produced this event.

You can use the XLT API and create your own events to learn about certain conditions, such as an unavailable product that doesn't cause the test to stop but that needs your attention. A few out-of-stock products may be okay while too many of them could affect the test behavior.

### Agents

This section reports the resource utilization of each user agent in terms of CPU and memory usage. It helps to identify potential resource bottlenecks that might have influenced the load test. Note that all data is local to the JVM of the agent and therefore only covers a process view.

Look for the following (and check all the agents that were used):
- Was the overall CPU usage per box <40%?
- Also check the agent CPU usage.
- Was the memory curve nice and steady, not hitting the max value?

{{< image src="quickstart/agent-CpuUsage.png" >}}
Agents
{{< /image >}}

### Configuration

The configuration section lists the test configuration as well as the load profile used to run the test. It facilitates test reproduction and preserves the test settings for later test evaluation.

## Intermediate Results 

When you started the master controller in [interactive mode](../310-test-execution/#interactive-mode), it allows to get intermediate results, so you can download them and generate a report to see how the test is going. In automated environments, however, you would have to wait until the test run is finished before you can actually do so.

The master controller's command line menu in interactive mode looks like this:

```dos
Xceptance LoadTest 4.2.0
Copyright (c) 2005-2012 Xceptance Software Technologies GmbH. All rights reserved.
Basic License (5 virtual users). This license does not expire.


(u) Upload test suite
(s) Start agents
(a) Abort agents
(r) Show agent status
(d) Download test results
(c) Create load test report
(q) Quit
=>
```

So to get an intermediate results and report, use the options **(d)** and **(c)** while the test is running. Per default, the report will be created from the latest downloaded results and the target name will be named *\<timestamp\>-intermediate*. This can be useful to check the reasons for test failures while the test is still running. 

{{< TODO >}}TODO other usecases & insights?{{< /TODO >}}
