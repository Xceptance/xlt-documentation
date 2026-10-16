# Proposal: Adopt Blume 2.x Standard Features and Directory Index Cards

## Why

Following the upgrade to Blume 2.2.1, several chapter landing pages across the documentation site (including `/xlt/about`, `/xlt/quick-start`, `/xlt/manual`, `/xlt/advanced`, `/xlt/how-tos`, `/xlt/knowledgebase`, `/xtc/basics`, `/xtc/loadtesting`, `/xtc/monitoring`, and Neodymium chapters) are currently almost empty with zero or one sentence of body content. In Blume 1.x, these pages had to be suppressed from navigation to prevent dead ends. 

Blume 2.x introduces native Directory Index Cards (`directory: "card"`), standard footer configuration, automated external link badges, and Git-based last-modified timestamps. Adopting these standard Blume 2.x conventions allows retiring previous workarounds, making landing pages valuable chapter catalogs while maintaining the custom corporate homepage design.

## What Changes

- **Directory Index Cards on Chapter Landing Pages**:
  - Configure `directory: "card"` in chapter `meta.ts` files for topic-based sections across XLT, XTC, and Neodymium.
  - Section landing pages automatically render a responsive visual card grid of child articles (showing titles, icons, and descriptions).
  - Exclude historical changelog directories (such as `xlt/release-notes` and `xtc/xtc-release-notes`) where long chronological lists are better served by the existing custom accordion or standard list view.
- **Modernize `blume.config.ts`**:
  - Retire external links (Blog, GitHub) from `navigation.featured` in the top header.
  - Add native Blume 2.x `footer` configuration with corporate copyright, company links (Blog, Website, Privacy Policy, Imprint), and social profile icons (GitHub, LinkedIn, X).
  - Enable `markdown.externalLinks: true` so all external links automatically open in new tabs with external link icons and screen-reader accessibility announcements.
  - Enable `lastModified: "git"` to display commit-based last-updated timestamps on documentation pages.
  - Enable `export: { pdf: true }` in reader page actions.
- **Homepage Search Integration Cleanup**:
  - Retain the custom `pages/index.astro` corporate design and visual `⌘K` / `Ctrl K` keyboard shortcut badge.
  - Streamline client-side search click listeners to leverage Blume's standard `data-blume-search-open` trigger.

## Capabilities

### Modified Capabilities

- `docs-site`: Update section navigation and landing page requirements to specify Directory Index Cards for topic chapters, standard footer links/socials, and external link handling.

## Impact

- `blume.config.ts`: Configuration of footer, markdown external links, last-modified stamps, and export actions.
- `content/en/**/meta.ts`: Adding `directory: "card"` to topic chapter metadata definitions.
- `pages/index.astro`: Cleanup of redundant click fallback scripts.
- No breaking changes to existing documentation content or URLs.

