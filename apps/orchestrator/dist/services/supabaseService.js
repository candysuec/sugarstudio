"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksFromSupabase = exports.logToSupabase = void 0;
const supabase_client_1 = require("@sugarstudio/supabase-client");
const utils_1 = require("@sugarstudio/utils");
const logToSupabase = async (log) => {
    try {
        const { error } = await supabase_client_1.supabaseServerClient.from("orchestrator_logs").insert([log]);
        if (error) {
            utils_1.logger.error("Error logging to Supabase:", error.message);
        }
        else {
            utils_1.logger.info("Log successfully written to Supabase.");
        }
    }
    catch (error) {
        utils_1.logger.error("Supabase logging failed:", error.message);
    }
};
exports.logToSupabase = logToSupabase;
const getTasksFromSupabase = async () => {
    try {
        const { data, error } = await supabase_client_1.supabaseServerClient.from("tasks").select("*");
        if (error) {
            utils_1.logger.error("Error fetching tasks from Supabase:", error.message);
            return [];
        }
        return data;
    }
    catch (error) {
        utils_1.logger.error("Supabase task fetching failed:", error.message);
        return [];
    }
};
exports.getTasksFromSupabase = getTasksFromSupabase;
