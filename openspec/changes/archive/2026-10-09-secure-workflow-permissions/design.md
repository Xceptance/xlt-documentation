# Design: Secure Workflow Token Permissions

## Context

See `proposal.md` for motivation. The repository maintains two deployment workflows:
1. `.github/workflows/deploy-test.yml`: Deploys staging documentation to `docs-test.xceptance.com`.
2. `.github/workflows/main.yml`: Deploys production documentation to `docs.xceptance.com`.

Both workflows use `actions/checkout@v4` with `fetch-depth: 0` to retrieve commit metadata for Blume's `.GitInfo` and `.Lastmod`, run static builds (`npm ci`, `npm run validate`, `npm run build`), and mirror files to Apache via an external FTP host using `.github/workflows/scripts/mirrorftp`. Neither workflow interacts with GitHub API write endpoints (issues, PRs, releases, packages).

## Goals / Non-Goals

**Goals:**
- Eliminate the GitHub Advanced Security CodeQL alert (`Workflow does not contain permissions`) on `.github/workflows/deploy-test.yml`.
- Apply top-level `permissions: contents: read` to both `deploy-test.yml` and `main.yml` to maintain strict CI configuration parity.
- Ensure `GITHUB_TOKEN` is constrained by the principle of least privilege.

**Non-Goals:**
- Altering the FTP mirroring mechanism (`mirrorftp` script remains untouched).
- Changing build or validation steps.
- Introducing job-level fine-grained permissions for non-existent steps.

## Decisions

### Decision 1: Top-level workflow permissions vs Job-level permissions
- **Choice**: Define `permissions: contents: read` at the top level of each workflow file directly above `jobs:`.
- **Rationale**: Setting permissions at the workflow root establishes a secure default across all current and future jobs in that workflow file. If new jobs are added later, they will not unintentionally inherit repository-wide write defaults.
- **Alternatives Considered**: Defining permissions under `jobs.deploy.permissions`. Rejected because top-level declaration satisfies CodeQL globally for the workflow and provides a cleaner, standardized template.

### Decision 2: Minimal permission scope (`contents: read`)
- **Choice**: Explicitly declare only `contents: read`.
- **Rationale**: `actions/checkout@v4` only requires read access to repository contents. No other step uses the `GITHUB_TOKEN`.
- **Alternatives Considered**: `permissions: read-all`. Rejected because `read-all` grants read access to packages, security events, and other scopes unnecessarily.

## Risks / Trade-offs

- **[Risk: Future step requires GitHub API write access]** → If future maintenance adds a step to tag releases or post PR comments, the workflow will be blocked by default.
  - *Mitigation*: Any future step that genuinely requires elevated permissions can declare job-level overrides or specific scopes (e.g. `pull-requests: write`).

