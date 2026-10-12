# Spec Delta

## MODIFIED Requirements

### Requirement: Directory Index Card Icons and Sidebar Typography
The system SHALL display contextual Lucide icons on Directory Index Cards across both top-level product landing pages and topic chapter landing pages in XLT, XTC, and Neodymium, while suppressing page-level and group-level icons in the sidebar navigation to keep navigation plain text and preserving the Release Notes section header icon.

#### Scenario: Contextual icons on directory cards
- **WHEN** a user navigates to any product overview page (`/xlt/`, `/neodymium/`, or `/xtc/`) or topic chapter landing page (e.g., `/xlt/about`, `/xlt/quick-start`, `/xtc/loadtesting`, `/neodymium/features`)
- **THEN** each directory index card renders its configured Lucide vector icon at 20px in the primary theme accent color (`#004682`) above the title.

#### Scenario: Sidebar page links remain plain text
- **WHEN** a user views the sidebar navigation for any product section
- **THEN** individual page links and collapsible group accordion headers render text-only labels without inline icons, maintaining a clean, scannable reading tree.

#### Scenario: Preservation of Release Notes section icon
- **WHEN** a user views the sidebar navigation for XLT, XTC, or Neodymium
- **THEN** the Release Notes group header retains its configured Lucide megaphone icon (`icon: "megaphone"`), remaining the only section with an icon in the sidebar.

