---
title: "Private Machines"
weight: 156
type: docs

description: >
  Running load tests using your own machine infrastructure in network-isolated environments.
---

{{% warning %}}
**Beta Feature**: The Private Machines feature is currently in beta/preview and is not yet generally available. If you would like to participate in the preview and have this feature enabled for your organization, please contact Xceptance. An updated pricing schema to support private machines will be announced when private machines leave the beta program.
{{% /warning %}}

Sometimes the system under test (SUT) is not accessible from the public internet — for example, when it resides behind a corporate firewall or in a private network segment. In such scenarios, whitelisting every XTC agent machine's IP address in the firewall is often impractical. 

A better alternative is to place the load generator machines in the same network as the SUT. Because those machines are not reachable from the outside, they are referred to as **private machines**. This allows you to run load tests in a fully contained, network-isolated environment.

## How it Works

Unlike public cloud or custom machines where XTC directly initiates communication to control them, private machines run within your own infrastructure and are not directly reachable from the internet. 

Instead, the communication is initiated from the private machine itself:
1. **Registration**: The XLT agent controller running on the private machine registers with XTC via the REST API so that XTC knows it is available.
2. **Tunneling**: The agent controller establishes a secure tunnel to XTC via the **XLT Relay**. Through this tunnel, the agent controller receives tasks from XTC.

Private machines must be available when a load test is started. You are responsible for starting and stopping them — either by keeping them running continuously, or by automating their lifecycle around your load tests with a scripted process.

Apart from these operational differences, there are no further distinctions between public and private machines. Public machines (cloud or custom) and private machines can be freely mixed within a single load test.

## Prerequisites

For a machine to act as a private machine, it must meet the following requirements:

* **Connectivity**: Outbound HTTPS connections to `xtc.xceptance.com` and `xtc-xlt-relay.xceptance.com` on port 443 must be permitted.
* **Java**: Java 21 or later must be installed.
* **XLT**: XLT 10.0.0-beta-2 or later must be installed.
* **Configuration**: XLT must be configured for private machine mode.

## Setup Steps

### Step 1: Create API Client Credentials
In your load testing project in XTC, create API client credentials with at least the `PRIVATEMACHINE_REGISTER` scope (under *Configuration > Integrations > API Client Credentials*). These credentials will be used by the XLT agent controllers on your private machines to register themselves. 

Save the generated client ID and secret. You will also need the short names of your XTC organization and load testing project.

### Step 2: Configure the XLT Agent Controller
Configure XLT for private machine mode on each private machine by editing `<xlt>/config/agentcontroller.properties`. The following settings are required:

| Property | Default | Description |
|---|---|---|
| `com.xceptance.xlt.agentcontroller.password` | `xceptance` | The password used to protect access to the agent controller. Must be the same for all machines. |
| `com.xceptance.xlt.agentcontroller.privateMachine.enabled` | `false` | Set to `true` to enable private machine mode. |
| `com.xceptance.xlt.agentcontroller.privateMachine.name` | _(auto-generated)_ | An optional human-readable name for this private machine as it appears in XTC. |
| `com.xceptance.xlt.agentcontroller.privateMachine.type` | `MEDIUM` | The capacity class of this machine. One of: `TINY`, `SMALL`, `MEDIUM`, `LARGE`. Make sure the specified type reflects the machine's actual hardware resources. |
| `com.xceptance.xlt.agentcontroller.privateMachine.xtc.clientId` | — | The client ID of the API credentials created in Step 1. |
| `com.xceptance.xlt.agentcontroller.privateMachine.xtc.clientSecret` | — | The client secret of the API credentials created in Step 1. |
| `com.xceptance.xlt.agentcontroller.privateMachine.xtc.org` | — | The short name of your XTC organization. |
| `com.xceptance.xlt.agentcontroller.privateMachine.xtc.project` | — | The short name of your XTC load testing project. |

### Step 3: Start the Agent Controller
Start the XLT agent controller on each private machine. It will immediately register itself with XTC. Verify that all machines appear on the **Private Machines** page of your project in the XTC UI.

## Using Private Machines in Load Tests

To use private machines in a load test:
1. Open the load test details page and go to the **Machines** tab.
2. Under the **Private Machines** section, specify the desired machine type and the required number of machines. (The machines do not need to be online at the time of configuration).
3. Ensure the agent controller password configured in `agentcontroller.properties` is entered in the **Common Machine Configuration** section.
4. Start the load test as usual. 

When the load test starts, XTC searches for the requested number of available private machines of the specified type and reserves them for the duration of the test. If not enough private machines of that type are registered and online, the test will fail to start.

Once the load test completes, XTC releases the reserved private machines, making them available for other load tests.
