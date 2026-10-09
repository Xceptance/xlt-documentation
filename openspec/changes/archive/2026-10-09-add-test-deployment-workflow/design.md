# Design

## Context

The repository currently deploys documentation to production (`docs.xceptance.com`) using `.github/workflows/main.yml`, which triggers on pushes to `main` and runs `.github/workflows/scripts/mirrorftp` using repository secrets (`FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`).

To enable safe testing of pre-production changes—including the current Blume migration branch (`poc-migrate-to-blume`) and future feature/test branches—we need an equivalent, isolated deployment pipeline targeting `https://docs-test.xceptance.com`.

See `proposal.md` for motivation and background.

## Goals / Non-Goals

**Goals:**
- Provide a dedicated GitHub Actions workflow `.github/workflows/deploy-test.yml` targeting the staging environment.
- Reuse existing build steps (`npm ci`, `npm run validate`, `npm run build`) and FTP mirroring script (`.github/workflows/scripts/mirrorftp`) without duplication or modifications.
- Enable manual triggering (`workflow_dispatch`) on any branch in the repository via the GitHub Actions UI.
- Support automatic test deployment on push for active branch `poc-migrate-to-blume` and wildcard patterns `test/**` and `preview/**`.
- Isolate concurrency and credentials from production (`deploy-test-documentation` concurrency group, `FTP_TEST_*` secrets).
- Document staging deployment procedures and repository secret prerequisites in `README.md`.

**Non-Goals:**
- Modifying production `main.yml` or production deployment credentials.
- Provisioning dynamic per-PR ephemeral preview environments.
- Storing plaintext credentials in the repository or git history.

## Decisions

### Decision 1: Dedicated workflow file (`deploy-test.yml`) vs unified workflow with conditionals
- **Choice:** Create a dedicated `.github/workflows/deploy-test.yml`.
- **Rationale:** A separate workflow file provides absolute safety against accidental production overwrite, distinct status reporting and execution history in the GitHub Actions tab, and simple branch filtering.
- **Alternatives Considered:** Unified workflow with GitHub Environments. Rejected because GitHub Environments with secret scoping requires specific repo configurations and can be confusing to manage, whereas prefixed repository secrets (`FTP_TEST_*`) work reliably across all GitHub account tiers.

### Decision 2: Reuse existing `mirrorftp` script verbatim
- **Choice:** Pass `FTP_TEST_USERNAME`, `FTP_TEST_PASSWORD`, and `FTP_TEST_HOST` as positional arguments (`$1`, `$2`, `$3`) to `.github/workflows/scripts/mirrorftp`.
- **Rationale:** The existing `mirrorftp` script is parameter-driven and does not hardcode hosts or credentials. Reusing it ensures parity with production while avoiding script duplication.
- **Alternatives Considered:** Writing a dedicated `mirrorftp-test` script. Rejected as redundant maintenance overhead.

### Decision 3: Concurrency group isolation
- **Choice:** Define `concurrency: group: deploy-test-documentation, cancel-in-progress: false`.
- **Rationale:** FTP mirror operations must not run concurrently against the same test server (which would cause file write collisions and partial uploads). Setting a dedicated concurrency group queues test runs sequentially while ensuring test deploys never block or queue behind production runs.
- **Alternatives Considered:** Reusing `deploy-documentation` group. Rejected because test builds should never delay production releases.

### Decision 4: Branch trigger conventions
- **Choice:** Explicitly listen to `poc-migrate-to-blume`, `test/**`, and `preview/**` on `push`, and expose `workflow_dispatch` with an optional `reason` text input.
- **Rationale:** Ensures immediate out-of-the-box auto-deployment for the current migration branch, provides clear naming conventions for future contributors, and allows running manual deployments against any arbitrary branch directly from the GitHub UI.

## Risks / Trade-offs

- **[Missing Secrets]**: If `FTP_TEST_*` secrets are not configured in GitHub repository settings, the workflow fails at the mirror step.
  - *Mitigation:* Document the exact secret names and setup steps prominently in `README.md`.
- **[Overwriting Test Server Content]**: `mirrorftp` uses `mirror -e -R` which deletes remote files not in `dist/`.
  - *Mitigation:* Verified that the FTP test user lands directly in the webroot of `docs-test.xceptance.com`. Concurrency locking ensures sequential uploads.
- **[SSL/TLS Certificate Mismatch on FTP]**: `lftp` requires strict TLS by default (`ssl-force true`).
  - *Mitigation:* Confirmed TLS connectivity via `curl --ssl`. If self-signed certificates are ever used in the future, `set ssl:verify-certificate false` can be added if needed.

