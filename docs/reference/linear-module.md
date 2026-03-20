---
title: Linear module (artifact destinations)
description: Optional per-project config to send skill outputs to Linear via MCP, files, or both.
sidebar:
  order: 5
---

## Purpose

The **linear** module is an optional, built-in add-on (same idea as n8n skills: opt in at install). It stores settings in `{project-root}/_wtk/linear/config.yaml` so **agents know whether to write artifacts to disk, to Linear, or both**.

Phase 1 is **destination only**: there is no webhook automation. The agent uses **Linear MCP** tools exposed by your IDE (Cursor, etc.) when you choose `linear` or `both`.

## Install and config

1. Run `npx wtk-method install` and enable **WTK Linear (issue-backed artifacts)** (or re-run the installer to add the module).
2. Answer the prompts, or edit `_wtk/linear/config.yaml` after install.

### Keys (written by `wtk-init`)

| Key | Meaning |
| --- | --- |
| `artifact_output_destination` | `file` \| `linear` \| `both` |
| `linear_team_key` | Team key from the Linear URL (optional but recommended) |
| `linear_default_project` | Default project name for new issues (optional) |
| `linear_default_labels` | Comma-separated labels (optional; labels must exist in Linear) |

The file also contains **core** fields (e.g. `output_folder`) merged by `wtk-init`, same as other modules.

## IDE setup

- Enable a **Linear MCP** server in your IDE and sign in.
- Do **not** put API tokens in `config.yaml`; auth stays in MCP settings.

## Contract for skill authors

1. On activation, resolve Linear settings with `wtk_init.py`:
   - `check --module linear --project-root ...` then `load --module linear --all ...`, or
   - If `load` fails with `init_required`, treat `artifact_output_destination` as **`file`** (linear module not configured).
2. If destination is `linear` or `both`, use **Linear MCP** to create or update an issue (title + body markdown). Apply `linear_team_key`, `linear_default_project`, and `linear_default_labels` when the MCP tools support them.
3. Never paste **secrets** into Linear; keep credential types as names only (same as other WTK docs).

## Future (not in phase 1)

Other MCP destinations (e.g. Outline) can follow the same pattern as **separate optional modules** with their own `_wtk/{module}/config.yaml` and `artifact_output_destination` or a dedicated key, so skills can branch without overloading the Linear module.
