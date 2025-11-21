import { logger } from '@sugarstudio/utils';
// This is a very basic in-memory queue for demonstration purposes.
// In a production environment, you would use a robust message queue like RabbitMQ, Kafka, or a cloud-managed service.
const taskQueue = [];
export const enqueueTask = async (task) => {
    taskQueue.push(task);
    logger.info(`Task enqueued: ${task.type}. Current queue size: ${taskQueue.length}`);
};
export const dequeueTask = async () => {
    const task = taskQueue.shift();
    if (task) {
        logger.info(`Task dequeued: ${task.type}. Current queue size: ${taskQueue.length}`);
    }
    return task;
};
export const getQueueSize = () => {
    return taskQueue.length;
};
