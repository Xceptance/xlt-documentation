---
title: Run a Test
icon: play
description: "How to run your first load test.\n"
sidebar:
  order: 35
---

## Configure the Test Run

Ensure the [demo application is running locally](/xlt/quick-start/demo-application/) and you have imported the [demo test suite](/xlt/quick-start/demo-test-suite/).

### Step 1: Configure Target Environment

In `<posters-simple-loadtest-suite>/config/project.properties`, configure the target store URL and reference the active test profile:

```properties title="project.properties"
# Active load test profile
com.xceptance.xlt.testPropertiesFile = my-test.properties

# Base URL of the Posters demo store
store-url = https://localhost:8443/posters/
```

### Step 2: Define the Load Profile

Open `<posters-simple-loadtest-suite>/config/my-test.properties` and specify scenarios, durations, and load limits:

```properties title="test.properties"
# Test scenarios to execute
com.xceptance.xlt.loadtests = TVisit

# Global phase durations
com.xceptance.xlt.loadtests.default.rampUpPeriod = 5m
com.xceptance.xlt.loadtests.default.measurementPeriod = 1h
com.xceptance.xlt.loadtests.default.shutdownPeriod = 1m

# Scenario-specific load (target 500 arrivals/hr with a ceiling of 1 user)
com.xceptance.xlt.loadtests.TVisit.users = 1
com.xceptance.xlt.loadtests.TVisit.arrivalRate = 500
```

This configuration executes `TVisit` with:
* A 5-minute [ramp-up period](/xlt/about/glossary/#ramp-up-period-xlt) to warm up application caches.
* A 1-hour [measurement period](/xlt/about/glossary/#measurement-period-xlt) recording metrics.
* A 1-minute [shutdown period](/xlt/about/glossary/#shutdown-period-xlt) allowing active transactions to conclude.

Total execution time is 1 hour and 6 minutes.

## Execute the Load Test

### Step 3: Configure the Master Controller

In `<xlt>/config/mastercontroller.properties`, set the path to your test suite directory:

```properties title="mastercontroller.properties"
com.xceptance.xlt.mastercontroller.testSuitePath = /path/to/posters-simple-loadtest-suite
```

### Step 4: Launch Master Controller

Launch the Master Controller with embedded agent execution enabled. This spawns a local agent process automatically without requiring remote agent machines:

```bash
cd <xlt>/bin
./mastercontroller.sh -auto -embedded -comment "Local quick-start verification"
```

The Master Controller displays live console status during execution, terminates gracefully upon completion, and generates the load test report in `<xlt>/reports/`.

