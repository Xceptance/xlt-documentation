---
title: "Configuration"
linkTitle: "Configuration"
weight: 80
type: docs
description: >
  Overview of key configuration files and properties in Neodymium.
---

Neodymium utilizes various properties files to establish default settings and customize specific behaviors.

{{% note %}}
**Note:** This is a quick summary. For the complete list of all properties and detailed explanations, please visit the [Configuration]({{< relref "../configuration/090-neodymium-properties.md" >}}) page. For browser-specific configurations, see [Browsers]({{< relref "../browsers/010-browser.md" >}}).
{{% /note %}}

## Key Configuration Files

The most important configuration files are:

* `neodymium.properties`: General framework settings (URL, timeouts, etc.).
* `browser.properties`: Browser profiles and capabilities.
* `credentials.properties`: Sensitive data like SauceLabs keys (do not commit!).
* `gif-recording.properties` / `video-recording.properties`: Media recording settings.

Neodymium's properties files must reside in the `./config/*.properties` directory at the project root.

For test-specific configurations, `dev-*.properties` files can be used to override values locally. **Always exclude `dev-*` and `credentials.properties` from version control.**

## Property Loading Order

Properties are loaded in the following order (highest priority first):

1. System properties (e.g., `-Dneodymium.url=...`)
2. Temporary config file (set in code)
3. `config/dev-neodymium.properties`
4. System environment variables
5. `config/credentials.properties`
6. `config/neodymium.properties`

## Common Properties

### URL

Manage the test system's URL and access.

| Property | Description |
|---|---|
| `neodymium.url` | URL of the website to test. |
| `neodymium.url.protocol` | Protocol (http/https). |
| `neodymium.url.host` | Hostname. |

### Selenide

Control Selenide's behavior.

| Property | Default | Description |
|---|:-:|---|
| `neodymium.selenide.timeout` | 3000 | Timeout (ms) for conditions. |
| `neodymium.selenide.fastSetValue` | false | Set values via JS (faster but less realistic). |
| `neodymium.selenide.clickViaJs` | false | Click via JS (use when elements are covered). |

### Browser Profiles (`browser.properties`)

Define browser profiles referenced by `@Browser("<profileName>")`.

The syntax is `browserprofile.<profileName>.<Property> = value`.

| Property | Mandatory | Description |
|---|---|---|
| `name` | YES | Display name in reports. |
| `browser` | YES | Browser type (`chrome`, `firefox`, etc.). |
| `browserResolution` | NO | Window size (e.g., `1200x900`). |
| `headless` | NO | Run without UI (true/false). |

Example:

```properties
browserprofile.Chrome_Headless.name=Chrome Headless
browserprofile.Chrome_Headless.browser=chrome
browserprofile.Chrome_Headless.headless=true
```

## Credentials (`credentials.properties`)

Store secrets here. This file is often used for grid providers.

```properties
browserprofile.testEnvironment.saucelabs.url=https://ondemand.saucelabs.com:443/wd/hub
browserprofile.testEnvironment.saucelabs.username=MyAccount
browserprofile.testEnvironment.saucelabs.password=secret
```

Referenced in `browser.properties`:

```properties
browserprofile.MyProfile.testEnvironment=saucelabs
```

## Recording

Configure if and when to record execution.

| Property | Description |
|---|---|
| `enableFilming` | Master switch for recording. |
| `filmAutomatically` | Start recording automatically. |
| `appendAllRecordingsToAllureReport` | Add all recordings to report (default: failures only). |
