# Proposal: Redesign Release Notes into a Structured Hub

## Why

The current XLT Release Notes landing page (`/xlt/release-notes/`) is essentially blank because the legacy Hugo `_index.md` was migrated as an empty stub without body content. Additionally, the page title and sidebar label display a raw Unicode megaphone emoji (`📢`) instead of a modern, standard icon. Redesigning this index into a Release Hub provides users with an intuitive, structured overview of recent releases while organizing 44 historical release note documents cleanly.

## What Changes

- **Clean Title and Standard Icon**: Remove the raw Unicode emoji `📢` from the Release Notes page title and sidebar label, configuring the clean Lucide SVG icon (`megaphone`) for the Release Notes section.
- **Convert to MDX**: Replace `content/en/xlt/release-notes/index.md` with `content/en/xlt/release-notes/index.mdx` to enable native Blume MDX components (`<CardGroup>`, `<Card>`, `<Badge>`, `<Accordion>`) without explicit component imports.
- **Latest Release Spotlight**: Add a prominent featured card for the latest major version (**XLT 10.0.x**), highlighting key improvements (Java 21 virtual threads, dynamic overview charts, moving averages, private machine mode) and linking directly to its release notes.
- **Recent Release Series Grid**: Provide a responsive `<CardGroup cols={2}>` with quick entry points and descriptions for active and recent releases (XLT 9.2.x, 9.1.x, 9.0.x, and the 8.x series).
- **Collapsible Historical Archive**: Organize older releases (XLT 7.x, 6.x, 5.x, 4.x, and 3.x series) inside clean, collapsible `<Accordion>` elements so all 44 historic documents remain accessible without visual clutter.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `docs-site`: Add requirements for the Release Notes Hub layout and standard navigation icon handling.

## Impact

- **Files affected**:
  - `content/en/xlt/release-notes/index.md` (deleted/replaced by `index.mdx`)
  - `content/en/xlt/release-notes/index.mdx` (created)
  - `content/en/xlt/meta.ts` (updated to configure the `megaphone` icon if applicable)
- **APIs & Dependencies**: No new external dependencies; uses built-in Blume components and Lucide icons.
- **Compatibility**: All existing URL paths (`/xlt/release-notes/`, `/xlt/release-notes/v10_0_x`, etc.) remain identical and backwards-compatible.

