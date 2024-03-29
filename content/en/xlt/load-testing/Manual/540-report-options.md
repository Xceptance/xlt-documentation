---
title: "Report Options"

weight: 540
type: docs

description: >
    How to customize the reports via command line options.
---

## Creating a report

To generate a report, you use the script `<XLT>/bin/create_reports.sh`, which will use the folder *reports* as default output directory (you can customize it in the `reportgenerator.properties`). The only mandatory parameter is the result directory (input directory) you want to create a report from. The default name of the report will be the time stamp the results were downloaded at. So the most basic way to create a report is:

```bash
bin $ ./create_report.sh ../results/20191224-131200
```

Mind that this leads to new report data at `reports/20191224-131200`, so if you already created a report previously, it will be overwritten.

## Setting a Custom Output Directory

It can be useful to create several reports for one result data set, so you’ll want an easy way to avoid overwriting the reports you created before. For this you will need the `-o` parameter, changing the output directory:

```bash
bin $ ./create_report.sh ../results/20191224-131200 -o ../reports/first-run
```

The output path can be relative to your current location or absolute. XLT will not automatically include the timestamp, so name the report directory appropriately. We suggest a naming scheme in the form of `<timestamp>-additional information`. For the example above `20191224-131200-first-run-version-2.0` might be detailed and helpful at the same time.

## Excluding the Ramp-Up Phase

In most cases you won’t be interested in what’s happening during the [ramp up phase]({{< relref "470-load-configuration/#ramp-up-load-profile" >}}) (the period of your load test when, one by one, all the users are becoming active) because you typically just want to check what happens under full load. You can easily cut the ramp up part of the test from the report by using the `-noRampUp` parameter, e.g.:

```bash
bin $ ./create_report.sh ../results/20191224-131200 -noRampUp
```

## Defining a Reporting Timeframe

Imagine you need to evaluate only the first 60 minutes of a test run or the time around midnight is of special interest. XLT allows you to refine the time period covered by the report easily, using the following time slider parameters:

- `-from` defines where to start,
- `-to` defines where to end, 
- `-l` (length/duration) can be used as an alternative to `-to` if you know the duration you want but don’t want to calculate the actual end time.

The base format for the time stamps is `YYYYMMDD-hhmmss` (e.g. “20191224-131200”), but as an alternative to precise time stamps you can also use relative times with a prefixed + or - (e.g. “+1h15m”, “+1:15:00” or “-30m”). Note: values for  duration (parameter -l) are given without +/-. 

**A couple of examples:**

For a report starting 15 minutes into the test and ending 45 minutes before the test finished, use
```bash
bin $ ./create_report.sh ../results/20191224-131200 -from +15m -to -45m
```

For a report starting 15 minutes into the test and covering the following 30 minutes:
```bash
bin $ ./create_report.sh ../results/20191224-131200 -from +15m -l 30m
```

For a report starting at a specified time (say, 2pm):
```bash
bin $ ./create_report.sh ../results/20191224-131200 -from 20191224-140000
```

for a report covering the whole test but its last 30 minutes:
```bash
bin $ ./create_report.sh ../results/20191224-131200 -to -30m
```

As you saw in the last two cases, it also works to only specify either start or end of the report, the missing one will just default to start or end of the test. This feature can be great to compare two halves of a single run against each other - for instance cold cache, warm cache or similar.

## Excluding Test Scenarios

Besides limiting the time frame you can also filter which test scenarios to include or exclude or even combine both selections. Use the `-i` (include) or `-e` (exclude) parameters to specify which test cases you want to be contained in the report (when `-i` is given, `-e` will be ignored). The test cases specified may be named (e.g. “TBrowse”, “TOrder”), or you can even use regex to find them (e.g. “T.\*Order”, “TOrder[1-5]”). If you need more than one test case, just put them in a comma-separated list like “TBrowse, TCheckout, TOrder” (whitespaces are ignored). 

## Report for a subset of agents

Sometimes you might need to create reports for certain agent machines only, for instance, if you want to compare response times for agents in different regions of the world or skip an agent that had issues during the load test. The report generator provides new switches to specify the agents to be included in (or excluded from) the report.

To include certain agents only, use this command line:

```bash
./create_report.sh —include-agents “ac01_00,ac05_01” ../results/20170410-110432
```

Likewise, to exclude all agents with ‘us-east-1’ in their name, use this command line:

```bash
./create_report.sh —exclude-agents “.*us-east-1.*” ../results/20170410-110432
```

As you can see, you may not only specify a list of plain agent names (comma-separated) but also a (comma-separated) list of regular expressions.

## Setting a Custom Time Zone 
The load test report generated will be based on the default time zone of the machine that creates it. If the report should rather be based on a different time zone, this default can be overridden. It can be done using a command-line parameter to specify a timezone such as UTC, while generating a test report.
```bash
./create_report.sh -timezone UTC ../results/20120625-211541
```
## Speeding It Up

Finally, the `-noCharts` option might help you speed up your report generation, as it omits all charts.

By default, the load test report contains several charts for each and every agent. If you use many agent machines with multiple agents each, the number of charts can grow significantly. If you don’t need these charts, you can turn them off using the `-noAgentCharts` option. This, too, will speed up report generation and noticeably reduce the overall size of the report, in case you have to distribute or archive it.

There are more options available for very special needs (`./create_report.sh --help` will print all available options), and even more are planned for future releases.

