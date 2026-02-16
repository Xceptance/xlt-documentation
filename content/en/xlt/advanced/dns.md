---
title: "DNS"

weight: 300
type: docs

description: >
    Learn how XLT handles DNS, options for modifying this behavior, and how to capture DNS-related data.
tags: ["dns", "configuration", "networking", "performance"]
last_updated: 2026-02-02
---

## The Challenge

Load testing presents challenges when working with dynamic DNS setups, such as CDNs or custom DNS-based load balancing. While resolving a single IP address is straightforward, IPs that change over time or vary by location can cause setup, execution, and debugging issues. XLT offers several options to handle these situations effectively.

### Java DNS Resolution Limitations

Java's standard DNS resolution has two key limitations that might affect the load testing outcome:

**Global Cache**: Java's `InetAddress` cache is global to the JVM. All virtual users share the same cache entry for a hostname. When an entry expires, it expires for everyone simultaneously. If the IP address changes, all traffic from that JVM effectively switches servers at once, potentially causing sudden load spikes.

**Fixed Order**: Java caches IP addresses in the order received and typically returns them in that preserved order. This defeats standard DNS round-robin, as the first IP address consistently receives all traffic while others remain underutilized.

## Logging

Enable IP address logging to gain visibility into DNS resolution. Logged IPs appear in the [result data files]({{< relref "results/#collected-values" >}}).

```bash
xlt.dns.recordAddresses = true
```

### Request-Specific Logging

While `xlt.dns.recordAddresses` logs IP addresses once per resolution, you can also collect the IP address used for *every* individual request. This is particularly useful when a host resolves to multiple IPs and you want to track which server handled each specific request.

```bash
com.xceptance.xlt.results.data.request.collectUsedIpAddress = true
```

Additionally, XLT can capture more detailed request information, such as the HTTP method and, for POST requests, the form data and its encoding. Use this sparingly, as it significantly increases the size of result data.

```bash
com.xceptance.xlt.results.data.request.collectAdditionalRequestInfo = true
```

## Improve Distribution

XLT includes enhancements to improve load distribution across multiple IP addresses by addressing Java's limitations.

**Per-User Address Caching**: To solve the global cache issue, XLT can maintain a separate address resolution cache for each virtual user (WebClient instance). This cache remains valid for the lifetime of a user's session (one iteration). When an IP address changes, active sessions continue using their cached IP, preventing all traffic from switching servers simultaneously.

**Address Shuffling**: To solve the fixed order issue, XLT can automatically randomize the order of resolved IP addresses. This ensures all available IPs receive approximately equal traffic, overcoming Java's default behavior of always selecting the first address.

Enable these features by setting the following properties:

```bash
xlt.dns.cacheAddresses = true
xlt.dns.shuffleAddresses = true
```

## IP Version Filtering

In some network environments, a specific IP protocol (IPv4 or IPv6) might cause connectivity issues or adds unwanted complexity. You can configure XLT to ignore addresses of a specific IP version during resolution.

```bash
xlt.dns.ignoreIPv4Addresses = false
xlt.dns.ignoreIPv6Addresses = true
```

## Use Only One Address

When a hostname resolves to multiple IP addresses, the underlying HttpClient silently tries each address in sequence until a connection succeeds. This "silent failover" behavior can mask server issues and lead to confusing results where high request runtimes don't match individual socket timings.

**Debugging Strategy**: Limit the IP selection to expose issues with specific servers.

By setting the property below, XLT will randomly pick a single IP address from the available list and only use that one. If that specific server has issues, the request will fail immediately, identifying the culprit.

```bash
xlt.dns.pickOneAddressRandomly = true
```

{{% tip %}}
Combine with `xlt.dns.recordAddresses=true` to identify exactly which IP/server is causing issues.
{{% /tip %}}

## Manual Hostname Resolution

You can manually map a hostname to one or more IP addresses, bypassing DNS resolution entirely. This works like a per-test `/etc/hosts` file and is useful for testing in environments where DNS might be unreliable or to direct traffic to specific pre-production servers.

