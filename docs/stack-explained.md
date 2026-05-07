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

### What we did not choose, and why

| Option | Why not |
|---|---|
| **PowerShell** | Different syntax dialect. Copy-pasted commands from AWS / Docker docs would need translation. PowerShell is excellent for Windows administration; this project lives in the cross-platform cloud world where Bash is the common tongue. |
| **CMD** | More limited than PowerShell. Effectively legacy. |
| **WSL** (Windows Subsystem for Linux) | Genuine Linux on Windows — the most "correct" choice — but adds a layer of complexity (filesystem mounts, network forwarding, separate package manager) that is overkill for this project. Git Bash gives ~95% of the benefit with ~5% of the setup. |

---

## 7. Summary table — the journey

| Phase | What runs the app | What stores data | Public URL? |
|---|---|---|---|
| Phase 1 (local) | Node.js on your laptop via `npm run dev` | localStorage in the browser | No |
| Phase 2 (Vercel) | Vercel's servers | Supabase (Postgres) | Yes (`skill-tree-ecru.vercel.app`) |
| Phase 3 (AWS) | ECS Fargate containers | RDS Postgres or Supabase (TBD) | Yes (ALB-provided URL) |

Vercel will be kept alongside AWS as a **staging environment** — a place to test changes before promoting them to production.
