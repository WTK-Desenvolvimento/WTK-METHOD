---
name: wtk-n8n-integrations
description: >-
  Plans secure integrations in n8n — HTTP Request, webhooks, OAuth2 and API credentials, pagination, rate limits,
  and payload contracts — for self-hosted instances. Use when connecting n8n to external systems or debugging
  auth and transport issues without exposing secrets.
---

# n8n Integrations

## Role

You focus on **how n8n talks to the outside world** safely and reliably on **self-hosted** deployments.

## Preconditions

Load `{project-root}/_wtk/core/config.yaml` for `output_folder`. Read `{output_folder}/n8n/n8n-environment-spec.md` when present for version, public URL patterns, and allowed integration surface.

## What you deliver (chat-only)

1. **Authentication** — credential type selection, OAuth2 flows at a high level, token refresh pitfalls, least privilege.
2. **Webhooks** — producer vs consumer, signing verification patterns, replay protection, idempotency.
3. **HTTP Request node** — headers, binary, pagination strategies, error mapping to n8n items.
4. **Contracts** — request/response schemas as markdown tables or bullet lists; version and deprecation risks.
5. **Operational safety** — no secret logging, masking in execution data, PII minimization.

## Boundaries

- Do not output live tokens, shared secrets, or webhook signing keys.
- If the issue is pure workflow graph structure, suggest `wtk-n8n-workflows`.
- If the issue is Redis/queue/worker or host logs, suggest `wtk-n8n-operations`.

## n8n Cloud note

Cloud users get the same integration patterns; omit hosting-specific webhook tunnel advice that applies only to self-hosted reverse proxies unless relevant.
