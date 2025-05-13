---
title: "Cheat Sheet"

weight: 20
type: docs

description: >
  Quick overview on what you need to Know to solve 90% of your working tasks
---

## Setup and Run / Quick Start

### Define Test

#### JUnit5

```java
@Browser
public class SomeTest
{
    @NeodymiumTest
    public void someTestMethod()
    {
        ...
    }
}
```

#### JUnit4

```java
@RunWith(NeodymiumRunner.class)
@Browser
public class SomeTest
{
    @Test
    public void someTestMethod()
    {
        ...
    }
}
```

### Run Tests

* as JUnit test via IDE
* `mvn clean test` for all tests
* `mvn clean test -Dtest=<NameOfTestClass>` for specific tests

### Generate Reports

* `mvn allure:serve` to generate and show the report

### Recommended pom.xml

```
   <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>

        <allure.version>2.12.0</allure.version>
        <aspectj.version>1.9.22</aspectj.version>
        <neodymium.version>5.2.0</neodymium.version>
        <surefire.version>3.5.2</surefire.version>
    </properties>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>${surefire.version}</version>
                <configuration>
                    <testFailureIgnore>true</testFailureIgnore>
                    <argLine>
                        -javaagent:"${settings.localRepository}/org/aspectj/aspectjweaver/${aspectj.version}/aspectjweaver-${aspectj.version}.jar"
                    </argLine>
                    <systemPropertyVariables>
                        <allure.results.directory>${project.build.directory}/allure-results</allure.results.directory>
                        <selenide.reports>${project.build.directory}/selenide-results</selenide.reports>
                    </systemPropertyVariables>
                </configuration>
                <dependencies>
                    <dependency>
                        <groupId>org.aspectj</groupId>
                        <artifactId>aspectjweaver</artifactId>
                        <version>${aspectj.version}</version>
                    </dependency>
                </dependencies>
            </plugin>
            <plugin>
                <groupId>io.qameta.allure</groupId>
                <artifactId>allure-maven</artifactId>
                <version>${allure.version}</version>
                <configuration>
                    <reportVersion>2.27.0</reportVersion>
                    <resultsDirectory>${project.build.directory}/allure-results</resultsDirectory>
                </configuration>
            </plugin>
        </plugins>
    </build>

    <dependencies>
        <dependency>
            <groupId>com.xceptance</groupId>
            <artifactId>neodymium-library</artifactId>
            <version>${neodymium.version}</version>
        </dependency>
    </dependencies>
```

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

### Test Data

Methods can have multiple `@DataSet()` annotations

* `@DataSet("<dataSetId>")` - limit method to data set with defined id
* `@DataSet(<index>)` - limit method to dataset with defined index
* `@RandomDataSets(4)` - use 4 random data sets
* `@SuppressDataSets` - don’t use any data set
* `@DataFile("<path/to/file>")` - define path to test data if default should not be used
* `@DataItem` - annotate POJO representing the test data to automatically inject the data into it

### General

`@WorkInProgress` - filter test methods of current class to only execute the ones with this annotation

## Selenide Basics

{{< TODO >}}refer to Selenide Doku{{< /TODO >}}

* `$()` - select single element
* `$$()` - select collection of elements

* handle sliders:
    * using the custom implementation in SelenideAddons:
      `SelenideAddons.dragAndDropUntilCondition(<ElementForMovement>, <ElementForValidation>, <OffsetHorizontalMovement>, <OffsetForVerticalMovement>, <PauseBetweenMovements>, <MaxRetries>,<ConditionUntilTheMovementIsPerformed>);`
    * e.g.
      `SelenideAddons.dragAndDropUntilCondition($(".balSlider [role=slider]"), $(".balSlider [role=slider]"), 40, 0, INTERACTION_PAUSE, MAX_RETRIES,attribute("aria-valuenow", "8"));`

