# SugarStudio Monorepo: Comprehensive Architecture Overview

This document provides a detailed architectural overview of the SugarStudio monorepo, outlining its structure, component responsibilities, technology stack, data flow, and deployment strategy.

---

## 1. High-Level Vision

SugarStudio is an AI-assisted brand intelligence platform designed to streamline brand creation, strategy, and management. It leverages AI (primarily Google Gemini) for creative generation and operational intelligence, with a focus on resilience and observability. The platform is built as a monorepo to facilitate shared code, consistent development practices, and unified deployment.

---

## 2. Monorepo Structure

The `sugarstudio` monorepo is organized as follows:

```
sugarstudio/
├── apps/
│   ├── website/        # Public marketing site (Next.js)
│   ├── knisoci/        # Customer-facing AI companion app (Next.js)
│   ├── candyland/      # Business admin & internal tooling (Next.js)
│   └── orchestrator/   # Backend automation engine & AI agent manager (Node.js/TypeScript)
├── packages/           # (Future: Shared UI components, utility functions, types, etc.)
├── scripts/            # Utility scripts (e.g., sync-envs.sh)
├── prisma/             # (Future: Shared Prisma schema if applicable)
├── .env.shared         # Global environment variables
├── vercel.json         # Vercel deployment and routing configuration
└── pnpm-workspace.yaml # pnpm monorepo configuration
```

---

## 3. Application Breakdown & Responsibilities

### 3.1 `apps/website`
*   **Role:** Public-facing marketing website, landing pages, informational content.
*   **Technology:** Next.js (React), TypeScript, Tailwind CSS.
*   **Key Responsibilities:** SEO, user acquisition, brand messaging.

### 3.2 `apps/knisoci`
*   **Role:** Core customer-facing application. User authentication, profiles, brand management, AI-powered content generation (via Orchestrator APIs).
*   **Technology:** Next.js (React), TypeScript, NextAuth.js (Google OAuth), Prisma ORM, Supabase client.
*   **Key Responsibilities:** User experience, brand identity creation, content ideation, interaction with AI services.

### 3.3 `apps/candyland`
*   **Role:** Internal administration panel, analytics dashboards, user management, system monitoring.
*   **Technology:** Next.js (React), TypeScript, NextAuth.js, Prisma ORM, Supabase client.
*   **Key Responsibilities:** Operational oversight, data visualization, system health.

### 3.4 `apps/orchestrator`
*   **Role:** Backend automation engine. Manages AI agents, executes tasks, generates SOPs, handles AI model interactions (Gemini, OpenAI), and logs system events. Acts as the central intelligence hub.
*   **Technology:** Node.js, TypeScript, Express.js (or similar), `dotenv`, Supabase client, Google Gemini API client.
*   **Key Responsibilities:** AI task execution, data processing, system resilience (self-repair), logging, API provision for frontend apps.

---

## 4. Technology Stack

*   **Frontend Framework:** Next.js 14 (React, TypeScript)
*   **Styling:** Tailwind CSS, shadcn/ui, Lucide Icons
*   **Authentication:** NextAuth.js (Google OAuth)
*   **Database:** PostgreSQL (managed by Supabase)
*   **ORM:** Prisma ORM
*   **Backend (Orchestrator):** Node.js, TypeScript
*   **AI Engine:** Google Gemini API (gemini-1.5-pro-latest, gemini-1.5-flash)
*   **Package Manager:** pnpm
*   **Version Control:** Git, GitHub
*   **Deployment:** Vercel

---

## 5. Environment Management & Data Flow

### 5.1 Environment Variables
*   **Global Shared (`.env.shared`):** Located at the monorepo root. Contains variables common to multiple applications or sensitive production keys (e.g., `SUPABASE_URL`, `GEMINI_API_KEY`, `NEXTAUTH_SECRET`).
*   **App-Specific Local (`apps/<app>/.env.local`):** Overrides or adds variables specific to a local app instance (e.g., `PORT`, local `NEXTAUTH_URL`).
*   **Synchronization (`scripts/sync-envs.sh`):** A custom script that ensures all applications receive the correct merged set of environment variables, handling overrides and variable expansion.
*   **Orchestrator Loading:** The `orchestrator` explicitly loads its `.env.local` using `dotenv.config({ path: '../orchestrator/.env.local' });` in `src/index.ts`.

