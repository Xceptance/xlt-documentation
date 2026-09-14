## Context

The documentation site previously used Hugo and Docsy. During the migration to Blume, two meta-documentation files in `content/en/xlt/about/` were carried over:
- `000-demo/index.mdx` (and `test.png`): a guide for writing documentation with Hugo shortcodes.
- `software.md`: an acknowledgment page listing Hugo, Docsy, jQuery, Popper, and Bootstrap.

In addition, `README.md` still instructs contributors to install Hugo Extended and execute `hugo server`, and `blume.config.ts` contains redirects pointing to `/xlt/about/000-demo`.

See `proposal.md` for the motivation and scope.

## Goals / Non-Goals

**Goals:**
- Clean up `content/en/xlt/about/` by removing `000-demo/` and `software.md`.
- Remove obsolete redirects from `blume.config.ts`.
- Rewrite `README.md` to document Blume setup, build and dev server commands, authoring conventions (callouts, frontmatter), and site framework acknowledgments.
- Maintain zero broken links and clean build validation via `npx blume validate` and `npx blume build --isolated`.

**Non-Goals:**
- Creating a replacement in-docs demo page on the public documentation site.
- Modifying other XLT, XTC, or Neodymium product documentation.

## Decisions

### Decision 1: Retire `000-demo` and `software.md` from the documentation tree
- **Rationale**: User-facing documentation for XLT should cover the XLT product (load testing, architecture, manuals). Website generator details, Hugo shortcodes, and documentation website dependencies do not belong in a product manual.
- **Alternatives considered**:
  - *Keep a rewritten demo page in XLT About*: Rejected because it continues mixing website meta-content into product documentation.
  - *Move `software.md` to a top-level `/credits` page*: Rejected because website npm dependencies are already tracked in `package.json` and are standard to document in `README.md`.

### Decision 2: Centralize contributor guidance and credits in `README.md`
- **Rationale**: Contributors look at `README.md` when cloning the repository. Placing local setup instructions, npm scripts, Markdown/MDX directives (`:::note`, `:::tip`, `:::warning`, `:::danger`, `:::info`), and Blume/Astro/Vite credits there aligns with standard open-source repository practice.
- **Alternatives considered**: Creating a separate `CONTRIBUTING.md`. While possible, consolidating into a clean, concise `README.md` provides a single entry point for this repository.

### Decision 3: Remove obsolete redirects from `blume.config.ts`
- **Rationale**: Lines 38–39 in `blume.config.ts` redirect `/documentation-helpers` and `/writing-documentation` to `/xlt/about/000-demo`. Since the target route is being removed, keeping these redirects would cause `blume validate` to fail on broken internal redirect targets. Removing them cleans up configuration.

## Risks / Trade-offs

- **[Risk] Bookmarked URL `/xlt/about/demo` returns 404** → *Mitigation*: The page was an internal authoring demonstration rather than a public product feature. If necessary, a redirect to the GitHub repository can be configured.
- **[Risk] Broken link or reference in existing docs** → *Mitigation*: Grep search confirms zero internal Markdown links point to `/xlt/about/demo` or `software.md`. `npx blume validate` will verify full link integrity after removal.

