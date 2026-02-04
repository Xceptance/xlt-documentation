---
title: "Multibrowser"
linkTitle: "Multibrowser"
weight: 70
type: docs

description: >
  Configure and run tests across multiple browsers and devices.
---

Neodymium supports testing across a range of browsers, including Firefox, Chrome, Internet Explorer, Safari, and mobile
devices such as Android, iPhone, and iPad.

## Configuration

To configure these browsers, create a `browser.properties` file in the `config` directory at the project root.

{{% note %}}
The `browser.properties` file needs to be located in `./config/browser.properties`.
{{% /note %}}

All browser configurations must adhere to the naming convention:
`browserprofile.<browserId>.<property> = <value>`

In this example, Chrome and Firefox are configured with specific resolutions and arguments:

```properties
# A local Chrome with a small window size
browserprofile.Chrome_1200x768.name=Chrome 1200x768
browserprofile.Chrome_1200x768.browser=chrome
browserprofile.Chrome_1200x768.browserResolution=1200x768
browserprofile.Chrome_1200x768.arguments=-ignore-certificate-errors; --remote-allow-origins=*
# A local Firefox with a small window size
browserprofile.Firefox_1200x768.name=Firefox 1200x768
browserprofile.Firefox_1200x768.browser=firefox
browserprofile.Firefox_1200x768.browserResolution=1200x768
browserprofile.Firefox_1200x768.headless=false
```

### Common Properties

| Property                     | Description                                                      |
|------------------------------|------------------------------------------------------------------|
| `name`                       | Name of the browser in the report (required).                    |
| `browser`                    | Browser to use, e.g., `chrome` or `firefox` (required).          |
| `browserResolution`          | Resolution of the browser window (e.g., `1200x768`).             |
| `arguments`                  | Optional browser arguments (e.g., `-ignore-certificate-errors`). |
| `acceptInsecureCertificates` | Whether the driver accepts insecure certificates.                |
| `headless`                   | Defines if the browser should run in headless mode.              |

For a complete list of properties, see the [Configurations]({{< relref "010-browser" >}}) page.

## Running Tests

To utilize the browsers defined in `browser.properties`, use the `@Browser("<browserId>")` annotation.

If no tests are annotated, the default Neodymium browser is used. To execute all tests with every configured browser, the `AbstractTest` class can be annotated with `@Browser("<browserId>")` for each browser.

```java
import com.xceptance.neodymium.common.browser.Browser;
import com.xceptance.neodymium.util.Neodymium;
import org.junit.jupiter.api.BeforeEach;

@Browser("Chrome_1200x768")
@Browser("Firefox_1200x768")
public abstract class AbstractTest
{
    ...
}
```

Individual test methods within a class can also be run with different browsers by annotating them specifically.

Running all tests will now result in the following report, showing execution across the configured browsers.

{{< image max-width="60%" src="neodymium/multibrowser_report.png" >}}
Multibrowser report.
{{< /image >}}