```java
// the slider element that will be used for the test
SelenideElement elementUnderTest = $(".balSlider [role=slider]").scrollIntoView("{block:'center'}");

// Interaction: move the slider to the right
//
// element for movement: elementUnderTest
// element for validation: elementUnderTest
// offset for the horizontal movement: 40
// offset for the vertical movement: 0
// pause between movements: 3000ms
// retries: 5
// condition until the movement is performed: aria-valuenow = 8
SelenideAddons.

dragAndDropUntilCondition($(".balSlider [role=slider]"),$(".balSlider [role=slider]"),40,0,INTERACTION_PAUSE,MAX_RETRIES,

attribute("aria-valuenow","8"));
```

* shadow dom
    * `$(Selectors.shadowCss("#target-element", "#shadowhost-element")).click()`

* iframes
    * `switchTo().frame($("#frame"));` - switch into iFrame
    * `switchTo().defaultContent();` - switch back

## Configuration

The most important configuration files are listed below:

* neodymium.properties
* browser.properties
* credentials.properties
* gif-recording.properties
* video-recording.properties

properties files must reside in the `./config/*.properties` directory at the project root

`dev-*.properties` files can be used to override or add values

The loading order for these properties is as follows:

1. System properties
2. temporary config file
3. `config/dev-neodymium.properties`
4. System environment variables
5. `config/credentials.properties`
6. `config/neodymium.properties`

In cases where a property is found in several files, the value from the file with the highest priority is used.

### Neodymium

#### URL properties

| Property                  | Default value | Description                                                                |
|---------------------------|:-------------:|----------------------------------------------------------------------------|
| neodymium.url             | &lt;none&gt;  | URL of the website to test                                                 |
| neodymium.url.protocol    | &lt;none&gt;  | protocol used to access the site                                           |
| neodymium.url.host        | &lt;none&gt;  | host encoded in the URL                                                    |
| neodymium.url.path        |       /       | path on the site that is used as test entry point                          |
| neodymium.url.site        | &lt;none&gt;  | site/channel part of the url                                               |
| neodymium.url.includeList | &lt;none&gt;  | list of URLs that the test is allowed to visit. Separated by whitespaces   |
| neodymium.url.excludeList | &lt;none&gt;  | list of URLs that the test is forbidden to visit. Separated by whitespaces |

#### Localization

| Property                    | Default value            | Description                                                                   |
|-----------------------------|--------------------------|-------------------------------------------------------------------------------|
| neodymium.locale            | en_US                    | The locale that should be used to lookup translations in localization feature |
| neodymium.localization.file | config/localization.yaml | Path to the YAML formatted file that contains localized data for the site     |

#### Basic authentication properties

| Property                     | Description                                           |
|------------------------------|-------------------------------------------------------|
| neodymium.basicauth.username | Username that should be used for basic authentication |
| neodymium.basicauth.password | Password that should be used for basic authentication |

#### Debugging properties

| Property                                | Default value | Description                                      |
|-----------------------------------------|---------------|--------------------------------------------------|
| neodymium.debugUtils.highlight          | false         | Highlight elements that are selected by Selenide |
| neodymium.debugUtils.highlight.duration | 100 (ms)      | How long should an element be highlighted        |

#### Selenide properties

| Property                        | Default value | Description                                          |
|---------------------------------|---------------|------------------------------------------------------|
| neodymium.selenide.timeout      | 3000 (ms)     | How long should Selenide wait to match a condition   |
| neodymium.selenide.fastSetValue | false         | The values of input field will be set via JavaScript |
| neodymium.selenide.clickViaJs   | false         | The clicks will be executed via JavaScript           |

#### Popup Blocker

Neodymium can automatically handle unpredictable pop-ups using its pop-up blocker. Configure this by setting the
`neodymium.popup.customPopUp` property to the close button's selector, such as the following.

```properties
neodymium.popup.customPopUp=#myWindow
```

For predictable pop-ups, manual handling is preferred; the blocker should be reserved for cases where it's essential.

#### Further properties

All remaining aspects of `neodymium.properties` will be covered in the full properties guide, including:

{{< TODO >}}link the properties wiki section when it was moved{{< /TODO >}}<br>

* Neodymium context properties
* JavaScriptUtils properties
* Proxy configuration properties
* Local proxy configuration properties
* Browser behavior configuration

