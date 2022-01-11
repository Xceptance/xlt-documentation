---
title: "Creating a Load Test"

weight: 150
type: docs

description: >
  How to create a new load test that's ready to run.
---

## Creating a New Load Test

{{% permission type="project" least="true" role="tester" action="create a load test" %}}

To create a new load test, navigate to the _Load Tests_ overview of your load test project. You can either duplicate (and probably edit) an existing test run, or create a completely new test setup:

{{< image src="xtc/loadtest_newOrDuplicate.png" >}}
Create a new load test or duplicate an existing one.
{{< /image >}}

You will be prompted to enter a name and description for the new load test. XTC will then either make a copy of the selected test or create a completely new test with default settings under the chosen name. The test status will be _New_ either way. 

You can then enter the configuration by clicking the name of the newly created test, which will take you to the [settings of this test](../155-lt-settings).