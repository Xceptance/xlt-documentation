---
title: "Glossary"
linkTitle: "Glossary"

weight: 200
type: docs

description: >
    An explanation of the most important terms and abbreviations used in XLT.
---

## Action (XLT)

An "Action" in the XLT programming model represents a single, enclosed step in a test case. Actions are blocks of code that can be reused in multiple test cases. An important action for testing a web search engine could be to enter a search phrase and then click the search button to display the results. An action can trigger one or more requests.

## Agent (XLT)

An agent simulates a number of virtual users repeatedly running specific test cases against the system under test.

## Agent Controller / Agentcontroller (XLT)

On every load generating system, at least one `agentcontroller` is running, which receives commands from the master controller and sends back test results. The agentcontrollers (often abbreviated as "AC" or "ACs") control local agent processes that generate the load.

{{% note title="Spelling" %}}
To better highlight that an `agentcontroller` is a shipped XLT component, we prefer the spelling `agentcontroller` over `agent controller`, but you might see both spellings used.
{{% /note %}}

## API

An "Application Programming Interface" is a programming interface
provided by a software system. It enables developers to use or extend
the available functionality of the software system with their own software
programs.

## Arithmetic Mean (also "Mean Value" or "Average")

The arithmetic mean can be calculated by dividing the sum of all values
by the number of values. When analyzing load test results (e.g., response
time), the arithmetic mean alone is not sufficient, as single, extremely
deviant values can overly influence it. For five
responses, an arithmetic mean of 5s could be the result of all requests
being answered in 5s. However, it could also be the result of one response time of
21s and four responses with a response time of 1s each. Therefore, also
other metrics like minimum value, maximum value, standard deviation
(root mean square), and median should also be considered.

## Arrival Rate

see [Constant Arrival Rate]({{< relref "#constant-arrival-rate" >}}).

## Bottleneck

A bottleneck is a hardware or software component that is so busy or
so inefficient that it is primarily responsible for the system's performance
limitations. Optimizing this component or providing it
with more resources will increase the performance of the complete system. No
bottleneck exists if all components are evenly busy and contribute to the
response behavior of the complete system.

## Capture & Replay Tool (also called "Capture & Playback Tool")

This category of testing records interactions with the
system under test that are manually performed by a tester. The recorded
interactions can be automatically replayed later. Capture & Replay
alone is often insufficient and, therefore, may exist as an
additional feature in a broader testing tool or be extendable with further
editor functionality. Recorded test cases often have to be manually extended
to create robust and reusable test cases.

Main problems with pure recorded test scripts are:

- Lack of dynamics - e.g., in an online shop, the same product pages are
    accessed repeatedly instead of selecting from a list randomly
    or crawling dynamically.
- Low robustness against changing test data - e.g., missing ability to
    react to a changing number of results for search phrases. For zero
    results, you might see the search form again; for just one result, you
    might see the result page immediately; for several results, a list to
    select from appears.
- Low robustness against changes in the system under test itself
- Collection of many small, independent test cases instead of one
    structured test suite. Missing reusability and difficult maintenance
- Often, insufficient validation of results

The XLT Script Developer was such an advanced Capture & Replay Tool,
featuring a broad range of additional functionality, but it was [discontinued]({{< relref "history#2017---script-developer-discontinued" >}}) when Mozilla removed the XUL application API from Firefox.

## Client

A client is a process in the client-server model that sends requests to
another process (server) to demand provided services. Clients of
a web server include browsers, search engine bots, or, when running an XLT load
test, virtual users with headless browsers.

## Concurrent Users

Concurrent Users are multiple real or simulated users, that are using the
system simultaneously during a load test. The terms "Parallel Sessions" or
"Parallel visits" are also used.

