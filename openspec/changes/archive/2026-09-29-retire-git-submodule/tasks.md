## 1. Submodule and Legacy Module Removal

- [x] 1.1 De-register the Docsy submodule and remove `.gitmodules` from Git tracking (`git rm .gitmodules`)
- [x] 1.2 Remove obsolete Hugo Go module files `go.mod` and `go.sum` (`git rm go.mod go.sum`)

## 2. CI/CD Workflow Modernization

- [x] 2.1 Update `.github/workflows/main.yml` to remove `submodules: true` from checkout, remove Hugo setup/cache/build steps, and configure standard Blume validation and build commands (`npm ci`, `npm run validate`, `npm run build`)

## 3. Verification

- [x] 3.1 Run `npm run validate` and `npm run build` to confirm the static site builds cleanly without Hugo or Go dependencies
- [x] 3.2 Verify `git submodule status` and `git status` report no active submodules and a clean index
