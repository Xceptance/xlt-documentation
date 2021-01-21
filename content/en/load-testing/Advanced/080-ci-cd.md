---
title: "CI/CD"

weight: 80
type: docs

description: >
  How to integrate XLT into CI/CD pipelines and evaluate the results.
---

## CI/CD

Load testing is usually done as one of the last steps in a project, often only a few weeks before release. This is somewhat problematic since serious performance issues sometimes require architectural changes. If these changes are not tested thoroughly, the risk of undetected bugs increases tremendously.

To spot performance problems early, ideally while the project is still under development, load testing should take place on a regular basis. If you are willing to invest time up front to establish continuous load testing, it will surely pay out later on. XLT provides the tools to make continuous load testing an engineering habit.

### Jenkins

Jenkins is a widely used continuous integration system. It helps you set up and control automated build and deployment processes, which can be run regularly. Jenkins can be extended by plug-ins. The XLT plug-in for Jenkins brings load testing and continuous integration together. In Jenkins terms, an XLT load test project is a build project, while an individual load test run is a build.

### XLT Plug-In Features

*Easy integration of XLT load tests* - The plug-in makes it easy for you to run a load test. You simply configure some basic settings via the Jenkins UI and the plug-in will then take care of carrying out the necessary steps with the parameters you have provided. You don't have to deal with XLT tools directly, that is you don't need to write shell scripts to drive the load test. Furthermore, the plug-in automatically stores the results, creates load test reports, and updates trend reports for you.

*Automatic evaluation of the load test results* - Don't think you're all set if you just run a load test on a regular basis. You also need to check if the test results are actually acceptable. Doing this manually after each test run doesn't really fit into the work processes of continuous development; it should therefore be automated as well. To this end, you can define success criteria. For example, you may verify that no errors occurred, that the maximum request runtime was below 10 seconds, and that page X took less than 2 seconds to load. The plug-in tests these criteria after each load test. If a criterion has not been fulfilled, the build will be marked as unstable. This should encourage you to have a closer look at the results and find out what went wrong.

*Visualization of the performance trend* - To show you when the application behavior has changed and to which extend, the plug-in can visualize a long-term trend across multiple builds. Simply define the values that you would like to watch over time, for example the response time of page X, and the plug-in will then visualize the trend in overview charts on the project page. For an in-depth evaluation of all data, the plug-in can also generate two different types of trend reports which contain all the details.

The plug-in enriches the standard Jenkins project and build pages. On a build's page, the corresponding load test report is available as well as a list of any success criterion that may have been violated during this build. The project page shows the trend charts and provides links to access the trend reports.


### Installation Instructions

First, check the version of Jenkins you are using. The XLT plug-in requires v1.642.3 or later.

The Jenkins plugin is free to clone or download on <a href="https://github.com/Xceptance/XLT-jenkins-plugin" target="_blank">Github</a>. If you do not want to build it yourself, the latest prebuilt artifacts can be downloaded from <a href="https://search.maven.org/artifact/com.xceptance/xlt-jenkins-plugin" target="_blank">Maven Central</a>.

To install the XLT plug-in into Jenkins, simply copy the plug-in file `<xlt>/tools/xlt-jenkins-plugin-X.X.X/xlt-jenkins-plugin.hpi` to the `plugins`sub-directory of your Jenkins installation. Restart Jenkins for the plug-in to be picked up.

Note that you will also need an XLT installation on the Jenkins machine. This installation acts as a template and will be copied to a temporary location for each load test. To accelerate this step, remove any sub-directory from the installation folder that is not necessary for load testing, such as `doc`, `samples`, or `tools`.


### Setting Up an Automated Load Test

#### Develop an XLT Load Test Project

A regular XLT load test project will be the foundation for your automated load tests, so simply design and implement a load test suite for your application as usual. This is completely independent of Jenkins, there is nothing special to do or to consider.

When the code is complete, prepare the test configurations for which you want to run automatic load tests as separate properties files. Now, test your load test suite and configurations thoroughly. Everything should work as expected when being run manually.

