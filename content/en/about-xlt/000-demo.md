---
title: "DEMO DOC!!"

weight: 1
type: docs

description: >
  Just a demo for what doc can do and how the code looks like.
---



## Info Boxes
{{% note %}}
A Note
{{% /note %}}

{{% note title="Custom <em>Title</em>" %}}
A Note with a custom title including html
{{% /note %}}

{{% note title=" " %}}
A Note without title but with `markdown` in it
{{% /note %}}

{{% warning %}}
A Warning
{{% /warning %}}

{{% warning title="Custom <em>Warning</em>" %}}
A Warning with a custom title including html
{{% /warning %}}

{{% warning title=" " %}}
A Warning without title but with `markdown` in it
{{% /warning %}}

{{% danger %}}
A Note
{{% /danger %}}

{{% danger title="Custom <em>Title</em>" %}}
A Danger section with a custom title including html
{{% /danger %}}

{{% danger title=" " %}}
A Danger section without title but with `markdown` in it
{{% /danger %}}

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




