# Spec Delta: docs-site

## MODIFIED Requirements

### Requirement: Native Directives and MDX Callouts
The system SHALL parse and render callout directives (`:::note`, `:::warning`, `:::tip`, `:::danger`, `:::info`) in `.mdx` files without requiring explicit component imports, and SHALL enforce well-formed directive opening syntax and valid Shiki code block language identifiers.

#### Scenario: Role permission callout rendering
- **WHEN** an MDX document contains a `:::info[Role Required]` directive
- **THEN** the system renders a styled informational callout with the title "Role Required" and the enclosed role requirement text.

#### Scenario: Callout directive syntax formatting
- **WHEN** an MDX document contains a directive callout such as `:::note` or `:::warning`
- **THEN** the opening fence is separated from body content by whitespace or newline, or provides an explicit bracketed title `:::note[Title]`, preventing unrecognized directive names or discarded opening text.

#### Scenario: Supported code block syntax highlighting languages
- **WHEN** a fenced code block specifies a programming or configuration language
- **THEN** the language matches a valid Shiki language identifier or alias (such as `bash`, `cmd`, `java`, `properties`, `ini`, or `text`), avoiding unmapped fallback warnings during build validation.

