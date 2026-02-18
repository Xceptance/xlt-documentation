---
title: "History"
linkTitle: "History"
aliases: 
    - history

type: docs

weight: 10

description: >
    To better understand XLT's features, especially the detailed work on reporting and scaling, you might want to explore its history.
---

## Why Have We Built Another Tool?

Many factors motivated us to start another load test tool project, some of which are still valid today.

* *Platform independence*: We needed a tool that runs on any stack, especially Linux, as cloud computing was emerging.
* *Licensing*: Popular commercial tools at the time had poor licensing schemes that prohibited the use in consulting: customers were hesitant to buy a tool for a one-time testing gig.
* *Request level*: Most tools operated only at the request level, making it difficult to track DOM-level changes. Adding and removing form fields often went unnoticed.
* *UIs*: UIs were difficult to handle and made it challenging to change configurations quickly.
* *Scaling*: Scaling tests and the deployment behind it was not easy.
* *Reporting*: Reports weren't ready-to-use or as detailed as we required. Simply reporting averages and smoothing charts was insufficient.
* *Languages*: Tools were either configuration-driven or used proprietary languages and their own IDEs.
* *Postprocessing of data*: Data was stored in databases or not at all, making post-run analysis difficult.
* *Debugging*: When you don't know the stack and you don't see the code, it is often hard to debug a problem.
* *Features*: Commercial tools had too many features we would pay for but never use, and we couldn't influence their development direction.
* *Trust*: Load testing and result communication require trust: when identifying a problem, you must be certain your tool is not the cause.

## 2005 - Early Prototype

As a young startup with limited funds, working for another startup that also had budget constraints and a preference against Windows servers, we needed a quick and trustworthy load test tool. This led us to develop a new approach to load testing. Commercially available tools were too expensive, JMeter was cumbersome and didn't scale sufficiently, and all existing tools had reporting issues. Reporting was either difficult to set up or lacked detail. Sharing reports was also challenging.

With founders who had five years of experience in load and performance testing tools and working with large international customers, the requirements were clear. We needed a Java-based tool that could run on any OS, support complex test logic, simplify working with the DOM, and provide nice and ready-to-use reports out-of-the-box.

## 2007 - First Product Offer

After successful internal use, we released the tool as a licensed product. The base edition was free and included five virtual users. No licensing costs were incurred for test automation.

## 2010 - Test Automation

Test automation became more important to us, so we sought a tool to simplify the process. Selenium IDE was one option, but its feature set was too limited, leading us to create Script Developer.

Over its lifetime, Script Developer gained many features, including modules for easier reuse, JUnit-like test data support, and even test documentation tooling. The documentation tooling generated full HTML-based documentation from code and comments.

## 2011 - 2019

We continuously enhanced the tool, improving reporting, deployment, CI/CD integration, the API, data logging and capturing, and much more. Feel free to go over the [release history]({{< relref "/xlt/release-notes" >}}) to learn more about the development history.

## 2017 - Script Developer Discontinued

With the release of Firefox 57, Mozilla removed support for legacy extensions due to security reasons. As a result, Script Developer could no longer be installed or used. This effectively ended UI-driven test automation with recording and live debugging. Existing scripts continued to run and could be migrated to pure Java code, but the previously simple maintenance became more complex.

At Xceptance, we were aware of this development. After a user survey and evaluating alternatives, we concluded that the feature set and ease of use offered by XLT Script Developer's web automation approach could not be replicated with alternative Firefox APIs. Therefore, XLT Script Developer was discontinued. Read more in this [blog post](https://blog.xceptance.com/2017/10/27/firefox-57-changes-and-xlt/).

At this time, we also observed that more companies were transitioning from traditional test and development setups to development-only teams, effectively removing QA and testing roles. The development team became responsible for quality without external dependencies. This led to the "testing is also just programming" mindset, requiring a simple, programming-like tool chain. Therefore, our decision to go code-only aligned with market development.

## 2018 - XLT at no Charge

Over the years, we observed many people using other performance test tools, often choosing them based on price or familiarity within their company. This isn't necessarily bad, but it's not always optimal.

We wanted to provide the testing world with a tool chosen for its suitability, not because of a cheaper license or prior purchase. That's why, starting January 2018, XLT became free of charge for load and performance testing. Read more in this [blog post](https://blog.xceptance.com/2017/12/21/xlt-now-available-free-of-charge/).

## 2019 - v4.13

Our last closed-source release of XLT was in 2019 and included additions like HAR file support for enhanced debugging.

## 2020 - XLT goes Open Source

The world evolved, and open source became the norm for many businesses, especially in programming stacks. This partly protects investments by making external dependencies easier to control, enhances trust, and simplifies programming through community support and code accessibility.

So, in February 2020, we completely open-sourced XLT to make it more accessible and simplify the decision-making process. XLT is published on Github under the [Apache License 2.0](https://opensource.org/licenses/Apache-2.0). Xceptance continues to maintain and extend XLT as before. We build and publish releases regularly.

We still maintain the [legacy documentation](https://lab.xceptance.de/releases/xlt/5.7.1/index.html) for information about older or deprecated XLT versions or functionalities. For everything else, [this is the new documentation]({{< relref "/" >}}), also available on [Github](https://github.com/Xceptance/xlt-documentation). It is growing steadily, with updates pushed constantly. Please provide feedback, raise issues, and contribute to the documentation if you like.

## 2021 - 2025

XLT has been open source since 2020 and has been growing steadily ever since. We continue to maintain and extend XLT as before. We build and publish releases regularly.
