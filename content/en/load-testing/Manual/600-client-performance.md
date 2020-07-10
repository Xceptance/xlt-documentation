---
title: "Client Performance"

weight: 600
type: docs

description: >
  XLT can control a real browser to solve more tricky performance test challenges.
---

## What Do We Need Client Performance Testing For?

Performance is a tricky topic. Automated performance tests usually run on server side only, that means there is no real browser involved that would render the requested content to output the actual application page the user would see and interact with. While these server side tests are easier on test resources, enable large scale testing and are way easier to automate than a complex UI with JavaScript based logic handling, sometimes you will still need to go one step further:

Automated server side tests can measure how fast your site really is, but then there is **perceived performance**, which is a measure of how fast a visitor _thinks_ your site is. This is roughly related to server-side performance, but the user does not care for technical details, what matters to the user is the visual impression: when do I see that something is happening? When do I see the content I was waiting for? When is the site complete and does not load or move any more? 

On the user's side, the important thing is to be able to interact with the application and reach the goal quickly, which means the loading must be fast enough for the user to stay focused and to be able to execute tasks quickly. 

[Jakob Nielsen](https://www.nngroup.com/articles/response-times-3-important-limits/) offers some advice on perceived performance:

* **0.1 second** is about the limit for having a visitor feel as though the system is reacting instantaneously.
* **1.0 second** is about the limit for a visitor’s flow of thought to stay uninterrupted, even though the visitor will notice the delay.
* **10 seconds** is about the limit for keeping the visitor’s attention focused on the task they want to perform.

## Common Reasons for Perceived Bad Performance (and How to Avoid Them)

Perceived bad performance depends on a number of factors. Reasons for bad performance include:

* JavaScript blocks download of resources and slows down the page: a complex piece of JavaScript code executed on load causes the browser the interrupt the download of network resources and slows down the loading time of the entire page

* several CSS lookups for the same object increases execution time (better save the lookup result to a variable)

* too many XHRs: JavaScript and XmlHttpRequests (XHR) are the basis for AJAX (asynchronous JavaScript and XML), which is often used for paging and other common functions of web applications that interactively change the DOM tree. But often there are too many calls, requesting too much information. If possible, batch calls should be used to get the necessary info with a minimum number of calls.

{{< TODO >}}continue/finish{{< /TODO >}}

## How to Measure Perceived Performance

The performance can be measured by taking a closer look at several events in a web page's life cycle, for example the following measurements by Performance Timing API:
* **domLoading:** Got the first bytes and started parsing
* **domInteractive:** Got all HTML, finished parsing, finished async JS, finished blocking JS, starting deferred JS processing
* **domContentLoaded:** Deferred JS was executed, DomContentLoaded event fires and triggers event handler for JS
* **domComplete:** All content has been loaded (aka images and more), DomContentLoaded event was fully processed (attached JS), fire onload event and start processing JS
* **loadEventEnd:** All JS attached to onload was executed, dust should have settled  

{{< TODO >}}continue/finish and rewrite the below{{< /TODO >}}

But the user does not care about technical details, the user judges by impression and has no interest in DOM numbers, as there is no relation between DOM numbers and visual impression. This is why newer browsers expose a Paint Timing API, which offers several measurements related to perceived performance, for example **first-paint**, **first-contentful-paint**, or also **"visual complete"** (the page is complete and does not load or move anymore). 

## Measuring Client Performance with XLT

{{< TODO >}}finish{{< /TODO >}}

https://training.xceptance.com/xlt/90-cpt.html#/10
