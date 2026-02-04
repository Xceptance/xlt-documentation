---
title: "Installation"
linkTitle: "Installation"
weight: 5
type: docs
description: "Basic installation requirements and setup for Neodymium."
---

This page covers the basic requirements to get started with Neodymium.

## Prerequisites

Neodymium is a Java-based test automation library. To use it, you need to set up your development environment with the following tools:

### 1. Java Development Kit (JDK)

Neodymium v5.0.0+ requires **Java 17** or later.

* To check if Java is installed, run:

    ```shell
    java -version
    ```

* If not installed, download and install a JDK (e.g., [OpenJDK](https://openjdk.org/) or [Eclipse Temurin](https://adoptium.net/)).

### 2. Apache Maven

It is recommended to use [Apache Maven](https://maven.apache.org/) for build and dependency management.

* To check if Maven is installed, run:

    ```shell
    mvn -version
    ```

* If not installed, follow the [official Maven installation guide](https://maven.apache.org/install.html).
  * **Windows:** You may need to add Maven to your `PATH` manually.
  * **Mac/Linux:** You can often use package managers like `brew` or `apt`.

### 3. FFmpeg (Optional)

If you plan to record video of your test execution (not just GIFs), you need to install [FFmpeg](https://ffmpeg.org/).

## Docker Support

If you prefer using Docker, you can use images with pre-installed dependencies:

* `maven:3-openjdk-17`: Contains Maven and Java 17.
* `markhobson/maven-chrome:jdk-17`: Contains Maven, Java 17, and Chrome (useful for running tests in Chrome within a container).

## Project Setup

Once your environment is ready, the best way to start a new project is using the **Neodymium Template**.

* Check out the [Neodymium Template](https://github.com/Xceptance/neodymium-template) repository.
* Follow the [Quick Start Guide]({{< relref "quick-start" >}}) for a step-by-step tutorial.

## Next Steps

* **Configuration:** Learn how to configure browsers and environments in [Configuration]({{< relref "configuration" >}}).
* **Browser Setup:** Details on setting up drivers and profiles are in the [Browsers]({{< relref "browsers" >}}) section.
* **Running Tests:** Learn about flexible execution options (IDE, Maven, filtering) in [Test Execution]({{< relref "framework/test-execution" >}}).
