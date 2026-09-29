## Context

The repository has completed its migration to Blume (Astro + Vite). However, legacy artifacts from the Hugo Docsy theme remain in the repository:
- `.gitmodules`: defines `[submodule "themes/docsy"]` at root.
- `go.mod` and `go.sum`: define the Hugo Docsy Go module dependency (`github.com/google/docsy v0.13.0`).
- `.github/workflows/main.yml`: contains `submodules: true` under `actions/checkout@v4`, along with legacy Hugo setup and build steps.

See `proposal.md` for background motivation.

## Goals / Non-Goals

**Goals:**
- Completely remove `.gitmodules` from Git tracking and local configuration.
- Delete obsolete Hugo Go module files (`go.mod`, `go.sum`).
- Modernize `.github/workflows/main.yml` to remove `submodules: true` and replace Hugo build steps with standard Blume validation and build (`npm ci`, `npm run validate`, `npm run build`).
- Verify that `git status`, `blume validate`, and `blume build` succeed cleanly without any submodule dependencies.

**Non-Goals:**
- Modifying documentation content in `content/en/` or site configuration in `blume.config.ts`.
- Configuring production deployment targets (e.g. Apache server rsync credentials) in CI/CD.

## Decisions

### Decision 1: Git Submodule Removal via `git rm`
- **Choice**: Execute `git submodule deinit -f themes/docsy` (if configured in local git config) followed by `git rm -f .gitmodules`.
- **Rationale**: The working directory `themes/docsy` is already absent. Removing `.gitmodules` completely removes the submodule definition from Git tree and index.
- **Alternatives considered**: Leaving `.gitmodules` empty; rejected because an empty `.gitmodules` file is unnecessary and confusing.

### Decision 2: Removal of `go.mod` and `go.sum`
- **Choice**: Delete `go.mod` and `go.sum`.
- **Rationale**: The repository is now 100% Node.js / npm based. Retaining Go module files causes dependency scanners (Dependabot, Snyk) to audit unused Go modules and creates false impressions that a Go toolchain is required.
- **Alternatives considered**: Retaining `go.mod`; rejected as dead configuration.

### Decision 3: Update `.github/workflows/main.yml`
- **Choice**: Remove `submodules: true` from `actions/checkout@v4`. Replace peaceiris Hugo setup and cache actions with `npm ci`, `npm run validate`, and `npm run build`.
- **Rationale**: Keeps GitHub Actions workflow consistent with the actual project build toolchain, catching broken links and build errors in CI.

## Risks / Trade-offs

- **[Risk] Existing local checkouts have stale submodule entries in `.git/config`**  
  → *Mitigation*: Once `.gitmodules` is removed from the branch, Git will not attempt to fetch or update the submodule on `git pull` or `git checkout`. If needed, contributors can run `git submodule deinit -f themes/docsy` to clean local Git config.
- **[Risk] GitHub Actions workflow fails if Hugo is invoked without Go modules**  
  → *Mitigation*: Modernize `.github/workflows/main.yml` in the same commit to run Blume CLI commands.
