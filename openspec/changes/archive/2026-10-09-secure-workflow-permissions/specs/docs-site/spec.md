# Spec Delta: docs-site

## ADDED Requirements

### Requirement: Least-Privilege Workflow Token Permissions
All automated GitHub Actions CI/CD workflows SHALL explicitly declare least-privilege token permissions, restricting the `GITHUB_TOKEN` to read-only repository contents access (`contents: read`) at the workflow root level to prevent unauthorized repository modifications from build steps or compromised third-party dependencies.

#### Scenario: Test deployment token permission restriction
- **WHEN** the test deployment workflow (`.github/workflows/deploy-test.yml`) is evaluated or executed
- **THEN** it explicitly declares top-level `permissions: contents: read`, satisfying CodeQL / GitHub Advanced Security checks and preventing `GITHUB_TOKEN` write access across all job steps.

#### Scenario: Production deployment token permission restriction
- **WHEN** the production deployment workflow (`.github/workflows/main.yml`) is evaluated or executed
- **THEN** it explicitly declares top-level `permissions: contents: read`, ensuring parity with staging workflows and enforcing least-privilege access across all deployment pipelines.

