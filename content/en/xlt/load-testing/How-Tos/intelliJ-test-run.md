---
title: "How to Run Java Test Cases in IntelliJ"
linkTitle: "Running Tests in IntelliJ"

weight: 500
type: docs


description: >
  Learn how to import a demo test suite and execute its Java test cases in IntelliJ.
---

## Execution of Java Test Cases Using IntelliJ IDE
After downloading and installing IntelliJ on your system, you can use the following process to get a demo test suite up and running in your IDE. 

### Obtaining the Test Suite
Clone the demo test suite from [Github](https://github.com/Xceptance/posters-simple-loadtest-suite) to a local directory (e.g., `<posters-simple-loadtest-suite>`). 

### Importing the _Posters_ Test Suite into IntelliJ 
Once IntelliJ has started, do the following:
1. On the left pane, ensure you have selected the 'Projects' tab. 

    {{< image src="how-to/ide/intelli1.jpg" max-width="75%">}}
{{< /image >}}

2. On the top right of the window, click the 'Open' button.
3. Select the root directory and point to your cloned test suite (e.g., `<posters-simple-loadtest-suite>`).

    {{< image src="how-to/ide/intelli2.png" max-width="75%">}}

{{< /image >}}

4. After clicking 'OK,' the test suite should open as a Maven project in the IDE.

    {{< image src="how-to/ide/intelli3.png" max-width="75%">}}

{{< /image >}}



{{% note notitle %}}
Before executing the tests, ensure that the [demo application](../../quick-start/20-demo-application/) is running.
{{% /note %}}

### Executing Java Test Cases in IntelliJ
The imported tests can be run in IntelliJ in headless browser mode. Go to the package `com.xceptance.xlt.samples.tests`, right-click, and select 'Run All Tests'. 

{{< image src="how-to/ide/intelli4.png" max-width="75%">}}

{{< /image >}}

By default, the test cases will run against the [demo application](../../quick-start/20-demo-application/) you already started. (If you modified the ports there, you might have to change them in `<project>/config/project.properties` accordingly; look for the `store-url` property). 

{{< image src="how-to/ide/intelli5.png" max-width="75%">}}

{{< /image >}}

