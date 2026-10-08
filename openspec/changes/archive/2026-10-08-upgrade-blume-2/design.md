# Design

## Context

The documentation site is built with Blume and currently targets version `1.7.0` with Node.js `v26.8.1`. Blume 2.x introduces Astro 5 under the hood, modernized navigation styling, tighter frontmatter validation, and updated documentation skills for agentic workflows.

See [proposal.md](file:///Users/rbaumgarten/checkouts/xlt-documentation/openspec/changes/upgrade-blume-2/proposal.md) for background and motivation.

## Goals / Non-Goals

**Goals:**
- Upgrade `blume` package dependency to `^2.2.1` in `package.json` and lockfile.
- Align `blume.config.ts` deployment configuration with Blume 2 schema by dropping deprecated `output: "static"`.
- Synchronize `.agents/skills/` (`blume`, `blume-migrate`, `blume-update-docs`, plus new `blume-write-skill`) from `node_modules/blume/skills/` and record the update in `skills-lock.json`.
- Ensure `npx blume validate` and `npm run build` pass cleanly with zero errors or breaking output changes.

**Non-Goals:**
- Exploring or adopting new optional Blume 2 UI features (e.g., directory card views, changelog component, tabbed search integrations). This will be evaluated separately in Step 2.
- Modifying documentation content, structure, or brand styling (`xceptance.css`).

## Decisions

### Decision 1: Direct bump to Blume 2.2.1
- **Choice**: Bump directly from `1.7.0` to `^2.2.1`.
- **Rationale**: Blume 2.2.1 includes cumulative fixes across the 2.x release train, including table of contents hierarchy fixes, Lucide icon updates, and Astro 5 performance improvements.
- **Alternatives considered**: Incremental step to 2.0 first. Rejected because 2.2.1 is backward-compatible with 2.0 and fixes known early-2.0 edge cases.

### Decision 2: Remove `output: "static"` from `blume.config.ts`
- **Choice**: Update `deployment: { site: "...", output: "static" }` to `deployment: { site: "..." }`.
- **Rationale**: In Blume 2, static output is the default mode when specifying a site URL without a server adapter (e.g. Cloudflare, Vercel, Netlify). Keeping `output: "static"` causes schema validation warnings in Blume 2.
- **Alternatives considered**: Keep `output: "static"`. Rejected as it produces schema warnings during config loading.

### Decision 3: Sync bundled agent skills from `node_modules/blume/skills/`
- **Choice**: Copy the updated skill folders (`blume`, `blume-migrate`, `blume-update-docs`, and new `blume-write-skill`) from `node_modules/blume/skills/` into `.agents/skills/` and update `skills-lock.json`.
- **Rationale**: Blume packages its authoritative skills directly inside the npm package distribution. Sourcing directly from the installed package guarantees exact version parity with the installed runtime.
- **Alternatives considered**: Downloading manually from GitHub. Rejected because the npm package already contains the exact version matching `package.json`.

## Risks / Trade-offs

- **[Risk]** `npm install` requires registry access to download Blume 2.2.1 and its dependencies.
  - **Mitigation**: Run `npm install` with standard network access if sandboxed cache misses.
- **[Risk]** Frontmatter schema validation might be stricter in Blume 2.
  - **Mitigation**: Run `npx blume validate` after dependency installation to verify that all existing documentation pages conform to Blume 2 schemas.

