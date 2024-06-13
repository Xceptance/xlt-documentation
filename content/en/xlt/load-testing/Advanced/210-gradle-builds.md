---
title: "Gradle"

weight: 210
type: docs

description: >
    How to build and run using Gradle.
---

XLT supports using Gradle as a build tool for your test suite. You need the following entries in your `build.gradle` file:

## Integrating XLT into a Gradle project

### Plugins
Include the following in your `build.gradle` file to use Gradle's Java plugin and its provided build steps:

```groovy
plugins {
    id 'java'
}
```

### Adding Repository Location
XLT is published to [Maven Central](https://search.maven.org/artifact/com.xceptance/xlt). To integrate XLT into your Gradle project, copy and paste the following into your `build.gradle` file:

```groovy
/* Add Maven Central repository information */

repositories {
    maven {
        url = uri('https://repo.maven.apache.org/maven2/')
    }
}
```

### Dependency Scopes
XLT is provided at runtime by the container, so it does not need to be packaged with your project build, thus reducing the upload size when starting a load test.

Maven knows the `provided` scope for dependencies that need to be present on your classpath at compile time but don't need to be packaged as they are already provided at runtime (e.g. by the JDK or web container). However, since there is no such equivalent in Gradle you'll have to define it by yourself in your `build.gradle` file as follows: 

```groovy
configurations {
    provided
}

sourceSets {
    main {
         // Add dependencies of type 'provided' to compile classpath
        compileClasspath += configurations.provided
    }
}
```  

### Adding XLT to your Project
We can then add xlt as a provided dependency:

```groovy
dependencies {
    provided 'com.xceptance:xlt:8.2.0'
}
```  

{{% note title="Version Update" %}}
When configuring your test project to use a newer XLT version, do not forget to update XLT on your load machines as well. The version you’ve used to develop your test scripts must match the execution version of your load test environment.
{{% /note %}}

### Copying Dependencies

If your test suite is uses external dependencies or libraries, they must be copied into the test suite as part of the compile or package step. XLT does not build the project on the agent machines and therefore does not resolve dependencies there. It simply uploads the test suite to the agent, including the contents of the `build` directory.

To automatically copy all non-provided dependencies to `build/dependency` at compile time, add the following snippet to your `build.gradle`:

```groovy
tasks.register('copyDeps', Copy) {
  into layout.buildDirectory.dir('dependency')
  from configurations.testRuntimeClasspath, configurations.runtimeClasspath
}

tasks.withType(JavaCompile) {
    options.encoding = 'UTF-8'
    options.release = 11
    dependsOn('copyDeps')
}
```

This ensures that all dependencies are present when the test suite is about to be uploaded to the agent machines.

### Gradle Build Steps
If you run a load test for your Gradle test suite in [**XTC**]({{< relref "../../../xtc/loadtesting/120-load-project-configuration/#build" >}}), the following build steps will be executed:

`gradle classes testClasses`

We recommend running these same steps on your local machine to check if your test suite builds correctly and all necessary dependencies are copied into the target directory.