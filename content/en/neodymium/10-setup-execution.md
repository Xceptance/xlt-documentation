---
title: "Setup and Execution"
linkTitle: "Setup and Execution"
weight: 5
type: docs
description: "Basic setup requirements and approaches to run Neodymium tests."
---

This page assembles some basic setup requirements to execute Neodymium tests.
There are several ways to set up an execution environment for Neodymium tests. The section [Setup Neodymium](#setup-neodymium) gives an overview and more details you might have to consider. The following section [Run Neodymium](#run-neodymium) is about potential approaches to run test cases in your Neodymium test automation project.

## Setup Neodymium

You might have read about the [Neodymium-Template](https://github.com/Xceptance/neodymium-template) project. This is a good point to start with. But if you just check it out to the preferred location on your machine it may not execute as expected. This is because your machine might lack some [Basic Setup](#basic-setup).

Once the basic setup is done it is up to your test automation project to specify the browsers you want to run the tests with (see Neodymium's [Multi browser support]({{< relref "quick-start/multibrowser" >}})). Furthermore, all necessary browsers must be installed on the machine that executes the tests.

In case you plan to run tests with browsers that are not available in your standard test execution environment, you may consider to run Neodymium with Selenium Grid.
Please also take a look at the [config/browser.properties](https://github.com/Xceptance/neodymium/blob/master/config/browser.properties) configuration file to know how Neodymium manages browser configurations.

Neodymium doesn't communicate with the browser directly but uses Selenium WebDriver to control and interact with it. For this reason, you will need to prepare your test execution environment as described in the [Project Specific Setup](#project-specific-setup) section.

### Basic Setup

First of all, Neodymium is a Java based software library. Thus, you'll need to have Java installed and properly configured.
Moreover, Neodymium needs to be integrated into the build process of your test automation project.
For this purpose, we recommend [Apache Maven](https://maven.apache.org/), the de-facto standard build and dependency management tool for Java based projects, and show how to configure it for a seamless integration of Neodymium.

1. Install Java:
This depends on the platform you may want to run Neodymium on. So, check if Java can be run on each desired target platform. To determine whether Java is already installed and properly working, just open a terminal and issue the command `java -version`. It should output the Java version information and may contain further product information, e.g. `openjdk version "17.0.10"`.

**Note** Since v5.0.0, Neodymium requires a Java17 runtime environment as minimum. Please also verify that other Java based application dependencies won't become broken by installing Java11 on the target system.
In worst case, you might have to decide to stick at Neodymium v3.6.0 which requires Java8 as minimum or with v4.0.0 which requires Java11.

2. Install Maven:
As already said, we recommend to use Maven as build and dependency management tool. Maven requires Java which is assumed to be in place now. The installation of Maven itself depends on the machine's operating system.

Therefore, check if your operating system already provides an appropriate installation method for Maven. In case you run a Windows box you'll have to install it manually as described in [Installing Apache Maven](http://maven.apache.org/install.html). To determine whether Maven is already installed and properly configured, open a terminal and issue the command `mvn -version`. It should say something like `Apache Maven 3 .. Maven home .. Java version 17 ..`.

3. Install ffmpeg (option):
If you plan to record videos of the test execution using videos (instead of gifs) you'll need to install [ffmpeg](https://ffmpeg.org/) as well.

#### Docker

When using [Docker](https://www.docker.com/) as your build environment, you may consider to use an image that has Java and Maven pre-installed, e.g. `maven:3.6.3-jdk-17` available at [Docker Hub](https://hub.docker.com/).
However, please notice that you may still need to install additional software as described in [Project Specific Setup](#project-specific-setup).

You may also select `markhobson/maven-chrome:jdk-17` docker image if the tests will only be executed in Chrome browser. In this docker container all requirements for Neodymium tests are fulfilled.

### Project Specific Setup

The project specific setup of Neodymium starts with some decisions to be made according to the answers of the following questions:

1. Do you need to execute your tests in browsers on the local (test developer) machine?

- Yes: Okay, then go ahead with [Prepare Local Test Execution](#prepare-local-test-execution).
- No: Then you'll see the test results in the output and report, but can't follow the execution of a local driven browser.

2. Do you aim to execute your tests in browsers - probably running on certain devices - provided on demand by an external service like SauceLabs or Browserstack?

- Yes: Okay, you may have a look at [Prepare External Test Execution](#prepare-external-test-execution) to known how to manage this with Neodymium.
- No: Then Neodymium offers another way.

3. Do you like to execute the tests on browsers not installed on the local(test developer) machine?

- Yes: Okay, please have a look at [Prepare Remote Test Execution](#prepare-remote-test-execution).
- No: Let's see what Neodymium offers in the future.

Of course, you may also mix up all these test execution types; Neodymium gives you the possibility to combine its features to match your needs. And, with the help of Neodymium configuration and browser profiles, you'll be able to control where your tests should run via command line when starting a test run. This is subject of the upcoming section [Run Neodymium](#run-neodymium).

#### Prepare Local Test Execution

In most cases, the test developer is one of those people who need to prepare his machine for test execution with locally installed browsers. This allows to watch the browser executing the test steps and eases investigations needed for test development tasks. However, browsers can also be configured to run headless (without using a display). You might have already encountered this term in `config/browser.properties`. When running Neodymium with a browser in headless mode, you won't be able to watch the execution of the test. But it allows you to continue using your Desktop and to inspect the test result at the end of the run in an automatically opened report.

For local test execution, the desired browsers as well as the corresponding WebDriver binaries need to be installed on the local machine. We strongly recommend to install the appropriate version of the WebDriver binary for the installed browser. For details, see [How to set up a WebDriver]({{< relref "browsers/505-webdriver-setup" >}}).

Paths to WebDriver binaries and browsers are configured in `config/neodymium.properties`. Adjust them according to your local installation paths.

You may then start to declare additional browser profiles along with their properties in `config/browser.properties`. Once done, a browser profile can be referenced in the `@Browser` annotation(s) of your test class as described in [Multi browser support]({{< relref "quick-start/multibrowser" >}}).

Finally, try to run a test with the command below.

```
 mvn clean test allure:serve -Dtest=<NameOfTestClass>
```

**Note**:

- You have to navigate your console to the folder of your test automation project first.
- The `<NameOfTestClass>` is to be replaced with the name of your test class.
- Now, watch the output and the browser starting up doing test case steps as well as the report shown at the end.

#### Prepare External Test Execution

The *External Test Execution* approach is often feasible for test automation projects that require tests to be run on devices which are not available within the (local) test execution environment (e.g. mobile devices). Such projects can use external services (e.g. SauceLabs or TestingBot) providing all these special devices. Usually, those services provide a visual recording of the test execution along with the result of the run. Neodymium provides built-in support for SauceLabs and TestingBot at the moment, but we are open for integrating other services if needed. Just let us know.

To configure external test execution in Neodymium, please follow the instructions described in [Test Environments]({{< relref "configuration/330-test-environments" >}}). There you'll find all needed configurations and preconditions.

#### Prepare Remote Test Execution

Another approach if your local machine does not support all browsers needed for testing would be to execute tests remotely on machines that support such browsers. This can be achieved by setting up a [Selenium Grid](https://www.selenium.dev/documentation/en/grid/). All software necessary to run a Selenium Grid is available [here](https://selenium-release.storage.googleapis.com/index.html).

For example, let's assume you set up several virtual machines hosting a certain browser along with the respective WebDriver binary of course (see [Prepare Local Test Execution](#prepare-local-test-execution) section).
Each virtual machine can then be set up to act as a *Selenium Grid Node* supporting various browsers within a Selenium Grid.

Upon startup of a Selenium Grid Node, its capabilities (including the supported browsers) are announced to the *Selenium Grid Hub* when registering to it. For this reason, the node's capabilities have to be specified in some configuration file that is passed as start parameter (see below).

A configuration for a Selenium Grid Node may like this:

```json
{
  "capabilities":
  [
    {
      "browserName": "internet explorer",
      "version": "11.0",
      "platform": "WIN10",
      "maxInstances": 1,
      "seleniumProtocol": "WebDriver"
    },
    {
      "browserName": "MicrosoftEdge",
      "platform": "WIN10",
      "maxInstances": 1,
      "seleniumProtocol": "WebDriver"
    }
  ],
  "hub": "http://<Selenium Grid Hub IP>:4444",
  "maxSession": 1,
  "role": "node"
}
```

Assuming this configuration is stored to a file named `node-example.config`, the Selenium Grid Node can then be started with

```java
java -jar selenium-server-standalone-3.9.1.jar -role node -nodeConfig node-example.config
```

To control test execution within Selenium Grid, another service must be run: the Selenium Grid Hub.
This service acts as central point where your tests register to be executed and which delegates them to the appropriate node(s). In Neodymium, you only need to configure the connection to the Selenium Grid Hub as well as the browsers available on any of the attached nodes.

Please note that the Selenium Grid Hub must be launched before any Selenium Grid Node. This is usually done by issuing a command like

```java
java -jar selenium-server-standalone-3.9.1.jar -role hub
```

The process started by this command will print some useful information such as node registrations to console.

For further explanation and details, please take a look at [Selenium grid]({{< relref "browsers/450-selenium-grid" >}}) where you'll also find all configurations necessary in Neodymium to run tests in browsers remotely using Selenium Grid.

## Run Neodymium

A precondition to run test cases from within Neodymium is a working setup as described above.

Once, some test cases are developed and ready for execution, questions like the following may come up:

- How to run all or certain test cases?
- How to run all or certain test cases with a specific dataset?
- How to run test cases in browsers with a matching resolution or even only in a specific browser?

The larger the test portfolio becomes the more grows the need for reducing the overall set of tests to those that should be actually run. This meets test development requirements as well as professional inquiries about the quality of a special functional area where you may want to execute test cases selectively in order to get a quick quality statement. With Neodymium you'll be able to find a solution and this section aims to shed some light on this topic.

As you may already know, Neodymium uses the JUnit framework for test execution. So, the simplest way to execute a Neodymium test is: *Run as JUnit test*. And this is also the reason why you can run Neodymium tests in all fashions that exist for running JUnit tests.

The following sections cover the most frequently used techniques taken from in our test automation projects. Feel free to choose from these approaches the one(s) that fit your needs.

### Run in the IDE as JUnit Test

As test developer, you're working with an IDE of your choice most of the time. Here you might launch one test case by selecting the corresponding Java file and go to *Run as JUnit Test*. Usually, such an item is available in the context menu too. Then the test case will start with bringing up a browser doing the test steps. Most IDEs also provide a dedicated view for running JUnit tests that reports the overall results as well as a (more or less) readable output about the failures you might analyze further on.

This is an easy and quick way to run test cases. But if you have the need for running a certain subset of the datasets or browsers annotated to this test case, you have to manually adjust your test case and make sure to revert those changes before checking in new code. In case you want to limit the used datasets and/or browsers you'll have to modify the `@Dataset` and `@Browser` statements on test case or test method level itself.

Test case configuration is another topic noteworthy to mention here. Launching a test case via *Run as JUnit* always takes the current configuration specified in the test suite.
So it is not easy to pass a certain configuration, e.g. the URL for the *system under test*, without making adjustments to the configuration before. But you can use our override mechanism via `dev-[neodymium|browser].properties` to overcome those hurdles as far as possible. Read more about those mechanisms on the following pages: [Neodymium configuration properties]({{< relref "configuration/090-neodymium-properties" >}}) and [Multi browser support]({{< relref "quick-start/multibrowser" >}}).

To sum up, running test cases from within the IDE using *Run as JUnit* is more for test developers who are familiar with the technical details of the test suite and who have the possibility to modify the test project and its configuration.

### Run Sets of Tests using Maven Profiles

As Neodymium is just a library that tightly integrates into the JUnit test framework, it perfectly fits for running JUnit tests using Apache Maven.
This also enables you to configure [Maven Profiles](https://maven.apache.org/guides/introduction/introduction-to-profiles.html) in the project's [POM](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html). You can define as many profiles as needed to execute your tests in context of a certain use case or to separate your test portfolio into different suites.

Test execution can then be started with a specific profile by passing the profile's ID as value to the `-P` option when invoking Maven, e.g. `mvn clean test -P<ID-of-your-profile>`. This way, you can predefine sets of test cases that can be chosen from. Using this it is easy to control which tests are to be run and using the techniques of the following section you can also choose among browsers and data sets.

Inclusion and Exclusion of test cases is quite easy, and you can also maintain lists of test cases to be executed following the instructions listed at [Inclusions and Exclusions of Tests](https://maven.apache.org/surefire/maven-surefire-plugin/examples/inclusion-exclusion.html).

However, this approach does **not** allow to run a test case with a certain dataset or browser because Surefire doesn't allow a configuration using via the `pom.xml` file. Nevertheless, this is a good approach to define fix scopes that contains a set of test cases e.g. a smoke test or a suite containing everything regarding payment methods.

In the next section we want to demonstrate another approach to separate the test cases.

### Run Tests Selectively via Maven Surefire

The larger your test portfolio becomes, the longer it takes to execute the tests and as a consequence the longer you'll have to wait to get your quality statement. There is a strong need to have the chance to execute exactly *those* test cases *with these* datasets using *this* browser at *only these* resolutions. With Neodymium you'll be able to manage this in a quite easy way.

The Maven Surefire plugin allows you to pass a parameter that defines a pattern used to run only the matching test cases as described in [Run Sets of Tests using Maven Profiles](#run-sets-of-tests-using-maven-profiles). For usage examples and further information please take a look at the official documentation of Apache Maven Surefire plugin about [Running a Single Test](https://maven.apache.org/surefire/maven-surefire-plugin/examples/single-test.html).

Due to the way Neodymium treats multiple datasets and browsers, this approach also allows you to filter by certain datasets and/or browsers. Read on to get the details.

On startup, Neodymium checks the test case classes for `@Dataset` and `@Browser` annotations to compute the overall configurations. Each dataset may define a label by using the key `testId` which can then be passed along to the `@Dataset` annotation, e.g. `@Dataset(id = "en_US ReturningCustomer")`. This way it's possible to restrict an entire test class or individual test methods to certain datasets. If you want to utilize this approach  the dataset label should contain any string necessary for grouping and selection, e.g. locale, language, environment or any other key word, that might help to select the test case's dataset. A real-world example for such a label is `DE/de_DE/yellow product with invoice`, used in one of our test automation projects for online shops.
Last but not least, it is always a good idea to put the name of the browser and its resolution into the name of the browser profile. e.g. `firefox_1024x768`, `chrome_1600x1200`. By doing so, it's quite easy to selectively run a test case with a certain browser and/or resolution.

Neodymium computes for each test class the cross product of test methods, browsers profiles and data sets. By doing so, Neodymium creates a unique method name for each combination. The naming scheme looks like this:

```
  <class name>.<method name> :: <dataset label> <dataset index> / <total datasets> :: Browser <browser profile name>
```

Given the following test class, the name of the test case will be expanded to something like this: **regression.T101SearchOrder.channelDE :: DE/de_DE/yellow product with invoice 1 / 39 :: Browser Chrome_1280x1024**.

```java
package regression;

@Browser("Chrome_1280x1024")
@Browser("Firefox_1280x1024")
@Browser("Edge_1280x1024")
// other browser configurations
public class T101SearchOrder extends AbstractTest {

  // split for parallel execution per channel
  @NeodymiumTest
  @Description("search and order a product")
  @DataSet(id = "DE/de_DE/yellow product with invoice")
  // more Datasets
  public void channelDE() throws Throwable {
    test();
  }

  // other channel methods

  // test body
  public void test() throws Throwable {
    // code to execute the search and order
  }
```

As you may notice, the expanded name contains all relevant information:

- the name of the test class - **regression.T101SearchOrder**,
- the name of the test method - **channelDE**,
- the label of the used dataset - **DE/de_DE/yellow product with invoice** and
- the name of the used browser profile - **Chrome_1280x1024**.

Now that we know how Neodymium computes the test execution names, it is quite easy to build a regular expression matching all tests

- whose class name contains `T101` and
- whose method name contains `channelDE` and
- that use a dataset whose label ends with `yellow product with invoice` and
- that are run with a Chrome browser at any resolution.

```
  .*T101.*#.*channelDE.*yellow product with invoice.*Chrome.*
```

**Note:**  The `#` within the regular expression above is a special marker that allows to filter within the method level of the test cases.

According to Maven Surefire documentation about [Running a Single Test](https://maven.apache.org/surefire/maven-surefire-plugin/examples/single-test.html), tests can be selected by setting the property `test` to a proper value when invoking Maven:

```shell
  mvn clean test -Dtest=pattern1[,pattern2,...]
```

As value for this property, pass a comma separated list of patterns that override all include and exclude parameters. Surefire translates each of these patterns internally into an include pattern, or into an exclude pattern in case it is prefixed with a `!`. You can use non-regex and regular expressions patterns. Regular expressions need to be put into a `%regex` clause: `%regex[.*TFOO.*]`.

Using the `-D` command line switch you may also pass any other test parameter that can be configured via property. For example, the URL of the system under test can be configured via property `neodymium.url`, one may reconfigure/override it with `-Dneodymium.url=https://example.org`. More information about passing parameters when using Neodymium can be found in [Neodymium configuration properties]({{< relref "configuration/090-neodymium-properties" >}}).

As you can see, the *Run Tests Selectively via Maven Surefire* approach allows you to run certain test cases, certain datasets, certain browsers and resolutions, and also in combination with other useful parameters like the URL to the system under test.
For example, a test execution for such a scenario would then be launched like this:

```shell
  mvn clean "-Dtest=%regex[.*T101.*#.*channelDE.*yellow product with invoice.*Chrome.*],!%regex[.*attic.*]" "-Dneodymium.url=https://example.org" test allure:serve
```

Please mind that Maven filtering can only be applied for test class and method names but not to the `@Browser` tags or data sets because this data is generated dynamically. If you need to filter tests by these properties, please use the [test filtering configuration in neodymium.properties](https://github.com/Xceptance/neodymium/wiki/Neodymium-configuration-properties#testfiltering-configuration)

Since such command can become long and unhandy it may be helpful to provide a proper shell scripts for them. For example, the script could expect the test case selector as first parameter, and you can add even more parameters to the script that controls test execution with Neodymium to match your needs. Neodymium comes with basic scripts that you might want to re-use and extend to fit your needs.