For web applications, the number of concurrent users is calculated as
follows: Each user sends single requests, gets a response, and then
waits for a certain time (think time) before sending the next request.
Nevertheless, the user counts as a concurrent user during this time. The
parallelism includes all users who started a visit on the website
(first request) and have not yet finished it, thus intending to send more
requests. It is not relevant whether a user's request is still
being processed or if the last response has already arrived and no new
request has been sent yet.

If real user scenarios include long think times between the
requests, a simulation with fewer virtual users but shorter
think times may be sufficient. The aim, in this case, is to simulate the same
number of parallel requests. Such a scenario is not fully equivalent to
a higher number of users with longer think times, but depending on the test's
aim, it can be sufficient in most cases.

## Constant Arrival Rate

Constant Arrival Rate is a type of simulated load where virtual
users start new visits at a constant rate, independent of the
system under test's current operating state. The number of parallel
visits depends on the response time behavior of the system under test.
Even if the system responds very slowly or not at all, new visitors will
arrive, hence sending requests to the system. In theory, the number of
parallel visits could rise indefinitely.

If the tested system can process the load, the system will engage at a
certain level of parallel visits. This state is reached if the number of
finished visits per time is the same as the number of requests for new
visits arriving at the server.

If the tested system cannot process the arriving requests fast enough,
the number of parallel users increases automatically. This type of
simulated load is close to real system behavior because, in real life,
the number of newly arriving visitors also does not depend on the server's
actual state or speed.

When using XLT, a cluster-wide constant arrival rate is simulated if the
property `com.xceptance.xlt.loadtests.default.arrivalRate` is set and no
iteration count is configured by the property
`com.xceptance.xlt.loadtests.default.iterations`. This property defines
the number of new visits per hour. The maximum number of parallel
virtual visitors is limited by the mandatory property
`com.xceptance.xlt.loadtests.default.users`, even for simulating
a constant arrival rate.

## Cookie

A cookie is a small piece of information, usually sent
with an HTTP/HTTPS response from a web server to a web browser,
and is then saved by the web browser. The web browser will add the
cookie to future requests sent to the same web server from which the cookie
originated. The web server can analyze the information inside the
cookie (e.g., to recognize a specific user). Cookies are transferred in the
HTTP header. A cookie contains at least a cookie name and data
(name-value pairs) that, in most cases, can only be interpreted by the web
server that created the cookie. Alternatively, cookies can also be
created and interpreted on the client-side with the help of JavaScript.

A Cookie can be transient or persistent. Transient cookies are stored in
the main memory of the browser process, so they exist only
during the web browser's runtime. In contrast, persistent cookies
are stored on the file system by the web browser. The web server that
creates the cookie can set a desired lifetime for it. Thus, the
cookie is still available even after restarting the browser or the
client computer.

## Development-Mode (XLT)

XLT test cases not run by a mastercontroller but directly by any JUnit test
runner as a JUnit test automatically run in development mode.
E.g., when running XLT test cases in Eclipse or as an ANT task. When using
development mode, additional property files are read. It is, therefore,
possible to redefine settings for local test runs during development
without changing the load test mode settings.

## DOM (Document Object Model)

The Document Object Model (DOM) is an API for accessing HTML and XML documents. It
is standardized by the W3C. Modern web browsers use the DOM as a
representation for websites and allow access to the DOM tree via
JavaScript. This enables reading and changing the content, structure, and
layout of a document. E.g., the display of a web page can be dynamically
modified in a web browser by using JavaScript to access the DOM.

## Efficiency

Efficiency is a quality measure according to ISO 9126. It describes the
performance of a software system in relation to the used resources. It
is divided into sub-characteristics: time behavior and resource
behavior. Time behavior describes response and processing time, as
well as throughput. Resource behavior describes the amount and
duration of needed resources.

## End-To-End Test

An end-to-end test evaluates a complete system from the perspective
of an end-user or a user demanding the service. Such a test
includes all components involved in providing the service.

