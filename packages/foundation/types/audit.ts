export enum AuditEventType {
  BRAND_CREATED = 'BRAND_CREATED',
  BRAND_UPDATED = 'BRAND_UPDATED',
  DRIFT_DETECTED = 'DRIFT_DETECTED',
  SOP_GENERATED = 'SOP_GENERATED',
  TASK_ENQUEUED = 'TASK_ENQUEUED',
  TASK_COMPLETED = 'TASK_COMPLETED',
  TASK_FAILED = 'TASK_FAILED',
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  SYSTEM_HEALTH_CHECK = 'SYSTEM_HEALTH_CHECK',
  // Add more event types as needed
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  eventType: AuditEventType;
  entityId?: string; // ID of the entity affected (e.g., brandId, taskId)
  entityType?: 'Brand' | 'Task' | 'SOP' | 'User' | 'System';
  userId?: string; // User who initiated the event, if applicable
  metadata?: Record<string, any>; // Additional context
  message: string;
}
