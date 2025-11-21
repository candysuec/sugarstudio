import { z } from 'zod';
export declare const BrandSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    mission: z.ZodString;
    values: z.ZodArray<z.ZodString, "many">;
    targetAudience: z.ZodString;
    personalityArchetype: z.ZodString;
    toneOfVoice: z.ZodString;
    createdAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    updatedAt: z.ZodEffects<z.ZodDate, Date, unknown>;
}, "strip", z.ZodTypeAny, {
    values: string[];
    id: string;
    name: string;
    mission: string;
    targetAudience: string;
    personalityArchetype: string;
    toneOfVoice: string;
    createdAt: Date;
    updatedAt: Date;
}, {
    values: string[];
    id: string;
    name: string;
    mission: string;
    targetAudience: string;
    personalityArchetype: string;
    toneOfVoice: string;
    createdAt?: unknown;
    updatedAt?: unknown;
}>;
export declare const BrandAssetSchema: z.ZodObject<{
    id: z.ZodString;
    brandId: z.ZodString;
    type: z.ZodEnum<["logo", "color_palette", "typography", "image_style", "messaging_guide"]>;
    url: z.ZodOptional<z.ZodString>;
    data: z.ZodRecord<z.ZodString, z.ZodAny>;
    createdAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    updatedAt: z.ZodEffects<z.ZodDate, Date, unknown>;
}, "strip", z.ZodTypeAny, {
    type: "logo" | "color_palette" | "typography" | "image_style" | "messaging_guide";
    id: string;
    brandId: string;
    createdAt: Date;
    updatedAt: Date;
    data: Record<string, any>;
    url?: string | undefined;
}, {
    type: "logo" | "color_palette" | "typography" | "image_style" | "messaging_guide";
    id: string;
    brandId: string;
    data: Record<string, any>;
    createdAt?: unknown;
    updatedAt?: unknown;
    url?: string | undefined;
}>;
export type BrandSchemaType = z.infer<typeof BrandSchema>;
export type BrandAssetSchemaType = z.infer<typeof BrandAssetSchema>;
