---
title: "Custom Data"

type: docs

weight: 50

description: >
    XLT supports additional data points beyond the typical automatic timers such as custom timers, counters, and external data retrieval. In addition, data from external source can be added during report generation.
---

## Introduction

XLT [captures a lot of data](../150-results/) out of the box, and since it's using open data formats (xml/csv) it is well fitted for custom analytics and reporting. In addition to the recorded information about transactions, actions, and requests being executed as well as event information you can also get

* custom events,
* custom timers,
* custom values and
* external data. 

This page shows you how to add the different kinds of custom information to your test scenarios. To learn more about the format and contents of the recorded csv data and the meaning of every column depending on the data record type, see [Result Data](../150-results/). 

## Custom Events

Custom events are your tool to count how often certain things were happening during a load test. They can be used to record noticeable events that aren't really errors. 

Event parameters are the _event name_ and the _detail message_. All recorded events are grouped by test scenario, and the total number of occurences per scenario as well as the number of occurences for each message will be counted.

{{< image src="user-manual/custom_events.png">}}
Custom Events in the Test Report
{{< /image >}}

To log a custom event, you need to add this to your test code:

```java
EventData data = new EventData("ProductHasNoPrice"); // sets timestamp
data.setTestCaseName("TOrder");
data.setMessage("PID: 12345");
Session.getCurrent().getDataManager().logDataRecord(data);

// or even shorter:
Session.logEvent("ProductHasNoPrice", "PID: 12345");
```

The resulting entry in `timers.csv` looks like this:
```csv
E,ProductHasNoPrice,1456928543182,TOrder,PID: 12345
```

## Custom Timers

Custom timers are used to record measurements of elapsed time in your test scenarios. The logged data contains the runtime in ms as well as a failed flag for the measured action. The recorded data will be shown in the [Custom Timers](../../manual/320-test-evaluation/#custom-timers--values) section in the load test report. This rendering will show the same level of detail as other timers in the report.

{{< image src="user-manual/custom_timers.png">}}
Custom Timers in the Test Report
{{< /image >}}

To add custom timers to your test scenario, please adjust your code similar to this example:
```java
CustomData data = new CustomData("Foo"); // sets start time

try
{
// do the things you want to measure
}
catch (Throwable t)
{
    data.setFailed(true); // mark the action as failed
    throw t;
}
finally
{
    data.setRunTime(); // automatically sets elapsed time as runtime
    Session.getCurrent().getDataManager().logDataRecord(data);
}
```
                    
The resulting entry in `timers.csv` looks like this:
```csv                   
C,Foo,1456928543182,1234,true 
```

## Custom Values
Custom values are used to record measurements of arbitrary double values. They will show up in the [Custom Values](../../manual/320-test-evaluation/#custom-timers--values) section in the load test report with almost the same level of detail as timers.

{{< image src="user-manual/custom_values.png">}}
Custom Values in the Test Report
{{< /image >}}

Recording custom values during your test scenario looks like this:

```java
double value = 0.1234; // determine the value

CustomValue data = new CustomValue("CacheHitRatio"); // also sets timestamp
data.setvalue(value);

Session.getCurrent().getDataManager().logDataRecord(data);
```          
                
The resulting entry in `timers.csv` looks like this:
```csv                    
V,CacheHitRatio,1456928543182,0.1234
```

### Custom Samplers

{{% TODO / %}} 

## External Data

Sometimes client-side measurements are not enough - that's why XLT is able to enrich its reports with statistics and charts from externally gathered data. This enables you to gather all relevant data in one report, which simplifies analyzing the system behavior. 

Some examples for usage of external data are
* resource usage data (CPU, memory, disk space, network usage),
* cache sizes,
* GC overhead, ...

To make use of external data, it needs to be collected during the load test, using any appropriate tool. After the load test the collected data files can be processed by XLT for report generation. 

The external data files can use csv format (which works out of the box) or other formats (which can be read using custom parsers). All entries in external data files must be timestamped. 

### Configuration

Parsing and processing of the data files is configured in `externaldataconfig.xml`. 

#### General structure of the configuration file

```xml
<files>
<file source="embedded_00/CustomData/data.csv" encoding="UTF-8" parserClass="com.xceptance.xlt.api.report.external.SimpleCsvParser">

    <headline>Demo CSV report</headline>
    <description>This is a demo report based on data from a CSV file.</description>

    <properties>
        <property key="parser.dateFormat.pattern" value="dd.MM.yyyy HH:mm:ss" />
        <property key="parser.dateFormat.timeZone" value="GMT+0" />
        <property key="parser.csv.separator" value="," />
    </properties>

    <tables>...</tables>

    <charts>...</charts>

</file>
</files>
```

#### How to configure the data tables

```xml
<tables>
<table title="CPU Statistics" type="minmaxavg">
    <rows>
        <row valueName="1" title="CPU Temperature" unit="°C" />
        <row valueName="2" title="CPU Usage" unit="%" />
    </rows>
</table>
<table title="Network Statistics" type="minmaxavg">
    <rows>
        <row valueName="3" title="Inbound Network Traffic" unit="KB/s" />
        <row valueName="4" title="Outbound Network Traffic" unit="KB/s" />
    </rows>
</table>
</tables>
```

#### How to configure the charts

```xml
<charts>
<chart title="QuadCore CPU" yAxisTitle="CPU Temperature [°C]" yAxisTitle2="CPU Usage [%]">
    <seriesCollection>
        <series valueName="1" title="CPU Temperature" axis="1" color="#00FF00" average="10" averageColor="#008400" />
        <series valueName="2" title="CPU Usage" axis="2" color="#FF0000" average="10" averageColor="#840000" />
    </seriesCollection>
</chart>
<chart title="Network Traffic" yAxisTitle="Throughput [KB/s]">
    <seriesCollection>
        <series valueName="3" title="Inbound Network Traffic" color="#00FF00" average="10" averageColor="#008400" />
        <series valueName="4" title="Outbound Network Traffic" color="#0000FF" average="10" averageColor="#000084" />
    </seriesCollection>
</chart>
</charts>
```

### Example

{{% TODO / %}}

