import cron from 'node-cron';
import { logger } from '../utils/logger';
import { enqueueTask } from '../services/queueService';
import { Task } from '../types/Task';
import { generateId } from '@sugarstudio/utils';

export const startCronJobs = () => {
  logger.info('Starting cron jobs...');

  // Example: Run a task every minute
  cron.schedule('* * * * *', async () => {
    logger.info('Running scheduled task: Minute heartbeat');
    const heartbeatTask: Task = {
      id: generateId('heartbeat'),
      type: 'MONITOR_LOGS',
      payload: { source: 'Orchestrator Heartbeat' },
      createdAt: new Date().toISOString(),
    };
    await enqueueTask(heartbeatTask);
  });

  // Example: Run a daily maintenance task
  cron.schedule('0 0 * * *', async () => { // Every day at midnight
    logger.info('Running scheduled task: Daily maintenance');
    const maintenanceTask: Task = {
      id: generateId('maintenance'),
      type: 'RUN_MAINTENANCE',
      payload: { maintenanceType: 'Daily Cleanup' },
      createdAt: new Date().toISOString(),
    };
    await enqueueTask(maintenanceTask);
  });

  // Add more cron jobs as needed
};
