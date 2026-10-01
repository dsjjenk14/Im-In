import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/members";
import { supabaseConfigured } from "@/lib/env";

/** Admin pages and actions call this first. Members get sent home. */
export async function requireAdmin() {
  if (!supabaseConfigured()) redirect("/");
  const { data } = await (await createClient()).auth.getUser();
  if (!data.user) redirect("/signin");
  if (!(await isAdmin(data.user.id, data.user.email))) redirect("/app");
  return data.user;
}
