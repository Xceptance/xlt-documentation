---
layout: manual
title: XLT Framework Configuration
---

Introduction
------------

> When solely using Script Developer for recording/writing and replaying
> script test cases, the following section doesn’t apply. Yet a
> configuration of the test suite and framework by changing properties
> files may be necessary if you write or run test cases from inside
> Eclipse as JUnit tests or if you want to perform load tests.

To configure the test environment and the test suite, XLT uses [Java
properties files](http://en.wikipedia.org/wiki/.properties). The basic
characteristics and syntax of this format are also valid for the XLT
properties files.

When reading the properties, XLT distinguishes between *load test mode*
and *development mode*. As its name implies, the *load test mode* is
active when test cases are executed as load tests by the XLT master
controller/agent controller. When test cases are executed as JUnit tests
in Eclipse or any other JUnit test runner, they run in *development
mode*. Even though the *development mode* is mainly used for test case
development, it will also be active if your test suite is meant to
perform an automated functional test manually triggered from time to
time or integrated in a build process.

XLT makes use of a hierarchical file system so that properties can be
distributed to several files with different priorities. Properties from
different files complement each other. Furthermore, properties from a
file with higher priority can overwrite identical properties from a file
with lower priority. This mechanism allows general default values to be
specialized for different test run scenarios or projects. It’s also
possible to prepare several configurations in different files and
activate one of these configurations by switching between the files.

All properties are read from the `<testsuite>/config/` directory. The
existing properties files are listed below, sorted by priority from
lowest to highest. See the following sections for details.

-   **default.properties**: default configuration of the XLT test
    framework
-   **project.properties**: configuration of your test project
-   **test.properties**: configuration of a specific load test profile
-   **dev.properties**: properties only read in development mode
-   **dev-log4j.properties**: log4j logger settings used in development
    mode
-   **log4j.properties**: log4j logger settings used in load test mode
-   **jvmargs.cfg**: JVM setting for the agents and therefore only used
    in load test mode

Default Framework Configuration
-------------------------------

The properties in `default.properties` represent the general XLT
framework settings that are all set to their respective default value.
They are neither specific for a single test project nor for a single
test run.

If you need to change one of these properties, copy it to the
`project.properties` or `test.properties` and change the value there to
overwrite the value in `default.properties`. Each of the properties in
`default.properties` can be overridden since they have the lowest
priority.

When updating XLT to a newer version, it is recommended you update the
`default.properties` file as well because newly available properties can
be found there, along with their default value and description.  
Even though this file isn’t read-only, it should be treated as such. You
can use it as documentation of available XLT framework properties that
also defines the default values for these properties.

The properties listed in `default.properties` are separated into the
following groups (look into the file itself for details):

-   HTTP/Protocol Settings
-   Browser Emulation Settings
-   JavaScript Settings
-   CSS Settings
-   Test Data Management Settings
-   Result Settings
-   Test Execution Settings
-   Script Engine Settings
-   Miscellaneous Settings

Test Project Configuration
--------------------------

The file `project.properties` contains project-specific settings. The
first and most important property is the reference to `test.properties`
that should be applied (e.g.
`com.xceptance.xlt.testPropertiesFile = test-1.properties`). Changing
the value for this property, you can easily switch between different
load test profiles configurations.

By default, the file stores the test case mapping that maps the test
case class onto a load test name. The load test name will be referenced
later in the load test configuration.

It’s also the best place for all your test case-specific custom
properties, such as URLs, credentials, search phrases, or any other data
you want to extract from your test cases as properties. See [Demo test
suite posters](07-posters.html) for examples on how to use properties in
test cases.

Load Test Profile Configuration
-------------------------------

The settings required to configure a particular load test profile are
collected in a separate file. See [Load tests](08-loadtest.html) or the
properties file itself for details of available load test settings.

The default name of this file is `test.properties`. However, it’s
variable and several files with different load test profile
configurations may exist. The one file applied for a test run is
referenced by a property in `project.properties` mentioned above.

Development Environment Configuration
-------------------------------------

The file `dev.properties` contains development mode settings. Use this
file to modify the configuration so that it suits your needs during test
case development, that is when you create and debug test cases from
within your IDE.

It’s read in development mode only, but not during load testing. For
development mode, the values in this file have highest priority. Any
setting defined here will overwrite the corresponding setting from the
other properties files: “default.properties”, “project.properties”, and
the test run-specific properties file, e.g. “test.properties”.

A typical example for differing development settings is
`com.xceptance.xlt.loadStaticContent = true` to enable loading images
and other static content in development mode for debugging. The default
value ( `=false` ) for this property is switching off loading static
content to save resources during load testing.

If the default values suffice as development settings for your test
suite, `dev.properties` can also be empty.

Including Additional Property Files
-----------------------------------

When dealing with different test environments, different load profiles,
and/or different test data at the same time, managing different
combinations of configuration settings can be challenging. To make this
easier and less error-prone, properties can be included as a set. This
allows to:

-   predefine the configuration of certain aspects with certain values
    in separate files, and
-   reuse and combine the predefined settings as needed with a single
    statement.

To this end, the files `default.properties`, `project.properties`,
`test.properties` (no matter if it’s been renamed using
`com.xceptance.xlt.testPropertiesFile`), and `dev.properties` can
include further property files. Each of these additional property files
has to be placed either directly in the `config` folder or in one of its
sub-directories. Furthermore, the name of all these files must end with
`.properties`. Any included file may also define includes itself.

### How to Include Other Properties Files

You can include another property file by adding the special *include*
property

`com.xceptance.xlt.propertiesInclude.<index> =`
<relativePathToPropFile>

where `<index>` denotes an integer number. The value of the include
property is the relative path to the file to include, starting from the
directory in which the current file is located. You can also include all
properties files in a certain directory at once by specifying the
relative path to that directory:

`com.xceptance.xlt.propertiesInclude.<index> =`
<relativePathToDir>

In both cases, the relative path may also go upwards using “..” as long
as you don’t leave the `config` directory of the test suite.

Include properties are treated like normal properties. Thus, if there
are two include properties having an identical index, only one of them
will be applied.

### Processing Order of (Included) Property Files

`default.properties`, `project.properties`, `test.properties`, and
`dev.properties` form a hierarchy. So the processing order is as
follows:

1.  `default.properties`, followed by its includes
2.  `project.properties`, followed by its includes
3.  `test.properties` (or any other test-run-specific properties file),
    followed by its includes
4.  `dev.properties`, followed by its includes (in development mode
    only)

Includes will be resolved according to these rules:

-   Each property include will be processed recursively in depth-first
    mode.
-   If the include target is a directory, the properties files contained
    in that directory are processed in alphabetical order.
-   If there’s more than one property include in a file, they will be
    processed in ascending order sorted by their index.

During that process, properties read in later will overwrite already
existing settings.

### Example

Assume the system under test is deployed to different environments, such
as *development*, *live*, and *pre-live*. Each environment requires a
different host in the start URL and different access credentials.
Furthermore, different load profiles are required for certain types of
load tests. Now assume the following directory layout in the test suite:

`—+ <testsuite>  `
\|—- classes  
\|—+ config  
\| \|—- data  
\| \|—- effectiveSettings  
\| \|—+ environments  
\| \| \|—- development.properties  
\| \| \|—- live.properties  
\| \| \|—- pre-live.properties  
\| \| \`—- test.properties  
\| \|—+ loadProfiles  
\| \| \|—- smallLoad.properties  
\| \| \|—- halfLoad.properties  
\| \| \`—- fullLoad.properties  
\| \|—- default.properties  
\| \|—- project.properties  
\| \`—- test.properties  
\|—- lib  
\|—- results  
\|—- scripts  
\`—- src

As you can see, the load tester has prepared a property set for each
environment and each load profile under the `config` directory. With
these predefined property files, you can easily mix and match the
environments and the load profiles as needed. For example, add/modify
the following lines to your `test.properties` to apply the full target
load to the pre-live environment:

bc(ini).. com.xceptance.xlt.propertiesInclude.1 =
environments/pre-live.properties  
com.xceptance.xlt.propertiesInclude.2 = loadProfiles/fullLoad.properties

Alternatively, you may also define a certain directory to be always
included:

`com.xceptance.xlt.propertiesInclude.1 = effectiveSettings`

To apply a certain combination of settings, simply empty this directory
first and copy the respective predefined property files to this
directory (`pre-live.properties` and `fullLoad.properties`, for
example).

Additional Configuration Files
------------------------------

In addition to the files described above, you can find three other files
in `<testsuite>/config/`:

-   **dev-log4j.properties**: log4j logger settings used in development
    mode
-   **log4j.properties**: log4j logger settings used in load test mode
-   **jvmargs.cfg**: JVM settings for the agents and therefore only used
    in load test mode, e.g. settings for Java garbage collector tuning

Also see [Apache Log4j API
Docs](http://logging.apache.org/log4j/1.2/apidocs/index.html) for more
information on log4j settings.

Property Replacements
---------------------

In all XLT properties files, you can work with property replacements
based on a **${}** syntax. You can define a property and then assign a
value to another property by referring to the first property.

This is especially convenient for `project.properties` where properties
are often defined for each test case to gain flexibility, but where, for
example, the login data is identical for all test cases by default.

bc(ini).. username = MyUsername  
password = MySecretPassword  
com.xceptance.xlt.samples.tests.TSearch.username = ${username}  
com.xceptance.xlt.samples.tests.TSearch.password = ${password}  
com.xceptance.xlt.samples.tests.webdriver.TSearch.username =
${username}  
com.xceptance.xlt.samples.tests.webdriver.TSearch.password = ${password}

Resolving Property Keys
-----------------------

When a test case reads a certain setting from the configuration – let’s
say userName - the framework uses a fallback strategy when running the
property look-up. The strategy performs also a look-up step, based on
the transaction name (the short name to which the full class name is
mapped).

bc(ini).. TMyTestCase.userName = john \# property name qualified by
transaction name  
com.company.tests.TMyTestCase.userName = john \# property name qualified
by full test class name  
userName = john \# plain property name

This lets you parameterize different transactions differently, even if
they are mapped to the same class and therefore share the same code. The
look-up will take place in this order, from a very narrow scope (the
transaction) to a wide scope (a general property).

> Note that this will work for load tests only since mapped transaction
> names are not available outside the load test environment (Eclipse,
> Ant, etc.).
