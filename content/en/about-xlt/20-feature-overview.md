---
title: "Features"

type: docs

weight: 20

description: >
    All about the most important features in a nutshell.
---

## Platform Independence
Going MS Windows only was never an option when XLT was developed. We wanted a tool that runs everywhere with a preference for Linux. XLT load tests can be developed and executed on every platform with a supported JDK. Of course, you can easily run your load tests on a [distributed cloud infrastructure](../../load-testing/advanced/060-cloud-setup/). Releases come with [pre-built Amazon Webservice AMIs](../../load-testing/advanced/060-cloud-setup/#image-templates-for-aws). Images for other cloud providers and containers can be built easily (see [XLT-Packer](https://github.com/Xceptance/XLT-Packer).

## Java 
XLT runs a Java application stack: XLT is written in Java and tests are written in Java, too. That way, you can apply your existing knowledge, use your own favorite tool chain, and favorite IDE. Of course, there are recommendations for what works best.

## Open Source
XLT uses trusted open source components such as Apache HttpClient, HtmlUnit, JUnit, WebDriver, Apache Commons, and many more.

## Command-Line Driven
XLT load tests are typically run from the command line (on your local machine or any remote machine). Results are stored wherever the tests are executed from. Anyone with the right password and agent IPs can attach to a running test. This way, it is very easy to share work and watch a running test from wherever you are. 

If the command line is not your cup of tea, the [XLT Jenkins plugin](#ci-ready---jenkins-module) offers a bit of UI to manage tests. 

Xceptance is working on a SaaS offering to make it more comfortable to schedule, run, store, and share testing work and results.

## Test Suites
XLT tests are organized in test suites which hold the code (basically JUnit tests), data, and configuration. This makes test projects easily manageable, as the code can be developed in any IDE and put into any version control system, which enables concurrent work on the test code, offers a history and overall makes it very simple to share code and deploy test suites from different machines. The test suites are completely independent from the execution engine, so it is possible to run the same code on several machines, or have one machine run several test suites.

## Test Approaches
There are several approaches how to write and design XLT tests, for example:

* DOM mode: Work with a simple non-rendering HTML engine (HtmlUnit)
* Real browser: Use a WebDriver style test approach and scale up load testing using real browser (Chrome, Firefox). XLT will even capture page rendering times. 
* Request level: For API testing, plain HttpRequests can be built and executed

Xceptance offers [example test suites](../../load-testing/test-suites/) for most of these concepts, so you can get a feeling what suits your needs. That includes a test suite that is using YAML for the configuration of the test and skips programming almost entirely. 

## Load Profiles
The [load profiles](../../load-testing/manual/470-load-configuration/) offered by XLT are configurable like everything else and therefore totally flexible. Whether you need constant user number or arrival rate is just one of many possible approaches; in addition to that, you can define a rampup or warmup phase for your tests or even create a fully variable load profile for whatever test profile you want to create. The load is freely and independently configurable for every test scenario. To make your test runs easier to configure, you can increase or decrease the load using the load factor feature. 

Each test setup is just a set of property files which can be prepared upfront and will then be referenced by your test run. Includes allow to reuse components easily. So you could prepare scenarios for dry-runs, exclude test cases (like, no checkout right now), compose a marketing day setup, or get an average day reflected.

## Reports
Reporting was one of the main drivers behind starting another load test tool. Most tools didn't offer sufficient and detailed reports or were hiding important data points.

XLT comes with ready to use test reports. These reports are easily adjustable in [content](/load-testing/manual/540-report-options/) and [layout](../../load-testing/manual/550-report-configuration/), it is even possible to incorporate [custom data](../../load-testing/advanced/050-custom-data/) and reporting. Requests can be [grouped](../../load-testing/advanced/010-merge-rules/) according to your needs, and it is also possible to generate [comparison](../../load-testing/manual/530-reports/#comparison-report) and [trend reports](../../load-testing/manual/530-reports/#trend-report) to get a better overview how test runs developed over time.

{{< image src="user-manual/test-report-small.png" large="user-manual/test-report.png" >}}
XLT Performance Test Report
{{< /image >}}

## Open Data Formats
XLT uses open data formats to aid custom analytics and reporting. All measured data is held in [csv files](../../load-testing/advanced/150-results/), intermediate data is stored in an XML format (using XSLT for transformation into HTML and CSS for styling).

## CICD Ready - Jenkins Module
XLT provides the tools to make continuous load testing an engineering habit: by offering a [Jenkins plug-in](../../load-testing/advanced/080-ci-cd/), you can run your XLT test with every build. You don’t have to deal with XLT tools directly, that is you don’t need to write shell scripts to drive the load test - instead, you simply configure some basic settings via the Jenkins UI and the plug-in will then take care of carrying out the necessary steps with the parameters you have provided. Furthermore, the plug-in automatically stores the results, creates load test reports, and updates trend reports for you. By defining success criteria (such as, no errors and maximum runtime below 10 seconds) you can even automate the evaluation of the load test results. The XLT Jenkins plug-in can even visualize long-term trends across multiple builds. Simply define the values that you would like to watch over time.

## Realtime Test Monitoring
While your load test is running it is possible to watch the results in real time and see how the performance develops: [XLT supports Graphite](../../load-testing/advanced/100-real-time-monitoring/), a well-known data collection and graphing tool. During a load test, XLT can push selected metrics to Graphite so you can watch your most important performance data instantly.

{{< image src="how-to/graphite/realtime-reporting.png" >}}
Load Testing Dashboard
{{< /image >}}

## Misc
Obviously all the features mentioned above are just the tip of the iceberg. XLT has many more cool concepts and properties you can exploit to built rich test suites and evaluate the performance of systems under test in detail.

## Disclaimer
You might recall the Script Developer. An IDE integrated in Firefox to record, edit, and execute test automation. When Mozilla abandoned the XUL-interface API and effectively broke the add-on concept in half, XLT had to abandon the UI interface for test automation. 

If you still need the Script Developer, you can find it in older XLT versions (4.13.X and older). XLT can still execute the exported XML test case definition files, but we strongly suggest to go the pure programming route.

To replace the test automation concept in XLT, another project has been started: <a href="https://github.com/Xceptance/neodymium-library" target="_blank">Neodymium</a>, an open source test automation project that includes popular libraries for test automation and glues them nicely together. 