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

### Step 3 — Write the document

1. Write the completed story to `story_file` (create `workflow-stories` under `n8n_dir` as needed).
2. Tell the user the exact path.

### Step 4 — Cross-skill suggestions

Recommend follow-ups as needed:

- Graph / performance review → `wtk-n8n-workflows`
- External API / OAuth depth → `wtk-n8n-integrations`
- Queue / workers / logs → `wtk-n8n-operations`
- New environment facts → `wtk-n8n-master`

### Step 5 — Optional tightening

If the user asks, run a **short review pass**: ambiguous ACs, missing error path, missing idempotency, or untestable acceptance criteria — still chat-only edits to the markdown file.

---

## HALT

Stop earlier only if the user cancels or refuses to provide a minimal workflow goal (name + trigger).
