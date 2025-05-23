---
title: "How to Run Java Test Cases in Visual Studio Code"
linkTitle: "Running Tests in Visual Studio Code"

weight: 600
type: docs


description: >
  Learn how to import a demo test suite and execute its Java test cases in Visual Studio Code.
---

## Execution of Java Test Cases using Visual Studio Code
After downloading and installing Visual Studio Code on your system, you can use the following process to get a demo test suite up and running in your IDE. 

### Obtaining the Test Suite
Clone the demo test suite from [Github](https://github.com/Xceptance/posters-simple-loadtest-suite) to a local directory (e.g., `<posters-simple-loadtest-suite>`). 

### Obtaining Relevant Java Extensions
To run Java test cases in Visual Studio Code, a few extensions are required if they are not already installed. Once Visual Studio Code has started, they can be searched for and downloaded from the Extensions tab on the left of the VS Code window.

These extensions can be downloaded as an 'Extension Pack for Java,' which includes all necessary extensions, or they can be downloaded individually.

- Language Support for Java™ by Red Hat
- Debugger for Java
- Java Test Runner
- Maven for Java
- Java Dependency Viewer
- Visual Studio IntelliCode

### Minor Modification in File Structure
Before importing the test suite, place the tests in the following directory: 
`src > test > java > com > xceptance > loadtest > tests`

### Importing the _Posters_ Test Suite into Visual Studio Code 
Once you are sure you have the required extensions, do the following:
- Open the File dialog (File > Open Folder). 

  {{< image src="how-to/ide/vsc1.png" max-width="75%">}}
{{< /image >}}


- Select the root directory to search in and point to your cloned test suite (e.g., `<posters-simple-loadtest-suite>`).

  {{< image src="how-to/ide/vsc2.png" max-width="75%">}}
{{< /image >}}

- Click the 'Select Folder' button, and the test suite should open as a Java project in Visual Studio Code.
  
  {{< image src="how-to/ide/vsc3.png" max-width="75%">}}
{{< /image >}}
{{% note notitle %}}
Before executing the tests, ensure that the [demo application](../../quick-start/20-demo-application/) is running.
{{% /note %}}

### Executing Java Test Cases in Visual Studio Code

The imported tests can be run in Visual Studio Code in headless browser mode. Once imported, choose the 'Testing' tab on the left of the window. You can find it below the Explorer tab, which you should currently be in.

  {{< image src="how-to/ide/vsc4.png" max-width="75%">}}
{{< /image >}}

 All tests from the suite should now be visible. Right-click the test suite and select 'Run Test'. By default, the test cases will run against the [demo application](../../quick-start/20-demo-application/) you already started. (If you modified the ports there, you might have to change them in `<project>/config/project.properties` accordingly; look for the `store-url` property). 

{{< image src="how-to/ide/vsc5.png" max-width="75%">}}
{{< /image >}}


