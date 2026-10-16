## Context

Blume provides a built-in page feedback rating component (`PageFeedback.astro`) that is enabled by default. Without an analytics provider configured, reader clicks trigger client events that no-op.

See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**
- Configure `feedback: false` in `blume.config.ts`.
- Document the setting with an inline code comment explaining its purpose and how to re-enable it once analytics (e.g., PostHog, GA4, Plausible) is introduced.
- Verify that documentation pages render cleanly without the feedback widget.

**Non-Goals:**
- Setting up analytics providers or tracking scripts.
- Creating a custom feedback slot component.

## Decisions

### Decision 1: Use Blume's native `feedback: false` configuration
- **Rationale**: Blume natively supports `feedback: boolean` in `blume.config.ts`. Setting it to `false` disables the layout slot entirely across all rendered pages without requiring custom slot overrides or CSS workarounds.
- **Alternatives considered**:
  - *Custom empty Feedback slot*: Overriding the slot with a no-op component is unnecessary when the native boolean config already achieves this.

## Risks / Trade-offs

- **[Risk] None** → *Mitigation*: The change simply hides an unbacked feedback widget. It can be re-enabled at any time by toggling `feedback: true` or removing the override.

