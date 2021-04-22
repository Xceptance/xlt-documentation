---
title: "Glossary"

linkTitle: "Glossary"

weight: 200
type: docs

description: >
    Most important terms and abbreviations explained.
---

## Action (XLT)

An “Action” in the XLT programming model represents a single, enclosed
step in a test case. Actions are blocks of code that can be reused in
several test cases. An important action for testing a web search engine
could be to enter a search phrase and then click the search button to
list the results. An action can trigger one or more requests.

## Agent (XLT)

An agent simulates a number of virtual users repeatedly running certain
test cases against the system under test.

## Agent Controller / Agentcontroller (XLT)

On every load generating system there is at least one `agentcontroller`
running which receives command from the master controller and sends back
test results. The agentcontrollers (we often use the abbreviation "AC"/"ACs") 
control local agent processes generating the load.

{{% note title="Spelling" %}}
To be better highlight that an `agentcontroller` is a shipped XLT component, we prefer the spelling agentcontroller over agent controller but you might see both spellings used.
{{% /note %}}

## API

An “Application Programming Interface” is a programming interface
provided by a software system. It enables developers to use or extend
the available functionality of the software system by own software
programs.

## Arithmetic Mean (also “Mean Value” or “Average”)

The arithmetic mean can be calculated by dividing the sum of all values
by the number of values. When analyzing load test results, e.g. response
time, the arithmetic mean alone is not sufficient as single extremely
deviant values can influence the arithmetic mean too much. For five
responses an arithmetic mean of 5s could be the result of all request
answered in 5s. But it could also be the result of one response time of
21s and four responses with a response time of 1s each. Therefore also
other metrics like minimum value, maximum value, standard deviation
(root mean square) and median should be considered.

## Arrival Rate

