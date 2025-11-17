export type TaskType =
  | 'MONITOR_LOGS'
  | 'TRIGGER_WORKFLOW'
  | 'GENERATE_SOP'
  | 'PROCESS_AI_TASK'
  | 'SYNC_DATA'
  | 'RUN_MAINTENANCE';

export interface Task {
  id: string;
  type: TaskType;
  payload: Record<string, any>;
  createdAt: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'failed';
  retries?: number;
  lastAttemptAt?: string;
  completedAt?: string;
  error?: string;
}
