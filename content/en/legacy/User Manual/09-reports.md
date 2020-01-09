---
layout: manual
title: Test Results and Reports
---

Collected Values
----------------

When running a load test, the XLT framework automatically collects a lot
of information about the transactions, actions, and requests being
executed and certain events. Additional custom timers and events can be
added programmatically using the XLT API. Last but not least, each agent
process monitors its resource usage and logs these values as well. All
this data will later be the source for the XLT load test report.

These values are stored — separately for each test case and each virtual
user — in a file named `results/<TestCaseName>/<UserNo>/timers.csv`.
Agent resource usage data will be written to
`results/Agent-JVM-Monitor/0/timers.csv`. As the name already suggests,
the file format is CSV. See the following snippet for an example:

bc(ini).
R,Homepage.1,1537368092399,1506,false,767,6248,200,https://localhost:8443/posters/,text/html,0,145,0,670,215,885,,,,,4,,  
R,Homepage.1.4,1537368093962,66,false,900,1898,200,https://localhost:8443/posters/assets/ico/favicon.ico,image/x-icon,0,17,0,46,17,63,,,,,0,,  
R,Homepage.1.3,1537368093962,66,false,916,2922,200,https://localhost:8443/posters/assets/js/bootstrap-paginator.min.js,application/javascript,0,21,0,40,23,63,,,,,0,,  
R,Homepage.1.2,1537368093962,80,false,597,40649,200,https://localhost:8443/posters/assets/img/products/Flora\_and\_Fauna/Animals/Animals\_1.jpg,image/jpeg,0,0,65,11,65,76,,,,,0,,  
R,Homepage.1.1,1537368093961,80,false,948,52307,200,https://localhost:8443/posters/assets/img/products/Means\_of\_Transportation/Railways/Railways\_7.jpg,image/jpeg,0,13,0,61,16,77,,,,,0,,  
R,Homepage.1.5,1537368094049,8,false,565,1541,200,https://localhost:8443/posters/assets/js/posterMiniCart.js,application/javascript,0,0,6,0,6,6,,,,,0,,  
R,Homepage.1.8,1537368094055,16,false,549,1925,200,https://localhost:8443/posters/assets/js/poster.js,application/javascript,0,0,13,0,13,13,,,,,0,,  
R,Homepage.1.9,1537368094065,10,false,549,1525,200,https://localhost:8443/posters/assets/css/posters.css,text/css,0,0,8,0,8,8,,,,,0,,  
R,Homepage.1.6,1537368094049,32,false,565,20356,200,https://localhost:8443/posters/assets/css/bootstrap.min.css,text/css,0,0,11,20,11,31,,,,,0,,  
R,Homepage.1.10,1537368094079,10,false,565,10383,200,https://localhost:8443/posters/assets/js/bootstrap.min.js,application/javascript,0,0,8,1,8,9,,,,,0,,  
R,Homepage.1.7,1537368094052,46,false,565,339040,200,https://localhost:8443/posters/assets/img/products/XXL/XXL\_3.jpg,image/jpeg,0,0,16,29,16,45,,,,,0,,  
R,Homepage.1.11,1537368094088,23,false,565,315350,200,https://localhost:8443/posters/assets/img/products/XXL/XXL\_1.jpg,image/jpeg,0,0,8,13,8,21,,,,,0,,  
R,Homepage.1.13,1537368094119,10,false,565,6085,200,https://localhost:8443/posters/assets/img/xceptanceLogo.png,image/png,0,0,8,0,8,8,,,,,0,,  
R,Homepage.1.12,1537368094115,16,false,581,46905,200,https://localhost:8443/posters/assets/img/products/Food/Cold\_Cuts/Cold\_Cuts\_1.jpg,image/jpeg,0,0,12,2,12,14,,,,,0,,  
R,Homepage.1.14,1537368094122,15,false,565,143846,200,https://localhost:8443/posters/assets/img/products/XXL/XXL\_2.jpg,image/jpeg,0,0,8,6,8,14,,,,,0,,  
R,Homepage.1.15,1537368094123,15,false,565,30484,200,https://localhost:8443/posters/assets/js/jquery-2.2.4.min.js,application/javascript,0,0,9,4,9,13,,,,,0,,  
R,Homepage.1.17,1537368094138,10,false,565,917,200,https://localhost:8443/posters/assets/css/posterMiniCart.css,text/css,0,0,8,0,8,8,,,,,0,,  
R,Homepage.1.16,1537368094134,22,false,565,308545,200,https://localhost:8443/posters/assets/img/products/XXL/XXL\_4.jpg,image/jpeg,0,0,8,13,8,21,,,,,0,,  
A,Homepage,1537368092381,2380,false  
T,TVisit,1537368091385,3456,false,,

As you can see, the lines can have a different number of columns as they
represent different types of information. The following table explains
the meaning of each column depending on the data record type:

