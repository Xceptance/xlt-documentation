---
title: "Merge Rules"

weight: 10
type: docs

description: >
    Learn how to customize reports further by splitting, combining, and renaming requests.
---

## Motivation

Merge rules are one of XLT's most interesting and versatile features. You can think of them as bucketing rules for your requests: merge rules define how requests are merged together or split up in your report. This makes the request table more meaningful and provides better insights. Setting up these rules requires careful thought, but well-crafted merge rules help you get significantly more out of your data.

## Essentials

The main concept when setting up merge rules is defining a new name (which can also be called a named bucket) for requests that match certain criteria. 

When you check the `timers.csv` files on disk, you can see the original names used. Requests are automatically given a name. These mostly depend on the action name chosen when designing your test suite. If a page (or whatever occurs in the action block) consists of several requests, such as XHR requests after the page load, each request name is also assigned an index number.

Here is a small example. The CSV lines have been condensed for better readability:

```txt
R,AddToCart.1,...,200,https://host.info/Cart-GetPID?pid=1921,application/json,...
R,AddToCart.2,...,200,https://host.info/Cart-AddProduct,text/html,...
R,AddToCart.3,...,200,https://host.info/Product-Popup,text/html,...
A,AddToCart,1566427027660,373,false
```

This quick example shows that we will likely see three different URLs. Activities are later displayed under a single name in the report: `AddToCart`. The index number might also appear, depending on the initial merge rules your test suite contains. If the index is also used, you will see three lines; however, because the index may or may not be stable, the data might not be consistent.

Rules are defined to match and capture data for a new name. Merge rules are numbered (using positive numbers; gaps are permitted) and are executed in the order defined by these numbers. They apply only to requests and can evaluate several data points per request, such as the URL, name, agent details, content type, status code, and more. The rules use regular expressions for maximum versatility.

Therefore, before processing data, understand what the request does. Decide what details you need, then carefully craft the regular expression. Avoid separating 'good' from 'bad' (e.g., splitting requests with errors from those that ran fine but performed the same basic function). It's better to use merge rules to split redirects or summarize identical requests. Do not destroy the context (action) unless it's unnecessary. Keep in mind that the smaller the bucket, the less data it contains, and the less meaningful the measured data becomes.

{{% note notitle %}}
More about the collected data and the CSV format can be found in the chapter [Result Data]({{< relref "results" >}}).
{{% /note %}}

## Parameters

These are the parameters that you can define for a merge rule:

```txt
newName .................. new request name (required)

[n] namePattern .......... regex defining a matching request name
[t] transactionPattern ... regex defining a matching transaction name
[a] agentPattern ......... regex defining a matching agent name
[c] contentTypePattern ... regex defining a matching response content type
[s] statusCodePattern .... regex defining a matching status code
[u] urlPattern ........... regex defining a matching request URL
[m] methodPattern ........ regex defining a matching request method
[r] runTimeRanges ........ list of runtime segment boundaries

stopOnMatch .............. whether or not to process more rules when the current rule applies
                                (defaults to true)
dropOnMatch .............. whether or not to discard a matching request instead of renaming it 
                                (defaults to false). dropOnMatch implies stopOnMatch.
```

At least one of _namePattern_, _transactionPattern_, _agentPattern_, _contentTypePattern_, _statusCodePattern_, _urlPattern_, [_methodPattern_]({{< relref "/xlt/release-notes/6_2_x#use-request-method-in-merge-rules" >}}) or _runTimeRanges_ must be specified. If more than one pattern is given, all given patterns must match.

Note that _newName_ may contain placeholders, which are replaced with the content of a specified capturing group of the respective pattern. The placeholder format is as follows: `{<category>:<capturingGroupIndex>}`, where `<category>` is the type code of the respective pattern (see parameter list above). `<capturingGroupIndex>` denotes the respective capturing group in the selected pattern (does not apply to _runTimeRanges_).

### Excluding Patterns

To exclude a pattern instead of including it, use:

