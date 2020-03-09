---
title: "Load Profiles"

weight: 490
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

bq(note). The steady period and the ramp-up period settings are mutually exclusive.

Use the steady period if you want to keep the load at a certain level for a defined time, no matter how long the total ramp-up phase will be. Use the ramp-up period if you want to finish the ramp-up process after a certain amount of time, no matter how long the resulting steady phases will be.

If an arrival rate is defined, the ramp-up parameters will be applied to the arrival rate. In case there's no such definition, they will be applied to the user count.
