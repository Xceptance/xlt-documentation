---
title: "How to Use `mastercontroller` Command Options (Cheat Sheet)"
linkTitle: "`mastercontroller` Cheat Sheet"

weight: 300
type: docs

description: >
  Learn how to use different `mastercontroller` command options. <!-- You will find the usage instructions and a list of available commands below. -->
---
## Mastercontroller 
The `mastercontroller` is the primary tool for managing the entire load test. It calculates load distribution, begins and ends the test, and also deploys the test suite to all `agentcontroller` instances. At the end, the `mastercontroller` saves test results on the file system. It can be run using [interactive mode]({{< relref "../manual/310-test-execution#interactive-mode" >}}), [auto mode]({{< relref "../manual/310-test-execution#auto-mode" >}}), or [non-interactive mode (scripted commands)]({{< relref "../manual/310-test-execution#non-interactive-mode-scripted-commands" >}}).

## Usage

- `mastercontroller [<other options>]` runs in [interactive mode]({{< relref "../manual/310-test-execution#interactive-mode" >}}). Any command can be chosen to be executed next.
- `mastercontroller --help` displays all available options and a brief guide on their usage.
- `mastercontroller -auto [<other options>]` runs a load test in [auto mode]({{< relref "../manual/310-test-execution#auto-mode" >}}) by automatically executing all commands.

### Example

 This will run a load test in [auto mode]({{< relref "../manual/310-test-execution#auto-mode" >}}), in combination with [embedded mode]({{< relref "../manual/310-test-execution#embedded-mode" >}}):
#### Windows
```powershell 
cd <XLT>\bin
./mastercontroller.cmd -auto -embedded -comment "Test Run" 
```
#### Linux
```shell 
cd <XLT>/bin
./mastercontroller.sh -auto -embedded -comment "Test Run" 
```

## List of Command Options
- `-auto` Used for running a load test in [auto mode]({{< relref "../manual/310-test-execution/#auto-mode" >}}). This option automatically executes several [steps]({{< relref "../manual/310-test-execution/#steps-executed-in-auto-mode" >}}), including uploading the test suite, starting the test, and downloading test results. It can also be used with the `-report` option to automatically create a report upon test completion.  

- `-c <commandList>` or `--commands <commandList>` Executes commands in a comma-separated list in the specified order and then quits. Supported commands include `abort`, `upload`, `report`, `start`, and `download`.

- `-comment <string>` Sets a comment for your test run. 

- `-D <property=value>` Used for [overriding or configuring]({{< relref "../manual/490-environment-configuration#configuration-via-command-line" >}}) a property in the `mastercontroller.properties` file.

- `-embedded` Utilizes a single embedded agent controller, running the test in [embedded mode]({{< relref "../manual/310-test-execution#embedded-mode" >}}).

- `-faf` Usage is deprecated. It is recommended to use `-auto` instead.

- `-noDownload` For use with auto mode only. Test results are not downloaded. This option is ignored in sequential/[non-interactive mode]({{< relref "../manual/310-test-execution#non-interactive-mode-scripted-commands" >}}).

- `-o <dir>`  Stores downloaded test results in the specified directory. 

- `--only-download <dataTypeList>` Restricts download to only the given result data types in a comma-separated list. Applicable only for [downloads in non-interactive mode]({{< relref "../manual/310-test-execution#downloads-in-non-interactive-mode" >}}). 

- `-pf <file>` Can be used to utilize a separate properties file, which overrides values in the `mastercontroller.properties` file.

- `-report` Generates a report after downloading test results. It is not effective in commands mode. It can be used with [auto mode]({{< relref "../manual/310-test-execution#auto-mode" >}}) using the `-auto` option to automatically generate a report once tests are downloaded.

- `sequential` Used for running test cases sequentially (one after another).

- `testPropertiesFile <filename>` Can be used for specifying the properties file for the test run.  

- `timezone <timezoneID>` [Overrides the user's default timezone]({{< relref "../manual/540-report-options/#setting-a-custom-time-zone" >}}) while generating a test report.
