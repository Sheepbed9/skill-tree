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
- Everything **saves automatically** to a Supabase Postgres database
- **"What should I learn next?"** — prerequisite engine surfaces skills you can unlock based on what you already have

## Current Status

**Live on Vercel** at [skill-tree-ecru.vercel.app](https://skill-tree-ecru.vercel.app/). Phase 3 (AWS via Terraform) is also working — the full stack can be provisioned on demand with `terraform apply` and torn down with `terraform destroy`.

See [PLAN.md](PLAN.md) for current progress.

## Project Goals

| Goal | Description |
|---|---|
| Personal tracker | Manage your own life skill tree (based on a hand-drawn mind map) |
| Prerequisite engine | "You have X and Y, so you can unlock Z" (Phase 2) |
| Shareable | Multi-user accounts with public skill tree links (Phase 3+) |

## Deployment Phases

| Phase | Hosting | Status |
|---|---|---|
| Phase 1 | Local (`npm run dev`) | Complete |
| Phase 2 | Vercel + Supabase | Live |
| Phase 3 | AWS via Terraform (ECS Fargate + ALB) | Working — provisioned on demand |
| Phase 4 | Multi-user, auth, sharing | Planned |

## Project Structure

```
skill-tree/
├── app/                    # Next.js app — page, custom node, skill library
├── infra/                  # Terraform — AWS Fargate stack (Phase 3)
├── docs/                   # Requirements, tech stack, stack-explained
├── Dockerfile              # Multi-stage build for AWS deployment
├── PLAN.md                 # Project status tracker (start here)
└── public/                 # Static files
```

## Getting Started

**Try it live:** [skill-tree-ecru.vercel.app](https://skill-tree-ecru.vercel.app/) — no setup needed.

**Or run locally:**

```bash
npm install
npm run dev
```

Then open http://localhost:3000. (You'll need a `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to talk to the database.)

## Documentation

- [PLAN.md](PLAN.md) — project status and progress tracker
- [docs/stack-explained.md](docs/stack-explained.md) — every piece of tech in this project, why it was chosen, and what it replaces (written for non-technical readers)
- [docs/requirements.md](docs/requirements.md) — what the app needs to do
- [docs/tech-stack.md](docs/tech-stack.md) — what tools we're using and why
- [docs/learning-roadmap.md](docs/learning-roadmap.md) — the step-by-step learning plan

## About

Built by a non-technical business analyst learning cloud/DevOps and web fundamentals through a real project. Every technical decision is documented with a "why" — see [docs/tech-stack.md](docs/tech-stack.md).
