---
title: "DEMO DOC!!"

weight: 1
type: docs

# There is no need to specify the - instead of a space, 
# HUGO does that for you.
slug: "this is just an overwritten url"

description: >
  Just a demo for what doc can do and how the code looks like.
---



## Info Boxes
{{% note %}}
A Note with a standard header/title
{{% /note %}}

{{% note title="Custom Title" %}}
A Note with a custom header/title and `markdown`
{{% /note %}}


{{% warning %}}
A Warning
{{% /warning %}}

{{% warning title="Custom Warning" %}}
A Warning with a custom title
{{% /warning %}}


{{% danger %}}
A Note
{{% /danger %}}

{{% danger title="Custom Title" %}}
A Danger section with a custom title and `markdown`
{{% /danger %}}

If we want a no title or header version, we might have to extend the shortcodes and add notitle as parameter.

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
Go to [Load Testing]({{< relref "/load-testing" >}}).


### From here
[About XLT is a link from here and not higher up](../10-history).

## Images
{{< image src="releasenotes/agent-cpu-usage-chart-small.jpg" large="releasenotes/agent-cpu-usage-chart-large.png" >}}
An `image` that gets its source from *src* and is linked to *large* if this is given. Paths are relative to **static/images/**. The *.Inner* part is the caption.
{{< /image >}}

{{< image src="releasenotes/events-on-console-small.jpg" >}}
Another image that is not linked to anything.
{{< /image >}}

{{< image src="releasenotes/agents-gc-and-cpu-information-small.jpg" large="releasenotes/agents-gc-and-cpu-information-large.png" >}}
Yet another image. Note how neatly you can navigate between the large versions of all images of this page.
{{< /image >}}