### Browser

* in `.config/browser.properties`
* with format `browserprofile.<browserId>.<property> = <value>`

```properties
browserprofile.Chrome_1600x1200.name=Chrome 1600x1200
browserprofile.Chrome_1600x1200.browser=chrome
browserprofile.Chrome_1600x1200.browserResolution=1600x1200
```

* select browser with `@Browser("<browserId>")`
* use default browser with `@Browser`
* prevent browser start with `@SuppressBrowsers`

| Property                   | Mandatory             | Description                                                                                                                                                                                                                                                                     |
|----------------------------|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name                       | YES                   | more detailed name used for reporting.                                                                                                                                                                                                                                          |
| browser                    | YES                   | test browser (valid values: `iphone`, `ipad`, `android`, `firefox`, `chrome`, `internetexplorer`, `safari`)                                                                                                                                                                     |
| version                    | device emulation only | browser version to use **OR** OS version of an emulated device                                                                                                                                                                                                                  |
| browserResolution          | NO                    | width and height of the browser window in format `1200x900` or `1200X900` or `1200,900`                                                                                                                                                                                         |
| pageLoadStrategy           | NO                    | defines when the web driver will return from a page load<br>valid values: <ul><li>`normal`: (default) call returns when load event was fired</li><li>`eager`:  returns when DOMContentLoaded event was fired</li><li>`none`: returns immediately</li></ul>                      |
| headless                   | NO                    | Boolean property to run in headless mode. Default value is false.<br>**NOTE**: Currently only supported for Firefox and Chrome.                                                                                                                                                 |
| acceptInsecureCertificates | NO                    | Boolean property to accepts insecure certificate or not.                                                                                                                                                                                                                        |
| arguments                  | NO                    | Additional command line arguments for the browser to apply. As you can specify only on 'arguments' property for a browser at a time you need to chain multiple arguments. Multiple arguments are chained by semicolon (";") e.g.: `-window-position=0,0 ; -window-size=400,300` |

* the following properties can be set globally for all browsers

```properties
browserprofile.global.pageLoadStrategy=normal|eager|none
browserprofile.global.headless=true|false
browserprofile.global.acceptInsecureCertificates=true|false
browserprofile.global.browserResolution=1200x900
```

### Credentials properties

* URLs and credentials for SauceLabs and BrowserStack
* stored in the `.config/credential.properties`

```properties
## Sauce Labs Credentials
browserprofile.testEnvironment.saucelabs.url=https://ondemand.saucelabs.com:443/wd/hub
browserprofile.testEnvironment.saucelabs.username=MyAccount
browserprofile.testEnvironment.saucelabs.password=secret
```

## Test Data

supported file formats ordered by priority

* CSV
* JSON
* XML
* Properties

{{% warning notitle %}}
**Attention:** only JSON is currently supported for complex test data with nested objects! Simple key/value pairs can be
used in all formats.
{{% /warning %}}

Automatic access to test data files found in the resource folder with matching paths to the test
All test methods will be executed with all data sets of the test data file if not set otherwise

* `@DataSet("<dataSetId>")` - limit method to data set with defined id
* `@DataSet(<index>)` - limit method to dataset with defined index
* `@RandomDataSets(4)` - use 4 random data sets
* `@SuppressDataSets` - don’t use any data set
* `@DataFile("<path/to/file>")` - define path to test data if default should not be used
* `@DataItem` - annotate POJO representing the test data to automatically inject the data into it

Test data access:

* `Neodymium.dataValue("<dataKey>")`
* `Neodymium.getData().asString("<key>")` - `as...()` function for all primitive types
* `DataItem` POJO - usual object access
* `Neodymium.getData().get(<testDataClass.class>)` - pars manually into POJO instead of using @DataItem

Package test data to share common data among tests within the same package and its sub-packages in a file named
`package_testdata`

## Localization

* `localization.yaml` stored in `./config/localization.yaml` containing key value pairs of translations
* locale defined in `neodymium.properties` as  `neodymium.locale=<locale>` or changed during tests using
  `Neodymium.configuration().setProperty("neodymium.locale", <locale>)`

