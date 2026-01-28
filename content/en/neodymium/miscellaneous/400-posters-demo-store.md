---
title: "Posters Demo Store"

weight: 400
type: docs

description: >
  A demo store for testing developed by Xceptance
---

Posters is a fully functional, fake web shop developed by Xceptance for demonstration purposes. It is integrated with
Xceptance Load Test ([XLT](https://www.xceptance.com/en/xlt/download.html)), a tool for test automation and load
testing.

To run the Posters store, you need to download and extract a copy of XLT or clone the [GitHub](https://github.com/Xceptance/posters-demo-store) project.

{{< image max-width="80%" src="neodymium/posters.png" >}}
A look at the homepage for the Posters Demo Store, as it appears in its current version.
{{< /image >}}

## How to start posters

Navigate to the extracted XLT folder using the command line, then proceed to the `./samples/app-server/bin` folder.
Execute either `start.cmd` (Windows) or `start.sh` (Linux, macOS) and wait for the process to complete loading.

You can then access the Posters store in your browser by navigating
to [https://localhost:8443/posters/](https://localhost:8443/posters/).

{{% note notitle %}}
**NOTE:** On Linux/macOS, you might need to set the executable flag for `start.sh` before running the script.
{{% /note %}}

## Stopping posters

Simply press `Ctrl + C` and wait for the server to shut down.

## Resetting the Database

To reset the database, first stop the server. Then, delete the `./samples/app-server/data` folder. Restarting the server
will automatically recreate the database with its default values.

## Deleting Log Files

The log files created by the Posters store are located in the `./samples/app-server/logs` folder. You can delete these
files while the server is stopped to free up disk space.

## John Doe

A preset user named "John Doe" is included in the shop's database, with the email address "john@doe.com" and the
password "topsecret".
