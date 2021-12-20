---
title: "Test Reports"

weight: 180
type: docs

description: >
  How test reports for load tests can be created.
---

## Creating a Report

XTC will automatically [create a report](../../../load-testing/manual/320-test-evaluation/) from the [results](../175-results) downloaded at the end of the load test. You can find the generated report in the _Reports_ tab, where it will be available as compressed archive ready for download if you need it on your local machine. 

All generated reports will be available inside XTC to browse and evaluate them, and XTC can also generate a link for [public sharing](#sharing-a-report).

## Intermediate Reports

While the test is still running you can also generate [intermediate reports](../../../load-testing/manual/320-test-evaluation/#intermediate-results) by clicking _Generate Intermediate Report_ on top of the load test contents.

You will be prompted to select which result artifacts should be downloaded. The Intermediate Report will always be created for the complete runtime of the test up to the point of report creation, including the ramp up. Clicking _Accept_ will start the report creation (which may take several minutes).

{{< image src="xtc/loadtest_intermediateReport.png" >}}
Prompt for creating an intermediate test report
{{< /image >}}

Creating an intermediate report also generated an intermediate [test result](../175-results) which can be used to create a [custom intermediate report](../175-results/#creating-a-report-from-results) using settings other than the defaults.

## Custom Reports

After the load test has finished, you can create as many custom reports with adjusted report settings as you need. 

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

On clicking _Accept_ report creation will be started (this may take several minutes depending on the result size). The report will appear in the list of reports, showing a little progress icon left to its name. After the report creation has finished, you will be able to click the name to open and [read it](../../../load-testing/manual/320-test-evaluation/#reading-a-test-report).

To give you a quicker overview, XTC enables you to already open reports while their creation is still in progress (as soon as all report html pages and the charts on the overview page are available). You will notice the different icon next to the report name in the reports overview:

{{< image src="xtc/loadtest_report_inProgress.png" >}}
Topmost report is still incomplete and currently being uploaded
{{< /image >}}

### Checking Report Settings

The options used for creating a custom load test report are stored by XTC, and you can review them later on. Just open the context menu of the custom report in question and choose _Show settings_:

{{< image src="xtc/loadtest_showReportSettings.png" >}}
Show settings used for creating for a custom test report.
{{< /image >}}

{{< image src="xtc/loadtest_customReportSettings.png" >}}
Settings from an example report
{{< /image >}}

## Sharing a Report

XTC simplifies sharing your reports with XTC users as well as people outside the organization. 

If your [role within the load test project](../../050-projects/#user-roles-within-a-project) is at least that of a **reviewer**, you may view all information about a load test, including every report that was created for any test run. If you are a **project administrator**, you can add XTC users as reviewers to the project if you want them to have access to all reports.

To share reports with people outside XTC, you can create a **Sharing Link** for each report. By clicking _Share_ in the context menu of the report to be shared in the reports tab, a prompt will open and you may select whether to use the [default sharing settings](../120-load-project-configuration/#default-sharing-settings) or define an expiration time specifically for this report link. 

{{< image src="xtc/loadtest_sharingLink_share.png" >}}
Creating a public sharing link
{{< /image >}}

{{< image src="xtc/loadtest_sharingPopup_noDefault.png" >}}
Creating a sharing link not using the default expiration settings
{{< /image >}}

Clicking _Create Share_ will create a link for public sharing, which will be displayed below the report link as _Shared Link_. Anyone with the link can access the report without authentication. All links are time limited and will expire automatically. Links don't display any project details and can be invalidated at any time manually by the unshare option (in the context menu of the shared report).

{{% note notitle %}}
The sharing link is different from the report link (the report link does _not_ become public by sharing), so please make sure to copy the right one of them, as only the sharing link is publicly accessible.
{{% /note %}}

You can **change the expiration time** of an already shared report later if needed, by either updating the project's [default sharing settings](../120-load-project-configuration/#default-sharing-settings) (which will update expiration times for all reports shared by using this default), or by clicking _Edit Share_ in the report's popup menu and selecting a new expiration date. The link won't be changed by this, just its lifetime. If you want to invalidate a shared link, select the _Unshare_ option instead. To remove all custom shared links at once, use the option to _delete existing custom share links_ in the [project's sharing settings](../120-load-project-configuration/#removing-all-custom-share-links).

{{< image src="xtc/loadtest_sharingLink_editUnshare.png" >}}
Editing the expiration time of a public sharing link or unsharing
{{< /image >}}

### Downloading Results
To download a report to your local machine, click _Download_ in the report's context menu. You will get a .tar.gz archive containing the complete load test report including all the result browsers that the report links to.

## Deleting a Report
Finally, if you don't need a generated report any longer, you may want to delete it to save storage space. To do this, just click _Delete_ in the report's context menu. You will be prompted to confirm that you really want to delete the report. 

{{% warning notitle %}}
Please note that when deleting load test reports from XTC, they are truly deleted from the backing file storage, so this process **cannot be undone**.
{{% /warning %}}
