# Design

## Context

See `proposal.md` for motivation. In Blume 2.x, the site footer is configured centrally in `blume.config.ts` under the `footer` object, which supplies data to Blume's standard layout footer component across all documentation pages.

The current configuration in `blume.config.ts` specifies:
```typescript
footer: {
  copyright: `© ${new Date().getFullYear()} Xceptance Software Technologies GmbH`,
  links: [
    { label: "Blog", href: "https://blog.xceptance.com/" },
    { label: "Xceptance", href: "https://www.xceptance.com/" },
    { label: "Privacy Policy", href: "https://www.xceptance.com/en/privacy-policy.html" },
    { label: "Imprint", href: "https://www.xceptance.com/en/imprint.html" },
  ],
  socials: {
    github: "https://github.com/Xceptance/xlt-documentation",
    linkedin: "https://www.linkedin.com/company/xceptance-software-technologies-gmbh/",
    x: "https://x.com/xceptance",
  },
}
```

## Goals / Non-Goals

**Goals:**
- Eliminate broken 404 targets in the footer.
- Align `footer.links` with the production Hugo baseline (`docs.xceptance.com`) by completely removing the Imprint link.
- Point Privacy Policy to the canonical URL `https://www.xceptance.com/en/privacy/`.
- Point LinkedIn to the verified official company handle `https://www.linkedin.com/company/xceptance/`.

**Non-Goals:**
- Altering any other footer links (Blog, Xceptance) or socials (GitHub, X).
- Overriding Blume's default footer rendering or introducing custom footer components.

## Decisions

### 1. Remove Imprint Link Completely
- **Decision**: Drop `{ label: "Imprint", href: ... }` from `footer.links`.
- **Rationale**: The pre-migration documentation site on `develop` (`docs.xceptance.com`) never had an Imprint link in its footer. The user explicitly chose to remove it to restore exact parity with the original documentation.
- **Alternative considered**: Updating the target to `https://www.xceptance.com/en/imprint/`. Rejected per user direction.

### 2. Use Trailing-Slash Canonical URLs
- **Decision**: Use `https://www.xceptance.com/en/privacy/` and `https://www.linkedin.com/company/xceptance/`.
- **Rationale**: Trailing slashes match the directory structure of the corporate site and LinkedIn's routing, eliminating unnecessary HTTP redirects.
- **Alternative considered**: Omitting trailing slashes (e.g., `/en/privacy`). While functional via web server redirect, canonical trailing-slash URLs provide faster, direct resolution.

## Risks / Trade-offs

- **[Risk]** Absence of an explicit Imprint link in the documentation footer.  
  → **Mitigation**: Matches the historical baseline of `docs.xceptance.com`. Full corporate registration, address, and legal management details are directly available via the linked `Xceptance` corporate website (`https://www.xceptance.com/`).

