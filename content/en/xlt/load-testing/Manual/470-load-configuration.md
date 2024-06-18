---
title: "Load Configuration"

weight: 470
type: docs

description: >
  How to setup the test suite to run as performance test and what load profiles are supported.
---

Before running your test suite as a performance test, you will need to configure the load to be applied to your app under test. The settings required to configure a particular load test profile are collected in a property file inside the load test suite. Several files with different load test profile configurations may exist. This way, many configurations can be defined and prepared in advance and used as needed. You switch between these files by changing the property `com.xceptance.xlt.testPropertiesFile` in the `project.properties` file. For more information about the properties and syntax, also see [Load Test Profile Configuration]({{< relref "480-test-suite-configuration#load-test-profile-configuration" >}}). Here we will have a look at the basic concepts of [load models]({{< relref "#load-models" >}}), [load factor]({{< relref "#load-factor" >}}) and [load profiles]({{< relref "#load-profiles" >}}) and how you may define your target load in different ways with XLT.

## Load Models

A load model defines the attributes you may influence to reach a specific load and performance behavior. XLT supports two load models:

* a user count model and
* an arrival rate model.

Both have different characteristics and use cases as illustrated below.

### User Count Model

The _user count model_ is a static and non-feedback-based load model.

When you use it, the load is determined by the number of concurrent users. When you configure a load of 10 users, for instance, XLT runs 10 threads repeatedly executing this scenario. At any given time during the test, the target system has to handle 10 concurrent users, no more, no less. The number of executions (transactions) that can be achieved during a certain period of time depends on the time the target system needs to respond.

This model is suited best for:

* a simple base line test (single-user test) to assess the base performance of the system under almost no load,
* a real load or performance test to assess the performance under a high but _predictable_ load,
* a test that should be easily repeatable and whose load is not influenced by the system under test.

### Arrival Rate Model

The _arrival rate model_ is a feedback-based load model.

When you use it, the target number of transactions per hour determines the load generation. For an arrival rate of 1,000 transactions per hour, XLT runs the respective scenario 1,000 times, equally distributed across a period of one hour. XLT uses as many concurrent users as necessary to fulfill the given arrival rate but no more than specified. Thus, if the time needed for a transaction is very short, only one user might suffice; if a transaction takes longer, the number of concurrent users will rise.

The number of concurrent users is not static and influenced by the response time. If the response time temporarily increases, for example due to a server-side background job, the user count may increase as well. As soon as the response times improve, the number of concurrent users will automatically decrease. This way, the generated load is somewhat unpredictable, at least in terms of concurrency.

The relationship between response times and concurrent users can lead to situations where more users cause more load and thus longer response times. Even more users are now required to run, which eventually causes the server to be overloaded. Even though this behavior appears pretty aggressive, it's more realistic. Compare it to a real-world situation where a lot of people are waiting at the check-out counter at the end of a store, but customers are still coming in because they don't know that people are waiting already. Or transferred to the online world: when you visit an online presence, you won't know the system behaves poorly until you start acting.

{{% note notitle %}}
Even though the number of concurrent users is rather a result than an input value for this load model, XLT requires you to specify a user count. This number is used to impose an upper limit to the number of concurrent users, which may help you to restrict the total load on the system if you want to avoid a total overload resulting from the feedback loop.
{{% /note %}}

The arrival rate load model is suited best if the load test is meant to prove that a system is in fact able to handle a certain number of transactions per hour. Since this is the primary purpose of load and performance testing, this model is the best choice for most of your test tasks.

## Load Factor

Quite often it is necessary to run tests not only at 100% of target load, but also at lower levels (for dry runs or first tests) or higher levels (for peak load tests). Since recalculating and adjusting the respective load profiles is inconvenient and error-prone, XLT supports a load factor. When taking advantage of it, you only need to configure the target numbers (100% of load) once and can then easily scale the load up or down as you like:

```bash
## Scale the load up to 150% for TVisit and down to 10% for all other scenarios
com.xceptance.xlt.loadtests.TVisit.loadFactor = 1.5
com.xceptance.xlt.loadtests.default.loadFactor = 0.1
```

