export declare const createSupabaseClient: () => import('@supabase/supabase-js').SupabaseClient<
  any,
  'public',
  'public',
  any,
  any
>;
export type SupabaseClient = ReturnType<typeof createSupabaseClient>;
