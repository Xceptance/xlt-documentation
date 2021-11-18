---
title: "Basic UI Structure"

weight: 30
type: docs

description: >
    The basic structure of XTC. All about users, orgs and projects.
---

{{< TODO comment="(re)write" / >}}

## Selecting a Project

After logging in to XTC, you will see a dashboard containing the organizations and projects you are  a member of. You can select both via dashboard links or by clicking the links in the header next to the _XTC_ logo:

{{< image src="xtc/topmenu.png" >}}
The XTC top menu allows you to select organization and project directly. 
{{< /image >}}

{{% note notitle %}}
Please note that the menu on the left offers different options depending on whether you are currently viewing the dashboard, an organization, or a project.
{{% /note %}}

To set up any kind of test, either for load testing or monitoring, you need to navigate to the right project. A project can either be for load testing or for monitoring, never for both at the same time. The project type will be indicated in the project tile:

{{< image src="xtc/organizations_monitoringProject.png" >}}
A monitoring project on the dashboard of the _Xceptance_ organization.
{{< /image >}}

The project menu on the left side will look a bit different depending on whether you selected a load testing or a monitoring project:

{{< image src="xtc/project_menus.png" >}}
The menu of a monitoring project (left) and a load testing project (right).
{{< /image >}}

In any case, you will see the project _Members_ and the _Configuration_. 

### Project Configuration

In the project configuration, there are several tabs for all kinds of settings that can be applied globally to the project.

#### General 

In the _General_ tab, you can edit the project name and upload a project logo (displayed information depends on the project type). 

#### Repository Authentication

In _Repository_, you can define where the test suite repository is located, which branch should be used and how to resolve the test suite root within the repository. If the access to the remote repository is restricted, you can also provide authentication details.

{{% note notitle %}}
Note that in load test projects, you can configure specific repository settings per load test that override the general repository settings of the project for this load test.
{{% /note %}}

To add or change repository authentication info, click the editing button:

{{< image src="xtc/repository_authentication.png" >}}
{{< /image >}} 

You can choose between entering either **credentials** (username and password, which can also be a token name and value if your repository is using limited access tokens) or an **SSH Key** (with username and passphrase). To confirm your changes, click "Accept".

{{% note notitle %}}
Please note that when using an SSH key for authentication, you need to enter the matching SSH repository URL above, while user credentials or access tokens require an HTTPS repository URL. Moreover, both URLs must not contain a username or any other authentication info.
{{% /note %}}

#### Default Sharing Settings

In _Sharing_, you can define a default for the share expiration time of [reports](../015-load-testing/20-quick-start/#create-a-report) for easier project management. Each report sharing will offer this time as a default. Later on, all shares can be either deactivated, extended, or reactivated at once when required. It is still possible to set individual expiration times per report, but these cannot be extended or deactivated globally then.

#### Properties

In _Properties_, you can globally define [properties](../../load-testing/manual/480-test-suite-configuration/) or [secret properties](../../load-testing/manual/480-test-suite-configuration/#secret-properties) to use for test execution. Properties can be overwritten for each individual load test, and if not set in XTC will be read from the project data.