---
title: "Merge Rules"

weight: 10
type: docs

description: >
    How to customize the reports further by splitting and renaming requests.
---

Merge rules are one of the most unique XLT features. You can think of them as bucketing rules for your requests: merge rules define how different requests are merged together or split in your report to make the requests table more meaningful. Setting them up requires some careful thinking, as they can do quite some harm to your reports, but well crafted merge rules will help you make sense of your reports.

## Merge Rules Essentials

Our main goal defining merge rules is defining a new name (aka bucket) for request that match certain criteria. We then define rules to fetch data for that name (keep in mind: the more expensive the rule, the longer the calculation takes, the longer generating your report takes). Merge rules are numbered (positive numbers, gaps are permitted) and are executed in the defined order. They apply only to requests.

So before crunching data, know what the request does. Decide what details you need, then carefully craft the regex. Avoid separating good from bad (e.g. splitting requests with errors from the ones that ran fine but did basically the same). Better use merge rules to split up redirects or sum up identical requests. Don't destroy the context (action) except when not needed. And keep in mind that the smaller the bucket gets, the fewer data it contains, the worse PXX and averages you will probably see.

## Parameters

These are the things that you can define for a merge rule:

```txt
newName .................. new request name (required)

namePattern [n] .......... reg-ex defining a matching request name
transactionPattern [t] ... reg-ex defining a matching transaction name
agentPattern [a] ......... reg-ex defining a matching agent name
contentTypePattern [c] ... reg-ex defining a matching response content type
statusCodePattern [s] .... reg-ex defining a matching status code
urlPattern [u] ........... reg-ex defining a matching request URL
runTimeRanges [r] ........ list of run time segment boundaries

stopOnMatch .............. whether or not to process the next rule even if
                           the current rule applied (defaults to true)
```

At least one of namePattern, transactionPattern, agentPattern, contentTypePattern, statusCodePattern, urlPattern or runTimeRanges must be specified. If more than one pattern is given, all given patterns must match.

Note that newName may contain placeholders, which are replaced with the specified capturing group from the respective pattern. The placeholder format is as follows: `{<category>:<capturingGroupIndex>}`, where `<category>` is the type code of the respective pattern (given in brackets above) and `<capturingGroupIndex>` denotes the respective capturing group in the selected pattern (does not apply to runTimeRanges).

### Excluding Patterns

To exclude instead of include a pattern, use:
```bash
com.xceptance.xlt.reportgenerator.requestMergeRules.<num>.<param>.exclude = <value>
```
All requests that match the exclude pattern will not be selected. For example, to create a bucket for all non-JavaScript resources, you would setup a rule like that:

```bash
com.xceptance.xlt.reportgenerator.requestMergeRules.1.newName = {n:0} NonJS
com.xceptance.xlt.reportgenerator.requestMergeRules.1.namePattern = .+
com.xceptance.xlt.reportgenerator.requestMergeRules.1.contentTypePattern.exclude = javascript
com.xceptance.xlt.reportgenerator.requestMergeRules.1.stopOnMatch = false
```
Please note that an include pattern as well as an exclude pattern can be specified for a pattern type at the same time. In this case, a request is selected if and only if it matches the include pattern, but does not match the exclude pattern.

### Dropping Requests from the Report

By default, the load test report always contains all requests. They may have been renamed in various ways via merge rules, but to get rid of certain requests altogether, you must define a special request processing rule to identify the offending requests and delete them from the report:

```bash
## Delete all requests without a valid status code.
com.xceptance.xlt.reportgenerator.requestMergeRules.10.statusCodePattern = 0  
com.xceptance.xlt.reportgenerator.requestMergeRules.10.dropOnMatch = true
```

## Example Setup

To give you an understanding how merge rules work, let's have a look at an example. You created a report, and what you get in your requests table is this:

{{< image src="user-manual/cologin-in-plain.png" >}}
Plain requests table
{{< /image >}}

Everything is named similarly, we have no idea what happened here, and whether it's good or bad. So let's have a closer look at these requests (just hover over the name in the table to see the unique URL(s) that were measured here). This is what we have:

