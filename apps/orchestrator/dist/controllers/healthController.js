import { logger } from '@sugarstudio/utils';
export const getHealthStatus = (req, res) => {
    logger.info('Health check performed.');
    res.status(200).json({ status: 'Orchestrator is healthy', timestamp: new Date().toISOString() });
};
