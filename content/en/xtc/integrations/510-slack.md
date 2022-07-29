---
title: "Slack Integration"

weight: 510
type: docs

description: >
    XTC's ability to send notifications about specific events via Slack
---

XTC can integrate with [Slack](https://slack.com) to send notifications about certain system event to public channels. Notifications include state changes for load tests or monitoring events.

## Configuration

Slack notifications can be configured either at the organization or project level.

{{% permission type="organization" least="true" role="organization administrator" action="configure Slack integration on org level" %}} 

{{% permission type="project" least="true" role="project administrator" action="configure Slack integration on project level" %}}

{{< image src="xtc/slack-config-readonly.png" max-width="90%" >}}
Default configuration values at the organization level: message sending is disabled, the integration is not configured and no target channels are set. Threads and compact messages are disabled.
{{< /image >}}

Organization-level configuration values take effect in all the organization's projects unless explicitly overridden. Overriding occurs at a value level, i.e. not setting a specific configuration value at the project level will leave the corresponding value of the organization's config in place.

{{< image src="xtc/slack-config-override.png" max-width="90%" >}}
An integration config of a project with the "Send messages" overriden and all other values inherited from the surrounding organization.
{{< /image >}}

## Configuration Values

Clicking the edit button on the Slack configuration opens the configuration form for setting up or removing the integration and editing its settings:

{{< image src="xtc/slack-config.png" max-width="80%" >}}
The Slack integration config form
{{< /image >}}

### Send messages

The Slack integration will not send any messages unless enabled. If a project has a configuration, this value will *always* override the organization's setting, i.e. projects with this set to "Disabled" will not send messages even if their containing organization has the integration enabled.

### Set Up Slack Integration

This will forward the browser to Slack to initiate the integration process. If your Slack user has the appropriate permissions within the Slack workspace you will be presented with a screen to confirm the installation of XTC in your workspace. Upon confirmation you will be redirected back to the configuration overview where **Slack Integration** now should have changed to "Done" and and the **Slack Workspace** should contain the name of the Slack workspace you just installed XTC to.

{{< image src="xtc/slack-config-token-installed.png" max-width="90%" >}}
Slack integration installed into a workspace named "XTC-Test-Workspace"
{{< /image >}}
  
{{% warning notitle %}}
Clicking the "Set Up Slack Integration" button will forward you to Slack *without* saving the form contents.
{{% /warning %}}
  
{{% note notitle %}}
If your Slack workspace is set up to require app approval, you may be presented with a screen to request said approval from an appropriate user in your workspace. Once this approval has been granted you can just restart the setup from the XTC config form.
{{% /note %}}

When an integration is set up on the project level it will override any inherited values from the surrounding organization.

### Remove Slack Integration

Removing the integration from your organization or project will remove all necessary integration data. In order to re-enable the integration again, you might have to repeat the setup process, potentially including any confirmation process within Slack.

{{% note notitle %}}
When removing the integration from a project the integration of the surrounding organization takes effect. XTC does not allow projects to override an organization-wide integration with "empty data".
{{% /note %}}

### Target Channels

The channels to send messages to. Separate multiple channels using spaces. This value will override inherited values only if it is non-empty.
  
{{% note notitle %}}
XTC does *NOT* support sending messages to individual users or private channels.
{{% /note %}}

### Message Grouping / Compact View

As the default message style takes up quite some space in the Slack channel, it might be desirable to get a more compact message view. This can be achieved by choosing the _Compact Message View_ and/or by _Grouping related messages into threads_ (e.g. all messages about the status of one load test). 

{{< image src="xtc/slack-format-thread.png" max-width="90%" >}}
Default message format with thread for subsequent messages about the same load test.
{{< /image >}}

{{< image src="xtc/slack-format-compact.png" max-width="90%" >}}
A message in compact format.
{{< /image >}}

### Send Test Message

If a complete configuration (i.e. integration data and target channels) is available (inherited or configured directly), admins can send a test message to check for a correct setup. Please check in your Slack client whether the message arrived as expected. If not please re-check the configured values.

## Notification Events

Once configured XTC will send notifications for the following events:

{{% warning notitle %}}
Due to limitations in Slack's text renderer certain control characters will be filtered from the input values when displaying them in messages. If any of your organization's, project's, load test's or report's names containes any of the following characters, these may be removed: `_`, `*`, `` ` `` or `~`.
{{% /warning %}}

### Load Tests
  * **Start** A user started a load test from the UI.
  * **Running** The setup phase is complete; the actual test run starts.
  * **Finished** The test run is done.
  * **Aborted** The test run has been aborted by a user.
  * **Error** The load test failed at any step.
  * **Report Available** The final report for the test is available.

Additionally XTC will also send notifications when intermediate reports become available.

### Monitoring

If a scenario is configured to notify via Slack, XTC will send notifications the same way it would send e-mails or text messages.