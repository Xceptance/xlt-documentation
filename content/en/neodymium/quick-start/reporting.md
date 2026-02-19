---
title: "Reporting"
linkTitle: "Reporting"
weight: 30
type: docs

description: >
  Generate detailed test execution reports with Allure.
---

Neodymium generates HTML reports using Allure. These reports offer detailed insights into test execution, including all test steps, error screenshots, page source HTML, and test-specific data.

The basic Allure reports have been extended with new features, such as:

* Test data added as JSON to the test report.
* Steps showing the new URL if it changes.
* GIF or video recordings of each test (if configured).

To generate a report, simply run:

```shell
mvn allure:serve
```

For detailed information, consult the [Allure documentation](https://allure.qameta.io/) and the provided [example report](https://allure-framework.github.io/allure-demo/10/index.html#).

{{< image max-width="60%" src="neodymium/first_test_report.png" >}}
Example report for the example test `FirstTest`.
{{< /image >}}

## Setup

Add the following lines to your project's `pom.xml` to include Allure.

```xml
<build>
    <plugins>
        <plugin>
            <groupId>io.qameta.allure</groupId>
            <artifactId>allure-maven</artifactId>
            <version>2.12.0</version>
            <configuration>
                <reportVersion>2.27.0</reportVersion>
                <resultsDirectory>${project.basedir}/allure-results</resultsDirectory>
            </configuration>
        </plugin>
    </plugins>
</build>
```

To enable all Allure report features, including `@Step()` annotations, the following configuration must be added to the `plugins` section of the `pom.xml` file.

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>${surefire.version}</version>
    <configuration>
        <forkCount>1</forkCount><!-- parallel test execution -->
        <testFailureIgnore>true</testFailureIgnore>
        <argLine>
            -javaagent:"${settings.localRepository}/org/aspectj/aspectjweaver/${aspectj.version}/aspectjweaver-${aspectj.version}.jar"
        </argLine>
        <systemPropertyVariables>
            <allure.results.directory>${project.build.directory}/allure-results</allure.results.directory>
            <selenide.reports>${project.build.directory}/selenide-results</selenide.reports>
        </systemPropertyVariables>
    </configuration>
    <dependencies>
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
            <version>${aspectj.version}</version>
        </dependency>
    </dependencies>
</plugin>
```

{{% warning %}}
If the dependencies above are not added to the `pom.xml`, `@Step()` annotations **will not** work.
{{% /warning %}}

{{% warning %}}
The Allure results are collected into the project base directory and are not removed by `mvn clean` by default. For complete Allure functionality and to streamline results management, Surefire is required. When adding Surefire, update the Allure results directory to the one specified by Surefire.
{{% /warning %}}
