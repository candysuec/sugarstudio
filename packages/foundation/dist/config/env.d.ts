import { z } from 'zod';
declare const serverEnvSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "test", "production"]>>;
    DATABASE_URL: z.ZodString;
    API_BASE_URL: z.ZodString;
    SERVER_SECRET_KEY: z.ZodString;
    SUPABASE_URL: z.ZodString;
    SUPABASE_SERVICE_ROLE_KEY: z.ZodString;
    GOOGLE_GENERATIVE_AI_API_KEY: z.ZodString;
    LOCAL_LOG_LEVEL: z.ZodDefault<z.ZodEnum<["debug", "info", "warn", "error"]>>;
}, "strip", z.ZodTypeAny, {
    API_BASE_URL: string;
    DATABASE_URL: string;
    SERVER_SECRET_KEY: string;
    NODE_ENV: "development" | "test" | "production";
    SUPABASE_URL: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    GOOGLE_GENERATIVE_AI_API_KEY: string;
    LOCAL_LOG_LEVEL: "debug" | "info" | "warn" | "error";
}, {
    API_BASE_URL: string;
    DATABASE_URL: string;
    SERVER_SECRET_KEY: string;
    SUPABASE_URL: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    GOOGLE_GENERATIVE_AI_API_KEY: string;
    NODE_ENV?: "development" | "test" | "production" | undefined;
    LOCAL_LOG_LEVEL?: "debug" | "info" | "warn" | "error" | undefined;
}>;
declare const browserEnvSchema: z.ZodObject<{
    NEXT_PUBLIC_API_BASE_URL: z.ZodString;
    NEXT_PUBLIC_SUPABASE_URL: z.ZodString;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.ZodString;
    NEXT_PUBLIC_APP_TITLE: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_APP_TITLE: string;
}, {
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_APP_TITLE?: string | undefined;
}>;
type ServerEnv = z.infer<typeof serverEnvSchema>;
type BrowserEnv = z.infer<typeof browserEnvSchema>;
export declare const env: {
    API_BASE_URL: string;
    DATABASE_URL: string;
    SERVER_SECRET_KEY: string;
    NEXT_PUBLIC_API_BASE_URL: string;
    NODE_ENV: "development" | "test" | "production";
    SUPABASE_URL: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    GOOGLE_GENERATIVE_AI_API_KEY: string;
    LOCAL_LOG_LEVEL: "debug" | "info" | "warn" | "error";
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_APP_TITLE: string;
};
export declare const serverEnv: ServerEnv;
export declare const browserEnv: BrowserEnv;
export {};