### 5.2 Data Flow (High-Level)
*   **Frontend Apps (`website`, `knisoci`, `candyland`):** Interact with the `orchestrator` via its APIs for AI-driven functionalities. They also directly interact with Supabase for user authentication and potentially some direct data access (e.g., user profiles).
*   **`orchestrator`:**
    *   Receives requests from frontend applications.
    *   Interacts with Google Gemini API for AI generation and analysis.
    *   Stores logs and operational data in Supabase (PostgreSQL).
    *   (Future) Interacts with other external APIs (e.g., Notion).
*   **Supabase:** Provides PostgreSQL database, authentication services, and real-time capabilities.

---

## 6. Deployment Architecture (Vercel)

### 6.1 Continuous Deployment
*   **GitHub Integration:** Vercel is directly integrated with the `sugarstudio` GitHub repository. Pushes to the `main` branch automatically trigger new deployments.

### 6.2 Monorepo Configuration (`vercel.json`)
A `vercel.json` file at the monorepo root defines how Vercel builds and routes the applications:

*   **`builds`:** Specifies how each application is built.
    *   Next.js apps (`website`, `knisoci`, `candyland`) use `@vercel/next` builder.
    *   Node.js app (`orchestrator`) uses `@vercel/node` builder.
    *   Vercel automatically infers the output directories (`.next` for Next.js, `dist` for Node.js) based on the `src` (e.g., `apps/website/package.json`).

*   **`rewrites`:** Defines the routing for incoming requests to the Vercel deployment:
    *   `{ "source": "/", "destination": "/apps/website" }`: Maps the root domain to the `website` application.
    *   `{ "source": "/website/(.*)", "destination": "/apps/website/$1" }`: Maps `/website` sub-path to the `website` application.
    *   `{ "source": "/knisoci/(.*)", "destination": "/apps/knisoci/$1" }`: Maps `/knisoci` sub-path to the `knisoci` application.
    *   `{ "source": "/candyland/(.*)", "destination": "/apps/candyland/$1" }`: Maps `/candyland` sub-path to the `candyland` application.
    *   `{ "source": "/orchestrator/(.*)", "destination": "/apps/orchestrator/$1" }`: Maps `/orchestrator` sub-path to the `orchestrator` application.

### 6.3 Environment Variables in Vercel
*   **Automatic:** Supabase integration automatically populates core `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`.
*   **Manual:** All other shared environment variables (e.g., `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GEMINI_API_KEY`) are manually configured in Vercel project settings.
*   **Production URLs:** Variables like `NEXTAUTH_URL`, `NEXT_PUBLIC_SITE_URL`, `GOOGLE_REDIRECT_URI`, and `NEXT_PUBLIC_API_BASE_URL` are set to the production Vercel domain.

---

## 7. Current Status & Immediate Next Steps

*   **Phase 1 (Foundation & Stabilization): COMPLETE.**
*   **Local Environment:** Fully stable, all apps running correctly.
*   **Vercel Deployment:** Successful, all apps accessible via defined routes.
*   **Supabase Database:** Currently empty.
*   **Orchestrator Logging:** Temporarily disabled due to empty Supabase schema.
*   **Notion Integration:** Currently deferred.

**Immediate Next Step:**
1.  **Supabase Schema Synchronization:** Apply the `apps/knisoci/prisma/schema.prisma` to the Supabase database using `pnpm prisma migrate dev` from the `apps/knisoci` directory. This is critical to enable Orchestrator logging and data storage.

---

This document should provide Dan with a clear and comprehensive understanding of the SugarStudio monorepo's architecture.
