## MODIFIED Requirements

### Requirement: Ask AI Assistant Integration
The documentation site SHALL provide an in-page Ask AI chat assistant integrated into the header navigation, displaying XLT-specific starter question suggestions and routing user queries to Blume's built-in OpenAI-compatible chat backend configured for Kilo Gateway and Google Gemini, or to an optional external endpoint when specified.

#### Scenario: Ask AI button and panel rendering
- **WHEN** a user navigates to any documentation page with Ask AI enabled
- **THEN** the header displays an Ask AI button and opening the panel displays an interactive chat interface.

#### Scenario: Starter question suggestions display
- **WHEN** a user opens the Ask AI chat panel with an empty conversation
- **THEN** three clickable prompt suggestions are displayed: "How do I configure load profiles in XLT?", "How do I evaluate test results?", and "How do I configure DNS settings in XLT?".

#### Scenario: Native gateway query routing
- **WHEN** a user submits a question through the Ask AI chat panel
- **THEN** the system processes the request through Blume's internal RAG retrieval pipeline, builds dynamic documentation context excerpts, and streams the answer from Kilo Gateway using `google/gemini-3.8-flash` via the configured `KILO_API_KEY`.

#### Scenario: Corpus-optimized RAG retrieval sizing
- **WHEN** Blume constructs the grounded context prompt for an Ask AI query
- **THEN** the retrieval pipeline uses an excerpt window of up to 4,500 characters per document, a total context budget of 32,000 characters, and up to 6 search results so that complete guide pages and code examples are provided to `google/gemini-3.8-flash` without truncation or dropped search hits.

#### Scenario: External endpoint delegation
- **WHEN** the environment variable `ASK_AI_ENDPOINT` is provided during build or runtime
- **THEN** the Ask AI chat panel delegates queries to the specified external endpoint URL instead of the default gateway provider.

### Requirement: Contributor Documentation and Authoring Guidance
The repository SHALL provide contributor setup instructions, local development commands, and Blume Markdown/MDX authoring conventions in the repository root `README.md` rather than within user-facing product documentation.

#### Scenario: Contributor guidance availability
- **WHEN** a contributor views `README.md`
- **THEN** it provides accurate prerequisites for Node.js, npm commands for Blume (`dev`, `build`, `validate`), and documentation formatting conventions including callout directives.

#### Scenario: Ask AI retrieval parameter documentation
- **WHEN** a contributor or developer inspects `README.md`
- **THEN** it documents the Ask AI retrieval parameters (`excerptChars`, `contextBudget`, `maxResults`), explains why they were tuned for the repository's documentation corpus and `gemini-3.8-flash`, and references the official Blume Ask AI retrieval size documentation.

