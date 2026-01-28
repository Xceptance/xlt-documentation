---
title: "Test Environments"

weight: 330
type: docs

description: >
  TODO
---

{{< TODO >}}add description{{< /TODO >}}

Neodymium supports the use of external **Test Environments** via a **Remote WebDriver**. These environments can be a
self-hosted Selenium Grid or cloud-based browser providers like SauceLabs, TestingBot, or Browserstack. These services
allow you to execute browser-based tests on real or emulated devices (personal computers, tablets, and cell phones) with
various operating system and browser configurations.

Our multi-browser support enables you to seamlessly execute tests in the cloud environments defined below.

## Credentials

To use a cloud-based test environment service, you must provide your account access key in the
`config/credentials.properties` file.

Instead of a password, these services typically require an **access key** or **secret**, which you can obtain from your
account settings on the provider's website.

### Configuration Files

To overwrite credentials in your development environment without committing them, use the following hierarchy:

* **Standard:** `config/credentials.properties`
* **Development Override (Recommended):** `config/dev-credentials.properties` (This file should be excluded from version
  control.)

{{% warning notitle %}}
**ATTENTION**: Always exercise caution when committing credentials. It is strongly recommended to store sensitive
information exclusively in the `dev-credentials.properties` file and exclude it from version control (Git). For CI/CD
environments, utilize the dedicated secret/credential handling mechanisms provided by your pipeline.
{{% /warning %}}

### Example Credentials

The following example shows the required structure for configuring access to major providers.

```ini
# Test Environment Credentials

## SauceLabs
browserprofile.testEnvironment.saucelabs.url = https://ondemand.saucelabs.com:443/wd/hub
browserprofile.testEnvironment.saucelabs.username = SAUCELAB_USERNAME
browserprofile.testEnvironment.saucelabs.password = SAUCELAB_ACCESS_KEY

## TestingBot
browserprofile.testEnvironment.testingbot.url = https://hub.testingbot.com/wd/hub
browserprofile.testEnvironment.testingbot.username = TESTINGBOT_KEY
browserprofile.testEnvironment.testingbot.password = TESTINGBOT_SECRET

## Browserstack
browserprofile.testEnvironment.browserstack.url = https://hub-cloud.browserstack.com/wd/hub
browserprofile.testEnvironment.browserstack.username = BROWSERSTACK_USERNAME
browserprofile.testEnvironment.browserstack.password = BROWSERSTACK_KEY
```

{{% note notitle %}}
**NOTE**: The property key names (`saucelabs`, `testingbot`, `browserstack`) are crucial, as they are used to reference
the configuration when defining a browser profile.
{{% /note %}}

## Configuring Browser Profiles for Cloud Execution

To execute a test in a specific cloud environment, you must configure a browser profile in `browser.properties` and set
the `testEnvironment` property to reference the provider's key (e.g., `saucelabs`).

### Example Browser Configurations

The following configurations map specific browser versions to the defined cloud services:

```ini
## SauceLabs
browserprofile.Chrome_SauceLabs.name = Chrome 50@saucelabs
browserprofile.Chrome_SauceLabs.browser = chrome
browserprofile.Chrome_SauceLabs.version = 50.0
browserprofile.Chrome_SauceLabs.testEnvironment = saucelabs

## TestingBot
browserprofile.Chrome_TestingBot.name = Chrome 50@testingbot
browserprofile.Chrome_TestingBot.browser = chrome
browserprofile.Chrome_TestingBot.version = 50.0
browserprofile.Chrome_TestingBot.testEnvironment = testingbot

## Browserstack
browserprofile.Windows10Chrome_latest.name = Windows 10 Chrome latest
browserprofile.Windows10Chrome_latest.browserName = Chrome
browserprofile.Windows10Chrome_latest.version = latest
browserprofile.Windows10Chrome_latest.platform = Windows
browserprofile.Windows10Chrome_latest.platformVersion = 10
browserprofile.Windows10Chrome_latest.seleniumVersion = 3.14.0
browserprofile.Windows10Chrome_latest.testEnvironment = browserstack
```

A test case annotated with `@Browser("Chrome_SauceLabs")` will execute on SauceLabs using the specified configuration.

## Finding Provider Credentials

Always keep your access key secret.

### SauceLabs

Your personal access key can be found in your SauceLabs account settings. Click the "show" button to view the key
required for programmatic access.

{{< image max-width="60%" src="neodymium/saucelabs_accesskey.png" >}}
SauceLabs access key.
{{< /image >}}

### TestingBot

Your personal access key and secret key are available in your TestingBot account settings for programmatic access.

{{< image max-width="60%" src="neodymium/testingbot_accesskey.png" >}}
TestingBot personal access key and secret.
{{< /image >}}

### Browserstack

