# Proposal: Secure Workflow Token Permissions

## Why

GitHub Advanced Security (CodeQL) flagged `.github/workflows/deploy-test.yml` with the security finding: `Actions job or workflow does not contain permissions`. 

When a GitHub Actions workflow omits an explicit `permissions:` block, GitHub falls back to repository or organization defaults, which often grant broad read/write permissions to the ephemeral `GITHUB_TOKEN`. Because our documentation workflows (`main.yml` and `deploy-test.yml`) only require reading repository contents to build the static site, running without explicit least-privilege permissions unnecessarily increases the attack surface if a compromised third-party build dependency is introduced. Adding explicit least-privilege token permissions resolves the security finding and hardens both deployment pipelines against unauthorized repository modifications.

## What Changes

- Add top-level `permissions: contents: read` to `.github/workflows/deploy-test.yml`.
- Add top-level `permissions: contents: read` to `.github/workflows/main.yml` to maintain parity and proactively prevent CodeQL warnings in production deployments.
- Update the `docs-site` specification to require explicit least-privilege `GITHUB_TOKEN` permissions on all CI/CD deployment workflows.

## Capabilities

### Modified Capabilities

- `docs-site`: Add requirement for least-privilege CI/CD workflow token permissions ensuring all automated workflows explicitly declare minimal `GITHUB_TOKEN` scopes.

## Impact

- **Affected files**: `.github/workflows/deploy-test.yml`, `.github/workflows/main.yml`, and `openspec/specs/docs-site/spec.md`.
- **APIs & Dependencies**: No dependency changes. `GITHUB_TOKEN` is constrained to read-only access for repository contents; deployment continues to authenticate externally to FTP via existing repository secrets.
- **Breaking changes**: None. Workflows perform checkout and static build identical to before.

