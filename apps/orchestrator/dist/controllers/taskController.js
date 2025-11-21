import { logger } from '@sugarstudio/utils';
import { enqueueTask } from '../services/queueService';
import { generateSOP as generateSOPService } from '../services/sopsService';
export const createTask = async (req, res) => {
    try {
        const task = req.body;
        logger.info(`Received new task: ${task.type}`);
        await enqueueTask(task);
        res.status(202).json({ message: 'Task received and enqueued', task });
    }
    catch (error) {
        logger.error(`Error creating task: ${error.message}`, error.stack);
        res.status(500).json({ message: 'Failed to create task', error: error.message });
    }
};
export const getTasks = async (req, res) => {
    // Placeholder for getting tasks (e.g., from a database or queue status)
    logger.info('Fetching tasks...');
    res.status(200).json({ message: 'Tasks fetched (placeholder)', tasks: [] });
};
export const generateSOP = async (req, res) => {
    try {
        const { sopName, content } = req.body;
        logger.info(`Request to generate SOP: ${sopName}`);
        const sopPath = await generateSOPService(sopName, content);
        res.status(200).json({ message: `SOP '${sopName}' generated successfully`, path: sopPath });
    }
    catch (error) {
        logger.error(`Error generating SOP: ${error.message}`, error.stack);
        res.status(500).json({ message: 'Failed to generate SOP', error: error.message });
    }
};
