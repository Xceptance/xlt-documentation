---
title: "How to Run Java Test Cases in intelliJ"
linkTitle: "Running Tests in IntelliJ"

weight: 500
type: docs


description: >
  How to import a demo test suite and execute its java test cases in IntelliJ.
---

## Execution of Java Test Cases using IntelliJ IDE
After downloading and installing IntelliJ on a system you can use the following process to get a demo test suite up and running on your IDE. 

### Obtaining the Test Suite
Clone the demo test suite from <a href="https://github.com/Xceptance/posters-simple-loadtest-suite" target="_blank">Github</a> to a local directory, e.g. `<posters-simple-loadtest-suite>`. 

### Importing the _Posters_ Test Suite into IntelliJ 
Once IntelliJ has started, do the following:
1. On the left pan make sure you have selected the 'Projects' tab. 
{{< image src="how-to/ide/intelli1.jpg" max-width="75%">}}
.
{{< /image >}}
2. On the top right of the window click on the 'Open' button.
3. Select the root directory and point to your cloned test suite, e.g. `<posters-simple-loadtest-suite>`.
{{< image src="how-to/ide/intelli2.png" max-width="75%">}}

{{< /image >}}

4. After clicking 'OK' the test suite should open as a Maven project in the IDE.
{{< image src="how-to/ide/intelli3.png" max-width="75%">}}

{{< /image >}}



{{% note notitle %}}
Before executing the tests make sure that the [demo application](../../quick-start/20-demo-application/) is running.
{{% /note %}}

### Executing Java Test Cases in IntelliJ
The tests imported can be run in IntelliJ in headless browser mode. Go to package `com.xceptance.xlt.samples.tests`, right click and select select 'run all tests'. 
{{< image src="how-to/ide/intelli4.png" max-width="75%">}}

{{< /image >}}

Per default, the test cases will run against the [demo application](../../quick-start/20-demo-application) you started already (if you modified the ports there, you might have to change them in `<project>/config/project.properties` accordingly, just look for the property `store-url`). 

{{< image src="how-to/ide/intelli5.png" max-width="75%">}}

{{< /image >}}

