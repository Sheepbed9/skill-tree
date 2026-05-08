# SkillTree Stack — Explained

> A reference document explaining every piece of technology used in this project, why it was chosen, and what it replaces.
> Written for a non-technical reader. Jargon is **bolded** on first use.

---

## 1. The starting point: local development

### What ran on your laptop

When you ran `npm run dev`, three things came together:

1. **Source code** — the `.tsx`, `.ts`, and `.css` files in `C:\Users\Admin\skill-tree\` that you wrote. These are plain text files. They do nothing on their own.
2. **Node.js** — a **runtime** installed on your Windows machine. A runtime is a program that reads and executes code written in a particular language. Node.js executes JavaScript and TypeScript outside of a browser. Without Node.js installed, your source code cannot run on your machine.
3. **node_modules** — a folder containing third-party code your app depends on (React, Next.js, Supabase client, etc.). These were downloaded by **npm** (Node Package Manager) from the **npm registry**, a public catalog at `registry.npmjs.org` that hosts hundreds of thousands of open-source JavaScript packages. The list of which packages your app needs lives in `package.json`.

### What "running" actually meant

`npm run dev` started a **development server** — a Node.js process that:
- Watched your source files for changes
- **Compiled** TypeScript into JavaScript on the fly
- Served the resulting web pages to your browser at `http://localhost:3000`

`localhost` is a special hostname that means "this same machine." Port `3000` is just a number Next.js picks by default. So `localhost:3000` translates to "the program on my own laptop listening on port 3000."

### Where was the app "hosted"?

**Your laptop was the host.** There was no separate server. The app was reachable only from your machine, only while `npm run dev` was running. Close the terminal, the app dies. Turn off the laptop, the app is gone.

This is fine for development but useless for sharing the app with others.

### Where was your data stored?

In **localStorage** — a built-in browser feature that stores data as text on the user's device, in the browser itself. Data was tied to a single browser on a single device. Switching browsers meant starting from scratch.

---

## 2. Vercel — the first hosting platform

### What Vercel does

**Vercel** is a **hosting platform** — specifically a **PaaS** (Platform-as-a-Service). A PaaS is a service where you give it your source code and it runs the app for you on its own servers. You don't manage the servers, the operating system, or networking.

For this project, Vercel does four things:

| Function | What it means |
|---|---|
| **Hosting** | Runs your Next.js app 24/7 on Vercel's servers, not your laptop |
| **CI/CD** (Continuous Integration / Continuous Deployment) | Watches your GitHub repo. Every time you `git push`, Vercel automatically rebuilds and redeploys the app |
| **Public URL** | Gives the app an address anyone on the internet can visit (`skill-tree-ecru.vercel.app`) |
| **HTTPS** | Provides automatic SSL certificates so traffic is encrypted |

### What Vercel replaced

Vercel replaced **your laptop as the host**. Before Vercel, your app only existed on your machine. After Vercel, it lives on the public internet independent of whether your laptop is on.

### Was Vercel essential?

**No.** Other platforms could have done the same job:
- **Netlify** — similar PaaS, originally for static sites
- **Cloudflare Pages** — similar PaaS, often free at small scale
- **AWS Amplify** — Amazon's PaaS equivalent
- A raw **virtual machine** anywhere — would have required you to set up the OS, install Node.js, configure networking, etc.

Vercel was chosen because the company that builds Vercel also builds Next.js, so the integration is the most polished and requires the least configuration. Path of least resistance for the "first deployment" learning step.

---

## 3. Supabase — the remote database

### What Supabase does

**Supabase** is a **BaaS** (Backend-as-a-Service). It provides:

- A managed **PostgreSQL** database — a **relational database**, meaning data is stored in tables with rows and columns, with strict types and relationships between tables
- An auto-generated **REST API** (a way for your app to send HTTP requests like "give me all rows in `nodes` table")
- A JavaScript **client library** (`@supabase/supabase-js`) — code you import in your app that wraps the REST calls in convenient functions
- **Authentication** services (we are not currently using this)
- **File storage** services (we are not currently using this)

