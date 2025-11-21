import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL and/or Anon Key are not set.');
    // Depending on the environment, you might want to throw an error or handle this differently
    // For now, we'll return a client that will likely fail on operations.
}
export const createSupabaseClient = () => {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase URL and/or Anon Key are not set. Please check your environment variables.');
    }
    return createClient(supabaseUrl, supabaseAnonKey);
};