#### Create a Load Test Build Project

An automated load test suite requires a separate build project to be set up. The reason is that the test suite itself needs to be retrieved from a version control system and the code needs to be compiled. This is best accomplished in an own build project, so let's create one now. In Jenkins, create the load test project and give it a meaningful name and description. Choose "free-style project" as the project type. Now the project needs to be configured.

**Step 1 - Connect to your version control system**

Every time a load test is to be executed, the latest version of the test suite will be retrieved from a version control system first. So select the adapter for your favourite version control system and configure access credentials and the path to your test suite.

**Step 2 - Compile your test suite**

Now configure the way how your test suite is compiled. Typically, you would do this via _Ant_ or _Maven_. Whatever tool you choose, make sure an appropriate build file (`build.xml` for Ant, `pom.xml` for Maven) is available in the root of your test suite project. Add the appropriate build step to your project and enter the build target that compiles your test suite.

**Step 3 - Configure your load test**

Now add the XLT plug-in as a new build step to your project and configure it as follows:

* Specify the full path to the XLT installation template on the Jenkins machine.
* Enter the name of the properties file with the load test configuration settings (for example, `smoketest.properties`). This file will be searched for in the `config` folder of your test suite.
* In the agent controller section, check the radio button "Use a single embedded agent controller".
* Go with the defaults for all other settings for now.

{{% note notitle %}}Please note that with the default configuration the load test will be driven from the Jenkins machine, so the configured load profile should not be too demanding. See below for an overview of what else can be configured.{{% /note %}}

To generate higher load it might be not enough to run one XLT agent controller from the Jenkins machine. Dedicated load generating machines are recommended. When configuring the XLT plug-in the agent controller section offers several options one of them being "Start agent machines in Amazon's EC2". This allows to automatically start Amazon machine images (AMI) in Amazon's Elastic Compute Cloud (EC2) that can be used to generate the load. Typically, you will use one of the machine images with XLT already installed. For the current list of AMI IDs, see the <a href="https://www.xceptance.com/en/xlt/download.html" target="_blank">Xceptance Homepage</a>.

{{% note notitle %}}When using the option "Start agent machines in Amazon's EC2" the XLT master controller has to wait for the remote agent controller EC2 machines to come up. This can take several minutes. This is why you should adjust the XLT property `com.xceptance.xlt.mastercontroller.initialResponseTimeout` to a value that is useful for the described scenario.{{% /note %}}

**Step 4 - Other project settings**

Configure any other project setting you might find useful. For example, specify for how long/for how many builds you want to keep the load test results. You may also want to configure email notification (as a post-build step) to get a message whenever the build was not successful.

Once you're done with the configuration, start your build project manually to verify that everything works as expected. If all went well, your build should show {{< ctext color="darkblue" >}}SUCCESS{{< /ctext >}}. If the load test could not be executed for whatever reason (wrong configuration, etc.), the build will be marked as {{< ctext color="red" >}}FAILED{{< /ctext >}}. If the load test ran to completion, but the configured [success criteria](#success-criteria) were violated, the build will be marked as {{< ctext color="orange" >}}UNSTABLE{{< /ctext >}}.

#### Define a Trigger for the Load Test

To run your load test automatically, you need to define the event that should trigger the load test build project. You basically have two options:

1. You can run the load test once another build project completed successfully, for example after your application has been built and deployed. To this end, configure your load test project to depend on the application's main build project.
1. You might also run your load test periodically, for example every night, as an independent or stand-alone project. In this case, you would need to configure a time pattern that defines the times when the project will be executed by Jenkins.

### Advanced Configuration

Many other details of the XLT plug-in functionality can be configured. This includes:

* Agent Controllers
* Report Options
* Trend Charts and Success Criteria
* Chart Options

Each configuration value provides an extensive help text, so make sure to click the _Help_ icon next to the value if in doubt what can be configured there.

{{% note notitle %}}Please note that the XLT plug-in can be added to a project/job not only once, but multiple times. This allows to run multiple tests with the same test suite in a row, for example a short smoke test, followed by a longer performance test. In this case, each XLT build step has to be configured individually.{{% /note %}}

