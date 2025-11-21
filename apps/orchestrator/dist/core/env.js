"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
// src/core/env.ts
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    SUPABASE_URL: zod_1.z.string().url(),
    SUPABASE_SERVICE_ROLE_KEY: zod_1.z.string(),
    DATABASE_URL: zod_1.z.string(),
    PORT: zod_1.z
        .string()
        .transform((val) => Number(val || "3004"))
        .optional()
        .default("3004"),
});
exports.env = envSchema.parse(process.env);
