---
title: Neodymium 4.X.X
linkTitle: 4.X.X

weight: 875
type: docs

sitemap:
  changefreq: weekly
  priority: 0.1


description: >
    
---

## 4.1.5

As the previous Snakeyaml version (1.31) has some vulnerabilities that were fixed with the 1.33 version, we updated the dependency to make the library more secure.

### Library Updates

- Snakeyaml 1.33

## 4.1.4

After Apache Common Text released a new version (1.10.0), we decided to update the dependency to prevent any attack scenarios from that side. We also updated some other tools to stay up-to-date.

### Library Updates

- Apache Commons Text 1.10.0
- Apache Log4j dependencies 2.17.1
- Apache Commons Lang 3.12.0
- Snakeyaml 1.31

## 4.1.2

After Log4j released a new version (2.16.0), we decided to update the dependency to prevent any attack scenarios from that side. We also updated some other tools to stay up-to-date.

### Library Updates

- Apache Log4j dependencies 2.16.0
- Apache Commons CSV 1.9.0
- Apache Commons Lang 3.12.0
- Browserup 2.1.2
- Jayway Jsonpath 2.6.0
- JUnit 4.13.2
- Slf4j API 1.7.32
- Snakeyaml 1.29

## 4.1.1

Security release
Even though the standard usage of Neodymium itself doesn't provide an easy/useful attack scenario for the log4j issue (<https://nvd.nist.gov/vuln/detail/CVE-2021-44228>), we would like to encourage all our users to update the Neodymium dependency as soon as possible to avoid any further risks.

### Library Updates

- Apache Log4j dependencies 2.15.0

## 4.1.0

Ingredients for this release: 2-3 cups of features, one spoon of bug fixes and a handful documentation :stew:

### Required Migration

- Cucumber 6 no longer supports configuration via system property variables as stated in the [allure documentation](https://docs.qameta.io/allure/#_cucumber_jvm) see ([issue](https://github.com/cucumber/cucumber-jvm/pull/1958)). So if you use Neodymium with Cucumber as BDD approach, perform the following tasks to adapt these changes in your test suite:
  - Remove the following part from the `maven-surefire-plugin` plugin:

  ```
    <systemPropertyVariables>
      <cucumber.options>--plugin io.qameta.allure.cucumber5jvm.AllureCucumber5Jvm</cucumber.options>
    </systemPropertyVariables>
  ```

  - Option one within the test case:

  ```Java
    @CucumberOptions(
      features = "src/test/java/template/cucumber/features", glue = “template",
      plugin = {“io.qameta.allure.cucumber6jvm.AllureCucumber6Jvm”}
    )
    public class RunAllFeaturesTest
    {
    }
  ```

  - Option two within the `src/test/resources/cucumber.properties` file:

  ```
    cucumber.plugin=io.qameta.allure.cucumber6jvm.AllureCucumber6Jvm
  ```

### Features

- Add check for test data key exists - #141 [documentation](https://github.com/Xceptance/neodymium/wiki/Utility-classes#datautils)
- Offer fixed random support - #85 [documentation](https://github.com/Xceptance/neodymium/wiki/Neodymium-context#fixed-random-support)
- Print a one line Neodymium version information at runtime - #139 [documentation](https://github.com/Xceptance/neodymium/wiki/Neodymium-context#version)
- Support global browser settings - #123 [documentation](https://github.com/Xceptance/neodymium/wiki/Multi-browser-support#global-browser-profile-configuration)

### Improvement, Documentation and Bugfixes

- Add How to Run Neodymium wiki page - #140 [documentation](https://github.com/Xceptance/neodymium/wiki/Basic-Setup-and-Run)
- Consolidate JavaDoc - #107 (ongoing)
- Document test execution order - #134  [documentation](https://github.com/Xceptance/neodymium/wiki/JUnit)
- Fix displaying of ignore reasons for test methods in allure report - #145
- Improve SelenideAddons.wrapAssertionError - #142
- Remove support for ftp proxy - #144
- Stabilize the SelenideAddonsTest - #143

### Deprecated

- Deprecate SelenideAddons.matchAttribute - #146:
  - Please switch to `com.codeborne.selenide.Condition.attributeMatching`.
  - **Note:** You need to adapt your regex. You could add `.*` at the beginning and the end to match the current behavior (contains the given regex) or define it more precisely according to your test case.

### Library Updates

- Allure Report dependencies 2.13.6 - #138
- Cucumber dependencies 6.8.1 - #138  
- JUnit 4.13.1 - #138
- Selenide 5.15.1 - #138
- Snake YAML 1.27 - #138

## 4.0.0

:four_leaf_clover: ping, pinG, piNG, pING, PING - Major Release v4.0.0 :four_leaf_clover:

This time we added some new features for test executions, updated our dependencies, fixed some bugs and last but not least raised the JRE to 11.

### Required Migration

- Make sure your execution environment provides Java 11

- Update the Java version of your test project to 11 instead of 1.8 **edited**
- Update the aspectjweaver version to 1.9.6 to prevent issues with Java11 **edited**
- If you manipulated the `WebDriverCache` or accessed the current `WebDriver` you may need to adapt your code to the newest API.

### Features

- Added a basic method for drag and drop - #127 - [documentation](https://github.com/Xceptance/neodymium/wiki/Utility-classes#selenideaddons)
- Added a method to open a HTML snippet within the current browser #133 - [documentation](https://github.com/Xceptance/neodymium/wiki/Utility-classes#selenideaddons)
- Improved the embedded local proxy - #117 - [documentation](https://github.com/Xceptance/neodymium/wiki/Neodymium-configuration-properties#Local-proxy-configuration-properties)
- Added the possibility to configure the maximal number of reuses for the WebDriver - #124 - [documentation](https://github.com/Xceptance/neodymium/wiki/How-to-set-up-a-WebDriver#Configuring-the-max-reuse-setting)

### Improvement and Bugfixes

- Improved and fixed tests for Neodymium itself: #121, #125, #128, #132
- Removed explicit Google Guava dependency - #131
- Removed a bug that occurred while clearing the WebDriverCache when more than one Browser was used - #124  

### Library Updates

- JRE to 11 - #135
- Allure Report dependencies 2.13.5 - #119
- Apache Commons Lang 3.11 - #119
- Apache Commons Text 1.9.0 - #119
- Apache Log4j dependencies 2.13.3 - #119  
- BrowserUpProxy Core 2.1.1 - #119  
- BrowserUpProxy MITM 2.1.1 - #119  
- Cucumber dependencies 5.7.0 - #119  
- OWNER 1.0.12 - #119
- Selenide 5.14.2 - #119
