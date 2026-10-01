import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { clean } from "@/lib/members";

/** Onboarding answers (used after Google sign up). Row level security limits this to your own profile. */
export async function POST(req: Request) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return NextResponse.json({ error: "signed_out" }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  const { error } = await supabase.from("profiles").update({
    name: clean(b.name, 120),
    industry: clean(b.industry, 120) || "Another field",
    dream_role: clean(b.dream, 120) || "Still figuring it out",
    goal: clean(b.goal, 300) || "Land my first role in HR",
  }).eq("id", data.user.id);
  if (error) return NextResponse.json({ error: "failed" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
