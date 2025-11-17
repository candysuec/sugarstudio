"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTION_DATABASE_ID = exports.NOTION_API_KEY = exports.SUPABASE_ANON_KEY = exports.SUPABASE_URL = exports.PORT = void 0;
var logger_1 = require("./logger");
exports.PORT = process.env.PORT || 3010;
exports.SUPABASE_URL = process.env.SUPABASE_URL || '';
exports.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
exports.NOTION_API_KEY = process.env.NOTION_API_KEY || '';
exports.NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || '';
// Validate essential environment variables
if (!exports.SUPABASE_URL) {
    logger_1.logger.warn('SUPABASE_URL is not set. Supabase service might not function correctly.');
}
if (!exports.SUPABASE_ANON_KEY) {
    logger_1.logger.warn('SUPABASE_ANON_KEY is not set. Supabase service might not function correctly.');
}
if (!exports.NOTION_API_KEY) {
    logger_1.logger.warn('NOTION_API_KEY is not set. Notion service might not function correctly.');
}
if (!exports.NOTION_DATABASE_ID) {
    logger_1.logger.warn('NOTION_DATABASE_ID is not set. Notion service might not function correctly.');
}
