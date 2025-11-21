"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCronJobs = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const utils_1 = require("@sugarstudio/utils");
const queueService_1 = require("../services/queueService");
const foundation_1 = require("foundation");
const startCronJobs = () => {
    utils_1.logger.info('Starting cron jobs...');
    // Example: Run a task every minute
    node_cron_1.default.schedule('* * * * *', async () => {
        utils_1.logger.info('Running scheduled task: Minute heartbeat');
        const heartbeatTask = {
            id: (0, foundation_1.generateUniqueId)('heartbeat'),
            type: 'MONITOR_LOGS',
            payload: { source: 'Orchestrator Heartbeat' },
            createdAt: new Date().toISOString(),
        };
        await (0, queueService_1.enqueueTask)(heartbeatTask);
    });
    // Example: Run a daily maintenance task
    node_cron_1.default.schedule('0 0 * * *', async () => {
        utils_1.logger.info('Running scheduled task: Daily maintenance');
        const maintenanceTask = {
            id: (0, foundation_1.generateUniqueId)('maintenance'),
            type: 'RUN_MAINTENANCE',
            payload: { maintenanceType: 'Daily Cleanup' },
            createdAt: new Date().toISOString(),
        };
        await (0, queueService_1.enqueueTask)(maintenanceTask);
    });
    // Add more cron jobs as needed
};
exports.startCronJobs = startCronJobs;
