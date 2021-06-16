---
title: "Test Sizing"

weight: 80
type: docs


description: >
  How to size your test environment according to your needs.
---

The number and size of load testing machines you'll need for your setup is largely a matter of experience. 

**How many machines do I need for my load test?**
As for the number of machines, a good rule of thumb to start with is: 1 AC machine per 5k target pageviews/hour. 

**How much memory should my test machines have?**
As for RAM, we usually reserve 512 MB for the system, plus about 512 MB for the JVM plus the configured maximum heap size per agent process. So, for 4 agents per machine with each 0.5 GB heap size, we would roughly need 0.5 GB + 4 * (0.5 GB + 0.5 GB) = 4.5 GB of RAM.

**Was my choice of machines right?**
Check the agents' CPU usage after your load test in the [test report](../../manual/320-test-evaluation/#agents) so you know whether any adjustments are necessary.

{{< TODO >}}to be continued...{{< /TODO >}}

