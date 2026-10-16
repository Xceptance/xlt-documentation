# Proposal

## Why

The site footer configured in `blume.config.ts` currently contains broken links: Privacy Policy points to `/en/privacy-policy.html` (which returns a 404 on `xceptance.com`) and the LinkedIn social link points to a non-existent company handle (`xceptance-software-technologies-gmbh`). Furthermore, an Imprint link was added during the Blume 2.x feature adoption that did not exist in the original documentation site (`docs.xceptance.com`) and also resolves to a 404. Aligning these links restores full parity with the production site and ensures valid reader wayfinding.

## What Changes

- **Fix Privacy Policy URL**: Update the Privacy Policy link target from `https://www.xceptance.com/en/privacy-policy.html` to `https://www.xceptance.com/en/privacy/` to match the canonical URL used by the original documentation site.
- **Fix LinkedIn Social URL**: Update the LinkedIn profile target from `https://www.linkedin.com/company/xceptance-software-technologies-gmbh/` to the official corporate handle `https://www.linkedin.com/company/xceptance/`.
- **Remove Imprint Link**: Remove the Imprint entry entirely from `footer.links` to align with the original documentation baseline.
- **Update Specification**: Update the `docs-site` specification to reflect the accurate footer link list (Blog, Xceptance, Privacy Policy) without Imprint.

## Capabilities

### Modified Capabilities

- `docs-site`: Update `Standard Site Footer and Navigation Hygiene` to specify the verified link targets (Blog, Xceptance, Privacy Policy) and official LinkedIn URL, removing Imprint.

## Impact

- `blume.config.ts`: Configuration update to `footer.links` and `footer.socials`.
- No impact on content files, layouts, or CI/CD deployment pipelines.

