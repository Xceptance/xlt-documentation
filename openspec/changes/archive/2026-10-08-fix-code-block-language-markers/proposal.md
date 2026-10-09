# Proposal

## Why

Over 70% of code snippets currently tagged with ```` ```bash ```` in the documentation display Java configuration properties (`key = value`) rather than executable terminal commands. In Blume, tagging these snippets as `bash` renders the GNU Bash terminal logo and header badge, misleading readers into believing the snippets are shell commands to execute rather than properties to place into configuration files. Standardizing these code blocks to ```` ```properties ```` (and adding `title="..."` with the configuration file name where context specifies it) provides accurate syntax highlighting, eliminates misleading terminal branding, and clearly conveys file placement to readers.

## What Changes

- Audit all documentation markdown/MDX files across `content/` (`xlt`, `xtc`, `neodymium`) for configuration snippets inappropriately marked with `bash` or `sh`.
- Convert all Java properties configuration blocks to ```` ```properties ```` syntax.
- Add descriptive code block titles (e.g. `title="project.properties"`, `title="default.properties"`, `title="test.properties"`) whenever the surrounding text or section clearly identifies the target configuration file.
- Reserve `bash`, `sh`, and `console` strictly for genuine shell commands, CLI execution examples, and scripts.
- Ensure all updated code fences pass Blume Shiki syntax highlighting and build validation with zero errors.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `docs-site`: Establish code block fence language standards across documentation pages: Java properties configurations must use `properties` (with file titles when the target configuration file is known from context), reserving `bash`/`sh`/`console` exclusively for executable terminal commands and shell scripts.

## Impact

- Content files under `content/en/xlt/`, `content/en/xtc/`, and `content/en/neodymium/` (approximately 31+ files).
- Visual rendering of code blocks in the browser: removes Bash logo on configuration snippets and applies Java properties token highlighting.
- Zero breaking changes to build scripts or site architecture.

