import { logger } from "@sugarstudio/utils";
import { supabaseServerClient } from "@sugarstudio/supabase-client";
export async function writeLogToFile(message) {
    try {
        logger.info(`[writeLogToFile] ${message}`);
    }
    catch (err) {
        logger.error("writeLogToFile failed:", err);
    }
}
export class LogService {
    static async insertLog(entry) {
        logger.info("LogService: Attempting to insert log into Supabase...");
        const { data, error } = await supabaseServerClient
            .from("orchestrator_logs")
            .insert(entry);
        if (error) {
            logger.error("Error logging to Supabase:", error);
            return { success: false, error };
        }
        logger.info("LogService: Log successfully inserted into Supabase.");
        return { success: true, data };
    }
    static async process(task) {
        var _a, _b, _c;
        const logEntry = {
            level: (_a = task === null || task === void 0 ? void 0 : task.level) !== null && _a !== void 0 ? _a : "info",
            message: (_b = task === null || task === void 0 ? void 0 : task.message) !== null && _b !== void 0 ? _b : "No message",
            metadata: (_c = task === null || task === void 0 ? void 0 : task.metadata) !== null && _c !== void 0 ? _c : {},
            created_at: new Date().toISOString(),
        };
        return await this.insertLog(logEntry);
    }
}
export default LogService;
