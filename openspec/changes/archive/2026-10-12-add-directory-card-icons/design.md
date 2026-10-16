# Design: Directory Card Icons and Sidebar Typography

## Context

See `proposal.md` for motivation.

In Blume, topic chapter landing pages generate Directory Index Cards automatically when `directory: "card"` is configured in `meta.ts`. The layout component (`Directory.astro`) iterates over the folder's children and passes `entry.icon` to each `<Card>`.

By default, Blume resolves a page's icon from `page.meta.sidebar.icon ?? page.meta.icon`. Consequently, assigning `icon: <name>` in a markdown page's frontmatter causes Blume to render the icon in two locations:
1. On the chapter overview directory card (`[data-blume-card]` at 20px).
2. Inside the left sidebar navigation link (`.blume-nav-link` at 14px).

In contrast, sidebar section group headers (such as **Release Notes**) render using `.blume-nav-summary` / `.blume-nav-summary-link`.

Custom CSS placed in the project root's `theme.css` is automatically discovered and inlined by Blume during build with the highest priority over default framework styles.

## Goals / Non-Goals

**Goals:**
- Provide meaningful visual iconography on directory cards across all topic chapters in XLT, XTC, and Neodymium.
- Keep sidebar page navigation links strictly plain text to preserve an uncluttered reading tree.
- Keep the Lucide `megaphone` icon on the **Release Notes** sidebar group header intact.
- Retain Blume's automated `directory: "card"` system without requiring manual `<CardGroup>` component authoring.
- Ensure all assigned icons resolve cleanly from the bundled `@iconify-json/lucide` library with zero build warnings.

**Non-Goals:**
- Modifying release note archives (`xlt/release-notes/`, `xtc/xtc-release-notes/`, `neodymium/release-notes/`).
- Adding icons to chapter-level `meta.ts` files (which would introduce unwanted icons on other sidebar group headers).
- Creating custom SVG assets or third-party icon dependencies.

## Decisions

### Decision 1: Use Frontmatter `icon` on child articles with automated directory cards
- **Choice**: Specify `icon: <lucide-name>` in the YAML frontmatter of all child `.md` and `.mdx` files across topic chapters.
- **Rationale**: Leverages Blume's native frontmatter schema and directory rendering without needing custom Astro components or manual MDX card maintenance.
- **Alternatives Considered**:
  - *Manual `<CardGroup>` in MDX*: Rejected because it requires manual upkeep whenever child pages are added, renamed, or reordered, whereas `directory: "card"` is completely automated.

### Decision 2: Suppress sidebar page link icons via `theme.css`
- **Choice**: Add `.blume-nav-link svg { display: none; }` to `theme.css`.
- **Rationale**: Blume's navigation component uses `.blume-nav-link` exclusively for individual page links. Group summaries use `.blume-nav-summary` and directory cards use `[data-blume-card]`. Suppressing SVGs within `.blume-nav-link` cleanly achieves text-only page links in the sidebar while leaving Release Notes (`.blume-nav-summary`) and chapter cards (`[data-blume-card]`) untouched.
- **Alternatives Considered**:
  - *Ejecting Blume or overriding `NavTree.astro`*: Rejected as unnecessary and detrimental to framework maintainability.

### Decision 3: Standardized semantic icon taxonomy
Icons are categorized by technical domain across all three products:

| Domain | Lucide Icon | Usage Examples |
| :--- | :--- | :--- |
| **Getting Started & Overview** | `rocket`, `book-open`, `compass`, `sparkles` | Quick starts, overviews, demo applications, feature overviews |
| **System & Engine Architecture** | `cpu`, `layers`, `server`, `network`, `boxes` | Architecture, framework internals, engine structure |
| **Testing, Load & Performance** | `gauge`, `flask-conical`, `activity`, `zap`, `play-circle` | Load testing, test suites, test runners, execution |
| **Code, Scripting & Automation** | `terminal`, `code-2`, `file-code`, `braces` | Actions, APIs, test suites, custom scripts |
| **Configuration & Preferences** | `sliders`, `settings-2`, `wrench` | Project settings, properties, browser options |
| **Security, Accounts & Roles** | `shield-check`, `users`, `user-check`, `lock` | User accounts, organizations, permissions, license |
| **Integrations & Cloud** | `plug`, `cloud`, `slack`, `webhook` | Slack, webhooks, REST APIs, cloud machines |
| **Analytics, Metrics & Reports** | `bar-chart-3`, `line-chart`, `pie-chart`, `file-text` | Monitoring metrics, dashboards, test reports, audit log |
| **Reference & Meta** | `library`, `history`, `scale`, `help-circle` | Glossaries, version history, licensing, FAQs |

## Risks / Trade-offs

- **[Risk] Typo in icon names causing build warnings or blank icon slots** → **Mitigation**: Validate all icon names against the bundled Lucide icon dictionary and verify the build with `npm run build`.
- **[Risk] CSS selector mismatch across future Blume versions** → **Mitigation**: `.blume-nav-link` is an explicit framework utility class defined in Blume's core theme entrypoint (`@utility blume-nav-link`). The rule is documented in `theme.css`.

