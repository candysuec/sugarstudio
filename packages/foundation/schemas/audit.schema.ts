import { z } from 'zod';
import { AuditEventType } from '../types/audit';

export const AuditLogSchema = z.object({
  id: z.string().uuid(),
  timestamp: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
  eventType: z.nativeEnum(AuditEventType),
  entityId: z.string().uuid().optional(),
  entityType: z.enum(['Brand', 'Task', 'SOP', 'User', 'System']).optional(),
  userId: z.string().uuid().optional(),
  metadata: z.record(z.any()).optional(),
  message: z.string(),
});

export type AuditLogSchemaType = z.infer<typeof AuditLogSchema>;
