---
title: "Organizations"

weight: 45
type: docs

description: >
    Organizations in XTC and user roles within organizations.
---

## XTC Organizations

All tests run by XTC are organised in test projects, which in turn are part of an organization. 

Organizations can only be created by an XTC admin. They will also assign an initial administrator for every organization, who will have permissions to add additional members to the organization, and, most importantly, create projects in the organization's context.


### User Roles Within an Organization

As an organization member, a user account can have one of the following roles:
* as a **guest**, you can only view the organization's dashboard,
* a **member** is basically the default role for any new project user and is allowed to view organization settings and view and work on projects,
* a **billing administrator** has permission to view and evaluate [resource usage](../loadtesting/400-resource-usage) of the organization, and
* as an **organization administrator** you have complete permissions to change the organization's projects, members and configuration.

(Permissions increase in order of the list, i.e. a billing administrator has the same permissions as a member plus some in addition to that.)

If you are logged in and are currently viewing an organization, your role will be displayed at the bottom right in the footer:

{{< image src="xtc/ui_orgRole.png" >}}
Footer displaying the user's role in the organization.
{{< /image >}}

### Adding Members to an Organization

To add new members to the organization (permitted for organization administrators only), select _Members_ in the menu on the left. You will see the list of members, and by clicking the `+` sign in the top right, you can add new members by typing the name (mail address) of their user account and assigning one of the roles from above. The user you want to add needs to be signed up with this e-mail address already. 

If you want to add multiple users at once, simply paste a list of e-mail addresses (separated by comma, newline or space). All users will be assigned the same role.

Explicitly assigning organization members is usually not necessary in your daily work, as organization membership and roles are assigned implicitly by [adding and removing project members](../050-projects/#adding-and-removing-project-members).

### Organization Configuration

In _Configuration_, you may edit the name, short name and description of your organization as well as upload an organization logo (which will also be displayed when the organization is shown in the list on the Dashboard page).

{{% permission role="organization administrator" %}}

