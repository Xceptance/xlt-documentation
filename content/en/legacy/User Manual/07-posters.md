---
layout: manual
title: Demo Application
---

Running Posters
---------------

XLT ships with a real-world demo web application (*Posters*) as the
system under test and a test suite to test this application. Both can be
found in the directory `<XLT>/samples`.

*Posters* is a shop software written in Java. Being small and easy to
deploy, it is well suited to demonstrate testing with XLT.

To start the demo application open a terminal (or command prompt window)
and type the following command sequence:

bc(bash).. cd <XLT>/samples/app-server/bin  
./start.sh

> Windows users have to use the appropriate `.cmd` file located in the
> same directory by entering `start.cmd` into the command prompt.

This starts an application server containing the *Posters* application.
To access it, open a browser with this URL:
<http://localhost:8080/posters/>. Please take some time to become
familiar with *Posters*.

The Posters Test Suite
----------------------

XLT lets you create test cases using different approaches, that is test
cases can be written directly in Java with your favourite IDE or they
can be recorded as simple scripts with Script Developer. A test suite
may contain test cases created with either approach, and so does the
*Posters* test suite. Even though the number of test scenarios is
limited here, our sample project perfectly demonstrates the differences
between the two approaches, and - for Java-based test cases - what APIs
are available to implement them.

### Directory Structure

An XLT test project has a simple directory structure. The following
directories have to exist in order for everything to run smoothly:

-   `<project>/classes` contains the compiled code of your project.
    Normally, your IDE will do the job and place the files there. You
    can optionally build a JAR and place it in the `<project>/lib`
    directory.
-   `<project>/config` contains all the properties files used to
    configure the project.
-   There can be an optional `<project>/config/data` directory where you
    can place any data file you need for the test, such as address data,
    logins, and so on. All files are uploaded to the agent before a load
    test takes place. The programming API provides easy access to this
    data.
-   You can place all your required libraries in `<project>/lib`. The
    content is uploaded to the runtime agent and included in the class
    path. For your local development within an IDE, you have to manually
    add the libraries to the class path of your project.
-   The `<project>/src` directory holds the Java-based test cases of
    your project. This code is compiled into classes by your IDE or
    build environment. It’s organized in main packages, typically one
    package for test cases, one for actions, and one for utility
    classes. Make sure the compiled classes end up in `project/classes`
    because this is the directory XLT configures as class path for your
    test.
-   The `<project>/scripts` directory contains test scenarios as script
    test cases. Again, the code is organized in main packages, one
    package for test cases, a.k.a. scenarios, and one for reusable
    modules.

### Understanding the Test Scenarios

Since *Posters* is a shop software, our test scenarios cover the typical
use of an online shop:

-   **Visitor**: A visitor arrives on the homepage, and that’s it.
-   **Browse**: The visitor arrives on the homepage, then starts
    browsing some main- and sub-categories and views a random product
    detail page.
-   **Search**: The visitor arrives on the homepage and enters one or
    more search phrases, then opens the product detail page for one of
    the search result items.
-   **Register**: A visitor creates an account.
-   **Add To Cart**: **Browse** extended by adding the shown product to
    the cart and viewing the cart.
-   **Guest Checkout**: **Add To Cart** with a subsequent checkout
    process but without submitting the order.
-   **Checkout**: **Add To Cart** with a subsequent checkout process as
    registered user and, again, without submitting the order.
-   **Guest Order**: **Guest Checkout** with a completed checkout
    including submission of the order.
-   **Order**: **Checkout** including submission of the order.

Note that the scenarios share some common steps, thus allowing a clear
demonstration of how to reuse code across test cases.

Running Script Test Cases in Firefox
------------------------------------

To run the script test cases in Firefox, import the test project into
Script Developer first.

### Importing the *Posters* Test Suite into Script Developer

1.  Open Script Developer.
2.  Click the folder-like toolbar button and choose ‘Import…’ to open a
    file system explorer window.
3.  Navigate to `<XLT>/samples`, mark `testsuite-posters`, and then
    click *Select Folder*.

The tree view on the left-hand side displays all available script test
cases and modules.

### Executing Script Test Cases in Script Developer

Open Script Developer. All script test cases and modules are listed in
the script explorer. Double-click the `TSearch` test case to open it and
see the list of its commands and called modules inside the work area.
Click the *Play* icon to start replaying the script in Firefox.
Alternatively, right-click on the test case in the tree view and choose
*Run* from the context menu.

Running Java Test Cases in Headless Mode
----------------------------------------

Java-based test cases are executed in headless mode, that is in a
simulated browser that doesn’t perform page rendering. Script test cases
may also be run in this mode via Java wrapper classes. Before you can do
so, you need to import the sample test suite into your Java IDE.

### Importing the *Posters* Test Suite into Eclipse

After starting Eclipse and creating a workspace, do the following:

1.  Open the import dialog (*File* \> *Import* \> *General* \> *Existing
    Project Into Workspace*).
2.  Select the root directory to search in and point to `<XLT>/samples`.
3.  Select the test suite project `testsuite-posters` from the list.
4.  Click *Finish*.

Since the imported project has dependencies on the libraries of XLT, you
have to adjust these dependencies.

1.  Right-click on your project and select *Properties*.
2.  Click *Java Build Path*.
3.  Select the *Libraries* tab, then click *Add External JARs*.
4.  Go to `<XLT>/lib` and select all JARs. Then click *Open*.
5.  A list of all these JARs is displayed. Close the dialog with *OK*.

Eclipse will rebuild the project and shouldn’t report any build problems
if configured properly.

> Users of other IDEs have to carry out similar steps.

Executing Java Test Cases in Eclipse
------------------------------------

Any Java test case can be directly run in Eclipse in headless browser
mode. Go to package `com.xceptance.xlt.samples.tests`, select the test
case class (e.g. `TSearch`), and run it as JUnit test via the Eclipse
class file context menu.
