---
title: "Basic Structure"

weight: 30
type: docs

description: >
    The basic structure of XTC. All about users, organizations and projects.
---

## Basic Structure

XTC is structured into organization and projects. Each projects belongs to exactly one organization. Imagine organizations as companies or entities and projects as logical work items such a products, services, or tasks. Each user account can be a member of many organizations and many projects. This is especially useful for implementation partners and external consultants while it still serves the needs of development and test departments.

The basic idea of XTC is: [user accounts]({{< relref "040-user-accounts" >}}) can run tests organized in [projects]({{< relref "050-projects" >}}) of different project natures for [organizations]({{< relref "045-organizations" >}}). 

{{< image src="xtc/xtc_basic_structure.svg" max-width="80%" >}}
XTC User Accounts as Members of Orgs which Contain Projects that Run Tests 
{{< /image >}}

To use Xceptance Test Center, you need an account. You can easily sign up on https://xtc.xceptance.com/. XTC allows you to either select a password for your account, or use an external login provider (Google or Microsoft) for SSO. For more information, see [user accounts]({{< relref "040-user-accounts" >}}).

## Selecting an Organization and a Project

When you log in to XTC you will first see a dashboard containing the organizations and projects you are a member of. You can select both via dashboard links or by using the two select boxes in the header next to the _XTC_ logo. If you are a member of many organizations and projects, the organization and project selectors in the page header feature a useful search input field to filter the list of displayed entries by substring and ignoring case. (Click the _XTC_ logo to return to your main dashboard.)

{{< image src="xtc/topmenu.png" >}}
The XTC top menu allows you to select organization and project directly. 
{{< /image >}}

{{% note title="Favorite Projects and Organizations" %}}
In case you are a member of many organizations, navigating between them on the dashboard may get tedious. XTC helps you to focus on your current "working set" of orgs and projects: simply **star an org or project** using the star icon to mark it as favorite. By default, only the starred orgs/projects will be shown on the dashboard page. You can toggle between your favorites and the full list by clicking _Show All/Show Starred_. Alternatively, use the project dropdown in the page header to quickly navigate to projects that are not listed by default.
{{% /note %}}

The navigation links to the sub pages of an organization or project can be found in the sidebar to the left. Click the hamburger menu button to minimize/expand the sidebar.

{{% note notitle %}}
Please note that the menu on the left offers different options depending on whether you are currently viewing the dashboard, an organization, or a load testing or monitoring project.
{{% /note %}}

To set up any kind of test, either for load testing or monitoring, you need to navigate to the right project. 

On the right side of the footer XTC is always displaying your role in the organization or project you are currently viewing. You can also find the current XTC version and the Contact/Privacy/Changelog links in the footer.