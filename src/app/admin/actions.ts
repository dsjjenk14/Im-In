"use server";
import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./guard";
import { createAdmin } from "@/lib/supabase/server";
import { sendReply } from "@/lib/email";
import { clean } from "@/lib/members";

const done = (tab: string, extra = "") => { revalidatePath("/admin"); redirect("/admin?tab=" + tab + extra); };

export async function grantTier(form: FormData) {
  await requireAdmin();
  const userId = clean(form.get("user_id"), 64), tier = form.get("tier") === "premium" ? "premium" : "basic";
  const db = createAdmin();
  const { data: p } = await db.from("profiles").select("email").eq("id", userId).maybeSingle();
  if (p) await db.from("entitlements").insert({ user_id: userId, email: p.email, tier, access: true, source: "admin" });
  done("members");
}

export async function revokeAccess(form: FormData) {
  await requireAdmin();
  await createAdmin().from("entitlements").update({ access: false }).eq("user_id", clean(form.get("user_id"), 64));
  done("members");
}

export async function saveCoaching(form: FormData) {
  await requireAdmin();
  await createAdmin().from("coaching").upsert({
    user_id: clean(form.get("user_id"), 64),
    kickoff_booked: form.get("kickoff_booked") === "on",
    session_notes: clean(form.get("session_notes"), 10000),
    goal: clean(form.get("goal"), 1000),
    updated_at: new Date().toISOString(),
  });
  done("members");
}

export async function replyMessage(form: FormData) {
  await requireAdmin();
  const id = clean(form.get("id"), 64), reply = clean(form.get("reply"), 10000);
  if (!reply) done("messages");
  const db = createAdmin();
  const { data: m } = await db.from("messages").select("name, email, subject, body").eq("id", id).maybeSingle();
  if (!m) done("messages");
  const sent = await sendReply(m!.email, m!.name, m!.subject || "Your message", m!.body, reply);
  await db.from("messages").update({ replied: true, reply_body: reply, replied_at: new Date().toISOString() }).eq("id", id);
  done("messages", sent ? "&sent=1" : "&sent=0");
}

export async function toggleReplied(form: FormData) {
  await requireAdmin();
  await createAdmin().from("messages").update({ replied: form.get("replied") === "true" }).eq("id", clean(form.get("id"), 64));
  done("messages");
}

export async function saveAd(form: FormData) {
  await requireAdmin();
  const slot = Number(form.get("slot")) === 2 ? 2 : 1;
  const url = clean(form.get("url"), 500);
  await createAdmin().from("ads").upsert({
    slot,
    headline: clean(form.get("headline"), 120),
    text: clean(form.get("text"), 400),
    cta: clean(form.get("cta"), 40),
    url: /^https?:\/\//i.test(url) || !url ? url : "https://" + url,
    active: form.get("active") === "on",
    updated_at: new Date().toISOString(),
  });
  done("ads");
}

export async function createCode(form: FormData) {
  await requireAdmin();
  const tier = form.get("tier") === "premium" ? "premium" : "basic";
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const pick = (n: number) => Array.from(randomBytes(n), (b) => alphabet[b % alphabet.length]).join("");
  const code = "HRB-" + pick(4) + "-" + pick(4);
  await createAdmin().from("access_codes").insert({ code, tier, note: clean(form.get("note"), 200) });
  done("codes", "&new=" + code);
}
