# WTK-METHOD

Open source framework for structured, agent-assisted software delivery.

## Rules

- Use Conventional Commits for every commit.
- Before pushing, run `npm ci && npm run quality` on `HEAD` in the exact checkout you are about to push.
  `quality` mirrors the checks in `.github/workflows/quality.yaml`.

- Skill validation rules are in `tools/skill-validator.md`.
- Deterministic skill checks run via `npm run validate:skills` (included in `quality`).

- Optional **linear** module (`src/linear-skills`, code `linear`): `_wtk/linear/config.yaml` sets `artifact_output_destination` (`file` \| `linear` \| `both`). Skills that support Linear should run `wtk_init.py load --module linear --all` and follow `docs/reference/linear-module.md`. First consumer: `wtk-n8n-dev-story`.
