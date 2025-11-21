"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTaskWorker = void 0;
const queueService_1 = require("../services/queueService");
const notionService_1 = require("../services/notionService");
const sopsService_1 = require("../services/sopsService");
const logService_1 = __importDefault(require("../services/logService"));
const utils_1 = require("@sugarstudio/utils");
const TASK_PROCESSING_INTERVAL = 5000;
function buildLog(level, message, metadata = {}) {
    return {
        level,
        message,
        metadata,
        created_at: new Date().toISOString(),
    };
}
const processTask = async (task) => {
    utils_1.logger.info(`Processing task: ${task.type} (ID: ${task.id})`);
    try {
        switch (task.type) {
            case "MONITOR_LOGS":
                utils_1.logger.info(`Monitoring logs for: ${task.payload.source}`);
                await logService_1.default.process(buildLog("info", `Monitored logs for ${task.payload.source}`, {
                    source: task.payload.source,
                }));
                break;
            case "TRIGGER_WORKFLOW":
                utils_1.logger.info(`Triggering workflow: ${task.payload.workflowName}`);
                await (0, notionService_1.createNotionPage)("YOUR_NOTION_DATABASE_ID", `Workflow Triggered: ${task.payload.workflowName}`, `Payload: ${JSON.stringify(task.payload)}`);
                break;
            case "GENERATE_SOP":
                utils_1.logger.info(`Generating SOP for: ${task.payload.topic}`);
                await (0, sopsService_1.generateSOPWithAI)(task.payload.topic);
                break;
            case "PROCESS_AI_TASK":
                utils_1.logger.info(`Processing AI task: ${task.payload.aiModel}`);
                break;
            case "SYNC_DATA":
                utils_1.logger.info(`Syncing data for: ${task.payload.entity}`);
                break;
            case "RUN_MAINTENANCE":
                utils_1.logger.info(`Running maintenance task: ${task.payload.maintenanceType}`);
                break;
            default:
                utils_1.logger.warn(`Unknown task type: ${task.type}`);
        }
        utils_1.logger.info(`Task ${task.type} (ID: ${task.id}) completed successfully.`);
        await logService_1.default.process(buildLog("info", `Task ${task.type} completed`, { taskId: task.id }));
    }
    catch (error) {
        utils_1.logger.error(`Error processing task ${task.type}: ${error.message}`);
        await logService_1.default.process(buildLog("error", `Task ${task.type} failed`, {
            taskId: task.id,
            error: error.message,
        }));
    }
};
const taskWorkerLoop = async () => {
    const task = await (0, queueService_1.dequeueTask)();
    if (task)
        await processTask(task);
    setTimeout(taskWorkerLoop, TASK_PROCESSING_INTERVAL);
};
const startTaskWorker = () => {
    utils_1.logger.info("Task worker started.");
    taskWorkerLoop();
};
exports.startTaskWorker = startTaskWorker;
