import "server-only";
import type Stripe from "stripe";
import { createAdmin } from "./supabase/server";
import { signClaim } from "./claim";
import { siteUrl } from "./env";
import { notifyOwnerPurchase, sendReceipt, sendWelcome } from "./email";
import type { Tier } from "@/config/site";

/**
 * Records a paid Checkout Session as an entitlement. Safe to call many times:
 * the webhook and the success redirect both call it, whichever lands first wins,
 * and the emails go out exactly once.
 */
export async function fulfill(session: Stripe.Checkout.Session): Promise<{ tier: Tier; email: string; userId: string | null } | null> {
  if (session.payment_status !== "paid") return null;
  const tier: Tier = session.metadata?.tier === "premium" ? "premium" : "basic";
  const email = (session.customer_details?.email ?? session.customer_email ?? "").toLowerCase();
  const userId = session.metadata?.user_id || null;
  const db = createAdmin();

  const { data: inserted, error } = await db.from("entitlements").upsert({
    user_id: userId,
    email,
    tier,
    access: true,
    source: "stripe",
    stripe_session_id: session.id,
    stripe_customer_id: typeof session.customer === "string" ? session.customer : session.customer?.id ?? null,
    stripe_payment_id: typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null,
    amount_cents: session.amount_total ?? 0,
  }, { onConflict: "stripe_session_id", ignoreDuplicates: true }).select("id");
  if (error) throw error;

  if (inserted && inserted.length) {
    const cents = session.amount_total ?? 0;
    const ref = (typeof session.payment_intent === "string" ? session.payment_intent : session.id) ?? session.id;
    const claimUrl = userId ? null : siteUrl() + "/api/claim?t=" + encodeURIComponent(signClaim({ kind: "stripe", sid: session.id }));
    await Promise.all([
      sendReceipt(email, tier, cents, ref),
      sendWelcome(email, tier, claimUrl),
      notifyOwnerPurchase(email, tier, cents),
    ]);
  }
  return { tier, email, userId };
}

/** The member's best active tier, or null if they have not paid. */
export async function tierFor(userId: string): Promise<Tier | null> {
  const { data } = await createAdmin().from("entitlements").select("tier").eq("user_id", userId).eq("access", true);
  if (!data || !data.length) return null;
  return data.some((r) => r.tier === "premium") ? "premium" : "basic";
}

/** Attach unclaimed purchases to a new account. */
export async function claimByEmail(userId: string, email: string) {
  await createAdmin().from("entitlements").update({ user_id: userId }).is("user_id", null).eq("email", email.toLowerCase());
}

export async function claimSession(userId: string, sid: string): Promise<boolean> {
  const { data } = await createAdmin().from("entitlements").update({ user_id: userId })
    .eq("stripe_session_id", sid).or(`user_id.is.null,user_id.eq.${userId}`).select("id");
  return !!data?.length;
}

/** One time access code. Returns the tier when it worked. */
export async function redeemCode(userId: string, code: string, email: string): Promise<Tier | null> {
  const db = createAdmin();
  const { data } = await db.from("access_codes").update({ redeemed_by: userId, redeemed_at: new Date().toISOString() })
    .eq("code", code).is("redeemed_by", null).select("tier");
  const tier = data?.[0]?.tier as Tier | undefined;
  if (!tier) return null;
  await db.from("entitlements").insert({ user_id: userId, email: email.toLowerCase(), tier, access: true, source: "code" });
  return tier;
}

/** Is this code real and unused? Does not use it up. */
export async function checkCode(code: string): Promise<Tier | null> {
  const { data } = await createAdmin().from("access_codes").select("tier").eq("code", code).is("redeemed_by", null).maybeSingle();
  return (data?.tier as Tier | undefined) ?? null;
}

export function normalizeCode(c: unknown): string {
  return String(c ?? "").trim().toUpperCase().replace(/\s+/g, "");
}
