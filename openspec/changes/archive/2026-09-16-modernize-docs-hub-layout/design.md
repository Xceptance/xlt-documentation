## Context

The documentation hub currently renders a basic 3-column card layout on `pages/index.astro` using legacy crimson styling (`#a00000`) and standard typography (`Outfit` / `Inter`). The new corporate website (`xceptance.com`) establishes a refined visual identity:
- **Primary Brand Blue**: `#004682` (buttons, icons, card titles, links)
- **Hover / Deep Blue**: `#003868`
- **Signature Brand Red**: `#dc3545` / `#c8102e` (the "X" in Xceptance, accent badges, highlight alerts)
- **Dark Slate Navy**: `#0f172a` (hero gradient endpoint, dark sections) and `#1e293b`
- **Body Text**: `#334155` / `#475569`
- **Light Surfaces & Borders**: `#f8fafc`, `#f1f5f9`, `#e2e8f0`, and `rgba(0, 70, 130, 0.1)`

See `proposal.md` for background and motivation. This design document establishes the technical architecture to implement this visual upgrade cleanly through Blume's standard configuration, Astro component patterns, and WCAG 2.1 AA/AAA compliance.

## Goals / Non-Goals

**Goals:**
- Update site-wide brand styling in `blume.config.ts` to Xceptance Corporate Blue (`#004682`), `Roboto Condensed` display font, `Roboto` body font, and the official header SVG logo.
- Re-architect `pages/index.astro` to feature a corporate gradient hero banner (`#004682` to `#0f172a`), a native search modal trigger, three elevated product cards (XTC, XLT, Neodymium) with pill action buttons, and quick wayfinding links.
- Strictly adhere to WCAG 2.1 / 2.2 AA (and AAA for text contrast) across both light and dark themes.
- Keep the implementation standard: zero custom framework hacks, zero external client JS, relying on Blume's built-in `<PageLayout>`, `<Icon>`, theme tokens, and Tailwind v4 compilation.
- Document the theme architecture, layout components, and accessibility standards in `README.md`.

**Non-Goals:**
- Building custom search modal implementations (Blume's built-in dialog and Ask AI are used directly).
- Modifying product documentation pages in `content/en/`.
- Ejecting the documentation site from the Blume engine.

## Decisions

### Decision 1: Authentic Xceptance Corporate Blue Accent (`accent: "#004682"`)
- **Choice**: Configure `theme.accent: "#004682"` in `blume.config.ts`.
- **Rationale**:
  - Matches the exact primary color used on `https://www.xceptance.com/en/` for `.btn-primary`, active indicators, and brand highlights.
  - In Blume, accent elements with foreground text automatically use `--blume-accent-foreground: oklch(1 0 0)` (pure white `#ffffff`).
  - White text on `#004682` provides a contrast ratio of **9.57:1**, easily exceeding the strictest WCAG AAA standard (7.0:1).
  - Keeps the configuration idiomatic to Blume as a single clean token string (matching the previous `accent: "#a00000"` pattern), avoiding synthetic non-brand colors.
- **Alternatives Considered**:
  - Artificial dark mode pastel blue (`#66a3e0`): Rejected because it does not exist in Xceptance's design system and dilutes brand recognition.
  - Red accent (`#dc3545`): Retained as an optional secondary `action` color if desired, but blue remains the primary corporate brand identity.

### Decision 2: Build-Time Self-Hosted Typography
- **Choice**: Configure `theme.fonts: { display: { name: "Roboto Condensed", weights: [500, 700] }, body: "roboto", mono: "ubuntu-mono" }`.
- **Rationale**: Blume automatically downloads and self-hosts Google Fonts at build time, generating `@font-face` definitions and fallback metrics. This prevents third-party tracking, eliminates external DNS/network bottlenecks, and avoids layout shifts. Matches the typography of `xceptance.com`.
- **Alternatives Considered**:
  - External Google Fonts `<link>` tag: Adds external network dependency and potential layout shifts.
  - Staying with `Outfit`/`Inter`: Fails to match the new corporate website's technical aesthetic.

### Decision 3: Hero Search Bar Launchpad
- **Choice**: The hero search bar is rendered as an accessible `<button>` element with `data-blume-search-open` and click delegation to Blume's search modal.
- **Rationale**: Developers visiting docs hubs prioritize instant search. Leveraging `data-blume-search-open` triggers Blume's native modal (complete with Orama indexing, Ask AI, keyboard shortcuts `⌘K`/`Ctrl+K`, and filters) without duplicating search logic.
- **Alternatives Considered**:
  - Custom inline search field: Would require duplicating Orama index loading and Ask AI logic.
  - Relying solely on the top navbar search: Less visible for first-time or mobile visitors.

### Decision 4: Parallel 3-Card Wayfinding Grid with Pill Actions
- **Choice**: Display XTC, XLT, and Neodymium in a 3-column responsive card grid (`grid grid-cols-1 md:grid-cols-3`) with elevated borders, product screenshots, tool value summaries, and pill buttons (`rounded-full`).
- **Rationale**: Humans scan docs hubs horizontally to identify their product in $< 1$ second. Pill buttons (`rounded-full`) match the signature button style on `xceptance.com`.
- **Alternatives Considered**:
  - Alternating split layout (screenshot left/right): Creates excessive vertical scrolling and visual zig-zag fatigue for developers looking for quick answers.

### Decision 5: Accessible Keyboard Navigation and Semantic Structure
- **Choice**:
  - Heading hierarchy: `<h1>Documentation Hub</h1>` $\rightarrow$ `<h2>Core Testing Tools</h2>` & `<h2>Quick Wayfinding</h2>` $\rightarrow$ `<h3>[Tool Name]</h3>`.
  - Visible focus rings: `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent` on all interactive links.
  - Meaningful `aria-label` attributes on buttons (e.g., `aria-label="Read XTC manual"`) and descriptive `alt` text on images.
- **Rationale**: Satisfies WCAG 2.1 Criteria 1.3.1 (Info and Relationships), 2.4.7 (Focus Visible), and 4.1.2 (Name, Role, Value).

## Risks / Trade-offs

- **[Risk]** Large images in cards could slow down homepage rendering.
  $\rightarrow$ **Mitigation**: Use existing optimized screenshots (`/images/xtc/xtc-loadtest-dashboard.png`, `/images/home/xlt-report-transactions.png`, `/images/home/test-automation-allure-suites.png`) with explicit `loading="lazy"` and fixed aspect ratios.
- **[Risk]** Brand logo SVG could clash with dark mode header.
  $\rightarrow$ **Mitigation**: `/images/xceptance_only.svg` uses clean vector paths that render clearly across both light and dark header bars.
- **[Risk]** Custom homepage styles breaking on future Blume updates.
  $\rightarrow$ **Mitigation**: Use only Blume standard layout components (`PageLayout`), Blume theme tokens (`bg-background`, `text-foreground`, `bg-accent`, `border-border`), and standard Tailwind v4 utility classes.
