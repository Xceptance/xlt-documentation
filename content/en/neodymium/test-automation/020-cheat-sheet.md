---
title: "Cheat Sheet"

weight: 20
type: docs

description: >
  Quick overview on what you need to Know to solve 90% of your working tasks
---

# Useful Annotations

@NeodymiumTest

@RunWith(NeodymiumRunner.class)
@Test

@Browser()
@RandomBrowser()
@SuppressBrowser()

@DataSet
@SuppressDataSet
@DataFile
@DataItem

@StartNewBrowserForSetUp
@StartNewBrowserForCleanUp

@WorkInProgress


# Selenide Basics

$()
$$()

slider?

shadow dom
$(Selectors.shadowCss("#target-element", "#shadowhost-element")).click()

iframes
switchTo().frame($("#frame"));
switchTo().defaultContent();


# Configuration


## Neodymium

neodymium.url	<none>	The URL of the web site to test
neodymium.debugUtils.highlight	false	Should elements highlighted that are selected by Selenide

neodymium.url.includeList	<none>	A list of URLs that the test is allowed to visit. Separated by whitespaces
neodymium.url.excludeList	<none>	A list of URLs that the test is forbidden to visit. Separated by whitespaces


## Browser

browserprofile.Chrome_1600x1200.name = Chrome 1600x1200
browserprofile.Chrome_1600x1200.browser = chrome
browserprofile.Chrome_1600x1200.browserResolution = 1600x1200


# Credentials properties


# Setup and Run

* as JUnit test via IDE
* `mvn clean test` for all tests
* `mvn clean test -Dtest=<NameOfTestClass>` for specific tests
* `mvn allure:serve` to generate and show the report


# Test Data

supported file formats ordered by priority

* CSV
* JSON
* XML
* Properties

TODO package test data

Neodymium.dataValue("<dataKey>")

@DataSet
@SuppressDataSet
`@DataFile("path/to/file")`
@DataItem


TestDataClass


# Localization

Neodymium.localizedText("<LocalizationKey>")


# Accessibility

create report

```java
// go to homepage
var homePage = OpenHomePageFlow.flow();
LighthouseUtils.createLightHouseReport("Homepage");
```

properties

neodymium.lighthouse.assert.thresholdScore.performance
neodymium.lighthouse.assert.thresholdScore.accessiblity
neodymium.lighthouse.assert.thresholdScore.bestPractices
neodymium.lighthouse.assert.thresholdScore.seo

neodymium.lighthouse.assert.audits


# Reports

* `mvn allure:serve` to generate and show the report
* `@Step("description with {parameter}")` add description with parameter to function

```java
@NeodymiumTest
public void myTest1()
{
    AllureAddons.addToReport("first part");
    // do something that would occur after the step "INFO: {first part}" in the report
}
```

```java
@NeodymiumTest
public void myTest2()
{
    AllureAddons.step("first part", () -> {
        // do something that would occur within the step "first part" in the report
    });
}
```

links

test data

json compare

environment section


# Advanced Screenshots

neodymium.screenshots.enableAdvancedScreenshots = true
neodymium.screenshots.highlightLastElement
neodymium.screenshots.highlightColor = #0000FF
neodymium.screenshots.fullpagecapture.enable

# Recording

property
gif.enableFilming=true
video.enableFilming=true

enableFilming	gif & video	bool	To be set, to enable recording, if false all other recording properties are ignored
filmAutomatically	gif & video	bool	Defines, if recording starts automatically when browser is opened or recording needs to be started manually in the code.
deleteRecordingsAfterAddingToAllureReport	gif & video	bool	Deletes recording in recording folder after adding to allure report to save space
appendAllRecordingsToAllureReport	gif & video	bool	Defines whether the recordings are added to the report, For false only failures are added.

manual recording

FilmTestExecution.startVideoRecording(String <fileName>);
// some
FilmTestExecution.finishVideoFilming(String <fileName>, boolean <testFailed>);


# PopUp Blocker

neodymium.popup.customPopUp = #myWindow


# Cucumber


# PageObjects and Components


# Mobile Tests


# Logging


# Random Test Data


# WebDriver

In case you need access to the current WebDriver. You can retrieve it by calling:

Neodymium.getDriver()

If you need EventFiringWebDriver instance of current WebDriver, please call the method below, it will make all casts for you

Neodymium.getEventFiringWebdriver()

For the case, when an instance of RemoteWebDriver, which is wrapped in current WebDriver, is needed, please use the method below, it will make all casts for you

Neodymium.getRemoteWebDriver()

If you need to take special action because of the used browser profile, you can retrieve the browser profile name by calling:

Neodymium.getBrowserProfileName()

If the used browser type requires special interactions you can retrieve the browser name (type) by calling:

Neodymium.getBrowserName()

If an embedded local proxy is used within the test. Its instance can be retrieved via the following method to utilize it for even more scenarios.

Neodymium.getLocalProxy()

The current state and the objects belonging to the current execution of the browser can be retrieved via following method. The retrieved WebDriverStateContainer contains the current WebDriver, the embedded local BrowserUpProxy if used and a counter that state how often the current execution setup was used.

Neodymium.getWebDriverStateContainer()


# Test Environments


# Utility Classes

## SelenideAddons

## AllureAddons

## JavaScriptUtils

## TestData


# General

download?
Basic Auth?


# Useful Tricks
