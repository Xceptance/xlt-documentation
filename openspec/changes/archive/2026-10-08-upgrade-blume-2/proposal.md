# Proposal

## Why

The Xceptance documentation site currently uses Blume version `1.7.0`. Blume has since released `2.2.1`, which contains fixes for documentation layout, updated typography, improved mobile navigation, enhanced Astro 5 integration, and modernized documentation authoring skills.

This change executes the foundational upgrade (Step 1) of upgrading the `blume` package, updating site configuration for Blume 2 compatibility, and syncing the bundled authoring skills in `.agents/skills/`. This provides a stable and supported foundation before evaluating and adopting new optional Blume 2 features (such as directory cards, `<Changelog />`, and expanded MDX utilities) in a subsequent step.

## What Changes

- Upgrade `blume` in `package.json` from `^1.7.0` to `^2.2.1` and update `package-lock.json`.
- Clean up `blume.config.ts` deployment configuration by removing `output: "static"` (in Blume 2, static output is the default when passing a site URL without an adapter; explicit `output: "static"` causes schema warnings).
- Synchronize bundled Blume agent skills in `.agents/skills/` (`blume`, `blume-migrate`, `blume-update-docs`) and add the newly introduced `blume-write-skill` from Blume 2.2.1.
- Update `skills-lock.json` with the updated skill definitions and source revision.
- Verify documentation site validation and production build (`npx blume validate` and `npm run build`).

## Capabilities

### New Capabilities
None.

### Modified Capabilities
None. This change is a tooling, dependency, and developer skill upgrade that preserves all existing site behavioral specifications and outputs (`skip_specs: true`).

## Impact

- **Dependencies**: `blume` updated to `^2.2.1`. The local Node.js environment (`v26.8.1`) satisfies Blume 2.2's `node >= 22.19` engine requirement.
- **Configuration**: Minor clean-up in `blume.config.ts`.
- **Skills**: Updates documentation agent skills under `.agents/skills/` so agents use current Blume 2 APIs and conventions.
- **Build & Output**: Static build generation in `dist/` remains fully compatible with zero user-facing regressions or URL breaks.

