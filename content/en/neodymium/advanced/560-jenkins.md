---
title: "Jenkins Setup"
linkTitle: "Jenkins Setup"
weight: 560
type: docs
description: "Setting up continuous tests with Jenkins."
---

Jenkins is a CI (continuous integration) and CD (continuous delivery) software that builds software in a concise repeatable way.

## Allure plugin for Jenkins

The Allure project has created a plugin for Jenkins that simplifies the report handling and enables the trend history generation for the recent builds.
![Allure Jenkins Plugin](/images/neodymium/allure_jenkins.png)

In order to use that plugin you need to install it first. Log into Jenkins as an administrator and navigate to the "Manage Plugins" page.
![](/images/neodymium/jenkins_plugin_management.png)

Click then the "Available" tab, search for the "Allure Jenkins Plugin" and install it. Do the same for the "Xvfb plugin" if you want to run browser based tests on the machine that also hosts Jenkins.

![](/images/neodymium/jenkins_available_plugins.png)

After that you need to configure the new installed plugin(s).

**Important**: Allure plugin version is not matching the version of Allure Commandline tool that will be used to generate report after test. Beginning from Neodymium v5.0.0 the minimal version of Allure Commandline should be 2.27.0. Please, configure this version in the Manage Jenkins > Tools like on the image below:

![](/images/neodymium/allure-commandline-installations-jenkins.png)

**NOTE**: Since Xvfb is system specific we can not provide an installation guide for that.

![](/images/neodymium/jenkins_global_config_allure.png)

 by following these [instructions](https://docs.qameta.io/allure/#_jenkins).

After that you can add a post build action that will create the report. The plugin will access former builds in order to acquire the data that is necessary to create a trending graph like in the screenshot above.

## Web driver tests

There are different options to get web driver based tests running with Jenkins.

In order to get web driver based tests running with Jenkins, the build system needs either a (local) web driver and frame buffer setup in order to render a browser or your browser configuration needs to refer a [Selenium grid](Selenium-grid).
In that case the browser itself runs on a different host and will be remote controlled with Selenium.

### Local web driver

Web driver and browser can be installed on the Jenkins machine locally just like on any other machine that you use e.g. for tests development. Please read more about it [here]({{< ref "505-webdriver-setup" >}}).

**Note**: if you need your tests to be executed in non-headless mode, you will need the Xvfb plugin mentioned above. In case headless mode is enough for your purposes, this plugin is not required.

### Remote web driver

Selenium doesn't only work with local browsers it also is able to remote control a browser via web driver interface of the wire. In order to get that running read the
[Selenium grid](Selenium-grid)

### Docker image in Jenkins pipeline

In case your tests only use Chrome as a driver (remote Selenium grid is not taken in account as it doesn't require any driver or browser installed) you can use `markhobson/maven-chrome:jdk-17` docker image to execute the tests. Jenkins offers [Docker Pipeline](https://plugins.jenkins.io/docker-workflow/) plugin that can run all the job steps inside docker container and then map the results back to Jenkins workspace.

If you choose this option to configure your CI/CD with Jenkins, you will need to define the following pipeline:

```console
pipeline {
    agent any
    stages {
        stage('Build & Run Test') {
            agent {
                docker { image 'markhobson/maven-chrome:jdk-17' }
            }
            stages {
                stage('Checkout project') {
                    steps {
                        git branch: 'master',
                            credentialsId: 'github',
                            url: 'git@github.com:Xceptance/neodymium-template.git'
                    }
                }
                stage('execute tests') {
                    steps{
                       script {
                            try {
                                sh 'mvn clean test'
                                stash name: 'allure-results', includes: 'target/allure-results/*'
                                currentBuild.result = 'SUCCESS'
                            } catch (e) {
                                stash name: 'allure-results', includes: 'target/allure-results/*'
                                currentBuild.result = 'FAILED'
                                throw e
                            }
                       }
                    }
                }
            }
        }
    }
    post {
        always {
            unstash 'allure-results' //extract results
            script {
                allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'target/allure-results']]
            ])
            }
        }
    }
}

```

## Aborted Jenkins Jobs

When Jenkins Jobs are aborted, it sends a TERM signal so each process.
Unfortunately, Neodymium cannot properly kill remaining web drivers as well as open browsers.
This clean up has to be done manually.

If you have no parallel executions, you may use the following code to kill Firefox and Chrome instances as well as their corresponding web drivers:

```console
#!/bin/bash

function killWebDriversAndBrowser()
{
    # Kill Web Drivers
    ps --ppid=1 | awk '/(gecko|chrome)driver/ { print $1 }' | xargs kill -9

    # Kill Firefox
    pkill -9 -f -e firefox

    # Kill Chrome
    pkill -9 -f -e chrome
}

trap killWebDriversAndBrowser EXIT
```

Feel free to adapt the script to your web drivers as well as browsers.
