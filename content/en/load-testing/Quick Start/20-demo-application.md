---
title: "The Demo App"

weight: 20
type: docs

description: >
  How to get and run Posters, the demo application.
---

All official XLT releases ship with a real-world demo web application (*Posters*) as the system under test and a [test suite](../30-demo-test-suite) to test this application. Both can be found in the directory `<XLT>/samples`.

{{< TODO >}}
Change when posters will be shipped individually/move to its own Github repo/hint to official instance when we have one, but this is not intended to be loadtested!
{{< /TODO >}}

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