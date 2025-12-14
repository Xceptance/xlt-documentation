---
title: "Configuration"
linkTitle: "Configuration"
weight: 80
type: docs

description: >
  Overview of key configuration files and properties in Neodymium.
---

Neodymium utilizes various properties files to establish default settings and customize specific behaviors.

The most important configuration files are:

* `neodymium.properties`
* `browser.properties`
* `credentials.properties`
* `gif-recording.properties`
* `video-recording.properties`

Neodymium's properties files must reside in the `./config/*.properties` directory at the project root. For test-specific configurations, `dev-*.properties` files can be used to override or add values. It is crucial to exclude these `dev-*` files from version control to avoid unintended consequences for CI/CD and committing secrets.

Temporary property files can also be created during test execution using:
`ConfigFactory.setProperty(Neodymium.TEMPORARY_CONFIG_FILE_PROPERTY_NAME, "file:" + fileLocation);` within a `@BeforeAll` or `@Before` method.

The loading order for these properties is (highest priority first):

1. System properties
2. Temporary config file
3. `config/dev-neodymium.properties`
4. System environment variables
5. `config/credentials.properties`
6. `config/neodymium.properties`

## Neodymium Properties

The `neodymium.properties` file is the most comprehensive, defining a wide range of properties and behaviors. Below are essential properties from key areas.

### URL Properties

The URL properties manage the test system's URL and can limit test automation to approved sites.

| Property | Default | Description |
|---|:-:|---|
| `neodymium.url` | - | URL of the website to test. |
| `neodymium.url.protocol` | - | Protocol used to access the site. |
| `neodymium.url.host` | - | Host encoded in the URL. |
| `neodymium.url.path` | / | Path used as test entry point. |
| `neodymium.url.includeList` | - | List of allowed URLs (whitespace separated). |
| `neodymium.url.excludeList` | - | List of forbidden URLs (whitespace separated). |

When properly configured, `Neodymium.configuration().url()` returns the test system's URL. The URL can be dynamically built using properties (e.g., `neodymium.url = ${neodymium.url.protocol}://${neodymium.url.host}`).

### Selenide Properties

These properties modify Selenide's behavior.

| Property | Default | Description |
|---|:-:|---|
| `neodymium.selenide.timeout` | 3000 | Timeout (ms) for Selenide to match a condition. |
| `neodymium.selenide.fastSetValue` | false | Set input values via JavaScript. |
| `neodymium.selenide.clickViaJs` | false | Execute clicks via JavaScript. |

### Popup Blocker

Neodymium can automatically handle unpredictable pop-ups. Configure the close button selector:

```properties
neodymium.popup.customPopUp=#myWindow
```

For predictable pop-ups, manual handling in the test is preferred.

## Browser

Browsers are defined in `browser.properties`. Tests use `@Browser("<browserId>")` to select a profile.

| Property | Mandatory | Description |
|---|---|---|
| `name` | YES | Display name for reporting. |
| `browser` | YES | Browser type (`chrome`, `firefox`, etc.). |
| `browserResolution` | NO | Window size (e.g., `1200x900`). |
| `headless` | NO | Run in headless mode (true/false). |
| `arguments` | NO | Command line arguments (chained by `;`). |

Global browser configurations can be set using `browserprofile.global.<property>`.

```properties
browserprofile.global.headless=true
browserprofile.global.browserResolution=1200x900
```

## Credentials

Authentication information, such as for SauceLabs or BrowserStack, is stored in `credentials.properties`.

```properties
browserprofile.testEnvironment.saucelabs.url=https://ondemand.saucelabs.com:443/wd/hub
browserprofile.testEnvironment.saucelabs.username=MyAccount
browserprofile.testEnvironment.saucelabs.password=secret
```

This allows you to reference the environment in your browser profile:

```properties
browserprofile.FF_1024x768.testEnvironment=saucelabs
```

## Recording

Recording properties configure GIF and MP4 recording behavior.

| Property | Type | Description |
|---|---|---|
| `enableFilming` | bool | Master switch for recording. |
| `filmAutomatically` | bool | Start recording automatically on browser open. |
| `appendAllRecordingsToAllureReport` | bool | Add all recordings to report (default: only failures). |

Manual recording control in tests:

* `FilmTestExecution.startVideoRecording(String fileName);`
* `FilmTestExecution.finishVideoFilming(String fileName, boolean testFailed);`
