---
title: "Load Configuration"

weight: 470
type: docs

description: >
  Learn how to set up the test suite to run as a performance test and what load profiles are supported.
---

Before running a performance test, you must configure the load applied to your application. The settings for a specific load test profile are stored in a property file within the test suite. You can create multiple configuration files to prepare different scenarios in advance, switching between them by changing the `com.xceptance.xlt.testPropertiesFile` property in `project.properties`. For details on properties and syntax, see [Load Test Profile Configuration]({{< relref "test-suite-configuration#load-test-profile-configuration" >}}). This section covers the basic concepts of [load models]({{< relref "#load-models" >}}), [load factor]({{< relref "#load-factor" >}}), and [load profiles]({{< relref "#load-profiles" >}}), and how to define your target load.

## Load Models

A load model defines the attributes you control to achieve specific load and performance behavior. XLT supports two load models:

* User count model
* Arrival rate model

Each has distinct characteristics and use cases, as described below.

### User Count Model

The _user count model_ is a static load model.

The load is determined by the number of concurrent users. For example, if you configure 10 users, XLT runs 10 threads executing the scenario repeatedly. At any time, the system handles exactly 10 concurrent users. The number of transactions completed depends on the system's response time.

This model is best suited for:

* Baseline tests (single-user) to assess performance under minimal load
* Load or performance tests with high but _predictable_ concurrency
* Tests that need to be strictly repeatable and independent of system performance

### Arrival Rate Model

The _arrival rate model_ is a dynamic, feedback-based load model.

Load generation is determined by the target number of transactions per hour. For an arrival rate of 1,000 transactions/hour, XLT executes the scenario 1,000 times, evenly distributed over the hour. XLT uses the necessary number of concurrent users to meet this rate, up to a specified limit. If transactions are fast, fewer users are needed; if they slow down, the user count increases.

Because concurrency depends on response time, it is not static. If response times increase (e.g., due to a background job), XLT adds more users to maintain the arrival rate. When response times improve, the user count decreases.

This relationship can lead to a feedback loop: more users cause higher load and longer response times, which in turn requires even more users, potentially overloading the server. While aggressive, this behavior is realistic. It mimics real-world scenarios where new users (or customers) continue to arrive regardless of whether existing ones are stuck waiting.

{{% note notitle %}}
Although the number of concurrent users is an output of this model, XLT still requires you to specify a user count. This number acts as a ceiling for concurrent users, protecting the system from total overload due to the feedback loop.
{{% /note %}}

The arrival rate model is ideal for verifying that a system can handle a specific transaction volume. As this is the primary goal of most load tests, this model is recommended for most scenarios.

## Load Factor

Often, tests need to run at levels other than 100% of the target load (e.g., lower for dry runs, higher for peak load tests). Instead of recalculating profiles, XLT offers a _load factor_. You configure the target numbers (100%) once and scale the load as needed:

```bash
## Scale the load up to 150% for TVisit and down to 10% for all other scenarios
com.xceptance.xlt.loadtests.TVisit.loadFactor = 1.5
com.xceptance.xlt.loadtests.default.loadFactor = 0.1
```

The load factor applies to both user count and arrival rate (if specified).

XLT also supports a variable load factor that changes over time. Specify a function instead of a simple value:

```bash
## Scale the load up to 150% after one hour and down to 50% after two hours
com.xceptance.xlt.loadtests.default.loadFactor = 0/1.0, 1h/1.0, 1h/1.5, 2h/1.5, 2h/0.5
```

Note: A variable load factor cannot be combined with variable users or arrival rates. Only one parameter can be variable.

Applying a load factor involves rounding. Values are **rounded up** to the next integer (otherwise, test cases with a computed value < 0.5 would not run). To prevent a test case from running, explicitly set the load factor to 0.0.

## Load Profiles

While the load model defines the load parameters, load profiles determine how these parameters change over time. XLT supports three profiles:

* Static
* Ramp-up
* Variable

Detailed explanations follow below.

### Static Load Profile

The load parameter remains constant throughout the test. This is the simplest profile. Ensure the target system can handle the full load from the start. You only need to define the user count and measurement period:

```bash
com.xceptance.xlt.loadtests.TVisit.users = 500
com.xceptance.xlt.loadtests.default.measurementPeriod = 1h
```

### Ramp-up Load Profile

The load parameter increases steadily, allowing the system to warm up (e.g., to compile code or fill caches). Ramp-up also lets you monitor system behavior at different load levels in a single test.

Control the ramp-up behavior with these properties:

* `rampUpPeriod`: The duration of the ramp-up phase.
* `rampUpInitialValue`: The starting load value.
* `loadFactor`: The final load value after ramp-up.
* `rampUpSteadyPeriod`: The duration to hold the load at each step.
* `rampUpStepSize`: The amount to increase the load at each step.

{{% note notitle%}}
**rampUpPeriod** and **rampUpSteadyPeriod** are mutually exclusive so you cannot define both in the same configuration.
{{% /note %}}

Use `rampUpSteadyPeriod` to hold the load at specific levels for a set time (resulting in a variable total ramp-up time). Use `rampUpPeriod` for a fixed total ramp-up duration.

If an arrival rate is defined, ramp-up applies to it; otherwise, it applies to the user count.

For example, given a ramp-up step size of 100 users, a total of 500 users, and a steady period of 10 minutes, the framework calculates a total ramp-up period of 40 minutes. The configuration:

