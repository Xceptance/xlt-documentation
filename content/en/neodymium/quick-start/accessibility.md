---
title: "Accessibility"
linkTitle: "Accessibility"
type: docs

weight: 90
description: >
  Integrate Google Lighthouse for accessibility and performance testing.
---

Accessibility is vital, ensuring websites are usable by everyone. Neodymium has integrated [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) to address and test accessibility.

## Installation

{{% warning %}}
Before using Lighthouse within Neodymium, it must be installed independently on the machine running the tests.
{{% /warning %}}

Install Lighthouse globally using npm:

```shell
npm install -g lighthouse
```

## Usage

A Lighthouse report can be generated for the currently loaded page at any point during a test:

```java
LighthouseUtils.createLightHouseReport("<reportName>");
```

This works as long as a webpage is loaded, even for pages relying on session-specific data.

**Exception:** Pages that redirect immediately upon refresh (like some checkout pages) may be difficult to test because Lighthouse re-opens the page in a separate tab.

### Example

The `FirstTest` can be modified to generate valid Lighthouse reports after each page navigation:

```java
public class FirstTest
{
    @NeodymiumTest
    public void firstTest()
    {
        // open the test website
        Selenide.open("https://posters.xceptance.io:8443/");

        // interacting with elements and assert states
        HomePage homePage = new HomePage().assertExpectedPage();
        LighthouseUtils.createLightHouseReport("HomePage");

        // navigate to the category page
        ProductListingPage productListingPage = homePage.openCategoryAtPosition(1);
        LighthouseUtils.createLightHouseReport("ProductListingPage");

        ...
    }
}
```

{{% warning %}}
Lighthouse cannot analyze modals, fly-ins, hover effects, or similar interactive elements because the page is re-opened in a separate tab for analysis. Any modals manually opened during testing will be closed when a Lighthouse report is generated.
{{% /warning %}}

The generated Lighthouse reports are stored in the project's target directory and attached to the Allure report:

{{< image max-width="60%" src="neodymium/lighthouse_report.png" >}}
The Lighthouse report inside the Allure report.
{{< /image >}}

## Validations

Neodymium allows validation of the scores for the four Lighthouse categories:

1. Performance
2. Accessibility
3. Best Practices
4. Search Engine Optimisation (SEO)

To establish target scores (0 to 1), configure `neodymium.properties`:

```properties
neodymium.lighthouse.assert.thresholdScore.performance=0.5
neodymium.lighthouse.assert.thresholdScore.accessibility=0.5
neodymium.lighthouse.assert.thresholdScore.bestPractices=0.5
neodymium.lighthouse.assert.thresholdScore.seo=0.5
```

Specific audits can also be validated by listing them:

```properties
neodymium.lighthouse.assert.audits=link-text uses-http2 robots-txt
```