| Column | Transaction                     | Action          | Request                    | Page Load Timing | Custom Timer    | Event            | Agent Resource Usage                          | Custom Value  |
|:-------|---------------------------------|-----------------|----------------------------|------------------|-----------------|------------------|-----------------------------------------------|---------------|
| **1**  | type code (T)                   | type code (A)   | type code (R)              | type code (P)    | type code (C)   | type code (E)    | type code (J)                                 | type code (V) |
| **2**  | name                            | name            | name                       | name             | name            | name             | agent name                                    | name          |
| **3**  | start time                      | start time      | start time                 | start time       | start time      | time             | time                                          | time          |
| **4**  | run time \[ms\]                 | run time \[ms\] | run time \[ms\]            | run time \[ms\]  | run time \[ms\] | transaction name | current CPU usage (agent only) \[%\]          | value         |
| **5**  | failed flag                     | failed flag     | failed flag                | failed flag      | failed flag     | event message    | used main memory (absolute)                   | \-            |
| **6**  | exception stack trace if failed | \-              | bytes sent                 | \-               | \-              | \-               | current main memory usage (relative) \[%\]    | \-            |
| **7**  | name of last action if failed   | \-              | bytes received             | \-               | \-              | \-               | used heap memory (absolute)                   | \-            |
| **8**  | \-                              | \-              | response code              | \-               | \-              | \-               | total heap memory (absolute)                  | \-            |
| **9**  | \-                              | \-              | request URL                | \-               | \-              | \-               | current heap memory usage (relative) \[%\]    | \-            |
| **10** | \-                              | \-              | response content type      | \-               | \-              | \-               | threads in state “runnable”                   | \-            |
| **11** | \-                              | \-              | connect time \[ms\]        | \-               | \-              | \-               | threads in state “blocked”                    | \-            |
| **12** | \-                              | \-              | send time \[ms\]           | \-               | \-              | \-               | threads in state “waiting” or “timed waiting” | \-            |
| **13** | \-                              | \-              | server busy time \[ms\]    | \-               | \-              | \-               | minor GC cycles since start                   | \-            |
| **14** | \-                              | \-              | receive time \[ms\]        | \-               | \-              | \-               | minor GC time since start \[ms\]              | \-            |
| **15** | \-                              | \-              | time to first bytes \[ms\] | \-               | \-              | \-               | current minor GC CPU usage \[%\]              | \-            |
| **16** | \-                              | \-              | time to last bytes \[ms\]  | \-               | \-              | \-               | full GC cycles since start                    | \-            |
| **17** | \-                              | \-              | request ID                 | \-               | \-              | \-               | full GC time since start \[ms\]               | \-            |
| **18** | \-                              | \-              | HTTP method[1]             | \-               | \-              | \-               | current full GC CPU usage \[%\]               | \-            |
| **19** | \-                              | \-              | form data encoding[2]      | \-               | \-              | \-               | minor GC time since last update \[ms\]        | \-            |
| **20** | \-                              | \-              | form data[3]               | \-               | \-              | \-               | full GC time since last update \[ms\]         | \-            |
| **21** | \-                              | \-              | domain lookup time \[ms\]  | \-               | \-              | \-               | minor GC cycles since last update             | \-            |
| **22** | \-                              | \-              | resolved IP address(es)[4] | \-               | \-              | \-               | full GC cycles since last update              | \-            |
| **23** | \-                              | \-              | response ID                | \-               | \-              | \-               | current CPU usage (total) \[%\]               | \-            |

> Note that the file format might be changed or extended in future XLT
> releases.

XLT Result Browser
------------------

When running test cases outside Script Developer, that is either in
Eclipse as a load test or as an Ant build, you can save the page output
to disk. The relevant property is `com.xceptance.xlt.output2disk`. By
default, it is set to `never`. If you want to enable page output to
disk, copy the following lines to `dev.properties` or `test.properties`:

`\#\# Enables page output to disk. Possible values are:`

\#\# - never ….. pages are never logged

\#\# - onError … pages are logged only if the transaction had errors

\#\# - always …. pages are logged always  
com.xceptance.xlt.output2disk = always

All saved results can be found in the `<testsuite>/results` directory.
See the lines below for details of the results subdirectory structure:

