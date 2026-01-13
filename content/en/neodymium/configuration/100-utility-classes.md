---
title: "Utility classes"

weight: 100
type: docs

description: >
  Everything about the custom classes extending Selenide and Allure. Also covering the TestData handling class and Cucumber WebDriverUtils. 
---

{{< TODO >}} fix the code formatting when done {{< /TODO >}}<br>

We added several utility classes in order to address problems that most test automation project face.
We won't cover every function at this place, but we want to bring the classes to your awareness in order to have a look
if the needed functionality is already implemented.
If you encounter other things that should be supported by Neodymium don't hesitate to get in contact with us.

## SelenideAddons

The [SelenideAddons](https://github.com/Xceptance/neodymium-library/blob/master/src/main/java/com/xceptance/neodymium/util/SelenideAddons.java)
class contains several methods that we think are missing in the Selenide API. We provide new Conditions or shortcuts to
functions that are hard to use if you don't have deeper knowledge of Selenide.

### Regex Matching Attributes

We extended Selenide with regex to match values and attributes.

```java
  // validate that the value attribute contains non digit characters using a regex
$("#search-container .search-field").

should(SelenideAddons.matchValue("\\D+"));
```

### StaleElementReferenceException Handling

In case of elements that tend to cause `StaleElementReferenceException` `$safe(final Runnable code)` can be used to
catch them and perform retries.

```java
  // use the following function to execute a whole code block that results in a StaleElementReferenceException from time to time 
// it will result in an automatic retry in case of error
  SelenideAddons.$safe(() ->{

$("selectorOne").

find("selectorTwo").

shouldBe(visible);
  });

// or also with returning value
SelenideElement someElement = SelenideAddons.$safe(() -> {
    return $("selectorOne").find("selectorTwo").shouldBe(visible);
});
```

### Slider Handling

Drag and drop webpage sliders until a given condition. Use the following function to execute linear 2d movements. The
code example shows the basic function to execute a slider movement. The amount of retries and the time to wait between
the movements can be set by the user.

```java
  SelenideAddons.dragAndDropUntilCondition((SelenideElement) elementToMove,
                                           (SelenideElement)elementToCheck,
    (int)horizontalMovement,
    (int)verticalMovement,
    (int)pauseBetweenMovements,
    (int)retryMovements,
    (Condition)condition));
```

If needed the user can add more special functions based on the basic function. The code example shows a horizontal
movement until a given text.

```java
  private void leftHorizontalDragAndDropUntilText((SelenideElement) elementToMove,
                                                  (SelenideElement)elementToCheck,
    (int)horizontalMovement,
    (String)sliderValueAttributeName,
    (String)moveUntil)
    {
    SelenideAddons.

dragAndDropUntilCondition(elementToMove,
                          elementToCheck,
                          horizontalMovement, 
                                             0,3000,10,
                          Condition.attribute(sliderValueAttributeName,
                          moveUntil));
    }
```

If there is no possible condition to validate the interaction, or it is not needed for some reason you can use the
following function. E.g. unlocking something with a simple slide interaction.

```java
  SelenideAddons.dragAndDrop((SelenideElement) elementToMove, (int)horizontalMovement,(int)verticalMovement);
```

### Opening HTML snippets

Sometimes it comes handy to open an HTML snippet within the current browser and perform interactions or validations upon
it e.g. if you validate emails.

```java
  String htmlSnippet = "<div dir=\"auto\">Hi<div dir=\"auto\"><br></div><div dir=\"auto\">How are you?)</div><div dir=\"auto\"><br></div><div dir=\"auto\">Bye</div></div>";
  SelenideAddons.

openHtmlContentWithCurrentWebDriver(htmlSnippet);
```

### optionalWaitConditions

Sometimes it is necessary to wait for an optional element matching a condition without throwing an exception if the
condition didn't apply during the expected time. These functions will return false if the element does not match the
given condition or can not be found in the given time.

#### optionalWaitUntilCondition

Waits until an optional element matches a condition without throwing an exception if the element does not exist.

```java
  // wait until the optional condition matches
boolean var = SelenideAddons.optionalWaitUntilCondition($( < selector >), <condition>,CUSTOM_MAX_WAITING_TIME);
```

#### optionalWaitWhileCondition

Waits while an optional element matches a condition without throwing an exception if the element does not exist.

```java
 // wait until the optional condition does not match anymore
boolean var = SelenideAddons.optionalWaitWhileCondition($( < selector >), <condition>);
```

## AllureAddons

The [AllureAddons](https://github.com/Xceptance/neodymium-library/blob/master/src/main/java/com/xceptance/neodymium/util/AllureAddons.java)
class contains methods that help you to pass information of your choice to the report.

To create a new step without defining an extra function
`AllureAddons.step(final String description, final Runnable actions)` can be used:

```java
// wrap an action otherwise you would need to create an extra function and annotate it using @Step 
AllureAddons.step("Need to see this description in the report",() ->{

// Some actions
$("#masthead .search-toggle").

click();
});
```

`AllureAddons.addToReport(String info, Object content)` is helpful if you want to add information without performing an
action. Here the info is logged directly in the step and the content attached to it.

Sometimes it is useful to add links, to do so `AllureAddons.addLinkToReport(String message, String url)` can be used.

`AllureAddons.attachPNG(final String filename)` enables you to create a screenshot of the current page at any point and
attach it to the report.

For complex data `AllureAddons.addDataAsJsonToReport(String name, Object data)` can be used to attach the given JSON
data to the current test case.

`AllureAddons.addAttachmentToStep(final String name, final String type, final String fileExtension, final InputStream
stream)` enables you to add an attachment to the current step, while
`AllureAddons.removeAttachmentFromStepByName(final String name)` makes it possible to remove the attachment with the
given name from the report.

## JavaScriptUtils

The [JavaScriptUtils](https://github.com/Xceptance/neodymium-library/blob/master/src/main/java/com/xceptance/neodymium/util/JavaScriptUtils.java)
class contains methods that help you to validate the state/readiness of a webpage via JavaScript.

```java
// This method waits for three events when configured (jQuery is active, DOM is loaded, the loading animation is gone)
// Especially waiting that the loading animation is gone prevent you from using timeout mechanisms and slowing down your test automation
JavaScriptUtils.waitForReady();

// Some actions that require a fully loaded website
$("#masthead .search-toggle").

click();
```

Furthermore, it contains the method `injectJavascriptPopupBlocker` which will inject a script to automatically block the
popups defined in the `neodymium.properties`. It will actually be called automatically by Neodymium.

## TestData

The [
`TestData`](https://github.com/Xceptance/neodymium/blob/master/src/main/java/com/xceptance/neodymium/common/testdata/TestData.java)
class contains methods to handle your test data easily.

To access the test data you can use `Neodymium.getData().get(key)` to read the value from the map directly or use the
conversion methods provided by the `TestData` class for some basic types (boolean, double, float, int, long, String). We
provide two methods for each type. The first one is `as<Type>(String key)` which raises an `IllegalArgumentException` if
the data field can't be found. The second method is `as<Type>(String key, <Type> default)` which returns the given
default value if the data field can't be found. If you need to check if a certain key exists you can use
`exists(String key)`.

Furthermore, we provide a function that can instantiate POJO models via reflection. Please see the following example to
understand how to use it. Please visit also our [Test data provider]({{< relref "020-test-data" >}}) wiki page for more
examples on this.

<h4>Example</h4>

Create a plain old java object (POJO) that contains all fields you need.

```java
// the date pojo you want to use
public class TestPojo
{
    private String field;

    private String otherField;

    public String getField()
    {
        return field;
    }

    public void setField(String field)
    {
        this.field = field;
    }

    public String getOtherField()
    {
        return otherField;
    }

    public void setOtherField(String otherField)
    {
        this.otherField = otherField;
    }
}
```

Set up your test data so that you have all values that you're going to need.
If you don't need a field for a certain test case leave it out it will result in a `null` for this field.

```json
[
  {
    "field": "value1",
    "otherField": "otherValue2",
    "willIgnoreThis": "whenInstantiatingThePojo"
  }
]
```

Use the `Neodymium.getData().get()` method to instantiate the Pojo (Plain Old Java Object). This can also be done in a
`@Before` annotated method to achieve a better code separation.

```java
// the test class instantiating the pojo
@RunWith(NeodymiumRunner.class)
public class SomeTest
{
    @Test
    public void test()
    {
        // instantiate the pojo
        TestPojo pojo = Neodymium.getData().get(TestPojo.class);
        // use the pojo
        doSomething(pojo);

        // get a data value parsed to the specific type 
        String field = Neodymium.getData().asString("field");
        // use the String
        doSomething(field);
    }
}
```

it is also possible to create attributes, in which Neodymium will automatically insert the given values using the
`@DataItem` annotation. Providing a path to a specific value of the JSON inside the annotation will extract the value
with that path into a variable.

```java
// the test class instantiating the pojo
@RunWith(NeodymiumRunner.class)
public class SomeTest
{
    @DataItem
    TestPojo pojo;

    @DataItem("$.field")
    String field;

    @Test
    public void test()
    {
        // use the pojo
        doSomething(pojo);

        // use the String
        doSomething(field);
    }
}
```

## WebDriverUtils

{{< TODO >}} update cucumber link when page exists {{< /TODO >}}<br>

The [WebDriverUtils](https://github.com/Xceptance/neodymium-library/blob/master/src/main/java/com/xceptance/neodymium/util/WebDriverUtils.java)
class contains functions that need to/can be referenced within the project if you want to use Cucumber with Neodymium.
Please find more on this topic and how to use it in our [Cucumber]({{< relref "200-cucumber" >}}) documentation.
