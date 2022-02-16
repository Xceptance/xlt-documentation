---
title: "Test Results"

weight: 175
type: docs

description: >
  What test results are and how they are used.
---

## Test Results

XTC will automatically download the test results at the end of the load test. These will be available in the _Results_ tab. 

{{% permission type="project" least="true" role="reviewer" action="view test results" %}}

You may download all results as compressed archives if you need them on your local machine, and XTC can also generate a link for [public sharing]({{< relref "#sharing-results" >}}). In addition to that, XTC allows you to [generate reports]({{< relref "#creating-a-report-from-results" >}}) from every available result set, be it final or intermediate. 

{{< image src="xtc/loadtest_results.png" >}}
Results tab and results context menu
{{< /image >}}

Results are basically the [raw data recorded during a test]({{< relref "/load-testing/advanced/150-results" >}}). They are hard to read and usually you will only need them if you are looking for very specific information that is not contained in the [test report]({{< relref "/load-testing/manual/320-test-evaluation#reading-a-test-report" >}}). 

### Downloading Results
To download a set of test results, click _Download_ in the result set's context menu. You will get a .tar.gz archive containing nested archives for all [_timers.csv_ files]({{< relref "/load-testing/advanced/150-results#collected-values" >}}).

{{% permission type="project" least="true" role="reviewer" %}}

### Sharing Results

{{% permission type="project" least="true" role="test manager" %}}

Sharing results in XTC is very similar to [sharing reports]({{< relref "180-reports/#sharing-a-report" >}}), in that all results are available to any project member who has at least the [project role]({{< relref "050-projects#user-roles-within-a-project" >}}) of a **reviewer**. As a **project administrator**, you can add XTC users as reviewers to the project if you want them to have access to all results.

To share results outside XTC, you can create a **public sharing link** by clicking _Share_ in the context menu of the result to be shared. A prompt will open and you may select whether to use the [default sharing settings]({{< relref "120-load-project-configuration#default-sharing-settings" >}}) or define an expiration time specifically for this result link. 

Clicking _Create Share_ will create the link for public sharing, which will be displayed below the result link as _Shared Link_. Anyone with the link can access the result without authentication. All links are time limited and will expire automatically. Links don't display any project details and can be invalidated at any time manually by the unshare option (in the context menu of the shared result).

{{% note notitle %}}
The sharing link is different from the result link (the result link does _not_ become public by sharing), so please make sure to copy the right one of them, as only the sharing link is publicly accessible.
{{% /note %}}

You can **change the expiration time** of an already shared result later if needed, by either updating the project's [default sharing settings]({{< relref "120-load-project-configuration#default-sharing-settings" >}}) (which will update expiration times for all results shared by using this default), or by clicking _Edit Share_ in the result's popup menu and selecting a new expiration date. The link won't be changed by this, just its lifetime. If you want to invalidate a shared link, select the _Unshare_ option instead.
To remove all custom shared links at once, use the option to _delete existing custom share links_ in the [project's sharing settings]({{< relref "120-load-project-configuration#removing-all-custom-share-links" >}}).

### Creating a Report from Results

{{% permission type="project" least="true" role="tester" %}}

XTC allows you to generate as many [custom reports]({{< relref "180-reports#custom-reports" >}}) as you like from any available result set. Just click _Create Report_ in the result set's context menu: there will be a popup to configure the report settings, just like on [creating a new custom report from the _Reports_ tab]({{< relref "180-reports#custom-reports" >}}). 

In fact, creating a new custom report in the _Reports_ tab does the same thing as creating a new report from the final results, however this option is useful for **creating custom reports from intermediate test results**.

### Deleting Results

{{% permission type="project" least="true" role="tester" %}}

Finally, if you don't need a generated result set any longer, you may want to delete it to save storage space. To do this, just click _Delete_ in the result set's context menu. You will be prompted to confirm that you really want to delete the results. 

{{% warning notitle %}}
Please note that when deleting load test results from XTC, they are truly deleted from the backing file storage, so this process **cannot be undone**.
{{% /warning %}}
