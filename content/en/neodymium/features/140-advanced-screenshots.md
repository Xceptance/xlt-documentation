---
title: "Advanced Screenshot Features"

weight: 140
type: docs

description: >
  How to configure the advanced screenshots from Neodymium to improve error analysis.
---

Selenide's default screenshots are sometimes insufficient for thorough bug analysis. Neodymium offers advanced features
to enhance screenshot utility and organization.

## Basic Functionality and Organization

To enable the use of advanced screenshots, set the following property:

```properties
neodymium.screenshots.enableAdvancedScreenshots=true
```

By default, this captures normal viewport screenshots at the moment of failure, but with enhanced organization:

* **Folder Structure:** Screenshots are stored in separate folders for each test class. To prevent conflicts when test
  classes share names across different test areas, the folder name includes the entire package path.
  {{< image max-width="60%" src="neodymium/Screenshots_Folder_Normal.PNG" >}}
  Example: Screenshots for `BrowseTest` in the `smoke` sub-package are stored in a path that reflects the full
  package.
  {{< /image >}}
* **File Naming:** The file name includes the calling test method name, the used browser profile, the provided data set,
  and a timestamp for unique identification.
  {{< image max-width="60%" src="neodymium/Screenshots_example.PNG" >}}
  Improved screenshot naming.
  {{< /image >}}

## Folder Tree Structure

For large test suites, the flat folder structure can become confusing. You can automatically generate a hierarchical
folder tree structure for better organization:

* **Activation:** Enable the `neodymium.screenshots.enableTreeDirectoryStructure` property.
  {{< image max-width="60%" src="neodymium/Screenshots_Folder_Tree.PNG" >}}
  Example: Improved tree structure.
  {{< /image >}}

## Element Highlighting

To clarify which element was last evaluated or manipulated by a CSS selector, Neodymium can highlight that element
directly on the screenshot.

* **Activation:** Enable the `neodymium.screenshots.highlightLastElement` property.
  {{< image max-width="60%" src="neodymium/Screenshots_highlighting_example.PNG" >}}
  Highlighting the last interacted element for visual debugging.
  {{< /image >}}
* **Customizing Highlight Color:** The default color can be changed using the
  `neodymium.screenshots.element.highlightColor` property, specified in hexadecimal format:
    ```properties
    neodymium.screenshots.element.highlightColor = #0000FF
    ```
  {{< image max-width="60%" src="neodymium/Screenshots_highlighting_example_blue.PNG" >}}
  Example: Custom highlight color.
  {{< /image >}}

## Full Page Screenshots

When the viewport alone doesn't capture the entire context of a failure, you can enable full-page screenshots:

* **Activation:** Use the `neodymium.screenshots.fullpagecapture.enable` property.
* **Highlight Viewport:** To still know where the visible viewport was located on the full page, enable the highlight
  with `neodymium.screenshots.fullpagecapture.highlightViewport`.
  {{< image max-width="60%" src="neodymium/Screenshots_fullpage.PNG" >}}
  Full-page screenshot example, highlighting the viewport with blur applied to the surrounding area.
  {{< /image >}}

## Full Page Customization

* **Highlight Color:** The highlight color for the viewport can be changed using the
  `neodymium.screenshots.fullpagecapture.highlightColor` property (any RGB color).
* **Blurring:** Parts of the page outside the current viewport can be blurred to focus attention on the visible area (as
  shown in the example above). Blurring is off by default, but can be activated with:
    ```properties
    neodymium.screenshots.blurFullPageScreenshot = true
    ```
    * To still see the viewport with blur turned off, it is useful to enable the viewport highlighting, which is also
      the default.

## Complete Configuration Property Overview

The following table lists all available properties for configuring Neodymium's screenshot capabilities.

| Property                                                  | Default   | Description                                                                                                                                                     |
|:----------------------------------------------------------|:----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `neodymium.screenshots.enableAdvancedScreenshots`         | `false`   | Enables advanced screenshot capabilities, providing more sophisticated capture and feature controls.                                                            |
| `neodymium.screenshots.enableOnSuccess`                   | `false`   | Controls whether screenshots are captured for **passing** tests. Set to `true` to include successful runs.                                                      |
| `neodymium.screenshots.viewport.enable`                   | `true`    | Enables the capture of standard viewport screenshots upon test failure (integrated with Selenide behavior).                                                     |
| `neodymium.screenshots.enableTreeDirectoryStructure`      | `false`   | Controls the directory structure for storing screenshots. When `true`, a nested, hierarchical folder structure is used; when `false`, a flat structure is used. |
| `neodymium.screenshots.highlightLastElement`              | `true`    | Enables **highlighting of the last interacted or focused element** on the screenshot to pinpoint the failure location.                                          |
| `neodymium.screenshots.highlightLineThickness`            | `4`       | Defines the border thickness in pixels for element and viewport highlighting.                                                                                   |
| `neodymium.screenshots.element.highlightColor`            | `#FF00FF` | Sets the hexadecimal color code (e.g., `#FF00FF` for magenta) used to highlight the last interacted element.                                                    |
| `neodymium.screenshots.fullpagecapture.enable`            | `true`    | Enables **full-page capture**, taking a screenshot of the entire page content, not just the visible viewport.                                                   |
| `neodymium.screenshots.blurFullPageScreenshot`            | `false`   | If full-page capture is enabled, setting this to `true` blurs the content outside the visible viewport to focus analysis.                                       |
| `neodymium.screenshots.fullpagecapture.highlightViewport` | `true`    | Visually highlights the area corresponding to the initial viewport during full-page capture for context.                                                        |
| `neodymium.screenshots.fullpagecapture.highlightColor`    | `#FF0000` | Sets the hexadecimal color code (e.g., `#FF0000` for red) used to highlight the viewport during full-page capture.                                              |
