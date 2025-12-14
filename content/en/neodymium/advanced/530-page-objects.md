---
title: "Page Objects"
linkTitle: "Page Objects"
weight: 530
type: docs
description: "Using Page Objects in Neodymium."
---

Page objects are a pattern that describes how to wrap the functionality of a web page. Page objects simplify web pages to simple objects and reduce the amount of duplicated code. In order to reuse already written code even more, we introduce the concept of components to implement functionality that is common to different pages in a single place.

## Introduction

Page objects are described in different places e.g. [Selenium PageObjects](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/) or [Martin Fowler PageObject]( https://martinfowler.com/bliki/PageObject.html). Since we use Selenide for scripting, we also use their way of handling them [Selenide Page Objects](http://selenide.org/documentation/page-objects.html).

Page Objects objectives:

* be stateless
* act as API to wrap the functionality of the web page
* prevent code duplication
* hide the selectors from the test cases

## Components

Various pages of a website may share elements with the same functionality e.g. a search field, a mini cart, a navigation or a user menu. In fact those elements are products of one implementation in a normal web development environment. So why should we duplicate our code to interact with those for each page object? We wanted to use a concept that follows the same objectives as page objects. We thought about it and came up with components.

Components help to separate code into maintainable amounts since most of the components have a small set of interactions. We use them to build different kinds of basic page objects that mostly share the same functionality and differ only in their site specific code. For instance a search result page, a product list page and a product page share the same header and footer but differ in their main content. So we implement the header and the footer as components that can be used within the pages while the page object classes just implement the interactions and validation of their specific content.

## Best practices

You can use `SelenideElement`s to keep your page objects and components stateless and maintain your CSS selectors at the same time.

```
public class MiniCart extends AbstractComponent
{
    private SelenideElement headerCart = $("#headerCartOverview");

    private final static String miniCartSelector = "#miniCartMenu";

    private SelenideElement miniCart = $(miniCartSelector);

    private SelenideElement subOrderPrice = $(miniCartSelector + " .subOrderPrice");
```

The definition of the elements doesn't lead to an instant lookup since the function `$(SELECTOR);` is implemented in a lazy manner. But keep in mind that every method call on the `SelenideElement` also leads to its validation.
Therefore, you should not chain (e.g. `$().find()`) them when you define your class field. A solution to this matter could be a String to keep the selector that is part of both elements defined only in one place.
