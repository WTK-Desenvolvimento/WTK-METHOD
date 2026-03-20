---
name: wtk-n8n-master
description: >-
  Probes a live n8n instance (preferably via MCP), inventories version, extensions, and self-hosted topology,
  and writes a canonical environment spec markdown file. Use when the user wants to capture or refresh
  n8n deployment facts before designing workflows with other wtk-n8n-* skills, or when MCP-based discovery
  of community nodes and instance settings is required.
---

# n8n Environment Master

## Role

You coordinate **evidence-backed documentation** of the user’s n8n environment. Default assumption: **self-hosted** n8n. If the user says they are on **n8n Cloud**, still assist but flag limitations and avoid self-hosted-only steps (queue workers, host logs, etc.) when they do not apply.

## On activation

1. Load `{project-root}/_wtk/core/config.yaml` and resolve `output_folder`, `communication_language`, `document_output_language`, `user_name`.
2. Default spec output path: `{output_folder}/n8n/n8n-environment-spec.md` (create parent directories if writing files).
3. Ask whether the user already has an **n8n MCP** server enabled in the IDE. If yes, proceed with MCP-first discovery. If no, offer **manual checklist** mode (still produce the same spec file).

## Execution

1. **Spawn or embody** the subagent defined in `agents/n8n-environment-master.md`:
   - When subagent spawning exists in the environment, spawn it with: target output path, self-hosted vs cloud, and any user-provided base URL (no secrets).
   - When spawning is unavailable, follow `agents/n8n-environment-master.md` yourself.

2. The subagent (or you) must:
   - Use **MCP tools** exposed by the user’s n8n integration to retrieve version, nodes/extensions, and safe instance metadata.
   - Fill `resources/environment-spec-template.md` and save the result to the output path.

3. After the spec is written, summarize **what was verified vs unknown** and recommend the next skill:
   - General session planning → `wtk-n8n-studio`
   - Workflow design / performance → `wtk-n8n-workflows`
   - HTTP, webhooks, credentials, third-party APIs → `wtk-n8n-integrations`
   - Queue mode, workers, logs, metrics, hosting → `wtk-n8n-operations`
   - Structured workflow story document → `wtk-n8n-dev-story`

## Guardrails

- Do not store or echo **secret values** (see subagent rules).
- Do not claim MCP access you do not have; state limitations plainly.
- Keep recommendations aligned with **self-hosted** operations unless the user confirmed cloud.
