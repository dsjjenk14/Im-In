import { redirect } from "next/navigation";
import { createAdmin, createClient } from "@/lib/supabase/server";
import { OnboardingView } from "@/components/auth/OnboardingView";

/** The three sign up questions, for members who joined with Google. */
export default async function Onboarding() {
  const { data } = await (await createClient()).auth.getUser();
  if (!data.user) redirect("/signin");
  const { data: p } = await createAdmin().from("profiles").select("name").eq("id", data.user.id).maybeSingle();
  if (!p) redirect("/?need=plan");
  return <OnboardingView name={p.name} />;
}
