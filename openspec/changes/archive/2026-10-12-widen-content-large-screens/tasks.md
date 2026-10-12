# Tasks

## 1. Theme Configuration and Documentation

- [x] 1.1 Create project-root `theme.css` with `@media (min-width: 96rem) { :root { --blume-content-width: 52rem; } }` and verify the file is present with the expected CSS rule
- [x] 1.2 Document the `--blume-content-width` token customization, 2xl breakpoint rationale, and framework upgrade safety in `README.md` under the Theme Tokens and Styling section

## 2. Build Verification and Layout Testing

- [x] 2.1 Execute `npm run build` and `npm run validate` to verify clean static compilation with zero CSS or link validation errors
- [x] 2.2 Verify responsive content width in preview mode (`npm run preview`), confirming that content renders at `42rem` for $< 1536\text{px}$ viewports and expands to `52rem` on $\ge 1536\text{px}$ viewports with left sidebar and right Table of Contents intact

