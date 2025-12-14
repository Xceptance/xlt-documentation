---
title: Neodymium 3.X.X
linkTitle: 3.X.X

weight: 900
type: docs

sitemap:
  changefreq: weekly
  priority: 0.1

description: >
    
---
## 3.6.0

Added some missing features and updated dependencies.

### Required Migration

* Cucumber refactored its API once more and we decided to adapt it. So if you use Neodymium with Cucumber, you need to perform the switch to the newer version within your `DriverHooks` class since we only accept the new `Scenario` class. Use the following import: `import io.cucumber.java.Scenario`.
* Cucumber performed a major release so you also need to adapt you `pom.xml`. Replace the old adapter with the following line `<cucumber.options>--plugin io.qameta.allure.cucumber5jvm.AllureCucumber5Jvm</cucumber.options>`

### Features

* Add easy support for drag and drop e.g. sliders - #76 - [documentation](https://github.com/Xceptance/neodymium/wiki/Utility-classes#selenideaddons)
* Support ShadowDOM (Thanks to <https://github.com/selenide/selenide> for adding support) - #113 - [documentation](https://github.com/Xceptance/neodymium/wiki/Shadow-DOM-Testing)
* Add Method to get RemoteWebDriver - #115 - [documentation](https://github.com/Xceptance/neodymium/wiki/Neodymium-context#WebDriver-and-browser)
* Integrated proxy to manipulate headers - #112 (Added basic support, more and documentation will follow with #117 )

### Library Updates

* Allure Report dependencies 2.13.2 - #114  
* Apache Maven Javadoc Plugin 3.2.0 - #106
* Apache Commons CSV 1.8.0 - #114
* Apache Commons Lang 3.10 - #114
* Apache Log4j dependencies 2.13.0 - #114  
* Cucumber dependencies 5.6.0 - #114
* Google Guava 28.2-jre - #114
* Selenide 5.10.0 - #114
* SnakeYAML 1.26 - #114

## 3.5.0

Added some missing features and updated dependencies. :sparkles:

### Features

* Parse a specific path/key of the data set as custom object- #104 - [documentation](https://github.com/Xceptance/neodymium/wiki/Test-data-provider#complex-test-data-objects)
* Retry a whole chain after a StaleElementReferenceException occurs - #105 - [documentation](https://github.com/Xceptance/neodymium/wiki/Utility-classes#example-2)
* Added isSite function to Neodymium class - #108 - [documentation](https://github.com/Xceptance/neodymium/wiki/Neodymium-context#site)

### Improvement

* DebugUtilsTest is flaky (fixed issue in Neodymium library test suite) - #102

### Bugfixes

* Retry a whole chain after a StaleElementReferenceException occurs (fixed and documented the already available variant) - #105

### Library Updates

* Allure Report dependencies 2.13.1 - #106  
* Apache Commons Text 1.8.0 - #106
* Apache Log4j dependencies 2.13.0 - #106  
* Apache Maven Compiler Plugin 3.8.1 - #106
* Apache Maven Javadoc Plugin 3.1.1 - #106
* Apache Maven Source Plugin 3.2.1 - #106
* Cucumber dependencies 4.8.0 - #106
* Maven Surefire Plugin 22.2.2 - #106
* Selenide 5.6.0 - #106

## 3.4.0

Sugar for test environments, WebDriver orchestration and data set usage :icecream:  

### Required Migration

* Cucumber deprecated its API and we decided to switch to the new one. So if you use Neodymium with Cucumber you need to perform the switch to the newer version within your `DriverHooks` class since we only accept the new `Scenario` class. Nevertheless, we recommend to perform the other adaptions within the near future to have less work once the old API is dropped.
* We moved the static function `BrowserStatement.quitCachedBrowser()` to a better internal place, hence we added a better entry point `WebDriverUtils.quitReusableCachedBrowsers()` that should be used.

### Features

* Improved test environment support- #95 - [documentation](https://github.com/Xceptance/neodymium/wiki/Test-Environments#browser-specific-test-environment-configuration)
* Added a possibility to define the path of the data set file - #96 - [documentation](https://github.com/Xceptance/neodymium/wiki/Test-data-provider#data-set-file-location)
* Added a method to prevent the reuse of a WebDriver - #100 - [documentation](https://github.com/Xceptance/neodymium/wiki/How-to-set-up-a-WebDriver#teardown)

### Improvement

* Added a default message to AssertionErrors without a message in order to prevent being misled by the stacktrace for SelenideAddons.wrapAssertionError() - #99

### Bugfixes

* Removed misleading timeout in SelenideAddons.wrapAssertionError() - #101

### Library Updates

* Apache commons-csv 1.7 - #98
* Apache commons-text 1.7 - #98
* Apache Log4j 2.12.1 - #98
* Cucumber 4.7.2 - #98
* Google Guava 28.1-jre - #98
* Selenide 5.2.8 - #98
* SLF4J API 1.7.28 - #98
* SnakeYAML 1.25 - #98

## 3.3.1

The release fixes a bug introduced in Neodymium v3.3.0. :bug:

### Bugfixes

* Fixed a bug in DataUtils.get that resulted in a JsonSyntaxException when parsing strings containing spaces - #93

## 3.3.0

This release (re)adds support for logging, local Safaris and complex test data objects. :sunrise_over_mountains:

Furthermore, we moved the CucumberPico and the Log4j2 dependencies into Neodymium in order to avoid version incompatibilities and make their usage easier. Make sure to remove them from your automation project while updating.

### Features

* Complex object test data mapping  - #83 - [documentation](https://github.com/Xceptance/neodymium/wiki/Test-data-provider#test-data-objects)
* Move CucumberPico dependency into the library - #91 - Maven dependency should be removed
* Retrieve current browser type - #87 - [documentation](https://github.com/Xceptance/neodymium/wiki/Neodymium-context#webdriver-and-browser)

### Bugfixes

* Enable local Safari WebDriver support- #86 - [documentation](https://github.com/Xceptance/neodymium/wiki/How-to-set-up-a-WebDriver#safari-webdriver-setup)
* Reenable logging in child projects - #80  - [documentation](https://github.com/Xceptance/neodymium/wiki/Logging) - Maven dependency should be removed

### Library Updates

* Selenide 5.2.3 - #88  
* Allure 2.12.1 - #88
* Cucumber 4.3.1 - #88  
* and some more - #88  

## 3.2.0

This release improves the support for third party SeleniumGrid vendors such as TestingBot and SauceLabs. 🤖

### Features

* Support for TestingBot - #77
* An easier possibility to tear down the current WebDriver - #78

### Bugfixes

* Prevent infinite authentication loop within environment proxy - #82
* Enable Chrome mobile device emulation for third party SeleniumGrid vendors - #77

### Library Updates

* Selenide 5.2.2 - #81  
* Cucumber 4.3.0 - #81  
* and some more - #81  

## 3.1.0

This release contains a lot of updates for the used dependencies. We also updated the dependencies for our example and template projects on GitHub, so please review them to find out what could be updated in your test project in order to use the latest and greatest :wink:

### Features

* Build support in Java 11 environments - #73
* Configure Selenide configuration for fastSetValue and clickViaJs in Neodymium's configuration #67
* Improve Appium (mobile) support - #71
* Retrieve a localization for a given locale - #65
* Possibility to reach your test environment (e.g. SauceLabs) via a special Proxy - #70

### Bugfixes

* Configuration/Overwriting neodymium.properties (reversed override order) - #74
* After step visible in Allure report - #17
* YAML reserved keyword auto conversion causes an error in localization initialization - #68
* `SelenideAddons.wrapAssertionError` did not attach screenshots and page source to the Allure report - #69

### Library Updates

* Selenide 5.1.0 - #70
* Allure 2.10.0 - #75
* Cucumber 4.2.3 - #48
* and nearly every other - #75

## 3.0.0

The major train is running again. 🚂woop... Woop... WOOP... 🎉

We improved and adjusted our ways to configure Neodymium again. Unfortunately those changes could require some changes. Make sure to implement the following:

* WebDriver configuration: Maybe you configured the path to the WebDriver executable or turned on the "keep browser open on failure" feature. All properties starting with `neodymium.webDriver` must be moved from `browser.properties` into `neodymium.properties`.
* ProxyConfiguration: Needs to be moved for `proxy.properties` into `neodymium.properties`
* Add the line `dev-*.properties` to your `.gitignore` file in order to prevent the development properties files to be committed and pushed by accident
* The collectionsTimeout configuration was removed since it not supported by Selenide anymore. (BTW: This is now also covered by the standard timeout setting)

### Features

* Configuration/Overwriting neodymium.properties is implemented in the following way:
  * the standard way via `config/neodymium.properties`
  * configure your development environment via  `config/dev-neodymium.properties` (This file should not be committed)
  * a temporary properties file to change the configuration for a single test case during runtime (ConfigFactory.setProperty("neodymium.temporaryConfigFile", "file:PATH/[temporaryFile].properties")
  * System.getProperties() (passing configuration properties via the `-D` switch on command line)
  * System.getenv() (set configuration properties via your your system environment e.g. PATH)
* Configuration/Overwriting browser.properties is implemented in the following way:
  * the standard way via `config/browser.properties`
  * configure your development environment via  `config/dev-browser.properties` (This file should not be committed)
* Configuration/Overwriting credentials.properties is implemented in the following way:
  * the standard way via `config/credentials.properties`
  * configure your development environment via  `config/dev-credentials.properties` (This file should not be committed)
* Some shortcuts to configure Selenide via the Neodymium class (e.g. Turn on SoftAssertion, Turn on web site manipulation via JavaScript)
* A condition to validate attributes of an element using a regular expression via `SelenideAddons.matchAttribute`
* A helper method to pass information to the Allure report `AllureAddons.addToReport`

### Bugfixes

* Fixed a bug that prevented the usage of some methods in Neodymium class since the were not implemented as static functions.

### Library Updates

* Selenide 5.0.0