```txt
com.xceptance.xlt.reportgenerator.requestMergeRules.<num>.<param>.exclude = <value>
```

Requests that match the exclude pattern will not be selected. For example, to create a bucket for all non-JavaScript resources, you could set up a rule like:

```txt
com.xceptance.xlt.reportgenerator.requestMergeRules.1.newName = {n:0} NonJS
com.xceptance.xlt.reportgenerator.requestMergeRules.1.namePattern = .+
com.xceptance.xlt.reportgenerator.requestMergeRules.1.contentTypePattern.exclude = javascript
com.xceptance.xlt.reportgenerator.requestMergeRules.1.stopOnMatch = false
```

Note that an include pattern and an exclude pattern can be specified for a pattern type simultaneously. In this case, a request is selected if and only if it matches the include pattern and does not match the exclude pattern.

### Dropping Requests

By default, the load test report includes all requests. To remove certain request patterns, you must define a request merge rule to identify the relevant requests and delete them from the report:

```txt
## Delete all requests without a valid status code.
com.xceptance.xlt.reportgenerator.requestMergeRules.10.statusCodePattern = 0  
com.xceptance.xlt.reportgenerator.requestMergeRules.10.dropOnMatch = true
```

You can also first merge and split data into named buckets and then drop a bucket based on a _namePattern_ rule.

## Example

To give you an understanding of how merge rules work, let's look at a more sophisticated example. You created a report, and what you get in your requests table is this:

{{< image src="user-manual/cologin-in-plain.png" >}}
Request Table w/o Merge Rules
{{< /image >}}

Everything is named similarly; we have no idea what happened here or whether it's good or bad. So, let's take a closer look at these measured requests. It is always a URL and a name. The name is determined as explained above (based on action naming and index).

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

First, let's split off the _\_\_Analytics-Start_ requests seen in COLogin.6. These probably appear in other parts of your load test as well. Since they have no real connection to your login process, let's summarize them in one large _Analytics_ bucket. For this, we need a rule that matches URLs with _\_\_Analytics-Start_ before _'?'_.

