---
title: "Accessibility Testing with Google Lighthouse"

weight: 110
type: docs

description: >
  Using Google Lighthouse to provide accessibility testing.
---

Accessibility reports are crucial when testing web pages because they help to ensure that a site is usable for people of
all abilities. That is why we introduced [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) to
Neodymium, an open-source tool to improve the quality of web pages.

## Install Lighthouse CLI

First of all we recommend installing a package manager like [npm](https://www.npmjs.com/), which we are also going to
use in order to [install Lighthouse CLI](https://www.npmjs.com/package/lighthouse). After you went through
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

The following sections list all available audits in a Lighthouse report. The type column values are defined as the
following:

1. Metric
    - What it is: These are the heavy hitters of performance monitoring (often called "Core Web Vitals"). Unlike a
      simple "Pass/Fail" check, a Metric measures a specific value (usually time in milliseconds or a layout shift
      score).
    - Data Provided: It provides a raw numericValue (e.g., 1200 ms) and maps it to a score (0–1) based on a log-normal
      curve.
    - Examples: first-contentful-paint (FCP), cumulative-layout-shift (CLS), total-blocking-time (TBT).
2. Audit (Standard/Binary)
    - What it is: These are automated checks that verify if a specific best practice is followed.
    - Data Provided: Usually a binary score. 1 = Pass or 0 = Fail.
    - Examples: doctype, is-on-https, image-alt.
3. Manual
    - What it is: These are items that Lighthouse cannot test automatically. It detects that the element exists (e.g., "
      You have a custom button") but cannot verify if it works correctly for a screen reader user.
    - Data Provided: The score is usually null or 0 in the raw JSON report because the computer cannot "pass" it for
      you.
    - Examples: visual-order-follows-dom, focusable-controls, custom-controls-labels.
4. Diagnostic
    - What it is: These items do not "pass" or "fail." They are purely informational buckets of data used to help you
      debug why a Metric might be low.
    - Data Provided: They return a score of null (or sometimes 1 just to show they ran), but the real value is in the
      details object (lists of URLs, nodes, or request chains).
    - Examples: network-requests (List of every file downloaded), critical-request-chains (Tree of resources blocking
      the render), main-thread-tasks (Breakdown of CPU time).

#### Performance Audits

These audits measure metrics and suggest optimizations to improve page speed and user experience

| ID                                  | Title                                                              | Type       |
|:------------------------------------|:-------------------------------------------------------------------|:-----------|
| bootup-time                         | JavaScript execution time                                          | Audit      |
| critical-request-chains             | Minimize Critical Requests Depth                                   | Diagnostic |
| cumulative-layout-shift             | Cumulative Layout Shift (CLS)                                      | Metric     |
| diagnostics                         | Diagnostics                                                        | Diagnostic |
| dom-size                            | Avoids an excessive DOM size                                       | Audit      |
| duplicated-javascript               | Remove duplicate modules in JavaScript bundles                     | Audit      |
| efficient-animated-content          | Use video formats for animated content                             | Audit      |
| eliminate-render-blocking-resources | Eliminate render-blocking resources                                | Audit      |
| final-screenshot                    | Final Screenshot                                                   | Diagnostic |
| first-contentful-paint              | First Contentful Paint (FCP)                                       | Metric     |
| first-meaningful-paint              | First Meaningful Paint                                             | Metric     |
| font-display                        | Ensure text remains visible during webfont load                    | Audit      |
| interactive                         | Time to Interactive (TTI)                                          | Metric     |
| largest-contentful-paint            | Largest Contentful Paint (LCP)                                     | Metric     |
| largest-contentful-paint-element    | Largest Contentful Paint Element                                   | Diagnostic |
| layout-shifts                       | Layout Shifts                                                      | Diagnostic |
| lcp-lazy-loaded                     | LCP image was lazy-loaded                                          | Audit      |
| legacy-javascript                   | Avoid serving legacy JavaScript to modern browsers                 | Audit      |
| long-tasks                          | Minimize Main-Thread Work                                          | Diagnostic |
| main-thread-tasks                   | Main Thread Tasks                                                  | Diagnostic |
| mainthread-work-breakdown           | Minimize main-thread work                                          | Diagnostic |
| max-potential-fid                   | Max Potential First Input Delay                                    | Metric     |
| metrics                             | Metrics                                                            | Diagnostic |
| modern-image-formats                | Serve images in next-gen formats                                   | Audit      |
| network-requests                    | Network Requests                                                   | Diagnostic |
| network-rtt                         | Network Round Trip Time                                            | Diagnostic |
| network-server-latency              | Server Backend Latencies                                           | Diagnostic |
| no-document-write                   | Avoids document.write()                                            | Audit      |
| non-composited-animations           | Avoid non-composited animations                                    | Audit      |
| offscreen-images                    | Defer offscreen images                                             | Audit      |
| performance-budget                  | Performance budget                                                 | Diagnostic |
| preload-lcp-image                   | Preload Largest Contentful Paint image                             | Audit      |
| redirects                           | Avoid multiple page redirects                                      | Audit      |
| render-blocking-resources           | Eliminate render-blocking resources                                | Audit      |
| resource-summary                    | Keep request counts low and transfer sizes small                   | Diagnostic |
| screenshot-thumbnails               | Screenshot Thumbnails                                              | Diagnostic |
| script-treemap-data                 | Script Treemap Data                                                | Diagnostic |
| server-response-time                | Reduce initial server response time (TTFB)                         | Audit      |
| speed-index                         | Speed Index                                                        | Metric     |
| third-party-facades                 | Lazy load third-party resources with facades                       | Audit      |
| third-party-summary                 | Reduce the impact of third-party code                              | Audit      |
| timing-budget                       | Timing budget                                                      | Diagnostic |
| total-blocking-time                 | Total Blocking Time (TBT)                                          | Metric     |
| total-byte-weight                   | Avoid enormous network payloads                                    | Audit      |
| unminified-css                      | Minify CSS                                                         | Audit      |
| unminified-javascript               | Minify JavaScript                                                  | Audit      |
| unsized-images                      | Image elements do not have explicit width and height               | Audit      |
| unused-css-rules                    | Reduce unused CSS                                                  | Audit      |
| unused-javascript                   | Reduce unused JavaScript                                           | Audit      |
| user-timings                        | User Timing marks and measures                                     | Audit      |
| uses-long-cache-ttl                 | Serve static assets with an efficient cache policy                 | Audit      |
| uses-optimized-images               | Efficiently encode images                                          | Audit      |
| uses-passive-event-listeners        | Uses passive listeners to improve scrolling performance            | Audit      |
| uses-rel-preconnect                 | Preconnect to required origins                                     | Audit      |
| uses-rel-preload                    | Preload key requests                                               | Audit      |
| uses-responsive-images              | Properly size images                                               | Audit      |
| uses-text-compression               | Enable text compression                                            | Audit      |
| viewport                            | "Has a `<meta name=""viewport"">` tag with width or initial-scale" | Audit      |

#### Accessibility Audits

Lighthouse uses the axe-core library for most of these checks. These ensure your site is usable by people with
disabilities.

| ID                             | Title                                                                                                      | Type   |
|:-------------------------------|:-----------------------------------------------------------------------------------------------------------|:-------|
| accesskeys                     | [accesskey] values are unique                                                                              | Audit  |
| aria-allowed-attr              | [aria-*] attributes match their roles                                                                      | Audit  |
| aria-allowed-role              | [role]s are valid for the element                                                                          | Audit  |
| aria-command-name              | "button, link, and menuitem elements have accessible names"                                                | Audit  |
| aria-conditional-attr          | Conditional [aria-*] attributes are valid                                                                  | Audit  |
| aria-deprecated-role           | No deprecated [role]s are used                                                                             | Audit  |
| aria-dialog-name               | ARIA dialog and alertdialog nodes have an accessible name                                                  | Audit  |
| aria-hidden-body               | "[aria-hidden=""true""] is not present on the document `<body>`"                                           | Audit  |
| aria-hidden-focus              | "[aria-hidden=""true""] elements do not contain focusable descendants"                                     | Audit  |
| aria-input-field-name          | ARIA input fields have accessible names                                                                    | Audit  |
| aria-meter-name                | ARIA meter elements have accessible names                                                                  | Audit  |
| aria-progressbar-name          | ARIA progressbar elements have accessible names                                                            | Audit  |
| aria-prohibited-attr           | Elements do not use prohibited ARIA attributes                                                             | Audit  |
| aria-required-attr             | [role]s have all required [aria-*] attributes                                                              | Audit  |
| aria-required-children         | Elements with an ARIA [role] that require children to contain a specific [role] have all required children | Audit  |
| aria-required-parent           | [role]s are contained by their required parent element                                                     | Audit  |
| aria-roles                     | [role] values are valid                                                                                    | Audit  |
| aria-text                      | Elements with the role=text attribute do not have focusable descendants                                    | Audit  |
| aria-toggle-field-name         | ARIA toggle fields have accessible names                                                                   | Audit  |
| aria-tooltip-name              | ARIA tooltip elements have accessible names                                                                | Audit  |
| aria-treeitem-name             | ARIA treeitem elements have accessible names                                                               | Audit  |
| aria-valid-attr                | [aria-*] attributes have valid values                                                                      | Audit  |
| aria-valid-attr-value          | [aria-*] attributes have valid values                                                                      | Audit  |
| button-name                    | Buttons have an accessible name                                                                            | Audit  |
| bypass                         | "The page contains a heading, skip link, or landmark region"                                               | Audit  |
| color-contrast                 | Background and foreground colors have a sufficient contrast ratio                                          | Audit  |
| custom-controls-labels         | Custom controls have associated labels                                                                     | Manual |
| custom-controls-roles          | Custom controls have ARIA roles                                                                            | Manual |
| definition-list                | `<dl>`'s contain only properly-ordered `<dt>` and `<dd>` groups                                            | Audit  |
| dlitem                         | Definition list items are wrapped in `<dl>` elements                                                       | Audit  |
| document-title                 | Document has a `<title>` element                                                                           | Audit  |
| duplicate-id-active            | "[id] attributes on active, focusable elements are unique"                                                 | Audit  |
| duplicate-id-aria              | ARIA IDs are unique                                                                                        | Audit  |
| empty-heading                  | Headings are not empty                                                                                     | Audit  |
| focus-traps                    | User focus is not accidentally trapped in a region                                                         | Manual |
| focusable-controls             | Interactive controls are keyboard focusable                                                                | Manual |
| form-field-multiple-labels     | No form fields have multiple labels                                                                        | Audit  |
| frame-title                    | `<frame>` or `<iframe>` elements have a title                                                              | Audit  |
| heading-order                  | Heading elements appear in a sequentially-descending order                                                 | Audit  |
| html-has-lang                  | `<html>` element has a [lang] attribute                                                                    | Audit  |
| html-lang-valid                | `<html>` element has a valid value for its [lang] attribute                                                | Audit  |
| html-xml-lang-mismatch         | `<html>` element does not have an [xml:lang] attribute with the same base language as the [lang] attribute | Audit  |
| identical-links-same-purpose   | Links with the same name have a similar purpose                                                            | Audit  |
| image-alt                      | Image elements have [alt] attributes                                                                       | Audit  |
| image-redundant-alt            | Image elements do not have redundant [alt] attributes                                                      | Audit  |
| input-button-name              | Input buttons have discernible text                                                                        | Audit  |
| input-image-alt                | "`<input type=""image"">` elements have [alt] text"                                                        | Audit  |
| interactive-element-affordance | Interactive elements indicate their purpose and state                                                      | Manual |
| label                          | Form elements have associated labels                                                                       | Audit  |
| label-content-name-mismatch    | Elements' visible text is part of their accessible name                                                    | Audit  |
| landmark-one-main              | Document has one main landmark                                                                             | Audit  |
| link-in-text-block             | Links are distinguishable from surrounding text                                                            | Audit  |
| link-name                      | Links have a discernible name                                                                              | Audit  |
| list                           | Lists contain only `<li>` elements and script supporting elements                                          | Audit  |
| listitem                       | "List items (`<li>`) are contained within `<ul>`, `<ol>` or `<menu>` parent elements"                      | Audit  |
| logical-tab-order              | The page has a logical tab order                                                                           | Manual |
| managed-focus                  | The user's focus is directed to new content added to the page                                              | Manual |
| meta-refresh                   | "The document does not use `<meta http-equiv=""refresh"">`"                                                | Audit  |
| meta-viewport                  | "[user-scalable=""no""] is not used in the `<meta name=""viewport"">` element"                             | Audit  |
| object-alt                     | `<object>` elements have alternate text                                                                    | Audit  |
| offscreen-content-hidden       | Offscreen content is hidden from assistive technology                                                      | Manual |
| select-name                    | Select elements have associated label elements                                                             | Audit  |
| skip-link                      | Skip links are focusable                                                                                   | Audit  |
| tabindex                       | No element has a [tabindex] value greater than 0                                                           | Audit  |
| table-duplicate-name           | `<caption>` elements do not contain the same text as the summary attribute                                 | Audit  |
| table-fake-caption             | Tables use `<caption>` instead of cells with the [colspan] attribute                                       | Audit  |
| target-size                    | Tap targets are sized appropriately                                                                        | Audit  |
| td-has-header                  | `<td>` elements in a large `<table>` have one or more table headers                                        | Audit  |
| td-headers-attr                | Cells in a `<table>` element that use the [headers] attribute refer to table cells within the same table   | Audit  |
| th-has-data-cells              | "`<th>` elements and elements with [role=""columnheader""/""rowheader""] have data cells they describe"    | Audit  |
| use-landmarks                  | HTML landmarks are used to identify page regions                                                           | Manual |
| valid-lang                     | [lang] attributes have a valid value                                                                       | Audit  |
| video-caption                  | "`<video>` elements contain a `<track>` element with [kind=""captions""]"                                  | Audit  |
| visual-order-follows-dom       | Visual order on the page follows DOM order                                                                 | Manual |

#### Best Practices Audits

These audits check for general code health and modern web standards.

| ID                                 | Title                                                                     | Type       |
|:-----------------------------------|:--------------------------------------------------------------------------|:-----------|
| appcache-manifest                  | Avoids Application Cache                                                  | Audit      |
| bf-cache                           | Page is eligible for Back/Forward Cache                                   | Audit      |
| csp-xss                            | Content Security Policy (CSP) protects against XSS                        | Audit      |
| deprecations                       | Avoids deprecated APIs                                                    | Audit      |
| doctype                            | Page has the HTML doctype                                                 | Audit      |
| errors-in-console                  | No browser errors logged to the console                                   | Audit      |
| external-anchors-use-rel-noopener  | Links to cross-origin destinations are safe                               | Audit      |
| geolocation-on-start               | Avoids requesting the geolocation permission on page load                 | Audit      |
| image-aspect-ratio                 | Displays images with correct aspect ratio                                 | Audit      |
| image-size-responsive              | Serves images with appropriate resolution                                 | Audit      |
| inspector-issues                   | No issues in the Issues panel in Chrome Devtools                          | Audit      |
| is-on-https                        | Uses HTTPS                                                                | Audit      |
| js-libraries                       | Detected JavaScript libraries                                             | Diagnostic |
| no-vulnerable-libraries            | Avoids front-end JavaScript libraries with known security vulnerabilities | Audit      |
| notification-on-start              | Avoids requesting the notification permission on page load                | Audit      |
| password-inputs-can-be-pasted-into | Allows users to paste into password fields                                | Audit      |
| third-party-cookies                | Third-party cookies                                                       | Diagnostic |
| uses-http2                         | Use HTTP/2                                                                | Audit      |
| valid-source-maps                  | Page has valid source maps                                                | Diagnostic |

#### SEO Audits

Checks that ensure your page is discoverable and optimized for search engine crawlers.

| ID                | Title                                         | Type  |
|:------------------|:----------------------------------------------|:------|
| canonical         | Document has a valid rel=canonical            | Audit |
| crawlable-anchors | Links are crawlable                           | Audit |
| document-title    | Document has a `<title>` element              | Audit |
| font-size         | Document uses legible font sizes              | Audit |
| hreflang          | Document has a valid hreflang                 | Audit |
| http-status-code  | Page has successful HTTP status code          | Audit |
| is-crawlable      | Page is not blocked from indexing             | Audit |
| link-text         | Links have descriptive text                   | Audit |
| meta-description  | Document has a meta description               | Audit |
| plugins           | "Document avoids plugins (e.g., Flash, Java)" | Audit |
| robots-txt        | robots.txt is valid                           | Audit |
| structured-data   | Structured data is valid                      | Audit |
| tap-targets       | Tap targets are sized appropriately           | Audit |

#### PWA (Progressive Web App) Audits

Checks for PWA validation, including installability and offline capabilities.

| ID                    | Title                                                       | Type   |
|:----------------------|:------------------------------------------------------------|:-------|
| apple-touch-icon      | Provides a valid apple-touch-icon                           | Audit  |
| content-width         | Content is sized correctly for the viewport                 | Audit  |
| installable-manifest  | Web app manifest meets the installability requirements      | Audit  |
| maskable-icon         | Manifest has a maskable icon                                | Audit  |
| pwa-cross-browser     | Site works cross-browser                                    | Audit  |
| pwa-each-page-has-url | Each page has a URL                                         | Audit  |
| pwa-page-transitions  | Page transitions don't feel like they block on the network  | Manual |
| redirects-http        | Redirects HTTP traffic to HTTPS                             | Audit  |
| service-worker        | Registers a service worker that controls page and start_url | Audit  |
| splash-screen         | Configured for a custom splash screen                       | Audit  |
| themed-omnibox        | Sets a theme color for the address bar                      | Audit  |
