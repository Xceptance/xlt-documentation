---
title: "Test Execution"

weight: 310
type: docs

description: >
  The different modes available while executing a test using the MasterController.
---

Running a load test consists of two steps:

1. Starting the agent controllers
1. Using the master controller


## Starting the Agent Controllers

To start the agent controllers, open a command line window/console and type the following command sequence:

```bash
cd <XLT>/bin
./agentcontroller.sh
```

{{% note notitle %}}
Windows users have to use the appropriate `.cmd` file located in the same directory.
{{% /note %}}

The agent controller starts up and listens on the specified port. The output looks like this:

```dos
- Using "C:\Users\AppData\Local\Temp\vfs_cache" as temporary files store.
- Logging to org.slf4j.impl.Log4jLoggerAdapter(org.mortbay.log) via org.mortbay.log.Slf4jLog
- jetty-6.1.19
- Started SslSocketConnector@0.0.0.0:8500
```

Please note that this example demonstrates a local execution. When you want to run larger workloads at scale, you will likely use remote machines with agent controllers already installed and started.

## Running the Master Controller

{{% note notitle %}}
Before starting the master controller, make sure all agent controllers are running on all respective load test machines. The master controller cannot be started if the agent controllers aren't running. Also check that the test suite has been compiled successfully to avoid errors when uploading it.
{{% /note %}}

You can start the master controller in one of the following modes:

* **Interactive mode**: an interactive menu that allows all steps to be performed manually
* **Auto mode**: a load test is started automatically and the appropriate steps are automatically performed
* **Scripted commands**: a set of given commands is executed that allows better control of the automated execution
* **Embedded mode**: this is not a full mode on its own, but rather a way of skipping the manual startup of an agent controller for quicker local testing

### Interactive Mode

To start the master controller in interactive mode, use this command line:

```bash
cd <XLT>/bin
./mastercontroller.sh
```

{{% note notitle %}}
Windows users have to use the appropriate `.cmd` file located in the same directory.
{{% /note %}}

A screen appears that displays the command line menu as shown below:

```dos
Xceptance LoadTest 5.2.0
Copyright (c) 2005-2020 Xceptance Software Technologies GmbH. All rights reserved.
XLT is Open Source and available under the Apache License 2.0.

(u) Upload test suite
(s) Start agents
(a) Abort agents
(r) Show agent status
(d) Download test results
(c) Create load test report
(q) Quit
=>
```

The following options are offered:

* **Upload agent files (u)**: Choose this option to upload your test suite (code, data, and configuration) to all configured agent controllers. This is required at the very beginning and each time you've modified your test suite. XLT will only upload files that have been changed to speed up testing.

* **Start agents (s)**: All agent controllers will receive a start command to spin off an agent executing its configured tests. This effectively starts the load test.

* **Abort agents (a)**: Choose this option to immediately terminate any running load agent.

* **Show agent report (r)**: The current status of the load agents can be monitored by choosing this option. Depending on the configuration, either a short summary (per test case) or a detailed list (per test user) is shown. In either case you get information about:
	* the name of test cases being executed during the load test,
	* how many users are running,
	* how often a test case has been executed so far,
	* how long it took on average to execute the test case,
	* how many events and errors occurred, and
	* the overall progress.

* **Download test results (d)**: Each load agent writes log files and runtime data files. Choose this option to download this data from all configured agent controllers. After entering the _d_ command, a menu will appear where you can choose the amount of data to download. Press 1, 2 or 3 here. The files are saved to a newly created directory at the location specified in `default.properties`. By default, the result directory is set to `<XLT>/results`. The name of the new directory is given by the current date and time, for example: `20190501-161718`.

* **Create report (c)**: Generates a load test report of the last downloaded test results.

* **Quit (q)**: Shuts down the master controller and closes its connections to the agent controllers. Note that this will _not_ stop any running load test. The load agents continue to execute the load test until they have finished. To regain control, reconnect to the test cluster by restarting the master controller.

As soon as you've chosen an option (by pressing the associated key followed by {{< kbd >}}Enter{{< /kbd >}}), the appropriate action is executed. Afterwards, you immediately return to the menu (unless you've chosen to quit, of course).

A typical usage scenario for a load test is reflected by the order of the master controller menu items and might look like this:

1. Upload the test suite (using (u) shortcut)
1. Start the agents (using (s) shortcut)
1. Check the agent status regularly (using (r) shortcut)
1. Download the test results as soon as the test has finished (using (d) shortcut)
1. Create a report of the downloaded results (using (c) shortcut)
1. Quit the master controller (using (q) shortcut)


### Auto Mode

As outlined in the previous sections, there is a typical sequence of steps to be executed when running a load test. It may quickly become tedious and error-prone to type the necessary keys over and over again. To avoid this repetition, XLT provides another operating mode: the _auto_ mode. In this mode, all the steps mentioned above are executed automatically, without any user interaction. To start XLT in this operating mode, use the following command line:

Unix-based systems:

```bash
cd <XLT>/bin
./mastercontroller.sh -auto
```

Windows:

```cmd
cd <XLT>\bin
mastercontroller.cmd -auto
```

If the test suite files were uploaded and the load agents started successfully, XLT automatically refreshes the agent status on a regular basis. As soon as the test has finished, the test results are downloaded and XLT quits.

If the command is followed by the option `-report`, a load test and performance report will be automatically generated after the test has finished and the results have been downloaded.

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

To abort the test prematurely, press {{< kbd >}}Ctrl{{< /kbd >}}+{{< kbd >}}C{{< /kbd >}} to terminate the master controller. This terminates all running agents as well and triggers the download of all test results generated so far. Note that it's therefore impossible to disconnect the master controller from the test cluster while keeping the load test running.

{{% note notitle %}}
For long-running load tests, it is recommended to run the test without the `-auto` option. This makes it possible to disconnect from the test cluster without terminating the test and inhibits accidental test termination.
{{% /note %}}

### Scripted Commands

In order to better fit into highly-automated environments, XLT 5.2.1 improved the master controller in order to ease scripting. With the command line option `-c <commandList>` (or `--commands <commandList>`) you can specify which commands the master controller should execute on your behalf in a non-interactive fashion. This way, typical use cases can be scripted quite easily:

* upload the test suite and start the load test (`mastercontroller.sh -c upload,start`)
* download the results of a running load test and generate a report from them (`mastercontroller.sh -c download,report`)
* abort a running load test (`mastercontroller.sh -c abort`)
* abort a running load test, download the final results, and generate a report from them (`mastercontroller.sh -c abort,download,report`)

Please note that the master controller executes the commands exactly as specified on the command line which means in the same order and quantity.

### Embedded Mode

Both interactive mode and auto mode can be combined with the command line option `-embedded`. It starts the master controller as well as an internal agent controller.

This is useful if you want to run load tests without a distributed load test environment. It will start a single agent controller as well as the master controller on the same machine. There's no need to manually start an agent controller before you run the load test, which facilitates the handling of automated load tests started from within a build process. This option is also recommended when playing around with the [Posters demo](../../quick-start/30-demo-test-suite) for training purposes because it simplifies the process of running a load test.

{{% note notitle %}}
When you use the `-embedded` option, the local agent controller settings will override the set of agent controllers configured in `mastercontroller.properies`.
{{% /note %}}
