---
layout: manual
title: Installation
---

System Requirements
-------------------

### Hardware

-   CPU at 1.5GHz or higher
-   1.0 GB RAM
-   1.0 GB available in the hard disk (default installation requires
    about 150 MB but test results might need additional capacity)

### Software

-   Operating System: Microsoft Windows, Linux, Oracle Solaris, HP-UX,
    or Mac OS X, that is any operating system for which a JVM 7 (or
    higher) is available.
-   JVM: It’s recommended to use Oracle’s JVM. XLT also runs on OpenJDK.
    JVMs provided by vendors such as OpenJDK BEA, HP, or IBM have not
    been tested extensivly and may or may not work.
-   Browser: Firefox, Chrome, Internet Explorer 10, or Safari 6 for the
    HTML load reports. Note that JavaScript has to be enabled to utilize
    all functionality. If you want to use XLT Script Developer, you need
    to have Firefox 31 (or higher).

Installing XLT
--------------

Unzip the XLT archive to a file system location of your choice. The root
directory is part of the archive, so you don’t need to create it
separately. XLT supports spaces in the path; however, it’s easier to
code tests when the path is free of them.

Copy the license file to the directory `<XLT>/config`. Please note that
the *Basic License* does not require the installation of a license file.
It restricts the number of virtual users to five; yet there are neither
temporal nor functional limitations. Also note that the *Basic License
Terms* apply in that case. See <XLT>/doc/license.html for more
information.

Make sure the executable directory of your Java installation is listed
in your `PATH` environment variable so that the XLT start scripts can
find the JVM runtime.

To install the XLT Script Developer extension for Firefox, you need to:

-   Start Firefox.
-   Click *File* \> *Open File…*.
-   Navigate to the `<XLT>/tools` directory and select the `.xpi` file.
    The Add-on installation dialog appears.
-   Click *Install* to finish.

If the *File* Menu is not visible, you can also install the XLT Script
Developer like this:

-   Start Firefox.
-   Open the Menu (The three horizontal bars on the upper right-hand
    side).
-   Click on *Add-Ons*.
-   Choose *Extensions*.
-   Click the gear symbol next to the Search bar.
-   Click on *Install Add-On from File*.
-   Navigate to the `<XLT>/tools` directory and select the `.xpi` file.
    The Add-on installation dialog appears.
-   Click *Install* to finish.

Alternatively, you can drag the `.xpi` file onto the Firefox window.

> The XLT archive can either be obtained from the *Xceptance* website or
> from our Maven-compatible repository which allows users of Maven and
> Ivy to conveniently integrate XLT and all of its dependencies.

Updating XLT
------------

Before you update XLT, it’s highly recommended to back up all modified
files and project-specific or customized settings. In particular, this
includes:

-   All your **test suites** (especially, when stored in a sub-folder of
    the XLT installation directory)
-   **Result** files (stored in `<XLT>/results` by default)
-   Generated load test **reports** (stored in `<XLT>/reports` by
    default)
-   Modified XLT **properties** files (`<XLT>/config`)
-   The **license** file *license.xml* (`<XLT>/config`)

Download and install the latest XLT version from the *Xceptance* website
as described above. You can have multiple XLT versions simultaneously
since the name of the unpacked installation folder includes the version
number by default.

Copy your backed-up files and directories to the corresponding place in
the new XLT installation directory.

New test suite settings are provided in the **default.properties** file
of the test suite *testsuite-template*. Copy it from
`<LatestXLTversion>/samples/testsuite-template/config` to the config
directory of your test suites `<YourTestSuite>/config`.

To update XLT Script Developer, go to *File \> Open File* in the Firefox
menu, and then open the latest `.xpi` file located at
`<LatestXLTversion>/tools`. Alternatively, drag the `.xpi` file and drop
it onto Firefox. If you work with Java-based test cases, add the updated
XLT libraries to the Java build path of the Eclipse project. See
[Importing the Posters Test Suite into Eclipse](07-posters.html) for
more information.

> Note that when you configure your test project to use a newer version
> of XLT, do not forget to update XLT on your load machines as well. The
> version you have used to develop your test scripts must match the
> executing version of your load test environment.

Uninstalling XLT
----------------

Before uninstalling XLT, make sure to back up all test results and test
reports you want to keep. To uninstall XLT, simply delete its
installation directory. Use the Firefox Add-on dialog to remove the
Script Developer Firefox extension.