```txt
COLogin.1
https://host.net/s/Foo/cart?dwcont=C1250297253

COLogin.2
https://host.net/on/d.store/Sites-Foo-Site/en_US/COCustomer-Start

COLogin.3
https://host.net/on/d.store/Sites-Foo-Site/en_US/
 COAddress-UpdateShippingMethodList
  ?address1=&address2=&countryCode=&stateCode=&postalCode=
   &city=&firstName=Armin&lastName=Warnes&format=ajax

COLogin.4
https://host.net/on/d.store/Sites-Foo-Site/en_US/
 COAddress-UpdateShippingMethodList
  ?address1=&address2=&countryCode=&stateCode=&postalCode=
   &city=&firstName=Armin&lastName=Warnes

COLogin.5
https://host.net/on/d.store/Sites-Foo-Site/en_US/COBilling-UpdateSummary

COLogin.6
https://host.net/on/d.store/Sites-Foo-Site/en_US/__Analytics-Tracking
 ?url=https%3A%2F%2host.net%2Fon%2Fd.store%2FSites-Foo-Site%2Fen_US%2FCOCustomer-Start
  &res=1600x1200&cookie=1&cmpn=&java=0&gears=0&fla=0&ag=0&dir=0&pct=0
  &pdf=0&qt=0&realp=0&tz=US%2FEastern&wma=1&dwac=0.7869769714444649
  &pcat=new-arrivals&title=Cole+Haan+Checkout&fake=13581407137497
```

### Step 1: Split off _\_\_Analytics-Tracking_

First, let's split off the _\_\_Analytics-Tracking_ requests we have seen in COLogin.6. These probably show up in other parts of your load test as well, and as they have no real connection to your login process, let's just sum them all up in one big _Analytics_ bucket. For this, we need a rule that matches urls with _\_\_Analytics-Tracking_ before _'?'_. We then take the name out of the URL pattern match, and stop processing:

```bash
## Summarize Analytics Tracking
...requestMergeRules.10.newName = {u:1}
...requestMergeRules.10.urlPattern = /(__Analytics-Tracking)\\?
...requestMergeRules.10.stopOnMatch = true
```

### Step 2: Get rid of the dot

We do not need the sub-request naming pattern at the moment, so let's get rid of the dot and just summarize our requests in "COLogin". We will want to apply other merge rules on the result, so we do not stop processing here:

```bash
## First, we eliminate the sub-request naming pattern, because we do not need
## that at the moment. This turns all "name.1" or "name.1.1"
## and so on into just "name".
...requestMergeRules.20.newName = {n:1}
...requestMergeRules.20.namePattern = ^([^\\.]*)(\\.[0-9]+)+$
...requestMergeRules.20.stopOnMatch = false
```

### Step 3: Get the redirect codes into the name

Usually, we expect 200 response codes for requests, so everything else is of special interest. With another merge rule we'll match every response code 300 to 309 and add those codes to the original name:

```bash
## Get us the redirect codes into the name
...requestMergeRules.60.newName = {n:0} [{s:0}]
...requestMergeRules.60.namePattern = .*
...requestMergeRules.60.statusCodePattern = (30[0-9])
...requestMergeRules.60.stopOnMatch = false
``` 
Please note that when the call fails with something else than 30[0-9], we get another row and so we might not see all errors or spikes correctly as part of the main row.

### Step 4: Add pipeline name

What remains are requests that follow the pattern _'-Site/locale/Pipeline'_, so we'll check for that pipeline name and split requests by it, appending the name of the pipeline to the bucket name (making sure we do not capture the url parameters starting at the _'?'_):

```bash
# Do a split by pipeline name
...requestMergeRules.80.newName = {n:0} ({u:1})
...requestMergeRules.80.namePattern = [^.]+
...requestMergeRules.80.urlPattern = -Site/[^/]+/([^/\\?]+).*
...requestMergeRules.80.stopOnMatch = false
```
So with this, we reorganised our COLogin request to show up in the requests table like this (plus, there will be another table row for all _\_\_Analytics-Start_ requests):

{{< image src="user-manual/cologin-in-buckets.png" >}}
Requests table, organised with merge rules
{{< /image >}}

As you see, this is no rocket science, but requires some careful thinking, and regex knowledge [helps a lot](https://xkcd.com/208/).