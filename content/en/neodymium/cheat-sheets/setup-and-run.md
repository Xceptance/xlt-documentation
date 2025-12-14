---
title: "Setup and Run"
weight: 2
type: docs
description: >
    Setup and run Neodymium tests. 
---

## Setup and Run / Quick Start

### Define Test

#### JUnit5

```java
@Browser
public class SomeTest
{
    @NeodymiumTest
    public void someTestMethod()
    {
        // ...
    }
}
```

#### JUnit4

```java
@RunWith(NeodymiumRunner.class)
@Browser
public class SomeTest
{
    @Test
    public void someTestMethod()
    {
        // ...
    }
}
```

### Run Tests

* as JUnit test via IDE
* `mvn clean test` for all tests
* `mvn clean test -Dtest=<NameOfTestClass>` for specific tests
* `mvn clean test -Dtest=<NameOfTestClass>#<NameOfTestMethod>` for specific test method
* [Parallel Execution]({{< relref "../framework/540-parallel-execution.md" >}})

### Generate Reports

* `mvn allure:report` to generate the report
* `mvn allure:serve` to generate and show the report
* `mvn clean test allure:report` to run all tests and generate the report

### Recommended pom.xml

```xml
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>

        <allure.version>2.29.0</allure.version>
        <aspectj.version>1.9.22</aspectj.version>
        <neodymium.version>5.3.0</neodymium.version>
        <surefire.version>3.5.2</surefire.version>
    </properties>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>${surefire.version}</version>
                <configuration>
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
            <plugin>
                <groupId>io.qameta.allure</groupId>
                <artifactId>allure-maven</artifactId>
                <version>${allure.version}</version>
                <configuration>
                    <reportVersion>2.32.0</reportVersion>
                    <resultsDirectory>${project.build.directory}/allure-results</resultsDirectory>
                </configuration>
            </plugin>
        </plugins>
    </build>

    <dependencies>
        <dependency>
            <groupId>com.xceptance</groupId>
            <artifactId>neodymium-library</artifactId>
            <version>${neodymium.version}</version>
        </dependency>
    </dependencies>
```

## More Cheat Sheets

* [Selenide & WebDriver]({{< relref "selenide-webdriver.md" >}}) - Element selection, interaction, and validation.
* [Features & Annotations]({{< relref "neodymium-features.md" >}}) - Test data, reports, accessibility, and more.
* [Properties]({{< relref "properties.md" >}}) - Configuration files and browser setups.
