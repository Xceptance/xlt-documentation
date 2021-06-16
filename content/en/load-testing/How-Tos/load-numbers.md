---
title: "Calculate Load Numbers"
linkTitle: "Calculate Load Numbers"

weight: 50
type: docs


description: >
    How to get the right load mix out of a few numbers.
---

## Motivation
Before you can start a load test for your application, you need to [define load numbers](../../manual/470-load-configuration). The load you apply should model real world traffic on your application, but chances are you do not yet have a complete list of arrival rates and user numbers at hand (or you have heard about ["concurrent users"](#calculation-of-concurrent-users), which can be even more confusing).

So what should you do when you do not know every detail about the current or future load pattern? We are describing one approach below that works pretty well in the context of ecommerce applications and always yielded satisfying results for us so far.

## Assumptions
As you can see in our [example test suites](../../test-suites), you can define a handful of very typical test scenarios for ecommerce applications. For our example here, we will use the following:

* _TSingleClickVisit_: Enters the store only, does not move beyond the start page
* _TBrowsing_: _TVisitor_ plus category and product browsing
* _TSearch_: _TVisitor_ plus keyword search plus browsing of the result
* _TAdd2Cart_: TBrowsing plus add to cart operations
* _TGuestCheckout_: _TAddToCart_ plus checkout without an order placement (anonymous user)
* _TGuestOrder_: _TAddToCart_ plus full checkout (anonymous user)
* _TRegisteredCheckout_: _TAddToCart_ plus checkout without an order placement (registered customer)
* _TRegisteredOrder_: _TAddToCart_ plus full checkout (registered customer)
* _TRegistration_: Account creation 

There are a few numbers we do need to base our calculation on, such as:

* peak visits/h (example: 10k visits / What are visits? - see [Glossary](../../glossary/#visit))
* peak orders/h (example: 200 orders)

Based on these assumptions, we can put together a fairly simple but sufficiently accurate load mix. Of course, we can also analyze the current log files and try to come up with something more precise, but that will be a snapshot only. Traffic is very volatile and so we should be very generous when setting up this mix.

Since we do not take any daily averages as base but the peaks, we will have a pretty comfortable buffer for our daily ecommerce life anyway.

## Calculation of Arrival Rates

There are [two different approaches](../load-model/) (models) to define load: the user count model and the arrival rate model. For the user count model, you define a certain number of concurrent users the system will have to handle, whereas with the arrival rate model, your criteria is the number of transactions per hour. As the latter is better fit to model real world load, we will go with the arrival rate model.

We will start the calculation bottom up: 200 orders per hour are set as goal. Splitting them 50/50  between registered and anonymous users, we get 100 visits in both order test scenarios. All numbers are per hour of course.

* ***TGuestOrder = 100***
* ***TRegisteredOrder = 100***

Ecommerce sites follow similar patterns and with a few exceptions, such as special promotions, certain behavioral patterns are nearly identical for all of them. So for instance, we can assume about 50% of all checkouts are stopped before the order is placed. Taking this into account, we have 200 checkouts per hour that are stopped and 200 that run through and turn up as orders (as counted previously). So we need to add 200 visits. And because these visitors can either run with their preset account or without, we split them up in 100 guest and 100 registered checkout attempts.

* ***TGuestCheckout = 100***
* ***TRegisteredCheckout = 100***
* TGuestOrder = 100
* TRegisteredOrder = 100

Now we have a total of 400 visits per hour that go into the checkout. Usually up to 50% of all created carts aren’t checked out at all. For this example, we will assume a rather low cart to checkout conversion rate of about 20% (i.e. 20% of all carts are taken to checkout, in our example 400/h). So we take our 400 checkout visits * 5 and get 2,000 visits that involve cart usage, and since we already have 20% converted into checkouts, we have 2,000 minus 400 visits that just use the cart.

* ***TAdd2Cart = 1,600***
* TGuestCheckout = 100
* TRegisteredCheckout = 100
* TGuestOrder = 100
* TRegisteredOrder = 100

We also know that many users do not continue after hitting the home page or any landing page. Let’s add some of these users now.

* ***TSingleClickVisit = 1,000***
* TAdd2Cart = 1,600
* TGuestCheckout = 100
* TRegisteredCheckout = 100
* TGuestOrder = 100
* TRegisteredOrder = 100

But wait, what are we missing? Well, we have not registered any new accounts yet. Didn’t we? We did, because the registered checkout creates accounts if required and reuses them several times. But to get a more substantial customer growth, we simply add 200 visits that run registrations:

* ***TRegistration = 200***
* TSingleClickVisit = 1,000
* TAdd2Cart = 1,600
* TGuestCheckout = 100
* TRegisteredCheckout = 100
* TGuestOrder = 100
* TRegisteredOrder = 100

What is left to do? Well, we do not have any “I am just looking around”-visitors yet. We know that our total visit count is 10,000 and we already assigned 3,200 of these to cart, checkout, and registration, so we have 6,800 visits left we can now use for something else. Depending on the shop type (large store, small store etc), people tend to use search more or less. To put enough stress on search and refinements, we simply assume 50% of all people like to search. Thus the missing 6,800 visits will be 3,400 catalog browser visits and 3,400 visits with usage of search before browsing the search result.

The total mix is:

* ***TBrowsing = 3,400***
* ***TSearch = 3,400***
* TRegistration = 200
* TSingleClickVisit = 1,000
* TAdd2Cart = 1,600
* TGuestCheckout = 100
* TRegisteredCheckout = 100
* TGuestOrder = 100
* TRegisteredOrder = 100

The numbers we have calculated just tell us how often we want a test scenario to be run, not how many users are needed to achieve this, so we can [define the arrival rate](../../manual/470-load-configuration/#arrival-rate-model) per test scenario in the test properties:

```bash
## Test case specific configuration.
com.xceptance.xlt.loadtests.TBrowsing.users = ?
com.xceptance.xlt.loadtests.TBrowsing.arrivalRate = 3400

com.xceptance.xlt.loadtests.TSearch.users = ?
com.xceptance.xlt.loadtests.TSearch.arrivalRate = 3400

com.xceptance.xlt.loadtests.TRegistration.users = ?
com.xceptance.xlt.loadtests.TRegistration.arrivalRate = 200

com.xceptance.xlt.loadtests.TSingleClickVisit.users = ?
com.xceptance.xlt.loadtests.TSingleClickVisit.arrivalRate = 1000

com.xceptance.xlt.loadtests.TAdd2Cart.users = ?
com.xceptance.xlt.loadtests.TAdd2Cart.arrivalRate = 1600

com.xceptance.xlt.loadtests.TGuestCheckout.users = ?
com.xceptance.xlt.loadtests.TGuestCheckout.arrivalRate = 100

com.xceptance.xlt.loadtests.TRegisteredCheckout.users = ?
com.xceptance.xlt.loadtests.TRegisteredCheckout.arrivalRate = 100

com.xceptance.xlt.loadtests.TGuestOrder.users = ?
com.xceptance.xlt.loadtests.TGuestOrder.arrivalRate = 100

com.xceptance.xlt.loadtests.TRegisteredOrder.users = ?
com.xceptance.xlt.loadtests.TRegisteredOrder.arrivalRate = 100
```

## Approximation of User Numbers

As you see, you have to specify a user count for the arrival rate model, too, even though the number of concurrent users is rather a result than an input value for this load model. This number is used to impose an upper limit to the number of concurrent users, which may help you to restrict the total load on the system if you want to avoid a total overload resulting from the [feedback loop](../load-model/#response-time-as-influencing-factor).

But where are user numbers coming from?

### Calculation of Concurrent Users

You have probably heard the term "Concurrent User". In the context of load and performance testing, this metric is often claimed the measure of all things. At this point we should clarify that the term "concurrent users", even if connected to numbers, is pretty useless without the temporal dimension. 

Let’s start the explanation with a couple of key terms to help you understand what we’re talking about:

* _Visit_: In general, a visit occurs when you send a request to a server and, as a response, the website you requested is displayed. Has a duration starting with the first page view and ends with the last. Consists of one or more page views.
* _Session_: Technical term for a visit, basically the technical picture underlying it. Visit and session are often used synonymously.
* _Page view_ or _page impression_: A single complete page delivered due to a request of an URL; in a world of Ajax, intermediate logical pages can be considered an impression or view. Can lead to further technical requests (HTML, CSS, Javascript, images etc.)
* _Request_: Submission of a request to a server, in the case of web applications mostly via HTTP/HTTPS protocols. Requested content may be HTML, CSS, Javascript as well as images, videos, Flash, or Silverlight applications – HTTP can deliver almost everything.
* _Think time_: Time period between two page views of a visit.
* _Scenario_: The course of a visit in terms of a use case (for example, to search something, to order something, or both). Representation of test cases meant to be run as load tests.
* _Concurrent User_: We don’t exactly know about them yet…

We have defined a set of typical test scenarios above. Most of the time, we consider a scenario an isolated visit repeating the steps of the test case and thus using defined data (note that also random data is defined data). Every visit or scenario consists of one or more page views with think times in between.

Let's look at the TBrowse scenario. We might have four page views here:

1. Open homepage
1. Select category
1. Select subcategory
1. Select product

For now we'll just assume that each request has an average response time of 1 sec, which means the complete browsing scenario would take 4 sec. Now, the majority of users isn’t that fast, of course, which is why usually think times get included. The average think time currently amounts to something between 10-20 seconds, depending on the web presence. It used to be 40 seconds but today’s users are more experienced and user guidance has improved a lot so that they can navigate through a website much faster. Let’s assume a think time of 15 sec for our example. So the overall duration of the scenario is 4 * 1 sec + 3 * 15 sec = 49 seconds. 

This means a single user can perform this scenario 73.5 times per hour (3,600 sec / 49 sec per visit). If we want the scenario to be performed 3,400 times per hour, we'd need 47 users (3400 / 73.5). Easy, right?

### Things to keep in mind (FAQ)

These results are based on a lot of assumptions, which means they are not necessarily correct. 

_How do I know if these think times are correct?_ - For your real world shop, it's a bit of work to determine your real customers' think times, but in the context of your load test you can [set the think time in your test properties](../../manual/480-test-suite-configuration/#think-times), and even if you defined a random think time there, the arithmetic mean should be about as expected at the end of your test. 

_What if the response time gets longer than you expected?_ - The user numbers you will define in this scenario are just an upper limit to prevent system overload, so we recommend to use a safety factor on them. If you multiply the numbers you got by two, you should be on the safe side. XLT will probably not use as many concurrent users/sessions as the number actually needed is determined based on the arrival rate you defined.

_What if I do not know or remember the exact number of page views defined for each scenario?_ - Let's be honest, no developer want's to sit back and count how many page views they defined. Also, as response times might differ depending on the request (and many other factors), we'd recommend **a much safer way to determine average scenario runtimes**: by doing a dry run before your actual load test, you can not only check if your scenarios run as expected before applying actual load, but you will get real numbers for your average test runtimes which you can then use in the above calculation.

_Why do I even need to use all these runtimes in my calculation?_ - We mentioned above that without the temporal dimension the user number is pretty useless. When we just set the think time of our scenario to 0, a single user could perform the TBrowse scenario 900 times per hour (3600 seconds / 4 seconds per visit), so 4 users would be sufficient to do the 3400 visits per hour that we want. But the produced traffic would not be exactly the same, and this is where extreme parallelism and the unpredictability of both testing and reality comes into play: all the concurrent users can potentially click at the same time, and it makes a difference whether your system should handle 4, or 47 (or 4700) requests at the same time. Only by knowing the test cases and additional numbers such as visits and page views per time unit can you a) define a number of concurrent users and b) check each number by means of calculation against the other numbers.

## Complete Configuration
So now we have the number of users, we can complete our load configuration:

```bash
## Test case specific configuration.
## User numbers are calculated with safety factor = 2.
com.xceptance.xlt.loadtests.TBrowsing.users = 94
com.xceptance.xlt.loadtests.TBrowsing.arrivalRate = 3400

com.xceptance.xlt.loadtests.TSearch.users = 64
com.xceptance.xlt.loadtests.TSearch.arrivalRate = 3400

com.xceptance.xlt.loadtests.TRegistration.users = 6
com.xceptance.xlt.loadtests.TRegistration.arrivalRate = 200

com.xceptance.xlt.loadtests.TSingleClickVisit.users = 2
com.xceptance.xlt.loadtests.TSingleClickVisit.arrivalRate = 1000

com.xceptance.xlt.loadtests.TAdd2Cart.users = 58
com.xceptance.xlt.loadtests.TAdd2Cart.arrivalRate = 1600

com.xceptance.xlt.loadtests.TGuestCheckout.users = 8
com.xceptance.xlt.loadtests.TGuestCheckout.arrivalRate = 100

com.xceptance.xlt.loadtests.TRegisteredCheckout.users = 8
com.xceptance.xlt.loadtests.TRegisteredCheckout.arrivalRate = 100

com.xceptance.xlt.loadtests.TGuestOrder.users = 10
com.xceptance.xlt.loadtests.TGuestOrder.arrivalRate = 100

com.xceptance.xlt.loadtests.TRegisteredOrder.users = 10
com.xceptance.xlt.loadtests.TRegisteredOrder.arrivalRate = 100
```

As these are still just approximate numbers, it's always best to check your test runs afterwards to see if the arrival rates were achieved and whether you need to adapt anything (e.g. if the user limit was set too low after all, or the average test duration was not as expected).