bc(default). —-+ results  
\`—-+ \[testcase\]  
\`—-+ \[virtual-user\]  
\`—-+ output  
\`—-+ \[transaction-ID\]  
\|—— css  
\|—— images  
\|—-+ pages  
\| \`—- cache  
\`—— responses

In the folders for each test run
(`results/[testcase]/[virtual-user]/output/[transaction-ID]`), you find
an `index.html` containing the *XLT Result Browser*. The result browser
offers an integrated navigation to browse the complete page output of
the transaction and to look at every single request in detail. The file
`last.html` in the output folder
`results/[testcase]/[virtual-user]/output` references the result browser
for the last executed transaction of this virtual user.

The result browser navigation will only permit access to the pages of a
transaction if they are directly related to actions. Therefore, defining
actions correctly is very important to make the most effective use of
the result browser. For details on how to structure test cases and
create actions, also see [Basic
Concepts](04-framework.html#toc-basic-concepts) and [Code Structuring
Recommendations.](../how-to/how-to-structure-test-suites.html)

![XLT Result Browser - Page Output](/images/user-manual/result-browser_1-small.png "XLT Result Browser - Page Output"):/images/user-manual/result-browser\_1.png
<span class="caption">XLT Result Browser - Page Output</span>

If you click on one of the action names in the navigation, the result
browser will show the respective page. When you double-click an action
name, the navigation will expand to list all related requests. The
listed requests are color-coded with black, <span
style="color:grey;">grey</span>, <span style="color:red;">red</span>,
<span style="color:blue;">blue</span>, <span
style="color:#7D28C0;">lilac</span> and <span
style="color:green;">green</span> based on the following algorithm:

-   If the request’s status code is 301 or 302 then set its color to
    <span style="color:grey;">grey</span> since it is a Redirect.
-   If the request’s status code is 0 or greater than equal to 400 then
    set its color to <span style="color:red;">red</span> because it is
    an Error.
-   Set the color initially to black and check the content type of the
    response if it matches the following criteria:
    -   It contains the string `javascript` or is equal to
        `application/json`. If this is the case, change the color to
        <span style="color:#7D28C0;">lilac</span>.
    -   It starts with the string `image`. In this case change the color
        to <span style="color:green;">green</span>.
    -   It is equal to `text/css`. This content type denotes CSS and
        thus change the color to <span style="color:blue;">blue</span>.

> Please note that the content type is determined by the appropriate
> HTTP response header value. Thus, if an JavaScript file is delivered
> as content type `text/plain` then this request will be color-coded
> with black.

When you select one of the requests from the navigation, the page
content will be replaced by detailed information about the request and
the related response that you can access via the four tabs on top of the
page. The following information is available:

-   **Request/Response Information**
    -   General Information
    -   Request and Response Headers
    -   URL Query and POST Parameters (if any)
-   **Request Body (Raw)**
-   **Response Content**

![XLT Result Browser - Request Details](/images/user-manual/result-browser_2-small.png "XLT Result Browser - Request Details"):/images/user-manual/result-browser\_2.png
<span class="caption">XLT Result Browser - Request Details</span>

Create and Evaluate Test Reports
--------------------------------

As the most important tool for analyzing the results of a load test run,
XLT offers three types of load test reports, which are thoroughly
illustrated in the sections below:

-   **Load and Performance Test Report**
-   **Performance Comparison Report**
-   **Performance Trend Report**

To create the reports, download all load test results from the agent
controllers to the master controller. See [Run The Load
Test](08-loadtest.html#toc-run-the-load-test) for details.

As soon as you’ve downloaded the load test results to your local disk,
you can create the test reports with the XLT report generator. Enter a
command in the console following this pattern:

bc(bash).. cd <XLT>/bin  
./<report-shortname>.(sh/cmd) ../results/<downloaded-results-dir>
\[options\]

The `<downloaded-results-dir>` and `<report-shortname>` have to be
replaced with the appropriate values. For example:

bc(bash). ./create\_report.sh ../results/20110503-152920

This tells the report generator to take the specified results directory
as input for the report. By default, the generated report is saved to
`<XLT>/reports`. The report subdirectory is named after the respective
results directory.

The report generator supports these options:

-   `-o <dir>`: an alternative output directory (optional)
-   `-from <time>`: ignore results generated before the given time
    (optional)
-   `-to <time>`: ignore results generated after the given time
    (optional)

Using the `-o` option, you can specify an alternative output directory.
Keep in mind that you have to specify a target directory name including
the final directory for your report. With `-o`, the directory name is
not automatically set but your specified directory will be created
instead. For example:

bc(bash). ./create\_report.sh ../results/20110503-152920 -o
/home/user/Test\_Reports/MyLatestReport

If you’re only interested in creating a report for a particular time
range, do the following:

bc(bash). ./create\_report.sh ../results/20110503-152920 -from
20110503-152600 -to 20110503-152800

> Note that `<time>` has to be specified in the format *yyyyMMdd-HHmmss*
> and that it has to match the time zone of your local machine. By
> default, the resulting report is rendered using your machine’s time
> zone.

All this information is transferred to HTML pages that you can view
using a standard web browser. When the report is generated, which may
take a while depending on the amount of data gathered during the load
test, you will find the file `index.html` in the root of the appropriate
test report directory. Open it in a web browser to view the report.

Load and Performance Test Report
--------------------------------

The *Load and Performance Test Report* gives you all the information
needed for a detailed analysis of a load test run. It provides several
sections, each consisting of at least one table and one or more charts
visualizing the graphic development of relevant measurements over time.

![Load and Performance Test Report](/images/user-manual/load_test_report_1-small.png "Load and Performance Test Report"):/images/user-manual/load\_test\_report\_1.png
<span class="caption">Load and Performance Test Report</span>

![Load and Performance Test Report - Charts](/images/user-manual/load_test_report_2-small.png "Load and Performance Test Report - Charts"):/images/user-manual/load\_test\_report\_2.png
<span class="caption">Load and Performance Test Report - Charts</span>

### Report Sections

#### Overview

This section shows some general information about the load test (e.g.
start and end time, duration), the load profile and the test comment (if
any was given). It also displays a performance summary and network
statistic for HTTP/HTML-based load tests.

#### Transactions

A transaction is a completed test case. The test case consists of one or
more actions. The displayed transaction runtime includes the runtime of
all actions within the test case, think times, and the processing time
of the test code itself. If the test path of the test case is heavily
randomized, the runtime of transactions might vary significantly. The
average runtime shows the development of tests over time and especially
helps to evaluate the outcome of long-running tests.

#### Actions

An action is part of a test case and consists of prevalidation,
execution, and postvalidation. The data shown here indicates the time
spent in the execution routine of an action. Therefore, its runtime
includes the runtime of a request, e.g. an HTTP operation, and the time
necessary to prepare, send, wait, and receive the data.

#### Requests

The request section is the most important statistics section when
testing web applications. It directly reflects the loading time of pages
or page components. Each row holds the data of one specific request. Its
name is defined within the test case as timer name. The Count section of
the table shows the total number of executions (Total), the calculated
executions per seconds (1/s), minute (1/min), as well as projections or
calculations of the executions per hour (1/h) and day (1/d). The Error
section displays the total amount (Total) of errors that occurred
throughout page or page component loading. The error count doesn’t
include errors detected during the post-validation of the data received.
Typical error situations are HTTP response codes such as 404 and 505,
timeouts, or connection resets. The runtime section of the table shows
the arithmetic mean, the minimum and maximum runtime encountered as well
as the standard deviation of all data within that series. The runtime
segmentation sections depicts several runtime segments and the number of
requests within the segment’s definition. If the runtime of the test
case is shorter than the displayed time period, e.g. test runtime was 30
min and the time period is hour, the numbers will be a linear
projection. That means they will show a possible outcome of a longer
test run if load and application behavior remained the same.

#### Network

The network section covers the areas of incoming and outgoing traffic
during the load test. Sent Bytes is an estimated number based on the
data given to the network layer. Cookies, for instance, are not
included. Received Bytes is an accurate number because it’s based on the
data received and includes HTTP header information. Depending on the
test runtime, the numbers per hour and per day might be estimations
based on a linear projection of the available data. If the test run
included web activities or other activities returning an HTTP response
code, it can be found here as well. Furthermore, all hosts that
participated in the test run are listed in a separate table along with
the appropriate number of requests that hit this host. Last but not
least, this section contains a table that breaks down the received
content to their announced type.

#### Custom Timers & Values

The custom timers includes all timers that have been placed individually
within the test code. The chart and data description is identical to the
request section. In case custom samplers have been run during the test,
the collected data is shown in the *Custom Values* subsection below.

#### External Data

All external data gathered by other tools during the test run is shown
here according to the configuration. Please see [External
Data](09-reports.html#toc-external-data-report) for details on how to
include external data in the report.

#### Errors & Events

As its name suggests this section is made up of two parts: Errors and
Events (events are used to indicate that the test has encountered a
special situation that is not an error but too important to ignore or to
write to the log only). The first part - Errors - shows a table that
contains all errors and their stack traces thrown by the test cases
along with an overview of all error types. The second part - Events -
consists of a single table that lists all events that occurred during
the test run including their name, amount, detail message and the name
of the test case that produced this event.

#### Agents

This section reports the resource utilization of each user agent in
terms of CPU and memory usage. It helps to identify potential resource
bottlenecks that might have influenced the load test. Note that all data
is local to the JVM of the agent and therefore only covers a process
view.

#### Configuration

The configuration section lists the test configuration as well as the
load profile used to run the test. It facilitates test reproduction and
preserves the test settings for later test evaluation.

### Create A Load And Performance Test Report

To generate a load and performance test report, use this command:

bc(bash). ./create\_report.(sh/cmd) ../results/<testDataDir> \[options\]

For example:

bc(bash). ./create\_report.sh ../results/20110503-160520

As an alternative to the command above, you can also create a load and
performance test report with the `(c)` shortcut from the master
controller’s command line menu. It creates a report of the least
recently downloaded results.

### Configuring the Report Generator

#### Linking to Result Browser Directories

If an error occurred during the load test run, the corresponding error
message and stack trace will be displayed in the *Errors* section of the
load test report. If you enabled storing the visited pages to disk, you
will also find a directory name as part of the error information. To
view the visited pages, use this directory name to locate the
corresponding result browser in the results directory of the load test.

You can also access the result browsers directly from the load test
report. This greatly speeds up error analysis because you would just
have to click the directory name next to an error entry to open the
respective result browser. To make this work, you first need to ensure
that:

-   the results will be provided at the target location, and
-   the results directory will never be renamed oder moved.

Otherwise, viewers of the report experience broken links.

To let the report generator create links from the load report to the
result browsers, set the property
`com.xceptance.xlt.reportgenerator.linkToResultBrowsers` in
`<XLT>/config/reportgenerator.properties` to `true`.

By default, the report generator calculates the path from the report to
the result browsers based on the results directory (given on the report
generator’s command line) and the reports directory (either being the
default directory or the one explicitly given as command line argument).
The computed path will be a relative path if possible and an absolute
path otherwise (on Windows, if report and results are on different
drives).

Sometimes the relative path approach is not suitable, for example, if
you only send the report to your team members, not the results. In that
case, the results must be made available somewhere on the net.
Furthermore, the report generator needs to know about this location to
appropriately generate the links. To this end, you configure a results
base URI, for instance `http://myhost/results`. The URI is a *base* URI
as it’s common for the results of all your load tests. The report
generator automatically appends the name of the results directory (for
example `20121106-111751`) to this URI when generating the links to the
result browsers, so the resulting link might look like this:
`http://myhost/results/20121106-111751/ac01_00/TSearch/126/output/1352194484275/index.html`

