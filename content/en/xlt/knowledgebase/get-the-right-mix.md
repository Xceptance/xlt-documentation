---
title: "Get The Right Load Mix Out of a Few Numbers"

weight: 30
type: docs

description: >
  How can you set up the right load mix when you only get some basic numbers?
---

When testing ecommerce applications in SaaS environments, you often don't have all the traffic data you'd like. Clients might be launching their first online presence, or data from a previous host or IT department might be unavailable.

So, what do you do when you're missing the fine details of current or future load patterns? We’ve found a straightforward approach that consistently yields reliable results.

## What You Need

To get started, you only need a few key metrics:

* **Visits per peak hour**: (e.g., 10,000)
* **Page views per peak hour**: (e.g., 100,000)
* **Orders per peak hour**: (e.g., 200)

**Optional additions:**

* Conversion rates (to derive visits from orders or vice versa).
* Specific interaction counts for searches, "add-to-cart" operations, or user registrations.

## Typical Ecommerce Scenarios

We focus on the primary user journeys rather than minor edge cases like a registered user editing an address. Typical scenarios include:

* **TSingleClickVisit**: Enters the store but doesn't move beyond the home page.
* **TBrowsing**: Includes the initial visit plus category and product browsing.
* **TSearch**: Includes the initial visit, a keyword search, and browsing the results.
* **TAdd2Cart**: Extends browsing to include adding items to the cart.
* **TGuestCheckout**: Extends TAdd2Cart to include a guest checkout (without placing the final order).
* **TGuestOrder**: A full guest checkout resulting in an order.
* **TRegisteredCheckout**: Extends TAdd2Cart to include a registered user checkout (without placing the final order).
* **TRegisteredOrder**: A full registered user checkout resulting in an order.
* **TRegistration**: Specifically for account creation.

## Establishing Assumptions

Ecommerce behavior is surprisingly consistent. While promotions can shift things, certain patterns remain nearly identical across most sites:

* **Checkout Abandonment**: Roughly 50% of all checkouts stop before an order is placed.
* **Cart Abandonment**: Between 20% and 50% of carts created are never taken to checkout.

## Our Calculation

Based on the assumption above, we will put together a fairly simple but sufficiently accurate load mix. Of course, we can also analyze the current log files and try to come up with something more precise, but that will be a snapshot only. Traffic is very volatile and so we should be very generous when setting up this mix.

Since we do not take any daily averages as base but the peaks, we will have a pretty comfortable buffer for our daily ecommerce life anyway.

### Orders

Let’s say, 200 orders are set as goal. Splitting them 50/50  between registered and anonymous users, we get 100 visits of each type. All numbers are per hour of course.

    TGuestOrder       = 100
    TRegisteredOrder  = 100

### Checkouts

As a next step, we take our 50% checkout abandonment rate into account. We have 200 checkouts per hour that are stopped and 200 that run through and turn up as orders (as counted previously). So we need to add 200 visits. And because these visitors can either run with their preset account or without, we split them up in 100 guest and 100 registered checkout attempts.

    TGuestCheckout      = 100
    TRegisteredCheckout = 100
    TGuestOrder         = 100
    TRegisteredOrder    = 100

### Cart

That gave us 400 visits per hour that go into the checkout. We now assume a low cart to checkout conversion rate, about 20% for instance, and so we take 400 checkout visits * 5 and get 2,000 visits that involve cart usage. Since we already have 20% converted into checkouts, we have 2,000 minus 400 visits that use the cart.

    TAdd2Cart           = 1,600
    TGuestCheckout      = 100
    TRegisteredCheckout = 100
    TGuestOrder         = 100
    TRegisteredOrder    = 100

### Bouncing Visitors

We also know that many users do not continue after hitting the home page or any landing page. Let’s add some of these users now.

    TSingleClickVisitor = 1,000
    TAdd2Cart           = 1,600
    TGuestCheckout      = 100
    TRegisteredCheckout = 100
    TGuestOrder         = 100
    TRegisteredOrder    = 100

