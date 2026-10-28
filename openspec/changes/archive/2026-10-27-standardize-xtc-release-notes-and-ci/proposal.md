# Proposal

## Why

The XTC web application's footer links to `https://docs.xceptance.com/xtc/release-notes/`, but Blume currently serves XTC release notes under `/xtc/xtc-release-notes/` due to its legacy folder name, resulting in 404 errors and breaking URL consistency with XLT and Neodymium (`/xlt/release-notes/`, `/neodymium/release-notes/`). Additionally, now that `poc-migrate-to-blume` is merged into `main`, GitHub Actions staging deployment in `.github/workflows/deploy-test.yml` must be updated to remove the obsolete migration branch and automatically deploy feature and fix branches to the test environment (`https://docs-test.xceptance.com`) during documentation authoring.

## What Changes

- **Directory Standardization**: Rename `content/en/xtc/xtc-release-notes/` to `content/en/xtc/release-notes/`, aligning XTC's URL structure with `/xlt/release-notes/` and `/neodymium/release-notes/`.
- **Navigation & Internal Reference Updates**:
  - Update `content/en/xtc/meta.ts` to reference `release-notes`.
  - Update quick action link in `pages/index.astro` from `/xtc/xtc-release-notes` to `/xtc/release-notes`.
  - Update cross-links across documentation files (e.g., `content/en/xtc/index.md`, `index.mdx`, `v38.md`, `v116.mdx`, `v117.mdx`).
- **Backward Compatibility Redirect**: Add an Apache 301 redirect in `public/.htaccess` rewriting `/xtc/xtc-release-notes/*` to `/xtc/release-notes/*` so external bookmarks, existing links, and web crawlers are smoothly redirected.
- **CI/CD Workflow Update**:
  - In `.github/workflows/deploy-test.yml`, remove `poc-migrate-to-blume` from automated push triggers.
  - Add branch trigger patterns for features and fixes (`feature/**`, `feat/**`, `fix/**`, `fixes/**`) alongside `test/**` and `preview/**` so active development branches automatically deploy to the test environment.
- **Contributor Documentation**: Update `README.md` to document the feature/fix branch staging triggers and remove references to the merged migration branch.
- **Branch Hygiene**: Delete the merged and retired local branch `poc-migrate-to-blume`.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `docs-site`: Standardize XTC release notes URL conventions and add feature/fix branch triggers to staging deployment automation.

## Impact

- **Routing & SEO**: Canonical URL for XTC release notes changes from `/xtc/xtc-release-notes/` to `/xtc/release-notes/`. Permanent 301 redirect guarantees zero link rot.
- **External Applications**: Fixes broken documentation link in the live XTC web application (`xtc.xceptance.com`) footer.
- **CI/CD Pipeline**: Any push to a branch named `feature/*`, `feat/*`, `fix/*`, or `fixes/*` will now trigger the test/staging deployment workflow to `docs-test.xceptance.com`.