### What Supabase replaced

Supabase replaced **localStorage**, the browser-based storage you used in Phase 1.

| | localStorage | Supabase |
|---|---|---|
| Where data lives | Inside the user's browser, on their device | On Supabase's servers, accessible over the internet |
| Persists across devices? | No | Yes |
| Persists across browsers? | No | Yes |
| Multi-user capable? | No | Yes (with auth added) |
| Survives clearing browser data? | No | Yes |

### Why Supabase specifically

Supabase is one of several **managed database** services. Managed means the company runs the database server, handles backups, applies security patches, and scales the hardware as needed. You only pay for the storage and traffic you use.

Alternatives:
- **AWS RDS** — Amazon's managed Postgres. More setup, more control, more learning value. Phase 3 may migrate to RDS.
- **Firebase** — Google's BaaS. Uses a non-relational database (less suitable for skill-tree data with relationships).
- **PlanetScale** — managed MySQL. MySQL is a different relational database than Postgres.

Supabase was chosen because it offers a generous free tier, uses Postgres (which RDS also uses, so the learning transfers), and has minimal configuration friction.

---

## 4. Docker — packaging the app

### The problem Docker solves

Your app currently runs in three different environments:

1. Your laptop (Windows + Node.js + node_modules)
2. Vercel's servers (their version of Linux + their version of Node.js + a fresh install of node_modules)
3. AWS (will be a third, different environment)

Each environment may have a different operating system, a different version of Node.js, or different versions of system libraries. Bugs that appear in one environment but not another are called **environment drift** — the same code behaves differently because the surroundings differ.

### What Docker does

**Docker** is a tool that bundles your app together with everything it needs to run — operating system files, runtime, dependencies, source code — into a single package called a **Docker image**.

A Docker **image** is a frozen, versioned snapshot. It contains:

- A minimal Linux operating system (in our case, **Alpine Linux** — a very small Linux distribution chosen for size, around 5 MB base)
- Node.js installed on that Linux
- Your `node_modules` directory
- Your built application code
- Configuration telling Docker what command to run when the image starts

A running instance of an image is called a **container**. You can start many containers from the same image, the same way you can open many windows of the same program.

### Why this matters for AWS

When AWS runs your app, it doesn't have your laptop's Windows, your Node.js installation, or your `node_modules`. It has nothing. Docker solves this by giving AWS a self-contained image that includes everything needed.

### What Docker replaced

Docker did not replace anything we were using. It is an **additional layer** between your source code and the cloud provider that runs the app. Vercel hides this layer from you (it builds containers internally but you never see them). AWS exposes the layer because that is what we are choosing to learn.

### Common misconception: "AWS only accepts Docker"

This is **incorrect**. AWS has many ways to run applications:

| AWS service | What it runs |
|---|---|
| **EC2** | Any operating system, any application — raw virtual machines |
| **Lambda** | Individual functions (event-driven, no container needed) |
| **Elastic Beanstalk** | Apps in popular languages (Node.js, Python, Java) — handles the container layer for you |
| **App Runner** | Container images, simpler than ECS |
| **ECS / EKS** | Container images, more configurable |

We chose Docker + ECS because it teaches you industry-standard container concepts that transfer to any cloud (Google Cloud Run, Azure Container Apps, etc.). Docker is the **lingua franca** of modern deployment.

### What we did

Three changes:

1. Set `output: "standalone"` in `next.config.ts` — tells Next.js to produce a self-contained build that does not need the full `node_modules` at runtime, drastically reducing image size
2. Wrote `Dockerfile` — instructions Docker follows to build the image. Uses a **multi-stage build**: a "deps" stage installs packages, a "builder" stage compiles the app, a "runner" stage produces a small final image with only what is needed at runtime. Runs as a non-root user for security.
3. Wrote `.dockerignore` — tells Docker to skip `node_modules`, `.env*`, `.git`, etc. when copying files into the image. Faster builds, no secrets leaked.

