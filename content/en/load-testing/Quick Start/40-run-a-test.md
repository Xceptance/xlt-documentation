---
title: "Run a Test"

weight: 30
type: docs

description: >
  How to run your first load test.
---

## Setup a Test Execution

To run a test, first tell your setup (`<testsuite>\config\project.properties`) which test configuration to use:

```bash
com.xceptance.xlt.testPropertiesFile = my-test.properties
```

Then you can configure the basic properties of the test suite and the load profile (in `<testsuite>\config\my-test.properties`). Our demo test suite comes with basic test.properties which you can use as a starting point for whatever you are planning.

```bash
host = http://localhost:8000
filename = tauthor.csv

com.xceptance.xlt.loadtests = TURL
com.xceptance.xlt.loadtests.default.rampUpPeriod = 5m
com.xceptance.xlt.loadtests.default.measurementPeriod = 1h
com.xceptance.xlt.loadtests.default.shutdownPeriod = 1m

com.xceptance.xlt.loadtests.TURL.users = 10
com.xceptance.xlt.loadtests.TURL.arrivalRate = 100
```

In this case we run a test for 1 hour with a 5 minute ramp-up period, and a 1 minute shutdown phase. The shutdown phase will not turn up in our measurements, but ramp-up does. You can exclude it later if desired. Total runtime is 1h 1min (measurement period + shutdown period).

## Run the Test Execution

To run the test execution, tell the mastercontroller where the test suite is (in `<xlt>/config/mastercontroller.properties`):

```bash
com.xceptance.xlt.mastercontroller.testSuitePath = /home/user/testsuite-nocoding
```

Then navigate to `<xlt>\bin` and start the mastercontroller (MC) in auto-mode with an embedded agentcontroller (so the load generators come up on your local machine without any extra configuration work). 

```bash
$> ./mastercontroller.sh -auto -embedded -comment "My first test run"
```

## Generate a Test Report

After that, render a report based on the gathered data and open it in the browser of your choice:

```bash
$> ./create_report.sh ../results/20200202-123400
$> firefox ../reports/20200202-123400/index.html
```

{{% note notitle %}}For more infos on how to customize your reports, see the [Manual]({{< relref "load-testing/manual/540-report-options" >}}).{{% /note %}}

