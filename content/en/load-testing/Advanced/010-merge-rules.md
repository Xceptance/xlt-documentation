---
title: "Merge Rules"

weight: 10
type: docs

description: >
    How to customize the reports further by splitting, combining, and renaming requests.
---

## Motivation

Merge rules are one of the most interesting and versatile XLT features. You can think of them as bucketing rules for your requests: merge rules define how requests are merged together or split up in your report. This makes the request table more meaningful and insightful. Setting these rules up requires some careful thinking, but well crafted merge rules help you to get way more out of your data.

## Essentials

The main concept when setting up merge rules is the definition of a new name (you can call it a named bucket too) for requests that match certain criteria. 

When you check the `timers.csv` files on disk, you can see the originally used names. Requests are automatically given a name. These mostly depend on the name of the action you have chosen when you designed your test suite. If a page (or whatever happens in the action block) consists of several requests, such as XHR requests after the page load, each request name also gets assigned an index number.

Here is a small example. The CSV lines have been condensed for better visibility:

```txt
R,AddToCart.1,...,200,https://host.info/Cart-GetPID?pid=1921,application/json,...
R,AddToCart.2,...,200,https://host.info/Cart-AddProduct,text/html,...
R,AddToCart.3,...,200,https://host.info/Product-Popup,text/html,...
A,AddToCart,1566427027660,373,false
```

So this quick example shows you that we will likely see three different urls. Activities later are displayed under one single name in the report: `AddToCart`. The index number might also show up, depending on the initial merge rules your test suite contains. If the index is also used, you will see three lines, but because the index might or might not be stable, the data might not be consistent.

Rules are defined to match and capture data for a new name. Merge rules are numbered (positive numbers, gaps are permitted) and are executed in the order defined by these numbers. They apply only to requests and can evaluate several data points per request, such as the url, the name, agent details, the content type, the status code, and more. The rules use regular expressions for maximum versatility.

So before crunching data, know what the request does. Decide what details you need, then carefully craft the regex. Avoid separating good from bad (e.g. splitting requests with errors from the ones that ran fine but did basically the same). Better use merge rules to split up redirects or sum up identical requests. Don't destroy the context (action) except when not needed. And keep in mind that the smaller the bucket gets, the fewer data it contains, the less meaningful the measured data becomes.

{{% note notitle %}}
More about the collected data and the CSV format can be found in the chapter [Result Data](../150-results).
{{% /note %}}

## Parameters

These are the parameters that you can define for a merge rule:

```txt
newName .................. new request name (required)

[n] namePattern .......... reg-ex defining a matching request name
[t] transactionPattern ... reg-ex defining a matching transaction name
[a] agentPattern ......... reg-ex defining a matching agent name
[c] contentTypePattern ... reg-ex defining a matching response content type
[s] statusCodePattern .... reg-ex defining a matching status code
[u] urlPattern ........... reg-ex defining a matching request URL
[r] runTimeRanges ........ list of runtime segment boundaries

stopOnMatch .............. whether or not to process more rules when the current rule applies
                                (defaults to true)
dropOnMatch .............. whether or not to discard a matching request instead of renaming it 
                                (defaults to false). dropOnMatch implies stopOnMatch.
```

At least one of _namePattern_, _transactionPattern_, _agentPattern_, _contentTypePattern_, _statusCodePattern_, _urlPattern_ or _runTimeRanges_ must be specified. If more than one pattern is given, all given patterns must match.

Note that _newName_ may contain placeholders, which are swapped for the content of a specified capturing group of the respective pattern. The placeholder format is as follows: `{<category>:<capturingGroupIndex>}`, where `<category>` is the type code of the respective pattern (see parameter list above). `<capturingGroupIndex>` denotes the respective capturing group in the selected pattern (does not apply to _runTimeRanges_).

### Excluding Patterns

To exclude instead of including a pattern, use:

```txt
com.xceptance.xlt.reportgenerator.requestMergeRules.<num>.<param>.exclude = <value>
```

All requests that match the exclude pattern will not be selected. For example, to create a bucket for all non-JavaScript resources, you could setup a rule like:

```txt
com.xceptance.xlt.reportgenerator.requestMergeRules.1.newName = {n:0} NonJS
com.xceptance.xlt.reportgenerator.requestMergeRules.1.namePattern = .+
com.xceptance.xlt.reportgenerator.requestMergeRules.1.contentTypePattern.exclude = javascript
com.xceptance.xlt.reportgenerator.requestMergeRules.1.stopOnMatch = false
```