To perform an automated end-to-end test or end-to-end monitoring,
test software simulates user behavior. A request passes
through the system from the client, through all intermediate layers to
all involved servers and backend systems, until the response finally
arrives at the client again (end-to-end). There, the response can be
verified (e.g., regarding availability, response time, and functional
correctness).

## Endurance Test

Endurance tests are load tests running continuously over a longer
period. Its purpose is to test the long-term stability, resource
requirements (e.g., memory leaks), and the response time behavior of the
system under test. The test period is often 12 hours to several days.
Often, a load of 30% below the maximum load determined in a stress test
is simulated during an endurance test. Endurance tests are also called
stability tests.

## Failover Test

A failover test checks high availability capabilities of an application.
To do so, single, redundantly designed system components are forced to break
down and restart during a load test. The correct system reaction
during this scenario (failover) can then be checked.

## Favicon

"Favicon" is an abbreviation for "Favorite Icon". It is a graphic in the
Windows icon format that can be displayed in the web browser's address
bar or next to a browser bookmark (also called a favorite). The favicon
file must be available in the root directory of the domain:
`http://www.mysite.com/favicon.ico`. It is also possible to define a
URI to the favicon file in the header of an HTML file:
`<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">`

Many browsers automatically request the favicon when the user
bookmarks a link from that domain. If the server cannot find the file, it
sends an HTTP code 404. Initially, the favicon was introduced by
Microsoft with an earlier version of Internet Explorer.

## Flash Cookie

See [Local Shared Object]({{< relref "#local-shared-object" >}}).

## Flow (XLT)

When creating XLT test cases sometimes you may want to reuse blocks of
code that contain more than a single action.  
For this purpose, you can create its own class with one method that
combines a sequence of several XLT actions as a so-called "flow".
Different test cases can call this method to reuse the flow. This can be
implemented if needed, but there is no explicit support available or
necessary in the XLT framework.

## Headless Browser

A headless browser is a web browser without a GUI component. In XLT,
virtual users use an embedded headless browser to load and interpret
HTML pages, build the DOM tree, execute JavaScript, etc. This is
the only way to simulate multiple parallel virtual users with independent
web browsers on operating systems that typically provide GUI resources
only once.

## Hit

An HTTP hit is an incoming request on the server side. Every single
requested file counts as one hit. Displaying one HTML page requires
several hits, often more than ten. The request for the HTML
file, as well as all requests for referenced CSS, JavaScript, or image
files, are hits. Failed requests on the server side are also hits. This is
why the hit count is not necessarily a measure of the number of visits
or requested web pages but also increases with the complexity of each
web page.

## HtmlUnit

HtmlUnit is a headless browser implemented in Java that is well-suited
to test web applications. The API can be used to request web pages, fill
in forms, click links, etc. JavaScript is also supported in HtmlUnit.
HtmlUnit can simulate Firefox or Internet Explorer. Typically,
HtmlUnit is used with testing frameworks like JUnit or TestNG. XLT also
uses HtmlUnit as a component of its virtual users.

## Image Loading

The term is often used for the automatic request and loading of images
and other multimedia resources by a web browser. An HTML file contains
no image files. To display images on a web page, the browser parses
the loaded HTML file and automatically requests for the embedded
image URLs to load and display the images. Image loading can also be
defined by CSS rules. In XLT, image loading can be configured with
the property  
`com.xceptance.xlt.css.download.images`. Sometimes, the term "image
loading" is also used for other static content like CSS or JavaScript.
See also [Static Content Loading]({{< relref "#static-content-loading" >}}).

## Initial Delay (XLT)

The initial delay is a time period at the beginning of a load test when
neither load is generated nor measurements are taken. It is a pure wait
time before any activities. This can be useful for fully automatically
started complex test runs (e.g., to ensure an also automatically
started system under test has reached stable operating conditions).

## Instrumentation

The term instrumentation refers to adding code to the tested
application for gathering runtime information about the system under
test. Examples include information about traversed code branches (code
coverage) or the frequency and duration of method calls (profiling).

## JUnit

