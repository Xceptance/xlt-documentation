---
title: "Client Performance"

weight: 600
type: docs

description: >
  XLT can control a real browser to solve more tricky performance test challenges.
---

## What Do We Need Client Performance Testing For?

Performance is a tricky topic. Automated performance tests can measure how fast your site really is, but then there is **perceived performance**, which is a measure of how fast a visitor _thinks_ your site is. Jakob Nielsen offers some advice on this:

* 0.1 second is about the limit for having a visitor feel as though the system is reacting instantaneously.
* 1.0 second is about the limit for a visitor’s flow of thought to stay uninterrupted, even though the visitor will notice the delay.
* 10 seconds is about the limit for keeping the visitor’s attention focused on the task they want to perform.

The performance can be measured by taking a closer look at several events in a web page's life cycle, for example the following measurements by Performance Timing API:
* **domLoading:** Got the first bytes and started parsing
* **domInteractive:** Got all HTML, finished parsing, finished async JS, finished blocking JS, starting deferred JS processing
* **domContentLoaded:** Deferred JS was executed, DomContentLoaded event fires and triggers event handler for JS
* **domComplete:** All content has been loaded (aka images and more), DomContentLoaded event was fully processed (attached JS), fire onload event and start processing JS
* **loadEventEnd:** All JS attached to onload was executed, dust should have settled  

But the user does not care about technical details, the user judges by impression and has no interest in DOM numbers, as there is no relation between DOM numbers and visual impression. This is why newer browsers expose a Paint Timing API, which offers several measurements related to perceived performance, for example **first-paint**, **first-contentful-paint**, or also **"visual complete"** (the page is complete and does not load or move anymore). 

{{< TODO >}}finish/completely rewrite this?{{< /TODO >}}

https://training.xceptance.com/xlt/90-cpt.html#/10
