# Tasks

## 1. GitHub Actions Test Workflow Implementation

- [x] 1.1 Create `.github/workflows/deploy-test.yml` with `workflow_dispatch` manual trigger, branch push triggers (`poc-migrate-to-blume`, `test/**`, `preview/**`), concurrency group `deploy-test-documentation`, Node.js 22 setup, static validation, static build, and `lftp` mirroring with `FTP_TEST_*` secrets, and verify YAML syntax validity.
- [x] 1.2 Verify that `.github/workflows/scripts/mirrorftp` is executable and correctly structured to accept `FTP_TEST_USERNAME`, `FTP_TEST_PASSWORD`, and `FTP_TEST_HOST` as positional parameters without modifying the shared script.

## 2. Contributor Guidance and Staging Documentation

- [x] 2.1 Update `README.md` with a dedicated "Staging & Test Deployments" section documenting the target staging URL (`https://docs-test.xceptance.com`), required GitHub repository secrets (`FTP_TEST_HOST`, `FTP_TEST_USERNAME`, `FTP_TEST_PASSWORD`), manual dispatch execution instructions via the GitHub UI, and branch naming conventions, and verify markdown rendering.

## 3. Deployment Validation and Integration Readiness

- [x] 3.1 Validate the documentation build pipeline locally by executing `npm run validate` and `npm run build`, verifying that the static output bundle is generated cleanly in `dist/`.
- [x] 3.2 Verify GitHub Actions configuration readiness and provide step-by-step instructions for adding repository secrets in GitHub and triggering the initial test deployment.