Using a base URI, you don’t need to reconfigure the report generator
when generating the report for another load test, unless you choose to
publish the results at a totally different location. To configure the
base URI, set the property
`com.xceptance.xlt.reportgenerator.resultsBaseUri` in
`<XLT>/config/reportgenerator.properties` to the appropriate value.

#### Chart Scaling and Capping

Sometimes the runtime charts can have extremely high peaks. Since, by
default, the charts are scaled such that the whole value range is
visualized, an occasional spike may cause the interesting value range
with the majority of the values to be shown within a few pixels only.
However, there are two possibilities to get more meaningful charts.

First, you may change the *scale* of the y-axis scale of the runtime
charts from linear (the default) to logarithmic. Using this approach,
the graphs in the charts are flattened and extreme peaks are compressed
in their representation:

`com.xceptance.xlt.reportgenerator.charts.scale = logarithmic`

Second, you may *cap* the runtime charts at a certain value. There are
two methods to cap a chart. The first method is to specify the exact
value \[ms\] at which the chart is to be capped:

`com.xceptance.xlt.reportgenerator.charts.cappingvalue = 5000`

The second method is to specify a factor (a double) that, when applied
to the mean of all values in the chart, will define the ultimate capping
value:

`com.xceptance.xlt.reportgenerator.charts.cappingFactor = 5`

