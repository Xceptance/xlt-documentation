## Why

Corpus analysis of the 316 documentation pages reveals that the median documentation page length is 4,067 characters, while Blume's default Ask AI retrieval chunk size (`excerptChars: 2000`) and total context budget (`contextBudget: 10000`) aggressively truncate technical documentation and drop search hits before reaching the LLM. With `google/gemini-3.8-flash` providing a 1M+ token context window and sub-second prefill, increasing the excerpt size to 4,500 characters and the total context budget to 32,000 characters ensures that code examples, configuration tables, and all top 6 retrieved documentation pages are injected in full without truncation.

## What Changes

- Configure `ai.ask.retrieval` in `blume.config.ts` with corpus-optimized parameters:
  - `excerptChars: 4500`: Increases chunk size so the median technical documentation page (~4,067 chars) fits completely without slicing code snippets or property lists in half.
  - `contextBudget: 32000`: Expands total context ceiling to ~8,000 tokens so the actively viewed page plus all 6 search hits can be injected without premature budget exhaustion.
  - `maxResults: 6`: Explicitly retains 6 search results for multi-topic questions bridging XLT, XTC, and Neodymium.
- Document the retrieval configuration parameters in `README.md` under the AI & MCP section, detailing the corpus rationale and linking directly to the Blume Ask AI configuration documentation.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `docs-site`: Updates the `Ask AI Assistant Integration` requirement with explicit retrieval sizing guarantees (4,500 character excerpts and 32,000 character context budget), and updates contributor documentation requirements to document these parameters with Blume doc references.

## Impact

- `blume.config.ts`: Adds `ai.ask.retrieval` configuration.
- `README.md`: Adds retrieval configuration documentation and reference links.
- Runtime: Increases injected prompt context size from ~2,500 tokens to up to ~8,000 tokens for Gemini 3.8 Flash, improving response accuracy, code completeness, and citation depth with negligible latency impact.

