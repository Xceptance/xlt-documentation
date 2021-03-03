---
title: "Result Browser"

type: docs
weight: 440

description: >
    The XLT result browser provides valuable insights during development as well as during load test execution and evaluation.
---

- Shows actions and requests of a transaction
- Includes all HTTP headers
- Shows real full unaltered response
- Displays approximated rendering
- Displays test settings
- Helps to find errors
- Is great for test documentation

## Result Browser Properties

When running test cases, you can save the page output to disk. The relevant property is `com.xceptance.xlt.output2disk`. By default, it is set to `never` (`always` in development mode). If you want to enable page output to disk, copy the following lines to `dev.properties` or `test.properties` or set the already existing property accordingly:

```bash
## Enables page output to disk. Possible values are:
## - never ..... pages are never logged
## - onError ... pages are logged only if the transaction had errors
## - always .... pages are logged always
com.xceptance.xlt.output2disk = always
```

By enabling page output to disk, a lot of data will be aggregated. To minimize this in load test mode, the property may be set to `onError` so that only the page output that resulted in an error is saved to disk. Since this single page on it's own is not always enough to determine what generated the error, we can also set the number of actions previous to the error that should be kept as part of the record (this is set to 3 by default and to `all` in development mode):

```bash
#com.xceptance.xlt.output2disk.size = all
com.xceptance.xlt.output2disk.size = 3
```

Also, the dump mode (whether modified or only final pages are saved) may be defined:

```bash
#com.xceptance.xlt.output2disk.onError.dumpMode = modifiedAndFinalPages
com.xceptance.xlt.output2disk.onError.dumpMode = finalPagesOnly
```

So if an error occurs during a transaction in a load test, `output2disk` is set to `onError` and the size is set to `3`, a result browser with the last 3 pages is written to disk. If the error condition is permanent (or present for a longer period of time), we might end up with thousands of (rather similar) result browsers. This tremendously increases the volume of data to be downloaded after the test, but does not provide any new information. That’s why you can limit the number of result browsers per type of error and agent.

For each type of error, which is identified by its message and stacktrace, XLT tracks the current number of stored result browsers and stops writing down any new result browser once the configured maximum number is reached. However, you may also configure a time period to periodically clear the counter. Use this setting to limit the maximum number of result browsers for a given time period instead of the whole test runtime.

```bash
# maximum number of different error types per agent
com.xceptance.xlt.output2disk.onError.limiter.maxDifferentErrors = 1000

# number of result browsers per agent and type of error
com.xceptance.xlt.output2disk.onError.limiter.maxDumps = 10

# period after which the result dump counter is reset to 0
com.xceptance.xlt.output2disk.onError.limiter.resetInterval = 1h 30m
```

When saving request data to disk for the result browser, the request body of POST requests is currently limited to 8K by default and will be cropped when exceeding this value. If this is still too low for your most complex requests, for instance Web service requests with large JSON bodies, you can also tailor this limit to your needs:

```bash
com.xceptance.xlt.output2disk.maxRequestBodySize = 12345
```

If you have saved the page output to disk and want links from the error entries in the load test report to the corresponding result browsers in the results directory in your [report](../320-test-evaluation), make sure the property is set accordingly in `reportgenerator.properties`:

```bash
com.xceptance.xlt.reportgenerator.linkToResultBrowsers = true
```

## Using the Result Browser

The result browser contains the record of a test user session. It lists actions, request, and response details and supports error diagnosis.

The easiest way to open the result browser is by opening the link at the bottom of the console output after you ran a single test from your IDE:

{{< image src="user-manual/localTest_console.png" >}}
Console output for local test run
{{< /image >}}

This is what you will use during test development, but also in load test setups there are results (result browsers) available (depending on your test settings, see above). In that case, all saved results can be found in the `<testsuite>/results` directory. See the lines below for details of the results subdirectory structure:

```txt
---+ results
   `---+ [testcase]
       `---+ [virtual-user]
           `---+ output
               `---+ [transaction-ID]
                   |---- css
                   |---- images
                   |---+ pages
                   |   `--- cache
                   `---- responses
```

In the folders for each test run (`results/[testcase]/[virtual-user]/output/[transaction-ID]`), you find an `index.html` containing the _XLT Result Browser_. The result browser offers an integrated navigation to browse the complete page output of the transaction and to look at every single request in detail. The file `last.html` in the output folder `results/[testcase]/[virtual-user]/output` references the result browser for the last executed transaction of this virtual user.

