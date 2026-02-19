---
title: "Test Execution"
weight: 10
type: docs
description: >
  Strategies for running Neodymium tests: IDE, Maven, profiles, and selective execution.
---

Once test cases are developed, you need flexible ways to execute them—whether it's running a single test in your IDE, a specific suite via Maven, or a complex matrix of browsers and datasets in a CI/CD pipeline.

## Run in the IDE as JUnit Test

Test developers often work primarily within an IDE. A Neodymium test case can be launched just like any standard JUnit test:

1. Select the test class or method in your project explorer.
2. Right-click and choose **Run as JUnit Test**.

The test will start, launching the configured browser and executing the steps. Most IDEs provide a dedicated JUnit view to report results and stack traces for failures.

**Note:**

* **Configuration:** IDE runs use the default configuration or `dev-neodymium.properties`. You can't easily pass dynamic command-line parameters (like `-Dneodymium.url=...`) without modifying the run configuration in your IDE.
* **Scope:** If you want to limit the datasets or browsers for a local run to save time, you might be tempted to modify `@Browser` or `@DataSet` annotations. However, be careful not to commit these temporary changes.

## Run via Maven

Neodymium integrates tightly with Maven, allowing robust execution capabilities suitable for CI/CD environments.

### Run All Tests

To execute all tests in your project:

```shell
mvn clean test
```

### Run Sets of Tests using Maven Profiles

You can define [Maven Profiles](https://maven.apache.org/guides/introduction/introduction-to-profiles.html) in your `pom.xml` to create named test suites (e.g., `smoke`, `regression`).

```xml
<profiles>
    <profile>
        <id>smoke</id>
        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <configuration>
                        <groups>smoke</groups>
                    </configuration>
                </plugin>
            </plugins>
        </build>
    </profile>
</profiles>
```

Execute a profile using the `-P` flag:

```shell
mvn clean test -Psmoke
```

### Run Tests Selectively via Maven Surefire

For more granular control without modifying the `pom.xml`, you can use Maven Surefire's `test` property. This allows you to filter tests by class name, method name, and even Neodymium-specific generated names (combining datasets and browsers).

Neodymium generates test names in this format:
`Package.Class.Method :: DatasetID DatasetIndex / Total :: BrowserProfile`

**Example pattern matching:**

To run tests that match specific criteria (e.g., class `T101`, method `channelDE`, dataset `yellow product`, browser `Chrome`):

```shell
mvn clean test "-Dtest=%regex[.*T101.*#.*channelDE.*yellow product.*Chrome.*]"
```

**Key points:**

* **Regex:** Use `%regex[...]` for regular expressions.
* **Logic:** Combine patterns with commas. Use `!` to exclude patterns (e.g., `!%regex[.*attic.*]`).
* **Parameters:** Pass system properties to override configuration, such as the System Under Test (SUT) URL:

    ```shell
    mvn clean test -Dtest=MyTest -Dneodymium.url=https://staging.example.com
    ```

This approach allows you to execute exactly the subset of tests you need, with the specific configuration required, directly from the command line.
