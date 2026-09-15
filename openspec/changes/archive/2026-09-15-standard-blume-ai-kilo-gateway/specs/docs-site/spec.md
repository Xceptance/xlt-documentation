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

#### Scenario: External endpoint delegation
- **WHEN** the environment variable `ASK_AI_ENDPOINT` is provided during build or runtime
- **THEN** the Ask AI chat panel delegates queries to the specified external endpoint URL instead of the default gateway provider.

## ADDED Requirements

### Requirement: Model Context Protocol (MCP) Server Endpoint
The documentation site SHALL host a live Model Context Protocol (MCP) server endpoint at `/mcp` to allow developer IDE coding agents (such as Claude Code and Cursor) to search, inspect, and retrieve documentation pages and site navigation dynamically.

#### Scenario: MCP endpoint availability
- **WHEN** an MCP-compliant client connects via HTTP to `/mcp`
- **THEN** the server establishes an MCP session and advertises available documentation tools including search, page retrieval, and navigation structure.

#### Scenario: Developer MCP usage documentation
- **WHEN** a developer inspects the project `README.md`
- **THEN** it documents how to connect IDE assistants (Claude Code, Cursor, and VS Code) to the `/mcp` endpoint with copy-and-paste connection commands and settings.

### Requirement: Open in External Chat Assistants
The documentation site SHALL provide direct page actions to open the current document's raw Markdown mirror in supported external AI chat tools, configured for Claude, ChatGPT, and Cursor.

#### Scenario: External chat action triggering
- **WHEN** a user clicks an "Open in" option from the page actions menu
- **THEN** the browser opens the chosen assistant (Claude, ChatGPT, or Cursor) pre-filled with a prompt referencing the current page's raw Markdown URL.

### Requirement: Secret and API Key Git Hygiene
The documentation project SHALL exclude all real API keys, secret-bearing environment files (including `KILO_API_KEY`), and local credential stores from Git version control, maintaining only non-sensitive placeholder templates in `.env.example`.

#### Scenario: Git exclusion of environment secrets
- **WHEN** git status or repository changes are inspected with local `.env` or `.env.*` files present
- **THEN** all actual secret files are ignored by git and prevented from being staged or committed.

#### Scenario: Configuration references environment variable name only
- **WHEN** `blume.config.ts` is configured for Ask AI
- **THEN** the configuration specifies `apiKeyEnv: "KILO_API_KEY"` (the name of the environment variable) and contains no raw API keys or token strings.