Get localized texts during tests:

* `Neodymium.localizedText("<key>")` - get localized text for current locale
* `Neodymium.localizedText("<key>", "<locale>")` - get localized text for given locale

How to use different localization inside data driven tests:

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

## Multibrowser

* prerequisites `browser.properties` file located in `./config/browser.properties` defining the browsers with format
  `browserprofile.<browserId>.<property> = <value>`

```properties
browserprofile.Chrome_1200x768.name=Chrome 1200x768
browserprofile.Chrome_1200x768.browser=chrome
browserprofile.Chrome_1200x768.browserResolution=1200x768
```

* Attach all browsers to base test class to test everything with all browsers using `@Browser("<browserId>")`

```java

@Browser("Chrome_1200x768")
@Browser("Firefox_1200x768")
public abstract class AbstractTest
{
    ...
}
```

## Accessibility

* requires lighthouse independently installed using `npm install -g lighthouse`
* Create a report at any point during test: `LighthouseUtils.createLightHouseReport("Homepage");`
* Accessibility properties with values in range 0 < _Value_ <= 1:

```properties
neodymium.lighthouse.assert.thresholdScore.performance
neodymium.lighthouse.assert.thresholdScore.accessiblity
neodymium.lighthouse.assert.thresholdScore.bestPractices
neodymium.lighthouse.assert.thresholdScore.seo
```

* Assert specific audits automatically which are defined in the properties:

```properties
neodymium.lighthouse.assert.audits=audit1 audit2
```

## Reports

* `mvn allure:serve` to generate and show the report
* `@Step("description with {parameter}")` add description with parameter to function

```java

@Step("assert this is a HomePage")
public HomePage assertExpectedPage()
{
    ...
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

* Links will automatically be added to steps where the URL changes
* test data will automatically be attached if `@DataItem`, `Neodymium.getData().as…("<key>")` or
  `Neodymium.getData().get(<testDataClass.class>)` is used
* json compare
    * Using `JsonAssert.assertEquals(expectedJson, actualJson, JSONCompareMode.STRICT_ORDER);` or
      `JsonAssert.assertNotEquals(expectedJson, actualJson, JSONCompareMode.STRICT_ORDER);` to compare JSON files and
      add
      comparison with difference highlighting to report
* environment section will automatically contain Neodymium version and used browsers but is extendable with custom data
  in properties like the following
    * `neodymium.report.environment.enableCustomData=true` is necessary
    * `neodymium.report.environment.custom.customData=customValue` will add customData with value customValue

## Advanced Screenshots

* must be enabled in the `neodymium.properties` using:

```properties
neodymium.screenshots.enableAdvancedScreenshots=true
```

* can be customized using the following properties:

```properties
neodymium.screenshots.highlightLastElement=true
neodymium.screenshots.highlightColor=#0000FF
Neodymium.screenshots.fullpagecapture.enable=true
```

## Recording

* configuration files `config/gif-recording.properties` and `config/video-recording.properties`
* must have the `<type>.enableFilming = true` to be enabled like following

```properties
gif.enableFilming=true
video.enableFilming=true
```

| Property                                  | Format | Description                                                                                                |
|-------------------------------------------|--------|------------------------------------------------------------------------------------------------------------|
| enableFilming                             | bool   | Enable recording, if false all other recording properties are ignored                                      |
| filmAutomatically                         | bool   | Start recording automatically when browser is opened or recording needs to be started manually in the code |
| deleteRecordingsAfterAddingToAllureReport | bool   | Deletes recording in recording folder after adding to allure report to save space                          |
| appendAllRecordingsToAllureReport         | bool   | Defines whether all recordings are added to the report, For false only failures are added.                 |
| imageQuality                              | double | Defines the value of the desired image quality percentage (value range: 0 &lt; `imageQuality` &le; 1.0)    |

* use manual recording when automatic recording is off:

```java
FilmTestExecution.startVideoRecording(String<fileName>);
// do stuff
FilmTestExecution.

