---
title: "Choose a Load Model"

weight: 1
type: docs


description: >
  How to decide which load model to use for your test setup.
---

One of the decisions you have to make before running a load test is for the right load model. A load model basically describes what basic characteristic you influence to reach a certain load and performance behavior.

There are **two different approaches** to define the load your system should be able to handle: 

* you know how many concurrent users you are expecting, or
* you know how many orders per hour you are expecting, e.g. during a campaign. 

These requirements lead to two different load models:

* For the **User Count Model**, you define a certain number of concurrent users the system will have to handle. At any given time during the test, the target system has to handle 2000 concurrent users, no more, no less. The number of transactions that can be achieved depends on the time the target system needs to respond.
* With the **Arrival Rate Model**, your criterium is the number of transactions (or here: orders) per hour. The order scenario should be performed 500 times, equally distributed across a period of one hour. As many concurrent users as necessary to fulfill the given arrival rate are used.

With the user count model, you can make sure your application will be stable with the defined number of concurrent users. The crucial question is this: 

**What will happen if the response time of the system increases during the test period?**

When using the user count model simply less transactions will be finished. In comparison the arrival rate model will increase the number of concurrent users as well, to make sure the given number of orders will be performed.

This means that the arrival rate model works feedback based and will react to response time changes during the test period. This way, the generated load is somewhat unpredictable, but this is more along the lines of how the real world behaves. 

But another thing to keep in mind is the potential aggressive behavior of a test using the arrival rate model: if the response time increases, more concurrent users are used, which probably means that the response time will increase even more due to heavier load (which will cause the system to use even more concurrent users, which is where the recursion kicks in). To avoid a complete breakdown in this scenario, you can define an upper limit to the number of concurrent users used in the arrival model. This restricts the total load on the system, in order to avoid a total overload as a result of the feedback loop. That is not reality of course, but if the users feel a certain pain in reality, they might hold back as well.

**To sum it up**: the arrival rate model is better fit to model real world load, so it might be the right choice for most load tests. But there are still some scenarios in which the user count model could be a good choice, so here are some guidelines which model fits what purpose best:

The **user count model** is well-suited for:

+ a simple base line test (single-user test) to assess the base performance of the system under almost no load,
+ a real load or performance test to assess the performance under a high, but predictable aka stable load,
+ a test that should be easily repeatable, i.e. its load factor should not be influenced by the system under test.

The **arrival rate model** is best used if the load test should prove that a system is indeed able to handle a certain number of transactions per hour. Since this is the primary purpose of load and performance tests, the arrival rate load model is the best choice for most of your test tasks.

So get testing and give all models a try. Load tests often start with a fixed user rate and once this runs fine, you move over to the more challenging arrival rate model.
