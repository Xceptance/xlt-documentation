# Design

## Context

The documentation site is powered by Blume on Astro and Vite. Blume natively discovers skill directories placed in `./skills/` (as configured in `blume.config.ts` via `agents: { skills: "./skills" }`), packages each `SKILL.md`, and serves them statically under `/.well-known/agent-skills/` alongside an auto-generated JSON discovery catalog.

See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**
- Provide focused, task-specific Agent Skills covering the full XLT lifecycle:
  1. `xlt-load-setup`: Load profile modeling, ramp-up schedules, load functions, and virtual thread concurrency.
  2. `xlt-scorecards`: Automated SLA assertions and quality gating using Groovy DSL.
  3. `xlt-merge-rules`: Request bucketing, regex URL parsing, capturing groups, and drop rules.
  4. `xlt-labeling-rules`: Non-destructive semantic tagging across transactions, actions, and requests.
  5. `xlt-report-colorization`: Threshold-based table cell colorization for anomaly triage.
  6. `xlt-report-evaluation`: Systematic test result evaluation, 3-layer bottleneck triage, and error analysis.
- Ensure strict RFC compliance with standard frontmatter metadata (`name`, `description`).
- Integrate install guides into `content/en/xlt/how-tos/ai-agent-skills.mdx` and add contextual callout links in relevant manual chapters.

**Non-Goals:**
- Creating runtime CLI tools or npm packages; all skills are published as pure Markdown playbooks.
- Modifying core XLT Java code or report generator internals.

## Decisions

### Decision 1: Domain-Specific Skills vs. Monolithic XLT Skill
- **Choice**: Publish six discrete, narrowly scoped skills rather than one large `xlt` skill.
- **Rationale**: Large language models have limited context windows and attention degradation when fed long documentation bundles. An agent tasked with tuning `merge-rules.properties` does not need load profile formulas or Java virtual thread flags. Task-focused skills ensure maximum precision and prompt efficiency.
- **Alternatives Considered**: A single `xlt` skill. Rejected due to token bloat and increased risk of hallucinations when blending report generation properties with test execution properties.

### Decision 2: Grounded Snippets with Exact Properties Syntax
- **Choice**: Every skill will strictly document real, tested property keys (`com.xceptance.xlt.*`) and verified DSL bindings.
- **Rationale**: Agents rely on exact syntax examples to write valid configuration files without needing multiple trial-and-error runs.
- **Alternatives Considered**: High-level conceptual descriptions. Rejected because coding assistants need verbatim configuration blocks and copy-pasteable patterns.

### Decision 3: Multi-Channel Discovery
- **Choice**: Expose skills via three distinct channels:
  1. Static RFC catalog (`/.well-known/agent-skills/index.json`) for autonomous agents.
  2. Central how-to guide (`/xlt/how-tos/ai-agent-skills/`) with one-click copy commands for humans.
  3. Contextual Blume tip callouts embedded directly in relevant manual pages.
- **Rationale**: Maximizes discoverability for developers whether they are browsing documentation in a browser, copying curl snippets to their terminal, or prompting an autonomous IDE agent.

## Risks / Trade-offs

- **[Risk] Property drift when XLT updates** → **Mitigation**: All skills are co-located in the documentation repository and maintained alongside the manual. Updates to manual pages can be checked against skills during releases.
- **[Risk] Token consumption in coding assistants** → **Mitigation**: Keep individual `SKILL.md` files concise and under 250 lines, focusing on concrete recipes, verified properties, and gotchas.

## Migration Plan

1. Scaffold and author the skill directories and `SKILL.md` files under `./skills/`.
2. Update `content/en/xlt/how-tos/ai-agent-skills.mdx` to include all skills in the catalog.
3. Add Blume `:::tip[Agent Skill]` callouts to the respective manual pages.
4. Run `npm run validate` to ensure zero broken links.
5. Run `npm run build` to verify that `dist/.well-known/agent-skills/` compiles cleanly with the updated discovery index.
