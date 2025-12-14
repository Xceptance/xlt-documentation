---
title: Neodymium 0.X.X
linkTitle: 0.X.X

weight: 1000
type: docs

sitemap:
  changefreq: weekly
  priority: 0.1

description: >
    
---
## 0.2.1

### General

* Added support for Java10 build environments
* Increased unit test coverage

### Features

* Added visual assert basic support
* Added function parentsWithoutSubElement to SelenidePlus

### Updates

* Using Cucumber 2.4.0

## 0.1.0

### Features

* Added function parentsBySubElement to SelenidePlus
* Added basic auth support
* Extended Allure-Cucumber connector to support multiple example tables

### Bugfixes

* Localization file will now be read in UTF-8 encoding
* Context was not reset for every test in Cucumber execution
* Escaping issue for default configuration

### Updates

* Using Allure 2.6.0

## 0.0.9 (Beta)

### Initial Release

This software is currently not found in any central maven repository but in Xceptance's Nexus. To use this software add the following to your pom.

```xml
<repositories>
    <repository>
        <id>xc-nexus</id>
        <url>https://lab.xceptance.de/nexus/content/groups/public</url>
    </repository>
</repositories>
...
<dependency>
    <groupId>com.xceptance</groupId>
    <artifactId>neodymium-library</artifactId>
    <version>0.0.9</version>
</dependency>
```
