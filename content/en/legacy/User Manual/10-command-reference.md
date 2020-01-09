---
layout: manual
title: Command Reference
---

Introduction
------------

This chapter thoroughly illustrates the commands available in XLT when
you either use the Scripting API or Script Developer. As both these
components almost support the exact same commands with the same syntax,
they are subsumed under this chapter. It provides useful information on
the general structure of commands as well as tables and examples for
each command. If you plan on using the XLT Scripting API, see the
additional hints at the end of this chapter. For information on the
other XLT components, see the chapters named after them.

Command Structure
-----------------

Commands have a name and may have a target parameter and/or a value
parameter, depending on the command in question. Most commands somehow
deal with parts of an HTML page, so the target of the command is taken
to identify the element on the page. A command may contain a delay, for
example the number of milliseconds to wait to continue the test after
clicking on an element. A command may also deal with some text that
should be matched and that is given as argument.

The exact parameters are given for each command in the command’s
description. In general, a command takes on the following forms:

1.  *CommandName()*,
2.  *CommandName(Target)*,
3.  *CommandName(Value)*, or
4.  *CommandName(Target, Value)*

The target is used to identify a part of an HTML page and the value is
some string or numerical value.

The parameters define:

1.  which element of an HTML page should be identified and how it should
    be identified (see
    [Locators](10-command-reference.html#toc-locators) ),
2.  which text should be matched and how it should be matched (see [Text
    Matching](10-command-reference.html#toc-text-matching) ),
3.  other parameters, such as a delay.

Note that even with the three parameter types listed above, a command
has at most two parameters.

A command may interpret its parameters differently and deal with them in
a very specific way. For example, the command “storeEval(target, value)”
interprets its target as JavaScript expression.

Locators
--------

Almost all commands operate on a certain item. Most of the time, this
item is an element on a page, but it may also be a window or a frame. To
identify, or *locate*, the item in question, you can specify locator
expressions defining which item should be located and by which means.

The general syntax of a locator expression is: `<strategy>=<value>`

The strategy defines *how* to search for an item, the *value* defines
which item is to be addressed. For instance, to locate an element with
ID attribute “foo”, you would specify this locator: `id=foo`

Note that the strategy (including the following equal sign) can be
omitted. In that case, a built-in default strategy is used. However, it
is recommended not to omit the strategy. It may save you some characters
to type, but at the same time you would always need to remember the
default strategy for a certain locator type.

If the evaluation of the locator results in no elements being
identified, the command will fail. If, on the other hand, the locator
identifies more than one element, the first element found will be used.

Currently, there are four types of locators:

1.  **element locators**: locate elements on an HTML page
2.  **attribute locators**: locate element attributes
3.  **option locators**: locate `<option>` elements inside a `<select>`
    element on an HTML page
4.  **window locators**: locate a browser window
5.  **frame locators**: locate a frame window on an HTML page

See the sections below for their detailed explanation.

### Element Locators

Elements can be identified by one of the following strategies:

\| **css** \| Identifies the first element matching the passed CSS
selector.<br/>The syntax is: `css=<CSS selector>` \|  
\| **dom** \| Identifies the first element matching the passed DOM
expression.<br/>The syntax is: `dom=<DOM expression>` \|  
\| **id** \| Identifies the first element matching the passed
ID.<br/>The syntax is: `id=<element id>` \|  
\| **identifier** \| Identifies an element by its ID, and then by
name.<br/>The syntax is: `identifier=<element id/name>` \|  
\| **link** \| Identifies the first link matching the passed link
text.<br/>The syntax is: `link=<link text>`<br/>**Note that the text of
a hidden link is empty!** \|  
\| **name** \| Identifies the first element matching the passed
name.<br/>The syntax is: `name=<element name>` \|  
\| **xpath** \| Identifies the first element matching the passed XPath
expression.<br/>The syntax is: `xpath=<XPath expression>` \|  
\| *<span class="default"></span>* \| When no locator strategy is
specified, it will behave the same as

<ul>
<li>

dom - if the expression starts with “document.”

</li>
<li>

xpath - if the expression starts with “//”

</li>
<li>

identifier - otherwise

</li>
</ul>

\|

Note that not all strategies are applicable to all elements. For
instance, the *link* strategy only makes sense when locating `<a>`
elements.

### Attribute Locators

When accessing an element’s attribute, you need to specify two things:
where the element itself can be found and the name of the attribute.
When you know both of them, you just need to put them together with an
@-character.

Thus, all attribute locators have the form: *\<Element
Locator&gt;@AttributeName*, where *\<Element Locator&gt;* is an
arbitrary element locator as defined above.

### Option Locators

When dealing with select boxes, you will need two locators: one that
identifies the select element, and one that identifies the option
element(s) in question. The first locator is a normal element locator.
For an option locator, you can use the following strategies:

|                                 |                                                                                                                                                       |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| **id**                          | Same as for the element locator strategy “id”.                                                                                                        |
| **index**                       | Identifies the option with the passed index (counting starts with 0).<br/>The syntax is: `index=<element index>`                                      |
| **label**                       | Identifies the option with the passed text label.<br/>The syntax is: `label=<element label>`<br/>**Note that the label of a hidden option is empty!** |
| **value**                       | Identifies the option with the passed value.<br/>The syntax is: `value=<element value>`                                                               |
| *<span class="default"></span>* | Same as *label* strategy.<br/>The syntax is: `<element label>`                                                                                        |

When you use any of the commands *addSelection* or *removeSelection*, be
aware that *all* options identified by the given option locator will be
processed, not just the first one.

### Window Locators

Windows can be identified by one of the following strategies:

|                                 |                                                                                                                                 |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| **name**                        | Identifies the window with the passed name. Wildcards and regexp are supported.<br/>The syntax is: `name=<window name>`         |
| **title**                       | Identifies the window with the passed title text. Wildcards and regexp are supported.<br/>The syntax is: `title=<window title>` |
| *<span class="default"></span>* | Tries to find a window by name first, then by title.<br/>The syntax is: `<window name/title>`                                   |

### Frame Locators

Frames can be identified in two ways:

-   locating the frame via special document properties, or
-   locating the corresponding `<frame>` element on the page.

The latter can be achieved by a regular element locator; the other
strategies work as follows:

|                                                     |                                                                                                                                              |
|-----------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| **index**                                           | Identifies the frame having the passed index (counting starts with 0) relative to the current page.<br/>The syntax is: `index=<frame index>` |
| **relative=parent**                                 | Identifies the parent window of the current frame.                                                                                           |
| **relative=top**                                    | Identifies the top level window of the current frame.                                                                                        |
| *See “Element Locators” for additional strategies.* |                                                                                                                                              |

Text Matching
-------------

Many commands check for the presence of some text on the page or wait
for some text to appear. Since the text displayed on the page may not
always be static but contain dynamic parts (such as the user name in
“Welcome, Mr. John Smith!”), the provided validation text needs to be
somewhat blurry as well (for example, “Welcome, Mr. \*!”). This is where
text-matching expressions come into play.

The general syntax of a text-matching expression is:
`<strategy>:<text pattern>`

The strategy defines which pattern syntax is used in the text pattern
following the colon. For instance, if you want to use the famous “?” and
“\*” wildcard characters in the text pattern, you need to specify an
expression such as this one: `glob:Welcome, Mr. *!`

Note that the strategy (including the subsequent colon) can be omitted.
In that case, a built-in default strategy is used.

Currently, there are three text-matching strategies:

|                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **glob**                        | The asterisk and question mark are meta-characters, everything else is treated as normal character. A question mark indicates that there has to be exactly one character and that it may be an arbitrary one, an asterisk indicates an arbitrary number (including zero) of arbitrary characters. For example, use “?all\*” to match “ball”, “wall”, “+all” regardless of what follows, and not to match “small” (which required “??all” or “??all\*”). Meta-characters can be used at arbitrary positions inside the text. For instance, use *link=result\*.css* to find the first link starting with “result” and ending with “.css”, regardless of what there is between “result” and “.css”. |
| **regexp**                      | Indicates that the given text is a regular expression that has to be matched by the inspected text. For example, use *link=regexp:\\d+* to find the first link with the link’s text consisting of an arbitrary number of digits.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **regexpi**                     | Indicates that the given text is a regular expression that has to be matched by the inspected text. However, in contrast to regexp, the case of the inspected text is ignored when checking for a match.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **exact**                       | Indicates that the given text has to exactly match. For instance, use *link=exact:?all* to find the link with the text “?all”.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| *<span class="default"></span>* | Same as **glob**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

> If your text pattern text contains a colon, you have to specify an
> appropriate text-matching strategy since the colon character is used
> as separator to parse the text-matching strategy and text pattern from
> the input string.

Be aware that prior to comparing the actual text with the expected text,
each sequence of whitespace (spaces, non-breaking spaces, line breaks,
or tabs) is replaced by a single space in both the actual text and the
expected text. This way, comparisons are independent of the actual
amount of whitespace.

Further note that depending on the command in question, the same
expression is treated slightly different. Some commands check whether
the text (of the located element / page) matches the expression, while
others check that the text *contains* a subsequence (may be the text
itself) matching the expression. For instance, with *exact=user* the
text *No users found!* may or may not match depending on the command.

Commands
--------

Commands can be categorized. Some of them interact with the elements of
an HTML page (for example, clicking on a button), some verify things
(for example, that the page’s title matches the expected one), some wait
for a condition to be fulfilled (for example, waiting for a specific
element to become visible), and some store data in variables so that it
can be reused later on. Finally, there is a left-over category for
miscellaneous commands.

Commands in different categories may nevertheless be somehow related.
Assume, for instance, you want to do something with the text shown on an
HTML page. Then you can use *assertText* to check whether the text
occurs on the current page, but you can also use *waitForText* to wait
for the text to show up on the page (it may be inserted by an AJAX
call). Furthermore, *storeText* lets you store the text of the targeted
element in a variable for later access.

The following section explains the available commands and their
respective categories. Within each category, they are listed in
alphabetical order; examples are provided for better comprehension.

> Note that each of the *assertXXX* and *waitForXXX* commands has the
> negated counterparts *assertNotXXX*, and *waitForNotXXX*,
> respectively. In these cases, references to previously explained
> commands are used to avoid lengthy repetitions.

### Commands That Interact With A Page

Commands that change the page or trigger events (for example, by
clicking on a link).

#### addSelection

Selects options in a multi-selection element. It selects all options
that match the command value, so it may select several! Will abort the
test with an error if no option matching the command value is found, the
element is no multi-selection element, the multi-select element is
disabled, or if it doesn’t support multi-selection. Accepts any element
locator except the link locator for the multi-select item and any option
locator for the value.

Example: *adddSelection(id=RadioChannel,index=1)*

#### check

Checks the targeted element. The element must be an input element, of
type *radio* or *checkbox* , and enabled. Will abort the test with an
error otherwise. Accepts any element locator.

Example: *check(id=beautifulWrapping)*

#### checkAndWait

Same as **check** but waits until page load triggered by checking the
targeted input element is completed or until the configured timeout is
reached. Will abort the test with an error if no page load is triggered
and/or the timeout is reached.

Example: *checkAndWait(id=beautifulWrapping)*

#### click

Clicks on the targeted element. Be aware that the click command doesn’t
wait for a page to be loaded, so don’t use it to click on a link. In
that case, use clickAndWait (otherwise, you’re likely to end up with
only a few parts of the new parts being loaded). Will abort the test
with an error if there is no element matching the given locator. Accepts
any element locator.

Example: *click(id=productsLink)*

#### clickAndWait

Same as **click** but waits until page load triggered by clicking the
targeted element is completed or the configured timeout is reached. Will
abort the test with an error if no page load is triggered and/or the
timeout is reached.

Example: *clickAndWait(id=productsLink)*

#### contextMenu

Performs a right-click on the targeted element. Will abort the test with
an error if there is no element matching the given locator or the
element is not visible. Accepts any element locator.

Example: *contextMenu(css=\#cartTable tr:nth-child(3))*

#### contextMenuAt

Performs a right-click on the targeted element at the given offset
position (relative to the target element). Will abort the test with an
error if there is no element matching the given locator, the element is
not visible or the given offset position is invalid.  
Accepts any element locator. The offset position has to be specified as
*x,y* where *x* and *y* denote the offsets (number of pixels) to add to
the *x*- and *y*-coordinate of the target element position.

Example: *contextMenuAt(css=\#cartTable tr:nth-child(3), 10,4)*

#### doubleClick

Double-clicks the targeted element. Will abort the test with an error if
there is no element matching the given locator. Accepts any element
locator.

Example: *doubleClick(id=confirm)*

#### doubleClickAndWait

Same as **doubleClick** but waits after the double-click for the page
load triggered by this action to be completed. Will abort the test with
an error if no page load is triggered and/or the configured timeout is
reached.

Example: *doubleClickAndWait(id=confirm)*

#### mouseDown

Clicks on the targeted element with the left mouse button and doesn’t
release it. Will abort the test with an error if there is no element
matching the given locator or the element is not visible. Accepts any
element locator.

Example: *mouseDown(id=confirmationButton)*

#### mouseDownAt

Clicks with the left mouse button on the targeted element at the given
offset position and doesn’t release it. Will abort the test with an
error if there is no element matching the given locator, the element is
not visible or the given offset position is invalid.  
Accepts any element locator. The offset position has to be specified as
*x,y* where *x* and *y* denote the offsets (number of pixels) to add to
the *x*- and *y*-coordinate of the target element position.

Example: *mouseDownAt(id=confirmationButton, 0,0)*

#### mouseMove

Moves the mouse to the targeted element. Will abort the test with an
error message if there is no element matching the given locator or the
element is not visible. Accepts any element locator.

Example: *mouseMove(id=confirmationButton)*

> Note that the mouse is not actually moved but the proper JavaScript
> event is triggered.

#### mouseMoveAt

Moves the mouse to the targeted element at the given offset position.
Will abort the test with an error message if there is no element
matching the given locator, the element is not visible or the given
offset position is invalid.  
Accepts any element locator. The offset position has to be specified as
*x,y* where *x* and *y* denote the offsets (number of pixels) to add to
the *x*- and *y*-coordinate of the target element position.

Example: *mouseMoveAt(id=confirmationButton, 0,0)*

#### mouseOut

Moves the mouse away from the targeted element. The mouse hovers to the
current page’s body and the locator is ignored. However, still trying to
identify an element using the locator, it will abort the test with an
error if such an element can’t be found or the element is not visible.
Accepts any element locator. Note that you **cannot** move the mouse
outside the current page’s HTML body.

Example: *mouseOut(id=confirmationButton)*

#### mouseOver

Hovers the mouse over the targeted element. Will abort the test with an
error if there is no element matching the given locator or the element
is not visible. Accepts any element locator.

Example: *mouseOver(id=confirmationButton)*

> Note that CSS hover events are **not** triggered by *mouserover* since
> these are implemented using native browser events.

#### mouseUp

Releases the left mouse button on the targeted element. Will abort the
test with an error if there is no element matching the given locator or
the element is not visible. Accepts any element locator.

Example: *mouseUp(id=confirmationButton)*

#### mouseUpAt

Releases the left mouse button on the targeted element at the given
offset position. Will abort the test with an error if there is no
element matching the given locator, the element is not visible or the
given offset position is invalid.  
Accepts any element locator. The offset position has to be specified as
*x,y* where *x* and *y* denote the offsets (number of pixels) to add to
the *x*- and *y*-coordinate of the target element position.

Example: *mouseUpAt(id=confirmationButton, 0,0)*

#### removeSelection

Deselects options in the targeted multi-selection element. Deselects all
options matching the command value, so it may deselect several! Will
abort the test with an error if no option matching the command value is
found, the element is no multi-selection element, the multi-select
element is disabled, or if it doesn’t support multi-selection. Accepts
any element locator except the link locator for the multi-select element
and any option locator for the value.

Example: *removeSelection(id=RadioChannel,index=1)*

#### select

Selects options in the targeted element. Will abort the test with an
error if no element matches the given locator, the element is not an
HTML select element, or if it is disabled. Doesn’t affect disabled
options. If the targeted element is a multi-select element, all other
options except the ones identified by the locator will be deselected.
Accepts any element locator for the target and any option locator for
the command value.

Example: *select(id=RadioChannel,index=1)*

#### selectAndWait

Same as **select** but waits for the page load triggered by the
selection to be completed or for the configured timeout to be reached.
Will abort the test with an error if no page load is triggered and/or
the configured timeout is reached.

Example: *selectAndWait(id=RadioChannel,index=1)*

#### submit

Submits the targeted form. Will abort the test with an error if the
element is not an HTML form. Accepts any element locator.

Example: *submit()*

#### submitAndWait

Same as **submit** but waits for the page load triggered by the form
submit to be completed or for the configured timeout to be reached. Will
abort the test with an error if the targeted form can’t be found, if no
page load is triggered, and/or if the configured timeout is reached.

Example: *submitAndWait()*

#### type

Types the command value into the targeted element. Will abort the test
with an error if no element can be identified using the locator. Accepts
any element locator.

Example: *type(id=quantity,1)*

#### typeAndWait

Same as **type** but waits for the page load triggered by typing the
given string to be completed. Will abort the test with an error if no
page load is triggered and/or if the configured timeout is reached.

Example: *typeAndWait(id=quantity,1)*

#### uncheck

Deselects the targeted checkbox or radio button. Will abort the test
with an error if no element matches the given locator, the element is
not an input element, not of type *checkbox* or *radio*, or if it is
disabled. Accepts any element locator.

Example: *uncheck(id=birthdayWrapping)*

#### uncheckAndWait

Same as **uncheck** but waits for the page load triggered by **uncheck**
to be completed. Will abort the test with an error if no page load is
triggered and/or the configured timeout is reached.

Example: *uncheckAndWait(id=birthdayWrapping)*

### Commands That Make An Assertion

See below for an explanation of all *assertXXX* and *assertNotXXX*
commands. While *assertXXX* commands check that the given condition
evaluates to *true*, *assertNotXXX* commands check that the given
condition evaluates to *false*.

#### assertAttribute

Asserts that an element’s attribute value matches the given expression.
Will abort the test with an error message in case there is no element
matching the given locator, the element doesn’t have the requested
attribute set or the value of the attribute doesn’t match the given text
expression.

Example: *assertAttribute(id=logo@title,glob:Link to\*)*

#### assertChecked

Asserts that an element is checked. Will abort the test with an error if
there is no element matching the element locator, the found element is
neither a checkbox nor a radio element, or if it is not checked.

Example: *assertChecked(id=termsAndConditions)*

#### assertClass

Asserts that the *class* attribute of the element in question contains
the given class(es). Multiple classes have to be specified as
white-space separated string. Will abort the test with an error if there
is no element matching the given element locator, the found element
doesn’t have a *class* attribute or its *class* attribute doesn’t
contain (any of) the given class(es).

Example: *assertClass(id=header,emphasized clearfix)*

#### assertElementCount

Asserts that the number of matching elements is equal to the given
value. Will abort the test with an error message if the number of
matching element is not equal to the given value. Accepts any element
locator.

Example: *assertElementCount(css=.small3.span4, 4)*

#### assertElementPresent

Asserts that an element is present on the page. Will abort the test with
an error if there is no element matching the element locator. Accepts
any element locator.

Example: *assertElementPresent(id=ProductDetails)*

#### assertEval

Asserts that the result of evaluating the command’s target as javascript
expression matches the given text pattern. Will abort the test with an
error message if the result of the evaluation doesn’t match the given
text pattern.

Example: *assertEval(window.location,regexp:^https?://)*

#### assertLoadTime

Asserts that the time needed to load the current page doesn’t exceed the
given value. Will abort the test with an error if page loading lasts too
long. Has no target (because it aims at the current page) but only a
mandatory value representing the number of milliseconds the page load
may last at most.

Example: *assertLoadTime(15000)*

#### assertNotAttribute

The inversion of *assertAttribute*, thus the syntax is the same except
the command name.

Example: *assertNotAttribute(id=logo@title,glob:Return to\*)*

#### assertNotChecked

The inversion of *assertChecked*, thus the syntax is the same except the
command name.

Example: *assertNotChecked(name=sameAsBilling)*

#### assertNotClass

The inversion of *assertClass*, thus the syntax is the same except the
command name.

Example: *assertNotClass(id=header,odd hotfix)*

#### assertNotElementCount

The inversion of *AssertElementCount*, thus the syntax is the same
except the command name.

Example: *assertNotElementCount(xpath=/html/body, 2)*

#### assertNotElementPresent

The inversion of *assertElementPresent*, thus the syntax is the same
except the command name.

Example: *assertNotElementPresent(id=ProductDetails)*

#### assertNotEval

The inversion of *assertEval*, thus the syntax is the same except the
command name.

Example: *assertNotEval(document.title,Homepage)*

#### assertNotSelectedId

Asserts that the ID of no selected option of the given select element
matches the argument pattern. Will abort the test with an error if no
element is found, the found element is not an HTML select, or if it has
no options. Accepts any element locator for the target and any
text-matching approach for the command value.

Example: *assertNotSelectedId(id=shippingMethod,UPS)*

#### assertNotSelectedIndex

Asserts that the index of no selected option of the given select element
matches the argument index. Will abort the test with an error if no
element is found, the found element is not an HTML select, or if it has
no options. Accepts any element locator for the target. The indices
start with 0.

Example: *assertNotSelectedIndex(id=shippingMethod,1)*

#### assertNotSelectedLabel

Asserts that the label of no selected option of the given select element
matches the argument pattern. Will abort the test with an error if no
element is found, the found element is not an HTML select, or if it has
no options. Accepts any element locator for the target and any
text-matching approach for the command value.

Example: *assertNotSelectedLabel(id=shippingMethod,UPS)*

#### assertNotSelectedValue

Asserts that the value of no selected option of the given select element
matches the argument pattern. Will abort the test with an error if no
element is found, the found element is not an HTML select, or if it has
no options. Accepts any element locator for the target and any
text-matching approach for the command value.

Example: *assertNotSelectedValue(id=shippingMethod,UPS)*

#### assertNotStyle

Asserts that the actual element’s style doesn’t match the given CSS
style declaration(s). Will abort the test with an error message if there
is element matching the given locator or the element’s actual style
matches (any of) the given CSS style declaration(s).

> Please notice that any size must be given in pixels and colors must be
> specified in *rgb* notation. Furthermore, browser-specific style rules
> may apply which might add a browser dependency to your tests. Also
> keep in mind that an element’s actual style may be influenced by the
> browser’s viewport properties (height, width etc.).

Example: *assertNotStyle(id=headline,color:rgb(255, 0, 0))*

#### assertNotText

Asserts that the command value (=text) doesn’t match the text of the
identified element. Will abort the test with an error if the element’s
text matches the value text or if there is no element matching the
target expression. Accepts any element locator for the command target
and any text-matching approach for the command value. **Note that hidden
elements have an empty string as text!**

Example:
*assertNotText(id=availability,regexp:.%{color:black}**%<b></b>out of
stock.**)*

#### assertNotTextPresent

Asserts that there is no text on the page matching the command value
(=text). Will abort the test with an error if the page’s text matches
the text. Has no target (because it aims at the current page). Accepts
any text-matching approach for the value. Differs to **assertNotText**
in so far that the text value is matched if the page *does contain* a
text snippet matching the text value, even if you use the *exact*
text-matching approach.

Example: *assertNotTextPresent(exact:? results returned)* (also matches
if the text is “No results returned!” because “o results returned” is
exactly matched by the command value)

#### assertNotTitle

Asserts that the page title doesn’t match the command value. Like for
**assertNotTextPresent**, there is no target because it aims at the
current page’s title. Unlike **assertNotTextPresent**, however, the text
must strictly match the command value (which nevertheless may contain
wildcards and such things). Will abort the test with an error if the
current page’s title matches the command value. Accepts any
text-matching approach.

Example: *assertNotTitle(exact:? results returned)* (doesn’t match if
the title is “0 results returned!” due to the exclamation mark)

#### assertNotValue

Asserts that the value of the element identified by the locator doesn’t
match the command value. Accepts any element locator for the target and
any text-matching approach for the command value.

Example: *assertNotValue(id=shippingMethods,UPS)*

#### assertNotVisible

Asserts that the element identified by the locator is currently not
displayed. Accepts any element locator.

Example: *assertNotVisible(id=shippingMethods)*

#### assertNotXpathCount

Asserts that the number of elements matching the locator doesn’t equal
the command value. Will abort the test with an error if the number of
matching elements equals the command value. Only accepts an xpath
expression for the locator.

Example: *assertNotXpathCount(xpath=a\[.=’continue’\],1)*

#### assertPageSize

Asserts that the size of the current page doesn’t exceed the given
number of bytes specified in the command value. Will abort the test with
an error if the page size is greater than the given value. Just as for
the other page-related commands, there is no locator. Make sure to
specify the value using an integer number, floating-point numbers result
in an error and test abortion.

Example: *assertPageSize(1024)*

#### assertSelectedId

The inversion of *assertNotSelectedId*, thus the syntax is the same
except the command name.

Example: *assertSelectedId(id=shippingMethod,UPS)*

#### assertSelectedIndex

The inversion of *assertNotSelectedIndex*, thus the syntax is the same
except the command name.

Example: *assertSelectedIndex(id=shippingMethod,1)*

#### assertSelectedLabel

The inversion of *assertNotSelectedLabel*, thus the syntax is the same
except the command name.

Example: *assertSelectedLabel(id=shippingMethod,UPS)*

#### assertSelectedValue

The inversion of *assertNotSelectedValue*, thus the syntax is the same
except the command name.

Example: *assertSelectedValue(id=shippingMethod,UPS)*

#### assertStyle

The inversion of *assertNotStyle*, thus the syntax is the same except
the command name.

Example: *assertStyle(xpath=/html/body,font-size:12px)*

#### assertText

The inversion of *assertNotText*, thus the syntax is the same except the
command name.

Example: *assertText(id=availability,regexp:.\* in stock.\*)*

#### assertTextPresent

The inversion of *assertNotTextPresent*, thus the syntax is the same
except the command name.

Example: *assertTextPresent(exact:? results returned)*

#### assertTitle

The inversion of *assertNotTitle*, thus the syntax is the same except
the command name.

Example: *assertTitle(? results returned)*

#### assertValue

The inversion of *assertNotValue*, thus the syntax is the same except
the command name.

Example: *assertValue(id=shippingMethods,UPS)*

#### assertVisible

The inversion of *assertNotVisible*, thus the syntax is the same except
the command name.

Example: *assertVisible(id=shippingMethods)*

#### assertXpathCount

The inversion of *assertNotXpathCount*, thus the syntax is the same
except the command name.

Example: *assertXpathCount(xpath=a\[.=’continue’\], 1)*

### Commands That Wait For A Condition To Become True/False

See below for a description of all *waitForXXX* and *waitForNotXXX*
commands. While *waitForXXX* commands wait for the condition to become
*true*, *waitForNotXXX* commands wait for the condition to become
*false*. The waiting time has a default value that can be overridden
using the *setTimeout* command (see
[here](10-command-reference.html#toc-miscellaneous-commands) ).

#### waitForAttribute

Waits for the element’s attribute value to match the given text pattern.
Will abort the test with an error message if there is no element found,
the element doesn’t have the requested attribute set or the attribute
value doesn’t match the given text pattern after the timeout is reached.

Example: *waitForAttribute(id=logo@title,Homepage)*

#### waitForChecked

Waits for the given element to be checked. Will abort the test with an
error if the timeout is reached and there is no such radio or checkbox
element that is checked.

Example: \_waitForChecked(name=shipAsGift)

#### waitForClass

Waits until the given element’s *class* attribute contains (all of) the
given class(es). Will abort the test with an error message if there is
no element found, the found element doesn’t have the *class* attribute
set or the value of the *class* attribute doesn’t contain (any of) the
given class(es) after the timeout is reached.

Example: *waitForClass(id=errormessage,hidden)*

#### waitForElementCount

Waits until the number of elements matching the given locator is equal
to the given value. Will abort the test with an error message if the
number of matching elements is not equal to the given value after the
timeout is reached.

Example: *waitForElementCount(link=More, 3)*

#### waitForElementPresent

Waits for the targeted element to be present on the current page. Will
abort the test with an error if the timeout is reached and no such
element is present. Accepts any element locator.

Example: *waitForElementPresent(id=shippingPanel)*

#### waitForEval

Waits for the result of evaluation the command’s target as javascript
expression to match the given text pattern. Will abort the test with an
error message if the evaluation result doesn’t match the given text
pattern after the timeout is reached.

Example: *waitForEval(document.forms.item(0).name,Search)*

#### waitForNotAttribute

The inversion of *waitForAttribute*, thus the syntax is the same except
the command name.

Example: *waitForNotAttribute(link=Toddler@style,
regexp:display\\s\*:\\s\*none)*

#### waitForNotChecked

The inversion of *waitForChecked*, thus the syntax is the same except
the command name.

Example: \_waitForNotChecked(name=newsletter)

#### waitForNotClass

The inversion of *waitForClass*, thus the syntax is the same except the
command name.

Example: *waitForNotClass(id=errormessage,hidden)*

#### waitForNotElementCount

The inversion of *waitForElementCount*, thus the syntax is the same
except the command name.

Example: *waitForNotElementCount(link=More, 3)*

#### waitForNotElementPresent

The inversion of *waitForElementPresent*, thus the syntax is the same
except the command name.

Example: *waitForNotElementPresent(id=minicart)*

#### waitForNotEval

The inversion of *waitForEval*, thus the syntax is the same except the
command name.

Example: *waitForNotEval(window.frames.length,3)*

#### waitForNotSelectedId

Waits for no selected option of the given select element to match the
argument pattern as ID. The test will abort with an error if no element
is found, the found element is not an HTML select, or if it has no
options. Accepts any element locator for the target and any
text-matching approach for the command value.

Example: *waitForNotSelectedId(id=shippingMethod,UPS)*

#### waitForNotSelectedIndex

Waits for no selected option of the given select element to match the
argument index. Will abort the test with an error if no element is
found, the found element is not an HTML select, or if it has no options.
Accepts any element locator for the target. The indices start with 0.

Example: *waitForNotSelectedIndex(id=shippingMethod,1)*

#### waitForNotSelectedLabel

Waits for no selected option of the given select element to match the
argument pattern as label. Will abort the test with an error if no
element is found, the found element is not an HTML select, or if it has
no options. Accepts any element locator for the target and any
text-matching approach for the command value.

Example: *waitForNotSelectedLabel(id=shippingMethod,UPS)*

#### waitForNotSelectedValue

Waits for no selected option of the given select element to match the
argument pattern as value. Will abort the test with an error if no
element is found, the found element is not an HTML select element, or if
it has no options. Accepts any text-matching approach for the command
value.

Example: *waitForNotSelectedValue(id=shippingMethod,UPS)*

#### waitForNotStyle

Waits for the actual style of the given element to not match (any of)
the specified CSS style declaration(s). Will abort the test with an
error message if element is found or the actual style of the element
matches (any of) the given CSS style declaration(s) after the timeout is
reached.

Example: *waitForNotStyle(name=email,color:rgb(255, 0, 0))*

#### waitForNotText

Waits for the targeted element to have its text not matching the command
value (text matching is done the same way as in *assertNotText*). Will
abort the test with an error if the timeout is reached and the text
still matches the command value. Accepts any element locator and any
text-matching approach.

Example: *waitForNotText(id=current,regexp::.\* rainy.\*)*

#### waitForNotTextPresent

Waits for the current page’s text to have its text not matching the
command value anymore. Will abort the test with an error if the timeout
is reached and the text still matches the command value. Accepts any
text-matching approach. As with **assertNotTextPresent**, even a text
snippet that matches the command value counts as matching.

Example: *waitForNotTextPresent(weather forecast)*

#### waitForNotTitle

Waits for the page’s title to not match the command value. Will abort
the test with an error if the timeout is reached and the title still
matches the command value. Has no target and accepts any text-matching
approach in the command value.

Example: *waitForNotTitle(exact:Product Details Page)*

#### waitForNotValue

Waits for the targeted element to have its value not matching the
command value. Will abort the test with an error if the timeout is
reached and no element is found for the given element locator or the
value of the found element does match the command value.

Example: *waitForNotValue(name=surname,Doe)*

#### waitForNotVisible

Waits for the targeted element to become invisible. Will abort the test
with an error if the timeout is reached and no element is found for the
given element locator or the found element is visible.

Example: *waitForNotVisible(id=DialogOverlay)*

#### waitForNotXpathCount

Waits for the page to not have the number of elements matched by the
command value. Will abort the test with an error if the timeout is
reached and the number of elements that can be identified using the
locator still matches the command value. Accepts only XPath expressions
as locators.

Example: *waitForNotXpathCount(id(<b></b><span
style="color:black;">’</span><b></b>lines’),5)*

#### waitForPageToLoad

Waits for the page to load. Aborts the test with an error if the timeout
is reached and page load hasn’t been completed. Has neither a target nor
a command value.

Example: *waitForPageToLoad()*

#### waitForPopUp

Waits for the first pop up to be completely loaded. Will abort the test
with an error if the timeout is reached and no pop up has been loaded.

Example: *waitForPopUp()*

#### waitForPopUp

Same as *waitForPopUp* but uses the given value as timeout instead.

Example: *waitForPopUp(,5000)*

#### waitForPopUp

Same as the no parameter-variant of *waitForPopUp* but waits for the
targeted pop up instead. Accepts any window locator.

Example: *waitForPopUp(name=popUpConfirmation)*

#### waitForPopUp

Same as the variant of *waitForPopUp* having a target only but also has
a value that is interpreted as timeout to use. Accepts any window
locator.

Example: *waitForPopUp(name=popUpConfirmation,5000)*

#### waitForSelectedId

The inversion of *waitForNotSelectedId*, thus the syntax is the same
except the command name.

Example: *waitForSelectedId(id=shippingMethod,UPS)*

#### waitForSelectedIndex

The inversion of *waitForNotSelectedIndex*, thus the syntax is the same
except the command name.

Example: *waitForSelectedIndex(id=shippingMethod,1)*

#### waitForSelectedLabel

The inversion of *waitForNotSelectedLabel*, thus the syntax is the same
except the command name.

Example: *waitForSelectedLabel(id=shippingMethod,UPS)*

#### waitForSelectedValue

The inversion of *waitForNotSelectedValue*, thus the syntax is the same
except the command name.

Example: *waitForSelectedValue(id=shippingMethod,UPS)*

#### waitForStyle

The inversion of *waitForNotStyle*, thus the syntax is the same except
the command name.

Example: *waitForStyle(name=phone,font-style:italic)*

#### waitForText

The inversion of *waitForNotText*, thus the syntax is the same except
the command name.

Example: *waitForText(id=registerButton,Register)*

#### waitForTextPresent

The inversion of *waitForNotTextPresent*, thus the syntax is the same
except the command name.

Example: *waitForTextPresent(exact:Registration completed)*

#### waitForTitle

The inversion of *waitForNotTitle*, thus the syntax is the same except
the command name.

Example: *waitForTitle(exact:Registration completed)*

#### waitForValue

The inversion of *waitForNotValue*, thus the syntax is the same except
the command name.

Example: *waitForValue(phone,regexp:\\d+)*

#### waitForVisible

The inversion of *waitForNotVisible*, thus the syntax is the same except
the command name.

Example: *waitForVisible(id=minicart\_items)*

#### waitForXpathCount

The inversion of *waitForNotXpathCount*, thus the syntax is the same
except the command name.

Example: *waitForXPathCount(//\*\[contains(., ’offer’)\],3)*

### Commands That Store Data

Store commands are used to store data in variables for later reuse. For
example, you may click on a link pointing to the details of a specific
product in an online store. To check that the details page for the
correct product is shown, you need the product name from the previous
page. If you define a variable *productName* with a store command, you
can use it later on by typing *${productName}*.

> Note that for all store commands the variable name is given as the
> command’s *value*. Thus, for the simple store command the variable
> value is given as the command target, for the storeEval command it is
> the expression to evaluate.

#### store

Stores the text given as command target in the variable named after the
command value. Can be used to define a value once and use it in several
places. If you use random numbers, you may need an opportunity to access
the randomly generated value again for checks (calling for a random
again will only give the same value by coincidence).

Example: *store(MICHAEL,foo)*

#### storeAttribute

Stores the value of the given element’s attribute into the variable
named after the command value.

Example: *storeAttribute(name=cal@data-uuid, uuid)*

#### storeElementCount

Stores the number of elements that match the given locator into the
variable named after the command value.

Example: *storeElementCount(css=.active, nbActives)*

#### storeEval

Has no real target, but interprets it as JavaScript that is executed
instead. Uses the command value as name of the variable in which to
store the result of the JavaScript execution. **Note that this will only
have an effect if JavaScript is enabled during the test run!**

Example: *storeEval(SOME\_JAVASCRIPT, foo)*

#### storeText

Stores the text of the targeted element in the variable named after the
command value. Accepts any element locator.

Example: *storeText(id=cartBalance, foo)*

#### storeValue

Stores the value (in case of a \<textarea&gt; the contained text) of the
element identified by the given locator in the variable named after the
command value.

Example: *storeValue(id=cartBalance, foo)*

#### storeXpathCount

Stores the number of elements identified by using the locator in the
variable named after the command value. Interprets the whole target as
XPath that should be used to identify elements.

Example: *storeXpathCount(id(’emptyDiv’), foo)*

### Miscellaneous Commands

#### close

Closes the browser window and thus aborts the test (if the browser has
remaining tabs, the test will just pause, but it doesn’t make any sense
to continue it). This is likely to be changed such that the **close**
command may only be called as the last statement in a test. Has neither
a target nor a command value.

#### createCookie

Creates a cookie. This command is exceptional such that it neither has a
“normal” target nor a “normal” command value, but takes two arguments
instead. The first one has to be in the form *key*=*value*, the second
one can be **max\_age=**<b></b>*an integer* or **path=**<b></b>*a path*
or another arbitrary expression. If the second argument has the form
**max\_age=**<b></b>*an integer*, the cookie will be stored with an
expiration of the given integer value as seconds in the future. If the
second argument has the form **path=**<b></b>*a path*, the cookie will
be visible to *a path* (default is */*) only. If the second argument has
another form, it will be ignored.

Example: *createCookie(stokkeMovieShown=true,max\_age=123456789000)*

#### deleteAllVisibleCookies

Deletes all cookies for the current domain. Has neither a target nor a
value.

Example: *deleteAllVisibleCookies()*

#### deleteCookie

Deletes the cookie named after the first argument. Similar to
**createCookie**, this instruction has two arguments. Currently, the
second argument is ignored, the first one has to be a valid cookie name.

Example: *deleteCookie(stokkeMovie,isIgnored)*

#### echo

Prints the given message to the log. Primarily used for debugging
purposes.

Example: *echo(Added ${prodQty} items to the cart)*

#### open

Opens the URL given as command value. Has no target. The URL can be
relative or absolute.

> If you specify a relative URL, it will be resolved using the currently
> active base URL, which is usually the test case’s base URL.

Example: *open(article.php?story=2012020309143182)* (where the base URL
is *http://www.groklaw.net/*)

#### pause

Causes the test to pause the given amount of time in milliseconds. Has
no target. The time to pause has to be given as integer number as
command value.

Example: *pause(5000)*

#### selectFrame

Switches to the targeted frame. The *relative* approaches will never
cause the test to abort with an error. The other approaches will do so
if no frame is identified using them. Accepts any frame locator.
Furthermore, you can simply use the frame’s name or ID.

Example: *selectFrame(index=1)*

#### selectWindow

Similar to **selectWindow** below but has no parameter. Instead, it
searches for the window having no name or no title, which is often the
top-level window. Will abort the test with an error if there is no such
window.

Example: *selectWindow()*

#### selectWindow

Switches to the targeted window. Accepts any window locator. Will abort
the test with an error if no window is found using the given window
locator.

Example: *selectWindow(title=customerAccount)*

#### setTimeout

Sets the timeout used by **…AndWait** and **waitFor…**. The new timeout
(in milliseconds) has to be given as integer number as command value.

Example: *setTimeout(30000)*

Command Short Reference
-----------------------

While the previous section is meant to provide a thorough understanding
of commands and how they work, the command short reference below aims at
a formal and concise presentation. The following abbreviations and terms
are used:

-   “EL” indicates any element locator in accordance with “OL” (any
    option locator), “AL” (any attribute locator), “WL” (any window
    locator), and “FL” (any frame locator). If there are further
    restrictions, for example just some of the element locators are
    allowed, the allowed ones are given by their identifier as “name”,
    “link”, and so on.
-   “Text matching” indicates any of the text-matching approaches that,
    in accordance with the locators “glob”, “exact” and “regexp”, are
    used if just a subset of them is allowed.
-   “Integer” indicates an arbitrary integer within the range of 0 to
    2147483647, “JS expression” indicates a valid JavaScript expression,
    “XPath expression” a valid XPath expression (be careful not to mix
    it up with the XPath element locator!).
-   “Variable” indicates an arbitrary variable name. A valid variable
    name is a non-empty string matching the regular expression:
    \[A-Za-z\](\[A-Za-z0-9\_\])\*
-   “Class List” refers to a non-empty list of CSS class names separated
    by whitespace (e.g.: foo bar baz).
-   “Style” refers to a non-empty list of CSS style declarations
    separated by semicolon (e.g.: display:block; font-weight:bold;
    cursor:pointer).
-   “Arbitrary” indicates an arbitrary text (a text that should be typed
    into a form, for instance). Be aware that “arbitrary” doesn’t mean
    there are no restrictions. Thus, a web application may require a
    password to have a minimum length or the text is interpreted as a
    path on a file system, for example.

### Interaction Commands

| Command            | Target | Value           |
|--------------------|--------|-----------------|
| addSelection       | EL     | OL              |
| check              | EL     | \-              |
| checkAndWait       | EL     | Integer         |
| click              | EL     | \-              |
| clickAndWait       | EL     | Integer         |
| contextMenu        | EL     | \-              |
| contextMenuAt      | EL     | Integer,Integer |
| doubleClick        | EL     | \-              |
| doubleClickAndWait | EL     | Integer         |
| mouseDown          | EL     | \-              |
| mouseDownAt        | EL     | Integer,Integer |
| mouseMove          | EL     | \-              |
| mouseMoveAt        | EL     | Integer,Integer |
| mouseOut           | EL     | \-              |
| mousOver           | EL     | \-              |
| mouseUp            | EL     | \-              |
| mouseUpAt          | EL     | Integer,Integer |
| removeSelection    | EL     | OL              |
| select             | EL     | OL              |
| selectAndWait      | EL     | OL              |
| submit             | EL     | \-              |
| submitAndWait      | EL     | \-              |
| type               | EL     | Arbitrary       |
| typeAndWait        | EL     | Arbitrary       |
| uncheck            | EL     | \-              |
| uncheckAndWait     | EL     | \-              |

### Assertion Commands

| Command                 | Target        | Value        |
|-------------------------|---------------|--------------|
| assertAttribute         | AL            | Text Pattern |
| assertChecked           | EL            | \-           |
| assertClass             | EL            | Class List   |
| assertElementCount      | EL            | Integer      |
| assertElementPresent    | EL            | \-           |
| assertEval              | JS Expression | Text Pattern |
| assertLoadTime          | \-            | Integer      |
| assertNotAttribute      | AL            | Text Pattern |
| assertNotChecked        | EL            | \-           |
| assertNotClass          | EL            | Class List   |
| assertNotElementCount   | EL            | Integer      |
| assertNotElementPresent | EL            | \-           |
| assertNotEval           | JS Expression | Text Pattern |
| assertNotSelectedId     | EL            | Text Pattern |
| assertNotSelectedIndex  | EL            | Text Pattern |
| assertNotSelectedLabel  | EL            | Text Pattern |
| assertNotSelectedValue  | EL            | Text Pattern |
| assertNotStyle          | EL            | Style        |
| assertNotText           | EL            | Text Pattern |
| assertNotTextPresent    | \-            | Text Pattern |
| assertNotTitle          | \-            | Text Pattern |
| assertNotValue          | EL            | Text Pattern |
| assertNotVisible        | EL            | \-           |
| assertNotXpathCount     | *xpath*       | Integer      |
| assertPageSize          | \-            | Integer      |
| assertSelectedId        | EL            | Text Pattern |
| assertSelectedIndex     | EL            | Text Pattern |
| assertSelectedLabel     | EL            | Text Pattern |
| assertSelectedValue     | EL            | Text Pattern |
| assertStyle             | EL            | Style        |
| assertText              | EL            | Text Pattern |
| assertTextPresent       | \-            | Text Pattern |
| assertTitle             | \-            | Text Pattern |
| assertValue             | EL            | Text Pattern |
| assertVisible           | EL            | \-           |
| assertXpathCount        | *xpath*       | Integer      |

### Waiting Commands

| Command                  | Target        | Value        |
|--------------------------|---------------|--------------|
| waitForAttribute         | AL            | Text Pattern |
| waitForChecked           | EL            | \-           |
| waitForClass             | EL            | Class List   |
| waitForElementCount      | EL            | Integer      |
| waitForElementPresent    | EL            | \-           |
| waitForEval              | JS Expression | Text Pattern |
| waitForNotAttribute      | AL            | Text Pattern |
| waitForNotChecked        | EL            | \-           |
| waitForNotClass          | EL            | Class List   |
| waitForNotElementCount   | EL            | Integer      |
| waitForNotElementPresent | EL            | \-           |
| waitForNotEval           | JS Expression | Text Pattern |
| waitForNotSelectedId     | EL            | Text Pattern |
| waitForNotSelectedIndex  | EL            | Text Pattern |
| waitForNotSelectedLabel  | EL            | Text Pattern |
| waitForNotSelectedValue  | EL            | Text Pattern |
| waitForNotStyle          | EL            | Style        |
| waitForNotText           | EL            | Text Pattern |
| waitForNotTextPresent    | \-            | Text Pattern |
| waitForNotTitle          | \-            | Text Pattern |
| waitForNotValue          | EL            | Text Pattern |
| waitForNotVisible        | EL            |              |
| waitForNotXpathCount     | *xpath*       | Integer      |
| waitForPageToLoad        | \-            | Integer      |
| waitForPopUp             | WL            | \-           |
| waitForSelectedId        | EL            | Text Pattern |
| waitForSelectedIndex     | EL            | Text Pattern |
| waitForSelectedLabel     | EL            | Text Pattern |
| waitForSelectedValue     | EL            | Text Pattern |
| waitForStyle             | EL            | Style        |
| waitForText              | EL            | Text Pattern |
| waitForTextPresent       | \-            | Text Pattern |
| waitForTitle             | \-            | Text Pattern |
| waitForXpathCount        | *xpath*       | Integer      |
| waitForValue             | EL            | Text Pattern |
| waitForVisible           | EL            | \-           |

### Store Commands

| Command           | Target        | Value    |
|-------------------|---------------|----------|
| store             | Arbitrary     | Variable |
| storeAttribute    | AL            | Variable |
| storeElementCount | EL            | Variable |
| storeEval         | JS expression | Variable |
| storeText         | EL            | Variable |
| storeValue        | EL            | Variable |
| storeXpathCount   | xpath         | Variable |

### Miscellaneous Commands

| Command                 | Target              | Value                         |
|-------------------------|---------------------|-------------------------------|
| close                   | \-                  | \-                            |
| createCookie            | Arbitrary=Arbitrary | max\_age=Delay path=Arbitrary |
| deleteAllVisibleCookies | \-                  | \-                            |
| deleteCookie            | Arbitrary           | Arbitrary                     |
| echo                    | \-                  | Arbitrary                     |
| open                    | \-                  | Arbitrary                     |
| pause                   | \-                  | Integer                       |
| selectFrame             | FL                  | \-                            |
| selectWindow            | WL                  | \-                            |
| setTimeout              | \-                  | Integer                       |

Using the XLT Scripting API
---------------------------

Looking at the command examples provided above, you may have noticed
their notation:

-   xpath=//a\[contains(@href,‘1423033.html’)\]
-   assertTextPresent(exact:Any Questions?)
-   clickAndWait(link=Samsung)
-   pause(5000)

However, this notation neither matches Script Developer nor the XLT
Scripting API. Script Developer provides a GUI with fields into which
the parts of the commands can be entered and fields that are disabled
since they are invalid for the chosen command. Thus, depending on the
command in question, you may not be able to enter a target or a value.

Using the Scripting API, you write Java code where strings have to start
and end with double quotes, meta-characters have to be escaped, and
statements have to end with a semicolon. However, XLT ignores all this
and uses a notation close to Java instead. We think of this as the best
readable notation that is intuitively understandable without giving
lengthy formal definitions.

For instance, consider this command:
*assertTextPresent(regexp:“\\\\home”)*

It checks if the text *“\\home”* is present on the current page. When
using it in Java, do three things:

1.  Escape characters appropriately. In the present case, you have to
    escape the double quote AND the backslash characters.
2.  The whole argument string has to be enclosed in double quotes.
3.  The Java statement has to end with a ‘;’.

As a result, the command  
`assertTextPresent(regexp:"\\home")` turns into:  
`assertTextPresent("regexp:\"\\\\home\"");`

Note that in the Script Developer GUI, you don’t see any opening or
closing parentheses for commands. In the XLT Scripting API, however, you
need to use parentheses because commands are actually calls to Java
methods.

As scripts are stored as XML files, each command has an appropriate XML
representation where the `name` attribute specifies the command type,
the `target` attribute specifies the command’s target, and the `value`
attribute specifies the command’s value. If the command doesn’t have a
target or value, the appropriate XML attribute will be omitted.  
The XML representation of the command above looks like this:

bc(xml).
<command name="assertTextPresent" value="regexp:&quot;\\home&quot;"/>

Note that the double quotes have been escaped in XML.
