## Why

With the documentation site migrated from Hugo and Docsy to Blume, the legacy Docsy theme Git submodule (`themes/docsy`) is completely obsolete. However, `.gitmodules` remains tracked in the repository root, legacy Go module files (`go.mod`, `go.sum`) persist from Hugo Module management, and `.github/workflows/main.yml` still specifies `submodules: true` and obsolete Hugo build steps. Retiring these artifacts cleans up repository hygiene, eliminates submodule checkout friction (`--recurse-submodules`), and aligns CI/CD with pure npm-based static builds.

## What Changes

- **Remove Git Submodule Configuration**: Remove `.gitmodules` from Git tracking and local configuration.
- **Remove Obsolete Go Modules**: Delete `go.mod` and `go.sum` previously used for Hugo Docsy module resolution.
- **Update CI/CD Workflow**: Update `.github/workflows/main.yml` to remove `submodules: true`, remove Hugo setup/cache/build steps, and replace them with standard Blume commands (`npm ci`, `npm run validate`, `npm run build`).
- **Update Documentation & Comparison**: Ensure contributor guides and PR documentation reflect that cloning requires no submodule flags.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `docs-site`: Update `Build and Schema Conformance` to require zero Git submodule dependencies, ensuring all theme templates, components, and build tools resolve exclusively via `package.json`.

## Impact

- **Repository**: Removes `.gitmodules`, `go.mod`, `go.sum`.
- **CI/CD**: `.github/workflows/main.yml` no longer attempts to fetch Git submodules or run Hugo.
- **Local Development**: Contributors can clone with a standard `git clone` without needing `--recurse-submodules` or Go/Hugo toolchains.
