import { NextResponse } from "next/server";
import { getStripe, stripeConfigured } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { siteUrl, supabaseConfigured } from "@/lib/env";
import { PRICES, type Tier } from "@/config/site";

/** Starts Stripe Checkout for a tier. Prices come from src/config/site.ts. */
export async function POST(req: Request) {
  if (!stripeConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  const tier: Tier = body.tier === "premium" ? "premium" : "basic";

  let userId = "", email = "";
  if (supabaseConfigured()) {
    const { data } = await (await createClient()).auth.getUser();
    if (data.user) { userId = data.user.id; email = data.user.email ?? ""; }
  }

  const site = siteUrl();
  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [{ quantity: 1, price_data: { currency: "usd", unit_amount: PRICES[tier].cents, product_data: { name: PRICES[tier].name } } }],
    customer_creation: "always",
    customer_email: email || undefined,
    allow_promotion_codes: true,
    metadata: { tier, user_id: userId },
    payment_intent_data: { metadata: { tier, user_id: userId } },
    success_url: site + "/api/checkout/return?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: site + (userId ? "/app/premium" : "/"),
  });
  return NextResponse.json({ url: session.url });
}
