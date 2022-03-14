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
* a **billing administrator** has permission to view and evaluate [resource usage]({{< relref "../loadtesting/400-resource-usage" >}}) of the organization, and
* as an **organization administrator** you have complete permissions to change the organization's projects, members and configuration.

(Permissions increase in order of the list, i.e. a billing administrator has the same permissions as a member plus some in addition to that.)

If you are logged in and are currently viewing an organization, your role will be displayed at the bottom right in the footer:

{{< image src="xtc/ui_orgRole.png" >}}
Footer displaying the user's role in the organization.
{{< /image >}}

### Adding Members to an Organization

{{% permission role="organization administrator" %}}

To add new members to the organization, select _Members_ in the menu on the left. You will see the list of members, and by clicking the `+` sign in the top right, you can add new members by typing the name (mail address) of their user account and assigning one of the roles from above. The user you want to add needs to be signed up with this e-mail address already.

If you want to add multiple users at once, simply paste a list of e-mail addresses (separated by comma, newline or space). All users will be assigned the same role.

{{% note notitle %}}
The _Members_ page of an organization shows the [login provider]({{< relref "040-user-accounts/#connecting-existing-xtc-accounts-to-an-external-login-provider" >}}) for every member and whether or not a member has [2FA enabled]({{< relref "040-user-accounts/#two-factor-authentication-2fa" >}}). This way, organization admins can easily check if certain security requirements imposed by the organization are met.
{{% /note %}}

Explicitly assigning organization members is usually not necessary in your daily work, as organization membership and roles are assigned implicitly by [adding and removing project members]({{< relref "050-projects/#adding-and-removing-project-members" >}}).

### Organization Configuration

In _Configuration_, you may edit the name, short name and description of your organization as well as upload an organization logo (which will also be displayed when the organization is shown in the list on the Dashboard page).

{{% permission role="organization administrator" %}}

### Mandatory Login Requirements

{{% permission role="organization administrator" %}}

Organization admins may impose mandatory login requirements regarding on users of their organization. They may require users to be authenticated using specific [login providers]({{< relref "040-user-accounts/#connecting-existing-xtc-accounts-to-an-external-login-provider" >}}) or [2FA]({{< relref "040-user-accounts/#two-factor-authentication-2fa" >}}).

{{% note notitle %}}
The configuration _DOES NOT_ force users to actually configure the required login procedure to be able to log into XTC. It merely prevents them from accessing the organization. Users will still be able to see the organization in their dashboard and organization dropdown, but will see an appropriate error screen informing them about the need to comply with the login requirement when trying to access the organization details. Oganization admins _SHOULD_ inform users via appropriate means to ensure that they are up-to-date on any login changes.
{{% /note %}}

When accessing an organization, the system will check whether the login requirements are fulfilled _in the current session_. Users that have an external login provider _and_ 2FA configured will need to use the appropriate login flow to access a specific organization. This can mean having to log out and log in again using a different authentication method in order to switch organizations.

{{% warning notitle %}}
Changes to the login requirement take effect immediately. Users that are already logged in will get the appropriate lock-out message on their next access to any of the organization's data. This includes saving any changes they may have made in the meantime. Admins *SHOULD* therefore try to schedule changes in a way to minimize user impact (e.g. outside of business hours or during an announced maintenance window).
{{% /warning %}}

{{% note notitle %}}
XTC currently does not support requiring both, 2FA and SSO login. If your security policies require this setup please configure your SSO provider as the sole allowed login method and configure 2FA as a requirement in your provider's setup.
{{% /note %}}

#### Mandatory Two-Factor Authentication

To enable mandatory 2FA for an organization go to the organization's _Configuration_, open the _Security_ tab and edit _Access Requirements_. The the value to _Two-Factor login required_ and save the changes.

{{% warning notitle %}}
If you are not currently logged in via 2FA the system will warn you about _locking yourself out of the organization_ (see example screenshot). Take this warning seriously as you will not be able to access the organization (and therefore change the login requirement) after saving the configuration!
{{% /warning %}}

{{< image src="xtc/login_requirement_2fa_violated.png" >}}
Example of an admin about to lock themselves out of an organization by enabling mandatory 2FA.
{{< /image >}}

#### Mandatory Login via an External Provider

To enable the mandatory use of an external login provider go to the organization's _Configuration_, open the _Security_ tab and edit _Access Requirements_. The the value to _SSO login required_ and save the changes.

{{< image src="xtc/login_requirement_sso.png" >}}
Mandatory External Login Provider with a specific issuer URL.
{{< /image >}}

Admins can allow a specific set of login providers by putting their issuer URLs into the text field. Issuer URLs are the exact values of the `iss` claim in the OpenID Connect access token signed by your provider (e.g. `https://accounts.google.com` for the public Google identity provider). The system supports multiple allowed issuers by putting each URL on a seperate line.

{{% warning notitle %}}
If you are not currently logged in via an external provider the system will warn you about _locking yourself out of the organization_. Take this warning seriously as you will not be able to access the organization (and therefore change the login requirement) after saving the configuration!

Admins *SHOULD* be logged in via the login provider they intend their users to use, if possible. The system checks your current issuer against the entries in the list while entering them and therefore provides immediate feedback regarding any typos in the URL.
{{% /warning %}}