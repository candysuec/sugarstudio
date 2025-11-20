# 🚀 **Candy Lead Backend Engineer Onboarding Guide**

**Version:** Internal Developer Release
**Audience:** New Lead Backend Engineers joining the Candy platform team

---

# 1. Overview

Candy is a **monorepo** (pnpm) containing:

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
*   React + Next.js (for understanding full-stack context)

### Infrastructure

*   **Supabase (primary datastore)**
*   Vercel (for understanding deployment targets)
*   GitHub
*   pnpm Workspaces
*   Docker (coming soon)

### AI Stack

*   Gemini
*   GPT-4o/4.1
*   Internal Candy agents
*   Task pipelines & Orchestrator workers

---

# 3. Required Accounts for Dev Setup

### You must have:

| Service          | Access Needed                 | Notes                        |
| ---------------- | ----------------------------- | ---------------------------- |
| **GitHub**       | Repo read/write               | PR workflow                  |
| **Vercel**       | Project access                | Deployment integration       |
| **Supabase**     | Project + anon + service keys | Needed for all backend work  |
| **OpenAI**       | API key                       | Workers + some pipelines     |
| **Google Cloud** | OAuth config                  | Social + Google integrations |
| **Notion Dev**   | Integration token             | For workflow automation      |
| **Stripe**       | API keys                      | For billing integration      |

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
  /orchestrator         → workers, cron engine, job system
  /creator-studio       → main logged-in dashboard
  /knisoci              → social automation front-end
  /website              → marketing site

/packages
  /shared-types         → Crucial for consistent data models
  /shared-utils         → Backend utility functions
  /ui                   → (Frontend focus, but good to know)
  /tsconfig
```

Everything uses PNPM workspace linking.

---

# 7. Environment Variables

### Create root `.env`:

```
cp .env.example .env
```

### Required env values (focus on backend):

(Insert your real project keys)

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY= # CRITICAL for backend operations

OPENAI_API_KEY=
GEMINI_API_KEY=

NOTION_API_KEY= # For Orchestrator workflows

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URL=

STRIPE_SECRET_KEY= # CRITICAL for billing
STRIPE_PUBLIC_KEY=
```

### Orchestrator-specific:

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
*   AI job worker
*   Cron jobs
*   Supabase logging

Runs at:
👉 **[http://localhost:3004](http://localhost:3004)**

---

# 9. Supabase Setup

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

# 10. Worker Services (Orchestrator)

## Task Worker

Handles:

*   MONITOR_LOGS
*   TRIGGER_WORKFLOW
*   GENERATE_SOP
*   AI pipeline tasks

Runs automatically with:

```
pnpm --filter orchestrator dev
```

## AI Job Worker

Processes:

*   AI_JOBS queued from frontend
*   Pipeline tasks
*   Content generation

Logs to Supabase → table: **orchestrator_logs**

---

# 11. Developer Responsibilities (Backend Focus)

Every engineer must:

*   Keep TypeScript strict mode passing
*   **Update DB migrations when changing schema**
*   Write tests for pipeline logic
*   **Ensure orchestrator never crashes**
*   **Manage env vars securely**
*   Document API changes
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

### ❌ Cron tasks never run

Ensure:

```
TASK_WORKER_INTERVAL > 0
```

### ❌ OAuth errors

Check redirect URIs inside:
[https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

---

# 13. Key Responsibilities (Lead Backend Engineer)

*   Implement full permissions hierarchy (RBAC).
*   Develop billing integration (Stripe) and AI usage metering.
*   Implement per-user API keys and secure storage.
*   Build webhooks system.
*   Expand pipelines processing API and DAG structure.
*   Implement data retention and GDPR compliance.
*   Add retry logic, DLQ, concurrency locks, and worker pooling to Orchestrator.
*   Build Supervisor Worker and distributed locking (Redis).
*   Optimize Supabase tables with indexing.
*   Implement soft deletes for workspaces.
*   Design and implement pipeline execution history, retry logic, and cost estimation.
*   Ensure secure storage for integration tokens.

---
