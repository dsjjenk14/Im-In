import { NextResponse } from "next/server";
import { createAdmin, createClient } from "@/lib/supabase/server";
import { tierFor } from "@/lib/billing";
import { notifyOwnerMessage } from "@/lib/email";
import { clean } from "@/lib/members";

/** Contact form and premium messages: saved to the messages table and emailed to Dominique. */
export async function POST(req: Request) {
  const { data } = await (await createClient()).auth.getUser();
  const user = data.user;
  if (!user) return NextResponse.json({ error: "signed_out" }, { status: 401 });

  const b = await req.json().catch(() => ({}));
  const m = { name: clean(b.name, 120), email: clean(b.email, 200), subject: clean(b.subject, 120), body: clean(b.body, 5000) };
  if (!m.body || !m.email.includes("@")) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const db = createAdmin();
  const since = new Date(Date.now() - 864e5).toISOString();
  const { count } = await db.from("messages").select("id", { count: "exact", head: true }).eq("user_id", user.id).gte("created_at", since);
  if ((count ?? 0) >= 20) return NextResponse.json({ error: "too_many" }, { status: 429 });

  const premium = (await tierFor(user.id)) === "premium";
  const { error } = await db.from("messages").insert({ user_id: user.id, ...m, is_premium: premium });
  if (error) return NextResponse.json({ error: "failed" }, { status: 500 });
  await notifyOwnerMessage({ ...m, premium });
  return NextResponse.json({ ok: true });
}
