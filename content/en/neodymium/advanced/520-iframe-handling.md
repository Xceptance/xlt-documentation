---
title: "IFrame Handling"
linkTitle: "IFrame Handling"
weight: 520
type: docs
description: "Handling iFrames in Neodymium."
---

### iFrame handling

An iFrame is used to display a webpage within a webpage. Sometimes it is necessary to access the contained elements for test automation. To do so we have to switch frame. For Selenide the syntax looks like this.

```Java
switchTo().frame($("#frame"));
```

If you finished your work within the iFrame you need to switch back to the main frame to execute any actions there. You could do this with the function above or you can use the following. It will always bring you back to the main frame.

```Java
switchTo().defaultContent();
```
