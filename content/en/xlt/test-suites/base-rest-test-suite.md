---
title: "Base REST Test Suite"

weight: 20
type: docs

description: >
  This test suite demonstrates how to test REST services or simple request/response examples.
---

## Introduction

The **Base REST Test Suite** demonstrates how to effectively load test REST services using XLT. It showcases universal concepts for data handling, configuration management, and modular test composition by leveraging Java as a scripting language.

This suite illustrates the following key features:

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

This suite targets public example services such as the **Wikipedia API**, **Postman Echo**, and **postcodes.io**.

> [!WARNING]
> These services are **NOT** designed to withstand actual load tests. Use these test cases **ONLY** for functional verification, as templates for your own API tests, or to learn XLT concepts. **Do not run heavy load tests against these public services.**

## Getting Started

The **Base REST Test Suite** source code is available on [GitHub](https://github.com/Xceptance/rest-load-test-suite).

The repository **README** provides essential information on:

* Framework architecture
* Test execution instructions
* Configuration details
