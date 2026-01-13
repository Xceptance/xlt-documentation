---
title: "WebDriver Handling"

weight: 1
type: docs

description: >
  Everything about WebDrivers.
---

To run browser tests a WebDriver for the desired browser is necessary. If the driver is missing, Selenium will
automatically download the latest one.

Within the file `config/browser.properties` you can set up the browsers used throughout testing.
More details on configuring the browser properties can be found in the
[browser configuration and handling chapter]({{< relref "010-browser" >}}).

The next three sections describe how to set up specific WebDriver and browsers.

## Set Up a Specific WebDriver

For that, you have to download and provide a
specific [Selenium WebDriver](https://www.selenium.dev/documentation/webdriver/).

You can download the common WebDriver here:

* [Chrome](https://googlechromelabs.github.io/chrome-for-testing/)
* [Gecko (Firefox)](https://github.com/mozilla/geckodriver/releases)
* [Edge](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)

After downloading you can configure them in the `config/neodymium.properties` file. Find the line that matches the
WebDriver of your choice e.g. `neodymium.webDriver.chrome.pathToDriverServer = /path/to/chromedriver` or
add them to the PATH of your system.

If you need to set the path of the browser executable as well, you can also easily set it in the properties as
described [here]({{< relref "010-browser#set-up-a-specific-browser-executable" >}}).

## Safari WebDriver Setup

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

## Tear Down

Normally Neodymium takes care of quitting the WebDriver instances and there is nothing else to do or to worry about.
Nevertheless, there may be some use and edge cases you need to handle yourself or know what you can do.

### KeepBrowserOpen and KeepBrowserOpenOnFailure

Usually the browser and the according webdriver are closed automatically once a test finishes. However, there are
ways to prevent this.

To keep the browser open you can either:

* set the configuration values `neodymium.webDriver.keepBrowserOpen=true` or
  `neodymium.webDriver.keepBrowserOpenOnFailure=true` or
* use the annotation `@KeepBrowserOpen(onlyOnFailure = false)`

More details about properties can be found in
the [Neodymium configuration properties]({{< relref "090-neodymium-properties#browser-behavior" >}}).
We recommend that you only activate these properties for local test development to avoid resource issues within your CI
environment.

If those options are activated, the WebDrivers that opened the browsers can't be terminated since this would also result
in closing the browsers that should stay open. Unfortunately, after you inspected the open browsers and closed them, the
WebDrivers then stay open. Therefore, you need to quit those processes manually via some kind of task manager or
interface provided by your operating system. If you restart your system regularly you can probably ignore this, since
those WebDriver zombie processes will be closed during the normal shutdown routine.

{{% warning notitle %}}
**Attention:** use the `KeepBrowserOpen` logic with care. The WebDriver won't be shut down by
closing the browser and need to be closed manually via some kind of task manager or interface provided by your operating
system.
{{% /warning %}}

### Reuse of WebDrivers

Another edge case can be the reuse of WebDrivers. The start routine of a browser can take some time especially if they
are started in a remote test environment. Therefore, it might be a good idea to reuse an already instantiated WebDriver.
This
setting can be configured via the [Neodymium configuration properties]({{< relref "090-neodymium-properties#browser-behavior" >}}).

Nevertheless, you may want to quit specific WebDrivers for some reason, e.g. prevent side effects from some browser
state that is not easy to clear or free up resources within the test environment.

In such cases we provide three ways how such a behaviour can be achieved.

#### Tear Down a Specific WebDriver to Prevent Its Reuse

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

#### Clear the Cache of a WebDriver Available for Reuse

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

#### Configuring the Max Reuse Setting

The following two settings need to be configured within the Neodymium configuration e.g. `config/neodymium.properties`.
Activate the reuse in general and configure the number of reuses. If not specified or set below 1 the driver will be
reused unlimited times. Setting the property to 1 means that the driver is reused once, so the web driver is used twice
in total.

```properties
neodymium.webDriver.reuseDriver=true
neodymium.webDriver.maxReuse=1
```
