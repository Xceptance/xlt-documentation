---
title: "Create Report Cheat-Sheet"
linkTitle: "Cheat-Sheet Create_report"

weight: 900
type: docs

description: >
  You will find the usage instructions and a list of available command options below.
---
## Usage
- `create_report [<options>] <inputdir>` is used to generate a test report.
- `create_report --help` displays all the available command options and a brief guide about their usage.

### Example(Windows PowerShell)

- A report can be generated in the following way, without using any options.
```powershell 
C:\xlt-5.7.1\bin> ./create_report.cmd ../results/20991231-112110 
```
## List of Command Options
- `-ae --exclude-agents <agents>` can be used for excluding a list of comma-separated agents.

- `-ai --include-agents <agents>` is to be used for [including](../540-report-options/#report-for-a-subset-of-agents) a list of comma-separated agents.

-  `-D <property=value>` will override a property from file.

- `-e,--exclude-testcases <test cases>` [excludes](../540-report-options/#excluding-test-scenarios) a comma-separated list of test cases.

- `-from <time>` can be used to ignore results generated before the given time. it can also be combined with `-l` and `-to` for [defining](../540-report-options/#defining-a-reporting-timeframe) a reporting timeframe.

- `-i,--include-testcases <test cases>` can be used to include a list of comma-separated test cases.

- `-l <duration>` is used for utilizing results generated in the specified duration, must be used with `from` or `to` option.

- `-linkToResults <yes|no>` will allow whether or not to link to the result browsers.

- `-noAgentCharts,--no-agent-charts` disables generation of agent charts.

- `-noCharts,--no-charts` disables generation of all charts. It is also used for [faster generation](../540-report-options/#speeding-it-up) of reports.

- `-noRampUp` allows deciding whether or not to [exclude](../540-report-options/#excluding-the-ramp-up-phase) ramp-up phase/period.

- `-o <dir>` can be used for [setting](../540-report-options/#setting-a-custom-output-directory) a custom output directory.

- `-pf <property file>` [property file](../../glossary/#property-files) that overrides the basic properties

- `timezone <timezoneID>` [overrides](../../../release-notes/4.2.x/#custom-time-zone-for-reports-1536) user's default timezone, while generating a test report.

- `-to <time>` used for ignoring results generated after the given time.