// src/lib/lineAuth.server.ts
// SERVER-ONLY. Verifies a LINE ID token against LINE's own verification
// endpoint (never trusts a LINE user id handed over directly by the
// client) and maps the LINE user onto a `profiles` row via `line_user_id`.
//
// profiles.id has a FK to auth.users(id), so a brand-new LINE user needs a
// corresponding auth user created first (via the admin API) before a
// profile can exist — the existing `handle_new_user` trigger then creates
// the bare profile row, which we immediately enrich with LINE data.

import { getSupabaseAdmin } from "./supabaseAdmin";

interface LineVerifyResponse {
  iss: string;
  sub: string; // LINE user id — stable, unique per user per channel
  aud: string; // should match our LIFF's LINE Login channel id
  exp: number;
  iat: number;
  name?: string;
  picture?: string;
  email?: string;
}

export interface LineProfile {
  profileId: string;
  lineUserId: string;
  displayName: string | null;
}

async function verifyLineIdToken(idToken: string): Promise<LineVerifyResponse> {
  const channelId = process.env.LINE_LOGIN_CHANNEL_ID;
  if (!channelId) {
    throw new Error("LINE_LOGIN_CHANNEL_ID not set in the server environment.");
  }

  const response = await fetch("https://api.line.me/oauth2/v2.1/verify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ id_token: idToken, client_id: channelId }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`LINE ID token verification failed: ${response.status} ${body}`);
  }

  const payload = (await response.json()) as LineVerifyResponse;

  if (payload.aud !== channelId) {
    throw new Error("LINE ID token audience mismatch — token was issued for a different channel.");
  }
  if (payload.exp * 1000 < Date.now()) {
    throw new Error("LINE ID token has expired.");
  }

  return payload;
}

export async function upsertProfileForLineUser(idToken: string): Promise<LineProfile> {
  const claims = await verifyLineIdToken(idToken);
  const supabase = getSupabaseAdmin();

  const { data: existingRaw, error: lookupError } = await supabase
    .from("profiles")
    .select("id, full_name")
    .eq("line_user_id", claims.sub)
    .maybeSingle();

  if (lookupError) throw new Error(`Profile lookup failed: ${lookupError.message}`);

  const existing = existingRaw as { id: string; full_name: string | null } | null;

  if (existing) {
    return { profileId: existing.id, lineUserId: claims.sub, displayName: existing.full_name ?? claims.name ?? null };
  }

  // New LINE user: create an auth user first so profiles.id (FK to
  // auth.users) has somewhere to point. handle_new_user trigger creates
  // the bare profile row; we then enrich it with LINE data below.
  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email: `line-${claims.sub}@liff.dahua-health-app.local`,
    email_confirm: true,
    user_metadata: { line_user_id: claims.sub, source: "line_liff" },
  });

  if (createError || !created?.user) {
    throw new Error(`Failed to create auth user for LINE login: ${createError?.message}`);
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ line_user_id: claims.sub, full_name: claims.name ?? null } as never)
    .eq("id", created.user.id);

  if (updateError) throw new Error(`Failed to attach LINE profile data: ${updateError.message}`);

  return { profileId: created.user.id, lineUserId: claims.sub, displayName: claims.name ?? null };
}
