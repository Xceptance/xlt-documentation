
---
title: "Scorecard"

weight: 570
type: docs

description: >
    How to evaluate and rate reports in an automated fashion.
---

## Idea

In order to ease evaluation of load test results, XLT provides the possibility to automatically run a quick and configurable analysis of the results as part of report generation. This is based on rules that are applied to the test result and can be configured by the user, so the results will fit your own quality standards.

## Quick Start

In order to add an automatic evaluation to the report, add a JSON file containing your evaluation rules to the test suite (see attached [schema](https://github.com/user-attachments/files/16095777/evaluation-schema.json) and [example config](https://github.com/user-attachments/files/15532415/evaluation-config.json)). The path to this file has to be set as the value of the property `com.xceptance.xlt.scorecard.config` in the test suite (relative to test suite's `config` directory). 

The rules will then be applied at report creation, and the test report will contain a tab **Scorecard** that contains information about the evaluation result of each [rule]({{< relref "#rules" >}}) and [rule group]({{< relref "#groups" >}}), the resulting [test rating]({{< relref "#rating" >}}) and the overall [scorecard result]({{< relref "#scorecard-result" >}}). 

XLT will try to run as many rules as possible (unless the JSON is broken or does not validate). If any rule breaks (XPath or condition is wrong), the entire test result will be `ERROR`. This way, you always have debugging feedback and can fix the problem at once. Failures or errors in the evaluation will not disrupt report creation.

## Scorecard Update

To easily update the scorecard of an existing report after updating the ruleset directly in the report's `config` folder, you can use the script `<XLT>/bin/update_scorecard.sh`:

```bash
bin $ ./update_scorecard.sh ../reports/20240731_0224_1h100p
```

## Evaluation Configuration

### Version

The schema may change in the future, resulting in multiple supported versions. To specify the schema version used in your configuration, please use the `version` property (as long as we have released only one version, this is optional). The current version is **2**.

### Rules

A rule captures values and compares them. It can succeed or fail, based on one or several conditions (**[checks]({{< relref "#checks" >}})**). The evaluation of a rule will return either `PASSED`, `NOTPASSED`, `SKIPPED` or `ERROR` as the rule's **status**. 

By default, all rule checks have to pass in order to have the rule evaluate to passed/success (you can change this by setting the `negateResult` attribute to `true`, which will switch the `PASSED` and `NOTPASSED` status but not change `SKIPPED` or `ERROR` status). Rules that do not contain any enabled check will always pass (unless `negateResult` is `true` which causes the rule to never pass).

For a quick rating, rules can define a number of achievable **points** that are summarized at the end to get a final score whose value determines the [rating]({{< relref "#rating" >}}) to apply. Rules that do not pass do not contribute any point to the final score, and in case they do pass they contribute all their points.

By setting the `failsTest` attribute to `true`, you define that if this rule fails, the entire test will be marked failed. This will not stop the rest of the evaluation or point calculation.

If a rule has 0 achievable points, it is an informational rule (unless `failsTest` is `true`), so its result will be part of the scorecard but not of the overall rating. This can be used for anything that is good to know but might not fit the points schema.

```json
{
    "id": "homepageResponseTimeC", // the ID for reference by the group and listing in the report - required and unique
    "name": "Homepage C", // the name of the rule - optional
    "comment": "Lorem ipsum ...", // some comment; won't be evaluated - optional
    "enabled": true, // whether the rule should be evaluated at all (helps to add and remove something easily) - optional, default = true
    "description" : "Homepage C rating", // the descriptive text to display in the report
    "failsTest": true, // when true, can make the load test be marked as failed independent of a rating fail - optional, default = false
    "negateResult": false, // when this is 'true' the rule will fail when all checks do pass and the rule will succeed when at least one check fails - optional, default = false
    "testFailTrigger": "NOTPASSED", // rule evaluation status used as trigger when to mark test as failed (has no effect unless "failsTest" is "true") - optional, default = NOTPASSED
    // the checks to run - optional
    "checks" : [
        {
            "selector": "//requests/request[name[text() = 'Homepage']]/percentiles/p95", //XPath
            "condition": "<= 1000", //XPath
            "displayValue" : true, // whether the item matching the selector should be displayed in the report - optional, default = true
            "enabled": true // helps to disable a check easily, if desired - optional, default = true
        },
        {
            "selectorId": "homepageRuntimeP99", //predefined selector
            "condition": "<= 3000"
        }
    ],
    // message to display in report when rule does pass/fail - optional, no default value, allowed properties: "success" and "fail"
    "messages": { 
        "success" : "C", // use this message in the report when passed - optional, no default value
        "fail" : "", // otherwise print this text - optional, no default value
    },
    "points" : 5 // the number of points to achieve - optional, default = 0, no upper limit
}
```

### Checks

Each check is a selector against the XML tree of the testreport.xml using XPath. Rule checks can only have a `selector` or a `selectorId`, not both. Everything selected must be either true or false, a number or a text, or a list of text nodes that later can match a regular expression.

Here are a few examples for checks:

```json

"checks" : [
    {
        // Fetch a number
        "selector": "//requests/request[name[text() = 'Homepage']]/percentiles/p95",
        "condition": "<= 1000"
    },
    {
        // Fetch Nodes by Regex
        "selector": "count(//transactions/transaction/name[matches(text(), 'T.*Cart')])",
        "condition": "> 0"
    },
    {
        // Compare Against a Number
        "selector": "count(//agents//totalCpuUsage/mean[number() > 90])",
        "condition": "= 0"
    }
```

### Selectors

It is often helpful to define a set of reusable expressions to query the test result document. These are selectors, which are defined as follows:

```javascript
{
    "selectors" : [
        {
            "id": "agentsWithCPULarger60p", // the ID of the selector - required
            "expression": "count(//agents//totalCpuUsage/mean[number() > 60])", // the XPath expression of the selector - required
            "comment" : "I can write a note to myself here"  // some comment; won't be evaluated - optional
        }
    ]
}
```

You can then use the selector in any rule check by referencing its selector id:

```json
"checks" : [
    {
        "selectorId": "agentsWithCPULarger60p", //predefined selector
        "condition": "= 0"
    }
]
```

### Groups

To model more complex criteria and to allow re-use of rules (and thus to avoid repetiitve definitions), rules are assigned to groups. A rule can be assigned to multiple groups. Rules must be assigned to a least one (enabled) group to become effective.

At least one enabled group having at least one enabled rule assigned must be specified in `groups` as follows:

```json
 "groups":[
    {
        "id": "homepageGroup", // the ID of the group for reference and listing in the report - required and unique
        "name": "Homepage", // the (more or less descriptive) name of the group - optional
        "comment": "Lorem ipsum ...", // some comment; won't be evaluated - optional
        "enabled": true, // helps to disable the entire group - optional, default = true
        "failsTest": false, // when true will mark the test as failed when the group failed - optional, default = false
        "mode": "allPassed", // the group's mode; used to define the source of points as well as the outcome of the group state; must be one of "firstPassed", "lastPassed" or "allPassed - optional, default = 'firstPassed'
        "description": "Just any text that explains the purpose", //  the text to display in the report, kinda help text like - optional, default empty
        // the list of rules assigned to this group and to evaluate in that order - required, at least one rule per group
        "rules": ["homepageResponseTimeA", "homepageResponseTimeB", "homepageResponseTimeC"]
    }
]
```

Groups are evaluated in the order of definition. Each rule evaluation triggers the evaluation of all rules assigned to it, in order of assignment. Rules that do not pass won't stop the evaluation of the remaining rules.

The number of achievable points as well as the computed number of achieved points depend on the group's **mode**:

| Mode | Achievable Points | Achieved Points |
|--------|--------|--------|
| _firstPassed_ | Max. of all rules' achievable points | First rule that passes |
| _lastPassed_ | Max. of all rules' achievable points | Last rule that passes  |
| _allPassed_ | Sum of all rules' achievable points | Sum of all rules that pass  |


### Rating

You can define a final rating for the entire test including the ability to mark it failed, following this pattern:

```json
{
    "id": "poor", // the ID of the rating for reference and listing in the report (used as fallback when no name is given) - required and unique
    "name": "Poor", // the name of the rating for reference and listing in the report - optional
    "enabled": true, // helps to disable the rating for testing purposes - optional, default = true
    "comment": "Lorem ipsum ...", // some comment; won't be evaluated - optional
    "description": "Load test performed poorly", //  the text to display in the report, kinda help text like - optional, default empty    
    "value": 50.0, // the upper limit for the rating  - required, must be greater than or equal to 0.0 and lower than or equal to 100.0
    "failsTest" : true // whether to mark the load test as failed when applied - optional, default = false
} 
```

To determine the test rating, all points from all rule groups will be summed up to calculate a percentage. Depending on the overall percentage of points achieved, a final rating is chosen from the list of ratings specified by the user and applied to the test. The ratings are ordered by value and have to cover 0 to 100%. The list of ratings is processed in the same order as specified and the first applicable rating defines the final rating. A rating is applicable when its value is greater than or equal to the overall percentage of achieved points.

So if we got a total of 30 achievable points and the passing rules evaluate to a total of 20, we have 66.7% as a final result, which would amount to the rating "Ok" in the example below: 

```json
"ratings" : [
    {
        "id": "poor",
        "name": "Poor",
        "enabled": true, 
        "description": "Load test performed poorly",
        "value": 50.0, // <= 50.0 %
        "failsTest" : true
    },
    {
        "id": "ok",
        "name": "Ok",
        "description": "Test result is acceptable",
        "value": 95.0 // <= 95.0 %
    },
    {
        "id": "success",
        "name": "Success",
        "description": "Test succeeded",
        "value": 100.0 // <= 100.0 %
    },
]
```

A load test can be marked as FAILED based on a rule or group failure that has the `failsTest`attribute set to `true` (hard fail by rule/group) or a rating that is configured accordingly. If neither a rule/group nor a rating is configured to mark the load test as failed, it is seen as PASSED regardless of the final score.

Note: A rule in state "ERROR" (due to one of its checks became erroneous, e.g. selector does not match any item or more than one item) **will not** mark the test as failed.

### Scorecard Result

The scorecard result is a quick final verdict on the test, based on all of the above evaluation results. Right now, it summarizes how many points were achieved and what the overall rating result is (including a list of rules or groups that failed the test if there were any).
