import { dequeueTask } from '../services/queueService';
import { logger } from '../utils/logger';
import { Task } from '../types/Task';
import { logToSupabase } from '../services/supabaseService';
import { createNotionPage } from '../services/notionService';
import { generateSOPWithAI } from '../services/sopsService';
import { writeLogToFile } from '../services/logService';

const TASK_PROCESSING_INTERVAL = 5000; // Process tasks every 5 seconds

const processTask = async (task: Task) => {
  logger.info(`Processing task: ${task.type} (ID: ${task.id})`);
  await writeLogToFile(`Processing task: ${task.type} (ID: ${task.id})`);

  try {
    switch (task.type) {
      case 'MONITOR_LOGS':
        // Logic to monitor logs and events
        logger.info(`Monitoring logs for: ${task.payload.source}`);
        // Example: log to Supabase
        await logToSupabase({ level: 'info', message: `Monitored logs for ${task.payload.source}`, timestamp: new Date().toISOString() });
        break;
      case 'TRIGGER_WORKFLOW':
        // Logic to trigger a specific workflow
        logger.info(`Triggering workflow: ${task.payload.workflowName}`);
        // Example: create a Notion page
        await createNotionPage('YOUR_NOTION_DATABASE_ID', `Workflow Triggered: ${task.payload.workflowName}`, `Details: ${JSON.stringify(task.payload)}`);
        break;
      case 'GENERATE_SOP':
        // Logic to generate SOP using AI
        logger.info(`Generating SOP for: ${task.payload.topic}`);
        await generateSOPWithAI(task.payload.topic);
        break;
      case 'PROCESS_AI_TASK':
        // Logic to process AI tasks asynchronously
        logger.info(`Processing AI task: ${task.payload.aiModel}`);
        break;
      case 'SYNC_DATA':
        // Logic to sync data between Supabase, Notion, etc.
        logger.info(`Syncing data for: ${task.payload.entity}`);
        break;
      case 'RUN_MAINTENANCE':
        // Logic for scheduled maintenance
        logger.info(`Running maintenance task: ${task.payload.maintenanceType}`);
        break;
      default:
        logger.warn(`Unknown task type: ${task.type}`);
    }
    logger.info(`Task ${task.type} (ID: ${task.id}) completed successfully.`);
  } catch (error: any) {
    logger.error(`Error processing task ${task.type} (ID: ${task.id}): ${error.message}`, error.stack);
    await logToSupabase({ level: 'error', message: `Error processing task ${task.type}: ${error.message}`, timestamp: new Date().toISOString(), metadata: { taskId: task.id, error: error.message } });
  }
};

const taskWorkerLoop = async () => {
  const task = await dequeueTask();
  if (task) {
    await processTask(task);
  }
  setTimeout(taskWorkerLoop, TASK_PROCESSING_INTERVAL);
};

export const startTaskWorker = () => {
  logger.info('Task worker started.');
  taskWorkerLoop();
};
