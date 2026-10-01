import "server-only";
import { createAdmin } from "./supabase/server";
import { adminEmails } from "./env";
import { blank } from "./state";

export interface ProfileInput { name: string; industry: string; dream_role: string; goal: string }

/** Profile plus an empty progress row for a brand new member. */
export async function createMemberRecords(userId: string, email: string, p: ProfileInput) {
  const db = createAdmin();
  const role = adminEmails().includes(email.toLowerCase()) ? "admin" : "member";
  const { error } = await db.from("profiles").upsert({ id: userId, email: email.toLowerCase(), ...p, role });
  if (error) throw error;
  const data = { ...blank(), user: null, badges: { started: true } };
  await db.from("progress").upsert({ user_id: userId, data }, { onConflict: "user_id", ignoreDuplicates: true });
}

export async function isAdmin(userId: string, email: string | undefined): Promise<boolean> {
  if (email && adminEmails().includes(email.toLowerCase())) return true;
  const { data } = await createAdmin().from("profiles").select("role").eq("id", userId).maybeSingle();
  return data?.role === "admin";
}

export function clean(v: unknown, max = 500): string {
  return String(v ?? "").trim().slice(0, max);
}
