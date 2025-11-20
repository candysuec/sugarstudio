import { createClient } from "@supabase/supabase-js";

console.log("DEBUG: Initializing Supabase with URL:", process.env.SUPABASE_URL);
console.log(
  "DEBUG: Using Key (service role):",
);

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
