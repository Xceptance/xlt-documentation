---
title: "Allure and Reports"

weight: 150
type: docs

description: >
  Comprehensive Guide to Allure Test Reporting.
---


{{< image max-width="80%" src="neodymium/allure_demo_report_overview.png" >}}
Example Allure report.
{{< /image >}}

[Allure](https://github.com/allure-framework/allure2) is an open-source, flexible, and comprehensive test report tool
that generates rich, interactive HTML reports from test execution results. It provides a Java API that allows you to
define test steps, add parameters, and include attachments like screenshots and page sources to enhance documentation.

For more details, refer to the [Allure documentation](https://docs.qameta.io/allure) and check out
their [demo report](https://demo.qameta.io/allure/).

## Maven Configuration and Setup

Integrating Allure into your project requires configuration in your `pom.xml` to ensure it works with the test execution
lifecycle (handled by the **Maven Surefire Plugin**).

### Allure Maven Plugin

The `allure-maven` plugin defines where the results are stored and which report version to use.

``` 
<build>
    <plugins>
        <plugin>
            <groupId>io.qameta.allure</groupId>
            <artifactId>allure-maven</artifactId>
            <version>2.12.0</version>
            <configuration>
                <reportVersion>2.27.0</reportVersion>
                <resultsDirectory>${project.build.directory}/allure-results</resultsDirectory>
            </configuration>
        </plugin>   
    </plugins>
</build>
```

### Maven Surefire Plugin Integration

Since Allure generates its own test results alongside JUnit results,
the [Maven Surefire Plugin](https://maven.apache.org/surefire/maven-surefire-plugin/) must be configured to integrate
the Allure tool into the test cycle. This often requires the `aspectjweaver` dependency to enable runtime test
modification.

```
<properties>
    <surefire.version>3.2.5</surefire.version>
    <aspectj.version>1.9.21</aspectj.version>
    <!-- other properties... -->
</properties>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>${surefire.version}</version>
            <configuration>
                <forkCount>4</forkCount><!-- parallel test execution -->
                <testFailureIgnore>true</testFailureIgnore>
                <!-- AspectJ is required for Allure's runtime step integration -->
                <argLine>-javaagent:"${settings.localRepository}/org/aspectj/aspectjweaver/${aspectj.version}/aspectjweaver-${aspectj.version}.jar"</argLine>
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
        <!-- other plugins... -->
    </plugins>
</build>

```

## Generating the Report

The primary command for generating the report is:

* **Execute Tests and Generate Report:** `mvn clean test allure:report`

    * This command cleans the project, executes the tests, and finally generates the HTML report from the collected test
      results.

* **Generate Report Only:** `mvn allure:report`

    * This command scans existing test execution results and creates the HTML report without re-running the tests.

* **Generate and Display Report:** `mvn allure:serve`

    * This command generates the report, and starts a server to display it directly.

## Report History

{{< image max-width="80%" src="neodymium/allure_report_trend.png" >}}
Example of an Allure history.
{{< /image >}}

Allure reports can feature a **trend graph** indicating test execution results over past iterations. To enable this:

1. The result (history) files from previous test executions must be provided.

2. Template projects often include a script to automate this:

    * **Linux/macOS:** Run `testAndBuildReport.sh`

    * **Microsoft Windows:** Run `testAndBuildReport.bat`

    * These scripts copy the necessary files to the destination before running `mvn test allure:report`.

## Structuring the Report using Steps

Steps are essential for structuring the test case execution within the report. Each step is an expandable/collapsible
line item, making it easier to visualize the flow and deep dive into failed actions. Steps measure runtime, showing you
exactly how long each section took.

### Using the `@Step` Annotation

Annotate methods that represent a distinct action in your test. It's recommended to include a short description and even
method parameters for quick investigation.

```Java

@Step("Simple action")
public void mySimpleAction()
{
    // do something that would occur within the step "Simple action" in the report
}

@Step("Simple action with: '{parameter}'")
public void mySimpleActionWithParameter(Object parameter)
{
    // do something that would occur within the step "Simple action with: 'parameter.toString()'" in the report
    // the @Step annotation will call the toString method of the passed parameter to add the needed information to the report
}
```

Here is a basic example of a test and the report it produces.

```Java
public class SampleTest
{
    @NeodymiumTest
    public void testMethod()
    {
        step1();
        step2();
    }

    @Step
    public void step1()
    {
        step2();
    }

    @Step
    public void step2()
    {
        step3();
    }

    @Step
    public void step3()
    {
    }
}
```

This code will be displayed in the report as in the following screenshot.

{{< image max-width="80%" src="neodymium/step_example.png" >}}
The test steps of the example code above.
{{< /image >}}

### Using `AllureAddons` for Dynamic Steps

You can utilize methods provided by the `AllureAddons` class for dynamic step definition:

1. **Simple Logging/Informational Step:**

    ```Java
    @NeodymiumTest
    public void myTest1()
    {
        AllureAddons.addToReport("first part", null);
        // do something that would occur after the step "INFO: first part" in the report

        AllureAddons.addToReport("second part", null);
        // do other things that would occur after the step "INFO: second part" in the report
    }
    ```

2. **Wrapping a Complete Section within a Step:**

    ```Java
    @NeodymiumTest
    public void myTest2() throws IOException
    {
        AllureAddons.step("first part", () -> {
            // do something that would occur within the step "first part" in the report
        });

        AllureAddons.step("second part", () -> {
            // do other things that would occur within the step "second part" in the report
        });
    }
    ```

## Describing Test Cases with Metadata Annotations

Allure provides annotations that are applied to the test case class or method to enhance test metadata and
documentation.

### Core Metadata

These annotations provide key information about the test itself:

```java

@Owner("Lisa Smith")
public class OrderTest extends AbstractTest
{
    @Tag("smoke")
    @Tag("registered")
    @DisplayName("Place Order Test Method")
    @Description("Place an order as a registered shop user")
    @Severity(SeverityLevel.BLOCKER)
    public void placeRegisteredOrder()
    {
        // perform the test steps
    }

    // more test methods ...
}

```

### Behaviour Annotations

**Epics, features, and user stories** are commonly used terms for describing software requirements and organizing the
associated tests.

Allure provides specific annotations to assign these organizational concepts to your tests, either at the class or
method level. These annotations directly define the hierarchical structure displayed in the **Behaviour tab** of the
Allure report, allowing users to drill down from broad themes (Epics) to specific scenarios (User Stories).

See the following example, where the annotations are applied to a test method:

```java
public class OrderTest extends AbstractTest
{
    @Epic("Shop User Flows")
    @Feature("Ordering")
    @Story("Registered Order")
    public void placeRegisteredOrder()
    {
        // perform the test steps
    }

    // more test methods ...
}
```

### Linking to External Systems

You can add links to general, issue tracking, and test management systems (TMS) to easily match test reports with
external sources of information.

```
@TmsLink("end-of-script-developer-and-now")
@Issue("148")
@Link(url = "[https://ask.xceptance.de/t/end-of-script-developer-and-now/148](https://ask.xceptance.de/t/end-of-script-developer-and-now/148)", type = "custom", name = "DemoLink")
public class HomePageTest extends AbstractTest
{
    // ... test methods
}

```

To enable the TmsLink and Issue annotations, you must specify the corresponding URL patterns in your `pom.xml` under the
Surefire plugin's `systemPropertyVariables`:

```
<systemPropertyVariables>
    <allure.results.directory>${project.build.directory}/allure-results</allure.results.directory>
    <allure.link.issue.pattern>[https://ask.xceptance.de/t/](https://ask.xceptance.de/t/){}</allure.link.issue.pattern>
    <allure.link.tms.pattern>[https://ask.xceptance.de/t/](https://ask.xceptance.de/t/){}</allure.link.tms.pattern>
    <selenide.reports>${project.build.directory}/selenide-results</selenide.reports>
</systemPropertyVariables>

```

## Advanced Report Enrichment and Configuration

To maximize the utility of your test results, the reporting capabilities have been enriched with several features that
provide deeper insights into the test execution environment, test data, and detailed error context.

### Automatically Logging Current Page Links

To provide context and easy access to the application state, the currently displayed URL can be automatically added as a
step to the Allure report whenever a new page is loaded.

* **Activation:** This feature is **activated by default**.
* **Deactivation:** You can disable it by setting the `neodymium.report.enableStepLinks` property to `false` in the
  Neodymium configuration.

### Displaying Test Data in the Report

When debugging a failed test case, quick access to the used test data is crucial for replication. This feature adds the
test data in **JSON format** as an attachment to each test in the Allure report.

* **Activation:** This feature is **activated by default**.
* **Deactivation:** It can be deactivated by setting the `neodymium.report.enableTestDataInReport` property to `false`.
* **Note:** This only applies to test data initialized using `Neodymium.getData()` or `DataItem` (Neodymium classes). The
  attachment name always starts with "Testdata".

If the test data is modified during the test run, you can add those changes as an additional attachment using the helper
function:

```
AllureAddons.addDataAsJsonToReport(String name, Object data)
```

{{< image max-width="80%" src="neodymium/allure_report_testdata_display.png" >}}
Test Data Display in Allure Report.
{{< /image >}}

### Capturing JSON Comparison Details

To prevent confusion from cryptic assertion errors during JSON comparisons, the dedicated `JsonAssert` class (built upon
[JSONAssert](https://github.com/skyscreamer/JSONassert)) is utilized.

* If `assertEquals` fails, an attachment named **"Json Compare"** is added, containing the exact differences between the
  expected and actual JSON data.
* If `assertNotEquals` fails, an attachment named **"Json View"** is added, providing a view of the JSON data involved.

### Customizing the Allure Environment Section

The Allure report includes an **"Environment"** section useful for tracking changes to the test setup. You can add your
own custom information to this section.

1. **Activation:** Activate the usage of custom data by setting `neodymium.report.environment.enableCustomData` to
   `true`.
2. **Mechanism:** Add custom key-value pairs to a properties file, starting the key with
   `neodymium.report.environment.custom.`.
   ```
   neodymium.report.environment.custom.yourKey = yourValue
   ```
3. **Precedence:** Custom data is read in the following order (higher ranked files override lower ranked ones):
    1. `config/dev-neodymium.propeties`
    2. System environment variables
    3. System properties
    4. `config/credentials.properties`
    5. `config/neodymium.properties`

### Logging Used Browser Configurations

To aid in debugging environment issues, all actually used browser configurations can be displayed in the Environment
section of the Allure report. This feature can be turned off by setting `neodymium.report.environment.enableBrowserData`
to `false`.

### Configuring Selenide Error Details for Categorization

By default, Selenide includes detailed, specific information (like file paths) in its error messages, which makes each
message unique. While useful locally, this prevents Allure from effectively categorizing errors by similar messages.

To ensure Allure's categorization feature works as intended, a toggle is introduced to reduce the information in the
Selenide error message.

* **Configuration:** Use the `neodymium.report.showSelenideErrorDetails` property in your `neodymium.properties` file.
* **Local Testing:** If running tests locally *without* Allure, you might want to set this value to `true` (e.g., in
  `dev-neodymium.properties`) to see the full details, including the screenshot path.
