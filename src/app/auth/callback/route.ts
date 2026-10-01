import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createAdmin, createClient } from "@/lib/supabase/server";
import { CLAIM_COOKIE, readClaim } from "@/lib/claim";
import { claimByEmail, claimSession, redeemCode, tierFor } from "@/lib/billing";
import { createMemberRecords } from "@/lib/members";

/** Google sign in and password reset links come back here. */
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const next = req.nextUrl.searchParams.get("next") ?? "/app";
  const to = (p: string) => NextResponse.redirect(new URL(p, req.url));
  if (!code) return to("/signin");

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return to("/signin?error=link");
  if (next === "/reset-password") return to(next);

  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) return to("/signin");

  const db = createAdmin();
  const { data: profile } = await db.from("profiles").select("id").eq("id", user.id).maybeSingle();
  if (profile) return to("/app");

  // First time with Google. They still need to have paid first.
  const jar = await cookies();
  const claim = readClaim(jar.get(CLAIM_COOKIE)?.value);
  const email = (user.email ?? "").toLowerCase();
  if (claim?.kind === "stripe") await claimSession(user.id, claim.sid);
  if (claim?.kind === "code") await redeemCode(user.id, claim.code, email);
  await claimByEmail(user.id, email); // Google has verified this email, so matching purchases are theirs.

  if (!(await tierFor(user.id))) {
    await supabase.auth.signOut();
    await db.auth.admin.deleteUser(user.id);
    return to("/?need=plan");
  }
  const meta = user.user_metadata ?? {};
  await createMemberRecords(user.id, email, { name: String(meta.full_name ?? meta.name ?? ""), industry: "", dream_role: "", goal: "" });
  jar.delete(CLAIM_COOKIE);
  return to("/onboarding");
}
