# SugarStudio Monorepo Onboarding Reference

This document summarizes the current state, key configurations, and deployment strategy for the SugarStudio monorepo. It covers the setup process, environment variable management, GitHub integration, and Vercel deployment.

---

## 1. Project Overview

SugarStudio is an AI-assisted brand intelligence platform. It is structured as a monorepo containing four core applications:

*   **`website`**: The public marketing site.
*   **`knisoci`**: The customer-facing AI companion app.
*   **`candyland`**: The business admin and internal tooling.
*   **`orchestrator`**: The automation engine and SOP system (backend service).

---

## 2. Local Development Setup

### Monorepo Structure
*   **Root Directory:** `~/dev/sugarstudio`
*   **Package Manager:** `pnpm` (used for all monorepo operations)

### Local Ports
All applications are configured to run on specific ports for local development:
*   **`website`**: `http://localhost:3000`
*   **`knisoci`**: `http://localhost:3002`
*   **`candyland`**: `http://localhost:3003`
*   **`orchestrator`**: `http://localhost:3004` (Backend API, no direct UI)

### Environment Variable Strategy
SugarStudio uses a two-layer environment variable system:
*   **`~/dev/sugarstudio/.env.shared`**: Contains global, shared environment variables (e.g., Supabase credentials, API keys, NextAuth secret).
*   **`apps/<app>/.env.local`**: Each application has its own `.env.local` file for app-specific overrides (e.g., local port, app-specific public variables).

### Environment Variable Synchronization (`scripts/sync-envs.sh`)
The `scripts/sync-envs.sh` script is crucial for propagating shared variables and handling overrides:
*   It loads variables from `.env.shared`.
*   It then loads variables from each app's `.env.local`, allowing app-specific values to override shared ones.
*   It performs variable expansion (e.g., `${SUPABASE_URL}`).
*   It writes a self-contained `.env.local` file for each app, ensuring all necessary variables are present without relying on `source` commands within the `.env.local` files themselves.

### Orchestrator Environment Loading
The `orchestrator` (a Node.js/TypeScript app) explicitly loads its environment variables:
*   `apps/orchestrator/src/index.ts` contains `dotenv.config({ path: '../orchestrator/.env.local' });` to ensure `dotenv` finds the correct `.env.local` file.

### Running Locally
To start all applications in development mode:
```bash
pnpm run dev
```

---

## 3. GitHub Integration

*   **Repository:** `https://github.com/candysuec/sugarstudio.git`
*   All local changes are committed and pushed to the `main` branch.
*   Vercel is configured for continuous deployment from this repository.

---

## 4. Vercel Deployment

### Strategy
The monorepo is deployed as a **single Vercel project** with **sub-path routing**. This means each application is accessible via a specific path on the main Vercel domain.

### `vercel.json` Configuration
A `vercel.json` file at the monorepo root (`~/dev/sugarstudio/vercel.json`) defines the deployment and routing rules:

```json
{
  "rewrites": [
    { "source": "/", "destination": "/apps/website" },
    { "source": "/website/(.*)", "destination": "/apps/website/$1" },
    { "source": "/knisoci/(.*)", "destination": "/apps/knisoci/$1" },
    { "source": "/candyland/(.*)", "destination": "/apps/candyland/$1" },
    { "source": "/orchestrator/(.*)", "destination": "/apps/orchestrator/$1" }
  ],
  "builds": [
    {
      "src": "apps/website/package.json",
      "use": "@vercel/next"
    },
    {
      "src": "apps/knisoci/package.json",
      "use": "@vercel/next"
    },
    {
      "src": "apps/candyland/package.json",
      "use": "@vercel/next"
    },
    {
      "src": "apps/orchestrator/package.json",
      "use": "@vercel/node"
    }
  ]
}
```

### Accessing Deployed Applications
Assuming your Vercel domain is `https://sugarstudio-apha.vercel.app` (or your custom domain):
*   **Website:** `https://sugarstudio-apha.vercel.app/` (root path) or `https://sugarstudio-apha.vercel.app/website`
*   **KniSoci:** `https://sugarstudio-apha.vercel.app/knisoci`
*   **Candyland:** `https://sugarstudio-apha.vercel.app/candyland`
*   **Orchestrator:** `https://sugarstudio-apha.vercel.app/orchestrator` (Backend API)

### Environment Variables in Vercel
*   **Supabase Integration:** Vercel's automatic Supabase integration handles core `DATABASE_URL`, `SUPABASE_URL`, and `SUPABASE_ANON_KEY`.
*   **Manual Variables:** All other non-Supabase environment variables from `.env.shared` (e.g., `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GEMINI_API_KEY`, `OPENAI_API_KEY`) must be manually added to the Vercel project settings.
*   **Production URLs:** Variables like `NEXTAUTH_URL`, `NEXT_PUBLIC_SITE_URL`, `GOOGLE_REDIRECT_URI`, and `NEXT_PUBLIC_API_BASE_URL` must be updated in Vercel to reflect the production Vercel domain (e.g., `https://sugarstudio-apha.vercel.app`).

---

## 5. Key Configurations & Fixes Implemented

This section highlights critical adjustments made during setup:

*   **Port Alignment:** Ensured all applications run on their intended local ports (3000, 3002, 3003, 3004).
*   **Orchestrator ENV Loading:** Resolved persistent issues with Orchestrator not loading environment variables through:
    *   Rewriting `scripts/sync-envs.sh` for robust variable propagation and expansion.
    *   Explicitly calling `dotenv.config()` with a relative path in `apps/orchestrator/src/index.ts`.
*   **API Key Updates:** Updated `GEMINI_API_KEY` and `GOOGLE_API_KEY` in `.env.shared`.
*   **Notion Integration:** Temporarily disabled Notion-related code and warnings in the Orchestrator as integration is deferred.
*   **Supabase Logging:** Temporarily disabled Supabase logging in the Orchestrator (`apps/orchestrator/src/services/supabaseService.ts`) to prevent errors with an unsynced database.
*   **Vercel `vercel.json`:** Corrected `outputDirectory` settings and added a root path rewrite for the `website` application.

---

## 6. Outstanding Items / Next Steps

*   **Supabase Schema Sync:** The Supabase database is currently empty. A schema needs to be synced (e.g., via Prisma migrations or direct SQL) to enable full Supabase functionality, especially for Orchestrator logging.
*   **Re-enable Supabase Logging:** Once the Supabase schema is synced, re-enable `logToSupabase` in `apps/orchestrator/src/services/supabaseService.ts`.
*   **Website Root Loading:** Confirm the `website` application loads correctly on the root Vercel domain.
*   **Re-enable Notion Integration:** If and when Notion integration is desired, re-enable the relevant code and environment variables.
*   **Docker Integration:** (User mentioned Dan's notes, but not addressed yet). Investigate Docker setup if required for specific environments or local development.
