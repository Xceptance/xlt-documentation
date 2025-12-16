---
title: "Accessibility Testing with Google Lighthouse"

weight: 110
type: docs

description: >
  Using Google Lighthouse to provide accessibility testing.
---

Accessibility reports are crucial when testing web pages because they help to ensure that a site is usable for people of
all abilities. That is why we introduced
Google [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview?hl=de) to Neodymium, an open-source tool to
improve the quality of web pages.

## Install Lighthouse CLI

First of all we recommend installing a package manager like [npm](https://www.npmjs.com/), which we are also going to
use in order to install [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) CLI. After you went through
the installation process of npm, open a terminal and enter the command below.

```
npm install -g lighthouse
```

To make sure the Lighthouse installation was successful, you can run the following command.

```
lighthouse --version
```

## Use Lighthouse Inside Neodymium

With the objective of creating Lighthouse reports inside Neodymium we implemented the class `LighthouseUtils`,
containing the function `createLightHouseReport(String reportName)`. By calling this function, a Lighthouse report of
the current web page is generated and automatically added to the Allure report with the name specified in the
`reportName` parameter. Keep in mind that creating a Lighthouse report only works while using Chrome or Chromium-based
browsers.

The method call can be added at every point of your test and will create a report of the currently opened page. This
also works for pages, which rely on session data like a login state or products that should have been added to a
shopping cart. Keep in mind that it may not work on certain pages that, if refreshed, load a different page, like
checkout pages for example.

Here is an example how to add `createLightHouseReport()` inside a test case:

```java

@NeodymiumTest
public void testLoginAsRegisteredUser() throws Exception
{
    // go to homepage
    var homePage = OpenHomePageFlow.flow();
    LighthouseUtils.createLightHouseReport("Homepage");

    // go to register page
    var registerPage = homePage.header.userMenu.openRegisterPage();

    // send register form
    var loginPage = registerPage.sendRegisterForm(registeredOrderTestData.getUser());

    // send login form
    var accountOverviewPage = loginPage.sendLoginForm(registeredOrderTestData.getUser());
    accountOverviewPage.validateSuccessfulLogin(registeredOrderTestData.getUser().getFirstName());

    LighthouseUtils.createLightHouseReport("Account Overview Page");
}
```

Please note that this example uses page object model classes which are not shipped with neodymium.

## Limitations

Please note, that Lighthouse does not work with modals, fly-ins, hover etc. The site will be newly loaded for the
report, so every manually opened modal will be closed after a Lighthouse report.
This needs to be considered when generating reports and might require changes to the test flow (e.g. if a modal is open
which contains the next button the scripts wants to click).

## Lighthouse Reports

The generated Lighthouse reports can be found in the `target` directory of the user's repository and in the Allure
report as an attachment, visualized in the following image.

{{< image max-width="60%" src="neodymium/allure_report_lighthouse_report_attachment.png" >}}
Lighthouse report inside an Allure report.
{{< /image >}}

A Lighthouse report consists of the following four categories.

1. Performance
2. Accessibility
3. Best Practices
4. Search Engine Optimisation (SEO)

Each of those categories is scored between 1 and 100, which reveals how well the web page performed in every category.
Therefore, Google defines the following ranges.

* 0 to 49: Poor
* 50 to 89: Needs Improvement
* 90 to 100: Good

## Lighthouse Report Validation

This section is about how to assert metrics from the Lighthouse report.

### Lighthouse Category Score Validation

To enable validating the scores of all four categories, we implemented the following score thresholds in the
`neodymium.properties` file.

* `neodymium.lighthouse.assert.thresholdScore.performance`
* `neodymium.lighthouse.assert.thresholdScore.accessibility`
* `neodymium.lighthouse.assert.thresholdScore.bestPractices`
* `neodymium.lighthouse.assert.thresholdScore.seo`

All of those configuration properties are set to 0.5 per default, which sets all category score threshold to 50. That
means each and every category needs to match or exceed a score of 50 or otherwise the test will fail. All the score
thresholds can be changed depending on the user's wishes.

Please be aware that the Lighthouse performance score is not the most stable value and is affected by many factors like
network load on th the test machine. This can lead to random outliers in the measurement making your tests flaky.
A check against the 75th percentile is recommended to give the test some stability (see for
example [here](https://web.dev/articles/defining-core-web-vitals-thresholds#choice-of-percentile)).

{{% warning notitle %}}
Lighthouse reports during test automation are not recommended to be used for performance testing, but can be a helpful
tool to do add a lower border for your performance to get an alert if something is wrong.
{{% /warning %}}

### Lighthouse Audit Validation

We also implemented the property `neodymium.lighthouse.assert.audits` in the `neodymium.properties` file. This
property makes it possible to validate Lighthouse audits. In order to do that the user has to specify the `id` of all
audits that should be validated as the property itself. For example:
`neodymium.lighthouse.assert.audits = aria-roles aria-text` validates that no error occurs in the Lighthouse audits
`aria-roles` and `aria-text`. All existing audit ID's and their corresponding titles are visualized in the table below.

| id                               | title                                                                                                                              |
|:---------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------|
| is-on-https                      | Uses HTTPS                                                                                                                         |
| redirects-http                   | Redirects HTTP traffic to HTTPS                                                                                                    |
| viewport                         | Has a `<meta name="viewport">` tag with `width` or `initial-scale`                                                                 |
| first-contentful-paint           | First Contentful Paint                                                                                                             |
| largest-contentful-paint         | Largest Contentful Paint                                                                                                           |
| first-meaningful-paint           | First Meaningful Paint                                                                                                             |
| speed-index                      | Speed Index                                                                                                                        |
| screenshot-thumbnails            | Screenshot Thumbnails                                                                                                              |
| final-screenshot                 | Final Screenshot                                                                                                                   |
| total-blocking-time              | Total Blocking Time                                                                                                                |
| max-potential-fid                | Max Potential First Input Delay                                                                                                    |
| cumulative-layout-shift          | Cumulative Layout Shift                                                                                                            |
| errors-in-console                | No browser errors logged to the console                                                                                            |
| server-response-time             | Initial server response time was short                                                                                             |
| interactive                      | Time to Interactive                                                                                                                |
| user-timings                     | User Timing marks and measures                                                                                                     |
| critical-request-chains          | Avoid chaining critical requests                                                                                                   |
| redirects                        | Avoid multiple page redirects                                                                                                      |
| image-aspect-ratio               | Displays images with correct aspect ratio                                                                                          |
| image-size-responsive            | Serves images with appropriate resolution                                                                                          |
| deprecations                     | Avoids deprecated APIs                                                                                                             |
| third-party-cookies              | Avoids third-party cookies                                                                                                         |
| mainthread-work-breakdown        | Minimizes main-thread work                                                                                                         |
| bootup-time                      | JavaScript execution time                                                                                                          |
| uses-rel-preconnect              | Preconnect to required origins                                                                                                     |
| font-display                     | Ensure text remains visible during webfont load                                                                                    |
| diagnostics                      | Diagnostics                                                                                                                        |
| network-requests                 | Network Requests                                                                                                                   |
| network-rtt                      | Network Round Trip Times                                                                                                           |
| network-server-latency           | Server Backend Latencies                                                                                                           |
| main-thread-tasks                | Tasks                                                                                                                              |
| metrics                          | Metrics                                                                                                                            |
| resource-summary                 | Resources Summary                                                                                                                  |
| third-party-summary              | Minimize third-party usage                                                                                                         |
| third-party-facades              | Lazy load third-party resources with facades                                                                                       |
| largest-contentful-paint-element | Largest Contentful Paint element                                                                                                   |
| lcp-lazy-loaded                  | Largest Contentful Paint image was not lazily loaded                                                                               |
| layout-shifts                    | Avoid large layout shifts                                                                                                          |
| long-tasks                       | Avoid long main-thread tasks                                                                                                       |
| non-composited-animations        | Avoid non-composited animations                                                                                                    |
| unsized-images                   | Image elements do not have explicit `width` and `height`                                                                           |
| valid-source-maps                | Page has valid source maps                                                                                                         |
| prioritize-lcp-image             | Preload Largest Contentful Paint image                                                                                             |
| csp-xss                          | Ensure CSP is effective against XSS attacks                                                                                        |
| script-treemap-data              | Script Treemap Data                                                                                                                |
| accesskeys                       | `[accesskey]` values are unique                                                                                                    |
| aria-allowed-attr                | `[aria-*]` attributes match their roles                                                                                            |
| aria-allowed-role                | Uses ARIA roles only on compatible elements                                                                                        |
| aria-command-name                | `button`, `link`, and `menuitem` elements have accessible names                                                                    |
| aria-conditional-attr            | ARIA attributes are used as specified for the element's role                                                                       |
| aria-deprecated-role             | Deprecated ARIA roles were not used                                                                                                |
| aria-dialog-name                 | Elements with `role="dialog"` or `role="alertdialog"` have accessible names.                                                       |
| aria-hidden-body                 | `[aria-hidden="true"]` is not present on the document `<body>`                                                                     |
| aria-hidden-focus                | `[aria-hidden="true"]` elements do not contain focusable descendents                                                               |
| aria-input-field-name            | ARIA input fields have accessible names                                                                                            |
| aria-meter-name                  | ARIA `meter` elements have accessible names                                                                                        |
| aria-progressbar-name            | ARIA `progressbar` elements have accessible names                                                                                  |
| aria-prohibited-attr             | Elements use only permitted ARIA attributes                                                                                        |
| aria-required-attr               | `[role]`s have all required `[aria-*]` attributes                                                                                  |
| aria-required-children           | Elements with an ARIA `[role]` that require children to contain a specific `[role]` have all required children.                    |
| aria-required-parent             | `[role]`s are contained by their required parent element                                                                           |
| aria-roles                       | `[role]` values are valid                                                                                                          |
| aria-text                        | Elements with the `role=text` attribute do not have focusable descendents.                                                         |
| aria-toggle-field-name           | ARIA toggle fields have accessible names                                                                                           |
| aria-tooltip-name                | ARIA `tooltip` elements have accessible names                                                                                      |
| aria-treeitem-name               | ARIA `treeitem` elements have accessible names                                                                                     |
| aria-valid-attr-value            | `[aria-*]` attributes have valid values                                                                                            |
| aria-valid-attr                  | `[aria-*]` attributes are valid and not misspelled                                                                                 |
| button-name                      | Buttons do not have an accessible name                                                                                             |
| bypass                           | The page contains a heading, skip link, or landmark region                                                                         |
| color-contrast                   | Background and foreground colors have a sufficient contrast ratio                                                                  |
| definition-list                  | `<dl>`'s contain only properly-ordered `<dt>` and `<dd>` groups, `<script>`, `<template>` or `<div>` elements.                     |
| dlitem                           | Definition list items are wrapped in `<dl>` elements                                                                               |
| document-title                   | Document has a `<title>` element                                                                                                   |
| duplicate-id-aria                | ARIA IDs are unique                                                                                                                |
| empty-heading                    | All heading elements contain content.                                                                                              |
| form-field-multiple-labels       | No form fields have multiple labels                                                                                                |
| frame-title                      | `<frame>` or `<iframe>` elements have a title                                                                                      |
| heading-order                    | Heading elements are not in a sequentially-descending order                                                                        |
| html-has-lang                    | `<html>` element has a `[lang]` attribute                                                                                          |
| html-lang-valid                  | `<html>` element has a valid value for its `[lang]` attribute                                                                      |
| html-xml-lang-mismatch           | `<html>` element has an `[xml:lang]` attribute with the same base language as the `[lang]` attribute.                              |
| identical-links-same-purpose     | Identical links have the same purpose.                                                                                             |
| image-alt                        | Image elements have `[alt]` attributes                                                                                             |
| image-redundant-alt              | Image elements do not have `[alt]` attributes that are redundant text.                                                             |
| input-button-name                | Input buttons have discernible text.                                                                                               |
| input-image-alt                  | `<input type="image">` elements have `[alt]` text                                                                                  |
| label-content-name-mismatch      | Elements with visible text labels have matching accessible names.                                                                  |
| label                            | Form elements have associated labels                                                                                               |
| landmark-one-main                | Document has a main landmark.                                                                                                      |
| link-name                        | Links do not have a discernible name                                                                                               |
| link-in-text-block               | Links are distinguishable without relying on color.                                                                                |
| list                             | Lists contain only `<li>` elements and script supporting elements (`<script>` and `<template>`).                                   |
| listitem                         | List items (`<li>`) are contained within `<ul>`, `<ol>` or `<menu>` parent elements                                                |
| meta-refresh                     | The document does not use `<meta http-equiv="refresh">`                                                                            |
| meta-viewport                    | `[user-scalable="no"]` is not used in the `<meta name="viewport">` element and the `[maximum-scale]` attribute is not less than 5. |
| object-alt                       | `<object>` elements have alternate text                                                                                            |
| select-name                      | Select elements have associated label elements.                                                                                    |
| skip-link                        | Skip links are focusable.                                                                                                          |
| tabindex                         | No element has a `[tabindex]` value greater than 0                                                                                 |
| table-duplicate-name             | Tables have different content in the summary attribute and `<caption>`.                                                            |
| table-fake-caption               | Tables use `<caption>` instead of cells with the `[colspan]` attribute to indicate a caption.                                      |
| target-size                      | Touch targets do not have sufficient size or spacing.                                                                              |
| td-has-header                    | `<td>` elements in a large `<table>` have one or more table headers.                                                               |
| td-headers-attr                  | Cells in a `<table>` element that use the `[headers]` attribute refer to table cells within the same table.                        |
| th-has-data-cells                | `<th>` elements and elements with `[role="columnheader"/"rowheader"]` have data cells they describe.                               |
| valid-lang                       | `[lang]` attributes have a valid value                                                                                             |
| video-caption                    | `<video>` elements contain a `<track>` element with `[kind="captions"]`                                                            |
| custom-controls-labels           | Custom controls have associated labels                                                                                             |
| custom-controls-roles            | Custom controls have ARIA roles                                                                                                    |
| focus-traps                      | User focus is not accidentally trapped in a region                                                                                 |
| focusable-controls               | Interactive controls are keyboard focusable                                                                                        |
| interactive-element-affordance   | Interactive elements indicate their purpose and state                                                                              |
| logical-tab-order                | The page has a logical tab order                                                                                                   |
| managed-focus                    | The user's focus is directed to new content added to the page                                                                      |
| offscreen-content-hidden         | Offscreen content is hidden from assistive technology                                                                              |
| use-landmarks                    | HTML5 landmark elements are used to improve navigation                                                                             |
| visual-order-follows-dom         | Visual order on the page follows DOM order                                                                                         |
| uses-long-cache-ttl              | Serve static assets with an efficient cache policy                                                                                 |
| total-byte-weight                | Avoids enormous network payloads                                                                                                   |
| offscreen-images                 | Defer offscreen images                                                                                                             |
| render-blocking-resources        | Eliminate render-blocking resources                                                                                                |
| unminified-css                   | Minify CSS                                                                                                                         |
| unminified-javascript            | Minify JavaScript                                                                                                                  |
| unused-css-rules                 | Reduce unused CSS                                                                                                                  |
| unused-javascript                | Reduce unused JavaScript                                                                                                           |
| modern-image-formats             | Serve images in next-gen formats                                                                                                   |
| uses-optimized-images            | Efficiently encode images                                                                                                          |
| uses-text-compression            | Enable text compression                                                                                                            |
| uses-responsive-images           | Properly size images                                                                                                               |
| efficient-animated-content       | Use video formats for animated content                                                                                             |
| duplicated-javascript            | Remove duplicate modules in JavaScript bundles                                                                                     |
| legacy-javascript                | Avoid serving legacy JavaScript to modern browsers                                                                                 |
| doctype                          | Page has the HTML doctype                                                                                                          |
| charset                          | Properly defines charset                                                                                                           |
| dom-size                         | Avoids an excessive DOM size                                                                                                       |
| geolocation-on-start             | Avoids requesting the geolocation permission on page load                                                                          |
| inspector-issues                 | No issues in the `Issues` panel in Chrome Devtools                                                                                 |
| no-document-write                | Avoids `document.write()`                                                                                                          |
| js-libraries                     | Detected JavaScript libraries                                                                                                      |
| notification-on-start            | Avoids requesting the notification permission on page load                                                                         |
| paste-preventing-inputs          | Allows users to paste into input fields                                                                                            |
| uses-http2                       | Use HTTP/2                                                                                                                         |
| uses-passive-event-listeners     | Uses passive listeners to improve scrolling performance                                                                            |
| meta-description                 | Document does not have a meta description                                                                                          |
| http-status-code                 | Page has successful HTTP status code                                                                                               |
| font-size                        | Document uses legible font sizes                                                                                                   |
| link-text                        | Links have descriptive text                                                                                                        |
| crawlable-anchors                | Links are crawlable                                                                                                                |
| is-crawlable                     | Page isn’t blocked from indexing                                                                                                   |
| robots-txt                       | robots.txt is not valid                                                                                                            |
| hreflang                         | Document has a valid `hreflang`                                                                                                    |
| canonical                        | Document has a valid `rel=canonical`                                                                                               |
| structured-data                  | Structured data is valid                                                                                                           |
| bf-cache                         | Page prevented back/forward cache restoration                                                                                      |
