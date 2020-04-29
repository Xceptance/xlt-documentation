---
title: "Merge Rules"

weight: 10
type: docs

description: >
    How to customize the reports further by splitting and renaming requests.
---

{{< TODO >}}merge rules: definition, how-to, example(s){{< /TODO >}}

## Dropping Requests from the Report

There are situations where removing requests is desired. Imagine those spurious socket timeouts spiking high. Once you know they are there, you might wish to ignore them for the rest of the analysis.

By default, the load test report always contains all requests. They may have been renamed in various ways via merge rules, but to get rid of certain requests altogether, you must define a special request processing rule to identify the offending requests and delete them from the report:

```bash
## Delete all requests without a valid status code.
com.xceptance.xlt.reportgenerator.requestMergeRules.10.statusCodePattern = 0  
com.xceptance.xlt.reportgenerator.requestMergeRules.10.dropOnMatch = true
```