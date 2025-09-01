---
title: "Cloud Setup"

weight: 60
type: docs

description: >
  Learn how to set up a cluster of test machines in the cloud for load generation.
---

## Introduction

XLT enables you to develop and run test scenarios from your own machine. However, load testing often requires a lot of virtual users executing the test scenarios at the same time. Therefore, we recommend using a cluster of test machines, which can provide more hardware and bandwidth than a single machine. XLT includes tools to set up your own cluster using Google Cloud or Amazon Web Services. 

This page provides an overview of how to use them, potential caveats, and enhances the general understanding of cloud-based testing.

### Running Load Tests Using a Distributed Environment

A possible setup for running a load test using a distributed load generation environment looks like this:

{{< image src="user-manual/cloud_setup.svg" >}}
Distributed Load Generation Environment
{{< /image >}}

One machine runs your [master controller]({{< relref "../manual/010-basics#mcmaster-controller" >}}), which controls several machines running the [agent controllers]({{< relref "../manual/010-basics#acagent-controller" >}}) and [agents]({{< relref "../manual/010-basics#agents" >}}). 

#### XLT Images 

Xceptance provides ready-to-use **public XLT images** for AWS machines (AMIs) and Docker. These images are based on Debian, include the latest XLT and JDK (see release notes for current version information), and are tuned for load testing. For real-browser load testing, they also include the latest Chromium and Firefox (ESR) browsers with matching web driver binaries: `chromedriver` and `geckodriver`.

If you are looking for XLT images for other clouds or want to build your own image, visit XLT's sister project: **[XLT Packer](https://github.com/Xceptance/XLT-Packer/)**. This project contains scripts to install and set up the contents of an XLT image and provides Packer templates to create such images for the following clouds:

* AWS
* DigitalOcean
* Google
* Hetzner

Follow the instructions in the project's README file to create an XLT image for one of the supported clouds.

#### Setting Up and Managing Load Test Instances

XLT ships with two small scripts that simplify the process of **setting up** and **managing** load test instances: **[gce_admin]({{< relref "#google-cloud-gc" >}})** (for Google Cloud) and **[ec2_admin]({{< relref "#amazon-web-services-aws" >}})** (for Amazon Web Services).

The scripts quickly set up a cluster of test machines. After the setup, **add the machines to the master controller configuration**: navigate to `<XLT>/config/mastercontroller.properties` on your MC machine, then enter the AC data provided by the tools when listing the created instances. You are now ready for load testing.

{{% note title="How many machines do I need?" %}}
It can be hard to determine the number and size of load testing machines you'll need for your setup. Here's [a small guide about test sizing]({{< relref "../how-tos/test-sizing" >}}).
{{% /note %}}

After your test has finished and the master controller has downloaded all the data required for report generation, gce_admin/ec2_admin can also help you easily **terminate** all your test machines.

## Google Cloud (GCP)

### Setting up Google Cloud Access

To use the XLT **gce_admin** tool to manage load test machines, you first need to set up GCP access using Google's **gcloud command-line tool**. To do this, download and install the Google Cloud SDK for your platform. Follow the directions to [set up the SDK](https://cloud.google.com/sdk/docs/downloads-interactive). 

Add the Cloud SDK command line tools to your PATH and enable command completion if desired. In any case, restart your shell after installation and run `gcloud init` to initialize the gcloud environment. This will prompt you to log in using your Google user account. Log in (in your browser) and click _Allow_ to grant permission to access Google Cloud resources.

At the command prompt, select a Google Cloud project from the list where you have _Owner_, _Editor_, or _Viewer_ permissions:

```text
Pick cloud project to use:
 [1] [my-project-1]
 [2] [my-project-2]
 ...
 Please enter your numeric choice:
```

If you only have one project, `gcloud init` selects it for you. If you cannot see your project, ensure you have the appropriate permissions.

To create application default credentials for use by **gce_admin**, run:

```bash
$ gcloud auth application-default login
```
In the browser, log in and accept the requested permissions.

### Image Templates for Google Cloud 

