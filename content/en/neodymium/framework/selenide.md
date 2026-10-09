---
title: Selenide
description: "Selenide integration in Neodymium."
sidebar:
  label: Selenide
  order: 550
---

[Selenide](https://github.com/codeborne/selenide/) is a test automation framework built on top of [Selenium Webdriver](https://github.com/SeleniumHQ/selenium) that allows you to write concise test.

If you have ever used jQuery, the syntax will look familiar to you. Furthermore, common problems that would have to be overcome when using a plain Selenium Webdriver (like stale element handling or timeouts) are avoided, as Selenide facilitates:

* Stale element handling
* Handling timeouts
* Shutting down the browser

<u>**Used Versions**</u>:

* Selenium: 4.26.0
* Selenide: 7.11.1

All changes and new introduced features are found [here](https://selenide.org/blog.html)

**Remark**:

To use the Selenide Network Mock please set `neodymium.selenideProxy = true` in `config/neodymium.properties`.
