# Proposal

## Why

Readers on large or ultra-wide monitors (viewports $\ge 1536\text{px}$, matching Tailwind's `2xl` breakpoint) currently experience substantial empty margins on both sides of the main documentation reading column. Blume's default content width of `42rem` (672px) is optimized for standard laptop viewports, but causes complex multi-column tables, Java configuration properties, and wide code examples to wrap or scroll unnecessarily on larger screens.

By introducing a standard, responsive content width adjustment targeting `--blume-content-width: 52rem` (832px) on large screens, the documentation makes better use of available screen real estate while preserving the right-hand Table of Contents, left sidebar navigation, and comfortable typographic reading line length.

## What Changes

- Introduce a project-root `theme.css` that leverages Blume's official `--blume-content-width` design token inside a `2xl` media query (`min-width: 96rem` / `1536px`).
- Expand documentation prose container width from `42rem` to `52rem` exclusively for viewports $\ge 1536\text{px}$.
- Keep all viewports $< 1536\text{px}$ on Blume's default `42rem` (672px) content width.
- Preserve the sticky right-hand Table of Contents and sticky left sidebar navigation across all screen sizes.
- Document the `--blume-content-width` token configuration, viewport breakpoint rationale, and framework update-safety in `README.md`.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `docs-site`: Modifies Brand Theme and Styling requirements to specify responsive documentation content width on large displays ($\ge 1536\text{px}$) via `--blume-content-width` without altering sidebar or Table of Contents presence.

## Impact

- **Files Affected**:
  - `theme.css` (new root stylesheet auto-discovered and inlined by Blume)
  - `README.md` (documents the theming token and responsive width behavior)
- **Dependencies & Frameworks**: Zero new dependencies. Uses Blume's native token architecture (`--blume-content-width`) mapped through Tailwind v4 `--container-content`.
- **Breaking Changes**: None. Viewports below 1536px behave identically to the baseline. Navigation, TOC, and page layouts remain unchanged.

