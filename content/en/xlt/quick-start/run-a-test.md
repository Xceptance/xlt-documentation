---
title: "Run a Test"

weight: 30
type: docs

description: >
  How to run your first load test.
---

## Setup a Test Execution

Once the [demo shop is running locally]({{< relref "demo-application" >}}) and you have [set up the demo test suite]({{< relref "demo-test-suite" >}}), you are ready to run a test.
First, tell XLT in `<posters-simple-loadtest-suite>/config/project.properties` which test configuration to use and where to find your Posters demo shop instance:

```bash
# Point to the test setup for XLT, this is an XLT setting
com.xceptance.xlt.testPropertiesFile = my-test.properties

# Specify data for the test suite
# This is a test suite setting
store-url = https://localhost:8443/posters/
```

Next, you configure the basic properties of the test suite and the load profile in `<posters-simple-loadtest-suite>/config/my-test.properties`. The demo test suite comes with basic `test.properties` which you can use as a starting point for whatever you are planning.

```bash
com.xceptance.xlt.loadtests = TVisit
com.xceptance.xlt.loadtests.default.rampUpPeriod = 5m
com.xceptance.xlt.loadtests.default.measurementPeriod = 1h
com.xceptance.xlt.loadtests.default.shutdownPeriod = 1m

## Test case specific configuration.
com.xceptance.xlt.loadtests.TVisit.users = 1
com.xceptance.xlt.loadtests.TVisit.arrivalRate = 500
```

In this case we run a test for 1 hour with a 5 minute [ramp-up period]({{< relref "../about/glossary#ramp-up-period-xlt" >}}), and a 1 minute [shutdown period]({{< relref "../about/glossary#shutdown-period-xlt" >}}). The shutdown phase will not turn up in our measurements, but ramp-up does. You can exclude it later if desired. Total runtime is 1h 5min ( [measurement period]({{< relref "../about/glossary#measurement-period-xlt" >}}) + shutdown period).

## Run the Test Execution

To run the test execution, tell the [mastercontroller]({{< relref "../manual/environment-configuration#mastercontroller-configuration" >}}) where the test suite is (in `<xlt>/config/mastercontroller.properties`):

```bash
com.xceptance.xlt.mastercontroller.testSuitePath = <posters-simple-loadtest-suite>
```

Then navigate to `<xlt>/bin` and start the mastercontroller (MC) in auto mode with an embedded agentcontroller (so the load generators come up on your local machine without any extra configuration work).

```bash
./mastercontroller.sh -auto -embedded -comment "My first test run"
```
