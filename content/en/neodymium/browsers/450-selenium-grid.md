---
title: "Selenium Grid"
weight: 450
type: docs
description: >
  A Guide to Using a Selenium Grid with Neodymium
---

## Integrating with Selenium Grid

Selenium [Grid](https://www.selenium.dev/documentation/grid/) acts as a web driver over network adapter, enabling your tests to utilize a web browser running on a separate machine. This allows you to create your own **browser cloud**, eliminating the need to install every required browser locally on the test execution machine.

To set up this cloud, you need a central server (the **Hub** in Selenium Grid) and at least one **Node** registered to the Hub that provides the desired browser configurations.

```text
+----------+            +----------------------------------------------+
|          |    Uses    | +-------+                                    |
| Selenium | +--------> | |       |                                    |
|          |            | |  Hub  +-----+---------+--------------+     |
|          |            | |       |     |         |              |     |
+----------+            | +-------+  +--+---+  +--+---+       +--+---+ |
                        |            |      |  |      |       |      | |
                        |            | Node |  | Node |  ...  | Node | |
                        |            |      |  |      |       |      | |
                        |            +------+  +------+       +------+ |
                        |                                              |
                        +----------------------------------------------+
```

For integration with Neodymium's [multi browser support]({{< relref "010-browser#multi-browser-handling" >}}), you simply annotate the required browser on your test, and Neodymium manages the web browser's lifecycle.

## Setting up a Local Grid

While you can use third-party providers like SauceLabs, you might want to set up your own Grid.

### 1. Prerequisites

Download the necessary software (Selenium Server JAR) from the [official Selenium release page](https://www.selenium.dev/downloads/).

### 2. Start the Hub

The Hub acts as the central point where your tests register. Start it first:

```shell
java -jar selenium-server-standalone-3.141.59.jar -role hub
```

### 3. Configure and Start a Node

Each Node hosts the browsers. You can configure a Node using a JSON file, e.g., `node-config.json`:

```json
{
  "capabilities":
  [
    {
      "browserName": "firefox",
      "maxInstances": 1,
      "seleniumProtocol": "WebDriver"
    },
    {
      "browserName": "chrome",
      "maxInstances": 1,
      "seleniumProtocol": "WebDriver"
    }
  ],
  "hub": "http://localhost:4444",
  "maxSession": 5,
  "role": "node"
}
```

Then start the Node:

```shell
java -jar selenium-server-standalone-3.141.59.jar -role node -nodeConfig node-config.json
```

## Configuring Neodymium

To use your Grid, you need to tell Neodymium where the Hub is and which browser profiles should use it.

### 1. Define Credentials

Create or update `config/credentials.properties` to specify the Hub's URL.

```properties
# Example configuration for a local grid named 'myGrid'
browserprofile.testEnvironment.myGrid.url = http://localhost:4444/wd/hub
# Username/password often not needed for local grids, but required for services like SauceLabs
# browserprofile.testEnvironment.myGrid.username = myUsername
# browserprofile.testEnvironment.myGrid.password = myPassword
```

### 2. Configure Browser Profile

In `config/browser.properties`, define a browser that uses this environment.

```properties
# Firefox 1600x1200 running on 'myGrid'
browserprofile.FF_Grid.name = Firefox Grid
browserprofile.FF_Grid.browser = firefox
browserprofile.FF_Grid.browserResolution = 1600x1200
browserprofile.FF_Grid.headless = true
browserprofile.FF_Grid.testEnvironment = myGrid
```

### 3. Use in Test

Annotate your test with the new browser profile.

```java
@Browser("FF_Grid")
public class MyGridTest
{
    @NeodymiumTest
    public void testMethod()
    {
        Selenide.open("https://www.example.com");
    }
}
```
