import { Request, Response } from 'express';
import { logger } from '../utils/logger';

export const getHealthStatus = (req: Request, res: Response) => {
  logger.info('Health check performed.');
  res.status(200).json({ status: 'Orchestrator is healthy', timestamp: new Date().toISOString() });
};
