## 1. Content and Configuration Cleanup

- [ ] 1.1 Remove directory `content/en/xlt/about/000-demo/` (including `index.mdx` and `test.png`) from XLT product documentation
- [ ] 1.2 Remove `content/en/xlt/about/software.md` from the XLT chapter
- [ ] 1.3 Remove obsolete `/documentation-helpers` and `/writing-documentation` redirect entries from `blume.config.ts`

## 2. README Modernization

- [ ] 2.1 Update `README.md` prerequisites (Node.js >= 20) and development/build scripts (`npm run dev`, `npm run build`, `npm run validate`)
- [ ] 2.2 Add documentation authoring guide to `README.md` covering frontmatter standards, Markdown/MDX rules, and Blume callout directives (`:::note`, `:::tip`, `:::warning`, `:::danger`, `:::info`)
- [ ] 2.3 Add site tech stack acknowledgments and open-source license references to `README.md` (Blume on Astro + Vite, Lucide icons, Apache 2.0)

## 3. Build & Site Verification

- [ ] 3.1 Run `npx blume validate` to verify zero broken links, zero unresolved redirect targets, and zero navigation errors
- [ ] 3.2 Run `npx blume build --isolated` to verify that all documentation pages build cleanly into `dist/`
- [ ] 3.3 Check `http://localhost:4321/xlt/about` on the development server to confirm that the XLT About sidebar contains only genuine product documentation

