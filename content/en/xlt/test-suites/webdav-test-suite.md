---
title: "WebDav Test Suite"

weight: 40
type: docs

description: >
  WebDav can be tested with this test suite. It depends on a WebDav XLT-library.
---

## Introduction

The **WebDAV Test Suite** demonstrates how to load test WebDAV servers using XLT. It leverages a custom XLT library that provides standard WebDAV operations as pre-defined action classes.

You can build test scenarios by composing these configurable building blocks, while XLT handles request/response tracking and performance measurements.

We provide a demo suite that showcases how to integrate the library and includes a sample scenario covering all available WebDAV actions.

## Getting Started

The source code is available on GitHub:

* **[WebDAV Library](https://github.com/Xceptance/xlt-webdav)**: The core library providing WebDAV functionality (MIT License).
* **[Demo Test Suite](https://github.com/Xceptance/testsuite-webdav)**: A sample project demonstrating usage.

To get started, clone the **Demo Test Suite**. You only need the library source if you plan to modify it.

### Demo Server

To try the test suite, use the [Demo Application Server]({{< relref "../quick-start/demo-application" >}}) included with XLT. It features a built-in WebDAV server available at `http://localhost:8080/webdav/` or `https://localhost:8443/webdav/`.

* **Credentials**: `webdav` / `webdav`
* **Data Directory**: `<xlt>/samples/app-server/data/webdav`