see [Constant Arrival Rate](#constant-arrival-rate).

## Bottleneck

P: A bottleneck is a hardware or software component that is so busy or
so inefficient that it is mainly responsible for the systems limitation
in performance. Optimizing this component or providing this component
with more power will increase the performance of the complete system. No
bottleneck exists if all components are evenly busy and have a share in
response behavior of the complete system.

## Capture & Replay Tool (also called “Capture & Playback Tool”)

This is a category of testing that is recording interactions with the
system under test manually performed by a tester. The recorded
interactions can be replayed automatically later on. Capture & Replay
alone is not sufficient in most cases and therefore existing as an
additional tool in a broad testing tool or it can be extended by further
editor functionality. Recorded test cases often have to be extended
manually to get robust and reusable test cases.

Main problems with pure recorded test scripts are:

-   Lack of dynamic - e.g. in an online shop the same product pages a
    accessed again and again instead of selecting from a list randomly
    or crawling dynamically.
-   Low robustness against changing test data - e.g. missing ability to
    react to changing number of results for search phrases; for zero
    results you might see the search form again, for just one result you
    might see the result page immediately, for several results a list to
    select from appears.
-   Low robustness against changes in the system under test itself
-   Collection of many small, independent test cases instead of one
    structured test suite. Missing reusability and difficult maintenance
-   Often insufficient validation of results

The XLT Script Developer was such an advanced Capture & Replay Tool, 
featuring a broad range of additional functionality, but it was [discontinued](../../about-xlt/10-history/#2017---script-developer-discontinued) when Mozilla 
removed the XUL-application API from Firefox.

## Client

A client is a process in the client-server-model that sends requests to
another process (server) to make demand on provided services. Clients of
a web server are browsers, search engine bots or, when running an XLT load
test, the virtual users with the headless browsers.

## Concurrent Users

Concurrent Users are several real or simulated users, which are using the 
system at the same time during a load test. The terms “Parallel Sessions” or
“Parallel visits” are also used.

For web applications the number of concurrent users calculates as
follows: Each user sends single requests, gets a response, and then
waits for a certain time (think time) until he sends the next request.
Nevertheless the user counts as a concurrent user during this time. The
parallelism encloses all users that started a visit on the web site
(first request) and did not finished it yet, thus will send more
requests. Thereby it is not relevant whether a user's request is still
being processed or the last response has already arrived and no new
request has been sent yet.

If the real user scenarios contain a long think time between the
requests then possibly a simulation with less virtual users but shorter
think time is sufficient. The aim in this case is to simulate the same
count of parallel requests. Such a scenario is not a full equivalent to
a higher number of users with longer think time but depending on the aim
of the test it can be sufficient in most cases.

## Constant Arrival Rate

Constant Arrival Rate is a kind of simulated load where the virtual
users start new visits with a constant rate, independent from the
current operating state of the system under test. The number of parallel
visits depends on the response time behavior of the system under test.
Even if the system responds very slow or not at all, new visitors will
arrive hence sending requests to the system. In theory the number of
parallel visits could rise indefinitely.

If the tested system can process the load the system will engage to a
certain level of parallel visits. This state is reached if the number of
finished visits per time is the same then the number of requests for new
visits arriving at the server.

If the tested system can not process the arriving requests fast enough
the number of parallel users increases automatically. This type of
simulated load is close to real systems behavior because the number of
new arriving visitors is also not depending on the actual state or speed
of the server in real life.

When using XLT a cluster wide constant arrival rate is simulated if the
property `com.xceptance.xlt.loadtests.default.arrivalRate` is set and no
iteration count is configured by the property
`com.xceptance.xlt.loadtests.default.iterations`. This property defines
the number of new visits per hour. The maximum number of parallel
virtual visitors is limited by the mandatory property
`com.xceptance.xlt.loadtests.default.users`, also for the simulation of
a constant arrival rate.

## Cookie

A cookie is a small portion of information that will mostly be sent
together with an HTTP/HTTPS response from a web server to a web browser
and is then saved by the web browser. The web browser will add the
cookie to future requests send to the same web server that the cookie
comes from. The web server can analyze the information inside the
cookie, e.g. to recognize a certain user. Cookies are transfered in the
HTTP header. A cookie contains at least a cookie name and data
(name-value-pairs) that in most cases can only be interpreted by the web
server which created the cookie. As an alternative cookies can also be
created and interpreted on client side with help of JavaScript.

A Cookie can be transient or persistent. Transient cookies are stored in
the main memory of the browser process so that they are only existing
during the runtime of the web browser. In contrast persistent cookies
are stored to the file system by the web browser. The web server that
creates the cookie can set a desired lifetime for the cookie. So the
cookie is still available even after restarting the browser or the
client computer.

## Development-Mode (XLT)

XLT test cases not run by a mastercontroller but by any JUnit test
runner directly as a JUnit test automatically run in development mode.
E.g. when running XLT test cases in Eclipse or as ANT task. When using
the development mode additional property files are read. So it is
possible to redefine settings for local test runs during development
without changing the settings of the load test mode.

## DOM (Document Object Model)

The document object model is an API to access HTML and XML documents. It
is standardized by the W3C. Modern web browsers use the DOM as
representation for websites and allow access to the DOM tree via
JavaScript. This enables reading and changing of content, structure and
layout of a document. E.g. the display of a web page can be modified
dynamically in a web browser by using JavaScript to access the DOM.

## Efficiency

Efficiency is a quality measure regarding ISO 9126. It describes the
performance of a software system in relation to the used resources. It
is divided into sub-characteristics: time behavior and resource
behavior. Time behavior describes the response and processing time as
well as the throughput. Resource behavior describes the amount and the
duration of neded resources.

## End-To-End Test

An end-to-end test is testing a complete system from the point of view
of an end-user or a user making demands on the service. Such a test
includes all components involved to provide the service.

To perform an automated end-to-end test or a end-to-end monitoring a
test software simulates the behavior of the users. A request passes
through the system from the client, through all intermediate layers to
all involved servers and back end systems until the response finally
arrives at the client again (end-to-end). There the response can be
verified, e.g. regarding availability, response time and functional
correctness.

## Endurance Test

Endurance tests are load tests running continuously over a longer
period. Purpose is to test the long-term stability, the resources
requirements (e.g. memory leaks) and the response time behavior of the
system under test. The test period is often 12 hours up to several days.
Often a load of 30% below the maximum load determined in a stress test
is simulated during an endurance test. Endurance tests are also called
stability tests.

## Failover Test

A failover test checks high availability capabilities of an application.
To do so single redundant designed system components are forced to break
down and re-start again during a load test. The correct system reaction
during this scenario (failover) can then be checked.

## Favicon

“Favicon” is an abbreviation for “Favorite Icon”. It is a graphic in the
windows icon format which can be displayed in the web browsers address
bar or next to a browser bookmark (also called favorite). The favicon
file has to be available in the root directory of the domain:
`http://www.mysite.com/favicon.ico`. It is also possible to define an
URI to the favicon file in the header of a html file:
`<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">`

Many browsers automatically start a request to the favicon when the user
bookmarks a link from that domain. If the server cannot find the file it
sends an http code 404. Initially the favicon was introduced by
Microsoft with one of the earlier versions of Internet Explorer.

## Flash Cookie

See [Local Shared Object](#local-shared-object).

## Flow (XLT)

When creating XLT test cases sometimes you may want to reuse blocks of
code that contain more than a single action.  
For this purpose you can create it’s own class with one method that
combines a sequence of several XLT actions as a so called “flow”.
Different test cases can call this method to reuse the flow. This can be
implemented if needed, but there is no explicit support available or
necessary in the XLT framework.

## Headless Browser

A headless browser is a web browser without a GUI component. In XLT the
virtual users using an embedded headless browser to load and interpret
html pages, to build the DOM tree, to execute JavaScript etc. This is
the only way to simulate several parallel virtual users with independent
web browsers on operating systems typically providing the GUI resources
only once.

## Hit

A HTTP hit is an incoming request on the server side. Every single
requested file counts as one hit. For displaying one HTML page several
hits are necessary, more then ten in most cases. The request to the HTML
file as well as all requests to referenced CSS, JavaScript or image
files are hits. Failed requests on server side are also hits. This is
why the hit count is not necessarily a measure for the number of visits
or requested web pages but also increases with the complexity of each
web page.

## HtmlUnit

HtmlUnit is a headless browser implemented in Java that is well suited
to test web applications. The API can be used to request web pages, fill
in forms, click links etc. JavaScript is also supported in HtmlUnit.
HtmlUnit is able to simulate Firefox or Internet Explorer. Typically
HtmlUnit is used with testing frameworks like JUnit or TestNG. XLT also
uses HtmlUnit as a component of the virtual users.

## Image Loading

The term is often used for the automatic request and loading of images
and other multimedia resources by a web browser. A HTML files contains
no image files. To display images on a web page the browser is parsing
the loaded HTML file and starts an automatic request for the embedded
image URLs to load and display the images. The image loading can also be
defined by CSS rules. In XLT the image loading can be configured with
the property  
`com.xceptance.xlt.css.download.images`. Sometimes the term “image
loading” is also used for other static contents like CSS or JavaScript.
See also [Static Content Loading](#static-content-loading).

## Initial Delay (XLT)

The initial delay is a time period in the beginning of a load test where
neither load is generated nor measurements are taken. It is a pure wait
time before any activities. This can be useful for fully automatically
started complex test runs, e.g. to make sure a also automatically
started system under test has reached stable operating conditions.

## Instrumentation

The term instrumentation is used for adding code to the tested
application for gathering runtime information about the system under
test. Examples are information about passed through code branches (code
coverage) or the frequency and duration of method calls (profiling).

## JUnit

JUnit is a framework for automated unit tests of Java applications. It
was originally developed by Kent Beck and Erich Gamma. Test cases
written in Java following the JUnit conventions can be executed by any
JUnit test runner.

## Load Profile

A Load Profile is a description containing all relevant load parameters
like number and type of virtual users, the simulation of constant
arrival rate or stead load, a ramp-up period, think time etc.

## Load Test

When performing a load test the future use of the tested system is
simulated and assessed considering a certain number of users and
transactions. This is done for two reasons. The first is to recover
functional failures appearing only under parallel and intense usage of
the system. The second is to measure time behavior and resource behavior
under a certain load. Thereby values are determined like response time,
main memory usage or processing performance.

Load tests can focus on different system aspects. Different load
profiles and test scenarios are necessary for the different aspects,
often named with an special term like “stress test”, “endurance test” or
“scalability test”. Load test is the generic term for all of these
tests.

## Load Test Mode (XLT)

XLT works in the load test mode if test cases are executed by the XLT
master controller and the XLT agents. XLT auto-detects the mode
depending on the used test driver. The load test mode is mainly used for
load test, hence the name. For test cases running in load test mode, the
additional property files for development mode will be ignored.

## Local Shared Object

In the web development environment a “Local Shared Object” is a file
that is stored to a users local computer with the help of Adobe Flash
player when the user visits a web page with the relevant Flash content.
Therefore these files are also called “Flash cookies”.

Local shared objects are used for the same purpose as HTTP cookies and
follow the same rules. They can only be read by the web site that
initiated to save the local shared object. In contrast to HTTP-cookies,
they are browser independent. Local shared objects saved in one web
browser can be read by the Flash player in another web browser and then
be sent to the web server. Furthermore, local shared objects can hold a
lot more data and they do not have a expiration date. Saving local
shared objects can be prevented by most of the web browsers at the
moment.

## Master Controller / Mastercontroller (XLT)

The mastercontroller controls the entire load test. It deploys the
test suite to all agentcontrollers, calculates the load distribution, and starts and
ends the test. At the end, the mastercontroller is gathering the
test results and stores them on the file system.

{{% note title="Spelling" %}}
To be better highlight that a `mastercontroller` is a shipped XLT component, we prefer the spelling mastercontroller over master controller but you might see both spellings used.
{{% /note %}}


## Measurement Period (XLT)

Time period for taking measurements
(com.xceptance.xlt.loadtests.default.measurementPeriod). The measurement
period begins after the warm-up period.

## Median

The median is the value in the middle of a distribution of values. The
median halves the set of values as follows: Not more than half of the
values are greater than the median and not more than half of the values
are less than the median. To determine the median, all values will be
sorted. For a uneven number of values the median is the value in the
middle of the list. For a even number of value the median is the mean
value of the two values in the middle of the list. In comparison to the
arithmetic mean the median is a lot more robust against single deviating
values. Example: The median of five response times \< 1s, 1s, 1s, 1s,
21s \> is 1s. The arithmetic mean would be 5s.

## Memory Leak

A memory leak is a software fault that does not free (de-allocate) main
memory areas after using it. If such a fault takes affect repeatedly
during runtime, the memory demand for this application will grow until
there is not enough free memory available for further program execution,
ultimately leading to a software failure.

## Metrics

A metric is a measure to cover quantifiable properties. Every metric is
based on a definite, reproducible measurement instruction. Examples for
metrics in the load test environment are the reached number of requests
per second, the mean response time in seconds or the CPU usage in %.

## Page Impression

See [Page View](#page-view).

## Page View

A page view is a complete load of one web page with all embedded
multimedia contents like images, sounds, and also CSS, JavaScript etc.
From the users point of view just one single URL is loaded by the
browser to display one single page. From the technical point of view, a
number of request are sent in order to load the page and all its
content.

## Parallel Requests

Parallel requests are all requests sent but not completely responded.
The number of parallel requests is often smaller than the number of
concurrent users. It can also be bigger because one request sent by a
user to load a web page can trigger several parallel requests
automatically to load static content like images.

## Performance Test

The term “performance test” is not always used in a uniform manner. It
often describes a test to check the compliance of given load
requirements by simulating the defined load and comparing the systems
behavior with the requirements regarding response time, throughput etc.

The term performance test is also used if the test should find
bottlenecks without overloading the system. For that purpose detailed
runtime monitoring information about all hardware and software
components will be gathered and assessed.

Sometimes the term is used interchangeably to the generic term load
test.

## Property Files

Property files are text files in a defined format which are used to save
settings in the Java environment. These files contain one property per
line, each with a name and a value.

## QA

QA is an abbreviation for “Quality Assurance”. It covers all actions and
methods to achieve and control a desired quality. Sometimes the involved
organizational units are called QA, e.g. test teams.

## Ramp-Up Period (XLT)

The time period to automatically ramp up the number of virtual users to
100% (`com.xceptance.xlt.loadtests.default.rampUpPeriod`). It can be
used to simulate a slowly increasing load, e.g. to determine the maximum
processable load. This setting is independent from warm-up period,
measurement period and shut-down period. The ramp-up period starts after
the initial delay.

## Ramp-Up Step Size (XLT)

The number of virtual users by which the load is automatically increased
with every step (`com.xceptance.xlt.loadtests.default.rampUpStepSize`).
The time between the steps is calculated automatically by XLT. With the
last step just before the ramp-up period times out the configured number
of virtual users is reached.

## Regression Test

A regression test is repeatedly execution of a test case regarding
requirements against a already tested software to discover unwanted side
effects. According to the requirements only a part of the test cases or
all previously executed test cases can be repeated.

## Request

A Request is an inquiry from a client to a server mostly using the HTTP
or HTTPS protocol. Also see [Hit](#hit).

## Response

A Response is a servers answer to a clients request. For web
applications the content delivered by the server can be HTML, CSS or
JavaScript, but also images, videos, Flash, Silverlight application or
any file to download.

## Response Time

The time span between sending a request and getting the response. The
complete response time contains several elements. This contains the
transfer of the request from the client to the server, a possible wait
time on server side until processing the request, the processing time
and the transfer of the response back to the client. When transferring
and processing a request several intermediate station, e.g. other
servers, can be involved. On client side the time to interpreting and
displaying the response has to be added. In a web browser this could be
loading images and CSS, building the DOM tree, loading and interpreting
JavaScript and rendering the final page to display. Because XLT uses a
headless browser rendering is not required during an simulation by XLT.
Browser caching reduces the response time when certain requests can be
answered directly from the browser cache without the need to be sent to
the server. When analyzing response time you have to consider carefully
which time components are contained and which systems were involved in
transferring and processing the response.

## Saturation

The term Saturation is used if a resource or a system is fully used to
capacity or completely busy. If this state is reached an increased load
will not result in a higher throughput.

## Scalability

Scalability describes how effectively an application can process
additional workload by using additional resources, without the need of
further changes on the application.

Ideally, the processable workload of an scalable application is linearly
increasing with the amount of available resources. E.g., such an
application could respond twice the number of requests per time by
doubling the available resources. This is called “linear scalability”.
Necessary prerequisite for linear scalability is that all resources can
work to a high capacity at the same time.

In real life synchronization, communication and administration overhead
leads to the fact that added resources can not be used by the application
completely. This results in “sub-linear scalability” where doubling the
resources increases the processable workload by less than 100%.

## Scalability Test

A scalability test evaluates how a systems response behavior and
consumption of resources changes with increasing load. Ideally, the
response time increases linearly with the load. In this operating range
we talk about a “scaling system”. In real world systems this ratio gets
worse with increasing load. From a certain point the response time is
disproportionately increasing with the increasing load. This is the
limit of scalability. The scalability test evaluates how much we can
increase the load for a given system until we reach this point.

Furthermore the scalability test checks whether and how far this limit
can be pushed up by adding additional hardware and software resources.
As long as the maximum processable workload is approximately increasing
linearly with the available components we talk about a system “scaling
over the hardware and software.

## Scenario

See [Test scenario](#test-scenario).

## Server

A server is a system providing services that clients can make use of by
a defined interface. For web applications that could be a web server or
application server taking requests from clients and delivering HTML
pages and other content as response.

## Service Level Agreement (SLA)

A “Service Level Agreement” is a binding agreement between a service
provider (contractor) and a service user (principal) regarding certain
performance characteristics, e.g. availability or maximum response time.

## Session

A session designates all activities related to one user during a visit
and also their technical representation on server side. For dynamic web
applications beyond the simple display of static web content all
requests sent to server during a visit have to be assigned to that
certain visit by the server. Because of using stateless protocols and a
lack of a unique ID available with every request a user in the web can
only be recognized with the help of additional methods.

Therefore, the server generates a unique session ID for every single
user when the first request from that user arrives at the server. From
this point the session ID will be transferred together with all requests
and responses between client and server. Depending on the application
the server saves internal status together with the session ID, e.g. the
basket of a online shop, login information or the selected language for
multi language sites.

The end of a session often is not clearly determinable because it is not
known whether the user will send further requests. Therefore sessions
will often be finished on server side after a certain time if no further
request has arrived (session timeout). In this case the session data
will be deleted or marked on server side. If a session ID has been
generated but the user has not performed an action that uniquely
identifies him (Login) this is called a anonymous session.

## Session ID (SID)

A session ID is a unique identifier for visitors on a web site. It is
used to identify several requests related to one user. A session ID will
be generated when the the first request of the user is is being
processed by the server and then it will be send back to client together
with the response. From this point the session ID will be transferred
together with all requests and responses between client and server. The
session ID can be transferred by a cookie in the HTTP header, in the URL
or as a hidden form parameter in the POST-data.

A session ID must be unique and very hard to guess. Furthermore
additional mechanisms should be used to prevent taking over a foreign
session by attackers.

## Shutdown Period (XLT)

The shutdown period is the time period at the end of a load test where
the virtual users finish the already started transactions but no
measurements will be made
(`com.xceptance.xlt.loadtests.default.shutdownPeriod`). The shutdown
period is used to allow the user transactions quitting cleanly after the
measurements have been made. Transactions still running after the
shutdown period has timed out will be stopped abruptly.

## Simulated User

See [Virtual User](#virtual-user).

## Sizing-Test

The aim of a sizing test is to find the needed hardware and software
resources for certain load requirements. For this purpose the limits of
several different hardware/software configurations will be determined so
that later, you’ll have an approximation for the prospective hardware
and software resources for given load requirements.

## Standard Deviation

Standard Deviation is a measure for the deviation of all values. It
gives an information about the mean distance of the values from the
arithmetic mean. It calculates as the square root of the variance of the
data.

When assessing the deviation of measured values the standard deviation
is always to be considered in relation to the arithmetic mean. A
comparatively high standard deviation shows a high variation of the
values.

The values are called “normally distributed” if the distance from the
arithmetic mean is not exceeding the standard deviation for 68% of the
measured values and furthermore if the distance from the arithmetic mean
is not exceeding double the standard deviation for 95% of the measured
values.

If the measurement values for a response time with a arithmetic mean of
5s and a standard deviation of 2 are normally distributed, then 68% of
all response times are in the range of 3s..7s, and 95% of all response
times are in the range of 1s..9s.

## Static Content Loading

Static Content Loading is the automatic loading of images, CSS,
JavaScript and other static content by a web browser. A HTML file has
references to such files which will be loaded by the web browser with
the help additional requests and then can be displayed or interpreted.

A test run without loading static content is used to test just the
application logic and the generation of dynamic web pages, instead of
testing the delivery of static contents which is performed by other
system components in most cases. This saves resources on server side, in
the network, and on client side and therefore with less resources a
higher number of virtual users can be simulated. Thus, the tested core
components can be stressed with a higher load.

XLT provides several properties to control loading static content (see
`com.xceptance.xlt.loadStaticContent`). Note: If the property
`com.xceptance.xlt.javaScriptEnabled` is set to `true` all virtual users
will execute JavaScript code even if
`com.xceptance.xlt.loadStaticContent` is set to false.

## Steady Load

For this kind of simulated load a constant, exactly defined number of
virtual visitors is used. Each virtual user runs several transactions
(test cases) in succession. A virtual user can start a new transaction
only if the the previous transaction is finished. In this case even a
very long response time does not lead to a higher number of parallel
visitors.

This mode is not very close to real life but is advantageous for
controlled measurements because it minimizes high variability and
uncontrolled side effects. XLT simulates a steady load if the property
`com.xceptance.xlt.loadtests.default.arrivalRate` is not set.

## Stress Test

A stress test is increasing the simulated load beyond the limits of the
expected normal operation until functional failures appear or until the
response time of the system under test is exceeding defined limits.

For this purpose often a continuously increasing number of users is
simulated. Stress tests are used to evaluate the systems behavior in
overload situations and after it, to determine the maximum acceptable
load or to find performance flaws (bottlenecks).

## Super Cookie

See [Local Shared Object](#local-shared-object).

## System Under Test (SUT)

The hardware and software of the tested system, e.g. the demo
application “Posters”, distributed together with XLT, installed on a
certain computer.

## Test Case (XLT)

Using XLT, a test case is a piece of code that implements a user
transaction and that can be run with any JUnit test runner (Java test case classes).

## Test Scenario

A test scenario is a sequence of steps in the application under test
performed by real users or virtual users. For example these are use
cases like browsing or the registration of an new user in a online shop.

Sometimes the term is also used in a more broadly manner, e.g. to
describe a complete load profile with a mix of several virtual user
types.

## Test Suite (XLT)

A collection of test cases belonging together and to be performed at
once.

## Think Time

Think time is the time span between arrival of a response sent from
server to client and the next request sent to the server. From a server's
point of view, the think time is an interrupt of the user's action. A
real user for example needs time to read text on the requested web page,
to click a link or to fill a form. When using XLT, separate values for
think time between actions and think time between transactions can be
configured. Furthermore the think times can vary randomly using XLT.

## Throughput

Throughput is a measure of the amount of requests or data that can be
processed or transferred in a defined time range. When running load
tests this is, for example, the number of processed requests per time
range, or the amount of data per time range, transferred from the server
to the virtual users.

## Transaction (XLT)

Execution of a certain test case that models a test scenario.

## User Scenario

See [Test Scenario](#test-scenario).

## Virtual User

A virtual user is a simulation of a real user (and his used the
application) by a test tool. The virtual users should realistically
model all characteristics relevant for the test case.

A virtual user for a load test of a web application has to simulate the
behavior of a real user and his web browser. That includes to fill in a
form, sending HTP requests, interpreting HTML pages, parallel loading of
static content, interpreting JavaScript, think time until the next
request and performance relevant characteristics like browser caching.

During a load test a number of virtual users run parallel and execute
test cases independently.

## Visit

A visit is a sequence of a users page views on a web site temporally
interrelated.

A visit to an online shop is comparable to visit to a real world retail
shop. The user enters the shop (first request), possibly searches some
products, views single products in detail, puts them into shopping cart
and eventually buys these products.

All requests send to the server during one visit have to be assigned to
that certain visit by the server. Therefore the server generates a
unique session ID for every single user when the first request from that
user arrives at the server. From this point the session ID will be
transferred together with all requests and responses between client and
server. Depending on the application the server saves internal status
together with the session ID, e.g. the basket of a online shop, login
information or the selected language for multi-language sites.

The term “visit” is often used for statistical evaluations, in contrast
the term “session” is often used in the technical environment. Both
terms are also often used synonymous.

From a technical point of view there is no defined end of a visit
because it can not be predicted whether the user will send a further
request. Therefore session will often be finished on server side after a
certain time if no further request has arrived (session timeout). In
this case the session data will be deleted or marked on server side.
Depending on the web service this timeout is often in a range of 30min
to 24hours. The next request of the same user after the session has
timed out creates a new session (a new session ID) and will be assigned
to a new visit.

This is why the last visit must be some time in the past to make another
visit an actually new visit.

A visit has at least one page view, but has several in most cases. Most
important measures are the duration of a visit, the number of page views
and the time lag between the page views (think time).

## Warm-Up Period (XLT)

Time period where load is already generated but no measurements are
taken (see `com.xceptance.xlt.loadtests.default.warmUpPeriod`). This can
be used to configure a settling time where response time and other
measured values are not yet representative and hence should not be
considered in the load test results. The warm-up period starts directly
after the initial delay.

## Web Page

A web page is one single page that can be addressed by an URI (unified
resource identifier) and that has been created using a web technology
like HTML. A web page can be called with the help of a web browser or
another suitable program and be displayed on a screen in most cases.
Beside the original HTML file today further files like CSS, images and
JavaScript for presentation of the page are loaded and processed by the
web browser.

## Web Site

A web site is one complete, interrelated web presence. Generally, a web
site designates all web pages and available services of a company or
organization.

## WebDriver API

WebDriver API is a tool for automated test of web applications. Either
real web browsers can be controlled or web users can be simulated.
Google WebDriver features an easy and efficient usable API. For a quick
creation of simple test cases also the XLT framework provides the usage
of the WebDriver API.

Therefore external test cases using the WebDriver API can generally also
run in the XLT framework. The other way round this is not true in all
cases because in the XLT framework WebDriver API has been expanded by
the concept of action names. Test cases programmed in XLT using the
WebDriver API must possibly be adapted to run with another
WebDriver-compatible test driver.

## XPath

XPath is an abbreviation for “XML Path Language”. XPath is a query
language to address elements of a XML document. In XLT XPath can be used
to address elements of a loaded HTML page.

## XPI

The file extension “XPI” (Cross-Platform Install) has been developed by
the Mozilla foundation. XPI files are zip-compressed installation files.
They contain installation scripts and other added files.

## XSL

The “Extensible Stylesheet Language” is a set of transformation
languages for the purpose of transformation or presentation of XML
documents. Members of this language family are XSL-FO (XSL Formatting
Objects) for formatting instructions to export XML documents, XSLT (XSL
Transformations) for transformation of XML documents in other XML
documents as well XPath to address elements inside a XML document.
