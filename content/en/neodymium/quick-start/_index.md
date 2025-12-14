---
title: "Quick Start"
toc: true
weight: 10
type: docs
description: >
  A full tutorial in several steps to get you started with Neodymium.
---

This tutorial will guide you through writing browser-based test automation with Neodymium from scratch.

By following these steps, you will learn how to:

* Set up Neodymium in your project.
* Write and execute your first test.
* Use the Page Object Model for better code structure.
* Implement data-driven testing.
* Localize your tests for different regions.
* Configure tests for multiple browsers.
* Add accessibility checks with Lighthouse.

## Adding Neodymium

To add Neodymium to your project, include the following dependency in your `pom.xml`:

```xml
<dependencies>
    <dependency>
        <groupId>com.xceptance</groupId>
        <artifactId>neodymium-library</artifactId>
        <version>5.2.0</version>
    </dependency>
</dependencies>
```

Once this dependency is included, you can begin writing Neodymium tests.

Check out the [First Test]({{< relref "first-test" >}}) page to get started!
