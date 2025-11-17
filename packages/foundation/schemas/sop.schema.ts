import { z } from 'zod';

export const SOPStepSchema = z.object({
  id: z.string().uuid(),
  description: z.string().min(1, 'Step description is required'),
  order: z.number().int().positive('Order must be a positive integer'),
  expectedOutcome: z.string().optional(),
  toolsUsed: z.array(z.string()).optional(),
});

export const SOPSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'SOP title is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'SOP category is required'),
  version: z.string().default('1.0.0'),
  authorId: z.string().uuid(),
  createdAt: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
  updatedAt: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
  steps: z.array(SOPStepSchema).min(1, 'At least one step is required for an SOP'),
  relatedTasks: z.array(z.string().uuid()).optional(),
  metadata: z.record(z.any()).optional(),
});

export type SOPStepSchemaType = z.infer<typeof SOPStepSchema>;
export type SOPSchemaType = z.infer<typeof SOPSchema>;
