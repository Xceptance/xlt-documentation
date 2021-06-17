---
title: "How to Suppress Data Logging"
linkTitle: "Suppress Data Logging"

weight: 200
type: docs


description: >
  How to suppress logging of performance data.
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