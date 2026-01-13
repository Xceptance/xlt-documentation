---
title: "Selenide & WebDriver"
weight: 3
type: docs
description: "Cheat sheet for Selenide and WebDriver interactions."
---

## Selenide Basics

For more details on Selenide please refer to the official [documentation](https://selenide.org/documentation.html)

### Navigation

* `Selenide.open(<url>)` - opens a URL inside the configured Browser
* `Selenide.open(Neodymium.configuration().url())` - open the configured URL from the neodymium.properties
* `Selenide.open(AuthenticationType.BASIC,new BasicAuthCredentials(Neodymium.configuration().basicAuthUsername(), Neodymium.configuration().basicAuthPassword())` - open the configured URL with the configured credentials

### Element Selection

* `$(<"CSS locator>")` - select single element via CSS
* `$$("<CSS locator>")` - select collection of elements via CSS
* `$x("<xPath>")` - select single element via xPath
* `$$x("<xPath>")` - select collection of elements via xPath
* `$$("<locator>").findBy(exactText("some text"))` - find an element inside a list with a specific text

### Interaction

* `$("<locator>").click()` - clicks an element (scrolls the element into view upfront)
* `$("<locator>").scrollTo()` - scrolls to the element
* `$("<locator>").hover()` - hovers over an element
* `$("<locator>").setValue(<value>)` - sets the value attribute of an element
* `$("<locator>").sendKeys(Keys.ENTER)` - sends the enter key to the element

### Validations

* `$("<locator>").shouldBe(visible)` - validates that the element is visible
* `$("<locator>").should(exist)` - validates that the element exists
* `$("<locator>").shouldNot(exist)` - validates that the does not exist

### Advanced Interactions

* **Sliders**: Neodymium's `SelenideAddons` can handle sliders.

    ```java
    // the slider element that will be used for the test
    SelenideElement sliderMove = $("<locator of the moveable part of the slider>");
    SelenideElement sliderValue = $("<locator of the value part of the slider>");

    // The following method call will move the slider element 40px to the right and check for [aria-valuenow=8],
    // and will retry this movement 3 times with a 2000 seconds delay in between two tries.
    SelenideAddons.dragAndDropUntilCondition(
                          sliderMove,                       // the element that will be moved
                          sliderValue,                      // the element that will be checked for the attribute
                          40,                               // pixel to move (horizontal)
                          0,                                // pixel to move (vertical)
                          2000,                             // pause in ms between two tries
                          3,                                // max number of retries
                          attribute("aria-valuenow","8")    // the attribute that should be gained
                       );
    ```

* **Shadow DOM**: Find elements inside a shadow dom.
  * `$(Selectors.shadowCss("#target-element", "#shadowhost-element")).click()`

* **iFrames**: Switch to an iframe (and back).
  * `switchTo().frame($("<locator>"));` - switch into iFrame
  * `switchTo().defaultContent();` - switch back

## WebDriver

* `Neodymium.getDriver()` - get current WebDriver
* `Neodymium.getEventFiringWebdriver()` - get current WebDriver as EventFiringWebDriver
* `Neodymium.getRemoteWebDriver()` - get RemoteWebDriver if wrapped in current WebDriver
* `Neodymium.getBrowserProfileName()` - get used browser profile name
* `Neodymium.getBrowserName()` - get used browser name
* `Neodymium.getLocalProxy()` - get embedded local proxy
* `Neodymium.getWebDriverStateContainer()` - get state and the objects belonging to the current execution of the   browser. Contains the current WebDriver, the embedded local BrowserUpProxy if used and a counter that state how often the current execution setup was used

## More Cheat Sheets

* [Setup & Run]({{< relref "setup-and-run.md" >}}) - Define, run tests, and generate reports.
* [Features & Annotations]({{< relref "neodymium-features.md" >}}) - Test data, reports, accessibility, and more.
* [Properties]({{< relref "properties.md" >}}) - Configuration files and browser setups.
