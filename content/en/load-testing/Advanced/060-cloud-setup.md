---
title: "Cloud Setup"

weight: 60
type: docs

description: >
  How to set up a cluster of test machines for load generation.
---

## Introduction

XLT enables you to develop and run test scenarios for your application on your own machine, however a load test requires a lot of virtual users executing these test scenarios at the same time, which is a task best solved with the help of a distributed load generation environment, i.e. a cluster of test machines that generate the load that you defined. XLT ships with tools to help you set up your cluster using Google Cloud or Amazon Web Services - and this page contains an overview of how to use them.

### How to run load tests using a distributed environment

The basic setup which you would use to run a load test using a distributed load generation environment looks like this:

{{% TODO %}}image{{% /TODO %}}

You have one machine running your [master controller](../../manual/010-basics/#mcmaster-controller), which manages several machines that are running the [agent controllers](../../manual/010-basics/#acagent-controller) and [agents](../../manual/010-basics/#agents). 

Xceptance offers public image templates for AWS machines, or a <a href="https://github.com/Xceptance/XLT-Packer" target="_blank">helpful tool</a> to build your own image templates both for GC and AWS machines. 

Also, XLT ships with two little scripts that simplify the process of setting up and managing load test instances, as you might need quite a lot of them to generate your target load: **[gce_admin](#google-cloud-gc)** (for Google Cloud) and **[ec2_admin](#amazon-web-services-aws)** (for Amazon Web Services). They will help you to set up a cluster of test machines quickly, which you then just have to put into the master controller configuration: navigate to `<XLT>/config/mastercontroller.properties` on your MC machine, then enter the AC data the tools give you when you list the created instances. Now you are ready for load testing!

{{% note title="How many machines do I need?" %}}
The number and size of load testing machines you'll need for your setup is largely a matter of experience. 

As for the number of machines, a good rule of thumb to start with is: 1 AC machine per 5k target pageviews/hour. 

As for RAM, we usually reserve 512 MB for the system, plus about 512 MB for the JVM plus the configured maximum heap size per agent process. So, for 4 agents per machine with each 0.5 GB heap size, we would roughly need 0.5 GB + 4 * (0.5 GB + 0.5 GB) = 4.5 GB of RAM.

Check the agents' CPU usage after your load test in the [test report](../../manual/320-test-evaluation/#agents) so you know whether any adjustments are necessary.
{{% /note %}}

After your test has finished and the MC machine has downloaded all the data necessary for generating a test report, gce_admin/ec2_admin can also help you to easily shut down and delete all of your test machines.

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

If you only have one project, `gcloud init` selects it for you.

In order to create application default credentials for use by **gce_admin**, run:
```dos
gcloud auth application-default login
```
In the browser, log in and accept the requested permissions.

### Image Templates for Google Cloud 

Right now there are no public gcloud images set up for using XLT, however you can build your own images using our public <a href="https://github.com/Xceptance/XLT-Packer" target="_blank">XLT-Packer project</a>. It contains a nice readme on how to use it to create images set up for running XLT for the cloud vendor of your choice.

### Setting up XLT's gce_admin tool

Before its first usage, the gce_admin tool needs to be configured. You can do this by editing `<XLT>/config/gce_admin.properties`. The most important property you need to set here is the **project id**, which should be the same project you set earlier in gcloud:

```bash
xlt.gce.projectId = my-project-1
```

To use the **gce_amin** tool to create, list and stop Google Cloud instances (which will run your [agent controllers](../../manual/010-basics/#acagent-controller) and [agents](../../manual/010-basics/#agents)), navigate to `<XLT>/bin/` and run:
```dos
./gce_admin.sh
```
(Windows users have to use the appropriate `.cmd` file located in the same directory.)

You will see a prompt like this:
```dos
What do you want to do?
 (l) List running instances
 (c) Create managed instance groups
 (d) Delete managed instance groups
 (q) Quit
=> 
```

### Creating GC instances

When starting GC instances ({{< kbd >}}c{{</ kbd >}}), you first have to choose one or more regions to run the machines from. To select several regions, just seperate them by space, comma or semicolon: 

```dos
Select one or more regions:
  (0) <all>
  (1) Asia Pacific  - Taiwan         (asia-east1)
  (2) Asia Pacific  - Hong Kong      (asia-east2)
  (3) Asia Pacific  - Tokyo          (asia-northeast1)
  (4) Asia Pacific  - Osaka          (asia-northeast2)
  (5) Asia Pacific  - Seoul          (asia-northeast3)
  (6) Asia Pacific  - Mumbai         (asia-south1)
  (7) Asia Pacific  - Singapore      (asia-southeast1)
  (8) Asia Pacific  - Jakarta        (asia-southeast2)
  (9) Asia Pacific  - Sydney         (australia-southeast1)
 (10) <unknown>     - <unknown>      (europe-central2)
 (11) Europe        - Finland        (europe-north1)
 (12) Europe        - Belgium        (europe-west1)
 (13) Europe        - London         (europe-west2)
 (14) Europe        - Frankfurt      (europe-west3)
 (15) Europe        - Netherlands    (europe-west4)
 (16) Europe        - Zurich         (europe-west6)
 (17) Canada        - Montréal       (northamerica-northeast1)
 (18) South America - Sao Paulo      (southamerica-east1)
 (19) US            - Iowa           (us-central1)
 (20) US            - South Carolina (us-east1)
 (21) US            - North Virginia (us-east4)
 (22) US            - Oregon         (us-west1)
 (23) US            - California     (us-west2)
 (24) US            - Utah           (us-west3)
 (25) US            - Nevada         (us-west4)
=> 19 20
```

After you specified the region(s), choose the template machine image to use from the list of available GC image templates (see above for how to set up images) by entering its id. You will then be prompted to enter the name of the instance group, which can contain lowercase letters and dashes. 

```dos
Enter the name of the instance group => my-test
```

Finally, you will be prompted to enter the number of instances to start. The entered number will be distributed as evenly as possible between the regions you selected, e.g. if you want to create 8 instances for 2 different regions, there will be 4 instances in each region. 

**gce_admin** will summarize the chosen options for you to verify them before actually starting the instances:

```dos
  Regions             : us-central1, us-east1
  Instance group name : my-test
  Instance count      : 8
  Instance template     
     - Name           : xlt-5-3-0--xl
     - Image          : projects/my-project1/global/images/xlt-5-3-0-v20210221
     - Machine type   : custom-16-30720

Do you want to create a managed instance group with the above configuration? [y/n] => 
```

### Listing Running GC instances

To list running GC instances ({{< kbd >}}l{{</ kbd >}}), you first have to choose one or more regions from which to list machines. To select several regions, just seperate them by space, comma or semicolon. You will then be prompted to select a filter:

```dos
Filter instances by:
 (0) (No filter)
 (l) Name label
 (g) Instance group
=> 
```

Pick {{< kbd >}}g{{</ kbd >}}, then **gce_admin** will query all instance groups. If any instance group was found, you will be prompted again to pick one, several or all instance groups to list. **gce_admin** will then show you the results:

```dos
--- Master controller configuration ---
com.xceptance.xlt.mastercontroller.agentcontrollers.ac001_us-central1-b.url = https://35.255.200.18:8500
com.xceptance.xlt.mastercontroller.agentcontrollers.ac002_us-central1-a.url = https://35.255.200.16:8500
com.xceptance.xlt.mastercontroller.agentcontrollers.ac003_us-central1-c.url = https://35.255.200.11:8500
com.xceptance.xlt.mastercontroller.agentcontrollers.ac004_us-central1-d.url = https://35.255.200.14:8500
com.xceptance.xlt.mastercontroller.agentcontrollers.ac005_us-east1-b.url = https://35.255.200.17:8500
com.xceptance.xlt.mastercontroller.agentcontrollers.ac006_us-east1-d.url = https://35.255.200.15:8500
com.xceptance.xlt.mastercontroller.agentcontrollers.ac007_us-east1-c.url = https://35.255.200.12:8500
com.xceptance.xlt.mastercontroller.agentcontrollers.ac008_us-east1-a.url = https://35.255.200.13:8500
```

You can just copy and paste the tool's output to your `mastercontroller.properties` to configure your environment, then you're ready for load testing.

### Deleting GC instances

To terminate GC instances ({{< kbd >}}d{{</ kbd >}}), you also first have to choose one or more regions from which to delete machines. **gce_admin** will then search for managed instance groups in these regions and prompt you which instance group you want to delete (you can also choose several or all). It will summarize the chosen options for you to verify them before actually deleting any instances:

```dos
Retrieving all managed instance groups in region 'us-central1' ... OK

Select one or more instance groups:
 (0) <all>
 (1) my-project-ac-us-central1
=> 1


You selected to terminate *all* managed instances of group 'my-project-ac-us-central1'

  in region: us-central1 ... OK

    4 running and 0 pending instance(s) found.
    --------------------------------------------------------------------------------------------------------------
               Name                |      Host     |      Type       |  State  | Launch Time (UTC) | Uptime (h:mm)
    --------------------------------------------------------------------------------------------------------------
    my-project-ac-us-central1-6ncn | 35.255.200.18 | custom-16-30720 | RUNNING |  2021-01-01 01:01 |         02:51
    my-project-ac-us-central1-78rr | 35.255.200.16 | custom-16-30720 | RUNNING |  2021-01-01 01:01 |         02:51
    my-project-ac-us-central1-7ph9 | 35.255.200.11 | custom-16-30720 | RUNNING |  2021-01-01 01:01 |         02:51
    my-project-ac-us-central1-8sf2 | 35.255.200.14 | custom-16-30720 | RUNNING |  2021-01-01 01:01 |         02:51
    --------------------------------------------------------------------------------------------------------------


Are you sure? [y/n] =>
```

## Amazon Web Services (AWS)

The Amazon Elastic Compute Cloud service is another perfect fit for on-demand load testing. XLT agents can easily be run from EC2 instances. But without a helpful tool, configuring the master controller to use the new agents can be a tedious job, especially if many agent machines are involved, as it includes to manually get the current IP address of each machine and create a corresponding line in the mastercontroller’s configuration. XLT ships with a simple command-line tool that simplifies the handling of Amazon EC2 instances in general: the **ec2_admin**. It provides the following functionality:

-   start new instances (with only a few options)
-   stop running instances
-   list running instances (and print a corresponding agent controller configuration ready to be pasted into `mastercontroller.properties`)

Note that this tool is not intended to replace the <a href="http://aws.amazon.com/" target="_blank">AWS console</a> or similar tools.

### Image Templates for AWS 

Xceptance provides AMIs (Amazon Machine Images) for use with Amazon EC2. These AMIs are pre-packaged systems, which are optimized for load testing and have XLT already installed. Using one of these AMIs may save you the work to create and maintain your own AMIs, but may also impose additional costs. Amazon will charge you for the infrastructure usage. Make sure that your security group permits communication on port 8500. This is the XLT agent port on these machines. A list of current AWS AMI ids can be found next to the release information on <a href="https://github.com/Xceptance/XLT/releases" target="_blank">GitHub</a>.

In addition to that, you can also build your own images using our public <a href="https://github.com/Xceptance/XLT-Packer" target="_blank">XLT-Packer project</a>. It contains a nice readme on how to use it to create images set up for running XLT for the cloud vendor of your choice.

### Setting up XLT's ec2_admin tool

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

To run the tool, call one of the two scripts `<xlt>/bin/ec2_admin.sh` or `<xlt>\bin\ec2_admin.cmd` depending on your OS choice. The tool will guide you through the available operations via a menu-based UI. Keep in mind that you can easily run XLT in a heterogeneous environment and control Linux based agents from a Microsoft Windows environment. 

{{% note notitle %}}
Note that when creating AWS instances from AMIs you will see your own AMIs to choose from, but you may also see public AMIs provided by Xceptance. These AMIs are pre-packaged systems, which are optimized for load testing and have XLT already installed. Using one of these AMIs may save you the work to create and maintain your own AMIs, but may also impose additional costs. See the AMI’s description for more details.
{{% /note %}}

{{% warning notitle %}}
When using the new EC2 management UI for XLT, please be aware of the fact that XLT, when using the stop command, does not distinguish between instances it started and instances you have started manually. For fine-grained control, we recommend the <a href="http://aws.amazon.com/" target="_blank">AWS Management Console</a>.
{{% /warning %}}

### Running AWS Instances

When starting new AWS machine instances via `ec2_admin` ({{< kbd >}}r{{</ kbd >}}), you first have to choose a region to run the machines from, and an availability zone for this region (optional). {{< TODO >}}what for? What is it? What does it do?{{< /TODO >}}

The `ec2_admin` needs to specify a *sub-net* when starting machine instances, because VPN instances require such a sub-net. `ec2_admin` checks if there are multiple VPCs/subnets in the target region/availability zone and, if so, prompts the user to select the desired one. Otherwise it will chose the default sub-net. 

{{% note notitle %}}Note that choosing VPC and subnet is currently supported in interactive mode only. There is no command line option for this purpose yet.{{% /note %}}

{{< TODO >}}subnet behavior default? is this correct? and when does the prompt show up?{{< /TODO >}}

After that, you have to choose the machine image (AMI) to use from the list of available AMIs. In this list, `ec2_admin` will display the AMI’s name tag (or, if no name tag is present, fall back to its description).

You will then be prompted to pick an instance type. The list contains all necessary info, including available memory and costs:

```dos
Select the instance type to use for the new EC2 instances:
  (1) m5.large    -   2 core(s),        10 compute units,     8 GB RAM,       EBS Only, $0.096/h
  (2) m5.xlarge   -   4 core(s),        15 compute units,    16 GB RAM,       EBS Only, $0.192/h
  (3) m5.2xlarge  -   8 core(s),        31 compute units,    32 GB RAM,       EBS Only, $0.384/h
  (4) m5.4xlarge  -  16 core(s),        61 compute units,    64 GB RAM,       EBS Only, $0.768/h
  (5) m4.large    -   2 core(s),       6.5 compute units,     8 GB RAM,       EBS Only, $0.1/h
  (6) m4.xlarge   -   4 core(s),        13 compute units,    16 GB RAM,       EBS Only, $0.2/h
  (7) m4.2xlarge  -   8 core(s),        26 compute units,    32 GB RAM,       EBS Only, $0.4/h
  (8) m4.4xlarge  -  16 core(s),      53.5 compute units,    64 GB RAM,       EBS Only, $0.8/h
  (9) c5.large    -   2 core(s),         8 compute units,     4 GB RAM,       EBS Only, $0.085/h
 (10) c5.xlarge   -   4 core(s),        16 compute units,     8 GB RAM,       EBS Only, $0.17/h
 (11) c5.2xlarge  -   8 core(s),        31 compute units,    16 GB RAM,       EBS Only, $0.34/h
 (12) c5.4xlarge  -  16 core(s),        62 compute units,    32 GB RAM,       EBS Only, $0.68/h
 (13) c5.9xlarge  -  36 core(s),       139 compute units,    72 GB RAM,       EBS Only, $1.53/h
 (14) c5.18xlarge -  72 core(s),       278 compute units,   144 GB RAM,       EBS Only, $3.06/h
 (15) c4.large    -   2 core(s),         8 compute units,  3.75 GB RAM,       EBS Only, $0.1/h
 (16) c4.xlarge   -   4 core(s),        16 compute units,   7.5 GB RAM,       EBS Only, $0.199/h
 (17) c4.2xlarge  -   8 core(s),        31 compute units,    15 GB RAM,       EBS Only, $0.398/h
 (18) c4.4xlarge  -  16 core(s),        62 compute units,    30 GB RAM,       EBS Only, $0.796/h
 (19) c4.8xlarge  -  36 core(s),       132 compute units,    60 GB RAM,       EBS Only, $1.591/h
 (20) r4.large    -   2 core(s),         7 compute units, 15.25 GB RAM,       EBS Only, $0.133/h
 (21) r4.xlarge   -   4 core(s),      13.5 compute units,  30.5 GB RAM,       EBS Only, $0.266/h
 (22) r4.2xlarge  -   8 core(s),        27 compute units,    61 GB RAM,       EBS Only, $0.532/h
 (23) r4.4xlarge  -  16 core(s),        53 compute units,   122 GB RAM,       EBS Only, $1.064/h
=>
```

`ec2_admin` will ask you how many instances you want to start, and lets you set an instance name. {{< TODO >}}Is this a template? Or how is one name used for several instances? What about naming conventions? None?{{< /TODO >}} You can pick an agent controller password and enter host data. {{< TODO >}}What for?{{< /TODO >}}

In order to be able to log on an EC2 machine, a key pair must have been assigned to the machine during startup. `ec2_admin` provides this feature when starting machines. The key pair to use for a
certain AWS region can be configured in the properties, but can also be specified on the
command line. Otherwise `ec2_admin` will prompt you to pick one.

{{< TODO comment="example code" >}}How? And is this correct? Where is the list of available key-pairs in the prompt coming from?{{< /TODO >}}

`ec2_admin` then summarizes the chosen options for you to verify them before actually starting the instances:

```dos
Configuration:  
  AMI               : ami-93b1afff - Xceptance XLT 4.6.0 - BETA - 2016/01/14, Java 8, Ubuntu 14.04, 64bit, IPv6, CP  
  Region            : eu-central-1  
  Availability zone : <unspecified>  
  VPC               : 
  Subnet            : 
  Type              : c3.2xlarge  
  Count             : 5  
  Name              : LPT  
  Key-pair          : xc-eu-central-1  
  Password          : <none>
  Host data         : 

Do you want to run the instance(s) with the above configuration? [y/n] =>
```

{{< TODO comment="empty fields are copied from current config/XLT5.2.0" >}}valid config with all fields{{< /TODO >}}

#### Passing User Data When Starting Instances

In case your AWS EC2 instances need some custom configuration data (*user data*, in Amazon speak), you can also specify this data during startup. There are three supported alternatives to pass the user data:

1.  Store the user data to a file and pass its name as a command line argument (`-uf <file>`).
2.  Pass the data as a command line argument (`-u "..."`). 
3.  When prompted by `ec2_admin`, enter the user data.

Choose the approach that suits you best; however, the first approach will be the one to use in most cases.

{{< TODO >}}Is this still valid? = host data?{{< /TODO >}}

### Listing Running AWS Instances

`ec2_admin` can list the agent controller URLs for all/selected AWS instances ({{< kbd >}}l{{</ kbd >}}). However, instances may not always have a public host name assigned. In that case the public IP address will be used as a fallback.

You will be prompted to select a region. 

#### Selecting EC2 Instances by Tag

After that, you may filter instances by one or more _tags_: AWS (Amazon Web Services) offers the possibility to tag EC2 resources to simplify the administration of your cloud infrastructure. As a form of meta data, tags can be used to create user-friendly names and improve coordination between multiple users.

`ec2_admin` lets you select your EC2 resources based on the tag name. For example, when listing running instances, you can use filtering to reduce the set of instances shown:

```dos
Filter instances by one or more tags:  
(0) <none>  
(1) Name=CustomerA  
(2) Name=CustomerB  
(3) Type=WebServer  
(4) Type=AppServer  
=> 2 4
```

When starting Amazon EC2 machine instances, you can also specify a name tag that will be assigned to each instance that has been started. This name tag can be used later on to filter the running instances, for example when listing or terminating them. {{< TODO >}}Can I do this by ec2_admin? Is this the instance name?{{< /TODO >}}

The tool will then output a master controller configuration for the chosen set of AWS machines:

```dos
Querying all instances in region 'ap-southeast-2' ... OK.
Querying all instances in region 'us-east-1' ... OK.

2 running and 0 pending instance(s) found.

--- Master controller configuration ---
com.xceptance.xlt.mastercontroller.agentcontrollers.ac001_ap-southeast-2.url = https://52.62.14.48:8500  
com.xceptance.xlt.mastercontroller.agentcontrollers.ac002_us-east-1.url = https://54.82.197.127:8500
```

The generated agent controller names will also contain the region in which the respective machine is running. If your load test is driven from multiple locations in the world, this way it is much easier to tell which agent controller runs in which AWS region.

#### More Details about Running Instances

If you choose menu option {{< kbd >}}d{{</ kbd >}} instead of {{< kbd >}}l{{</ kbd >}}, `ec2_admin` will give you the same filtering options as above, but as a result prints more details about running or pending machine instances, like this:

```dos
Querying *all* instances in region: eu-west-2 ... OK

    1 running, 0 pending and 0 stopped instance(s) found.
    ------------------------------------------------------------------------------------------------------------------------
    Name  |     Host      |   Type   | Key-Pair Name | Security Groups | Image |  State  | Launch Time (UTC) | Uptime (h:mm)
    ------------------------------------------------------------------------------------------------------------------------
    Test1 | 35.177.98.135 | t2.micro | xc-eu-west-2  | default         | Proxy | running |  2020-01-01 13:11 |    111d 02:13
    ------------------------------------------------------------------------------------------------------------------------

```

### Terminating AWS Instances

To terminate AWS instances by `ec2_admin` ({{< kbd >}}t{{</ kbd >}}), you will be prompted to select a region and filters as [above](#listing-running-aws-instances). 

This way, running machine instances with the same name tag assigned can be terminated all at once, even across regions. This saves you going through each region separately. Simply specify multiple regions separated by comma when prompted.

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