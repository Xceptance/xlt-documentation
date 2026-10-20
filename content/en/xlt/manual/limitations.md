---
title: Restrictions and Tuning
icon: wrench
description: "Important architectural considerations regarding the development model, concurrency, library usage, and JVM tuning.\n"
sidebar:
  order: 700
---

Running large-scale performance tests requires an understanding of execution boundaries, resource limits, and JVM behavior. This page outlines best practices and architectural constraints when developing test suites and configuring agent processes.

---

## 1. Library Use & Dependencies

### Dependencies & Scope

When writing test cases, ensure third-party libraries (JSON parsers, assertion frameworks, utility libraries) are packaged cleanly into your test suite:

* **Always Use `provided` Scope for XLT**: The XLT framework classes are provided at runtime by the executing agent. Setting `<scope>provided</scope>` for `com.xceptance:xlt` ensures framework JARs are not redundantly bundled into your test suite archive.
* **Bundle Non-Provided Dependencies**: Any custom third-party JARs must be copied to `target/dependency` during compilation so that the Agent Controller can synchronize them to remote agent machines. See [Building with Maven](/xlt/advanced/maven-builds/#copying-maven-dependencies).

### Test Suite Upload Size

Before a load test starts, the Master Controller (or XTC) archives and uploads your test suite to all participating agent machines. To prevent slow distribution times:
* Exclude large static media files, generated reports, and local results directories from the test suite archive.
* Avoid embedding multi-gigabyte CSV test datasets inside the suite; prefer targeted dataset slicing or external data sources.

### Concurrency & Thread Contexts

XLT 10 executes load test scenarios using Java 21 **virtual threads** by default. While this allows agents to scale to tens of thousands of concurrent users, test code must adhere to modern concurrency guidelines:

* **No `ThreadGroup` Lookups**: Virtual threads do not belong to user-defined `ThreadGroup` instances. If your test suite or libraries use `ThreadGroup` to correlate user context, migrate to `InheritableThreadLocal` or XLT's `ThreadContext`. See [Test Suite Configuration](/xlt/manual/test-suite-configuration/#code-migration--context-sharing).
* **Avoid Carrier Thread Pinning**: When a virtual thread executes a Java `synchronized` block containing blocking I/O (such as waiting on network responses), it temporarily "pins" its underlying native carrier thread. Replace blocking `synchronized` sections with `java.util.concurrent.locks.ReentrantLock` to maintain maximum concurrency.

### Alternative Web Clients

HtmlUnit is XLT's default protocol-level browser emulator, offering rich cookie, redirect, and DOM emulation. However, HtmlUnit does not natively support HTTP/2. If your test scenario strictly requires HTTP/2 multiplexing, enable the alternative OkHttp web connection (`com.xceptance.xlt.http.client = okhttp`). Note that advanced browser emulation features are limited when using the alternative connection.

---

## 2. Agent & JVM Tuning

### Avoiding Agent Bottleneck Contamination

Load test measurements are only trustworthy if the load generators themselves remain responsive. If an agent machine is maxed out on CPU or memory, client-side queuing will artificially delay request transmission and socket reads, distorting response times:
* Keep mean agent CPU utilization below **70%** (peak < **85%**).
* Reserve 1.5 to 2.0 GB of RAM for the operating system and background daemons.
* For comprehensive hardware sizing formulas, see [How to Size Your Test Environment](/xlt/how-tos/test-sizing/).

### JVM Configuration & Garbage Collection

Configure JVM arguments in `<testsuite>/config/jvmargs.cfg` (or globally in `<xlt>/config/jvmargs.cfg`):

* **Heap Sizing (`-Xms` and `-Xmx`)**: Set the initial heap size equal to the maximum heap size (e.g. `-Xms4g -Xmx4g`) to prevent JVM heap resizing pauses during the test run.
* **Garbage Collector**: The default **G1GC** is recommended for most workloads. For very large agent heaps (> 16 GB), consider testing **ZGC** (`-XX:+UseZGC`) to achieve sub-millisecond GC pause times.
* **Carrier Thread Scheduler**: Control the maximum number of native carrier threads spawned by the virtual thread scheduler using `-Djdk.virtualThreadScheduler.maxPoolSize=256`.
* **Runtime Profiling (JFR)**: To diagnose agent performance hot spots or memory leaks without adding measurement overhead, enable Java Flight Recorder profiling. See [How to Profile Load Tests with Java Flight Recorder (JFR)](/xlt/how-tos/java-flight-recorder/).
