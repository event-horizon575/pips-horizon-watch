// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ehbljxfstssyvkvgpagf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYmxqeGZzdHNzeXZrdmdwYWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMzI5MTQsImV4cCI6MjA1OTcwODkxNH0.ENgnGR4J9x3_HzGEONv8hDsFzq1xLDN3dM1CDuqEBwg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);