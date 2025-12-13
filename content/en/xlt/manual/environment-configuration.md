---
title: "Load Test Environment Configuration"

weight: 490
type: docs

description: >
  All properties for controlling the load and performance test environment.
---
XLT uses Java properties files to configure its components and your [load test suite]({{< relref "test-suite-configuration" >}}
). Typically, a distributed load generation environment is required to generate enough load. This requires a cluster of test machines. Don’t worry, it is also possible to generate low load without any remote machines. In any case, before you can start a test you need to configure the XLT load generation environment as outlined below.

These property files are used to configure the main components of the XLT load generation runtime:

- `<XLT>/config/agentcontroller.properties` - [Agent Controller Configuration]({{< relref "#agentcontroller-configuration" >}})
- `<XLT>/config/mastercontroller.properties` - [Master Controller Configuration]({{< relref "#mastercontroller-configuration" >}})

## Agentcontroller Configuration

In the agentcontroller configuration file, you define these properties:

### Port Number

The port the agentcontroller is listening on. The default is 8500. You can pick any free port number, but make sure that the corresponding mastercontroller entry matches. Also ensure that the firewall rules allow unrestricted communication. The used protocol is HTTPS. If you want to run more than one agent controller per machine, all controllers have to use different port numbers.

```bash
com.xceptance.xlt.agentcontroller.port = <portnumber>
```

### Key Store Credentials

The credentials your key store is encrypted with. You only need to change this if your Java key store password has been modified from the default.

```bash
com.xceptance.xlt.agentcontroller.keystore.password = <password>
com.xceptance.xlt.agentcontroller.keystore.key.password = <password>
```

### Allow Agentcontroller to be Bound to a Specific Host

Sometimes it might be necessary to force the agentcontroller to listen
on a specific network interface instead of all available interfaces. To
accomplish this, it is possible to configure the agent controller’s
host (either by name or by IP):

```bash
com.xceptance.xlt.agentcontroller.host = myhost.domain.com
```

### Relocating the Agent Directory

The agent root directory, which is `<xlt>/agent` by default, can be changed by setting the corresponding property. It is unlikely that you have to use this option.

```bash
## The directory where the separate agent directories are located.
## Defaults to: <XLT_HOME>/agent  
com.xceptance.xlt.agentcontroller.agentsdir = /my_agents_dir
```

### Agentcontroller Logging

The properties below configure the agent controller logging. They only affect the agentcontroller output and don't alter the logging of your test code. Most of the time, no modifications are required.

```bash
log4j.rootLogger = warn, console, file
log4j.appender.console = org.apache.log4j.ConsoleAppender
log4j.appender.console.layout = org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern = [%d{HH:mm:ss,SSS}] %-5p [%t] - %m%n
```

