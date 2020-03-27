---
title: "Test Suites"

weight: 450
type: docs

description: >
  XLT uses the concept of a test suite to make test projects more easily manageable.
---

{{< TODO >}}see https://lab.xceptance.de/releases/xlt/latest/how-to/how-to-structure-test-suites.html{{< /TODO >}}

## Concept

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

* `<testsuite>/src/.../actions` _(only when XLT Action API is used)_
* `<testsuite>/src/.../flow`
* `<testsuite>/src/.../util`
* `<testsuite>/src/.../validators`
* `<testsuite>/src/.../tests`

If you plan to use more than one of the approaches provided by XLT, it's recommended to create packages for each of its test cases, which generates up to three additional subdirectories. Your packages could be named as follows:

* `<testsuite>/src/.../tests/actionbased`
* `<testsuite>/src/.../tests/scripting`
* `<testsuite>/src/.../tests/webdriver`

{{< TODO >}}learn about framework conditions{{< /TODO >}}

Besides these options, each approach also introduces XLT-specific framework conditions structuring your test suite and test cases. In particular, each test case is necessarily implemented as a Java class extending an XLT test case class, which is approach-specific and contains one method annotated with `@Test`. See the following sections for such specific framework conditions and further ways of structuring.

### Naming and Tags

The easiest way for you to structure your test suite is to name the test cases according to a common naming convention. It's common to start the name with a capitalized _T_ and  continue with the so-called "camel-case" where each element's initial letter is capitalized within the compound word. A best-practice example is to specify the test case's purpose by compounding single elements, for instance _TCartCheckoutCancel_, _TCartOrder_, and so on.

### Framework Conditions

**XLT Test Cases are JUnit4 Tests.** XLT test cases use a Java test case class with one `test()` method, regardless of the chosen approach for test writing.

The `test()` method of each test case class has a `@Test` annotation. XLT builds upon JUnit4 principles and its annotations to implement and tag test cases. This way, each XLT test is in fact a JUnit test enabling XLT tests to be executed just like any other unit test in the IDE or within an existing build process. The sole difference between XLT and standard JUnit4 tests is that XLT tests can only take one active test method per test class. That means that, although there can be an arbitrary number of methods within a class, only one method is permitted to be annotated with `@Test`. However, this limitation rather serves the purpose of simplification than leading to actual restrictions.

Implementing the test case as a JUnit4 test also lets you use standard JUnit assertion to validate the page, mainly when you create test cases using the HtmlUnit API.
