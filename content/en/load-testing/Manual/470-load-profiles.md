---
title: "Load Profiles"

weight: 470
type: docs

description: >
  How to setup the test suite to run as performance test and what load profiles are supported.
---

{{< TODO >}}
Load Models?
{{< /TODO >}}

## Load Profiles

While the load model defines what you can modify to achieve a certain load, the load profiles define how you apply these values over a period of time. XLT supports three different load profiles:

- static,
- ramp-up, and
- variable load.

See below for their detailed explanation.

### Static Load Profile

The load parameter remains unchanged during the test. This is the simplest profile. Note that the target systems must be able to handle the full load right from the beginning.

### Ramp-up Load Profile

The load parameter is steadily increased. This allows the target system to warm up before the full load hits the system, for example to compile and optimize code or to fill caches.

The ramp-up behavior of the load parameter can be controlled by the following settings:

- initial value: the load parameter value to start with,
- target value: the final load parameter as soon as the ramp-up period has finished,
- step size: the increment added to the load parameter after each ramp-up step,
- ramp-up period: the length of the ramp-up phase,
- steady period: the period to keep the current parameter value until the next ramp-up step

{{< note notitle>}}The steady period and the ramp-up period settings are mutually exclusive.{{< /note >}}

Use the steady period if you want to keep the load at a certain level for a defined time, no matter how long the total ramp-up phase will be. Use the ramp-up period if you want to finish the ramp-up process after a certain amount of time, no matter how long the resulting steady phases will be.

If an arrival rate is defined, the ramp-up parameters will be applied to the arrival rate. In case there's no such definition, they will be applied to the user count.

### Variable Load Profile

The variable load profile allows full control and lets you vary the load parameter freely during the test. Thus, the load may not only be constantly increased (compare ramp-up), but it can also be increased and decreased at any time.

The variable profile comes in handy when you want to combine different load levels within one test run, for example a test where phases with regular load alternate with peaks of much higher load. You can also imagine a test that models the load profile of a typical 24 hour day, maybe squeezed into a shorter period of time for a faster test turn-around.

To define how the load parameter should vary over time, you need to specify a load function. You do so by defining a sequence of time/value pairs, each denoting a point in time when the slope of the load function changes. When you connect the dots by a straight line, the final shape of the load function evolves.

Multiple time/value pairs can be specified by separating them using one or more spaces, commas, semi-colons, or tab characters. The time part can be given in all formats supported for "time periods":#time_period.

{{< note notitle >}}Please do not use white-space characters (space or tab) to separate both the sub-parts of the time part and the various time/value parts, as this leads to ambiguities and misunderstandings. In order to avoid such situations, we strongly recommend to use either commas or semi-colons to separate the time/value parts.{{< /note >}}

Imagine the following load function:

```bash
0/10, 60m/10, 60m/20, 70m/5
```

This sequence of time/value pairs defines a function that keeps the load parameter constant at 10 for an hour, doubles it to 20 in an instant, then immediately starts decreasing it to 5 throughout the next ten minutes, and eventually keeps it at 5 for the remaining test.

```bash
Load /\
     |
  20 +                         *
     |                         **
     |                         * *
     |                         *  *
  10 +**************************   *
     |                              *
   5 +                               **************************
     |
     +-------------------------+-----+--------------------------->
     0                        60    70                       Time
```

Note that the time/value pairs must be sorted by their time in ascending order. You can also specify two pairs for a certain time span, which is useful when you want the load parameter to change immediately. If no pair is given for time 0, a pair "0/1" will be inserted automatically (implicitly causing a ramp-up behavior). Finally, if the load test runs longer than the last pair, the last known load parameter value will be kept stable.