Also see [Apache Log4j API Docs](http://logging.apache.org/log4j/1.2/apidocs/index.html) for more information on log4j settings.

### Configuration via Command Line

The agentcontroller is also fully configurable via command line parameters. Any setting contained in `<xlt>/config/agentcontroller.properties` can also be specified on the agentcontroller’s command line using the `-Dkey=value` syntax, which matches the Java system property argument:

```bash
./agentcontroller.sh -Dcom.xceptance.xlt.agentcontroller.port=8501
```

This also works when running the mastercontroller with an embedded agent controller. Simply pass the agentcontroller properties on to the mastercontroller’s command line. Note that parameters passed on at the command line will override the respective settings in the agentcontroller’s properties file.

## Mastercontroller Configuration

In the mastercontroller configuration file, you can define these properties:

### Test Suite Location

To determine the test suite you want to use, you need to specify its location either as absolute path (e.g. `/home/test/suite`) or relative to your XLT installation (`../suite`). It will be uploaded by the mastercontroller to all agentscontrollers later on.

```bash
com.xceptance.xlt.mastercontroller.testSuitePath = <location>
```

{{% note title="MS Windows and \ " %}}
When running the load test on and from Windows, make sure to use the correct encoding for backslashes. The property file format uses backslashes to quote other special characters. Therefore, you have to quote the backslash with an additional backslash to ensure its original meaning, e.g. `c:\\test\\mysuite`.

See the Java property file syntax for more information.
{{% /note %}}

### Update Interval

This property defines how often the mastercontroller prints the status of the currently running test to the console:

```bash
com.xceptance.xlt.mastercontroller.ui.status.updateInterval = <time in seconds>
```

Don't set this value too low because when you have many agentcontrollers running, it takes time to retrieve the status.

### Status Display

Status information can be optionally very detailed. If set to _false_, status information will be aggregated into one line per user type. It is recommended to keep it set to _false_ to avoid that too much information is presented. Being a display property, it doesn't change the data collection.

```bash
com.xceptance.xlt.mastercontroller.ui.status.detailedList = <true/false>
```

### Agentcontrollers

This property lists the urls of the agentcontrollers you want the mastercontroller to use:

```bash
com.xceptance.xlt.mastercontroller.agentcontrollers.<id>.url = <url>
com.xceptance.xlt.mastercontroller.agentcontrollers.<id>.weight = <weight>
com.xceptance.xlt.mastercontroller.agentcontrollers.<id>.agents = <count>
com.xceptance.xlt.mastercontroller.agentcontrollers.<id>.clientPerformance = <true|false>
```

You can use any name for the `<id>` part of the property. It is recommended to resort to name and number combinations, such as _ac1_ for the first agent controller or _blade01-02_ for the second agent controller on the first blade. Make sure the agent controller IDs differ from each other because otherwise a later entry in the file will overwrite the previous one. Avoid dots and spaces.

To simultaneously use load machines with different power in one cluster, you can specify a `weight` for each agentcontroller (defaults to 1 if not set). This value influences the automatic distribution of virtual users across the load machines. A machine with a weight of 3 gets 3 times the load of a machine with a weight of 1.

```bash
com.xceptance.xlt.mastercontroller.agentcontrollers.ac1.url = https://host1:8500
com.xceptance.xlt.mastercontroller.agentcontrollers.ac1.weight = 1
com.xceptance.xlt.mastercontroller.agentcontrollers.ac2.url = https://host2:8500
com.xceptance.xlt.mastercontroller.agentcontrollers.ac2.weight = 3
```

By default, an agent controller spawns one agent process to generate the load. Depending on your code, the data requirements, and the scale might require more agents (aka JVM processes) per agentcontroller and hence per machine. Use the `agents` property to change the count.

{{% warning title="Memory Requirements" %}}
Each agent will use the arguments of the `jvmargs.cfg` file from your test suite. Make sure that the machine can host the amount of agents and their respective memory configuration. Leave room for the OS as well.
{{% /warning %}}

In case the configured agentcontroller is capable of running client-performance tests, you can set the property `clientPerformance` to `true`. Otherwise, ignore this completely or set it to `false`.

The default values for both the `weight` and `agents` properties can be redefined with the following properties:

```bash
com.xceptance.xlt.mastercontroller.agentcontrollers.default.weight = 2
com.xceptance.xlt.mastercontroller.agentcontrollers.default.agents = 4
```

### Ignore Unreachable Agentcontrollers

By default, if the master controller is not able to establish a connection to _all_ configured agent controllers when starting a load test, the test is aborted. This can be impractical (especially for automated/unattended load tests).

How the master controller should handle such a situation can be configured using the `:ignoreUnreachableAgentControllers`property. When set to true, the mastercontroller ignore failing connections when uploading and starting a test as well as when downloading results.

```bash
com.xceptance.xlt.mastercontroller.ignoreUnreachableAgentControllers = true
```

This setting can also be specified on the command line:

```bash
./mastercontroller.sh -auto \
    -Dcom.xceptance.xlt.mastercontroller.ignoreUnreachableAgentControllers=true
```

Note that this setting only has an effect when running the master controller in [non-interactive mode]({{< relref "test-execution/#auto-mode" >}}) (i.e. when started with `-auto`).

### Parallel Communication with Remote Agentcontrollers

Any communication between the mastercontroller and all its remote agentcontrollers is performed in parallel to speed up management of larger test clusters. This includes uploading the test suite and downloading the test results. Since uploading/downloading stresses the network connection a lot more than simple control commands, the degree of concurrency can be configured. There are two properties available:

```bash
com.xceptance.xlt.mastercontroller.maxParallelUploads = 4
com.xceptance.xlt.mastercontroller.maxParallelDownloads = 8
```

In the given example, the mastercontroller will run at most 4 uploads and 8 downloads concurrently. Configuring different values for upload and download is useful for network connections with an asymmetric inbound/outbound bandwidth. By default, no limits are applied.

Please note that downloading in parallel results also requires more disk performance due to parallel decompression of the results. Limiting the parallel download count can increase the download performance for slow disks such as cloud machine disks.

### Proxy Configuration

When the mastercontroller is required to use an HTTPS proxy for communication, this proxy can be configured by providing the respective settings:

```bash
com.xceptance.xlt.mastercontroller.https.proxy.enabled = true
com.xceptance.xlt.mastercontroller.https.proxy.host = proxy.mydomain.com  
com.xceptance.xlt.mastercontroller.https.proxy.port = 8888  
com.xceptance.xlt.mastercontroller.https.proxy.bypassForHosts =
```

### Mastercontroller Logging

You can set a different logging behavior for the mastercontroller, which helps to investigate problems:

```bash
log4j.rootLogger = debug, file
log4j.appender.console = org.apache.log4j.ConsoleAppender
log4j.appender.console.layout = org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern = [%d{HH:mm:ss,SSS}] %-5p [%t] - %m%n
```

The usual Log4J rules apply here.

### Configuring the Transfer Directory

When uploading a test suite to the agentcontroller or downloading results, XLT uses the system-default temporary directory to store an intermediate file. When the available space for the temporary directory is limited, XLT’s temporary directory location can be changed:

For the agentcontrollers, specify the new directory in `config/agentcontroller.properties`:

```bash
com.xceptance.xlt.agentcontroller.tempdir = /var/tmp/xlt
```

For the mastercontroller, change the setting in `config/mastercontroller.properties`:

```bash
com.xceptance.xlt.mastercontroller.tempdir = /var/tmp/xlt
```
