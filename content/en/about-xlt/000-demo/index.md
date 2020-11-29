---
title: "Doc Helpers ✍️"
aliases:
    - another name to redirect from
    - documentation help

weight: 10000
type: docs

# There is no need to specify the - instead of a space, 
# HUGO does that for you.
slug: "this is just an overwritten url"

description: >
  This page demos several important pieces for the documentation and is meant to support
  anyone who wants to update or extend the documentation.
---
## Info Boxes
{{% note %}}
A Note with a standard header/title
{{% /note %}}

{{% note title="Custom Title" %}}
A Note with a custom header/title and `markdown`
{{% /note %}}

{{% note notitle %}}
A Note without a title
{{% /note %}}

{{% warning %}}
A Warning
{{% /warning %}}

{{% warning title="Custom Warning" %}}
A Warning with a custom title
{{% /warning %}}

{{% warning notitle %}}
A Warning without a title
{{% /warning %}}

{{% danger %}}
A Danger section
{{% /danger %}}

{{% danger title="Custom Title" %}}
A Danger section with a custom title and `markdown`
{{% /danger %}}

{{% danger notitle %}}
A Danger section without a title
{{% /danger %}}

> Just a blockquote. You can still use them. They are kinda boring.

## Keyboard
You can reference keyboard keys in text, using the {{< kbd >}}kbd{{< /kbd >}} shortcode.

---
## Code

### Java Code
#### Plain

```java
import foo;

public class Foo
{
}
```

### Bash Code
```bash
foo@picard $./start.sh
```

## Links
### Any link that is up or down the hierarchy
Go to [Load Testing]({{< relref "load-testing" >}}).


### From here
[About XLT is a link from here and not higher up](../10-history).

## Images
{{< image src="releasenotes/agent-cpu-usage-chart-small.jpg" large="releasenotes/agent-cpu-usage-chart-large.png" >}}
An `image` that gets its source from *src* and is linked to *large* if this is given. Paths are relative to **static/images/**. The *.Inner* part is the caption.
{{< /image >}}

{{< image src="releasenotes/agent-cpu-usage-chart-large.png" >}}
Another image that is not linked to anything. If it is too wide for the window, it will be scaled by CSS (`.img-fluid, .td-content img {max-width: 100%}`). 
{{< /image >}}

{{< image src="releasenotes/agents-gc-and-cpu-information-small.jpg" large="releasenotes/agents-gc-and-cpu-information-large.png" >}}
Yet another image. Note how neatly you can navigate between the large versions of all images of this page.
{{< /image >}}

{{< imageres src="test.png" >}}
Another image using the `imageres` shortcode, which will resize images to a smaller preview using hugo's image processing. For this, the source image must be part of the page resources (pages are in a folder as index.md, images in same folder). The *.Inner* part is the caption.
{{< /imageres >}}

## Colored Text
Should you need colored text, use {{< ctext color="green" >}}ctext in green{{< /ctext >}} or any other html compatible color code. If none is given, this defaults to {{< ctext >}}grey{{< /ctext >}}.

## TODO
### To-Do Marker
{{< TODO / >}}To remind us that something needs to be done, it introduces a marked TODO at the position of the shortcode `{{</* TODO / */>}}`. TODO markers right now assume to be in the beginning because they make a little room on the right side - "{{< TODO / >}}".

{{< TODO comment="I am more useful!" / >}}Optionally you can pass the parameter comment and provide some more information such as `{{</* TODO comment="More information in the title" / */>}}`.

### Marked Text
```
{{</* TODO */>}}To mark some text use this.{{</* /TODO */>}}
```
{{< TODO >}}To mark some text use this.{{< /TODO >}}


### Markdown in a To-Do
```
{{%/* TODO */%}}To use **markdown** in the to-do, use this.{{%/* /TODO */%}}
```
{{% TODO %}}To use **markdown** in the to-do, use this.{{% /TODO %}}



