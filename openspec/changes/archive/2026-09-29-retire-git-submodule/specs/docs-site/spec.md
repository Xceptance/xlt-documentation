## MODIFIED Requirements

### Requirement: Build and Schema Conformance
The system SHALL validate all page frontmatter against Blume strict schema, maintain zero Git submodule dependencies by managing themes and build tooling purely via `package.json`, and generate a pure static production build in `dist/` ready for standard web server hosting (Apache, Nginx, or S3/CDN) with zero Node.js server runtime dependency.

#### Scenario: Strict build execution
- **WHEN** `blume build` is run against the documentation source
- **THEN** the static HTML output, asset bundles, and search index are generated directly in `dist/` without any frontmatter schema errors or dropped pages.

#### Scenario: Static Apache hosting compatibility
- **WHEN** the contents of `dist/` are deployed to an Apache web server
- **THEN** the bundled `.htaccess` provides URL rewriting, gzip/deflate compression, and custom 404 handling without server-side execution.

#### Scenario: Zero Git submodule dependency
- **WHEN** a contributor or CI workflow clones the documentation repository
- **THEN** all site layout components, templates, and build tooling are resolved through `package.json` with no Git submodules (`.gitmodules`) or Go module files (`go.mod`, `go.sum`) required.
