# Proposal

## Why

Currently, documentation deployment via GitHub Actions is configured exclusively for the production site on `main` via `.github/workflows/main.yml`. Contributors and maintainers working on documentation improvements, framework migrations (such as Blume), or feature previews lack a dedicated, safe way to test and inspect the fully rendered static site on the staging domain (`https://docs-test.xceptance.com`) before merging to production.

Adding an isolated test deployment workflow enables automated and on-demand staging deployments for current and future feature branches without risking production downtime or credential contamination.

## What Changes

- Add a dedicated GitHub Actions workflow `.github/workflows/deploy-test.yml` that:
  - Builds and validates static documentation (`npm ci`, `npm run validate`, `npm run build`).
  - Mirrors static output (`dist/`) to the test FTP server via `lftp` using dedicated repository secrets (`FTP_TEST_USERNAME`, `FTP_TEST_PASSWORD`, `FTP_TEST_HOST`).
  - Runs in an isolated concurrency group (`deploy-test-documentation`) so test builds never interfere with production releases.
  - Supports manual triggering on any branch via `workflow_dispatch`.
  - Supports automatic triggers on push for active and future test/preview branch patterns (`poc-migrate-to-blume`, `test/**`, `preview/**`).
- Update `README.md` with contributor and maintainer guidance on triggering staging deployments, branch naming conventions, and required repository secrets.

## Capabilities

### New Capabilities

<!-- None -->

### Modified Capabilities

- `docs-site`: Adds requirements for isolated staging/test deployment automation and staging workflow documentation.

## Impact

- **CI/CD Workflows**: Adds `.github/workflows/deploy-test.yml`. Reuses existing `.github/workflows/scripts/mirrorftp` without modification. Existing `.github/workflows/main.yml` is unaffected.
- **Repository Secrets**: Requires configuring three repository secrets in GitHub (`FTP_TEST_HOST`, `FTP_TEST_USERNAME`, `FTP_TEST_PASSWORD`).
- **Documentation**: Adds staging deployment instructions to `README.md`.