The image was built and tagged `skill-tree`. It currently lives on your laptop's Docker storage.

---

## 5. AWS — the production target

### EC2, ECS, ECR — what each one is

These three services have similar names but very different roles. The "E" in each stands for "Elastic" (AWS marketing for "scales automatically"). You can ignore the E.

| Service | Full name | What it provides |
|---|---|---|
| **EC2** | Elastic Compute Cloud | Virtual machines. A blank Linux server you rent by the hour. You install whatever you want on it. |
| **ECR** | Elastic Container Registry | A storage service for Docker images. You push images to it; other AWS services pull images from it. |
| **ECS** | Elastic Container Service | An **orchestrator**. It pulls Docker images from a registry, runs them as containers, restarts them if they crash, and scales them up or down based on load. |

### How they relate to each other

ECS does not provide compute on its own. It needs underlying machines to run containers on. ECS supports two compute options:

| Option | What it means |
|---|---|
| **ECS on EC2** | ECS runs your containers on EC2 instances you rent and manage. Cheaper per hour, but you maintain the instances. |
| **ECS on Fargate** | ECS runs your containers on AWS-managed compute that is invisible to you. You only specify CPU and memory. AWS handles the rest. More expensive per hour, but zero maintenance. |

We are using **ECS on Fargate** so you do not need to learn EC2 administration right now.

### Why we are using each one in this project

| Service | Role in our project |
|---|---|
| **ECR** | Stores the `skill-tree` Docker image. You push from your laptop; ECS pulls from here. |
| **ECS Fargate** | Runs the container 24/7. Automatically restarts it if it crashes. |
| **EC2** | Not used directly. Fargate is using EC2 under the hood, but AWS hides this from us. |

### Anatomy of an ECR repository URI

When you create an ECR repository, AWS returns a **repository URI** — a structured address that uniquely identifies your image storage. The one for this project is:

```
176777036768.dkr.ecr.ap-southeast-1.amazonaws.com/skill-tree
```

**URI** = "Uniform Resource Identifier" — a structured address pointing to one specific resource on the internet. Same general idea as a URL.

Decoded:

| Part | Meaning |
|---|---|
| `176777036768` | Your AWS **account ID**. ECR repositories are scoped per account, so the address starts with which account owns it. |
| `dkr.ecr` | Tells AWS this address is for the *Docker* sub-service of *ECR*. |
| `ap-southeast-1` | The **region** the repository lives in (Singapore). ECR repos exist in one region only; the address says which. |
| `amazonaws.com` | AWS's parent domain. |
| `/skill-tree` | The **repository name** inside your account/region. One account can hold many repos: `/skill-tree`, `/another-app`, etc. |

**Why this matters:** Docker uses this URI in two ways:

1. **As a destination** — `docker push <uri>:latest` knows to upload to *this* registry, not Docker Hub.
2. **As a source** — when ECS pulls your image at runtime, it pulls from this exact URI.

Mental model: an Amazon shipping address. Account ID = recipient name, region = city, repo name = apartment number. The combination tells AWS exactly which "shelf" to put images on.

### Other AWS services we will use in Phase 3

| Service | Full name | Role |
|---|---|---|
| **ALB** | Application Load Balancer | Public entry point for traffic. Receives HTTP requests from the internet and forwards them to a running container. Provides the public URL. |
| **VPC** | Virtual Private Cloud | A private network inside AWS. ECS containers and the database live inside it, isolated from the public internet except through the ALB. |
| **RDS** | Relational Database Service | Managed Postgres (or other databases). May replace Supabase eventually. |
| **CloudWatch** | (no expansion) | Captures **logs** (text output from your containers, e.g. `console.log`) and **metrics** (CPU usage, memory, request counts). Used for debugging and alerting. |
| **IAM** | Identity and Access Management | Defines which AWS services can talk to which others, and which users have which permissions. |