Please note that an include pattern as well as an exclude pattern can be specified for a pattern type at the same time. In this case, a request is selected if and only if it matches the include pattern, but does not match the exclude pattern.

### Dropping Requests

By default, the load test report always contains all requests. To get rid of certain request pattern, you must define a request merge rule to identify the offending requests and delete them from the report:

```txt
## Delete all requests without a valid status code.
com.xceptance.xlt.reportgenerator.requestMergeRules.10.statusCodePattern = 0  
com.xceptance.xlt.reportgenerator.requestMergeRules.10.dropOnMatch = true
```

You can of course also first merge and split data into named buckets and at the end drop a bucket based on a _namePattern_ rule.

## Example

To give you an understanding how merge rules work, let's have a look at a more sophisticated example. You created a report and what you get in your requests table is this:

{{< image src="user-manual/cologin-in-plain.png" >}}
Request Table w/o Merge Rules
{{< /image >}}

Everything is named similarly, we have no idea what happened here, and whether it's good or bad. So let's have a closer look at these requests that were measured. It is always a url and a name. The name is determined as explained above (based on the action naming and index).

```txt
# COLogin.1
https://host.net/s/Foo/cart?dwcont=C1250297253

# COLogin.2
https://host.net/Sites-Foo-Site/en_US/COCustomer-Start

# COLogin.3
https://host.net/Sites-Foo-Site/en_US/
 COAddress-UpdateShippingMethodList?address1=&address2=&countryCode

# COLogin.4
https://host.net/Sites-Foo-Site/en_US/
 COAddress-UpdateShippingMethodList?shippingId=direct

# COLogin.5
https://host.net/Sites-Foo-Site/en_US/COBilling-UpdateSummary

# COLogin.6
https://host.net/Sites-Foo-Site/en_US/__Analytics-Start?res=1600x1200
```

### Step 1: Split Off _\_\_Analytics-Start_

First, let's split off the _\_\_Analytics-Start_ requests we have seen in COLogin.6. These probably show up in other parts of your load test as well, and as they have no real connection to your login process, let's just sum them all up in one big _Analytics_ bucket. For this, we need a rule that matches urls with _\_\_Analytics-Start_ before _'?'_.

