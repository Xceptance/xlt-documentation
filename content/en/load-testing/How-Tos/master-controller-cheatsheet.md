---
title: "How to use Mastercontroller Command Options (Cheat Sheet)"
linkTitle: "Mastercontroller Cheat Sheet"

weight: 300
type: docs

description: >
  How to make use of different mastercontroller command options. <!-- You will find the usage instructions and a list of available commands below. -->
---
## Usage

- `mastercontroller [<other options>]` runs in [interactive mode](../../manual/310-test-execution/#interactive-mode). Any command can be chosen to be executed next.
- `mastercontroller --help` displays all the available options and a brief guide about their usage.
- `mastercontroller -auto [<other options>]` runs a load test in non-interactive [auto mode](../../manual/310-test-execution/#auto-mode) by executing all commands automatically.

### Example

- For displaying all the available command options you can run
```powershell
cd <XLT>\bin 
>>./mastercontroller.cmd --help 
```
- This would make a load test run in [auto mode](../../manual/310-test-execution/#auto-mode), executing commands automatically in combination with [embedded mode](../../manual/310-test-execution/#embedded-mode).
```powershell 
cd <XLT>\bin
>>./mastercontroller.cmd -auto -embedded -comment "Test Run" 
```

## List of Command Options
- `-auto` is to be used for running a load test in [auto mode](../../manual/310-test-execution/#auto-mode).

- `-c <commandList>` or `--commands <commandList>` will execute commands in a comma-separated list, in the specified order and then quit. `abort`, `upload`,`report`,`start`, `download` are the supported commands that may be used.

- `-comment <string>` sets a comment for your test run. 

- `-D <property=value>` is used for [overriding or configuring](../490-environment-configuration/#configuration-via-command-line) a property in `mastercontroller.properties` file.

- `-embedded` utilizes a single embedded agent controller. It makes the test run in [embedded mode](../../manual/310-test-execution/#embedded-mode).

- `-faf` Usage deprecated. Recommended to use `-auto` instead.

- `-noDownload` to be used with auto mode only. Test results are not downloaded. The option is ignored in sequential/[non-interactive mode](../../manual/310-test-execution/#non-interactive-mode-scripted-commands).

- `-o <dir>`  stores test results that have been downloaded in the directory specified. 

- `--only-download <dataTypeList>` restricts download to only the given result data types in a comma-separated list. Applicable in non-interactive mode only.

- `-pf <file>` can be employed to utilize a separate properties file, which overrides the values in file `mastercontroller.properties`.

- `report` will generate a report after downloading test results. It will not be effective in commands mode.

- `sequential` used for running test cases sequentially (one after the other).

- `testPropertiesFile <filename>` can be used for specifying properties file for the test-run.  

- `timezone <timezoneID>` [overrides user's default timezone,](../540-report-options/#setting-a-custom-time-zone) while generating a test report.
