"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSupabaseClient = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL and/or Anon Key are not set.');
    // Depending on the environment, you might want to throw an error or handle this differently
    // For now, we'll return a client that will likely fail on operations.
}
const createSupabaseClient = () => {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase URL and/or Anon Key are not set. Please check your environment variables.');
    }
    return (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey);
};
exports.createSupabaseClient = createSupabaseClient;
