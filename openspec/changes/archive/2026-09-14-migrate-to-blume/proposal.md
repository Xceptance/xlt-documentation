## Why

The Xceptance documentation site currently runs on Hugo with the Docsy theme and custom SCSS layouts, requiring an external Hugo binary and PostCSS tooling. Migrating to Blume replaces this legacy static site setup with a modern, markdown-first documentation framework built on Astro and Vite. This migration provides built-in clientless search, type-safe configuration, native MDX directives, out-of-the-box AI integration (`llms.txt`), and unified Node.js-based tooling while preserving the existing content structure, navigation hierarchy, and Xceptance visual identity.

## What Changes

- **Blume Adoption**: Introduce `blume` as the documentation framework, configured via `blume.config.ts`, with build, dev, validation, and preview scripts in `package.json`.
- **Preserved Content Root**: Mount `content/en` as the content root (`content: { root: "content/en" }`) to maintain existing folder organization without bulk moves.
- **Modern Interactive Landing Page**: Replace `content/en/_index.html` with a custom full-width landing page via `pages/index.astro` using Blume's `PageLayout`, showcasing XTC, XLT, and Neodymium in a responsive card grid alongside their UI screenshots.
- **Automated Shortcode Conversion**:
  - `{{% note %}}`, `{{% warning %}}`, `{{% tip %}}`, `{{% danger %}}` converted to Blume directives (`:::note`, `:::warning`, `:::tip`, `:::danger`).
  - `{{% permission %}}` shortcodes converted to standard `:::info[Role Required] ... :::` callouts.
  - `{{< kbd >}}` converted to `<kbd>...</kbd>`.
  - `{{< ctext color="..." >}}` converted to styled spans.
  - `{{< image src="..." >}}` converted to Blume `<Frame>` components or markdown images.
- **Internal Link Resolution**: Automatically rewrite ~660 Hugo `{{< relref >}}` / `{{< ref >}}` references into clean markdown links.
- **Frontmatter Normalization**: Strict Blume schema compliance: map `linkTitle` to `sidebar.label`, `weight` to `sidebar.order`, and strip Hugo-specific fields (`type: docs`, `sitemap`).
- **MDX Extension Adoption**: Rename all `.md` files that use directives or components to `.mdx`.
- **Asset Migration**: Move `static/images/` to `public/images/` and place site icons/favicons in `public/` for automatic convention-based resolution.
- **Branding & Theming**: Configure Xceptance brand styling in `blume.config.ts` (accent `#a00000`, display font `Outfit`, body font `Inter`, monospace `Ubuntu Mono`).
- **Header Tabs**: Map top-level sections (`xlt`, `xtc`, `neodymium`) to Blume `navigation.tabs` for route-scoped sidebar navigation.
- **Hugo Decommissioning**: Remove `hugo.toml`, `themes/`, `layouts/`, and Hugo PostCSS devDependencies after verification.

## Capabilities

### New Capabilities
- `docs-site`: Documentation site architecture, filesystem-derived navigation with top-level product tabs, MDX authoring with native callout directives, local search, asset management, and static build generation via Blume.

### Modified Capabilities
*(None)*

## Impact

- **Dependencies**: Adds `blume` to `package.json`; removes `autoprefixer`, `postcss`, `postcss-cli`.
- **Content Files**: ~320 files under `content/en/` will be updated with cleaned frontmatter, converted shortcodes, and normalized internal links; files utilizing directives will be renamed to `.mdx`.
- **Static Assets**: Moved from `static/` to `public/`.
- **Build / CI Pipeline**: Hugo build commands replaced with `blume build --strict` and `blume validate --strict`.
- **Hosting / Deploy**: Static output directory transitions from `public/` (Hugo) to `dist/` (Blume).

