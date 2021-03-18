---
title: "Test Setup"

weight: 300
type: docs

description: >
  How to setup the test suite to run as performance test and how to configure the load.
---

When you have finished developing your test suite and the tests themselves are well tested and consolidated, it is time to move on to the next step: configuring your test suite for the first load test. XLT is highly configurable, so there are a lot of things you can setup or customize. Here we'll give you a short overview of what is possible. We've also included some links so you can dig deeper into your specific areas of interest.

## Load Configuration
First of all, you will want to define what load will be applied. You can define this either in terms of [user count](../../11-glossary/#concurrent-users) or [arrival rate](../../11-glossary/#constant-arrival-rate), per test case if needed or globally for the whole test suite. If the load is defined per user count (value for arrival rate is omitted), the system generates a constant load based on the number of concurrent users. If an arrival rate was specified, the system generates load with a cluster-wide constant arrival rate. In the latter case, the maximum load is limited by the number of concurrent users.

In case you want to switch the load between test runs for a quick check, the easiest way to do this is by changing the [load factor](../470-load-configuration/#load-factor). For [more elaborate load scenarios](../470-load-configuration/#load-profiles), not only can you define a static load, but also a ramp-up load profile or variable load profile.

The load configuration usually lives in your `test.properties`. This file also contains the information about which test cases are to be included in the load test run. Several of these test profile configuration files may be prepared in advance for different load test runs. Then simply reference the appropriate properties for the current test run.

Read more about [Load Configuration](../470-load-configuration) and the load test profile configuration file [here](../480-test-suite-configuration/#load-test-profile-configuration).

## Environment Configuration
Your load test environment consists of one master controller and one or more agent controllers (typically one per hardware box) that control the agents. These are configured in the files `mastercontroller.properties` and `agentcontroller.properties`, which you find in the `<XLT>/config` directory. While the default agent controller configuration might work just fine, there are a few things that you need to setup for the master controller:

* (most importantly) the location of the test suite to be executed
* the agent controllers to be used

There are several more settings, e.g. for update intervals for the status printed in the console, for parallel communication with the ACs and error behavior in case of unreachable ACs.

Read more about [Load Test Environment Configuration](../490-environment-configuration), especially the [mastercontroller.properties](../490-environment-configuration/#master-controller-configuration).

## Test Suite Configuration

There are lots of additional configuration possibilities for your test suite, not necessarily just in a load test context, but also more generally. The `project.properties` hold information that applies to your test suite in every test run, e.g. which sites are used, which data is entered in the forms (both probably outsourced to external data files, specific for language or region), and also possibly default values for the settings from your load configuration. Read more about [Test Project Configuration](../480-test-suite-configuration/#test-project-configuration).

The most basic version of those settings and a good overview of what can be done is contained in the `default.properties`, which should not be changed. Any of these settings you need to customize should be copied to your project or test properties and adjusted there as needed (the value from default.properties will be overwritten then). Read more about these [Default Project Settings](../480-test-suite-configuration/#default-configuration).

To adjust any of these settings just for the development mode (that is when you create and debug test cases from within your IDE), you may use `dev.properties`. It’s read in development mode only, but not during load testing. For development mode, the values in this file have highest priority. Read more about [Development Settings](../480-test-suite-configuration/#development-environment-configuration).

## Report Configuration

After your load test has finished you will probably want to generate a report, which can also be customized in a number of ways. Read more about [Report Options](../540-report-options/) and [Report Configuration](../550-report-configuration/).
