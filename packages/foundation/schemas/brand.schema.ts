import { z } from 'zod';

export const BrandSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Brand name is required'),
  mission: z.string().min(1, 'Mission is required'),
  values: z.array(z.string()).min(1, 'At least one value is required'),
  targetAudience: z.string().min(1, 'Target audience is required'),
  personalityArchetype: z.string().min(1, 'Personality archetype is required'),
  toneOfVoice: z.string().min(1, 'Tone of voice is required'),
  createdAt: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
  updatedAt: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
});

export const BrandAssetSchema = z.object({
  id: z.string().uuid(),
  brandId: z.string().uuid(),
  type: z.enum(['logo', 'color_palette', 'typography', 'image_style', 'messaging_guide']),
  url: z.string().url().optional(),
  data: z.record(z.any()),
  createdAt: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
  updatedAt: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
});

export type BrandSchemaType = z.infer<typeof BrandSchema>;
export type BrandAssetSchemaType = z.infer<typeof BrandAssetSchema>;
