---
title: "No Coding Test Suite"

weight: 30
type: docs

description: >
  This test suite gives you testing via YAML definitions with barely any code needed.
---

## Introduction

One is often faced with the requirement to just fire a couple of simple URLs, to verify the performance or functionality of a single feature, to create load in order to stress environments and monitor certain things, or simply to create load in addition to another load test.

TestSuite-NoCoding  is a test suite for XLT and delivers an easy way to define and fire HTTP requests and offers various tools to validate the responses. Additionally it is possible to filter, select, and store data from the response with the view of inserting it into the next request or its validation. This is a fast and likewise easy way to define test cases, since **no programming** is needed!

The test suite relies on the library <a href="https://github.com/Xceptance/xlt-nocoding" target="_blank">xlt-nocoding</a> in order to interpret and execute the no-coding test definitions. Since the source of that library is open and licensed under the Apache License V2.0, feel free to extend and customize it.

### Features

* Reads test definitions from files. Supported file types:
    * YAML
    * CSV
* Supports the validation of:
    * Cookies
    * HTTP response headers
    * HTTP response content
* Offers various validation methods in order to validate data.
* Supports three modes to run the test-cases:
    * DOM: the responses are parsed into the DOM, which allows to select elements by XPath for validation purpose
    * LIGHT: there exists no DOM, which makes the test case fast to execute.
    * REQUEST: Only plain HTTP requests are sent and HTTP responses received, which makes this the fastest mode.
* Cookie handling is automatic
* JavaScript and Static Content can be handled automatically and also be switched off.
* ...

## Getting Started

The NoCoding test suite is available on <a href="https://github.com/Xceptance/testsuite-nocoding" target="_blank">Github</a>.

To learn more, try one of the following links.

* <a href="https://github.com/Xceptance/testsuite-nocoding/wiki" target="_blank">Overview</a>: In order to get an overview.
* <a href="https://github.com/Xceptance/testsuite-nocoding/wiki/Quickstart" target="_blank">Quickstart</a>: To get started.
* <a href="https://github.com/Xceptance/testsuite-nocoding/wiki/Examples" target="_blank">Examples</a>: To see some examples.

