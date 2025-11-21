export declare enum WorkflowStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED"
}
export interface WorkflowStep {
    id: string;
    name: string;
    description?: string;
    status: WorkflowStatus;
    taskIds: string[];
    startedAt?: Date;
    completedAt?: Date;
    error?: string;
}
export interface Workflow {
    id: string;
    name: string;
    description?: string;
    status: WorkflowStatus;
    brandId?: string;
    triggeredBy: 'User' | 'System' | 'Event';
    triggerEvent?: string;
    createdAt: Date;
    startedAt?: Date;
    completedAt?: Date;
    steps: WorkflowStep[];
    metadata?: Record<string, any>;
}
