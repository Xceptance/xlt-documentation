---
title: "Private Machine Mode"
linkTitle: "Private Machine Mode"

weight: 495
type: docs

description: >
    Running XLT load testing agent controllers in network-isolated environments and corporate infrastructure.
---

When performing load tests against applications located inside corporate firewalls, VPNs, or isolated private networks (such as internal staging or pre-production environments), external public cloud load generators cannot directly reach the System Under Test (SUT). Whitelisting arbitrary external IP addresses in enterprise firewalls is often impractical or prohibited by security policy.

To solve this, XLT supports **Private Machine Mode**. In Private Machine Mode, XLT agent controllers run directly inside your own private infrastructure (on-premises or private cloud) with direct network access to the SUT.

## Concept and Architecture

In standard load testing mode, XTC or the Mastercontroller initiates direct inbound connections to each Agent Controller. In Private Machine Mode, the communication direction is reversed:

1. **Outbound Registration**: Upon startup, the XLT Agent Controller initiates an HTTPS request to XTC (`xtc.xceptance.com`) using API client credentials to register itself as available.
2. **Secure Relay Tunneling**: The Agent Controller establishes a persistent, secure outbound tunnel to XTC via the **XLT Relay** service (`xtc-xlt-relay.xceptance.com` on port 443).
3. **Task Dispatching**: All load test commands, scenario profiles, and execution instructions are delivered to the Agent Controller through this secure tunnel. No open incoming ports on your network firewall are required.

## Prerequisites

To run an XLT Agent Controller in Private Machine Mode, ensure the following prerequisites are met:

* **Network Connectivity**: Outbound HTTPS connections (port 443) to `xtc.xceptance.com` and `xtc-xlt-relay.xceptance.com` must be permitted.
* **Java Version**: Java 21 or higher installed on the host machine.
* **XLT Version**: XLT 10.0.0-beta-2 or later.

## Configuration Guide

### Step 1: Create API Client Credentials in XTC
In your XTC project configuration (*Configuration > Integrations > API Client Credentials*), create API client credentials with at least the `PRIVATEMACHINE_REGISTER` scope. Save the generated **Client ID** and **Client Secret**, along with your XTC organization and project short names.

### Step 2: Configure `agentcontroller.properties`
On each private load generator machine, edit `<xlt>/config/agentcontroller.properties` with the required settings:

| Property | Default | Description |
|---|---|---|
| `com.xceptance.xlt.agentcontroller.password` | `xceptance` | Access password for the agent controller. Must match across all machines in a test setup. |
| `com.xceptance.xlt.agentcontroller.privateMachine.enabled` | `false` | Set to `true` to activate Private Machine Mode. |
| `com.xceptance.xlt.agentcontroller.privateMachine.name` | _(auto-generated)_ | Human-readable identifier for this machine as shown in XTC. |
| `com.xceptance.xlt.agentcontroller.privateMachine.type` | `MEDIUM` | Capacity class (`TINY`, `SMALL`, `MEDIUM`, `LARGE`) reflecting local hardware resources. |
| `com.xceptance.xlt.agentcontroller.privateMachine.xtc.clientId` | — | The API Client ID created in Step 1. |
| `com.xceptance.xlt.agentcontroller.privateMachine.xtc.clientSecret` | — | The API Client Secret created in Step 1. |
| `com.xceptance.xlt.agentcontroller.privateMachine.xtc.org` | — | Short name of your XTC organization. |
| `com.xceptance.xlt.agentcontroller.privateMachine.xtc.project` | — | Short name of your XTC load testing project. |

### Step 3: Start the Agent Controller
Start the Agent Controller process on the machine:

```bash
bin/agentcontroller.sh
```

Upon startup, the controller registers with XTC and opens its Relay tunnel. Verify that the machine appears in the online list on the **Private Machines** tab of your XTC project configuration.

## Execution Lifecycle in XTC Load Tests

* **Allocation**: When configuring a load test in XTC, select the required count and capacity class of Private Machines on the *Machines* tab.
* **Reservation**: At load test start, XTC locates available registered private machines of the requested type and reserves them for the duration of the test.
* **Hybrid Execution**: Private machines can be freely combined with public cloud or custom machines within a single load test.
* **Teardown**: When the load test completes, XTC automatically releases the reserved private machines back to the pool.

For more information on using Private Machines in XTC load testing projects, see the [XTC Private Machines Guide]({{< relref "xtc/loadtesting/156-private-machines" >}}).
