---
title: "Shadow DOM Testing"
linkTitle: "Shadow DOM Testing"
weight: 570
type: docs
description: "Testing Shadow DOM with Neodymium."
---

[Shadow DOM](https://javascript.info/shadow-dom) is a construct that helps create encapsulated web components. The self-contained nature of such components makes it hard to automate them. As their elements can not be accessed via regular Javascript. Selenide enables us to still handle these elements.

#### Showing the Shadow DOM Tree

To access the elements within a shadow DOM we need to have a look at the tree within. To show this tree we can simply use the [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools). If a component has a shadow DOM it will have a `#shadow-root`element as child. Everything under this element is considered the Shadow DOM.

#### Accessing the Shadow DOM

Selenide provides the `shadowCss`-function with which we can access the Shadow DOM elements. For this we need a CSSSelector identifying the parent, under which the Shadow DOM is located, and one which identifies the element we want to access. Below is an example how to use it.

```Java
$(Selectors.shadowCss("#target-element", "#shadowhost-element")).click()
```

This function will return a `WebElement` which can be used in the usual way.

The `shadowCss`-function can also be used to access a Shadow DOM within a Shadow DOM. For this we also need add a collection of selectors for the parents of the inner Shadow DOMs. The Syntax for this looks like this.

```Java
$(Selectors.shadowCss("#target-element", "#shadowhost-element", listOfInnerShadowHost))
```

#### Example Project

Some example test cases can be found [here](https://github.com/Xceptance/neodymium-showcase/tree/master/src/test/java/showcase/neodymium/tests/shadowdom).
