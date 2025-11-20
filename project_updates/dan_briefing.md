# ✅ **NEW THREAD INITIALIZATION PACK (COPY/PASTE THIS INTO THE NEW GEMINI THREAD)**

**Title:** *SugarStudio Monorepo – Full Initialization Context for Gemini*

---

## 👤 **Who I Am**

**I am Dan**, the lead engineer on the SugarStudio monorepo.
I am highly experienced, systematic, and focused on clarity, stability, and maintainability.
You (Gemini) are acting as my assistant.

---

## 🏗️ **High-Level Architecture**

SugarStudio is a **Turborepo monorepo** located at:

```
~/dev/sugarstudio
```

Inside are **four applications**:

### 1. `website/`

Public marketing site
Next.js
Runs on **port 3001** locally

### 2. `knisoci/`

Main user-facing app
Next.js
Runs on **port 3002** locally
Uses:

* Supabase (SugarStudio instance)
* Notion (SOP/task DB)
* Stripe (future)

### 3. `candyland/`

Internal tools sandbox
Next.js
Runs on **port 3003** locally
Uses:

* Supabase (same shared instance as knisoci)

### 4. `orchestrator/`

Node.js background worker / scheduler
Runs on **port 3010** locally
Uses:

* Supabase (jobs, logs)
* Notion (SOP/task mgmt)

---

## 🗄️ **Database Setup**

We now have **one unified Supabase instance**:

### ✔️ **Supabase Project: `sugarstudio`**

This one DB serves ALL apps:

| App          | Uses Supabase? | What For                         |
| ------------ | -------------- | -------------------------------- |
| website      | ❌ No           | (maybe later)                    |
| knisoci      | ✔️ Yes         | users, auth, profiles, configs   |
| candyland    | ✔️ Yes         | tests, tasks, internal tools     |
| orchestrator | ✔️ Yes         | cron jobs, logs, scheduled tasks |

---

## 🌐 **Deployment Setup**

We have **one Vercel account** that currently deploys separately:

### ✔️ Vercel Projects:

* `sugarstudio-alpha` → for the monorepo
* Previous Vercel projects (`ai-brand hub`, `knisoci-old`) are deprecated but still exist
* We are consolidating into **ONE Vercel project** that handles the entire monorepo

---

## 🔐 **Environment Variable Strategy**

At repo root:

```
.env.shared
.env.local
```

Inside each app:

```
apps/<app>/.env.local
```

### Rules:

### 1. `.env.shared`

Holds **shared credentials** (Supabase, Notion, Stripe, etc.)

### 2. Root `.env.local`

Holds **local development overrides only**

### 3. App-level `.env.local` files

Each app contains only **app-specific keys**
and imports shared keys via the sync script.

---

## 🔧 **Environment Sync Script**

The repo contains:

```
scripts/sync-envs.sh
```

This script copies variables from `.env.shared` → into each app’s `.env.local`.

You must assume this script works and use it to keep envs consistent.
When diagnosing env problems, you may request contents of:

```
.env.shared
.env.local
apps/<app>/.env.local
```

---

## 🛠️ **Current Developer Problems That Gemini Must Help Solve**

Gemini **must be aware** of these open problems:

1. **pnpm run dev fails at the monorepo root**

   * `ERR_PNPM_NO_SCRIPT`
   * Should run via Turborepo workspaces

2. **turbo reports “Missing packageManager field”**

   * Possibly incorrect workspace detection
   * package.json or turbo.json may be out of sync

3. **orchestrator fails to start**

   * chdir() errors
   * ts-node execution issues
   * missing env vars (Supabase_URL, anon key, Notion keys)

4. **need to verify schema sync**

   * ensure orchestrator uses correct tables
   * ensure supabase migration folder exists in monorepo

5. **need a clean long-term structure**

   * one DB
   * one vercel project
   * shared envs
   * multi-app port control

Your job (Gemini) is to **help debug, repair, and stabilize the monorepo**,
not rewrite the architecture unless necessary.

---

## 🚦 **Local Development Ports**

| App          | Port     |
| ------------ | -------- |
| website      | **3001** |
| knisoci      | **3002** |
| candyland    | **3003** |
| orchestrator | **3010** |

---

## 📦 **Technologies Used**

* Turborepo (monorepo)
* pnpm workspaces
* Next.js 14
* Node.js worker service
* Supabase (Postgres, Edge Functions, Auth)
* Notion API (SOPs, tasks, logging)
* Typescript
* Docker (future? unused today)
* Vercel Deployment
* Prisma (legacy, being removed)
* tRPC (maybe present previously)

---

## 📄 **Primary Questions Gemini Must Answer**

Gemini must now begin the new thread by addressing these:

1. **Why does pnpm run dev fail at the root?**
2. **Why does turbo think packageManager is missing?**
3. **Why is orchestrator failing chdir/ts-node startup?**
4. **How do we confirm Supabase schema + migrations are correct?**
5. **What improvements can be made to make the monorepo easier to maintain?**

---

## 🎯 **Your Role (Gemini) in the New Thread**

* Act as a **diagnostic assistant**
* Ask for missing pieces only when absolutely required
* Provide exact commands
* Provide step-by-step actions
* Avoid re-architecting unless necessary
* Keep responses concise
* Focus exclusively on correctness, stability, and clear steps

---

# ✅ **END OF NEW THREAD INITIALIZATION PACK**

Copy the entire document above into a fresh Gemini chat.

---
