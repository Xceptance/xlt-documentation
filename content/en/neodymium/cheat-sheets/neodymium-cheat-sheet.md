---
title: "Neodymium Cheat-Sheet: Features & Usage"
weight: 10
type: docs
description: >
  Quick reference for all Neodymium features and how to use them on a single page.
---

{{< TODO >}}single page cheat sheet - decide if we want to use multiple pages or this and add the additional information to the multiple pages{{< /TODO >}}


## Setup & Installation

- **Java 17+**: Required for Neodymium 5.x+
- **Maven**: Used for build and dependency management
- **Docker**: Use `maven:3-openjdk-17` or `markhobson/maven-chrome:jdk-17` for quick setup
- **FFmpeg**: (Optional) For video recording of test runs

## Properties & Configuration

The most important configuration files are listed below:

* `neodymium.properties`
* `browser.properties`
* `credentials.properties`
* `gif-recording.properties`
* `video-recording.properties`

Properties files must reside in the `./config/*.properties` directory at the project root. `dev-*.properties` files can be used to override or add values.

**Loading order (highest priority last):**

1. system properties
2. temporary config file
3. `config/dev-neodymium.properties`
4. system environment variables
5. `config/credentials.properties`
6. `config/neodymium.properties`

In cases where a property is found in several files, the value from the file with the highest priority is used.
Further read: [Neodymium properties]({{< relref "../configuration/090-neodymium-properties.md" >}})

### Key Properties

```properties
neodymium.url = ${neodymium.url.protocol}://${neodymium.url.host}   # Base URL for tests
neodymium.url.protocol = https
neodymium.url.host = posters.xceptance.io

neodymium.locale = en_US                                            # Default locale
neodymium.localization.file = config/localization.yaml              # Localization file
```

## Project Templates

