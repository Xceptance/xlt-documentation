# Spec Delta

## ADDED Requirements

### Requirement: Agent Skills Publishing and Discovery
The documentation system SHALL publish task-specific RFC-compliant Agent Skills under `/.well-known/agent-skills/` and expose a machine-readable discovery index (`/.well-known/agent-skills/index.json`), allowing AI coding assistants to discover and install playbooks for XLT load profile modeling, Groovy scorecards, merge rules, labeling rules, report colorization, and test result evaluation.

#### Scenario: Agent skills directory compilation
- **WHEN** the static site is built via `blume build`
- **THEN** every skill defined under `./skills/` containing a valid `SKILL.md` is compiled to `dist/.well-known/agent-skills/<skill-name>/SKILL.md`.

#### Scenario: Agent skills index discovery
- **WHEN** an AI coding agent requests `/.well-known/agent-skills/index.json`
- **THEN** the server returns a valid JSON index mapping each published skill name to its metadata, description, and raw endpoint path.

#### Scenario: Documentation skills catalog rendering
- **WHEN** a user visits `/xlt/how-tos/ai-agent-skills/`
- **THEN** the page displays catalog entries, CLI installation instructions, and IDE configuration commands for all published XLT and XTC skills.
