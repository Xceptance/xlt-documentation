---
title: "No Coding Test Suite"

weight: 30
type: docs

description: >
  This test suite gives you testing via YAML definitions with barely any code needed.
---

## Introduction

The **No Coding Test Suite** enables you to define and run load tests using simple YAML configuration files, eliminating the need for Java programming.

It is ideal for:

* Verifying single URLs or API endpoints
* Creating background load to stress environments
* Validating functional correctness without complex logic

This suite relies on the open-source **[xlt-nocoding](https://github.com/Xceptance/xlt-nocoding)** library.

### Features

Key features include:

* **Flexible Input**: Supports test definitions in YAML and CSV formats.
* **Validation Tools**: Built-in validation for cookies, response headers, and content.
* **Execution Modes**:
  * **DOM**: Full parsing for XPath-based validation.
  * **LIGHT**: Fast execution without DOM overhead.
  * **REQUEST**: Maximum performance, sending only plain HTTP requests.
* **Automatic Handling**: Smart management of cookies, static content, and flexible data filtering for test flows.

## Getting Started

The **No Coding Test Suite** source code is available on [GitHub](https://github.com/Xceptance/testsuite-nocoding).

For comprehensive documentation, visit the repository Wiki:

* [Overview](https://github.com/Xceptance/testsuite-nocoding/wiki)
* [Quickstart Guide](https://github.com/Xceptance/testsuite-nocoding/wiki/Quickstart)
* [Usage Examples](https://github.com/Xceptance/testsuite-nocoding/wiki/Examples)
