import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Centralised Supabase service-role client for the orchestrator.
 * Uses SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from environment.
 */

let supabaseServiceClient: SupabaseClient | null = null;

export function getSupabaseServiceClient(): SupabaseClient {
  if (supabaseServiceClient) {
    return supabaseServiceClient;
  }

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase service client is not configured. SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set."
    );
  }

  supabaseServiceClient = createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return supabaseServiceClient;
}