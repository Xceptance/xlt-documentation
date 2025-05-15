---
title: "Neodymium properties"

weight: 90
type: docs

description: >
  Everything you can configure in the Neodymium properties.
---

This chapter contains all information about the Neodymium properties.

## Configuration via properties files

Neodymium combines a couple of frameworks that all have their own configuration needs which also effects test execution.
Most of these properties can be defined/overwritten with environment variables. However since this is an awkward way of
configuration we introduced the file: `config/neodymium.properties`
The file contains a collection of properties that is used to configure some aspects of the used frameworks. It doesn't
cover all the possible configurations for all the frameworks we've integrated.
Have a look at this [file](https://github.com/Xceptance/neodymium-library/blob/master/config/neodymium.properties) since
it lists all supported properties as well as their default values and its purpose.

We use [Owner](https://matteobaccan.github.io/owner/docs/usage/) a framework to write powerful and flexible properties
in order to avoid writing all the boilerplate code. If you are in need of your own set of global properties we encourage
you to give Owner a try.

## Neodymium properties

The following properties can be configured in the `config/neodymium.properties` file and can be accessed via
`Neodymium.configuration().[propertyGetterMethod]()`.

Those properties can be overwritten in the following way (The system environment overwrites everything):

* the standard way via `config/neodymium.properties`
* configure your development environment via `config/dev-neodymium.properties` (This file should not be committed)
* a temporary properties file to change the configuration for a single test case during runtime (
  `ConfigFactory.setProperty("neodymium.temporaryConfigFile", "file:PATH/[temporaryFile].properties")`)
* `System.getProperties()` (passing configuration properties via the `-D` switch on command line)
* `System.getenv()` (set configuration properties via your system environment e.g. PATH)

{{< TODO >}} decide to use the following text or the info box {{< /TODO >}}<br>

The Order in which the properties are loaded is as follows:

1. System properties
2. temporary config file (e.g. `config/temp-neodymium.properties`)
3. `config/dev-neodymium.properties`
4. System environment variables
5. `config/credentials.properties`
6. `config/neodymium.properties`

If one property exists in multiple of those places. The value of the higher ranking file is taken.
This makes it possible to define `config/dev-neodymium.properties` for local testing without changing the setup for
CI/CD, which is quite useful.

{{% note notitle %}}
The Order in which the properties are loaded is as follows:

1. System properties
2. temporary config file (e.g. `config/temp-neodymium.properties`)
3. `config/dev-neodymium.properties`
4. System environment variables
5. `config/credentials.properties`
6. `config/neodymium.properties`

If one property exists in multiple of those places. The value of the higher ranking file is taken.
{{% /note %}}

The next sections contain all properties which can be configured in Neodymium.

{{< TODO >}} **sort** properties! and maybe combine them under a fitting heading? {{< /TODO >}}<br>

{{< TODO >}} add missing descriptions {{< /TODO >}}<br>

### URL

| Property                  | Default value | Description                                                                 |
|---------------------------|---------------|-----------------------------------------------------------------------------|
| neodymium.url             | &lt;none&gt;  | The URL of the web site to test                                             |
| neodymium.url.protocol    | &lt;none&gt;  | The protocol used to access the site                                        |
| neodymium.url.host        | &lt;none&gt;  | The host encoded in the URL                                                 |
| neodymium.url.path        | &lt;none&gt;  | The path on the site that is used as test entry point                       |
| neodymium.url.site        | &lt;none&gt;  | The site/channel part of the url                                            |
| neodymium.url.includeList | &lt;none&gt;  | A list of URLs that the test is allowed to visit separated by whitespaces   |
| neodymium.url.excludeList | &lt;none&gt;  | A list of URLs that the test is forbidden to visit separated by whitespaces |

### Localization

| Property                    | Default value            | Description                                                                            |
|-----------------------------|--------------------------|----------------------------------------------------------------------------------------|
| neodymium.locale            | en_US                    | The locale that should be used to lookup translations in localization feature          |
| neodymium.localization.file | config/localization.yaml | Path to the YAML formatted file that contains localized (translated) data for the site |

### Basic authentication

| Property                     | Default value | Description                                           |
|------------------------------|---------------|-------------------------------------------------------|
| neodymium.basicauth.username | &lt;none&gt;  | Username that should be used for basic authentication |
| neodymium.basicauth.password | &lt;none&gt;  | Password that should be used for basic authentication |

### Selenide

| Property                        | Default value | Description                                          |
|---------------------------------|---------------|------------------------------------------------------|
| neodymium.selenide.timeout      | 3000 ms       | How long should Selenide wait to match a condition   |
| neodymium.selenide.fastSetValue | false         | The values of input field will be set via JavaScript |
| neodymium.selenide.clickViaJs   | false         | The clicks will be executed via JavaScript           |

### Debugging

| Property                                | Default value | Description                                                                                                                                           |
|-----------------------------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| neodymium.debugUtils.highlight          | false         | Should elements highlighted that are selected by Selenide                                                                                             |
| neodymium.debugUtils.highlight.duration | 100 ms        | How long should an element be highlighted                                                                                                             |
| neodymium.junit.viewmode                | tree          | How to display test execution in Eclipse JUnit view. <ul><li>**tree**: a hierarchical representation</li><li>**flat**: a flat list of tests</li></ul> |

### Neodymium context

Responsive design breakpoints. Determines at which page width a site is considered to be displayed on a small, medium,
large oder extra large device.

| Property                                   | Default value | Description                                                                    |
|--------------------------------------------|---------------|--------------------------------------------------------------------------------|
| neodymium.context.device.breakpoint.small  | 576 pixel     | Maximum browser width for extra small devices (0 - 576)                        |
| neodymium.context.device.breakpoint.medium | 768 pixel     | Maximum browser width for small devices (577 - 768)                            |
| neodymium.context.device.breakpoint.large  | 992 pixel     | Maximum browser width for medium devices (769 - 992)                           |
| neodymium.context.device.breakpoint.xlarge | 1200 pixel    | Maximum browser width for large devices (993 - 1200)                           |
| neodymium.context.random.initialValue      | &lt;none&gt;  | Initial random seed which will be use to initialize Neodymiums Random instance |

### JavaScriptUtils

| Property                                            | Default value | Description                                                                                                                     |
|-----------------------------------------------------|---------------|---------------------------------------------------------------------------------------------------------------------------------|
| neodymium.javaScriptUtils.timeout                   | 2000 ms       | The amount of time to wait until JavaScript is considered to finished execution. Used by `until` function of `JavaScriptUtils`. |
| neodymium.javaScriptUtils.pollingInterval           | 200 ms        | The interval at which "until" function checks whether conditions are fulfilled.                                                 |
| neodymium.javaScriptUtils.jQueryIsRequired          | true          | Indicates that jQuery must be on the page and available in order to count the site as loaded.                                   |
| neodymium.javaScriptUtils.loading.animationSelector | &lt;none&gt;  | Designed to select a loading animation to indicate if site loading has finished or not.                                         |

### Proxy

HTTP proxy settings. Specify host and port of the proxy server and whether it should be used at all. If the proxy
requires user authentication, make sure to provide the credentials needed. You may also configure a comma separated list
of hosts that can be used directly, thus bypassing the proxy. Note that the host definitions are interpreted as regular
expressions so ensure proper use of escape characters. Beside the `config/neodymium.properties` file the proxy
configuration can be also be configured within a `config/proxy.properties` file. In case you need a separate file for CI
environments.

| Property                        | Default value | Description                           |
|---------------------------------|---------------|---------------------------------------|
| neodymium.proxy                 | false         | Decide whether or not a proxy is used |
| neodymium.proxy.host            | &lt;none&gt;  | The host of the proxy                 |
| neodymium.proxy.port            | &lt;none&gt;  | The port of the proxy                 |
| neodymium.proxy.bypassForHosts  | &lt;none&gt;  | The hosts that bypass the proxy       |
| neodymium.proxy.socket.userName | &lt;none&gt;  | The socket username of the proxy      |
| neodymium.proxy.socket.password | &lt;none&gt;  | The socket password of the proxy      |
| neodymium.proxy.socket.version  | &lt;none&gt;  | The socket version of the proxy       |
| neodymium.selenideProxy         | false         | Enables Selenide Network Mock         |

### Local proxy

The following settings can be used to set up an embedded local proxy. The proxy can be used with a (self-signed)
certificate to authenticate the proxy that acts as a man in the middle (MITM). This certificate can be provided by the
user or generated on the fly.

| Property                                     | Default value             | Description                                                                                     |
|----------------------------------------------|---------------------------|-------------------------------------------------------------------------------------------------|
| neodymium.localproxy                         | false                     | Create a local proxy to use it for basic authentication, header manipulations or similar things |
| neodymium.localproxy.certificate             | false                     | Should a self signed certificate be used for the MITM proxy                                     |
| neodymium.localproxy.certificate.generate    | true                      | Decides if a certificate should be created on the fly                                           |
| neodymium.localproxy.certificate.archiveFile | ./config/Certificates.p12 | The path to the certificate archive file that contains the root certificate for the MITM proxy  |
| neodymium.localproxy.certificate.archivetype | PKCS12                    | The type of the certificate archive                                                             |
| neodymium.localproxy.certificate.name        | &lt;none&gt;              | The name of the root certificate for the MITM proxy                                             |
| neodymium.localproxy.certificate.password    | &lt;none&gt;              | The password of the root certificate for the MITM proxy                                         |

### Browser behavior

The browser behavior describes how the browser in general conducts during test. There are a couple of properties that
you can use to alter that.

| Property                                       | Default value | Description                                                                                                                                                                                                |
|------------------------------------------------|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| neodymium.webDriver.reuseDriver                | false         | A `boolean` property indicating whether to use a single driver instance for all tests                                                                                                                      |
| neodymium.webDriver.maxReuse                   | -1            | The number of reuses. If not specified or set below 1 the driver will be reused unlimited times. Setting the property to 1 means that the driver is reused once, so the web driver is used twice in total. |
| neodymium.webDriver.keepBrowserOpen            | false         | A `boolean` property indicating whether to keep browser open after test has finished<br>**ATTENTION:** The WebDriver process might stay alive even if you close the browser afterwards                     |
| neodymium.webDriver.keepBrowserOpenOnFailure   | false         | A `boolean` property indicating whether to keep the browser instance open only if the test fails<br>**ATTENTION:** The WebDriver process might stay alive even if you close the browser afterwards         |
| neodymium.webDriver.startNewBrowserForSetUp    | true          | A `boolean` property indicating whether to start a new browser for the setup                                                                                                                               |
| neodymium.webDriver.startNewBrowserForCleanUp  | true          | A `boolean` property indicating whether to start a new browser for the cleanup                                                                                                                             |
| neodymium.webDriver.chrome.pathToDriverServer  | &lt;none&gt;  | The path to the chromedriver e.g. `neodymium.webDriver.chrome.pathToDriverServer =  C:/dev/webdriver/chromedriver.exe`                                                                                     |
| neodymium.webDriver.chrome.pathToBrowser       | &lt;none&gt;  | The path to the chrome browser                                                                                                                                                                             |
| neodymium.webDriver.chrome.driverArguments     | ""            | The chromedriver arguments as a semicolon separated list e.g. `--allowed-origins=localhost, xceptance.com; --log-level=INFO;`                                                                              |
| neodymium.webDriver.firefox.pathToDriverServer | &lt;none&gt;  | The path to the geckodriver                                                                                                                                                                                |
| neodymium.webDriver.firefox.pathToBrowser      | &lt;none&gt;  | The path to the firefox browser                                                                                                                                                                            |
| neodymium.webDriver.firefox.driverArguments    | ""            | The geckodriver arguments as a semicolon separated list                                                                                                                                                    |
| neodymium.webDriver.ie.pathToDriverServer      | &lt;none&gt;  | The path to the ie-driver                                                                                                                                                                                  |
| neodymium.webDriver.ie.driverArguments         | ""            | The ie-driver arguments as a semicolon separated list                                                                                                                                                      |
| neodymium.webDriver.edge.pathToDriverServer    | &lt;none&gt;  | The path to the edge-driver                                                                                                                                                                                |
| neodymium.webDriver.edge.driverArguments       | ""            | The edge-driver arguments as a semicolon separated list                                                                                                                                                    |
| neodymium.webDriver.safari.driverArguments     | ""            | The safari-driver arguments as a semicolon separated list                                                                                                                                                  |

### Test filtering

In some projects, it's required to execute only the test, the class name, method name, and dataset id of which match the
specific regex.
To do so, you have to define **neodymium.testNameFilter** inside of `config/neodymium.properties` .

### SelenideAddons

| Property                                                 | Default value | Description                                                                                          |
|----------------------------------------------------------|---------------|------------------------------------------------------------------------------------------------------|
| neodymium.selenideAddons.staleElement.retry.count        | 3             | How often should the $safe function try to match a condition if the element is affected by staleness |
| neodymium.selenideAddons.staleElement.retry.timeout      | 500 ms        | How long should the $safe function wait between retries in case of element staleness                 |
| neodymium.selenideAddons.optional.retry.pollingIntervall | 3 s           | How long should the optionalWait(While/Until)Condition functions wait until it retries the condition |
| neodymium.selenideAddons.optional.retry.timeout          | 30 s          | After which times should the optionalWait(While/Until)Condition functions stop retrying              |

### AllureAddons

| Property                                          | Default value         | Description                                   |
|---------------------------------------------------|-----------------------|-----------------------------------------------|
| neodymium.allureAddons.screenshots.perstep.always | false                 | Whether a screenshot should be taken per step |
| neodymium.allureAddons.reports.path               | /build/reports/tests/ | Path to the allure report                     |

### TestData

| Property                                        | Default value | Description                                                            |
|-------------------------------------------------|---------------|------------------------------------------------------------------------|
| neodymium.testData.email.domain                 | varmail.de    | The domain used for the generated email address                        |
| neodymium.testData.email.local.prefix           | test          | The prefix used in email address generation `prefix<generated>@domain` |
| neodymium.testData.email.randomCharsAmount      | 12            | The amount of random chars of the email [a-z0-9]                       |
| neodymium.testData.password.uppercaseCharAmount | 2             | The amount of capital letters                                          |
| neodymium.testData.password.lowercaseCharAmount | 5             | The amount of small letters                                            |
| neodymium.testData.password.digitAmount         | 2             | The amount of digits                                                   |
| neodymium.testData.password.specialCharAmount   | 2             | The amount of special characters                                       |
| neodymium.testData.password.specialChars        | +-#$%&.;,_    | The special characters that should be used                             |

### Work in progress

| Property                 | Default value | Description                                                                                                                    |
|--------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------|
| neodymium.workInProgress | false         | If true: only tests of a test class annotated with the @WorkInProgress annotation are executed, otherwise all will be executed |

### Advanced screenshot

| Property                                                | Default value | Description                                                                                                                                   |
|---------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| neodymium.screenshots.enableAdvancedScreenshots         | false         | Enables advanced screenshot capabilities with additional features                                                                             |
| neodymium.screenshots.enableOnSuccess                   | false         | Controls whether screenshots are taken for successful test scenarios                                                                          |
| neodymium.screenshots.fullpagecapture.enable            | false         | Enables full-page screenshot capture, capturing entire page content beyond visible viewport                                                   |
| neodymium.screenshots.fullpagecapture.highlightViewport | false         | Determines if the current viewport should be visually highlighted during full-page capture                                                    |
| neodymium.screenshots.fullpagecapture.highlightColor    | #FF0000       | Sets the highlight color for the viewport during full-page capture                                                                            |
| neodymium.screenshots.blurFullPageScreenshot            | false         | Blurs the part outside the viewport of full-page screenshots                                                                                  |
| neodymium.screenshots.highlightLastElement              | false         | Enables highlighting of the last interacted or focused element in the screenshot                                                              |
| neodymium.screenshots.element.highlightColor            | #FF00FF       | Sets the highlight color for the last element                                                                                                 |
| neodymium.screenshots.highlightLineThickness            | 4             | Defines the thickness of highlight lines when elements are marked                                                                             |
| neodymium.screenshots.enableTreeDirectoryStructure      | false         | Controls the directory structure for storing screenshots. When false, uses a flat directory structure instead of a nested tree-like structure |

### Accessibility / Lighthouse

The Lighthouse thresholdScore properties define minimal values the tests need to achieve to pass, otherwise they will
fail.
Each value rages from 0.0 - 1.0 representing 0% to 100%.

| Property                                                 | Default value | Description                                                                                                                                                                                                                                                                                           |
|----------------------------------------------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| neodymium.lighthouse.binaryPath                          | "lighthouse"  | Specifies the path to the Lighthouse executable<ul><li>If Lighthouse is globally installed and available in PATH, use only the name of the Lighthouse binary</li><li>If Lighthouse is not globally installed and available in PATH, use the absolute/relative path to the Lighthouse binary</li></ul> |
| neodymium.lighthouse.assert.thresholdScore.performance   | 0.5           | Specifies the minimum acceptable score for the performance category in Lighthouse reports. The actual value for the performance score varies a lot, so consider using a lower threshold to avoid a lot of false alerts.                                                                               |
| neodymium.lighthouse.assert.thresholdScore.accessibility | 0.5           | Specifies the minimum acceptable score for the accessibility category in Lighthouse reports.                                                                                                                                                                                                          |
| neodymium.lighthouse.assert.thresholdScore.bestPractices | 0.5           | Specifies the minimum acceptable score for the best practices category in Lighthouse reports.                                                                                                                                                                                                         |
| neodymium.lighthouse.assert.thresholdScore.seo           | 0.5           | Specifies the minimum acceptable score for the seo category in Lighthouse reports.                                                                                                                                                                                                                    |
| neodymium.lighthouse.assert.audits                       | &lt;none&gt;  | A comma separated list of audits to assert. If one fails, the test also fails. A full list of all audit id's and their corresponding titles can be found [here](https://github.com/Xceptance/neodymium/wiki/Accessibility#lighthouse-audit-validation).                                               |

### Report

| Property                                       | Default value | Description                                                       |
|------------------------------------------------|---------------|-------------------------------------------------------------------|
| neodymium.report.showSelenideErrorDetails      | false         | Enable the saving of links of called pages in the report          |
| neodymium.report.enableTestDataInReport        | true          | Whether the test data for each test should be added to the report |
| neodymium.report.environment.enableCustomData  | true          | Whether custom environment data can be added to the report        |
| neodymium.report.environment.enableBrowserData | true          | Whether the used browser profile should be added to the report    |
| neodymium.report.enableStepLinks               | true          | Enable the saving of links of called pages in the report          |

### Selenium log level

| Property                   | Default value | Description                    |
|----------------------------|---------------|--------------------------------|
| neodymium.seleniumLogLevel | SEVERE        | Set the log level for Selenium |

### Popup blocker

We introduced a simple popup blocker to get rid of test affecting popups on a webpage. To use it just configure add a
CSS selector which targets the close button of the popup.

| Property                     | Default value | Description                                                                                                      |
|------------------------------|---------------|------------------------------------------------------------------------------------------------------------------|
| neodymium.popup.<popup name> | &lt;none&gt;  | Define a pop up and the selector to close it. e.g. `neodymium.popup.newsletter = #newsletterbox > button.close ` |
| neodymium.popupInterval      | 1000 ms       | The delay between two checks for a popup in milliseconds                                                         |

## Credentials properties

Since we support platforms like SauceLabs and BrowserStack there is a need to store credentials to access their service.
In order to use these service you need to provide a URL as well as credentials to access. Both platforms use Selenium
Grid protocol which is used to remote control a web browser in the cloud. You can also set up your own browser cloud
with Selenium Grid.

Look at the credentials template. It's designed for accessing only browser automation services which usually use a URL,
username and a password respective access key. These credentials are necessary to access the services that allow you to
use remote browser to execute your tests. SauceLabs usually doesn't use a password. They use an access key which is
different from your password and which can be accessed through their website. So keep that in mind if you want to use
such services.

In the example below there is a Firefox configuration that references the SauceLabs account from credentials file. The
connection is made by the key pattern of the credentials file. `browserprofile.testEnvironment.saucelabs.*` defines a
test environment named `saucelabs` which can be referenced in the browser settings as a `testEnvironment`. That actually
means that in order to create that particular web driver defined in `browser.properties` the information from
`credentials.properties` will be taken into account.

{{% note notitle %}}
Neodymium already contains a `credentials.properties.template` file which can be copied and renamed to
`credentials.properties`.
{{% /note %}}

Here are the example properties from the paragraph above.

First the `config/credentials.properties`:

```properties
## Sauce Labs Credentials
browserprofile.testEnvironment.saucelabs.url=https://ondemand.saucelabs.com:443/wd/hub
browserprofile.testEnvironment.saucelabs.username=MyAccount
browserprofile.testEnvironment.saucelabs.password=secret
```

Second the `config/browser.properties`:

```properties
browserprofile.FF_1024x768.name=Firefox
browserprofile.FF_1024x768.browser=firefox
browserprofile.FF_1024x768.browserResolution=1024x768
browserprofile.FF_1024x768.testEnvironment=saucelabs
```

## Browser configuration

{{< TODO >}} add browser config or link it to the chapter in multi-browser? {{< /TODO >}}<br>
