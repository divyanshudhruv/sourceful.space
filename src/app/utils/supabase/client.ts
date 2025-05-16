import { createClient, SupabaseClient } from '@supabase/supabase-js';

export function getSupabaseClient(url: string, key: string): SupabaseClient {
  return createClient(url, key);
}

export { createClient, SupabaseClient };