---
title: "History"
linkTitle: "History"
aliases: 
    - history

type: docs

weight: 10

description: >
    To understand some of the features of XLT better, especially why reporting and scaling have been seen so much detailed work, you might want to check out the history of XLT.
---

## Why Have We Built Another Tool?

* *Platform independence*: We needed a tool that runs on any stack especially on Linux, because the cloud was becoming a thing
* *Licensing*: Popular commercial tools at that time had poor licensing schemas which prohibited the use for consulting, but no customer wants to buy a tool for a one time testing gig
* *Request level*: Most tools worked only on request level, making it hard to work with what really happened at the DOM level, especially adding and removing of form fields often stayed unnoticed
* *UIs*: UIs where difficult to handle and made it hard to quickly change configurations
* *Scaling*: Scaling tests was not easy and the deployment behind it was difficult
* *Reporting*: Reports weren't ready to use and as detailed as we wanted, just reporting some average and smoothing out charts is not the way to go
* *Languages*: Either tools were configuration driven or used proprietary languages and their very own IDEs
* *Postprocessing of data*: Data was stored in databases or not at all, hence making later analysis of the run post-mortem difficult 
* *Debugging*: When you don't know the stack and you don't see the code, it is often hard to debug a problem
* *Features*: Commercial tools had too many features we would pay for but never need and we could not drive the direction of development
* *Trust*: Load testing and result communication is about trust, because when pointing at a problem, you have to be certain that your tool is not the cause of that very problem

## 2005 - Early Prototype
As a young startup, money was short and when working for another startup which also was short on money, not a fan of Windows servers as well as requiring an quick and trustworthy load test tool, it was natural to come up with a new approach to load testing. All commercially available tools were too expensive, JMeter was too cumbersome to use, not scaling enough, and all tools together had issues with reporting. Reporting was either too hard to set up or not detailed enough. Reports were hard to share, too.

With founders already working at this point in time for five years with load and performance testing tools as well as for large international customers, it was clear what was needed. A tool in Java that runs on any OS, enables complex test logic, makes working with the DOM easy, and offers nice and ready to use reports out of the box.

## 2007 - First Product Offer
After using the tool for a while internally (and very successfully), we started to share it with the world as a licensed product. The base edition was free and included five virtual users. Also for test automation, no license cost incurred. 

## 2010 - Test Automation 
Test automation got more important for us and so we wanted to have a tool that makes things easier. Selenium IDE was one automation IDE, but the feature set was too small, so we started the Script Developer. 

{{< image src="legacy/script-developer.png" >}}
{{< /image >}}

The Script Developer saw many additional features over the course of its lifetime such as modules for easier reuse, test data support similar to what JUnit does, and even test documentation tooling. The latter creates a full HTML-based documentation out of your code and comments.

## 2011 - 2019
We continuously enhanced the tool and improved reporting, deployment, integration into CI/CD environments, the  API, data logging and capturing and much more. Feel free to go over the [release history]({{< relref "release-notes" >}}) to learn more about the development history.

## 2017 - Script Developer Discontinued
With the release of Firefox 57, Mozilla decided to completely remove the support for legacy extensions for security reasons. As a result, the Script Developer could not longer be installed and used. This basically ended the UI driven test automation with recording and live debugging. All scripts continue to run and can be migrated to pure Java code, but sadly the once simple maintenance got more complicated.

We at Xceptance had been aware of this development, but after a user survey and an evaluation of several alternative options, we came to the conclusion that the feature set and comfort that had been offered by XLT Script Developer and its way of writing web automation cannot be recreated using the alternative Firefox APIs. Therefore, XLT Script Developer was discontinued. Read more in this <a href="https://blog.xceptance.com/2017/10/27/firefox-57-changes-and-xlt/" target="_blank">blog post</a>. 

At this time, we also found that more and more companies switch from traditional test and development setups to development only teams, effectively removing QA and test roles. The development team is now in charge of the quality without external dependencies. This leads to "testing is also just programming" and therefore asks for a simple and programming-like tool chain. Hence our decision to go code-only was matching the market development.

## 2018 - XLT at no Charge
Over the years we have seen many people working with other performance test tools and found that often they chose one primarily because of the price or simply because it was already a familiar tool in the company. This is not necessarily bad but it is certainly not always optimal. 

We wanted to give the testing world a tool that would be chosen because it fits and not because the license is cheaper or has already been purchased. That's why, starting January 2018, XLT was made free of charge for load and performance testing. Read more in this <a href="https://blog.xceptance.com/2017/12/21/xlt-now-available-free-of-charge/">blog post</a>.

## 2019 - v4.13
Our last closed source release of XLT was pushed in 2019 and saw additions such as HAR file support for enhanced debugging.

## 2020 - XLT goes Open Source

The world evolved and open source became the norm for many businesses especially when looking at programming stacks. In parts this protects investments because external dependencies become easier to control, but also it enhances trust as well as simplifies programming due to community support and accessibility of the code. 

So in February 2020, we completely open sourced XLT to make it more accessible and ease the decision process. XLT is published on Github under the <a href="https://opensource.org/licenses/Apache-2.0" target="_blank">Apache License 2.0</a>. Xceptance continues to maintain and extend XLT as before. We will build releases and publish them regularly.

We still keep the <a href="https://lab.xceptance.de/releases/xlt/latest/index.html" target="_blank">legacy documentation</a> around, just in case you need information about older or deprecated XLT versions or functionalities. For everything else, <a href="https://xltdoc.xceptance.com/" target="_blank">this is the new documentation</a>, also published on <a href="https://github.com/Xceptance/xlt-documentation" target="_blank">Github</a>. It is growing steadily and updates are pushed constantly. Please provide feedback, raise issues, and if you like, contribute to the documentation.