The result browser navigation will only permit access to the pages of a transaction if they are directly related to actions. Therefore, defining actions correctly is very important to make the most effective use of the result browser. For details on how to structure test cases and create actions, also see [Basic Concepts](../030-concepts) and [Code Structuring Recommendations](../450-test-suites/#code-structuring-recommendations).

{{< image src="user-manual/result-browser.png">}}
XLT Result Browser - Page Output
{{< /image >}}

### Navigation, Color Coding and Filtering

The result browser contains two panels: the area on the left-hand side can be used to navigate the ‘steps’ - actions and requests - of your test case. The right side presents the output of your object under test (the site you are testing) or more detailed request information.

If you click on one of the action names in the navigation, the result browser will show the respective page. Please note: the output on the right-hand side will more or less closely resemble your webpage. Typically, in this view Javascript is disabled and only embedded CSS is applied, so the shown page will differ slightly from the original.

When you double-click an action name (or click the little arrow left of it), the navigation will expand to list all related requests. The listed requests are color-coded with black, {{< ctext color="grey" >}}grey{{< /ctext >}}, {{< ctext color="red" >}}red{{< /ctext >}}, {{< ctext color="blue" >}}blue{{< /ctext >}}, {{< ctext color="#7D28C0" >}}lilac{{< /ctext >}} and {{< ctext color="green" >}}green{{< /ctext >}} based on the following algorithm:

* If the request's status code is 301 or 302 then set its color to {{< ctext color="grey" >}}grey{{< /ctext >}} since it is a Redirect.
* If the request's status code is 0 or greater than equal to 400 then set its color to {{< ctext color="red" >}}red{{< /ctext >}} because it is an Error.
* Set the color initially to black and check the content type of the response if it matches the following criteria:
	* It contains the string `javascript` or is equal to `application/json`. If this is the case, change the color to {{< ctext color="#7D28C0" >}}lilac{{< /ctext >}}.
	* It starts with the string `image`. In this case change the color to {{< ctext color="green" >}}green{{< /ctext >}}.
	* It is equal to `text/css`. This content type denotes CSS and thus change the color to {{< ctext color="blue" >}}blue{{< /ctext >}}.

{{% warning notitle %}}
Please note that the content type is determined by the appropriate HTTP response header value. Thus, if an JavaScript file is delivered as content type `text/plain` then this request will be color-coded with black.
{{% /warning %}}

{{< image src="user-manual/result-browser_colorCoding.png">}}
XLT Result Browser - Request Color Coding
{{< /image >}}

A small menu at the top will give you the possibility to filter your output for content type (you can look up the color coding there, too), request method and employed protocol. To enable or disable a certain filter, simply toggle its checkbox.

{{< image src="user-manual/result-browser_filter.png">}}
XLT Result Browser - Request Filters
{{< /image >}}

Click directly on a request item to see all details for this request.

### Request and Response Information

When you select one of the requests from the navigation, the page content will be replaced by detailed information about the request and the related response that you can access via the four tabs on top of the page. The following information is available:

* *Request/Response Information*
	* General Information
	* Request and Response Headers
	* URL Query and POST Parameters (if any)
	* for POST requests: either the form data or (a part of) the raw request body
	* for PUT and PATCH requests: (a part of) the raw request body
* *Request Body (Raw)*
* *Response Content*

{{< image src="user-manual/result-browser_requestDetails.png">}}
XLT Result Browser - Request Details
{{< /image >}}

### Response Content Tools

Use the tabs at the top of the right-hand side output area to see the (raw) request body and response content. If you opened the report as a file from a local disk, most browser will warn you that the content can not be displayed. This is caused by a security measure in place to prevent exposing local data. Please use a local webserver instead to open the report from a local disk. Recommended applications are [Node.JS - serve](https://www.npmjs.com/package/serve), [Python SimpleHTTPServer](https://2ality.com/2014/06/simple-http-server.html), or the [PHP Built-In Web Server](http://php.kambing.ui.ac.id/manual/en/features.commandline.webserver.php).

{{< image src="user-manual/result-browser_response1_small.png" large="user-manual/result-browser_response1.png">}}
XLT Result Browser - Response Content
{{< /image >}}

This can be a lot of data that might not be structured at all, but the result browser provides two handy tools to enhance readability:

* by clicking _Beautify_ the indentations are corrected (or added, if there were none),

{{< image src="user-manual/result-browser_response2_small.png" large="user-manual/result-browser_response2.png">}}
XLT Result Browser - Response Content, beautified
{{< /image >}}

* and by clicking _Highlight_, syntax highlighting will be added to the code.

{{< image src="user-manual/result-browser_response3_small.png" large="user-manual/result-browser_response3.png">}}
XLT Result Browser - Response Content, highlighted
{{< /image >}}

Furthermore, there is a _Select All_ button, which enables you to easily copy and paste the response content.

If the response is in JSON format, the result browser also features a tab where JSON responses are displayed in a tree-like view with expandable/collapsible sections that can also be searched and filtered.

### Element Inspection

Since the right-hand side output of an action represents the associated state of a page, you can use the output to inspect the page elements and their state. Simply use the inspection tool of your browser (e.g. Chrome Developer Tools) or plugin to analyze the page and its elements.

As described earlier, the output of an action shows the state of the page after a user interaction (with all the associated requests) was executed. The page output of an action does not include `<script>` commands. These have been removed by XLT to avoid script execution while you are reviewing the output in your browser.

{{< image src="user-manual/result-browser_inspect.png">}}
XLT Result Browser - Inspect Element
{{< /image >}}

## Request timeline
In order to let you inspect the temporal sequence
and duration of requests in a graphical timeline view, XLT may
generate an HTTP Archive (HAR) file along with an appropriate viewer as
part of the result browser. The HAR file contains information about all
requests/responses grouped by their corresponding action, including
headers, sizes, and network timings. For client-performance tests, page
load event timings are included as well. In order to save valuable disk
space, the response content is NOT included in the generated HAR files.

To enable this feature, add the following line to your test
configuration:

```
com.xceptance.xlt.output2disk.writeHarFile = true
```

The HAR viewer can be opened either by clicking the *View as HAR* link
in the result browser or directly by opening the `harviewer.html` file
in the root directory of the result browser.

{{< image src="releasenotes/4.13.0/har-viewer.png" >}}
HAR Viewer
{{< /image >}}
