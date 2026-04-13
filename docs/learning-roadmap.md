# SkillTree — Learning Roadmap

> This project is a vehicle for learning real technical skills. Each phase builds on the last.
> Written for a non-technical business analyst — no prior experience assumed.

---

## Phase 1 — Local Development (Week 1, target: 2026-04-15)

**Goal:** A working skill tree app running on your own machine.

### What you'll learn
- What a modern web app's file and folder structure looks like
- JavaScript basics — through doing, not through a course
- React components — what they are, how they connect
- React Flow — drag-and-drop node maps
- How a local development server works (`npm run dev`)
- Git basics — saving your work and tracking changes

### Milestones
- [x] Node.js installed, Next.js project scaffolded (`npx create-next-app`)
- [x] Skill tree renders with sample hard-coded data
- [x] Nodes are draggable and repositionable (React Flow)
- [x] Add / edit / delete skills via UI
- [x] Infinite nesting — any node can have children, no depth limit
- [x] Side panel with skill library organized by domain
- [x] Click domain from side panel → auto-populates child nodes on canvas
- [x] Custom skills — user can add skills not in the library
- [x] Data saves to localStorage (persists on refresh)
- [x] Color-coding by status (active / goal / planned)
- [x] Skill library seed data created (15 domains with hundreds of nested skills)

### Tools introduced this phase
`Node.js` · `npm` · `Next.js` · `React` · `React Flow` · `TypeScript` · `localStorage` · `Git` · `GitHub CLI`

---

## Phase 2 — Cloud Deployment via Vercel (Week 2)

**Goal:** Your app is live on the internet and auto-deploys whenever you push new code.

### What you'll learn
- GitHub — creating repositories, pushing code
- What CI/CD means: Continuous Integration / Continuous Deployment
  - Plain English: every time you push code to GitHub, Vercel automatically builds and deploys it — no manual steps
- Environment variables — how to keep secrets (API keys, database passwords) out of your code
- Supabase — connecting a real hosted database to replace the JSON file
- How the prerequisite engine works as backend logic

### Milestones
- [ ] GitHub repository created and code pushed
- [ ] Vercel account connected to GitHub repository
- [ ] App live at a public URL (e.g. `skilltree.vercel.app`)
- [ ] Supabase database connected (replaces JSON file)
- [ ] Prerequisite engine: define dependencies between skills
- [ ] "You can unlock X" suggestions working

### Tools introduced this phase
`GitHub` · `Vercel` · `CI/CD` · `Supabase` · `PostgreSQL` · `Environment Variables`

---

## Phase 3 — AWS + Terraform (Week 3–4)

**Goal:** Migrate the app to AWS infrastructure, provisioned entirely from code files.

### What you'll learn
- What infrastructure as code means — and why it matters
- Docker — packaging your app into a portable container
  - Plain English: a container is like a lunchbox with everything your app needs to run, so it works the same everywhere
- ECR — storing your Docker image on AWS
- ECS — running your container on AWS (this is what your team likely uses)
- RDS — managed PostgreSQL database on AWS
- CloudWatch — logs, errors, and monitoring dashboards
- Terraform — writing `.tf` files that describe your whole AWS setup, then running `terraform apply` to build it

### Milestones
- [ ] App containerized with Docker (`Dockerfile` written)
- [ ] Docker image built and pushed to ECR
- [ ] Terraform files written for: ECS, RDS, networking (VPC), load balancer
- [ ] `terraform apply` provisions the full stack on AWS
- [ ] App live on AWS at a public URL
- [ ] CloudWatch logs and basic alerts configured
- [ ] Old Vercel deployment kept as staging environment

### AWS Architecture

```
Internet
    ↓
[Load Balancer]             ← distributes incoming traffic
    ↓
[ECS Task]                  ← runs your Next.js app (Docker container pulled from ECR)
    ↓              ↓
[RDS (PostgreSQL)]    [S3]  ← database / static file storage

Supporting services:
[ECR]          ← stores your Docker image
[CloudWatch]   ← logs and monitoring
[IAM]          ← permissions and access control
[VPC]          ← private network that connects everything

All of the above is provisioned by:
[Terraform]    ← you write .tf files, run terraform apply, AWS builds it
```

### Tools introduced this phase
`Docker` · `ECR` · `ECS` · `RDS` · `S3` · `CloudWatch` · `IAM` · `VPC` · `Terraform`

---

## Phase 4 — Advanced Features (Ongoing)

| Topic | What it adds | Why it's valuable |
|---|---|---|
| Python microservice | Rewrite prerequisite engine in Python | First real Python backend — connects Python skill tree goal to this project |
| Lambda | Run prerequisite engine as a serverless function | Learn serverless architecture — very common in modern AWS setups |
| User authentication | Login with NextAuth or AWS Cognito | Learn identity and access management |
| Multi-user support | Each user has their own skill tree | Learn database design with relationships |
| Skill library | Shared pool of community skills | Learn public APIs and data modeling |
| Mobile app | React Native version | Learn cross-platform development |

---

## How This Maps to Your Personal Skill Tree

| Your Skill Tree Goal | Covered in |
|---|---|
| Python | Phase 4 — prerequisite engine microservice |
| Work / Technical skills | All phases |
| Product Management (understanding what engineers build) | All phases — you're now building it yourself |
| Financial Literacy | AWS cost management and billing in Phase 3 |

---

## Key Terms Glossary

| Term | Plain English |
|---|---|
| Frontend | What the user sees and interacts with in the browser |
| Backend | Logic that runs on a server — not visible to users |
| Database | Where data is stored permanently |
| API | A contract that lets the frontend and backend talk to each other |
| Component | A reusable piece of UI (e.g. a skill node, a sidebar) |
| Repository (repo) | A folder tracked by Git — your project's home on GitHub |
| CI/CD | When you push code, it automatically gets tested and deployed |
| Container (Docker) | A packaged version of your app that runs the same anywhere |
| Infrastructure as Code | Describing servers and databases in config files instead of clicking in a UI |
| Serverless | Code that runs on demand — no permanent server sitting idle |
| Environment Variable | A setting stored outside your code — used for secrets like passwords |
| Load Balancer | Distributes incoming web traffic across multiple servers |
| VPC | A private network on AWS — your resources talk to each other inside it |
