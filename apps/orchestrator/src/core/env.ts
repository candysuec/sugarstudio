// src/core/env.ts
import { z } from "zod";

const envSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  DATABASE_URL: z.string(),
  PORT: z
    .string()
    .transform((val) => Number(val || "3004"))
    .optional()
    .default("3004"),
});

export const env = envSchema.parse(process.env);