JUnit is a framework for automated unit tests of Java applications. It
was originally developed by Kent Beck and Erich Gamma. Test cases
written in Java following JUnit conventions can be executed by any
JUnit test runner.

## Load Profile

A Load Profile is a description containing all relevant load parameters,
such as the number and type of virtual users, simulation of constant
arrival rate or steady load, a ramp-up period, think time, etc.

## Load Test

When performing a load test, the future use of the tested system is
simulated and assessed, considering a certain number of users and
transactions. This is done for two reasons. The first is to identify
functional failures that appear only under parallel and intense system
usage. The second is to measure time behavior and resource behavior
under a certain load. Values such as response time,
main memory usage, or processing performance are thereby determined.

Load tests can focus on different system aspects. Different load
profiles and test scenarios are necessary for the different aspects,
often named with a special term like "stress test," "endurance test," or
"scalability test." Load test is the generic term for all these
tests.

## Load Test Mode (XLT)

XLT works in load test mode if test cases are executed by the XLT
master controller and XLT agents. XLT auto-detects the mode
depending on the test driver used. Load test mode is mainly used for
load tests, hence the name. For test cases running in load test mode, the
additional property files for development mode are ignored.

## Local Shared Object

In the web development environment, a "Local Shared Object" is a file
that is stored on a user's local computer with the help of Adobe Flash
Player when the user visits a web page with relevant Flash content.
Therefore these files are also called "Flash cookies".

Local Shared Objects are used for the same purpose as HTTP cookies and
follow the same rules. They can only be read by the website that
initiated saving the Local Shared Object. Unlike HTTP cookies,
they are browser-independent. Local Shared Objects saved in one web
browser can be read by the Flash Player in another web browser and then
sent to the web server. Furthermore, Local Shared Objects can hold
significantly more data, and they do not have an expiration date. Saving Local
Shared Objects can currently be prevented by most web browsers.

## Master Controller / Mastercontroller (XLT)

The mastercontroller controls the entire load test. It deploys the
test suite to all agentcontrollers, calculates load distribution, and starts and
stops the test. At the end, the mastercontroller gathers
test results and stores them on the file system.

{{% note title="Spelling" %}}
To better highlight that a mastercontroller is a shipped XLT component, we prefer the spelling _mastercontroller_ over _master controller_, but you might see both spellings used.
{{% /note %}}

## Measurement Period (XLT)

The time period for taking measurements
(com.xceptance.xlt.loadtests.default.measurementPeriod). The measurement
period begins after the warm-up period.

## Median

The median is the value in the middle of a distribution of values. The
median halves the set of values as follows: Not more than half of the
values are greater than the median and not more than half of the values
are less than the median. To determine the median, all values are
sorted. For an uneven number of values, the median is the value in the
middle of the list. For an even number of values, the median is the mean
of the two values in the middle of the list. Compared to the
arithmetic mean, the median is significantly more robust against single deviating
values. Example: The median of five response times < 1s, 1s, 1s, 1s,
21s > is 1s. The arithmetic mean would be 5s.

## Memory Leak

A memory leak is a software fault where main
memory areas are not freed (de-allocated) after use. If such a fault
occurs repeatedly during runtime, the application's memory demand
will grow until insufficient free memory is available for further program execution,
ultimately leading to a software failure.

## Metrics

A metric is a measure used to quantify properties. Every metric is
based on a definite, reproducible measurement instruction. Examples of
metrics in the load test environment include the number of requests
reached per second, the mean response time in seconds, or CPU usage in %.

## Page Impression

See [Page View]({{< relref "#page-view" >}}).

## Page View

A page view is a complete load of one web page with all embedded
multimedia content, such as images, sounds, CSS, JavaScript, etc.
From the user's point of view, just one single URL is loaded by the
browser to display one single page. From a technical point of view, a
number of requests are sent to load the page and all its
content.

## Parallel Requests

