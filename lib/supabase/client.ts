import { createBrowserClient } from '@supabase/ssr';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://tixsvikhvnjniuvvplpa.supabase.co';

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeHN2aWtodm5qbml1dnZwbHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MDY3NTAsImV4cCI6MjEwMTk4Mjc1MH0.HiaxJ-O9u4-qGa6Uh4XFRhbUbfh3GJfK61fbutPWKxE';

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

