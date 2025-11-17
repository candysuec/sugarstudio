import { createSupabaseClient, SupabaseClient } from '@sugarstudio/supabase-client';
import { logger } from '../utils/logger';
import { Log } from '../types/Log';

let supabase: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (!supabase) {
    try {
      supabase = createSupabaseClient();
      logger.info('Supabase client initialized.');
    } catch (error: any) {
      logger.error('Failed to initialize Supabase client:', error.message);
      throw error;
    }
  }
  return supabase;
};

export const logToSupabase = async (log: Log) => {
  try {
    const client = getSupabaseClient();
    const { error } = await client.from('orchestrator_logs').insert([log]);
    if (error) {
      logger.error('Error logging to Supabase:', error.message);
    } else {
      logger.info('Log successfully written to Supabase.');
    }
  } catch (error: any) {
    logger.error('Supabase logging failed:', error.message);
  }
};

// Placeholder for other Supabase interactions
export const getTasksFromSupabase = async () => {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client.from('tasks').select('*');
    if (error) {
      logger.error('Error fetching tasks from Supabase:', error.message);
      return [];
    }
    return data;
  } catch (error: any) {
    logger.error('Supabase task fetching failed:', error.message);
    return [];
  }
};
