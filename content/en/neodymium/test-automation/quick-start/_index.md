---
title: "Quick Start"
toc: true

weight: 10
type: docs

description: >
  A full tutorial in several steps
---

{{< TODO >}}short info box after each chapter with the most important stuff learned in each?{{< /TODO >}}<br>

{{< TODO >}}test everything with the updated posters version with localization when it is online and update the
necessary things{{<
/TODO >}}<br>

{{< TODO >}}take the screenshots again to have them all in the same size{{< /TODO >}}

## Your first testcase

This guide provides instructions on how to utilize Neodymium from the beginning or integrate it into an existing
project. To expedite setup, you can use
the [neodymium-template project](https://github.com/Xceptance/neodymium-template), which includes the necessary
dependencies, configuration files, and a basic test utilizing the Page Object Model pattern. Additionally, cucumber is
included but can be easily removed if not required.

Throughout this guides basic tests for the Xceptance Poster Demo Store will be created. Instead of setting up the store
locally, the [hosted online version](https://posters.xceptance.io:8443/) is used.

{{< TODO >}}add link to posters repo or wiki or both?{{< /TODO >}}

### Adding Neodymium

To add Neodymium to your project, you need to add the following dependency to the `pom.xml`.

```
<dependencies>
    <dependency>
        <groupId>com.xceptance</groupId>
        <artifactId>neodymium-library</artifactId>
        <version>5.2.0</version>
    </dependency>
</dependencies>
```

Once this dependency is included, you can begin writing Neodymium tests. To leverage all advanced Neodymium
functionalities and produce rich reports, Allure integration is strongly encouraged. Incorporate the following lines
into your project's `pom.xml` to configure Allure.

```
<build>
    <plugins>
        <plugin>
            <groupId>io.qameta.allure</groupId>
            <artifactId>allure-maven</artifactId>
            <version>2.12.0</version>
            <configuration>
                <reportVersion>2.27.0</reportVersion>
                <resultsDirectory>${project.basedir}/allure-results</resultsDirectory>
            </configuration>
        </plugin>
    </plugins>
</build>
```

{{% warning notitle %}}
**Attention:** The Allure results will be collected into the project base directory and are not removed by `mvn clean`.
For complete Allure functionality, and to streamline results management by moving them, Surefire is required. When
adding Surefire, the Allure results directory needs to be updated to the one specified by Surefire. In
the [Test Structure](#test-structure) section, the pom will be extended and a complete example of a pom can be found
in the [neodymium-template project](https://github.com/Xceptance/neodymium-template).
{{% /warning %}}

### Example Test

This example showcases a fundamental Neodymium test. It illustrates how to open a website, perform actions on it, and
verify the state of elements. The code uses only the essential `@NeodymiumTest` and `@Browser` annotation, demonstrating
the minimal
setup necessary for Neodymium testing.
`@NeodymiumTest` is necessary to execute the test with Neodymium.
`@Browser` assigns the default browser to the test. This is annotation is necessary for all tests using a browser
because otherwise the browser isn't handled by Neodymium causing advanced features, like video recording, to break.

```java
import com.codeborne.selenide.Selenide;
import com.codeborne.selenide.SelenideElement;
import com.xceptance.neodymium.common.browser.Browser;
import com.xceptance.neodymium.junit5.NeodymiumTest;

import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;

@Browser
public class FirstTest
{
    @NeodymiumTest
    public void firstTest()
    {
        // open the test website
        Selenide.open("https://posters.xceptance.io:8443/");

        // interacting with elements and assert states
        // get a single element
        $("#category-picture-0").scrollTo();
        $("#category-picture-0").click();

        // get a collection and select a specific element
        SelenideElement firstProductCard = $$(".product-tile").first();
        String productName = firstProductCard.find(".card-title").getText();
        firstProductCard.find(".card-body a").click();

        // validate the page
        $("#product-detail-form-name").shouldBe(visible);
        $("#product-detail-form-name").shouldHave(text(productName));
    }
}
```

{{< TODO >}}Maybe use the TestDataTest logic simplified without test data and extend it later?{{< /TODO >}}

### Executing Tests

To execute the tests in your IDE, run them as JUnit test.
It is also possible to run them via maven. To do so, the command `mvn clean test` is used. This will execute all tests
in the project. `mvn clean test -Dtest=<NameOfTestClass>` can be used to execute single tests.

{{< TODO >}}or shorter like the following:{{< /TODO >}}

The tests can be executed via:

* IDE as JUnit test
* `mvn clean test` to execute all tests
* `mvn clean test -Dtest=<NameOfTestClass>` to execute specific tests

### Reports

Neodymium generates HTML reports using Allure. These reports offer detailed insights into test execution, including all
test steps, error screenshots, page source HTML, and test-specific data. If configured, the reports also include GIF or
video recordings of each test. To generate a report, simply run `mvn allure:serve`. For detailed information, consult
the Allure documentation and the
provided [example report](https://allure-framework.github.io/allure-demo/10/index.html#).

{{< image max-width="60%" src="neodymium/quickstart/first_test_report.png" >}}
Example report for the example test `FirstTest`.
{{< /image >}}

## Test Structure

This guide focuses on enhancing test project maintainability and code reusability. We achieve this by implementing the
Page Object Model and leveraging Allure's `@Step()` annotations to improve report clarity.

### Page Object Model

The Page Object Model is used to wrap all elements and functionality of a web page into an object. The main goal is to
reduce duplicate code, support reusability and maintainability.

Initially, the test class in the [example](#example-test) contained all element locators and page interactions directly.
To apply the Page Object Model pattern, Page Objects were created for the HomePage, ProductListingPage (PLP), and
ProductDetailPage (PDP), leading to this updated test code.

```java
import com.codeborne.selenide.Selenide;
import com.xceptance.neodymium.common.browser.Browser;
import com.xceptance.neodymium.junit5.NeodymiumTest;
import org.example.pageobjects.HomePage;
import org.example.pageobjects.ProductDetailPage;
import org.example.pageobjects.ProductListingPage;

@Browser
public class FirstTest
{
    @NeodymiumTest
    public void firstTest()
    {
        // open the test website
        Selenide.open("https://posters.xceptance.io:8443/");

        // interacting with elements and assert states
        // navigate to the category page
        HomePage homePage = new HomePage().assertExpectedPage();
        ProductListingPage productListingPage = homePage.openCategoryAtPosition(1);

        // get the first product name and select it
        String productName = productListingPage.getNameOfProductAtPosition(1);
        ProductDetailPage productDetailPage = productListingPage.openProductAtPosition(1);

        // validate the page
        productDetailPage.validateProductName(productName);
    }
}
```

Notice that page elements are no longer accessed directly; instead, Page Object functions are utilized. The `HomePage`
example below demonstrates this. The locator from the `FirstTest` class has been moved to the page and parameterized,
allowing it to open various categories. Additionally, the unique `homePageBanner` element and `assertExpectedPage()`
function were added to ensure the test is on the correct page. Post-validation is beneficial for pinpointing test
failures. However, it should be focused and efficient.

```java
import com.codeborne.selenide.SelenideElement;
import org.example.pageobjects.AbstractPageObject;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;

public class HomePage
{
    private final SelenideElement homePageBanner = $("#intro-text-homepage-banner");

    public HomePage assertExpectedPage()
    {
        homePageBanner.shouldBe(visible);
        return this;
    }

    public ProductListingPage openCategoryAtPosition(int position)
    {
        $("#category-picture-" + (position - 1)).scrollTo().click();
        return new ProductListingPage().assertExpectedPage();
    }
}
```

{{< TODO >}}add further reading to out wiki page and also external pages{{< /TODO >}}

We can further extend the Page Object Model pattern to define shared components found on various pages. The `header`,
which is consistent across all pages, serves as a good example.

```java
import com.codeborne.selenide.SelenideElement;
import org.example.pageobjects.pages.ProductListingPage;
import org.openqa.selenium.Keys;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;

public class Header
{
    private final SelenideElement navigationBar = $("#header-navigation-bar");

    private final SelenideElement searchInput = $("#header-search-text");

    public Header assertComponentAvailable()
    {
        navigationBar.shouldBe(visible);
        return this;
    }

    public ProductListingPage searchForSearchTerm(String searchTerm)
    {
        searchInput.sendKeys(searchTerm);
        searchInput.press(Keys.ENTER);
        return new ProductListingPage().assertExpectedPage();
    }
}
```

We've created an `AbstractPageObject` that all Page Objects extend, allowing us to add the header to all pages without
duplicating code.

```java
import org.example.pageobjects.components.Header;

public class AbstractPageObject
{
    public Header header = new Header();
}
```

### Step Annotations

Integrating Allure's `@Step()` annotations with the Page Object Model enhances test reports. These annotations allow for
descriptive function naming and improved report structure. Simply apply them directly to the functions you want to
document. For example, the `HomePage` from our previous example would be modified as follows.

```java
import io.qameta.allure.Step;
...

public class HomePage
{
    ...

    @Step("assert this is a HomePage")
    public HomePage assertExpectedPage()
    {
        ...
    }

    @Step("open category at position {position}")
    public ProductListingPage openCategoryAtPosition(int position)
    {
        ...
    }
}
```

The flexibility of `@Step()` annotations allows us to parameterize them, enriching the report with more context. In the
`HomePage` example, the `@Step()` annotation of `openCategoryAtPosition()` is parameterized, and the position parameter
is automatically added to the report.

Here's what the `FirstTest` report looks like after integrating the Page Object Model and Allure's `@Step()`
annotations.

{{< image max-width="60%" src="neodymium/quickstart/report_with_steps.png" >}}
Improved report for the example test `FirstTest` with additional `Step` annotations.
{{< /image >}}

To enable all Allure report features, including `@Step()` annotations, the following configuration must be added to the
plugins section of your `pom.xml` file.

```
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>${surefire.version}</version>
    <configuration>
        <forkCount>1</forkCount><!-- parallel test execution -->
        <testFailureIgnore>true</testFailureIgnore>
        <argLine>
            -javaagent:"${settings.localRepository}/org/aspectj/aspectjweaver/${aspectj.version}/aspectjweaver-${aspectj.version}.jar"
        </argLine>
        <systemPropertyVariables>
            <allure.results.directory>${project.build.directory}/allure-results</allure.results.directory>
            <selenide.reports>${project.build.directory}/selenide-results</selenide.reports>
        </systemPropertyVariables>
    </configuration>
    <dependencies>
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
            <version>${aspectj.version}</version>
        </dependency>
    </dependencies>
</plugin>
```

{{% warning notitle %}}
**Attention:** without adding the dependencies above to the `pom.xml`, `@Step()` annotations **won't** work.
{{% /warning %}}

{{< TODO >}}add further reading to out wiki page and also external pages{{< /TODO >}}

## Data Driven Tests

Neodymium provides convenient test data handling, with support for these file formats, prioritized as follows:

* CSV
* JSON
* XML
* Properties

{{% warning notitle %}}
**Attention:** only JSON is currently supported for complex test data with nested objects! Simple key/value pairs can be
used in all formats.
{{% /warning %}}

Neodymium automatically links test data files found in the resource folder with matching paths to the test, making them
accessible. For custom locations, use the `@DataFile("<path/to/file>")` annotation, ensuring you provide the complete
path
from the resource folder, including the file extension.

Neodymium offers various methods for accessing test data. The simplest approach is using
`Neodymium.getData().asString("<key>")`. The `TestData` class, accessed through `Neodymium`, provides `as...("<key>")`
functions for all primitive data types, automatically adding the data to the Allure report.

The test below illustrates searching for a product using data-driven search term.

```java
import com.codeborne.selenide.Selenide;
import com.xceptance.neodymium.common.browser.Browser;
import com.xceptance.neodymium.junit5.NeodymiumTest;
import com.xceptance.neodymium.util.Neodymium;
import org.example.pageobjects.pages.HomePage;
import org.example.pageobjects.pages.ProductDetailPage;
import org.example.pageobjects.pages.ProductListingPage;

@Browser
public class TestDataTest
{
    @NeodymiumTest
    public void testDataTest()
    {
        // get the search term from the test data
        String searchTerm = Neodymium.getData().asString("searchTerm");

        // open the test website
        Selenide.open("https://posters.xceptance.io:8443/");

        HomePage homePage = new HomePage().assertExpectedPage();

        // check that the search is available and search for the search term
        homePage.header.assertComponentAvailable();
        ProductListingPage productListingPage = homePage.header.searchForSearchTerm(searchTerm);

        // open the first product and validate the name
        ProductDetailPage productDetailPage = productListingPage.openProductAtPosition(1);
        productDetailPage.validateProductName(searchTerm);
    }
}
```

A simple JSON file is used to store the test data.

```json
[
  {
    "searchTerm": "bear"
  }
]
```

Instead of direct data access, you can define a Plain Old Java Object (POJO) to represent your test data. By annotating
a POJO attribute in your test class with `@DataItem`, the test data will be automatically parsed into the object. This
method is ideal for complex data structures, as it groups related data into easily accessible objects. Furthermore, you
can use multiple data objects within a single test.

We will now expand the `TestDataTest` to include test data objects.

```java
@Browser
public class TestDataTest
{
    @DataItem
    private SearchData searchData;

    @DataItem
    private Product product;

    @NeodymiumTest
    public void testDataTest()
    {
        // open the test website
        Selenide.open("https://posters.xceptance.io:8443/");

        HomePage homePage = new HomePage().assertExpectedPage();

        // check that the search is available and search for the search term
        homePage.header.assertComponentAvailable();
        ProductListingPage productListingPage = homePage.header.searchForSearchTerm(searchData.getSearchTerm());

        // validate search result count
        productListingPage.validateSearchResultCount(searchData.getExpectedResultCount());

        // open the first product and validate the name
        ProductDetailPage productDetailPage = productListingPage.openProductAtPosition(1);
        productDetailPage.validateProductName(product.getName());
        productDetailPage.validateProduct(product);
    }
}
```

Using test data objects simplifies the handling of complex JSON test data. Therefore, the JSON for this test has also
been extended.

```json
[
  {
    "searchData": {
      "searchTerm": "bear",
      "expectedResultCount": 3
    },
    "product": {
      "name": "Grizzly Bear",
      "price": "$17.00",
      "shortDescription": "Bear looking tired."
    }
  }
]
```

To map the JSON data to Java objects, we need to create POJOs. The `SearchData` class is shown as an example; the
`Product` class will follow a similar structure.

```java
public class SearchData
{
    private String searchTerm;

    private Integer expectedResultCount;

    public String getSearchTerm()
    {
        return searchTerm;
    }

    public Integer getExpectedResultCount()
    {
        return expectedResultCount;
    }

    @Override
    public String toString()
    {
        return "SearchData [searchTerm=" + searchTerm + ", expectedResultCount=" + expectedResultCount + "]";
    }
}
```

Neodymium automatically runs tests for each data set. This can be controlled by using `@SuppressDataSets` and
`@DataSet()`. `@SuppressDataSets` disables test data usage for the annotated function or test class. `@DataSet()` allows
you to specify which data set to use, either by index (e.g., `@DataSet(<index>)`) starting at 1, ID (e.g.,
`@DataSet("<dataSetId>")`), or by selecting random subsets (e.g., `@RandomDataSets(4)` selects 4 random sets).

So let's add another data set to the test data.

```json
[
  {
    ...
  },
  {
    "searchData": {
      "searchTerm": "Swiss Air Airbus A320",
      "expectedResultCount": 1
    },
    "product": {
      "name": "Swiss Air Airbus A320",
      "price": "$12.99",
      "shortDescription": "Beautiful take-off."
    }
  }
]
```

After executing the test with both data sets we get the following report:

{{< image max-width="60%" src="neodymium/quickstart/test_data_report.png" >}}
Report of the data driven test `TestDataTest` with two data sets.
{{< /image >}}

For each data set, the report creates a distinct test method entry within the test class. Each entry includes the data
set number in its title and displays the corresponding test data below the steps.

The `Neodymium.getData().get(<testDataClass.class>)` method can also parse test data into a POJO data object inside a
test.

Package test data allows for sharing common data among tests within the same package and its sub-packages. This data is
defined in a file named `package_testdata` using one of the supported file formats. Utilizing package test data does not
result in multiple test method executions.

## Localization

Neodymium offers localization to enable the reuse of test code across multiple websites and locales. To utilize this
feature, you should change the locale property within the Neodymium configuration to the desired one and create a
`localization.yaml` file, stored in the `config` directory at the project's root, containing key-value pairs for each
locale. Localized text can be retrieved using `Neodymium.localizedText("<key>")`, which returns the value for the
currently configured locale, or `Neodymium.localizedText("<key>", "<locale>")`, which returns the value for a specified
locale. If a key is missing for the requested locale, Neodymium automatically falls back to the default locale's values.
If the key is absent in the default locale as well, an error is thrown. The default locale is `en_US`, but it can be
changed during runtime using `Neodymium.configuration().setProperty("neodymium.locale", <locale>)` or by modifying the
`neodymium.properties` configuration file with `neodymium.locale=<locale>`. Further details on configurations are
provided in the [Configurations](#configurations) chapter later.

{{% note notitle %}}
The `localization.yaml` needs to be located in `./config/localization.yaml`.
{{% /note %}}

We use the following yaml file to extend the `TestDataTest` from the [Data Driven Tests](#data-driven-tests) section.
For this small example, only one label on the homepage and the heading on the product listing page are localized.

```yaml
default:
  webElements:
    hotProductsLabel: "Hot Products"
    searchResultHeading: "Results for your search"
de_DE:
  webElements:
    hotProductsLabel: "Beliebte Produkte"
    searchResultHeading: "Die Ergebnisse ihrer Suche"
```

To validate that labels are correctly localized, the page objects must be updated. This example demonstrates the changes
in the `HomePage` class, with a similar approach for the `ProductListingPage`. The `validateHotProductsLabelText()`
function uses `Neodymium.localizedText("webElements.hotProductsLabel")` to get the appropriate localized label text.

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

The `TestDataTest` remains largely unchanged, with the only additions being the calls
`homePage.validateHotProductsLabelText();` and `productListingPage.validateSearchResultHeadingText();` to validate the
localized labels.

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
        Selenide.open("http://localhost:8080/" + Neodymium.configuration().locale().replace("_", "-"));

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

Beyond the label validations, you'll observe minor changes, specifically the URL in `Selenide.open()` and the fact that
the test now extends `AbstractTest`.

Modifying the URL in `Selenide.open()` ensures the correct site is loaded. Alternative approaches include changing the
locale via the UI after opening a default site, or using a configuration value for the URL, like
`Selenide.open(Neodymium.configuration().url());`.

To maintain a single point of control for locale configuration in a localized project, the `setUpLocaleAndSite()`
function in `AbstractTest` is used. This function, as shown below, sets the locale for the current test run using test
data. If no locale is found in the test data, the locale from the config or the default Neodymium locale, `en_US`, is
used.

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

With localization implemented, the next step involves adding test data for the additional locales and including the
locale information within each data set. As demonstrated below, a locale is specified for the first data set, the second
data set relies on the default Neodymium locale (as no locale is provided), and a completely new data set for German has
been added.

```json
[
  {
    "locale": "en_US",
    "searchData": {
      "searchTerm": "bear",
      "expectedResultCount": 3
    },
    "product": {
      "name": "Grizzly Bear",
      "price": "$17.00",
      "shortDescription": "Bear looking tired"
    }
  },
  {
    "searchData": {
      "searchTerm": "Swiss Air Airbus A320",
      "expectedResultCount": 1
    },
    "product": {
      "name": "Swiss Air Airbus A320",
      "price": "$12.99",
      "shortDescription": "Beautiful take-off."
    }
  },
  {
    "locale": "de_DE",
    "searchData": {
      "searchTerm": "bär",
      "expectedResultCount": 1
    },
    "product": {
      "name": "Grizzlybär",
      "price": "$17.00",
      "shortDescription": "Ein müder Bär lehnt sich auf einen Stein"
    }
  }
]
```

The test report generated after running the tests with the new data clearly shows three separate test executions, each
corresponding to a data set. The report demonstrates successful German label localization in the designated test run,
and the German test data set is included for reference.

{{< image max-width="60%" src="neodymium/quickstart/localized_report.png" >}}
Report of the data driven test `TestDataTest` with localization.
{{< /image >}}

## Multibrowser

Neodymium supports testing across a range of browsers, including Firefox, Chrome, Internet Explorer, Safari, and mobile
devices such as Android, iPhone, and iPad. To configure these browsers, create a `browser.properties` file in the
`config` directory at the project root. All browser configurations must adhere to the naming convention
`browserprofile.<browserId>.<property> = <value>`. A comprehensive overview of configurations is available in the
[configurations](#configurations) section.

In this example chrome and firefox are used with the parameters seen below.

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

{{% note notitle %}}
The `browser.properties` file needs to be located in `./config/browser.properties`.
{{% /note %}}

{{< TODO >}}check if the info boxes are useful and move them to a good position{{< /TODO >}}

{{% note title="most common browser properties" %}}

* `name` - name of the browser in the report - necessary
* `browser` - browser to use e.g. chrome or firefox - necessary
* `browserResolution` - resolution of the browser in format 1200x768, 1200X768 or 1200,768
* `arguments` - optional browser arguments e.g. -ignore-certificate-errors; --remote-allow-origins=*
* `acceptInsecureCertificates` - decides whether the web driver accepts insecure certificate or not
* `headless` - defines if the browser should run in headless mode

```properties
browserprofile.browserId.name=... - name of the browser in the report - necessary
browserprofile.browserId.browser=... - browser to use e.g. chrome or firefox -necessary
browserprofile.browserId.browserResolution=... - resolution of the browser in format 1200x768, 1200X768 or 1200,768
browserprofile.browserId.arguments=... - optional browser arguments e.g. -ignore-certificate-errors; --remote-allow-origins=*
browserprofile.browserId.acceptInsecureCertificates=... - decides whether the web driver accepts insecure certificate or not
browserprofile.browserId.headless=... - defines if the browser should run in headless mode
```

| Property                                              | Description                                                                          |
|-------------------------------------------------------|--------------------------------------------------------------------------------------|
| `browserprofile.browserId.name`                       | name of the browser in the report - necessary                                        |
| `browserprofile.browserId.browser`                    | browser to use e.g. chrome or firefox -necessary                                     |
| `browserprofile.browserId.browserResolution`          | resolution of the browser in format 1200x768, 1200X768 or 1200,768                   |
| `browserprofile.browserId.arguments`                  | optional browser arguments e.g. -ignore-certificate-errors; --remote-allow-origins=* |
| `browserprofile.browserId.acceptInsecureCertificates` | decides whether the web driver accepts insecure certificate or not                   |
| `browserprofile.browserId.headless`                   | defines if the browser should run in headless mode                                   |

{{% /note %}}

To utilize the browsers defined in browser.properties, the `@Browser("<browserId>")` annotation is used. Currently, no
tests are annotated, so the Neodymium default browser is used. To execute all tests with every configured browser,
we annotate the AbstractTest class with `@Browser("<browserId>")` for each browser. Individual test methods within a
class can also be run with different browsers by annotating them with `@Browser("<browserId>")` or all browsers can be
suppressed using `@SuppressBrowsers`.

```java
import com.xceptance.neodymium.common.browser.Browser;
import com.xceptance.neodymium.util.Neodymium;
import org.junit.jupiter.api.BeforeEach;

@Browser
@Browser("Chrome_1200x768")
@Browser("Firefox_1200x768")
public abstract class AbstractTest
{
    ...
}
```

Running all tests now will result in the following report.

{{< image max-width="60%" src="neodymium/quickstart/multibrowser_ide.png" >}}
Multibrowser IDE test run.
{{< /image >}}

{{< image max-width="60%" src="neodymium/quickstart/multibrowser_report.png" >}}
Multibrowser report.
{{< /image >}}

## Configurations

{{< TODO >}}take a look at the tables. maybe create a 'Format' and 'Default Value' col for the data type in every
table?{{< /TODO >}}<br>

Neodymium utilizes various properties files to establish default settings and customize specific behaviors.
The most important configuration files are listed below:

* neodymium.properties
* browser.properties
* credentials.properties
* gif-recording.properties
* video-recording.properties

Neodymium's properties files must reside in the `./config/*.properties` directory at the project root. For test-specific
configurations, `dev-*.properties` files can be used to override or add values. It is crucial to exclude these files
from version control to avoid unintended consequences for CI/CD and commiting secrets. Temporary property files can be
created during test execution using
`ConfigFactory.setProperty(Neodymium.TEMPORARY_CONFIG_FILE_PROPERTY_NAME, "file:" + fileLocation);` within a
`@BeforeAll` or `@Before` method.

The loading order for these properties is as follows:

1. System properties
2. temporary config file
3. `config/dev-neodymium.properties`
4. System environment variables
5. `config/credentials.properties`
6. `config/neodymium.properties`

In cases where a property is found in several files, the value from the file with the highest priority is used.

### Neodymium

The `neodymium.properties` file is the most comprehensive, defining a wide range of properties and behaviors. Due to its
extensive nature, a full explanation is beyond the scope of this tutorial. Please refer to the properties section in the
wiki for a complete guide. Below are listed only the most essential properties from key areas.

{{< TODO >}}link the properties wiki section when it was moved{{< /TODO >}}<br>

#### URL properties

The URL properties manage the test system's URL and provide the ability to limit test automation to approved sites using
an include and exclude list.

| Property                  | Default value | Description                                                                |
|---------------------------|:-------------:|----------------------------------------------------------------------------|
| neodymium.url             | &lt;none&gt;  | URL of the website to test                                                 |
| neodymium.url.protocol    | &lt;none&gt;  | protocol used to access the site                                           |
| neodymium.url.host        | &lt;none&gt;  | host encoded in the URL                                                    |
| neodymium.url.path        |       /       | path on the site that is used as test entry point                          |
| neodymium.url.site        | &lt;none&gt;  | site/channel part of the url                                               |
| neodymium.url.includeList | &lt;none&gt;  | list of URLs that the test is allowed to visit. Separated by whitespaces   |
| neodymium.url.excludeList | &lt;none&gt;  | list of URLs that the test is forbidden to visit. Separated by whitespaces |

When properly configured, `Neodymium.configuration().url()` will return the test system's URL within a test. The URL can
be dynamically built using properties like
`neodymium.url = ${neodymium.url.protocol}://${neodymium.url.host}${neodymium.url.path}`, where other property values
are automatically inserted. Alternatively, you can directly define the URL, such as
`neodymium.url = https://posters.xceptance.io:8443/`.

#### Localization

Listed below are the properties related to localization.

| Property                    | Default value            | Description                                                                   |
|-----------------------------|--------------------------|-------------------------------------------------------------------------------|
| neodymium.locale            | en_US                    | The locale that should be used to lookup translations in localization feature |
| neodymium.localization.file | config/localization.yaml | Path to the YAML formatted file that contains localized data for the site     |

#### Basic authentication properties

These properties are used to define basic authentication credentials.

| Property                     | Description                                           |
|------------------------------|-------------------------------------------------------|
| neodymium.basicauth.username | Username that should be used for basic authentication |
| neodymium.basicauth.password | Password that should be used for basic authentication |

#### Debugging properties

Debugging properties provide insights into Selenide's element searches, facilitating easier identification of test
errors during recording.

| Property                                | Default value | Description                                      |
|-----------------------------------------|---------------|--------------------------------------------------|
| neodymium.debugUtils.highlight          | false         | Highlight elements that are selected by Selenide |
| neodymium.debugUtils.highlight.duration | 100 (ms)      | How long should an element be highlighted        |

#### Selenide properties

These properties allow you to modify Selenide's behavior, such as adjusting the default waiting timeout and controlling
JavaScript usage.

| Property                        | Default value | Description                                          |
|---------------------------------|---------------|------------------------------------------------------|
| neodymium.selenide.timeout      | 3000 (ms)     | How long should Selenide wait to match a condition   |
| neodymium.selenide.fastSetValue | false         | The values of input field will be set via JavaScript |
| neodymium.selenide.clickViaJs   | false         | The clicks will be executed via JavaScript           |

#### Popup Blocker

Neodymium can automatically handle unpredictable pop-ups using its pop-up blocker. Configure this by setting the
`neodymium.popup.customPopUp` property to the close button's selector, such as the following.

```properties
neodymium.popup.customPopUp=#myWindow
```

For predictable pop-ups, manual handling is preferred; the blocker should be reserved for cases where it's essential.

#### Further properties

All remaining aspects of `neodymium.properties` will be covered in the full properties guide, including:

{{< TODO >}}link the properties wiki section when it was moved{{< /TODO >}}<br>

* Neodymium context properties
* JavaScriptUtils properties
* Proxy configuration properties
* Local proxy configuration properties
* Browser behavior configuration

### Browser

Browsers are defined within the `browser.properties` file using the
`browserprofile.<browserId>.<attribute> = <parameter>` format. The `@Browser("<browserId>")` and `@SuppressBrowsers`
annotations are used to determine which tests are executed on which browsers.

| Property                   | Mandatory             | Description                                                                                                                                                                                                                                                                     |
|----------------------------|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name                       | YES                   | more detailed name used for reporting.                                                                                                                                                                                                                                          |
| browser                    | YES                   | test browser (valid values: `iphone`, `ipad`, `android`, `firefox`, `chrome`, `internetexplorer`, `safari`)                                                                                                                                                                     |
| version                    | device emulation only | browser version to use **OR** OS version of an emulated device                                                                                                                                                                                                                  |
| browserResolution          | NO                    | width and height of the browser window in format `1200x900` or `1200X900` or `1200,900`                                                                                                                                                                                         |
| pageLoadStrategy           | NO                    | defines when the web driver will return from a page load<br>valid values: <ul><li>`normal`: (default) call returns when load event was fired</li><li>`eager`:  returns when DOMContentLoaded event was fired</li><li>`none`: returns immediately</li></ul>                      |
| headless                   | NO                    | Boolean property to run in headless mode. Default value is false.<br>**NOTE**: Currently only supported for Firefox and Chrome.                                                                                                                                                 |
| acceptInsecureCertificates | NO                    | Boolean property to accepts insecure certificate or not.                                                                                                                                                                                                                        |
| arguments                  | NO                    | Additional command line arguments for the browser to apply. As you can specify only on 'arguments' property for a browser at a time you need to chain multiple arguments. Multiple arguments are chained by semicolon (";") e.g.: `-window-position=0,0 ; -window-size=400,300` |

You can also specify global browser profile configurations that apply to all browsers. The following properties can be
set globally.

```properties
browserprofile.global.pageLoadStrategy=normal|eager|none
browserprofile.global.headless=true|false
browserprofile.global.acceptInsecureCertificates=true|false
browserprofile.global.browserResolution=1200x900
```

### Credentials

Authentication information, including URLs and credentials for SauceLabs and BrowserStack, is stored in the
`credential.properties` file.

```properties
## Sauce Labs Credentials
browserprofile.testEnvironment.saucelabs.url=https://ondemand.saucelabs.com:443/wd/hub
browserprofile.testEnvironment.saucelabs.username=MyAccount
browserprofile.testEnvironment.saucelabs.password=secret
```

Using these credentials requires defining a browser and setting the corresponding environment. Neodymium will
automatically retrieve and apply the correct credentials.

```properties
browserprofile.FF_1024x768.name=Firefox
browserprofile.FF_1024x768.browser=firefox
browserprofile.FF_1024x768.browserResolution=1024x768
browserprofile.FF_1024x768.testEnvironment=saucelabs
```

### Recording

Recording properties are used to enable test recordings and configure their behavior. Neodymium supports recording in
both GIF and MP4 formats, with corresponding configuration files `config/gif-recording.properties` and
`config/video-recording.properties`.

| Property                                  | Format | Description                                                                                                |
|-------------------------------------------|--------|------------------------------------------------------------------------------------------------------------|
| enableFilming                             | bool   | Enable recording, if false all other recording properties are ignored                                      |
| filmAutomatically                         | bool   | Start recording automatically when browser is opened or recording needs to be started manually in the code |
| deleteRecordingsAfterAddingToAllureReport | bool   | Deletes recording in recording folder after adding to allure report to save space                          |
| appendAllRecordingsToAllureReport         | bool   | Defines whether all recordings are added to the report, For false only failures are added.                 |
| imageQuality                              | double | Defines the value of the desired image quality percentage (value range: 0 &lt; `imageQuality` &le; 1.0)    |

Instead of automatic recording that begins immediately after browser startup, you can initiate test recording manually.
Use `FilmTestExecution.startVideoRecording(String fileName);` to start recording and
`FilmTestExecution.finishVideoFilming(String fileName, boolean testFailed);` to stop it. If `testFailed` is `true`, the
recording is added to the Allure report. Otherwise, it's only added if appendAllRecordingsToAllureReport is set to
`true`.

## Accessibility

Accessibility is vital, ensuring websites are usable by everyone. To address and test accessibility, Neodymium has
integrated Google [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview).

{{% warning notitle %}}
**Attention:** Before using Lighthouse within Neodymium, it must be installed independently. This is accomplished by
running the command:

```shell
npm install -g lighthouse
```

{{% /warning %}}

This code snippet generates a Lighthouse report for the currently loaded page.

```java
LighthouseUtils.createLightHouseReport("<reportName>");
```

This function can be called at any point during a test, as long as a webpage is loaded, even for pages relying on
session-specific data like login status and shopping cart pages. The only exceptions are pages that redirect upon
refresh, such as checkout pages.

As an example, the FirstTest from the [Page Object Model section](#page-object-model) can be modified to generate a
Lighthouse report after each page navigation.

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

        // get the first product name and select it
        String productName = productListingPage.getNameOfProductAtPosition(1);
        ProductDetailPage productDetailPage = productListingPage.openProductAtPosition(1);
        LighthouseUtils.createLightHouseReport("ProductDetailPage");

        // validate the page
        productDetailPage.validateProductName(productName);
    }
}
```

{{% warning notitle %}}
**Attention:** Lighthouse cannot analyze modals, fly-ins, hover effects, or similar interactive elements. This is
because the page is re-opened in a separate tab for analysis. Consequently, any modals manually opened during testing
will be closed when a Lighthouse report is generated.
{{% /warning %}}

The generated Lighthouse reports are stored in the project's target directory. Additionally, these reports are attached
to the Allure report for the corresponding test. The following image shows an example of a Lighthouse report for the
`HomePage`.

{{< image max-width="60%" src="neodymium/quickstart/lighthouse_report.png" >}}
The Lighthouse report inside the Allure report for the `HomePage` of the extended `FirstTest`.
{{< /image >}}

The Lighthouse report includes four key categories:

1. Performance
2. Accessibility
3. Best Practices
4. Search Engine Optimisation (SEO)

Neodymium allows you to validate the scores for these categories and fail tests if they don't meet the defined criteria.
To establish target scores for these validations, configure the `neodymium.properties` file with the following
properties.

```properties
neodymium.lighthouse.assert.thresholdScore.performance=0.5
neodymium.lighthouse.assert.thresholdScore.accessibility=0.5
neodymium.lighthouse.assert.thresholdScore.bestPractices=0.5
neodymium.lighthouse.assert.thresholdScore.seo=0.5
```

Acceptable values range from 0 to 1, with 0.5 as the default. Additionally, specific audits, such as `uses-http2`, can
be asserted by listing them in the property, separated by spaces. Multiple audits can be validated simultaneously.

```properties
neodymium.lighthouse.assert.audits=link-text uses-http2 robots-txt
```

You can find a complete listing of all Lighthouse audits in the Lighthouse section of our wiki.
{{< TODO >}}link lighthouse section{{< /TODO >}}
