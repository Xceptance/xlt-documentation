# Spec Delta

## MODIFIED Requirements

### Requirement: Brand Theme and Styling
The system SHALL apply Xceptance corporate brand identity styling across light and dark modes, utilizing primary corporate blue `#004682`, display font `Roboto Condensed`, body font `Roboto`, monospace font `Ubuntu Mono`, display the official Xceptance SVG wordmark (`/images/xceptance_only.svg`) in the site header, and provide responsive reading column width for large displays.

#### Scenario: Typography and accent application
- **WHEN** a documentation page is rendered
- **THEN** headings apply the `Roboto Condensed` font family, body copy applies `Roboto`, code blocks apply `Ubuntu Mono`, and primary brand accents utilize `#004682`.

#### Scenario: Header brand logo display
- **WHEN** any documentation page is loaded
- **THEN** the site header displays the official Xceptance SVG mark (`/images/xceptance_only.svg`) paired with the "Docs" title link.

#### Scenario: Responsive content width on large displays
- **WHEN** a documentation page is viewed on a display with viewport width greater than or equal to 1536px (`2xl` breakpoint)
- **THEN** the prose content column expands to `52rem` (832px) via `--blume-content-width`, while preserving the right-hand Table of Contents and left sidebar navigation.

#### Scenario: Default content width on standard displays
- **WHEN** a documentation page is viewed on a display with viewport width less than 1536px
- **THEN** the prose content column maintains the default `42rem` (672px) width.

