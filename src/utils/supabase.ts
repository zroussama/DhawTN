import { createClient } from '@supabase/supabase-js';

// Support both Vite (import.meta.env) and Node/process.env safely
const getEnvVar = (key: string) => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  return '';
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL') || 'https://zvjpwawctxjyqrfbjoks.supabase.co';
const supabaseKey = getEnvVar('VITE_SUPABASE_PUBLISHABLE_KEY') || getEnvVar('VITE_SUPABASE_ANON_KEY') || 'dummy_key';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});