Parallel requests are all requests sent but not yet completely responded to.
The number of parallel requests is often smaller than the number of
concurrent users. It can also be larger because one request sent by a
user to load a web page can automatically trigger several parallel requests
to load static content like images.

## Performance Test

The term "performance test" is not always used uniformly. It
often describes a test to check compliance with given load
requirements by simulating the defined load and comparing the system's
behavior with requirements regarding response time, throughput, etc.

The term "performance test" is also used if the test aims to find
bottlenecks without overloading the system. For that purpose, detailed
runtime monitoring information about all hardware and software
components is gathered and assessed.

Sometimes, the term is used interchangeably with the generic term "load
test".

## Percentiles

A percentile defines how many numbers (measurements) fall below or above a certain percentage of the data, and the maximum number in this data subset is taken as the resulting value. For instance, a P90 defines that out of 90% of all measurements (sorted ascending), the highest value within the first 90% of values is used as the result.

For instance, when we have the measurements:

```
50, 60, 65, 100, 500, 15, 60, 10, 1000, 100
```

we sort them first:

```
10, 15, 50, 60, 60, 65, 100, 100, 500, 1000
```

and read the value at 90%, in this case the 9th value. If we have 100 values, it would be the 90th value (to simplify). In this case, our P90 is 500. Our P50 would be 60, and so forth. The mean (average) is 196.

As you can see, the P90 value more precisely indicates a problem with 10% of the measurements, requests, or sessions, depending on the value you are examining.

## Property Files

Property files are text files in a defined format used to save
settings in the Java environment. These files contain one property per
line, each with a name and a value.

## QA

QA is an abbreviation for "Quality Assurance". It covers all actions and
methods to achieve and control a desired quality. Sometimes, the involved
organizational units are called QA (e.g., test teams).

## Ramp-Up Period (XLT)

The time period to automatically ramp up the number of virtual users to
100% (`com.xceptance.xlt.loadtests.default.rampUpPeriod`). It can be
used to simulate a slowly increasing load (e.g., to determine the maximum
processable load). This setting is independent of the warm-up period,
measurement period, and shutdown period. The ramp-up period starts after
the initial delay.

## Ramp-Up Step Size (XLT)

The ramp-up step size is the number of virtual users by which the load is automatically increased
with each step (`com.xceptance.xlt.loadtests.default.rampUpStepSize`).
The time between steps is calculated automatically by XLT. With the
last step, just before the ramp-up period times out, the configured number
of virtual users is reached.

## Regression Test

A regression test is the repeated execution of a test case regarding
requirements against already tested software to discover unwanted side
effects. Depending on the requirements, only a part of the test cases or
all previously executed test cases may be repeated.

## Request

A Request is an inquiry from a client to a server, mostly using the HTTP
or HTTPS protocol. Also see [Hit]({{< relref "#hit" >}}).

## Response

A Response is a server's answer to a client's request. For web
applications, the content delivered by the server can be HTML, CSS, or
JavaScript, but also images, videos, Flash, Silverlight applications, or
any file to download.

## Response Time

The time span between sending a request and getting the response. The
complete response time comprises several elements. This includes the
transfer of the request from the client to the server, a possible wait
time on the server-side until request processing, the processing time,
and the transfer of the response back to the client. When transferring
and processing a request, several intermediate stations (e.g., other
servers) can be involved. On the client-side, the time for interpreting and
displaying the response must be added. In a web browser, this could
include loading images and CSS, building the DOM tree, loading and interpreting
JavaScript, and rendering the final page for display. Because XLT uses a
headless browser, rendering is not required during a simulation by XLT.
Browser caching reduces response time when certain requests can be
answered directly from the browser cache without needing to be sent to
the server. When analyzing response time, you must carefully consider
which time components are included and which systems were involved in
transferring and processing the response.

## Saturation

The term Saturation is used if a resource or system is fully used to
capacity or is completely busy. If this state is reached, increased load
will not result in higher throughput.

