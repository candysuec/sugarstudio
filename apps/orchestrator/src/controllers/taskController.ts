import { Request, Response } from 'express';
import { logger } from '@sugarstudio/utils';
import { Task } from '../types/Task';
import { enqueueTask } from '../services/queueService';
import { generateSOP as generateSOPService } from '../services/sopsService';

export const createTask = async (req: Request, res: Response) => {
  try {
    const task: Task = req.body;
    logger.info(`Received new task: ${task.type}`);
    await enqueueTask(task);
    res.status(202).json({ message: 'Task received and enqueued', task });
  } catch (error: any) {
    logger.error(`Error creating task: ${error.message}`, error.stack);
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  // Placeholder for getting tasks (e.g., from a database or queue status)
  logger.info('Fetching tasks...');
  res.status(200).json({ message: 'Tasks fetched (placeholder)', tasks: [] });
};

export const generateSOP = async (req: Request, res: Response) => {
  try {
    const { sopName, content } = req.body;
    logger.info(`Request to generate SOP: ${sopName}`);
    const sopPath = await generateSOPService(sopName, content);
    res.status(200).json({ message: `SOP '${sopName}' generated successfully`, path: sopPath });
  } catch (error: any) {
    logger.error(`Error generating SOP: ${error.message}`, error.stack);
    res.status(500).json({ message: 'Failed to generate SOP', error: error.message });
  }
};
