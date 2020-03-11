---
title: "Properties"

weight: 480
type: docs

description: >
  All properties listed and document to control load and performance tests.
---

Typically, a distributed load generation environment is needed to generate enough load. This requires a cluster of test machines. Before you can start the load test, configure both the XLT load generation environment and your test suite as outlined below. These property files are used to configure the main components of the XLT load generation runtime:

- `<XLT>/config/agentcontroller.properties` - [Agent Controller Configuration](#agent-controller-configuration)
- `<XLT>/config/mastercontroller.properties` - [Master Controller Configuration](#master-controller-configuration)

The test suite itself is configured independently from the master controller. The sections below outline the settings relevant to load testing, as contained in these property files:

- `<testsuite>/config/default.properties` - [Default Configuration](#default-configuration)
- `<testsuite>/config/project.properties` - [Test Project Configuration](#test-project-configuration)
- `<testsuite>/config/test.properties` - [Load Test Profile Configuration](#load-test-profile-configuration)

{{< TODO >}}Load Models? Load Environment?{{< /TODO >}}

## Agent Controller Configuration

Inside the agent controller configuration file, you can define these properties:

### Port Number

Port number the agent controller is listening on. Default is 8500. You can pick any free port number, but make sure that the corresponding master controller entry matches that number. Also ensure that the firewall rules in place allow unrestricted communication. The used protocol is HTTPS. If you want to run more than one agent controller per machine, be aware that all controllers have to use different port numbers.

```bash
com.xceptance.xlt.agentcontroller.port = <portnumber>
```

### Key Store Credentials

The credentials your key store is encrypted with. You only need to change this if your Java key store password has been modified from the default.

```bash
com.xceptance.xlt.agentcontroller.keystore.password = <password>
com.xceptance.xlt.agentcontroller.keystore.key.password = <password>
```

### Agent Controller Logging

The properties below serve to configure the agent controller logging facility. They only affect the agent controller output and don't alter the logging of your test code. Most of the time, a modification is not required here.

```bash
log4j.rootLogger = info, console, file
log4j.appender.console = org.apache.log4j.ConsoleAppender
log4j.appender.console.layout = org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern = [%d{HH:mm:ss,SSS}] %-5p [%t] - %m%n
```

Also see [Apache Log4j API Docs](http://logging.apache.org/log4j/1.2/apidocs/index.html) for more information on log4j settings.

## Master Controller Configuration

Inside the master controller configuration file, you can define these properties:

###  Test Suite Location

To determine the test suite you want to use for the load test, you need to specify its location either as absolute path or relative to your XLT installation. It is uploaded to the agent controllers from there.

```bash
com.xceptance.xlt.mastercontroller.testSuitePath = <location>
```

For example:

```bash
com.xceptance.xlt.mastercontroller.testSuitePath = samples/testsuite-posters
```

{{% note notitle %}}
When running the load test on and from Windows, make sure to use the correct encoding for backslashes because the property file format uses backslashes to quote other special characters. Therefore, you have to quote the backslash with an additional backslash to ensure its original meaning, e.g. `c:\\test\\mysuite`.
{{% /note %}}

### Update Interval

Defines how often the master controller prints the status of the currently running load test to the console:

```bash
com.xceptance.xlt.mastercontroller.ui.status.updateInterval = <time in seconds>
```

### Status Display

Whether or not to display detailed status information for each simulated test user. If set to _false_, status information will be aggregated into one line per user type. If you have many test users running, it can be helpful to set it to false because you might get overwhelmed by the amount of information presented otherwise. Being a display property, it doesn't change the data collection but the final data presentation.

```bash
com.xceptance.xlt.mastercontroller.ui.status.detailedList = <true/false>
```

### Agent Controllers

This property lists the locations of the agent controllers you want the master controller to use:

```bash
com.xceptance.xlt.mastercontroller.agentcontrollers.<id>.url = <url>
com.xceptance.xlt.mastercontroller.agentcontrollers.<id>.weight = <weight>
```

You can use any name for the `<id>` part of the property. It is recommended to resort to name and number combinations, such as ac1 for the first agent controller or blade01-02 for the second agent controller on the first blade. Make sure the agent controller IDs differ from each other because otherwise a later entry in the file will overwrite the previous one.

To simultaneously use load machines of different power in a load cluster, you may specify a "weight" for each agent controller (defaults to 1 if not set). This value influences the automatic distribution of virtual users across the load machines. A machine with a weight of 3 gets 3 times the load of a machine with a weight of 1.

```bash
com.xceptance.xlt.mastercontroller.agentcontrollers.ac1.url = https://localhost:8500
com.xceptance.xlt.mastercontroller.agentcontrollers.ac1.weight = 1
com.xceptance.xlt.mastercontroller.agentcontrollers.ac2.url = https://localhost:8501
com.xceptance.xlt.mastercontroller.agentcontrollers.ac2.weight = 3
```

### Master Controller Logging

You can set a different logging behavior for the master controller, which helps to solve problems and provides information in case of support inquiries:

```bash
log4j.rootLogger = debug, file
log4j.appender.console = org.apache.log4j.ConsoleAppender
log4j.appender.console.layout = org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern = [%d{HH:mm:ss,SSS}] %-5p [%t] - %m%n
```

## Default Configuration

### Result Directory Location

Specifies the directory location where you want to store load test results. Normally, there's no need to change it.

```bash
com.xceptance.xlt.result-dir = <directory path>
```

### Error Behavior

Specifies the framework behavior in case of an error, that is whether or not the framework should abort a transaction if any of the following occurs:

* While loading a page - If an HTTP error occurred while loading a page.
* Page resource unavailable - If an HTTP error occurred while loading a resource embedded in a page.
* Java script error - If a JavaScript error occurred.
* Agent termination in case of server errors - Maximum number of errors allowed before an agent terminates, which helps to automatically stop unobserved, long-running test cases in the event of severe error conditions, such as unavailability of the system under test. The number of errors specified here is the error count per running agent controller.

```bash
com.xceptance.xlt.stopTestOnHttpErrors.page = <true/false>
com.xceptance.xlt.stopTestOnHttpErrors.embedded = <true/false>
com.xceptance.xlt.stopTestOnJavaScriptErrors = <true/false>
com.xceptance.xlt.maxErrors = <number of errors per agent controller>
```

### Think Times

To specify the think time between two subsequent actions or transactions, use the properties below. If a random think time is needed, set the appropriate deviation to a value greater than 0. It specifies the maximum deviation from think time in milliseconds. The respective value is added to or subtracted from the think time using a pseudo-random, uniform distribution.

```bash
com.xceptance.xlt.thinktime.action = <time in [ms]>
com.xceptance.xlt.thinktime.action.deviation = <time in [ms]>
com.xceptance.xlt.thinktime.transaction = <time in [ms]>
com.xceptance.xlt.thinktime.transaction.deviation = <time in [ms]>
```

The think time configuration might look like this, for instance:

```bash
com.xceptance.xlt.thinktime.action = 100
com.xceptance.xlt.thinktime.action.deviation = 50
com.xceptance.xlt.thinktime.transaction = 0
com.xceptance.xlt.thinktime.transaction.deviation = 0
```

This sets the action think times between 50 and 150ms and no transaction think time whatsoever.

{{% note notitle %}}
Note that the deviation has to be smaller than the specified base think time.
{{% /note %}}

## Test Project Configuration

To configure your test project, edit the file `project.properties`.

### Test Properties File

XLT permits to prepare and use multiple `test.properties` files for easy maintenance of test setups. This facilitates switching between test setups and prevents configuration errors. This property doesn't allow the use of a path-specific file name. The test definition files reside in the same directory as the `project.properties` file.

```bash
com.xceptance.xlt.testPropertiesFile = <filename>.properties
```

### Test Class Mapping

Specifies which test IDs should be used by XLT and, more specifically, which test ID uses which test case implementation. That's why you have to specify the fully qualified class names of your tests here. Note that you can map the same class to multiple load test names if needed. This is extremely useful when you want to run the same test case in different configurations.

```bash
com.xceptance.xlt.loadtests.<name>.class = <fully qualified class name>
```

A test class mapping might look like this:

```bash
com.xceptance.xlt.loadtests.TVisitor.class = com.xceptance.xlt.samples.tests.TVisitor
com.xceptance.xlt.loadtests.TJSVisitor.class = com.xceptance.xlt.samples.tests.TJSVisitor
```

### Test Class-Specific Settings

You can define project-wide settings that are test case-specific but not test run-specific by using the following syntax:

```bash
<fully-qualified class name>.<property-name> = <value>
```

For example:

```bash
com.xceptance.xlt.samples.tests.shop-url = http://localhost:8080/posters/
com.xceptance.xlt.samples.tests.TAuthor.username = username
com.xceptance.xlt.samples.tests.TAuthor.password = password
com.xceptance.xlt.samples.tests.webdriver.TAuthor.write-count = 2
```

## Load Test Profile Configuration

You can also configure an (optional) property file containing the settings specific to a certain load test run. You may define more than one test property file, such as `test-target-load.properties` and `test-2x-target-load.properties`. This way, many configurations can be defined and prepared in advance and used as needed. You switch between these files by changing the property `com.xceptance.xlt.testPropertiesFile` in the `project.properties` file.

Load test profile configurations are done inside your test property file, which is named `test.properties` by default. Using the syntax below, you can define test ID, the number of virtual users, and all other load test-specific settings of tests meant to run in parallel agents:

```bash
com.xceptance.xlt.loadtests.<testID>.<setting> = <value>
```

For `<testID>`, use any appropriate name. The following table lists all supported values for `<setting>`; required settings are displayed in bold face:

| Setting  | Description |
| ------- | ------ |
| **class** | Fully qualified class name of the test case (REQUIRED if not specified in project.properties) |
| **users** |Number of threads that run the test in parallel (REQUIRED), may be a load function |
|iterations|Number of iterations per thread|
|arrivalRate|Number of transactions per hour, may be a load function|
|initialDelay|Number of seconds to wait at the beginning|
|warmUpPeriod|Number of seconds to run without performing measurements|
|**measurementPeriod**|Number of seconds to perform measurements (REQUIRED)|
|shutdownPeriod|Number of seconds to continue without performing measurements|
|rampUpPeriod|Number of seconds to steadily increase the configured load parameter|
|rampUpStepSize|Value to step-wise increase the configured load parameter during ramp-up|
|rampUpSteadyPeriod|Number of seconds between ramp-up steps|
|rampUpInitialValue|Initial load when starting ramp-up|
|loadFactor|A factor to be applied to users (and arrivalRate if defined). Use this value to scale the load up/down.|

A sample load profile configuration is given below:

```bash
com.xceptance.xlt.loadtests = TAuthor
com.xceptance.xlt.loadtests.TAuthor.users = 5
com.xceptance.xlt.loadtests.TAuthor.iterations = 100
com.xceptance.xlt.loadtests.TAuthor.arrivalRate = 3600
com.xceptance.xlt.loadtests.TAuthor.initialDelay = 0
com.xceptance.xlt.loadtests.TAuthor.warmUpPeriod = 30s
com.xceptance.xlt.loadtests.TAuthor.measurementPeriod = 10m 0s
```

All time period values can be specified in one of the following formats (without quotes):

- total number of seconds: '1234s' or '1234'
- natural style: '0h 12m 0s', '0h 12m', '12m 0s', or '12m'
- digit style: '1:23', '01:23', '0:1:23', or '0:01:23'

If you want to run several test cases simultaneously, specify the test case names as value for the property `com.xceptance.xlt.loadtests` in form of a space-separated list:

```bash
com.xceptance.xlt.loadtests = TAuthor TVisitor TCrawler
com.xceptance.xlt.loadtests.TAuthor.users = 5
com.xceptance.xlt.loadtests.TVisitor.users = 3
com.xceptance.xlt.loadtests.TCrawler.users = 4
```

### Sample Configurations

_User Count Model With Constant Load Profile_

```bash
com.xceptance.xlt.loadtests.TAuthor.users = 5
```

Runs exactly 5 users right from the beginning.

_User Count Model With Ramp-Up Load Profile_

```bash
com.xceptance.xlt.loadtests.TAuthor.users = 50
com.xceptance.xlt.loadtests.TAuthor.rampUpInitialValue = 10
com.xceptance.xlt.loadtests.TAuthor.rampUpPeriod = 5m
```

Runs exactly 50 users, but ramps up the user count from 10 to 50 over a period of 5 minutes.

_User Count Model With Variable Load Profile_

```bash
com.xceptance.xlt.loadtests.TAuthor.users = 0/5, 1h/50, 2h/50, 2h/100, 3h/20
```

Runs the TAuthor scenario with a variable number of concurrent users (5&nbsp;&rarr;&nbsp;50&nbsp;&rarr;&nbsp;100&nbsp;&rarr;&nbsp;20).

_Arrival Rate Model With Constant Load Profile_

```bash
com.xceptance.xlt.loadtests.TAuthor.users = 5
com.xceptance.xlt.loadtests.TAuthor.arrivalRate = 100
```

Runs the TAuthor scenario exactly 100 times per hour with at most 5 concurrent users.

_Arrival Rate Model With Ramp-Up Load Profile_

```bash
com.xceptance.xlt.loadtests.TAuthor.users = 5
com.xceptance.xlt.loadtests.TAuthor.arrivalRate = 100
com.xceptance.xlt.loadtests.TAuthor.rampUpInitialValue = 50
com.xceptance.xlt.loadtests.TAuthor.rampUpSteadyPeriod = 1m
com.xceptance.xlt.loadtests.TAuthor.rampUpStepSize = 10
```

Runs the TAuthor scenario exactly 100 times per hour with at most 5 concurrent users, but starts with an arrival rate of 50 per hour and increases it by 10 every minute until the target level of 100 is reached.

_Arrival Rate Model With Variable Load Profile_

```bash
com.xceptance.xlt.loadtests.TAuthor.users = 5
com.xceptance.xlt.loadtests.TAuthor.arrivalRate = 0/50, 1h/100, 2h/200, 3h/150
```

Runs the TAuthor scenario with a variable arrival rate (50&nbsp;&rarr;&nbsp;100&nbsp;&rarr;&nbsp;200&nbsp;&rarr;&nbsp;150) and with at most 5 concurrent users.

_Arrival Rate Model With Ramp-Up Load Profile and Load Factor_

```bash
com.xceptance.xlt.loadtests.TAuthor.users = 5
com.xceptance.xlt.loadtests.TAuthor.arrivalRate = 100
com.xceptance.xlt.loadtests.TAuthor.rampUpPeriod = 5m
com.xceptance.xlt.loadtests.TAuthor.loadFactor = 2.4
```

Runs the TAuthor scenario exactly 240 times per hour with at most 12 concurrent users, but ramps up the arrival rate from 1/h to 240/h over a period of 5 minutes.


