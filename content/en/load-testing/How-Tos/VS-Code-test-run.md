---
title: "How to Run Java Test Cases in Visual Studio Code"
linkTitle: "Running Tests in Visual Studio Code"

weight: 600
type: docs


description: >
  How to import a demo test suite and execute its java test cases in Visual Studio Code.
---

## Execution of Java Test Cases using Visual Studio Code
After downloading and installing Visual Studio Code on a system you can use the following process to get a demo test suite up and running on your IDE. 

### Obtaining the Test Suite
Clone the demo test suite from <a href="https://github.com/Xceptance/posters-simple-loadtest-suite" target="_blank">Github</a> to a local directory, e.g.`<posters-simple-loadtest-suite>`. 

### Obtaining Relevant Java Extensions
In order to be able to run Java test cases in Visual Studio Code a few extensions are required, if they are not installed already. Once Visual Studio Code has started, they can be searched and downloaded from the extensions tab on the left of the VS Code window.

These extensions can be downloaded as an 'Extension Pack for Java' which includes all the necessary extensions or can be downloaded individually.

- Language Support for Java™ by Red Hat
- Debugger for Java
- Java Test Runner
- Maven for Java
- Java Dependency Viewer
- Visual Studio IntelliCode

### Minor modification in file structure
Before importing the test suite, place the tests in the following directory: 
`src > test > java > com > xceptance > loadtest > tests`

### Importing the _Posters_ Test Suite into Visual Studio Code 
Once you are sure you have the required extensions, do the following:
- Open the File dialog (File > Open Folder) 
- Select the root directory to search in and point to your cloned test suite, e.g. `<posters-simple-loadtest-suite>`.
- Click the 'Select Folder' button and the test suite should open as a Java project in Visual Studio Code.

{{% note notitle %}}
Before executing the tests make sure that the [demo application](../../quick-start/20-demo-application/) is running.
{{% /note %}}

### Executing Java Test Cases in Visual Studio Code

The tests imported can be run in Visual Studio Code in headless browser mode. Once imported choose the 'Testing' on the left of the window. You can find it below the explorer tab, you should be in at the moment.

 The tests from the suite should all be visible now. Right click the test suite and select select 'run all tests'. Per default, the test cases will run against the [demo application](../20-demo-application) you started already (if you modified the ports there, you might have to change them in `<project>/config/project.properties` accordingly, just look for the property `store-url`). 


