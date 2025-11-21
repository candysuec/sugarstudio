import { createClient } from '@supabase/supabase-js';

let supabase = null;

export function getSupabase() {
  if (!supabase) {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      throw new Error(
        'Supabase URL or Anon Key is not set. Make sure to load .env file before calling getSupabase.',
      );
    }
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return supabase;
}
