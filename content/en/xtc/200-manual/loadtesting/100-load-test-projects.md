---
title: "Features of Load Test Projects"

weight: 100
type: docs

description: >
  What a load test project is and what you can do with it.
---

A load test project in XTC may contain a number of [XLT load and performance tests](../../../../load-testing). In XTC, you can easily keep track of which tests have been run for a project and have all the data (e.g. which settings were used, how much load was applied, how did the test go) available in one place.

## Load Tests Overview

By selecting **Load Tests** in the menu on the left of any load testing project you will be taken to the load tests overview. This is a table of all existing load tests (which have been created for this project at some point, but have not necessarily run). Along with the test name you will see the status:
* _New_ for newly created tests,
* _Running_ for currently running tests, 
* _Finished_ for successfully finished tests, 
* _Aborted_ for tests that were aborted by a user, or 
* _Error_ for tests that did not run to completion because of a technical error.

Also, the table contains the start date of the test run (if it has been started yet), a summary and rating for finished tests that already have been evaluated in XTC, and a menu toggle. 

{{< image src="xtc/loadtests_table.png" >}}
The load tests overview of a project.
{{< /image >}}

By clicking a test name in the table, you will be taken to the details of this test. Depending on the test status, you will find different information in the following tabs:

* **Status** contains an overview of the [test status](../140-load-testing/#monitor-the-test) which will be constantly updated while the test progresses. 
* **Settings** contains the settings for the current test: you can override the load profile (test properties and duration) of your test suite, define another repository branch than the one you set for the project, and this is also the place where you define Google machines or custom machines the test should be run on. Of course these settings must be entered before the test is started. 
* The **Scenario Status** contains an overview of all executed [test scenarios and their status](../140-load-testing/#monitor-the-test), which is only displayed while the test is running or finished. 
* The **Results** tab contains the test results which are automatically downloaded at the end of the test, and also intermediate results you may have downloaded manually during the test run. Results can be downloaded or deleted in the menu on the right.
* The **Reports** tab contains all test reports (final and intermediate) that were created for the test. Reports can be edited (to enter a new name or description), downloaded, shared or deleted in the menu on the right. By clicking the **+** Button you can [add new reports](../140-load-testing/#create-a-report) (e.g. to change report settings or merge rules used for report creation).
* In **Evaluation** you can add a short summary, a rating and a more detailed [evaluation](../140-load-testing/#evaluate-the-test-run) to the test. 