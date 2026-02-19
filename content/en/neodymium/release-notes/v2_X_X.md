---
layout: manual
title: Neodymium 2.X.X

weight: 925
type: docs

sitemap:
  changefreq: weekly
  priority: 0.1


description: >
    
---
## 2.1.0

### General

* Increased unit test coverage
* Removed some unnecessary log output

### Features

* A condition to validate value attributes using a regular expression via `SelenideAddons.matchValue`
* Wrap jUnit assertion errors via `SelenideAddons.wrapAssertionError`

### Bugfixes

* Allure reports generated in Java project will contain screenshots and page sources again

## 2.0.0

We are pleased to announce that Neodymium has been released in version 2.0.0 🎉

This is a major release since we consolidated our API. Unfortunately, these changes will break the current API and introduce a major update.

So make sure to adjust the following items when you upgrade:

* Renaming of classes in the `neodymium.util` package to achieve a better understanding
  * e.g. `Driver` to `WebDriverUtils`
* Refactoring of the `Context.class`
  * Renamed to Neodymium
  * Static functions to access all fields and API functions e.g.:
    * `Neodymium.configuration()` to access the NeodymiumConfiguration
    * `Neodymium.localization("<localizationKey>")` to get the current translation for the `<localizationKey>`
    * `Neodymium.dataValue("<dataKey>")` to get value for the `<dataKey>` out of the current data set
* Renaming of our current main properties file from `test.properties` to `neodymium.properties`
* Scoping and renaming for our property keys. We renamed and scoped them accordingly to their usage within the framework. Please find the correct naming in the [documentation](https://github.com/Xceptance/neodymium/wiki/Neodymium-configuration-properties) or in our example [neodymium.properties](https://github.com/Xceptance/neodymium/blob/master/config/neodymium.properties) file.

### Changes

* Fixed some bugs in the ProxyConfiguration and added support for configuring sockets
* Removed usage of DesiredCapabilities to get rid of unnecessary console output during test execution

### Bugfixes

* Fixed a NPE when using `JavaScriptUtils.waitForReady()` without configuring a waiting animation selector.
* Fixed a NPE in NeodymiumLocalization when having an empty String as value

### Library Updates

* Allure 2.7.0
* Selenide 4.12.3
* JavaDoc 3.0.1

### Documentation

We covered some new topics in our [GitHub wiki](https://github.com/Xceptance/neodymium/wiki):

* [Neodymium Context](https://github.com/Xceptance/neodymium/wiki/Neodymium-context)
* [Neodymium Configuration](https://github.com/Xceptance/neodymium/wiki/Neodymium-configuration-properties)
* [Using JUnit Categories for Maven execution](https://github.com/Xceptance/neodymium/wiki/Build-with-Maven)
* [Visual Assert](https://github.com/Xceptance/neodymium/wiki/Visual-assert)
