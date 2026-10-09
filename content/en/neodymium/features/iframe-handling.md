---
title: IFrame Handling
description: "Handling iFrames in Neodymium."
sidebar:
  label: IFrame Handling
  order: 520
---

### iFrame handling

An iFrame is used to display a webpage within a webpage. Sometimes it is necessary to access the contained elements for test automation. To do so, switching frames is required. The Selenide syntax is as follows:

```java
switchTo().frame($("#frame"));
```

After finishing work within the iFrame, switching back to the main frame is necessary to execute actions there. This can be done with the previous function or the following, which always returns to the main frame.

```java
switchTo().defaultContent();
```
