---
title: "Test Execution"

weight: 310
type: docs

description: >
  How to configure and execute tests using the Mastercontroller.
---
## Motivation

This chapter explains the setup of a base test environment and how to configure the components of XLT correctly. Please ensure you have read the [Architecture]({{< relref "30-architecture" >}}) guide first. You should also have created a test suite by now (see [Test Development](../060-test-development)) and likely configured a first test (see [Test Setup](../300-test-setup)).

The setup of the environment and execution of a test consists of the following steps:

1. Starting the agentcontrollers,
1. Configuring the mastercontroller,
1. Running the test.

### Environments

As a quick reminder, XLT can be deployed in different ways. 

#### Local and Embedded
When the mastercontroller brings up an agentcontroller as part of the test automatically, we call that embedded mode. This is mostly suitable for development and very small tests, such as dry-runs or single user validations.

It is not a must that this runs on a local machine, but it is rather typical.

#### Local
You can start one or more agentcontrollers locally and connect your mastercontroller to them. This is similar to the embedded mode but the agentcontroller startup was manual. This can be used for small tests or verification of the XLT installation or setup in general.

You can also start agentcontrollers manually on remote machines, if you like.

#### Remote and Distributed
This is the most typical XLT deployment. There are many agentcontrollers available and already started and configured, you only have to tell your mastercontroller which of these should take part in the next load test run.

The remote machines can be in the cloud, in your own datacenter, machines under your table, or all together.


## Starting the Agentcontroller

For local execution at small scale or dry-runs, you can run the agentcontroller and hence the agents locally. To start the agent controllers manually, open a command line window/console and type the following commands:

```dos
cd <XLT>/bin
./agentcontroller.sh
```

{{% note title="Microsoft Windows" %}}
Windows users have to use the respective `.cmd` files. The documentation will not highlight this difference all the time and mostly use UNIX path and file name references.
{{% /note %}}

