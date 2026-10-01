import "server-only";
import { redirect } from "next/navigation";
import { createAdmin, createClient } from "./supabase/server";
import { supabaseConfigured } from "./env";
import { tierFor } from "./billing";
import { isAdmin } from "./members";
import type { MemberInit } from "@/components/AppProvider";

/**
 * Server side gate for every member page: signed in, has a profile, and has paid.
 * Anything else is redirected before a single paid word is rendered.
 */
export async function requireMember(): Promise<MemberInit> {
  if (!supabaseConfigured()) redirect("/");
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) redirect("/signin");

  const db = createAdmin();
  const [{ data: profile }, { data: prog }, tier, admin] = await Promise.all([
    db.from("profiles").select("name, email, industry, dream_role, goal").eq("id", user.id).maybeSingle(),
    db.from("progress").select("data, updated_at").eq("user_id", user.id).maybeSingle(),
    tierFor(user.id),
    isAdmin(user.id, user.email),
  ]);
  if (!profile || !tier) redirect("/?need=plan");
  if (!profile.industry && !profile.goal) redirect("/onboarding");

  return { userId: user.id, profile, tier, data: prog?.data ?? null, updatedAt: prog?.updated_at ?? null, isAdmin: admin };
}
