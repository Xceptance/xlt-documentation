---
title: "Custom Data"

type: docs

weight: 50

description: >
    XLT supports additional data points beyond typical automatic timers, such as custom timers, counters, and external data retrieval. Additionally, data from external sources can be added during report generation.
---

## Introduction

XLT [captures a lot of data]({{< relref "150-results" >}}) out-of-the-box. Since it uses open data formats (XML/CSV), it is well-suited for custom analytics and reporting. In addition to recorded information about transactions, actions, executed requests, and event information, you can also get:

* [custom events]({{< relref "#custom-events" >}}),
* [custom timers]({{< relref "#custom-timers" >}}),
* [custom values]({{< relref "#custom-values" >}}),
* [custom data logs]({{< relref "#custom-data-logs" >}}) and
* [external data]({{< relref "#external-data" >}}). 

This page shows how to add different kinds of custom information to your test scenarios. To learn more about the format and contents of the recorded CSV data and the meaning of each column depending on the data record type, see [Result Data]({{< relref "150-results" >}}). 

## Custom Events

Custom events are your tool to count how often certain events occurred during a load test. They can be used to record noticeable events that are not necessarily errors. 

Event parameters are the _event name_ and the _detail message_. All recorded events are grouped by test scenario. The total number of occurrences per scenario and the number of occurrences for each message will be counted.

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

The recorded data will be shown in the [Custom Timers]({{< relref "../manual/320-test-evaluation#custom-timers--values" >}}) section of the load test report. This rendering will show the same level of detail as other timers in the report.

{{< image src="user-manual/custom_timers.png">}}
Custom Timers in the Test Report
{{< /image >}}

To add custom timers to your test scenario, adjust your code similar to this example:
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
Custom values are used to record measurements of arbitrary double-precision floating-point values. They will appear in the [Custom Values]({{< relref "../manual/320-test-evaluation#custom-timers--values" >}}) section of the load test report with almost the same level of detail as timers.

{{< image src="user-manual/custom_values.png">}}
Custom Values in the Test Report
{{< /image >}}

Recording custom values during your test scenario is done as follows:

```java
double value = 0.1234; // determine the value

CustomValue data = new CustomValue("CacheHitRatio"); // also sets timestamp
data.setValue(value);

Session.getCurrent().getDataManager().logDataRecord(data);
```          
                
The resulting entry in `timers.csv` looks like this:
```csv                    
V,CacheHitRatio,1456928543182,0.1234
```

### Custom Samplers

Custom samplers use custom values to regularly record measurements during a load test. Custom samplers are typically used for values that are not related to a specific test scenario.

To do this, provide a custom sampler class extending `com.xceptance.xlt.api.engine.AbstractCustomSampler`. The sampler is configured in the test suite configuration files (the recommended location is `project.properties`).

The sampler must override the `execute()` method that is called after each interval time (see configuration). Furthermore, the sampler might override the `initialize()` or `shutdown()` methods, which are called once for the sampler (before the first call to `execute()` or on shutdown).

The logged custom value is the return value of the `execute()` method.

The `AbstractCustomSampler` can store any `double` (double-precision floating-point) value. The stored value indicates the absolute value at a certain point in time. The corresponding report chart directly shows the logged value.

#### Example Implementation

Here is a small example implementation of a custom sampler that records random values:

```java
public class ValueSamplerDemo extends AbstractCustomSampler 
{
    public ValueSamplerDemo()
    {
        super();
    }


    @Override
    public void initialize()
    {
        // initialize
    }


    @Override
    public double execute()
    {
        // generate random value based on the configured limits

        // get properties
        final String lowerLimitProp = getProperties().
                    getProperty("generatedValueLowerLimit");
        final String upperLimitProp = getProperties().
                    getProperty("generatedValueUpperLimit");

        // convert to int
        try
        {
            final int lowerLimit = Integer.valueOf(lowerLimitProp);
            final int upperLimit = Integer.valueOf(upperLimitProp);

            // return the value to be logged
            return
                XltRandom.nextInt(lowerLimit, upperLimit) +
                XltRandom.nextDouble();
        }
        catch (final NumberFormatException e)
        {
            // log 0 in case of an exception
            return 0;
        }
    }

    @Override
    public void shutdown()
    {
        // clean up
    }
}
``` 

