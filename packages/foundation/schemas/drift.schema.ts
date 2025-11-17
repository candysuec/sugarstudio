import { z } from 'zod';
import { DriftCategory, DriftSeverity } from '../types/drift';

export const DriftEventSchema = z.object({
  id: z.string().uuid(),
  brandId: z.string().uuid(),
  timestamp: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
  category: z.nativeEnum(DriftCategory),
  severity: z.nativeEnum(DriftSeverity),
  description: z.string(),
  detectedBy: z.enum(['AI', 'Manual', 'System']),
  metadata: z.record(z.any()).optional(),
  resolved: z.boolean().default(false),
  resolvedAt: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()).optional(),
  resolvedBy: z.string().optional(),
});

export type DriftEventSchemaType = z.infer<typeof DriftEventSchema>;
