# Spec Delta

## MODIFIED Requirements

### Requirement: Release Notes Hub and Navigation Icon
The documentation system SHALL render Release Hubs in MDX for XLT (`/xlt/release-notes/`), XTC (`/xtc/xtc-release-notes/`), and Neodymium (`/neodymium/release-notes/`), each featuring a spotlight section for the latest release, a card grid for recent releases, and collapsible accordions for historical archives. The system SHALL display clean section titles and sidebar labels without emoji characters, display the standard Lucide megaphone icon across all three products, set `sidebar.label: Overview` on each landing page, and preserve complete sidebar visibility for all individual release files.

#### Scenario: Clean title and standard navigation icon
- **WHEN** a user views any Release Notes section or navigates the sidebar in XLT, XTC, or Neodymium
- **THEN** all section titles and sidebar labels display "Release Notes" without emoji characters (e.g., removing `📢` from XTC), each section metadata defines `icon: "megaphone"` and `directory: "none"`, and each landing page defines `sidebar.label: Overview`.

#### Scenario: Latest release spotlight
- **WHEN** a user visits a product's Release Notes landing page
- **THEN** the page renders a prominent spotlight card for the latest release (XLT 10.0.x, XTC v117, or Neodymium 5.3.0) summarizing key marquee features and linking directly to the corresponding release notes document.

#### Scenario: Recent release series card grid
- **WHEN** a user views the recent releases section on any product's Release Notes Hub
- **THEN** the system displays a responsive 2-column card grid summarizing recent stable releases (XLT 9.2.x–8.x, XTC v116–v113, Neodymium 5.2.0–4.x) with feature descriptions and links.

#### Scenario: Collapsible historical archive
- **WHEN** a user views older release series on any product's Release Notes Hub
- **THEN** earlier releases are organized inside collapsible accordion sections categorized by major series or platform eras (such as 6 era brackets for XTC and 5 series brackets for Neodymium), providing direct links to historical release notes while keeping the initial page layout clean.

#### Scenario: Complete sidebar release visibility and URL preservation
- **WHEN** a user navigates the sidebar tree or accesses bookmarked links
- **THEN** all individual release note documents (including all 102 XTC releases and 10 Neodymium releases) remain directly visible in the sidebar navigation without `sidebar.hidden: true`, and the existing path `/xtc/xtc-release-notes/` remains intact without redirection or broken bookmarks.