#### Example Configuration

To register and configure your sampler, provide these properties:

```bash
com.xceptance.xlt.customSamplers.1.class = com.xceptance.posters.loadtest.samplers.ValueSamplerDemo
com.xceptance.xlt.customSamplers.1.name = DemoValueSampler
com.xceptance.xlt.customSamplers.1.interval = 1000
com.xceptance.xlt.customSamplers.1.chart.title = Demo Value Sampler
com.xceptance.xlt.customSamplers.1.chart.yAxisTitle = Value
com.xceptance.xlt.customSamplers.1.property.generatedValueLowerLimit = 50
com.xceptance.xlt.customSamplers.1.property.generatedValueUpperLimit = 60
...
```

The properties have the following meanings:

* `com.xceptance.xlt.customSamplers.n.` is the saved key for custom sampler properties. Each sampler configuration block must have a unique number (called `n` in this example). The numbers don’t need to be in strictly successive order.
* `class` points to the sampler class (including the full package path).
* `name` is the customizable name of the sampler.
* `interval` defines the period at which the sampler is started (in milliseconds or as a time period, e.g., `1m 30s` or `90s`). The value must be positive (including 0). A new sampler instance will be started only if it is the first execution or if the previous instance has finished.
* Providing a `chart.title` is optional. By default, the sampler name is used. `chart.yAxisTitle` defines the y-axis title for the rendered chart.
* Providing further sampler `properties` is optional. The properties can be accessed by calling the `getProperties()` or `getProperty(key)` methods (where `key` is the string in the configuration between `com.xceptance.xlt.customSamplers.n.property.` and the equals sign (=)). In the present example, the keys are `generatedValueLowerLimit` and `generatedValueUpperLimit`, which are used for random number generation). Sampler property keys must not contain dots or whitespace. Apart from that, they are flexible in name and quantity.

#### Result

XLT will then execute your sampler regularly. It will appear in the [Custom Values]({{< relref "../manual/320-test-evaluation#custom-timers--values" >}}) section of the load test report, just like other custom values.

{{< image src="user-manual/custom_samplers.png">}}
Custom Samplers in the Test Report
{{< /image >}}

## Custom Data Logs

When load testing, we often need to pass test data such as usernames, SKUs, coupon codes, etc. Sometimes, we want to know in retrospect which data items were actually used during a load test. For this purpose, XLT offers the *Custom Data Logger*. This feature allows you to log custom data lines in different scopes using a simple API. A scope is a custom string that describes the data to be logged (e.g., "users" or "skus"). All data lines logged in a given scope are grouped together.

A data line must be a string, but its format is unspecified. It can be a single value, a structured data record (such as CSV), or any other custom format. You can specify the extension of the resulting data files to reflect the format used (`*.log` by default). You can also specify a file header. See below for an example of how to set up the data logger for the "users" scope to use a CSV file:

```java
// one-time setup before first use
DataLogger logger = Session.getCurrent().getDataManager().dataLogger("users");
logger.setExtension("csv");
logger.setHeader("username,password,email");
```

Logging a corresponding user data line in the "users" scope is done as follows:

```java
Session.getCurrent().getDataManager().dataLogger("users").log("tmayer,9sadfasdf28a,thomas.mayer@example.com");

// same as above, but less boilerplate
Session.logData("users", "tmayer,9sadfasdf28a,thomas.mayer@example.com");
```

Data lines are written to separate files in the `results` directory, grouped by test user and scope. For example:

```
ac0001_us-central1_00/TCheckout/45/custom_log_users.csv
ac0001_us-central1_00/TCheckout/45/custom_log_skus.log
```

Custom data is also made available in the load test report in the *Custom Data Logs* section on the *Custom Data* report page. Since the number of logged data lines can be huge, they are not directly viewable. However, the report provides links to download the data as a ZIP archive file, one for each scope. The archive files are located in the `custom_data_logs` directory in the report. For example:

```
custom_data_logs/users.zip
custom_data_logs/skus.zip
```

## External Data

Sometimes, client-side measurements are not enough. That's why XLT can enrich its reports with statistics and charts from externally gathered data. Use this approach if it's impossible to access the external data source directly during load testing, but you would like to see that data as part of the test report, as this simplifies analyzing system behavior.

