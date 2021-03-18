---
title: "Maven"

weight: 200
type: docs

description: >
    How to build and run using Maven.
---

## Integrating XLT into a Maven project

Starting with XLT 5.0.x, XLT is published to <a href="https://search.maven.org/artifact/com.xceptance/xlt" target="_blank">Maven Central</a>. This facilitates updating the XLT version used in test projects. To integrate XLT into your Maven project, copy and paste the following into your `pom.xml` file:

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