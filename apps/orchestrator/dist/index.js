import dotenv from 'dotenv';
dotenv.config({ path: '../orchestrator/.env.local' }); // Explicitly load environment variables with a simpler relative path
import { startServer } from './server';
import { logger } from '@sugarstudio/utils';
import { startCronJobs } from './workers/cronJobs';
import { startTaskWorker } from './workers/taskWorker';
async function bootstrap() {
    logger.info('Starting Orchestrator...');
    // Start the Express server
    startServer();
    // Start background workers
    startTaskWorker();
    startCronJobs();
    logger.info('Orchestrator started successfully.');
}
bootstrap().catch((error) => {
    logger.error('Failed to start Orchestrator:', error);
    process.exit(1);
});
