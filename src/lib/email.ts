import "server-only";
import { Resend } from "resend";
import { ownerEmail, siteUrl } from "./env";
import { PRICES, type Tier } from "@/config/site";

/**
 * Transactional email through Resend. If Resend is not configured yet the
 * email is skipped and logged, so nothing else breaks.
 * New copy here follows the platform voice: plain, direct, no em dashes.
 */

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function layout(title: string, bodyHtml: string): string {
  return `<!doctype html><html><body style="margin:0;background:#F6F8FA;font-family:Inter,Arial,sans-serif;color:#0F2744">
<div style="max-width:560px;margin:0 auto;padding:32px 20px">
  <div style="font-weight:700;font-size:15px;margin-bottom:20px"><span style="display:inline-block;background:#8EDBC2;color:#0F2744;border-radius:8px;padding:4px 8px;margin-right:8px">HR</span>The HR Blueprint</div>
  <div style="background:#fff;border:1px solid #E3E8EF;border-radius:16px;padding:28px">
    <h1 style="font-size:22px;margin:0 0 14px">${esc(title)}</h1>
    ${bodyHtml}
  </div>
  <p style="font-size:12px;color:#8A97A9;margin-top:18px">Dominique Jenkins · hiredominique.com</p>
</div></body></html>`;
}

const p = (t: string) => `<p style="font-size:15px;line-height:1.65;color:#5C6B82;margin:0 0 14px">${t}</p>`;
const btn = (href: string, label: string) =>
  `<p style="margin:20px 0 6px"><a href="${esc(href)}" style="background:#38B2AC;color:#fff;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:10px;display:inline-block">${esc(label)}</a></p>`;

async function send(opts: { to: string; subject: string; html: string; replyTo?: string }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from || !opts.to) {
    console.warn("[email skipped, Resend not configured]", opts.subject, "→", opts.to);
    return false;
  }
  try {
    const { error } = await new Resend(key).emails.send({ from, to: opts.to, subject: opts.subject, html: opts.html, replyTo: opts.replyTo });
    if (error) { console.error("[email failed]", error); return false; }
    return true;
  } catch (e) {
    console.error("[email failed]", e);
    return false;
  }
}

const money = (cents: number) => "$" + (cents / 100).toFixed(2).replace(/\.00$/, "");

export async function sendReceipt(to: string, tier: Tier, cents: number, ref: string) {
  const html = layout("Your receipt", [
    p(`Thank you. Here is your receipt for <strong style="color:#0F2744">${esc(PRICES[tier].name)}</strong>.`),
    `<table style="width:100%;font-size:14px;color:#0F2744;border-collapse:collapse;margin:6px 0 16px">
      <tr><td style="padding:8px 0;border-bottom:1px solid #E3E8EF">Item</td><td style="padding:8px 0;border-bottom:1px solid #E3E8EF;text-align:right">${esc(PRICES[tier].name)}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #E3E8EF">Amount</td><td style="padding:8px 0;border-bottom:1px solid #E3E8EF;text-align:right">${money(cents)}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #E3E8EF">Date</td><td style="padding:8px 0;border-bottom:1px solid #E3E8EF;text-align:right">${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</td></tr>
      <tr><td style="padding:8px 0">Reference</td><td style="padding:8px 0;text-align:right;font-family:monospace;font-size:12px">${esc(ref)}</td></tr>
    </table>`,
    p("One time payment. Nothing recurring. Keep this email for your records."),
  ].join(""));
  return send({ to, subject: "Your HR Blueprint receipt", html, replyTo: ownerEmail() });
}

/** claimUrl is set when the buyer has no account yet, so they can finish signing up from any device. */
export async function sendWelcome(to: string, tier: Tier, claimUrl: string | null) {
  const premium = tier === "premium";
  const html = layout(premium ? "Welcome to your 90 days" : "You are in", [
    p(premium
      ? "You did not just buy a platform. You have me in your corner for the next 90 days, until you land it."
      : "You have the whole Blueprint now. All 21 steps, every lab, every tracker, yours for good."),
    p(premium
      ? "Here is how we start. Create your account, then open Work With Me and book your kickoff call. Bring your resume and the kind of role you want."
      : "Start with Step 1 and do the work, not just the reading. Come back on the slow weeks too. That is the part that gets people hired."),
    claimUrl
      ? btn(claimUrl, "Create my account") + p('<span style="font-size:13px">If you already finished signing up, ignore that button and just sign in.</span>')
      : btn(siteUrl() + (premium ? "/app/premium" : "/app"), premium ? "Open my coaching hub" : "Start the journey"),
    p("If anything gets stuck, reply to this email. It comes straight to me."),
  ].join(""));
  return send({ to, subject: premium ? "Welcome to your 90 days with me" : "You are in. Here is where to start.", html, replyTo: ownerEmail() });
}

export async function notifyOwnerPurchase(buyer: string, tier: Tier, cents: number) {
  const html = layout("New purchase", p(`${esc(buyer)} bought <strong style="color:#0F2744">${esc(PRICES[tier].name)}</strong> for ${money(cents)}.`) + btn(siteUrl() + "/admin?tab=members", "Open the admin panel"));
  return send({ to: ownerEmail(), subject: `New ${tier} purchase: ${buyer}`, html });
}

export async function notifyOwnerMessage(m: { name: string; email: string; subject: string; body: string; premium: boolean }) {
  const html = layout((m.premium ? "Premium message: " : "Message: ") + m.subject, [
    p(`From <strong style="color:#0F2744">${esc(m.name)}</strong> (${esc(m.email)})${m.premium ? " · premium member" : ""}`),
    `<div style="white-space:pre-wrap;font-size:15px;line-height:1.65;background:#F6F8FA;border-radius:12px;padding:16px;margin:0 0 14px">${esc(m.body)}</div>`,
    p("Reply to this email, or answer from the admin panel so it is saved with the message."),
    btn(siteUrl() + "/admin?tab=messages", "Open messages"),
  ].join(""));
  return send({ to: ownerEmail(), subject: (m.premium ? "[Premium] " : "") + "HR Blueprint · " + m.subject, html, replyTo: m.email });
}

export async function sendReply(to: string, name: string, subject: string, original: string, reply: string) {
  const html = layout("A reply from Dominique", [
    p(`Hi ${esc(name.split(" ")[0] || "there")},`),
    `<div style="white-space:pre-wrap;font-size:15px;line-height:1.7;color:#0F2744;margin:0 0 18px">${esc(reply)}</div>`,
    `<div style="border-left:3px solid #E3E8EF;padding-left:12px;font-size:13px;color:#8A97A9;white-space:pre-wrap">You wrote: ${esc(original)}</div>`,
    btn(siteUrl() + "/app/contact", "Write back"),
  ].join(""));
  return send({ to, subject: "Re: " + subject, html, replyTo: ownerEmail() });
}
