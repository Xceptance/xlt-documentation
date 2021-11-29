---
title: "Project Configuration"

weight: 60
type: docs

description: >
    Which project wide configuration options you have and how to use them.
---

To configure either a load test or monitoring project, select _Configuration_ in the project menu on the left. In the project configuration, there are several tabs for all kinds of settings that will be applied globally to the project. The contents and possible settings differ slightly depending on the project type (load test or monitoring), but most are fairly similar. We will note below if a setting is only available for a specific project type.

## General 

In the _General_ tab, you can edit the **project name** and upload a **project logo**. 

For monitoring projects, this tab will additionally contain information on **data persistence** and the **execution environment** where the monitoring scenarios are running in. These settings are for your information only and can be changed by XTC administrators only.

## Repository

In _Repository_, you can define where the test suite repository is located, which branch should be used and how to resolve the test suite root within the repository. If the access to the remote repository is restricted, you can also provide authentication details.

The repository **branch** name for load test projects is always of type _fix/static_; however it is possible to override this branch name by a specific branch setting for each load test. This is not possible in monitoring projects, but in this case you have the possibility to configure the branch name to be determined dynamically in the project settings, by defining a URL of a resource from which the branch name can be extracted using a regular expression. This may be useful if you want to make the used test scenario code dependent on your currently deployed app version.

To add or change **repository authentication** info, click the editing button:

{{< image src="xtc/repository_authentication.png" >}}
{{< /image >}} 

You can choose between entering either **credentials** (username and password, which can also be a token name and value if your repository is using limited access tokens) or an **SSH Key** (with username and passphrase). To confirm your changes, click "Accept".

{{% note notitle %}}
Please note that when using an SSH key for authentication, you need to enter the matching SSH repository URL above, while user credentials or access tokens require an HTTPS repository URL. Moreover, both URLs must not contain a username or any other authentication info.
{{% /note %}}

## Default Sharing Settings

_(only available for load test projects)_

{{< TODO comment="update link below as soon as it is available" / >}}

In _Sharing_, you can define a default for the share expiration time of [load test reports](../015-load-testing/20-quick-start/#create-a-report) for easier project management. Each report sharing will offer this time as a default. Later on, all shares can be either deactivated, extended, or reactivated at once when required. It is still possible to set individual expiration times per report, but these cannot be extended or deactivated globally then.

## Properties

_(only available for load test projects)_

In _Properties_, you can globally define [properties](../../load-testing/manual/480-test-suite-configuration/) or [secret properties](../../load-testing/manual/480-test-suite-configuration/#secret-properties) to use for test execution. Properties can be overwritten for each individual load test, and if not set in XTC will be read from the project data.