### The full deployment flow we are building

```
[your laptop]
      |
      | 1. docker build → produces Docker image
      |
      | 2. docker push → uploads image to ECR
      v
   [ECR]
      |
      | 3. ECS pulls the image when starting a new container
      v
   [ECS Fargate]
      |
      | 4. ECS starts the container, monitors it, restarts on crash
      |
[VPC: private network]
   - ECS container(s) running your Next.js app
   - RDS Postgres database (or Supabase, accessed externally)
      |
      | 5. ALB receives public traffic, routes it to a healthy container
      v
   [ALB] ← public URL exposed here ← user's browser
```

**Terraform** ties all this together. Terraform is a tool that lets you describe AWS infrastructure in code (text files). Running `terraform apply` creates everything; running `terraform destroy` removes everything. This means the whole stack is reproducible and version-controlled, instead of being a one-off configuration clicked together in the AWS web console.

---

## 6. Terminals and shells — what we type commands into

This section explains the difference between a **terminal** (the window) and a **shell** (the program that interprets commands), and why this project uses **Git Bash** inside **VS Code's integrated terminal**.

### Terminal vs shell — two layers, often confused

```
┌─────────────────────────────────────────┐
│  Terminal application (the window)      │  ← Windows Terminal, VS Code's integrated terminal,
│  ┌───────────────────────────────────┐  │     ConEmu, etc. Draws the black rectangle, handles
│  │  Shell (the language interpreter) │  │     fonts, tabs, copy-paste.
│  │  Reads what you type, runs it     │  │  ← PowerShell, CMD, Git Bash, WSL bash, zsh
│  └───────────────────────────────────┘  │     Understands `set -a` vs `$env:`.
└─────────────────────────────────────────┘
```

- **Terminal** = the window (the host). Draws characters on screen, handles input.
- **Shell** = the program inside the window that interprets your commands.

A single terminal application can host many different shells. Windows Terminal, for example, can run PowerShell, CMD, Git Bash, or a WSL Linux shell — all in different tabs of the same window.

### Why Git Bash on this project

**Git Bash** is a Bash shell ported to Windows, bundled with Git for Windows (so it was already installed on your laptop). Bash is the dominant shell on Linux and macOS, and most online tutorials, Dockerfiles, AWS docs, and CI scripts assume Bash syntax.

The alternative shells on Windows speak different "dialects":

| Bash syntax we use | What it does | PowerShell equivalent | CMD equivalent |
|---|---|---|---|
| `set -a; source .env.local; set +a` | Load env vars from a file | Multi-line `Get-Content \| ForEach-Object` script | No clean equivalent |
| `\` at end of line | Line continuation | Backtick `` ` `` | Caret `^` |
| `$VAR` | Read env variable | `$env:VAR` | `%VAR%` |
| `\|` between commands | Pipe — pass output to next command | Same character, different object semantics | Same character, text-only |

If you copy a command from an AWS doc or Stack Overflow into PowerShell, it usually breaks. In Git Bash it usually works. That is the practical reason to standardise on Bash.

### Why VS Code's integrated terminal specifically

Three conveniences, no functional difference vs standalone Git Bash:

| Convenience | Why it matters |
|---|---|
| Lives inside the editor | No window switching when bouncing between editing code and running commands. |
| Inherits the project folder as the working directory | Opening a terminal automatically lands you in `C:\Users\Admin\skill-tree\`, no `cd` needed. |
| Multiple tabs / split panes | Run the dev server in one tab, run Docker commands in another, in the same window. |

You could equally well open standalone Git Bash from the Start menu and run the same commands — same shell, same behaviour. The VS Code integration is purely ergonomic.

### PATH — how the terminal finds programs

When you type `git`, `docker`, `aws`, or `terraform` in a terminal, the OS does not magically know where those programs live on disk. It uses an **environment variable** called **PATH** to find them.

`PATH` is a list of folder paths, separated by semicolons on Windows (colons on Linux/Mac). It looks something like:

```
C:\Windows\system32;C:\Windows;C:\Program Files\Git\bin;C:\tools\terraform\;...
```

When you type `terraform`, the OS:

1. Takes the command name: `terraform`
2. Walks through every folder in `PATH`, in order
3. In each folder, looks for `terraform.exe` (or `terraform` on Linux/Mac)
4. The first match wins — that file is executed
5. If no folder contains a match → `command not found`

**Why PATH exists:** without it, you would have to type the full file location every time:

| Without PATH | With PATH |
|---|---|
| `"C:\tools\terraform\terraform.exe" --version` | `terraform --version` |
| `"C:\Program Files\Git\bin\git.exe" status` | `git status` |
| `"C:\Program Files\Amazon\AWS CLI\aws.exe" sts get-caller-identity` | `aws sts get-caller-identity` |

PATH is the convenience layer that makes terminals usable. Every command you have typed in this project — `git`, `npm`, `docker`, `aws`, now `terraform` — works because its installer (or you, manually) added its folder to PATH.

**How tools land on PATH:**

- Most installers (`winget`, MSI installers, Docker Desktop, AWS CLI) add their folder to PATH automatically. You never see this happen.
- Manual installs — download a `.exe`, drop it in a folder — require you to add the folder to PATH yourself, via **System Properties → Environment Variables**. This is what we did for Terraform: extracted the binary to `C:\tools\terraform\` and added that folder to the PATH list.

**Why you must restart the terminal after a PATH change:** PATH is read once when a process starts, then cached in that process's memory. Already-open terminals (and parent applications like VS Code) still use the old cached PATH and do not see your change. New terminals started *after* the change pick up the new PATH. This is why "fully close VS Code, reopen everything" is the standard fix when an installer says "command not found" right after a successful install.

**System PATH vs User PATH on Windows:**

| Box | Affects | When to use |
|---|---|---|
| **User variables** (top of dialog) | Just your Windows account | Personal tools, no admin needed |
| **System variables** (bottom of dialog) | All accounts on the machine | System-wide tools, requires admin |

Both lists are concatenated into your effective PATH at login. For a personal laptop with one user, the difference is mostly cosmetic.

**Mental model:** PATH is a librarian's "where to look" shortlist. Instead of giving full shelf addresses ("Aisle 3, Shelf 7, Bin 12"), you ask for the title and the librarian checks her shortlist of aisles. The first matching aisle wins.

### What we did not choose, and why

| Option | Why not |
|---|---|
| **PowerShell** | Different syntax dialect. Copy-pasted commands from AWS / Docker docs would need translation. PowerShell is excellent for Windows administration; this project lives in the cross-platform cloud world where Bash is the common tongue. |
| **CMD** | More limited than PowerShell. Effectively legacy. |
| **WSL** (Windows Subsystem for Linux) | Genuine Linux on Windows — the most "correct" choice — but adds a layer of complexity (filesystem mounts, network forwarding, separate package manager) that is overkill for this project. Git Bash gives ~95% of the benefit with ~5% of the setup. |

---

## 7. Terraform — infrastructure as code

### The problem Terraform solves

By Phase 3 we needed to create around 18 AWS resources — VPC, subnets, security groups, IAM role, ECS cluster, task definition, service, ALB, target group, listener, log group. Two ways to do this:

1. **Click through the AWS Console** — open each service page, fill in forms, copy IDs from one page to paste into another. Works once. Falls apart the moment you need to recreate it elsewhere, share it with a teammate, or tear it down cleanly.
2. **Describe the resources in code, run a command that materialises them** — what we did, using Terraform.

Cloud infrastructure is too sprawling and too interconnected to manage by hand. **Infrastructure-as-Code (IaC)** flips the model: you write text files that *describe* the resources you want, version them in Git like any other code, and let a tool compute what to create/change/destroy.

### What Terraform does

**Terraform** is a CLI tool that reads `.tf` files written in **HCL** (HashiCorp Configuration Language), figures out the difference between what you described and what currently exists in the cloud, and applies whatever changes are needed.

The key word is **declarative**: you say *what should exist*, not *how to create it*. Terraform figures out the order (you cannot create a subnet before its VPC; you cannot attach an IAM role before it exists).

Four commands cover 95% of usage:

| Command | What it does |
|---|---|
| `terraform init` | One-time setup per project. Downloads provider plugins into `.terraform/`, creates `.terraform.lock.hcl` pinning their versions. |
| `terraform plan` | **Read-only preview.** Calls AWS to check current state, compares to your `.tf` files, prints what *would* change. Nothing is actually modified. |
| `terraform apply` | Re-runs plan, prompts for confirmation (`yes`), then makes the changes for real. |
| `terraform destroy` | Removes everything in your state. The clean-teardown command. |

### The state file (`terraform.tfstate`)

Critical concept. When `apply` creates resources, Terraform writes a record of what it created to **`terraform.tfstate`** — a JSON file, the source of truth for "what does Terraform think exists."

| Without state | With state |
|---|---|
| Each `apply` would recreate everything | `apply` only acts on the diff between `.tf` files and state |
| `destroy` impossible — Terraform would not know what to remove | `destroy` reads state and removes exactly those resources |
| No way to detect drift (someone clicked in the console) | `plan` flags drift automatically |

State can contain sensitive values (DB passwords, generated secrets), so we **gitignore it**. For a solo project, local state on disk is fine. Teams use **remote state** in S3 with DynamoDB locking; that is our future-upgrade path.

### Providers — the AWS plugin

Terraform itself is cloud-agnostic. The actual "translate this resource into API calls" logic lives in **providers**, plugins published by HashiCorp and the community. We use:

- `hashicorp/aws` — the AWS provider, around 5000 resource types covering nearly every AWS service.

`versions.tf` pins the provider version (`~> 5.0`), `terraform init` downloads it, and from then on `aws_vpc`, `aws_ecs_service`, etc. are available as resource types in our `.tf` files.

### Our project structure

The `infra/` folder is one Terraform configuration. All `.tf` files in the same folder are read together as a single unit:

| File | Contents |
|---|---|
| `versions.tf` | Required Terraform + provider versions |
| `providers.tf` | AWS provider config (region, default tags) |
| `variables.tf` | Input variable declarations (region, project name, image URI, Supabase vars) |
| `terraform.tfvars` | Values for the variables — committed because all values are non-secret |
| `vpc.tf` | VPC, 2 subnets, IGW, route table, RT associations |
| `security.tf` | Two security groups (ALB-facing, ECS-facing) |
| `iam.tf` | CloudWatch log group, ECS task execution role |
| `ecs.tf` | ECS cluster, task definition, service |
| `alb.tf` | ALB, target group, HTTP listener |
| `outputs.tf` | What to print after apply (app URL, cluster/service names, log group) |
| `.terraform.lock.hcl` | Provider version + checksum lockfile (committed, same role as `package-lock.json`) |

### What gets created on `terraform apply`

18 AWS resources, grouped by purpose:

| Group | Resources |
|---|---|
| **Networking** (7) | 1 VPC, 2 public subnets across 2 AZs, 1 internet gateway, 1 route table, 2 route table associations |
| **Security** (2) | 2 security groups — ALB takes port 80 from anywhere; ECS takes port 3000 *only from the ALB* |
| **Identity + logs** (3) | 1 CloudWatch log group, 1 IAM execution role, 1 managed-policy attachment |
| **Compute** (3) | 1 ECS cluster, 1 Fargate task definition, 1 ECS service (1 task) |
| **Load balancing** (3) | 1 ALB, 1 target group, 1 HTTP listener |

Apply takes around 7 minutes end-to-end. Destroy takes around 5 minutes. The ALB and the ECS service health-check stabilization are the slow steps; everything else completes in seconds.

### Decisions we made along the way

| Choice | Why |
|---|---|
| **Kept Supabase, skipped RDS** | App already works against Supabase. Adding RDS would require a schema migration with no clear learning gain at this stage. |
| **ECS tasks in public subnets, not private** | Avoids needing a NAT Gateway (~$32/month). Security comes from the security-group-only-from-ALB pattern, not network isolation. |
| **Smallest Fargate task** (256 CPU / 512 MB) | App is tiny; bigger sizes would just waste money. |
| **HTTP only, no HTTPS** | Adds an ACM certificate + DNS records. Deferred to a later session. |
| **`default_tags` on the AWS provider** | Every Terraform-created resource is auto-tagged with `Project = skill-tree, ManagedBy = Terraform`. Makes Tag Editor + cost reports trivial. |
| **`NEXT_PUBLIC_*` env vars not in ECS task** | Next.js inlines these at build time, not at runtime. Setting them as runtime env vars would have no effect. They are baked into the image during `docker build` instead. |

### The economics — apply / destroy cycle

The whole point of IaC is that creation and teardown are cheap and reversible:

| State | Cost |
|---|---|
| `infra/` exists in Git, nothing applied | $0 (just text files) |
| Stack running on AWS (after apply, idle) | ~$0.90/day (ALB + Fargate + minor CloudWatch) |
| Stack destroyed (after destroy) | ~$0/day (ECR keeps the image at ~$0.10/month) |

Standard learning workflow: `apply` → poke around for an hour → `destroy`. Total cost: a few cents.

### What Terraform replaced

Terraform replaced **clicking through the AWS Console + a stale wiki page describing the steps**. Two main wins:

1. **Reproducibility** — `terraform apply` from another machine produces identical infrastructure. New environment in 7 minutes, not 7 hours.
2. **Auditability** — `git log infra/` shows every infrastructure change with author and timestamp. Console clicks have no equivalent record.

### Why Terraform specifically

| Alternative | Why not (for this project) |
|---|---|
| **AWS CloudFormation** | AWS-native, but only AWS. Terraform speaks dozens of clouds and SaaS APIs (Cloudflare, Datadog, GitHub), making it a more portable skill. |
| **AWS CDK** (TypeScript/Python) | A "programming language → CloudFormation" wrapper. Powerful but more moving parts. Terraform's declarative HCL is simpler to read for someone learning. |
| **Pulumi** | Similar to CDK but multi-cloud. Newer, smaller community, fewer examples. Worth knowing about; not the default learning path. |
| **Ansible** | Imperative, configuration-management focused (install package, write file). Not a great fit for "create cloud resources from scratch." |

Terraform is the **lingua franca** of cloud infrastructure — biggest community, deepest example library, best-documented. Same role as Docker for containers.

---

## 8. Summary table — the journey

| Phase | What runs the app | What stores data | Public URL? |
|---|---|---|---|
| Phase 1 (local) | Node.js on your laptop via `npm run dev` | localStorage in the browser | No |
| Phase 2 (Vercel) | Vercel's servers | Supabase (Postgres) | Yes (`skill-tree-ecru.vercel.app`) |
| Phase 3 (AWS) | ECS Fargate via Terraform-managed stack | Supabase (RDS deferred) | Yes (ALB DNS, e.g. `skill-tree-alb-XXX.ap-southeast-1.elb.amazonaws.com`) |

Vercel is kept alongside AWS as a **staging environment** — a place to test changes before promoting them to production. The AWS stack is provisioned on demand via `terraform apply` and torn down with `terraform destroy` to control costs.
