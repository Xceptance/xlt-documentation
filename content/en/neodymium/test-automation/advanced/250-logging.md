---
title: "Logging"

weight: 250
type: docs

description: >
  Logging in Neodymium using SLF4J
---

## SLF4J

We added logging support via [Simple Logging Facade for Java (SLF4J)](https://www.slf4j.org/). Doing so everybody is
able to configure own logging framework according to wishes and requirements.

{{% warning notitle %}}
It is required to set up some kind of logging in your test project. Otherwise, you will see
the following message in the console during execution of the tests:
{{% /warning %}}

```
SLF4J(W): No SLF4J providers were found.
SLF4J(W): Defaulting to no-operation (NOP) logger implementation
SLF4J(W): See https://www.slf4j.org/codes.html#noProviders for further details.
[ERROR] SLF4J(W): No SLF4J providers were found.
[ERROR] SLF4J(W): Defaulting to no-operation (NOP) logger implementation
[ERROR] SLF4J(W): See https://www.slf4j.org/codes.html#noProviders for further details.
```

## Setup Logging with Log4j

If you are not sure, what framework to take for logging, we
recommend [Apache Log4j 2](https://logging.apache.org/log4j/2.x/).

To use it, simply add the dependency to your pom.xml:

```xml
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-slf4j2-impl</artifactId>
    <version>x.y.z</version>
    <scope>test</scope>
</dependency>
```

Now you should be able to instantiate a logger and find messages of level `warning` and above within the console.
Additionally, every logging event of severity `error` or above will be appended to
`[PROJECT_PATH]\target\log\neodymium-error.log`.

Unfortunately, Log4j doesn't provide a non-programmatic way of extending an existing configuration. Hence, the easiest
way to change our configuration is to overwrite ours with your own.

The following listing shows the Log4j configuration provided by Neodymium. This is a good starting point to write your
own. Please check out the official [Log4j documentation](https://logging.apache.org/log4j/2.x/manual/configuration.html)
for more details.

```properties
status=warn
name=NeodymiumConfiguration
property.filename=target/log/neodymium-error.log
appender.console.type=Console
appender.console.name=STDOUT
appender.console.layout.type=PatternLayout
appender.console.layout.pattern=%d{HH:mm:ss} %p - %c{1.}: %m%n
appender.console.filter.threshold.type=ThresholdFilter
appender.console.filter.threshold.level=trace
appender.file.type=File
appender.file.name=FILE
appender.file.append=true
appender.file.fileName=${filename}
appender.file.layout.type=PatternLayout
appender.file.layout.pattern=%d %p - %c{1.} [%t]: %m%n
appender.file.filter.threshold.type=ThresholdFilter
appender.file.filter.threshold.level=error
rootLogger.level=warn
rootLogger.appenderRef.file.ref=FILE
rootLogger.appenderRef.console.ref=STDOUT
```

## Usage

Before you can log a message you'll need a proper logger instance. The easiest and recommended way to retrieve a
`Logger` instance is to use `LoggerFactory.getLogger()` as follows:

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class MyTest
{
    protected static final Logger logger = LoggerFactory.getLogger("NAME_OF_LOGGER");

    @NeodymiumTest
    public void testFunction()
    {
        logger.trace("trace");
        logger.debug("debug");
        logger.info("info");
        logger.warn("warn");
        logger.error("error");
    }
}
```

## Change log level for Selenium

Selenium uses different library for logging. Therefore, it's not possible to change the level of the logs for 
`org.openqa.selenium` via log4j. In addition, Selenium logs may be quite annoying especially if the browser version used
for testing is not the latest one or devtools are used in one of your tests. Which my lead to exploding log files, full
disks and the usual pain connected to it.

With the Neodymium property `neodymium.seleniumLogLevel` it's possible to change the Selenium log level to  `WARNING`,
`INFO`, `CONFIG`, `FINE`, `FINER`, and `FINEST` (default value is `SEVERE`).
