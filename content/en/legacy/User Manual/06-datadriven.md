---
layout: manual
title: Data-Driven Tests
---

Introduction
------------

Sometimes a certain test case needs to be executed not just once but
multiple times, each time with a different set of test data. For
instance, to check not only the “happy path” but also some border cases,
you might want to specify multiple test data sets automatically
recognized by the test framework and used to execute the test case once
per specified data set. The test case executions are thus independent
from each other and each produces a separate result in the test report.
This concept can be referred to as *data-driven test*.

XLT will support data-driven tests for any kind of test case (plain Java
and scripts) if you run them as (part of) a functional test using a
JUnit test runner. Data-driven tests can’t be used during load testing.
For load tests, other parameters define how long/often a test will be
executed, such as measurement time and arrival rate.

Typically, test data can be classified as constant or variable test
data. *Constant test data* is fixed for all runs of a test case in a
data-driven test. It is either hard-coded into the test case or kept
separate from the test code in a data file. *Variable test data* is
different for each run of the test case, which is why it is organized as
a list of separate data sets. Each data set contains all variable test
data needed for exactly one test run. The number of data sets determines
the number of test runs.

Where do these data sets come from? For a data-driven test, XLT
retrieves test data sets from an additional source, which can be, for
example, another data file or a database. To be more specific, XLT
accesses a data source via *data set providers* that implement a uniform
interface and return a data set as a simple key/value map.

During test execution, the framework reads the next data set from the
configured data set provider, passes it on to the test case instance,
and then runs the test. The test instance is responsible for the
appropriate application of the test data. This procedure is repeated
until all variable data sets have been processed.

Data Set Providers
------------------

### Built-in Providers

XLT supports three common sources for test data sets out of the box:

#### XML Files

Data sets can be stored as XML data file with a three-level element
structure. XML assigns a single top-level element. The elements on the
2nd level define the data sets, the elements on the 3rd level define the
values. A data file with two sets of user data might look like this:

bc(xml).. <?xml version="1.0" encoding="utf-8"?>  
<data-sets>  
<data-set>  
<userName>fred</userName>  
<password>topsecret</password>  
</data-set>  
<data-set>  
<userName>wilma</userName>  
<password>cantremember</password>  
</data-set>  
</data-sets>

Note that you can name the root element (here: `data-sets`) and the
2nd-level elements (here: `data-set`) as you like since only the
structure matters. However, the tag names on the 3rd level always define
the parameter names, so these tag names must be used consistently across
all data sets.

#### CSV Files

Data sets can also be stored as CSV data files, organized as lines of
separated values. The values in the 1st line define the parameter names,
the values of all following lines define the values of each data set.
The previous example would thus look like this:

`userName,password  `
fred,topsecret  
wilma,cantremember

You can configure the separator used in the CSV file (typically comma or
semicolon) with an XLT property. For example:

`\#\# Sets the field separator character for CSV files (defaults`
to “,”).  
com.xceptance.xlt.data.dataSetProviders.csv.separator = ;

Note that there’s no way to specify character encoding information in a
CSV file. By default, XLT reads CSV files using UTF-8. To override this
default, use the following property:

`com.xceptance.xlt.data.dataSetProviders.csv.encoding =`
ISO-8859-1

If you want to temporarily comment out a certain CSV record, simply put
a ‘\#’ character at the beginning of the respective line. You may also
redefine the default line comment marker if needed:

`com.xceptance.xlt.data.dataSetProviders.csv.lineCommentMarker =`
%

#### JDBC Data Sources

There is also a “data file” for JDBC data sources, yet it doesn’t
directly specify the data sets. Instead, it contains an SQL query that
retrieves the data sets when being executed. A query file for user data
sets may look like this:

bc(sql). select login as “userName”, password as “password” from users;

Each row returned from the database is converted to one data set. The
alias names in the query define the resulting parameter names.

Note that the SQL data set provider needs additional setup before it can
be used. First, an appropriate JDBC driver has to be present on the
class path of your test suite. Copy the respective JAR file to
`<testsuite>/lib` and you are done. Second, configure the URL and
credentials of your JDBC database connection that should be used when
executing the query:

`com.xceptance.xlt.data.dataSetProviders.jdbc.url =`
jdbc:h2:tcp://localhost/test  
com.xceptance.xlt.data.dataSetProviders.jdbc.userName = sa  
com.xceptance.xlt.data.dataSetProviders.jdbc.password = YourPassword

### Custom Data Set Providers

If the built-in data set providers are not sufficient, you can write
your own. Your custom data set provider must implement the general
`DataSetProvider` interface:

bc(java). public interface DataSetProvider  
{  
public List\<Map\<String, String\>\> getAllDataSets(File dataFile)  
throws DataSetProviderException;  
}

To register your own data provider implementation with XLT, add a
property to your configuration:

