"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../orchestrator/.env.local' }); // Explicitly load environment variables with a simpler relative path
const server_1 = require("./server");
const utils_1 = require("@sugarstudio/utils");
const cronJobs_1 = require("./workers/cronJobs");
const taskWorker_1 = require("./workers/taskWorker");
async function bootstrap() {
    utils_1.logger.info('Starting Orchestrator...');
    // Start the Express server
    (0, server_1.startServer)();
    // Start background workers
    (0, taskWorker_1.startTaskWorker)();
    (0, cronJobs_1.startCronJobs)();
    utils_1.logger.info('Orchestrator started successfully.');
}
bootstrap().catch((error) => {
    utils_1.logger.error('Failed to start Orchestrator:', error);
    process.exit(1);
});
