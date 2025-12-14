---
title: "Debug Highlighting"

weight: 170
type: docs

description: >
  Highlighting the Last Interacted Element
---

Debugging or analyzing test automation built on Selenium-based WebDriver can be challenging. Because test execution is
often too fast to follow, it's hard to visualize which element was matched by the last selector. To address this, we
have added a highlighting feature.

### Highlighting the Current Selection

This feature marks every element that matches the current selector, allowing you to visually trace the execution path. A
chain of Selenide selectors will result in a corresponding chain of highlighted elements.

For instance, the selector `$('body').find('header');` will result in two highlights: the first on the entire `<body>`
element, and the second on the `<header>` element found within it.

The highlight is displayed for a configured duration, after which it is automatically reset to ensure it doesn't
interfere with the next action. The default duration is **100 milliseconds** if no value is specified.

{{% warning notitle %}}
The highlighting is disabled by default and when enabling it, the test runtime will increase.
{{% /warning %}}

### Configuration

These configurations are managed in the `config/neodymium.properties` file:

| Property                                  | Description                                                   |
|-------------------------------------------|---------------------------------------------------------------|
| `neodymium.debugUtils.highlight`          | A boolean flag to enable or disable the highlighting feature. |
| `neodymium.debugUtils.highlight.duration` | The duration of the element highlight in milliseconds.        |

### Example

```properties
neodymium.debugUtils.highlight=true
neodymium.debugUtils.highlight.duration=100
```
