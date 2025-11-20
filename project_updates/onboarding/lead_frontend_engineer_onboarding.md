# 🚀 **Candy Lead Frontend Engineer Onboarding Guide**

**Version:** Internal Developer Release
**Audience:** New Lead Frontend Engineers joining the Candy platform team

---

# 1. Overview

Candy is a **monorepo** (pnpm) containing:

*   **Orchestrator** → (Backend focus, but understand its role)
*   **Creator Studio** → main user dashboard
*   **KniSoci** → social automation suite
*   **Website** → marketing landing pages
*   **Shared Packages** → UI kit, shared types, utils

Backend uses **Supabase**, frontend uses **Next.js** + **React**, infra uses **pnpm workspaces**, workers use **ts-node + nodemon**.

---

# 2. Core Technologies You Must Know

### Languages & Frameworks

*   Typescript
*   Node.js (for understanding Next.js backend features)
*   **React + Next.js**
*   **Tailwind**
*   **Zustand/recoil (depends on app)**

### Infrastructure

*   Supabase (for understanding data fetching and auth)
*   **Vercel (primary deployment target)**
*   GitHub
*   pnpm Workspaces
*   Docker (coming soon)

### AI Stack

*   Gemini (for understanding AI integration points)
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
| **Supabase**     | Project + anon + service keys | Needed for data fetching     |
| **Google Cloud** | OAuth config                  | Social + Google integrations |
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
  /orchestrator         → (Backend focus, but understand its APIs)
  /creator-studio       → main logged-in dashboard
  /knisoci              → social automation front-end
  /website              → marketing site

/packages
  /shared-types         → Crucial for consistent data models
  /shared-utils         → (Backend focus, but good to know)
  /ui                   → Shared UI components and design system
  /tsconfig
```

Everything uses PNPM workspace linking.

---

# 7. Environment Variables

### Create root `.env`:

```
cp .env.example .env
```

### Required env values (focus on frontend):

(Insert your real project keys)

```
SUPABASE_URL=
SUPABASE_ANON_KEY=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URL= # CRITICAL for OAuth flows

STRIPE_PUBLIC_KEY= # For frontend billing integration
```

---

# 8. Running Apps Locally

## 8.1 Website

```
pnpm --filter website dev
```

Runs at:
👉 **[http://localhost:3000](http://localhost:3000)**

## 8.2 Creator Studio

```
pnpm --filter creator-studio dev
```

Runs at:
👉 **[http://localhost:3001](http://localhost:3001)**

## 8.3 KniSoci

```
pnpm --filter knisoci dev
```

Runs at:
👉 **[http://localhost:3002](http://localhost:3002)**

---

# 9. Supabase Setup (Frontend Perspective)

1.  Login:

```
supabase login
```

2.  Link project:

```
supabase link --project-ref <PROJECT_ID>
```

3.  View DB UI:

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
*   Orchestrator stays on server-side infra (railway, fly.io, or container)

---

# 11. Developer Responsibilities (Frontend Focus)

Every engineer must:

*   Keep TypeScript strict mode passing
*   Write tests for UI components and integration logic
*   Manage env vars securely (especially public keys)
*   Document API changes (from frontend perspective)
*   Avoid breaking the monorepo dependency graph
*   Keep logs meaningful
*   **Ensure consistent UI/UX across all frontend applications.**

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
*   You are using anon key for client-side reads

### ❌ OAuth errors

Check redirect URIs inside:
[https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

---

# 13. Key Responsibilities (Lead Frontend Engineer)

*   Develop full Creator Studio UI (real-time collaboration, drag-and-drop pipeline builder, integration settings, notification panel, AI agent inspector, workspace activity feed, user settings).
*   Implement KNISOCI social account connections (OAuth), publishing queue integration, AI rewriting/enhancement pipeline, social analytics importer, hashtag engine, and full multi-platform publishing.
*   Build Website onboarding flow, case studies, feature pages, blog/docs structure, and advanced SEO.
*   Ensure consistent UI/UX across all frontend applications.
*   Manage frontend state management (Zustand/emerging store solution).

---
