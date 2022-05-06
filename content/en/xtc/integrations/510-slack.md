---
title: "Slack Integration"

weight: 510
type: docs

description: >
    XTC's ability to send notifications about specific events via Slack
---

XTC can integrate with Slack to send notifications about certain system event to public channels. Notifications include state changes for load tests or monitoring events.

{{% note notitle %}}
 fgvkjdsfhgksdjfh
{{% /note %}}


## For XTC Project and Organization Admins

Slack notifications can be configured either at the organization or project levels.

{{< image src="xtc/slack-default-config.png" max-width="80%" >}}
Default configuration values at the Organization level: the integration is disabled, no bot token or target channels are set.
{{< /image >}}

Organization-level configuration values take effect in all the organization's projects unless explicitly overridden. Overriding occurs at a value level, i.e. not setting a specific configuration value at the project level will leave the corresponding value of the organization's config in place.

{{% note notitle %}}
Organization admins can make use of this ability to limit the dissemination of the secret Slack bot token. Set the token at the Organization level and let project admins enable/disable the integration and configure the target channels.
{{% /note %}}

### Configuration

{{< image src="xtc/slack-config-form.png" max-width="80%" >}}
The Slack integration config form
{{< /image >}}

* **Enable Slack Integration** The Slack integration will not send any messages unless enabled. If a project has a configuration, this value will *always* override the organization's setting, i.e. projects with this set to "Disabled" will not send messages even if their containing organization has the integration enabled.
* **Slack Bot Token** The bot token to access your organization's Slack. See [For Slack Organization Admins](#for-slack-organization-admins) for information on how to obtain an appropriate token. Without a valid token XTC will not be able to send any messages.
  {{% warning notitle %}}
  Once configured you will not be able to see the token again. XTC will indicate that a token is configured, but not give you its value. This is to prevent the accidental dissemination of the secret token via the config form.
  {{% /warning %}}
  This value will override an inherited token if it is non-empty.
* **Remove existing token** Check this box to erase a previously configured token from this configuration. If a token value is set in the token input box, this checkbox will be ignored.
  {{% note notitle %}}
  This checkbox will only erase the token configured in this specific configuration. It will *not* enable project admins to "unset" an inherited organization token.
  {{% /note %}}
* **Target Channels** The channels to send messages to. Separate multiple channels using spaces. This value will override inherited values only if it is non-empty.
* **Send Test Message** If a complete configuration (i.e. token and target channels) is available (inherited or configured directly), admins can send a test message to check for a correct setup. Please check in your Slack client whether the message arrives as expected. If not please re-check the configured values.

## For Slack Organization Admins

In order to use XTC's Slack integration you will need to install the corresponding App in your Slack Organization.

