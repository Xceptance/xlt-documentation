---
title: "JUnit"

weight: 80
type: docs

description: >
  A comprehensive guide to mastering Neodymium's powerful extensions for JUnit, covering key features like annotations, test multiplication, and test suites.
---

Neodymium customizes JUnit execution to provide additional features such as test data handling, multi-browser support, and the subsequent test multiplication. This page provides insights on how these features work when using Neodymium.

## How to use it

This section explains how to define JUnit4 and JUnit5 tests inside Neodymium.

### JUnit5

The `@NeodymiumTest` annotation can be used instead of `@Test` on any test method that should be executed with
Neodymium. A
test class can contain both standard JUnit5 tests and Neodymium tests.

```Java
public class DemoTest
{
    @NeodymiumTest
    public void ensureFunctionality()
    {
        // add test code
    }
}
```

### JUnit4

The `NeodymiumRunner` can be used by simply annotating the test case class, as shown in the example below.

```Java

@RunWith(NeodymiumRunner.class)
public class DemoTest
{
    @Test
    public void ensureFunctionality()
    {
        // add test code
    }
}
```

### Supported annotations

With Neodymium, a test case can be executed with different data sets, which enables _Data Driven Testing_. Furthermore, Neodymium supports running test cases with their data sets in different browsers, referred to as Neodymium multi-browser support. These features can be combined. While multi-browser support is activated by annotating classes or methods, multiple data set usage is triggered whenever a matching data file is found. Please follow the links below for more details on these topics.

#### Multi browser

* `@Browser`
* `@RandomBrowser`
* `@SuppressBrowser`

Please check the [browser]({{< relref "../browsers/010-browser.md" >}}) page for detailed information.

#### Test data

* `@DataSet`
* `@SuppressDataSet`
* `@DataFile`

Please check the [test data]({{< relref "../features/020-test-data.md" >}}) page for detailed information.

## Test execution order for a particular test

