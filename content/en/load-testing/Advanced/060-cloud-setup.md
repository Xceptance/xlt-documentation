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

Before you can use the tool, you have to configure it appropriately. There is a configuration file for this: `<xlt>/config/ec2_admin.properties`. The most important settings are your AWS credentials. These are needed to authorize any AWS operation, which is executed on your behalf.

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

### Starting AWS Instances

{{< TODO comment="available EC2 instances with XLT" >}}TBD{{< /TODO >}}

When starting new AWS machine instances via `ec2_admin`, you have to choose the machine image (AMI) to use from the list of available AMIs. In this list, `ec2_admin` will display the AMI’s name tag (or, if no name tag is present, fall back to its description).


The `ec2_admin` needs to specify a *sub-net* when starting machine instances, because VPN instances require such a sub-net. In older versions it chose the default sub-net, or the first sub-net found if no default is defined (which was the case for “older” AWS regions). In more complex environments with multiple VPCs, each having a default and multiple non-default subnets per availability zone, this approach may easily lead to unexpected results. That's why `ec2_admin` checks if there are multiple VPCs/subnets in the target region/availability zone and, if so, prompts the user to select the desired one.

{{% note notitle %}}Note that choosing VPC and subnet is currently supported in interactive mode only. There is no command line option for this purpose yet.{{% /note %}}

{{< TODO comment="subnet behavior default? is this correct?" >}}TBD{{< /TODO >}}


`ec2_admin` then summarizes the chosen options for you to verify them before actually starting the instances:

```dos
Configuration:  
  AMI               : ami-93b1afff - Xceptance XLT 4.6.0 - BETA - 2016/01/14, Java 8, Ubuntu 14.04, 64bit, IPv6, CP  
  Region            : eu-central-1  
  Availability zone : <unspecified>  
  Type              : c3.2xlarge  
  Count             : 5  
  Name              : LPT  
  Key-pair          : xc-eu-central-1  
  User data         : <none>

Do you want to run the instance(s) with the above configuration? [y/n] =\>
```

#### Assigning a Key Pair 

In order to be able to log on an EC2 machine, a key pair must have been assigned to the machine during startup. `ec2_admin` provides this feature when starting machines. The key pair to use for a
certain AWS region can be configured in the properties, but can also be specified on the
command line.

{{< TODO comment="example code" >}}How?{{< /TODO >}}

#### Passing User Data When Starting Instances

In case your AWS EC2 instances need some custom configuration data (*user data*, in Amazon speak), you can also specify this data during startup. There are three supported alternatives to pass the user data:

1.  Store the user data to a file and pass its name as a command line argument (`-uf <file>`).
2.  Pass the data as a command line argument (`-u "..."`). 
3.  When prompted by `ec2_admin`, enter the user data.

Choose the approach that suits you best; however, the first approach will be the one to use in most cases.

### Listing Running Instances

`ec2_admin` can list the agent controller URLs for all/selected AWS instances. However, instances may not always have a public host name assigned. In that case the public IP address will be used as a fallback.

In the output of the corresponding master controller configuration for a set of AWS machines, the generated agent controller names will also contain the region in which the respective machine
is running:

```dos
com.xceptance.xlt.mastercontroller.agentcontrollers.ac001_ap-southeast-2.url = https://52.62.14.48:8500  
com.xceptance.xlt.mastercontroller.agentcontrollers.ac002_us-east-1.url = https://54.82.197.127:8500
```

If your load test is driven from multiple locations in the world, this way it is much easier to tell which agent controller runs in which AWS region.



The menu option **(d)** allows you to print more details about running or pending machine instances.

#### Selecting/listing EC2 instances by tag

AWS (Amazon Web Services) offers the possibility to tag EC2 resources to simplify the administration of your cloud infrastructure. As a form of meta data, tags can be used to create user-friendly names and improve coordination between multiple users.

The XLT EC2 administration tool `ec2_admin` features an additional menu which lets you select your EC2 resources based on the tag name. For example, when listing running instances, you can use filtering to reduce the set of instances shown:

```dos
Filter instances by one or more tags:  
(0) <none>  
(1) Name=CustomerA  
(2) Name=CustomerB  
(3) Type=WebServer  
(4) Type=AppServer  
=> 2 4
```

When starting Amazon EC2 machine instances, you can also specify a name tag that will be assigned to each instance that has been started. This name tag can be used later on to filter the running instances, for example when listing or terminating them.

### Terminating AWS Instances

Running machine instances with the same name tag assigned can be terminated all at once, even across regions. This saves you going through each region separately. Simply specify multiple regions separated by comma when prompted.


When terminating machine instances, all instances matching your choice will be listed for review before they are actually terminated. This helps to avoid terminating the wrong instances by accident.

```bash
Filter instances by one or more tags:
 (0) Do not filter (select all)
 (1) Name=LoadTest_1
 (2) Name=LoadTest_2
=> 1

You selected to terminate instances tagged with:  Name=LoadTest_1

  in region: eu-west-2 ... OK

    2 running and 0 pending instance(s) found.
    ---------------------------------------------------------------------------
       Name    |      Host      |    Type    |    Start Time    | Uptime (h:mm)
    ---------------------------------------------------------------------------
    LoadTest_1 | xx.xxx.xxx.xxx | c4.2xlarge | 2017-05-02 13:55 |          0:05
    LoadTest_1 | yy.yyy.y.yyy   | c4.2xlarge | 2017-05-02 13:55 |          0:05
    ---------------------------------------------------------------------------

Are you sure? [y/n] =>
```


{{< TODO >}}TBD{{< /TODO >}}

### Non-Interactive Mode

The `ec2_admin` tool can also be used in scripted processes, making it possible to fully automate the starting and stopping of Amazon machines. It offers a non-interactive mode where all required parameters have to be passed on to the tool’s command line. This allows you to automate the management of Amazon machines.

-   To start machines:
    `ec2_admin.sh   run   <region>   <instance-type>   <ami-id>   <instance-count>   <tag>`
-   To stop machines: `ec2_admin.sh   terminate   <region>   <tag>`

But starting and stopping machines is only half the story. The master controller also needs to know about the freshly started agent machines so it can use them for a load test. To this end, `ec2_admin` emits the corresponding agent machine configuration right after the machines were started. By default, it prints this configuration to the console. Alternatively, the configuration can also be written to a certain file via the `-o` option. We recommend the latter approach since the master
controller can read the agent configuration directly from this file later on.

For a fully automated load testing process with Amazon machines, use a sequence of commands (in a script) similar to the following one:

```bash
ec2_admin.sh run eu-central-1 c3.2xlarge ami-de5dcdb6 5 Posters -o agents.properties  
mastercontroller.sh -auto -report -pf agents.properties  
ec2_admin.sh terminate eu-central-1 Posters
```

Note how `ec2_admin` writes the agent machine configuration to the file `agents.properties` which in turn is passed on to the master controller as input. Be aware, though, that it may take a while until the agent controllers are up and running on the freshly started machines. To stop the master controller from complaining too early about unreachable agent controllers, you should configure an appropriate waiting time in `mastercontroller.properties`, one minute, for example:

```bash
com.xceptance.xlt.mastercontroller.initialResponseTimeout = 60000
```



{{< TODO comment="non-interactive mode" >}}TBD{{< /TODO >}}