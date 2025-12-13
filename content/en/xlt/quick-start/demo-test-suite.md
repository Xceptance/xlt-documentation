---
title: "Demo Test Suite"

weight: 30
type: docs

description: >
  What is the demo test suite and how you can install and run it.
---

To get you started with XLT we offer a real-world [demo web application]({{< relref "demo-application" >}}) (*Posters*) as the system under test as well as a number of free sample test suites to test this application. All test suites can be found on [Github](https://github.com/Xceptance?q=loadtest-suite&type=&language=). We recommend to start with this [very simple test suite](https://github.com/Xceptance/posters-simple-loadtest-suite) to get used to the concepts. This is just a minimal test suite that helps you understand how things are supposed to work. We provide even more sample test suites for more special needs, containing more complex examples - check out the [Test Suites]({{< relref "../test-suites" >}}) overview to learn more about them.

## The Posters Test Suite

The *Posters* test suite is a very basic test suite with a limited number of test scenarios. The test cases can be written and modified directly in Java with your favorite IDE, and this sample project is here to demonstrate the essential concepts of XLT tests as well as what APIs are available to implement them.

### Directory Structure

An XLT test project has a simple directory structure. The following directories have to exist in order for everything to run smoothly:

- `<project>/classes` contains the compiled code of your project. Normally, your IDE will do the job and place the files there. You can optionally build a JAR and place it in the `<project>/lib` directory.
- `<project>/config` contains all the properties files used to configure the project.
- There can be an optional `<project>/config/data` directory where you can place any data file you need for the test, such as address data, logins, and so on. All files are uploaded to the agent before a load test takes place. The programming API provides easy access to this data.
- You can place all your required libraries in `<project>/lib`. The content is uploaded to the runtime agent and included in the class path. For your local development within an IDE, you have to manually add the libraries to the class path of your project.
- The `<project>/src` directory holds the Java-based test cases of your project. This code is compiled into classes by your IDE or build environment. It's organized in main packages, typically one package for [test cases]({{< relref "../about/glossary#test-case-xlt" >}}), one for [flows]({{< relref "../about/glossary#flow-xlt" >}}), one for [actions]({{< relref "../about/glossary#action-xlt" >}}), and one for utility classes. Make sure the compiled classes end up in `project/classes` because this is the directory XLT configures as class path for your test.

### Understanding the Test Scenarios

Since *Posters* is a shop software, our test scenarios cover the typical use of an online shop:

- *Visitor*: A visitor arrives on the homepage, and that's it.
- *Browse*: The visitor arrives on the homepage, then starts browsing some main- and sub-categories and views a random product detail page.
- *Search*: The visitor arrives on the homepage and enters one or more search phrases, then opens the product detail page for one of the search result items.
- *Order*: A user creates an account. Then the visitor will *Browse*, add the shown product to the cart, then enter the checkout process and finally submit the order.

Note that the scenarios (especially the complex *Order* scenario) share some common steps, thus demonstrating how to reuse code across test cases.

## Running Java Test Cases

Before you can run your Java-based test cases, you need to import the sample test suite into your Java IDE.

### Importing the *Posters* Test Suite into Eclipse

Clone the demo test suite from [Github](https://github.com/Xceptance/posters-simple-loadtest-suite) to a local directory, e.g. `<posters-simple-loadtest-suite>`. After starting Eclipse and creating a workspace, do the following:

- Open the import dialog (*File* > *Import* > *Maven* > *Existing Maven Projects*).
- Select the root directory to search in and point to `<posters-simple-loadtest-suite>`.
- Select the test suite project's `pom.xml`.
- Click *Finish*.

The imported project has dependencies on the libraries of XLT. These should be added with the first automatic build, but if you still see build errors, right-clicking on the project and selecting `Maven > Update Project` might help. Eclipse shouldn't report any build problems if configured properly.

{{% note notitle %}}
Users of other IDEs may have to follow similar steps and can check out the guides for [IntelliJ](../../how-tos/intellij-test-run/) and [Visual Studio Code](../../how-tos/vs-code-test-run) as well.
{{% /note %}}

### Executing Java Test Cases in Eclipse

Any Java test case can be directly run in Eclipse in headless browser mode. Go to package `com.xceptance.xlt.samples.tests`, select the test case class (e.g. `TSearch`), and run it as JUnit test via the Eclipse class file context menu. Per default, the test cases will run against the [demo application]({{< relref "demo-application" >}}) you started already (if you modified the ports there, you might have to change them in `<project>/config/project.properties` accordingly, just look for the property `store-url`).
