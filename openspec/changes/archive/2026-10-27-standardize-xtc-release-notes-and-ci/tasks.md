# Tasks

## 1. Branch Setup and Cleanup

- [x] 1.1 Create and check out a dedicated development branch `fix/xtc-release-notes-and-ci` from `main` and verify with `git branch --show-current`
- [x] 1.2 Delete the merged and retired local branch `poc-migrate-to-blume` and verify with `git branch --list poc-migrate-to-blume`

## 2. Directory Standardization and Link Migration

- [x] 2.1 Move directory `content/en/xtc/xtc-release-notes/` to `content/en/xtc/release-notes/` using `git mv` and verify git status tracks the renames
- [x] 2.2 Update `content/en/xtc/meta.ts` to reference `release-notes` in its items array and verify the file content
- [x] 2.3 Update quick link in `pages/index.astro` from `/xtc/xtc-release-notes` to `/xtc/release-notes` and verify the link target
- [x] 2.4 Update link in `content/en/xtc/index.md` from `/xtc/xtc-release-notes/` to `/xtc/release-notes/` and verify the link target
- [x] 2.5 Update internal links in `content/en/xtc/release-notes/index.mdx`, `v38.md`, `v116.mdx`, and `v117.mdx` from `/xtc/xtc-release-notes/...` to `/xtc/release-notes/...` and verify with grep

## 3. Apache Redirect Configuration

- [x] 3.1 Add 301 rewrite rule `RewriteRule ^xtc/xtc-release-notes(?:/(.*))?$ /xtc/release-notes/$1 [R=301,L]` to `public/.htaccess` and verify rule syntax

## 4. CI/CD Workflow and Documentation Updates

- [x] 4.1 Update `.github/workflows/deploy-test.yml` to remove `poc-migrate-to-blume` and add `feature/**`, `feat/**`, `fix/**`, and `fixes/**` branch patterns alongside `test/**` and `preview/**`
- [x] 4.2 Update `README.md` to document the new branch trigger conventions for staging deployments and remove references to `poc-migrate-to-blume`

## 5. Build and Validation

- [x] 5.1 Run `npm run validate` to verify zero broken internal links, schema errors, or missing assets
- [x] 5.2 Run `npm run lint:prose` on modified documentation files to ensure prose meets Vale quality rules
- [x] 5.3 Run `npm run build` to verify clean static compilation into `dist/` and confirm `dist/.htaccess` includes the redirect rule