Access your account settings via [this link](https://www.browserstack.com/accounts/settings). Your username and access
key are located on the "Automate" card.

{{< image max-width="60%" src="neodymium/browserstack_accesskey.png" >}}
Browserstack access key username.
{{< /image >}}

## Proxy Setup

If you need to route traffic to your chosen test environment through a proxy, you can configure the proxy settings
directly in your properties file under the test environment key:

```ini
# boolean to activate the proxy usage
browserprofile.testEnvironment.saucelabs.proxy = true
browserprofile.testEnvironment.saucelabs.proxy.host = PROXY_HOST 
browserprofile.testEnvironment.saucelabs.proxy.port = 8500
browserprofile.testEnvironment.saucelabs.proxy.username = PROXY_USERNAME
browserprofile.testEnvironment.saucelabs.proxy.password = PROXY_PASSWORD
```

{{% note notitle %}}
**NOTE**: Ensure the property key names contain the correct test environment identifier (e.g., `saucelabs`) for
reference.
{{% /note %}}

## Browser-Specific Test Environment Configuration

Configuring specific browser capabilities can be complex. You can use the configuration helpers provided
by [SauceLabs](https://docs.saucelabs.com/basics/platform-configurator/)
and [TestingBot](https://testingbot.com/support/getting-started/browsers.html) as a starting point.

The following table lists the supported properties. Neodymium maps these properties to the correct names required by
each provider (e.g., TestingBot's non-consequent naming scheme is handled automatically).

| Property Name                | Type    | Usage                                                                  | SauceLabs     | TestingBot                   | Browserstack                  |
|:-----------------------------|:--------|:-----------------------------------------------------------------------|:--------------|:-----------------------------|:------------------------------|
| `browserName`                | String  | Name of the browser (e.g., "safari")                                   | supported     | supported                    | supported (alt: browser)      |
| `deviceName`                 | String  | (Mobile) device used for testing (e.g., "iPhone Xs Max")               | supported     | supported                    | supported (alt: device)       |
| `deviceOrientation`          | String  | Orientation of the device (e.g., "landscape")                          | supported     | not supported                | supported                     |
| `idleTimeout`                | int     | Time after an idle Remote WebDriver is closed (in seconds, e.g., "60") | supported     | renamed: "idletimeout"       | supported (default 900s)      |
| `maxDuration`                | int     | Maximum runtime of the Remote WebDriver (in seconds, e.g., "1800")     | supported     | renamed: "maxduration"       | not supported (fixed on 2h)   |
| `platformName`               | String  | OS/platform the browser is running on (e.g., "iOS")                    | supported     | supported                    | renamed: "platform" (alt: os) |
| `screenResolution`           | String  | Width and height separated by 'x' (e.g., "1200x900")                   | supported     | renamed: "screen-resolution" | renamed: "resolution"         |
| `seleniumVersion`            | String  | Version of Selenium used within the environment                        | supported     | renamed: "selenium-version"  | supported                     |
| `version`                    | String  | Browser or system version (e.g., "12.2")                               | supported     | supported                    | supported                     |
| `acceptInsecureCertificates` | Boolean | Controls acceptance of insecure SSL certificates                       | not supported | not supported                | renamed: "acceptSslCerts"     |

{{< TODO >}}check the table what currently is supported where{{< /TODO >}}

{{% note notitle %}}
**NOTE**: Since TestingBot's naming scheme is inconsistent, we standardized the property names based on SauceLabs.
Configure the properties as named in the table, and Neodymium will handle the necessary mapping.
{{% /note %}}

{{% note notitle %}}
**TIP**: You can use the [BrowserStack capabilities generator](https://www.browserstack.com/automate/capabilities) to
see the required configurations for your desired device.
{{% /note %}}

### Mobile Device Example Configurations

```ini
## SauceLabs
browserprofile.iphone8.name = iPhone 8 @SauceLabs
browserprofile.iphone8.browser = iphone
browserprofile.iphone8.browserName = Safari
browserprofile.iphone8.platformName = iOS
browserprofile.iphone8.platformVersion = 12.0
browserprofile.iphone8.deviceName = iPhone 8
browserprofile.iphone8.deviceOrientation = portrait
browserprofile.iphone8.testEnvironment = saucelabs

## TestingBot
browserprofile.iPhone_XS_TestingBot.name = iPhone XS @TestingBot
browserprofile.iPhone_XS_TestingBot.browser = iphone
browserprofile.iPhone_XS_TestingBot.browserName = safari
browserprofile.iPhone_XS_TestingBot.platformName = iOS
browserprofile.iPhone_XS_TestingBot.platformVersion = 12.1
browserprofile.iPhone_XS_TestingBot.deviceName = iPhone XS
browserprofile.iPhone_XS_TestingBot.testEnvironment = testingbot

## Browserstack
browserprofile.iPhone12.name = iPhone12
browserprofile.iPhone12.browserName = iphone12
browserprofile.iPhone12.platformVersion = 14
browserprofile.iPhone12.deviceName = iPhone 12
browserprofile.iPhone12.deviceOrientation = portrait
browserprofile.iPhone12.testEnvironment = browserstack
```
