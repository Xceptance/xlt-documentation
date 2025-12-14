---
title: "Organizations"

weight: 45
type: docs

description: >
    Organizations in XTC and user roles within organizations.
---

All tests run by XTC are organised in test projects, which in turn are part of an organization.

Organizations can only be created by an XTC admin. They will also assign an initial administrator for every organization, who will have permissions to add additional members to the organization, and, most importantly, create projects in the organization's context.

## Organization Configuration

{{% permission role="organization administrator" %}}

In _Configuration_, you may edit the name, short name and description of your organization as well as upload an organization logo (which will also be displayed when the organization is shown in the list on the Dashboard page).

In the _Security_ tab, you may enable or disable [user invitations]({{< relref "#inviting-users-to-join-xtc" >}}) or define [authorization requirements]({{< relref "#mandatory-login-requirements" >}}) for the members of your organization.

The _Integrations_ tab allows you to integrate XTC with your Slack Workspace to be notified of certain events like load test status changes. See the [Slack Integration]({{< relref "../integrations/510-slack" >}}) for further details.

## User Roles Within an Organization

As an organization member, a user account can have one of the following roles:

* as a **guest**, you can only view the organization's dashboard,
* a **member** is basically the default role for any new project user and is allowed to view organization settings and view and work on projects,
* a **billing manager** has permission to view and evaluate [resource usage]({{< relref "../loadtesting/400-resource-usage" >}}) of the organization, and
* as an **organization administrator** you have complete permissions to change the organization's projects, members and configuration.

(Permissions increase in order of the list, i.e. a billing manager has the same permissions as a member plus some in addition to that.)

If you are logged in and are currently viewing an organization, your role will be displayed at the bottom right in the footer:

{{< image src="xtc/ui_orgRole.png" >}}
Footer displaying the user's role in the organization.
{{< /image >}}

## Adding Members to an Organization

{{% permission role="organization administrator" %}}

To add new members to the organization, select _Members_ in the menu on the left. You will see the list of members, including their [Login Provider/2FA settings]({{< relref "#mandatory-login-requirements" >}}) and the time of their last login.

By clicking the `+` sign in the top right, you can add new members by typing the name (mail address) of their user account and assigning one of the roles from above. The user you want to add needs to be signed up with this e-mail address already.

If you want to add multiple users at once, simply paste a list of e-mail addresses (separated by comma, newline or space). All users will be assigned the same role.

{{% note notitle %}}
The _Members_ page of an organization shows the [login provider]({{< relref "040-user-accounts/#connecting-existing-xtc-accounts-to-an-external-login-provider" >}}) for every member and whether or not a member has [2FA enabled]({{< relref "040-user-accounts/#two-factor-authentication-2fa" >}}). This way, organization admins can easily check if certain security requirements imposed by the organization are met.
{{% /note %}}

Explicitly assigning organization members is usually not necessary in your daily work, as organization membership and roles are assigned implicitly by [adding and removing project members]({{< relref "050-projects/#adding-and-removing-project-members" >}}).

### Inviting Users to Join XTC

{{% permission role="organization administrator" %}}

As an org admin you may invite users who do not have an XTC account yet to join your org in XTC (if this feature is [enabled]({{< relref "#organization-configuration" >}})). Simply [add these users to your organization]({{< relref "#adding-members-to-an-organization" >}}) as usual, but make sure you activate the _Invite Users_ toggle.

Users invited this way will receive an email with a link to complete their registration (provide name, password, etc.). Once this is done, these users are all set and ready to participate in the organization.

Invitations are valid for 30 days. Organization administrators may resend the invitation for an invited user from the _Members_ page at any time. Users who have once been invited to join an organization, but have _not completed_ the registration process, will be automatically deleted after 90 days.

## Editing and Removing Org Members

{{% permission role="organization administrator" %}}

To **update a user’s role** within an organization, go to the _Members_ page and click the context menu right of the user name, then select _Edit Role_. You can then pick a new membership role.

To **remove members** from an organization, go to the _Members_ page and click the context menu right of the user name, then select _Remove_ (you will be prompted to confirm the deletion).

## User Groups

{{% permission action="create, update and delete user groups" role="organization administrator" %}}

Managing a large organization with many projects and users can be challenging. This is especially difficult when all users should have access to the same projects and have the same role in each project. Whenever user assignments or roles change, these changes must be applied to each project.

To simplify this process, XTC supports the concept of user groups. A user group is a collection of organization members managed at the organization level. Similar to regular organization members, user groups can be assigned to a project with a specific role later on. All users in the group become indirect members of the project and have the same role. This intermediate layer significantly simplifies project member management.

For example, you could create user groups such as "Admins", "Test Managers", "Testers", and "Reviewers". Go to the _Members_ page in your organization and switch to the _User Groups_ tab. Click "New" to create a new user group. You can check _Add Org Members to Group_ to add all current org members to the newly created group. To add or remove members, click on the newly created group's name. In the user group detail view, you can then add and remove group members as appropriate (user invitations are not possible here, you can only add existing org members).

