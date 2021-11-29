---
title: "Basic Knowledge"

weight: 10
type: docs

description: >
  What is XTC and what can you do with it?

---

## What is XTC?

XTC (**X**ceptance **T**est **C**enter) is the working title of a SaaS offering to deliver XLT as a service. It will increase efficiency, lower the time to test, and enables you to do all things you might have been doing [manually before](../../../load-testing/manual/310-test-execution/). It is still in development and continuously improved, but you can already use it. It allows you to:

* manage your load test projects,
* set up, configure, and run load tests,
* evaluate load test runs and share the results, and
* run continuous monitoring using browser-based test automation.

XTC load and monitoring service are based fully [XLT](../../../about-xlt/), hence everything you know about  [Load Testing](../../../load-testing/) is valid. [Test development](../../../load-testing/manual/060-test-development/) still takes place in your IDE and test suites live in your preferred GIT repo. 

XTC helps you to speed up the more tedious tasks of load testing:

* It simplifies the test setup, allows to duplicate tests, comment on the setup as well as on the results.
* It starts and stops all agent machines for you. You only have to define where you want the agents to be placed and how many agent you need.
* It automatically starts and stops a test, collects all results, and creates a report.
* It allows to share a test result quickly either as a secret public link or within your project setup.

XTC is getting better while you are reading this. Checkout the release notes <a href="https://docs.google.com/document/d/1mxxpDsrll2Uzc-1JWZnq-RDWV9rOYwF1V8lZnIRqs_o/edit#heading=h.pookjp6yrw21" target="_blank">to see what's new</a>!

### Availability
XTC is not part of the XLT open source ecosystem. XTC is a growing SaaS offering by Xceptance. It is also extensively used internally at Xceptance.

Xceptance will announce the general availability of XTC as soon as a defined state of maturity is reached. If you are already a customer of Xceptance, feel free to contact us if you are interested in evaluating XTC, want to provide feedback, or even use it in production, because we already do that.


## Sign Up/Log In

To use Xceptance Test Center, you need an account. You can easily sign up on https://xtc.xceptance.com/. XTC allows you to either select a password for your account, or use an external login provider (Google or Microsoft) for SSO. For more information, see [user accounts](../../200-manual/040-user-accounts).

Currently, your role and projects will be assigned by Xceptance. This will change in the future.

## Basic Structure

Projects in XTC are structured by organisation - you may select an organisation in the top nav bar and will then see the available projects of this org (see [UI Structure](../../200-manual/040-ui-stucture) for more detailed information).  

Projects can either be [monitoring](../30-qs-monitoring) or [load test](../20-qs-load-testing) projects and will have a different set of properties depending on their project nature. In short, load test projects are used to perform load/performance tests, while monitoring projects are useful to monitor an app's performance constantly over a longer time period. 
