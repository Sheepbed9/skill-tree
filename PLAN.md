# SkillTree — PLAN.md

> **Purpose:** Single source of truth for project status. Start each new Claude session with "Claude, continue with PLAN.md" and Claude will read this file to resume where we left off.
>
> **Last updated:** 2026-04-09 (session 2)
> **Overall progress:** ~33% (Phase 1 ~95% · Phase 2 0% · Phase 3 0%)

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
12. ⏳ First real git commits + push to GitHub

### Phase 2 — Cloud Deployment
1. ⏳ Create GitHub repo and push
2. ⏳ Connect Vercel, deploy to public URL
3. ⏳ Replace localStorage with Supabase
4. ⏳ Prerequisite engine (Next.js API routes)
5. ⏳ "You can unlock X" suggestions

### Phase 3 — AWS + Terraform
1. ⏳ Dockerize the app
2. ⏳ Push image to ECR
3. ⏳ Terraform files: VPC, ECS, RDS, ALB
4. ⏳ `terraform apply` provisions full stack
5. ⏳ CloudWatch logs + alerts

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
- [ ] Auto-chain-add ancestors when clicking a deep search result (currently alerts)
- [ ] First real git commit since Round 2
- [ ] Tooltips with description / prerequisites / goal rating

### Phase 2 — Vercel (0%)
- [ ] GitHub repo created and code pushed
- [ ] Vercel connected to GitHub
- [ ] App live at public URL
- [ ] Supabase database connected
- [ ] Migration from localStorage → Supabase
- [ ] Prerequisite engine API route
- [ ] "You can unlock X" UI

### Phase 3 — AWS (0%)
- [ ] Dockerfile written
- [ ] Image pushed to ECR
- [ ] Terraform: VPC, ECS, RDS, ALB
- [ ] `terraform apply` succeeds
- [ ] App live on AWS
- [ ] CloudWatch logs + alerts
- [ ] Vercel kept as staging

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
| Phase 1 — Local | **95%** | All features done; remaining: auto-chain ancestors, git commit, tooltips |
| Phase 2 — Vercel | 0% | Not started |
| Phase 3 — AWS | 0% | Not started |
| Phase 4 — Advanced | 0% | Not started |
| **Overall project** | **~33%** | Weighted across all 4 phases |

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

**Immediate (pick one to tackle next session):**

1. **First real git commit + GitHub push** — nothing committed since scaffold. Phase 1 is nearly feature-complete. *Unblocks Phase 2.*
2. **Auto-chain-add ancestors** — when clicking a deep search result, walk the ancestry and add each missing parent automatically instead of alerting. *Removes a known UX annoyance.*
3. **Tooltips** — hover a node to see description, prerequisites, goal rating.

**Open design questions to resolve with user:**
- When moving to Supabase in Phase 2, do we migrate existing localStorage trees or reset?

**Bigger next moves (after Phase 1 wraps):**
- Create GitHub repo → push → connect Vercel → first public URL
- Then: Supabase migration + prerequisite engine

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
