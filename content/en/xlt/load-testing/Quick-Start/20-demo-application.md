---
title: "The Demo App"

weight: 20
type: docs

description: >
  How to get and run Posters, the demo application.
---

Xceptance provides a demo application called *Posters Demo Store* or just *Posters*, which is a small e-commerce store that can be used for learning and demoing load testing as well as test automation. 

*Posters* is a shop software written in Java, so you will need Java 17 on your machine to run it. Being small and easy to deploy, it is well suited to demonstrate testing with XLT.

## Getting the Posters Application

The latest version of Posters can be downloaded from [Github](https://github.com/Xceptance/posters-demo-store/releases). Place the JAR file `posters-demo-store-<version>.jar` anywhere on your local disk.


## Building Posters

As an alternative to downloading a prepackaged JAR file, you can build the JAR yourself. Posters Demo Store is a regular Maven project, so you will need to have Maven installed on your machine. To build the project yourself, clone the [Github repository](https://github.com/Xceptance/posters-demo-store) to your local disk and run:

```
mvn clean package
```

If all went well, you will find several build artifacts in the `target` subdirectory, but the most important one is `posters-demo-store-<version>.jar`. This file contains the Posters code and all required libraries (including a Web application server) in a single, ready-to-run JAR file.

## Running Posters as a Console Application

If you have successfully downloaded or built the Posters JAR file, you can now run Posters with the default settings as follows:  

```
java -jar posters-demo-store-<version>.jar          # downloaded
java -jar target/posters-demo-store-<version>.jar   # built yourself
```

By default, the shop is available at [http://localhost:8080/](http://localhost:8080/) and [https://localhost:8443/](https://localhost:8443/). When opening the homepage via HTTPS, expect your browser to complain about the certificate since Posters comes with a self-signed certificate.

{{% note notitle %}}
For more information about how to customize the application, e.g. changing the default http/https port or adding a custom server certificate, please check the [readme](https://github.com/Xceptance/posters-demo-store#customizing-posters).
{{% /note %}}

Posters stores its database and log files to the subdirectories `db` and `log`in the current directory.

When Posters is started for the first time, it will populate its database with a basic product catalog and a default customer (email: `john@doe.com` / password: `topsecret`). With more and more customers registering with the shop and placing orders, the database will grow over time.

If you want to start over with a clean database, simply stop the app and delete the subdirectory `db`. On the next start, Posters will recreate the directory and the database.