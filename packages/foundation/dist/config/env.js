import { z } from 'zod';
const serverEnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    DATABASE_URL: z.string().url(),
    API_BASE_URL: z.string().url(),
    SERVER_SECRET_KEY: z.string(),
    SUPABASE_URL: z.string().url(),
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string(),
    LOCAL_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});
const browserEnvSchema = z.object({
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NEXT_PUBLIC_APP_TITLE: z.string().default('SugarStudio'),
});
// Merge schemas for full environment validation
const fullEnvSchema = serverEnvSchema.merge(browserEnvSchema);
// Validate environment variables
const processEnv = process.env;
const parsedEnv = fullEnvSchema.safeParse(processEnv);
if (!parsedEnv.success) {
    console.error('❌ Invalid environment variables:', parsedEnv.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
}
export const env = parsedEnv.data;
// Type-safe access for server-side
export const serverEnv = {
    NODE_ENV: env.NODE_ENV,
    DATABASE_URL: env.DATABASE_URL,
    API_BASE_URL: env.API_BASE_URL,
    SERVER_SECRET_KEY: env.SERVER_SECRET_KEY,
    SUPABASE_URL: env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: env.SUPABASE_SERVICE_ROLE_KEY,
    GOOGLE_GENERATIVE_AI_API_KEY: env.GOOGLE_GENERATIVE_AI_API_KEY,
    LOCAL_LOG_LEVEL: env.LOCAL_LOG_LEVEL,
};
// Type-safe access for browser-side
export const browserEnv = {
    NEXT_PUBLIC_API_BASE_URL: env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_SUPABASE_URL: env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_TITLE: env.NEXT_PUBLIC_APP_TITLE,
};
