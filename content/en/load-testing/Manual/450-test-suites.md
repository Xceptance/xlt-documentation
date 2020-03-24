---
title: "Test Suites"

weight: 450
type: docs

description: >
  XLT uses the concept of a test suite to control code and .
---

{{< TODO >}}see https://lab.xceptance.de/releases/xlt/latest/how-to/how-to-structure-test-suites.html{{< /TODO >}}

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

{{< TODO >}}learn about scripting/webdriver - still relevant? learn about framework conditions{{< /TODO >}}

Besides these options, each approach also introduces XLT-specific framework conditions structuring your test suite and test cases. In particular, each test case is necessarily implemented as a Java class extending an XLT test case class, which is approach-specific and contains one method annotated with `@Test`. See the following sections for such specific framework conditions and further ways of structuring.

### Naming and Tags

The easiest way for you to structure your test suite is to name the test cases according to a common naming convention. It's common to start the name with a capitalized _T_ and  continue with the so-called "camel-case" where each element's initial letter is capitalized within the compound word. A best-practice example is to specify the test case's purpose by compounding single elements, for instance _TCartCheckoutCancel_, _TCartOrder_, and so on.

### Framework Conditions

**XLT Test Cases are JUnit4 Tests.** XLT test cases use a Java test case class with one `test()` method, regardless of the chosen approach for test writing.

The `test()` method of each test case class has a `@Test` annotation. XLT builds upon JUnit4 principles and its annotations to implement and tag test cases. This way, each XLT test is in fact a JUnit test enabling XLT tests to be executed just like any other unit test in the IDE or within an existing build process. The sole difference between XLT and standard JUnit4 tests is that XLT tests can only take one active test method per test class. That means that, although there can be an arbitrary number of methods within a class, only one method is permitted to be annotated with `@Test`. However, this limitation rather serves the purpose of simplification than leading to actual restrictions.

Implementing the test case as a JUnit4 test also lets you use standard JUnit assertion to validate the page, mainly when you create test cases using the HtmlUnit API.
