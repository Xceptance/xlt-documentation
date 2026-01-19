---
title: "The Delicate Art of Load Test Scripting"

weight: 10
type: docs

description: >
  We are often asked why we need that much time to recheck load test scripts. So, here is our explanation in a few sentences.
---

“Why is the script broken? We haven’t changed anything.” A load test script can break in two ways. It can break explicitly, triggering an exception or assertion that provides a clear error message. Alternatively, it can be subtly incorrect—appearing to pass while being flawed and leading to misleading results.

“But we haven’t changed anything in the UI!” Load test scripts don’t magically adjust. You shouldn't assume load testing is simply UI automation on steroids; UI tests are resource-intensive because of modern browsers. This makes them inefficient and costly for simulating large user counts, whereas load tests use lightweight, lower-level simulations designed for true scale.

“So, where did this change occur?” Scripts break due to changes in HTML/CSS, JSON, required data, or application flow. They become *incorrect* because of shifts in optional data, incorrect request ordering, or outdated data.

The secret to low script maintenance lies in early communication with performance testers and thorough data validation. The more precise an API is, the easier it is to maintain scripts. This ensures your load tests remain a true reflection of reality, not just a green checkmark!

## Introduction

It’s a question that echoes through many development teams: “Why do we need to update the load test scripts? We haven't changed anything in the UI!” This common query stems from a perfectly logical assumption—if the user interface looks the same, surely everything behind it is too, right? Unfortunately, in the complex world of modern applications, what you see isn’t always what you get, and a static UI can hide a whirlwind of activity that directly impacts your performance tests.

Let’s start with what can compromise your load testing scripts. It is crucial to distinguish between a script that is completely broken and one that is simply incorrect.

* **Broken scripts**: These are scripts that fail to execute. If it’s a JUnit test, for example, you’ll see an explicit failure message. The script cannot complete its task.
* **Incorrect scripts**: These are more deceptive. They will execute fully and report a “green” result, but they haven't performed as intended. They provide misleading data, which is why load test validation cannot be based simply on the reported outcome.

## Test Automation vs. Performance Tests

Since these concepts are often mixed up, leading to the assumption that load test scripts are as easily maintainable as functional automation scripts, let’s explore the key differences:

* **Test automation** is typically about verifying functionality. Think of it as automating manual tests to gain faster feedback. These tests are often UI-based and interact with a real browser or application.
* **Performance/Load Tests** simulate user behavior at a much lower level than the UI. This allows direct control over network calls, data, and filtering, while removing the heavy dependency on a real browser.

Now, you might think, “Why not just scale up my UI automation tests?” Good question! But here’s why that typically doesn’t work.

Modern browsers are resource-intensive, requiring multiple CPUs, at least 512 MB of memory, and often a GPU. Attempting to scale tests with actual browsers consumes excessive resources, making high-traffic testing expensive and unreliable.

{{< image src="xlt/browser-vs-loadtesttool.jpg" >}}
Illustration: Browsers at Scale vs. Load Test Simulation
{{< /image >}}

Furthermore, running a UI test at scale would be inefficient. You would be rendering the same UI millions of times without gaining new performance insights. Browsers are also difficult to control remotely, especially when you need to filter or tweak requests to target (or avoid) specific resources. This filtering can lead to issues due to JavaScript dependencies or rendering quirks when third-party calls are skipped. Finally, browsers struggle to signal when they are truly “ready” because so much occurs asynchronously. Modern websites are rarely idle, making the “ready” state difficult to define precisely.

In short: **performance test scripts are not the same as functional automation scripts**. The latter are typically UI-based, operate at a higher level, and are less sensitive to low-level changes like the number of requests or minor parameter tweaks. Performance scripts operate within these fine-grained details.

## What Makes a Script Break?

These are the issues that will cause your script to fail:

* **HTML Changes**: CSS selectors or XPath expressions break because the underlying HTML has changed.
* **Required Data Changes**: The mandatory data for submission has changed, but the script continues to send outdated information.
* **Flow Changes**: The application's workflow has changed (e.g., a checkout process was shortened or lengthened), and the script can no longer follow it.
* **Invalid Test Data**: The script uses incorrect test data that the system cannot process.

## What Makes a Script Incorrect?

These are the subtle issues that allow a script to run but produce inaccurate results:

* **Optional Data Changes**: The optional data that can be submitted has changed. The script runs, but it no longer accurately reflects real user behavior.
* **Extra or Missing Requests**: The script sends unnecessary requests or misses essential ones.
* **Incorrect Request Order**: Calls occur in a sequence that does not match a real user journey.
* **Outdated Test Data**: Data is technically valid but no longer represents the current system state. If the system under test lacks sufficient validation, issues may go unnoticed instead of causing a failure.

These are just a few examples; while a JSON format change might break one script, it might only lead to incorrect results in another.

## How to Keep Your Scripts from Going Haywire

To minimize friction between scripts and the application, script maintenance should be integrated into the development process. Effective communication is the most critical factor. If performance testers are informed of feature changes early, they can proactively adjust scripts, reducing the need for constant, reactive reviews.

Here is how to manage these changes:

* **Communicate Changes**: Especially when the front-end involves new or removed requests, logic updates, or changes to the data being collected or sent.
* **Decommission Old Functionality**: When a feature is removed from the front-end, ensure it is disabled on the back-end as well. This causes scripts to fail if they attempt to hit old endpoints, forcing necessary updates.
* **Validate All Mandatory Data**: Always verify the data required for an action; avoid leaving fields as "optional" if they are necessary for a valid state. This improves both performance test accuracy and overall application security.

In short: Every UI change that affects already scripted functionality should ideally result in a broken script state. This requires the performance tester to validate responses carefully and the application engineer to implement clear boundaries that communicate what is required or disallowed.

Naturally, there are cases where clear boundaries cannot be set—for instance, if the application state is opaque or if you depend on flexible third-party APIs.

## Conclusion

Load testing scripts differ significantly from standard functional automation, with unique requirements for creation and maintenance. Recognizing the fundamental differences between “broken” and “incorrect” scripts, and between performance testing and UI automation, is vital for achieving accurate and reliable performance insights. By integrating script maintenance into the development process through proactive communication and robust practices, teams can ensure their performance tests remain effective, reflecting the true state of their application under load.

In conclusion, building and maintaining load testing scripts is a distinct discipline, and understanding their nuances is key to obtaining high-quality performance insights.

P.S. XLT provides the option to run load tests using real browsers for scenarios that are difficult to script but have low traffic. This is a perfect blend of test automation and load testing—ideal for regressions and sanity checks. It serves as an excellent first line of defense.

P.S. Depending on the framework and architecture used, adopting a headless architecture (such as a PWA) typically involves a significant increase in scripting effort.
