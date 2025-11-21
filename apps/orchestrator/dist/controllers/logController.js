"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogs = void 0;
const utils_1 = require("@sugarstudio/utils");
const getLogs = async (req, res) => {
    try {
        const rawLogType = req.query.type;
        const logType = (rawLogType === 'tasks') ? 'tasks' : 'orchestrator';
        const logs = await (0, utils_1.getLogsFromFile)(logType);
        res.status(200).json({ logs });
    }
    catch (error) {
        utils_1.logger.error(`Error fetching logs: ${error.message}`, error.stack);
        res.status(500).json({ message: 'Failed to fetch logs', error: error.message });
    }
};
exports.getLogs = getLogs;
