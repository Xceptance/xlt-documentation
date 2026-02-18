---
title: "Concurrent Users - The Art of Calculation"
weight: 30
type: docs

description: >
  "Concurrent User": In the context of load and performance testing, this metric is often claimed to be the ultimate measure, but it is not. This article aims to shed some light on the concurrent user metric and the misunderstandings and myths surrounding it.
---

You are likely familiar with the term "Concurrent User". In the context of load and performance testing, this metric is often claimed to be the ultimate measure, frequently accompanied by astronomically high numbers that are difficult to verify and sometimes used merely as sales arguments for overpriced software products.

This article aims to shed some light on the concurrent user metric and the misunderstandings and myths surrounding it. Since Xceptance focuses on the internet and e-commerce, illustrations and examples mainly refer to online shops. Keep in mind, however, that the topic is not restricted to the domain of commerce load testing.

## Terminology

Let’s start with a couple of key terms to help you understand what we’re talking about:

- **Visit**: In general, a visit occurs when a user sends a request to a server and, as a response, the requested website is displayed. It has a duration starting with the first page view and ending with the last. A visit consists of one or more page views.
- **Session**: Technical term for a visit, basically the technical representation of it. Visit and session are often used synonymously.
- **Page view or page impression**: A single, complete page delivered in response to a request for a URL. In the world of AJAX, intermediate logical pages can be considered an impression or view. This can lead to further technical requests (HTML, CSS, JavaScript, images, etc.).
- **Request**: Submission of a request to a server, in the case of web applications mostly via HTTP/HTTPS protocols. Requested content may be HTML, CSS, JavaScript, as well as images or videos—HTTP can deliver almost anything.
- **Think time**: The time period between two page views of a visit.
- **Scenario**: The course of a visit defined by a use case (for example, searching for something, ordering something, or both). It represents the test cases meant to be run as load tests.
- **Concurrent User**: A metric defined and discussed in detail below.

## Load and Performance Test

A load test aims to reflect present or anticipated load conditions. In either case, it is impossible for a load test to cover all eventualities and be economical at the same time. There are a myriad of ways to explore an online shop. Thus, you decide on the most typical ones first and create a scenario from them afterwards. Most of the time, we consider a scenario an isolated visit repeating the steps of the test case and thus using defined data (note that random data is also defined data).

Let’s assume three scenarios: a visitor who is just browsing (Browsing), a visitor who places products into the cart (Add-to-Cart), and a visitor who checks out as a guest and wants their ordered items shipped to an address (Order).

The users have to go through the following steps to completely cover the scenario:

### Browsing user

1. Homepage
2. Select a catalogue
3. Select a subcatalogue
4. Select a product

### Add-to-Cart user

1. Browsing 1.-4.
2. Put a product into the cart

### Order user

1. Add-to-Cart 1.-2.
2. Proceed to checkout
3. Enter an address
4. Select a payment method
5. Select a delivery type
6. Place the order

The first challenge is choosing the content for the individual actions: should we always choose the same product, the same catalogue? Should the number of items or the size of the cart vary? These three scenarios alone offer infinite possibilities for variation. But let’s stick with the basic steps and the simple "Browsing" scenario for now.

## Concurrent Users

When testing against a server, a single run of "Browsing" would be a visit consisting of 4 page views and possibly further requests for static content. A second execution of the test, with all data and connections (cookies, keep-alive, and browser cache) reset, would result in another visit. If you run these two visits simultaneously and independently, you end up with two concurrent users. Note that the notion of "user" is not the most accurate term here, as we are talking about concurrent visits. We prefer the term visit in this context, and the person performing it is the visitor.

Both of our visitors execute 4 page views each, resulting in a total of 8 page views. Assuming each page view has a runtime on the server of, say, 1 second, one visit takes at least 4 seconds. Therefore, if one user repeats their visit for one hour, they complete 3,600 seconds / (4 seconds per visit) = 900 visits/hour. Two concurrent visitors result in 1,800 visits in total, leading to 1,800 visits x (4 page views per visit) = 7,200 page views.

We just said "if one user repeats". Of course, a single user would never repeat a visit that many times. Consider the user here as the load test execution engine repeating the visit scenario independent of other "users".

## Think Times

The majority of users are not that fast, which is why think times are usually included. The average think time currently amounts to between 10-20 seconds, depending on the website. It used to be around 40 seconds, but today’s users are more experienced and user guidance has improved significantly, allowing faster navigation. Let’s assume a think time of 15 seconds for our example.

A visit would now take (4 page views x 1 sec each) + (3 think times x 15 sec each). There are only 3 think times because there is no think time after the last click that terminates the visit. Accordingly, our visit duration is 49 seconds. If we have a visitor repeat that for one hour, we end up with a user completing 3,600 sec / (49 sec per visit) = 73.5 visits per hour.

If we want to test 1,800 visits again, we need 1,800 visits / (73.5 visits per hour per user) = 24.5 users, or roughly 25. The number of page views stays the same since 1 visit equals 4 page views and the number of visits is constant. These 25 users need to complete their visits simultaneously and in parallel, but still independent of one another.

## Any Number of Concurrent Users is Possible

We now have 25 concurrent users that produce the exact same traffic simulation as 2 users without a think time. The exact same traffic? No, of course not—this is where extreme parallelism and the unpredictability of both testing and reality come into play.

