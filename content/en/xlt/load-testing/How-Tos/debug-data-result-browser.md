---
title: "How to Add Debug Data to the Result Browser"
linkTitle: "Debug Data in Result Browser"

weight: 260
type: docs

description: >
  A helpful feature for reconstructing testcase failures.
---

To aid in error analysis, XTC provides a feature that allows you to add your custom debug data to the result browser: the session's **value log** is a storage for session-specific test parameters and result data. Any value you add to this log will later be available in the result browser. 

{{< image src="how-to/custom_result_browser_data.png" >}}
Result browser containing custom debug data.
{{< /image >}}

Note that the log will be cleared with each new iteration of the test scenario.This data may help you to reconstruct and rerun a failed test case iteration without having to dig into log files. This is especially useful if your test case uses random or randomly chosen test parameters.

You can add data to the value log at any point in your test scenario:

```java
Session.getCurrent().getValueLog().put("data.I.want.to.keep", "This is essential data for reconstructing the test case I just ran."); 
```

Data is stored as name/value pairs. Even though the log accepts any Object as the value, the value will later be converted to a string using `Object.toString()` for proper display in the result browser. So make sure your value classes implement this method appropriately.