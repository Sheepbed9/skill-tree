# SkillTree — Tech Stack Decisions

> Every decision here is logged with reasoning so we can revisit it as the project evolves.
> Written for a non-technical reader — explanations use plain English.

---

## The Big Picture

```
[Your Browser]
      ↓
[Next.js Frontend]     ← what you see (React Flow node map)
      ↓
[Next.js API Routes]   ← backend logic (prerequisite engine, data access)
      ↓
[Data Storage]         ← JSON file (now) → Supabase → AWS RDS (later)
```

---

## Frontend

**Chosen: Next.js + React Flow**

| Technology | Role | Why chosen |
|---|---|---|
| Next.js | The main app framework | Combines frontend + backend in one codebase. Deploys to Vercel with zero config. Industry standard. |
| React | UI building blocks (inside Next.js) | The most popular way to build interactive web apps. Next.js is built on React. |
| React Flow | Drag-and-drop node map | Purpose-built for interactive node graphs — matches the mind map reference exactly. Free and open source. |
| JavaScript (JS) | Programming language | The language of the web. All of the above runs on JS. |
| HTML + CSS | Structure and styling | Handled within Next.js components — you write them as part of React, not separate files. |

**Alternatives considered and why not chosen:**

| Alternative | Why not |
|---|---|
| Streamlit (Python only) | Too limited for interactive drag-and-drop UIs. Not designed for multi-user apps. |
| Raw HTML/CSS/JS | Too much manual work. No component reuse. Not how modern apps are built. |
| Vue / Angular | Smaller ecosystem for this use case. React has better tooling and more resources for learners. |

---

## Backend

**Chosen: Next.js API Routes**

Next.js includes a built-in backend — no separate server needed. When you need server-side logic (e.g. the prerequisite engine), you write it in the same project under `/app/api/`.

This means one codebase, one language (JavaScript), one deployment.

**Why not a separate Python backend (yet):**
- Adds complexity in Phase 1 — two codebases, two languages, two servers running locally
- Python will be introduced in Phase 4 as the prerequisite engine is rewritten as a microservice
- Learning one language first is more effective than splitting attention

---

## Database

| Phase | Storage | Why |
|---|---|---|
| Phase 1 (local) | JSON file | Zero setup. A JSON file is just structured text — good enough to start learning. |
| Phase 2 (Vercel) | Supabase (PostgreSQL) | Free tier, connects easily to Next.js, hosted in the cloud — no server to manage. |
| Phase 3 (AWS) | AWS RDS (PostgreSQL) | Managed database on AWS — pairs naturally with Terraform and ECS deployment. |

> **PostgreSQL** is a type of database. Think of it as a very structured spreadsheet that your app can read and write to very fast.

---

## Deployment

| Phase | Platform | How it works | What you learn |
|---|---|---|---|
| Phase 1 | Local machine | Run `npm run dev` in your terminal | Local development, file structure, JS basics |
| Phase 2 | Vercel | Push code to GitHub → Vercel auto-deploys | CI/CD, environment variables, cloud hosting basics |
| Phase 3 | AWS | Terraform provisions EC2/ECS + RDS + networking | Infrastructure as code, AWS services, containers |

**Why Vercel before AWS:**
Vercel removes all infrastructure complexity so you can focus on learning the app. AWS + Terraform is then a deliberate, focused learning project — not a blocker on week 1.

---

## AWS Services Map (Phase 3 Preview)

> These are services your team already uses. Here's how each one fits into SkillTree.

| AWS Service | What it does (plain English) | Role in SkillTree |
|---|---|---|
| EC2 | A virtual computer in the cloud | Could host the Next.js app directly |
| ECS | Runs Docker containers (packaged apps) | Preferred way to run the Next.js app on AWS |
| ECR | Stores Docker container images | Where we push the packaged app before ECS runs it |
| RDS | Managed database service | Hosts the PostgreSQL database |
| S3 | File storage in the cloud | Stores static files, exports, backups |
| CloudWatch | Logs and monitoring | Tracks errors, performance, and usage |
| CloudFormation | AWS-native infrastructure as code | Alternative to Terraform — does the same job |
| Terraform | Infrastructure as code tool (works across clouds) | Provisions all the above with config files |
| Lambda | Serverless functions | Could run the prerequisite engine on demand |

---

## Summary Decision

| Category | Choice | Revisit when |
|---|---|---|
| Framework | Next.js | Never — this is the right call for Vercel + full-stack |
| Node visualization | React Flow | If we need more advanced graph algorithms |
| Backend | Next.js API routes | Phase 4 — add Python microservice for prerequisite engine |
| Database | JSON → Supabase → RDS | Upgrade each phase |
| Deployment | Local → Vercel → AWS | Progress through phases |
