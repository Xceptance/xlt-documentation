---
title: "Cloud Setup"

weight: 60
type: docs

description: >
  How to set up a cluster of test machines for load generation.
---

## Google Cloud (GC)

### Setting up gcloud

To start using XLT's **gce_admin** tool for setting up and managing load test instances, you first need to set up your machine to use Google's **gcloud command line tool**. In order to do this, download and install the Cloud SDK for your platform, following the directions <a href="https://cloud.google.com/sdk/docs/downloads-interactive" target="_blank">from Google</a>. 

Add the Cloud SDK command-line tools to your PATH and enable command completion if you want to. In any case, restart your shell after the installation and run `gcloud init` to initialize the gcloud environment. This will prompt you to log in using your Google user account - log in (in your browser) and click _Allow_ to grant permission to access Google Cloud resources.

At the command prompt, select a Google Cloud project from the list of those where you have _Owner_, _Editor_ or _Viewer_ permissions:

```dos
Pick cloud project to use:
 [1] [my-project-1]
 [2] [my-project-2]
 ...
 Please enter your numeric choice:
```

If you only have one project, gcloud init selects it for you.

In order to create application default credentials for use by **gce_admin**, run:
```dos
gcloud auth application-default login
```
In the browser, log in and accept the requested permissions.

### Using XLT's gce_admin tool

Before its first usage, the gce_admin tool needs to be configured. You can do this by editing `<XLT>/config/gce_admin.properties`. The most important property you need to set here is the project id, which should be the same project you set earlier in **gcloud**:

```bash
xlt.gce.projectId = my-project-1
```


{{< TODO comment="available google instances with XLT? since when is there a gce_admin? how are customers supposed to use it?" >}}TBD{{< /TODO >}}

## Amazon Web Services (AWS)

The Amazon Elastic Compute Cloud service is another perfect fit for on-demand load testing. XLT agents can easily be run from EC2 instances. But without a helpful tool, configuring the master controller to use the new agents can be a tedious job, especially if many agent machines are involved, as it includes to manually get the current IP address of each machine and create a corresponding line in the mastercontroller’s configuration. XLT ships with a simple command-line tool that simplifies the handling of Amazon EC2 instances in general: the **ec2_admin**. It provides the following functionality:

-   start new instances (with only a few options)
-   stop running instances
-   list running instances (and print a corresponding agent controller configuration ready to be pasted into `mastercontroller.properties`)

Note that this tool is not intended to replace the <a href="http://aws.amazon.com/" target="_blank">AWS console</a> or similar tools.

Before you can use the tool, you have to configure it appropriately. There is a new configuration file: `<xlt>/config/ec2_admin.properties`. The most important settings are your AWS credentials. These are needed to authorize any AWS operation, which is executed on your behalf.

```bash
## Your AWS credentials.  
aws.accessKey = <enter your access key>  
aws.secretKey = <enter your secret key>

## The protocol to use (defaults to https).  
#aws.protocol = https

## HTTP proxy settings.  
#aws.proxy.host = localhost  
#aws.proxy.port = 8888  
#aws.proxy.userName =  
#aws.proxy.password =
```

You may also configure a proxy if one is required to be used in your environment.

To run the tool, call one of the two scripts `<xlt>/bin/ec2_admin.sh` or `<xlt>\bin\ec2_admin.cmd` depending on your OS choice. The tool will guide you through the available operations via a menu-based UI. Keep in mind, that you can easily run XLT in a heterogeneous environment and control Linux based agents from a Microsoft Windows environment. 

{{% note notitle %}}
Note that when creating AWS instances from AMIs you will see your own AMIs to choose from, but you may also see public AMIs provided by Xceptance. These AMIs are pre-packaged systems, which are optimized for load testing and have XLT already installed. Using one of these AMIs may save you the work to create and maintain your own AMIs, but may also impose additional costs. See the AMI’s description for more details.
{{% /note %}}

{{% warning notitle %}}
When using the new EC2 management UI for XLT, please be aware of the fact, that XLT does not distinguish between instances it started and instance you have started manually when using the stop command. For fine-grained control, we recommend the <a href="http://aws.amazon.com/" target="_blank">AWS Management Console</a>.
{{% /warning %}}

{{< TODO comment="available EC2 instances with XLT" >}}TBD{{< /TODO >}}