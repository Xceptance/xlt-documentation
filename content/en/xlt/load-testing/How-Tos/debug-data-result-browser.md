---
title: "How to Add Debug Data to the Result Browser"
linkTitle: "Debug Data in Result Browser"

weight: 260
type: docs

description: >
  A helpful feature for reproducing test case failures.
---

To aid in error analysis, XTC provides a feature that allows you to add custom debug data to the result browser: the session's **value log** is storage for session-specific test parameters and result data. Any value you add to this log will later be available in the result browser. 

{{< image src="user-manual/resultbrowser_value_log.png" >}}
Value Log in the Result Browser
{{< /image >}}

This feature is primarily intended to aid in error analysis. The data in
the result browser may help you reconstruct and rerun a failed test
case iteration without digging into log files, etc. Simply add any
value of special interest, and it will be available in the result
browser. This is especially useful if your test case uses random or
randomly chosen test parameters.

To address the problem with random test parameters, XLT adopts this
feature to make the seed value of `XltRandom`—used for the current
test iteration/session—available in the result browser. To rerun a
test case with this seed value (i.e., with the “same randomness”), copy
the seed value from the result browser, add the following line to your
`dev.properties` file, and re-execute the test as usual from your
preferred IDE:

```bash
com.xceptance.xlt.random.initValue = <copied seed value>
```

You may also add your own arbitrary values to the session’s value log.
See below for how to access the value log and add values to it:

```java
Map<String, Object> valueLog = Session.getCurrent().getValueLog();  
valueLog.put(“account.email”, randomEmail);  
valueLog.put(“cart.total”, currentCartTotal);
```

Your data will be stored as simple name/value pairs. Even though the log
accepts any `Object` as a value, it still needs to be converted to a
string for proper display in the result browser, so ensure that your
value classes provide a sensible `toString()` method.

{{% note notitle %}} In a load test, the value log is automatically cleared
between two iterations of your test scenario. {{% /note %}}