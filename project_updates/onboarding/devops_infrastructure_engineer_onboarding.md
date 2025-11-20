# 🚀 **Candy DevOps/Infrastructure Engineer Onboarding Guide**

**Version:** Internal Developer Release
**Audience:** New DevOps/Infrastructure Engineers joining the Candy platform team

---

# 1. Overview

Candy is a **monorepo** (pnpm) with a focus on scalable and resilient operations. The **Orchestrator** is central to task automation and AI job processing, requiring robust infrastructure.

### Monorepo Components:

*   **Orchestrator** → task automation, cron jobs, AI job processing
*   **Creator Studio** → main user dashboard
*   **KniSoci** → social automation suite
*   **Website** → marketing landing pages
*   **Shared Packages** → UI kit, shared types, utils

Backend uses **Supabase**, frontend uses **Next.js** + **React**, infra uses **pnpm workspaces**, workers use **ts-node + nodemon**.

---

# 2. Core Technologies You Must Know

### Languages & Frameworks

*   Typescript
*   Node.js
*   React + Next.js (for understanding deployment targets)

### Infrastructure

*   **Supabase (database, auth, edge functions)**
*   **Vercel (frontend deployment, serverless functions)**
*   **GitHub (CI/CD integration)**
*   **pnpm Workspaces (monorepo management)**
*   **Docker (containerization)**
*   **Kubernetes (future, for orchestration)**
*   **Redis (for caching, distributed locking)**

### AI Stack

*   Gemini / GPT (for understanding infrastructure needs)

---

# 3. Required Accounts for Dev Setup

### You must have:

| Service          | Access Needed                 | Notes                        |
| ---------------- | ----------------------------- | ---------------------------- |
| **GitHub**       | Repo read/write               | CI/CD setup                  |
| **Vercel**       | Project access                | Deployment integration       |
| **Supabase**     | Project + anon + service keys | Database management          |
| **Cloud Provider** | Admin access                  | AWS/GCP/Azure for infra      |

---

# 4. Local Environment Setup

## 4.1 Install Dependencies

### Requirements:

```
Node.js ≥ 20
pnpm ≥ 9
Docker (CRITICAL)
WSL2 (Windows)
```

### Install pnpm

```
npm install -g pnpm
```

### Install Supabase CLI

```
npm install -g supabase
```

---

# 5. Clone the Repository

```
git clone https://github.com/<ORG>/<REPO>.git
cd candy
pnpm install
```

If you get permission issues → ask for GitHub team assignment.

---

# 6. Monorepo Structure

```
/apps
  /orchestrator         → Workers, cron engine, job system (server-side)
  /creator-studio       → Main logged-in dashboard (frontend)
  /knisoci              → Social automation front-end (frontend)
  /website              → Marketing site (frontend)

/packages
  /shared-types
  /shared-utils
  /ui
  /tsconfig
```

Everything uses PNPM workspace linking.

---

# 7. Environment Variables

### Create root `.env`:

```
cp .env.example .env
```

### Required env values (focus on infrastructure):

(Insert your real project keys)

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY= # CRITICAL for backend operations

OPENAI_API_KEY=
GEMINI_API_KEY=

NOTION_API_KEY=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URL=

STRIPE_SECRET_KEY=
STRIPE_PUBLIC_KEY=

# Production-specific variables
NODE_ENV=production
REDIS_URL=
```

---

# 8. Running Apps Locally (Overview)

Understanding how each app runs locally is important for debugging and deployment.

## 8.1 Orchestrator (Workers)

```
pnpm --filter orchestrator dev
```

Runs at:
👉 **[http://localhost:3004](http://localhost:3004)**

## 8.2 Frontend Apps (Website, Creator Studio, KniSoci)

```
pnpm --filter <app-name> dev
```

---

# 9. Supabase Setup (Infrastructure Focus)

1.  Login:

```
supabase login
```

2.  Link project:

```
supabase link --project-ref <PROJECT_ID>
```

3.  Start local DB (optional):

```
supabase start
```

4.  Run migrations:

```
supabase db push
```

5.  View DB UI:

*   Local: [http://localhost:54323](http://localhost:54323)
*   Cloud: [https://app.supabase.com](https://app.supabase.com) → Your Project

---

# 10. Vercel Deployment Setup

### To develop or deploy UI apps:

1.  Login:

```
vercel login
```

2.  Link:

```
vercel link
```

3.  Pull env:

```
vercel env pull .env
```

4.  Deploy:

```
vercel --prod
```

### Important:

*   Only **website**, **knisoci**, and **creator-studio** deploy on Vercel
*   **Orchestrator stays on server-side infra** (railway, fly.io, or container)

---

# 11. Developer Responsibilities (DevOps/Infrastructure Focus)

Every engineer must:

*   Keep TypeScript strict mode passing
*   Update DB migrations when changing schema
*   Write tests for infrastructure components
*   Ensure orchestrator never crashes
*   Manage env vars securely
*   Document API changes
*   Avoid breaking the monorepo dependency graph
*   Keep logs meaningful
*   **Design, implement, and maintain CI/CD pipelines.**
*   **Manage cloud infrastructure (Vercel, Supabase, other cloud providers).**
*   **Implement monitoring, alerting, and logging solutions.**
*   **Ensure system scalability, reliability, and security.**

---

# 12. Troubleshooting (Common Issues)

### ❌ “Module not found”

Run:

```
pnpm install
pnpm -w link --force
```

### ❌ Supabase errors

Check:

*   Table exists
*   Column names match
*   You are using service role for writes

### ❌ Workers crash on startup

Check env:

```
SUPABASE_SERVICE_ROLE_KEY
```

It must NOT be the anon key.

### ❌ Cron tasks never run

Ensure:

```
TASK_WORKER_INTERVAL > 0
```

### ❌ Deployment failures

Check Vercel logs, GitHub Actions logs, environment variables.

---

# 13. Key Responsibilities (DevOps/Infrastructure Engineer)

*   Establish staging and production environments.
*   Implement CI/CD pipelines (GitHub Actions).
*   Set up monitoring and alerting systems.
*   Implement log aggregation.
*   Develop Docker containers for all services (`Dockerfile`, `docker-compose.yml`).
*   Implement secret management (vault).
*   Design and implement horizontal scaling strategy and worker load balancing.
*   Implement global caching (Redis).
*   Configure reverse proxy (NGINX or Cloudflare).
*   Ensure robust health checks.

---