```txt
## Summarize Analytics Start
...requestMergeRules.10.newName = __Analytics-Start
...requestMergeRules.10.urlPattern = /__Analytics-Start\\?
...requestMergeRules.10.stopOnMatch = true
```
Pay attention to the double backslash before the question mark (`\\?`). The first `\`  escapes the `?` from the regular expression perspective, treating it as a literal character. The second `\` escapes the `\` character because this is a Java property file format. Here, `\` is a special character (see [Java Properties](https://docs.oracle.com/javase/8/docs/api/java/util/Properties.html#load-java.io.Reader-)).

### Step 2: Remove the Index

We don't need the sub-request naming pattern at the moment, so let's remove the dot and summarize our requests as "COLogin". We want to apply other merge rules later, so we do not stop the processing here.

```txt
## First, we eliminate the sub-request naming pattern, because we do not need
## that at the moment. This turns all "name.1" or "name.1.1" and so on into 
## just "name".
...requestMergeRules.20.newName = {n:1}
...requestMergeRules.20.namePattern = ^([^\\.]*)(\\.[0-9]+)+$
...requestMergeRules.20.stopOnMatch = false
```
You can access the captured data of the regular expression by specifying its index (e.g., `{n:1}`) to build the new name. If you use `{n:0}` or `{n}`, it will use all available data. In that case, no specific pattern needs to be specified in the rule, as this data is made available automatically. See the next examples as well.

{{% note notitle %}}
An option is available to handle the index automatically. Automatic handling is faster than explicit handling, and it is recommended.
{{% /note %}}

```txt
## Whether to automatically remove any indexes from request names
## (i.e. "HomePage.1.27" -> "HomePage"), so no special request processing rule
## is required for that.
com.xceptance.xlt.reportgenerator.requests.removeIndexes = true
```

{{% warning %}}
Automatic index handling might fail if the request name contains an index-like structure that is part of the name by design (e.g., "4.10 Initial Step"). In such cases, explicit index handling is recommended.
{{% /warning %}}

### Step 3: Redirect Code as Part of the Name

Usually, we expect 200 response codes for requests, so other codes might be of special interest. With another merge rule, we match every response code from 300 to 309 and add the code to the new name:

```txt
## Get us the redirect codes into the name
...requestMergeRules.60.newName = {n:0} [{s:0}]
...requestMergeRules.60.namePattern = .*
...requestMergeRules.60.statusCodePattern = (30[0-9])
...requestMergeRules.60.stopOnMatch = false
``` 

{{% note title="Speed up Processing" %}}
To speed up data processing, XLT automatically provides the full data for each parameter. You don't have to use a regular expression with a capturing group like `.+` to fill the context for `{n:0}`.
{{% /note %}}

A faster, optimized rule looks like this:

```txt
## Get us the redirect codes into the name when they are 300 to 309.
...requestMergeRules.60.newName = {n} [{s}]
...requestMergeRules.60.statusCodePattern = 30[0-9]
...requestMergeRules.60.stopOnMatch = false
``` 

### Step 4: Capture a Part of the URL

Remaining requests follow the pattern _'-Site/locale/Action'_. We now sort requests by the action part, appending it to the bucket name (ensuring we do not capture any URL parameters starting at _'?'_):

```txt
# Do a split by action name
...requestMergeRules.80.newName = {n:0} ({u:1})
...requestMergeRules.80.urlPattern = -Site/[^/]+/([^/\\?]+).*
...requestMergeRules.80.stopOnMatch = false
```

### Step 5: Result
We sorted our COLogin requests to appear in the requests table. Additionally, there will be another table row for all _\_\_Analytics-Start_ requests:

{{< image src="user-manual/cologin-in-buckets.png" >}}
Requests table, organized with merge rules
{{< /image >}}

This sorted table provides more precise data and helps pinpoint higher runtimes.

As you can see, this isn't rocket science, but it requires careful thought and some regular expression knowledge (see [regular expression skills](https://xkcd.com/208/)).

## Good to Know

### Performance

Every rule you add influences the report generation speed. You can improve the speed by avoiding redundant rules, skipping remaining rules when a match occurs, capturing only necessary data, and more.

### Superfluous Data

We discussed this earlier, but here is the example again to show where you can save time when generating the report.

```txt
...requestMergeRules.60.newName = {n:0} [{s:0}]
...requestMergeRules.60.namePattern = .+
...requestMergeRules.60.statusCodePattern = (30[0-9])
``` 

XLT automatically provides the full data for each request topic. You don't have to use a regular expression and capturing groups like `.+` or `(30[0-9])` to fill the context for `{n:0}` and `{s:0}`.

The improved rule:

```txt
...requestMergeRules.60.newName = {n} [{s}]
...requestMergeRules.60.statusCodePattern = 30[0-9]
```

#### Don't Capture Data You Don't Need

Only when you need parts of the data do you have to use a capturing group and access its content. In this example, the first capturing group is not used in the new name definition, so there's no need to capture it.

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

In this example, the string `Homepage` is static. Therefore, you don't have to copy this data from the regex to the new name; instead, define it directly.

```txt
# Capturing static content
...requestMergeRules.60.newName = <{n:1}>
...requestMergeRules.60.namePattern = ^(Homepage).*$
``` 

```txt
# Define static content rather than capturing it
...requestMergeRules.60.newName = Homepage
...requestMergeRules.60.namePattern = ^Homepage.*$
```

#### Superfluous Rules

If you define rules that will never match (because your data doesn't contain such entries or you inherited rules from another project), remove them.

#### Expensive Regular Expressions

Regular expressions can be computationally expensive, especially if they are inefficient in determining matches. For more information, see this example: [Regexes: The Bad, the Better, and the Best](https://www.loggly.com/blog/regexes-the-bad-better-best/).

#### Terminating Early

If you have several rules, and the initial rules already finalize the name, with subsequent rules making no further changes, consider stopping processing earlier using the _stopOnMatch_ feature.
