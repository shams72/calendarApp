// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sljilzeejvapihghhcrs.supabase.co';
const supabaseAnonKey = process.env.API_KEY ?? ''; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
