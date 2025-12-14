---
title: "Installation"

weight: 10
type: docs

description: >
  How to install XLT.
---

## Hardware and Software Requirements

### Hardware

- CPU at 1.5GHz or higher
- 1.0 GB RAM
- 1.0 GB available in the hard disk (default installation requires
    about 150 MB, but test results might need additional capacity)

### Software

XLT will work on any operating system for which a current JVM and the other software prerequisites are available, so make sure you have the following:

- current JVM (see [release notes]({{< relref "../release-notes" >}}) for currently recommended version)
- a browser to view the html load test reports in (note that JavaScript has to be enabled to utilize all functionality)

## Installation

### Download

The XLT archive can either be obtained from the [Xceptance website](https://www.xceptance.com/en/xlt/download.html) or from Xceptance's custom Maven-compatible repository (see [below]({{< relref "#maven" >}})) which allows users of Maven and Ivy to conveniently integrate XLT and all of its dependencies into their build processes.

### Extract

Unzip the XLT archive to a file system location of your choice. The root directory is part of the archive, so you don’t need to create it separately. XLT supports spaces in the path; however, it's easier to code tests when the path is free of them.

{{% note notitle %}}
Please make sure the executable directory of your Java installation is listed in your PATH environment variable so that the XLT start scripts can find the JVM runtime.
{{% /note %}}

### Maven

```xml
<dependencies>
    <dependency>
        <groupId>com.xceptance</groupId>
        <artifactId>xlt</artifactId>
        <version>9.0.0</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

{{% warning title="Version" %}}
The version above might not be the latest. Please adjust the version information accordingly.

For versions below XLT 5.0.x you need to [configure the Xceptance repository]({{< relref "maven-builds" >}}).
{{% /warning %}}

## Updating

### Backup

Before you update XLT, it’s highly recommended to back up all modified files and project-specific or customized settings. In particular, this includes:

- All your test suites (especially when stored in a sub-folder of the XLT installation directory)
- Result files (stored in `<XLT>/results` by default)
- Generated load test reports (stored in `<XLT>/reports` by default)
- Modified XLT properties files (`<XLT>/config`)

### Download and install

As described above in the [installation]({{< relref "#installation" >}}) section, download and install the latest XLT version from the Xceptance website. You can have multiple XLT versions simultaneously existing in the same directory since the name of the unpacked installation folder includes the version number by default.

### Copy Backed-up Files

Copy your backed-up files and directories to the corresponding place in the new XLT installation directory.

### Copy test suite settings

New test suite settings are provided in the `default.properties` file of the test suite *testsuite-template*. Copy it from `<LatestXLTversion>/samples/testsuite-template/config` to the config directory of your test suites `<YourTestSuite>/config`.

{{% note notitle %}}
Note that when you configure your test project to use a newer version of XLT, do not forget to update XLT on your load machines as well. The version you have used to develop your test scripts must match the executing version of your load test environment.
{{% /note %}}

## Uninstallation

Before uninstalling XLT, make sure to back up all test results and test reports you want to keep. To uninstall XLT, simply delete its installation directory.
