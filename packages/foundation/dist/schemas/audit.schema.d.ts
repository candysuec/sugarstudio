import { z } from 'zod';
import { AuditEventType } from '../types/audit';
export declare const AuditLogSchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodEffects<z.ZodDate, Date, unknown>;
    eventType: z.ZodNativeEnum<typeof AuditEventType>;
    entityId: z.ZodOptional<z.ZodString>;
    entityType: z.ZodOptional<z.ZodEnum<["Brand", "Task", "SOP", "User", "System"]>>;
    userId: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    timestamp: Date;
    id: string;
    eventType: AuditEventType;
    entityId?: string | undefined;
    entityType?: "Brand" | "Task" | "SOP" | "User" | "System" | undefined;
    userId?: string | undefined;
    metadata?: Record<string, any> | undefined;
}, {
    message: string;
    id: string;
    eventType: AuditEventType;
    timestamp?: unknown;
    entityId?: string | undefined;
    entityType?: "Brand" | "Task" | "SOP" | "User" | "System" | undefined;
    userId?: string | undefined;
    metadata?: Record<string, any> | undefined;
}>;
export type AuditLogSchemaType = z.infer<typeof AuditLogSchema>;
