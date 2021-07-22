---
title: "About XTC"

weight: 1
type: docs

description: >
  The basic idea and things you can do with XTC.
---

## What is XTC?

XTC (**X**ceptance **T**est **C**enter) is our working title for a UI to do the jobs that were hitherto [performed manually on the console](../../load-testing/manual/310-test-execution/) with [XLT](../../about-xlt/). While _it is still in development and growing_, you can already use it to:

* manage your load test projects,
* set up, configure and run load tests,
* evaluate load test runs, and
* set up and perform monitoring (as in, regular test runs of a fixed set of scenarios, just to make sure your app works as expected at all times - XTC can alert you if anything goes wrong).

Everything XTC can do is based on [XLT](../../about-xlt/), so the basic information on [Load Testing](../../load-testing/) applies. [Test development](../../load-testing/manual/060-test-development/) still happens in your IDE and test suites live in your preferred version control system. Right now, XTC only helps you to ease some of the more tedious tasks of the load testing or monitoring process:

* You don't have to remember the console commands needed to set up, configure and start a test, as XTC offers a UI to do just that.
* You don't have to start or shut down machines manually in your Google Cloud - just define the number, size and location of the machines you need, and XTC will do the job for you. (But of course you can still use machines outside the Google Cloud if you want to.)
* You don't have to trigger test start, download of results or report generation manually in many single steps. This is all part of a test run and XTC will automatically do it for you (while still offering you the possibility to get intermediate results and current state information at every point of the test run).
<!--* As an additional convenience, XTC enables you to schedule test runs, so you don't have to set yourself an alarm to start the test on time or get up for a nightly test run to start your machines - XTC can just do that for you.--> 

XTC is getting bigger and better even while you read this, so <a href="https://docs.google.com/document/d/1mxxpDsrll2Uzc-1JWZnq-RDWV9rOYwF1V8lZnIRqs_o/edit#heading=h.pookjp6yrw21" target="_blank">stay tuned to see what's new</a>!
