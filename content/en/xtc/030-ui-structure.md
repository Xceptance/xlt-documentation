---
title: "Basic Structure"

weight: 30
type: docs

description: >
    The basic structure of XTC. All about users, organizations and projects.
---

## Basic Structure

XTC is structured into organization and projects. Each projects belongs to exactly one organization. Imagine organizations as companies or entities and projects as logical work items such a products, services, or tasks. Each user account can be a member of many organizations and many projects. This is especially useful for implementation partners and external consultants while it still serves the needs of development and test departments.

The basic idea of XTC is: [user accounts](../040-user-accounts) can run tests organized in [projects](../050-projects) of different project natures for [organizations](../045-organizations). 

{{< image src="xtc/xtc_basic_structure.svg" max-width="80%" >}}
XTC User Accounts as Members of Orgs which Contain Projects that Run Tests 
{{< /image >}}

To use Xceptance Test Center, you need an account. You can easily sign up on https://xtc.xceptance.com/. XTC allows you to either select a password for your account, or use an external login provider (Google or Microsoft) for SSO. For more information, see [user accounts](../040-user-accounts).

## Selecting an Organization and a Project

When you log in to XTC you will first see a dashboard containing the organizations and projects you are a member of. You can select both via dashboard links or by clicking the links in the header next to the _XTC_ logo:

{{< image src="xtc/topmenu.png" >}}
The XTC top menu allows you to select organization and project directly. 
{{< /image >}}

{{% note notitle %}}
Please note that the menu on the left offers different options depending on whether you are currently viewing the dashboard, an organization, or a project.
{{% /note %}}

To set up any kind of test, either for load testing or monitoring, you need to navigate to the right project. 

On the right side of the footer XTC is always displaying your role in the organization or project you are currently viewing.