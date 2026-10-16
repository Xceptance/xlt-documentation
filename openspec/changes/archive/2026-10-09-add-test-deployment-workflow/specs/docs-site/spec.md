# Spec Delta

## ADDED Requirements

### Requirement: Staging and Test Deployment Automation
The CI/CD pipeline SHALL provide a dedicated, isolated deployment workflow that builds static documentation and deploys it to the test hosting environment (`docs-test.xceptance.com`), decoupled from the production deployment pipeline.

#### Scenario: Manual test deployment via workflow dispatch
- **WHEN** a contributor or maintainer manually triggers the test deployment workflow via GitHub Actions `workflow_dispatch` on any branch
- **THEN** the workflow checks out the selected branch, builds and validates the documentation, and mirrors the compiled static output to the test hosting environment using dedicated test credentials.

#### Scenario: Automated test deployment on test branches
- **WHEN** commits are pushed to the current migration branch (`poc-migrate-to-blume`) or any branch matching test patterns (`test/**`, `preview/**`)
- **THEN** the test deployment workflow triggers automatically to update the test hosting environment.

#### Scenario: Production isolation and concurrency control
- **WHEN** the test deployment workflow is executed
- **THEN** it executes under a dedicated concurrency group (`deploy-test-documentation`) and uses isolated secrets (`FTP_TEST_HOST`, `FTP_TEST_USERNAME`, `FTP_TEST_PASSWORD`), ensuring it never accesses production credentials or queues behind production deployment runs.

### Requirement: Staging Deployment Contributor Guidance
The project documentation SHALL document staging deployment procedures in `README.md`, including staging environment URLs, GitHub Actions manual dispatch instructions, branch naming conventions, and required repository secrets.

#### Scenario: Contributor staging guidance availability
- **WHEN** a contributor or maintainer consults `README.md`
- **THEN** it provides clear instructions on how to trigger a test deployment from the GitHub Actions UI, explains the `test/**` and `preview/**` branch patterns, specifies the live staging URL (`https://docs-test.xceptance.com`), and details the required GitHub Actions repository secrets.

