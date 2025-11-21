import { logger, getLogsFromFile } from '@sugarstudio/utils';
export const getLogs = async (req, res) => {
    try {
        const rawLogType = req.query.type;
        const logType = (rawLogType === 'tasks') ? 'tasks' : 'orchestrator';
        const logs = await getLogsFromFile(logType);
        res.status(200).json({ logs });
    }
    catch (error) {
        logger.error(`Error fetching logs: ${error.message}`, error.stack);
        res.status(500).json({ message: 'Failed to fetch logs', error: error.message });
    }
};