If the requirement was the simulation of 1,800 visits per hour and 7,200 page views per hour, we could now randomly pick a think time and, by doing so, determine any number of concurrent visits (aka users) between 2 and X. With respect to our simulation period of 1 hour, we get a new session (beginning of a visit) every two seconds on the server side (3,600 sec / 1,800 visits), assuming our visits are equally distributed.

You can also question the numbers by approaching the problem from another perspective: if 100 users are simultaneously active, they can simultaneously request 100 page views. In the worst case (assuming 1 page view takes 1 second on the server side), this would amount to 100 x 3,600 sec = 360,000 page views per hour. Since the requirement of 100 concurrent users is actually never bound to a certain period, you have to assume that these users could potentially click at any time.

From this point of view, you will soon realize that the number of concurrent users can basically mean anything: high traffic, low traffic, low load, high load. Only by knowing the test cases and additional numbers such as visits and page views per time unit can you a) define a number of concurrent users and b) check each number by means of calculation against the other numbers.

And needless to say, 42 is always a good number of concurrent users... ;-)

## Why 300,000 Concurrent Users Aren’t 300,000 Visits

We want to emphasize here that a temporal dimension is absolutely necessary. The requirement of 300,000 users would always imply they could click simultaneously, which would produce 300,000 visits at once. Now, you may want to argue that they aren’t coming simultaneously. However, if the users aren’t simultaneously active (meaning they started a visit), they aren’t concurrent users anymore and you don’t need to simulate them in the first place.

Provided an equal distribution and an average visit duration of 49 seconds, 300,000 users per hour (who are often identified with visits in a business context) would result in the following: a user completes 3,600 / 49 sec visit duration = 73.5 visits per hour. Thus, you end up with 300,000 / 73.5 = 4,081 concurrent visits (meaning real concurrent users) at any given second. 4,081 concurrent visits produce 4 page views in 49 seconds (visit duration) each; that is, in 49 seconds we have 16,324 page views, or 333 page views per second (see next paragraph).

In terms of page views without think times, this means: 300,000 users create 1,200,000 page views (for our example above). Thus, you need to complete 1,200,000 page views / 3,600 seconds = 333 page views per second. Without any think time, you would therefore need 333 users for the simulation.

Regarding the final result, the simulation of 4,081 users with 15 seconds think time equals the simulation of 333 users without think time. On the server side, both will result in the identical number of visits per time period, the identical number of page views, etc.

## That’s Impossible

You may raise some objections to this, and they are valid since, in reality, the think time would never be exactly 15 seconds and the response time would never be exactly 1 second. This is where coincidence comes into play. With respect to our example, let’s assume the think time varies between 10 and 20 seconds. The arithmetic mean would still be 15 seconds.

The calculation now changes: In the worst case, the duration of all visits is only 4 sec + 3 x 10 sec = 34 sec. With 34 seconds, our server now has to deliver as many visits and page views as it delivered within 49 seconds before. Thus, our test wouldn’t cover 300,000 users with 4,081 concurrent test users but 3,600 / 34 x 4,081 = 432,105 visits per hour.

That means you need to define target numbers you want to support, or measure what the server is currently able to deliver. As soon as you say you have a number of X visits that could vary in their duration, you end up with a higher maximum number of visits you need to support but that you actually don’t want to test.

Note that our sole focus is on the load and performance test here. You want to know if you can cope with the traffic X, where you assume X to be a constant worst case that applies to a longer period of time. If you want to measure the server side beyond the maximum "good" case, you don’t aim at the performance anymore but at the overload behavior. Then you focus on stability and a predictable way of "decline". All tests that are normally run first (which is absolutely correct) are tests that want to identify or verify the "good" case.

## However

Of course, it can make sense to test 4,081 users instead of 333, although there is the same number of visits and page views per time period on the server side. 4,081 users can be concurrent users for a very short time and occupy, for example, 4,081 web server threads or sockets, while 333 users will never reach this number. Even if you keep the think time for 4,081 users at a constant level, the traffic would not be as synchronous as originally planned.

In the worst case, you cannot test at all because each test run leads to a different result. By restricting to 333 users with little to no think time, you restrict the "movement" of the system initially to measure it. If the system delivers what it should, the test may expand in scope—meaning both the think times and the number of concurrent users increase.

## Steady Load Vs. Constant Arrival Rate

To resolve this dilemma of a) measuring accurately without b) having to consider the server side, you can choose between two typical load profiles:

- **Steady Load**: Runs a fixed number of users that wait for the server—for instance, when it has long response times. This way, you can’t reach the desired number of visits because users depend on the server’s response behavior. This profile is suitable for controlled measurements relative to the concurrent user count.
- **Constant Arrival Rate**: Users arrive as new visitors regardless of what is happening on the server side. When the server is too slow, new users will still try to enter. If the server can handle the load, the system runs stably and you just need your user number X (according to our calculation, 4,081, for example). If there are problems on the server side, then the user number automatically increases to X + n (for example, to a total of 10,000 users). In the ideal case, that means you only need 4,081 users, but when the server behaves unexpectedly, up to 10,000 users will be activated. This way, you can also test the overload behavior at the same time.

## Summary

We hope you were able to follow and that the array of numbers didn’t get too confusing. At times, the "concurrent user" topic can become quite complex. Feel free to comment; any feedback is appreciated.
