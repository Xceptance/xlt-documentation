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

## Home Dashboard

When you log in to XTC you will first see a dashboard page. 

{{< image src="xtc/home_dashboard.png" >}}
The XTC home dashboard. 
{{< /image >}}

This dashboard contains all organizations and projects you are a member of, or your favorite/starred organizations and projects. You can toggle between your favorites and the full list by clicking _Show All/Show Starred_. On the bottom (or right, if you select _Column Layout_) it displays your _Last Accessed Projects_ (six of the most recently visited projects - archived projects will not appear in the list).

You can navigate to a project or organization both via dashboard links or by using the two select boxes in the header next to the _XTC_ logo. If you are a member of many organizations and projects, the organization and project selectors in the page header feature a useful search input field to filter the list of displayed entries by substring and ignoring case. (Click the _XTC_ logo to return to your home dashboard.)

{{< image src="xtc/topmenu.png" >}}
The XTC top menu allows you to select organization and project directly. 
{{< /image >}}

To set up any kind of test, either for load testing or monitoring, you need to navigate to the right project. 

### Favorite Projects and Organizations

In case you are a member of many organizations, navigating between them on the dashboard may get tedious. XTC helps you to focus on your current "working set" of orgs and projects: simply **star an org or project** using the star icon to mark it as favorite. By default, only the starred orgs/projects will be shown on the dashboard page. If you need to navigate to a project that is not listed by default, you can always use the project dropdown in the page header.

## Navigation

The navigation links to the sub pages of an organization or project can be found in the sidebar to the left. Click the hamburger menu button to minimize/expand the sidebar.

{{% note notitle %}}
Please note that the menu on the left offers different options depending on whether you are currently viewing the dashboard, an organization, or a load testing or monitoring project.
{{% /note %}}

In order to **quickly navigate from a project back to its organization**, use the link at the bottom of the navigation in the left sidebar:

{{< image src="xtc/ui_backToOrg.png" >}}
Clicking the link in the sidebar will take you back to a project's organization. 
{{< /image >}}

## Keyboard Shortcuts

XTC provides a number of useful keyboard shortcuts. Press the <kbd>?</kbd> key to display a list of all available hotkeys:

* Press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>H</kbd> to return to the *User Dashboard* from anywhere in XTC.
* Press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>O</kbd> or <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>P</kbd> to activate the organization or project selection box. Use the <kbd>↑</kbd>/<kbd>↓</kbd> arrow keys to highlight the desired item in the drop-down list item and press <kbd>Enter</kbd> to select it.
* Most dialogs and forms can be accepted with the <kbd>Alt</kbd>+<kbd>Enter</kbd> shortcut. <kbd>Enter</kbd> alone is not supported, as it is often needed to interact with the currently focused input element. Use the <kbd>Esc</kbd> key to cancel a dialog.

On the details page of a load test the following keyboard shortcuts are available:
    
* Press <kbd>Ctrl</kbd>+<kbd>Left</kbd> or <kbd>Ctrl</kbd>+<kbd>Right</kbd> to navigate to the previous or next load test.
* Press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>S</kbd> to start the current load test.

## Footer Information

On the right side of the footer XTC is always displaying your role in the organization or project you are currently viewing. You can also find the current XTC version and the Contact/Privacy/Changelog links in the footer.