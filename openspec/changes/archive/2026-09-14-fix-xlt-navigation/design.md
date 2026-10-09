## Context

See `proposal.md` - Why.

Blume builds the navigation tree from the content directory hierarchy (`content/en/xlt/`). For folder groups, Blume derives the group's route path from the routes of its contained pages. In `content/en/xlt/about/000-demo/index.mdx`, a legacy Hugo demo frontmatter attribute `slug: this is just an overwritten url` caused Blume to assign the root route `/this is just an overwritten url` to the entire parent group `Xlt`. Because the header tab is configured as `path: "/xlt"`, Blume's tab scoping function `sectionChildren(sidebar, "/xlt")` failed to match the group, resulting in an empty sidebar and fallback to top-level site links.

## Goals / Non-Goals

**Goals:**
- Eliminate the rogue slug from `content/en/xlt/about/000-demo/index.mdx`, allowing the file and parent `xlt` group to resolve cleanly to `/xlt`.
- Configure `content/en/xlt/meta.ts` using Blume's `defineMeta` to enforce the canonical XLT chapter ordering (`about`, `quick-start`, `manual`, `advanced`, `test-suites`, `release-notes`, `how-tos`, `knowledgebase`).
- Configure chapter `meta.ts` files to restore legacy section titles (`manual` $\rightarrow$ "Base Manual", `how-tos` $\rightarrow$ "How-Tos", `knowledgebase` $\rightarrow$ "Knowledge Base").
- Verify that `blume validate --strict` and `blume build --strict` succeed and that `/xlt` renders the complete navigation tree.

**Non-Goals:**
- Mutating folder names with numeric prefixes (`01-about`, etc.), which would break existing relative links and git history.
- Rewriting or modifying markdown body content across XLT chapters.
- Changing navigation structure for XTC or Neodymium.

## Decisions

### Decision 1: Remove `slug: this is just an overwritten url`
- **Choice**: Remove the frontmatter `slug` line from `content/en/xlt/about/000-demo/index.mdx`.
- **Rationale**: The slug was a Hugo demo demonstrating Docsy frontmatter. In Blume, `slug` acts as an absolute route override from root. Removing it lets the file resolve naturally at `/xlt/about/000-demo` (which matches existing aliases in `blume.config.ts`).
- **Alternatives considered**: Setting `slug: /xlt/about/this-is-just-an-overwritten-url` — unnecessary complexity that diverges from standard path conventions.

### Decision 2: Configure chapter ordering via `content/en/xlt/meta.ts`
- **Choice**: Create `content/en/xlt/meta.ts` exporting `defineMeta({ pages: [...] })`.
- **Rationale**: Blume supports ordering folder children without changing filesystem folder names via the `pages` array in `meta.ts`. This avoids renaming folders, preserving git blame and link references.
- **Alternatives considered**: Prefixing directories (`01-about`, `02-quick-start`) — rejected because it changes all URL routes and breaks existing markdown relative links.

### Decision 3: Configure chapter titles via localized `meta.ts`
- **Choice**: Add `meta.ts` in `content/en/xlt/manual/` (`title: "Base Manual"`), `content/en/xlt/how-tos/` (`title: "How-Tos"`), and `content/en/xlt/knowledgebase/` (`title: "Knowledge Base"`).
- **Rationale**: Blume automatically humanizes folder names (`manual` $\rightarrow$ "Manual"). A minimal `meta.ts` in each folder provides type-safe overrides for section titles to match the legacy site.

## Risks / Trade-offs

- **[Risk] Broken bookmarks or links to `/this is just an overwritten url`**  
  $\rightarrow$ **Mitigation**: Codebase inspection confirmed that no links or configuration entries reference this path. All aliases in `blume.config.ts` already target `/xlt/about/000-demo`.