```bash
com.xceptance.xlt.loadtests.TVisit.users = 500
#com.xceptance.xlt.loadtests.TVisit.rampUpPeriod = 40m
com.xceptance.xlt.loadtests.TVisit.rampUpSteadyPeriod = 10m
com.xceptance.xlt.loadtests.TVisit.rampUpStepSize = 100
com.xceptance.xlt.loadtests.TVisit.rampUpInitialValue = 100
com.xceptance.xlt.loadtests.TVisit.measurementPeriod = 60m
```

The resulting load profile looks like this:

{{< image src="user-manual/chart_rampup.svg" max-width="80%" >}}
{{< /image >}}

{{% note notitle %}}
Keep in mind that times in the configuration can be specified in different ways. So instead of `60m` you can also write `1h` or `3600s`. `90m` can also be expressed as `1h 30m`.
{{% /note %}}

However, to configure a simple ramp-up phase for the system to warm up, this setting is sufficient:

```bash
com.xceptance.xlt.loadtests.TVisit.users = 500
com.xceptance.xlt.loadtests.TVisit.rampUpPeriod = 40m
com.xceptance.xlt.loadtests.TVisit.measurementPeriod = 60m
```

The resulting load profile then looks like this:

{{< image src="user-manual/chart_rampup2.svg" max-width="80%" >}}
{{< /image >}}

### Variable Load Profile

The variable load profile gives you full control to vary the load parameter during the test. You can increase or decrease the load at any time.

This is useful for combining different load levels in one run (e.g., alternating regular and peak loads) or modeling a 24-hour day in a shorter period.

Define the load variation using a load function: a sequence of time/value pairs representing points where the slope changes. XLT connects these points with straight lines.

Separate multiple pairs with spaces, commas, semicolons, or tabs. The time format supports standard [time periods]({{< relref "test-suite-configuration/#time_period_values" >}}).

{{% note notitle %}}
Do not use whitespace within a time unit or between time and value (e.g., `1 h` or `1h / 10`). To avoid ambiguity, we recommend using commas or semicolons to separate time/value pairs.
{{% /note %}}

Example load function:

```bash
com.xceptance.xlt.loadtests.default.loadFactor = 0/10, 60m/10, 60m/20, 70m/5
```

This keeps the load at 10 for one hour, doubles it to 20, decreases it to 5 over ten minutes, and maintains it at 5 for the remainder.

{{< image src="user-manual/chart_variable_load_factor.svg" max-width="80%" >}}
{{< /image >}}

Pairs must be sorted by time (ascending). You can specify two pairs for the same time to create an immediate jump. If no pair is defined for time "0", XLT inserts a starting point with the smallest non-zero user/arrival rate (1) or load factor (0.001), creating a ramp-up. If the test runs longer than the last pair, the last value is held constant.

#### Relative Load Functions

You can specify times and values relative to the previous point using `+` or `-`:

```bash
## This load function is equivalent to "0/1.0, 1h/1.5, 1h30m/0.5"
com.xceptance.xlt.loadtests.default.loadFactor = 0/1.0, +1h/+0.5, +30m/-1.0
```

Absolute and relative pairs can be mixed. Relative times cannot result in a negative time (pairs must remain sorted).

```bash
## This load function is equivalent to "0/1.0, 1h/1.0, 1h20m/2.0, 1h40m/2.0, 2h/1.0"
com.xceptance.xlt.loadtests.default.loadFactor = 0/1.0, 1h/+0, +20m/2.0, +20m/+0, +20m/1.0
```

If the first pair is relative, a minimal non-zero start point is assumed at time 0:

```bash
## This load function results in "0/0.001, +1h/+1.0", +1h/+0.5", i.e. "0/0.001, 1h/1.001, 2h/1.501"
com.xceptance.xlt.loadtests.default.loadFactor = +1h/+1.0 +1h/+0.5
```

## Load Test Phases

Execution of a load test scenario occurs in four phases: initial delay, warm-up, measurement, and shutdown.

* **Initial Delay** (`initialDelay`): Optional. Delays the start of a scenario. Useful if the scenario depends on data from another running scenario.
* **Warm-up Period** (`warmUpPeriod`): Optional. Time for the system to reach optimal performance (e.g., populating caches) before measurements begin. Data collected during this period is discarded.
  * _Tip:_ We recommend omitting the warm-up period and instead using a time filter on the test report. This ensures all data is captured and available for analysis if needed.
* **Measurement Period** (`measurementPeriod`): **Required**. The main phase where test data is recorded.
* **Shutdown Period** (`shutdownPeriod`): Optional. Allows users to complete their current iteration or perform cleanup after the measurement period. Users stop when finished or are forcibly terminated when this period ends. Without a shutdown period, users stop immediately after the measurement period.

The **ramp-up period** is often part of the warm-up to ensure stable performance during measurement. However, if you want to analyze behavior during ramp-up, do not define a warm-up period.

{{% warning title="Ramp-Up is Overwritten by Load Functions" %}}
If a load test scenario defines a function instead of a constant value for users, arrival rate, or load factor, that function alone defines the load curve's shape. Any ramp-up parameters specified for this scenario are ignored in this case, and the ramp-up period will not be displayed in the _Load Profile_ section of the test report created for a run with this setting.
{{% /warning %}}

The following figure displays the phases relative to the total test time:

{{< image src="user-manual/chart_testprofile.svg" max-width="80%" >}}Load Test Profile Configuration
{{< /image >}}
