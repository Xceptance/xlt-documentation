---
title: "Parallel Execution"
linkTitle: "Parallel Execution"
weight: 540
type: docs
description: "Running tests in parallel with Maven."
---

Execution of a bunch of tests in parallel is currently only supported with Maven. To enable parallel execution you need to add the following surefire configuration to the `build` section of your projects pom file.

**NOTE**: Parallel test execution only works on class level. So if you have defined multiple test methods within your test class, that methods will be executed in sequence but multiple classes can run in parallel. A test class will be executed in its own JVM.

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.5.2</version>
            <configuration>
                <forkCount>4</forkCount>
                <reuseForks>true</reuseForks>
            </configuration>
        </plugin>
    </plugins>
</build>
```

The attribute `forkCount` determines the maximum number of JVM's that will be forked from Maven to run tests in parallel. A good value is two times of available CPU cores.
`reuseForks` tells the forked JVM's whether they should terminate after each test and or not. In most cases it shouldn't cause problems if you reuse them. Maven itself ensures that a new JVM will be created if there are more tests left.
