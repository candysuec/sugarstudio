"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSOP = exports.getTasks = exports.createTask = void 0;
const utils_1 = require("@sugarstudio/utils");
const queueService_1 = require("../services/queueService");
const sopsService_1 = require("../services/sopsService");
const createTask = async (req, res) => {
    try {
        const task = req.body;
        utils_1.logger.info(`Received new task: ${task.type}`);
        await (0, queueService_1.enqueueTask)(task);
        res.status(202).json({ message: 'Task received and enqueued', task });
    }
    catch (error) {
        utils_1.logger.error(`Error creating task: ${error.message}`, error.stack);
        res.status(500).json({ message: 'Failed to create task', error: error.message });
    }
};
exports.createTask = createTask;
const getTasks = async (req, res) => {
    // Placeholder for getting tasks (e.g., from a database or queue status)
    utils_1.logger.info('Fetching tasks...');
    res.status(200).json({ message: 'Tasks fetched (placeholder)', tasks: [] });
};
exports.getTasks = getTasks;
const generateSOP = async (req, res) => {
    try {
        const { sopName, content } = req.body;
        utils_1.logger.info(`Request to generate SOP: ${sopName}`);
        const sopPath = await (0, sopsService_1.generateSOP)(sopName, content);
        res.status(200).json({ message: `SOP '${sopName}' generated successfully`, path: sopPath });
    }
    catch (error) {
        utils_1.logger.error(`Error generating SOP: ${error.message}`, error.stack);
        res.status(500).json({ message: 'Failed to generate SOP', error: error.message });
    }
};
exports.generateSOP = generateSOP;
