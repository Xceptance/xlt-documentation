# Design: Release Notes Hub & Navigation Icon

## Context

The XLT documentation contains 44 release note documents organized chronologically under `content/en/xlt/release-notes/`. The landing page `index.md` previously contained only frontmatter with an emoji in the title (`title: Release Notes 📢`) and zero body lines, with `sidebar.hidden: true`. Consequently, navigating to `/xlt/release-notes/` presented a barren page.

See `proposal.md` for the motivation and high-level requirements.

## Goals / Non-Goals

**Goals:**
- Replace `content/en/xlt/release-notes/index.md` with an MDX document (`index.mdx`) using Blume zero-import components (`<CardGroup>`, `<Card>`, `<Badge>`, `<Accordion>`).
- Establish a clear hierarchical layout:
  1. Header & Lead: Clean title "Release Notes" and introductory summary.
  2. Spotlight: Prominent featured card for the current major release series (**XLT 10.0.x**).
  3. Recent Release Series: Responsive 2-column card grid for active/recent series (XLT 9.2.x, 9.1.x, 9.0.x, and 8.x).
  4. Collapsible Archive: Accordions grouping legacy versions (7.x, 6.x, 5.x, 4.x, 3.x) so all 44 documents are accessible without infinite scrolling.
- Clean the navigation label and group title: remove Unicode emoji `📢` and configure the Lucide SVG icon `megaphone` via `content/en/xlt/release-notes/meta.ts`.
- Expose the landing page as "Overview" in the sidebar instead of hiding it.

**Non-Goals:**
- Modifying individual historical release note files (`v10_0_x.mdx`, `v9_2_x.md`, etc.).
- Adding external UI dependencies or custom React components outside Blume's built-in component set.
- Changing URL routing or permalinks.

## Architecture & Layout

```
+-----------------------------------------------------------+
| Release Notes (Overview)                                  |
| "Find the most important fixes, improvements..."          |
+-----------------------------------------------------------+
| [Featured Spotlight: XLT 10.0.x]                          |
| - Virtual Threads (Java 21)       - Overview Charts       |
| - Moving Average Trends           - Private Cloud/Machine |
| [View 10.0.x Release Notes ->]                            |
+-----------------------------------------------------------+
| Recent Releases                                           |
| +-----------------------------+-------------------------+ |
| | XLT 9.2.x                   | XLT 9.1.x               | |
| | Load testing improvements   | Framework updates       | |
| +-----------------------------+-------------------------+ |
| | XLT 9.0.x                   | XLT 8.x Series          | |
| | Major architecture refresh  | 8.0 - 8.6 releases      | |
| +-----------------------------+-------------------------+ |
+-----------------------------------------------------------+
| Historical Archive                                        |
| [>] XLT 7.x Series (7.0 - 7.3)                            |
| [>] XLT 6.x Series (6.0 - 6.2)                            |
| [>] XLT 5.x Series (5.0 - 5.7)                            |
| [>] XLT 4.x Series (4.0 - 4.13)                           |
| [>] XLT 3.x Series (3.2 - 3.3)                            |
+-----------------------------------------------------------+
```

## Decisions

### Decision 1: Use `index.mdx` with Native Blume MDX Components
- **Rationale**: Blume includes zero-import components (`<CardGroup>`, `<Card>`, `<Badge>`, `<Accordion>`) when rendering `.mdx` files. Switching `index.md` to `index.mdx` allows declarative, responsive cards and disclosure elements without importing custom Astro or React components.
- **Alternatives considered**:
  - *Keep `index.md` with standard Markdown bullet lists*: Functional, but lacks visual hierarchy and modern polish; leaves the page looking like a plain index list.
  - *Custom `.astro` page*: Unnecessary complexity; Blume's built-in MDX components fully satisfy the design requirements and maintain consistent docs layout and table of contents.

### Decision 2: Configure Group Icon and Title in `meta.ts`
- **Rationale**: Blume resolves folder navigation metadata through `meta.ts`. Placing `meta.ts` inside `content/en/xlt/release-notes/` with `title: "Release Notes"` and `icon: "megaphone"` cleanly sets the sidebar group title and Lucide icon. In `index.mdx`, setting `sidebar.label: "Overview"` labels the landing page link inside the group, matching the established pattern in `xlt/about` and `xlt/test-suites`.
- **Alternatives considered**:
  - *Configure icon in `content/en/xlt/meta.ts`*: Only orders sibling folders; child group titles and icons are best defined within their own folder `meta.ts`.
  - *Keep raw emoji in frontmatter title*: Emojis render inconsistently across platforms and clash with Lucide SVG styling used elsewhere in Blume.

### Decision 3: Three-Tier Hierarchical Grouping (Spotlight, Recent, Archive)
- **Rationale**: With 44 individual release notes spanning XLT 3.x through 10.x, listing all versions flatly would create overwhelming visual noise. The 3-tier structure directly mirrors user intent:
  - 80%+ of visitors seek the latest release (XLT 10.0.x) or recent active versions (9.x, 8.x).
  - Historical reference users (7.x down to 3.x) can expand accordions on demand.
- **Alternatives considered**:
  - *Paginated changelog timeline*: XLT release notes are comprehensive articles rather than micro-commits; cards and accordions linking to the actual documents preserve existing deep links and content structure.

## Risks / Trade-offs

- **[Risk]** Broken internal links in cards/accordions if filenames or slugs differ.
  → **Mitigation**: Verify all 44 relative links against actual filenames (`v10_0_x`, `v9_2_x`, etc.) and run `npm run validate` to ensure zero broken links.
- **[Risk]** Sidebar duplicate link if `sidebar.label` is omitted.
  → **Mitigation**: Set `sidebar.label: "Overview"` in `index.mdx` frontmatter, conforming to `docs-site/spec.md` scenario "Meaningful section introduction labeling".

## Migration Plan

1. Create `content/en/xlt/release-notes/meta.ts` configuring `title: "Release Notes"` and `icon: "megaphone"`.
2. Remove `content/en/xlt/release-notes/index.md` and create `content/en/xlt/release-notes/index.mdx`.
3. Validate content syntax, component rendering, and link integrity using `npm run validate` and `npm run build`.
4. Rollback: If needed, restore `index.md` from git.

