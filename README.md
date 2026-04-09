# SkillTree

A personal life skill tracker and dependency engine — visualize your skills as an interactive node map, track your progress, and discover what you can unlock next.

## What is SkillTree?

SkillTree lets you:
- Map your life skills as an interactive, drag-and-drop node tree
- Rate your current proficiency in each skill (e.g. 3/10)
- Set goals and milestones per skill
- Define prerequisites between skills
- See which skills you're eligible to learn next based on what you already know

## Project Goals

| Goal | Description |
|---|---|
| Personal tracker | Manage your own life skill tree (based on a hand-drawn mind map reference) |
| Prerequisite engine | "You have X and Y prerequisites, so you can unlock Z" |
| Shareable | Others can create accounts and manage their own skill trees |

## Deployment Phases

| Phase | Hosting | Purpose |
|---|---|---|
| Phase 1 | Local only (`npm run dev`) | Build the app, learn the fundamentals |
| Phase 2 | Vercel | Fast, zero-config deployment — learn CI/CD basics |
| Phase 3 | AWS via Terraform | Learn cloud infrastructure as code |

## Planned Project Structure

```
skilltree/
├── app/              # Next.js pages and API routes (backend logic lives here too)
├── components/       # Reusable UI pieces (SkillNode, SkillTree, Sidebar, etc.)
├── data/             # JSON data files for local storage (Phase 1)
├── lib/              # Core logic (prerequisite engine, data helpers)
└── public/           # Images and static files
```

## Who is this for?

Built by a non-technical business analyst learning cloud/DevOps and web fundamentals through a real project. Every technical decision in this project is documented with a "why" — see [tech-stack.md](tech-stack.md).

## Where to start

1. Read [requirements.md](requirements.md) — what the app needs to do
2. Read [tech-stack.md](tech-stack.md) — what tools we're using and why
3. Read [learning-roadmap.md](learning-roadmap.md) — the step-by-step learning plan