#### A Note on the 'stepId' Parameter

As stated above, a job might perform multiple load tests in one build. Each of these load tests creates a result that belongs to a certain result set which is used as input not only for chart generation but also for creating the summary, trend and difference reports.

As it makes no sense to merge all load test results into a single result set, the question was: How can we identify one load test across several builds of the same job? Well, by using an identifier that is distinct for all load test steps in the same job: the step identifier or stepId. 

{{< image src="how-to/jenkins/BuildSteps.png" >}}
Build Steps in a Job
{{< /image >}}

#### Success Criteria

The XLT Jenkins plug-in offers two ways to define success criteria that must be met by the results of the test in order to have a successful build/run. In both cases, success criteria are specified as XPath expressions that will be applied on an XML file generated by XLT when creating a test or difference report.

**Success Criteria for Test Reports**

Test reports are generated automatically by XLT when the load test has finished and its results have been saved to disk. Success criteria for test reports can be specified in the text area named 'Configuration' in section 'Validation/Plot Configuration'. Here you can define which values should be displayed on the various Trend Charts, along with a condition (as XPath predicate) that must be satisfied. For details, please see the corresponding help text.

**Success Criteria for Difference Reports**

In contrast to Test Reports, Difference Reports will only be generated when the checkbox 'Create a diff report' is checked  or - if using the _xlt_ pipeline step - when the parameter 'diffReport' is given. The difference report option has an optional parameter where you can specify the path to the criteria file that should be used for criteria validation as described in this "How-To":criteria-validation-tool.html.

### Pipelines

Starting with Jenkins 2.0, build jobs can also be modeled as pipelines which allows greater flexibility and usability.

Since XLT 4.11.0, the Jenkins XLT plug-in supports this new concept entirely. It provides a custom pipeline step called _**xlt**_ that can be invoked in any pipeline script in the same way as any other Jenkins pipeline step. 

Parameters and their values can be obtained easily by using Jenkins' Snippet Generator. You can use the UI to configure the plug-in as usual and get the corresponding pipeline script snippet upon hitting the 'Generate Pipeline Script' button.

Furthermore, the _xlt_ pipeline step returns a result object that can be queried for details if desired. The result object has the following fields:
* runFailed - (boolean) Indicates whether the build status is FAILED
* conditionFailed - (boolean) Indicates whether a criterion is not met
* conditionError - (boolean) Indicates whether a criterion caused an error
* conditionCritical - (boolean) Indicates whether the build is marked as critical according to the given 'markCritical' option
* conditionMessage - (string) Summary message of all failed and erroneous criteria
* reportUrl - (string) XLT Report URL
* diffReportUrl - (string) XLT Difference Report URL
* testFailures - (list) Information about failed tests. Each object in the list has the following fields:
	* testCaseName - (string) Name of the test
	* actionName - (string) Name of the action where the error occurred
	* message - (string) Error message
* criteriaFailures - (list) Information about criteria whose condition is not met. Each object in this list has the following fields:
	* id - (string) The criterion's ID
	* condition - (string) The criterion's condition
	* message - (string) Failure/error message
* criteriaErrors - (list) Information about criteria whose evaluation caused an error. The objects have the same fields as _criteriaFailures_.

Example:

```groovy
def r = xlt stepId: 'any-step-id', xltTemplateDir: '/path/to/xlt'
echo "Run failed: ${r.runFailed} | Report URL: ${r.reportUrl}"
```

{{% note notitle %}} Feel free to take a look at Jenkins' Pipeline Reference page which lists all available pipeline steps, along with their documentation, including names, types and description of their parameters and return values.{{% /note %}}

## Success Criteria Evaluation

The XLT plug-in for Jenkins allows to configure certain criteria that must be met by the generated report. This useful feature would also make sense for difference or trend reports. This way, you would be able to check for criteria based on how certain values evolved over time or how much they differ compared to a given baseline.
Last but not least, this feature should not be restricted to Jenkins users but work  in any environment supported by XLT.

