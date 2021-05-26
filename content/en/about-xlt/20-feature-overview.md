---
title: "Features"

type: docs

weight: 20

description: >
    All about the features offered by XLT.
---

## Platform Independence and Java
Going Windows only was never an option when we developed XLT. We wanted a tool that runs on any stack especially on Linux. XLT load tests may be developed on any platform with a JDK, and XLT itself is designed to run on any platform with a JDK, so you can easily run your load tests on a [distributed cloud infrastructure](../../load-testing/advanced/060-cloud-setup/). Our releases come with [pre-built AWS cloud images](../../load-testing/advanced/060-cloud-setup/#image-templates-for-aws) with XLT installed, and other providers are easy to set up as well. 

## Open Source
XLT relies on trusted open source components. It mainly relies on the Java application stack: XLT is written in Java, and tests are written in Java, too. That way, you can utilize your existing knowledge by using your own tool chain and your favorite IDE for load testing. 

Nothing proprietary is needed - the tool's core relies on well proven open source libraries such as HtmlUnit, Apache HttpClient, Apache Commons, Selenium and others. XLT itself went open source, too, to make it more accessible: the whole tool is published on Github under the Apache License 2.0, while Xceptance continues to maintain and extend XLT as before. We will build releases and publish them regularly.

## Command line driven
XLT tests are typically run from the command line (on your local machine or any remote machine). Results are stored wherever the test is run, and anyone with the right password and IPs can attach to a running test. This way, it is very easy to share the work or watch your running test from wherever you are. 

If the command line is not your cup of tea, the [XLT Jenkins plugin](#ci-ready---jenkins-module) offers you a bit of UI to manage your tests from, and we are currently improving our test center (stay tuned!) which also offers a nice UI for your test management.

## Test Suite Concept
XLT tests are organized in test suites which hold the code (basically JUnit tests), data and configuration. This makes test projects easily manageable, as the code can be developed in any IDE and put into any version control system, which enables concurrent work on the test code, offers a history and, overall, makes it very simple to share the code and deploy test suites on different machines. The test suites are completely independent from the execution engine, so it is possible to run the same code on several machines, or have one machine run several test suites.

## Test Approaches
There are multiple approaches to write XLT tests, for example:

* DOM mode 
* Real Browser (Chrome)
* WebDriver API
* XLT API - Action API
* No Coding: YAML
* REST

Xceptance offers [example test suites](../../load-testing/test-suites/) for most of these concepts, so you can get a feeling what suits your needs.

## Flexible Load Profiles
The [load profiles](../../load-testing/manual/470-load-configuration/) that are used in XLT load tests are configurable like everything else and therefore totally flexible. A constant user number or arrival rate is just one of many possible approaches; in addition to that, you can define a rampup or warmup phase for your test or even create a fully variable load profile for whatever test runtime you need. The load is freely configurable per test scenario, and to make your test run even more easily scalable, you can just increase or decrease the load using the load factor feature. 

Each test setup is just a set of property files which can be prepared upfront and will then be referenced by your test run. Includes allow to reuse components easily. So you could prepare scenarios for dry-runs, exclude test cases (like, no checkout right now), compose a marketing day setup or get an average day reflected.

## Reports
XLT load tests come with ready to use test reports. These reports are easily adjustable in [content](/load-testing/manual/540-report-options/) and [layout](../../load-testing/manual/550-report-configuration/), it is even possible to incorporate [custom data](../../load-testing/advanced/050-custom-data/) and reporting. Requests can be [grouped](../../load-testing/advanced/010-merge-rules/) according to your needs, and it is also possible to generate [comparison reports](../../load-testing/manual/530-reports/#comparison-report) or [trend reports](../../load-testing/manual/530-reports/#trend-report) to get an overview how test runs developed over time.

{{< image src="user-manual/test-report-small.png" large="user-manual/test-report.png" >}}
XLT Performance Test Report
{{< /image >}}

## Open Data Formats
XLT relies on open data formats for custom analytics, modification, and reporting. All measured data is held in [csv files](../../load-testing/advanced/150-results/), intermediate data is stored in xml format (using xslt for transformation into html and css for styling). Like this, you can easily search the accumulated data for things outside the ordinary. 

## CI ready - Jenkins module
XLT provides the tools to make continuous load testing an engineering habit: by offering a [Jenkins plug-in](../../load-testing/advanced/080-ci-cd/), you can run your XLT test with every build. You don’t have to deal with XLT tools directly, that is you don’t need to write shell scripts to drive the load test - instead, you simply configure some basic settings via the Jenkins UI and the plug-in will then take care of carrying out the necessary steps with the parameters you have provided. Furthermore, the plug-in automatically stores the results, creates load test reports, and updates trend reports for you. By defining success criteria (such as, no errors and maximum runtime below 10 seconds) you can even automate the evaluation of the load test results. The XLT Jenkins plug-in can even visualize a long-term trend across multiple builds. Simply define the values that you would like to watch over time.

## Realtime test monitoring
While your load test is running it is possible to watch the results in real time and see how the performance varies over time: [XLT supports Graphite](../../load-testing/advanced/100-real-time-monitoring/), a well-known data collection and graphing tool. During a load test, XLT can push selected metrics to Graphite so you can watch your most important performance data instantly.

{{< image src="how-to/graphite/realtime-reporting.png" >}}
Load Testing Dashboard
{{< /image >}}

## Disclaimer
You might recall the Script Developer. An IDE integrated in Firefox to record, edit, and execute test automation. When Mozilla abandoned the XUL-interface API and effectively broke the add-on concept in half, XLT had to abandon its UI interface for test automation as well. 

If you still need the Script Developer, you can find it in older XLT version (4.13.X and older). XLT can still execute the exported XML test case definition files, but we strongly suggest to go the pure programming route.

To replace the test automation concept in XLT, another project has been started: <a href="https://github.com/Xceptance/neodymium-library" target="_blank">Neodymium</a>, an open source test automation project that includes popular libraries for test automation and glues them nicely together. 