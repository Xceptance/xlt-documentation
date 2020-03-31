---
title: "Test Suites"

weight: 450
type: docs

description: >
  XLT uses the concept of a test suite to make test projects more easily manageable.
---

## Overview

XLT uses the concept of a test suite to make test projects more easily manageable. A test suite builds as its own project; it holds all code, data and config necessary for testing and is therefore perfect for sharing and perfect for version control. You can use a test suite as a standalone project and run the tests locally for regression testing, or the test suite can be referenced by an XLT execution engine to run a load test - tests and test environment are separated. 

## Basic Directory Structure
The directory of any [sample test suite](../../test-suites/), and also of your own test suite, should look similar to this:

```txt
    test-suite
    ├── config
    │   └── data
    ├── lib
    ├── src
    ├── classes
    └── results
```
* **config** contains all [test settings](../480-test-suite-configuration) files. The only file that is mandatory is `log4j.properties`, but usually there will be several property files containing test settings. XLT will look for all properties in this directory by default, but the location may be overridden by the system property `com.xceptance.xlt.configDir` and, alternatively, the environment variable `XLT_CONFIG_DIR`, which both allow to specify the configuration directory to use (system property takes precedence; the directory location is required to be within the test suite in any case). 
	* test data lives in **data** - this is the default location for data files that are used by the DataProvider classes, but it can be overridden by the property `com.xceptance.xlt.data.directory`.
* **lib** contains custom jars if needed. Make sure that everything you need is part of your suite - what is not in your suite is not uploaded, and neither the MC nor the AC run any dependency checks. If a Maven setup is used, make sure all libs are pulled into this folder of your suite during the build process. (XLT will also find libraries in `<test-suite>/target/dependency`.)
* **src** contains the Java source code aka the JUnit tests cases. The location of these files inside your testsuite is basically up to you and might depend on the used build tool. Read on below to learn more about recommended code structure.
* **classes** contains compiled Java classes. The name and location might be dependent on the used build tool - XLT supports several locations: `./classes`, `./bin`, `./target/classes` or `./target/test-classes`.
* **results** is a container for XLT to write all results data (logs, measurements, result browsers) into. The default location is `./results`, but this may be overridden by the property `com.xceptance.xlt.result-dir` (location is required to be within the test suite). 

## Code Structuring Recommendations

As your XLT test suites live in your favorite Java IDE, you will have the same options to structure your code as in any other Java program or software development project. Feel free to extract sequences of your test case code to methods, to create Java classes, or to use packages to structure your test suite.

### Package Suggestions

The `<testsuite>/src` directory contains subdirectories with the structure of your Java packages in the standard manner. Your source code should be organized in main packages. Typically, one individual package should be created for test cases, for actions, for flows, for validators, and for utility classes. The resulting directory structure might look like this:

