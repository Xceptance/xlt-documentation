---
title: "Pop-up Blocker Utility"

weight: 180
type: docs

description: >
  TODO
---

{{< TODO >}}add description{{< /TODO >}}

## Pop-up Blocker Utility

Pop-ups are a common feature in web applications. During test execution, it is often necessary to automatically close
certain pop-ups to ensure a smooth test flow. For this purpose, we have implemented a JavaScript-based, in-page Pop-up
Blocker.

## Purpose and Best Practice

We strongly recommend that any pop-ups within your tested application be deterministic and handled explicitly within
your test flows. However, when working with external or black-box applications where you cannot control the pop-up
behavior, automatically closing non-critical pop-ups with this feature can help stabilize your tests and reduce
execution time.

## Configuration

To enable this utility, you must provide the **CSS selector** of the element that closes the pop-up (e.g., a 'Close'
button or an 'X' icon). Store this selector in your properties file using a custom key:

```properties
neodymium.popup.customPopUp=#myWindowCloseButton
```

The system will then automatically search for this specific element. As soon as the element is found, a click action
will be triggered.

{{% warning notitle %}}
**Attention:** The Pop-up Blocker is currently only implemented for **CSS selectors**.
{{% /warning %}}

The interval in milliseconds at which the system attempts to find and close the pop-up can be configured using the
`neodymium.popupInterval` property.

{{< TODO >}}Properties sind nicht konsistent: neodymium.popup.customPopUp aber neodymium.popupInterval für das
Intervall. Sollte man ggf anpassen{{< /TODO >}}
