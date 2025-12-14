---
title: "Migrate to Neodymium 5"
linkTitle: "Migrate to Neodymium 5"
weight: 50
type: docs
description: "Migration guide for Neodymium 5."
---

We are thrilled to announce the release of Neodymium 5. It's a big milestone that brings support for JUnit 5 and Selenium 4 / Selenide 6 or above. Due to these major changes there is some additional effort required to migrate your project to Neodymium 5.

## 1. Requirements

Please note that Neodymium 5 needs a higher JDK version. Please update your system to JDK 17.

## 2. General changes in POM

If you took our [neodymium-template](https://github.com/Xceptance/neodymium-template) project as basis you need to change the properties in your `pom.xml` to the following:

```
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

In case you have your own project structure, here are some instructions for what you need to do:

1. Update Neodymium dependency version to 5.0.0
2. Update Maven Compiler version to 17 as Neodymium now requires Java 17
3. Update Maven Surefire Plugin version above 3.0.0-M5 (recommended 3.2.5 version as the latest version by the time of release)
4. Update Aspectj Weaver to the version above 1.9.19 (recommended 1.9.21 version)
5. Update Allure version to 2.12.0 version

**Important: allure version and allure report version don't have to match! You can use the latest (2.27.0 for now) report version to have good-looking reports** To use different allure report version adjust allure plugin to:

```
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

* The `waitUntil` and `waitWhile` methods were replaced with extended `should`/`shouldNot`/`shouldBe`/`shouldHave`/etc. methods, which now accept different implicit waiting time in form of `java.time.Duration` object. This means that e.g. your `waitUntil(visible, 9000)` has to be replaced with `shouldBe(visible, Duration.ofMilis(9000))`

* The `shouldHaveSize` method for collection was removed as it can be replaced with more general `shouldHave` method (`shouldHave(size(n))`)

* The `getSelectedText()` method is renamed to `getSelectedOptionText()`

## 4. Changes that might be required for your CI/CD (esp. Jenkins)

The Allure version that is now used in Neodymium is incompatible with Allure Commandline Tools versions below 27th. Therefore, if you use the Allure Commandline tool to generate Allure Reports, you will need to update it to be able to generate the report.

If you use the Allure Report plugin in Jenkins to generate and store the report after the test run, please mind that the plugin uses the commandline tool to produce the report. It's not only required to update the plugin version, but you also need to increase the commandline version in tools, like the image below shows:

![Allure Commandline tools configuration in Jenkins](/images/neodymium/allure-commandline-installations-jenkins.png)

## 5. Changes required if you want to stay with JUnit 4 but with Neodymium 5

Although JUnit5 introduced a lot of useful features, we don't want to force you using it in your project. The reasons for staying with JUnit4 may be different, from being compatible with other dependencies to just going old school ;)

Nevertheless, it's still required to introduce some changes in project even in this case.

### 5.1 Changes in POM

Include JUnit4 vintage engine as dependency for Maven Surefire Plugin into the `pom.xml` (if you use neodymium-template as basis, it would be right after the Aspectjs dependency)

```
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
            -javaagent:"${settings.localRepository}/org/aspectj/aspectjweaver/${aspectj.version}/aspectjweaver-${aspectj.version}.jar"</argLine>
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

As Neodymium 5 now supports both JUnit4 and JUnit5 but the offered sugar is mutual for both implementations, a lot of classes were moved to different packages:

* `com.xceptance.neodymium.module.statement.browser.multibrowser.Browser` moved to `com.xceptance.neodymium.common.browser.Browser`
* `com.xceptance.neodymium.module.statement.browser.multibrowser.SuppressBrowser` moved to `com.xceptance.neodymium.common.browser.SuppressBrowser`
* `com.xceptance.neodymium.module.statement.testdata.DataFile` moved to `com.xceptance.neodymium.common.testdata.DataFile`
* `com.xceptance.neodymium.module.statement.testdata.DataSet` moved to `com.xceptance.neodymium.common.testdata.DataSet`
* `com.xceptance.neodymium.module.statement.testdata.SuppressDataSet` moved to `com.xceptance.neodymium.common.testdata.SuppressDataSet`
* `com.xceptance.neodymium.NeodymiumRunner` moved to `com.xceptance.neodymium.junit4.NeodymiumRunner` (for JUnit4 version only)

Please be aware of these changes and update your imports to make your project compile properly. This step is also required if you want to switch to JUnit 5

### 5.3 Example test with JUnit4

```
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

If you decided to go for JUnit5, you are definitely on the right way to make your tests modern and powerful. The JUnit5 is no more just a framework to execute tests, as with introduced `Extendtion`s it's now much easier to customize the test execution to exact needs of your project. Our aim was also to make your customizations compatible with the Neodymium sugar. Here are things you need to know to be able to use Neodymium with JUnit5 in your project and to customize the execution process if needed:

* JUnit5 went more method-level and introduced a lot of new annotations for the test methods. Apart from `@Test` there are now `@TestTemplate`, `@ParameterizedTest`, `@RepeatedTest`, etc. We followed the trend and introduced the `@NeodymiumTest` annotation for all tests that should be driven by Neodymium. So, in contrast to the Neodymium with JUnit4, where you had to annotate the whole test class with `@RunWith(NeodymiumRunner.class)` to mark that the tests should be executed with Neodymium, it's now enough to simply annotate a single method that is supposed to be a Neodymium test with `@NeodymiumTest` annotation. This makes you more flexible and enables to have both Neodymium and other "plain" JUnit tests in the same class.

* JUnit5 got rid of all `Rule`s, which are now replaced with `@ExtendWith` and `Extension`. If you want to use one, just annotate the method or class (depending on Extension) and it will be combined with Neodymium sugar as far as possible. For example, if you want your test to use soft assertions, you need to annotate the class where it's located with `@ExtendWith(SoftAssertsExtension.class)` and turn the soft mode on, when it's needed (with `Configuration.assertionMode = AssertionMode.SOFT;`, the same as in JUnit4)

* Replace
  * `@Before` with `@BeforeEach`
  * `@After` with `@AfterEach`
  * `@BeforeClass` with `@BeforeAll`
  * `@AfterClass` with `@AfterAll`
  * `@Ignore` with `@Disabled`

### 6.1 Example test with JUnit5

```
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
