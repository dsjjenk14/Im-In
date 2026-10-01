"use client";
import type { Tier } from "@/config/site";

/** Starts Stripe Checkout on the server and sends the buyer there. */
export async function buy(tier: Tier, toast: (m: string) => void) {
  try {
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tier }) });
    const j = await r.json().catch(() => ({}));
    if (r.ok && j.url) { window.location.href = j.url; return; }
  } catch { /* fall through */ }
  toast("Checkout did not open. Try again, or message me and I will sort it out.");
}
