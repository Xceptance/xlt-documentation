---
title: "Base REST Test Suite"

weight: 20
type: docs

description: >
  This test suite demonstrates how to test REST services or simple request/response examples.
---

## Introduction

This test suite provides an example for load testing a REST service with XLT. It shows some samples and universal concepts for easier handling of data, configuration, and test composition. It shows what is possible thanks to Java as scripting language on top of the XLT base feature set.
The test suite demonstrates the following features and functionalities:

### Base XLT Features

* Every test case is a JUnit test
* Use Eclipse or any other IDE to compile, run (as single test user), and debug
* The tests can run as a normal integration test or as part of a classic build process
* XLT measures, scales, and paces the testing
* Handling of test scaling, results collection and report building by XLT
* Fits your CI/CD pipeline, including comparison against previous runs
* Comfortable Maven setup

### Enhanced and New Features

* Configuration via YAML files supporting a region, locale, and site arrangement
* Centralized configuration and mapping of objects to support data types
* Central context for test execution data enabling easier programming
* Central data store, to pass stored data from one action to another
* Replayable randomness among test scenario executions

### Provided Test Cases

We provide different test cases, displaying different use cases and approaches. 

* Postman Echo Service Test (com.xceptance.loadtest.rest.tests.postman): This package contains some test showing different approaches on action handling as well as different REST specific examples including POST, GET, Basic Auth, validation and value extraction. 
* Wikipedia Tests (com.xceptance.loadtest.rest.tests.wikipedia): This package contains some more complex tests using the Wikimedia API, data storage and validation.
* Postcode Test (com.xceptance.loadtest.rest.tests.postcode): This package contains a test case showing an example for postcodes.io.

## System Under Test

This example test suite is targeting some example hosts, like the _Wikipedia API_, the _Postman Echo_ service, the _postcodes.io API_ and others. 
**Please be aware that none of these services designed or prepared to withstand a real load test.** Use these test cases ONLY for single experiments, as a base to script against your own API, or to generally learn about XLT in a REST context.

## Getting Started

The REST based Performance Test Suite is available on <a href="https://github.com/Xceptance/rest-load-test-suite" target="_blank">Github</a>.

The **README** contains many useful infos on XLT and how to work with this test suite, running your own load tests. 
