import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkCode, normalizeCode, redeemCode } from "@/lib/billing";
import { CLAIM_COOKIE, claimCookieOptions, signClaim } from "@/lib/claim";
import { createClient } from "@/lib/supabase/server";

/** Backup path for buyers whose redirect failed. Codes are one time and checked on the server. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const code = normalizeCode(body.code);
  if (!code) return NextResponse.json({ error: "empty" }, { status: 400 });

  const { data } = await (await createClient()).auth.getUser();
  if (data.user) {
    const tier = await redeemCode(data.user.id, code, data.user.email ?? "");
    if (!tier) return NextResponse.json({ error: "no_match" }, { status: 400 });
    return NextResponse.json({ next: "/app", tier });
  }

  const tier = await checkCode(code);
  if (!tier) return NextResponse.json({ error: "no_match" }, { status: 400 });
  (await cookies()).set(CLAIM_COOKIE, signClaim({ kind: "code", code }), claimCookieOptions);
  return NextResponse.json({ next: "/signin?tab=up", tier });
}