finishVideoFilming(String<fileName>, boolean <testFailed>);
```

## PopUp Blocker

* Will close non-deterministic pop-ups automatically if the selector to the close button is configured in the
  `neodymium.properties`:

```properties
neodymium.popup.customPopUp=#myWindow
```

## PageObjects and Components

* use Page Object Model is to wrap all elements and functionality of a web page into an object
* reduce duplicate code, support reusability and maintainability

```java
import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;

public class HomePage
{
    private final SelenideElement homePageBanner = $("#intro-text-homepage-banner");

    public HomePage assertExpectedPage()
    {
        homePageBanner.shouldBe(visible);
        return this;
    }

    public ProductListingPage openCategoryAtPosition(int position)
    {
        $("#category-picture-" + (position - 1)).scrollTo().click();
        return new ProductListingPage().assertExpectedPage();
    }
}
```

* `assertExpectedPage()` for Post-validation after navigating to the `HomePage`

{{< TODO >}}add further reading to out wiki page and also external pages{{< /TODO >}}

* extend Page Object Model pattern further to define shared components found on various pages
* `header` often is consistent across all pages

```java
import com.codeborne.selenide.SelenideElement;
import org.example.pageobjects.pages.ProductListingPage;
import org.openqa.selenium.Keys;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;

public class Header
{
    private final SelenideElement navigationBar = $("#header-navigation-bar");

    private final SelenideElement searchInput = $("#header-search-text");

    public Header assertComponentAvailable()
    {
        navigationBar.shouldBe(visible);
        return this;
    }

    public ProductListingPage searchForSearchTerm(String searchTerm)
    {
        searchInput.sendKeys(searchTerm);
        searchInput.press(Keys.ENTER);
        return new ProductListingPage().assertExpectedPage();
    }
}
```

* `AbstractPageObject` that all Page Objects extend, allowing us to add the header to all pages without duplicating code

```java
import org.example.pageobjects.components.Header;

public class AbstractPageObject
{
    public Header header = new Header();
}
```

## Logging

* using SLF4J ([Simple Logging Facade for Java](https://www.slf4j.org/)) any logging framework can be used
* logging setup is recommended otherwise errors like the following will be logged to the console

```
SLF4J(W): No SLF4J providers were found.
SLF4J(W): Defaulting to no-operation (NOP) logger implementation
SLF4J(W): See https://www.slf4j.org/codes.html#noProviders for further details.
[ERROR] SLF4J(W): No SLF4J providers were found.
[ERROR] SLF4J(W): Defaulting to no-operation (NOP) logger implementation
[ERROR] SLF4J(W): See https://www.slf4j.org/codes.html#noProviders for further details.
```

* Log4j is suggested
    * therefore the default Neodymium Log4j configuration can be overwritten
* Selenium has its own logging
    * in some cases it logs a lot, so the default log level is set to `SEVERE`
    * possible log levels are `SEVERE`, `WARNING`, `INFO`, `CONFIG`, `FINE`, `FINER`, and `FINEST`

## WebDriver

* `Neodymium.getDriver()` - get current WebDriver
* `Neodymium.getEventFiringWebdriver()` - get current WebDriver as EventFiringWebDriver
* `Neodymium.getRemoteWebDriver()` - get RemoteWebDriver if wrapped in current WebDriver
* `Neodymium.getBrowserProfileName()` - get used browser profile name
* `Neodymium.getBrowserName()` - get used browser name
* `Neodymium.getLocalProxy()` - get embedded local proxy
* `Neodymium.getWebDriverStateContainer()` - get state and the objects belonging to the current execution of the
  browser. Contains the current WebDriver, the embedded local BrowserUpProxy if used
  and a counter that state how often the current execution setup was used

## Test Environments

https://github.com/Xceptance/neodymium/wiki/Test-Environments

## Utility Classes

https://github.com/Xceptance/neodymium/wiki/Utility-classes

### SelenideAddons

### AllureAddons

### JavaScriptUtils

### TestData

## Cucumber

https://github.com/Xceptance/neodymium/wiki/Cucumber

## Mobile Tests ?

## General ?

download?
Basic Auth?

## Useful Tricks ?
