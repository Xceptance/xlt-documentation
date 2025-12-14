---
title: "Build with Maven"
linkTitle: "Build with Maven"
weight: 510
type: docs
description: "Building the project and running tests with Maven."
---

To build the project and run tests with Maven you need to open the command line, navigate to your projects and execute the following command

`mvn clean install`

Since Maven expects a restrictive [directory structure](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html) to projects, tests are located in `src/test/java` rather then `src/main/java`. Hence, we need to execute the goal `test-compile` which will only compile classes from test folder.

In case you not only want to compile but also execute the test then you can run `mvn clean test` which will implicitly run `test-compile` and executes them.

## Grouping tests

You can also group your tests and execute only a subset of them with maven by following this [guide for JUnit4](https://github.com/junit-team/junit4/wiki/categories) and this [guide for JUnit5](https://junit.org/junit5/docs/current/user-guide/#running-tests-tags).

In JUnit4 you don't need to define suite classes to group tests. Grouping can be done by annotate a class with one or more group-classes. Furthermore, you **don't** need the `@RunWith(Categories.class)` this is already covered by `NeodymiumRunner` and must be configured via pom.xml, see [Using categories with Maven](https://github.com/junit-team/junit4/wiki/categories#using-categories-with-maven). Thus executing test groups is currently only available via maven commands.
