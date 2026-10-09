# Spec Delta

## ADDED Requirements

### Requirement: Configuration Snippet Language Annotation
The system SHALL annotate Java properties configuration snippets with the `properties` language identifier (and include descriptive file titles such as `title="project.properties"` when the target configuration file is referenced in surrounding context), and SHALL reserve shell languages (`bash`, `sh`, `console`) exclusively for executable command-line demonstrations and shell scripts.

#### Scenario: Java properties configuration snippet formatting
- **WHEN** documentation displays Java property key-value configurations or settings
- **THEN** the code block fence specifies `properties` rather than `bash` or `sh`, rendering Java property syntax coloring and omitting shell terminal icons.

#### Scenario: Contextual configuration file title attribution
- **WHEN** a configuration snippet pertains to a specific file identified in surrounding context (such as `project.properties`, `default.properties`, `dev.properties`, or `reportgenerator.properties`)
- **THEN** the code block fence includes `title="<filename>"` in its fence meta to display the file name in the block header tab.

#### Scenario: Executable command code fence reservation
- **WHEN** documentation illustrates command-line commands to be executed in a shell
- **THEN** the code block fence uses `bash`, `sh`, or `console` to accurately reflect executable terminal input.

