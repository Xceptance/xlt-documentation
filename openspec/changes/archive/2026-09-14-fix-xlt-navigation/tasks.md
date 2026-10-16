## 1. Fix Rogue Frontmatter Route

- [x] 1.1 Remove `slug: this is just an overwritten url` from `content/en/xlt/about/000-demo/index.mdx` and verify with grep that no rogue `slug` remains in `content/`

## 2. Configure Chapter Navigation Metadata

- [x] 2.1 Create `content/en/xlt/meta.ts` using `defineMeta` with the canonical chapter order (`pages: ["about", "quick-start", "manual", "advanced", "test-suites", "release-notes", "how-tos", "knowledgebase"]`) and verify file existence and types
- [x] 2.2 Create `content/en/xlt/manual/meta.ts` with `title: "Base Manual"` and verify group title metadata
- [x] 2.3 Create `content/en/xlt/how-tos/meta.ts` with `title: "How-Tos"` and `content/en/xlt/knowledgebase/meta.ts` with `title: "Knowledge Base"` and verify group title metadata

## 3. Verification & Build Validation

- [x] 3.1 Run `npx blume validate --strict` to ensure no link or navigation diagnostics exist
- [x] 3.2 Run `npm run build` and inspect `dist/api/docs/navigation.json` to confirm that the `Xlt` section group has `path: "/xlt"` and its children match the specified sequence
- [x] 3.3 Verify at `http://localhost:4321/xlt` that the left sidebar displays the complete XLT documentation tree
