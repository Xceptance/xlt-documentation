---
title: "Work In Progress Annotation"

weight: 190
type: docs

description: >
  Using `@WorkInProgress` for selective test execution during development.
---

## Basic Information

The `@WorkInProgress` annotation functions as a selective execution marker. When enabled, only test methods annotated
with `@WorkInProgress` will be executed within that test class. All other unannotated test methods in the class are
automatically skipped.

{{% note %}}
To prevent accidental execution in continuous integration (CI/CD) environments, this annotation must be explicitly enabled via the configuration property `neodymium.workInProgress`. This property is initially set to `false` in `config/neodymium.properties`. The recommended best practice is to enable it locally by setting it to `true` in your `config/dev-neodymium.properties` file.
{{% /note %}}

## Examples

### Basic Usage

In the following example, only the test method `first()` will be executed. The test method `second()` will be skipped
because it lacks the `@WorkInProgress` annotation.

To run this example, the configuration property `neodymium.workInProgress` must be set to `true`.

```java
public class TestClass
{
    @WorkInProgress
    @Test
    public void first()
    {
    }

    @Test
    public void second()
    {
    }
}
```

### Inheritance Example

When a test class extends another, the annotation's behavior is inherited. In this example, `TestClass2` extends
`TestClass`.

Assuming `neodymium.workInProgress` is `true`, both the test method `third()` (from `TestClass2`) and `first()` (from
the superclass `TestClass`) will be executed. The test method `second()` from `TestClass` will be skipped as before.

```java
public class TestClass2 extends TestClass
{
    @WorkInProgress
    @Test
    public void third()
    {
    }
}
```
