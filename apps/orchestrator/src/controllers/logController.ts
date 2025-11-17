import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { getLogsFromFile } from '../utils/logger';

export const getLogs = async (req: Request, res: Response) => {
  try {
    const rawLogType = req.query.type as string;
    const logType: 'orchestrator' | 'tasks' = (rawLogType === 'tasks') ? 'tasks' : 'orchestrator';
    const logs = await getLogsFromFile(logType);
    res.status(200).json({ logs });
  } catch (error: any) {
    logger.error(`Error fetching logs: ${error.message}`, error.stack);
    res.status(500).json({ message: 'Failed to fetch logs', error: error.message });
  }
};