## Scalability

Scalability describes how effectively an application can process
additional workload by using additional resources, without needing
further changes to the application.

Ideally, the processable workload of a scalable application increases
linearly with the amount of available resources. E.g., such an
application could respond to twice the number of requests per time by
doubling the available resources. This is called "linear scalability".
A necessary prerequisite for linear scalability is that all resources can
work at high capacity simultaneously.

In real life, synchronization, communication, and administration overhead
mean that added resources cannot be fully used by the application.
This results in "sub-linear scalability," where doubling
resources increases the processable workload by less than 100%.

## Scalability Test

A scalability test evaluates how a system's response behavior and
resource consumption change with increasing load. Ideally,
response time increases linearly with the load. In this operating range,
we talk about a "scaling system." In real-world systems, this ratio
worsens with increasing load. From a certain point, response time
increases disproportionately with increasing load. This is the
limit of scalability. The scalability test evaluates how much the load
can be increased for a given system until this point is reached.

Furthermore, the scalability test checks whether and how far this limit
can be pushed by adding additional hardware and software resources.
As long as the maximum processable workload increases approximately
linearly with the available components, we talk about a system "scaling
over the hardware and software."

## Scenario

See [Test scenario]({{< relref "#test-scenario" >}}).

## Server

A server is a system providing services that clients can use via
a defined interface. For web applications, that could be a web server or
application server taking requests from clients and delivering HTML
pages and other content as a response.

## Service Level Agreement (SLA)

A "Service Level Agreement" (SLA) is a binding agreement between a service
provider (contractor) and a service user (principal) regarding certain
performance characteristics (e.g., availability or maximum response time).

## Session

A session designates all activities related to one user during a visit
and their technical representation on the server-side. For dynamic web
applications beyond the simple display of static web content, all
requests sent to the server during a visit must be assigned to that
specific visit by the server. Due to the use of stateless protocols and a
lack of a unique ID available with every request, a web user can
only be recognized with the help of additional methods.

Therefore, the server generates a unique session ID for every
user when the first request from that user arrives. From
this point, the session ID is transferred with all requests
and responses between client and server. Depending on the application,
the server saves internal status with the session ID (e.g., the
basket of an online shop, login information, or the selected language for
multi-language sites).

The end of a session is often not clearly determinable because it is
unknown whether the user will send further requests. Therefore,
sessions are often finished on the server-side after a certain time
if no further request has arrived (session timeout). In this case, the
session data will be deleted or marked on the server-side. If a session ID
has been generated, but the user has not performed an action that uniquely
identifies them (Login), this is called an anonymous session.

## Session ID (SID)

A session ID is a unique identifier for visitors on a website. It is
used to identify multiple requests related to one user. A session ID
is generated when the user's first request is
processed by the server and is then sent back to the client
with the response. From this point, the session ID is
transferred with all requests and responses between client and server. The
session ID can be transferred via a cookie in the HTTP header, in the URL,
or as a hidden form parameter in POST data.

A session ID must be unique and very difficult to guess. Furthermore,
additional mechanisms should be used to prevent attackers from taking over
a foreign session.

## Shutdown Period (XLT)

The shutdown period is the time period at the end of a load test when
virtual users finish already started transactions, but no
measurements are made
(`com.xceptance.xlt.loadtests.default.shutdownPeriod`). The shutdown
period allows user transactions quitting cleanly after
measurements have been made. Transactions still running after the
shutdown period times out will be stopped abruptly.

## Simulated User

See [Virtual User]({{< relref "#virtual-user" >}}).

## Sizing-Test

The aim of a sizing test is to determine the necessary hardware and software
resources for specific load requirements. For this purpose, the limits of
several different hardware/software configurations are determined so
that later, you’ll have an approximation for the prospective hardware
and software resources for given load requirements.

## Standard Deviation

Standard Deviation is a measure of the deviation of all values. It
provides information about the mean distance of values from the
arithmetic mean. It is calculated as the square root of the data's
variance.

