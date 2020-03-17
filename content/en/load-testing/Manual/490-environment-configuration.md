---
title: "Load Test Environment Configuration"

weight: 490
type: docs

description: >
  All properties listed and documented to control the load and performance test environment.
---

XLT uses Java properties files to configure the main components of the load generation environment and your [load test suite](../460-test-suite-configuration/). Typically, a distributed load generation environment is needed to generate enough load. This requires a cluster of test machines. Don’t worry, it is also possible to generate low load without any remote machines. In any case, before you can start the load test you need to configure the XLT load generation environment as outlined below. These property files are used to configure the main components of the XLT load generation runtime:

- `<XLT>/config/agentcontroller.properties` - [Agent Controller Configuration](#agent-controller-configuration)
- `<XLT>/config/mastercontroller.properties` - [Master Controller Configuration](#master-controller-configuration)

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