
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const SUPABASE_URL = "https://tmlgntpagyfhjspcvoqz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbGdudHBhZ3lmaGpzcGN2b3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMTY2MzAsImV4cCI6MjA1OTg5MjYzMH0.K4YTis89ydrVtkNRcAKBvhXHaEHKPVXlfOSwyZLO24k";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