The agent controller starts and listens on the specified port. With default logging enabled (WARN), no messages are printed during the agentcontroller startup. When [info logging is enabled](../490-environment-configuration/#agent-controller-logging), the output might look like this:

```dos
[15:00:51,452] INFO  [main] - start servlet
[15:00:51,509] INFO  [main] - Logging initialized @946ms to org.eclipse.jetty.util.log.Slf4jLog
[15:00:51,665] INFO  [main] - jetty-9.4.35.v20201120; built: 2020-11-20T21:17:03.964Z; git: bdc54f03a5e0a7e280fab27f55c3c75ee8da89fb; jvm 11.0.8+10
[15:00:51,736] INFO  [main] - DefaultSessionIdManager workerName=node0
[15:00:51,736] INFO  [main] - No SessionScavenger set, using defaults
[15:00:51,740] INFO  [main] - node0 Scavenging every 600000ms
[15:00:51,810] INFO  [main] - Started o.e.j.s.ServletContextHandler@764faa6{/,null,AVAILABLE}
[15:00:51,858] INFO  [main] - x509=X509@34a875b3(xlt,h=[],w=[]) for SslContextFactory@4748a0f9[provider=null,keyStore=file:///home/rschwietzke/projects/loadtest/xlt-5.3.0/config/keystore,trustStore=null]
[15:00:52,017] INFO  [main] - Started ServerConnector@7b4c50bc{SSL, (ssl, http/1.1)}{0.0.0.0:8500}
[15:00:52,018] INFO  [main] - Started @1459ms
```

## Configuring the Mastercontroller

The mastercontroller requires information about the machines participating in this test (except when in [embedded mode](#embedded-mode) where the mastercontroller starts its own agentcontroller). For that you need to add all agentcontroller URLs to `<XLT>/config/mastercontroller.properties`.

```bash
com.xceptance.xlt.mastercontroller.agentcontrollers.<id>.url = <url>
```

For `<id>` use a proper name such as agent-1 or GCP-NA-West-2. Don't use dots (`.`) or spaces in the name. The url points to the agentcontroller running on that machine including its port. The standard port is 8500. Make sure you have the firewall configuration adjusted to allow https traffic on that port.

A typical configuration for three machines might look like that:

```bash
com.xceptance.xlt.mastercontroller.agentcontrollers.west-01.url = https://34.11.22.41:8500
com.xceptance.xlt.mastercontroller.agentcontrollers.east-01.url = https://load1.com:8500
com.xceptance.xlt.mastercontroller.agentcontrollers.north-01.url = https://191.21.22.1:8500
```

{{% note notitle %}}
Because you can later optionally also filter your report by agent names, make sure your names are "speaking" if they are different enough to possibly yield different results. This could be, for instance, a different provider or geographical location.
{{% /note %}}

For more information on configuration options for agentcontrollers, see [Environment Configuration](../490-environment-configuration/#agent-controllers).

## Running the Mastercontroller

You can use the mastercontroller in three different ways, depending on how you want to execute the test:

* **Interactive mode**: all steps are performed manually,
* **Auto mode**: a load test is executed automatically and the required steps are automatically performed,
* **Scripted commands**: a set of given commands is executed to allow fine-grained control of the automated execution.

Each of the modes can be either executed with a set of configured agentcontrollers or using the embedded and automatically started agentcontroller (embedded mode).

{{% note notitle %}}
Before starting the mastercontroller, make sure all agentcontrollers are running on all load test machines. The mastercontroller cannot be started if the configured agentcontrollers aren't running or reachable. 

Also check that the test suite has been compiled successfully to avoid errors when starting the test.
{{% /note %}}

### Interactive Mode

To start the mastercontroller in interactive mode, use these commands:

```bash
cd <XLT>/bin
./mastercontroller.sh
```
A screen appears that displays the command line menu as shown below:

```
Xceptance LoadTest 5.2.0
Copyright (c) 2005-2020 Xceptance Software Technologies GmbH. All rights reserved.
XLT is Open Source and available under the Apache License 2.0.

Checking for agent controller reachability and XLT version conflicts ... OK

-----------------------------------------------
 What do you want to do?
-----------------------------------------------
 (u) Upload test suite
 (s) Start test
 (r) Report test status
 (d) Download test results
 (c) Create test report
 (a) Abort test
 (p) Ping agent controllers
 (i) Show agent controller information
 (q) Quit
=> 
```

The following options are available:

* **Upload test suite (u)**: Uploads your test suite (code, data, and configuration) to all agentcontrollers. This is required at the beginning and each time you've modified your test suite. To speed up testing, XLT will only upload files that have been modified.

* **Start test (s)**: All agent controllers will receive a start command to spin off one or more agents (depending on configuration) executing the configured tests. This starts the load test.

* **Show status report (r)**: Displays the current status of the load agents. Depending on the configuration, either a short summary (per test case) or a detailed list (per test user) is shown. In either case you get information about:
    * the name of test cases being executed,
    * the number of user running,
    * execution count of each test case,
    * average runtime of each test case,
    * events and errors counts, and
    * the overall progress.

* **Download test results (d)**: Downloads log and measurement information from all agentcontrollers. A submenu will appear where you can choose the amount of data to be downloaded. The files are saved to a newly created directory at the location specified in `default.properties`. By default, the result directory is set to `<XLT>/results`. The new directory name is the current timestamp, for example: `20190501-161718`.

* **Create report (c)**: Generates a test report of the last downloaded results.

* **Abort test (a)**: Terminates a running load test.

* **Ping agent controllers (p)**: Pings all agent controllers to check reachability.

* **Show agent controller information (i)**: Displays information about the configured agentcontrollers such as XLT, Java, and system status). If a test suite has already been uploaded, it displays an overview of the configured load profile too, e.g.:
```
-------------------------------------------------------------------------------
Test Case | Arrival Rate [eff] | Users [eff] | Load Factor | Measurement Period
-------------------------------------------------------------------------------
TVisit    |                n/a |       1..20 |         n/a |            0:10:00
-------------------------------------------------------------------------------
                             0 |          20 |         n/a |            0:10:00
```

* **Quit (q)**: Exits the mastercontroller and closes its connections to the agentcontrollers. Note that this will _not_ stop a running load test. The agents continue to execute the test until the test finished. To regain control, reconnect to the test cluster by restarting the mastercontroller.

As soon as you've chosen an option (by pressing the associated key followed by {{< kbd >}}Enter{{< /kbd >}}), the appropriate action is executed.

A typical usage scenario for a test execution is reflected in menu ordering of the mastercontroller:

1. `u` Upload the test suite
1. `i` Check the agentcontroller/test setup
1. `s` Start the test
1. `r` Check the status
1. `d` Download the test results
1. `c` Create a report of the downloaded results
1. `q` Quit the mastercontroller

### Auto Mode

As outlined in the previous sections, there is a typical sequence of steps to be executed when running a load test. It may become tedious and error-prone to type the necessary keys over and over again. XLT provides another operating mode to automate this - the _auto_ mode. All the steps mentioned above are executed automatically without requiring any user interaction.

```bash
cd <XLT>/bin
./mastercontroller.sh -auto
```

When the test suite is uploaded and the test has started successfully, XLT automatically refreshes the agent status until the test has finished. The results are downloaded when the test finishes.

Using the optional option `-report`, a test report will be automatically generated after the results have been downloaded.

```bash
cd <XLT>/bin
./mastercontroller.sh -auto -report
```

See below for what the screen displays in _auto_ mode:

```cmd
Xceptance LoadTest 5.2.0
Copyright (c) 2005-2020 Xceptance Software Technologies GmbH. All rights reserved.
XLT is Open Source and available under the Apache License 2.0.

Uploading test suite ...
    0% ... 10% ... 20% ... 30% ... 40% ... 50% ... 60% ... 70% ... 80% ... 100% - OK

Starting agents ...
     0% ... 100% - OK

Test Case       State         Running Users   Iterations   Last Time   Avg. Time   Total Time      Events   Errors   Progress
-------------   --------   ----------------   ----------   ---------   ---------   ----------   ---------   ------   --------
TAddToCart      Running        10 of     10            0      0,00 s      0,00 s      0:00:00           0        0         0%
TCreateUser     Running        10 of     10            1      0,72 s      0,72 s      0:00:01           0        0         0%

Test Case       State         Running Users   Iterations   Last Time   Avg. Time   Total Time      Events   Errors   Progress
-------------   --------   ----------------   ----------   ---------   ---------   ----------   ---------   ------   --------
TAddToCart      Running        10 of     10           55      0,70 s      1,03 s      0:00:06           0        0         5%
TCreateUser     Running        10 of     10           83      0,95 s      0,67 s      0:00:06           0       17         5%
.
.
.
Test Case       State         Running Users   Iterations   Last Time   Avg. Time   Total Time      Events   Errors   Progress
-------------   --------   ----------------   ----------   ---------   ---------   ----------   ---------   ------   --------
TAddToCart      Running        10 of     10        1.412      0,66 s      0,68 s      0:01:37           0        0        96%
TCreateUser     Running        10 of     10        1.525      0,91 s      0,63 s      0:01:37           0      316        96%

Test Case       State         Running Users   Iterations   Last Time   Avg. Time   Total Time      Events   Errors   Progress
-------------   --------   ----------------   ----------   ---------   ---------   ----------   ---------   ------   --------
TAddToCart      Finished        0 of     10        1.476      1,17 s      0,68 s      0:01:40           0        0       100%
TCreateUser     Finished        0 of     10        1.590      0,79 s      0,63 s      0:01:41           0      325       100%

Downloading test results ... (Please be patient, this might take a while)
    0% ... 30% ... 60% ... 100% - OK
```

To abort the test prematurely, press {{< kbd >}}Ctrl{{< /kbd >}}+{{< kbd >}}C{{< /kbd >}} to terminate the mastercontroller. This terminates all running agents and triggers the download of all captured data. 

{{% warning %}}
You cannot disconnect the mastercontroller from the test cluster in this mode while keeping the test running. This only works when you run in interactive mode.

For long-running tests, it is recommended to run the test without the `-auto` option. This makes it possible to disconnect from the test cluster without terminating the test and prevents accidental test termination.
{{% /warning %}}

### Non-Interactive Mode (Scripted Commands)

In order to better fit into highly-automated environments, XLT 5.2.1 improved the mastercontroller in order to ease scripting. With the command line option `-c <commandList>` (or `--commands <commandList>`) you can specify which commands the mastercontroller should execute on your behalf. This way, typical use cases can be scripted quite easily:

* upload the test suite and start the load test (`mastercontroller.sh -c upload,start`)
* download the results of a running load test and generate a report from them (`mastercontroller.sh -c download,report`)
* abort a running load test (`mastercontroller.sh -c abort`)
* abort a running load test, download the final results, and generate a report (`mastercontroller.sh -c abort,download,report`)

{{% warning notitle %}}
Please note that the mastercontroller executes the commands exactly as specified on the command line. It does not run any validation if this makes sense at all.
{{% /warning %}}

#### Downloads in Non-Interactive Mode

Per default, the command `download` always downloads the results completely. However, sometimes you might want to skip certain artifacts, to save disk space and download time. In the interactive mode, you are able to select what artifacts are to be downloaded by prompt. This is possible in non-interactive mode as well: use the command-line option `--only-download=...` with which you can specify the wanted artifacts. 

Supported artifact types are:

* `measurements` (all the measurements, i.e. the `timers.csv` files)
* `logs` (all log files)
* `resultbrowsers` (all existing result browser directories)

Combine these artifacts types as needed, separated by comma, for example `--only-download=measurements,logs`. Note that you have to specify at least one artifact type. If you don't want to download anything, use the already existing command-line option `-noDownload`.

### Embedded Mode

Both interactive mode and auto mode can be combined with the command line option `-embedded`. It starts the master controller as well as an internal agentcontroller.

This is useful if you want to run load tests without a distributed load test environment. It will start a single agentcontroller as well as the mastercontroller on the same machine. There's no need to manually start an agentcontroller. This option is also recommended when playing around with the [Posters demo](../../quick-start/30-demo-test-suite) for training purposes because it simplifies the process of running a load test.

{{% note notitle %}}
When you use the `-embedded` option, the local agent controller settings will override the set of agent controllers configured in `mastercontroller.properies`.
{{% /note %}}

{{% warning %}}
When you quit the mastercontroller in embedded mode, you terminate the agentcontroller and any running test. You might not be able to recover results easily.
{{% /warning %}}
