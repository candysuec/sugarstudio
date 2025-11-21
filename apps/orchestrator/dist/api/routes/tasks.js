"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
// src/api/routes/tasks.ts
const express_1 = require("express");
const logger_1 = require("../../core/logger");
const tasks_1 = require("../../tasks");
exports.tasksRouter = (0, express_1.Router)();
exports.tasksRouter.post("/demo", async (_req, res, next) => {
    try {
        logger_1.logger.info("Received demo task");
        const result = await (0, tasks_1.runDemoTask)();
        res.json({ ok: true, result });
    }
    catch (err) {
        next(err);
    }
});