**Example**: The average runtime for a request is 250 milliseconds, but
a few requests ran into a timeout with 30 seconds. Setting a factor of 3
results in the y-axis being capped at 750 milliseconds (3 times the
average value).

Each capping method has its pros and cons. With a fix capping value, all
charts will have the same value range. This allows to easily compare
multiple charts visually at a qualitative level (also between different
test runs). On the other hand, if the runtimes vary significantly from
run to run, you may need to adjust the capping value often. This won’t
happen so often with a capping factor as the value range is adjusted
automatically, but comparing charts is more difficult now as this
requires you to look closely at the shown value range. So choose the
method that suits you best.

Note that, by default, the report generator tries to be smart and won’t
cap a chart if a capping is not necessary at all, for instance if the
maximum value in the chart is far below the configured capping value.
But sometimes you may want to “cap” a chart deliberately at that higher
value, for instance, to make charts comparable. Configure the wanted
capping mode with the following setting:

`com.xceptance.xlt.reportgenerator.charts.cappingMode = smart \|`
always

Sometimes it is necessary to have different capping settings for the
different types of runtime charts. For example, the capping value for
transaction charts will usually be higher than the one for requests.
That’s why the capping value/factor/mode can also be specified per chart
type, thereby overriding the default. See below for an example:

`com.xceptance.xlt.reportgenerator.charts.cappingValue = 15000  `
com.xceptance.xlt.reportgenerator.charts.cappingValue.transactions =
50000  
com.xceptance.xlt.reportgenerator.charts.cappingValue.actions = 10000  
com.xceptance.xlt.reportgenerator.charts.cappingValue.requests = 5000  
\#com.xceptance.xlt.reportgenerator.charts.cappingValue.custom = 5000 \#
commented out, so use default of 15000

> Note that if you specify both a capping value and a capping factor
> (globally or for a certain chart type), the capping value will take
> precedence.

Performance Comparison Report
-----------------------------

The *Performance Comparison Report* gives you a quick overview on
performance improvements (green color tones) and performance declines
(red color tones) between two test runs. The initial test run is labeled
**baseline**. The test run being compared to the baseline is labeled
**measurement run**.

Every section of the comparison report displays a table with performance
changes and is divided into three parts:

-   **Count**: The percentage values show the development of the
    performance in comparison to the baseline. Positive numbers in the
    count section indicate an improvement of the throughput over the
    baseline. Negative values indicate a decrease in throughput.
-   **Errors**: Positive numbers indicate an increase in the number of
    errors, negative numbers a decrease. An infinite sign indicates the
    occurrence of errors in comparison to an error-free baseline.
-   **Runtime**: Positive values indicate a poorer performance, negative
    values an improvement (smaller runtime values) over the baseline.

When you hover the mouse over the columns of the report table, you can
see the actual measurement results, which lets you determine whether or
not the reported percentage change is significant.

![Performance Comparison Report - Overview](/images/user-manual/comparison_report_1-small.png "Performance Comparison Report - Overview"):/images/user-manual/comparison\_report\_1.png
<span class="caption">Performance Comparison Report - Overview</span>

![Performance Comparison Report](/images/user-manual/comparison_report_2-small.png "Performance Comparison Report"):/images/user-manual/comparison\_report\_2.png
<span class="caption">Performance Comparison Report</span>

### Sections

#### Overview

The overview section shows general information about both load tests. It
lets you compare settings, runtime, and profiles. In the later sections,
the percentage values depict the development of the performance in
comparison to the baseline. Note that the total columns (total
throughput and total errors) might present misleading values if the load
tests used different runtime configurations. All other values are
normalized with respect to the runtime and therefore easily comparable.
Positive numbers in the count section stand for an improvement of the
throughput over the baseline, negative values for a decrease in
throughput. An increase in the number of errors is indicated with
positive numbers, a decrease with negative numbers. An infinite sign
indicates the occurrence of errors in comparison to an error-free
baseline. For all runtime numbers, positive values signify a poorer
performance, negative values an improvement, or smaller runtime values,
over the baseline. Added or removed transactions, actions, or requests
are displayed, but for them no comparison is provided.

#### Transactions

-   Count
-   Errors
-   Events
-   Runtime

#### Actions

-   Count
-   Errors
-   Runtime

#### Requests

-   Count
-   Errors
-   Runtime

#### Custom Timers

-   Count
-   Errors
-   Runtime

### Create a Performance Comparison Report

A performance comparison report can only be generated between two
existing load and performance test reports. That is, you first have to
create both of these reports.

Then you can generate a performance comparison report using the
following command:

bc(bash). ./create\_diff\_report.sh <reportDir1> <reportDir2>
\[options\]

For example:

bc(bash). ./create\_diff\_report.sh ../reports/20110503-152920
../reports/20110503-160520

Performance Trend Report
------------------------

A trend report depicts the development of the performance over time.
Multiple measurements are taken into account and evaluated against each
other. It shows how your system performs over time, how your tuning
effort pays out, and how your live environment acts under a changing
load situation if used as monitoring.

Two trend report types are available:

-   Difference to First Run and
-   Difference to Previous Run.

The Difference to the First Run reports the changes compared to your
first test run, mostly referred to as baseline. Each table column
displays the difference between your baseline run and the run you’re
interested in. The quality of your baseline run defines how valuable
this report may be. You can also look at it as a long-term performance
trend report.

The Difference to Previous Run visualizes the improvements between two
adjacent test runs, which lets you recognize how your last change or
tuning effort payed out in comparison to the previous run. It helps you
to see whether or not you are on the right track regarding the
improvement of your application’s performance. It also emphasizes sudden
improvements or set-backs and can be seen as a short-term performance
trend report.

