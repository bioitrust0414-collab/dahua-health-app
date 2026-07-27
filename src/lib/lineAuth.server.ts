// src/lib/lineAuth.server.ts
// SERVER-ONLY. Verifies a LINE ID token against LINE's own verification
// endpoint and maps the LINE user onto a `profiles` row via `line_user_id`.
// Uses raw REST calls to Supabase (see supabaseAdmin.ts) rather than the
// supabase-js client — see that file's comment for why.

import { restGetOne, restPatch, adminCreateUser } from "./supabaseAdmin";

interface LineVerifyResponse {
  iss: string;
  sub: string; // LINE user id — stable, unique per user per channel
  aud: string;
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

  const existing = await restGetOne<{ id: string; full_name: string | null }>(
    "profiles",
    `line_user_id=eq.${claims.sub}`,
  );

  if (existing) {
    return {
      profileId: existing.id,
      lineUserId: claims.sub,
      displayName: existing.full_name ?? claims.name ?? null,
    };
  }

  // New LINE user: create an auth user first (profiles.id has a FK to
  // auth.users). handle_new_user trigger creates the bare profile row;
  // we then enrich it with LINE data below.
  const created = await adminCreateUser({
    email: `line-${claims.sub}@liff.dahua-health-app.local`,
    email_confirm: true,
    user_metadata: { line_user_id: claims.sub, source: "line_liff" },
  });

  await restPatch("profiles", `id=eq.${created.id}`, {
    line_user_id: claims.sub,
    full_name: claims.name ?? null,
  });

  return { profileId: created.id, lineUserId: claims.sub, displayName: claims.name ?? null };
}