We therefore came to the conclusion to provide a stand-alone tool for this purpose that is able to handle all kind of reports generated by XLT.

### Approach

To keep things simple, we decided to use XPath expressions that are evaluated on the parsed XML document to define whether a given criterion is met.
These expressions must evaluate to a boolean result (e.g. `count(/some/element) > 0`), otherwise it is seen as an error (same as for invalid XPath expressions).

All criteria that should be validated by the tool are defined in a single file - the criteria definition file - which is pure JSON and looks like this:

```json
{
  "criteria": [
    {
      "id": "MaxRequestRuntime",
      "enabled": true,
      "condition": "count(//request/max/relativeDifference[number()>10])=0",
      "message": "Maximum request runtime exceeded 10%" 
    },
    {
      "id": "P95RequestRuntime",
      "enabled": true,
      "condition": "not(//request/percentiles/p95/absoluteDifference[number()>1000])",
      "message": "Request runtime (P95) increased by more than 1 second" 
    },
    {
      "id": "NoRequestErrors",
      "enabled": true,
      "condition": "not(//request/errors/*[number() > 0]",
      "message": "Errorneous requests encountered" 
    }
  ]
}
```

Each criterion listed in the array `criteria` is an object with following properties:
* **id** - The ID of the criterion (required; non-blank and unique)
* **condition** - The criterion's condition as XPath expression (required; non-blank)
* **enabled** - Whether or not the criterion is enabled (optional; defaults to `true`)
* **message** - Failure message (optional)


The output generated by the tool is pure JSON as well and contains the following:
* used/defined criteria
* validation status (and failure/error message) of each criterion
* summary per document
* name of validated document (as the number of validated documents is potentially greater than 1)

### Usage

To use the tool, open a terminal window and execute the following command sequence:

```bash
cd <XLT>/bin
./check_criteria.sh -c /path/to/criteria.json /path/to/report.xml
```

{{% note notitle %}}Windows users have to use the appropriate `.cmd` file located in the same directory.{{% /note %}}

The tool is able to process more than one XML file in one pass. Simply specify the path of each file as additional argument:

```bash
cd <XLT>/bin
./check_criteria.sh -c /path/to/criteria.json /path/to/report1.xml /path/to/report2.xml ... 
```

Per default, the output will be written to standard-out but the tool also offers an option to write it to a file of your choice.

```bash
cd <XLT>/bin
./check_criteria.sh -c /path/to/criteria.json -o /path/to/validation_output.json /path/to/report.xml
```

Sample output:

```json
{
  "criteria": [
    {
      "id": "MaxRequestRuntime",
      "enabled": true,
      "condition": "count(//request/max/relativeDifference[number()>10])=0",
      "message": "Maximum request runtime exceeded 10%" 
    },
    {
      "id": "P95RequestRuntime",
      "enabled": true,
      "condition": "not(//request/percentiles/p95/absoluteDifference[number()>1000])",
      "message": "Request runtime (P95) increased by more than 1 second" 
    },
    {
      "id": "NoRequestErrors",
      "enabled": true,
      "condition": "not(//request/errors/*[number() > 0]",
      "message": "Errorneous requests encountered" 
    }
  ],
  "checks": [
    {
      "document": "foo/bar/bumm",
      "total": {
        "passed": 1,
        "failed": 1,
        "skipped": 0,
        "error": 1
      },
      "details": {
        "MaxRequestRuntime": { "status": "failed", "message": "Maximum request runtime exceeded 10%"  },
        "P95RequestRuntime": { "status": "passed" },
        "NoRequestErrors": { "status": "error", "message": "Invalid XPath expression" }
      }
    }
  ]
}
```

### Status Codes

Similar as the other tools shipped with XLT, the criteria validation tool returns one of the following status codes:
* **0** on success
* **1** if one of its input files or the criteria definition file could not be parsed
* **2** if a required argument is missing or some of the given arguments are invalid
* **3** if a criterion is not met or could not be evaluated (caused an error)

