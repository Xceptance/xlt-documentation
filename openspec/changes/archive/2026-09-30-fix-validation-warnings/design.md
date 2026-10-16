## Context

Running `npm run validate` evaluates all document links, anchor targets, and static asset paths. Currently, 39 warnings are reported: 5 missing image assets (`BLUME_BROKEN_ASSET`) and 34 unresolved anchor targets (`BLUME_BROKEN_ANCHOR`).

Blume's anchor indexing mechanism (`buildAnchorIndex` and `scanBody`) discovers anchors through:
1. Markdown heading slugification (e.g. `### Requests` → `#requests`).
2. Bare curly bracket markers on headings (e.g. `### Heading {#custom-id}`).
3. HTML elements containing an `id` attribute (e.g. `<a id="foo">` or `<span id="foo">`).

Blume does not index HTML4 `<a name="...">` attributes. Furthermore, during the automated migration from Hugo to Blume, `relref` targets with duplicate file names across different product sections (`history.md`, `test-execution.md`, `reports.md`, `results.md`) were mapped to the wrong product section.

## Goals / Non-Goals

**Goals:**
- Eliminate all 39 warnings reported by `npm run validate`.
- Enable `blume validate --strict` to pass with status 0.
- Point all cross-page references to the correct product tab and target section.
- Handle retired Script Developer assets cleanly without dead images in release notes.

**Non-Goals:**
- Re-adding retired Script Developer image binaries to git storage.
- Substantive content rewrites or restructuring outside of fixing links, anchors, and asset references.

## Decisions

### Decision 1: Handling Retired Script Developer Images in Historical Release Notes
- **Approach**: In `v4_0_x.mdx` (line 338) and `v4_7_x.mdx` (lines 341, 353, 356), remove the broken `![](/images/user-manual/ScriptDev_*.png)` image embeds while preserving the descriptive release notes text.
- **Rationale**: Script Developer was retired years ago, and commit `e4c59c0c` intentionally pruned these obsolete screenshots. Checking in dead binary screenshots solely for historical release notes bloats the repo without reader value.
- **Alternative considered**: Restoring the deleted PNG files from git history into `public/images/user-manual/`. Rejected to avoid unnecessary repo bloat for a retired feature.

### Decision 2: Handling Broken XTC Scenario Quality Sensors Image
- **Approach**: In `content/en/xtc/monitoring/430-scenarios.mdx` (line 112), update `/images/xtc/monitoring_scenario_qualitySensors.png` to `/images/xtc/monitoring_qualitySensors_overview.png`.
- **Rationale**: The monitoring overhaul commit added `monitoring_qualitySensors_overview.png`, `_details.png`, and `_add.png`, but accidentally used an inconsistent filename in the markdown text.

### Decision 3: Modernizing HTML4 Anchor Tags to Modern ID Attributes
- **Approach**:
  - `content/en/xlt/advanced/cloud-setup.mdx:329`: Replace `<a name="aws-name-tag"></a>` with `<a id="aws-name-tag"></a>`.
  - `content/en/xlt/manual/test-suite-configuration.mdx:48`: Replace `<a name="time_period_values">...</a>` with `<span id="time_period_values">...</span>` or `<a id="time_period_values">...</a>`.
- **Rationale**: Blume strictly validates against HTML `id="..."` and heading slugs. Updating `name` to `id` allows Blume to index the anchor while retaining in-page link navigation.

### Decision 4: Fixing Cross-Product Route Collisions
- **Approach**: Correct the link routes:
  - `environment-configuration.mdx:177` & `test-evaluation.mdx:241`: Change target from `/neodymium/framework/test-execution/` to `/xlt/manual/xlt-test-execution/` (`#auto-mode` and `#interactive-mode`).
  - `420-monitoring-configuration.mdx:165,166` & `480-exports.mdx:27`: Change target from `/xlt/about/history/` to `/xtc/monitoring/history/` (`#execution-statuses` and `#filtering`).
  - `120-load-project-configuration.mdx:67`: Change target to `/xtc/loadtesting/results/#sharing-results` and `/xtc/loadtesting/reports/#sharing-a-report`.
  - `175-results.mdx:41,60`: Change targets to `/xtc/loadtesting/reports/#sharing-a-report` and `/xtc/loadtesting/reports/#custom-reports`.
- **Rationale**: These features belong to XTC or XLT Mastercontroller, but were misrouted during migration due to identical base file names.

### Decision 5: Resolving Heading Slug Discrepancies and Renamed Sections
- **Approach**:
  - Update `#google-cloud-gc` → `#google-cloud-gcp` in `cloud-setup.mdx` and `xlt-basics.md`.
  - Update `#image-templates-for-aws` → `#amis-for-aws` in `feature-overview.md`.
  - Update hyphenated controller anchors (`#master-controller-configuration`, `#agent-controller-logging`, `#agent-controllers`) to match unhyphenated headings (`#mastercontroller-configuration`, `#agentcontroller-logging`, `#agentcontrollers`).
  - Update `#relative-load-function-definition` → `#relative-load-functions` in `v9_1_x.md` and `v104.md`.
  - In `050-projects.mdx`: Update `#inviting-users-to-join-xtc` → `#inviting-users-to-join-a-project`, and `#organization-configuration` → `/xtc/basics/organizations/#organization-configuration`.
  - In `060-project-configuration.mdx`: Update `#build-dependency-cache` → `#build-artifact-and-dependency-cache`.
  - In `160-start-lt.mdx`: Update `#scenario-overview` → `#scenario-status`.
  - In `400-about-monitoring.md`: Update `monitoring-configuration/#quiet-periods` and `/#scenarios` to standalone routes `/xtc/monitoring/quiet-periods/` and `/xtc/monitoring/scenarios/`.
  - In `custom-data.mdx` and `evaluate-a-test.mdx`: Replace Hugo disambiguation slugs (`#requests-1`, `#errors-1`, `#custom-timers--values`) with `#requests`, `#errors`, `#custom-timers`, or `#custom-data`.
  - In `v4_10_x.mdx:451`: Add explicit anchor `{#colored-request-table-cells}` to the section header or update the linking text.

## Risks / Trade-offs

- **Risk**: Changing link targets or anchors could break external bookmarked links.
  - **Mitigation**: All updated links are internal relative cross-references within the docs repo. For in-page target anchors, using `<a id="...">` or `{#...}` preserves any incoming bookmarks.
- **Risk**: Modifying historical release notes.
  - **Mitigation**: Only broken image tags for retired tools are removed; no factual release text or version descriptions are altered.
