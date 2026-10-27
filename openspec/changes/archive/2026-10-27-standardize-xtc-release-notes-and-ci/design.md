# Design

## Context

See `proposal.md` for background and motivation. Blume maps documentation URLs directly from filesystem folder names within `content/en/<product>/`. In Hugo, XTC release notes lived at `content/en/xtc/xtc-release-notes/` but overrode its canonical URL via frontmatter to `/xtc/release-notes/` with an alias for `/xtc/xtc-release-notes/`. In Blume, the folder resulted in `/xtc/xtc-release-notes/`, causing 404 errors for the live XTC web application (`https://xtc.xceptance.com/`) which links to `https://docs.xceptance.com/xtc/release-notes/`.

Additionally, the `poc-migrate-to-blume` migration branch has been merged into `main`. The staging deployment workflow (`.github/workflows/deploy-test.yml`) still triggers on `poc-migrate-to-blume` instead of active feature and fix development branches.

## Goals / Non-Goals

**Goals:**
- Move `content/en/xtc/xtc-release-notes/` to `content/en/xtc/release-notes/` using `git mv` to preserve git file history.
- Update all internal links across navigation, cards, and markdown content to `/xtc/release-notes/`.
- Configure an Apache 301 redirect in `public/.htaccess` that seamlessly handles legacy `/xtc/xtc-release-notes/` traffic and sub-pages.
- Update GitHub Actions test deployment triggers in `.github/workflows/deploy-test.yml` to support `feature/**`, `feat/**`, `fix/**`, `fixes/**`, `test/**`, and `preview/**`.
- Update `README.md` to document the new branch naming triggers for staging deployments.
- Delete the retired local branch `poc-migrate-to-blume`.
- Execute implementation on a dedicated branch (e.g. `fix/xtc-release-notes-and-ci`).

**Non-Goals:**
- Modifying production deployment workflow (`main.yml`).
- Modifying XLT or Neodymium release notes structure or content.

## Decisions

### 1. Directory Rename vs. Redirect-Only
- **Decision**: Rename `content/en/xtc/xtc-release-notes/` to `content/en/xtc/release-notes/` and add an Apache 301 redirect for the legacy path.
- **Rationale**: Standardizes URL architecture across all three products (`/xlt/release-notes/`, `/neodymium/release-notes/`, `/xtc/release-notes/`), matches developer intuition, and aligns search indexing with canonical URLs.
- **Alternatives Considered**: Keeping `xtc-release-notes` and redirecting `/xtc/release-notes/` was rejected because it perpetuates an inconsistent folder and URL scheme.

### 2. Apache Rewrite Rule Design
- **Decision**: Add the following rule to `public/.htaccess`:
  ```apache
  ###
  # Redirect legacy XTC release notes path to standardized URL
  RewriteRule ^xtc/xtc-release-notes(?:/(.*))?$ /xtc/release-notes/$1 [R=301,L]
  ```
- **Rationale**: Efficiently handles requests to `/xtc/xtc-release-notes`, `/xtc/xtc-release-notes/`, and deep links such as `/xtc/xtc-release-notes/v117/` in a single rule.

### 3. Branch Triggers for Test Deployment Workflow
- **Decision**: Update `.github/workflows/deploy-test.yml` push triggers:
  ```yaml
  on:
    push:
      branches:
        - 'feature/**'
        - 'feat/**'
        - 'fix/**'
        - 'fixes/**'
        - 'test/**'
        - 'preview/**'
  ```
- **Rationale**: Contributors can push feature or fix branches and immediately preview their work on the staging server (`https://docs-test.xceptance.com`) without manual dispatch steps, while keeping production isolated on `main`.

### 4. Implementation in a Dedicated Branch
- **Decision**: Switch to a new branch (such as `fix/xtc-release-notes-and-ci`) before applying the code changes.
- **Rationale**: Isolates development from `main` and matches the new CI workflow triggering pattern.

## Risks / Trade-offs

- **[Risk] Broken internal links across release note documents**  
  *Mitigation*: Update all internal references and run `npm run validate` to ensure zero broken links.
- **[Risk] Search index drift**  
  *Mitigation*: Run `npm run build` to regenerate `dist/blume-search.json` with the new `/xtc/release-notes/` URLs.
- **[Risk] Stray references to `poc-migrate-to-blume`**  
  *Mitigation*: Audit `README.md` and CI workflows to ensure clean removal.

