## Context

The repository currently runs a Hugo (extended) static site using the Docsy theme and a custom `themes/xltdoc` theme layer. The documentation spans ~320 files inside `content/en/`, split into three top-level product sections: XLT (119 files), XTC (137 files), and Neodymium (62 files). The content relies heavily on Hugo-specific shortcodes (~1,700 total instances across `relref`, `image`, `note`, `warning`, `kbd`, `ctext`, and `permission`).

Moving to Blume eliminates the external Hugo binary dependency, removes legacy SCSS/PostCSS pipelines, and standardizes on a markdown-first Astro/Vite stack with built-in search, native MDX directives, and strict schema validation.

## Goals / Non-Goals

**Goals:**
- Provide an automated, deterministic codemod script to transform all ~320 content files, frontmatter keys, and Hugo shortcodes in a single pass.
- Preserve existing content directory structure by mounting `content: { root: "content/en" }`.
- Retain exact navigation ordering by mapping Hugo frontmatter `weight` directly to Blume's native `sidebar.order`.
- Render the documentation hub landing page using Blume native `<CardGroup>` and `<Card>` components with visual product screenshots.
- Achieve clean passes on `blume build --strict` (zero schema or syntax errors) and `blume validate --strict` (zero broken internal links or missing images).
- Clean up legacy Hugo files and dependencies upon successful verification.

**Non-Goals:**
- Restructuring chapters or editing documentation prose.
- Multi-language (i18n) setup (remains English-only in `content/en`).
- Dual-build support (Hugo files will be cleanly removed after Blume is verified).

## Decisions

### Decision 1: Retain `content/en` as Content Root
- **Choice**: Set `content: { root: "content/en" }` in `blume.config.ts`.
- **Rationale**: Avoids moving or renaming hundreds of files in git, maintaining git blame history while still mapping cleanly to root routes (`/xlt`, `/xtc`, `/neodymium`).
- **Alternatives Considered**: Moving everything into a `docs/` root directory (unnecessary file churn).

### Decision 2: Automated Idempotent Migration Codemod
- **Choice**: Implement a Node.js codemod script (`scripts/migrate-hugo-to-blume.mjs`) to automate transformations.
- **Rationale**: Manually converting ~1,700 shortcode instances and 650+ cross-links across 320 files is error-prone. A deterministic script can be run, tested, inspected, and refined.
- **Alternatives Considered**: Manual search-and-replace (high failure rate).

### Decision 3: Frontmatter Mapping & Strict Cleanup
- **Choice**: Map `linkTitle` -> `sidebar.label`, `weight` -> `sidebar.order`; strip `type: docs`, `sitemap`, and unknown keys.
- **Rationale**: Blume enforces a strict frontmatter schema. `sidebar.order` natively reproduces Hugo's weight sorting without needing folder-level `meta.ts` files or filename prefixes.
- **Alternatives Considered**: Generating `meta.ts` per directory or prefixing files with numbers (`01-foo.mdx`).

### Decision 4: Native Directives for Admonitions and Permissions
- **Choice**:
  - `note`, `warning`, `tip`, `danger` -> `:::note`, `:::warning`, `:::tip`, `:::danger`
  - `permission` -> `:::info[Role Required] ... :::`
  - `kbd` -> `<kbd>...</kbd>`
  - `ctext` -> `<span style={{ color: "..." }}>...</span>`
- **Rationale**: Zero external component imports needed in MDX. Pure standard Blume primitives.
- **Alternatives Considered**: Custom `<Permission>` MDX component (unnecessary abstraction when `:::info` natively renders cleanly).

### Decision 5: Landing Page Variant 1 (Interactive Cards with Previews)
- **Choice**: Implement `content/en/index.mdx` using `<CardGroup cols={3}>` and `<Card>` containing the existing preview screenshots (`xtc-loadtest-dashboard.png`, `xlt-report-transactions.png`, `test-automation-allure-suites.png`).
- **Rationale**: Provides above-the-fold visibility for all 3 tools, maintains visual product recognition, and makes future removal of screenshots trivial if a minimalist design is later desired.
- **Alternatives Considered**: Custom Astro template (`pages/index.astro`) or full alternating zigzag layout.

### Decision 6: Static Asset Relocation
- **Choice**: Move `static/images/` to `public/images/`; place favicons and icons directly in `public/`.
- **Rationale**: Blume serves `public/` at the site root `/`, keeping all image references (`/images/...`) intact without URL rewriting.

### Decision 7: Brand Identity Tokens in `blume.config.ts`
- **Choice**:
  ```ts
  theme: {
    accent: "#a00000",
    fonts: {
      display: "outfit",
      body: "inter",
      mono: "ubuntu-mono",
    },
  }
  ```
- **Rationale**: Matches the exact visual identity from `_variables_project.scss`.

## Risks / Trade-offs

- **[Risk] MDX syntax errors with unescaped braces or HTML entities**:
  *Mitigation*: The codemod script will detect unescaped `{...}` expressions or non-standard HTML tags in markdown body and wrap them in inline code backticks or escape them.
- **[Risk] Broken cross-references from Hugo `relref` shortcodes**:
  *Mitigation*: The codemod pre-indexes all file paths, basenames, and slugs across the 320 files before rewriting links, ensuring every `relref` maps to a verified route. `blume validate --strict` guarantees 0 broken links.
- **[Risk] Directives in `.md` files rendering as raw text**:
  *Mitigation*: The codemod automatically renames `.md` files that contain directives (`:::`) or JSX components to `.mdx`.

## Migration Plan

1. **Setup**: Add `blume` dependency to `package.json` and configure `blume.config.ts`.
2. **Assets**: Relocate `static/images/` to `public/images/` and configure root icons in `public/`.
3. **Execute Codemod**: Run `scripts/migrate-hugo-to-blume.mjs` against `content/en/`.
4. **Landing Page**: Write `content/en/index.mdx` using `<CardGroup>` and remove `content/en/_index.html`.
5. **Validation**: Run `blume build --strict` and `blume validate --strict` to verify zero errors.
6. **Cleanup**: Remove `hugo.toml`, `themes/`, `layouts/`, `.hugo_build.lock`, and unused Hugo devDependencies.

