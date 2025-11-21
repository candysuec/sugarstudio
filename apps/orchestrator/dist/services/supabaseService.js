import { supabaseServerClient } from "@sugarstudio/supabase-client";
import { logger } from "@sugarstudio/utils";
export const logToSupabase = async (log) => {
    try {
        const { error } = await supabaseServerClient.from("orchestrator_logs").insert([log]);
        if (error) {
            logger.error("Error logging to Supabase:", error.message);
        }
        else {
            logger.info("Log successfully written to Supabase.");
        }
    }
    catch (error) {
        logger.error("Supabase logging failed:", error.message);
    }
};
export const getTasksFromSupabase = async () => {
    try {
        const { data, error } = await supabaseServerClient.from("tasks").select("*");
        if (error) {
            logger.error("Error fetching tasks from Supabase:", error.message);
            return [];
        }
        return data;
    }
    catch (error) {
        logger.error("Supabase task fetching failed:", error.message);
        return [];
    }
};
