import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdmin, createClient } from "@/lib/supabase/server";
import { CLAIM_COOKIE, readClaim } from "@/lib/claim";
import { claimByEmail, claimSession, redeemCode, tierFor } from "@/lib/billing";
import { clean, createMemberRecords } from "@/lib/members";

/**
 * Creates an account. Only works for someone holding a valid claim
 * (they paid, or redeemed a code), so the paywall cannot be skipped.
 */
export async function POST(req: Request) {
  const jar = await cookies();
  const claim = readClaim(jar.get(CLAIM_COOKIE)?.value);
  if (!claim) return NextResponse.json({ error: "no_claim" }, { status: 402 });

  const b = await req.json().catch(() => ({}));
  const name = clean(b.name, 120), email = clean(b.email, 200).toLowerCase(), password = String(b.password ?? "");
  if (!name || !email.includes("@") || password.length < 6) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const db = createAdmin();
  const { data: created, error } = await db.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { name } });
  if (error || !created.user) {
    const taken = /already|registered|exists/i.test(error?.message ?? "");
    return NextResponse.json({ error: taken ? "taken" : "failed" }, { status: taken ? 409 : 500 });
  }
  const uid = created.user.id;

  await createMemberRecords(uid, email, {
    name,
    industry: clean(b.industry, 120) || "Another field",
    dream_role: clean(b.dream, 120) || "Still figuring it out",
    goal: clean(b.goal, 300) || "Land my first role in HR",
  });

  if (claim.kind === "stripe") await claimSession(uid, claim.sid);
  else await redeemCode(uid, claim.code, email);
  await claimByEmail(uid, email);

  if (!(await tierFor(uid))) {
    // The claim was already used by someone else. Undo, so there is no account without access.
    await db.auth.admin.deleteUser(uid);
    jar.delete(CLAIM_COOKIE);
    return NextResponse.json({ error: "claim_used" }, { status: 402 });
  }

  const supabase = await createClient();
  await supabase.auth.signInWithPassword({ email, password });
  jar.delete(CLAIM_COOKIE);
  return NextResponse.json({ ok: true });
}
