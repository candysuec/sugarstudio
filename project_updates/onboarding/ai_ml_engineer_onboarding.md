# 🚀 **Candy AI/ML Engineer Onboarding Guide**

**Version:** Internal Developer Release
**Audience:** New AI/ML Engineers joining the Candy platform team

---

# 1. Overview

Candy is a **monorepo** (pnpm) with a strong focus on **AI-powered operations**. The **Orchestrator** is central to AI job processing, task automation, and integrating with various AI models.

### Monorepo Components:

*   **Orchestrator** → task automation, cron jobs, **AI job processing**
*   **Creator Studio** → main user dashboard (integrates AI features)
*   **KniSoci** → social automation suite (AI content generation)
*   **Website** → marketing landing pages
*   **Shared Packages** → UI kit, shared types, utils

Backend uses **Supabase**, frontend uses **Next.js** + **React**, infra uses **pnpm workspaces**, workers use **ts-node + nodemon**.

---

# 2. Core Technologies You Must Know

### Languages & Frameworks

*   Typescript
*   Node.js
*   React + Next.js (for understanding AI integration points in frontend)

### Infrastructure

*   **Supabase (for AI job queues, results, and potentially vector embeddings)**
*   Vercel (for understanding deployment targets)
*   GitHub
*   pnpm Workspaces
*   Docker (coming soon)

### AI Stack

*   **Gemini (primary AI engine)**
*   **GPT-4o/4.1 (secondary AI engine)**
*   **Internal Candy agents (core focus)**
*   **Task pipelines & Orchestrator workers (where AI logic executes)**

---

# 3. Required Accounts for Dev Setup

### You must have:

| Service          | Access Needed                 | Notes                        |
| ---------------- | ----------------------------- | ---------------------------- |
| **GitHub**       | Repo read/write               | PR workflow                  |
| **Supabase**     | Project + anon + service keys | Needed for AI job management |
| **OpenAI**       | API key                       | Workers + some pipelines     |
| **Google Cloud** | API key                       | For Gemini API access        |

---

# 4. Local Environment Setup

## 4.1 Install Dependencies

### Requirements:

```
Node.js ≥ 20
pnpm ≥ 9
Docker (optional, future)
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
  /orchestrator         → **AI job processing, agent execution**
  /creator-studio       → (Frontend for AI features)
  /knisoci              → (Frontend for AI content generation)
  /website              → (Marketing)

/packages
  /shared-types         → AI-related data models
  /shared-utils         → AI utility functions
  /ui                   → (Frontend)
  /tsconfig
```

Everything uses PNPM workspace linking.

---

# 7. Environment Variables

### Create root `.env`:

```
cp .env.example .env
```

### Required env values (focus on AI):

(Insert your real project keys)

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

OPENAI_API_KEY= # CRITICAL for GPT models
GEMINI_API_KEY= # CRITICAL for Gemini models
```

### Orchestrator-specific (relevant for AI worker polling):

```
ORCHESTRATOR_PORT=3004
LOG_LEVEL=debug
TASK_WORKER_INTERVAL=5000
AI_JOB_POLL_INTERVAL=8000
```

---

# 8. Running Apps Locally

## 8.1 Orchestrator (Workers)

```
pnpm --filter orchestrator dev
```

Starts:

*   Task worker
*   **AI job worker**
*   Cron jobs
*   Supabase logging

Runs at:
👉 **[http://localhost:3004](http://localhost:3004)**

---

# 9. Supabase Setup (AI Focus)

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

### Key Supabase Tables for AI:

*   `ai_jobs` (job queue for AI tasks)
*   `ai_job_results` (stores AI output)
*   `orchestrator_logs` (AI worker activity)
*   `processes`, `process_versions` (for SOPs/workflows)
*   Consider `pgvector` for embeddings.

---

# 10. Worker Services (AI Job Worker)

## AI Job Worker

Processes:

*   **AI_JOBS queued from frontend**
*   **Pipeline tasks**
*   **Content generation**

Logs to Supabase → table: **orchestrator_logs**

---

# 11. Developer Responsibilities (AI/ML Focus)

Every engineer must:

*   Keep TypeScript strict mode passing
*   Update DB migrations when changing schema (especially AI-related tables)
*   **Write tests for AI agent logic and pipeline outputs**
*   Ensure orchestrator never crashes
*   Manage env vars securely (especially API keys)
*   **Document AI model usage, prompt changes, and agent behavior**
*   Avoid breaking the monorepo dependency graph
*   Keep logs meaningful

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

### ❌ AI model errors

Check:

*   API keys are valid and not expired
*   Model names are correct
*   Rate limits are not being hit
*   Prompts are well-formed

---

# 13. Key Responsibilities (AI/ML Engineer)

*   Develop multi-agent orchestration engine and custom "Candy Agent Framework."
*   Implement embedding engine (Supabase pgvector recommended) and context caching.
*   Build workspace-level memory and metadata scoring for agents.
*   Develop supervisor agent and autonomous chain execution.
*   Implement AI analytics and insights dashboard.
*   Refine prompt templates and model routing.
*   Develop domain-specific memory per workspace and agent sandboxing.

---
