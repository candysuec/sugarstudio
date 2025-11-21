"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDemoTask = runDemoTask;
// src/tasks/index.ts
const demoWorker_1 = require("./workers/demoWorker");
async function runDemoTask() {
    return (0, demoWorker_1.runDemoWorker)();
}
