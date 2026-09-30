## Why

Executing `npm run validate` (`blume validate`) produces 39 warnings: 5 missing static image assets (`BLUME_BROKEN_ASSET`) and 34 unresolved anchor links (`BLUME_BROKEN_ANCHOR`). These warnings stem from the Hugo-to-Blume migration (cross-product `relref` path collisions, legacy Hugo heading slug suffixes, HTML4 `<a name="...">` attributes ignored by Blume, and removed legacy images). Resolving these warnings ensures documentation accuracy, avoids 404/broken links for users, and brings the site to a clean `npm run validate` baseline that can be enforced in CI with `--strict`.

## What Changes

- **Fix Missing Static Assets (5 warnings)**:
  - Remove broken references to retired Script Developer images in historical release notes (`v4_0_x.mdx` and `v4_7_x.mdx`) where the feature images were purged in 2020.
  - Fix the image path in `content/en/xtc/monitoring/430-scenarios.mdx` to use the existing `monitoring_qualitySensors_overview.png` asset.
- **Fix Cross-Product Migration Route Collisions (10 warnings)**:
  - Correct Mastercontroller execution links in `environment-configuration.mdx` and `test-evaluation.mdx` to point to `/xlt/manual/xlt-test-execution/` rather than `/neodymium/framework/test-execution/`.
  - Correct XTC monitoring history links in `420-monitoring-configuration.mdx` and `480-exports.mdx` to point to `/xtc/monitoring/history/` instead of `/xlt/about/history/`.
  - Correct XTC load test report and results sharing links in `120-load-project-configuration.mdx` and `175-results.mdx` to point to `/xtc/loadtesting/results/` and `/xtc/loadtesting/reports/` instead of `/xlt/advanced/results/` and `/xlt/manual/reports/`.
- **Fix HTML4 Anchor Attributes (2 warnings)**:
  - Update `<a name="aws-name-tag"></a>` in `cloud-setup.mdx` to use `id="aws-name-tag"`.
  - Update `<a name="time_period_values">` in `test-suite-configuration.mdx` to use `id="time_period_values"`.
- **Fix Heading Anchor Slugs & Renamed Sections (14 warnings)**:
  - Fix GCP heading anchors (`#google-cloud-gcp` instead of `#google-cloud-gc`).
  - Fix AWS image templates anchor (`#amis-for-aws` instead of `#image-templates-for-aws`).
  - Fix single-word vs hyphenated heading slugs for Mastercontroller and Agentcontroller (`#mastercontroller-configuration`, `#agentcontroller-logging`, `#agentcontrollers`).
  - Fix relative load function heading anchor (`#relative-load-functions` instead of `#relative-load-function-definition`).
  - Fix XTC project and configuration links (`#inviting-users-to-join-a-project`, `/xtc/basics/organizations/#organization-configuration`, `#build-artifact-and-dependency-cache`, `#scenario-status`).
  - Replace legacy Hugo disambiguation slugs (`#requests-1`, `#errors-1`, `#custom-timers--values`) with their canonical Blume anchors.
  - Update standalone monitoring subpages (`quiet-periods`, `scenarios`) in `400-about-monitoring.md` to link directly to their page routes rather than non-existent in-page anchors.
- **Fix Non-Heading Anchor Link (1 warning)**:
  - Add an explicit anchor `{#colored-request-table-cells}` to the bold heading in `v4_10_x.mdx` or link to the appropriate subsection.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `docs-site`: Enforce clean link and asset validation with zero warnings when running `blume validate`.

## Impact

- **Affected Files**: ~16 Markdown and MDX content files across `content/en/xlt/`, `content/en/xtc/`, and `content/en/neodymium/`.
- **No Breaking User Changes**: Improves documentation link navigation, fixes broken image icons, and eliminates all validator warnings.
- **Validation**: `npm run validate` runs cleanly with 0 errors and 0 warnings.
