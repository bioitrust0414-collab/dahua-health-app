// lib/supabaseClient.js
// Server-side Supabase client for the backend scaffold (mappingService, etc.).
// Uses the service role key because this runs as a trusted server, writing
// patient_mappings/reports on behalf of an already-identified app user —
// not on behalf of a browser session, so RLS (auth.uid() = profile_id) would
// otherwise block the insert. NEVER expose SUPABASE_SERVICE_ROLE_KEY to the
// frontend/browser bundle.

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn(
    '[supabaseClient] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set — ' +
      'calls that hit the database will fail until these are configured.',
  );
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

module.exports = { supabase };