`com.xceptance.xlt.data.dataSetProviders.foo =`
com.yourcompany.FooDataSetProvider

This tells XLT to use the class `com.yourcompany.FooDataSetProvider` for
data files with the extension `.foo`. Note that this way you can also
override the built-in providers.

Test Data Set File Lookup
-------------------------

As outlined above, there is always some kind of “data” file involved.
Typically, these data files are named after the test case (the script
name for script-based test cases or the simple class name for Java-based
test cases). For instance, if a test script is named `TSearch`, then the
XLT framework will automatically look for files like
`TSearch_datasets.<ext>`, where `<ext>` is one of the file extensions
for which a data set provider has been registered. Accordingly, the
resulting list of file name candidates is: `TSearch_datasets.csv`,
`TSearch_datasets.xml`, `TSearch_datasets.sql` (and
`TSearch_datasets.foo`).

The lookup order of data files is defined as:

1.  `.csv`
2.  `.xml`
3.  `.sql`
4.  (`.foo`)

However, test data files can also have arbitrary names or paths. If so,
you have to configure which data file belongs to which test case. Map
the data set file name (or path) to the test case’s Java class using the
following notation:

`<class_name>.dataSetFile = <data_set_file_path>`

For example:

`com.mycompany.xlt.tests.MyTest1.dataSetsFile = Test1.xml  `
com.mycompany.xlt.tests.MyTest2.dataSetsFile = ./subdir/Test2.csv  
com.mycompany.xlt.tests.MyTest3.dataSetsFile = c:/tmp/Test3.sql

> Keep in mind that all property files are Java-style property files.
> Thus, when you use backslashes on Windows, you have to quote it with
> another backslash, for instance `c:\\tmp\\Test3.sql`.

Regardless of the test data file being given explicitly or deriving from
the test case, the XLT framework looks for such a file in several
locations:

1.  In the current directory (typically `<testsuite>`),
2.  in the directory specified by the property
    `com.xceptance.xlt.data.dataSets.dir` \[this property is set to
    `./config/data)` but commented out by default; remove the hash
    character when you want to use this location\],
3.  in the default script test case directory `<testsuite>/scripts` (for
    script-based tests only), and
4.  in the class path (for Java-based tests only).

As soon as a suitable file is found, the lookup stops.

Note that if the test case has a qualified name, that is if it has a
package part, the data set file also needs to have that package to be
found. If there is a test case named `your.package.TAuthor` (be it a
script or a Java test case), the framework will therefore search the
aforementioned directories for a corresponding data set file using the
file path `<dir>/your/package/TAuthor_datasets.<ext>` or, alternatively,
the file name `<dir>/your.package.TAuthor_datasets.<ext>`.

Access Data In Your Test Case
-----------------------------

The XLT framework makes the current test data set available to your test
case. For script test cases, the key/value pairs from the test data set
are automatically added to the internal pool of variables and can be
accessed in your scripts using the `${varName}` syntax.

If you prefer using Java as your scripting language, call the method
`getTestDataSet()` of the super class `AbstractTestCase` in your test
code to access the current test data set as a map of strings
representing the key/value pairs. You are responsible to pass the
respective values to the pieces of code where they are needed.

Run Data-Driven Tests via JUnit
-------------------------------

Running data-driven tests via JUnit isn’t any different from running
normal test cases. You simply add the test cases in question (directly
or indirectly) to the list of classes to be run by JUnit. If XLT finds a
data set file for a certain test case, it will be passed on to the right
data set provider, which returns all data sets. The test case will then
be executed once for each data set. This works because all test cases
extend the class `AbstractTestCase`, and this class has all the magic
built-in. The same is true for the generic script test case suite class
`ScriptTestCaseSuite`.

See the demo test suite in directory `<xlt>/samples/testsuite-posters`
for an example of how to configure Ant’s `junit` task to run XLT test
cases.

If you want to temporarily disable a data-driven test and let the test
cases run only once in spite of data set files, configure the following
setting in `default.properties`:

`com.xceptance.xlt.data.dataDrivenTests.enabled = false`

That being the case, be aware that your test case must provide some
default test data.

### @DataSetIndex annotation

In case you need to run one specific data set you can add the
<code>@DataSetIndex</code> annotation to your test case. It will raise
an exception if the specified data set is not available. This will come
handy when you’re developing a certain data driven test case.

bc(java). @DataSetIndex(0) \\\\use the first data set  
public class MyTest  
{  
…  
}

Run Data-Driven Tests in load test mode
---------------------------------------

Starting from XLT version 4.11.0 it is possible to use data sets in load
test mode as well.

By default the first data set is taken. If the property
`com.xceptance.xlt.data.dataSets.loadtest.pickRandomDataSet` is set to
true a random data set is chosen for test execution. If annotation
<code>@DataSetIndex</code> is configured in the test case the data set
matching the defined index is chosen. The annotation is the most
specific way to use a data set and overwrites the property.