When you hover the mouse over the columns of the trend report table, you
can see the actual measurement results. This will give you a better idea
whether or not the reported percentage change is significant. Please
keep in mind that changes up to 10% are measurement fluctuation most of
the time.

![Performance Trend Report - Overview](/images/user-manual/performance_trend_1-small.png "Performance Trend Report - Overview"):/images/user-manual/performance\_trend\_1.png
<span class="caption">Performance Trend Report - Overview</span>

![Performance Trend Report](/images/user-manual/performance_trend_2-small.png "Performance Trend Report"):/images/user-manual/performance\_trend\_2.png
<span class="caption">Performance Trend Report</span>

Similar to the other reports, the trend report is divided into the
following sections, each containing the tables and charts mentioned
above:

-   **Overview**
-   **Transactions**
-   **Actions**
-   **Requests**
-   **Custom Timers**

### Create a Performance Trend Report

To generate a performance trend report on several test reports, use the
command below:

bc(bash). ./create\_trend\_report.sh <reportDir1> … <reportDirN>
\[options\]

For example:

bc(bash). ./create\_trend\_report.sh ../reports/20110503-152920  
../reports/20110503-160520 \\  
../reports/20110503-161030 \\  
../reports/20110503-171030

Custom Values
-------------

During a load test, XLT is logging a large amount of data relevant to
the test run. Nevertheless, sometimes it comes in handy to log
additional information about the system under test (SUT) directly during
the load test run. For this purpose, XLT provides custom values.

**Example**: An eCommerce application is typically connected to several
third-party systems to use external services like credit-worthiness
check. The response time of these third-party systems can have a major
impact on the SUT’s response to the client request. By default, this
application-internal information isn’t visible to XLT during a load
test. A typical example for custom values in this context is logging the
response time of requests to third-party systems. To do so, you have to
write custom code to access the relevant sources, for instance via
remote connection to the application server. The additional data can
then be logged by XLT during the load test runtime and is automatically
integrated into the load and performance test report.

### Sampler

Custom Samplers let you query custom sources and log data (*samples*)
during the load test runtime. To this end, provide a custom sampler
class extending `com.xceptance.xlt.api.engine.AbstractCustomSampler`.
The sampler gets configured in the test suite configuration files. The
recommended location for the relevant configuration is
*project.properties*.

The provided sampler must override the `execute()` method that is called
after each interval time (see configuration). Furthermore, the sampler
might override the methods `initialize()` or `shutdown()` getting called
just once for the sampler. While `initialize()` is called before the
first call of `execute()`, `shutdown()` is called on shutdown.

The logged custom value is the return value of the `execute()` method.

The **AbstractCustomSampler** can store any ‘double’ value. The stored
value indicates the absolute value at a certain point in time. The
corresponding report chart directly shows the logged value.

### Configuration

To configure samplers, provide these properties:

`com.xceptance.xlt.customSamplers.1.class =`
com.xceptance.xlt.samples.ValueSamplerDemo  
com.xceptance.xlt.customSamplers.1.name = ValueSamplerDemo  
com.xceptance.xlt.customSamplers.1.description = This sampler logs a
custom value which is just a random number  
com.xceptance.xlt.customSamplers.1.interval = 1000  
com.xceptance.xlt.customSamplers.1.chart.title = ValueSamplerDemo  
com.xceptance.xlt.customSamplers.1.chart.yAxisTitle = Value  
\#com.xceptance.xlt.customSamplers.1.property.foo = 123  
\#com.xceptance.xlt.customSamplers.1.property.bar = abc  
…  
com.xceptance.xlt.customSamplers.9.class = …  
com.xceptance.xlt.customSamplers.9.name = …  
…

Where each property has the following meaning:

-   *com.xceptance.xlt.customSamplers.n.* is the saved key for custom
    sampler properties. Each sampler configuration block must have a
    unique number (called *n* in this example). The numbers don’t need
    to be in strictly successive order.
-   *class* points to the sampler class (including full package path).
-   *name* is a customizable name of the sampler. This name **must** be
    used when instantiating a sample class (it’s recommended to use the
    method `getSamplerName()`).
-   *interval* defines the period the sampler is started at (unit of
    time is milliseconds). The value must be positive (including 0). A
    new sampler will be started only if it is executed for the first
    time or if the previous sampler has come to an end.
-   Providing a chart title is optional. By default, the sampler name is
    used. *yAxisTitle* defines the title of the y-axis for the rendered
    chart.
-   Providing further sampler properties is optional. The properties can
    be accessed by calling the methods `getProperties()` or
    `getProperty(key)` (where *key* is the string in the configuration
    between *com.xceptance.xlt.customSamplers.n.property.* and the
    equals sign (*<span style="text-align:center;"></span>*). In the
    present example, the keys are *foo* and *bar* with the value *123*
    and *abc*). Sampler property keys **must not** contain dots or
    whitespace. Apart from that they are free in name and count.

### Example

The code below shows an example of a very simple custom sampler logging
random values:

bc(java).. public class ValueSamplerDemo extends AbstractCustomSampler  
{  
public ValueSamplerDemo()  
{  
super();  
}

@Override  
public void initialize()  
{  
// initialize  
}

@Override  
public double execute()  
{  
// generate random value based on the configured limits

// get properties  
final String lowerLimitProp = getProperties().  
getProperty(“generatedValueLowerLimit”);  
final String upperLimitProp = getProperties().  
getProperty(“generatedValueUpperLimit”);

// convert to integer  
try  
{  
final int lowerLimit = Integer.valueOf(lowerLimitProp);  
final int upperLimit = Integer.valueOf(upperLimitProp);

// return the value to be logged  
return  
XltRandom.nextInt(lowerLimit, upperLimit) +  
XltRandom.nextDouble();  
}  
catch (final NumberFormatException e)  
{  
// log 0 in case of an exception  
return 0;  
}  
}

@Override  
public void shutdown()  
{  
// clean up  
}  
}

