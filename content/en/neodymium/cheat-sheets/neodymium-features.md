---
title: "Features & Annotations"
weight: 3
type: docs
description: "Cheat sheet for Neodymium features and annotations."
---

## Useful Annotations

### Test JUnit5

`@NeodymiumTest` - on test methods

### Test JUnit4

`@RunWith(NeodymiumRunner.class)` - on test class
`@Test` - on test methods

### Browser

* `@Browser` - use default browser
* `@Browser("<browserId>")` - set browser to use
* `@RandomBrowser(<number of browsers to use>)` - use random browser
* `@SuppressBrowser()` - suppress all browser
* `@StartNewBrowserForSetUp` - new fresh browser for `@Before` and `@BeforeAll`
* `@StartNewBrowserForCleanUp` - new fresh browser for `@After` and `@AfterAll`

### General

`@WorkInProgress` - filter test methods of current class to only execute the ones with this annotation

## Test Data

Methods can have multiple `@DataSet()` annotations

* `@DataItem` - annotate POJO representing the test data to automatically inject the data into it
* `@DataSet(id="<dataSetId>")` - limit method to data set with defined id
* `@DataSet(<index>)` - limit method to dataset with defined index
* `@RandomDataSets(4)` - use 4 random data sets
* `@SuppressDataSets` - don’t use any data set
* `@DataFile("<path/to/file>")` - define path to test data if default should not be used

**Supported file formats ordered by priority:**

1. CSV
2. JSON
3. XML
4. properties

{{% warning notitle %}}
**Attention:** only JSON is currently supported for complex test data with nested objects! Simple key/value pairs can be used in all formats.
{{% /warning %}}

**Test data access:**

* `Neodymium.dataValue("<dataKey>")`
* `Neodymium.getData().asString("<key>")` - `as...()` function for all primitive types
* `DataItem` POJO - usual object access
* `Neodymium.getData().get(<testDataClass.class>)` - parses data manually into POJO instead of using @DataItem

Package test data to share common data among tests within the same package and its sub-packages in a file named `package_testdata`.

## Localization

* `localization.yaml` stored in `./config/localization.yaml` containing key value pairs of translations.
* locale defined in `neodymium.properties` as  `neodymium.locale=<locale>` or changed during tests using `Neodymium.configuration().setProperty("neodymium.locale", <locale>)`.

**Get localized texts during tests:**

* `Neodymium.localizedText("<key>")` - get localized text for current locale
* `Neodymium.localizedText("<key>", "<locale>")` - get localized text for given locale

**How to use different localization inside data driven tests:**

* Data sets define locale

  ```json
  [
    {
      "locale": "en_US",
      ...
    },
    {
      "locale": "de_DE",
      ...
    }
  ]
  ```

* Use base test class to handle locale for all tests

  ```java
  public abstract class AbstractTest
  {
      @BeforeEach
      public void setUpLocaleAndSite()
      {
          // get the locale from the test data
          String locale = Neodymium.getData().getOrDefault("locale", "");
  
          // and set it if it was provided
          if (!locale.isEmpty())
          {
              Neodymium.configuration().setProperty("neodymium.locale", locale);
          }
      }
  
  }
  ```

## Reports

* `@Step("description with {parameter}")` add description with parameter to function

  ```java
  @Step("assert this is a HomePage")
  public HomePage assertExpectedPage()
  {
      // ...
  }
  ```

* add custom info to report using `AllureAddons.addToReport("first part");`

  ```java
  @NeodymiumTest
  public void myTest1()
  {
      AllureAddons.addToReport("first part");
      // do something that would occur after the step "INFO: {first part}" in the report
  }
  ```

* add custom step with lambda without function and @Step annotation

  ```java
  @NeodymiumTest
  public void myTest2()
  {
      AllureAddons.step("first part", () -> {
          // do something that would occur within the step "first part" in the report
      });
  }
  ```

* **Links**: Automatically added to steps where the URL changes.
* **Test Data**: Automatically attached if `@DataItem` or `Neodymium.getData()` is used.
* **JSON Compare**: Using `JsonAssert.assertEquals(expected, actual, mode)` adds comparison with difference highlighting.
* **Environment**: Automatically contains Neodymium version and browsers. Extend with `neodymium.report.environment.custom.customData=customValue` (requires `neodymium.report.environment.enableCustomData=true`).

## Advanced Screenshots

Must be enabled in `neodymium.properties`: `neodymium.screenshots.enableAdvancedScreenshots=true`.

Customization properties:

```properties
neodymium.screenshots.fullpagecapture.enable=true
neodymium.screenshots.highlightViewport=false
neodymium.screenshots.highlightLastElement=true
neodymium.screenshots.highlightColor=#0000FF
neodymium.screenshots.enableOnSuccess=false
```

## Recording

Configuration in `config/gif-recording.properties` and `config/video-recording.properties`. Must have `<type>.enableFilming = true`.

| Property | Format | Description |
|---|---|---|
| enableFilming | bool | Enable recording |
| filmAutomatically | bool | Start recording automatically |
| deleteRecordingsAfterAddingToAllureReport | bool | Deletes recording file after adding to report |
| appendAllRecordingsToAllureReport | bool | If false, only failures are added |
| imageQuality | double | Image quality percentage (0.0 - 1.0) |

Manual recording:

```java
FilmTestExecution.startVideoRecording(String<fileName>);
// do stuff
FilmTestExecution.finishVideoFilming(String<fileName>, boolean <testFailed>);
```

## Accessibility

* Requires `npm install -g lighthouse`.
* Create report: `LighthouseUtils.createLightHouseReport("Homepage");`.
* Assertions in properties:

  ```properties
  neodymium.lighthouse.assert.thresholdScore.performance
  neodymium.lighthouse.assert.thresholdScore.accessiblity
  neodymium.lighthouse.assert.thresholdScore.bestPractices
  neodymium.lighthouse.assert.thresholdScore.seo
  neodymium.lighthouse.assert.audits=audit1 audit2
  ```

## PopUp Blocker

Will close non-deterministic pop-ups automatically if configured:

```properties
neodymium.popup.customPopUp=#myWindow
```

## PageObjects and Components

The [Page Object Model (POM)]({{< relref "../quick-start/page-objects.md" >}}) wraps all elements and functionality of a web page into an object.

```java
import com.codeborne.selenide.SelenideElement;
import io.qameta.allure.Step;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;

public class HomePage
{
    private final SelenideElement homePageBanner = $("#intro-text-homepage-banner");

    @Step("validate homepage")
    public HomePage assertExpectedPage()
    {
        homePageBanner.shouldBe(visible);
        return this;
    }

    @Step("open category {position}")
    public ProductListingPage openCategoryAtPosition(int position)
    {
        $("#category-picture-" + (position - 1)).scrollTo().click();
        return new ProductListingPage().assertExpectedPage();
    }
}
```

## Logging

* Using SLF4J. Log4j is suggested.
* Selenium logging can be verbose. Configure with `neodymium.seleniumLogLevel` (e.g. `SEVERE`, `WARNING`, `INFO`).

## Test Environments

See [Test Environments]({{< relref "../configuration/330-test-environments.md" >}}).

## Utility Classes

See [Utility Classes]({{< relref "../configuration/100-utility-classes.md" >}}).

## Cucumber

See [Cucumber]({{< relref "../framework/200-cucumber.md" >}}).
