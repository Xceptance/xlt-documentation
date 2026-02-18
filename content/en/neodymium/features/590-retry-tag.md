---
title: "Retrying Test"
linkTitle: "Retrying Test"
weight: 590
type: docs
description: "Retrying test to reduce flakiness."
---

#### Using the @Retry Annotation
The @Retry annotation is designed to stabilize tests impacted by known environmental issues or minor application flakiness. By retrying only specific errors, we maintain the integrity of our test reports without wasting time on manual re-runs.

##### 1. Basic Usage
By default, applying @Retry will attempt to run the test two additional times (for a total of three attempts) if any error occurs.

```Java
@NeodymiumTest
@Retry
public void myFlakyTest() {
    // This test will retry twice on any failure
}
```
##### 2. Customizing Retry Counts
If a specific test requires more (or fewer) attempts to pass consistently, use the maxNumberOfRetries parameter.

```Java
@NeodymiumTest
@Retry(maxNumberOfRetries = 4)
public void highlyUnstableTest() {
    // This test will retry 4 times after the initial failure
}
```
##### 3. Targeting Specific Error Messages
To prevent hiding legitimate bugs, you should restrict retries to specific error strings. The test will only retry if the error message contains any of the strings provided in the exceptions list.

```Java
@NeodymiumTest
@Retry(maxNumberOfRetries = 3, exceptions = { "Could not start a new session", "Error communicating with the remote browser", "UnreachableBrowserException" })
public void testNetworkDependentFeature() {
    // Only retries if the error message contains the specified text
}
```
##### 4. Annotation Inheritance
The `@Retry` annotation is overridable and additive. This is particularly useful for bigger test suites with hierarchy:

* **Abstract Base Class**: You can define a common set of retriable errors (like `SessionTimeout`) in a parent class.

* **Child Class**: The child class inherits those errors and can add its own specific exceptions to the list.

The logic will evaluate the exceptions parameter of the current test class in conjunction with all parent classes.

#### @Retry Annotation in Allure report
To provide full transparency, information about retriable and retried tests is integrated directly into the "Retries" tab of the Allure report. This makes it easy to monitor test stability and diagnose the root cause of transient failures.

##### Analyzing the Root Cause of Failures
If a test fails and is subsequently retried, an entry will appear in the "Retries" tab detailing each attempt.

* **Detailed Context**: Clicking the "Test failed, starting retry: n" link opens the full execution record for that specific attempt. You can view the exact steps performed before the failure, the original error message, and diagnostic attachments like screenshots and videos.

* **Outcome Visibility**: You can quickly see if the test eventually passed or if it continued to fail across all retry attempts.

  {{< image max-width="60%" src="neodymium/rety-with-success.png" >}}
  Example: Test retried and succeeded.
  {{< /image >}}

#####  Auditing Stable Tests for Cleanup
If a test is configured with @Retry but passes on its first attempt, Allure will display a "skip repetition" message in the Retries tab.

This feature is a powerful tool for maintaining test suite health:

* **Audit Tool**: By checking for these entries, you can identify tests that are no longer failing.

* **Clean-up**: If a test consistently shows "skip repetition" over a long period, it suggests the underlying issue has been resolved, and the @Retry annotation can be safely removed to keep the code clean.
If the test is marked to be retried on failure but there was no need to retry, you will see "skip repetition" message in the "Retries" tab of the test. By presents of these entries you can quickly check if there are any retries configured for the test and monitor if they can be removed as the failure case has not appeared for a while 

  {{< image max-width="60%" src="neodymium/test-successfull-without-retry.png" >}}
  Example: Test succeeded without retry.
  {{< /image >}}
  
#### Best Practices for Flaky Tests
 
* **Be Specific**: Use the exceptions filter to target known infrastructure issues.
* **Monitor Trends**: Periodically review which tests are being retried to identify root causes.
* **Document Why**: Add a comment explaining why a test is marked with @Retry.
* **Avoid High Retry Limits**: Retrying 10+ times usually points to a deeper issue that needs a code fix.