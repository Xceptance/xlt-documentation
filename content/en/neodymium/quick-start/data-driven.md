---
title: "Data Driven"
linkTitle: "Data Driven"
weight: 50
type: docs

description: >
  Separate test logic from test data using multiple formats.
---

Neodymium provides convenient test data handling, with support for the following file formats, prioritized in this order:

1. CSV
2. JSON
3. XML
4. Properties

{{% warning %}}
Only JSON is currently supported for complex test data with nested objects! Simple key/value pairs can be used in all formats.
{{% /warning %}}

Neodymium automatically links test data files found in the resource folder with matching paths to the test, making them accessible. For custom locations, use the `@DataFile("<path/to/file>")` annotation, ensuring the complete path from the resource folder, including the file extension, is provided.

## Accessing Data

Neodymium offers various methods for accessing test data. The simplest approach is using `Neodymium.getData().asString("<key>")`. Other primitive data types can be retrieved in the same way.

The test below illustrates searching for a product using a data-driven search term.

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

A simple JSON file is used to store the test data:

```json
[
  {
    "searchTerm": "bear"
  }
]
```

## Data Objects (POJOs)

Instead of direct data access, a Plain Old Java Object (POJO) can be defined to represent the test data. By annotating a POJO attribute in the test class with `@DataItem`, the test data will be automatically parsed into the object. This method is ideal for complex data structures, as it groups related data into easily accessible objects. Furthermore, multiple data objects can be used within a single test.

The `TestDataTest` is now expanded to include test data objects.

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

Using test data objects simplifies the handling of complex JSON test data. Therefore, the JSON for this test has also been extended:

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

To map complex JSON data to Java objects, POJOs must be created. The `SearchData` class is shown as an example; the `Product` class follows a similar structure.

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

## Multiple Data Sets

Neodymium automatically runs tests for each data set defined in your data file. This can be controlled by using `@SuppressDataSets` and `@DataSet()`. More information can be found in the [Test Data]({{< relref "020-test-data" >}}) chapter.

Another data set is added to the test data file:

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

Execution of the test with both data sets results in the following report:

{{< image max-width="60%" src="neodymium/test_data_report.png" >}}
Report of the data driven test `TestDataTest` with two data sets.
{{< /image >}}

For each data set, the report creates a distinct test method entry within the test class. Each entry includes the data set number in its title and displays the corresponding test data below the steps.

## Package Test Data

Package test data allows for sharing common data among tests within the same package and its sub-packages. This data is defined in a file named `package_testdata` using one of the supported file formats. Utilizing package test data does not result in multiple test method executions (it acts as a common pool of data).
