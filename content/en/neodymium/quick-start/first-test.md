---
title: "First Test"
linkTitle: "First Test"
weight: 20
type: docs

description: >
  Write and run your first browser-based test with Neodymium.
---

This tutorial shows you how to write browser-based test automation with Neodymium from scratch.

A more complex test suite setup can be found in the [neodymium-template project](https://github.com/Xceptance/neodymium-template), which includes necessary dependencies, configuration files, and a basic test utilizing the Page Object Model pattern, Cucumber, and more.

Throughout this guide, we will create basic tests for the [Xceptance Poster Demo Store](https://github.com/Xceptance/posters-demo-store). Instead of setting up the store locally, we will use the [hosted online version](https://posters.xceptance.io:8443/).

## Example Test

This example demonstrates a fundamental Neodymium test. It illustrates how to open a website, perform actions on it, and verify the state of elements. The code uses only the essential `@NeodymiumTest` and `@Browser` annotations, showing the minimal setup necessary for Neodymium browser testing.

* `@NeodymiumTest` is required to execute the test with Neodymium.
* `@Browser` assigns the default browser to the test. This annotation is mandatory for all tests using a browser; without it, Neodymium cannot handle the browser, causing advanced features (like video recording) to fail.

```java
import com.codeborne.selenide.Selenide;
import com.codeborne.selenide.SelenideElement;
import com.xceptance.neodymium.common.browser.Browser;
import com.xceptance.neodymium.junit5.NeodymiumTest;

import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;

@Browser
public class FirstTest
{
    @NeodymiumTest
    public void firstTest()
    {
        // open the test website
        Selenide.open("https://posters.xceptance.io:8443/");

        // interacting with elements and assert states
        // get a single element
        $("#category-picture-0").scrollTo();
        $("#category-picture-0").click();

        // get a collection and select a specific element
        SelenideElement firstProductCard = $$(".product-tile").first();
        String productName = firstProductCard.find(".card-title").getText();
        firstProductCard.find(".card-body a").click();

        // validate the page
        $("#product-detail-form-name").shouldBe(visible);
        $("#product-detail-form-name").shouldHave(text(productName));
    }
}
```

## Executing Tests

To execute the tests in your IDE, you can run them as any other JUnit test. It is also possible to run them via Maven:

* `mvn clean test` to execute all tests
* `mvn clean test -Dtest=<NameOfTestClass>` to execute specific tests
* `mvn clean test -Dtest=<NameOfTestClass>#<NameOfTestMethod>` to execute a specific test method
