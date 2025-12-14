---
title: "Selenium Grid"

weight: 450
type: docs

description: >
  A Guide to Using a Selenium Grid with Neodymium
---

## Integrating with Selenium Grid

Selenium [Grid](https://www.selenium.dev/documentation/grid/) acts as a web driver over network adapter, enabling your
tests to utilize a web browser running on a separate machine. This allows you to create your own **browser cloud**,
eliminating the need to install every required browser locally on the test execution machine.

To set up this cloud, you need a central server (the **Hub** in Selenium Grid) and at least one **Node** registered to
the Hub that provides the desired browser configurations.

```                                                                         
+----------+            +----------------------------------------------+
|          |    Uses    | +-------+                                    |
| Selenium | +--------> | |       |                                    |
|          |            | |  Hub  +-----+---------+--------------+     |
+----------+            | |       |     |         |              |     |
                        | +-------+  +--+---+  +--+---+       +--+---+ |
                        |            |      |  |      |       |      | |
                        |            | Node |  | Node |  ...  | Node | |
                        |            |      |  |      |       |      | |
                        |            +------+  +------+       +------+ |
                        |                                              |
                        +----------------------------------------------+
```

For integration with Neodymium's [multi browser support]({{< relref "010-browser#multi-browser-handling" >}}), you
simply annotate the required browser on your test, and Neodymium manages the web browser's lifecycle. To run this in
combination with a Selenium Grid, follow these steps:

1. Set up the Grid using the official [quick start guide](https://www.selenium.dev/documentation/grid/getting_started/).

2. Create an entry in your `config/credentials.properties` file that specifies the Hub's access details.

3. Reference this entry by setting the `testEnvironment` property in your browser configuration.

## Example Configuration

### `config/credentials.properties`

This example configures access to a Selenium Grid located at `https://192.168.1.101:4444` on the local network,
referenced by the identifier `myGrid`.

```
# example configuration 'myGrid'
browserprofile.testEnvironment.myGrid.url = https://192.168.1.101:4444
browserprofile.testEnvironment.myGrid.username = myUsername
browserprofile.testEnvironment.myGrid.password = myPassword
```

### `config/browser.properties`

This configuration defines a browser profile (`FF_1600x1200`) and explicitly assigns it to run on the `myGrid` test
environment defined above.

```
# latest Firefox in 1600x1200 
browserprofile.FF_1600x1200.name = Firefox 1600x1200
browserprofile.FF_1600x1200.browser = Firefox
browserprofile.FF_1600x1200.browserResolution = 1600x1200
browserprofile.FF_1600x1200.testEnvironment = myGrid

```

### `MyTests.java`

The following example shows a test class that uses the browser profile configured to execute within the `myGrid`
environment.

```java

@Browser("FF_1600x1200")
public class MyTests
{
    @NeodymiumTest
    public void testMethod()
    {
        Selenide.open("www.google.com");
    }
}
```
