import { Request, Response } from 'express';
import { logger } from '@sugarstudio/utils';

export const getHealthStatus = (req: Request, res: Response) => {
  logger.info('Health check performed.');
  res.status(200).json({ status: 'Orchestrator is healthy', timestamp: new Date().toISOString() });
};
