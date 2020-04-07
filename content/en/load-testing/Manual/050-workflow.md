---
title: "Workflow"

weight: 50
type: docs

description: >
  The recommended way to a working loadtest.
---

## The Recommended Steps to a Running Load Test
XLT is a powerful tool and as such might seem complex at first sight. But the way to your first running load test does not need to be hard, and we are here to help you. As a software developer or developer in test you will find a thousand ways to reach your testing goal with XLT, as you can just use all your previous experience with Java and Junit, but this is what we recommend you to do:

### Have a Test Suite

You will want a [test suite](../450-test-suites) for your tests to live in (which is basically a Java Project containing your test cases - that don't _have to_ be written in Java - and everything else that is needed to run your tests later. Of course you can start one from scratch, but we provide you with a bunch of [sample test suites](../../test-suites) for common use cases. You can just browse their Github projects, clone them to your local machine, set them up as a project in your favorite IDE, understand the underlying concepts and adjust them to your needs. 

### Make a Plan

Plan what you are going to do. This means: 
* **Expected load**: have some numbers ready what load your application should be able to handle. You are testing to cushion the blow of app-demanding periods, so maybe look at your statistics from the last holiday season? There is no "default load" that will be applied to your application - XLT allows and demands you to configure the load that will be applied for all test scenarios (seperately, if you need that). 
* **Test scenarios**: Know what typical scenarios for user interaction with your application are, as you will model these as test scenarios. Our sample test suites contain some typical scenarios for ecommerce platforms, so maybe you will find inspiration in this.
* **Environment**: Think about the environment of the application your are going to test. You might not want to apply all the load to your live system, but the hardware underlying the tested application should be as close as possible to that of the live system in any case. Also think of third-party systems such as order management or payment providers - you will need a way to circumvent these for your tests, as they might have an influence on response times that is completely out of your control (and also you don't want to deal with tons of test orders in your system).
* **Mise en place**: what French chefs call the strategy to have everything in place before starting to work can also be applied to your testing. Have your system under test ready before scripting your tests! Tests should model real-world user interactions with your application as close as possible, so if your application still changes every day while you are writing complex test scenarios, you will do the same work over and over, modelling the ever changing interactions, and easily become frustrated.

### Develop your Tests

[Test development](../060-test-development) happens locally, in your IDE of choice. You will add test cases for all needed scenarios, or adjust those of a sample test suite to your needs. If you need to do some functional testing, test data may be added. 

You can run those tests as a JUnit test from your IDE, and you should do so repeatedly for consolidating the tests you wrote, because you really want stable and predictable tests for your load test. 

For load testing, you usually want some randomness in your scenarios - with XLT, you can easily add that as well as re-run single test cases with the exact same "random" input as before for consolidating and debugging purposes.

### Define your Test Setup

When you have finished your test suite, to get ready for load testing you will have to [setup](../300-test-setup) your load test. XLT is highly configurable. You will define what load will be applied (either in terms of user count or arrival rate, per test case if needed or globally for the test suite), what test scenarios should be run and how tests are supposed to work (in terms of thinktimes, timeouts, proxies, error rate limits), then configure the environment used for testing (master controller and agent controllers). Maybe you need different setups for several test runs - you can prepare them all upfront, then reference the needed properties for the current test run. And since everything can be varied and overwritten and you can also use includes for your properties, you don't need to write more than necessary here.

### Run a Load Test

Finally, [run your load test](../310-test-execution)! This can happen on your local machine as long as you only want low load, but for high load you will want to use a cluster of test machines as your distributed load generation environment. In any case you will need the master controller to reference your test suite, distribute the load across the used agent controllers, control the test run and let you get the results when it is finished.

### Evaluate the Results

An XLT load test writes result data all the time that it is running, so you are able to check intermediate test results while the test is still in progress as well as generate a [final report](../320-test-evaluation) when testing is finished. The report contains detailed data about the test run in HTML format, which is easy to read and share, but there is also a machine readable XML version. Also, the format for result data is plain text (csv), which is perfect for searching all things outside the ordinary. If you want to compare two or more test runs, you will also find [report options](../530-reports) for that. 


