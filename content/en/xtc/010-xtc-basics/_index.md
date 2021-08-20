---
title: "XTC Basics"

weight: 10
type: docs

description: >
  Some basic information on using XTC.
---

## Sign Up/Log In

To use Xceptance Test Center, you need an account. You can easily sign up on https://xtc.xceptance.com/.

Currently, your role and projects will be assigned by Xceptance. This will change in the future.

## Basic UI Structure

After logging in, you will see a dashboard containing the organizations (tenants) and projects assigned to your account. You can select both via dashboard links, or by clicking the links in the header, next to the _XTC_ logo:

{{< image src="xtc/topmenu.png" >}}
The XTC top menu allows you to select tenant and project directly. 
{{< /image >}}

{{% note %}}
Please note that the menu on the left offers different options, depending on whether you are currently viewing the dashboard, an organization, or a project.
{{% /note %}}

To set up any kind of test, either for load testing or monitoring, you need to navigate to the right project. A project can either be for load testing or for monitoring, never for both at the same time. The project type will be indicated in the project panel on the organization's dashboard:

{{< image src="xtc/organizations_monitoringProject.png" >}}
A monitoring project on the dashboard of the _Xceptance_ organization.
{{< /image >}}

The project menu on the left side will look a bit different, depending on whether you selected a load testing or a monitoring project:

{{< image src="xtc/project_menus.png" >}}
The menu of a monitoring project (left) and a load testing project (right).
{{< /image >}}

In any case, you will see the project _Members_ and the _Configuration_. 

### Project Configuration

In the project configuration, there are two tabs on the right side, _General_ and _Repository_. 

In _General_, you can see information like the project name and avatar (displayed information depends on the project type). 

In _Repository_, you can define where the test suite repository is located, which branch should be used and how to resolve the test suite root within the repository. If the access to the remote repository is restricted, you can also provide [authentication](#repository-authentication).

{{% note notitle %}}
Note that in load test projects, you can configure specific repository settings per load test that override the general repository settings of the project for this load test.
{{% /note %}}

### Repository Authentication

To add or change repository authentication info, click the editing button:

{{< image src="xtc/repository_authentication.png" >}}
{{< /image >}} 

You can choose between entering either **credentials** (username and password, which can also be a token name and value if your repository is using limited access tokens) or an **SSH Key** (with username and passphrase). To confirm your changes, click "Accept".

{{% note notitle %}}
Please note that while using an SSH key for authentication, you need to enter the matching SSH repository URL above, while user credentials or access tokens require an HTTPS address (both URLs not containing any username or other authentication info).
{{% /note %}}
