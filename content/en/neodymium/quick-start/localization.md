---
title: "Localization"
linkTitle: "Localization"
weight: 60
type: docs

description: >
  Reuse test code across multiple locales and websites.
---

Neodymium offers localization support to enable the reuse of test code across multiple websites and locales.

## Configuration

To utilize this feature:

1. Set the `neodymium.locale` property within the Neodymium configuration to the desired locale.
2. Create a `localization.yaml` file stored in the `config` directory at the project's root.

{{% note notitle %}}
The `localization.yaml` needs to be located in `./config/localization.yaml`.
{{% /note %}}

This file contains key-value pairs for each locale.

```yaml
default:
  webElements:
    hotProductsLabel: "Hot Products"
    searchResultHeading: "Results for your search"
de_DE:
  webElements:
    hotProductsLabel: "Beliebte Produkte"
    searchResultHeading: "Die Ergebnisse ihrer Suche"
de_AT:
  webElements:
     hotProductsLabel: "Beliebte Produkte"
     searchResultHeading: "Die Ergebnisse ihrer Suche"
```

## Retrieval

Localized text can be retrieved using:

* `Neodymium.localizedText("<key>")`: Returns the value for the currently configured locale.
* `Neodymium.localizedText("<key>", "<locale>")`: Returns the value for a specified locale.

If a key is missing for the requested locale, Neodymium automatically falls back to the `default` locale's values. If the key is absent in the default locale as well, an error is thrown.

The default locale is `en_US`, but it can be changed during runtime using `Neodymium.configuration().setProperty("neodymium.locale", <locale>)` or by modifying the `neodymium.properties` configuration file with `neodymium.locale=<locale>`.

## Example

We can extend the `TestDataTest` from the [Data Driven]({{< relref "data-driven" >}}) section. For this small example, only one label on the homepage and the heading on the product listing page are localized.

To validate that labels are correctly localized, the page objects must be updated. This example demonstrates the changes in the `HomePage` class. The `validateHotProductsLabelText()` function uses `Neodymium.localizedText("webElements.hotProductsLabel")` to get the appropriate localized label text.

```java
import com.xceptance.neodymium.util.Neodymium;

import static com.codeborne.selenide.Condition.text;
...

public class HomePage extends AbstractPageObject
{
    ...

    private final SelenideElement hotProductsLabel = $(".product-display-heading h2");

    ...

    @Step("validate the text of the 'hot products' label")
    public void validateHotProductsLabelText()
    {
        hotProductsLabel.shouldHave(text(Neodymium.localizedText("webElements.hotProductsLabel")));
    }
}
```

The `TestDataTest` update involves adding calls to validate the localized labels and setting up the locale.

```java
@Browser
public class TestDataTest extends AbstractTest
{
    @DataItem
    private SearchData searchData;

    @DataItem
    private Product product;

    @NeodymiumTest
    public void testDataTest()
    {
        // open the test website
        Selenide.open("https://posters.xceptance.io:8443/" + Neodymium.configuration().locale().replace("_", "-"));

        HomePage homePage = new HomePage().assertExpectedPage();
        homePage.validateHotProductsLabelText();

        // check that the search is available and search for the search term
        homePage.header.assertComponentAvailable();
        ProductListingPage productListingPage = homePage.header.searchForSearchTerm(searchData.getSearchTerm());

        // validate search result count
        productListingPage.validateSearchResultCount(searchData.getExpectedResultCount());
        productListingPage.validateSearchResultHeadingText();

        // open the first product and validate the name
        ProductDetailPage productDetailPage = productListingPage.openProductAtPosition(1);
        productDetailPage.validateProductName(product.getName());
        productDetailPage.validateProduct(product);
    }
}
```

To maintain a single point of control for locale configuration in a localized project, we use a `setUpLocaleAndSite()` function in an `AbstractTest` base class. This function sets the locale for the current test run using test data. If no locale is found in the test data, the locale from the config or the default Neodymium locale (`en_US`) is used.

```java
import com.xceptance.neodymium.util.Neodymium;
import org.junit.jupiter.api.BeforeEach;

public abstract class AbstractTest
{
    @BeforeEach
    public void setUpLocaleAndSite()
    {
        // get the locale from the test data
        String locale = Neodymium.getData().getOrDefault("locale", "");

        // and set it if it was provided
        if (!locale.isEmpty())
        {
            Neodymium.configuration().setProperty("neodymium.locale", locale);
        }
    }
}
```

With localization implemented, the next step involves adding test data for the additional locales. As demonstrated below, a locale is specified for the first data set, the second data set relies on the default Neodymium locale (as no locale is provided), and a completely new data set for German has been added.

```json
[
  {
    "locale": "en_US",
    "searchData": {
      "searchTerm": "bear",
      "expectedResultCount": 3
    },
    ...
  },
  {
    "searchData": {
      "searchTerm": "Swiss Air Airbus A320",
      "expectedResultCount": 1
    },
    ...
  },
  {
    "locale": "de_DE",
    "searchData": {
      "searchTerm": "bär",
      "expectedResultCount": 1
    },
    ...
  }
]
```

The test report generated after running the tests with the new data clearly shows three separate test executions, each corresponding to a data set.

{{< image max-width="60%" src="neodymium/localized_report.png" >}}
Report of the data driven test `TestDataTest` with localization.
{{< /image >}}
