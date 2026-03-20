---
story_slug: ''
environment_spec_path: ''
---

# n8n Dev Story — workflow specification

**Goal:** Create or refine a **markdown workflow story** for **self-hosted n8n** that an implementer can follow in the n8n editor without ambiguity.

**Your role:** Business analyst + integration designer for n8n. Communicate in `communication_language` from config; write the story document in `document_output_language`.

**Invocation note:** The skill directory name is `wtk-n8n-dev-story`. On some IDEs this appears as a slash command such as `/wtk-n8n-dev-story`; on others, invoke the skill by name.

---

## INITIALIZATION

### Configuration

Load `{project-root}/_wtk/core/config.yaml` and resolve:

- `user_name`, `communication_language`, `document_output_language`, `output_folder`
- `date` = current UTC date (YYYY-MM-DD) for filenames and headers

### Linear artifact destination (optional)

1. Run `wtk_init.py` from `wtk-init` with `load --module linear --all --project-root {project-root}`.
2. If the command fails or stderr contains `init_required`, treat **`artifact_output_destination` as `file`** (Linear module not installed or not configured).
3. Otherwise read from the JSON:
   - `artifact_output_destination` — `file` | `linear` | `both`
   - `linear_team_key`, `linear_default_project`, `linear_default_labels` (apply when using Linear MCP)

See `{project-root}/_wtk/linear/README.md` (after install) or the framework doc `docs/reference/linear-module.md` for the full contract.

### Paths

- `n8n_dir` = `{output_folder}/n8n` (ensure logical default for outputs)
- `environment_spec` = frontmatter `environment_spec_path` if set, else `{output_folder}/n8n/n8n-environment-spec.md`
- `story_slug` = frontmatter `story_slug` if set; otherwise derive from the workflow title in kebab-case after user confirms
- `story_file` = `{n8n_dir}/workflow-stories/{{story_slug}}.md`

---

## EXECUTION

### Step 1 — Confirm inputs

1. If `n8n-environment-spec.md` is missing, warn that **`wtk-n8n-master`** should be run first for best results, but continue if the user wants.
2. Ask for a **short workflow name** and **primary trigger** (webhook, schedule, manual, sub-workflow).
3. Ask whether this is **greenfield** or **refactor** of an existing workflow (if refactor, request high-level current behavior).

### Step 2 — Draft the story (chat then file)

1. Read `./template-n8n-workflow-story.md` and replace placeholders:
   - `{{WORKFLOW_TITLE}}`, `{{OWNER}}` (use `user_name` if no other owner), `{{DATE}}`
2. Fill every section with concrete content. Use bullet tables for inputs/outputs/credentials.
3. **Credentials:** types and purposes only — never placeholder secret values.
4. Align recommendations with **self-hosted** assumptions from the environment spec when available.

### Step 3 — Persist the story

Let `destination` = `artifact_output_destination` from the Linear section (`file` if that section was skipped).

1. **If `destination` is `file` or `both`:** write the completed story to `story_file` (create `workflow-stories` under `n8n_dir` as needed). Tell the user the exact path.
2. **If `destination` is `linear` or `both`:** use the **Linear MCP** tools available in the IDE (user must enable the Linear MCP server and sign in). Create a new issue or update an existing one if the user provided an issue URL or identifier:
   - **Title:** workflow title (or derive from `story_slug`).
   - **Description:** the full markdown story (same content as the file when `both`).
   - Apply `linear_team_key`, `linear_default_project`, and `linear_default_labels` when the MCP tools support them; if a field is empty, omit or choose interactively with the user.
3. **Credentials:** never put secret values in Linear — keep credential **types** only, as elsewhere in this skill.
4. If Linear MCP is unavailable but `destination` is `linear` or `both`, say so clearly; if `both` or `file`, still write `story_file` when applicable.

### Step 4 — Cross-skill suggestions

Recommend follow-ups as needed:

- Graph / performance review → `wtk-n8n-workflows`
- External API / OAuth depth → `wtk-n8n-integrations`
- Queue / workers / logs → `wtk-n8n-operations`
- New environment facts → `wtk-n8n-master`

### Step 5 — Optional tightening

If the user asks, run a **short review pass**: ambiguous ACs, missing error path, missing idempotency, or untestable acceptance criteria — apply edits in chat, then update the **file** (if used) and/or **Linear issue** (if used) to match.

---

## HALT

Stop earlier only if the user cancels or refuses to provide a minimal workflow goal (name + trigger).
