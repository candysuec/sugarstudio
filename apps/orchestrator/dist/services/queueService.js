"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueueSize = exports.dequeueTask = exports.enqueueTask = void 0;
const utils_1 = require("@sugarstudio/utils");
// This is a very basic in-memory queue for demonstration purposes.
// In a production environment, you would use a robust message queue like RabbitMQ, Kafka, or a cloud-managed service.
const taskQueue = [];
const enqueueTask = async (task) => {
    taskQueue.push(task);
    utils_1.logger.info(`Task enqueued: ${task.type}. Current queue size: ${taskQueue.length}`);
};
exports.enqueueTask = enqueueTask;
const dequeueTask = async () => {
    const task = taskQueue.shift();
    if (task) {
        utils_1.logger.info(`Task dequeued: ${task.type}. Current queue size: ${taskQueue.length}`);
    }
    return task;
};
exports.dequeueTask = dequeueTask;
const getQueueSize = () => {
    return taskQueue.length;
};
exports.getQueueSize = getQueueSize;
