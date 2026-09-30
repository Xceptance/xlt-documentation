## 1. Fix Missing Static Assets

- [x] 1.1 Remove broken Script Developer image references in `content/en/xlt/release-notes/v4_0_x.mdx` (line 338) and verify the file parses cleanly
- [x] 1.2 Remove broken Script Developer image references in `content/en/xlt/release-notes/v4_7_x.mdx` (lines 341, 353, 356) and verify the file parses cleanly
- [x] 1.3 Update the scenario quality sensors image reference in `content/en/xtc/monitoring/430-scenarios.mdx` (line 112) to `/images/xtc/monitoring_qualitySensors_overview.png` and verify the referenced asset exists

## 2. Fix Cross-Product Route Collisions

- [x] 2.1 Update Mastercontroller mode links in `content/en/xlt/manual/environment-configuration.mdx:177` and `content/en/xlt/manual/test-evaluation.mdx:241` from `/neodymium/framework/test-execution/` to `/xlt/manual/xlt-test-execution/` (`#auto-mode` and `#interactive-mode`)
- [x] 2.2 Update monitoring history links in `content/en/xtc/monitoring/420-monitoring-configuration.mdx:165,166` and `480-exports.mdx:27` from `/xlt/about/history/` to `/xtc/monitoring/history/` (`#execution-statuses` and `#filtering`)
- [x] 2.3 Update result and report sharing links in `content/en/xtc/loadtesting/120-load-project-configuration.mdx:67` and `175-results.mdx:41,60` to point to `/xtc/loadtesting/results/#sharing-results`, `/xtc/loadtesting/reports/#sharing-a-report`, and `/xtc/loadtesting/reports/#custom-reports`

## 3. Modernize HTML4 Anchor Tags

- [x] 3.1 Replace `<a name="aws-name-tag"></a>` with `<a id="aws-name-tag"></a>` in `content/en/xlt/advanced/cloud-setup.mdx:329` and verify `#aws-name-tag` resolves
- [x] 3.2 Replace `<a name="time_period_values">` with `<a id="time_period_values">` in `content/en/xlt/manual/test-suite-configuration.mdx:48` and verify `#time_period_values` resolves

## 4. Fix Heading Slug and Naming Mismatches

- [x] 4.1 Update cloud setup heading anchors in `content/en/xlt/about/feature-overview.md:10` (`#amis-for-aws`), `content/en/xlt/advanced/cloud-setup.mdx:39` (`#google-cloud-gcp`), and `content/en/xlt/manual/xlt-basics.md:19` (`#google-cloud-gcp`)
- [x] 4.2 Update controller configuration anchors in `content/en/xlt/manual/test-setup.md:42` (`#mastercontroller-configuration`) and `content/en/xlt/manual/xlt-test-execution.mdx:53,90` (`#agentcontroller-logging`, `#agentcontrollers`)
- [x] 4.3 Update relative load function anchors in `content/en/xlt/release-notes/v9_1_x.md:41` and `content/en/xtc/xtc-release-notes/v104.md:31` to `#relative-load-functions`
- [x] 4.4 Update XTC project and configuration links in `content/en/xtc/basics/050-projects.mdx:84,112` (`#inviting-users-to-join-a-project`, `/xtc/basics/organizations/#organization-configuration`), `060-project-configuration.mdx:29` (`#build-artifact-and-dependency-cache`), and `160-start-lt.mdx:58` (`#scenario-status`)
- [x] 4.5 Update Hugo disambiguation anchors in `content/en/xlt/quick-start/evaluate-a-test.mdx:21` (`#requests`, `#errors`, `#custom-timers`, `#custom-data`) and `content/en/xlt/advanced/custom-data.mdx:51,82,201` (`#custom-timers`)
- [x] 4.6 Update standalone monitoring links in `content/en/xtc/monitoring/400-about-monitoring.md:27,28` to direct page routes `/xtc/monitoring/quiet-periods/` and `/xtc/monitoring/scenarios/`
- [x] 4.7 Add explicit anchor `{#colored-request-table-cells}` to `content/en/xlt/release-notes/v4_10_x.mdx:451` to satisfy the reference in `content/en/xlt/manual/properties.mdx:149`

## 5. Verification

- [x] 5.1 Run `npm run validate` and verify that all 39 warnings are eliminated (0 errors, 0 warnings)
- [x] 5.2 Run `npx blume validate --strict` and verify the process exits with code 0
