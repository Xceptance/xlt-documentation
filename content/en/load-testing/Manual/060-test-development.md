---
title: "Test Development"

type: docs
weight: 60

description: >
    XLT supports the local development and execution of test scenarios for faster development and debugging.
---

Test development happens locally, in your IDE of choice. You will add test cases for all needed scenarios, or adjust those of a sample test suite to your needs. If you need to do some functional testing, test data may be added.

You can run those tests as a JUnit test from your IDE, and you should do so repeatedly for consolidating the tests you wrote, because you really want stable and predictable tests for your load test.

For load testing, you usually want some randomness in your scenarios - with XLT, you can easily add that as well as re-run single test cases with the exact same “random” input as before for consolidating and debugging purposes.


- JUnit test concept
- Integrates normally into IDE and CI
- Performance test case is also a regression test case
- Result browser delivers insides
- Regular debugging works just fine
- Reuse via Java concepts

* Testcase entwickeln 
	* Szenario ausdenken
	* ggf. in Einzelschritte zerlegen
	* Einzelschritte zur Wiederverwendung in Actions/Flows --> verlinken auf Concepts
* repeated execution, consolidation, random dings, data?

## Basic rules for Test Development

{{% note notitle %}}**tl;dr:** Keep it short, keep it simple, reduce dependencies, stress re-usability and clean up when you're finished.{{% /note %}}

* **Do not overload the test cases.** Focus on the (one) key purpose of the test case. It is better to create a lot of short tests than only a few large test cases covering too many features to test. This helps to maintain and debug the tests and it is also much easier to locate the root cause of real problems if a test case fails.
* **Do not test the same feature again and again.** If possible, do not test the same feature again and again in several test cases but find the shortest way to get to a specific page! For example when testing different shopping bag or checkout features in several test cases, try to avoid searching product and browsing to product detail page. Instead, start the test case with opening the product detail page directly. In case search does not work, only the test case covering search will fail. If search is used in all the test cases, all of them will fail and debug is needed to find out what's wrong.
* **Use flows to perform repeating sequences.** If you realize that you're using an identical sequence of several calls more then once, then think about extracting it to a flow. Not only does it save you time when creating the test cases but also makes maintenance much easier. Adjusting an xpath then only has to be done once in the flow instead of repeating fixes in each single test case. Typical sequences that have to be done in many test cases and are worth a flow are logging-in or adding products to cart.
* **Be consistent in using the flows you created.** For example, do not perform login using the flow in some test cases and without using the flow in other test cases. Otherwise you will lose control.
* **Add comments to your test cases and use meaningful names.** Write comments to document the purpose of each test case step as long as you can remember. At least describe the target element with a clear name. Reading and understanding a test case for maintaining or debugging purposes can be tricky if you just see `HtmlUtils.findSingleHtmlElementByXPath(page, "html/body/div[3]/div[2]/div/ul/li[2]/a")`. It definitely helps to read a comment like _Click 'Login' button_.
* **Clean up at the end of your test case.** For example, after adding products to cart or addresses to address book make sure that the test case itself does remove them at the end. make sure each test execution starts under identical conditions. Validations may fail for the second test run if the previous one did not clean up all artifacts.
* **Be prepared if the previous test run did not clean up and add some randomization where needed.** Test cases may fail because they try to add something that is already existing. The test case might add something during a failed test run that has not been finished (and therefore the clean up at the end of the test case has not been performed). Try to access objects or list entries randomly, so even in case the clean up did not work properly, the next execution has at least a chance to pass.
* **Use robust xpath expressions.** Xpaths or generated IDs are likely to change. To avoid test case maintenance after a new build of the tested application you should use target element locators that are as unspecific as possible while still being unambiguous, so there is a good chance it will hold even if some part of the application changes. For example for a cart link, instead of `html/body/div[3]/div[2]/div/ul/li[5]/div/div[3]/div[1]/div/a`
you should better use something like `//div[@id='cart']/div[1]`. Finding elements by ID is easiest, of course, and can be used whenever possible.

