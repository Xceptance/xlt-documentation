---
title: "Project Configuration"

weight: 120
type: docs

description: >
  Special configuration settings for load test projects in XTC.
---

The _Configuration_ of a load test project is very similar to the basic [project configuration](../../060-project-configuration), but there are a few special settings for this project type:

## Default Sharing Settings

In _Sharing_, you can define a default for the share expiration time of [load test results](../175-results/#sharing-results) and [load test reports](../180-reports/#sharing-a-report) for easier project management. Each result or report sharing will offer this time as a default (but individual expiration times may still be configured if needed). Later on, all shares that use these defaults can be either deactivated, extended, or reactivated at once when required. 

{{% note notitle %}}
Please note that default expiration dates for results and reports are two independently set values.
{{% /note %}}

### Removing All Custom Share Links

It is still possible to set individual expiration times per result and reports instead of referring to the global preset. To remove all custom links to reports or results, you can use the buttons _Remove Custom Report Shares_ and _Remove Custom Result Shares_ which you find below the default sharing settings. Both will prompt you to confirm this action, as it cannot be undone. 

## Properties

In _Properties_, you can globally define [properties](../../../load-testing/manual/480-test-suite-configuration/) or [secret properties](../../../load-testing/manual/480-test-suite-configuration/#secret-properties) to use for test execution. Properties can be overwritten for each individual load test, and if not set in XTC will be read from the project data. 