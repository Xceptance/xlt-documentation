## Why

Blume enables the "Was this page helpful? Yes / No" rating widget by default on every page. Because the site does not currently integrate an analytics provider (such as PostHog, GA4, or Plausible) or custom feedback webhook, reader responses are currently discarded as no-ops. Disabling the widget avoids reader confusion until analytics is configured.

## What Changes

- Explicitly set `feedback: false` in `blume.config.ts`.
- Include an explanatory code comment in `blume.config.ts` explaining why it is disabled and how to re-enable it when analytics is introduced.
- Update the `docs-site` specification to define the page feedback visibility state.

## Capabilities

### New Capabilities

*(None)*

### Modified Capabilities

- `docs-site`: Define that the page helpfulness rating widget is suppressed on documentation pages until an analytics backend is configured.

## Impact

- Affects `blume.config.ts`.
- Removes the "Was this page helpful?" section from the bottom of all rendered documentation pages.
- No breaking changes or routing impact.

