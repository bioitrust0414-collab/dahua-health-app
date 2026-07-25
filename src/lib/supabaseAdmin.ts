// src/lib/supabaseAdmin.ts
// SERVER-ONLY. Only import this from server functions (createServerFn) or
// other server-side code — never from a component that runs in the browser.
// Uses the service role key to bypass RLS, since server functions act as a
// trusted backend rendering data on the member's behalf (there is no
// Supabase Auth session wired into the frontend yet — see /member route).

import { createClient } from "@supabase/supabase-js";

let cachedClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseAdmin() {
  if (cachedClient) return cachedClient;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set in the server environment.",
    );
  }

  cachedClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
  return cachedClient;
}
