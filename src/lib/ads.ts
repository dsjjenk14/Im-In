import "server-only";
import { createAdmin } from "./supabase/server";
import { supabaseConfigured } from "./env";
import type { Ads } from "@/components/AppProvider";

/** Live ad slots. An empty or inactive slot shows the "your ad here" placeholder. */
export async function loadAds(): Promise<Ads> {
  const ads: Ads = { 1: null, 2: null };
  if (!supabaseConfigured()) return ads;
  const { data } = await createAdmin().from("ads").select("slot, headline, text, cta, url").eq("active", true);
  (data ?? []).forEach((a) => { if (a.slot === 1 || a.slot === 2) ads[a.slot as 1 | 2] = { headline: a.headline, text: a.text, cta: a.cta, url: a.url }; });
  return ads;
}
