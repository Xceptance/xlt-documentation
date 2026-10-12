# Tasks

## 1. Sidebar Navigation Styling & Icon Suppression

- [x] 1.1 Add `.blume-nav-link svg { display: none; }` to `theme.css` to suppress page-level icons in sidebar navigation while keeping `.blume-nav-summary` header icons intact, and verify syntax against CSS standards.
- [x] 1.2 Verify that `theme.css` is processed correctly during build and does not affect Directory Index Cards on main content pages.

## 2. XLT Topic Chapters Frontmatter Icons

- [x] 2.1 Add contextual Lucide icons to all child articles in `content/en/xlt/about/` (`architecture.md`, `feature-overview.md`, `glossary.mdx`, `history.md`, `license.md`, `load-testing.md`, `target-audience.md`, `test-approaches.md`), and verify frontmatter validity.
- [x] 2.2 Add contextual Lucide icons to all child articles in `content/en/xlt/quick-start/` (`demo-application.mdx`, `demo-test-suite.mdx`, `evaluate-a-test.mdx`, `installation.mdx`, `run-a-test.md`, `what-is-next.md`), and verify frontmatter validity.
- [x] 2.3 Add contextual Lucide icons to all child articles in `content/en/xlt/manual/` (`actions.md`, `concepts.md`, `configuration.md`, `data-handling.md`, `framework.md`, `load-testing.md`, `monitoring.md`, `overview.md`, `scripting.md`, `test-runners.md`, `web-testing.md`), and verify frontmatter validity.
- [x] 2.4 Add contextual Lucide icons to all child articles in `content/en/xlt/advanced/` (`agent-controllers.md`, `clustering.md`, `extensions.md`, `security.md`), and verify frontmatter validity.
- [x] 2.5 Add contextual Lucide icons to all child articles in `content/en/xlt/test-suites/` (`advanced-web-test-suite.mdx`, `base-rest-test-suite.mdx`, `base-web-test-suite.md`, `no-coding-test-suite.md`, `webdav-test-suite.md`), and verify frontmatter validity.
- [x] 2.6 Add contextual Lucide icons to all child articles in `content/en/xlt/how-tos/` and `content/en/xlt/knowledgebase/`, and verify frontmatter validity.

## 3. XTC Topic Chapters Frontmatter Icons

- [x] 3.1 Add contextual Lucide icons to all child articles in `content/en/xtc/basics/` (`030-ui-structure.mdx`, `040-user-accounts.mdx`, `045-organizations.mdx`, `050-projects.mdx`, `060-project-configuration.mdx`, `070-audit-log.mdx`), and verify frontmatter validity.
- [x] 3.2 Add contextual Lucide icons to all child articles in `content/en/xtc/loadtesting/` (`100-load-testing.md` through `400-resource-usage.mdx`), and verify frontmatter validity.
- [x] 3.3 Add contextual Lucide icons to all child articles in `content/en/xtc/monitoring/` and `content/en/xtc/integrations/`, and verify frontmatter validity.

## 4. Neodymium Topic Chapters Frontmatter Icons

- [x] 4.1 Add contextual Lucide icons to all child articles in `content/en/neodymium/quick-start/` and `content/en/neodymium/browsers/`, and verify frontmatter validity.
- [x] 4.2 Add contextual Lucide icons to all child articles in `content/en/neodymium/configuration/` and `content/en/neodymium/features/`, and verify frontmatter validity.
- [x] 4.3 Add contextual Lucide icons to all child articles in `content/en/neodymium/framework/`, `content/en/neodymium/integrations/`, and `content/en/neodymium/miscellaneous/`, and verify frontmatter validity.

## 5. Verification & Build Validation

- [x] 5.1 Run `npm run build` and `npx blume validate` to verify that all Lucide icon identifiers resolve successfully with zero broken asset or schema warnings.
- [x] 5.2 Verify in built HTML output that topic chapter landing pages render card icons, sidebar page links remain text-only, and Release Notes retain their megaphone header icon.

