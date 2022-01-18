---
title: "How to use Create_report Command Options (Cheat Sheet)"
linkTitle: "Create_report Cheat Sheet"

weight: 400
type: docs

description: >
  How to make use of different create_report command options. <!-- You will find the usage instructions and a list of available commands below. -->
---
## Usage
- `create_report [<options>] <inputdir>` is used to generate a test report.
- `create_report --help` displays all the available command options and a brief guide about their usage.

### Example

 A report can be generated in the following way, without using any options.
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
- `-ae --exclude-agents <agents>` can be used for [excluding a list of comma-separated agents.](../../manual/540-report-options/#report-for-a-subset-of-agents)

- `-ai --include-agents <agents>` is to be used for [including a list of comma-separated agents.](../../manual/540-report-options/#report-for-a-subset-of-agents) 

-  `-D <property=value>` will override a property from file.

- `-e,--exclude-testcases <test cases>` [excludes a comma-separated list of test cases.](../../manual/540-report-options/#excluding-test-scenarios)

- `-from <time>` can be used to ignore results generated before the given time. It can also be combined with `-l` and `-to` for [defining a reporting timeframe.](../../manual/540-report-options/#defining-a-reporting-timeframe)

- `-i,--include-testcases <test cases>` can be used to [include a list of comma-separated test cases.](../../manual/540-report-options/#excluding-test-scenarios)
- `-l <duration>` is used for utilizing results generated in the [specified duration](../../manual/540-report-options/#defining-a-reporting-timeframe), must be used with `from` or `to` option.

- `-linkToResults <yes|no>` will control whether or not to link to the result browsers.

- `-noAgentCharts,--no-agent-charts` disables generation of agent charts.

- `-noCharts,--no-charts` disables generation of all charts. It is also used for [faster generation](../../manual/540-report-options/#speeding-it-up) of reports.

- `-noRampUp` allows deciding whether or not to [exclude ramp-up phase](../../manual/540-report-options/#excluding-the-ramp-up-phase).

- `-o <dir>` can be used for [setting a custom output directory.](../../manual/540-report-options/#setting-a-custom-output-directory)

- `-pf <property file>` [property file](../../manual/550-report-configuration/#using-custom-report-generator-settings) that overrides the basic properties

- `-timezone <timezoneID>` [overrides user's default timezone,](../../manual/540-report-options/#setting-a-custom-time-zone) while generating a test report.

- `-to <time>` used for ignoring results generated [after the given time](../../manual/540-report-options/#defining-a-reporting-timeframe).