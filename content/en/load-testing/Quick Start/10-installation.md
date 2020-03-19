---
title: "Installation"

weight: 10
type: docs

description: >
  How to install XLT.
---

## System Requirements

### Hardware

-   CPU at 1.5GHz or higher
-   1.0 GB RAM
-   1.0 GB available in the hard disk (default installation requires
    about 150 MB but test results might need additional capacity)

### Software

-   Operating System: Microsoft Windows, Linux, Oracle Solaris, HP-UX,
    or Mac OS X, that is any operating system for which a JVM 8 (or
    higher) is available.
-   JVM: It’s recommended to use Oracle’s JVM, but XLT also runs on OpenJDK.
    JVMs provided by vendors such as OpenJDK BEA, HP, or IBM have not
    been tested extensivly and may or may not work.
-   Browser: Firefox, Chrome, Internet Explorer 10, or Safari 6 for the
    HTML load reports. Note that JavaScript has to be enabled to utilize
    all functionality.

## Installation

The XLT archive can either be obtained from the [Xceptance website](https://www.xceptance.com/en/xlt/download.html) or from Xceptance's custom Maven-compatible repository (see [below](#maven)) which allows users of Maven and Ivy to conveniently integrate XLT and all of its dependencies into their build processes.

Unzip the XLT archive to a file system location of your choice. The root directory is part of the archive, so you don’t need to create it separately. XLT supports spaces in the path; however, it's easier to code tests when the path is free of them.

Copy the license file to the directory `<XLT>/config`. Make sure the executable directory of your Java installation is listed in your PATH environment variable so that the XLT start scripts can find the JVM runtime.

### Maven

```xml
<repositories>
    <repository>
        <id>xc-nexus</id>
        <url>https://lab.xceptance.de/nexus/content/groups/public</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>com.xceptance</groupId>
        <artifactId>xlt</artifactId>
        <version>4.13.2</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```
{{% warning title="Version" %}}
The version above might not be the latest version. Please adjust the version information accordingly. 
{{% /warning %}}

## Updating
Before you update XLT, it’s highly recommended to back up all modified files and project-specific or customized settings. In particular, this includes:

* All your test suites (especially, when stored in a sub-folder of the XLT installation directory)
* Result files (stored in `<XLT>/results` by default)
* Generated load test reports (stored in `<XLT>/reports` by default)
* Modified XLT properties files (`<XLT>/config`)

Download and install the latest XLT version from the Xceptance website as described above. You can have multiple XLT versions simultaneously since the name of the unpacked installation folder includes the version number by default.

Copy your backed-up files and directories to the corresponding place in the new XLT installation directory.

New test suite settings are provided in the `default.properties` file of the test suite *testsuite-template*. Copy it from `<LatestXLTversion>/samples/testsuite-template/config` to the config directory of your test suites `<YourTestSuite>/config`.

{{% note notitle %}}
Note that when you configure your test project to use a newer version of XLT, do not forget to update XLT on your load machines as well. The version you have used to develop your test scripts must match the executing version of your load test environment.
{{% /note %}}

## Uninstallation
Before uninstalling XLT, make sure to back up all test results and test reports you want to keep. To uninstall XLT, simply delete its installation directory.