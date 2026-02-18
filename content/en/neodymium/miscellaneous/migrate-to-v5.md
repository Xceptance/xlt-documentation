---
title: "Migrate to Neodymium 5"
linkTitle: "Migrate to Neodymium 5"
weight: 600
type: docs
description: "Migration guide for Neodymium 5."
---

This page lists the significant milestones of Neodymium 5, including support for JUnit 5 and Selenium 4 / Selenide 6 or above. Upgrading to Neodymium 5 involves a few necessary steps to ensure compatibility with existing projects.

## 1. Requirements

Please note that Neodymium 5 requires **Java 17** (JDK 17). Ensure your development environment is updated accordingly.

## 2. General changes in POM

If the project is based on the [neodymium-template](https://github.com/Xceptance/neodymium-template), update the properties in the `pom.xml` as follows:

```xml
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <surefire.version>3.2.5</surefire.version>
        <aspectj.version>1.9.21</aspectj.version>
        <allure.version>2.12.0</allure.version>
        <neodymium.version>5.0.0</neodymium.version>
    </properties>
```

In case of a custom project structure, follow these instructions:

1. Update Neodymium dependency to version `5.0.0`.
2. Update Maven Compiler to version `17` as Neodymium now requires Java 17.
3. Update Maven Surefire Plugin to version `3.2.5` (or higher; anything above 3.0.0-M5 is required).
4. Update AspectJ Weaver to version `1.9.21` (or higher; anything above 1.9.19 is required).
5. Update Allure to version `2.12.0`.

**Important: allure version and allure report version don't have to match! You can use the latest (2.27.0 for now)
report version to have good-looking reports** To use different allure report version adjust allure plugin to:

```xml
    <plugin>
        <groupId>io.qameta.allure</groupId>
        <artifactId>allure-maven</artifactId>
        <version>${allure.version}</version>
        <configuration>
            <reportVersion>2.27.0</reportVersion>
        </configuration>
    </plugin>
```

## 3. Changes in Selenide assertions

The now used Selenide version contains the following changes that may have impact on your project:

* The `waitUntil` and `waitWhile` methods were replaced with extended `should`/`shouldNot`/`shouldBe`/`shouldHave`/etc.
  methods, which now accept a different implicit waiting time as a `java.time.Duration` object. For example,
  `waitUntil(visible, 9000)` must be replaced with `shouldBe(visible, Duration.ofMillis(9000))`.

* The `shouldHaveSize` method for collections was removed. It can be replaced with the more general `shouldHave`
  method (e.g., `shouldHave(CollectionCondition.size(n))`).

* The `getSelectedText()` method has been renamed to `getSelectedOptionText()`.

## 4. Changes that might be required for your CI/CD (esp. Jenkins)

The Allure version used in Neodymium is incompatible with Allure Commandline Tools versions below **2.27.0**. If you use
the Allure Commandline tool to generate reports, you must update it.

If you use the Allure Report plugin in Jenkins to generate and store reports, please note that the plugin uses the
commandline tool. You not only need to update the plugin but also configure the commandline version in the global tool
configuration, as shown below:

{{< image max-width="80%" src="neodymium/allure_commandline_installations_jenkins.png" >}}
Setting the Allure Commandline version in Jenkins.
{{< /image >}}

## 5. Changes required if you want to stay with JUnit 4 but with Neodymium 5

While JUnit 5 introduces many useful features, migrating tests is not mandatory. Users can continue using JUnit 4 if preferred due to compatibility or other reasons.

However, some changes to your project configuration are still required.

### 5.1 Changes in POM

Include the **JUnit 4 Vintage Engine** as a dependency for the Maven Surefire Plugin in your `pom.xml`. If you are using
the `neodymium-template`, this should be placed right after the AspectJ dependency.

```xml
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>${surefire.version}</version>
        <configuration>
            <forkCount>2</forkCount>
            <!-- our test case naming does not follow Maven naming conventions -->
            <includes>
                <include>posters/tests/**/*Test.java</include>
            </includes>
            <testFailureIgnore>true</testFailureIgnore>
            <argLine>
                -javaagent:"${settings.localRepository}/org/aspectj/aspectjweaver/${aspectj.version}/aspectjweaver-${aspectj.version}.jar"
            </argLine>
            <properties>
                <property>
                    <name>listener</name>
                    <value>io.qameta.allure.junit4.AllureJunit4</value>
                </property>
            </properties>
            <systemPropertyVariables>
                <allure.results.directory>${project.build.directory}/allure-results</allure.results.directory>
                <allure.link.issue.pattern>https://ask.xceptance.de/t/{}</allure.link.issue.pattern>
                <allure.link.tms.pattern>https://ask.xceptance.de/t/{}</allure.link.tms.pattern>
                <selenide.reports>${project.build.directory}/selenide-results</selenide.reports>
            </systemPropertyVariables>
        </configuration>
        <dependencies>
            <dependency>
                <groupId>org.aspectj</groupId>
                <artifactId>aspectjweaver</artifactId>
                <version>${aspectj.version}</version>
            </dependency>
            <dependency>
                <groupId>org.junit.vintage</groupId>
                <artifactId>junit-vintage-engine</artifactId>
                <version>5.10.2</version>
            </dependency>
        </dependencies>
    </plugin>
```

### 5.2 Changes in imports

As Neodymium 5 now supports both JUnit4 and JUnit5 but the offered sugar is mutual for both implementations, many classes were moved to different packages:

* `com.xceptance.neodymium.module.statement.browser.multibrowser.Browser` moved to `com.xceptance.neodymium.common.browser.Browser`
* `com.xceptance.neodymium.module.statement.browser.multibrowser.SuppressBrowser` moved to `com.xceptance.neodymium.common.browser.SuppressBrowser`
* `com.xceptance.neodymium.module.statement.testdata.DataFile` moved to `com.xceptance.neodymium.common.testdata.DataFile`
* `com.xceptance.neodymium.module.statement.testdata.DataSet` moved to `com.xceptance.neodymium.common.testdata.DataSet`
* `com.xceptance.neodymium.module.statement.testdata.SuppressDataSet` moved to `com.xceptance.neodymium.common.testdata.SuppressDataSet`
* `com.xceptance.neodymium.NeodymiumRunner` moved to `com.xceptance.neodymium.junit4.NeodymiumRunner` (for JUnit4 version only)

Please update your imports to ensure your project compiles correctly. This step is also required if you plan to switch
to JUnit 5.

### 5.3 Example test with JUnit4

```java
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;

import com.xceptance.neodymium.common.browser.Browser;
import com.xceptance.neodymium.junit4.NeodymiumRunner;

@RunWith(NeodymiumRunner.class)
@Browser("Chrome_1400x1000")
public class HomePageTest
{
    @Test
    public void testWithJunit4AndNeo5()
    {
        // put your test code here
    }
}
```

## 6. Steps to update to JUnit5

If you decide to migrate to JUnit 5, you can take advantage of its modern features. JUnit 5 uses `Extension`s, making it
easier to customize test execution. Neodymium's features have been adapted to work seamlessly with this new model.

Here are the key things you need to know:

* **Annotations**: JUnit 5 focuses on method-level annotations. New annotations include `@TestTemplate`, `@ParameterizedTest`, and `@RepeatedTest`. `@NeodymiumTest` was introduced for tests driven by Neodymium. Unlike JUnit 4, where the class was annotated with `@RunWith(NeodymiumRunner.class)`, the test method is now simply annotated with `@NeodymiumTest`. This allows mixing Neodymium tests and standard JUnit tests in the same class.

* **Extensions**: JUnit 5 replaces `Rule`s with `@ExtendWith` and the `Extension` API. If you need to use a Neodymium
  feature that was previously a rule, simply annotate the class or method. For example, to use soft assertions, annotate
  the class with `@ExtendWith(SoftAssertsExtension.class)` and enable soft mode as needed (
  `Configuration.assertionMode = AssertionMode.SOFT;`).

* **Annotation Replacements**:
    * `@Before` -> `@BeforeEach`
    * `@After` -> `@AfterEach`
    * `@BeforeClass` -> `@BeforeAll`
    * `@AfterClass` -> `@AfterAll`
    * `@Ignore` -> `@Disabled`

### 6.1 Example test with JUnit5

```java
import com.xceptance.neodymium.common.browser.Browser;
import com.xceptance.neodymium.junit5.NeodymiumTest;

@Browser("Chrome_1400x1000")
public class HomePageTest
{
    @NeodymiumTest
    public void testWithJunit5AndNeo5()
    {
        // put your test code here
    }
}
```