* [`<testsuite>/src/.../actions`](#action)
* `<testsuite>/src/.../flow`
* `<testsuite>/src/.../util`
* `<testsuite>/src/.../validators`
* `<testsuite>/src/.../tests`

Additionally, there are XLT-specific framework conditions for structuring your test suite and test cases. In particular, each test case is necessarily implemented as a Java class extending an XLT test case class, which is approach-specific and contains one method annotated with `@Test`. See the following sections for such specific framework conditions and further ways of structuring.

### Naming and Tags

The easiest way for you to structure your test suite is to name the test cases according to a common naming convention. It's common to start the name with a capitalized _T_ and  continue with the so-called "camel-case" where each element's initial letter is capitalized within the compound word. A best-practice example is to specify the test case's purpose by compounding single elements, for instance _TCartCheckoutCancel_, _TCartOrder_, and so on.

## Test Suite Concepts

You might have read about the [concepts](../030-concepts) underlying XLT test cases. In short, a test scenario is modeled as a JUnit [test case](#test-case). A single execution of this test case is a transaction. For example, _Search_ and _ViewProductDetails_ are [actions](#action) in this [example](../030-concepts#example) to go from one page to the next. The actions may be collected in a [flow](#flow) for easier reusability in other test cases. [Validations](#validation) after each page transition ensure you arrived on the right page with the right content. 

### Test Case

**XLT Test Cases are JUnit4 Tests.** XLT test cases use a Java test case class with one `test()` method, regardless of the chosen approach for test writing.

The `test()` method of each test case class has a `@Test` annotation. XLT builds upon JUnit4 principles and its annotations to implement and tag test cases. This way, each XLT test is in fact a JUnit test enabling XLT tests to be executed just like any other unit test in the IDE or within an existing build process. The sole difference between XLT and standard JUnit4 tests is that XLT tests can only take one active test method per test class. That means that, although there can be an arbitrary number of methods within a class, only one method is permitted to be annotated with `@Test` (the name of that method does not necessarily need to be `test()`). However, this limitation rather serves the purpose of simplification than leading to actual restrictions.

Implementing the test case as a JUnit4 test also lets you use standard JUnit assertion to validate the page, mainly when you create test cases using the HtmlUnit API. All test case classes should inherit the abstract class `AbstractTestCase` which supplies some basic features, like logging the test results to disk and easy access to properties.

### Action

As a test case models a transaction and as transactions rely on actions, defining the appropriate actions is the first step. An action interacts with the current page and, as a result, loads the next page. The latter is associated with this action and becomes the current page for the next action in the test case. These XLT action classes can be seen as reusable building blocks to write your test case and define the page flow.

All actions must inherit the abstract class `AbstractAction` or `AbstractHtmlPageAction`. Note that `AbstractAction` doesn't offer any web support. Therefore, any web-based test should inherit the abstract class `AbstractHtmlPageAction`, which is a specialization of `AbstractAction` and which does offer support for web testing. 

This forces you to implement the three methods `execute()`, `preValidate()`, and `postValidate()`. As mentioned earlier, the `preValidate()` and `postValidate()` methods perform validations before and after the execution of that action itself. Therefore, the call sequence of an action generated by the XLT framework is always:
1. `preValidate()`
1. `execute()`
1. `postValidate()`

This call sequence will be executed exactly once when the instance method `run()` of an action is called.

Note that the XLT Action API forces you to implement the validation methods and that is the whole purpose of testing: validating data. Therefore, implementing the abstract validation methods in a non-trivial way (that is not leaving them empty) is strongly recommended. Otherwise, you will sacrifice test quality.

Each of the three methods may throw an exception which always indicates a problem. To check if an action can be executed safely, the abstract class `AbstractAction` provides a method called `preValidateSafe()`. This method internally calls `preValidate()` and catches any thrown exception. If no exception is thrown, `preValidateSafe()` returns true; otherwise it returns false. This helps you determine if the prerequisites are fulfilled to continue the page flow in a certain direction. A simple example is the flow through a catalog with nested categories. As you don't know the nesting level up-front when you create a dynamic and random test, it might be necessary to call `preValidateSafe()` before trying to go to the next level of categories.

Note that `AbstractAction` doesn't offer any web support. Therefore, any web-based test should inherit the abstract class `AbstractHtmlPageAction`, which is a specialization of `AbstractAction` and which does offer support for web testing.

### Flow

When creating XLT test cases, you sometimes might want to reuse blocks of code containing more than one single action. Just like for modules, you can create your own class with one method that combines a sequence of several XLT actions as a flow. Different test cases can call this method now to reuse the flow. This is a concept for code structuring you can implement if needed.

### Validation

#### Assertion

JUnit provides the concept of assertions and XLT uses this concept for all validations. Since XLT doesn't change JUnit in any way, you can use assertions just as you're used from JUnit.

#### Pre-validation

XLT offers two ways of using the `preValidate()` method. Any exception on the direct path stops the test with an error message. In case you just want to check whether or not a requirement is fulfilled, you can call the `preValidate` in a safe way (by using `preValidateSafe()`) so that any exception is caught and no error is reported. Should you accidentally cause a Java exception different to `AssertionException`, such as `NullPointerException` or `IndexOutOfBoundException`, XLT issues a warning because the code might contain a problem from a programming point of view. Errors from the application under test should always come up as assertion failures.

#### Post-validation

The `postValidate()` method works similarly to `preValidate()`. It is used to validate the page just loaded in `execute()` and ensures that the data matches the expectations. The full set of JUnit assertions is available.

You can't explicitly call the `postValidate()` method; the framework does so instead. Additionally, error messages can't be suppressed. If a page has different outcomes based on random data or states, you have to explicitly handle that in your validation code.

#### Validators

We strongly encourage you to write individual validation classes for easy reuse. As soon as a certain check has to be done more than once, it is suited for a validator implementation. This simplifies the maintenance of tests and makes them less error-prone because copy-paste causes typical programming errors.

Some common validation routines are already covered by default validators, such as a HTTP response code, HTML end tag, and HTTP content length validation. See package `com.xceptance.xlt.api.validators` in the API documentation for more information on this topic.

### Example

Let's imagine a poster search test case again to illustrate the XLT Action API. The most important action would be to "search", that is to fill in the search phrase and then click "Go", "Search", or something similar that loads a list of results. The preconditions are the existence of a search input field and of an appropriate button labeled *Search* or *Go*. The `execute()` method should fill in the search phrase and click the button.

After the new page has been loaded, the result should be validated. This validation consists of general validation, performed by validators, and action-specific validation.

The resulting implementation of the search action would then look like this:

```java
/**
 * Enter the given search phrase in the site's search bar and submit the form.
 */
public class Search extends AbstractHtmlPageAction
{
    /**
     * Search phrase.
     */
    private final String phrase;

    /**
     * Search form.
     */
    private HtmlForm searchForm;

    /**
     * Search option ({`link SearchOption#HITS} or {`link SearchOption#NO_HITS} ).
     */
    private final SearchOption searchOption;

    /**
     * Constructor
     *
     * @param previousAction
     *            The previously performed action
     * @param phrase
     *            The search phrase
     * @param option
     *            The search option that defines if we expect a hit or a no-hit
     */
    public Search(final AbstractHtmlPageAction previousAction,
                  final String phrase,
                  final SearchOption option)
    {
        super(previousAction, null);
        this.phrase = phrase;
        searchOption = option;
    }

    /**
     * Validation prior to execution.
     * @throws Exception
     *             if some of the required input elements couldn't be found.
     */
    @Override
    public void preValidate() throws Exception
    {
        // Get the current page.
        final HtmlPage page = getPreviousAction().getHtmlPage();
        Assert.assertNotNull("Failed to get page from previous action.", page);

        // Check that the search form is available
        Assert.assertTrue("Search form not found.", HtmlPageUtils.isElementPresent(page, "id('search')"));

        // Remember the search form
        searchForm = HtmlPageUtils.findSingleHtmlElementByID(page, "search");
    }

    /**
     * Executes the search. Primarily this includes the input of the search
     * phrase and a click on the proper search button.
     * @throws Exception
     *             if some of the inputs have become invalid or setting the
     *             value attribute of the search input field has failed.
     */
    @Override
    protected void execute() throws Exception
    {
        // Fill the search form with the given phrase
        HtmlPageUtils.setInputValue(searchForm, "searchText", phrase);

        // Submit the search
        loadPageByFormSubmit(searchForm);
    }

    /**
     * Validation after search has become complete.
     * @throws Exception
     *             if no search result block element could be found
     */
    @Override
    protected void postValidate() throws Exception
    {
        // Get the result of the action
        final HtmlPage page = getHtmlPage();

        // Basic checks - see action 'Homepage' for some more details how and when to use these validators
        HttpResponseCodeValidator.getInstance().validate(page);
        ContentLengthValidator.getInstance().validate(page);
        HtmlEndTagValidator.getInstance().validate(page);

        HeaderValidator.getInstance().validate(page);

        // Check that the desired option result was achieved.
        switch (searchOption)
        {
            case HITS:
                Assert.assertNotNull("Expected at least one hit for '" + phrase + "'.",
                                     HtmlPageUtils.findSingleHtmlElementByID(page, "productOverview"));
                break;

            case NO_HITS:
                Assert.assertFalse("Search phrase '" + phrase + "' should result in no hits.",
                                   HtmlPageUtils.isElementPresent(page, "productOverview"));
                break;

            default:
                Assert.fail("Unknown search option.");
                break;
        }
    }
}
```

Note that the constructor of this class has two parameters. One of them is the search phrase the action has to know about. The other parameter is the previously performed action. To enable a flow, all the actions that will be used in page flows need to provide a constructor with a parameter representing the previous action. Without passing the previous action, each action would be stand-alone and behave as if you had just opened a new web browser. Normally, only the start action does so.

You'll notice that the `postValidate()` method uses some of the predefined validators. XLT also offers a `StandardValidator` performing the most common validations in one go. This includes:
* HTTP response code validation,
* HTML end tag validation,
* content length validation, and
* XHTML validation.

Having the search action at hand, the implementation of a test case using this action is almost done. A very simple test case would be a repeated search for some phrases. These phrases can be stored in a data file and obtained using the XLT data provider mechanism:

```java
public class TSearch extends AbstractTestCase
{
    // Container that holds all the search phrases
    private static DataProvider phrases = null;

    @Before
    public void initialize() throws Exception
    {
        // Data container already initialized?
        if(phrases != null) return;
        // No. Go for it.
        phrases = DataProvider.getInstance(getProperty("searchphrases.filename", "phrases.txt"));
    }

    @Test
    public void search() throws Throwable
    {
        // Start on Homepage.
        Startpage start = new Startpage();
        start.run();

        for (int i = 0; i < XltRandom.nextInt(10); i++)
        {
            // Take a random search phrase.
            String searchPhrase = phrases.getRandomRow(false);

            // Search.
            Search search = new Search(start,searchPhrase);
            search.run();
        }
    }
}
```

The example above also demonstrates the use of the `XltRandom` class offering some convenient randomization features. See the package `com.xceptance.xlt.api.util` for additional functionality that may help implementing tests.

Each execution of the search action requires an appropriate search phrase obtained from a `DataProvider` object. This class offers a generic mechanism to handle and provide test data that is stored in a text file. The location of the text file is specified as relative path to the directory `<testsuite>/config/data` and passed as parameter to the static method `getInstance()`. When the class is instantiated, all data is kept in memory, allowing easy and fast access. XLT is shipped with a predefined set of data files containing email addresses, first and last names, street and city names, and so on. This data can be acquired from the `GeneralDataProvider` class that uses the appropriate text files located in directory `<testsuite>/config/data` with `<testsuite>` referring to your test project directory.

Last but not least, the present example illustrates how you can use JUnit4 annotations in the standard manner.
