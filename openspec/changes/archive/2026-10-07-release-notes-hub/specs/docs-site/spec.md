# Spec Delta

## ADDED Requirements

### Requirement: Release Notes Hub and Navigation Icon
The documentation system SHALL render `/xlt/release-notes/` as a structured Release Hub in MDX featuring a spotlight section for the latest release series, a card grid for recent releases, and collapsible accordions for historical archives. The system SHALL display the section title and sidebar label without emoji characters and display a standard megaphone icon.

#### Scenario: Clean title and standard navigation icon
- **WHEN** a user views the Release Notes page or navigates the XLT sidebar
- **THEN** the page title and sidebar label display "Release Notes" without the raw megaphone emoji `📢`, and the navigation entry displays the standard Lucide megaphone icon.

#### Scenario: Latest release spotlight
- **WHEN** a user visits `/xlt/release-notes/`
- **THEN** the page renders a prominent spotlight card for XLT 10.0.x summarizing key features (Java 21 virtual threads, dynamic overview charts, moving averages, private machine mode) and linking directly to the XLT 10.0.x release notes.

#### Scenario: Recent release series card grid
- **WHEN** a user views the recent releases section on the Release Notes Hub
- **THEN** the system displays a responsive grid of cards for recent release series (such as XLT 9.2.x, 9.1.x, 9.0.x, and 8.x) with version summaries and links to their respective release documents.

#### Scenario: Collapsible historical archive
- **WHEN** a user views older release series on the Release Notes Hub
- **THEN** release series from XLT 7.x down to 3.x are organized inside collapsible accordion sections, preserving access to all historical release documents without cluttering the main view.

