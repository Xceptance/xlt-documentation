---
title: "The Demo App"

weight: 20
type: docs

description: >
  How to get and run Posters, the demo application.
---

All XLT releases are shipped with the "Posters" demo application. Posters is a small e-commerce store and is used to learn and demo XLT. It can be found in the directory `<XLT>/samples`.

*Posters* is a shop software written in Java. Being small and easy to deploy, it is well suited to demonstrate testing with XLT.

To start the demo application open a terminal (or command prompt window) and type the following command sequence:

```bash
cd <XLT>/samples/app-server/bin
./start.sh
```

{{% note notitle %}}
Windows users have to use the appropriate `.cmd` file located in the same directory by entering `start.cmd` into the command prompt.
{{% /note %}}

This starts an application server containing the *Posters* application. To access it, open a browser with this URL: <http://localhost:8080/posters/>. Please take some time to become familiar with *Posters*.

{{% note title="Changing the default ports" %}}
The demo application uses ports 8080 (http) and 8443 (https) per default. If you need to change this, you can do so by opening the file `<XLT>/samples/app-server/start.ini` and changing the settings for `jetty.http.port` and `jetty.ssl.port`.
{{% /note %}}

There is also a <a href="https://35.184.136.113:8443/posters/" target="_blank">Posters demo store</a> available. Please note: **this setup is for testing purposes only and does not handle a lot of load**. Please setup your own copy of the Posters demo store if you want to experiment with executions of higher load factors and more complex test configurations. The Posters store source code is also available on <a href="https://github.com/Xceptance/posters-demo-store" target="_blank">Github</a>.