---
title: "How to Use `create_report` Command Options (Cheat Sheet)"
linkTitle: "`create_report` Cheat Sheet"

weight: 400
type: docs

description: >
  Learn how to use different `create_report` command options. <!-- You will find the usage instructions and a list of available commands below. -->
---
## Usage
- `create_report [<options>] <inputdir>` is used to generate a test report.
- `create_report --help` displays all available command options and a brief guide on their usage.

### Example

 A report can be generated as follows, without using any options:
#### Windows
```powershell 
cd <XLT>\bin 
./create_report.cmd ../results/20210221-112110 
```
#### Linux
```shell 
cd <XLT>/bin 
./create_report.sh ../results/20210221-112110 
```

## List of Command Options
- `-ae --exclude-agents <agents>` Can be used for [excluding a comma-separated list of agents]({{< relref "../manual/540-report-options#report-for-a-subset-of-agents" >}}).

- `-ai --include-agents <agents>` Used for [including a comma-separated list of agents]({{< relref "../manual/540-report-options#report-for-a-subset-of-agents" >}}). 

-  `-D <property=value>` Overrides a property from a file.

- `-e,--exclude-testcases <test cases>` [Excludes a comma-separated list of test cases]({{< relref "../manual/540-report-options#excluding-test-scenarios" >}}).

- `-from <time>` Ignores results generated before the given time. It can also be combined with `-l` and `-to` for [defining a reporting timeframe]({{< relref "../manual/540-report-options#defining-a-reporting-timeframe" >}}).

- `-i,--include-testcases <test cases>` Can be used to [include a comma-separated list of test cases]({{< relref "../manual/540-report-options#excluding-test-scenarios" >}}).
- `-l <duration>` Utilizes results generated within the [specified duration]({{< relref "../manual/540-report-options#defining-a-reporting-timeframe" >}}); must be used with the `-from` or `-to` option.

- `-linkToResults <yes|no>` Controls whether to link to the result browsers.

- `-noAgentCharts,--no-agent-charts` Disables the generation of agent charts.

- `-noCharts,--no-charts` Disables the generation of all charts. It is also used for [faster generation]({{< relref "../manual/540-report-options#speeding-it-up" >}}) of reports.

- `-noRampUp` Allows deciding whether to [exclude the ramp-up phase]({{< relref "../manual/540-report-options#excluding-the-ramp-up-phase" >}}).

- `-o <dir>` Can be used for [setting a custom output directory]({{< relref "../manual/540-report-options#setting-a-custom-output-directory" >}}).

- `-pf <property file>` Specifies a [property file]({{< relref "../manual/550-report-configuration#using-custom-report-generator-settings" >}}) that overrides basic properties.

- `-timezone <timezoneID>` [Overrides the user's default timezone]({{< relref "../manual/540-report-options#setting-a-custom-time-zone" >}}) while generating a test report.

- `-to <time>` Ignores results generated [after the given time]({{< relref "../manual/540-report-options#defining-a-reporting-timeframe" >}}).