The resulting chart is automatically integrated into the XLT performance
and load test report and can be accessed via the report navigation menu
item *Custom Values*.

![Custom sampler report](/images/user-manual/CustomSamplerReport-small.png "Custom sampler report"):/images/user-manual/CustomSamplerReport.png
<span class="caption">Custom Sampler Report</span>

External Data
-------------

As an alternative to [custom values](09-reports.html#toc-custom-values),
the XLT report generator lets you include externally gathered data in
the load test report. Use this approach if it’s impossible to access the
external data source directly during load testing time, but you would
like to see that data as part of the test report.

After a load test, you would gather any relevant data from other systems
and make it available as data files in the same results folder as your
regular load test result data. When generating the load test report, the
report generator processes these additional data files and makes that
data available in the load test report as data tables or charts on the
*External Data* page.

Note that XLT ships with a demo project for external data. This project
does not only contain a load test result set enriched with external data
files and the corresponding load test report, but also shows how to
implement custom data file parsers and how to configure the report
generator to produce the report. The demo project for external data is
located in directory `<xlt>/samples/demo-external-data`.

### Types of Data

XLT supports two different types of external data.

***Sampled data*** is data that was recorded periodically and that
changes over time. Each sampled value *must* be accompanied by a
timestamp. This type of data can be displayed as a graph, and from all
the values some basic statistics (mean, minimum, maximum) can be
calculated and shown in the report.

Example: A data file with a timestamp/CPU usage value pair per line.

***Precomputed data*** is data that results from an external value
processing and aggregation task. This data is not timestamped, as there
is only one aggregated value per data item. Any further data processing
does not make sense so that data will simply be rendered as a table.
Consequently, such data can neither be graphed, nor will any statistics
be calculated.

Example: A file that contains the total number of requests per
application tier with a tier/requests pair per line.

### Data Parsers and Value Sets

To read and interpret external data files, a *Parser* class is needed
for each type of file or format. The parser takes a line of input (with
possibly multiple values) and parses it to a generic set of values.
Typically, one line contains all data items of a value set. Sometimes,
however, the values are spread across multiple lines. Certain tools,
*iostat* for instance, produce such type of data files. In this case,
the parser has to process multiple lines of input before a value set is
complete.

Typically, a data file contains many value sets. The parsed value sets
for a certain file must have a uniform structure, i.e. they should all
contain the same data items at the same position. Otherwise the report
generator cannot process them correctly.

A value set can optionally carry a timestamp. This timestamp is valid
for all the data items in the value set. Whether or not a timestamp will
be set is defined by the parser. If the timestamp is present, the report
generator will treat the value set as sampled data, otherwise as
precomputed data. Note that if the timestamp does not lie within the
load testing period, the value set will be ignored. This way you don’t
have to cut out the interesting part from your, say, daily logs.

Later on, when configuring the data to show in the report, we need a way
to select the values of interest in a value set. A certain value can
always be accessed by an *index* (starting with 0). Alternatively, you
may also use a *name* to address a data item. However, this requires the
parser to store the item under that name. To this end, the parser could
use a hard-coded name or it somehow retrieves the name to use right from
the data file. For instance, a CSV file could provide a header line with
all the value names.

#### Predefined Parsers

XLT ships with a set of predefined parsers for CSV data files. In case
you want to process CSV files with sampled data, use one of the
following parsers:

-   **SimpleCsvParser** - Extracts the data by splitting each line into
    a set of values and uses the column index as the value name.
-   **HeadedCsvParser** - Like *SimpleCsvParser*, but takes the value
    names from the first line of the file.

Note that these two parsers require the timestamp to be in the first
column of the CSV data file.

If the external CSV data is precomputed and just needs to be displayed
as a data table, use the **PlainDataTableCsvParser** class.

#### Custom Parsers

If you need to use other input file formats than CSV, you have to write
your own custom parser class. Your class must extend
`com.xceptance.xlt.api.report.external.AbstractLineParser`.

For an example of an advanced parser class that deals with sampled data,
see the two parser implementations in the source directory of the demo
project. They process the logs of the command line tool *iostat*.

-   **IostatCpuParser** - Parses the CPU section of an *iostat* log.
-   **IostatDeviceParser** - Parses the Device section of an *iostat*
    log.

Note that if you need to write your own custom parsers, you will have to
make the compiled parser classes available in the class path of XLT
before the report generator can use them. The simplest way to do this is
to deploy the classes packaged as a JAR file to `<xlt>/lib`.

### Report Generator Configuration

Since external data is completely custom, there is also no standard or
built-in way how to interpret and display this data. That’s why you need
to help the report generator by providing a detailed configuration of
how to parse the data, choosing the values of interest, and how to
display them in the report.

All this is configured in file `externaldataconfig.xml`. This file is
expected in the results directory of the respective load test run, in
particular in subdirectory `config`, where all the other load test
configuration files live. If XLT can’t locate it there, it will try to
find it in its configuration directory `<xlt>/config`.

Because of the variety and complexity of the configuration options, the
configuration file uses XML as the file format. The basic file structure
is as follows:

bc(xml). <?xml version="1.0" encoding="UTF-8" standalone="yes"?>  
<config>  
<files>  
\<file … \>  
<headline>…</headline>  
<description>…</description>  
<tables>  
\<table … \>  
<rows>  
\<row … /\>  
\<row … /\>  
</rows>

</table>

</tables>  
<charts>  
\<chart … \>  
<seriesCollection>  
\<series … /\>  
\<series … /\>  
</seriesCollection>  
</chart>  
</charts>  
<properties>  
\<property … /\>  
</properties>  
</file>  
</files>  
</config>

As you can see, the configuration is centered around the various data
files you want to be parsed, processed, and rendered. There can be one
ore more input files. The data of each file will be presented in an own
subsection in the load test report. For each file/subsection you can
define a headline and a description, configure charts (each with one or
more data series) or data tables (each with a different row or column
definition) and additional properties to use when parsing the file or
rendering the data. See the following subsections for a more detailed
description of the core configuration elements.

**file**

Defines what file is to be processed and in which way.

-   **source** - The path to the data file. If the path is relative, it
    will be resolved against the root directory of the current result
    set. \[required\]
-   **parserClass** - The full class name of the parser class to use for
    parsing the data file. \[required\]
-   **encoding** - The character encoding to use when reading the data
    file. \[optional, defaults to “UTF-8”\]

Example:

bc(xml).
<file source="embedded_00/CustomData/data.csv" encoding="UTF-8" parserClass="com.xceptance.xlt.api.report.external.SimpleCsvParser">…</file>

**headline / description**

Simply provide the text to show as the section header and section
description.

**table**

Defines the properties of a data table.

-   **title** - The title of the table. \[required\]
-   **type** - The type of the table, either “minmaxavg” or “plain”. Use
    “minmaxavg” for sampled data only, in which case the table will show
    the mean, the minimum, and the maximum of the sampled values.
    Similarly, use “plain” for precomputed data only. \[optional,
    defaults to “minmaxavg”\]

Example:

bc(xml).

<table title="CPU Statistics" type="minmaxavg">

…

</table>

**row / col**

Defines the layout of a data table. Tables can be laid out either
row-wise or column-wise. If you use rows, the selected values will be
shown each in a new table row, otherwise in a new table column. Choose
the method that better fits your needs. Both elements provide the same
set of configuration options.

-   **valueName** - The name/index of the value to show. \[required\]
-   **title** - The title of the series. \[optional, defaults to the
    value name\]
-   **unit** - The unit of measurement. \[optional, defaults to none\]

Example:

bc(xml). <row valueName="idle" title="idle" unit="%"/>

**chart**

Defines the chart title and the axes titles.

-   **title** - The title of the chart. \[required, unique\]
-   **xAxisTitle** - The title of the x-axis. \[optional, defaults to
    “Time”\]
-   **yAxisTitle** - The title of the first/left y-axis. \[optional,
    defaults to “Values”\]
-   **yAxisTitle2** - The title of the second/right y-axis. \[optional,
    defaults to empty in which case the axis is not shown\]

Example:

bc(xml).
<chart title="QuadCore CPU" yAxisTitle="CPU Temperature [°C]" yAxisTitle2="CPU Usage [%]">…</chart>

**series**

Defines which value will be shown as a graph in the chart and how the
graph will be styled.

-   **valueName** - The name/index of the value to graph.
-   **title** - The title of the series. \[optional, defaults to value
    name\]
-   **color** - The color of the graph. \[optional, by default a color
    from a predefined color set is chosen\]
-   **axis** - The axis to use for this series, either “1” for the
    first/left axis or “2” for the second/right axis. \[optional,
    defaults to “1”\]
-   **average** - The percentage of values to use to calculate the
    moving average. \[optional, defaults to empty in which case no
    moving average graph will be shown\]
-   **averageColor** - The color to use for the automatically added
    moving average graph. \[optional, by default a color from a
    predefined color set is chosen\]

Example:

bc(xml).
<series valueName="1" title="CPU Temperature" axis="1" color="#00FF00" average="10" averageColor="#008400"/>

**property**

Defines additional configuration options. Currently, these are parser
settings only.

-   **key** - The property name. \[required\]
-   **value** - The property value. \[required\]

Example:

bc(xml). <property key="parser.csv.separator" value=","/>

The following property names are predefined by XLT, but note that your
custom parser classes may define additional properties:

-   **parser.dateFormat.pattern** - The date/time pattern to parse a
    time value. See
    [SimpleDateFormat](http://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html)
    for more information on date/time patterns. \[optional, in which
    case the time value is expected to be a Java timestamp\]
-   **parser.dateFormat.timeZone** - The time zone to use when
    interpreting time values. \[optional, defaults to GMT/UTC\]
-   **parser.csv.separator** - The field separator character for CSV
    files. \[optional, defaults to comma\]

> For tab-separated CSV files, use “	” as the value of
> *parser.csv.separator*.

See the file
`<xlt>/samples/demo-external-data/results/20110621-101041/config/externaldataconfig.xml`
for a complete example configuration. Use this file as a starting point
when adjusting the configuration to match your specific external data.

[1] These values are only present if the property
**com.xceptance.xlt.results.data.request.collect.formData** is enabled,
otherwise they are blank.

[2] These values are only present if the property
**com.xceptance.xlt.results.data.request.collect.formData** is enabled,
otherwise they are blank.

[3] These values are only present if the property
**com.xceptance.xlt.results.data.request.collect.formData** is enabled,
otherwise they are blank.

[4] This value is only present if the property
**xlt.dns.recordAddresses** is set to true, otherwise it is blank.
