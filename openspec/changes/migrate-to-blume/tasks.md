## 1. Setup & Project Configuration

- [x] 1.1 Install `blume` dependency in `package.json` and configure `dev`, `build`, `preview`, and `validate` npm scripts; verify `blume --version` runs successfully.
- [x] 1.2 Create `blume.config.ts` with `content: { root: "content/en" }`, top-level tabs for XLT, XTC, and Neodymium, theme tokens (accent `#a00000`, fonts `Outfit`, `Inter`, `Ubuntu Mono`), and GitHub repository links; verify configuration syntax.
- [x] 1.3 Move `static/images/` to `public/images/` and copy favicons/icons to `public/`; verify asset files are accessible at the new paths.

## 2. Content Codemod & Transformation

- [x] 2.1 Build the migration codemod script `scripts/migrate-hugo-to-blume.mjs` supporting frontmatter normalization, shortcode parsing, and link resolution; test dry run on sample pages.
- [x] 2.2 Execute the codemod across `content/en/` to convert admonitions (`:::note`, `:::warning`, `:::tip`, `:::danger`), permissions (`:::info[Role Required]`), `<kbd>`, `<Frame>`, and map `weight` to `sidebar.order`.
- [x] 2.3 Resolve and rewrite all ~660 `{{< relref >}}` links to verified internal markdown paths and rename all `.md` files containing directives to `.mdx`; verify no unresolved Hugo shortcodes remain.

## 3. Landing Page & Redirects

- [x] 3.1 Create `content/en/index.mdx` using Blume `<CardGroup cols={3}>` and `<Card>` components with product descriptions, preview screenshots, and action links; remove legacy `content/en/_index.html` and `content/en/search.md`.
- [x] 3.2 Configure redirects in `blume.config.ts` for existing Hugo aliases (such as `/xtc/xtc-release-notes/` -> `/xtc/release-notes/`); verify redirect entries.

## 4. Validation & Decommissioning

- [x] 4.1 Run `npm run build` (`blume build --strict`) and verify zero frontmatter schema or MDX syntax errors.
- [x] 4.2 Run `npm run validate` (`blume validate --strict`) and verify zero broken links, missing anchors, or 404 images.
- [x] 4.3 Remove legacy Hugo configuration files (`hugo.toml`, `themes/`, `layouts/`, `.hugo_build.lock`) and remove Hugo PostCSS dependencies from `package.json`; verify final clean build.