Then, assign these groups to all projects as desired. To do so, browse to the project's _Members_ page, switch to the _User Groups_ tab, and add each group with the proper project role. Note that this only needs to be done once.

Now, when adding a new user to the organization, simply assign them to the appropriate user group, for example, the "Testers" group. This automatically makes them a tester in all projects with the "Testers" user group assigned. To make a user a project administrator in all projects, remove them from their current group and add them to the "Admins" group.

Note that you can mix regular project members and user groups. This allows for project setups with special needs.

### Effective Role

Now that users can be both direct and indirect project members, the question arises as to what their effective role will be.

* If a user is a direct member, they will get the role defined at their direct membership.
* Otherwise, the user is only an indirect member through one or more user groups, in which case the user will have the highest role of any of the user groups.

### Known Limitations

Some features are currently not available to indirect project members. This includes:

* Remembering the last visited projects.
* The ability to star a project.

## Locking Members of an Organization

{{% permission role="organization administrator" %}}

When a user is a member of an organization, but does not yet or no longer fulfill the current requirements imposed by the organization (mostly security-related), the user should be locked out, either [automatically by the system]({{< relref "#mandatory-login-requirements" >}}) or manually by an admin of the organization. When locked, the user remains a member of this organization, but can no longer see any data or perform any action.

To lock out a user manually, open the _Members_ page, locate the user in question and click _Lock Member_ in the context menu. To unlock the user again, click _Unlock Member_.

## Mandatory Login Requirements

{{% permission role="organization administrator" %}}

Organization admins may impose mandatory login requirements on users of their organization. They may require users to be authenticated using specific [login providers]({{< relref "040-user-accounts/#connecting-existing-xtc-accounts-to-an-external-login-provider" >}}) or [2FA]({{< relref "040-user-accounts/#two-factor-authentication-2fa" >}}).

{{% note notitle %}}
The configuration _**does not**_ force users to actually configure the required login procedure to be able to log into XTC. It merely prevents them from accessing the organization. Users will still be able to see the organization in their dashboard and organization dropdown, but will see an appropriate error screen informing them about the need to comply with the login requirement when trying to access the organization details. Organization admins _**should**_ inform users via appropriate means to ensure that they are up-to-date on any login changes.
{{% /note %}}

When accessing an organization, the system will check whether the login requirements are fulfilled _**in the current session**_. Users that have an external login provider _**and**_ 2FA configured will need to use the appropriate login flow to access a specific organization. This can mean having to log out and log in again using a different authentication method in order to switch organizations.

{{% warning notitle %}}
Changes to the login requirement take effect immediately. Users that are already logged in will get the appropriate lock-out message on their next access to any of the organization's data. This includes saving any changes they may have made in the meantime. Admins _**should**_ therefore try to schedule changes in a way to minimize user impact (e.g. outside of business hours or during an announced maintenance window).
{{% /warning %}}

{{% note notitle %}}
XTC currently does not support requiring both, 2FA and SSO login. If your security policies require this setup please configure your SSO provider as the sole allowed login method and configure 2FA as a requirement in your provider's setup.
{{% /note %}}

### Mandatory Two-Factor Authentication

To enable mandatory 2FA for an organization go to the organization's _Configuration_, open the _Security_ tab and edit _Access Requirements_. Select the value _Two-Factor login required_ and save the changes.

{{% warning title="Accidental Lockout" %}}
If you are not currently logged in via 2FA the system will warn you about **locking yourself out of the organization** (see example screenshot). Take this warning seriously as you will not be able to access the organization (and therefore change the login requirement) after saving the configuration!
{{% /warning %}}

{{< image src="xtc/login_requirement_2fa_violated.png" >}}
Example of an admin about to lock themselves out of an organization by enabling mandatory 2FA.
{{< /image >}}

### Mandatory Login via an External Provider

To enable the mandatory use of an external login provider go to the organization's _Configuration_, open the _Security_ tab and edit _Access Requirements_. Select the value _SSO login required_ and save the changes.

{{< image src="xtc/login_requirement_sso.png" >}}
Mandatory External Login Provider with a specific issuer URL.
{{< /image >}}

Admins can allow a specific set of login providers by putting their issuer URLs into the text field. Issuer URLs are the exact values of the `iss` claim in the OpenID Connect access token signed by your provider (e.g. `https://accounts.google.com` for the public Google identity provider). The system supports multiple allowed issuers by putting each URL on a seperate line.

{{% warning title="Accidental Lockout" %}}
If you are not currently logged in via an external provider the system will warn you about **locking yourself out of the organization**. Take this warning seriously as you will not be able to access the organization (and therefore change the login requirement) after saving the configuration!

Admins **should** be logged in via the login provider they intend their users to use, if possible. The system checks your current issuer against the entries in the list while entering them and therefore provides immediate feedback regarding any typos in the URL.
{{% /warning %}}
