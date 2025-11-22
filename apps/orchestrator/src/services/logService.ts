import { getSupabaseServiceClient } from "./supabaseService";

export type LogLevel = "info" | "warn" | "error";

export interface OrchestratorLogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  metadata?: Record<string, unknown>; // Added metadata property
  created_at?: string;
}

/**
 * Writes a log entry into the `orchestrator_logs` table in Supabase.
 * If the table does not exist yet, this will fail at runtime but will not
 * block TypeScript compilation.
 */
export async function logOrchestratorEvent(
  entry: OrchestratorLogEntry
): Promise<void> {
  try {
    const client = getSupabaseServiceClient();

    const payload = {
      level: entry.level,
      message: entry.message,
      context: entry.context ?? null,
      created_at: entry.created_at ?? new Date().toISOString(),
    };

    const { error } = await client.from("orchestrator_logs").insert(payload);

    if (error) {
      console.error("[orchestrator] Failed to insert log entry:", error);
    }
  } catch (err) {
    console.error(
      "[orchestrator] Error initialising Supabase service client:",
      err
    );
  }
}