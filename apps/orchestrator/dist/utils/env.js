"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.SUPABASE_SERVICE_ROLE_KEY = exports.SUPABASE_ANON_KEY = exports.SUPABASE_URL = void 0;
const utils_1 = require("@sugarstudio/utils");
exports.SUPABASE_URL = process.env.SUPABASE_URL || '';
exports.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
exports.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
utils_1.logger.info(`DEBUG: process.env.SUPABASE_URL = ${exports.SUPABASE_URL}`);
utils_1.logger.info(`DEBUG: process.env.SUPABASE_ANON_KEY = ${exports.SUPABASE_ANON_KEY}`);
utils_1.logger.info(`DEBUG: process.env.SUPABASE_SERVICE_ROLE_KEY = ${exports.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 10)}`);
if (!exports.SUPABASE_URL)
    utils_1.logger.warn('SUPABASE_URL is not set.');
if (!exports.SUPABASE_ANON_KEY)
    utils_1.logger.warn('SUPABASE_ANON_KEY is not set.');
if (!exports.SUPABASE_SERVICE_ROLE_KEY)
    utils_1.logger.warn('SUPABASE_SERVICE_ROLE_KEY is not set.');
exports.PORT = process.env.PORT || 3004;
