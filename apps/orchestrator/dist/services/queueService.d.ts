import { Task } from '../types/Task';
export declare const enqueueTask: (task: Task) => Promise<void>;
export declare const dequeueTask: () => Promise<Task | undefined>;
export declare const getQueueSize: () => number;
//# sourceMappingURL=queueService.d.ts.map