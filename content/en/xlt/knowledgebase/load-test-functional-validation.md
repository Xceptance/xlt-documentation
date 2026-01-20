---
title: "Should Load Tests Validate Functionality?"

weight: 40
type: docs

description: >
  Why should load tests validate functionality? This article answers this question.
---

Our answer to this question is a definitive **yes**. While you might limit the scope of validation compared to functional testing, relying solely on HTTP response codes is a critical mistake. Checking for a single phrase or keyword is often insufficient to guarantee correctness.

## Reasons and Examples

### Response Codes

Modern web applications often incorrectly return HTTP 200 OK even when displaying application-specific error pages. Similarly, API responses under load might return HTML status pages instead of the expected JSON or XML, breaking the client without triggering a standard HTTP error.

### Page Content

Validation is the only way to ensure the entire page was received. For example, checking for the closing `</html>` tag confirms the connection wasn't terminated prematurely.

Consider an e-commerce search under load: instead of returning "200 matches found", it might display "No matches found" due to a backend timeout. This is a valid page technically, but a functional failure. Without content validation, this flaw would go unnoticed.

If your tests implement real user flows—extracting data from pages to drive subsequent requests—you create a feedback loop that naturally uncovers inconsistencies. Broken or partial content will cause the next step in the flow to fail, highlighting issues that basic checks miss.

### State Validation

How do you distinguish a "Login Succeeded" page from a "Login Failed" page without content validation? Both are valid scenarios, and a failed login often returns HTTP 200. Even if the application is designed to return HTTP 401 for failures, it might behave differently under load. Validating unique elements (like a "Welcome" message) is essential.

Always assume the application behaves differently under heavy load, both in timing and functionality. This unpredictability is exactly why we run load tests.

## A Real-World Example

We once observed a case where a new component appeared to perform significantly better under increased load. In reality, the application was failing fast, returning small error pages instead of the full content. Because the tester only tracked response times and ignored response content, they mistook a broken application for a performance improvement.

## Recommended Validation Strategy

As specialists in load and performance testing, we recommend a layered approach to validation:

### Basic Validation

* **Response Codes**: Verify expected HTTP status codes.
* **Structure**: Check for the presence of key layout elements like headers, footers, and navigation menus.
* **Completeness**: Ensure the document is complete (e.g., closing HTML tags, valid JSON/XML structure).

### Activity-Specific Validation

Validate the specific outcome of business actions:

* **Search**: Verify that searching for a known product yields results, and invalid searches return the correct "no results" message.
* **Cart**: Check that adding items updates the cart quantity and distinct total price correctly.
* **Checkout**: Validate order confirmation details, such as order number format and prices.
* **Session**: Ensure the user remains logged in by checking for personalization elements (e.g., "Welcome, User").
* **Negative Checks**: Verify that logged-out users do not see personalized content and that carts are empty when starting a new session.

We frequently find functional issues during load testing that would have remained undetected without proper validation. Every extra validation step pays off when it catches an elusive bug.

## Verdict

Extensive validation is crucial for effective load testing. Always assume the application might fail in ways that do not trigger 404 or 500 errors.

Load testing is about finding the unusual and unexpected. Thorough validation ensures that performance metrics reflect a working system, rather than a fast-failing one. While you may skip some heavy validations for specific high-throughput experiments, never strip them out completely.

This article was created as a response to a question on StackExchange: [Should load test validate functionality?](http://sqa.stackexchange.com/questions/10474/should-load-test-validate-functionality)

{{% note %}}
Load testing at scale requires hardware resources. Make sure to have enough resources to run your load test. The more validation you perform, the more resources you need. That might contraindicate the need for validation but it is a trade-off you have to make.

You can run sampled validation to reduce the hardware needs.
{{% /note %}}
