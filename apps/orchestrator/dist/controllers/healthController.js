"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealthStatus = void 0;
const utils_1 = require("@sugarstudio/utils");
const getHealthStatus = (req, res) => {
    utils_1.logger.info('Health check performed.');
    res.status(200).json({ status: 'Orchestrator is healthy', timestamp: new Date().toISOString() });
};
exports.getHealthStatus = getHealthStatus;
