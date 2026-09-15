## 1. Blume Configuration

- [x] 1.1 Add `ai.ask.retrieval` configuration to `blume.config.ts` with `excerptChars: 4500`, `contextBudget: 32000`, and `maxResults: 6` along with comprehensive inline code comments explaining the corpus rationale. Verify configuration validity by running `npm run validate` (`npx blume validate`).

## 2. Documentation

- [x] 2.1 Update `README.md` under the AI Features & Model Context Protocol section with an "Ask AI Context & Retrieval Sizing" subsection explaining `excerptChars`, `contextBudget`, and `maxResults`, documenting why they were tuned for the repository's documentation corpus (4,067-char median guide size) and `gemini-3.8-flash`, and providing reference links to Blume's official Ask AI configuration documentation.

## 3. Verification

- [x] 3.1 Run `npm run build` (`npx blume build`) and verify that the documentation site and server build succeed cleanly with zero schema, frontmatter, or build errors.

