---
title: "Browser configuration and handling"

weight: 10
type: docs

description: >
  Everything about browser configuration, handling and multi browser.
---

This chapter is about browser handling, setting up browsers and defining their properties and multi browser handling.

## Browser Handling

To handle and control browsers in Neodymium the following annotations are used.

* `@Browser` - use default browser
* `@Browser("<browserId>")` - set browser to use
* `@RandomBrowser(<number of browsers to use>)` - use random browser
* `@SuppressBrowser()` - suppress all browser
* `@StartNewBrowserForSetUp` - new fresh browser for `@Before` and `@BeforeAll`
* `@StartNewBrowserForCleanUp` - new fresh browser for `@After` and `@AfterAll`

For all browser tests `@Browser`, `@Browser("<browserId>")` or `@RandomBrowser(<number of browsers to use>)` must be
added to the test class or method. Otherwise, advanced features, like test recording, doesn't work.

On execution each `@NeodymiumTest` method will be automatically executed with each annotated browser configuration.
Neodymium creates the browser instance according to the configuration, injects the resulting web driver in Selenide and
clear them up afterwards.

`@Browser("<browserId>")` selects the browser to use. The `<browserId>` is a reference to the defined browser
configurations in the `config/browser.properties` explained [here](#browser-configuration).

{{% note notitle %}}
**Note:** `@Browser` and `@SuppressBrowser()` annotations are inherited from the super class if nighter of them is added
in the child class.
{{% /note %}}

## Browser Configuration

Browser configurations are stored in the file `config/browser.properties`. Since it is a property file a special format
is needed to define a configuration.

Format: `browserprofile.<browserId>.<property> = <value>`

* `browserprofile` is a static prefix that must be used for every configuration.
* `<browserId>` is a user defined string that is later on used to be referred with `@Browser("<browserId>")` annotation
* `<property>` is one of the listed below
* `<value>` is the value to set

{{% warning notitle %}}
**Attention:**  The `<browserId>` must not contain any white space characters. Also, it's treated case-sensitive.
{{% /warning %}}

The following table lists all possible properties.

| Property                   |                        Mandatory | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|----------------------------|---------------------------------:|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name                       |                              YES | A more detailed name of this browser/device test. This name will be used for reporting.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| browser                    |                              YES | Determines what browser will be used for this test. Valid values are `iphone`, `ipad`, `android`, `firefox`, `chrome`, `internetexplorer`, `safari`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| version                    | YES if used for device emulation | Determines which version of the browser should be used **OR** determines the version of the OS of an emulated device by default version references the browser version, but in case of saucelabs device emulation usage it may be used for the OS version instead.                                                                                                                                                                                                                                                                                                                                                                                        |
| browserResolution          |                               NO | Determines width and height of the browser window. If not specified the default will be used instead not applicable for mobile device emulation can be defined as e.g. `1200x900` or `1200X900` or `1200,900`.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| screenResolution           |                               NO | Determines width and height of the emulated operating system only applicable for Windows, Linux and MacOS devices can be defined as e.g. `1280x1024` or `1280X1024` or `1280,1024`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| platform                   |                               NO | Defines on which (emulated) platform the test should run. See [SauceLabs Platform-Configurator](https://wiki.saucelabs.com/display/DOCS/Platform+Configurator) for further more information.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                              
| deviceOrientation          |                               NO | Defines the screen orientation, only for mobile/tablet device emulation valid values: `portrait` or `landscape`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| testEnvironment            |                               NO | Determines where the testcase will be executed, possible values are `local` and `saucelabs`. **NOTE**: you only need to set this property if you want to use saucelabs as test environment. By default the value `local` is assumed.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| chromeEmulationProfile     |                               NO | A special property that contains a device name that should be emulated. This property is for chrome only. See chrome device emulation features for valid strings. **NOTE**: Currently are only from chrome predefined devices supported.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| pageLoadStrategy           |                               NO | This property defines when the web driver will return from a page load. Value can be normal, eager or none <ul><li>`normal`: (default) call returns when load event was fired</li><li>`eager`:  returns when DOMContentLoaded event was fired</li><li>`none`: returns immediately</li></ul>                                                                                                                                                                                                                                                                                                                                                               |
| headless                   |                               NO | Boolean property that determines if the browser should run in headless mode. Default value is false. **NOTE**: Currently only supported for Firefox and Chrome.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| acceptInsecureCertificates |                               NO | A boolean property that decides whether the web driver accepts insecure certificate or not. The default behaviour is the one of the used web driver. <ul><li>`true`: the browser accepts insecure certificates</li><li>`false`: the browser does not accepts insecure certificates</li></ul>                                                                                                                                                                                                                                                                                                                                                              |
| arguments                  |                               NO | Additional command line arguments for the browser to apply. As you can specify only on 'arguments' property for a browser at a time you need to chain multiple arguments. Multiple arguments are chained by semicolon (";") e.g.: `-window-position=0,0 ; -window-size=400,300`<br>Google Chrome uses arguments starting with a double dash (e.g. `--headless`) while Mozilla Firefox uses as single dash. However Chrome even understands arguments without a leading dash while Firefox needs to have the dash in front of arguments. With that said it is preferred to use a single dash for each argument regardless the browser you are configuring. |
| downloadDirectory          |                               NO | You might want to alter the standard download folder. NOTE: this is only supported by Firefox and Chrome                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| driverArgs                 |                               NO | Most WebDrivers offer to pass arguments to reduce/increase WebDriver logs, redirect them to separate file, change port, limit allowed origins, etc. To see what are offered by the WebDriver of your choice, please execute <path to WebDriver> --help command in terminal. These arguments you can now pass to the WebDriver via `driverArgs` property of browser profile.                                                                                                                                                                                                                                                                               |

### Global Browser Profile Configuration

The following properties can be configured on a global level. A specific configuration on browser profile level will
override the global value.

```properties
browserprofile.global.pageLoadStrategy=normal|eager|none
browserprofile.global.headless=true|false
browserprofile.global.acceptInsecureCertificates=true|false
browserprofile.global.browserResolution=1200x900
```

### Browser Preference Configuration

For Chrome and Firefox it's possible to configure a list of preferences stored in `config/browser.properties`.
The list for Chrome can be
found [here](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/chrome/common/pref_names.h).
For Firefox check `about:config` in your actual Firefox browser.

Please be aware that different browsers use different preference keys.

{{% note notitle %}}
**Attention:**  Also, please keep in mind that the download folder can be set via properties directly, but also via
preferences. If both are set, the `browserprofile.<browserId>.downloadDirectory` property is used.
{{% /note %}}

### Set Up a Specific Browser Executable

Sometimes the browser of your choice is not configured in your system PATH and the WebDriver is not able to find it. Or
you would like to test a certain browser like a developer edition or an extended service release. You need to configure
the path to the browser in the `config/neodymium.properties` file.

e.g. `neodymium.webDriver.firefox.pathToBrowser =  C:/Program Files (x86)/Mozilla Firefox/firefox.exe`

More documentation on the settings within the `config/neodymium.properties` can be found on
the [Neodymium configuration properties]({{< relref "090-neodymium-properties" >}}) page.

## Multi Browser Handling

Running tests with multiple browsers is fairly easy, only multiple `@Browser` annotations with all desired browsers need
to be added to the test class or method. Thanks to the multi browser support you can execute your test with different
browser configurations.

`@SuppressBrowsers` can be used to disable multi browser for the method or class. Be aware that `@SuppressBrowsers` on a
class can be overridden on method scope by annotating a `@Browser` to a method.

```java

@Browser("Firefox_large")
@Browser("Chrome_large")
@Browser("InternetExplorer_small")
public class MyTests
{
    @NeodymiumTest
    public void testMethod()
    {
        // implementation
    }

    @NeodymiumTest
    @SuppressBrowsers
    public void noBrowserTest()
    {
        // implementation
    }
}
```

The example above is annotated with three different browsers and one method is suppressing all browsers.
`testMethod()` will be executed with all browsers while `noBrowserTest()` will also be executed but without any browser.
This can be seen in the image below.

{{< image max-width="60%" src="neodymium/advanced/multibrowser.png" >}}
Multi browser test execution.
{{< /image >}}

{{< TODO >}}double-check the following part. it depends on a Neo PR for issue 400.{{< /TODO >}}

Furthermore, you can filter which browser should be used for testing with the property
`neodymium.webDriver.browserFilter`. This property allows you to provide a list of specific browsers to use for your
tests. As a result, only tests that are explicitly annotated for a particular browser will be executed with that
browser.
For the example above `neodymium.webDriver.browserFilter = Firefox_large, Chrome_large`, would only execute the test
with Firefox and Chrome.
If you take the example above, and you were to set the property to
`neodymium.webDriver.browserFilter = Firefox_large, Chrome_large`, the test would only run on Firefox and Chrome. The
Internet Explorer would be ignored.

## Separate Browser Sessions for Test Setup and Cleanup

This feature allows you to manage separate browser instances for test setup (`@Before`/`@BeforeEach`) and cleanup (
`@After`/`@AfterEach`) methods using dedicated annotations.
This is particularly useful when a proper clean up is essential for your testing or when you need to start testing after
the setup in a clean session.

### Background

An unsolved problem for each test automation are crashing browser instances. It happens rarely, nowadays but it does and
when it does everything which should happen after the browser is closed can't be done.
To ensure a proper cleanup of your test system, Neodymium offers a way to use separate browsers with a clean session to
perform setup and cleanup tasks.

### Annotations

#### @StartNewBrowserForSetUp

Indicates that a new browser instance should be created specifically for the `@Before` method execution.

```java

@StartNewBrowserForSetUp
@BeforeEach
public void setUp()
{
    // This will run in a separate browser instance
    // Browser will be automatically closed after setup
}
```

#### @StartNewBrowserForCleanUp

Indicates that a new browser instance should be created specifically for the `@After` method execution.

```java

@StartNewBrowserForCleanUp
@AfterEach
public void cleanUp()
{
    // This will run in a separate browser instance
    // Browser will be automatically closed after cleanup
}
```

### Usage Examples

Here is a small example how to use the annotations for separate browser sessions.

```java
public class TestExample
{
    @StartNewBrowserForSetUp
    @BeforeEach
    public void prepareTestData()
    {
        // Setup complex test data
        open("http://admin.example.com");
        // Create necessary test data
    }

    @NeodymiumTest
    public void testUserFlow()
    {
        // Test runs in its own browser instance
        open("http://example.com");
        // Test user flow
    }

    @StartNewBrowserForCleanUp
    @AfterEach
    public void removeTestData()
    {
        // Clean up in separate browser
        open("http://admin.example.com");
        // Remove test data
    }
}
```

This feature supports JUnit4 as well as JUnit5. The examples above can be easily transferred to JUnit4 by changing from
`@BeforeEach` to `@Before` and `@AfterEach` to `@After`.

### Important Notes

1. **Browser Lifecycle**
    - Each annotated method receives a fresh browser instance
    - Browser instances are automatically closed after method execution
2. **Best Practices**
    - Use separate browsers when setup/cleanup requires different user sessions or the additional safety net for browser
      crashes.
    - Consider performance implications of creating multiple browser instances
    - Ensure proper error handling in setup and cleanup methods
3. **Limitations**
    - `@BeforeAll` and `@AfterAll` (or JUnit4s `@BeforeClass` and `@AfterClass`) are **NOT** covered with this, due
      to the general Neodymium lifecycle.
    - Browser state is not shared between different instances
    - Each new browser instance requires additional system resources, but there are no browsers running in parallel
    - Setup time may increase due to multiple browser launches
