---
title: "Maven"

weight: 200
type: docs

description: >
    How to build and run using Maven.
---

## Integrating XLT into a Maven project

Starting with XLT 5.0.x, XLT is published to [Maven Central](https://search.maven.org/artifact/com.xceptance/xlt). This facilitates updating the XLT version used in test projects. To integrate XLT into your Maven project, copy and paste the following into your `pom.xml` file:

```xml
<dependencies>
    <dependency>
        <groupId>com.xceptance</groupId>
        <artifactId>xlt</artifactId>
        <version>5.0.1</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

For versions before XLT 5.0.x, Xceptance offers a public repository hosting all XLT releases, including their corresponding _POM_ files. To configure your test project to use the Xceptance repository, add the following code to your test project's `pom.xml`:

```xml
<repositories>
    <repository>
        <id>xc-nexus</id>
        <url>https://lab.xceptance.de/nexus/content/groups/public</url>
    </repository>
</repositories>
```

{{% note title="Version update" %}}
When configuring your test project to use a newer XLT version, do not forget to update XLT on your load machines as well. The version you’ve used to develop your test scripts must match the execution version of your load test environment.
{{% /note %}}

### Copying Maven Dependencies

If your test suite is using external dependencies/libs, it is required that these are copied into the suite when the project is compiled, because XLT uploads everything to the agent machine but does not compile and resolve there anymore. To automatically copy all non-provided dependencies to `target/dependency` when compiling, add the following snippet to your `pom.xml`:

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-dependency-plugin</artifactId>
            <executions>
                <execution>
                    <id>copy-dependencies</id>
                    <phase>compile</phase>
                    <goals>
                        <goal>copy-dependencies</goal>
                    </goals>
                    <configuration>
                        <excludeScope>provided</excludeScope>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

This ensures that all dependencies are present when the test suite is about to be uploaded to the agent machines.