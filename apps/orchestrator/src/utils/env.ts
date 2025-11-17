import { logger } from './logger';

export const PORT = process.env.PORT || 3010;
export const SUPABASE_URL = process.env.SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
export const NOTION_API_KEY = process.env.NOTION_API_KEY || '';
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || '';

// Validate essential environment variables
if (!SUPABASE_URL) {
  logger.warn('SUPABASE_URL is not set. Supabase service might not function correctly.');
}
if (!SUPABASE_ANON_KEY) {
  logger.warn('SUPABASE_ANON_KEY is not set. Supabase service might not function correctly.');
}
if (!NOTION_API_KEY) {
  logger.warn('NOTION_API_KEY is not set. Notion service might not function correctly.');
}
if (!NOTION_DATABASE_ID) {
  logger.warn('NOTION_DATABASE_ID is not set. Notion service might not function correctly.');
}
