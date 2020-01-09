---
layout: manual
title: Load and Performance Testing
---

Load Models
-----------

A load model defines the attributes you may influence to reach a
specific load and performance behavior. XLT supports two load models:

-   a user count model and
-   an arrival rate model.

Both have different characteristics and use cases as illustrated below.

### User Count Model

The *user count model* is a static and non-feedback-based load model.

When you use it, the load is determined by the number of concurrent
users. When you configure a load of 10 users, for instance, XLT runs 10
threads repeatedly executing this scenario. At any given time during the
test, the target system has to handle 10 concurrent users, no more, no
less. The number of executions (transactions) that can be achieved
during a certain period of time depends on the time the target system
needs to respond.

This model is suited best for:

-   a simple base line test (single-user test) to assess the base
    performance of the system under almost no load,
-   a real load or performance test to assess the performance under a
    high but *predictable* load,
-   a test that should be easily repeatable and whose load is not
    influenced by the system under test.

### Arrival Rate Model

The *arrival rate model* is a feedback-based load model.

When you use it, the target number of transactions per hour determines
the load generation. For an arrival rate of 1,000 transactions per hour,
XLT runs the respective scenario 1,000 times, equally distributed across
a period of one hour. XLT uses as many concurrent users as necessary to
fulfill the given arrival rate but no more than specified. Thus, if the
time needed for a transaction is very short, only one user might
suffice; if a transaction takes longer, the number of concurrent users
will rise.

The number of concurrent users is not static and influenced by the
response time. If the response time temporarily increases, for example
due to a server-side background job, the user count may increase as
well. As soon as the response times improve, the number of concurrent
users will automatically decrease. This way, the generated load is
somewhat unpredictable, at least in terms of concurrency.

The relationship between response times and concurrent users can lead to
situations where more users cause more load and thus longer response
times. Even more users are now required to run, which eventually causes
the server to be overloaded. Even though this behavior appears pretty
aggressive, it’s more realistic. Compare it to a real-world situation
where a lot of people are waiting at the check-out counter at the end of
a store, but customers are still coming in because they don’t know that
people are waiting already. Or transferred to the online world: when you
visit an online presence, you won’t know the system behaves poorly until
you start acting.

> Even though the number of concurrent users is rather a result than an
> input value for this load model, XLT requires you to specify a user
> count. This number is used to impose an upper limit to the number of
> concurrent users, which may help you to restrict the total load on the
> system if you want to avoid a total overload resulting from the
> feedback loop.

The arrival rate load model is suited best if the load test is meant to
prove that a system is in fact able to handle a certain number of
transactions per hour. Since this is the primary purpose of load and
performance testing, this model is the best choice for most of your test
tasks.

Load Profiles
-------------

While the load model defines what you can modify to achieve a certain
load, the load profiles define how you apply these values over a period
of time. XLT supports three different load profiles:

-   static,
-   ramp-up, and
-   variable load.

See below for their detailed explanation.

### Static Load Profile

The load parameter remains unchanged during the test. This is the
simplest profile. Note that the target systems must be able to handle
the full load right from the beginning.

### Ramp-up Load Profile

The load parameter is steadily increased. This allows the target system
to warm up before the full load hits the system, for example to compile
and optimize code or to fill caches.

The ramp-up behavior of the load parameter can be controlled by the
following settings:

-   initial value: the load parameter value to start with,
-   target value: the final load parameter as soon as the ramp-up period
    has finished,
-   step size: the increment added to the load parameter after each
    ramp-up step,
-   ramp-up period: the length of the ramp-up phase,
-   steady period: the period to keep the current parameter value until
    the next ramp-up step

> The steady period and the ramp-up period settings are mutually
> exclusive.

Use the steady period if you want to keep the load at a certain level
for a defined time, no matter how long the total ramp-up phase will be.
Use the ramp-up period if you want to finish the ramp-up process after a
certain amount of time, no matter how long the resulting steady phases
will be.

If an arrival rate is defined, the ramp-up parameters will be applied to
the arrival rate. In case there’s no such definition, they will be
applied to the user count.

### Variable Load Profile

The variable load profile allows full control and lets you vary the load
parameter freely during the test. Thus, the load may not only be
constantly increased (compare ramp-up), but it can also be increased and
decreased at any time.

