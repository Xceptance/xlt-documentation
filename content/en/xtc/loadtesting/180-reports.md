---
title: "Test Reports"

weight: 180
type: docs

description: >
  How test reports for load tests can be created.
---

{{< TODO comment="check all the links!!" / >}}

## Create a Report

XTC will automatically download test results and [create a report](../../../load-testing/manual/320-test-evaluation/) at the end of the load test. These will be available in the _Results_ and the _Reports_ tabs. Both will be available as compressed archives ready for download if you need them on your local machine. All generated reports will be available inside XTC to browse and evaluate them, and XTC can also generate a link for public sharing (you can adjust when this link is supposed to expire on creating a share link, or configure this [globally for the whole project](../../010-xtc-basics/#default-sharing-settings)).

While the test is still running you can also generate [intermediate reports](../../../load-testing/manual/320-test-evaluation/#intermediate-results) by clicking _Generate Intermediate Report_ on top of the load test contents.

After the load test has finished, you can create as many custom reports with adjusted report settings as you need. 

### Custom Reports

On creating a custom report, there will be a popup to configure the report settings: you will be prompted to enter a _label_ and _description_ for the report, and may choose a _time range_ to create the report for (intermediate and final reports always cover the fulfilled testing time). The default time range is always the complete test duration, but you may determine the start time and end time by several options, similar to the [report creation](../../../load-testing/manual/540-report-options/#defining-a-reporting-timeframe) in XLT. To check whether your settings are correct, the effective report time range will be displayed at the end of this section:

{{< image src="xtc/loadtest_report_timerange.png" >}}
Basic settings for creating a new load test report: adjusting the time range.
{{< /image >}}

By clicking **Show Advanced Settings** four more sections will appear:
* _Include/Exclude Patterns_ can be defined either for [test cases](../../../load-testing/manual/540-report-options/#excluding-test-scenarios) or [agents](../../../load-testing/manual/540-report-options/#report-for-a-subset-of-agents),
* in _Report Generator Properties_ you can define completely a [custom report configuration](../../../load-testing/manual/550-report-configuration/),
* in _Merge Rules_ you can override the project's [merge rules](../../../load-testing/advanced/010-merge-rules/) (to avoid unexpected side effects we recommend to paste your complete set of merge rules here, even the ones that may have been already defined in the project), and 
* you can even add _Additional Command Line Arguments_ for report generation (learn more about [report generation by command line](../../../load-testing/manual/540-report-options/)).

These advanced settings are not trivial, so make sure you know what you're doing. 

On clicking **Accept** report creation will be started. The report will appear in the list of reports, showing a little progress icon left to its name. After the report creation has finished, you will be able to click the name to open and [read it](../../../load-testing/manual/320-test-evaluation/#reading-a-test-report).