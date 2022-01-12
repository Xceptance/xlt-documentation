---
title: "Project Configuration"

weight: 120
type: docs

description: >
  Special configuration settings for load test projects in XTC.
---

The _Configuration_ of a load test project is very similar to the basic [project configuration](../../060-project-configuration), but there are a few special settings for this project type:

## Default Sharing Settings

{{% permission type="project" least="true" role="tester" action="view default sharing settings" %}}

{{% permission type="project" least="true" role="test manager" action="edit default sharing settings" %}}

In _Sharing_, you can define a default for the share expiration time of [load test results](../175-results/#sharing-results) and [load test reports](../180-reports/#sharing-a-report) for easier project management. Each result or report sharing will offer this time as a default (but individual expiration times may still be configured if needed). Later on, all shares that use these defaults can be either deactivated, extended, or reactivated at once when required. 

We recommend using the default because if the share expiration time needs to be adjusted/prolonged, you can set the new default and it will apply to all existing shares alike. This also includes disabling these shares.

{{% note notitle %}}
Please note that default expiration dates for results and reports are two independently set values.
{{% /note %}}

### Removing All Custom Share Links

{{% permission type="project" least="true" role="test manager" %}}

It is still possible to set individual expiration times per result and reports instead of referring to the global preset. These shares won't be affected in any way when changing/disabling the [project-wide default expiration date](#default-sharing-settings). To remove all custom links to reports or results, you can use the buttons _Remove Custom Report Shares_ and _Remove Custom Result Shares_ which you find below the default sharing settings. Both will prompt you to confirm this action, as it cannot be undone. 

## Properties

{{% permission type="project" least="true" role="tester" action="view properties" %}}

{{% permission type="project" least="true" role="test manager" action="edit properties" %}}

In _Properties_, you can globally define [properties](../../../load-testing/manual/480-test-suite-configuration/) or [secret properties](../../../load-testing/manual/480-test-suite-configuration/#secret-properties) to use for test execution. 

[Secret properties](../../../load-testing/manual/480-test-suite-configuration/#secret-properties) behave the same as [regular properties](../../../load-testing/manual/480-test-suite-configuration/). However, their values will be masked with ****** both in the load test report and in the result data set.
When editing an existing secret property in the UI, its current value will be shown as \*\*\*. To redefine that setting, simply overwrite \*\*\* with the new value.

Properties configured at project level apply to all new load tests alike, while [properties defined at a certain load test](../155-lt-settings) apply to that load test only. Load-test-level properties will overwrite project-level properties. Properties that are not set in XTC will be read from the project data. 

