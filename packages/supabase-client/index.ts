import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseBrowserClient = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseServerClient = createClient(process.env.SUPABASE_URL, supabaseServiceRoleKey);

export function getSupabaseClient(client = 'browser') {
  if (client === 'server') {
    return supabaseServerClient;
  }
  return supabaseBrowserClient;
}

export async function saveScan({ result, sourceApp, userId }) {
  const { data, error } = await supabaseServerClient
    .from('scans')
    .insert([{ result: JSON.stringify(result), source_app: sourceApp, user_id: userId }])
    .select();

  if (error) {
    console.error('Error inserting scan into Supabase:', error);
    throw new Error('Failed to save scan to database.');
  }

  console.log('Scan saved to Supabase:', data);
  return data[0];
}

export async function getAllScans() {
  const { data, error } = await supabaseServerClient.from('scans').select('*');

  if (error) {
    console.error('Error fetching scans from Supabase:', error);
    throw new Error('Failed to fetch scans from database.');
  }

  return data;
}
