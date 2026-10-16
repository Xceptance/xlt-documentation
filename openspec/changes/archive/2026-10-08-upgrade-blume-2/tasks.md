# Tasks

## 1. Dependency Upgrade and Configuration

- [x] 1.1 Update `blume` in `package.json` to `^2.2.1` and execute `npm install`, verifying `package-lock.json` is updated and `npm list blume` reports version `2.2.1`
- [x] 1.2 Remove `output: "static"` from `deployment` in `blume.config.ts`, verifying that the configuration file is valid TypeScript and matches the Blume 2 configuration schema

## 2. Synchronize Agent Skills

- [x] 2.1 Copy updated skills (`blume`, `blume-migrate`, `blume-update-docs`) and new skill (`blume-write-skill`) from `node_modules/blume/skills/` to `.agents/skills/`, verifying all four skill folders contain valid `SKILL.md` files
- [x] 2.2 Update `skills-lock.json` with the new skill version metadata and commit hash corresponding to Blume 2.2.1, verifying valid JSON formatting

## 3. Validation and Build Verification

- [x] 3.1 Run `npx blume validate` to verify all content frontmatter, routes, and links pass Blume strict validation
- [x] 3.2 Run `npm run build` to verify that the full static production build succeeds with exit code 0 and populates `dist/`

