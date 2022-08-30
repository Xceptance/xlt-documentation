---
title: "Resource Usage"

weight: 400
type: docs

description: >
    How XTC helps you to keep track of resource usage within your organization.
---

When performing load tests, agent machines are started on your behalf to drive the traffic against the system under test. After a load test, both the raw load test results (measurements, error information, etc.) and also the reports generated from the results are saved to a storage device. Both agent machines and storage incur costs. XTC records information about machine hours and occupied storage to give you an overview for an [organization's]({{< relref "#organization-resource-usage" >}}) or [project's]({{< relref "#project-resource-usage" >}}) resource usage.

## Organization Resource Usage

{{% permission role="billing manager or organization administrator" %}}

If you are administrator or billing manager of an organization, XTC offers you an overview for the organization's resource usage. To access this information, navigate to your organization and just click _Resource Usage_ in the menu on the left.

You will get a list of the total resources used, that is one tab for **machine minutes** and another tab for **storage space**. Resource usage is listed by month - the default list view shows the accumulated value across all projects in this organization, and by clicking right of the month you want to expect, you can expand it to view the resource usage of all projects seperately. 

{{< image src="xtc/resourceUsageOrg_compressed.png" max-width="80%" >}}
Storage Space Overview, which can be expanded by clicking the tick on the right side. 
{{< /image >}}

{{< image src="xtc/resourceUsageOrg_expanded.png" max-width="80%" >}}
Expanded Machine Usage Overview, showing the machine time used per project. 
{{< /image >}}

This screen lists the spent machine hours and occupied storage for this project for your information. Note that this screen is not visible to users with the project role Reviewer or Guest.

## Project Resource Usage

{{% permission type="project" least="true" role="tester" %}}

In addition to the resource usage overview for the whole organization, XTC offers you an overview for each load test project's resource usage. To access this information, navigate to your load test project and click _Resource Usage_ in the menu on the left.

This screen lists the spent machine hours and occupied storage for this project for your information. You will get one tab for **machine minutes** and another tab for **storage space**. Used storage is listed by day, while used machines are listed for each load test in this project, and by clicking the expand button on the right you may view more detailed data for this load test.

{{< image src="xtc/resourceUsagePro_storage.png" max-width="80%" >}}
Storage Space Overview, listed per day. 
{{< /image >}}

{{< image src="xtc/resourceUsagePro_machines.png" max-width="80%" >}}
Machine Usage Overview, listed per load test. 
{{< /image >}}

{{< image src="xtc/resourceUsagePro_machinesExp.png" max-width="80%" >}}
Expanded Machine Usage Overview, showing details of the load test machine usage. 
{{< /image >}}

