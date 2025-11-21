"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDemoWorker = runDemoWorker;
// src/tasks/workers/demoWorker.ts
const logger_1 = require("../../core/logger");
const prisma_1 = require("../../core/prisma");
async function runDemoWorker() {
    logger_1.logger.info("Running demo worker…");
    // Example query just to ensure Prisma + DB is wired
    const now = await prisma_1.prisma.$queryRaw `SELECT NOW()`;
    logger_1.logger.info("DB responded with:", now);
    return { timestamp: now };
}