```bash
# Format: xlt.dns.override.<hostname> = <ip1>, <ip2>, ...
xlt.dns.override.example.org = 192.0.2.1, 2001:db8::1
```

## Changing Cache Time

Java's DNS handler may cache entries longer than the TTL announced during resolution. You can override this behavior to force more frequent DNS lookups.

```bash
xlt.dns.providers.platform.cache.duration = 30
```

{{% warning %}}
Setting a low value increases DNS traffic. This property only applies to the `platform` provider, not `dnsjava`.
{{% /warning %}}

## Using an Alternative Provider

XLT supports an alternative DNS resolver using [dnsjava](https://github.com/dnsjava/dnsjava). This is useful for:

- **CDN DNS Load Balancing**: When CDNs use DNS entries for load balancing.
- **EDNS Support**: Enables [EDNS](https://tools.ietf.org/html/rfc7871), which returns data based on the user's location rather than the resolver's location.
- **Custom DNS Servers**: Override system DNS with specific servers.

{{% note notitle %}}
Java's built-in DNS has improved in recent releases. Evaluate whether the alternative provider is still necessary for your use case.
{{% /note %}}

```bash
xlt.dns.provider = dnsjava
```

### dnsjava Settings

When using the `dnsjava` provider, additional configuration options are available:

```bash
xlt.dns.providers.dnsjava.resolver.servers =
xlt.dns.providers.dnsjava.resolver.timeout = 5
xlt.dns.providers.dnsjava.edns.version = 0
```

{{% warning %}}
These DNS properties only apply when using XLT's WebClient or HttpClient. Custom networking libraries are not affected.
{{% /warning %}}

## Property Reference

| Property | Default | Description |
|----------|---------|-------------|
| `xlt.dns.recordAddresses` | `false` | When enabled, logs the resolved IP address for each request. |
| `xlt.dns.cacheAddresses` | `false` | Enables per-virtual-user caching. Caches resolved addresses for the lifetime of a WebClient (typically one transaction). |
| `xlt.dns.shuffleAddresses` | `false` | Randomly shuffles the list of resolved IP addresses to ensure even distribution. |
| `xlt.dns.ignoreIPv4Addresses` | `false` | When enabled, ignores all IPv4 addresses returned by the DNS resolver. |
| `xlt.dns.ignoreIPv6Addresses` | `false` | When enabled, ignores all IPv6 addresses returned by the DNS resolver. |
| `xlt.dns.pickOneAddressRandomly` | `false` | Selects a single IP from the resolved list instead of trying all. Useful for debugging specific server issues. |
| `xlt.dns.override.<hostname>` | (none) | Manually maps a hostname to a comma-separated list of IP addresses, bypassing DNS resolution. |
| `xlt.dns.providers.platform.cache.duration` | (system) | Overrides Java's global DNS cache duration (in seconds). Only applies to `platform` provider. |
| `xlt.dns.provider` | `platform` | Selects the DNS provider: `platform` (default Java) or `dnsjava`. |
| `xlt.dns.providers.dnsjava.resolver.servers` | (empty) | Comma-separated list of DNS server addresses for `dnsjava`. Empty uses system defaults. |
| `xlt.dns.providers.dnsjava.resolver.timeout` | `5` | DNS server timeout in seconds for `dnsjava`. |
| `xlt.dns.providers.dnsjava.edns.version` | `0` | EDNS version for `dnsjava`. Set to `-1` to disable. |
| `com.xceptance.xlt.results.data.request.collectUsedIpAddress` | `false` | Whether to collect the specific IP address used for every request. |
| `com.xceptance.xlt.results.data.request.collectAdditionalRequestInfo` | `false` | When enabled, collects HTTP method and POST form data for each request. |

> [!NOTE]
> These properties are typically defined in `project.properties` or `default.properties` for test suites, except for `xlt.dns.providers.platform.cache.duration` which is often a system-wide setting.
