import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/env";
import { tierFor } from "@/lib/billing";
import { GateView } from "@/components/auth/GateView";

export default async function Gate() {
  if (supabaseConfigured()) {
    const { data } = await (await createClient()).auth.getUser();
    if (data.user && (await tierFor(data.user.id))) redirect("/app");
  }
  return <GateView />;
}