Some examples of external data usage are:
* resource usage data (CPU, memory, disk space, network usage),
* cache sizes,
* GC overhead, ...

To use external data, it needs to be collected during the load test using any appropriate tool. After the load test, gather any relevant data from other systems and make it available as data files in the same results folder as your regular load test result data. When generating the load test report, the report generator processes these additional data files and makes that data available in the load test report as data tables or charts on the _External Data_ page.

### Types of Data

XLT supports two different types of external data.

**Sampled data** is data that was recorded periodically and that changes over time. Each sampled value must be accompanied by a timestamp. This type of data can be displayed as a graph. Basic statistics (mean, minimum, maximum) can be calculated from all values and shown in the report.

* _Example: A data file with a timestamp/CPU usage value pair per line._

**Precomputed data** is data that results from an external value processing and aggregation task. This data is not timestamped, as there is only one aggregated value per data item. Further data processing does not make sense, so that data will simply be rendered as a table. Consequently, such data can neither be graphed nor will any statistics be calculated.

* _Example: A file that contains the total number of requests per application tier, with a tier/requests pair per line._

External data files can use CSV format (which works out-of-the-box) or other formats (which can be read using custom parsers).

### Data Parsers and Value Sets

To read and interpret external data files, a `Parser` class is needed for each file type or format. The parser takes a line of input (possibly with multiple values) and parses it into a generic set of values. Typically, one line contains all data items of a value set. Sometimes, however, the values are spread across multiple lines. Certain tools (e.g., _iostat_) produce such types of data files. In this case, the parser must process multiple lines of input before a value set is complete.

Typically, a data file contains many value sets. The parsed value sets for a given file must have a uniform structure (i.e., they should all contain the same data items at the same position). Otherwise, the report generator cannot process them correctly.

A value set can optionally carry a timestamp. This timestamp is valid for all data items in the value set. Whether or not a timestamp will be set is defined by the parser. If a timestamp is present, the report generator will treat the value set as sampled data; otherwise, as precomputed ("plain") data. Note that if the timestamp does not fall within the load testing period, the value set will be ignored. This way, you don't have to extract the interesting part from your, say, daily logs.

Later, when configuring the data to show in the report, we need a way to select the values of interest in a value set. A specific value can always be accessed by an index (starting with 0). Alternatively, you can use a name to address a data item. However, this requires the parser to store the item under that name. To do this, the parser could use a hard-coded name or retrieve the name to use directly from the data file. For instance, a CSV file could provide a header line with all value names.

#### Predefined Parsers

XLT ships with a set of predefined parsers for CSV data files. If you want to process CSV files with sampled data, use one of the following parsers:

* **SimpleCsvParser:** Extracts data by splitting each line into a set of values and uses the column index as the value name.
* **HeadedCsvParser:** Similar to SimpleCsvParser, but takes the value names from the first line of the file.

Note that these two parsers require the timestamp to be in the first column of the CSV data file.

If the external CSV data is precomputed and just needs to be displayed as a data table, use the **PlainDataTableCsvParser** class.

#### Custom Parsers
If you need to use input file formats other than CSV, you must write your own custom parser class. Your class must extend `com.xceptance.xlt.api.report.external.AbstractLineParser`.

For an example of an advanced parser class that handles sampled data, see the two parser implementations in the source directory of the [demo project]({{< relref "#example" >}}). They process the logs of the command line tool _iostat_.

* **IostatCpuParser:** Parses the CPU section of an _iostat_ log.
* **IostatDeviceParser:** Parses the Device section of an _iostat_ log.

{{% note notitle %}}
Note that if you need to write your own custom parsers, you must make the compiled parser classes available in XLT's classpath before the report generator can use them. The simplest way to do this is to deploy the classes, packaged as a JAR file, to `<xlt>/lib`.
{{% /note %}}

{{< image src="user-manual/externalData_customParserOutput.png">}}
Data parsed with a custom parser in the _External Data_ section of the Test Report
{{< /image >}}

### Configuration

Since external data is completely custom, there is no standard or built-in way to interpret and display this data. That's why you need to assist the report generator by providing a detailed configuration on how to parse the data, choose the values of interest, and display them in the report.

