# Monorepo Folder Map

This document provides an overview of the SugarStudio monorepo structure,
explaining the purpose and contents of each major directory and application/package.

## Table of Contents
1.  [Root Directory](#root-directory)
2.  [Apps (`apps/`)](#apps)
    *   [website](#website)
    *   [knisoci](#knisoci)
    *   [candyland](#candyland)
    *   [orchestrator](#orchestrator)
3.  [Packages (`packages/`)](#packages)
    *   [config](#config)
    *   [foundation](#foundation)
    *   [shared-utils](#shared-utils)
    *   [supabase-client](#supabase-client)
    *   [ui](#ui)
    *   [utils](#utils)
4.  [Other Top-Level Directories](#other-top-level-directories)

---

## 1. Root Directory (`/`)
The root directory contains global configurations, development scripts, and shared assets for the entire monorepo.

*   `.env.shared`: Centralized environment variables shared across all applications.
*   `.github/`: GitHub Actions workflows for CI/CD.
*   `apps/`: Contains all standalone applications within the monorepo.
*   `packages/`: Contains shared packages/libraries used by applications.
*   `pnpm-lock.yaml`: pnpm lockfile for consistent dependency installations.
*   `pnpm-workspace.yaml`: Defines the monorepo workspaces for pnpm.
*   `turbo.json`: Turborepo configuration for optimized builds and task management.
*   `vercel.json`: Vercel deployment configuration for the monorepo.
*   `scripts/`: Utility scripts for development and maintenance (e.g., `sync-envs.sh`).
*   `README.md`: General project overview.
*   `monorepo-pre-deploy-check.sh`: Script to validate monorepo before Vercel deploy.
*   `cleanup-candyland.sh`: Script to clean up candyland application.

## 2. Apps (`apps/`)
This directory holds all independent applications that are part of the SugarStudio platform.

### website (`apps/website/`)
*   **Description:** The main marketing website for SugarStudio.
*   **Technology:** Next.js (App Router), React, TypeScript, Tailwind CSS.
*   **Key Features:** Public-facing content, marketing pages, contact forms, blog.
*   **Status:** Decoupled from `@sugarstudio/ui`, builds cleanly.

### knisoci (`apps/knisoci/`)
*   **Description:** The KniSoci SaaS application, focusing on brand identity generation and AI-powered system resilience.
*   **Technology:** Next.js (App Router), React, TypeScript, Tailwind CSS, NextAuth.js (Google OAuth), Prisma, PostgreSQL, Google Gemini API.
*   **Key Features:** Brand discovery, messaging matrix, content pillars, AI post ideas, color palette generation, self-repair mechanisms, admin dashboard.
*   **Status:** Dependencies resolved, API routes configured for Node.js runtime, builds cleanly.

### candyland (`apps/candyland/`)
*   **Description:** A Next.js application, potentially a creator studio or user workspace.
*   **Technology:** Next.js (App Router), React, TypeScript, Prisma, PostgreSQL.
*   **Key Features:** Onboarding workflow, dashboard with various AI generation tools (placeholders currently).
*   **Status:** Decoupled from `@sugarstudio/ui`, uses placeholder components, builds cleanly.

### orchestrator (`apps/orchestrator/`)
*   **Description:** A backend service responsible for orchestrating background jobs, cron tasks, and potentially API calls between services.
*   **Technology:** Node.js, TypeScript, Express.js (or similar), Prisma, PostgreSQL.
*   **Key Features:** Automated tasks, API for job dispatching, system health monitoring.
*   **Status:** Prisma client generation configured for Vercel deployment.

## 3. Packages (`packages/`)
This directory contains reusable code, components, and configurations shared across the applications.

### config (`packages/config/`)
*   **Description:** Shared configuration files for ESLint and TypeScript across the monorepo.
*   **Contents:** `eslint/`, `tsconfig/`.

### foundation (`packages/foundation/`)
*   **Description:** Core foundational utilities and services for the platform.
*   **Contents:** Common utilities, potentially base classes or interfaces.

### shared-utils (`packages/shared-utils/`)
*   **Description:** General utility functions and helpers shared across multiple projects.

### supabase-client (`packages/supabase-client/`)
*   **Description:** A client library for interacting with the Supabase backend.
*   **Contents:** Client setup, authentication helpers, database access functions.

### ui (`packages/ui/`)
*   **Description:** (Formerly) A shared UI component library. Currently being decoupled.
*   **Status:** Not actively used by `website` or `candyland` for the monorepo deployment. Its future use requires re-evaluation.

### utils (`packages/utils/`)
*   **Description:** General purpose utility functions, similar to `shared-utils` but potentially more focused on core application logic.

## 4. Other Top-Level Directories

*   `.git/`: Git version control metadata.
*   `.turbo/`: Turborepo cache directory.
*   `node_modules/`: Centralized node modules installed by pnpm.
*   `project_updates/`: Documentation and reports related to project updates and status.
*   `supabase/`: Supabase local development configuration and migrations.
