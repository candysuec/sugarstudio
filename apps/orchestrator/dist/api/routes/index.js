"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// src/api/routes/index.ts
const express_1 = require("express");
const health_1 = require("./health");
const tasks_1 = require("./tasks");
exports.router = (0, express_1.Router)();
exports.router.use("/health", health_1.healthRouter);
exports.router.use("/tasks", tasks_1.tasksRouter);
