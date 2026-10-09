## Why

The current documentation site uses legacy colors (dark crimson `#a00000`) and a rudimentary homepage layout that does not reflect Xceptance's new modern corporate identity (showcased at `xceptance.com`), nor does it leverage modern documentation wayfinding best practices. Aligning the documentation hub with the authentic brand styling—using deep corporate blue (`#004682`), the official Xceptance wordmark with red accent (`#c8102e` / `#dc3545`), modern technical typography (`Roboto Condensed` and `Roboto`), and a high-impact wayfinding hero with instant search—creates a unified, visually engaging experience while maintaining full WCAG 2.1 AA/AAA accessibility compliance and strictly adhering to Blume standard conventions.

## What Changes

- **Brand Theme & Styling**:
  - Update `blume.config.ts` theme accent to the authentic Xceptance Corporate Blue (`#004682`), optionally paired with the signature Xceptance Red (`#dc3545`) for actions.
  - Update typography in `blume.config.ts` to `Roboto Condensed` (display headings) and `Roboto` (body copy), self-hosted by Blume.
  - Configure the header brand logo using the official `/images/xceptance_only.svg` wordmark with "Docs" label.
- **Documentation Hub Landing Page (`pages/index.astro`)**:
  - Modernize the landing page while retaining the primary title `"Documentation Hub"`.
  - Add a high-contrast hero section styled with Xceptance's signature gradient (`#004682` to `#0f172a`) and subtle ambient radial glow.
  - Integrate a prominent search / Ask AI launch bar in the hero that triggers Blume's native modal search dialog (`data-blume-search-open`).
  - Upgrade the 3 core product cards (XTC, XLT, Neodymium) with clean border styling, elevated hover states, tool feature highlights, and accessible pill-shaped action buttons (`rounded-full`).
  - Add a quick-wayfinding section for popular paths (e.g., Quick Start, Load Profiles, Release Notes).
- **WCAG 2.1 AA / AAA Accessibility Compliance**:
  - Ensure all text and UI elements meet or exceed WCAG 2.1 AA contrast requirements (normal text $\ge 4.5:1$, large text $\ge 3:1$, graphical objects $\ge 3:1$; brand blue `#004682` achieves 9.57:1 on white, exceeding AAA, and hero text on dark gradient exceeds 12:1).
  - Explicit keyboard `:focus-visible` rings on all interactive links and buttons.
  - Strict semantic heading hierarchy (`h1` Documentation Hub -> `h2` sections -> `h3` tool cards).
  - Descriptive `aria-label`s and informative `alt` text for all images and interactive triggers.
- **Documentation**:
  - Update `README.md` with documentation on the theme configuration, corporate brand tokens, homepage structure, and WCAG accessibility standards.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `docs-site`: Update requirements for brand theming (corporate blue `#004682`, `Roboto Condensed`/`Roboto` typography, official SVG logo), modernize the Documentation Hub landing page with hero search and pill actions, establish WCAG 2.1 AA/AAA accessibility conformance, and document the layout and theming in `README.md`.

## Impact

- `blume.config.ts`: Theme accent, typography, and logo configuration updated.
- `pages/index.astro`: Overhauled hero, tool cards, and wayfinding layout using Blume standard components and theme tokens.
- `README.md`: Document layout design decisions, theme tokens, and accessibility standards.
- Visual appearance of docs hub and all documentation pages across light and dark modes.
