import dotenv from 'dotenv';
dotenv.config({ path: './.env.shared' });

import { getSupabase } from "@sugarstudio/supabase-client";

async function main() {
  console.log("Testing shared Supabase client…");
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("status_checks")
    .select("*")
    .limit(1);

  if (error) {
    console.error("❌ Error:", error.message);
  } else {
    console.log("✅ Shared client OK. Sample row:", data?.[0] ?? "(no rows yet)");
  }
}

main().then(() => process.exit(0));