```txt
## Summarize Analytics Start
...requestMergeRules.10.newName = __Analytics-Start
...requestMergeRules.10.urlPattern = /__Analytics-Start\\?
...requestMergeRules.10.stopOnMatch = true
```
Please pay attention to the double backslash before the question mark (`\\?`). The first `\`  quotes the `?` from the regular expression point of view to treat it as a normal character. The second `\` quotes the `\` characters because this is a Java property file format. Here, `\` is a protected character (see <a href="https://docs.oracle.com/javase/8/docs/api/java/util/Properties.html#load-java.io.Reader-" target="_blank">Java Properties</a>).

### Step 2: Remove the Index

We don't need the sub-request naming pattern at the moment, so let's get rid of the dot and just summarize our requests as "COLogin". We want to apply other merge rules later, so we do not stop the processing.

```txt
## First, we eliminate the sub-request naming pattern, because we do not need
## that at the moment. This turns all "name.1" or "name.1.1" and so on into 
## just "name".
...requestMergeRules.20.newName = {n:1}
...requestMergeRules.20.namePattern = ^([^\\.]*)(\\.[0-9]+)+$
...requestMergeRules.20.stopOnMatch = false
```
You can access the captured data of the regular expression by specifying its index when accessing the data via `{n:1}` to build the new name. If you state `{n:0}` or `{n}`, it will use all data available. In that case, no rule has to be specified because this data is made available automatically. See the next examples as well.

{{% note notitle %}}
There is an option available to deal with the index automatically. The automatic handling is faster than the explicit handling and it is recommended to use it.
{{% /note %}}

```txt
## Whether to automatically remove any indexes from request names
## (i.e. "HomePage.1.27" -> "HomePage"), so no special request processing rule
## is required for that.
com.xceptance.xlt.reportgenerator.requests.removeIndexes = true
```

{{% warning %}}
The automatic index handling might fail if the request name contains an index like structure that is part of the name by design, such as "4.10 Initial Step". In that case, an explicit handling of the index is recommended.
{{% /warning %}}

### Step 3: Redirect Code as Part of the Name

Usually, we expect 200 response codes for requests, so everything else might be of special interest. With another merge rule we match every response code 300 to 309 and add the code to the new name:

```txt
## Get us the redirect codes into the name
...requestMergeRules.60.newName = {n:0} [{s:0}]
...requestMergeRules.60.namePattern = .*
...requestMergeRules.60.statusCodePattern = (30[0-9])
...requestMergeRules.60.stopOnMatch = false
``` 

{{% note title="Speed up Processing" %}}
To speed up data processing, XLT provides the full data per parameter automatically. You don't have to use a regular expression with a capture rule such as `.+` to fill the context for `{n:0}`.
{{% /note %}}

A faster and optimized rule looks like that:

```txt
## Get us the redirect codes into the name when they are 300 to 309.
...requestMergeRules.60.newName = {n} [{s}]
...requestMergeRules.60.statusCodePattern = 30[0-9]
...requestMergeRules.60.stopOnMatch = false
``` 

### Step 4: Capture a Part of the URL

What remains are requests that follow the pattern _'-Site/locale/Action'_. We now sort requests by the action part by appending the name to the bucket name (making sure we do not capture any url parameters starting at _'?'_):

```txt
# Do a split by action name
...requestMergeRules.80.newName = {n:0} ({u:1})
...requestMergeRules.80.urlPattern = -Site/[^/]+/([^/\\?]+).*
...requestMergeRules.80.stopOnMatch = false
```

## Step 5: Result
We sorted our COLogin requests to show up in the requests table plus, there will be another table row for all _\_\_Analytics-Start_ requests:

{{< image src="user-manual/cologin-in-buckets.png" >}}
Requests table, organised with merge rules
{{< /image >}}

This sorted table gives us more precise data and helps to pinpoint higher runtimes.

As you see, this is not rocket science, but requires careful thinking and some regular expression knowledge (see <a href="https://xkcd.com/208/" target="_blank">regular expression skills</a>).

## Good to Know

### Performance

Every rule you add will influence the speed of the report generation. You can influence the speed by having no redundant rules, skipping the remainder of the rules when a rule matches, only capture the data that is needed, and much more.

### Superfluous Data

We have talked about that before, but here is the example again to show you, where you can save time when generating the report.

```txt
...requestMergeRules.60.newName = {n:0} [{s:0}]
...requestMergeRules.60.namePattern = .*
...requestMergeRules.60.statusCodePattern = (30[0-9])
``` 

XLT provides the full data per request topic automatically and you don't have to use a regular expression and capture rule such as `.+` `(30[0-9])` to fill the context for `{n:0}` and `{s:0}`.

The improved rule:

```txt
...requestMergeRules.60.newName = {n} [{s}]
...requestMergeRules.60.statusCodePattern = 30[0-9]
```

#### Don't Capture Data You Don't Need

Only when you need parts of the data, you have to use a capture group and access the content. In this example, the first capture group is not used in the definition of the new name, so there is no need to capture it.

```txt
# Too much capturing
...requestMergeRules.60.newName = <{n:2}>
...requestMergeRules.60.namePattern = ^(Homepage) (.*)$
``` 

```txt
# Capture only what is needed
...requestMergeRules.60.newName = <{n:1}>
...requestMergeRules.60.namePattern = ^Homepage (.*)$
``` 

In this example, the string `Homepage` is static, hence you don't have to copy this data from the regex to the new name, rather define it.

```txt
# Capturing static content
...requestMergeRules.60.newName = <{n:1}>
...requestMergeRules.60.namePattern = ^(Homepage).*$
``` 

```txt
# Define static content rather capturing it
...requestMergeRules.60.newName = Homepage
...requestMergeRules.60.namePattern = ^Homepage.*$
```

#### Superfluous Rules

If you define rules that will never match, because your data does not contain such data or you just inherited rules from another project, remove these.

#### Expensive Regular Expressions

Regular expressions can be very expensive, especially when they only slowly can see if data matches. For more information, see this example: <a href="https://www.loggly.com/blog/regexes-the-bad-better-best/" target="_blank">Regexes: The Bad, the Better, and the Best</a>.

#### Terminating Early

When you have several rules and the first rules already finalize the name and all rules afterwards never change a thing, consider stopping processing earlier by using the _stopOnMatch_ feature.
