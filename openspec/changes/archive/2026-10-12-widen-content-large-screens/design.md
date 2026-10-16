# Design

## Context

See `proposal.md` for motivation.

Blume's layout engine uses Tailwind CSS v4 in `RootLayout.astro`, wrapping the central article prose column in `.prose.mx-auto.max-w-content`. Tailwind maps `max-w-content` to `--container-content: var(--blume-content-width)`.

By default, Blume defines `--blume-content-width: 42rem` (672px) in `:root`. During the build, Blume automatically detects `theme.css` in the project root and inlines it into the `<head>` cascade, overriding default framework tokens without requiring bundler configuration.

## Goals / Non-Goals

**Goals:**
- Provide a responsive increase of the documentation content column to `52rem` (832px) on viewports $\ge 1536\text{px}$ (`2xl` breakpoint).
- Rely strictly on Blume's public `--blume-content-width` design token in a root `theme.css` without modifying internal DOM wrappers, layout flex/grid CSS, or Astro templates.
- Preserve the sticky right-hand Table of Contents and left navigation sidebar across all screen sizes.
- Maintain standard laptop/desktop viewports ($< 1536\text{px}$) unchanged at `42rem` (672px).
- Document token usage, breakpoint rationale, and update safety in `README.md`.

**Non-Goals:**
- Using `mode: wide` in page frontmatter, which strips the Table of Contents.
- Fluid full-width or unconstrained layouts that exceed optimal typographical reading measure (65–90 characters per line).
- Modifying mobile, tablet, or standard desktop layout rules below the `2xl` breakpoint.

## Decisions

### Decision 1: Use `--blume-content-width` in root `theme.css`

We introduce a project-root `theme.css` containing:

```css
@media (min-width: 96rem) {
  :root {
    --blume-content-width: 52rem;
  }
}
```

- **Rationale**:
  - Standard, pure CSS media query (`96rem` / `1536px`), matching Tailwind's `2xl` breakpoint.
  - Automatically discovered and applied by Blume without altering `blume.config.ts`.
  - Zero selector specificity wars and zero framework patch fragility during future Blume updates.
- **Alternatives considered**:
  - *Frontmatter `mode: wide`*: Completely removes the Table of Contents, making it unsuitable for reference documentation.
  - *Targeting `.prose` or `.max-w-content` via custom CSS overrides*: Fragile and prone to breaking when framework layout class names change.
  - *Configuring `blume.config.ts`*: Blume's config schema strictly bounds `theme` to colors and font families, with no width configuration property.

### Decision 2: Content width set to `52rem` (832px) on $\ge 1536\text{px}$

- **Rationale**:
  - `52rem` (832px) offers ~24% more width than the default `42rem` (672px).
  - Provides noticeable space for multi-column comparison tables and Java/XML configuration snippets without causing horizontal scroll bars.
  - Keeps average line length between 75 and 90 characters for standard prose text, preserving readability.
- **Alternatives considered**:
  - *`60rem` (960px) or `100%`*: Lines become too wide for comfortable reading, causing eye strain and tracking fatigue.

## Risks / Trade-offs

- **[Risk] Line length readability on dense prose** → **Mitigation**: `52rem` was specifically chosen because it remains within acceptable typographical measure (75–90 CPL) while providing substantial breathing room for code blocks and tables.
- **[Risk] Sidebar or Table of Contents collision on large screens** → **Mitigation**: Activating strictly at $\ge 96\text{rem}$ ($1536\text{px}$) ensures at least $704\text{px}$ of additional horizontal viewport room is available for the left sidebar ($288\text{px}$) and right TOC ($224\text{px}$).

## Migration Plan

1. Create `theme.css` in project root with the responsive `--blume-content-width` media query.
2. Update `README.md` to document the `--blume-content-width` customization in the Theme & Styling section.
3. Validate static build via `npm run build` and `npm run validate`.
4. Inspect visual layout across viewports ($< 1536\text{px}$ vs $\ge 1536\text{px}$).

