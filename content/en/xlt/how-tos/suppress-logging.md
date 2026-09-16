---
title: How to Suppress Data Logging
description: "Learn how to suppress the logging of performance data.\n"
sidebar:
  label: Suppress Data Logging
  order: 200
---

```java
try 
{
        Session.getCurrent().getDataManager().setLoggingEnabled(false);
        // warm-up stuff
} 
finally 
{
        Session.getCurrent().getDataManager().setLoggingEnabled(true);
} 
```