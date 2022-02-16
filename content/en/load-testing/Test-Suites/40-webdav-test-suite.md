---
title: "WebDav Test Suite"

weight: 40
type: docs

description: >
  WebDav can be tested with this test suite. It depends on a WebDav XLT-library.
---

## Introduction

It is possible to load test WebDAV servers with XLT. Therefore we have created a small
library that sits on top of XLT and provides the usual WebDAV commands
as predefined action classes. Simply compose your test scenarios from
these configurable building blocks. The library executes the
corresponding WebDAV operations and takes care of gathering all the
request/response details and timings.

We also provide a demo **WebDAV test suite**. It does not only show how to
include the library in a test suite project, but also comes with a
simple scenario that demonstrates the usage of all available WebDAV
actions.

## Getting Started

The source code for both the
[library](https://github.com/Xceptance/xlt-webdav) and the [demo test suite](https://github.com/Xceptance/testsuite-webdav) is available on
GitHub under the MIT License. If you just want to create test scenarios,
simply clone the demo test suite. Unless you need to modify or extend
the library, you won’t have to clone it too. If you need to do so
nevertheless, please let us know, so all XLT users can benefit from your
improvements. Pull request are welcome!

To conveniently try out the demo test suite, the [demo application server]({{< relref "../quick-start/20-demo-application" >}})
that ships with XLT has been enabled to act as a WebDAV server. The
WebDAV server application is available at [http://localhost:8080/webdav/](http://localhost:8080/webdav/)
and [https://localhost:8443/webdav/](https://localhost:8443/webdav/), respectively. In the latter case,
make sure to configure your WebDAV client to accept self-signed
certificates. In order to get access, you need to provide valid user
credentials (use *webdav* for both username and password). The root
directory used by the WebDAV server to serve all the files is located at
`<xlt>/samples/app-server/data/webdav`. If this directory is not
present, it will be created automatically.

