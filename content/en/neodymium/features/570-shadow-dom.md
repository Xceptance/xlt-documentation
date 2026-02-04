---
title: "Shadow DOM Testing"
linkTitle: "Shadow DOM Testing"
weight: 570
type: docs
description: "Testing Shadow DOM with Neodymium."
---

[Shadow DOM](https://javascript.info/shadow-dom) is a construct that helps create encapsulated web components. The self-contained nature of such components makes it hard to automate them, as their elements cannot be accessed via regular JavaScript. Selenide enables handling of these elements.

#### Showing the Shadow DOM Tree

To access the elements within a Shadow DOM, inspecting the tree within is necessary. To show this tree, simply use the [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools). If a component has a Shadow DOM, it will have a `#shadow-root` element as a child. Everything under this element is considered the Shadow DOM.

#### Accessing the Shadow DOM

Selenide provides the `shadowCss` function to access Shadow DOM elements. For this, a CSS Selector identifying the parent, under which the Shadow DOM is located, and one which identifies the element to be accessed, are needed. Below is an example of how to use it.

```Java
$(Selectors.shadowCss("#target-element", "#shadowhost-element")).click()
```

This function returns a `WebElement` which can be used in the standard manner.

The `shadowCss` function can also be used to access a Shadow DOM within a Shadow DOM. For this, a collection of selectors for the parents of the inner Shadow DOMs must be added. The syntax for this is as follows:

```Java
$(Selectors.shadowCss("#target-element", "#shadowhost-element", listOfInnerShadowHost))
```

#### Example Project

Some example test cases can be found [here](https://github.com/Xceptance/neodymium-showcase/tree/master/src/test/java/showcase/neodymium/tests/shadowdom).
