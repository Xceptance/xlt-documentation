---
title: "WebDriver Handling"

weight: 01
type: docs

description: >
  Everything about WebDrivers.
---

To run browser tests a WebDriver for the desired browser is necessary. If the driver is missing, Selenium will
automatically download the latest one.

Within the file `config/browser.properties` you can set up the browsers used throughout testing.
More details on configuring the browser properties can be found in the
[browser handling chapter]({{< relref "010-multi-browser" >}}).

The next three sections describe how to set up specific WebDriver and browsers.

## Set up a specific WebDriver

For that, you have to download and provide a
specific [Selenium WebDriver](http://www.seleniumhq.org/projects/webdriver/).

You can download the common ones here:

* [ChromeDriver](https://googlechromelabs.github.io/chrome-for-testing/)
* [GeckoDriver (Firefox)](https://github.com/mozilla/geckodriver/releases)
* [InternetExplorerDriver](https://www.microsoft.com/en-us/download/details.aspx?id=44069)

After downloading you can configure them in the `config/neodymium.properties` file. Find the line that matches the
WebDriver of your choice e.g. `neodymium.webDriver.chrome.pathToDriverServer =  C:/dev/webdriver/chromedriver.exe` or
add them to the PATH of your system.

## Set up a specific browser

Sometimes the browser of your choice is not configured in your system PATH and the WebDriver is not able to find it. Or
you would like to test a certain browser like a developer edition or an extended service release. You need to configure
the path to the browser in the `config/neodymium.properties` file.

e.g. `neodymium.webDriver.firefox.pathToBrowser =  C:/Program Files (x86)/Mozilla Firefox/firefox.exe`

{{< TODO >}}update link{{< /TODO >}}

More documentation on the settings within the `config/neodymium.properties` can be found on
the [Neodymium configuration properties](Neodymium-configuration-properties) page.

## Safari WebDriver setup

Please follow the required steps
from [Testing with WebDriver in Safari](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari)
out of the Apple developer documentation to enable Safari on your Mac.

Once the Safari WebDriver is available you just need to configure a browser profile within the
`config\browser.properties` file. This could look like the following profile.

```properties
browserprofile.Safari_1024x768.name=Local Safari 1024x768
browserprofile.Safari_1024x768.browser=safari
browserprofile.Safari_1024x768.screenResolution=1024x768
```

## Tear down

Normally Neodymium takes care of quitting the WebDriver instances and there is nothing else to do or to worry about.
Nevertheless, there may be some use and edge cases you need to handle yourself or know what you can do.

### KeepBrowserOpen and KeepBrowserOpenOnFailure

{{< TODO >}}update link{{< /TODO >}}

Those settings are configured via the [Neodymium configuration properties](Neodymium-configuration-properties). We
recommend that you only activate these properties for local test development to avoid resource issues within your CI
environment.

If those options are activated, the WebDrivers that opened the browsers can't be terminated since this would also result
in closing the browsers that should stay open. Unfortunately, after you inspected the open browsers and closed them, the
WebDrivers then stay open. Therefore, you need to quit those processes manually via some kind of task manager or
interface provided by your operating system. If you restart your system regularly you can probably ignore this, since
those WebDriver zombie processes will be closed during the normal shutdown routine.

{{% warning notitle %}}
**Attention:**  use `@KeepBrowserOpen` and `@KeepBrowserOpenOnFailure` with care. The WebDriver won't be close when
closing the browser and need to be clause manually via some kind of task manager or interface provided by your operating
system.
{{% /warning %}}

### Reuse of WebDrivers

{{< TODO >}}update link{{< /TODO >}}

Another edge case can be the reuse of WebDrivers. The start routine of a browser can take some time especially if they
are started in a remote test environment. Therefore, it is a good idea to reuse an already instantiated WebDriver. This
setting can be configured via the [Neodymium configuration properties](Neodymium-configuration-properties).

Nevertheless, you may want to quit specific WebDrivers for some reason, e.g. prevent side effects from some browser
state that is not easy to clear or free up resources within the test environment.

In such cases we provide three ways how such a behaviour can be achieved.

#### Tear down a specific WebDriver to prevent its reuse

This function can be used in a `@After` annotated function within a JUnit test case. You can define a specific condition
that decides whether a WebDriver should be closed or not.

```Java

@AfterEach
public void after()
{
    if (someConditionIsFulfilled)
    {
        WebDriverUtils.preventReuseAndTearDown();
    }
}
```

#### Clear the cache of a WebDriver available for reuse

This function can be used within a function of a JUnit test case that is annotated with `@AfterClass` to clear the
WebDriverCache of the WebDrivers ready for reuse. When no matching WebDriver can be found in the cache, a new one will
be generated.

```Java

@AfterAll
public void afterClass()
{
    WebDriverUtils.quitReusableCachedBrowsers();
}
```

{{% note notitle %}}
**Attention:** It is safe to run this function during a sequential test execution. It can however have repercussions
(e.g. longer test duration) in a parallel execution environment.
{{% /note %}}

#### Configuring the max reuse setting

The following two settings need to be configured within the Neodymium configuration e.g. `config/neodymium.properties`.
Activate the reuse in general and configure the number of reuses. If not specified or set below 1 the driver will be
reused unlimited times. Setting the property to 1 means that the driver is reused once, so the web driver is used twice
in total.

```properties
neodymium.webDriver.reuseDriver=true
neodymium.webDriver.maxReuse=1
```
