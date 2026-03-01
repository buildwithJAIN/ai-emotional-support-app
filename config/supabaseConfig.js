import { createClient } from '@supabase/supabase-js';

// Replace with your own credentials
const SUPABASE_URL = "https://awcojfcitzusckolgnwz.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3Y29qZmNpdHp1c2Nrb2xnbnd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MDY1MjYsImV4cCI6MjA3OTI4MjUyNn0.d0-nQ_cirq2oxjHNbxry-DI_uGI4p5KutO9cxIc3fqU"; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
