"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runScheduledJobs = runScheduledJobs;
// src/jobs/index.ts
const logger_1 = require("../core/logger");
async function runScheduledJobs() {
    logger_1.logger.info("No cron jobs configured yet.");
}
