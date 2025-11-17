import { logger } from './logger';

export const PORT = process.env.PORT || 3004; // Corrected default port
export const SUPABASE_URL = process.env.SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
export const NOTION_TOKEN = process.env.NOTION_TOKEN || ''; // Corrected variable name
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || '';

// Debugging: Log raw process.env values
logger.info(`DEBUG: process.env.SUPABASE_URL = ${process.env.SUPABASE_URL}`);
logger.info(`DEBUG: process.env.SUPABASE_ANON_KEY = ${process.env.SUPABASE_ANON_KEY}`);
// Validate essential environment variables
if (!SUPABASE_URL) {
  logger.warn('SUPABASE_URL is not set. Supabase service might not function correctly.');
}
if (!SUPABASE_ANON_KEY) {
  logger.warn('SUPABASE_ANON_KEY is not set. Supabase service might not function correctly.');
}
