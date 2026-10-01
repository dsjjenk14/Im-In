import { NextResponse, type NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { claimSession, fulfill } from "@/lib/billing";
import { CLAIM_COOKIE, claimCookieOptions, signClaim } from "@/lib/claim";
import { createClient } from "@/lib/supabase/server";

/** Stripe sends the buyer here after paying. Verifies the payment with Stripe, never trusts the URL. */
export async function GET(req: NextRequest) {
  const sid = req.nextUrl.searchParams.get("session_id") ?? "";
  const home = new URL("/", req.url);
  if (!sid) return NextResponse.redirect(home);

  const session = await getStripe().checkout.sessions.retrieve(sid).catch(() => null);
  const done = session ? await fulfill(session) : null;
  if (!done) return NextResponse.redirect(new URL("/?pay=pending", req.url));

  const { data } = await (await createClient()).auth.getUser();
  if (data.user) {
    await claimSession(data.user.id, sid);
    return NextResponse.redirect(new URL(done.tier === "premium" ? "/app/premium?paid=premium" : "/app?paid=1", req.url));
  }
  const res = NextResponse.redirect(new URL("/signin?tab=up&paid=1&email=" + encodeURIComponent(done.email), req.url));
  res.cookies.set(CLAIM_COOKIE, signClaim({ kind: "stripe", sid }), claimCookieOptions);
  return res;
}
