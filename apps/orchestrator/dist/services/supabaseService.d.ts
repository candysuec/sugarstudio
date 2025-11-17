import { SupabaseClient } from '@sugarstudio/supabase-client';
import { Log } from '../types/Log';
export declare const getSupabaseClient: () => SupabaseClient;
export declare const logToSupabase: (log: Log) => Promise<void>;
export declare const getTasksFromSupabase: () => Promise<any[]>;
//# sourceMappingURL=supabaseService.d.ts.map