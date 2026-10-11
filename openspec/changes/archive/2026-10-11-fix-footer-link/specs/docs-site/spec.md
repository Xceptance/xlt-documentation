# Spec Delta: docs-site

## MODIFIED Requirements

### Requirement: Standard Site Footer and Navigation Hygiene
The system SHALL render a standard site footer across all documentation pages featuring corporate copyright, company links (Blog, Website, Privacy Policy), and social profile icons (GitHub, LinkedIn, X), while maintaining a clean top header navigation focused on documentation products.

#### Scenario: Footer content and social links
- **WHEN** any documentation page is rendered
- **THEN** the page footer displays the current corporate copyright notice, verified company navigation links for Blog (`https://blog.xceptance.com/`), Xceptance (`https://www.xceptance.com/`), and Privacy Policy (`https://www.xceptance.com/en/privacy/`) without an Imprint link, and brand social profile icons for GitHub (`https://github.com/Xceptance/xlt-documentation`), LinkedIn (`https://www.linkedin.com/company/xceptance/`), and X (`https://x.com/xceptance`).

#### Scenario: Header navigation decluttering
- **WHEN** the top header navigation is rendered
- **THEN** external repository and blog links are removed from `navigation.featured` in favor of the dedicated site footer.

