---
title: "Properties"
weight: 5
type: docs
description: "Cheat sheet for Neodymium properties and configuration."
---

## Configuration

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

### Neodymium Properties

**URL properties:**

| Property | Default value | Description |
|---|:---:|---|
| neodymium.url | &lt;none&gt; | URL of the website to test |
| neodymium.url.protocol | &lt;none&gt; | protocol used to access the site |
| neodymium.url.host | &lt;none&gt; | host encoded in the URL |
| neodymium.url.path | / | path on the site that is used as test entry point |
| neodymium.url.site | &lt;none&gt; | site/channel part of the url |
| neodymium.url.includeList | &lt;none&gt; | list of URLs that the test is allowed to visit. Separated by whitespaces |
| neodymium.url.excludeList | &lt;none&gt; | list of URLs that the test is forbidden to visit. Separated by whitespaces |

**Localization:**

| Property | Default value | Description |
|---|---|---|
| neodymium.locale | en_US | The locale that should be used to lookup translations in localization feature |
| neodymium.localization.file | config/localization.yaml | Path to the YAML formatted file that contains localized data for the site |

**Basic authentication:**

| Property | Description |
|---|---|
| neodymium.basicauth.username | Username that should be used for basic authentication |
| neodymium.basicauth.password | Password that should be used for basic authentication |

**Debugging:**

| Property | Default value | Description |
|---|---|---|
| neodymium.debugUtils.highlight | false | Highlight elements that are selected by Selenide |
| neodymium.debugUtils.highlight.duration | 100 (ms) | How long should an element be highlighted |

**Selenide:**

| Property | Default value | Description |
|---|---|---|
| neodymium.selenide.timeout | 3000 (ms) | How long should Selenide wait to match a condition |
| neodymium.selenide.fastSetValue | false | The values of input field will be set via JavaScript |
| neodymium.selenide.clickViaJs | false | The clicks will be executed via JavaScript |

**PopUp Blocker:**

```properties
neodymium.popup.customPopUp=#myWindow
```

**Further properties:**

See [Neodymium Properties]({{< relref "../configuration/090-neodymium-properties.md" >}}).

### Browser Properties

* In `.config/browser.properties`.
* Format: `browserprofile.<browserId>.<property> = <value>`.

```properties
browserprofile.Chrome_1600x1200.name=Chrome 1600x1200
browserprofile.Chrome_1600x1200.browser=chrome
browserprofile.Chrome_1600x1200.browserResolution=1600x1200
```

* Select browser with `@Browser("<browserId>")`
* Use default browser with `@Browser`
* Prevent browser start with `@SuppressBrowsers`

| Property | Mandatory | Description |
|---|---|---|
| name | YES | more detailed name used for reporting. |
| browser | YES | test browser (valid values: `iphone`, `ipad`, `android`, `firefox`, `chrome`, `internetexplorer`, `safari`) |
| version | device emulation only | browser version to use **OR** OS version of an emulated device |
| browserResolution | NO | width and height in format `1200x900`, `1200X900`, or `1200,900` |
| pageLoadStrategy | NO | `normal` (default), `eager`, `none` |
| headless | NO | `true`/`false`. Currently only for Firefox and Chrome. |
| acceptInsecureCertificates | NO | `true`/`false` |
| arguments | NO | Additional command line arguments. Chained by semicolon (";"). |

**Global browser properties:**

```properties
browserprofile.global.pageLoadStrategy=normal|eager|none
browserprofile.global.headless=true|false
browserprofile.global.acceptInsecureCertificates=true|false
browserprofile.global.browserResolution=1200x900
```

### Credentials Properties

* URLs and credentials for SauceLabs and BrowserStack.
* Stored in `.config/credential.properties`.

```properties
## Sauce Labs Credentials
browserprofile.testEnvironment.saucelabs.url=https://ondemand.saucelabs.com:443/wd/hub
browserprofile.testEnvironment.saucelabs.username=MyAccount
browserprofile.testEnvironment.saucelabs.password=secret
```

## More Cheat Sheets

* [Setup & Run]({{< relref "setup-and-run.md" >}}) - Define, run tests, and generate reports.
* [Selenide & WebDriver]({{< relref "selenide-webdriver.md" >}}) - Element selection, interaction, and validation.
* [Features & Annotations]({{< relref "neodymium-features.md" >}}) - Test data, reports, accessibility, and more.
