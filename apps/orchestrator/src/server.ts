import express from 'express';
import cors from 'cors';
import { logger } from './utils/logger';
import { PORT } from './utils/env';

// Import routes
import healthRoutes from './routes/health';
import taskRoutes from './routes/tasks';
import logRoutes from './routes/logs';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/health', healthRoutes);
app.use('/tasks', taskRoutes);
app.use('/logs', logRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`Unhandled error: ${err.message}`, err.stack);
  res.status(500).send('Something broke!');
});

export const startServer = () => {
  app.listen(PORT, () => {
    logger.info(`Orchestrator server listening on port ${PORT}`);
  });
};
