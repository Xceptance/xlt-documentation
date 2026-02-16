---
title: "How to Calculate Load Test Target Numbers"
linkTitle: "Calculate Target Numbers"

weight: 50
type: docs


description: >
    Learn how to set up the right load mix and calculate target numbers correctly without overreaching.
---

## Motivation

Before you can start load testing for your application, you need to [define target numbers]({{< relref "load-configuration" >}}). The load you apply should ideally model real-world traffic behavior, but chances are you do not yet have a complete list of numbers at hand. You might also have heard about ["concurrent users"]({{< relref "#calculation-of-concurrent-users" >}}) or received these as a metric, which makes things even trickier.

So, what should you do when you do not know every detail about current or future load patterns? We will describe one approach that works quite well in the context of commerce applications and consistently yields satisfying results for us.

## Assumptions

As you can see in our [example test suites]({{< relref "../test-suites" >}}), we have defined a handful of typical test scenarios for commerce applications. For our example, we will use the following scenarios:

* _TVisit_: Enters the store and does not move beyond this starting page.
* _TBrowsing_: _TVisit_ plus category and product browsing.
* _TSearch_: _TVisit_ plus keyword search and browsing of the results.
* _TAdd2Cart_: _TBrowsing_ plus add-to-cart operations.
* _TGuestCheckout_: _TAddToCart_ plus checkout without order placement (anonymous customer).
* _TGuestOrder_: _TAddToCart_ plus full checkout (anonymous user).
* _TRegisteredCheckout_: _TAddToCart_ plus checkout without order placement (registered customer).
* _TRegisteredOrder_: _TAddToCart_ plus full checkout (registered customer).
* _TRegistration_: Account creation.

We need at least a few numbers from which to derive our calculation, such as:

* Peak visits/h: for example, 10,000 visits [^1].
* Peak page views/h: for example, 250,000 page views.
* Peak orders/h: for example, 200 orders.

[^1]: [What are visits?]({{< relref "xlt/about/glossary#visit" >}})

Based on these assumptions, we can assemble a fairly simple yet sufficiently accurate load mix. Of course, we can also analyze current log files and try to devise something more precise, but that will only be a snapshot. Traffic is very volatile; hence, we can be very generous when setting up this mix.

Since we do not take daily averages as a base but rather the peaks, we will calculate with a fairly comfortable buffer for our daily commerce operations.

## Arrival Rate Calculation

There are [two different approaches]({{< relref "load-model" >}}) (load models) available to define a load test setup: the user count model and the arrival rate model.

For the user count model, you define a certain number of concurrent users the system will have to handle, whereas with the arrival rate model, your criteria is the number of transactions per hour. As the latter is better suited for real-world load, we will proceed with the arrival rate model.

### Orders

Let's start the calculation from the bottom up: 200 orders per hour are set as the goal. Splitting them 50/50 between registered and anonymous users, we get 100 visits for both order scenarios. All numbers are per hour, of course.

* **TGuestOrder** = 100
* **TRegisteredOrder** = 100

### Abandoned Checkouts

Commerce sites follow similar traffic patterns. With a few exceptions, such as special promotions, certain behavioral patterns are nearly identical for all of them. For instance, we can assume that about 50% of all checkouts are abandoned before the order is placed. Taking this into account, we have 200 checkouts per hour that are abandoned and 200 that proceed and convert into an order. So, we need to add 200 visits. Because these visitors can either proceed with their preset account or without, we split them into 100 guest and 100 registered checkout attempts.

* **TGuestCheckout** = 100
* **TRegisteredCheckout** = 100
* TGuestOrder = 100
* TRegisteredOrder = 100

Now we have a total of 400 visits per hour that proceed to checkout.

### Carts

Usually, up to 50% of all created carts are not checked out at all. For this example, we will assume a rather low cart-to-checkout conversion rate of just 20% (i.e., 20% of all carts are taken to checkout, which is 400/h in our example). So, we take our 400 checkout visits * 5 to get 2,000 visits that involve cart usage. Since we already have 20% converted into checkouts, we have 2,000 minus 400 visits that just create carts. The business user might call that an abandoned cart scenario.

* **TAdd2Cart** = 1,600
* TGuestCheckout = 100
* TRegisteredCheckout = 100
* TGuestOrder = 100
* TRegisteredOrder = 100

### Early Visit Abandonment

We also know that usually 5–10% of users do not continue after hitting the home page or a landing page. Let’s add some of these users now.

