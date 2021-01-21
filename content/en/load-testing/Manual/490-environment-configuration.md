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

### Allow Agent Controller to be Bound to a Specific Host

Sometimes it might be necessary to force the agent controller to listen
on a specific network interface instead of all available interfaces. To
accomplish this, it is possible to configure the agent controller’s
host (either by name or by IP):

```bash
com.xceptance.xlt.agentcontroller.host = myhost.domain.com
```

### Relocating the Agent Directory

The agents’ root directory, which is `<xlt>/agent` by default, can be relocated to another directory by setting the corresponding property:

```bash
## The directory where the separate agent directories are located.
## Defaults to: <XLT_HOME>/agent  
com.xceptance.xlt.agentcontroller.agentsdir = /my_agents_dir
```

### Agent Controller Logging

The properties below serve to configure the agent controller logging facility. They only affect the agent controller output and don't alter the logging of your test code. Most of the time, a modification is not required here.

```bash
log4j.rootLogger = info, console, file
log4j.appender.console = org.apache.log4j.ConsoleAppender
log4j.appender.console.layout = org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern = [%d{HH:mm:ss,SSS}] %-5p [%t] - %m%n
```

Also see <a href="http://logging.apache.org/log4j/1.2/apidocs/index.html" target="_blank">Apache Log4j API Docs</a> for more information on log4j settings.

### Configuration via Command Line

The agent controller is also fully configurable via command line parameters. Any setting contained in `<xlt>/config/agentcontroller.properties` can also be specified on the agent controller’s command line using the `-Dkey=value` syntax:

```bash
> agentcontroller.sh -Dcom.xceptance.xlt.agentcontroller.port=8501
```

This also works when running the master controller with an embedded agent controller. Simply pass the agent controller properties on to the master controller’s command line. Note that parameters passed on at the command line will override the respective settings in the agent controller’s properties file.

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

### Parallel Communication with Remote Agent Controllers

Any communication between the master controller and all its remote agent controllers is done in parallel to speed up managing larger clusters of load machines. This also includes uploading the test suite and downloading the test results. Since uploading/downloading stresses the network connection a lot more than simple control commands, the degree of concurrency can be configured. There are two properties
available for this:

```bash
com.xceptance.xlt.mastercontroller.maxParallelUploads = 4
com.xceptance.xlt.mastercontroller.maxParallelDownloads = 8
```

In the given example, the master controller will run at most 4 uploads and 8 downloads concurrently. Configuring different values for upload and download is useful only for network connections with an asymmetric inbound/outbound bandwidth. By default, no limits are applied.

### Ignoring Unreachable Agent Controllers

By default, if the master controller is not able to establish a connection to *all* configured agent controllers when starting a load test, the load test is aborted by default. This can be annoying (especially for automated/unattended load tests), as in this case there is no load test result at all, although, for example, only one agent controller was temporarily down and the remaining agent controllers could easily have
handled the load.

How the master controller should behave in such a situation can be configured in the `mastercontroller.properties` file, making it start the load test anyway:

```bash
com.xceptance.xlt.mastercontroller.ignoreUnreachableAgentControllers = true
```

This setting can also be specified on the master controller’s command
line:

```bash
./mastercontroller.sh -auto \
-Dcom.xceptance.xlt.mastercontroller.ignoreUnreachableAgentControllers=true
```

Note that this setting is effective only when running the master
controller in *non-interactive* mode (i.e. when started with `-auto`).

### Proxy Configuration

If the master controller is required to use an HTTPS proxy to communicate with its agent controllers, this proxy can be configured by simply providing the respective settings in the `mastercontroller.properties` file:

```bash
com.xceptance.xlt.mastercontroller.https.proxy.enabled = true
com.xceptance.xlt.mastercontroller.https.proxy.host = proxy.mydomain.com  
com.xceptance.xlt.mastercontroller.https.proxy.port = 8888  
com.xceptance.xlt.mastercontroller.https.proxy.bypassForHosts =
```

### Master Controller Logging

You can set a different logging behavior for the master controller, which helps to solve problems and provides information in case of support inquiries:

```bash
log4j.rootLogger = debug, file
log4j.appender.console = org.apache.log4j.ConsoleAppender
log4j.appender.console.layout = org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern = [%d{HH:mm:ss,SSS}] %-5p [%t] - %m%n
```

### Configuring the Transfer Directory 

When uploading a test suite to the agent controllers or downloading test results to the master controller, XLT uses the system-default temporary directory to store a compressed version of the transferred data. Sometimes the available space for the temporary directory is limited, so it might not be able to hold all the data, especially test results. In this case, XLT’s transfer directory can be reconfigured. For the agent controllers, specify the new directory in `config/agentcontroller.properties`:

```bash
com.xceptance.xlt.agentcontroller.tempdir = /var/tmp/xlt
```

The master controller provides a similar setting in `config/mastercontroller.properties`:

```bash
com.xceptance.xlt.mastercontroller.tempdir = /var/tmp/xlt
```