### Registrations

But wait, what are we missing? Well, we have not registered any new accounts yet. Didn’t we? We did, because the registered checkout creates accounts if required and reuses them several times. But to get a more substantial customer growth, we simply add 200 visits that run registrations:

    TRegistration       = 200
    TSingleClickVisitor = 1,000
    TAdd2Cart           = 1,600
    TGuestCheckout      = 100
    TRegisteredCheckout = 100
    TGuestOrder         = 100
    TRegisteredOrder    = 100

### Browsing and Search

What is left to do? Well, we do not have any “I am just looking around”-visitors yet. We know that our total visit count is 10,000 and we already assigned 3,200 of these to cart, checkout, and registration, so we have 6,800 visits left we can now use for something else. Depending on the shop type (large store, small store etc), people tend to use search more or less. To put enough stress on search and refinements, we simply assume 50% of all people like to search. Thus the missing 6,800 visits will be 3,400 catalog browser visits and 3,400 visits with usage of search before browsing the search result.

### The Total Mix

    TBrowsing           = 3,400
    TSearch             = 3,400
    TRegistration       = 200
    TSingleClickVisitor = 1,000
    TAdd2Cart           = 1,600
    TGuestCheckout      = 100
    TRegisteredCheckout = 100
    TGuestOrder         = 100
    TRegisteredOrder    = 100

All these numbers are meant to be visits per hour, and each visit will perform its determined actions.

## Where Are the Concurrent Users?

You might notice we haven't mentioned **concurrent users** yet. That's because it's a notoriously imprecise way to describe traffic.

Think about it this way: How long does a visit take?

* An average visit might be 2–4 minutes.
* A full shopping trip could take 15 minutes.
* If a session has 10 page views, each taking 1 second to load with 10 seconds of "think time", the visit lasts **100 seconds** (`10 * 1s + 9 * 10s`).

With a 100-second visit, a single user can perform about 36 visits per hour (3600 / 100). To reach 10,000 visits per hour, you’d need **278 concurrent users**.

However:

* Double the think time, and you need **556** concurrent users.
* Reduce think time to 1 second, and the visit duration drops to 19 seconds, requiring only **53** concurrent users for the same volume.

In all three scenarios, the server sees the exact same traffic (page views per hour and order volume), yet the "concurrent user" count varies wildly. We are not talking about the concurrency on the server here, just about a term that is supposed to determine how much load you should simulate.

### Another Example

Given our example above, let's assume we run our initial test with 278 concurrent users and therefore get 10,008 visits (and orders) per hour (278 * 36). Our response time was always 1 second.

The next day, a new software version is rolled out. Due to some aggressive optimization, the response time drops to 0.5 seconds. You repeat your test with the same 278 concurrent users. Now, that same session—with 10 page views at 0.5 seconds each and 10 seconds of think time—will only last **95 seconds** (`10 * 0.5s + 9 * 10s`).

At 95 seconds per visit, each user can now complete about 38 visits per hour (3600 / 95). With those same 278 concurrent users, your total traffic jumps to **10,564 visits per hour**. Even though you intended to keep the load identical, the performance improvement in the system actually increased the load by over 5%.

This is the fundamental flaw of the user count model: the load on the system is dictated by the system's own performance. If the system gets faster, you apply more load; if it slows down, you apply less.

**The solution? The arrival rate model.** By defining a target of 10,000 visits per hour, the test runs exactly the same way regardless of response time changes. This ensures your benchmarks remain comparable over time.

You can find more information in our article [Concurrent Users - The Art of Calculation](concurrent-users-the-art-of-calculation).

## Does This Approach Work for You?

Hopefully, this gives you a clear path to building a realistic user mix even when data is scarce. Focus on the outcomes (orders and visits) and the arrival rate, rather than getting bogged down in concurrent user numbers.
