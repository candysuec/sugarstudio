# 🚀 **Candy Product Manager / Technical Lead Onboarding Guide**

**Version:** Internal Developer Release
**Audience:** New Product Managers / Technical Leads joining the Candy platform team

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

# 2. Core Technologies You Must Know (High-Level)

### Languages & Frameworks

*   Typescript, Node.js, React + Next.js (understand capabilities and limitations)

### Infrastructure

*   Supabase (database, auth, real-time capabilities)
*   Vercel (frontend deployment, serverless functions)
*   GitHub (version control, collaboration)
*   pnpm Workspaces (monorepo management)
*   Docker (containerization strategy)

### AI Stack

*   Gemini, GPT (AI capabilities, cost implications)
*   Internal Candy agents (understanding their roles and potential)
*   Task pipelines & Orchestrator workers (how automation happens)

---

# 3. Required Accounts for Dev Setup (for Monitoring & Access)

### You must have:

| Service          | Access Needed                 | Notes                        |
| ---------------- | ----------------------------- | ---------------------------- |
| **GitHub**       | Repo read access              | For code visibility          |
| **Vercel**       | Project access                | For deployment monitoring    |
| **Supabase**     | Project access                | For data insights & monitoring |

---

# 4. Local Environment Setup (Basic Understanding)

While not expected to perform deep development, understanding the local setup helps in troubleshooting and communication.

### Requirements:

```
Node.js ≥ 20
pnpm ≥ 9
WSL2 (Windows)
```

---

# 5. Clone the Repository (Basic Understanding)

```
git clone https://github.com/<ORG>/<REPO>.git
cd candy
pnpm install
```

---

# 6. Monorepo Structure (High-Level)

Understand the purpose of each application and how they interact.

```
/apps
  /orchestrator         → Backend automation, AI processing
  /creator-studio       → Main user-facing application
  /knisoci              → Social media automation features
  /website              → Marketing and public presence

/packages
  /shared-types         → Common data structures
  /shared-utils         → Reusable logic
  /ui                   → Shared UI components
```

---

# 7. Environment Variables (Importance & Secure Management)

Understand that environment variables are crucial for configuring applications and securing sensitive information. Be aware of the distinction between development, staging, and production environments.

---

# 8. Running Apps Locally (Basic Understanding)

Know the commands to start applications for quick local testing or debugging with developers.

## 8.1 Orchestrator (Workers)

```
pnpm --filter orchestrator dev
```

Runs at:
👉 **[http://localhost:3004](http://localhost:3004)**

---

# 9. Supabase Setup (Basic Understanding)

Understand that Supabase is our primary database and how it's managed.

1.  Login: `supabase login`
2.  Link project: `supabase link --project-ref <PROJECT_ID>`
3.  Run migrations: `supabase db push`

---

# 10. Vercel Deployment Setup (Understanding Deployment Process)

Understand how frontend applications are deployed to Vercel and the role of Vercel in our CI/CD.

### Important:

*   Only **website**, **knisoci**, and **creator-studio** deploy on Vercel
*   **Orchestrator stays on server-side infra**

---

# 11. Git Workflow (Understanding PR Process)

Understand the importance of the Git workflow for collaboration and code quality.

### Required PR rules:

*   1 reviewer minimum
*   Must pass lint + build checks
*   Must include testing instructions
*   PRs must stay under **600 lines** unless unavoidable

---

# 12. Developer Responsibilities (High-Level)

Understand the general responsibilities of the engineering team to ensure a stable and high-quality product.

---

# 13. Troubleshooting (High-Level Understanding)

Be aware of common issues and how to quickly identify if a problem is environmental, code-related, or infrastructure-related.

---

# 14. Product & Business Overview (Detailed)

### Product Vision

Candy is an **AI-powered operations system for creators**, combining:

*   Social media automation (KNISOCI)
*   SOP creation
*   Workflow automation
*   AI agents
*   Project management
*   Media processing
*   Marketing automation
*   Task orchestration

A horizontal “creator OS”.

### Value

*   Automates everything that slows down creators
*   Reduces operations overhead by 90%
*   Centralizes all content, workflows, and publishing
*   Creates SOPs, content, posts, scripts, workflows, and tasks automatically

### Market Position

Acts as:

*   Notion + Zapier + Hootsuite + ChatGPT + Asana
    **combined into one platform** using AI.

---

# 15. Risks & Dependencies (Detailed)

### Technical risks

*   API rate limits from social platforms
*   Worker scaling issues under heavy load
*   AI cost control & unpredictable token usage
*   Integration token expiration
*   Unhandled errors inside pipeline chains

### Business risks

*   Social platforms changing API rules
*   Expensive AI usage without billing
*   Competition catching up

### Mitigation

*   Implement retry + DLQ
*   Add cost guards & usage limits
*   Ensure user-billed AI usage
*   Version integrations

---

# 16. Multi-Phase Roadmap (Detailed)

Understand the strategic progression of the product.

## **Phase 1: Stabilization (NOW → 2 weeks)**

*   Finalize Orchestrator
*   Build DLQ + retry logic
*   Finish logging + monitoring
*   Clean up Supabase schema
*   Implement workspace roles
*   Fix remaining TypeScript inconsistencies
*   Establish staging environment

## **Phase 2: Core Product (2–6 weeks)**

*   Full Creator Studio UI
*   KNISOCI publishing queue
*   SOP + Workflow Engine
*   AI Agent Supervisor
*   Pipeline Builder UI
*   Social Integrations (IG, TikTok, YT)

## **Phase 3: Growth Systems (6–12 weeks)**

*   Billing (Stripe)
*   Team collaboration
*   Notifications
*   Webhooks integration
*   Email marketing pipeline
*   SEO tools
*   Creator analytics

## **Phase 4: Enterprise (3–6 months)**

*   AI enterprise controls
*   Custom pipelines
*   Enterprise roles
*   Compliance (GDPR, SOC2)
*   Multi-region redundancy

---

# 17. Key Responsibilities (Product Manager / Technical Lead)

*   Translate product vision into detailed technical requirements.
*   Prioritize features and manage the roadmap across all phases.
*   Coordinate efforts between backend, frontend, AI, and DevOps teams.
*   Ensure alignment with business goals and market needs.
*   Manage risks and dependencies.
*   Oversee quality assurance and user feedback loops.

---
