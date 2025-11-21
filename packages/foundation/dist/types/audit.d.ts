export declare enum AuditEventType {
    BRAND_CREATED = "BRAND_CREATED",
    BRAND_UPDATED = "BRAND_UPDATED",
    DRIFT_DETECTED = "DRIFT_DETECTED",
    SOP_GENERATED = "SOP_GENERATED",
    TASK_ENQUEUED = "TASK_ENQUEUED",
    TASK_COMPLETED = "TASK_COMPLETED",
    TASK_FAILED = "TASK_FAILED",
    USER_LOGIN = "USER_LOGIN",
    USER_LOGOUT = "USER_LOGOUT",
    SYSTEM_HEALTH_CHECK = "SYSTEM_HEALTH_CHECK"
}
export interface AuditLog {
    id: string;
    timestamp: Date;
    eventType: AuditEventType;
    entityId?: string;
    entityType?: 'Brand' | 'Task' | 'SOP' | 'User' | 'System';
    userId?: string;
    metadata?: Record<string, any>;
    message: string;
}
