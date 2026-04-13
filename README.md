# SkillTree

A personal life skill tracker — visualize your skills as an interactive node map, rate your proficiency, set goals, and track progress across every area of your life.

## What is SkillTree?

SkillTree lets you:
- Browse a library of **15 life domains** (Fitness, Finance, Career, etc.) with hundreds of nested skills
- Build your personal skill tree on an interactive canvas — each domain radiates outward in a game-style node map
- Rate your proficiency in each skill (0–10) with visual score bars
- Mark skills as **active**, **goal**, or **planned** with color-coded nodes
- Search for any skill and **auto-add it** with all missing ancestors in one click
- Hover nodes for **tooltips** showing status, score, and goal info
- Create **custom skills** not in the library and connect them anywhere
- Edit node names, icons, scores, and status from an in-canvas panel
- Click edges to select/highlight, reconnect by dragging, or delete by dropping in space
- Everything **saves automatically** to localStorage

## Current Status

**Phase 1 (Local Prototype) — Complete.** The app runs locally via `npm run dev`.

Next up: Phase 2 — deploy to Vercel with a real database (Supabase) and prerequisite engine.

## Project Goals

| Goal | Description |
|---|---|
| Personal tracker | Manage your own life skill tree (based on a hand-drawn mind map) |
| Prerequisite engine | "You have X and Y, so you can unlock Z" (Phase 2) |
| Shareable | Multi-user accounts with public skill tree links (Phase 3+) |

## Deployment Phases

| Phase | Hosting | Status |
|---|---|---|
| Phase 1 | Local only (`npm run dev`) | Complete |
| Phase 2 | Vercel + Supabase | Up next |
| Phase 3 | AWS via Terraform | Planned |

## Project Structure

```
skill-tree/
├── app/
│   ├── page.tsx           # Main app — canvas, sidebar, edit panel, all logic
│   ├── SkillNode.tsx      # Custom React Flow node (game-style circular nodes)
│   ├── skillLibrary.ts    # 15 life domains with hundreds of nested skills
│   └── layout.tsx         # Next.js root layout
├── docs/
│   ├── requirements.md    # User stories and feature specs
│   ├── tech-stack.md      # Technology choices with reasoning
│   └── learning-roadmap.md # Phase-by-phase learning plan
├── PLAN.md                # Project status tracker (start here for context)
└── public/                # Static files
```

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — click a domain in the sidebar to start building your tree.

## Documentation

- [PLAN.md](PLAN.md) — project status and progress tracker
- [docs/requirements.md](docs/requirements.md) — what the app needs to do
- [docs/tech-stack.md](docs/tech-stack.md) — what tools we're using and why
- [docs/learning-roadmap.md](docs/learning-roadmap.md) — the step-by-step learning plan

## About

Built by a non-technical business analyst learning cloud/DevOps and web fundamentals through a real project. Every technical decision is documented with a "why" — see [docs/tech-stack.md](docs/tech-stack.md).
