# Tasks

## 1. Configure Workflow Token Permissions

- [x] 1.1 Add top-level `permissions: contents: read` block to `.github/workflows/deploy-test.yml` and verify YAML structure.
- [x] 1.2 Add top-level `permissions: contents: read` block to `.github/workflows/main.yml` and verify YAML structure.

## 2. Validation and Consistency Verification

- [x] 2.1 Verify workflow syntax across both modified YAML files and ensure no parse or indentation errors exist.
- [x] 2.2 Run `openspec validate secure-workflow-permissions` to confirm all change artifacts and specs validate cleanly.

