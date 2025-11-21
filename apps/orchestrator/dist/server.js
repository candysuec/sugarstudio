import express from 'express';
import cors from 'cors';
import { logger } from '@sugarstudio/utils';
import { PORT } from './utils/env';
// Import routes
import healthRoutes from './routes/health';
import taskRoutes from './routes/tasks';
import logRoutes from './routes/logs';
import { startAIJobWorker } from "./workers/aiJobWorker";
const app = express();
// Start the AI Job Worker when the server bootstraps
startAIJobWorker();
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use('/health', healthRoutes);
app.use('/tasks', taskRoutes);
app.use('/logs', logRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(`Unhandled error: ${err.message}`, err.stack);
    res.status(500).send('Something broke!');
});
export const startServer = () => {
    app.listen(PORT, () => {
        logger.info(`Orchestrator server listening on port ${PORT}`);
    });
};
