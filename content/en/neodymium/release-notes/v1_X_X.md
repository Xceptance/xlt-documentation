---
layout: manual
title: 1.X.X

weight: 950
type: docs

sitemap:
  changefreq: weekly
  priority: 0.1


description: >
    
---


## 1.1.0

We are pleased to announce that Neodymium has been released in version 1.1.0-

### Element Highlighting

You can now watch your test case doing stuff. With the introduction of element highlighting you can now see which elements are currently selected by your test case. Thus you are able to debug your code line by line and see which elements are selected. Element highlighting does only apply for Selenide selectors. Both, element as well as collection highlighting is supported.

To activate element highlighting you need to adjust `config/test.properties` by adding `debug.highlight = true`. Note: activating element highlighting also reduces test execution speed as the highlighting is done in an animated way which needs some time to render.

### Test Execution Speed

Now you can slow down test execution for debugging purpose. By adding `debug.highlight.duration = 500` (or any other reasonable value of course) to `config/test.properties` a waiting time of 500 milliseconds is applied for every Selenide selection. Thus the execution stops for the specified amount of time and continues after this time has expired.

### Insecure Certificates

Multi-browser support was extended to accept insecure certificates when necessary. The Boolean property must be set explicitly for your browser in order accept insecure certificates.

**Example:** `config/browser.properties`

```Properties
# .acceptInsecureCertificates:
#     A Boolean property that decides whether the web driver accepts insecure certificate or not.
#     The default behavior is the one of the used web driver.
#         true:  the browser accepts insecure certificates
#         false: the browser does not accepts insecure certificates
browserprofile.<browser tag>.acceptInsecureCertificates = true
```

### Additional Browser Options

You can now specify additional browser arguments/options to your browser configuration. Note: Firefox uses a single dash `-` for arguments while Chrome uses a double dash `--` (`-headless` vs. `--headless`). Luckily Chrome does also support the single dash notation that's why we suggest to use always a single dash for arguments.
Furthermore since you can not have multiple arguments attributes you need to put them into a single line. Do so by concatenate them with a semicolon, see the example below.

```Properties
# .arguments: Additional command line arguments for the browser to apply.
#             As you can specify only on 'arguments' property for a browser at a time you need to chain multiple arguments.
#             Multiple arguments are chained by semicolon (";") e.g.: `-window-position=0,0 ; -window-size=400,300`
browserprofile.<browser tag>.arguments = -profile-directory=/path/to/profile; -headless;
```

### Maven Central

With this release Neodymium is available in [maven central](https://repo1.maven.org/maven2/com/xceptance/neodymium/). So you don't need any special repository entry in your projects pom to find Neodymium.

### Library Updates

* Selenide to 4.12.2

## 1.0.0

Welcome to the v1.0.0 release of Neodymium-Library

We've spent a lot of work over the past month and we are happy to release a production ready version of Neodymium today.

A lot of work was used to refactor the code towards a seamlessly JUnit integration and testing. Also we used the time to overthink some of the features to increase their usability. Thus some things have changed and may need your attention in your ongoing Neodymium projects.

### New Features

* Added `@SuppressBrowsers` and `@SuppressDataSets`: annotate a class or method with to prevent automatic test multiplication for that scope
* Extended [Multi-browser support](https://github.com/Xceptance/neodymium/wiki/Multi-browser-support) to support **headless** mode for Firefox and Chrome
* Extended DataUtils e.g. beside `int asInt(String key)` there is now a function which will return a given default if the key was not found `int asInt(String key, int defaultValue)`
* Eclipse JUnit view can now changed to display tests as a tree (default) or a flat list representation

### Changes

* `@Browser` annotation was changed to define only one browser at a time, but you can now use this annotation repeatedly. Thus you may need to change your existing code.

### Bugfixes

* Clear context: context wasn't cleared before test execution

### Library Updates

* no dependencies were updated
