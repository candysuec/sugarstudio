import { dequeueTask } from "../services/queueService";
import { createNotionPage } from "../services/notionService";
import { generateSOPWithAI } from "../services/sopsService";
import LogService from "../services/logService";
import { logger } from "@sugarstudio/utils";
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
    logger.info(`Processing task: ${task.type} (ID: ${task.id})`);
    try {
        switch (task.type) {
            case "MONITOR_LOGS":
                logger.info(`Monitoring logs for: ${task.payload.source}`);
                await LogService.process(buildLog("info", `Monitored logs for ${task.payload.source}`, {
                    source: task.payload.source,
                }));
                break;
            case "TRIGGER_WORKFLOW":
                logger.info(`Triggering workflow: ${task.payload.workflowName}`);
                await createNotionPage("YOUR_NOTION_DATABASE_ID", `Workflow Triggered: ${task.payload.workflowName}`, `Payload: ${JSON.stringify(task.payload)}`);
                break;
            case "GENERATE_SOP":
                logger.info(`Generating SOP for: ${task.payload.topic}`);
                await generateSOPWithAI(task.payload.topic);
                break;
            case "PROCESS_AI_TASK":
                logger.info(`Processing AI task: ${task.payload.aiModel}`);
                break;
            case "SYNC_DATA":
                logger.info(`Syncing data for: ${task.payload.entity}`);
                break;
            case "RUN_MAINTENANCE":
                logger.info(`Running maintenance task: ${task.payload.maintenanceType}`);
                break;
            default:
                logger.warn(`Unknown task type: ${task.type}`);
        }
        logger.info(`Task ${task.type} (ID: ${task.id}) completed successfully.`);
        await LogService.process(buildLog("info", `Task ${task.type} completed`, { taskId: task.id }));
    }
    catch (error) {
        logger.error(`Error processing task ${task.type}: ${error.message}`);
        await LogService.process(buildLog("error", `Task ${task.type} failed`, {
            taskId: task.id,
            error: error.message,
        }));
    }
};
const taskWorkerLoop = async () => {
    const task = await dequeueTask();
    if (task)
        await processTask(task);
    setTimeout(taskWorkerLoop, TASK_PROCESSING_INTERVAL);
};
export const startTaskWorker = () => {
    logger.info("Task worker started.");
    taskWorkerLoop();
};
