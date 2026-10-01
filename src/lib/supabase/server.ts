import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient as createPlainClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/env";

/** Supabase client acting as the signed in member (row level security applies). */
export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => {
        try { list.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); }
        catch { /* called from a Server Component: the proxy refreshes the session instead */ }
      },
    },
  });
}

/** Service role client. Bypasses row level security. Server only, never send to the browser. */
export function createAdmin() {
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return createPlainClient(SUPABASE_URL, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
