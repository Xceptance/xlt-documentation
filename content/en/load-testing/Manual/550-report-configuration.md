---
title: "Report Configuration"

weight: 550
type: docs

description: >
    How to customize the reports via configuration file.
---

By [adjusting the report options](../540-report-options) you can already adjust the focus of your generated reports very well, but there are even more possibilities by configuring the file `<xlt>/config/reportgenerator.properties`. 

To use a configuration file other than the default one, the path (relative or absolute) can be configured during report generation, as command line parameter **pf**:

```bash
bin $ ./create_report.sh ../results/20191224-131200 -pf ../config/myPerfectReportGenerator.properties
```

## Customizing the Default Output Directory

To define your preferred default directory where test reports shall be stored (which is used when no [custom output directory](../540-report-options/#setting-a-custom-output-directory) is specified during report generation), set: 

```bash
com.xceptance.xlt.reportgenerator.reports = myReports
```

## Defining the Percentiles

The percentiles shown in runtime data tables default to 50, 95, 99 and 99.9. However this can be customized:

```bash
## The percentiles to show in runtime data tables. Specify them as a comma-
## separated list of double values in the range (0, 100].
## Defaults to "50, 95, 99, 99.9". If left empty, no percentiles will be shown.
com.xceptance.xlt.reportgenerator.runtimePercentiles = 50, 95, 99, 99.9
```

Keep in mind that if you use too many datapoints, the tables get too wide and report evaluation gets harder.

## Adjusting the Charting

XLT has extensive ways to adjust its generated charts to see more details. You can adjust the width and height of the charts if required (the size is given in pixels): 

```bash
com.xceptance.xlt.reportgenerator.charts.width = 900
com.xceptance.xlt.reportgenerator.charts.height = 300
```

You can also adjust the scale used for the y-axis in the run time charts. Valid values are “linear" (which is the default) and "logarithmic". This, for example, is how you can still see the runtime differences in your “normal” requests when there are some timeouts that would otherwise completely mess up your scale and make everything below a minute indistinguishable noise.

```bash
com.xceptance.xlt.reportgenerator.charts.scale = logarithmic
```

Another way to make your charts show meaningful data is to adjust the capping, i.e. the run time value above which the chart is just cropped. The cap can be defined using two alternative methods. First, you may specify the capping value directly. Second, you may specify a factor that, when applied to the mean of all run time values, defines the ultimate capping value (e.g. mean runtime is 500ms, then for a cappingFactor of 5 the charts are capped at 2500ms). This factor must be a double greater than 1. Note that capping values take precedence over capping factors. By default, there is no capping.

Furthermore, you may configure the capping mode (`com.xceptance.xlt.reportgenerator.charts.cappingMode`):
* **smart:** cap the chart only if necessary (i. e. max > cap - this is the default)
* **always:** always cap the chart at the capping value
Note that the capping value/factor and the capping mode can be defined separately for each chart type, but it is also possible to define a default that applies to all chart types.

For example, to cap transaction charts to a value of 10000 (10sec), all other chart types (default) to a value of 5000 (5sec), always, use:
```bash
com.xceptance.xlt.reportgenerator.charts.cappingValue = 5000
com.xceptance.xlt.reportgenerator.charts.cappingValue.transactions = 10000
com.xceptance.xlt.reportgenerator.charts.cappingMode = always
```
To cap request charts to a factor of 5 of request mean time, all other chart types (default) to a factor of 10, in smart mode (which is default), use:
```bash
com.xceptance.xlt.reportgenerator.charts.cappingFactor = 10
com.xceptance.xlt.reportgenerator.charts.cappingFactor.requests = 5
```

Here is a small glimpse of what can be done by this feature - first, we have the default chart without any customized capping:

{{< image src="user-manual/all-requests-capped-none.png" >}}
All requests, without capping.
{{< /image >}}

As you can see, very few of the requests have runtimes up to 30.000 ms, but most seem to be well below 5.000 ms. So let's try to just cap it all at 5 seconds: 

```bash
com.xceptance.xlt.reportgenerator.charts.cappingValue = 5000
```
{{< image src="user-manual/all-requests-capped-5sec.png" >}}
All requests, capped at 5.000 ms.
{{< /image >}}

Now some of the requests still take about 3.000 ms, but most are still a grey something at the bottom of the chart - it's hard to spot interesting details in the lower part of the chart, that still contains most requests. So this time, let's just cap the chart at five times the request meantime, which is about 200 ms:
```bash
com.xceptance.xlt.reportgenerator.charts.cappingFactor = 5
```
{{< image src="user-manual/all-requests-capped-5x.png" >}}
All requests, capped at 5x request meantime.
{{< /image >}}

This enables us to notice the patterns in the bottom, but of course all information for requests taking more than 1 second is lost now. A middle ground can be found by using a logarithmic scale for the chart's y axis instead of capping - this way, you can focus more on the shorter running requests, while still having the information for the longer running requests at hand.

```bash
com.xceptance.xlt.reportgenerator.charts.scale = logarithmic
```
{{< image src="user-manual/all-requests-logarithmic.png" >}}
All requests, with logarithmic y axis.
{{< /image >}}

This is just a glimpse of what is possible, and often there is no one right way to go about things, but several different versions compared side-by-side might provide the information you need.

## Report Colorization

{{< TODO >}}colorization rules{{< /TODO >}}

## Merge Rules

{{< TODO >}}merge rules{{< /TODO >}}
See [Merge Rules](../../advanced/010-merge-rules).
