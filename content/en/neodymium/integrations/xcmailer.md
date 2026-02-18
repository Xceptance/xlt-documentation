---
title: "XcMailr Plugin"

weight: 300
type: docs

description: >
    Integration with XcMailr for temporary email services.
---

Temporary email services are essential for UI test automation involving email confirmation or
communication. [XcMailr](https://xcmailr.xceptance.de/?lang=de) provides this service, and the
official [XcMailr Client](https://github.com/Xceptance/XCMailr/tree/develop/xcmailr-client) encapsulates its REST API.

For Neodymium users, this plugin further enhances usability by offering automatic setup via configuration files, polling
mechanisms, and helpful shortcuts for common requests, providing an experience similar to the core Neodymium library.

**Note:** The plugin can be used within any standard Maven project and does not strictly require a Neodymium project.

## Requirements

* Java 11
* Maven 3.x

## Getting Started

### Add Dependency

First, include the XcMailr plugin as a dependency in your Maven project. Always check
the [plugin project](https://github.com/Xceptance/neodymium-plugin-xcmailr) for the latest release version.

```xml

<dependency>
    <groupId>com.xceptance</groupId>
    <artifactId>neodymium-plugin-xcmailr</artifactId>
    <version>1.1.1</version>
</dependency>
```

### Configure Access

After adding the dependency, populate the configuration file located at `config/xcmailr.properties`. Similar to
`neodymium.properties`, this file can be overridden for local or test-specific purposes using a
`config/dev-xcmailr.properties` file.

Alternatively, settings can be provided as standard Java properties during the test execution process.

#### API Token

You must have access to a running XcMailr instance to obtain your API token:

1. Create an account on your XcMailr instance.
2. Navigate to the **Edit Profile** tab and scroll to the **API Token** section.
3. Click **Generate new token**.
4. Copy the generated token into your configuration file.

#### XcMailr Properties

The following properties are available to configure the plugin. Note that these settings can be accessed and temporarily
changed within a test using `XcMailrApi.getConfiguration()`.

| Property                            | Default Value | Description                                                                                                             |
|:------------------------------------|:--------------|:------------------------------------------------------------------------------------------------------------------------|
| `xcmailr.url`                       | -             | The URL used to access the XcMailr server and website (influences all API methods).                                     |
| `xcmailr.apiToken`                  | -             | The individual API token required to access personal temporary mailboxes (required for all API methods).                |
| `xcmailr.temporaryMailValidMinutes` | 15 minutes    | The period (in minutes) during which a newly created temporary email address should remain active.                      |
| `xcmailr.maximumWaitingMinutes`     | 10 minutes    | The maximum amount of time (in minutes) to wait when polling for an email to be received by the temporary mail address. |
| `xcmailr.pollingIntervalSeconds`    | 30 seconds    | The interval (in seconds) that the system should wait between checks for new emails.                                    |

## API Usage

The XcMailr plugin provides the following functions via the `XcMailrApi` class to manage mailboxes and retrieve emails.

### Configuration Access

| Function             | Description                                                   |
|:---------------------|:--------------------------------------------------------------|
| `getConfiguration()` | Provides access to the current plugin configuration instance. |

### Mailbox Management

These functions manage the temporary mailbox used for testing.

| Function                                                                           | Description                                                                                                               |
|:-----------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------|
| `createTemporaryEmail(String eMailAddress, boolean forwardEnabled)`                | Creates a new mailbox with the specified address and enables forwarding if requested. Returns the created mailbox object. |
| `getMailbox(String eMailAddress)`                                                  | Retrieves the mailbox object associated with the given email address.                                                     |
| `deleteMailbox(String eMailAddress)`                                               | Deletes the mailbox associated with the given email address.                                                              |
| `listMailboxes()`                                                                  | Lists all active mailboxes within the used XcMailr account. Returns a list of mailbox objects.                            |
| `updateMailboxEmailAddress(String oldEMailAddress, String newEMailAddress)`        | Shortcut to update the email address of an existing mailbox. Returns the updated mailbox.                                 |
| `updateMailboxDeactivationTime(String eMailAddress, int newValidMinutes)`          | Shortcut to update the period until the mailbox is deactivated. Returns the updated mailbox.                              |
| `updateMailboxForwarding(String eMailAddress, boolean forwardEnabled)`             | Shortcut to update the forwarding setting of the mailbox. Returns the updated mailbox.                                    |
| `updateMailbox((String oldEMailAddress, String newEMailAddress, Integer, Boolean)` | The basic function to update various mailbox settings. Returns the updated mailbox.                                       |

### Email Retrieval

These functions retrieve emails from a mailbox, with several shortcut methods for common filtering tasks.

| Function                                                                                                                                   | Description                                                                                                                                                          |
|:-------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `retrieveAllMailsFromMailbox(String eMailAddress)`                                                                                         | Shortcut to retrieve all emails from the specified mailbox. Returns a list of mail objects.                                                                          |
| `retrieveLastEmailBySubject(String eMailAddress, String subject)`                                                                          | Shortcut to retrieve the **last** email matching the given subject (which can be a RegEx). Returns the mail object.                                                  |
| `retrieveLastEmailBySender(String eMailAddress, String fromEMailAddress)`                                                                  | Shortcut to retrieve the **last** email matching the given sender email address (which can be a RegEx). Returns the mail object.                                     |
| `fetchEmails(String eMailAddress, String from, String subject, String textContent, String htmlContent, String headers, boolean lastMatch)` | The basic function for retrieving emails. All parameters (except `eMailAddress` and `lastMatch`) can be specified as RegEx. Returns a list of matching mail objects. |

### Attachments

| Function                                                                 | Description                                                                                            |
|:-------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------|
| `fetchAttachment(Mail mail, String attchmentId, File saveAttchmentFile)` | Fetches a specific mail attachment from the given mail object and saves it to the specified file path. |

---

## Viewing Mail Content in the Browser

To easily view the HTML content of a retrieved email, Neodymium provides an API solution to display it in the current
WebDriver instance:

```java
// Retrieve the mail object
Mail mail = XcMailrApi.retrieveLastEmailBySubject("user@example.com", "Welcome Mail");
// Open the HTML content in the browser
SelenideAddons.openHtmlContentWithCurrentWebDriver(mail.htmlContent);
```

{{% note %}}
Please note to use `mail.htmlContent` for HTML viewing and `mail.textContent` for plain text viewing.
{{% /note %}}
