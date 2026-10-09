# Design

## Context

XLT's release notes section (`content/en/xlt/release-notes/index.mdx`) implements a structured 3-tier "Release Hub" using Blume native MDX components (`Card`, `CardGroup`, `Accordion`, and `AccordionItem`). In contrast, XTC (`content/en/xtc/xtc-release-notes/`) and Neodymium (`content/en/neodymium/release-notes/`) currently have empty `index.md` files configured with `sidebar.hidden: true`. Furthermore, XTC's section title in `meta.ts` contains a raw Unicode emoji (`Release Notes 📢`) and lacks an icon, while Neodymium's `meta.ts` lacks the standard megaphone icon.

See `proposal.md` for background and motivation.

## Goals / Non-Goals

**Goals:**
- Upgrade XTC and Neodymium release notes landing pages to MDX (`index.mdx`) implementing the standardized 3-tier Release Hub architecture.
- Feature latest releases in prominent Tier 1 Spotlight cards (XTC v117, Neodymium 5.3.0).
- Feature recent releases in responsive 2-column Tier 2 Card Groups.
- Group earlier releases in Tier 3 collapsible Accordions (6 era brackets for XTC, 5 series brackets for Neodymium).
- Standardize section metadata in `meta.ts`: clean title `"Release Notes"`, `icon: "megaphone"`, and `directory: "none"`.
- Expose landing pages as `Overview` at the top of their sidebar groups via `sidebar.label: Overview`.
- Preserve full sidebar visibility for all 102 XTC releases and 10 Neodymium releases.
- Maintain existing URL paths without breaking external bookmarks (`/xtc/xtc-release-notes/`).

**Non-Goals:**
- Merging release notes into a single global `/changelog` route (release notes remain strictly partitioned by product).
- Hiding older releases from the sidebar navigation tree (the user explicitly opted to retain full sidebar visibility).
- Renaming the directory `content/en/xtc/xtc-release-notes/`.

## Decisions

### Decision 1: Use Blume MDX Primitives instead of Global Changelog
- **Choice**: Implement custom `index.mdx` landing pages using `<Card>`, `<CardGroup>`, `<Accordion>`, and `<AccordionItem>` rather than Blume's built-in `<Changelog />` component.
- **Rationale**: Blume's `<Changelog />` component aggregates all documents marked `type: changelog` site-wide into a single timeline without supporting per-product filtering. XLT, XTC, and Neodymium have distinct versioning tempos, lifecycles, and audiences.
- **Alternatives Considered**: A single `/changelog` page was rejected because it would interleave 158 releases across 3 separate products into one global chronological feed.

### Decision 2: 6-Era Historical Archive Partitioning for XTC
- **Choice**: Structure XTC's 102 releases into 6 chronological platform eras:
  1. `v110–v117 Series (2026)` (Templates, AI analysis, Maven plugin, Code Archives)
  2. `v100–v109 Series (2024–2025)` (Platform modernization, private machines, notifications)
  3. `v90–v99 Series (2022–2024)` (Test execution and cloud infrastructure upgrades)
  4. `v70–v89 Series (2020–2022)` (Reporting engine, UI refresh, and cloud scalability)
  5. `v40–v69 Series (2018–2020)` (Real-time monitoring, project management, integrations)
  6. `v14–v39 Series (2015–2018)` (Initial platform releases and foundation services)
- **Rationale**: Accordion items are collapsed by default, ensuring fast page load and concise layout while allowing users to expand and browse specific eras without excessive scrolling.
- **Alternatives Considered**: Accordions for every minor version (too many accordions) or a single giant archive list (overwhelming 102-item list).

### Decision 3: Neodymium 5-Series Archive Partitioning
- **Choice**: Structure Neodymium's releases into 5 major series brackets:
  1. `Neodymium 5.x Series (Versions 5.0.0 – 5.3.0)`
  2. `Neodymium 4.x Series (Versions 4.0.0 – 4.1.5)`
  3. `Neodymium 3.x Series (Versions 3.0.0 – 3.X.X)`
  4. `Neodymium 2.x Series (Versions 2.0.0 – 2.X.X)`
  5. `Neodymium 1.x & 0.x Series (Early framework versions)`
- **Rationale**: Maps directly to major architectural shifts (e.g., Java 11/JUnit 5 baseline in 5.x, security upgrades in 4.x).

### Decision 4: Sidebar Navigation and Route Preservation
- **Choice**:
  - Keep `content/en/xtc/xtc-release-notes/` as the route.
  - Do not set `sidebar.hidden: true` on any child release files.
  - Set `sidebar.label: Overview` on both `index.mdx` files.
- **Rationale**: Preserves all existing external bookmarks and maintains direct sidebar accessibility for users who prefer expanding the sidebar tree to navigate to a specific release.

### Decision 5: Directory Index Card Suppression
- **Choice**: Keep `directory: "none"` in both `content/en/xtc/xtc-release-notes/meta.ts` and `content/en/neodymium/release-notes/meta.ts`.
- **Rationale**: Prevents Blume from automatically appending unpaginated Directory Index Cards below the custom MDX content.

## Risks / Trade-offs

- **[Risk] Long sidebar navigation when XTC Release Notes is expanded**
  → *Mitigation*: Blume collapses inactive sidebar subtrees by default. The Release Hub landing page provides the primary visual wayfinding, while the sidebar remains available for deep linking.
- **[Risk] Broken relative links or component syntax in MDX**
  → *Mitigation*: Mirror the syntax proven in `content/en/xlt/release-notes/index.mdx`. Verify build integrity with `npm run validate`.

## Migration Plan

1. Remove `content/en/xtc/xtc-release-notes/index.md` and create `content/en/xtc/xtc-release-notes/index.mdx`.
2. Update `content/en/xtc/xtc-release-notes/meta.ts` with clean title and `icon: "megaphone"`.
3. Remove `content/en/neodymium/release-notes/index.md` and create `content/en/neodymium/release-notes/index.mdx`.
4. Update `content/en/neodymium/release-notes/meta.ts` with `icon: "megaphone"`.
5. Run `npm run validate` to confirm zero schema, link, or build errors.

