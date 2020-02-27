---
title: "Demo Test Suite"

weight: 30
type: docs

description: >
  What is the demo test suite and how you can install and run it.
---

{{< TODO >}}
Shrink the demo test suite to basic minimum, then explain that.
<br />
When this is finished, copy to load-testing/test-suites/Base Web Test Suite
{{< /TODO >}}

All official XLT releases ship with a real-world [demo web application](../20-demo-application) (*Posters*) as the system under test and a test suite to test this application. Both can be found in the directory `<XLT>/samples`.

## The Posters Test Suite

The *Posters* test suite is a very basic test suite with a limited number of test scenarios. The test cases can be written and modified directly in Java with you favorite IDE, and this sample project is here to demonstrate the essential concepts of XLT tests as well as what APIs are available to implement them.

### Directory Structure

An XLT test project has a simple directory structure. The following directories have to exist in order for everything to run smoothly:

- `<project>/classes` contains the compiled code of your project. Normally, your IDE will do the job and place the files there. You can optionally build a JAR and place it in the `<project>/lib` directory.
- `<project>/config` contains all the properties files used to configure the project.
- There can be an optional `<project>/config/data` directory where you can place any data file you need for the test, such as address data, logins, and so on. All files are uploaded to the agent before a load test takes place. The programming API provides easy access to this data.
- You can place all your required libraries in `<project>/lib`. The content is uploaded to the runtime agent and included in the class path. For your local development within an IDE, you have to manually add the libraries to the class path of your project.
- The `<project>/src` directory holds the Java-based test cases of your project. This code is compiled into classes by your IDE or build environment. It's organized in main packages, typically one package for test cases, one for actions, and one for utility classes. Make sure the compiled classes end up in `project/classes` because this is the directory XLT configures as class path for your test.
- The `<project>/scripts` directory contains test scenarios as script test cases. Again, the code is organized in main packages, one package for test cases, a.k.a. scenarios, and one for reusable modules.

### Understanding the Test Scenarios

Since _Posters_ is a shop software, our test scenarios cover the typical use of an online shop:
- *Visitor*: A visitor arrives on the homepage, and that's it.
- *Browse*: The visitor arrives on the homepage, then starts browsing some main- and sub-categories and views a random product detail page.
- *Search*: The visitor arrives on the homepage and enters one or more search phrases, then opens the product detail page for one of the search result items.
- *Register*: A visitor creates an account.
- *Add To Cart*: *Browse* extended by adding the shown product to the cart and viewing the cart.
- *Guest Checkout*: *Add To Cart* with a subsequent checkout process but without submitting the order.
- *Checkout*: *Add To Cart* with a subsequent checkout process as registered user and, again, without submitting the order.
- *Guest Order*: *Guest Checkout* with a completed checkout including submission of the order.
- *Order*: *Checkout* including submission of the order.

Note that the scenarios share some common steps, thus allowing a clear demonstration of how to reuse code across test cases.

## Running Java Test Cases in Headless Mode

Java-based test cases are executed in headless mode, that is in a simulated browser that doesn't perform page rendering. Before you can do so, you need to import the sample test suite into your Java IDE.

### Importing the _Posters_ Test Suite into Eclipse

After starting Eclipse and creating a workspace, do the following:
- Open the import dialog (_File_ > _Import_ > _General_ > _Existing Project Into Workspace_).
- Select the root directory to search in and point to `<XLT>/samples`.
- Select the test suite project `testsuite-posters` from the list.
- Click _Finish_.

Since the imported project has dependencies on the libraries of XLT, you have to adjust these dependencies.
- Right-click on your project and select _Properties_.
- Click _Java Build Path_.
- Select the _Libraries_ tab, then click _Add External JARs_.
- Go to `<XLT>/lib` and select all JARs. Then click _OK_.
- A list of all these JARs is displayed. Close the dialog with _Apply and Close_.

Eclipse will rebuild the project and shouldn't report any build problems if configured properly.

{{% note notitle %}}
Users of other IDEs have to carry out similar steps.
{{% /note %}}

### Executing Java Test Cases in Eclipse

Any Java test case can be directly run in Eclipse in headless browser mode. Go to package `com.xceptance.xlt.samples.tests`, select the test case class (e.g. `TSearch`), and run it as JUnit test via the Eclipse class file context menu.

## More Test Suites

This is just a minimal test suite that helps you understand how things are supposed to work. We provide even more sample test suites for more special needs, containing more complex examples - check out the [Test Suites](../../test-suites) overview to learn more about them.