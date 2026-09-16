## 1. Brand Theming & Asset Setup

- [x] 1.1 Add the official Xceptance SVG wordmark asset to `public/images/xceptance_only.svg` from the official website source and verify the file exists
- [x] 1.2 Update `blume.config.ts` with corporate accent (`#004682`), `Roboto Condensed` display font, `Roboto` body font, and the header logo (`/images/xceptance_only.svg`), and verify configuration validity with `npx blume validate`

## 2. Documentation Hub Layout Overhaul (`pages/index.astro`)

- [x] 2.1 Refactor `pages/index.astro` hero section to feature the Xceptance corporate gradient (`#004682` to `#0f172a`), the primary heading "Documentation Hub", subtitle, and an accessible search modal launchpad button with `data-blume-search-open`, verifying keyboard focus and button markup
- [x] 2.2 Rebuild the 3 core product cards (XTC, XLT, Neodymium) with clean card boundaries, product screenshots, tool feature highlights, and accessible pill-shaped action buttons (`rounded-full`), verifying responsive layout and link destinations
- [x] 2.3 Add a quick-wayfinding section for common pathways (Quickstart, Load Profiles, Release Notes, Community) with clear visual hierarchy, and verify semantic heading order (`h1` -> `h2` -> `h3`)

## 3. WCAG Accessibility & Contrast Verification

- [x] 3.1 Verify color contrast ratios for light mode (`#004682` $\ge 4.5:1$ on light surfaces, white on `#004682` $\ge 7.0:1$), and hero banner text ($\ge 7.0:1$), ensuring WCAG 2.1 AA/AAA compliance
- [x] 3.2 Verify visible keyboard focus rings (`focus-visible:ring-2`) and accessible labels (`aria-label`, `alt` attributes) across all interactive cards, links, and search triggers

## 4. Documentation & Build Validation

- [x] 4.1 Update `README.md` to document the Xceptance corporate theme tokens (colors, typography, logo), the homepage layout architecture in `pages/index.astro`, and the WCAG 2.1 AA/AAA contrast and accessibility standards
- [x] 4.2 Run `npx blume validate --strict` and `npx blume build --isolated` to verify zero broken links, zero schema errors, and clean static HTML production output
