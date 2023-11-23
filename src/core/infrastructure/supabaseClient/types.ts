import type { SupabaseClient } from '@supabase/supabase-js';

export interface ISupabaseClient
	extends Pick<SupabaseClient, 'from' | 'auth'> {}