When assessing the deviation of measured values, the standard deviation
must always be considered in relation to the arithmetic mean. A
comparatively high standard deviation indicates a high variation in
values.

Values are called "normally distributed" if the distance from the
arithmetic mean does not exceed the standard deviation for 68% of the
measured values and, furthermore, if the distance from the arithmetic mean
does not exceed double the standard deviation for 95% of the measured
values.

If measurement values for a response time with an arithmetic mean of
5s and a standard deviation of 2 are normally distributed, then 68% of
all response times are in the range of 3s–7s, and 95% of all response
times are in the range of 1s–9s.

## Static Content Loading

Static Content Loading is the automatic loading of images, CSS,
JavaScript, and other static content by a web browser. An HTML file has
references to such files, which are loaded by the web browser with
the help of additional requests and can then be displayed or interpreted.

A test run without loading static content is used to test only the
application logic and dynamic web page generation, instead of
testing static content delivery, which is usually performed by other
system components. This saves resources on the server-side, in
the network, and on the client-side; therefore, a
higher number of virtual users can be simulated with fewer resources. Thus, the tested core
components can be stressed with a higher load.

XLT provides several properties to control loading static content (see
`com.xceptance.xlt.loadStaticContent`). Note: If the property
`com.xceptance.xlt.javaScriptEnabled` is set to `true`, all virtual users
will execute JavaScript code even if
`com.xceptance.xlt.loadStaticContent` is set to `false`.

## Steady Load

For this type of simulated load, a constant, precisely defined number of
virtual visitors is used. Each virtual user runs multiple transactions
(test cases) in succession. A virtual user can start a new transaction
only if the previous transaction is finished. In this case, even a
very long response time does not lead to a higher number of parallel
visitors.

This mode is not very close to real life but is advantageous for
controlled measurements because it minimizes high variability and
uncontrolled side effects. XLT simulates a steady load if the property
`com.xceptance.xlt.loadtests.default.arrivalRate` is not set.

## Stress Test

A stress test increases the simulated load beyond the limits of
expected normal operation until functional failures appear or the
system under test's response time exceeds defined limits.

For this purpose, a continuously increasing number of users is often
simulated. Stress tests are used to evaluate the system's behavior in
overload situations and afterward, to determine the maximum acceptable
load or find performance flaws (bottlenecks).

## Super Cookie

See [Local Shared Object]({{< relref "#local-shared-object" >}}).

## System Under Test (SUT)

The hardware and software of the tested system (e.g., the demo
application "Posters," distributed with XLT, installed on a
specific computer).

## Test Case (XLT)

Using XLT, a test case is a piece of code that implements a user
transaction and can be run with any JUnit test runner (Java test case classes).

## Test Scenario

A test scenario is a sequence of steps in the application under test
performed by real or virtual users. For example, these are use
cases like browsing or new user registration in an online shop.

Sometimes, the term is also used more broadly (e.g., to
describe a complete load profile with a mix of several virtual user
types).

## Test Suite (XLT)

A collection of test cases belonging together and intended to be performed at
once.

## Think Time

Think time is the time span between the arrival of a response sent from
the server to client and the next request sent to the server. From a server's
point of view, think time is an interruption of the user's action. A
real user, for example, needs time to read text on the requested web page,
click a link, or fill a form. When using XLT, separate values for
think time between actions and think time between transactions can be
configured. Furthermore, think times can vary randomly using XLT.

## Throughput

Throughput is a measure of the amount of requests or data that can be
processed or transferred in a defined time range. When running load
tests, this is, for example, the number of processed requests per time
range or the amount of data per time range transferred from the server
to virtual users.

## Transaction (XLT)

Execution of a certain test case that models a test scenario.

## User Scenario

See [Test Scenario]({{< relref "#test-scenario" >}}).

## Virtual User

