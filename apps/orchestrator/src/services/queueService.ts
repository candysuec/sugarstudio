import { Task } from '../types/Task';
import { logger } from '../utils/logger';

// This is a very basic in-memory queue for demonstration purposes.
// In a production environment, you would use a robust message queue like RabbitMQ, Kafka, or a cloud-managed service.
const taskQueue: Task[] = [];

export const enqueueTask = async (task: Task): Promise<void> => {
  taskQueue.push(task);
  logger.info(`Task enqueued: ${task.type}. Current queue size: ${taskQueue.length}`);
};

export const dequeueTask = async (): Promise<Task | undefined> => {
  const task = taskQueue.shift();
  if (task) {
    logger.info(`Task dequeued: ${task.type}. Current queue size: ${taskQueue.length}`);
  }
  return task;
};

export const getQueueSize = (): number => {
  return taskQueue.length;
};
