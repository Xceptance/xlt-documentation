---
layout: manual
title: Script Developer
---

Introduction
------------

XLT Script Developer is a Firefox extension used to create test case
scripts. Script test cases are based on a simple syntax and a reduced
set of operations, which makes them a perfect fit for non-programmers.
Besides Script Developer, no other tool is necessary to create, edit,
and manage basic script test cases.

Script Developer *records* test cases, that is you simply use an
application you want to test while your actions are being recorded in
the background and stored to an XML script file. During recording, you
can add commands to perform validations on the page. Any recorded value
can later be extracted from the script into a test data file to separate
test data from script code. Scripts may also be exported as ordinary
Java code.

With Script Developer, script files can be replayed in Firefox at any
time to quickly check whether the test case is running successfully.

Before you set up and use Script Developer, it is recommended to learn
about its basic concepts.

Basic Concepts
--------------

[Selenium](http://seleniumhq.org/) is widely used for test automation of
web applications. XLT and Script Developer rely on similar concepts,
which shall be defined in the following and referred to throughout this
manual:

An *Action* is an atomic collection of *Commands* in a test. It may
actually be split into sub-parts, but it can generally be seen as
mathematically closed part of a test. Also see
[here](04-framework.html#toc-basic-concepts) because the concept of an
*Action* is the same for the XLT framework and Script Developer.
However, be aware that our definition of the term *Action* completely
differs from the one used by Selenium.

An *Assertion* verifies that a condition still holds true. Thus, it
always consists of the formulation of an expected value that is compared
to the actual value. If both values are different, the condition is
violated and the test will abort with an error.

A *Command* in Script Developer is the same as in Selenium. It’s a
single statement in the test, for example, causing the test to sleep for
some time, simulating a click, or waiting for an element to become
visible.

An *Element Locator* or *Element Identification Strategy* is the
approach used to identify an element on a page. While in simple examples
different strategies lead to the same result causing the same effort,
their benefits may differ in more complex scenarios.

These concepts will be repeatedly touched upon in the next chapters,
especially those on test editing. See
[Appendix](10-command-reference.html) for a full list of available
commands, including examples.

Settings
--------

Before you start, make sure the Script Developer Firefox extension is
installed correctly. Open the Script Developer window via the Firefox
*Tools* menu or, alternatively, you can add an XLT icon to your toolbar
via the *Customize* menu. If you start XLT Script Developer for the very
first time, you will be asked to configure a test suite. Click OK, then
select a directory that contains a XLT test suite or, if no test suite
exists yet, select a target directory where a new test suite should be
created.

Next, you need to change some basic settings. In the upper left of the
Script Developer window, go to *Script Developer* \> *Settings* to open
the configuration dialog.

![Script Developer Settings](/images/user-manual/ScriptDev_Settings-small.png "Script Developer Settings"):/images/user-manual/ScriptDev\_Settings.png
<span class="caption">Script Developer Settings</span>

### Java Code Settings

**Generate JUnit wrapper class for test cases**: Activates the
generation of JUnit wrapper classes needed to run recorded scripts in
your Java IDE. This box has to be checked if you want to run load tests
using recorded test cases or if you want to automate these tests, e.g.
in a build process.

**Source Directory Name**: The name of the directory where the generated
Java source code is saved (*src* in most cases). The path is relative to
the location of the current test suite.

**File Encoding**: The character encoding scheme for the JUnit wrapper
classes. It should match the settings in your IDE when running test
cases as JUnit tests.

### Recording Settings

**Element Identification Strategies**: Check the boxes to select element
identification strategies available during test case recording. Each web
element type has a default identification strategy. If you haven’t
checked it, one of the other identification strategies will be used to
identify the element. For example, when you deselect the *Name*
checkbox, the recorder will avoid command targets like *name=xyz* and
the *name* attribute in XPath expressions. Note that XPath is used as a
fall-back strategy and can’t be disabled.

**Attribute Filtering**: *Include Patterns* and *Exclude Patterns* let
you filter attributes used in element locators. If an *Include Pattern*
is defined, then only attributes matching this filter pattern are used
in element locators, whereas non-matching attributes will be avoided. On
the other hand, an attribute will be avoided in element locators if it
matches one of the *Exclude Patterns*. *Exclude Patterns* always take
precedence over *Include Patterns* , that is an attribute will be
avoided if it matches the *Exclude Pattern*, even if it also matches any
*Include Pattern*. Both pattern types are available for *ID*, *Name*,
and *Class* attributes and must be given as regular expressions. More
than one *Include and Exclude Patterns* can be defined, separated by
whitespace.

### Replay Settings

**Command Timeout (in sec.)**: Defines the default timeout for replaying
`WaitForXyz` commands. When this time has elapsed and the condition is
still false, the command will fail with an error message. This value can
be changed for particular scripts by using the `setTimeout` command.

**Implicit Wait Timeout (in msec)**: This value defines the maximum time
to wait for the target element to (dis)appear before the command is seen
as failed. It is used by all commands that require a target element
**but not** by `assert` and `waitFor` commands.

The implicit wait timeout is extremely useful if your web application is
very dynamic and uses asynchronous JavaScript to build and modify the
page. Normally, you would use a `waitFor` command to wait for the
element to appear before you can interact with it. When an implicit wait
timeout is defined, most of the `waitFor` commands can be omitted,
making your test cases shorter and easier to maintain.

### Editor Settings

**Display line numbers**: If checked, line numbers are shown in front of
a command when a test case or module is open for editing.

**Auto save upon replay**: If checked, your test suite will be saved
automatically every time you replay a test case.

UI Elements
-----------

The main window of Script Developer features the following sections and
elements:

![Script Developer](/images/user-manual/ScriptDev_MainWindow-small.png "Script Developer"):/images/user-manual/ScriptDev\_MainWindow.png
<span class="caption">Script Developer</span>

### Toolbar and Record/Replay Section

| Control                                                   | Description                                                                                                                                                                                                                                                                                           |
|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span style="white-space:nowrap;">Script Developer</span> | Provides access to *Settings*, *Edit Test Suite Details*, *Manage Global Test Data*, *Online Documentation* and the *About* page, which has a link to the XLT Website.                                                                                                                                |
| Replay Speed                                              | Controls the replay speed for test cases and modules. The selected replay speed determines how long elements addressed by commands are being highlighted during replay. Please note that this does NOT affect how fast those commands are being executed.                                             |
| Replay                                                    | Replays the currently loaded test case or module.                                                                                                                                                                                                                                                     |
| Single Step Forward                                       | Executes the currently marked command and moves to the next command.                                                                                                                                                                                                                                  |
| Pause                                                     | Pauses the replay of a test case, and activates the *Continue Replay* and *Single Step Forward* buttons.                                                                                                                                                                                              |
| Continue Replay                                           | Continues replay of a paused test case or module.                                                                                                                                                                                                                                                     |
| Stop                                                      | Stops recording or replay of a test case or module.                                                                                                                                                                                                                                                   |
| Record                                                    | Starts recording your actions on the web page in your active browser tab window.                                                                                                                                                                                                                      |
| Save                                                      | Saves the currently open test case or module.                                                                                                                                                                                                                                                         |
| Save All                                                  | Saves all open test cases and modules.                                                                                                                                                                                                                                                                |
| Reload                                                    | Reloads all test cases and modules in the test project.                                                                                                                                                                                                                                               |
| Undo                                                      | Reverts the last change to the currently open test case since you last opened it.                                                                                                                                                                                                                     |
| Redo                                                      | Reverses the last *Undo*.                                                                                                                                                                                                                                                                             |
| Base URL                                                  | Displays the base URL that is saved for the currently open test case (in *italics*). You can temporarily change it by entering another one into the edit field or by selecting from the drop-down menu. If you enter a valid URL, the URL saved in the test case will be overridden by the new value. |

### Project View

The *project view* contains a tree view, the *script explorer*, that
lists all available **test cases** and **modules** structured in
**packages**. Script Developer loads all test cases and modules from
`<test-suite>/scripts` and its sub-folders. The package structure of the
script explorer is reflected by the structure of the sub-folders.

> The package structure in the script explorer also reflects the package
> structure of the generated JUnit wrapper classes.

The drop-down box includes all test suites known to Script Developer,
which lets you easily switch between projects. Use the *Create/Import*
button to import existing test projects still unknown to Script
Developer.

> When importing a project, make sure to choose the parent directory of
> the *scripts* directory, and not the *script* directory itself. To
> create a new project, select an existing directory from the file
> dialog popping up after you’ve clicked the *Create/Import* button.

You can filter the displayed test cases or modules using the input field
below the script explorer. Click the small arrow icon on the left to
filter the list either by name, description, tag, or any combination of
these. Typed characters are case-insensitive. To reset the search
result, click the *x* icon on the right side of the input field or
manually delete all characters.

You may change the alphabetic sorting (A-Z or Z-A) of the packages by
clicking on the header of the *Name* column. The second column shows a
description for each test case or module. You can add or edit the
description in the *Edit Details* dialog.

### Editor Tabs

To open a test case or module for editing, double-click on a script or
select the context menu option **Edit**. The script’s commands are
listed inside the work area on the right-hand side of the developer
window. The **Edit Details** option allows you to edit particular
details and displays the test case or module in the editor window to
help you recognize that something has been changed. You can open more
than one script at a time and select a test case or module by clicking
on the respective tab above the command list. The script editor tab
displays the *Name*, *Target*, and *Value* attributes of each command in
three adjustable columns.

### Information and Log panel

The Information tab provides context related information for the
selected testcase, module or command. Among others this includes type,
name, description, comment, parameters, tags, ID. All comments and
descriptions of items can be written in [GitHub Flavored
Markdown.](https://help.github.com/articles/markdown-basics/) The
Information panel displays the text in a formatted style which allows to
easily integrate tables, lists, bold or italic text etc. to
comments/descriptions.

The Log tab lists all testcase or command executions and module calls.

Record and Replay
-----------------

### Recording

Recording your interaction with the application you want to test is the
easiest way to create test scripts. To do this, you need to:

1.  Open the web page you want to start with in a Firefox tab. Make sure
    this tab remains active, that is the foreground tab.
2.  Switch to Script Developer and create a new test case via the
    context menu in the script explorer. Provide a meaningful name. An
    empty script editor tab opens.
3.  Click the *Start Recording* icon in the tool bar to start recording.
4.  Switch back to your web page and start using it. All your
    interactions with the page are being recorded.
5.  When you’re done with your test scenario, switch back to Script
    Developer and click the *Stop* icon to stop recording.
6.  Don’t forget to save the new script by clicking the *Save* icon or
    by using the *Ctrl+S* shortcut.

> If you have the Firefox Add-on *Firebug*, you need to make sure it
> isn’t active during recording because its highlight mechanism may
> cause unnecessary interactions to be recorded.

Note that besides recording the normal web page flow, you can also
validate the correctness of pages by using assert commands. Generally,
new or changed pages emerge throughout an interaction with a web page
and should thus be checked. To record assertions, do the following:

1.  Open the Firefox context menu and select *Script Developer*
    (available only during recording). A sub-menu opens.
2.  Choose an appropriate assertion from the sub-menu. See [Command
    Reference](10-command-reference.html) for a full list of available
    assertions.
3.  Continue interacting with the web page as defined by your test
    scenario.

![Record commands using the context menu](/images/user-manual/ScriptDev_CmdContextMenu-small.png "Record commands using the context menu"):/images/user-manual/ScriptDev\_CmdContextMenu.png
<span class="caption">Record Commands Using the Context Menu</span>

For each assertion, there is also a variant checking whether the
respective condition is *not* true. You can record as many assertions as
you like.

### Replay a Test Case

Once you’ve recorded a test case, it can be executed inside your
browser. In the script explorer, right-click the test case to open its
context menu, and then click *Run*. Alternatively, do the following:

1.  Open the test case script in a test case editor tab or activate the
    tab if it’s already open, and
2.  click the *Play* icon in the tool bar.

The script is replayed in the active Firefox browser tab.

While the script is running, you can watch the results of the script
execution. You can see how links are being clicked, input fields are
being filled, buttons and checkboxes are being clicked, etc. Inside the
browser tab, actions and validations the script is currently dealing
with are highlighted yellow and orange, respectively. Inside the script
tab, the commands are marked with a special status icon. It’s yellow as
long as the command or module is being executed. When the execution is
finished, the icon will either turn green in case of success or red in
case of errors. Note that the script execution will immediately stop if
a command fails.

If you have difficulties following the script execution, use the speed
slider in the tool bar to reduce the replay speed. Increase it if you
need the results as quick as possible. Be aware though that the commands
are not being executed any slower or faster this way. The slider only
affects the amount of time elements are being highlighted.

You may stop or pause the script execution at any time. To stop a
script, click the *Stop* icon in the tool bar. As a result, the script
is terminated. The *Pause* icon suspends the execution of a script
(after finishing the currently running command). To continue the script
execution, click the *Continue Replay* icon. Alternatively, you can
click the *Single Step Forward* icon, which only causes the next command
to be executed.

You can set a start point and one or more breakpoints for a test script.
See section [Edit Test
Suite](03-scriptdeveloper.html#toc-edit-test-suite) for more
information.

> Note that clicks on alert, confirmation, or prompt boxes are not
> recorded and thus don’t pop up during replay either. Instead, Script
> Developer simulates a return value of the alert() or confirm()
> function, which is equivalent to clicking “OK” or “Yes”. For prompt(),
> an empty string is returned as your input value.

#### Running Batch Tests

A sequence of test cases or an entire test suite can be run as batch
test. Select the desired test cases from the script explorer by clicking
them while holding the *CTRL* key, or, alternatively, choose one or more
packages to run. Click *Run as Batch Test* from the script explorer
context menu to start the batch test.

The selected test cases are executed consecutively. The result is
displayed in a new tab in the work area with a colored bullet for each
test case indicating the current state of the test execution. Grey
stands for not tested, yellow for currently running test cases, green
for passed and red for failed test cases. The total number of selected
test cases, the number of executed test cases, an error count, and the
elapsed time is shown in the header of the batch test tab.

![Batch Test](/images/user-manual/ScriptDev_BatchTest-small.png "Batch Test"):/images/user-manual/ScriptDev\_BatchTest.png
<span class="caption">Batch Test</span>

After the batch test is completed, the *Rerun failed tests* button will
become active if at least one test failed. Clicking it starts a new
batch test in a new tab with all test cases that failed the previous
batch test. To export the batch test result to HTML, click the *Export
as HTML* button and provide a meaningful name and a target location. You
can then view the batch execution report in any web browser.

![Batch Test HTML Report](/images/user-manual/ScriptDev_BatchReport-small.jpg "Batch Test HTML Report"):/images/user-manual/ScriptDev\_BatchReport.png
<span class="caption">Batch Test HTML Report</span>

Edit Test Suite
---------------

You can modify script test cases and modules at any time. Often enough,
it’s necessary to fix mistakes made during the recording of the test
scenario. For example, you may have clicked a wrong link or forgotten to
add an assertion. In the first case, just go back and continue with your
test scenario; the unwanted or incorrect actions can be deleted later
on. In the second case, manually add the appropriate assertion commands
after you’ve finished recording. To modify a test case during recording,
switch to the Script Developer window, make the necessary changes, and
then return to the web page to continue recording.

### Editing Test Suite

![Test suite context menu](/images/user-manual/ScriptDev_TestCaseMenu-small.png "Test suite context menu"):/images/user-manual/ScriptDev\_TestCaseMenu.png
<span class="caption">Test Suite Context Menu</span>

The right-click context menu in the script explorer offers the following
options for editing the test suite and scripts (test cases or modules):

| Menu Item            | Description                                                                                                                   |                                                                                                                                                                                                                                 |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| New                  | Test Case                                                                                                                     | Creates a new test case. You can define name, script package, tags, description, base URL, and enable test case-specific settings in the dialog that pops up.                                                                   |
| Script Module        | Creates a new script module. See [Script Modules](03-scriptdeveloper.html#toc-script-modules) for details.                    |                                                                                                                                                                                                                                 |
| Java Module          | Creates a new custom Java module. See [Creating Java Modules](03-scriptdeveloper.html#toc-creating-java-modules) for details. |                                                                                                                                                                                                                                 |
| Script Package       | Creates a new script package. The complete package name must always be specified, e.g. *testcases.cart.order*.                |                                                                                                                                                                                                                                 |
| Run                  |                                                                                                                               | Directly runs the selected test case without opening it in the editor.                                                                                                                                                          |
| Run as Batch Test    |                                                                                                                               | A sequence of test cases, packages, or an entire test suite can be run as a batch test.                                                                                                                                         |
| Edit                 |                                                                                                                               | Opens the script as a tab for editing in the work area and lists its commands.                                                                                                                                                  |
| Edit Details         |                                                                                                                               | Opens a dialog to edit script details like name, package, tags, description, base URL, test case-specific settings, or module parameters.                                                                                       |
| Refactor             | Rename Script                                                                                                                 | Opens a dialog to rename the selected script.                                                                                                                                                                                   |
| Move Script(s)       | Opens a dialog to move the selected script to another package.                                                                |                                                                                                                                                                                                                                 |
| Rename Package       | Opens a dialog to rename the selected script package.                                                                         |                                                                                                                                                                                                                                 |
| Copy                 |                                                                                                                               | Copies the selected testcase to the clip board.                                                                                                                                                                                 |
| Paste                |                                                                                                                               | Pastes a previously copied testcase from the clip board to the selected package.                                                                                                                                                |
| Refresh              |                                                                                                                               | Like the *Reload* button in the toolbar, but only reloads the currently selected test case.                                                                                                                                     |
| Enable/Disable       |                                                                                                                               | Enables/disables the selected tests. Disabled tests will be skipped by batch tests and annotated with @Ignore when exported to Java.                                                                                            |
| Export               |                                                                                                                               | Opens a dialog to define settings for exporting the script to Java (*XLT Scripting API* or *XLT Action API*). See [Export Test Case to Java](03-scriptdeveloper.html#toc-export-to-java) for details.                           |
| Manage Test Data     |                                                                                                                               | Opens a dialog to define test data you want to store in a separate file. See [Manage Test Data](03-scriptdeveloper.html#toc-managing-test-data) for details.                                                                    |
| Edit Data Sets       |                                                                                                                               | Opens a dialog that allows you to define data sets for Data-Driven tests in the selected test case. See [Data Sets](03-scriptdeveloper.html#toc-data-sets) or [Data-Driven Tests](06-datadriven.html) if you want to know more. |
| Delete               |                                                                                                                               | Deletes the selected script or package.                                                                                                                                                                                         |
| Link with Editor     |                                                                                                                               | When checked, if you click on a test case in the Project View, it will bring you to the Editor tab belonging to it if it’s opened and vice versa.                                                                               |
| Package Presentation |                                                                                                                               | Allows you to switch the view of your test suite between a *Flat* and *Hierarchical* presentation.                                                                                                                              |

### Editing Details

When choosing *Edit Details* from the context menu, a dialog opens that
lets you edit details of the selected test case or module.

![Edit Test Case Details](/images/user-manual/ScriptDev_EditTestCaseDetails-small.png "Edit Test Case Details"):/images/user-manual/ScriptDev\_EditTestCaseDetails.png
<span class="caption">Edit Test Case Details</span>

![Edit Module Details](/images/user-manual/ScriptDev_ExtractModule-small.png "Edit Module Details"):/images/user-manual/ScriptDev\_ExtractModule.png
<span class="caption">Edit Module Details</span>

| Control                                    | Description                                                                                                                                                                                                                                                          |
|--------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ID                                         | The test case ID. In contrast to the test case name the ID must be unique across all packages.                                                                                                                                                                       |
| Name                                       | The name of the test case. However changing it requires to use the *Rename Script* refactoring operation from the context menu.                                                                                                                                      |
| Package                                    | The script package of the test case. However changing it requires to use the *Move Script(s)* refactoring operation from the context menu.                                                                                                                           |
| Tags                                       | Tags to group several test cases and make them easier to find. Tags have to be separated by comma. The list of available test cases can be filtered by tags.                                                                                                         |
| Description                                | A description of the test case.                                                                                                                                                                                                                                      |
| Base URL                                   | The base URL for the test case. This is only used if the base URL input field of the Script Developer toolbar is empty or contains an invalid URL. The base URL defined here is displayed in the toolbar in *italics* and can be overridden by entering a new value. |
| Enable test case specific settings         | Enables the second checkbox *Generate JUnit wrapper class for test case* to define a test case-specific setting that overrides the global value.                                                                                                                     |
| Generate JUnit wrapper class for test case | If active, the global setting for generating JUnit wrapper classes will be overridden for the current test case by the value of this checkbox. See [Settings](03-scriptdeveloper.html#toc-settings) for more information about the global setting.                   |
| Parameters                                 | The parameters of the module.                                                                                                                                                                                                                                        |

Depending on whether the selected element for editing its details is a
test case or a module, the dialog elements *Enable test case specific
settings*, *Generate JUnit wrapper class for test case*, and
*Parameters* are shown or not shown.

> All scripts and script packages are named exactly like their
> file/directory counterpart. However, when looking up a script/package
> by name, Script Developer performs this operation case-insensitively.
> This behavior is in contrast to the XLT framework and will therefore
> be changed in the near future. Please make sure you always use the
> correct casing when you have to enter a script or package name.

### Editing Scripts

After opening a script (test case or module) as a tab in the work area,
you can edit it by selecting one of the options from the context menu. A
script may consist of actions, commands, and module calls.

![Edit Script Menu](/images/user-manual/ScriptDev_EditingScriptsMenu-small.png "Edit Script Menu"):/images/user-manual/ScriptDev\_EditingScriptsMenu.png
<span class="caption">Edit Script Menu Details</span>

The following options for editing are available (item = action, command,
module call or script comment):

| Command                  | Description                                                                                                                                                                                                                                          |                                                                                                             |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| Insert                   | Action                                                                                                                                                                                                                                               | Inserts an action before the selected item. See [Actions](03-scriptdeveloper.html#toc-actions) for details. |
| Command                  | Inserts a command before the selected item. Inserting a command is an alternative to recording them on the page.                                                                                                                                     |                                                                                                             |
| Module                   | Inserts a module call before the selected item. Modules can also be inserted by dragging them from the script explorer to the script.                                                                                                                |                                                                                                             |
| Comment                  | Inserts a script comment line before the selected item.                                                                                                                                                                                              |                                                                                                             |
| Edit                     | Opens a dialog to edit the attributes of the selected item. Editing a module call lets you both edit its parameter values and replace the current module with another one.                                                                           |                                                                                                             |
| Open Module              | Opens the called script module in a separate tab of the work area for editing.                                                                                                                                                                       |                                                                                                             |
| Extract Module           | Saves the selected items as a module and replaces these items with a call to the new module. You can select several items by holding the *CTRL* key while clicking. Alternatively, hold the *SHIFT* key and select the commands with the arrow keys. |                                                                                                             |
| Enable/Disable           | Enables or disables the selected item. When a module call is disabled, all commands of that module will be disabled as well.                                                                                                                         |                                                                                                             |
| Refresh                  | Same as *Refresh* in the script explorer context menu, refreshes the currently selected test case.                                                                                                                                                   |                                                                                                             |
| Toggle Start Point       | Sets/deletes a start point for replaying the script. If set, the replay starts at the marked command.                                                                                                                                                |                                                                                                             |
| Toggle Breakpoint        | Sets/deletes a break point. If set, script execution will pause upon reaching the marked command. You can set multiple break points.                                                                                                                 |                                                                                                             |
| Clear all Breakpoints    | Deletes all set break points.                                                                                                                                                                                                                        |                                                                                                             |
| Toggle Post-Steps Marker | Sets the test case’s post-steps marker above the currently selected command. See [Post-Steps for Test Cases](03-scriptdeveloper.html#toc-post-steps-for-test-cases) for more info.                                                                   |                                                                                                             |
| Execute Command          | Immediately executes the selected command in the currently active browser tab.                                                                                                                                                                       |                                                                                                             |
| Cut                      | Cuts the selected items from the script to insert them at another position in the same script or in another one.                                                                                                                                     |                                                                                                             |
| Copy                     | Copies the selected items to insert them at another position in the same script or in another one.                                                                                                                                                   |                                                                                                             |
| Paste                    | Pastes the previously cut or copied items.                                                                                                                                                                                                           |                                                                                                             |
| Delete                   | Deletes the selected items.                                                                                                                                                                                                                          |                                                                                                             |

### Editing Commands

To edit a command, select *Edit* from the context menu. The *XLT - Edit
Command* dialog opens:

![Edit command](/images/user-manual/ScriptDev_EditCommand-small.png "Edit command"):/images/user-manual/ScriptDev\_EditCommand.png
<span class="caption">Edit Command</span>

| Control              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                            |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Command              | The name of the command to be executed (interacts with the page or executes an assertion). A drop-down box next to the command input lists all available commands with a small description. See [Appendix](10-command-reference.html) for a full list of commands.                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                            |
| Target               | Defines the target element(s) to be addressed by the command. Not all commands require a target (e.g. *open*), so this may be empty. For each generated locator, Script Developer keeps a list of alternative locators in memory. If desired, you can later switch to another locator type (or xpath variant) by using the drop-down box next to the target input field. These alternatives are not part of the script file and cleared after reloading the test case. |                                                                                                                                                                                                                                                                                                                                                                                            |
| Resolved Target      | Targets may contain placeholders, e.g. module parameters (@{…}), test data (${…}), and [macros](03-scriptdeveloper.html#toc-macros). *Resolved Target* is a read-only field that displays the target expression where all placeholders are resolved to actual characters. Variables are resolved recursively, so you can use variables within resolved content.                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                            |
| Value                | Sets a value for a command, e.g. the page title to be asserted or the text to be typed into an input element. Not all commands require a value (e.g. *check* or *click*). For commands like *assertText* or similar, you can define an explicit text-matching strategy.                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                            |
| Resolved Value       | Values may contain placeholders, e.g. module parameters (@{…}), test data (${…}), and [macros](03-scriptdeveloper.html#toc-macros). The *Resolved Value* field shows the value of the command with all placeholders resolved. Variables are resolved recursively, so you can use variables within resolved content.                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                            |
| Comment              | An optional comment for the command, used to document the purpose of this test step.                                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                            |
| Context Window       | The window page to look upon.                                                                                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                            |
| Element Lookup       | Elements found                                                                                                                                                                                                                                                                                                                                                                                                                                                         | When you enter a target expression in the *Target* field, Script Developer will analyze the window page and display the number of found elements matching this target. It will also display how many of them are visible at the moment, e.g. *Elements found: 3 (visible: 1)*. If more than one element can be found on the window page, the command will be executed for the first match. |
| Highlight Element(s) | Highlights all target elements found on the set window page.                                                                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                            |
| Evaluate             | Clicking the *Evaluate* button executes the command and shows the result (Passed or Failed) considering the resolved target and resolved value. During script debugging and script execution, you can instantly evaluate assertions without executing the whole test case to see whether or not your verification expression matches.                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                            |

### Start Point for Replaying Test Cases

By default, the execution of a script starts at its beginning.
Sometimes, however, it might come in handy to start it from a specific
command. Select the respective command and press <kbd>S</kbd> to set a
start point or, alternatively, choose *Set Start Point* from the context
menu. A start point marker looking like the replay icon appears next to
the command. Now click the *Play* icon in the toolbar to start the
execution from the marked command.

> Make sure the right page is displayed in the active Firefox tab so
> that the script can be started at the selected command. Otherwise, it
> is likely to fail.

### Breakpoints

To automatically pause the script execution at a certain command, you
can set a breakpoint by selecting the respective command and pressing
<kbd>B</kbd>. A breakpoint marker appears next to the command. When the
script is being replayed, execution will automatically pause upon
reaching the command. You can go on replaying the script by clicking
*Continue Replay* or *Single Step Forward* in the toolbar. To clear the
breakpoint, mark the command again and press <kbd>B</kbd>. A breakpoint
may also be set or deleted using the context menu or by double-clicking
the breakpoint column (the grey leftmost column). When you set a
breakpoint for a command inside a module that is used multiple times,
the respective command in each module call will be marked with a
breakpoint and the replay will pause each time one of these module calls
is reached.

> Breakpoints exist in memory only. Closing the appropriate script
> editor tab or reloading the script clears all of its breakpoints.

### Actions

As you may have noticed, Script Developer automatically inserts
*Actions* while recording. An action is a sequence of steps that belong
together. For example, filling in the inputs of a form, submitting the
form by clicking the submit button, and checking the resulting page with
assertions is typically one action. Actions are primarily used to break
the page flow down into atomic steps and to give those steps a name.
Action execution times are measured and reported while running load
tests.

Script Developer gives actions generic names, but you can rename them to
facilitate script maintenance. You can also manually insert a new action
at any position of your script (*Insert \> Action*). The start of a new
action automatically ends the previous action, even if the following
action is part of a module call.

bq(note).. Note that actions are not meant to structure your scripts
visually since they are not comments. In other words, you should *not*
use actions to structure a long list of validations without loading a
new page. Insert script comments instead.

Using actions in this context would conflict with their [basic
concept](04-framework.html#toc-basic-concepts), namely that they should
always load one new page. The misuse of actions in script test cases
makes it difficult to analyze the test results because actions then fail
to represent the page flow. Also remember to give your actions
meaningful names (e.g. *Search*, *Browse*, or *AddToCart*).

Script Modules
--------------

### Extracting a Module

Like test cases, script modules are sequences of commands, actions, and
optional calls to other modules. They can be written from scratch, but
it’s much easier to extract them from an existing test case. That means
you record your test script first to identify reusable parts of that
script afterwards. These parts are then factored out into separate
modules.

To extract a module, do the following:

1.  Open the original test case.
2.  Select the groups of commands you want to extract by clicking them
    while holding the *CTRL* key.
3.  Choose *Extract Module* from the context menu.
4.  Provide a meaningful module name and the script package.
5.  Optionally provide tags, a description, and module parameters.

After confirming with the OK button, you can find the new module in the
script explorer. Additionally, the original test case is modified now so
that the selected items are replaced by a call to the new module.

Most editing options for test cases are available for modules as well,
such as the editing of module properties and commands of a module.
Therefore, [Edit Test
Suite](03-scriptdeveloper.html#toc-edit-test-suite) and Editing Commands
also apply to modules. You can open a module in a separate tab and edit
its commands there. It’s also possible to edit a module’s command from
within a test case using this module. When you do so, keep in mind that
editing a module’s command may also affect other test cases using this
module.

The script explorer context menu offers two options for creating new
modules. Select *New Script Module* to create a new script module from
scratch as an alternative to extracting it from a test case. *New Java
Module* creates a script interface to integrate Java code into a script
test case for the purpose of running the test case outside Script
Developer later, but will be skipped when creating the test case using
Script Developer. See [Creating Java
modules](03-scriptdeveloper.html#toc-advanced-topics) for more
information.

### Defining Module Parameters

You can parameterize modules to increase their reusability in other
contexts and scenarios. For example, a module that logs in a user should
be parameterized with the user name and password. Script module
parameters are defined as part of the module’s meta-data. To use these
parameters later in the module’s script code as target or value, you
refer to them by using the special
`{} placeholder notation (for example: `{userName} and @{password}) in
the target and/or value of a command).

To parameterize a module, you need to:

1.  Select the module from the library and open the *Edit Details*
    dialog.
2.  Declare the module parameters. You can add parameters with the **+**
    button and delete parameters with **-** (see figure “Edit Module
    Details” below).
3.  Add a short description to make clear what the intention of each
    parameter is.
4.  After confirming the changes, open the module in an editor tab in
    the work area.
5.  Edit the commands that should use any of the defined parameters.
    Where needed, replace literal values in the target or value of the
    command with @{name} placeholders (see figure “Refer to module
    parameters in a command” below).
6.  Save the module.

![Edit Module Details](/images/user-manual/ScriptDev_ExtractModule-small.png "Edit Module Details"):/images/user-manual/ScriptDev\_ExtractModule.png
<span class="caption">Edit Module Details</span>

![Refer to Module Parameters in a Command](/images/user-manual/ScriptDev_EditModuleCommand-small.png "Refer to Module Parameters in a Command"):/images/user-manual/ScriptDev\_EditModuleCommand.png
<span class="caption">Refer to Module Parameters in a Command</span>

For all test cases using this module, you have to provide a value for
each placeholder:

1.  Open the test case in an editor tab.
2.  Select *Edit* from the context menu of the module call inside the
    test case, then open the *Edit module* dialog.
3.  Provide a valid value for each placeholder.
4.  Close the *Edit module* dialog and save the test case.

![Provide Values for Module Parameters](/images/user-manual/ScriptDev_InsertModule-small.png "Provide Values for Module Parameters"):/images/user-manual/ScriptDev\_InsertModule.png
<span class="caption">Provide Values for Module Parameters</span>

### Modules and Actions

You can extract a module from any part of the script, but there are some
basic rules you should follow when extracting modules - especially when
it comes to actions. Actions are important when you run load tests
because load test reports are based on actions. Always keep in mind the
[basic concepts](04-framework.html#toc-basic-concepts) of XLT test
cases.

In Script Developer, an action starts with an action line in the script
and ends with the beginning of the next action, regardless of whether
the next action is part of a module or not.

In most cases, modules are used more than once in a test suite. Be
careful of actions contained in modules. If a module starts with a
sequence of commands followed by an action, the commands of this module
might be part of an action of a completely different module. This won’t
cause your test scripts to break, but it may lead to confusion when
analyzing load test reports.

![Bad style: Module call in script test case with hidden action](/images/user-manual/hidden_actions_1-small.jpg "Bad style: Module call in script test case with hidden action"):/images/user-manual/hidden\_actions\_1.png
<span class="caption">Bad style: Module call in a script test case with
hidden action</span>

![Bad style: Hidden action in a module call](/images/user-manual/hidden_actions_2-small.jpg "Bad style: Hidden action in a module call"):/images/user-manual/hidden\_actions\_2.png
<span class="caption">Bad style: Hidden Action in a Module Call</span>

When extracting modules, it is recommended to follow these rules to
facilitate test report analyzability:

-   Modules should either contain no actions at all **or** start with an
    action if they do contain one or more actions.
-   If a module contains one or more actions, then the first line after
    the module call in the script should also be an action.

In other words, for each module you should decide if you

-   use a module as a reusable sequence of commands that will always be
    part of one enclosing action **or**
-   encapsulate one or more complete actions as a module.

![Good style : Module calls in a script test case](/images/user-manual/module_style_1-small.jpg "Good style : Module calls in a script test case"):/images/user-manual/module\_style\_1.png
<span class="caption">Good style : Module Calls in Script Test
Case</span>

![Good style: Modules with no action at all or completely encapsulated actions](/images/user-manual/module_style_2-small.jpg "Good style: Modules with no action at all or completely encapsulated actions"):/images/user-manual/module\_style\_2.png
<span class="caption">Good style: Modules with no Action at all or
Completely Encapsulated Actions</span>

Managing Test Data
------------------

By default, test data is hard-coded into the test script. To simplify
changing test data, the data values can be bound to variables and all
occurrences can be replaced by references to the appropriate variables.
These bounded test data values can be referred to as *test data
mappings* since a test data variable is mapped to a certain value. All
test data mappings of a script are managed using the separate data file
`<name>_data.xml`, where `<name>` is the name of the corresponding
script. For example, the test data file of the script `TSearch` is named
`TSearch_data.xml` and stored next to the script file `TSearch.xml`.
Test data can also be defined on a package level.

To manage test data for a script test case, script module or package do
the following:

1.  Select the script or package in the explorer.
2.  Choose *Manage Test Data* from the context menu of the script
    explorer’s tree view, or alternatively press
    \<kbd\>Alt\</kbd\>+\<kbd\>D\</kbd\>. A dialog comes up where you can
    add new variable mappings, edit existing ones, or remove those you
    don’t want to use anymore. Note that you may also use this dialog to
    simply check what test data mappings exist and whether they override
    any default value.
3.  Close the dialog. The data file is saved automatically.

![Manage Test Data](/images/user-manual/ScriptDev_ManageTestData-small.png "Manage Test Data"):/images/user-manual/ScriptDev\_ManageTestData.png
<span class="caption">Manage Test Data</span>

When you open the dialog for the first time, it will show an empty map
where you can add the mappings you want to use. Each mapping is
represented as a 3-column row with the first column specifying the name
of the test data variable and the third column specifying the value of
the variable. The second column is a read-only field displaying the
default value of the test data variable if one is set. Source for this
inherited/default value may be a global test data mapping or a test data
mapping on a package level higher up in the hierarchy.

Each of the defined test data variables can be referenced arbitrarily
often in the scripts by using the `${...}` syntax. For example,
`${foobar}` references the variable `foobar`.

As soon as you have a reference to a test data variable and you rename
the variable in the *Manage Test Data* dialog, the reference is
automatically adjusted in your scripts to reflect the change(s) you’ve
made.

Test data mappings may not only be specified for test case scripts, but
also for modules. If a module has a test data file and this module is
called by a test case that also has a test data file, both test data
files will be used to access the required values. If several test data
files contain a test data mapping with the same name but different
values, the test case data file will have priority.

> Test data variables are scoped, that is a script cannot access test
> variables defined by a called script. Furthermore, the calling script
> may overwrite test data variables defined by the called script. This
> forms a scope chain that is defined by the call hierarchy of your
> scripts. The scope of global test data variables is always the end of
> this scope chain.

### Global Test Data

Certain test data (such as user credentials or product data) are often
the same for many or even for all test cases in a test suite. However,
if the data needs to be changed, the test data mappings of all affected
test cases would equally need to be adapted one by one. To minimize the
effort of maintaining such data, you can define it as *global* test
data.

Each of the global test data mappings is available to all of your
scripts in the current test suite and their values serve as default
values that can be overridden by a script if necessary. This way, you
may also specify a test data fallback, since a global test data value is
used only when no script-specific test data value could be found.

To edit the global test data, go to *Script Developer* and select
*Manage Global Test Data*. A dialog opens that is almost identical to
the *Manage Test Data* dialog (see above), except that each test data
mapping is represented as a 2-column row instead of a 3-column one.

All global test data is stored in the file `global_testdata.properties`
located in the root directory of the respective test suite.

Data Sets
---------

Starting with XLT 4.7.0, data-driven testing can also be done in Script
Developer. Although the only supported format for data sets files in
Script Developer is XML, you now have the possibility to maintain these
files inside of Script Developer as well as use them to run your tests
with multiple data sets.

### Managing Data Sets

To edit the data sets for a given test case, select it in the Script
Explorer view on the left and choose ‘Edit Data Sets..’ from the
context-menu. In case no data set is defined yet, the resulting dialog
will look like *Manage Test Data*.

The individual data sets are organized in columns, whereas the rows
define the various data mappings. All of the test data variables are
defined in the first column. The mapped values can be found in the same
row and are associated with the respective data set column.

![Edit Data Sets](/images/user-manual/ScriptDev_EditDataSets-small.png "Edit Data Sets"):/images/user-manual/ScriptDev\_EditDataSets.png
<span class="caption">Edit Data Sets</span>

To insert a new key (test data variable), just press the button labeled
with ‘Add Key’ and a new row will be appended to the existing matrix.
Give the new key a meaningful name, so that the red border disappears.  
Move the new test data variable row up or down by using the appropriate
arrow buttons in the bottom left area of the window. In order to remove
a test data variable mapping, hover over the key name and click on the
icon that looks like a dash in a circle.

Add a new data set by pressing the button labeled with ‘Add Data Set’.
To remove a data set, click on the icon at the bottom of the data set
column.

> Similar to Test Data files, data sets files are expected to reside in
> the same directory as the test case that uses it. Furthermore,
> mappings defined in data sets files override any mapping with the same
> key defined in the script’s test data file.

### Performing Data-Driven Tests

To run a data-driven test, select the appropriate test case in the
Script Explorer view on the left and execute it by either pressing the
shortcut <kbd>X</kbd>, choosing the context-menu item *Run* or clicking
the *Play* icon in the toolbar.

A new dialog opens, prompting you to select the data-sets to use for the
test run.

![Choose Data Sets](/images/user-manual/ScriptDev_ChooseDataSets-small.png "Choose Data Sets"):/images/user-manual/ScriptDev\_ChooseDataSets.png
<span class="caption">Choose Data Sets</span>

In case you select no data set or only one, the test will be run as
usual. If more than one data set is selected, the test is executed as a
batch test. Each run represents one iteration of the test with one of
the chosen data-sets. The total number of test runs in the batch is
equal to the number of chosen data-sets.

![Perform Data-Driven Test](/images/user-manual/ScriptDev_DataDrivenTest-small.png "Perform Data-Driven Test"):/images/user-manual/ScriptDev\_DataDrivenTest.png
<span class="caption">Perform Data-Driven Test</span>

> When you select more than one test and execute them as batch test, you
> won’t be prompted to choose among data sets. All available data sets
> will be implicitly chosen for batch test execution.

Post-Steps for Test Cases
-------------------------

Commonly, test cases are responsible for maintaining proper application
state. A test case needs to set up prerequisites in the beginning and
restore the state before ending it’s execution. State changes done by a
test might break subsequent tests or prevent the same test to be
executed multiple times in a row. State persistence of web applications
needs to be handled carefully. Test cases that comply with a
well-defined application state or are completely independent reduce the
risk of unforeseen and unwanted side effects.

In case a test fails, it might be necessary to roll back application
state changes that have been done previously by the test. Script
Developer offers the possibility to define so called Post-Steps.
Post-Steps usually occur after the actual test code and are performed in
each and every case. The area entirely made up of these steps is called
“Post-Steps Section” in Script Developer. Each of the steps in this
section is guaranteed to be executed. (This excludes disabled commands
and module calls not meeting a configured condition.)

> Post-Steps are supported for test cases only and there can be only one
> Post-Steps Section per test. Furthermore, exporting test cases to XLT
> Action API is currently not supported.

To define Post-Steps in Script Developer, open the test case in the
editor and select the command where the Post-Steps section should start
at. Open the context-menu and choose ‘Toggle Post-Steps Marker’. The
styling of the edit view will change. A red line will visualize where
the Post-Steps section begins. A slightly different coloring of commands
below this line indicates that they belong to the Post-Steps section of
the test and their execution is guaranteed. Differentiating Post-Steps
from conventional commands is easily possible with these visual cues.

![Test Case with Post-Steps](/images/user-manual/ScriptDev_PostSteps-small.png "Test Case with Post-Steps"):/images/user-manual/ScriptDev\_PostSteps.png
<span class="caption">Test Case with Post-Steps</span>

The beginning of the Post-Steps section can be moved arbitrarily by
enabling (toggling) the marker at different commands of the test case.
To remove the Post-Steps section, select the command right below the red
line and toggle the Post-Steps marker once more. The commands in the
Post-Step section will not be modified or removed when disabling the
marker.

To evaluate a command of the Post-Steps section - or any command of the
test case for that matter - use the context menu to select a starting
point somewhere in your test case and press the *Play* icon.

As mentioned above, Script Developer will execute the commands of the
Post-Steps section in each and every case. A successful test case is
executed command after command, which of course includes the commands of
the Post-Steps section. Otherwise, if a command fails that is not a
Post-Step, Script Developer will jump to the Post-Steps section and
continue the execution at its first command (below the marker line). In
case one of the Post-Steps commands fails, Script Developer continues
with the command that directly follows the failed one. Failed module
calls of the Post-Steps section will abort the module execution and the
next command (at the top-level) of the Post-Steps section is run. Script
Developer will print the failure reason (if set) of the very command
that fails.

Post-Steps sections are also supported when replaying your test cases
via generated *JUnit* wrapper classes or being exported to XLT’s
[Scripting API](04-framework.html#toc-xlt-scripting-api). In case of
generated wrapper classes, the test scripts and contained Post-Steps
sections are interpreted as usual. However, when exporting your tests to
Java, all commands of the script will be converted to actual Java method
calls and each script module will become a separate Java class. Each
defined Post-Step of your test script will be a separate method
annotated with JUnit’s
*`After_. Therefore only test cases can have Post-Step sections, because after converting to Java similarly only test classes allow for _`After*
annotations.

Export to Java
--------------

Scripting test cases using Script Developer is easy but limited. The
scripts are strictly linear and the set of available commands can’t
always replace a programming language. In certain cases, it is therefore
useful to take advantage of powerful programming languages such as Java.
Java provides both the structure to reuse code and a wide range of
available libraries. Typically, you will have to switch to Java if your
tests need to act randomly, for example, if you want the TBrowseCatalog
test case to not always open the same catalog but a randomly chosen one
instead. This behaviour is especially convenient for load tests meant to
simulate realistic traffic.

The setting *Generate JUnit wrapper class for test cases* only lets you
generate Java wrapper classes to execute the XML scripts from outside
Script Developer, which is not a real export.

In contrast, ***Export*** translates the test-script file into Java
syntax and generates one or more classes representing the test case and
modules. When exporting to Java, you can choose the API used for the
resulting code. You may either generate code based on the [XLT Scripting
API](04-framework.html#toc-xlt-scripting-api) or code based on the [XLT
Action API](04-framework.html#toc-xlt-action-api).

To export a script test case or module to Java, follow these steps:

1.  Select the script(s) you want to export from the script explorer.
2.  Choose *Export* from the context menu. The *XLT - Script Export*
    dialog opens.
3.  Define the source directory, package prefix, and API (or accept the
    suggested values).
4.  Click *OK*.

As a result, you find the generated Java code in the specified packages.

![Export Script to Java](/images/user-manual/ScriptDev_Export-small.png "Export Script to Java"):/images/user-manual/ScriptDev\_Export.png
<span class="caption">Export Script to Java</span>

-   **Source Directory**: The name of the directory where the generated
    Java source code is saved (`src` in most cases). The path is
    relative to the location of the current test suite.
-   **Package prefix**: The package prefix for the generated Java
    classes. The resulting package is composed of this prefix and the
    script package of the exported test case.
-   **API**: The API for the resulting Java code, [XLT Scripting
    API](04-framework.html#toc-xlt-scripting-api) or [XLT Action
    API](04-framework.html#toc-xlt-action-api).

> The *XLT Action API* does not support [Java
> modules](03-scriptdeveloper.html#toc-advanced-topics). When you export
> to *XLT Action API*, possible calls to Java modules are omitted in the
> resulting code and a comment is inserted instead.

### Export to XLT Scripting API

The following example shows the *TSearch* test case of the demo test
suite exported to XLT Scripting API code:

bc(java).. /  
\*

<p>

Simulates storefront search.

</p>

\*/  
public class TSearch extends AbstractWebDriverScriptTestCase  
{  
/  
\* Constructor.  
\*/  
public TSearch()  
{  
super(new XltDriver(true), “http://localhost:8080/”);  
}

/  
\* Executes the test.  
\*  
\* `throws Throwable if anything went wrong
     */
    `Test  
public void test() throws Throwable  
{  
final OpenHomepage \_openHomepage = new OpenHomepage();  
\_openHomepage.execute();

//  
// \~ Search \~  
//  
startAction(“Search”);  
// Store a search phrase that gives results  
store(resolve(“${searchTerm\_hits}”), “searchTerm”);  
// Execute the search (module call)  
\_search.execute(resolve(“${searchTerm\_hits}”));

// Validate the entered search phrase is still visible in the input  
assertText(“id=searchTextValue”, resolve(“${searchTerm\_hits}”));  
// Validate presence of the search results page headline  
assertElementPresent(“id=titleSearchText”);  
// Validate the headline contains the search phrase  
assertText(“id=titleSearchText”,  
resolve(“glob:**Your results for your search:
’${searchTerm\_hits}’**”));  
// validate result counter  
assertText(“id=totalProductCount”, resolve(“${resultProductCount}”));  
//  
// \~ ViewProduct \~  
//  
startAction(“ViewProduct”);  
// Assert presence of one of the product thumbnails  
assertElementPresent(“id=product0”);  
// Store the name of the first product  
storeText(“css=\#product0 .pInfo .pName”, “productName”);  
// Click the product ilnk to open the product detail page  
clickAndWait(“css=\#product0 img”);  
// Validate it’s the correct product detail page  
assertText(“css=\#titleProductName”, resolve(“${productName}”));  
}

This is the code for the module *Search*, which is called by *TSearch*:

bc(java).. /  
\*

<p>

Searches the specified term.

</p>

\*/  
public class Search extends AbstractWebDriverModule  
{  
/  
\* {@inheritDoc}  
\*/  
@Override  
protected void doCommands(final String…parameters) throws Exception  
{  
final String searchTerm = parameters\[0\];  
// Enter the search phrase into the input  
click(“id=header-search-trigger”);  
waitForElementPresent(“id=header-menu-search”);  
type(“id=s”, searchTerm);  
// Cick the search button to submit  
clickAndWait(“id=btnSearch”);  
}  
}

Note that the XLT Scripting API Java code is very similar to the script
code. You can refactor the code as you like and directly use lower-level
APIs, such as the WebDriver API, to implement advanced functionality.
You may also add code to randomise your tests or to retrieve test data
from other sources, like the `GeneralDataProvider`. See [XLT Scripting
API](04-framework.html#toc-xlt-scripting-api) for details.

### Export to XLT Action API

When you export to the XLT Action API, the resulting code is based on
separate classes for each action of a test case. The script modules are
also translated into separate classes. If a script module contains more
than one action, it will be represented by a “flow”.

To make this approach work smoothly, it’s very important that you follow
the [rules for defining actions in the context of
modules](03-scriptdeveloper.html#toc-script-modules). If there is an
action in a module and it’s not the first item of this module, then an
automatically generated action will be inserted at the beginning of the
exported module code.

Run Tests outside Script Developer
----------------------------------

As soon as your test suite is complete, you can run the test cases
outside Script Developer in headless mode. This especially comes in
handy for functional tests and load tests as the XLT framework then is
responsible for interpreting the script test cases and sending the
respective requests to the system under test.

It is always recommended to have a JUnit wrapper class for each script
test case. This facilitates working with test scripts in your preferred
IDE since these tools generally know how to work with JUnit classes.

### Inside an IDE

To check whether your scripts are running successfully in headless mode,
open the test project in your favorite IDE, navigate to the JUnit test
classes, choose one of them, and then run it as JUnit test.

### Within Build Scripts

To run all or selected script test cases as part of your functional
tests, you need to make the corresponding JUnit classes available to
your test framework, such as a `junit` Ant task.

Typically, it’s sufficient to add the script test case wrapper classes
to the list of classes you want to be run by JUnit. If you prefer not to
have a wrapper class for each test script, add the class
`com.xceptance.xlt.api.engine.scripting.ScriptTestCaseSuite` to the list
of JUnit classes. It is a generic representative for a set of test
scripts. To tell the suite class which scripts are to be executed, use
the property
`com.xceptance.xlt.api.engine.scripting.ScriptTestCaseSuite.testCases`
and list the script names as below:

bc(ini).
com.xceptance.xlt.api.engine.scripting.ScriptTestCaseSuite.testCases =
TSearch TAddToCart

In any case, each test script is executed once and the results are part
of the JUnit test report.

> See the demo test suite in directory `<xlt>/samples/testsuite-posters`
> for an example of how to configure Ant’s `junit` task to run script
> test cases.

### As a Load Test

Performing load tests with your script test cases is easy. Register the
JUnit classes with the XLT load test framework and use them in your load
tests like regular Java-based tests. Note that if you do so, you need a
JUnit wrapper around your test script. See [Load
Testing](08-loadtest.html) for details.

Test Suite Documentation
------------------------

XLT allows to automatically generate a comprehensive documentation of
your Script Developer test suite. The output is a set of HTML pages that
give an overview on the containing packages, test cases and modules with
all relevant information like test steps, variables and test data with
comments and descriptions.

The scriptdoc generator is a command line tool which can be found in the
`<xlt>/bin` directory. To generate a test suite documentation, use this
command:

bc(bash). create\_scriptdoc.(sh/cmd) \[options\] <testsuite-directory>

By default generated documentation can be found in the given test suite
directory. Using the `-o` option allows to specify an alternative output
directory.

-   `-o <dir>`: an alternative output directory (optional)

For example:

bc(bash). ./create\_scriptdoc.sh -o ../scriptdoc
../samples/testsuite-posters/

Advanced Topics
---------------

### Test Suite Layout

A test suite managed by Script Developer typically looks like in the
figure shown below.

![Test Suite Layout](/images/user-manual/ScriptDev_TestSuite-small.png "Test Suite Layout"):/images/user-manual/ScriptDev\_TestSuite.png
<span class="caption">Test Suite Layout</span>

Please notice that data-sets files - used for data-driven tests as
described [here](06-datadriven.html) - are listed as well although they
are not processed by Script Developer. This is because refactoring
operations (e.g. renaming a script) treat them in the same way as script
data files. For example, when you rename a test case `TFoo` to `TBar`
then the corresponding data-sets file `TFoo_datasets.<ext>` will be
renamed to `TBar_datasets.<ext>` as well.

### File Generation

The figure below shows the different types of files generated by Script
Developer when wrapper class generation is enabled. The files generated
during the export to Java are not displayed.

![Script Developer File Generation](/images/user-manual/big-picture-small.jpg "Script Developer File Generation"):/images/user-manual/big-picture.png
<span class="caption">Script Developer File Generation</span>

In the following, the sample test case *TSearch* (available in the demo
application *testsuite-posters*) serves as a reference to describe all
of these file types in detail.

#### Test Script (TSearch.xml)

All the script files recorded by Script Developer are saved in XML
format following the naming convention *Testcasename.xml*. With
reference to our sample test case, *TSearch.xml* is the test case script
file that consists of all the commands and modules calls being used. The
syntax is very simple and easy to understand. See below for an example:

bc(xml).. <?xml version="1.0" encoding="UTF-8"?>  
<testcase xmlns="http://xlt.xceptance.com/xlt-script/2" version="4" baseURL="http://localhost:8080">  
<description>Simulates storefront search including search result
browsing.</description>  
<module name="posters.functional.modules.OpenHomepage"/>  
<action name="Search-NoHits"/>  
<command name="store" target="${searchTerm_noHits}" value="searchTerm">  
<comment>Store a search phrase that does not return any search
results</comment>  
</command>  
<module name="posters.functional.modules.Search">  
<comment>Execute the search (module call)</comment>  
<parameter name="searchTerm" value="${searchTerm}"/>  
</module>  
<command name="assertElementPresent" target="id=infoMessage">  
<comment>Assert presence of info maessage element</comment>  
</command>  
<command name="assertText" target="xpath=id('infoMessage')/div/strong" value="*Sorry! No results found matching your search. Please try again.*">  
<comment>Validate the ‘no results’ message</comment>  
</command>  
<action name="Search"/>  
<command name="store" target="${searchTerm_1}" value="searchTerm">  
<comment>Store a search phrase that gives results</comment>  
</command>  
<module name="posters.functional.modules.Search">  
<comment>Execute the search (module call)</comment>  
<parameter name="searchTerm" value="${searchTerm}"/>  
</module>  
<command name="assertText" target="id=searchText" value="${searchTerm}">  
<comment>Validate the entered search phrase is still visible in the
input</comment>  
</command>  
<command name="assertElementPresent" target="id=titleSearchText">  
<comment>Validate presence of the search results page
headline</comment>  
</command>  
<command name="assertText" target="id=titleSearchText" value="glob:*Your results for your search: '${searchTerm}'*">  
<comment>Validate the headline contains the search phrase</comment>  
</command>  
<action name="ViewProduct"/>  
<command name="assertElementPresent" target="id=product0">  
<comment>Assert presence of one of the product thumbnails</comment>  
</command>  
<command name="storeText" target="id=product0Name" value="productName">  
<comment>Store the name of the first product</comment>  
</command>  
<command name="clickAndWait" target="//*[@id='product0']//img">  
<comment>Click the product ilnk to open the product detail
page</comment>  
</command>  
<command name="assertText" target="id=titleProductName" value="${productName}">  
<comment>Validate it’s the correct product detail page </comment>  
</command>  
<action name="Search"/>  
<command name="store" target="${searchTerm_2}" value="searchTerm">  
<comment>Store search phrase to repeat search</comment>  
</command>  
<module name="posters.functional.modules.Search">  
<comment>Execute the search (module call)</comment>  
<parameter name="searchTerm" value="${searchTerm}"/>  
</module>  
<command name="assertText" target="id=searchText" value="${searchTerm}">  
<comment>Validate the entered search phrase is still visible in the
input</comment>  
</command>  
<command name="assertElementPresent" target="id=titleSearchText">  
<comment>Validate presence of the search results page
headline</comment>  
</command>  
<command name="assertText" target="id=titleSearchText" value="glob:*Your results for your search: '${searchTerm}'*">  
<comment>Validate the headline contains the search phrase</comment>  
</command>  
</testcase>

#### Test Data (TSearch\_data.xml)

Separating test data from script code by extracting the recorded values
into data files is a very useful feature. The naming convention being
used is *Testcasename\_data.xml*, so *TSearch\_data.xml* represents the
data file of the *TSearch* test case. A data file looks like this:

bc(xml).. <?xml version="1.0" encoding="UTF-8"?>  
<data xmlns="http://xlt.xceptance.com/xlt-script-data">  
<searchTerm_1>bear</searchTerm_1>  
<searchTerm_2>red bear</searchTerm_2>  
<searchTerm_noHits>gjP\#IQ!</searchTerm_noHits>  
</data>

#### Test Data Sets (TSearch\_datasets.xml)

Similar to test data files, the naming convention for data sets files is
*Testcasename\_datasets.xml*, such that *TSearch\_datasets.xml* defines
the data sets for the test case *TSearch*. A typical data sets file
looks like the following:

bc(xml).. <?xml version="1.0" encoding="UTF-8"?>  
<data-sets>  
<data-set>  
<searchTerm_1>bear</searchTerm_1>  
<searchTerm_2>red bear</searchTerm_2>  
<searchTerm_noHits>gjP\#IQ!</searchTerm_noHits>  
</data-set>  
<data-set>  
<searchTerm_1>bär</searchTerm_1>  
<searchTerm_2>roter bär</searchTerm_2>  
<searchTerm_noHits>heizöhlrückstossdämpfung</searchTerm_noHits>  
</data-set>  
</data-sets>

#### JUnit Test Case Wrapper (TSearch.java)

This file is generated when you enable wrapper class generation for your
test cases. The generation of wrapper classes lets you run your script
files outside the browser via the XLT framework that simulates a
headless browser. This mode suits unattended test case execution, such
as functional or load testing.

#### Custom Module (ComplexUserLoggedInCheck.java)

If some special constructs can’t be expressed due to the basic script
syntax, you may create your own custom modules and use them inside your
scripts. Custom modules are implemented in Java. See section “Creating
Java Modules” below for an example.

### Macros

When you create and run regression tests with Script Developer, you
sometimes need to have unique data available to run a test over and over
again. For example, user account creation always requires a new email
address since the target system accepts each address only once.

For the generation of timestamps and random strings or numbers, the
following macros are available:

-   **NOW**: returns the current time as time stamp (number of
    milliseconds elapsed since 1970-01-01)
-   **RANDOM.String(length)**: returns a random string of the given
    length
-   **RANDOM.Number(max)**: returns a randomly chosen integer between
    *0* (inclusive) and *max* (exclusive)
-   **RANDOM.Number(min,max)**: returns a randomly chosen integer
    between *min* (inclusive) and *max* (inclusive)

With the **${variable}** notation, you can use macros in any command. If
you want to input a random or unique email address, you could use one of
the code lines below as a value in the *type* command:

`${RANDOM.String(5)}@anyserver.com`

or

`${NOW}@anyserver.com`

The resulting email addresses might look like *zghfu@anyserver.com* or
*1295519733483@anyserver.com*.

If you use one of these macros as a value for a module parameter, the
random string or time stamp is created once for a test run and can then
be used in several commands of the module with an identical value. For
example, you can fill in a form with a random name, submit the form, and
then validate the name on the confirmation page. This will only work if
filling in the form, submitting it, and the validation are all part of
the same module. The name has to be defined as a module parameter and
referenced in the relevant commands with *@{name}*, where
*${RANDOM.String(8)}* is the provided value for the module parameter
*name*.

### Creating Java Modules

The commands supported by Script Developer are sufficient to create
working test scripts. However, there are some special constructs that
can’t be expressed due to its restricted script syntax, for example:

-   Combining assertions by a logical OR.
-   Performing advanced assertions which are not available as commands
    yet.
-   Accessing and validating downloaded files.

To overcome such limitations, you can create custom modules for test
cases meant to run outside Script Developer (as a load test, as JUnit
test in Eclipse, or integrated in a build process). The Java modules are
skipped when you run the test case in Script Developer.

Custom modules are written in Java by implementing the
`WebDriverCustomModule` interface. This interface forces you to apply
the required `execute` method. See below for an example:

bc(java).. public class ComplexUserLoggedInCheck implements
WebDriverCustomModule  
{  
public void execute(final WebDriver webDriver, final String…
parameters)  
{  
final WebElement webElement =
webDriver.findElement(By.xpath(“id(‘sidebar’)/div\[1\]/div\[1\]/span”));  
final String userName = parameters\[0\];

Assert.assertTrue(“Expected user name not found: ” + userName,  
webElement.getText().contains(userName));  
}  
}

Make sure the custom module class is compiled and made available on your
test suite’s class path.

To integrate Java custom modules into test scripts, you first need to
register them with Script Developer. You do so by creating a new Java
module script:

1.  Choose *New \| Java Module* from the script explorer context menu.
    The *Edit Module Details* dialog comes up (see the figure below).
2.  Fill out the necessary fields as described below.
3.  Close the dialog.

The new Java module is now available in the script explorer and can be
used in other scripts (test cases or modules) just like any other script
module. Note that Java modules can’t be edited and will be skipped when
you run the test case inside Script Developer.

![New Java Module](/images/user-manual/ScriptDev_NewJavaModule-small.png "New Java Module"):/images/user-manual/ScriptDev\_NewJavaModule.png
<span class="caption">New Java Module</span>

-   **Name**: The name of the new Java module.
-   **Script package**: The script package for the new Java module.
-   **Full Class Name**: The full class name (including package) of the
    Java class implementing the `WebDriverCustomModule` interface.
-   **Tags**: Tags to group modules and make them easier to find. Tags
    have to be separated by a comma. The list of available modules can
    be filtered by tags.
-   **Description**: A description of the module.
-   **Parameters**: The name of the parameters the module expects when
    being executed.

If you’ve defined module parameters, you need to provide a value for
each parameter when using the Java module in a test case. You access the
first of these parameters in your Java code by reading the value from
`parameters[0]`, the second one by reading the value from
`parameters[1]`, and so on. The name of the parameters defined in the
Java module script of Script Developer is not displayed in Java code;
only the order of the parameters is relevant.

Note that you should use Java modules only if absolutely necessary
because their execution will be skipped when you run the test case in
Script Developer. If Script Developer comes across a Java module while
replaying a script, it simply ignores it (the status icon turns grey)
and continues with the next command. The next command might or might not
succeed, depending on what the module does with the page. If the module
leaves the page unchanged (that is it performs advanced validations
only), the rest of the script will run successfully. However, if the
module does change the page or loads a new page, the commands following
the module are likely to fail. That’s why Java modules are mainly used
for complex validations.

> Feel free to let us know about extensions you create because we might
> include them in a future release.

### Assertions on Form Controls

When making assertions on form controls, it’s very helpful to know when
to choose which kind of assertion. To be more specific, for a given form
control you have to decide whether to use one of the `*Value` commands
or one of the `*Text` commands.

For each affected form control, the table below lists the input that
will be used when checking the element either by a `*Value` or a `*Text`
assertion. The input can be the element’s text content *T* or the
element’s `value` attribute *V*.

|                | `*Value`                               | `*Text` |
|----------------|----------------------------------------|---------|
| textarea       | *T*                                    | *T*     |
| text-input     | *V*                                    | *T*     |
| submit-input   | *V*                                    | \-      |
| button         | *V*                                    | *T*     |
| option         | *V* (*T* if `value` attribute not set) | *T*     |
| radio-input    | *V*                                    | \-      |
| checkbox-input | *V*                                    | \-      |

### Keyboard Shortcuts

| Context                                                | Command                                               | Keyboard Shortcut |
|--------------------------------------------------------|-------------------------------------------------------|-------------------|
| /16^. Global                                           | Increase Replay Speed                                 | \+                |
| Decrease Replay Speed                                  | \-                                                    |                   |
| Replay                                                 | Alt+F5                                                |                   |
| Single Step Forward                                    | Alt+F6                                                |                   |
| Pause                                                  | Alt+F7                                                |                   |
| Stop                                                   | Alt+F8                                                |                   |
| Record                                                 | Alt+F9                                                |                   |
| Reload Active Script                                   | F5                                                    |                   |
| Reload All Scripts                                     | Shift+F5                                              |                   |
| Save Active Script                                     | Ctrl+S                                                |                   |
| Save All Scripts                                       | Ctrl+Shift+S                                          |                   |
| Undo                                                   | Ctrl+Z                                                |                   |
| Redo                                                   | Ctrl+Shift+Z                                          |                   |
| Close Active Tab                                       | Ctrl+W                                                |                   |
| Close All Tabs                                         | Ctrl+Shift+W                                          |                   |
| Focus filter field                                     | Ctrl+F                                                |                   |
| /16^. Script Explorer                                  | New Test Case                                         | Ctrl+Shift+T      |
| New Script Module                                      | Ctrl+Shift+M                                          |                   |
| New Script Package                                     | Ctrl+Shift+P                                          |                   |
| Run                                                    | X                                                     |                   |
| Run as Batch Test                                      | Shift+X                                               |                   |
| Edit                                                   | Return                                                |                   |
| Edit Details                                           | Alt+Return                                            |                   |
| Rename                                                 | Alt+R                                                 |                   |
| Copy                                                   | Ctrl+C                                                |                   |
| Paste                                                  | Ctrl+V                                                |                   |
| Refresh                                                | F5                                                    |                   |
| Enable/Disable Test Case                               | Ctrl+Shift+C                                          |                   |
| Export                                                 | Shift+Alt+E                                           |                   |
| Manage Test Data                                       | Alt+D                                                 |                   |
| Edit Data Set                                          | Shift+Alt+D                                           |                   |
| Delete                                                 | Del                                                   |                   |
| /20^. Script Editor                                    | Insert New Action (before currently selected command) | Ctrl+O            |
| Insert New Command (before currently selected command) | Insert                                                |                   |
| Insert New Command (after currently selected command)  | Shift+Insert                                          |                   |
| Insert New Module (before currently selected command)  | Ctrl+M                                                |                   |
| Insert New Comment (before currently selected command) | Ctrl+P                                                |                   |
| Edit                                                   | Return                                                |                   |
| En/Disable Module/Command                              | Ctrl+Shift+C                                          |                   |
| Toggle Start Point                                     | S                                                     |                   |
| Toggle Breakpoint                                      | B                                                     |                   |
| Clear All Breakpoints                                  | Shift+B                                               |                   |
| Execute Command                                        | X                                                     |                   |
| Cut                                                    | Ctrl+X                                                |                   |
| Copy                                                   | Ctrl+C                                                |                   |
| Paste                                                  | Ctrl+V                                                |                   |
| Delete                                                 | Del                                                   |                   |
| Select All Commands                                    | Ctrl+A                                                |                   |
| Move Command Up                                        | Alt+Up                                                |                   |
| Move Command Down                                      | Alt+Down                                              |                   |
| Multiple Select                                        | Shift+Up/Down                                         |                   |
| Multiple Select Selective                              | Ctrl+Up/Down/Spacebar                                 |                   |