Note that the load factor is applied to both the configured number of users and the arrival rate (if specified).

XLT also supports a variable load factor, a load factor that changes over time. Simply specify a function instead of a simple value:

```bash
## Scale the load up to 150% after one hour and down to 50% after two hours
com.xceptance.xlt.loadtests.default.loadFactor = 0/1.0, 1h/1.0, 1h/1.5, 2h/1.5, 2h/0.5
```

Note that a variable load factor cannot be used together with variable users (or arrival rate). Only one of them can be variable.

The application of a load factor always involves some kind of rounding. Computed values will always be *rounded up* to the smallest integer number that is greater than or equal to the computed value (because arithmetic rounding would mean that test cases with a computed value of less than 0.5 are not run at all for the entire period of time this load factor is effective). Hence, users have to explicitly configure a load factor of 0.0 for a certain test case when they want it not to be run.

## Load Profiles

While the load model defines what you can modify to achieve a certain load, the load profiles define how you apply these values over a period of time. XLT supports three different load profiles:

- static,
- ramp-up, and
- variable load.

See below for their detailed explanation.

### Static Load Profile

The load parameter remains unchanged during the test. This is the simplest profile. Note that the target systems must be able to handle the full load right from the beginning. You only need to define the number of test users and the measurement period: 

```bash
com.xceptance.xlt.loadtests.TVisit.users = 500
com.xceptance.xlt.loadtests.default.measurementPeriod = 1h
```

### Ramp-up Load Profile

The load parameter is steadily increased. This allows the target system to warm up before the full load hits the system, for example to compile and optimize code or to fill caches. But the ramp-up feature cannot only be used to let the system under test “get used” to the load, it can also be used to monitor the system behavior at different user counts (e.g. 50, 100, … users) with a single load test.

The ramp-up behavior of the load parameter can be controlled by the following settings:

- `rampUpPeriod`: the length of the ramp-up phase before the target load is reached,
- `rampUpInitialValue`: the load parameter value to start with,
- `loadFactor`: the final load parameter as soon as the ramp-up period has finished,
- `rampUpSteadyPeriod`: the period to keep the current parameter value until the next ramp-up step, i.e. the time to keep a certain load level,
- `rampUpStepSize`: the increment added to the load parameter after each ramp-up step.

{{% note notitle%}}
The **rampUpPeriod** and the **rampUpSteadyPeriod** are mutually exclusive, i.e. they can't both be defined in the same load configuration.
{{% /note %}}

Use the steady period if you want to keep the load at a certain level for a defined time, no matter how long the total ramp-up phase will be. Use the ramp-up period if you want a steady ramp-up process that finishes after a defined amount of time.

If an arrival rate is defined, the ramp-up parameters will be applied to the arrival rate. In case there's no such definition, they will be applied to the user count.

For example, given a ramp-up step size of 100 users and a total of 500 users as well as a steady period of 10 minutes, the framework would calculate the necessary over-all ramp-up period of 40 minutes. The corresponding configuration looks like so:

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
Please keep in mind that times in the configuration can be specified in different ways. So instead of `60m` you can also write `1h` or `3600s`. `90m` can also be expressed as `1h 30m`. 
{{% /note %}}

But to just configure a simple ramp-up phase for the system to warm up, this setting is sufficient:

```bash
com.xceptance.xlt.loadtests.TVisit.users = 500
com.xceptance.xlt.loadtests.TVisit.rampUpPeriod = 40m  
com.xceptance.xlt.loadtests.TVisit.measurementPeriod = 60m
```

The resulting load profile then looks like this:

{{< image src="user-manual/chart_rampup2.svg" max-width="80%" >}}
{{< /image >}}

### Variable Load Profile

The variable load profile allows full control and lets you vary the load parameter freely during the test. Thus, the load may not only be constantly increased (compare ramp-up), but it can also be increased and decreased at any time.