In general, Neodymium adheres to JUnit's test execution order. For more information, please refer to the
documentation [for JUnit4](https://github.com/junit-team/junit4/wiki/Test-execution-order)
and [for JUnit5](https://docs.junit.org/current/writing-tests/test-execution-order.html). This means that
by default there is no fixed order within the methods annotated with `@Test` or `@NeodymiumTest`.

Test methods are retrieved as an unordered list. However, during computation, the collective tests generated from a
single test method due to multiple data sets and browser profiles (a cross-product of the method, browsers, and data
sets) are added to the list as one complete set. JUnit's method ordering is applied first, then the order of the
specified browsers, and finally the data sets are executed in the order they are listed within the data file or as
specified by the `@DataSet` annotation. This ensures that while the overall test order may not be fixed, the executions
of
a single Neodymium test are run one after another in a defined sequence before moving on to the next test.

For cases where a fix and predictable execution order is desired or required, JUnit4's `FixMethodOrder` annotation and
JUnit5's `TestMethodOrder` annotation can be used with Neodymium tests as well.

### Example JUnit5

Given the following test class and assuming we execute it with a data file containing 3 data sets:

```Java

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@Browser("Chrome_1400x1000")
@Browser("FF_1024x768")
public class HomePageTest
{

    @BeforeAll
    public void systemSetUp()
    {
        // Anything that should be happening, before the test class is initiated
    }

    @BeforeEach
    public void setUp()
    {
        // Anything that should be happening, before each test method is starting
    }

    @Order(1)
    @NeodymiumTest
    public void a()
    {
        System.out.println(
            "testA with browser: '" + Neodymium.getBrowserProfileName() + "' and data set: '" + Neodymium.dataValue(
                "testId") + "'.");
    }

    // this overwrites the order of the data file
    @DataSet(id = "dataSet3")
    @DataSet(id = "dataSet2")
    @DataSet(id = "dataSet1")
    @Order(3)
    @NeodymiumTest
    public void b()
    {
        System.out.println(
            "testB with browser: '" + Neodymium.getBrowserProfileName() + "' and data set: '" + Neodymium.dataValue(
                "testId") + "'.");
    }

    // this overwrites the order of the test class
    @Browser("FF_1024x768")
    @Browser("Chrome_1400x1000")
    @Order(2)
    @NeodymiumTest
    public void c()
    {
        System.out.println(
            "testC with browser: '" + Neodymium.getBrowserProfileName() + "' and data set: '" + Neodymium.dataValue(
                "testId") + "'.");
    }

    @AfterEach
    public void tearDown()
    {
        // Anything that should be happening, after each single test method
    }

    @AfterAll
    public void systemTearDown()
    {
        // Anything that should be happening, once all test of this class have finished
    }
}
```

The console output of the code above would then look like this:

 ```
testA with browser: 'Chrome_1400x1000' and data set: 'dataSet1'.
testA with browser: 'Chrome_1400x1000' and data set: 'dataSet2'.
testA with browser: 'Chrome_1400x1000' and data set: 'dataSet3'.
testA with browser: 'FF_1024x768' and data set: 'dataSet1'.
testA with browser: 'FF_1024x768' and data set: 'dataSet2'.
testA with browser: 'FF_1024x768' and data set: 'dataSet3'.
testC with browser: 'FF_1024x768' and data set: 'dataSet1'.
testC with browser: 'FF_1024x768' and data set: 'dataSet2'.
testC with browser: 'FF_1024x768' and data set: 'dataSet3'.
testC with browser: 'Chrome_1400x1000' and data set: 'dataSet1'.
testC with browser: 'Chrome_1400x1000' and data set: 'dataSet2'.
testC with browser: 'Chrome_1400x1000' and data set: 'dataSet3'.
testB with browser: 'Chrome_1400x1000' and data set: 'dataSet3'.
testB with browser: 'Chrome_1400x1000' and data set: 'dataSet2'.
testB with browser: 'Chrome_1400x1000' and data set: 'dataSet1'.
testB with browser: 'FF_1024x768' and data set: 'dataSet3'.
testB with browser: 'FF_1024x768' and data set: 'dataSet2'.
testB with browser: 'FF_1024x768' and data set: 'dataSet1'.
 ```

### Example JUnit4

Given the following test class and assuming we execute it with a data file containing 3 data sets:

```Java

@RunWith(NeodymiumRunner.class)
@Browser("Chrome_1024x768")
@Browser("Firefox_1024x768")
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class OrderDemoTest
{

    @BeforeClass
    public void systemSetUp()
    {
        // Anything that should be happening, before the test class is initiated
    }

    @Before
    public void setUp()
    {
        //Anything that should be happening, before each test method is starting
    }

    @Test
    public void testC()
    {
        System.out.println(
            "testC with browser: '" + Neodymium.getBrowserProfileName() + "' and data set: '" + Neodymium.dataValue(
                "testId") + "'.");
    }

    @Test
    // this overwrites the order of the data file
    @DataSet(id = "dataSet3")
    @DataSet(id = "dataSet2")
    @DataSet(id = "dataSet1")
    public void testB()
    {
        System.out.println(
            "testB with browser: '" + Neodymium.getBrowserProfileName() + "' and data set: '" + Neodymium.dataValue(
                "testId") + "'.");
    }

    @Test
    // this overwrites the order of the test class
    @Browser("Firefox_1024x768")
    @Browser("Chrome_1024x768")
    public void testA()
    {
        System.out.println(
            "testA with browser: '" + Neodymium.getBrowserProfileName() + "' and data set: '" + Neodymium.dataValue(
                "testId") + "'.");
    }

    @After
    public void tearDown()
    {
        //Anything that should be happening, after each single test method 
    }

    @AfterClass
    public void systemTearDown()
    {
        // Anything that should be happening, once all test of this class have finished
    }
}
```

The console output of the code above would then look like this:

```
testA with browser: 'Firefox_1024x768' and data set: 'dataSet1'.
testA with browser: 'Firefox_1024x768' and data set: 'dataSet2'.
testA with browser: 'Firefox_1024x768' and data set: 'dataSet3'.
testA with browser: 'Chrome_1024x768' and data set: 'dataSet1'.
testA with browser: 'Chrome_1024x768' and data set: 'dataSet2'.
testA with browser: 'Chrome_1024x768' and data set: 'dataSet3'.
testB with browser: 'Chrome_1024x768' and data set: 'dataSet3'.
testB with browser: 'Chrome_1024x768' and data set: 'dataSet2'.
testB with browser: 'Chrome_1024x768' and data set: 'dataSet1'.
testB with browser: 'Firefox_1024x768' and data set: 'dataSet3'.
testB with browser: 'Firefox_1024x768' and data set: 'dataSet2'.
testB with browser: 'Firefox_1024x768' and data set: 'dataSet1'.
testC with browser: 'Chrome_1024x768' and data set: 'dataSet1'.
testC with browser: 'Chrome_1024x768' and data set: 'dataSet2'.
testC with browser: 'Chrome_1024x768' and data set: 'dataSet3'.
testC with browser: 'Firefox_1024x768' and data set: 'dataSet1'.
testC with browser: 'Firefox_1024x768' and data set: 'dataSet2'.
testC with browser: 'Firefox_1024x768' and data set: 'dataSet3'.
```

## Test execution order for the whole project

Neodymium and its example projects use Maven as an execution environment, specifically the _Apache Maven Surefire_
plugin for test executions. By default, there is no particular order for the execution of test case classes. However,
you can specify the order by adding the `runOrder` parameter to the Surefire configuration within the `pom.xml` file.
Please check
the [official documentation](http://maven.apache.org/surefire/maven-surefire-plugin/test-mojo.html#runOrder) for more
details.

## Aggregating tests in suites in JUnit4

Neodymium also offers the option to create test suites. To do so, you need to create a separate class for each suite and
annotate it as follows:

```Java
@RunWith(Suite.class)
@Suite.SuiteClasses({
    RegisterFromUserMenuTest.class, 
    RegisterTest.class, 
    LoginTest.class
})
public class UserTestSuite
{
    @BeforeClass
    public static void before()
    {
        System.out.println("before all tests in suite");
    }

    @AfterClass
    public static void after()
    {
        System.out.println("after all tests in suite");
    }
}
```

As you can see, the suite class should be annotated with `@RunWith(Suite.class)` and `@Suite.SuiteClasses()`. The latter
should contain the test classes that belong to the suite. All test classes in the suite can be configured like a normal
Neodymium test, meaning they should contain `@RunWith(NeodymiumRunner.class)` and browser configurations. If you use
suites to run tests, you may want to exclude these same tests from other test execution configurations to avoid running
them twice unnecessarily.

While this approach can be useful, it should be used carefully as it may increase test execution time. It can be
particularly helpful if some of your tests require the same setup or cleanup. Please be aware that at the time when
methods annotated with `@BeforeClass` or `@AfterClass` are called, no browser or test data configuration is available.

Since there is no parallelization for tests run in a suite, you can use this option to avoid certain collisions during a
test run. It is also possible to use Maven Surefire Plugin configurations to avoid collisions. The Maven Surefire Plugin
approach also works for JUnit5. If you are interested, please read about it in the
chapter [Avoiding test collisions with Maven Surefire](#avoiding-test-collisions-with-maven-surefire).

## Aggregating tests in suites in JUnit5

Unlike JUnit4, which uses `@RunWith` and `@Suite.SuiteClasses`, JUnit5 uses a different approach for creating test
suites. With JUnit5, you create a dedicated runner class for the test suite and annotate it with `@Suite` and
`@SelectClasses` to specify which test classes to include.

Here's an example of a JUnit5 test suite:

```java
@Suite
@SelectClasses({
    RegisterFromUserMenuTest.class,
    RegisterTest.class,
    LoginTest.class
})
public class UserTestSuite
{
    @BeforeSuite
    static void beforeSuite()
    {
        // executes before the test suite
    }

    @AfterSuite
    static void afterSuite()
    {
        // executes after the test suite
    }
}
```

This approach is often more flexible and allows you to group tests without relying on a single runner.
When creating test suites in JUnit5, several annotations can be used to control which classes and methods are included.

The table below provides a quick overview of some of the most common annotations for this purpose.

| Annotation                                                  | Description                                                                                         |
|-------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| `@SelectClasses`                                            | Specifies which individual test classes to include in the suite.                                    |
| `@SelectPackages`                                           | Specifies one or more packages from which to find test classes for execution.                       |
| `@IncludeClassNamePatterns` and `@ExcludeClassNamePatterns` | Filters and includes or excludes test classes based on a regular expression.                        |
| `@IncludePackages` and `@ExcludePackages`                   | Filters and includes or excludes specific sub-packages when using `@SelectPackages`.                |
| `@IncludeTags` and `@ExcludeTags`                           | Filters and includes or excludes test classes or methods based on the tags they are annotated with. |

{{% warning notitle %}}
**Attention:** The `@Include` and `@Exclude` annotations specify additional conditions to include or exclude tests that
have already been found using a `@Select` annotation. You cannot use an independent `@Include` or `@Exclude` annotation
on a test suite; it must be used in conjunction with a `@Select` annotation.
{{% /warning %}}

## Aggregating tests in categories / Tagging tests

To group tests, you can also use the `@Tag` annotation for JUnit5 and the `@Category` annotation for JUnit4. This option
is more flexible than suite grouping but does not allow the execution of code before or after the whole test group.

### JUnit5

In the `@Tag` annotation offered by JUnit5 you can simply use strings, e.g.:

```Java

@Tag("TestsWithFailures")
public class A
{
    @NeodymiumTest
    public void a()
    {
        fail();
    }

    @Tag("SlowTests")
    @NeodymiumTest
    public void b()
    {
    }

    @Tag("FastTests")
    @Tag("SmokeTests")
    @NeodymiumTest
    public void c()
    {
    }
}
```

{{% note %}}
The tag Strings should not contain any whitespace, as the Allure reporting framework is unable to process tags with spaces.
{{% /note %}}

### JUnit4

For JUnit4 you first need to create a category, which is represented by a marker interface. So, to create a category for
slow tests create the following interface:

```Java
 public interface SlowTests
{
}
```

Now you can use this interface to group tests in categories. Unlike the test suite grouping, where you had to mention
all the suite tests in the `~TestSuite` class, here you just need to annotate the tests from the category with
`@Category(SlowTests.class)`. The annotation is also inheritable, so if the classes from the same category have a mutual
superclass, you can simply annotate the superclass and avoid redundant code repetition. It is also possible to have a
test method or class belong to multiple categories using the `@Category({SlowTests.class, FastTests.class})` annotation.
In the example below, you can see all the possible ways for test categorization:

```Java

@Category(TestsWithFailures.class)
public class A
{
    @Test
    public void a()
    {
        fail();
    }

    @Category(SlowTests.class)
    @Test
    public void b()
    {
    }

    @Category({ FastTests.class, SmokeTests.class })
    @Test
    public void c()
    {
    }
}
```

For JUnit 4, you can use `@IncludeCategory` and `@ExcludeCategory` annotations. Using these annotations, you can include
or exclude categories in test suites as in the example below:

```Java

@RunWith(Categories.class)
@IncludeCategory({ FastTests.class, SmokeTests.class })
@SuiteClasses({ A.class, B.class })
public static class FastOrSmokeTestSuite
{
    // Will run A.c and B.d, but not A.b because it is not annotated with either FastTests or SmokeTests
}
```

### Usage in POM

After categorizing the tests, you can operate with the category or tag name instead of an enumeration of test names. You
can operate on categories with the `maven-surefire-plugin` or JUnit depending on your needs. For manipulation with
Maven, use `<groups>` and `<excludedGroups>` tags. This is useful for creating dynamic sets of
tests that are easy to maintain. It allows you to avoid listing all tests that need to be executed (or skipped) in a
profile by simply mentioning the tag and then annotating all the necessary tests, which can significantly reduce
maintenance effort.

```Xml

<profile>
    <id>critical</id>
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <configuration>
                    <groups>Critical</groups>
                    <!-- for JUnit4 -->
                    <!-- <groups> zwilling.utility.Critical</groups> -->
                </configuration>
            </plugin>
        </plugins>
    </build>
</profile>
```

{{% note title="Important" %}}
JUnit5 also supports tag expressions, which allow more flexible grouping of tests. Please read more [here](https://docs.junit.org/current/running-tests/tags.html).
{{% /note %}}

## Avoiding test collisions with Maven Surefire

Sometimes it is necessary to run certain tests sequentially to avoid collisions. However, executing all tests
sequentially will increase the overall test suite execution time. To solve this, you can configure the Maven Surefire
Plugin to execute all non-colliding tests in parallel first, and then run the tests that might collide sequentially.
This configuration is shown below:

```Xml
<build>
    <executions>
        <execution>
            <id>run-tests-parallel</id>
            <phase>test</phase>
            <goals>
                <goal>test</goal>
            </goals>
            <configuration>
                <forkCount>${surefire.forkCount}</forkCount>
                <includes>
                    <include>tests/that/can/be/executed/parallel/**/*Test.java</include>
                </includes>
                <!-- or you can use <groups>category class or tag expression</groups> -->
                <skipTests>false</skipTests>
            </configuration>
        </execution>
        <execution>
            <id>run-tests-sequentially</id>
            <phase>test</phase>
            <goals>
                <goal>test</goal>
            </goals>
            <configuration>
                <forkCount>1</forkCount>
                <includes>
                    <include>tests/that/should/be/executed/sequentially/**/*Test.java</include>
                </includes>
                <!-- or you can use <groups>category class or tag expression</groups> -->
                <skipTests>false</skipTests>
            </configuration>
        </execution>
    </executions>
```
