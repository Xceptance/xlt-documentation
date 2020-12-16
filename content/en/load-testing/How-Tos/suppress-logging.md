---
title: "Suppress Data Logging"

weight: 1
type: docs


description: >
  How-to suppress logging of performance data.
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