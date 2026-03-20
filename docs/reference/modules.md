---
title: Official Modules
description: Add-on modules for building custom agents, creative intelligence, game development, and testing
sidebar:
  order: 4
---

Wtk extends through official modules that you select during installation. These add-on modules provide specialized agents, workflows, and tasks for specific domains beyond the built-in core and BMM (Agile suite).

:::tip[Installing Modules]
Run `npx wtk-method install` and select the modules you want. The installer handles downloading, configuration, and IDE integration automatically.
:::

## Optional built-in: n8n (self-hosted)

Skills for **self-hosted n8n** ship inside the WTK Method repository but are **not** installed by default. During installation, enable **WTK n8n (self-hosted)** in the module list (same pattern as BMM — optional, selectable).

- **Code:** `n8n`
- **Default:** off (`default_selected: false`) — opt in when you need n8n assistance
- **Source:** built-in with the framework (no separate npm clone)

**Skills (after install):**

| Skill | Purpose |
| --- | --- |
| `wtk-n8n-master` | Discover instance via MCP (or checklist), write `n8n-environment-spec.md` |
| `wtk-n8n-studio` | Session hub — routes to other n8n skills using the spec |
| `wtk-n8n-workflows` | Workflow design, performance, reliability |
| `wtk-n8n-integrations` | HTTP, webhooks, OAuth, credentials (types only) |
| `wtk-n8n-operations` | Queue mode, workers, logs, metrics, hosting |
| `wtk-n8n-dev-story` | Markdown workflow story before building in the editor |

Outputs use paths from **core** config (e.g. `{output_folder}/n8n/...`). Core must remain installed.

## Wtk Builder

Create custom agents, workflows, and domain-specific modules with guided assistance. Wtk Builder is the meta-module for extending the framework itself.

- **Code:** `bmb`
- **npm:** [`wtk-builder`](https://www.npmjs.com/package/wtk-builder)
- **GitHub:** [wtk-code-org/wtk-builder](https://github.com/wtk-code-org/wtk-builder)

**Provides:**

- Agent Builder -- create specialized AI agents with custom expertise and tool access
- Workflow Builder -- design structured processes with steps and decision points
- Module Builder -- package agents and workflows into shareable, publishable modules
- Interactive setup with YAML configuration and npm publishing support

## Creative Intelligence Suite

AI-powered tools for structured creativity, ideation, and innovation during early-stage development. The suite provides multiple agents that facilitate brainstorming, design thinking, and problem-solving using proven frameworks.

- **Code:** `cis`
- **npm:** [`wtk-creative-intelligence-suite`](https://www.npmjs.com/package/wtk-creative-intelligence-suite)
- **GitHub:** [wtk-code-org/wtk-module-creative-intelligence-suite](https://github.com/wtk-code-org/wtk-module-creative-intelligence-suite)

**Provides:**

- Innovation Strategist, Design Thinking Coach, and Brainstorming Coach agents
- Problem Solver and Creative Problem Solver for systematic and lateral thinking
- Storyteller and Presentation Master for narratives and pitches
- Ideation frameworks including SCAMPER, Reverse Brainstorming, and problem reframing

## Game Dev Studio

Structured game development workflows adapted for Unity, Unreal, Godot, and custom engines. Supports rapid prototyping through Quick Flow and full-scale production with epic-driven sprints.

- **Code:** `gds`
- **npm:** [`wtk-game-dev-studio`](https://www.npmjs.com/package/wtk-game-dev-studio)
- **GitHub:** [wtk-code-org/wtk-module-game-dev-studio](https://github.com/wtk-code-org/wtk-module-game-dev-studio)

**Provides:**

- Game Design Document (GDD) generation workflow
- Quick Dev mode for rapid prototyping
- Narrative design support for characters, dialogue, and world-building
- Coverage for 21+ game types with engine-specific architecture guidance

## Test Architect (TEA)

Enterprise-grade test strategy, automation guidance, and release gate decisions through an expert agent and nine structured workflows. TEA goes well beyond the built-in QA agent with risk-based prioritization and requirements traceability.

- **Code:** `tea`
- **npm:** [`wtk-method-test-architecture-enterprise`](https://www.npmjs.com/package/wtk-method-test-architecture-enterprise)
- **GitHub:** [wtk-code-org/wtk-method-test-architecture-enterprise](https://github.com/wtk-code-org/wtk-method-test-architecture-enterprise)

**Provides:**

- Murat agent (Master Test Architect and Quality Advisor)
- Workflows for test design, ATDD, automation, test review, and traceability
- NFR assessment, CI setup, and framework scaffolding
- P0-P3 prioritization with optional Playwright Utils and MCP integrations

## Community Modules

Community modules and a module marketplace are coming. Check the [Wtk GitHub organization](https://github.com/wtk-code-org) for updates.