A virtual user is a simulation of a real user (and their use of the
application) by a test tool. Virtual users should realistically
model all characteristics relevant to the test case.

A virtual user for a web application load test must simulate the
behavior of a real user and their web browser. That includes filling in a
form, sending HTTP requests, interpreting HTML pages, parallel loading of
static content, interpreting JavaScript, think time until the next
request, and performance-relevant characteristics like browser caching.

During a load test, a number of virtual users run in parallel and execute
test cases independently.

## Visit

A visit is a sequence of a user's page views on a website that are temporally
interrelated.

A visit to an online shop is comparable to a visit to a real world retail
shop. The user enters the shop (first request), possibly searches for some
products, views single products in detail, puts them into the shopping cart,
and eventually buys these products.

All requests sent to the server during one visit must be assigned to
that specific visit by the server. Therefore, the server generates a
unique session ID for every user when the first request from that
user arrives. From this point, the session ID is
transferred with all requests and responses between client and
server. Depending on the application, the server saves internal status
with the session ID (e.g., the basket of an online shop, login
information, or the selected language for multi-language sites).

The term "visit" is often used for statistical evaluations; in contrast,
the term "session" is often used in the technical environment. Both
terms are also often used synonymously.

From a technical point of view, there is no defined end to a visit
because it cannot be predicted whether the user will send a further
request. Therefore, a session is often finished on the server side after a
certain time if no further request has arrived (session timeout). In
this case, the session data will be deleted or marked on the server-side.
Depending on the web service, this timeout is often in the range of 30
minutes to 24 hours. The next request from the same user after the session has
timed out creates a new session (a new session ID) and is assigned
to a new visit.

This is why the last visit must be some time in the past for another
visit to be considered a new visit.

A visit has at least one page view but, in most cases, has several.
The most important measures are the duration of a visit, the number of page views,
and the time lag between page views (think time).

## Warm-Up Period (XLT)

The time period when load is already generated, but no measurements are
taken (see `com.xceptance.xlt.loadtests.default.warmUpPeriod`). This can
be used to configure a settling time when response time and other
measured values are not yet representative and, hence, should not be
considered in the load test results. The warm-up period starts directly
after the initial delay.

## Web Page

A web page is a single page that can be addressed by a URI (Unified
Resource Identifier) and has been created using a web technology
like HTML. A web page can be accessed with a web browser or
another suitable program and, in most cases, displayed on a screen.
Besides the original HTML file, today, further files like CSS, images,
and JavaScript for the page's presentation are loaded and processed by the
web browser.

## Website

A website is one complete, interrelated web presence. Generally, a
website designates all web pages and available services of a company or
organization.

## WebDriver API

The WebDriver API is a tool for automated testing of web applications. Either
real web browsers can be controlled, or web users can be simulated.
Google WebDriver features an easy and efficiently usable API. For the quick
creation of simple test cases, the XLT framework also provides usage
of the WebDriver API.

Therefore, external test cases using the WebDriver API can generally also
run in the XLT framework. The other way around, this is not true in all
cases because, in the XLT framework, the WebDriver API has been expanded by
the concept of action names. Test cases programmed in XLT using the
WebDriver API may need to be adapted to run with another
WebDriver-compatible test driver.

## XPath

XPath is an abbreviation for "XML Path Language". XPath is a query
language for addressing elements of an XML document. In XLT, XPath can be used
to address elements of a loaded HTML page.

## XPI

The file extension "XPI" (Cross-Platform Install) was developed by
the Mozilla Foundation. XPI files are ZIP-compressed installation files.
They contain installation scripts and other added files.

## XSL

The "Extensible Stylesheet Language" (XSL) is a set of transformation
languages for transforming or presenting XML
documents. Members of this language family are XSL-FO (XSL Formatting
Objects) for formatting instructions to export XML documents, XSLT (XSL
Transformations) for transforming XML documents into other XML
documents, and XPath for addressing elements inside an XML document.
