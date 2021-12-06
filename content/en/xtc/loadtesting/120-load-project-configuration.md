---
title: "Project Configuration"

weight: 120
type: docs

description: >
  Special configuration settings for load test projects in XTC.
---

The _Configuration_ of a load test project is very similar to the basic [project configuration](../../010-xtc-basics/#project-configuration), but there are a few special settings for this project type:

## Default Sharing Settings

In _Sharing_, you can define a default for the share expiration time of [load test reports](../140-load-testing/#create-a-report) for easier project management. Each report sharing will offer this time as a default. Later on, all shares can be either deactivated, extended, or reactivated at once when required. It is still possible to set individual expiration times per report, but these cannot be extended or deactivated globally then.

## Properties

In _Properties_, you can globally define [properties](../../load-testing/manual/480-test-suite-configuration/) or [secret properties](../../load-testing/manual/480-test-suite-configuration/#secret-properties) to use for test execution. Properties can be overwritten for each individual load test, and if not set in XTC will be read from the project data. 