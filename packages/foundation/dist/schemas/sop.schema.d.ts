import { z } from 'zod';
export declare const SOPStepSchema: z.ZodObject<{
    id: z.ZodString;
    description: z.ZodString;
    order: z.ZodNumber;
    expectedOutcome: z.ZodOptional<z.ZodString>;
    toolsUsed: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    id: string;
    description: string;
    order: number;
    expectedOutcome?: string | undefined;
    toolsUsed?: string[] | undefined;
}, {
    id: string;
    description: string;
    order: number;
    expectedOutcome?: string | undefined;
    toolsUsed?: string[] | undefined;
}>;
export declare const SOPSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodString;
    version: z.ZodDefault<z.ZodString>;
    authorId: z.ZodString;
    createdAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    updatedAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    steps: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        description: z.ZodString;
        order: z.ZodNumber;
        expectedOutcome: z.ZodOptional<z.ZodString>;
        toolsUsed: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description: string;
        order: number;
        expectedOutcome?: string | undefined;
        toolsUsed?: string[] | undefined;
    }, {
        id: string;
        description: string;
        order: number;
        expectedOutcome?: string | undefined;
        toolsUsed?: string[] | undefined;
    }>, "many">;
    relatedTasks: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    version: string;
    authorId: string;
    steps: {
        id: string;
        description: string;
        order: number;
        expectedOutcome?: string | undefined;
        toolsUsed?: string[] | undefined;
    }[];
    metadata?: Record<string, any> | undefined;
    description?: string | undefined;
    relatedTasks?: string[] | undefined;
}, {
    id: string;
    category: string;
    title: string;
    authorId: string;
    steps: {
        id: string;
        description: string;
        order: number;
        expectedOutcome?: string | undefined;
        toolsUsed?: string[] | undefined;
    }[];
    metadata?: Record<string, any> | undefined;
    description?: string | undefined;
    createdAt?: unknown;
    updatedAt?: unknown;
    version?: string | undefined;
    relatedTasks?: string[] | undefined;
}>;
export type SOPStepSchemaType = z.infer<typeof SOPStepSchema>;
export type SOPSchemaType = z.infer<typeof SOPSchema>;