- **neodymium-template**: Starter project for new users ([GitHub](https://github.com/Xceptance/neodymium-template))
- **neodymium-example**: Standard Java-based tests ([GitHub](https://github.com/Xceptance/neodymium-example))
- **neodymium-cucumber-example**: BDD with Cucumber ([GitHub](https://github.com/Xceptance/neodymium-cucumber-example))
- **neodymium-showcase**: Advanced features and recipes ([GitHub](https://github.com/Xceptance/neodymium-showcase))

## Defining and Running Tests

### JUnit5

```java
@Browser
public class SomeTest
{
    @NeodymiumTest
    public void someTestMethod()
    {
        // ...
    }
}
```

### JUnit4

```java
@RunWith(NeodymiumRunner.class)
@Browser
public class SomeTest
{
    @Test
    public void someTestMethod()
    {
        // ...
    }
}
```

**Run tests:**

- In IDE as JUnit test
- `mvn clean test` (all tests)
- `mvn clean test -Dtest=TestClass` (specific class)
- `mvn clean test -Dtest=TestClass#testMethod` (specific method)

## Browser & WebDriver Features

### Neodymium WebDriver functions

* `Neodymium.getDriver()` - get current WebDriver
* `Neodymium.getEventFiringWebdriver()` - get current WebDriver as EventFiringWebDriver
* `Neodymium.getRemoteWebDriver()` - get RemoteWebDriver if wrapped in current WebDriver
* `Neodymium.getBrowserProfileName()` - get used browser profile name
* `Neodymium.getBrowserName()` - get used browser name
* `Neodymium.getLocalProxy()` - get embedded local proxy
* `Neodymium.getWebDriverStateContainer()` - get state and the objects belonging to the current execution of the   browser. Contains the current WebDriver, the embedded local BrowserUpProxy if used and a counter that state how often the current execution setup was used

### Key Properties

```properties
neodymium.webDriver.keepBrowserOpen = false               # Keep browser open after test
neodymium.webDriver.keepBrowserOpenOnFailure = false      # Keep browser open on failure

neodymium.webDriver.reuseDriver = false                   # Reuse browser sessions
neodymium.webDriver.maxReuse = -1                         # Max reuse count (-1 = unlimited)

neodymium.webDriver.browserFilter = <browserId>           # Filter browsers for test run

neodymium.webDriver.startNewBrowserForSetUp = true        # New browser for setup
neodymium.webDriver.startNewBrowserForCleanUp = true      # New browser for cleanup

neodymium.webDriver.chrome.pathToDriverServer = <path>    # Path to ChromeDriver
neodymium.webDriver.firefox.pathToDriverServer = <path>   # Path to GeckoDriver
neodymium.webDriver.edge.pathToDriverServer = <path>      # Path to EdgeDriver

neodymium.webDriver.safari.driverArguments = ""           # Safari driver args
```

### Browser Profiles

- Define in `config/browser.properties`:

  ```properties
  browserprofile.Chrome_large.name = Chrome Large
  browserprofile.Chrome_large.browser = chrome
  browserprofile.Chrome_large.browserResolution = 1920x1080
  browserprofile.Chrome_large.headless = false
  browserprofile.Chrome_large.arguments = -ignore-certificate-errors; --remote-allow-origins=*
  ```

- Reference in test on class or method: `@Browser("Chrome_large")`

### Multi-Browser & Filtering

- Annotate with multiple `@Browser` for multi-browser runs
- Filter with property:

  ```properties
  neodymium.webDriver.browserFilter = Chrome_large,Firefox_large
  ```

### Device Emulation

- Use `chromeEmulationProfile` in browser profile for mobile/tablet emulation

### Selenium Grid & Cloud

- Configure remote environments in `credentials.properties` and reference in browser profile:

  ```properties
  browserprofile.testEnvironment.saucelabs.url = https://ondemand.saucelabs.com:443/wd/hub
  browserprofile.Chrome_SauceLabs.testEnvironment = saucelabs
  ```

### Keep Browser Open

- Set in properties or use annotation:

  ```properties
  neodymium.webDriver.keepBrowserOpen = true
  ```
  
  ```java
  @KeepBrowserOpen(onlyOnFailure = false)
  ```

### WebDriver Reuse

- Enable reuse and set max reuse:
  ```properties
  neodymium.webDriver.reuseDriver = true
  neodymium.webDriver.maxReuse = 2
  ```

### Separate Setup/Cleanup Browsers

```java
@StartNewBrowserForSetUp
@BeforeEach
public void setUp()
{ /* ... */ }

@StartNewBrowserForCleanUp
@AfterEach
public void cleanUp()
{ /* ... */ }
```

## Test Data & Context

### Key Properties

```properties
neodymium.testData.email.domain = varmail.de              # Default email domain
neodymium.testData.email.local.prefix = test              # Email local part prefix
neodymium.testData.email.randomCharsAmount = 12           # Email random chars
neodymium.testData.password.uppercaseCharAmount = 2       # Password uppercase chars
neodymium.testData.password.lowercaseCharAmount = 5       # Password lowercase chars
neodymium.testData.password.digitAmount = 2               # Password digits
neodymium.testData.password.specialCharAmount = 2         # Password special chars
neodymium.testData.password.specialChars = +-#$%&.;,_     # Allowed special chars
```

- Access test data: `Neodymium.getData().get("key")`
- Use `@DataItem` for auto-injection:
  ```java
  @DataItem("$.field")
  String field;
  ```
- Thread-local context: `Neodymium.getDriver()`, `Neodymium.getBrowserProfileName()`, etc.

### Test Data

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

{{% warning title="Attention" %}}
Only JSON is currently supported for complex test data with nested objects! Simple key/value pairs can be used in all formats.
{{% /warning %}}

**Test data access:**

* `Neodymium.dataValue("<dataKey>")`
* `Neodymium.getData().asString("<key>")` - `as...()` function for all primitive types
* `@DataItem` POJO - usual object access
* `Neodymium.getData().get(<testDataClass.class>)` - parses data manually into POJO instead of using `@DataItem`

Package test data to share common data among tests within the same package and its sub-packages in a file named
`package_testdata`.

## Localization

* `localization.yaml` stored in `./config/localization.yaml` containing key value pairs of translations.
* locale defined in `neodymium.properties` as  `neodymium.locale=<locale>` or changed during tests using
  `Neodymium.configuration().setProperty("neodymium.locale", <locale>)`.

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


## Configuration & Properties

### Key Properties

```properties
neodymium.properties = <main config file>
config/dev-neodymium.properties = <dev override>
config/credentials.properties = <cloud credentials>
neodymium.testNameFilter = <regex>                        # Filter tests by name/class/method/dataset
neodymium.context.device.breakpoint.small = 576           # Responsive breakpoints
neodymium.context.device.breakpoint.medium = 768
neodymium.context.device.breakpoint.large = 992
neodymium.context.device.breakpoint.xlarge = 1200
```

- Main config: `config/neodymium.properties`
- Override for dev: `config/dev-neodymium.properties`
- Temporary: `ConfigFactory.setProperty("neodymium.temporaryConfigFile", "file:...properties")`
- Filter tests by name/class/method/dataset:

  ```properties
  neodymium.testNameFilter = .*Checkout.*
  ```

## Utility Classes

- **SelenideAddons**: Regex matching, safe execution, slider handling, open HTML snippets, optional waits
- **AllureAddons**: Add steps, links, attachments, JSON to Allure reports
- **JavaScriptUtils**: Wait for page readiness, inject popup blocker
- **TestData**: POJO instantiation, type conversion, existence checks
- **WebDriverUtils**: Cucumber/WebDriver helpers

## Reporting

### Key Properties

```properties
neodymium.report.showSelenideErrorDetails = false               # Selenide error details in report
neodymium.report.enableTestDataInReport = true                  # Attach test data to report
neodymium.report.environment.enableCustomData = true            # Custom env data in report
neodymium.report.environment.enableBrowserData = true           # Browser data in report
neodymium.report.enableStepLinks = true                         # Add page links to report
neodymium.allureAddons.screenshots.perstep.always = false       # Screenshot per step
neodymium.allureAddons.reports.path = /build/reports/tests/     # Allure report path
neodymium.seleniumLogLevel = SEVERE                             # Selenium log level
```

### Allure Reports

- **Allure Reporting**
  - Add to `pom.xml` and use:
    - `mvn allure:report` to generate the report
    - `mvn allure:serve` to generate and show the report
    - `mvn clean test allure:report` to run all tests and generate the report
  - Add steps/attachments in code with `AllureAddons`

* `@Step("description with {parameter}")` add description with parameter to function

  ```java
  @Step("click on a product by product name '{productName}'")
  public ProductDetailPage clickProductByName(String productName)
  {
      // ...
  }
  ```

* add custom info to report using `AllureAddons.addToReport("<message>");`

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
* **JSON Compare**: Using `JsonAssert.assertEquals(expected, actual, mode)` adds comparison with difference
  highlighting.
* **Environment**: Automatically contains Neodymium version and browsers. Extend with
  `neodymium.report.environment.custom.customData=customValue` (requires
  `neodymium.report.environment.enableCustomData=true`).

### Logging

- Use SLF4J/Log4j, configure in `pom.xml` and `log4j.properties`
- Control Selenium log level:

    ```properties
    neodymium.seleniumLogLevel = INFO
    ```

### XcMailr Plugin

- Add dependency, configure `xcmailr.properties`, use `XcMailrApi` for mailbox/email management

### Applitools Plugin

- Add dependency, configure `applitools.properties`, use `ApplitoolsApi` for visual assertions

### Jenkins & CI

- Use Allure plugin, Docker images, and provided pipeline scripts for CI/CD

## Advanced Features

### Key Properties

```properties
# pop up blocker
neodymium.popup.<name> = <CSS selector>                                     # Popup blocker selectors
neodymium.popupInterval = 1000                                              # Popup check interval (ms)

# accessibility / lighthouse
neodymium.lighthouse.binaryPath = lighthouse                                # Lighthouse binary path
neodymium.lighthouse.assert.thresholdScore.performance = 0.5
neodymium.lighthouse.assert.thresholdScore.accessibility = 0.5
neodymium.lighthouse.assert.thresholdScore.bestPractices = 0.5
neodymium.lighthouse.assert.thresholdScore.seo = 0.5

# advanced screenshots
neodymium.screenshots.enableAdvancedScreenshots = false                     # Advanced screenshots
neodymium.screenshots.enableOnSuccess = false                               # Screenshots on success
neodymium.screenshots.fullpagecapture.enable = false                        # Full-page screenshots
neodymium.screenshots.fullpagecapture.highlightViewport = false             # Highlight viewport
neodymium.screenshots.fullpagecapture.highlightColor = #FF0000              # Highlight color
neodymium.screenshots.blurFullPageScreenshot = false                        # Blur outside viewport
neodymium.screenshots.highlightLastElement = false                          # Highlight last element
neodymium.screenshots.element.highlightColor = #FF00FF                      # Last element color
neodymium.screenshots.highlightLineThickness = 4                            # Highlight line thickness
neodymium.screenshots.enableTreeDirectoryStructure = false                  # Tree dir for screenshots

# proxy / local proxy
neodymium.proxy = false                                                     # Use HTTP proxy
neodymium.proxy.host = <none>                                               # Proxy host
neodymium.proxy.port = <none>                                               # Proxy port
neodymium.localproxy = false                                                # Use local MITM proxy
neodymium.localproxy.certificate = false                                    # Use self-signed cert
neodymium.localproxy.certificate.generate = true                            # Generate cert
neodymium.localproxy.certificate.archiveFile = ./config/Certificates.p12
neodymium.localproxy.certificate.archivetype = PKCS12
neodymium.localproxy.certificate.name = <none>
neodymium.localproxy.certificate.password = <none>

# work in progress for tests
neodymium.workInProgress = false                                            # Only run WIP tests
```

- **Popup Blocker**: Define selectors in properties, auto-injected by JavaScriptUtils
- **Accessibility/Lighthouse**: Set thresholds in properties, run audits
- **Advanced Screenshot**: Enable full-page, highlight, blur, and element screenshots in properties
- **Proxy/Local Proxy**: Configure HTTP/local MITM proxy in properties
- **Responsive Helpers**: Use Neodymium context/device helpers for adaptive tests
- **Work In Progress**: Run only WIP tests/classes with `@WorkInProgress` or `neodymium.workInProgress=true`
- **Randomization**: Use `Neodymium.getRandom()` for reproducible random data

---
For more details and code examples, see the full documentation or the referenced example projects.

### Parallel Execution

Parallel execution is supported via Maven Surefire Plugin. It works on **class level** (each class in its own JVM).

```xml
<plugin>
    <artifactId>maven-surefire-plugin</artifactId>
    <configuration>
        <forkCount>4</forkCount>
        <reuseForks>true</reuseForks>
    </configuration>
</plugin>
```

See [Parallel Execution]({{< relref "../framework/540-parallel-execution.md" >}}).

### Debug Highlighting

Highlights elements during test execution for better visual debugging.

```properties
neodymium.debug.highlight = true                            # Enable highlighting
neodymium.debug.highlight.duration = 100                    # Highlight duration in ms
neodymium.debug.highlight.color = #FF0000                   # Highlight color
```

### Advanced Screenshots

Must be enabled in `neodymium.properties`: `neodymium.screenshots.enableAdvancedScreenshots=true`.

Customization properties:

```properties
neodymium.screenshots.fullpagecapture.enable = true
neodymium.screenshots.highlightViewport = false
neodymium.screenshots.highlightLastElement = true
neodymium.screenshots.highlightColor = #0000FF
neodymium.screenshots.enableOnSuccess = false
```

### Recording

Configuration in `config/gif-recording.properties` and `config/video-recording.properties`. Must have
`<gif|video>.enableFilming = true`.

| Property                                  | Format | Description                                   |
|-------------------------------------------|--------|-----------------------------------------------|
| enableFilming                             | bool   | Enable recording                              |
| filmAutomatically                         | bool   | Start recording automatically                 |
| deleteRecordingsAfterAddingToAllureReport | bool   | Deletes recording file after adding to report |
| appendAllRecordingsToAllureReport         | bool   | If false, only failures are added             |
| imageQuality                              | double | Image quality percentage (0.0 - 1.0)          |

Manual recording:

```java
FilmTestExecution.startVideoRecording(String<fileName>);
// do stuff
FilmTestExecution.finishVideoFilming(String<fileName>, boolean <testFailed>);
```

### Accessibility

* Requires `npm install -g lighthouse`.
* Create report: `LighthouseUtils.createLightHouseReport("Homepage");`.
* Assertions in properties:

  ```properties
  neodymium.lighthouse.assert.thresholdScore.performance = 0.5
  neodymium.lighthouse.assert.thresholdScore.accessibility = 0.5
  neodymium.lighthouse.assert.thresholdScore.bestPractices = 0.5
  neodymium.lighthouse.assert.thresholdScore.seo = 0.5
  neodymium.lighthouse.assert.audits = audit1 audit2
  ```

### PopUp Blocker

Will close non-deterministic pop-ups automatically if configured:

```properties
neodymium.popup.customPopUp=#myWindowCloseButton
```

## PageObjects and Components

The [Page Object Model (POM)]({{< relref "../framework/530-page-objects.md" >}}) wraps all elements and functionality of a
web page into an object.

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
