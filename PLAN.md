# SkillTree — PLAN.md

> **Purpose:** Single source of truth for project status. Start each new Claude session with "Claude, continue with PLAN.md" and Claude will read this file to resume where we left off.
>
> **Last updated:** 2026-05-08 (session 7)
> **Overall progress:** ~80% (Phase 1 100% · Phase 2 100% · Phase 3 ~85% · Phase 4 0%)

---

## 1. General Work Plan

**What we're building:** A personal life skill tracker web app — interactive node map of skills with proficiency ratings, goals, prerequisites, and eventually multi-user sharing.

**Why:** Digitizes user's hand-drawn mind map. Also the primary learning vehicle for web fundamentals → CI/CD → AWS + Terraform.

**Approach:** Ship in three deployment phases, learning one layer of the stack at a time.

| Phase | Goal | Hosting | Data | Target |
|---|---|---|---|---|
| 1 | Working local prototype | `npm run dev` | localStorage → JSON file | 2026-04-15 |
| 2 | Live on the internet with CI/CD | Vercel | Supabase (Postgres) | Week 2 |
| 3 | Cloud infrastructure as code | AWS ECS | AWS RDS | Week 3–4 |
| 4 | Advanced features | — | — | Ongoing |

**Key files (all under `C:\Users\Admin\skill-tree\`):**
- Code: [app/page.tsx](app/page.tsx), [app/SkillNode.tsx](app/SkillNode.tsx), [app/skillLibrary.ts](app/skillLibrary.ts)
- Planning docs: [docs/requirements.md](docs/requirements.md), [docs/tech-stack.md](docs/tech-stack.md), [docs/learning-roadmap.md](docs/learning-roadmap.md), [docs/Chat.txt](docs/Chat.txt)
- Project intro: [README.md](README.md)
- Agent guardrails: [AGENTS.md](AGENTS.md) — Next.js in this repo may differ from training data; read `node_modules/next/dist/docs/` before writing Next.js-specific code.

---

## 2. Implementation Stages

### Phase 1 — Local Prototype (current)
1. ✅ Scaffold Next.js + React Flow
2. ✅ Canvas with draggable nodes + edges
3. ✅ Skill library sidebar with search + infinite nesting
4. ✅ Custom game-style nodes (tiered, glowing)
5. ✅ Radial per-domain layout + subtree drag
6. ✅ Edit panel for selected node
7. ✅ localStorage persistence (survives refresh)
8. ✅ Replace `window.prompt` for custom skill creation with inline sidebar form
9. ✅ Seed all 15 life domains (was 2/15, now 15/15)
10. ✅ Status-based color coding (active / goal / planned)
11. ✅ Edge UX: click-to-select with highlight, wider interaction area
12. ✅ Auto-chain-add ancestors when clicking a deep search result
13. ✅ Node tooltips (name, status, score, goal rating, prerequisites)
14. ✅ First real git commit (2026-04-09, session 3)
15. ✅ Pushed to GitHub (https://github.com/sean-yap/skill-tree)

### Phase 2 — Cloud Deployment
1. ✅ Create GitHub repo and push (https://github.com/sean-yap/skill-tree)
2. ✅ Connect Vercel, deploy to public URL (https://skill-tree-ecru.vercel.app/)
3. ✅ Replace localStorage with Supabase (auto-migration on first load)
4. ✅ Prerequisite engine ("What should I learn next?" button)
5. ✅ "You can unlock X" suggestions (recommendations panel)

### Phase 3 — AWS + Terraform
1. ✅ Dockerize the app (Dockerfile + .dockerignore, standalone Next.js output, multi-stage build, builds successfully)
2. ✅ Run container locally — `docker run -p 3000:3000 skill-tree` boots Next.js 16.2.2, app loads in browser, Supabase env vars baked in via `--build-arg`
3. ✅ Push image to ECR — repo `skill-tree` in `ap-southeast-1`, account `176777036768`, URI `176777036768.dkr.ecr.ap-southeast-1.amazonaws.com/skill-tree:latest`
4. ✅ Terraform files: VPC, ECS, ALB (kept Supabase, RDS deferred) — 6 files in `infra/`, 18 resources
5. ✅ `terraform apply` provisions full stack — verified with live ALB URL serving the app, Supabase connected, all 18 resources created
6. ✅ `terraform destroy` tested — clean teardown, full apply→destroy cycle proven
7. ⏳ CloudWatch logs + alerts (logs are live; alerts not yet configured)
8. ⏳ HTTPS via ACM (HTTP only currently)
9. ⏳ Optional: migrate Supabase → RDS Postgres

### Phase 4 — Advanced
1. ⏳ Python microservice for prerequisite engine
2. ⏳ Lambda serverless variant
3. ⏳ User auth + multi-user support

---

## 3. Checklist

### Phase 1 — Local (~85% complete)
- [x] Node.js v24 + npm v11 installed
- [x] Next.js project scaffolded at `C:\Users\Admin\skill-tree\`
- [x] React Flow (`@xyflow/react`) integrated
- [x] Skill tree renders with nodes + edges
- [x] Drag / reposition nodes
- [x] Subtree drag (drag parent → descendants follow)
- [x] Add / edit / delete skills via UI
- [x] Infinite nesting (recursive library data model)
- [x] Side panel skill library with collapsible tree + search
- [x] Click domain → becomes standalone tree root
- [x] Custom skill creation (via `window.prompt` — needs upgrade)
- [x] Edge rerouting (drag endpoint to another handle, drop in space = delete)
- [x] Left-drag box-select, right/middle-drag pan
- [x] Custom game-style nodes (circular, glowing, tier-themed)
- [x] Score editing panel (live updates name/icon/score)
- [x] Radial per-domain layout (`layoutAllDomains`)
- [x] **Persistence via localStorage** (`STORAGE_KEY = 'skilltree:v1'`)
- [x] Physical Fitness domain seeded (4–5 layers)
- [x] Nutrition & Cooking domain seeded (3–5 layers)
- [x] All 15 life domains seeded (Health & Recovery, Grooming & Style, Mental & Emotional, Relationships & Social, Communication, Career & Work, Technical / Engineering, Finance & Trading, Learning & Knowledge, Creative & Artistic, Home & Practical, Outdoors & Adventure, Hobbies & Play)
- [x] Replace `window.prompt` in `handleAddCustomSkill` with inline sidebar form
- [x] Status-based color coding (active / goal / planned) — status field on nodes, visual overrides in SkillNode, status toggle buttons in edit panel
- [x] Edge UX: click-to-select with yellow highlight, `interactionWidth: 20` for easier clicking, `edgesReconnectable` prop
- [x] Auto-chain-add ancestors when clicking a deep search result
- [x] First real git commit (2026-04-09)
- [x] Tooltips with description / prerequisites / goal rating
- [x] Pushed to GitHub (https://github.com/sean-yap/skill-tree)

### Phase 2 — Vercel (100%)
- [x] GitHub repo created and code pushed
- [x] Vercel connected to GitHub
- [x] App live at public URL (https://skill-tree-ecru.vercel.app/)
- [x] Supabase database connected (env vars on Vercel)
- [x] Migration from localStorage → Supabase (auto-migrates on first load)
- [x] Prerequisite engine ("What should I learn next?" button)
- [x] "You can unlock X" recommendations panel

### Phase 3 — AWS (~85%)
- [x] Dockerfile written (multi-stage: deps → builder → runner, uses Next.js standalone output, runs as non-root user)
- [x] `next.config.ts` set to `output: "standalone"`
- [x] `.dockerignore` created
- [x] `docker build` succeeds locally (passes `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` via `--build-arg` so they're baked into the client bundle)
- [x] `docker run` tested locally (container boots, app loads at localhost:3000, functional checks pass — user skipped DevTools health checks)
- [x] AWS account created (session 5)
- [x] IAM user `skill-tree-cli` created with `AdministratorAccess` policy + access key generated
- [x] AWS CLI v2 installed on laptop
- [x] AWS CLI configured (`aws sts get-caller-identity` works) — default region set during `aws configure`
- [x] ECR repository created (`skill-tree` in `ap-southeast-1`, scan-on-push enabled)
- [x] Docker authenticated to ECR (`aws ecr get-login-password ...` → `Login Succeeded`)
- [x] Local image tagged with ECR URI and pushed (digest `sha256:81342a2c943d...`)
- [x] Terraform v1.15.2 installed (`C:\tools\terraform\`, on PATH)
- [x] `infra/` scaffolding: `versions.tf`, `providers.tf`, `variables.tf`, `terraform.tfvars`, `outputs.tf`
- [x] `terraform init` (downloaded AWS provider v5.x, lock file committed)
- [x] Resource files written: `vpc.tf`, `security.tf`, `iam.tf`, `ecs.tf`, `alb.tf` (18 resources total)
- [x] `terraform plan` clean (18 to add, 0 to change, 0 to destroy)
- [x] `terraform apply` succeeded — full stack provisioned in ~7 min
- [x] App live on AWS — verified at ALB DNS, Supabase still connected, end-to-end working
- [x] `terraform destroy` clean teardown
- [x] AWS Console verified — Tag Editor shows 12/18 (others are sub-resources or global IAM, expected)
- [x] CloudWatch log group `/ecs/skill-tree` configured with 7-day retention
- [ ] CloudWatch alerts (CPU, memory, ALB 5xx, task count)
- [ ] HTTPS listener via ACM certificate
- [ ] Optional: migrate Supabase → RDS Postgres
- [x] Vercel kept as staging (Vercel deploys still active alongside AWS)

### Phase 4 — Advanced (0%)
- [ ] Python prerequisite engine microservice
- [ ] Lambda serverless variant
- [ ] User auth (NextAuth or Cognito)
- [ ] Multi-user DB schema
- [ ] Shareable public links

---

## 4. Progress Percentage

| Phase | Progress | Notes |
|---|---|---|
| Phase 1 — Local | **100%** | Complete |
| Phase 2 — Vercel | **100%** | Live at skill-tree-ecru.vercel.app with Supabase |
| Phase 3 — AWS | ~85% | Full stack provisioned + destroyed via Terraform; alerts/HTTPS/RDS deferred |
| Phase 4 — Advanced | 0% | Not started |
| **Overall project** | **~80%** | Phases 1 & 2 complete, Phase 3 essentially done (apply→destroy proven), Phase 4 not started |

**Known tech debt (tracked, not blocking):**
- Inline styles everywhere — should migrate to Tailwind or CSS modules
- No undo/redo
- No `Node.data` types in state (uses `satisfies` at creation only)
- Search capped at 30 results, no pagination
- Radial layout doesn't detect cross-branch collisions
- Auto-layout resets manual drag positions on add/delete
- Subtree-drag BFS runs on every position change (fine for small trees)

---

## 5. Next Actions

**Phase C — Terraform + run on AWS (DONE, session 7, 2026-05-08):**

Full apply → poke → destroy cycle proven. Stack is reproducible from `infra/` — `terraform apply` brings it back identically in ~7 min, `terraform destroy` tears it down in ~5 min. Cost during the experiment: ~$0.05–0.20.

Decisions made along the way:
- Kept Supabase (skipped RDS for now — app already works against it; RDS migration is a future stretch goal)
- ECS tasks in public subnets (avoids ~$32/mo NAT Gateway; security via SG-only-from-ALB pattern)
- Smallest Fargate task: 256 CPU / 512 MB (~$0.30/day if left on)
- HTTP listener only (HTTPS deferred to ACM/Route53 session)
- `default_tags = { Project, ManagedBy }` on AWS provider — every resource gets tagged automatically
- Supabase `NEXT_PUBLIC_*` vars baked into image at build time, not in ECS task env (Next.js inlines NEXT_PUBLIC_ at build, runtime env vars would have no effect — comment in `ecs.tf`)

**Remaining Phase 3 polish (deferred, not blocking):**
- CloudWatch alerts: CPU, memory, ALB 5xx, ECS task count drops to 0
- HTTPS via ACM cert + DNS record
- RDS migration (only if learning value justifies the schema migration work)

**Phase 4 — when ready to start:**
- Python prerequisite engine microservice (likely as a Lambda or sidecar container)
- User auth (NextAuth or AWS Cognito)
- Multi-user DB schema + shareable public links

**When resuming:** Docker Desktop won't be running. AWS CLI config persists. ECR image stays in AWS (~$0.10/mo). To bring the stack back: `cd infra && terraform apply`. To stop bill: `terraform destroy`.

**(Optional revisit)** Run the DevTools health checks on the local container before going to AWS — user skipped these in session 5/6.

**When resuming:** Docker Desktop won't be running — start it. AWS CLI config persists. ECR image stays in AWS indefinitely (small storage cost). If gap > ~5 days, check Supabase isn't paused.

**Bigger next moves:**
- After ECR push: write Terraform for VPC + ECS Fargate + RDS Postgres + ALB
- Decide: keep Supabase or migrate to AWS RDS? (Supabase is simpler; RDS is the learning goal)
- CloudWatch logs + alerts
- Keep Vercel as staging environment

---

## 6. Instruction to Claude — Maintain This File

**At the END of every session, before closing:**

1. Update the **Last updated** date at the top of this file.
2. Update **Overall progress** percentage and per-phase percentages in §4 if anything shifted.
3. Move any completed checklist items from `[ ]` to `[x]` in §3.
4. Add any new discoveries, decisions, or blockers to §5 **Next Actions**.
5. If we introduced new tech debt or limitations, log them under §4 **Known tech debt**.
6. If the user made a design decision that resolves an **Open design question**, delete that question and fold the answer into the relevant section.
7. Keep this file concise — prune stale "Next Actions" that were completed; don't let the file grow unbounded.
8. **Do not rewrite the whole file** — edit in place using the Edit tool to preserve structure and history.
9. If a Round 3 / Round 4 feedback pass happens, add a brief dated note under §2 **Implementation Stages** so future-Claude can see what changed.

**At the START of every session:**

1. Read this file first.
2. Spot-check reality against the file: the file can be stale. If the user mentions something that contradicts the file, trust the user and update the file.
3. Read [app/page.tsx](app/page.tsx), [app/SkillNode.tsx](app/SkillNode.tsx), [app/skillLibrary.ts](app/skillLibrary.ts) — the entire app lives in these three files.
4. Respect [AGENTS.md](AGENTS.md): Next.js in this repo may differ from training data; read `node_modules/next/dist/docs/` before writing Next.js-specific code.
5. Remember the user is a **non-technical BA** — explain the "why" not just the "what", prefer tables and analogies, never assume prior web/React knowledge.
