---
title: "Selenide"
linkTitle: "Selenide"
weight: 550
type: docs
description: "Selenide integration in Neodymium."
---

[Selenide](https://github.com/codeborne/selenide/) is a test automation framework built on top of [Selenium Webdriver](https://github.com/SeleniumHQ/selenium) that allows you to write concise test.

If you have ever used jQuery the syntax will look familiar to you. Furthermore, you don't have to worry about some of the major problems you would have to overcome if you were using a plain Selenium Webdriver since Selenide introduces:

* Stale element handling
* Handling timeouts
* Shutting down the browser

<u>**Used Versions**</u>:

* Selenium: 4.26.0
* Selenide: 7.11.1

All changes and new introduced features are found [here](https://selenide.org/blog.html)

**Remark**:

To use the Selenide Network Mock please set `neodymium.selenideProxy = true` in `config/neodymium.properties`.
