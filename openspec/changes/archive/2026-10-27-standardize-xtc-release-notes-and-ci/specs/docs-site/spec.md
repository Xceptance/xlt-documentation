# Spec Delta

## MODIFIED Requirements

### Requirement: Release Notes Hub and Navigation Icon
The documentation system SHALL render Release Hubs in MDX for XLT (`/xlt/release-notes/`), XTC (`/xtc/release-notes/`), and Neodymium (`/neodymium/release-notes/`), each featuring a spotlight section for the latest release, a card grid for recent releases, and collapsible accordions for historical archives. The system SHALL display clean section titles and sidebar labels without emoji characters, display the standard Lucide megaphone icon across all three products, set `sidebar.label: Overview` on each landing page, and preserve complete sidebar visibility for all individual release files.

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
- **WHEN** a user navigates the sidebar tree or accesses legacy links and external application footers
- **THEN** all individual release note documents remain directly visible in the sidebar navigation under `/xtc/release-notes/`, and requests to the legacy path `/xtc/xtc-release-notes/` (and its nested release paths) are permanently redirected via HTTP 301 to `/xtc/release-notes/`.

### Requirement: Staging and Test Deployment Automation
The CI/CD pipeline SHALL provide a dedicated, isolated deployment workflow that builds static documentation and deploys it to the test hosting environment (`docs-test.xceptance.com`), decoupled from the production deployment pipeline.

#### Scenario: Manual test deployment via workflow dispatch
- **WHEN** a contributor or maintainer manually triggers the test deployment workflow via GitHub Actions `workflow_dispatch` on any branch
- **THEN** the workflow checks out the selected branch, builds and validates the documentation, and mirrors the compiled static output to the test hosting environment using dedicated test credentials.

#### Scenario: Automated test deployment on test branches
- **WHEN** commits are pushed to any branch matching feature, fix, or preview patterns (`feature/**`, `feat/**`, `fix/**`, `fixes/**`, `test/**`, `preview/**`)
- **THEN** the test deployment workflow triggers automatically to update the test hosting environment, and pushes to the retired migration branch (`poc-migrate-to-blume`) do not trigger deployments.

#### Scenario: Production isolation and concurrency control
- **WHEN** the test deployment workflow is executed
- **THEN** it executes under a dedicated concurrency group (`deploy-test-documentation`) and uses isolated secrets (`FTP_TEST_HOST`, `FTP_TEST_USERNAME`, `FTP_TEST_PASSWORD`), ensuring it never accesses production credentials or queues behind production deployment runs.

### Requirement: Staging Deployment Contributor Guidance
The project documentation SHALL document staging deployment procedures in `README.md`, including staging environment URLs, GitHub Actions manual dispatch instructions, branch naming conventions, and required repository secrets.

#### Scenario: Contributor staging guidance availability
- **WHEN** a contributor or maintainer consults `README.md`
- **THEN** it provides clear instructions on how to trigger a test deployment from the GitHub Actions UI, explains active branch patterns triggering test builds (`feature/**`, `feat/**`, `fix/**`, `fixes/**`, `test/**`, `preview/**`), specifies the live staging URL (`https://docs-test.xceptance.com`), and details the required GitHub Actions repository secrets.

