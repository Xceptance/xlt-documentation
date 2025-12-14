---
title: "Neodymium Context"

weight: 120
type: docs

description: >
  Logging in Neodymium using SLF4J
---

The **Neodymium context** is a thread-local helper class, accessible via
[
`Neodymium`](https://github.com/Xceptance/neodymium-library/blob/master/src/main/java/com/xceptance/neodymium/util/Neodymium.java),
that provides essential methods and properties for your test execution.

Every test method runs in its own thread with a unique context. This context contains:

* All [test data]({{< relref "020-test-data" >}}).
* The currently used [WebDriver]({{< relref "001-webdriver" >}}) instance.
* [Localization data]({{< relref "040-localization" >}}).
* An instance of
  the [NeodymiumConfiguration](https://github.com/Xceptance/neodymium-library/blob/master/src/main/java/com/xceptance/neodymium/util/NeodymiumConfiguration.java)
  class.

This structure allows you to access and modify settings and test data strictly within a single test without affecting
other concurrent tests.

{{% note notitle %}}
**NOTE:** To explicitly clear the current thread context, use `Neodymium.clearThreadContext()`.
{{% /note %}}

## Accessing Contextual Data

### Data

To access your test data, use:

```java
Neodymium.getData().get("<dataKey>"); // get the map entry directly
Neodymium.getData().asString("<dataKey>"); // get the map entry parsed as String (available for multiple types)
```

See the [test data chapter]({{< relref "020-test-data" >}}) for more information and convenience methods related to test
data.

### Localization

The `Neodymium` class offers access to the [Localization]({{< relref "040-localization" >}}) feature:

```java
Neodymium.localizedText("<LocalizationKey>");
```

### Configuration

You can access the instantiated version of
the [NeodymiumConfiguration](https://github.com/Xceptance/neodymium-library/blob/master/src/main/java/com/xceptance/neodymium-library/blob/master/src/main/java/com/xceptance/neodymium/util/NeodymiumConfiguration.java)
class to retrieve any configuration setting:

```java
Neodymium.configuration().<settingFunctionName>()
```

## WebDriver and Browser Management

### WebDriver Access

You can retrieve different types of WebDriver instances as needed:

| Method                           | Description                                                                       |
|:---------------------------------|:----------------------------------------------------------------------------------|
| `Neodymium.getDriver()`          | Retrieves the current **WebDriver** instance.                                     |
| `Neodymium.getRemoteWebDriver()` | Retrieves the wrapped **RemoteWebDriver** instance, handling all necessary casts. |

### Browser Information

To take special actions based on the running browser or profile:

* **Browser Profile Name**: Retrieve the name of the used browser profile:
    ```java
    Neodymium.getBrowserProfileName()
    ```
* **Browser Type/Name**: Retrieve the browser name (type) for interactions specific to that browser:
    ```java
    Neodymium.getBrowserName()
    ```
* **Local Proxy**: If an embedded local proxy is used, its instance can be retrieved for additional scenarios:
    ```java
    Neodymium.getLocalProxy()
    ```

### Execution State

The current state and objects belonging to the execution can be retrieved using:

```java
Neodymium.getWebDriverStateContainer()
```

The retrieved `WebDriverStateContainer` includes the current `WebDriver`, the embedded local `BrowserUpProxy` (if used),
and a counter indicating how often the current execution setup has been utilized.

## Site and Locale

### Site Check

The `Neodymium.isSite(String... sites)` function allows you to check if the current configured `site` matches one or
more provided site identifiers:

```java
    // check against one site identifier 
    if(Neodymium.isSite("UK"))
    {
        // ...
    }

    // check against multiple site identifiers
    if(Neodymium.isSite("US","DE","JP"))
    {
        // ...
    }
```

### Locale Check

Similarly, the `Neodymium.isLocale(String... locales)` method checks the current configured locale against a list of
target locales:

```java
    // check against one locale
    if(Neodymium.isLocale("en_US"))
    {
        // ...
    }

    // check against multiple locales
    if(Neodymium.isLocale("en_US","de_DE","jp_JP"))
    {
        // ...
    }
```

## Web Site Dimensions

Convenience functions are provided to determine the current device category based on the browser viewport width. This is
useful for adapting locators or interactions for sites optimized for different devices.

**NOTE**: The following values are defaults and can be configured in the `config/neodymium.properties` file.

| Function                       | Description                 |
|:-------------------------------|:----------------------------|
| `boolean isExtraSmallDevice()` | true if 0 <= width < 576    |
| `boolean isSmallDevice()`      | true if 576 <= width < 768  |
| `boolean isMediumDevice()`     | true if 768 <= width < 992  |
| `boolean isLargeDevice()`      | true if 992 <= width < 1200 |
| `boolean isExtraLargeDevice()` | true if width >= 1200       |
| `boolean isMobile()`           | true if width < 768         |
| `boolean isTablet()`           | true if 768 <= width < 992  |
| `boolean isDesktop()`          | true if width >= 992        |

Additionally, you can directly access the current dimensions of the browser elements:

| Function                      | Description                                                             |
|:------------------------------|:------------------------------------------------------------------------|
| `Dimension getViewportSize()` | Current **viewport** width and height packaged as a `Dimension` object. |
| `Dimension getPageSize()`     | Current **page** width and height packaged as a `Dimension` object.     |
| `Dimension getWindowSize()`   | Current **window** width and height packaged as a `Dimension` object.   |

## Miscellaneous

### Version

The Neodymium version can be retrieved using:

```java
Neodymium.getNeodymiumVersion()
```

### Fixed Random Support

Neodymium provides access to the current `Random` instance, which is useful for maintaining a fixed random setup for
repeating runs from CI executions:

```java
Neodymium.getRandom()
```
