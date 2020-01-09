---
title: 
linkTitle: 

weight: 10

date: 2019-12-31

description: >
  Text.
---

This user manual comprehensively illustrates the use and features of the
regression and load testing tool *Xceptance LoadTest* (XLT). To get the
most out of the following explanations and to work effectively with XLT,
a basic understanding of web technologies, Java, and the JUnit concept
may be helpful.

# What is XLT?

XLT is a tool that lets you easily develop and run both regression and
load tests for web applications. Nearly every software providing access
via HTTP/HTML can be tested; for the testing of applications using Web
2.0 technologies, XLT features extensive JavaScript support. Besides
pure web testing, XLT additionally offers SQL tests, RCP-based
application tests, or any other test meant to run on platforms
supporting Java.

## XLT Script Developer

XLT Script Developer, a Firefox Add-on, is a convenient user interface
for the scripting and running of test cases and test suites. While you
navigate through a website, it records the page flow and features a wide
range of validations. For the programming of more complex test scenarios
or validations serving your individual purposes, test cases can be
easily exported to Java and edited in an IDE.

## XLT Framework
The XLT framework offers various programming interfaces for writing
individualized test cases in Java. Starting with Java code automatically
generated from the test cases recorded with XLT Script Developer, you
can extend your test suite using the XLT API. It features the *XLT
Scripting API*, that is a high-level command scripting API with a very
intuitive syntax, and the [WebDriver API](WebDriverAPI). The XLT
framework furthermore includes the lower-leveled *XLT Action API* based
on [HtmlUnit](http://htmlunit.sourceforge.net/).

The XLT API provides a programming paradigm to translate all test
scenarios into [JUnit4](http://www.junit.org/) tests. The principles of
JUnit4 and its annotations are used to implement and tag test cases.
Thus, each XLT test is also a JUnit test, which allows you to execute
XLT tests just like any other unit test within a build process.

\[WebDriverAPI\]http://seleniumhq.org/docs/03\_webdriver.html\#selenium-webdriver-api-commands-and-operations
