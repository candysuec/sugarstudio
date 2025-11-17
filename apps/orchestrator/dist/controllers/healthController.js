"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealthStatus = void 0;
var logger_1 = require("../utils/logger");
var getHealthStatus = function (req, res) {
    logger_1.logger.info('Health check performed.');
    res.status(200).json({ status: 'Orchestrator is healthy', timestamp: new Date().toISOString() });
};
exports.getHealthStatus = getHealthStatus;
