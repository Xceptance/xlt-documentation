---
title: "Project Configuration"

weight: 120
type: docs

description: >
  Special configuration settings for load test projects in XTC.
tags: ["xtc", "configuration", "loadtesting", "repository", "properties"]
last_updated: 2024-05-22
---

The _Configuration_ of a load test project is very similar to the basic [project configuration]({{< relref "../basics/060-project-configuration" >}}), but there are a few special settings for this project type:

## Repository

{{% permission type="project" least="true" role="tester" action="view repository settings" %}}
{{% permission type="project" least="true" role="test manager" action="edit repository settings" %}}

In addition to the [basic repository settings]({{< relref "060-project-configuration#repository" >}}) which can be defined for load test projects and monitoring projects alike, there are a few additional options for load test projects concerning the compiling of the test suite:

## Build

### Build Tool

Before a load test can be started, XTC needs to compile your load test suite. If you don’t configure a build tool, **Maven** will be used by default, but XTC also supports **Gradle** as an alternative. In any case, please make sure that your load test project contains the respective build files and verify locally that the build produces the expected results.

To configure your preferred build tool, click the editing button, select a build tool and enter additional arguments for this tool if needed. Click _Save Changes_ to confirm.

{{< image src="xtc/loadtest_selectBuildTool.png" >}}
{{< /image >}}

### Build Dependency Cache

Building the load test suite before the actual start of the test may take several minutes to complete. Most of that time can be attributed to the download of dependencies (XLT and other required libraries).

XTC caches the downloaded dependencies of a load test project so subsequent builds should run much faster. The cache expires automatically 14 days after the last load test was run.

If you need to discard the cache (for example due to corrupted or compromised artifacts), you can do so by going to this section and clicking _Discard Cache_.

## Default Sharing Settings

{{% permission type="project" least="true" role="tester" action="view default sharing settings" %}}

{{% permission type="project" least="true" role="test manager" action="edit default sharing settings" %}}

In _Sharing_, you can define a default for the share expiration time of [load test results]({{< relref "results#sharing-results" >}}) and [load test reports]({{< relref "reports#sharing-a-report" >}}) for easier project management. Each result or report sharing will offer this time as a default (but individual expiration times may still be configured if needed). Later on, all shares that use these defaults can be either deactivated, extended, or reactivated at once when required.

We recommend using the default because if the share expiration time needs to be adjusted/prolonged, you can set the new default and it will apply to all existing shares alike. This also includes disabling these shares.

The maximum lifetime of shares is limited to 180 days.

{{% note notitle %}}
Please note that default expiration dates for results and reports are two independently set values.
{{% /note %}}

### Removing All Custom Share Links

{{% permission type="project" least="true" role="test manager" %}}

It is still possible to set individual expiration times per result and reports instead of referring to the global preset. These shares won't be affected in any way when changing/disabling the [project-wide default expiration date]({{< relref "#default-sharing-settings" >}}). To remove all custom links to reports or results, you can use the buttons _Remove Custom Report Shares_ and _Remove Custom Result Shares_ which you find below the default sharing settings. Both will prompt you to confirm this action, as it cannot be undone.

## Properties

{{% permission type="project" least="true" role="tester" action="view properties" %}}

{{% permission type="project" least="true" role="test manager" action="edit properties" %}}

In _Properties_, you can globally define [properties]({{< relref "test-suite-configuration" >}}) or [secret properties]({{< relref "test-suite-configuration#secret-properties" >}}) to use for test execution.

[Secret properties]({{< relref "test-suite-configuration#secret-properties" >}}) behave the same as [regular properties]({{< relref "test-suite-configuration" >}}). However, their values will be masked with ****** both in the load test report and in the result data set.
When editing an existing secret property in the UI, its current value will be shown as \*\*\*. To redefine that setting, simply overwrite \*\*\* with the new value.

Properties configured at project level apply to all new load tests alike, while [properties defined at a certain load test]({{< relref "155-lt-settings" >}}) apply to that load test only. Load-test-level properties will overwrite project-level properties. Properties that are not set in XTC will be read from the project data.

## Environment

Load tests are executed with XLT, Xceptance’s tool to drive load and performance tests. XLT is developed independently from XTC. New releases may come with improvements and also new features. New features may introduce incompatible changes, so from time to time we will need to release a new major version of XLT.

Incompatible changes in XLT may break your existing load test suites so XTC lets you choose between the previous and the new XLT execution environment. However, this choice is available for a limited time only.

The XLT support and deprecation policy is as follows: whenever a new major version of XLT is available, **the previous major version** is marked as deprecated, but **remains available for another 8 weeks**. This means while you can continue your current load testing activities uninterrupted, you should also plan and perform the migration of your test suite to the new XLT version in time. **After the migration period of 8 weeks, the previous XLT version will be removed** and the new version will be the only one available.

XTC helps to manage that transition. Project admins can define in the project settings which version of XLT should be the default one. Go to _Project > Configuration > Execution > Execution Environment_ and choose an XLT version. Adjust this setting when you start a new project or when you are done migrating your test suite. The default version will be effective when creating a new load test, but not when duplicating an existing one.

Testers may override this default for a particular load test in the settings of that load test. Open _Load Test > Settings > Common Machine Configuration_ and choose the wanted version of the execution environment. Use this to test your migrated code (probably on another Git repository branch) with the new version, before switching to this version in general.

{{% note title="What about minor version changes?" %}}
Minor changes, such as 6.0.1 or 6.1.0, are backward-compatible. This means two things: first, there is nothing for you to do. Second, XTC may be updated with a new minor XLT version without prior notice. However, we will always list the current version in our release notes.
{{% /note %}}
