## ADDED Requirements

### Requirement: Ask AI Assistant Integration
The documentation site SHALL provide an in-page Ask AI chat assistant integrated into the header navigation, displaying XLT-specific starter question suggestions and routing user queries to a configured streaming endpoint.

#### Scenario: Ask AI button and panel rendering
- **WHEN** a user navigates to any documentation page with Ask AI enabled
- **THEN** the header displays an Ask AI button and opening the panel displays an interactive chat interface.

#### Scenario: Starter question suggestions display
- **WHEN** a user opens the Ask AI chat panel with an empty conversation
- **THEN** three clickable prompt suggestions are displayed: "How do I configure load profiles in XLT?", "How do I evaluate test results?", and "How do I configure DNS settings in XLT?".

#### Scenario: External endpoint delegation
- **WHEN** the environment variable `ASK_AI_ENDPOINT` is provided during build or runtime
- **THEN** the Ask AI chat panel delegates queries to the specified external endpoint URL without requiring server runtime output from the documentation site build.

