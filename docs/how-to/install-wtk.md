---
title: "How to Install Wtk"
description: Step-by-step guide to installing Wtk in your project
sidebar:
  order: 1
---

Use the `npx wtk-method install` command to set up Wtk in your project with your choice of modules and AI tools.

If you want to use a non interactive installer and provide all install options on the command line, see [this guide](./non-interactive-installation.md).

## When to Use This

- Starting a new project with Wtk
- Adding Wtk to an existing codebase
- Update the existing Wtk Installation

:::note[Prerequisites]
- **Node.js** 20+ (required for the installer)
- **Git** (recommended)
- **AI tool** (Claude Code, Cursor, or similar)
:::

## Steps

### 1. Run the Installer

```bash
npx wtk-method install
```

:::tip[Want the newest prerelease build?]
Use the `next` dist-tag:
```bash
npx wtk-method@next install
```

This gets you newer changes earlier, with a higher chance of churn than the default install.
:::

:::tip[Bleeding edge]
To install the latest from the main branch (may be unstable):
```bash
npx github:wtk-code-org/WTK-METHOD install
```
:::

### 2. Choose Installation Location

The installer will ask where to install Wtk files:

- Current directory (recommended for new projects if you created the directory yourself and ran from within the directory)
- Custom path

### 3. Select Your AI Tools

Pick which AI tools you use:

- Claude Code
- Cursor
- Others

Each tool has its own way of integrating skills. The installer creates tiny prompt files to activate workflows and agents — it just puts them where your tool expects to find them.

:::note[Enabling Skills]
Some platforms require skills to be explicitly enabled in settings before they appear. If you install Wtk and don't see the skills, check your platform's settings or ask your AI assistant how to enable skills.
:::

### 4. Choose Modules

The installer shows available modules. Select whichever ones you need — most users just want **Wtk Method** (the software development module).

### 5. Follow the Prompts

The installer guides you through the rest — custom content, settings, etc.

## What You Get

```text
your-project/
├── _wtk/
│   ├── bmm/            # Your selected modules
│   │   └── config.yaml # Module settings (if you ever need to change them)
│   ├── core/           # Required core module
│   └── ...
├── _wtk-output/       # Generated artifacts
├── .claude/            # Claude Code skills (if using Claude Code)
│   └── skills/
│       ├── wtk-help/
│       ├── wtk-persona/
│       └── ...
└── .cursor/            # Cursor skills (if using Cursor)
    └── skills/
        └── ...
```

## Verify Installation

Run `wtk-help` to verify everything works and see what to do next.

**Wtk-Help is your intelligent guide** that will:
- Confirm your installation is working
- Show what's available based on your installed modules
- Recommend your first step

You can also ask it questions:
```
wtk-help I just installed, what should I do first?
wtk-help What are my options for a SaaS project?
```

## Troubleshooting

**Installer throws an error** — Copy-paste the output into your AI assistant and let it figure it out.

**Installer worked but something doesn't work later** — Your AI needs Wtk context to help. See [How to Get Answers About Wtk](./get-answers-about-wtk.md) for how to point your AI at the right sources.
