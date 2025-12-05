import { createClient } from '@supabase/supabase-js';

const supabaseEnvUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseEnvUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Use proxy in development to bypass CORS/AdBlockers
const supabaseUrl = import.meta.env.DEV
  ? 'http://localhost:3000/supabase-proxy'
  : supabaseEnvUrl;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
