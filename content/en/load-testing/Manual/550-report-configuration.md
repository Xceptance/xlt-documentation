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

Another way to make your charts show meaningful data is to adjust the capping, i.e. the run time value above which the chart is just cropped. The cap can be defined using two alternative methods. First, you may specify the capping value directly. Second, you may specify a factor that, when applied to the mean of all run time values, defines the ultimate capping value (e.g. mean runtime is 500ms, then the charts are capped at 2500ms). This factor must be a double greater than 1. Note that capping values take precedence over capping factors. By default, there is no capping.
Furthermore, you may configure the capping mode (`com.xceptance.xlt.reportgenerator.charts.cappingMode`):
* **smart:** cap the chart only if necessary (i. e. max > cap - this is the default)
* **always:** always cap the chart at the capping value
Note that the capping value/factor and the capping mode can be defined separately for each chart type, but it is also possible to define a default that applies to all chart types.

Some examples: {{< TODO >}}make look nice{{< /TODO >}}
* cap transaction charts to a value of 10000 (10sec), all other chart types (default) to a value of 5000 (5sec), always:
```bash
com.xceptance.xlt.reportgenerator.charts.cappingValue = 5000
com.xceptance.xlt.reportgenerator.charts.cappingValue.transactions = 10000
com.xceptance.xlt.reportgenerator.charts.cappingMode = always
```
* cap request charts to a factor of 5 of request mean time, all other chart types (default) to a factor of 10, in smart mode (which is default):
```bash
com.xceptance.xlt.reportgenerator.charts.cappingFactor = 10
com.xceptance.xlt.reportgenerator.charts.cappingFactor.requests = 5
```

{{< TODO >}}example images for chart capping/scale{{< /TODO >}}

{{< TODO >}}merge rules, colorization rules{{< /TODO >}}