* **TVisit** = 1,000
* TAdd2Cart = 1,600
* TGuestCheckout = 100
* TRegisteredCheckout = 100
* TGuestOrder = 100
* TRegisteredOrder = 100

### Account Registration

But wait, what are we missing? Well, we have not registered any new accounts yet. Didn't we? We did, because the registered checkout creates accounts if required and reuses them multiple times. However, to get more substantial customer growth, we simply add 200 visits that run registrations:

* **TRegistration** = 200
* TVisit = 1,000
* TAdd2Cart = 1,600
* TGuestCheckout = 100
* TRegisteredCheckout = 100
* TGuestOrder = 100
* TRegisteredOrder = 100

### Catalog

What is left to do? Well, we do not yet have any "I am just looking around" visitors. We know that our total visit count is 10,000, and we have already assigned 3,200 of these to cart, checkout, and registration, so we have 6,800 visits left. We can now use these for something else.

Depending on the store type (large store, small store, etc.), people tend to use search more or less. To put enough stress on search and refinements, we simply assume 50% of all people like to search. Therefore, the missing 6,800 visits will be 3,400 catalog browsing visits and 3,400 visits that will search before browsing the search results.

* **TBrowsing** = 3,400
* **TSearch** = 3,400
* TRegistration = 200
* TVisit = 1,000
* TAdd2Cart = 1,600
* TGuestCheckout = 100
* TRegisteredCheckout = 100
* TGuestOrder = 100
* TRegisteredOrder = 100

### Configuration

Now we can [set up the arrival rates]({{< relref "load-configuration#arrival-rate-model" >}}) in the test properties:

