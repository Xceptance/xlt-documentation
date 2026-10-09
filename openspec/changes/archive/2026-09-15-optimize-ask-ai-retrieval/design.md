## Context

See `proposal.md` for motivation. Blume's built-in Ask AI grounding pipeline (`src/ai/ask-context.ts`) uses Orama lexical search to find relevant documentation pages at request time. It slices excerpts around matched query terms and packs them into a grounded `<docs>` prompt block subject to three configuration settings under `ai.ask.retrieval`:
1. `excerptChars`: characters extracted per page (default: 2,000).
2. `contextBudget`: total characters allowed across all injected pages (default: 10,000).
3. `maxResults`: number of pages retrieved per question (default: 6).

In the current documentation repo (316 pages total, 162 core guide pages), the median guide page is 4,067 characters. The default 2,000-character excerpt truncates multi-section guides (code snippets, properties tables), and the default 10,000-character budget drops search hits 5 and 6 whenever earlier hits reach the excerpt limit.

## Goals / Non-Goals

**Goals:**
- Optimize `ai.ask.retrieval` in `blume.config.ts` to provide complete context windows for `google/gemini-3.8-flash`.
- Ensure all 6 retrieved hits plus the actively viewed page can be injected without budget exhaustion.
- Document the configuration parameters in `README.md` with rationale and links to official Blume documentation.

**Non-Goals:**
- Modifying Blume's internal RAG chunking algorithm or Orama tokenizer.
- Changing model provider, model selection, or MCP endpoint configurations.

## Decisions

### Decision 1: Set `excerptChars: 4500`
- **Rationale**: The median documentation guide in the repository is 4,067 characters. 4,500 characters allows median guide pages to fit entirely within the excerpt window without truncating code examples or configuration tables.
- **Alternatives considered**:
  - *Keep default 2,000*: Rejected; cuts off code snippets and tables on pages exceeding 2,000 characters.
  - *Raise to 10,000*: Rejected; overly broad windows dilute relevance on long release note pages (up to 68k chars) where targeted heading-level sections are preferable.

### Decision 2: Set `contextBudget: 32000`
- **Rationale**: In Blume, the page currently viewed by the user is injected first, followed by up to `maxResults` hits. With `maxResults: 6` and `excerptChars: 4500`, the maximum possible context payload is $(1 + 6) \times 4,500 = 31,500$ characters. A budget of 32,000 characters (~8,000 tokens) guarantees that none of the 6 retrieved hits are dropped due to budget exhaustion.
- **Alternatives considered**:
  - *Keep default 10,000*: Rejected; drops hits 5 and 6 after ~4 hits consume the budget.
  - *Set to 100,000+*: Rejected; unnecessary prompt bloat for questions that only touch a few topics.

### Decision 3: Document in `README.md` with Blume Documentation References
- **Rationale**: Developers maintaining the documentation site should understand why these values were chosen and how to adjust them if the docs corpus evolves.
- **Documentation reference**: Links to Blume's [Ask AI Retrieval Size Documentation](https://blume.sh/docs/configuration/ask-ai#retrieval-size) (or relative doc path `/docs/configuration/ask-ai#retrieval-size`).

## Risks / Trade-offs

- **[Risk: Increased token consumption on Gemini 3.8 Flash]**  
  → **Mitigation:** Gemini 3.8 Flash has a 1,000,000-token context window and costs ~$0.075 per million input tokens via Kilo / Google AI Studio BYOK. Sizing the budget to ~8,000 tokens costs less than $0.0006 per query and completes in <200ms.
- **[Risk: Very long pages (e.g. release notes up to 68k chars)]**  
  → **Mitigation:** Blume's `sectionExcerpt` algorithm splits pages into `##` sections, scores them by term density and heading matches, and extracts the top-scoring section within the 4,500-char limit, falling back to windowed text with ellipses (`…`) so irrelevant release notes sections are not injected.

