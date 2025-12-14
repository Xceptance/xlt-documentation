---
title: "Advanced Web Test Suite"

weight: 15
type: docs

description: >
  A comprehensive test suite that directly works on the XLT API, demonstrating most common use cases and possibilities. The grown-up sibling of the Basic Demo Test Suite.
---

## Introduction

The **Advanced Web Test Suite** is a comprehensive framework designed to handle complex testing requirements. It builds upon the concepts of the basic suite but introduces advanced features for easier data management, state handling, and test composition.

Unlike the simple [Posters Simple Load Test Suite](https://github.com/Xceptance/posters-simple-loadtest-suite), this suite implements universal concepts such as a page object model, centralized configuration, and component-based modeling. It is the recommended starting point for real-world load testing projects that require scalability and maintainability.

The advanced suite demonstrates the following capabilities:

### Base XLT Features

* Every test case is a JUnit test
* Use Eclipse or any other IDE to compile, run (as single test user), and debug
* The tests can run as a normal integration test or as part of a classic build process
* XLT measures, scales, and paces the testing
* Handling of test scaling, results collection and report building by XLT
* Fits your CI/CD pipeline, including comparison against previous runs
* Test design adhering to page object model
* Comfortable Maven setup

### Enhanced and New Features

* Configuration via YAML files supporting a region, locale, and site arrangement
* Centralized configuration and mapping of objects to support data types
* Central context for test execution data enabling easier programming
* Component based modelling of the site under test
* Replayable randomness among test scenario executions

The test suite is ready to be executed against the [Posters](https://posters.xceptance.io:8443/) demo store. Please note that this setup is for testing purposes only and does not handle a lot of load. Please setup your [own copy of the Posters demo store]({{< relref "../quick-start/demo-application" >}}) if you want to experiment with executions of higher load factors and more complex test configurations.

{{% warning %}}
The installation is for testing purposes and might not feature its own valid certificate.
{{% /warning %}}

## Getting Started

The **Advanced Web Test Suite** source code is available on [GitHub](https://github.com/Xceptance/posters-advanced-loadtest-suite).

The repository **README** provides detailed instructions on:

* Setting up the project
* Configuring your test environment
* Running load tests
