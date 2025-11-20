# SugarStudio Monorepo

Welcome to the SugarStudio Monorepo! This repository houses all the applications and packages that make up the SugarStudio platform, designed to empower creators and businesses with AI-driven tools.

## 🚀 Project Overview

SugarStudio is a comprehensive platform combining brand identity generation and AI-powered system resilience. It merges creative intelligence (branding tools) with operational intelligence (self-healing DevOps), producing an autonomous system that can generate complete brand identities, maintain uptime and integrity via self-repair, and continuously monitor health, security, and performance.

## 📦 Monorepo Structure

This monorepo is managed with [pnpm](https://pnpm.io/) and [TurboRepo](https://turbo.build/).

-   `apps/candyland`: The main Creator Studio frontend application (Next.js).
-   `apps/knisoci`: The Brand Strategy OS backend/API application (Next.js API Routes).
-   `apps/orchestrator`: The background task processing and cron job runner (Node.js/Express).
-   `apps/website`: The marketing website (Next.js).
-   `packages/ui`: A shared UI component library built with React, Tailwind CSS, and Shadcn UI.
-   `packages/utils`: A shared utility library for common functions, API clients, and helpers.

## 🛠️ Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
-   [pnpm](https://pnpm.io/installation) (v8 or higher recommended)
-   [Git](https://git-scm.com/downloads)
-   [Docker](https://www.docker.com/products/docker-desktop) (for local Supabase setup)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/candysuec/sugarstudio.git
    cd sugarstudio
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Environment Variables:**
    This monorepo uses a two-layer environment variable system:
    -   `./.env.shared`: Stores global environment variables (e.g., Supabase credentials, Gemini API Key, NextAuth secrets).
    -   `apps/<app>/.env.local`: Stores app-specific overrides (e.g., port numbers, local NextAuth URLs).

    **Setup:**
    -   Create a `.env.shared` file in the root of the monorepo based on a template (if provided).
    -   Create `.env.local` files in each `apps/<app>` directory as needed, referencing the shared file:
        ```
        # apps/candyland/.env.local
        source ../../.env.shared
        PORT=3005
        NEXTAUTH_URL=http://localhost:3005
        NEXT_PUBLIC_SITE_URL=http://localhost:3005
        ```
        (Adjust ports and URLs as per your local setup and app requirements).

4.  **Local Supabase Setup (Optional, but recommended for full local development):**
    If you are using Supabase locally via Docker, ensure your Docker environment is running and your `DATABASE_URL` in `.env.shared` points to your local Supabase instance.

### Running Development Servers

To start all applications in development mode:

```bash
pnpm dev
```

This command uses TurboRepo to run the `dev` script for all applications in parallel.

### Running Specific Applications

You can run individual applications using pnpm:

```bash
pnpm --filter candyland dev
pnpm --filter knisoci dev
pnpm --filter orchestrator dev
pnpm --filter website dev
```

## 🧹 Linting & Formatting

This monorepo uses ESLint and Prettier for code quality and consistency.

-   **Lint all packages:**
    ```bash
    pnpm lint
    ```
-   **Format all files:**
    ```bash
    pnpm format
    ```
-   **Type check all packages:**
    ```bash
    pnpm typecheck
    ```

## ⬆️ Automated Versioning (Changesets)

This monorepo uses [Changesets](https://github.com/changesets/changesets) for automated versioning and release management.

-   **Add a new changeset:** When you make changes that should be included in the next release, run:
    ```bash
    pnpm changeset add
    ```
    Follow the prompts to describe your changes and specify the version bump for affected packages.
-   **Version packages:** To apply version bumps and generate changelogs based on existing changesets:
    ```bash
    pnpm changeset version
    ```
-   **Release packages:** To publish new versions to npm (requires authentication and permissions):
    ```bash
    pnpm changeset publish
    ```

## 🚀 Deployment

Each application (`candyland`, `knisoci`, `website`) is intended to be deployed independently, likely to Vercel. Refer to the individual `apps/<app>/README.md` for app-specific deployment instructions.

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and submit pull requests. Ensure your changes are covered by tests and pass linting/type-checking.

---

This `README.md` provides a high-level overview. For more detailed information on specific applications or features, please refer to their respective directories.
