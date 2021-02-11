---
title: "Advanced Web Test Suite"

weight: 15
type: docs

description: >
  A comprehensive test suite that directly works on the XLT API, demonstrating most common use cases and possibilities. The grown-up sibling of the Basic Demo Test Suite.
---

## Introduction

Because there are many things that could be easier to handle, we built a more comprehensive version of a web test suite which combines many concepts to provide easier data and state management as well as improved set up capabilities. Like the basic web test suite, it is built for load testing a website with XLT. In comparison to our simple Posters loadtest suite which demonstrates basic XLT test suite design, this test suite goes the extra mile and implements universal concepts for easier handling of data, configuration, and test composition. It shows what is possible thanks to Java as scripting language on top of the XLT base feature set. The advanced Posters test suite demostrates the following features and functionalities:

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

The test suite is ready to be executed against the [Posters](https://35.184.136.113:8443/posters/) demo store. Please note that this setup is for testing purposes only and does not handle a lot of load. Please setup your [own copy of the Posters demo store](../../quick-start/20-demo-application/) if you want to experiment with executions of higher load factors and more complex test configurations.

## Getting Started

The Advanced Web Test Suite is available on [Github](https://github.com/Xceptance/posters-advanced-loadtest-suite).

The **README** contains many useful information on XLT and how to work with this test suite, running your own load tests. 
