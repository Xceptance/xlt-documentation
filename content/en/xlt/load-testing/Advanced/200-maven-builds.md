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

{{% note title="Dependency Scopes" %}}
When adding **xlt** as a project dependency, you should always use the `provided` scope, which means XLT is provided at runtime by the container. This reduces the upload size when starting a load test, thus speeding up the process.  
{{% /note %}}

For versions before XLT 5.0.x, Xceptance offers a public repository hosting all XLT releases, including their corresponding _POM_ files. To configure your test project to use the Xceptance repository, add the following code to your test project's `pom.xml`:

```xml
<repositories>
    <repository>
        <id>xc-nexus</id>
        <url>https://lab.xceptance.de/nexus/content/groups/public</url>
    </repository>
</repositories>
```

{{% note title="Version Update" %}}
When configuring your test project to use a newer XLT version, do not forget to update XLT on your load machines as well. The version you’ve used to develop your test scripts must match the execution version of your load test environment.
{{% /note %}}

### Copying Maven Dependencies

If your test suite is uses external dependencies or libraries, they must be copied into the test suite as part of the compile or package step. XLT does not build the project on the agent machines and therefore does not resolve dependencies there. It simply uploads the test suite to the agent, including the contents of the `target` directory.

To automatically copy all non-provided dependencies to `target/dependency` at compile time, add the following snippet to your `pom.xml`:

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

### Maven Build Steps

If you run a load test for your Maven test suite in [**XTC**]({{< relref "../../../xtc/loadtesting/120-load-project-configuration/#build" >}}), the following build steps will be executed:

`mvn process-classes process-test-classes dependency:copy-dependencies -DexcludeScope=provided`

We recommend running the same steps on your local machine to check if your test suite builds correctly and all necessary dependencies are copied into the target directory.