```text
## Test case specific configuration.
com.xceptance.xlt.loadtests.TBrowsing.users = ?
com.xceptance.xlt.loadtests.TBrowsing.arrivalRate = 3400

com.xceptance.xlt.loadtests.TSearch.users = ?
com.xceptance.xlt.loadtests.TSearch.arrivalRate = 3400

com.xceptance.xlt.loadtests.TRegistration.users = ?
com.xceptance.xlt.loadtests.TRegistration.arrivalRate = 200

com.xceptance.xlt.loadtests.TVisit.users = ?
com.xceptance.xlt.loadtests.TVisit.arrivalRate = 1000

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

The numbers we have just calculated tell us how often a test scenario needs to run, but not how many test users are needed to achieve this.

## User Numbers

XLT requires a user count per test scenario alongside the arrival rate.

This number of concurrent users is a result rather than an input value for the load model. The number is used to impose an upper limit on the number of concurrent users, which may help restrict the total load on the system if you want to avoid an overload situation resulting from the [feedback loop]({{< relref "load-model#response-time-as-influencing-factor" >}}).

But where do user numbers come from?

### Calculation of Concurrent Users

You have probably heard the term "Concurrent Users." In load and performance testing, this metric is often considered the measure of all things. At this point, we should clarify that the term "concurrent users" is quite useless without a temporal dimension.

Let's start the explanation with a couple of terms to help you understand what we are going to talk about:

* _Visit:_ Occurs when a request is sent to a server and, as a response, the requested website is displayed. It has a duration that starts with the first page view and ends with the last. It consists of one or more page views or page interactions.
* _Session:_ A technical term for a visit, basically the underlying implementation. Visits and sessions are often used synonymously.
* _Page view_ or _page impression:_ A single complete page delivered due to an URL request; in a world of Ajax, intermediate logical pages can be considered an impression or view. It can lead to further technical requests (HTML, CSS, JavaScript, images, etc.).
* _Request:_ Submission of a request to a server, in the case of web applications, mostly via HTTP/HTTPS protocols. Requested content may be HTML, CSS, JavaScript, as well as images and videos.
* _Think time:_ The time period between two page views of a visit.
* _Scenario:_ The course of a visit, essentially a use case or test case.
* _Concurrent User:_ That's what we don't know yet...

We defined a set of typical test scenarios above. Most of the time, we consider a scenario an isolated visit, repeating the steps of the test case and thus using defined data (note that random data is also defined data). Every visit or scenario consists of one or more page views with think times in between.

Let's look at the _TBrowse_ scenario. We might have four page views here:

1. Open homepage
1. Select a category
1. Select a subcategory
1. Select a product

For now, we'll assume that each request has an average response time of 1 second, meaning the complete browsing scenario would take 4 seconds.

Now, the majority of users aren't that fast, which is why think times are usually included. The average think time currently amounts to something between 10–20 seconds. It used to be 40 seconds, but today’s users are more experienced. Also, user guidance has improved, so navigating a website is much easier. Let’s assume a think time of 15 seconds for our example. So, the overall duration of the scenario is 4 _1 sec + 3_ 15 sec = 49 seconds.

This means a single user can perform this scenario 73.5 times per hour (3,600 seconds / 49 seconds per visit). If we want the scenario to be performed 3,400 times per hour, we'd need 47 users (3,400 / 73.5). Easy, right?

Because server response time is most likely not constant, the number of users XLT should use should be higher. It will automatically use only as many as it needs. However, because a user requires resources, you cannot simply use a large random number but should select one more carefully. Be generous but not wasteful.

### Things to keep in mind (FAQ)

These results are based on many assumptions, which means they are not necessarily correct.

#### How do I know if the think times are correct?

For your real-world application, it's a bit of work to determine the correct think times. For most testing, rough estimates are good enough. There are only a few cases where think times play a larger role. For the load test, you can [set the think time in your test properties]({{< relref "test-suite-configuration#think-times" >}}). Ensure the think times are random enough and not overly fixed.

#### What if the response time gets longer than you expect?

The user numbers you define are just an upper limit to prevent system overload, so we recommend using a safety factor. If you multiply the numbers by two, you're probably on the safe side. XLT will probably not use as many concurrent users, as the number actually needed is driven by the arrival rate and server feedback. Anyway, we recommend always checking your test runs to see if the desired arrival rate was achieved or if the user numbers need adjustment.

#### What if the exact number of page views is unknown?

Depending on your test suite's design, you might have a fixed flow and hence a fixed interaction count, or you might have a random flow. We recommend determining the average scenario runtime by executing a dry run before your actual load test. A dry run is a very low-load test execution meant to verify scripts and setup. Use the length of each transaction/scenario to verify the set user number.

For example, it might take, on average, a minute to place an order. The range of runtimes might be 30 to 90 seconds. This helps you estimate that one test user can execute about 60 transactions (scenario executions) per hour.

#### Why do I even need to use all these runtimes in my calculation?

We mentioned above that without a temporal dimension, the user number is quite useless. If we set the think times of our scenario to 0, a single user could perform the `TBrowse` scenario 900 times per hour (3,600 seconds / 4 seconds per visit). In this case, four users would be sufficient to run 3,400 visits per hour.

The created traffic is not identical to a run with think times, despite the same target KPIs (visits, page views, orders). Parallelism and the unpredictability of both testing and reality come into play. Concurrent users can potentially fire a request simultaneously, and it makes a difference whether your system should handle 4, 47, or 4,700 requests at the same time. Only by knowing the test cases and additional numbers, such as visits and page views per time unit, can you: a) define a number of concurrent users, and b) check each number by calculation against the other numbers.

### Summary

The concurrent user count alone does not define business metrics such as page views, visits, or orders. The sentence, "The system should be able to handle 5,000 concurrent users," is insufficient input to design a load test profile. Concurrent users are the result of a test profile design, not the starting point.

## Complete Configuration

So, now that we have the number of users, we can complete our load configuration. Keep in mind that you might want to increase the user numbers beyond your calculated count to account for varying response times.

```bash
## Test case configuration
## User numbers use a safety factor of two.
com.xceptance.xlt.loadtests.TBrowsing.users = 94
com.xceptance.xlt.loadtests.TBrowsing.arrivalRate = 3400

com.xceptance.xlt.loadtests.TSearch.users = 64
com.xceptance.xlt.loadtests.TSearch.arrivalRate = 3400

com.xceptance.xlt.loadtests.TRegistration.users = 6
com.xceptance.xlt.loadtests.TRegistration.arrivalRate = 200

com.xceptance.xlt.loadtests.TVisit.users = 2
com.xceptance.xlt.loadtests.TVisit.arrivalRate = 1000

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

These are still approximate numbers. Feel free to round them up; this is not an exact science. It's always best to check your test runs carefully to see if the desired arrival rate was achieved. If all users were required to run to achieve the arrival rate, either the user number is too low, or the server is too slow. You might even find that you could not achieve the arrival rate goal at all; in that case, you need to add more users if the server is still not overloaded.

If your server is overloaded, there is no need to increase the user number. The next run will yield the same or an even worse result.