The variable profile comes in handy when you want to combine different load levels within one test run, for example a test where phases with regular load alternate with peaks of much higher load. You can also imagine a test that models the load profile of a typical 24 hour day, maybe squeezed into a shorter period of time for a faster test turn-around.

To define how the load parameter should vary over time, you need to specify a load function. You do so by defining a sequence of time/value pairs, each denoting a point in time when the slope of the load function changes. When you connect the dots by a straight line, the final shape of the load function evolves.

Multiple time/value pairs can be specified by separating them using one or more spaces, commas, semi-colons, or tab characters. The time part can be given in all formats supported for [time periods]({{< relref "480-test-suite-configuration/#time_period_values" >}}).

{{% note notitle %}}
Please do not use white-space characters (space or tab) to separate both the sub-parts of the time part and the various time/value parts, as this leads to ambiguities and misunderstandings. In order to avoid such situations, we strongly recommend to use either commas or semi-colons to separate the time/value parts.
{{% /note %}}

Imagine the following load function:

```bash
com.xceptance.xlt.loadtests.default.loadFactor = 0/10, 60m/10, 60m/20, 70m/5
```

This sequence of time/value pairs defines a function that keeps the load parameter constant at 10 for an hour, doubles it to 20 in an instant, then immediately starts decreasing it to 5 throughout the next ten minutes, and eventually keeps it at 5 for the remaining test.

{{< image src="user-manual/chart_variable_load_factor.svg" max-width="80%" >}}
{{< /image >}}

Note that the time/value pairs must be sorted by their time in ascending order. You can also specify two pairs for a certain time span, which is useful when you want the load parameter to change immediately. If no pair is given for time 0, a pair "0/1" will be inserted automatically (implicitly causing a ramp-up behavior). Finally, if the load test runs longer than the last pair, the last known load parameter value will be kept stable.

## Load Test Phases

The execution of a test scenario during a load test can be divided into different phases: the initial delay, the warm-up period, the measurement period, and the shutdown period.

The **initial delay** (`initialDelay`) is required only if you don't want the test scenario to run right from the beginning of the load test, which is useful if this scenario depends on the results created by another test scenario. The initial delay is _optional_.

To minimize discrepancies that could be caused by applications and other systems starting up and not yet operating at an optimal level, you can define a **warm-up period** (`warmUpPeriod`) as the time given before any measurements are taken. The warm-up period is _optional_. Keep in mind that it creates a period of time during which you don't have any insights into your test. It is recommended to omit a warm-up period and modify the report later by specifying a time filter instead. This ensures that you don't miss any important information.

The test is measured during the **measurement period** (`measurementPeriod`). As suggested by its name, this is the only time period where measurements are taken. The measurement period is a required setting.

To ensure that a test scenario runs to completion even if the measurement period is over, you can set a **shutdown period** (`shutdownPeriod`) throughout which the users continue to run (without taking measurements though) and try to orderly finish their current iteration. This comes in handy when things need to be cleaned up at the end of the test scenario. As soon as the last iteration is finished, the users automatically stop. If, however, it's still not finished at the end of the shutdown period, the users will be forcibly terminated. The shutdown period is optional, but note that if no shutdown period is defined, the users are terminated right after the measurement period.

The **ramp-up period** (`rampUpPeriod`, as defined above as part of the load profile) is commonly put into the warm-up period to ensure the system under test is working at an optimal level before any measurements are taken. That's up to you though - it might as well be interesting to measure the system performance during the ramp-up phase. In that case, a warm-up period mustn't be defined.

{{% warning title="Ramp-Up is Overwritten by Load Functions" %}}
If a load test scenario defines a function instead of a constant value for either users, arrival rate, or load factor, that function alone defines the shape of the load curve. Any ramp-up parameters specified for this scenario are ignored in this case, and the ramp-up period will not be displayed in the _Load Profile_ section of the test report created for a run with this setting.
{{% /warning %}}

The following figure displays the phases in relation to the total test time:

{{< image src="user-manual/chart_testprofile.svg" max-width="80%" >}}Load Test Profile Configuration
{{< /image >}}