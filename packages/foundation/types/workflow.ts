export enum WorkflowStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export interface WorkflowStep {
  id: string;
  name: string;
  description?: string;
  status: WorkflowStatus;
  taskIds: string[]; // IDs of tasks associated with this step
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  status: WorkflowStatus;
  brandId?: string; // If workflow is brand-specific
  triggeredBy: 'User' | 'System' | 'Event';
  triggerEvent?: string; // e.g., 'DRIFT_DETECTED', 'BRAND_CREATED'
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  steps: WorkflowStep[];
  metadata?: Record<string, any>;
}
