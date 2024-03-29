---
title: "Run a Test"

weight: 30
type: docs

description: >
  How to run your first load test.
---

## Setup a Test Execution

Ok, so now you have the [demo shop running on your machine]({{< relref "20-demo-application" >}}) and you have [set up the demo testsuite]({{< relref "30-demo-test-suite" >}}). To run a test, first tell your setup (`<posters-simple-loadtest-suite>/config/project.properties`) which test configuration to use and where to find your Posters demo shop instance:

```bash
com.xceptance.xlt.testPropertiesFile = my-test.properties

store-url = https://localhost:8443/posters/
```

Then you can configure the basic properties of the test suite and the load profile (in `<posters-simple-loadtest-suite>/config/my-test.properties`). Our demo test suite comes with basic test.properties which you can use as a starting point for whatever you are planning.

```bash
com.xceptance.xlt.loadtests = TVisit
com.xceptance.xlt.loadtests.default.rampUpPeriod = 5m
com.xceptance.xlt.loadtests.default.measurementPeriod = 1h
com.xceptance.xlt.loadtests.default.shutdownPeriod = 1m

## Test case specific configuration.
com.xceptance.xlt.loadtests.TVisit.users = 1
com.xceptance.xlt.loadtests.TVisit.arrivalRate = 500
```

In this case we run a test for 1 hour with a 5 minute [ramp-up period]({{< relref "../glossary#ramp-up-period-xlt" >}}), and a 1 minute [shutdown period]({{< relref "../glossary#shutdown-period-xlt" >}}). The shutdown phase will not turn up in our measurements, but ramp-up does. You can exclude it later if desired. Total runtime is 1h 5min ( [measurement period]({{< relref "../glossary#measurement-period-xlt" >}}) + shutdown period).

## Run the Test Execution

To run the test execution, tell the [mastercontroller]({{< relref "../manual/490-environment-configuration#mastercontroller-configuration" >}}) where the test suite is (in `<xlt>/config/mastercontroller.properties`):

```bash
com.xceptance.xlt.mastercontroller.testSuitePath = <posters-simple-loadtest-suite>
```

Then navigate to `<xlt>/bin` and start the mastercontroller (MC) in auto mode with an embedded agentcontroller (so the load generators come up on your local machine without any extra configuration work). 

```bash
$ ./mastercontroller.sh -auto -embedded -comment "My first test run"
```