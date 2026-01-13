import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qqzvmwbweuaybkymkldi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxenZtd2J3ZXVheWJreW1rbGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNTAyMDQsImV4cCI6MjA4MzgyNjIwNH0.i9JNHdmJkB-APm8UtgXzCwGLPyyZv4RbRbAICDVR3_A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
