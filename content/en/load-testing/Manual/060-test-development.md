---
title: "Test Development"

type: docs
weight: 60

description: >
    XLT supports the local development and execution of test scenarios for faster development and debugging.
---

Execute tests locally to develop and verify

- JUnit test concept
- Integrates normally into IDE and CI
- Performance test case is also a regression test case
- Result browser delivers insides
- Regular debugging works just fine
- Reuse via Java concepts

* Testcase entwickeln 
	* Szenario ausdenken
	* ggf. in Einzelschritte zerlegen
	* Einzelschritte zur Wiederverwendung in Actions/Flows --> verlinken auf Concepts
* repeated execution, consolidation, random dings, data?

Test development happens locally, in your IDE of choice. You will add test cases for all needed scenarios, or adjust those of a sample test suite to your needs. If you need to do some functional testing, test data may be added.

You can run those tests as a JUnit test from your IDE, and you should do so repeatedly for consolidating the tests you wrote, because you really want stable and predictable tests for your load test.

For load testing, you usually want some randomness in your scenarios - with XLT, you can easily add that as well as re-run single test cases with the exact same “random” input as before for consolidating and debugging purposes.

Define your Test Setup