Currently, no public XLT gcloud images are provided; however, you can build your own images using our public [XLT-Packer project](https://github.com/Xceptance/XLT-Packer). It contains a README explaining how to use it to create images for the cloud vendor of your choice.

### Setting up gce_admin

Before its first use, the gce_admin tool needs to be configured. You can do this by editing `<XLT>/config/gce_admin.properties`. The most important property you need to set here is the **project id**, which should be the same project you set earlier in gcloud:

```text
xlt.gce.projectId = my-project-1
```

To use the **gce_admin** tool to create, list, and stop Google Cloud instances (which will run your [agent controllers]({{< relref "../manual/010-basics#acagent-controller" >}}) and [agents]({{< relref "../manual/010-basics#agents" >}})), navigate to `<XLT>/bin/` and run:

```bash
$ ./gce_admin.sh
```
You will see a prompt like this:

```text
What do you want to do?
 (l) List running instances
 (c) Create managed instance groups
 (d) Delete managed instance groups
 (q) Quit
=> 
```

### Creating GCP Instances

When starting GCP instances ({{< kbd >}}c{{</ kbd >}}), you first select one or more regions to run the machines in. To select multiple regions at once, separate your input by spaces, commas, or semicolons: 

```text
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

{{%note title="Unknown Locations"%}}
If you see **unknown** as the location, XLT has not yet learned this newly added region. Ensure you check for an XLT update. You can most likely use this location already. Check the zone name (such as `europe-central2`) and look it up in the official GCP documentation to learn more about it.
{{%/note%}}

After specifying the region(s), choose the template to use from the list of available GCP image templates (see above for how to set up images) by entering its ID. You will be prompted to enter the instance group name, which must only contain lowercase letters and dashes. 

```text
Enter the name of the instance group => my-test
```

Finally, you will be prompted to enter the number of instances to start. The number of instances will be distributed as evenly as possible across the previously selected regions. For example, if you selected two regions and entered 8 as the instance count, gce_admin will create four instances per region.

**gce_admin** will summarize the selected options and parameters for verification before starting the instances:

```text
Regions             : us-central1, us-east1
Instance group name : my-test
Instance count      : 8
Instance template     
    - Name           : xlt-5-3-0--xl
    - Image          : projects/my-project1/global/images/xlt-5-3-0-v20210221
    - Machine type   : custom-16-30720

Do you want to create a managed instance group with the above configuration? [y/n] => 
```

### Listing Running GCP instances

To get a list of running GCP instances ({{< kbd >}}l{{</ kbd >}}), first select one or more regions. To select multiple regions, separate them by spaces, commas, or semicolons. You will then be prompted to select a filter to refine the selection of machines to display.

```text
Filter instances by:
 (0) (No filter)
 (l) Name label
 (g) Instance group
=> 
```

Select {{< kbd >}}g{{</ kbd >}}, and **gce_admin** will search for instance groups. If instance groups are found, you will be prompted to pick one, multiple, or all instance groups. **gce_admin** will then show you the machine list in a ready to use property format.

```text
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

You can copy and paste the output and add it to your `mastercontroller.properties` file to configure the machines for load testing. Ensure that you remove or overwrite machines from previous tests. If you want to add more machines to an existing list, ensure that the property names differ. 

### Terminating GCP Instances

To terminate GCP instances ({{< kbd >}}d{{</ kbd >}}), choose one or more regions for which to delete machines. **gce_admin** will then search for managed instance groups in these regions and prompt for a selection. It will summarize the selected options before deleting any instances:

```text
Retrieving all managed instance groups in region 'us-central1' ... OK

Select one or more instance groups:
 (0) <all>
 (1) my-project-ac-us-central1
=> 1

You selected to terminate *all* managed instances of group 'my-project-ac-us-central1'
in region: us-central1 ... 

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

The Amazon Elastic Compute Cloud service is another excellent fit for on-demand load testing. XLT tests can easily be run from EC2 instances. However, without a helpful tool, starting and stopping multiple machines and configuring master controller properties is a lot of work. XLT comes with a simple command line tool that simplifies the handling of Amazon EC2 instances: the **ec2_admin**. It provides the following functionality:

-   start new instances
-   stop running instances
-   list running instances (and print a corresponding agent controller configuration ready to be pasted into `mastercontroller.properties`)

Note that this tool is not intended to replace the [AWS console](http://aws.amazon.com/) or similar tools.

### AMIs for AWS 

Xceptance provides ready-to-go AMIs (Amazon Machine Images) with XLT. These AMIs are pre-packaged systems optimized for load testing with XLT already installed. For real browser load testing, they also include the latest Chromium and Firefox (ESR) browsers with matching web driver binaries, `chromedriver` and `geckodriver`.

Using one of these AMIs may save you the work of creating and maintaining your own AMIs. There is no additional cost for the image, but Amazon will charge you for infrastructure usage. Ensure that your security group permits communication on port 8500. This is the XLT agent port on these machines. A list of current AWS AMI IDs can be found next to the release information on [Github](https://github.com/Xceptance/XLT/releases).

{{%warning title="Older AMIs"%}}
Usually, the last major and minor versions of XLT AMIs are provided by Xceptance. There is no guarantee that older versions will be kept available. Ensure you either have your own AMIs set up or upgrade to a more current one frequently.
{{%/warning%}}

### Setting up ec2_admin

Before you can use the tool, you must **configure** it appropriately. There is a configuration file for this: `<xlt>/config/ec2_admin.properties`. 

The most important settings are your _AWS credentials_. These are needed to authorize AWS operations executed on your behalf. You can configure your credentials directly in `ec2_admin.properties` or store them in other formats supported by the AWS CLI (e.g., as environment variables or in a credential file). You can use long-term credentials (access key and secret key) or temporary credentials (access key, secret key, and session token).

Additionally, it is possible to configure the names of the _AWS key pair_ used for each region in the properties; if none is defined, the tool will also prompt you for a key pair to use during instance setup.

You may also configure a _proxy_ if one is required in your environment.

```text
## Your AWS credentials.  
aws.accessKey = <enter your access key>  
aws.secretKey = <enter your secret key>
aws.sessionToken = <enter your session token>

## The AWS key pair names (as listed in AWS console / EC2 / KeyPairs)
#aws.keypair.eu-central-1 = 
aws.keypair.us-east-1 = key-us-east-1

## HTTP proxy settings. The protocol setting currently only supports "http".
#aws.proxy.protocol = http
#aws.proxy.host = localhost  
#aws.proxy.port = 8888  
#aws.proxy.userName =  
#aws.proxy.password =
```

To **run the tool**, call one of the two scripts, `<xlt>/bin/ec2_admin.sh` or `<xlt>\bin\ec2_admin.cmd`, depending on your OS choice. The tool will guide you through the available operations via a menu-based UI. Keep in mind that you can easily run XLT in a heterogeneous environment and control Linux-based agents from a Microsoft Windows environment. 

{{% note notitle %}}
Note that when creating AWS instances from AMIs, you will see your own AMIs to choose from, but you may also see public AMIs provided by Xceptance. These AMIs are pre-packaged systems, which are optimized for load testing and have XLT already installed. Using one of these AMIs may save you the work to create and maintain your own AMIs. They might not satisfy security requirements set by your organization, such as OS or JDK versions. See the AMI’s description for more details.
{{% /note %}}

{{% warning notitle %}}
When using **ec2_admin** to stop instances, it does not distinguish between instances it started and instances you might have started manually using other tools. For more fine-grained control, we recommend the [AWS Management Console](http://aws.amazon.com/).
{{% /warning %}}

### Running AWS Instances

When starting new AWS machine instances via `ec2_admin` ({{< kbd >}}r{{</ kbd >}}), you first choose a _region_ and an _availability zone_ for this region (optional). 

`ec2_admin` checks if there are multiple _VPCs/subnets_ in the target region/availability zone and, if so, prompts the user to select the desired one. Otherwise, it will select the default subnet. Depending on your AWS configuration, you might not need to choose a VPC/subnet at all.

{{% note notitle %}}
Note that choosing VPC and subnet is currently supported in interactive mode only. There is no command line option for this purpose yet.
{{% /note %}}

After that, choose the _machine image (AMI)_ to use from the list of available AMIs. In this list, `ec2_admin` will display the AMI's name tag (or, if no name tag is present, it falls back to its description).

You will then be prompted to pick an _instance type_. The list contains all necessary information, including available memory and expected costs:

```text
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

{{%danger title="Cost"%}}
The cost displayed is based on the cost at the time XLT was released. This is not a dynamic list! It does not consider the region or individual AWS discounts. Additional costs for storage and bandwidth may apply.

This is for informational purposes to make machines more comparable, as larger machines might be more cost-effective.
{{%/danger%}}

<a name="aws-name-tag"></a>

`ec2_admin` will ask you _how many instances_ you want to start and let you set an _instance name_. All instances set up in this action will be tagged with this name, so you can easily filter them later when [listing]({{< relref "#listing-running-aws-instances" >}}) or [terminating]({{< relref "#terminating-aws-instances" >}}) instances. Keep in mind that [AWS tag value restrictions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#tag-restrictions) apply.

```text
Enter the number of instances to start: => 2

Enter the instance name: => myTestInstance-us-east-1
```

Communication between the master controller and agent controllers will be encrypted in any case. For additional security, you can set your own _agent controller password_ in the next step. Ensure you update the password in the master controller properties when later using these started machines. If you leave the value empty, an XLT standard password is used. 

In the next step, you can also enter _host data_ (optional). All data entered here is appended to the `/etc/hosts` file on the load generator machines to allow custom DNS setups. This is not required for most test setups.

```text
Enter agent controller password => 

Enter host data (mark line break with '\n') => 
```

To log on to an EC2 machine using SSH, a key pair must have been assigned to the machine during startup. `ec2_admin` provides this feature when starting machines. The key pair to use for a specific AWS region can be configured in the properties or specified on the command line (`-k, --key <key-pair name>`). If none is set, `ec2_admin` will prompt you to pick one.

```text
Select the key-pair to use for the new EC2 instances:
 (1) <none>
 (2) my-key-eu-central-1
 (3) my-key-us-east-1
=> 
```

`ec2_admin` then summarizes the chosen options for verification before actually starting the instances:

```text
Configuration:  
  AMI               : ami-01f30091020d1934a - XLT 5.4.0
  Region            : us-east-1  
  Availability zone : <unspecified>  
  VPC               : vpc-91079bf4
  Subnet            : subnet-118eea2b (us-east-1a) [172.30.0.0/24]
  Type              : c4.2xlarge 
  Count             : 2  
  Name              : myTestInstance-us-east-1
  Key-pair          : my-key-us-east-1  
  Password          : <none>
  Host data         : 

Do you want to run the instance(s) with the above configuration? [y/n] =>
```

#### Pass User Data When Starting Instances

If your AWS EC2 instances need custom configuration data (*user data*, in Amazon terminology), e.g., for setting a custom agent controller password or adding content to `/etc/hosts`, you can also specify this data during `ec2_admin` startup. There are three supported ways to pass the user data:

1.  Store the data in a file and pass its name as a command-line argument (`-hf <file>` or `--hostDataFile <file>` for host data, `-pf <file>` or `--passwordFile <file>` for the agent controller password).
2.  Pass the data as a command line argument (`-h "..."` or `--hostData "..."` for host data, `-p "..."` or `--password "..."` for the agent controller password)). 
3.  When prompted by `ec2_admin`, enter the data. 

{{< TODO >}}Is "user data" parameter still valid?{{< /TODO >}}

### Listing Running AWS Instances

`ec2_admin` can list the agent controller URLs for all or selected AWS instances ({{< kbd >}}l{{</ kbd >}}). However, instances may not always have a public hostname assigned. In that case, the public IP address will be used as a fallback.

You will be prompted to select a region. 

#### Selecting EC2 Instances by Name Tag

After that, you may filter instances by one or more _tags_: AWS (Amazon Web Services) offers the ability to tag EC2 resources to simplify the administration of your cloud infrastructure. As a form of metadata, tags can be used to create user-friendly names and improve coordination between multiple users.

`ec2_admin` lets you select your EC2 resources based on the tag name. For example, when listing running instances, you can use filtering to reduce the set of displayed instances:

```text
Filter instances by one or more tags:  
(0) <none>  
(1) Name=CustomerA  
(2) Name=CustomerB  
(3) Type=WebServer  
(4) Type=AppServer  
=> 2 4
```

When starting Amazon EC2 machine instances, you can also [specify a name tag]({{< relref "#aws-name-tag" >}}) that will be assigned to each started instance. This name tag can be used later to filter the running instances (e.g., when listing or terminating them). 

The tool will then output a master controller configuration for the chosen set of AWS machines:

```text
Querying all instances in region 'ap-southeast-2' ... OK.
Querying all instances in region 'us-east-1' ... OK.

2 running and 0 pending instance(s) found.

--- Master controller configuration ---
com.xceptance.xlt.mastercontroller.agentcontrollers.ac001_ap-southeast-2.url = https://52.62.14.48:8500  
com.xceptance.xlt.mastercontroller.agentcontrollers.ac002_us-east-1.url = https://54.82.197.127:8500
```

The generated agent controller names will also include the region in which the respective machine is running. If your load test is driven from multiple locations worldwide, this makes it much easier to determine which agent controller runs in which AWS region. It also allows later filtering using [merge rules]({{< relref "010-merge-rules" >}}) for enhanced reports.

#### More Details about Running Instances

If you choose menu option {{< kbd >}}d{{</ kbd >}} instead of {{< kbd >}}l{{</ kbd >}}, `ec2_admin` will provide the same filtering options as above but, as a result, print more details about running or pending machine instances, like this:

```text
Querying *all* instances in region: eu-west-2 ... OK

1 running, 0 pending and 0 stopped instance(s) found.
------------------------------------------------------------------------------------------------------------------------
Name  |     Host      |   Type   | Key-Pair Name | Security Groups | Image |  State  | Launch Time (UTC) | Uptime (h:mm)
------------------------------------------------------------------------------------------------------------------------
Test1 | 35.177.98.135 | t2.micro | xc-eu-west-2  | default         | Proxy | running |  2020-01-01 13:11 |    111d 02:13
------------------------------------------------------------------------------------------------------------------------

```

### Terminating AWS Instances

To terminate AWS instances using `ec2_admin` ({{< kbd >}}t{{</ kbd >}}), you will be prompted to select a region and filters as [described above]({{< relref "#listing-running-aws-instances" >}}). 

This way, running machine instances with the same assigned name tag can be terminated all at once, even across regions. This saves you from going through each region separately. Simply specify multiple regions separated by commas when prompted.

When terminating machine instances, all instances matching your selection will be listed for review before they are terminated. This helps prevent terminating the wrong instances.

```text
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

`ec2_admin` can also be used in scripted processes. It offers a non-interactive mode where all required parameters must be passed on the command line. This makes it possible to fully automate starting and stopping Amazon machines. 

- Starting machines:
    `ec2_admin.sh   run   <region>   <instance-type>   <ami-id>   <instance-count>   <tag>`
- Stopping machines: `ec2_admin.sh terminate <region> <tag>`

However, starting and stopping machines is only half the story. The master controller also needs to know about the freshly started agent machines to use them for a load test. `ec2_admin` lists the corresponding agent machine configuration right after the machines are started. By default, it prints this configuration to the console. Alternatively, the configuration can be written to a file via the `-o` option. We recommend the latter approach, as the master controller can read the agent configuration directly from this file later.

For a fully automated load test process using AWS machines, use a sequence of commands similar to this example:

```text {linenos=true}
$ ec2_admin.sh run eu-central-1 c3.2xlarge ami-de5dcdb6 5 Posters -o agents.properties  
$ mastercontroller.sh -auto -report -pf agents.properties  
$ ec2_admin.sh terminate eu-central-1 Posters
```

Note how `ec2_admin` writes the agent machine configuration to the `agents.properties` file, which in turn is passed to the master controller as input. Be aware, though, that it may take a while until the agent controllers are up and running. To prevent the master controller from complaining too early about unreachable agent controllers, configure an appropriate waiting time in `mastercontroller.properties` (e.g., one minute):

```text
com.xceptance.xlt.mastercontroller.initialResponseTimeout = 60000
```
