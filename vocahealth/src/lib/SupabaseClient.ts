// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sljilzeejvapihghhcrs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsamlsemVlanZhcGloZ2hoY3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3OTA2NjAsImV4cCI6MjA2NDM2NjY2MH0.jYTTW1cj3EQLPqVpgKqwV18kvujMjLpy7oVZq7THPTQ'; // Paste Here the API Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