The variable profile comes in handy when you want to combine different
load levels within one test run, for example a test where phases with
regular load alternate with peaks of much higher load. You can also
imagine a test that models the load profile of a typical 24 hour day,
maybe squeezed into a shorter period of time for a faster test
turn-around.

To define how the load parameter should vary over time, you need to
specify a load function. You do so by defining a sequence of time/value
pairs, each denoting a point in time when the slope of the load function
changes. When you connect the dots by a straight line, the final shape
of the load function evolves.

Multiple time/value pairs can be specified by separating them using one
or more spaces, commas, semi-colons, or tab characters. The time part
can be given in all formats supported for [time periods](#time_period).

> Please do not use white-space characters (space or tab) to separate
> both, the sub-parts of the time part and the various time/value parts,
> as this leads to ambiguities and misunderstandings. In order to avoid
> such situations, we strongly recommend to use either commas or
> semi-colons to separate the time/value parts.

Imagine the following load function:

`0/10, 60m/10, 60m/20, 70m/5`

This sequence of time/value pairs defines a function that keeps the load
parameter constant at 10 for an hour, doubles it to 20 in an instant,
then immediately starts decreasing it to 5 throughout the next ten
minutes, and eventually keeps it at 5 for the remaining test.

`Load /\\  `
\|  
20 + \*  
\|   
\| \* \*  
\| \* \*  
10 + \*  
\| \*  
5 +   
\|  
<span class="underline">————————————~~+——~~</span>—————————————-\>  
0 60 70 Time

Note that the time/value pairs must be sorted by their time in ascending
order. You can also specify two pairs for a certain time span, which is
useful when you want the load parameter to change immediately. If no
pair is given for time 0, a pair “0/1” will be inserted automatically
(implicitly causing a ramp-up behavior). Finally, if the load test runs
longer than the last pair, the last known load parameter value will be
kept stable.

Load Factor
-----------

Quite often it is necessary to run tests not only at 100% of target
load, but also at lower levels (for dry runs or first tests) or higher
levels (for peak load tests). Since recalculating and adjusting the
respective load profiles is inconvenient and error-prone, XLT supports a
load factor. When taking advantage of it, you only need to configure the
target numbers (100% of load) once and can then easily scale the load up
or down as you like:

`\#\# scale the load up to 150% for TAuthor and down to 10% for`
all other scenarios  
com.xceptance.xlt.loadtests.TAuthor.loadFactor = 1.5  
com.xceptance.xlt.loadtests.default.loadFactor = 0.1

Note that the load factor is applied to both the configured number of
users and the arrival rate (if specified).

XLT also supports a variable load factor, a load factor that changes
over time. Simply specify a function instead of a simple value:

`\#\# scale the load up to 150% after one hour and down to 50%`
after two hours  
com.xceptance.xlt.loadtests.default.loadFactor = 0/1.0, 1h/1.0, 1h/1.5,
2h/1.5, 2h/0.5

Note that a variable load factor cannot be used together with variable
users (or arrival rate). Only one of them can be variable.

Load Test Phases
----------------

The execution of a test scenario during a load test can be divided into
different phases: the initial delay, the warm-up period, the measurement
period, and the shutdown period.

The *initial delay* is required only if you don’t want the test scenario
to run right from the beginning of the load test, which is useful if
this scenario depends on the results created by another test scenario.
The initial delay is optional.

To minimize discrepancies that could be caused by applications and other
systems starting up and not yet operating at an optimal level, you can
define a *warm-up period* as the time given before any measurements are
taken. The warm-up period is optional. Keep in mind that it creates a
period of time during which you don’t have any insights into your test.
It is recommended to omit a warm-up period and modify the report later
by specifying a time filter instead. This ensures that you don’t miss
any important information.

The test is measured during the *measurement period*. As suggested by
its name, this is the only time period where measurements are taken. The
measurement period is a required setting.

To ensure that a test scenario runs to completion even if the
measurement period is over, you can set a *shutdown period* throughout
which the users continue to run (without taking measurements though) and
try to orderly finish their current iteration. This comes in handy when
things need to be cleaned up at the end of the test scenario. As soon as
the last iteration is finished, the users automatically stop. If,
however, it’s still not finished at the end of the shutdown period, the
users will be forcibly terminated. The shutdown period is optional, but
note that if no shutdown period is defined, the users are terminated
right after the measurement period.

The ramp-up period (as defined above as part of the load profile) is
commonly put into the warm-up period to ensure the system under test is
working at an optimal level before any measurements are taken. That’s up
to you though - it might as well be interesting to measure the system
performance during the ramp-up phase. In that case, a warm-up period
mustn’t be defined.

The following figure displays the phases in relation to the total test
time:

![Load Test Profile Configuration](/images/user-manual/load-testprofile-configuration-small.jpg "Load Test Profile Configuration"):/images/user-manual/load-testprofile-configuration.png
<span class="caption">Load Test Phases</span>

Load Test Environment
---------------------

Typically, a distributed load generation environment is needed to
generate enough load. This requires a cluster of test machines. XLT has
to be installed on each of these machines:

![Load generation environment](/images/user-manual/load-generation-environment-small.jpg "Load generation environment"):/images/user-manual/load-generation-environment.png
<span class="caption">Load Generation Environment</span>

-   **Master controller**: The master controller can be seen as the
    “brain” of the load test environment. It deploys the test suite to
    all load machines, evenly distributes the load, and starts/stops the
    load test. A test cluster may only have one master controller.
-   **Agent controller**: Since the master controller doesn’t have
    direct access to the remote load machines, it needs the agent
    controller as counterpart on these machines. It acts on behalf of
    the master controller.
-   **Agent**: The agent is the component that actually executes the
    test suite against the system under test. It is started and stopped
    by the agent controller.

### Load Test Environment Configuration

Before you can start the load test, configure both the XLT load
generation environment and your test suite as outlined below.

These property files are used to configure the main components of the
XLT load generation runtime:

-   `<XLT>/config/agentcontroller.properties` - Agent Controller
    Configuration
-   `<XLT>/config/mastercontroller.properties` - Master Controller
    Configuration

### Agent Controller Configuration

Inside the agent controller configuration file, you can define these
properties:

#### Port Number

Port number the agent controller is listening on. Default is 8500. You
can pick any free port number, but make sure that the corresponding
master controller entry matches that number. Also ensure that the
firewall rules in place allow unrestricted communication. The used
protocol is HTTPS. If you want to run more than one agent controller per
machine, be aware that all controllers have to use different port
numbers.

`com.xceptance.xlt.agentcontroller.port = <portnumber>`

#### Key Store Credentials

The credentials your key store is encrypted with. You only need to
change this if your Java key store password has been modified from the
default.

`com.xceptance.xlt.agentcontroller.keystore.password =`
<password>  
com.xceptance.xlt.agentcontroller.keystore.key.password = <password>

#### Agent Controller Logging

The properties below serve to configure the agent controller logging
facility. They only affect the agent controller output and don’t alter
the logging of your test code. Most of the time, a modification is not
required here.

`log4j.rootLogger = info, console, file  `
log4j.appender.console = org.apache.log4j.ConsoleAppender  
log4j.appender.console.layout = org.apache.log4j.PatternLayout  
log4j.appender.console.layout.ConversionPattern =
\[d{HH:mm:ss,SSS}\]~~5p \[%t\]~~ %m%n

Also see [Apache Log4j API
Docs](http://logging.apache.org/log4j/1.2/apidocs/index.html) for more
information on log4j settings.

### Master Controller Configuration

Inside the master controller configuration file, you can define these
properties:

#### Test Suite Location

To determine the test suite you want to use for the load test, you need
to specify its location either as absolute path or relative to your XLT
installation. It is uploaded to the agent controllers from there.

`com.xceptance.xlt.mastercontroller.testSuitePath = <location>`

For example:

`com.xceptance.xlt.mastercontroller.testSuitePath =`
samples/testsuite-posters

> When running the load test on and from Windows, make sure to use the
> correct encoding for backslashes because the property file format uses
> backslashes to quote other special characters. Therefore, you have to
> quote the backslash with an additional backslash to ensure its
> original meaning, e.g. `c:\\test\\mysuite`.

#### Update Interval

Defines how often the master controller prints the status of the
currently running load test to the console:

`com.xceptance.xlt.mastercontroller.ui.status.updateInterval =`
<time in seconds>

#### Status Display

Whether or not to display detailed status information for each simulated
test user. If set to *false*, status information will be aggregated into
one line per user type. If you have many test users running, it can be
helpful to set it to false because you might get overwhelmed by the
amount of information presented otherwise. Being a display property, it
doesn’t change the data collection but the final data presentation.

`com.xceptance.xlt.mastercontroller.ui.status.detailedList =`
<true/false>

#### Agent Controllers

This property lists the locations of the agent controllers you want the
master controller to use:

`com.xceptance.xlt.mastercontroller.agentcontrollers.<id>.url =`
<url>  
com.xceptance.xlt.mastercontroller.agentcontrollers.<id>.weight =
<weight>

You can use any name for the `<id>` part of the property. It is
recommended to resort to name and number combinations, such as ac1 for
the first agent controller or blade01-02 for the second agent controller
on the first blade. Make sure the agent controller IDs differ from each
other because otherwise a later entry in the file will overwrite the
previous one.

To simultaneously use load machines of different power in a load
cluster, you may specify a “weight” for each agent controller (defaults
to 1 if not set). This value influences the automatic distribution of
virtual users across the load machines. A machine with a weight of 3
gets 3 times the load of a machine with a weight of 1.

`com.xceptance.xlt.mastercontroller.agentcontrollers.ac1.url =`
https://localhost:8500  
com.xceptance.xlt.mastercontroller.agentcontrollers.ac1.weight = 1  
com.xceptance.xlt.mastercontroller.agentcontrollers.ac2.url =
https://localhost:8501  
com.xceptance.xlt.mastercontroller.agentcontrollers.ac2.weight = 3

#### Master Controller Logging

You can set a different logging behavior for the master controller,
which helps to solve problems and provides information in case of
support inquiries:

`log4j.rootLogger = debug, file  `
log4j.appender.console = org.apache.log4j.ConsoleAppender  
log4j.appender.console.layout = org.apache.log4j.PatternLayout  
log4j.appender.console.layout.ConversionPattern =
\[d{HH:mm:ss,SSS}\]~~5p \[%t\]~~ %m%n

Test Suite Configuration
------------------------

The test suite itself is configured independently from the master
controller. All properties are read from the `<testsuite>/config`
directory. The sections below outline the settings relevant to load
testing. See [Test Suite and Framework
Configuration](05-framework-config.html) for details on all
configuration files and properties.

### Default Configuration - default.properties

#### Result Directory Location

Specifies the directory location where you want to store load test
results. Normally, there’s no need to change it.

`com.xceptance.xlt.result-dir = <directory path>`

#### Error Behavior

Specifies the framework behavior in case of an error, that is whether or
not the framework should abort a transaction if any of the following
occurs:

-   While loading a page - If an HTTP error occurred while loading a
    page.
-   Page resource unavailable - If an HTTP error occurred while loading
    a resource embedded in a page.
-   Java script error - If a JavaScript error occurred.
-   Agent termination in case of server errors - Maximum number of
    errors allowed before an agent terminates, which helps to
    automatically stop unobserved, long-running test cases in the event
    of severe error conditions, such as unavailability of the system
    under test. The number of errors specified here is the error count
    per running agent controller.

`com.xceptance.xlt.stopTestOnHttpErrors.page = <true/false>  `
com.xceptance.xlt.stopTestOnHttpErrors.embedded = <true/false>  
com.xceptance.xlt.stopTestOnJavaScriptErrors = <true/false>  
com.xceptance.xlt.maxErrors = <number of errors per agent controller>

#### Think Times

To specify the think time between two subsequent actions or
transactions, use the properties below. If a random think time is
needed, set the appropriate deviation to a value greater than 0. It
specifies the maximum deviation from think time in milliseconds. The
respective value is added to or subtracted from the think time using a
pseudo-random, uniform distribution.

`com.xceptance.xlt.thinktime.action = \<time in \[ms\]\>  `
com.xceptance.xlt.thinktime.action.deviation = \<time in \[ms\]\>  
com.xceptance.xlt.thinktime.transaction = \<time in \[ms\]\>  
com.xceptance.xlt.thinktime.transaction.deviation = \<time in \[ms\]\>

The think time configuration might look like this, for instance:

`com.xceptance.xlt.thinktime.action = 100  `
com.xceptance.xlt.thinktime.action.deviation = 50  
com.xceptance.xlt.thinktime.transaction = 0  
com.xceptance.xlt.thinktime.transaction.deviation = 0

This sets the action think times between 50 and 150ms and no transaction
think time whatsoever.

> Note that the deviation has to be smaller than the specified base
> think time.

### Test Project Configuration - project.properties

To configure your test project, edit the file `project.properties`.

#### Test Properties File

XLT permits to prepare and use multiple `test.properties` files for easy
maintenance of test setups. This facilitates switching between test
setups and prevents configuration errors. This property doesn’t allow
the use of a path-specific file name. The test definition files reside
in the same directory as the `project.properties` file.

`com.xceptance.xlt.testPropertiesFile = <filename>.properties`

#### Test Class Mapping

Specifies which test IDs should be used by XLT and, more specifically,
which test ID uses which test case implementation. That’s why you have
to specify the fully qualified class names of your tests here. Note that
you can map the same class to multiple load test names if needed. This
is extremely useful when you want to run the same test case in different
configurations.

`com.xceptance.xlt.loadtests.<name>.class =`
<fully qualified class name>

A test class mapping might look like this:

`com.xceptance.xlt.loadtests.TVisitor.class =`
com.xceptance.xlt.samples.tests.TVisitor  
com.xceptance.xlt.loadtests.TJSVisitor.class =
com.xceptance.xlt.samples.tests.TJSVisitor

#### Test Class-Specific Settings

You can define project-wide settings that are test case-specific but not
test run-specific by using the following syntax:

`<fully-qualified class name>.<property-name> = <value>`

For example:

`com.xceptance.xlt.samples.tests.shop-url =`
http://localhost:8080/posters/  
com.xceptance.xlt.samples.tests.TAuthor.username = username  
com.xceptance.xlt.samples.tests.TAuthor.password = password  
com.xceptance.xlt.samples.tests.webdriver.TAuthor.write-count = 2

### Load Test Profile Configuration - test.properties

Test run-specific settings - You can also configure an (optional)
property file containing the settings specific to a certain load test
run. You may define more than one test property file, such as
`test-target-load.properties` and `test-2x-target-load.properties`. This
way, many configurations can be defined and prepared in advance and used
as needed. You switch between these files by changing the property
`com.xceptance.xlt.testPropertiesFile` in the `project.properties` file.

Load test profile configurations are done inside your test property
file, which is named `test.properties` by default. Using the syntax
below, you can define test ID, the number of virtual users, and all
other load test-specific settings of tests meant to run in parallel
agents:

`com.xceptance.xlt.loadtests.<testID>.<setting> = <value>`

For `<testID>`, use any appropriate name. The following table lists all
supported values for `<setting>`; required settings are displayed in
bold face:

| Setting               | Description                                                                                             |
|-----------------------|---------------------------------------------------------------------------------------------------------|
| **class**             | Fully qualified class name of the test case (REQUIRED if not specified in project.properties)           |
| **users**             | Number of threads that run the test in parallel (REQUIRED), may be a load function                      |
| iterations            | Number of iterations per thread                                                                         |
| arrivalRate           | Number of transactions per hour, may be a load function                                                 |
| initialDelay          | Number of seconds to wait at the beginning                                                              |
| warmUpPeriod          | Number of seconds to run without performing measurements                                                |
| **measurementPeriod** | Number of seconds to perform measurements (REQUIRED)                                                    |
| shutdownPeriod        | Number of seconds to continue without performing measurements                                           |
| rampUpPeriod          | Number of seconds to steadily increase the configured load parameter                                    |
| rampUpStepSize        | Value to step-wise increase the configured load parameter during ramp-up                                |
| rampUpSteadyPeriod    | Number of seconds between ramp-up steps                                                                 |
| rampUpInitialValue    | Initial load when starting ramp-up                                                                      |
| loadFactor            | A factor to be applied to users (and arrivalRate if defined). Use this value to scale the load up/down. |

A sample load profile configuration is given below:

`com.xceptance.xlt.loadtests = TAuthor  `
com.xceptance.xlt.loadtests.TAuthor.users = 5  
com.xceptance.xlt.loadtests.TAuthor.iterations = 100  
com.xceptance.xlt.loadtests.TAuthor.arrivalRate = 3600  
com.xceptance.xlt.loadtests.TAuthor.initialDelay = 0  
com.xceptance.xlt.loadtests.TAuthor.warmUpPeriod = 30s  
com.xceptance.xlt.loadtests.TAuthor.measurementPeriod = 10m 0s

All time period values can be specified in one of the following formats
(without quotes):

-   total number of seconds: ‘1234s’ or ‘1234’
-   natural style: ‘0h 12m 0s’, ‘0h 12m’, ‘12m 0s’, or ‘12m’
-   digit style: ‘1:23’, ‘01:23’, ‘0:1:23’, or ‘0:01:23’

If you want to run several test cases simultaneously, specify the test
case names as value for the property `com.xceptance.xlt.loadtests` in
form of a space-separated list:

`com.xceptance.xlt.loadtests = TAuthor TVisitor TCrawler  `
com.xceptance.xlt.loadtests.TAuthor.users = 5  
com.xceptance.xlt.loadtests.TVisitor.users = 3  
com.xceptance.xlt.loadtests.TCrawler.users = 4

#### Sample Configurations

*User Count Model With Constant Load Profile*

`com.xceptance.xlt.loadtests.TAuthor.users = 5`

Runs exactly 5 users right from the beginning.

*User Count Model With Ramp-Up Load Profile*

`com.xceptance.xlt.loadtests.TAuthor.users = 50  `
com.xceptance.xlt.loadtests.TAuthor.rampUpInitialValue = 10  
com.xceptance.xlt.loadtests.TAuthor.rampUpPeriod = 5m

Runs exactly 50 users, but ramps up the user count from 10 to 50 over a
period of 5 minutes.

*User Count Model With Variable Load Profile*

`com.xceptance.xlt.loadtests.TAuthor.users = 0/5, 1h/50, 2h/50,`
2h/100, 3h/20

Runs the TAuthor scenario with a variable number of concurrent users
(5&nbsp;→ 50&nbsp;→ 100&nbsp;→ 20).

*Arrival Rate Model With Constant Load Profile*

`com.xceptance.xlt.loadtests.TAuthor.users = 5  `
com.xceptance.xlt.loadtests.TAuthor.arrivalRate = 100

Runs the TAuthor scenario exactly 100 times per hour with at most 5
concurrent users.

*Arrival Rate Model With Ramp-Up Load Profile*

`com.xceptance.xlt.loadtests.TAuthor.users = 5  `
com.xceptance.xlt.loadtests.TAuthor.arrivalRate = 100  
com.xceptance.xlt.loadtests.TAuthor.rampUpInitialValue = 50  
com.xceptance.xlt.loadtests.TAuthor.rampUpSteadyPeriod = 1m  
com.xceptance.xlt.loadtests.TAuthor.rampUpStepSize = 10

Runs the TAuthor scenario exactly 100 times per hour with at most 5
concurrent users, but starts with an arrival rate of 50 per hour and
increases it by 10 every minute until the target level of 100 is
reached.

*Arrival Rate Model With Variable Load Profile*

`com.xceptance.xlt.loadtests.TAuthor.users = 5  `
com.xceptance.xlt.loadtests.TAuthor.arrivalRate = 0/50, 1h/100, 2h/200,
3h/150

Runs the TAuthor scenario with a variable arrival rate
(50&nbsp;→ 100&nbsp;→ 200&nbsp;→ 150) and with at most 5 concurrent
users.

*Arrival Rate Model With Ramp-Up Load Profile and Load Factor*

`com.xceptance.xlt.loadtests.TAuthor.users = 5  `
com.xceptance.xlt.loadtests.TAuthor.arrivalRate = 100  
com.xceptance.xlt.loadtests.TAuthor.rampUpPeriod = 5m  
com.xceptance.xlt.loadtests.TAuthor.loadFactor = 2.4

Runs the TAuthor scenario exactly 240 times per hour with at most 12
concurrent users, but ramps up the arrival rate from 1/h to 240/h over a
period of 5 minutes.

### Other Settings

In case you want to modify the behavior of the logging facility of the
load test agents, the test suite configuration directory contains a file
named `log4j.properties` that can be changed to satisfy your needs.

To launch the JVM that runs the agent with additional parameters,
specify them in the `jvmargs.cfg` file.

Run the Load Test
-----------------

Running load tests consists of two steps:

1.  running the agent controllers and
2.  running the master controller.

### Running the Agent Controllers

To start the agent controllers, open a command line window/console and
type the following command sequence:

bc(bash).. cd <XLT>/bin  
./agentcontroller.sh

> Windows users have to use the appropriate `.cmd` file located in the
> same directory.

The agent controller starts up and listens on the specified port. The
output looks like this:

bc(dos).. - Using “C:\\Users\\AppData\\Local\\Temp\\vfs\_cache” as
temporary files store.

\- Logging to org.slf4j.impl.Log4jLoggerAdapter(org.mortbay.log) via
org.mortbay.log.Slf4jLog

\- jetty-6.1.19  
- Started SslSocketConnector@0.0.0.0:8500

### Running the Master Controller

> Before starting the master controller, make sure all agent controllers
> are running on all respective load test machines. The master
> controller cannot be started if the agent controllers aren’t running.
> Also check that the test suite has been compiled successfully to avoid
> errors when uploading it.

You can start the master controller in one of the following modes:

-   **Interactive mode**: typical sequence of steps to be executed to
    run a load test
-   **Auto mode**: load test is started automatically, without user
    interaction
-   **Embedded mode**: running a load test where master controller and
    agent controller run inside the same JVM

#### Interactive Mode

To start the master controller in interactive mode, use this command
line:

bc(bash).. cd <XLT>/bin  
./mastercontroller.sh

> Windows users have to use the appropriate `.cmd` file located in the
> same directory.

A screen appears that displays the command line menu as below:

bc(bash).. Xceptance LoadTest 4.2.0  
Copyright © 2005-2012 Xceptance Software Technologies GmbH. All rights
reserved.  
Basic License (5 virtual users). This license does not expire.

\(u) Upload test suite  
(s) Start agents  
(a) Abort agents  
® Show agent status  
(d) Download test results  
© Create load test report  
(q) Quit  
=\>

The following options are offered:

-   **Upload agent files (u)**: Choose this option to upload your test
    suite (code, data, and configuration) to all configured agent
    controllers. This is required at the very beginning and each time
    you’ve modified your test suite. XLT will only upload files that
    have been changed to speed up testing.

<!-- -->

-   **Start agents (s)**: All agent controllers will receive a start
    command to spin off an agent executing its configured tests. This
    effectively starts the load test.

<!-- -->

-   **Abort agents (a)**: Choose this option to immediately terminate
    any running load agent.

<!-- -->

-   **Show agent report (r)**: The current status of the load agents can
    be monitored by choosing this option. Depending on the
    configuration, either a short summary (per test case) or a detailed
    list (per test user) is shown. In either case you get information
    about:
    -   test case name on which you are running the load test,
    -   how many users are running,
    -   how often a test case has been executed so far,
    -   how long it took on average to execute the test case,
    -   how many events and errors occurred, and
    -   the overall progress.

<!-- -->

-   **Download test results (d)**: Each load agent writes log files and
    runtime data files. Choose this option to download this data from
    all configured agent controllers. After entering the *d* command, a
    menu appears where you can choose the amount of data to download.
    Press 1, 2 or 3 here. The files are saved to a newly created
    directory at the location specified in `default.properties`. By
    default, the result directory is set to `<XLT>/results`. The name of
    the new directory is given by the current date and time, for
    example: `20110501-161718`.

<!-- -->

-   **Create report (c)**: Generates a load test report of the last
    downloaded test results.

<!-- -->

-   **Quit (q)**: Shuts down the master controller and closes its
    connections to the agent controllers. Note that this will *not* stop
    any running load test. The load agents continue to execute the load
    test until they have finished. To regain control, reconnect to the
    test cluster by restarting the master controller.

As soon as you’ve chosen an option (by pressing the associated key
followed by <kbd>Enter</kbd>), the appropriate action is executed.
Afterwards, you immediately return to the menu (unless you’ve chosen to
quit, of course).

A typical usage scenario for a load test is reflected by the order of
the master controller menu items and might look like this:

1.  Upload the test suite (using (u) shortcut)
2.  Start the agents (using (s) shortcut)
3.  Check the agent status regularly (using (r) shortcut)
4.  Download the test results as soon as the test has finished
    (using (d) shortcut)
5.  Create a report of the downloaded results (using (c) shortcut)
6.  Quit the master controller (using (q) shortcut)

#### Auto Mode

As outlined in the previous sections, there is a typical sequence of
steps to be executed when running a load test. It may quickly become
tedious and error-prone to type the necessary keys over and over again.
To avoid this repetition, XLT provides another operating mode: the
*auto* mode. In this mode, all the steps mentioned above are executed
automatically, without any user interaction. To start XLT in this
operating mode, use the following command line:

Unix-based systems:

bc(bash).. cd <XLT>/bin  
./mastercontroller.sh -auto

Windows:

bc(dos).. cd <XLT>\\bin  
mastercontroller.cmd -auto

If the test suite files were uploaded and the load agents started
successfully, XLT automatically refreshes the agent status on a regular
basis. As soon as the test has finished, the test results are downloaded
and XLT quits.

If the command is followed by the option `-report`, a load test and
performance report will be automatically generated after the test has
finished and the results have been downloaded.

bc(dos).. cd <XLT>\\bin  
mastercontroller.cmd -auto -report

See below for what the screen displays in *auto* mode:

bc(bash).. Xceptance LoadTest 4.2.0  
Copyright © 2005-2012 Xceptance Software Technologies GmbH. All rights
reserved.  
Basic License (5 virtual users). This license does not expire.

Uploading test suite …  
0% … 10% … 20% … 30% … 40% … 50% … 60% … 70% … 80% … 100% - OK

Starting agents …  
0% … 100% - OK

Test Case State Running Users Iterations Last Time Avg. Time Total Time
Events Errors Progress  
——————- ———— ———————— ————— ————- ————- ————— ————- ——— ————  
TAddToCart\_lw Running 10 of 10 0 0,00 s 0,00 s 0:00:00 0 0 0%  
TAddToCart Running 10 of 10 0 0,00 s 0,00 s 0:00:00 0 0 0%  
TCreateUser Running 10 of 10 1 0,72 s 0,72 s 0:00:01 0 0 0%

Test Case State Running Users Iterations Last Time Avg. Time Total Time
Events Errors Progress  
——————- ———— ———————— ————— ————- ————- ————— ————- ——— ————  
TAddToCart\_lw Running 10 of 10 72 0,67 s 0,77 s 0:00:06 0 2 5%  
TAddToCart Running 10 of 10 55 0,70 s 1,03 s 0:00:06 0 0 5%  
TCreateUser Running 10 of 10 83 0,95 s 0,67 s 0:00:06 0 17 5%

.  
.  
.

Test Case State Running Users Iterations Last Time Avg. Time Total Time
Events Errors Progress  
——————- ———— ———————— ————— ————- ————- ————— ————- ——— ————  
TAddToCart\_lw Running 10 of 10 1.472 0,69 s 0,66 s 0:01:37 17 65 96%  
TAddToCart Running 10 of 10 1.412 0,66 s 0,68 s 0:01:37 0 0 96%  
TCreateUser Running 10 of 10 1.525 0,91 s 0,63 s 0:01:37 0 316 96%

Test Case State Running Users Iterations Last Time Avg. Time Total Time
Events Errors Progress  
——————- ———— ———————— ————— ————- ————- ————— ————- ——— ————  
TAddToCart\_lw Finished 0 of 10 1.533 1,16 s 0,65 s 0:01:41 17 65 100%  
TAddToCart Finished 0 of 10 1.476 1,17 s 0,68 s 0:01:40 0 0 100%  
TCreateUser Finished 0 of 10 1.590 0,79 s 0,63 s 0:01:41 0 325 100%

Downloading test results … (Please be patient, this might take a
while)  
0% … 30% … 60% … 100% - OK

To abort the test prematurely, press <kbd>Ctrl</kbd>+<kbd>C</kbd> to
terminate the master controller. This terminates all running agents as
well and triggers the download of all test results generated so far.
Note that it’s therefore impossible to disconnect the master controller
from the test cluster while keeping the load test running.

> For long-running load tests, it is recommended to run the test without
> the `-auto` option because this allows a disconnect from the test and
> inhibits accidental test termination.

#### Embedded Mode

Both interactive mode and auto mode can be combined with the command
line option `-embedded`. It starts the master controller together with
an internal agent controller.

This is useful if you want to run load tests without a distributed load
test environment, but run just one agent controller together with the
master controller on the same machine. There’s no need to manually start
an agent controller before you run the load test, which facilitates the
handling of automated load tests started from within a build process.
This option is also recommended when playing around with the [posters
demo](07-posters.html) for training purposes because it simplifies the
process of running a load test.

> When you use the `-embedded` option, the local agent controller
> settings will override the set of agent controllers configured in
> `mastercontroller.properies`.
