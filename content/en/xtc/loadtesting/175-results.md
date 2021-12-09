---
title: "Test Results"

weight: 175
type: docs

description: >
  What test results are and how they are used.
---

## Test Results

XTC will automatically download the test results at the end of the load test. These will be available in the _Results_ tab. 

You may download all results as compressed archives if you need them on your local machine, and XTC can also generate a link for [public sharing](#sharing-results). In addition to that, XTC allows you to [generate reports](../180-reports/#custom-reports) from every available result set, be it final or intermediate. 

{{< image src="xtc/loadtest_results.png" >}}
Results tab and results menu
{{< /image >}}

Results are basically the [raw data recorded during a test](../../../load-testing/advanced/150-results/). They are hard to read and usually you will only need them if you are looking for very specific information that is not contained in the [test report](../../../load-testing/manual/320-test-evaluation//#reading-a-test-report). 

### Sharing Results

Sharing results in XTC is very similar to [sharing reports](../180-reports/#sharing-a-report), in that all results are available to any project member who has at least the [project role](../../050-projects/#user-roles-within-a-project) of a **reviewer**. As a **project administrator**, you can add XTC users as reviewers to the project if you want them to have access to all results.

To share results outside XTC, you can create a **public sharing link** by clicking _Share_ in the context menu of the result to be shared. A prompt will open and you may select an expiration time specifically for this result. 

{{% note notitle %}}
Please note that the project's [default sharing settings](../120-load-project-configuration/#default-sharing-settings) do _not_ apply to shared results.
{{% /note %}}

Clicking _Create Share_ will create the link for public sharing, which will be displayed below the result link as _Shared Link_. Anyone with the link can access the result without authentication. All links are time limited and will expire automatically. Links don't display any project details and can be invalidated at any time manually by the unshare option (in the context menu of the shared result).

{{% note notitle %}}
The sharing link is different from the report link (the report link does _not_ become public by sharing), so please make sure to copy the right one of them, as only the sharing link is publicly accessible.
{{% /note %}}