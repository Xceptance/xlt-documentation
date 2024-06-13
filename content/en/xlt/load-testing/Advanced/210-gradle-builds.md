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
Include the following in your `build.gradle` file to use Gradle's Java plugin that adds basic compilation, testing and bundling capabilities for Java projects:

```groovy
plugins {
    id 'java'
    // or some other Gradle plugin for JVM language, such as 'java-library' or 'application'
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

(In case your testsuite's code is organized in a different way, for example when your XLT tests reside in src/test/java, you may have to update the compile classpath of the proper source set, e.g. `test`, as well.) 

### Adding XLT to your Project
Now that Gradle knows the configuration named `provided`, we can add XLT as provided dependency:

```groovy
dependencies {
    provided 'com.xceptance:xlt:8.2.0'
}
```  

{{% note title="Version Update" %}}
When configuring your test project to use a newer XLT version, do not forget to update XLT on your load machines as well. The version you’ve used to develop your test scripts must match the execution version of your load test environment.
{{% /note %}}

### Copying Dependencies

If your test suite makes use of any external dependencies or libraries, they have to be copied to a proper location within your test suite where XLT can find them, ideally as part of the compile or package step. XLT does not build the project on the agent machines and therefore does not resolve dependencies there. It simply uploads the test suite to the agent, including the contents of the `build` directory.

To automatically copy all non-provided dependencies to `build/dependency` at compile time, add the following snippet to your `build.gradle`:

```groovy
tasks.register('copyDeps', Copy) {
    into layout.buildDirectory.dir('dependency')
    from configurations.testRuntimeClasspath, configurations.runtimeClasspath
}

tasks.withType(JavaCompile) {
    // Configure Java compiler (source file encoding and JavaSE release)
    options.encoding = 'UTF-8'
    options.release = 11
    // Depend on 'copyDeps' task such that dependencies are copied automatically
    dependsOn('copyDeps')
}
```

This ensures that all dependencies are present when the test suite is about to be uploaded to the agent machines.

### Gradle Build Steps
If you run a load test for your Gradle test suite in [**XTC**]({{< relref "../../../xtc/loadtesting/120-load-project-configuration/#build" >}}), the following build steps will be executed:

`gradle classes testClasses`

We recommend running the same steps on your local machine to check if your test suite builds correctly and all necessary dependencies are copied into the target directory.