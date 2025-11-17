# Orchestrator

The Orchestrator is the central automation brain for the SugarStudio system. It is a Node.js + Express application designed to run as a long-running background worker.

## Purpose

*   Monitor logs and events from KniSoci and Candyland.
*   Trigger background jobs and workflows.
*   Manage SOP generation.
*   Process AI tasks asynchronously.
*   Sync tasks and tickets between Supabase, Notion, and other tools.
*   Run scheduled maintenance tasks (via cron).
*   Provide REST API endpoints for internal communication.
*   Provide an internal dashboard (future).
*   Write structured logs to Supabase, file system, and local markdown.
*   Execute job runners and queue processing.

## Architecture

```
apps/orchestrator/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts            # Express bootstrap
│   ├── server.ts           # Main server
│   ├── routes/
│   │   ├── health.ts
│   │   ├── tasks.ts
│   │   ├── logs.ts
│   ├── controllers/
│   │   ├── healthController.ts
│   │   ├── taskController.ts
│   │   ├── logController.ts
│   ├── services/
│   │   ├── supabaseService.ts
│   │   ├── notionService.ts
│   │   ├── sopsService.ts
│   │   ├── queueService.ts
│   ├── workers/
│   │   ├── taskWorker.ts
│   │   ├── cronJobs.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── env.ts
│   ├── types/
│   │   ├── Task.ts
│   │   ├── Log.ts
├── logs/
│   ├── orchestrator.log
│   ├── tasks.md
└── README.md
```

## Getting Started

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```
2.  **Build the project:**
    ```bash
    pnpm run build
    ```
3.  **Run in development mode:**
    ```bash
    pnpm run dev
    ```
4.  **Start in production mode:**
    ```bash
    pnpm run start
    ```

## Environment Variables

Create a `.env.local` file in this directory based on `.env.example`.

*   `PORT`: Port for the Express server (default: 3010)
*   `SUPABASE_URL`: Supabase project URL
*   `SUPABASE_ANON_KEY`: Supabase public anon key
*   `NOTION_API_KEY`: Notion integration API key
*   `NOTION_DATABASE_ID`: Notion database ID for task/SOP tracking

## API Endpoints

*   `GET /health`: Check the health status of the orchestrator.
*   `POST /tasks`: Enqueue a new task for processing.
*   `GET /tasks`: (Placeholder) Get a list of tasks.
*   `POST /tasks/generate-sop`: Trigger SOP generation.
*   `GET /logs`: Retrieve logs from the file system.
