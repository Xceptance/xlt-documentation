---
title: "Calculate Load Numbers"
linkTitle: "Calculate Load Numbers"

weight: 1
type: docs


description: >
    How to get the right load mix out of a few numbers.
---

## Motivation
Before you can start a load test for your application, you need to [define load numbers](../../manual/470-load-configuration). The load you apply should model real world traffic on your application, but chances are you do not yet have a complete list of arrival rates and user numbers at hand.

So what should you do when you do not know every detail about the current or future load pattern? We are describing one approach below that works pretty well for ecommerce applications and always yielded satisfying results so far.

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

## Calculation

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
* TSingleClickVisit = 1,000
* TAdd2Cart = 1,600
* TGuestCheckout = 100
* TRegisteredCheckout = 100
* TGuestOrder = 100
* TRegisteredOrder = 100

## How to put these numbers to work

* arrival rate vs. user count vs. concurrent users?
