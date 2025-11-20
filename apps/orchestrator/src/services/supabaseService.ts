import { supabase } from "../utils/supabaseClient";
import { logger } from "../utils/logger";
import { Log } from "../types/Log";

export const logToSupabase = async (log: Log) => {
  try {
    const { error } = await supabase.from("orchestrator_logs").insert([log]);

    if (error) {
      logger.error("Error logging to Supabase:", error.message);
    } else {
      logger.info("Log successfully written to Supabase.");
    }
  } catch (error: any) {
    logger.error("Supabase logging failed:", error.message);
  }
};

export const getTasksFromSupabase = async () => {
  try {
    const { data, error } = await supabase.from("tasks").select("*");

    if (error) {
      logger.error("Error fetching tasks from Supabase:", error.message);
      return [];
    }

    return data;
  } catch (error: any) {
    logger.error("Supabase task fetching failed:", error.message);
    return [];
  }
};
