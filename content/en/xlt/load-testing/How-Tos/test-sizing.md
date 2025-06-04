---
title: "How to Size Your Test Environment"
linkTitle: "Test Sizing"

weight: 80
type: docs


description: >
  Learn how to determine the number and size of machines needed for your load test.
---

Determining the number and size of load testing machines needed for your setup is largely a matter of experience. 

**How many machines do I need for my load test?**
As for the number of machines, a good rule of thumb to start with is: _1 AC machine per 5k target page views per hour_. 

**How much memory should my test machines have?**
For RAM, we usually reserve 512 MB for the system, plus about 512 MB for the JVM, plus the configured maximum heap size per agent process. So, for 4 agents per machine, each with a 0.5 GB heap size, we would roughly need 0.5 GB + 4 * (0.5 GB + 0.5 GB) = 4.5 GB of RAM.

**Was my choice of machines right?**
Check the agents' CPU usage in the [test report]({{< relref "../manual/320-test-evaluation#agents" >}}) after your load test so you know whether any adjustments are necessary.

{{< TODO >}}to be continued...{{< /TODO >}}

