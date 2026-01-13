---
title: "Cucumber"

weight: 200
type: docs

description: >
  Everything about BDD in Neodymium using Cucumber.
---

[Cucumber](https://github.com/cucumber/cucumber) is a Behavior-Driven Development (BDD) framework. Currently, Neodymium
only supports Cucumber framework in combination with JUnit4. Please follow these [instructions]({{< relref "../miscellaneous/600-migrate-to-v5.md" >}})
to migrate or set up your Cucumber project with Neodymium 5.

## Introduction

BDD is a technique in agile software development used to achieve close collaboration between the quality assurance and
the business analysis parts of the team. The team focuses on the targets of the stakeholders. The user stories are
written in a natural language that follows a known structure and utilizes certain keywords to provide some kind of API
that can be used by the developers later on to implement the test automation.

Cucumber itself is a popular BDD framework that provides some structural elements to orchestrate the test and
uses [Gherkin](https://docs.cucumber.io/gherkin/reference/), a defined set of keywords to differentiate and organize the
steps.

We prepared a demo project: [Neodymium Cucumber Example](https://github.com/Xceptance/neodymium-cucumber-example) which
gives an idea how Cucumber could be used in a test automation suite. Further information can be obtained directly from
the project.

### Structural Elements:

* **_Feature_** is equivalent to a JUnit test class
* **_Scenario_** is equivalent a JUnit test method
* **_Scenario Outline_** is equivalent a JUnit test method with an attached test data table (Examples see below)
* **_Background_** could be seen as a JUnit `@Before` annotated method to set up the environment for each test method in
  the same way
* **_Examples_** is used to set up test data for a Scenario

### Keywords:

* `Given`: mostly the start of a scenario, but can be used for prerequisites
* `When`: a start to describe the interaction with the page
* `Then`: the keyword to bring up validation phrases
* `And`: is used to chain all kinds of phrases
* `But`: can be used to start and chain any kind of negative phrases

It is good to know that the keywords are just used to build up a more natural language but the implementation itself
doesn't differentiate between. This means you could use the And keyword all the time, and it wouldn't make a difference
for the execution of the script.

### Example

The following example show some basic structure of a test case and demonstrates the usage of the keywords.

```gherkin
Feature: Browse

  Scenario Outline: Browsing the catalog
    Given The browser "<browser>" is open
    And I am on the homepage of the Posters shop

    When I hover over "<categoryName>" and click on "<subCategoryName>"
    Then I want to be on a category page and see the "<subCategoryName>" as headline

    When I click on the product "<productName>"
    Then I want to be on a product detail page and see the "<productName>" as headline

    Examples:
      | browser         | categoryName    | subCategoryName | productName       |
      | Chrome_1024x768 | World of Nature | Animals         | Grizzly Bear      |
      | Chrome_1024x768 | Dining          | Main Dishes     | Tuna Steak        |
      | Chrome_1024x768 | Dining          | Sweets          | Colored Sprinkles |
```

## Browser setup in Cucumber

Neodymium provides a utility class that can be called statically from your Cucumber support (hook) classes. It's
called [WebDriverUtils](https://github.com/Xceptance/neodymium-library/blob/master/src/main/java/com/xceptance/neodymium/util/WebDriverUtils.java)
and provides the functionality to set up and tear down WebDrivers. You can choose between the following two ways to set
up a WebDriver via Neodymium. The tear down will stay the same for both. Please find a hands-on example
here: [DriverHooks.java](https://github.com/Xceptance/neodymium-cucumber-example/blob/master/src/test/java/posters/cucumber/support/DriverHooks.java).

### Setup via the test data

By calling a Cucumber `Given` step and passing the browser profile name via the standard test data mechanism you can
call the Neodymium `WebDriverUtils` class to set up the browser.

{{< TODO >}} check if this works {{< /TODO >}}<br>

```java

@Given("^\"([^\"]*)\" is open$")
public static void setUp(final String browserProfileName)
{
    WebDriverUtils.setUp(browserProfileName);
}
```

The corresponding feature file could look like this. Each row of the example data leads to a WebDriver setup.

```gherkin
@Browse
Feature: Browse

  Scenario Outline: Browsing the catalog
    Given "<browser>" is open
    And homepage is loaded
    When I choose main category "<categoryName>" and sub category "<subCategoryName>"
    Then I see category page with "<subCategoryName>" headline

    Examples:
      | browser         | categoryName    | subCategoryName |
      | Chrome_1024x768 | Transportation  | Air Travel      |
      | Chrome_1024x768 | World of Nature | Animals         |
      | FF_1024x768     | Dining          | Main Dishes     |
      | FF_1024x768     | Dining          | Sweets          |
```

Please see the following example for more hand on
experience: [Browse.feature](https://github.com/Xceptance/neodymium-cucumber-example/blob/master/src/test/java/posters/cucumber/features/Browse.feature)

### Setup via tagging a scenario with the browser profile name

If you don't need or want the extra step, you can create a general before hook that does the browser setup if it detects
a configured browser profile name within the tags of the scenario. Beware that tagging a test execution with more than
one browser profile name will lead to an exception, since it can't be decided which was meant to run.

```java

@Before()
public static void setUp(Scenario scenario)
{
    Driver.setUpWithBrowserTag(scenario);
}
```

The corresponding feature file could look like this. Each row of the example data leads to a WebDriver setup.

```gherkin
@Search
Feature: Searching for products

  Scenario Outline: Searching for existing products
    Given homepage is loaded
    When I search for "<searchTerm>"
    Then I see category page
    And result page contains searchterm "<searchTerm>" and shows "<expectedCount>" products
    And product "<productName>" is visible

    @Chrome_1024x768
    Examples:
      | searchTerm | expectedCount | productName  |
      | bear       | 3             | Grizzly Bear |

    @FF_1024x768
    Examples:
      | searchTerm | expectedCount | productName                 |
      | bee        | 9             | Indian Summer: Orange Beech |
```

Please see the following example for more hands-on
experience: [Search.feature](https://github.com/Xceptance/neodymium-cucumber-example/blob/master/src/test/java/posters/cucumber/features/Search.feature)

{{% note notitle %}}
**NOTE:** Since we demonstrate both ways of setting up the WebDriver in the same demo project we had to add a special
tag to the hook and the test case to avoid interferences. Probably you won't need this in your project.
{{% /note %}}

### Tear down

To tear down the WebDriver you just need to add a general hook.

{{% note notitle %}}
**NOTE:** Cucumber hooks allow you to specify an `order` to control the execution sequence:

* **`@Before`** hooks are executed in **ascending** order (e.g., 0, 1, 2...).
* **`@After`** hooks are executed in **descending** order (e.g., 2, 1, 0...).
  {{% /note %}}

Because `@After` hooks run in reverse (descending) order, a **lower** order number means it will be executed **later**.
By providing an order number below 10000 (which is often used as a baseline or default in many frameworks), you ensure
that the browser teardown is one of the last actions performed. You should choose an order number for the browser
teardown that is sufficiently low (e.g., 100) to ensure it runs after any browser-dependent hooks, such as taking
screenshots on failure. However, you can still perform final cleanup tasks that do not rely on the browser — such as
clearing a database — by assigning those hooks an even lower order number (e.g., 10) so they execute after the browser
has successfully closed.

```java
@After(order = 100)
public void tearDown(Scenario scenario)
{
    Driver.tearDown(scenario);
}
```

## Clean up steps in Cucumber

Sometimes test cases need a special setup on execution. In a perfect test world you could just start your test with a
new prepared environment but since this can't be realized in every case you need to clean up after the test execution.
Cucumber supports hooks to add an `After` step after a scenario, but you can't share data between different steps
without further programming. We present an easy solution to the problem below.

### How to use dependency injection to share data between the Cucumber steps

We demonstrate how to share data between steps
using [Cucumber PicoContainer](https://github.com/cucumber/cucumber-jvm/tree/main/cucumber-picocontainer). This
technique is used to implement clean up steps
for [Register.feature](https://github.com/Xceptance/neodymium-cucumber-example/blob/master/src/test/java/posters/cucumber/features/Register.feature).

In Neodymium version 3.3.0 we moved the PicoContainer dependency into the library to avoid incompatibilities in child
projects when we update the Cucumber version.

1. Implement a global storage object that can hold the data that is supposed to be shared. Please
   see [GlobalStorage.java](https://github.com/Xceptance/neodymium-cucumber-example/blob/master/src/test/java/posters/cucumber/support/GlobalStorage.java)
   example.
    * This should ideally be a [POJO](https://en.wikipedia.org/wiki/Plain_old_Java_object) that just holds data fields
      that can be other POJOs.
2. Use dependency injection to initialize a GlobalStorage object within the class that will use it. Please check the
   following file for a hands-on
   example [RegisterSupport.java](https://github.com/Xceptance/neodymium-cucumber-example/blob/master/src/test/java/posters/cucumber/support/RegisterSupport.java).

   ```Java
   private GlobalStorage storage;
   
   public RegisterSupport(GlobalStorage storage)
   {
       // The storage is passed via dependency injection
       this.storage = storage;
   }
   ```

3. Now you can set the GlobalStorage with the passed data from the scenario.

   ```Java
   @Given("^user setup: \"([^\"]*)\", \"([^\"]*)\", \"([^\"]*)\", \"([^\"]*)\"$")
   public void setUpUser(String firstName, String lastName, String eMail, String password)
   {
       // set up user for the cleanup steps
       storage.user = new User(firstName, lastName, eMail, password);
   }
   ```

4. Afterwards you can use the data in every step that has a need for it.

   ```Java
   @Given("^login page is opened after registration$")
   public void registerUserSetup()
   {
       // use the user coming from dependency injection
       registerUser(storage.user);
   }
   ```

Don't forget to delete the test data after the test. Here the user must be deleted. To do this, mark the needed scenario
with `@DeleteUserAfterwards` and annotate the function implementing this with the same tag using a Cucumber `After`
annotation.
See [RegisterSupport.java](https://github.com/Xceptance/neodymium-cucumber-example/blob/master/src/test/java/posters/cucumber/support/RegisterSupport.java)
class for a hands-on example. For demonstration purpose, here is a snippet of the class.

```gherkin
Feature: Register
  Description: Show case clean up steps implementation using dependency injection for passing data between steps

  @DeleteUserAfterwards
  Scenario Outline: Register a new customer
    Given "<browser>" is open
    And register page is loaded
    And I'm not logged in
    When I register a new user with "<firstName>", "<lastName>", "<email>", "<password>"
    Then register was successful
    And login page is opened

    @Chrome
    Examples:
      | browser         | firstName | lastName | email        | password  |
      | Chrome_1024x768 | Jane      | Doe      | jane@doe.com | topsecret |
```
