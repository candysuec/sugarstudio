import { logger } from '@sugarstudio/utils';
export const SUPABASE_URL = process.env.SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
logger.info(`DEBUG: process.env.SUPABASE_URL = ${SUPABASE_URL}`);
logger.info(`DEBUG: process.env.SUPABASE_ANON_KEY = ${SUPABASE_ANON_KEY}`);
logger.info(`DEBUG: process.env.SUPABASE_SERVICE_ROLE_KEY = ${SUPABASE_SERVICE_ROLE_KEY === null || SUPABASE_SERVICE_ROLE_KEY === void 0 ? void 0 : SUPABASE_SERVICE_ROLE_KEY.substring(0, 10)}`);
if (!SUPABASE_URL)
    logger.warn('SUPABASE_URL is not set.');
if (!SUPABASE_ANON_KEY)
    logger.warn('SUPABASE_ANON_KEY is not set.');
if (!SUPABASE_SERVICE_ROLE_KEY)
    logger.warn('SUPABASE_SERVICE_ROLE_KEY is not set.');
export const PORT = process.env.PORT || 3004;