All of this is configured in `externaldataconfig.xml`. This file is expected in the `config` subdirectory of your load test suite, where all other load test configuration files reside. If XLT cannot locate it there, it will try to find it in its configuration directory `<xlt>/config`.

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

As you can see, the configuration is centered around the various data files you want to parse, process, and render. There can be one or more input files. The data of each file will be presented in its own subsection in the load test report. For each file/subsection, you can define a `headline` and a `description`; configure `charts` (each with one or more data series) or data `tables` (each with a different row or column definition); and set additional `properties` to use when parsing the file or rendering the data.

The basic data fields are used as follows:
* `file`: Defines what file is to be processed and in which way.
    * `source`: The path to the data file. If the path is relative, it will be resolved against the root directory of the current result set. [Required]
    * `parserClass`: The full class name of the parser class to use for parsing the data file. [Required]
    * `encoding`: The character encoding to use when reading the data file. [Optional, defaults to “UTF-8”]
* `headline` / `description`: Provide the text to show as the section header and section description.

**Properties** define additional configuration options. Currently, these are parser settings only and are used as follows:
* `property`: additional configuration option, consisting of
    * `key`: The property name. [Required]
    * `value`: The property value. [Required]

The following property names are predefined by XLT, but note that your custom parser classes may define additional properties:
* `parser.dateFormat.pattern`: The date/time pattern to parse a time value. See `SimpleDateFormat` for more information on date/time patterns. [Optional; the time value is expected to be a Java timestamp]
* `parser.dateFormat.timeZone`: The time zone to use when interpreting time values. [Optional, defaults to GMT/UTC]
* `parser.csv.separator`: The field separator character for CSV files. [Optional, defaults to comma]

{{% note notitle %}}
For tab-separated CSV files, use `&#x9;` as the value of parser.csv.separator.
{{% /note %}}

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

* `table` defines the properties of a data table. Each table is defined with its own row or column definition.
    * `title`: The title of the table. [Required]
    * `type`: The type of the table, either `minmaxavg` or `plain`. Use `minmaxavg` for sampled data only, in which case the table will show the mean, minimum, and maximum of the sampled values. Similarly, use `plain` for precomputed data only. [Optional, defaults to `minmaxavg`]
* `row` / `col`: Defines the layout of a data table. Tables can be laid out either row-wise or column-wise. If you use rows, the selected values will each be shown in a new table row; otherwise, in a new table column. Choose the method that better fits your needs. Both elements provide the same set of configuration options:
    * `valueName`: The name/index of the value to show. [Required]
    * `title`: The title of the series. [Optional, defaults to the value name]
    * `unit`: The unit of measurement. [Optional, defaults to none]

{{< image src="user-manual/externalData_tables.png">}}
Data Tables in the _External Data_ section of the Test Report
{{< /image >}}

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

* `chart` defines the chart title and the axes titles:
    * `title`: The title of the chart. [Required, unique]
    * `xAxisTitle`: The title of the x-axis. [Optional, defaults to “Time”]
    * `yAxisTitle`: The title of the first/left y-axis. [Optional, defaults to “Values”]
    * `yAxisTitle2`: The title of the second/right y-axis. [Optional, defaults to empty, in which case the axis is not shown]

* Each chart contains a collection of series (`seriesCollection`). A `series` defines which value will be shown as a graph in the chart and how the graph will be styled:
    * `valueName`: The name/index of the value to graph.
    * `title`: The title of the series. [Optional, defaults to value name]
    * `color`: The color of the graph. [Optional, by default, a color from a predefined color set is chosen]
    * `axis`: The axis to use for this series, either “1” for the first/left axis or “2” for the second/right axis. [Optional, defaults to “1”]
    * `average`: The percentage of values to use to calculate the moving average. [Optional, defaults to empty, in which case no moving average graph will be shown]
    * `averageColor`: The color to use for the automatically added moving average graph. [Optional, by default, a color from a predefined color set is chosen]

{{< image src="user-manual/externalData_charts.png">}}
Charts in the _External Data_ section of the Test Report
{{< /image >}}

### Example

XLT includes a demo project for external data. This project not only contains a load test result set enriched with external data files and the corresponding load test report but also shows how to implement custom data file parsers and configure the report generator to produce the report. The demo project for external data is located in `<xlt>/samples/demo-external-data`.