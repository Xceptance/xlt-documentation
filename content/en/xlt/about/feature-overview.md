---
title: "Features"

type: docs

weight: 20

description: >
    A summary of XLT's most important features.
---

## Platform Independence

Supporting only MS Windows was never an option when XLT was developed. We aimed for a tool that runs everywhere, with a preference for Linux. XLT load tests can be developed and executed on any platform with a supported JDK. Of course, you can easily run your load tests on a [distributed cloud infrastructure]({{< relref "cloud-setup" >}}). Releases include [pre-built Amazon Web Services (AWS) AMIs]({{< relref "cloud-setup#image-templates-for-aws" >}}). Images for other cloud providers and containers can be built easily (see [XLT-Packer](https://github.com/Xceptance/XLT-Packer).

## Java

XLT runs a Java application stack: XLT itself and the tests are written in Java. This allows you to apply your existing knowledge and use your preferred tool chain and IDE. Of course, there are recommendations for what works best.

## Open Source

XLT uses trusted open-source components like Apache HttpClient, HtmlUnit, JUnit, WebDriver, Apache Commons, and many more.

## Command-Line Driven

XLT load tests are typically run from the command line (on your local machine or any remote machine). Results are stored wherever the tests are executed from. Anyone with the correct password and agent IPs can attach to a running test. This makes it very easy to share work and monitor a running test from anywhere.

If you're not comfortable with the command line, the [XLT Jenkins plugin]({{< relref "#cicd-ready---jenkins-module" >}}) provides a UI for managing tests.

Xceptance is also offering an [SaaS solution]({{< relref "/xtc" >}}) to simplify scheduling, running, storing, and sharing testing work and results.

## Test Suites

XLT tests are organized into test suites that contain the code (essentially JUnit tests), data, and configuration. This makes test projects easily manageable. The code can be developed in any IDE and stored in any version control system, enabling concurrent work, providing a history, and simplifying code sharing and deployment of test suites from different machines. Test suites are completely independent of the execution engine, allowing the same code to run on multiple machines or one machine to run several test suites.

## Test Approaches

There are several approaches to writing and designing XLT tests, for example:

* DOM mode: Work with a simple non-rendering HTML engine (HtmlUnit)
* Real browser: Use a WebDriver-style test approach and scale up load testing using real browsers (Chrome, Firefox). XLT also captures page rendering times.
* Request level: For API testing, plain HttpRequests can be created and executed

Xceptance offers [example test suites]({{< relref "../test-suites" >}}) for most of these concepts, so you can get a feeling what suits your needs. This includes a test suite that uses YAML for test configuration, almost entirely skipping programming.

## Load Profiles

The [load profiles]({{< relref "load-configuration" >}}) offered by XLT are configurable, like everything else, and therefore completely flexible. Whether you need a constant user number or arrival rate is just one of many possible approaches. Additionally, you can define a ramp-up or warm-up phase for your tests or even create a fully variable load profile for any test profile you want to create. The load is freely and independently configurable for every test scenario. To simplify test run configuration, you can increase or decrease the load using the load factor feature.

Each test setup is just a set of property files that can be prepared upfront and referenced by your test run. Includes allow for easy component reuse. This allows you to prepare scenarios for dry runs, exclude test cases (e.g., no checkout currently), create a marketing day setup, or reflect an average day.

## Reports

Reporting was a primary driver for creating another load test tool. Most tools didn't offer sufficient and detailed reports or hid important data points.

XLT comes with ready-to-use test reports. These reports are easily adjustable in [content]({{< relref "report-options" >}}) and [layout]({{< relref "report-configuration" >}}). It's even possible to incorporate [custom data]({{< relref "custom-data" >}}) and reporting. Requests can be [grouped]({{< relref "merge-rules" >}}) according to your needs. It's also possible to generate [comparison]({{< relref "reports#comparison-report" >}}) and [trend reports]({{< relref "reports#trend-report" >}}) to get a better overview of how test runs have developed over time.

{{< image src="user-manual/test-report-small.png" large="user-manual/test-report.png" >}}
XLT Performance Test Report
{{< /image >}}

## Open Data Formats

XLT uses open data formats to support custom analytics and reporting. All measured data is stored in [csv files]({{< relref "../advanced/results" >}}). Intermediate data is stored in XML format (using XSLT for HTML transformation and CSS for styling).

## CI/CD Ready - Jenkins Module

XLT provides the tools to make continuous load testing an engineering habit. By offering a [Jenkins plug-in]({{< relref "ci-cd" >}}), you can run your XLT tests with every build. You don't have to deal with XLT tools directly, meaning you don't need to write shell scripts to drive the load test. Instead, you simply configure basic settings via the Jenkins UI, and the plug-in handles the necessary steps with your provided parameters. Furthermore, the plug-in automatically stores results, creates load test reports, and updates trend reports. By defining success criteria (e.g., no errors and maximum runtime below 10 seconds), you can automate the evaluation of load test results. The XLT Jenkins plug-in can also visualize long-term trends across multiple builds. Simply define the values you want to monitor over time.

## Realtime Test Monitoring

While your load test is running, you can watch the results in real-time and see how performance develops. [XLT supports Graphite]({{< relref "real-time-monitoring" >}}), a well-known data collection and graphing tool. During a load test, XLT can push selected metrics to Graphite, allowing you to watch your most important performance data instantly.

{{< image src="how-to/graphite/realtime-reporting.png" >}}
Load Testing Dashboard
{{< /image >}}

## Misc

Obviously, the features mentioned above are just a subset of the available capabilities. XLT has many more useful concepts and properties you can leverage to build rich test suites and evaluate the performance of systems under test in detail.

## Disclaimer

You might recall Script Developer, an IDE integrated into Firefox for recording, editing, and executing test automation. When Mozilla abandoned the XUL interface API, effectively breaking the add-on concept, XLT had to abandon its UI interface for test automation.

If you still need Script Developer, you can find it in older XLT versions (4.13.X and earlier). XLT can still execute exported XML test case definition files, but we strongly suggest taking the pure programming route.

To replace the test automation concept in XLT, another project was started: [Neodymium](https://github.com/Xceptance/neodymium-library), an open-source test automation project that includes popular libraries for test automation and glues them nicely together.
