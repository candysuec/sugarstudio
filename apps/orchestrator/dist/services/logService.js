"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
exports.writeLogToFile = writeLogToFile;
const utils_1 = require("@sugarstudio/utils");
const supabase_client_1 = require("@sugarstudio/supabase-client");
const supabase = (0, supabase_client_1.getSupabaseClient)("server");
async function writeLogToFile(message) {
    try {
        utils_1.logger.info(`[writeLogToFile] ${message}`);
    }
    catch (err) {
        utils_1.logger.error("writeLogToFile failed:", err);
    }
}
class LogService {
    static async insertLog(entry) {
        utils_1.logger.info("LogService: Attempting to insert log into Supabase...");
        const { data, error } = await supabaseServerClient
            .from("orchestrator_logs")
            .insert(entry);
        if (error) {
            utils_1.logger.error("Error logging to Supabase:", error);
            return { success: false, error };
        }
        utils_1.logger.info("LogService: Log successfully inserted into Supabase.");
        return { success: true, data };
    }
    static async process(task) {
        const logEntry = {
            level: task?.level ?? "info",
            message: task?.message ?? "No message",
            metadata: task?.metadata ?? {},
            created_at: new Date().toISOString(),
        };
        return await this.insertLog(logEntry);
    }
}
exports.LogService = LogService;
exports.default = LogService;
