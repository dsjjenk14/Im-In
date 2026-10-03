"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../Toast";
import { GoogleButton } from "./Google";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { DREAMS, INDUSTRIES } from "@/lib/options";

export function SignInView({ canCreate }: { canCreate: boolean }) {
  const { toast } = useToast();
  const router = useRouter();
  const [tab, setTab] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState({ liEmail: "", liPass: "", suName: "", suEmail: "", suPass: "", suIndustry: "", suDream: "", suGoal: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const focus = (id: string) => document.getElementById(id)?.focus();

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    /* eslint-disable react-hooks/set-state-in-effect -- read the query string once on mount */
    if (q.get("tab") === "up") setTab("up");
    if (q.get("email")) setF((v) => ({ ...v, suEmail: q.get("email") ?? "" }));
    /* eslint-enable react-hooks/set-state-in-effect */
    if (q.get("paid")) setTimeout(() => toast("You are in. Create your account to save your progress."), 400);
    if (q.get("error")) toast("That link did not work. Try again.");
  }, [toast]);

  const doSignIn = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const email = f.liEmail.trim();
    if (!email || email.indexOf("@") < 0) { toast("Enter the email you signed up with."); focus("liEmail"); return; }
    if (!f.liPass) { toast("Enter your password."); focus("liPass"); return; }
    setBusy(true);
    const { data, error } = await supabaseBrowser().auth.signInWithPassword({ email, password: f.liPass });
    setBusy(false);
    if (error || !data.user) { toast("That email and password did not match. Try again."); return; }
    const first = String(data.user.user_metadata?.name ?? "").split(" ")[0];
    router.push("/app");
    router.refresh();
    setTimeout(() => toast(first ? "Welcome back, " + first + "." : "Welcome back."), 600);
  };

  const forgot = async () => {
    const email = f.liEmail.trim();
    if (!email || email.indexOf("@") < 0) { toast("Enter the email you signed up with."); focus("liEmail"); return; }
    await supabaseBrowser().auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + "/auth/callback?next=/reset-password" });
    toast("Check your email. I sent you a link to reset your password.");
  };

  const doSignUp = async () => {
    const name = f.suName.trim(), email = f.suEmail.trim(), pass = f.suPass;
    if (!name) { toast("Add your name so I know who I am talking to."); focus("suName"); return; }
    if (!email || email.indexOf("@") < 0) { toast("Enter a valid email address."); focus("suEmail"); return; }
    if (!pass || pass.length < 6) { toast("Password needs at least 6 characters."); focus("suPass"); return; }
    setBusy(true);
    const r = await fetch("/api/auth/signup", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password: pass, industry: f.suIndustry, dream: f.suDream, goal: f.suGoal }),
    }).catch(() => null);
    const j = r ? await r.json().catch(() => ({})) : { error: "offline" };
    setBusy(false);
    if (r?.ok) {
      router.push("/app/welcome");
      router.refresh();
      setTimeout(() => toast("Welcome in, " + name.split(" ")[0] + ". Let us get to work."), 700);
      return;
    }
    if (j.error === "taken") { toast("That email already has an account. Sign in instead."); setTab("in"); return; }
    if (j.error === "no_claim" || j.error === "claim_used") { toast("Pick a plan first. Your account opens as soon as you have paid."); return; }
    toast("That did not go through. Try again in a moment.");
  };

  return (
    <div id="auth">
      <div className="auth-glow" />
      <div className="auth-left">
        <div className="brandmark"><div className="bm-dot">HR</div><div className="bm-txt">The HR Blueprint</div></div>
        <div className="auth-eyebrow">Built by a recruiter, for you</div>
        <h1 className="auth-h1">Let&apos;s build your <em>dream career</em> in HR.</h1>
        <p className="auth-sub">I&apos;ve spent eight years on the hiring side, across several very different industries. I know exactly what gets someone hired, because I&apos;m the one making the call. This is everything I&apos;d tell you if we were sitting across from each other.</p>
        <div className="auth-stats">
          <div className="astat"><b>8</b><span>Years in talent acquisition</span></div>
          <div className="astat"><b>65</b><span>Hires in 2.5 years</span></div>
          <div className="astat"><b>~90%</b><span>Offer acceptance rate</span></div>
          <div className="astat"><b>90→55</b><span>Days to fill, rebuilt</span></div>
        </div>
        <div className="auth-foot">Dominique Jenkins · 8 years in talent acquisition · hiredominique.com</div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-tabs" role="tablist">
            <button className={"auth-tab" + (tab === "in" ? " on" : "")} role="tab" aria-selected={tab === "in"} onClick={() => setTab("in")}>Sign in</button>
            <button className={"auth-tab" + (tab === "up" ? " on" : "")} role="tab" aria-selected={tab === "up"} onClick={() => setTab("up")}>Create account</button>
          </div>

          {tab === "in" ? (
            <form onSubmit={(e) => { void doSignIn(e); }} noValidate>
              <h2>Welcome back</h2>
              <p className="lede">Pick up right where you left off.</p>
              <div className="field"><label htmlFor="liEmail">Email</label>
                <input className="inp" id="liEmail" type="email" placeholder="you@email.com" autoComplete="email" value={f.liEmail} onChange={set("liEmail")} /></div>
              <div className="field"><label htmlFor="liPass">Password</label>
                <input className="inp" id="liPass" type="password" placeholder="••••••••" autoComplete="current-password" value={f.liPass} onChange={set("liPass")} /></div>
              <div className="checkrow">
                <label className="cbx"><input type="checkbox" defaultChecked /> Remember me</label>
                <button type="button" className="link" onClick={() => { void forgot(); }}>Forgot password?</button>
              </div>
              <button type="submit" className="btn btn-p btn-full" disabled={busy}>Continue</button>
              <GoogleButton />
              <p style={{ textAlign: "center", fontSize: 13, color: "var(--slate)", marginTop: 18 }}>
                New here? <button type="button" className="link" onClick={() => setTab("up")}>Create your account</button></p>
            </form>
          ) : canCreate ? (
            <div>
              <h2>Start your pivot</h2>
              <p className="lede">Three questions so I can tailor this to you.</p>
              <div className="field"><label htmlFor="suName">Your name</label>
                <input className="inp" id="suName" placeholder="First and last" autoComplete="name" value={f.suName} onChange={set("suName")} /></div>
              <div className="row2">
                <div className="field"><label htmlFor="suEmail">Email</label>
                  <input className="inp" id="suEmail" type="email" placeholder="you@email.com" autoComplete="email" value={f.suEmail} onChange={set("suEmail")} /></div>
                <div className="field"><label htmlFor="suPass">Password</label>
                  <input className="inp" id="suPass" type="password" placeholder="••••••••" autoComplete="new-password" value={f.suPass} onChange={set("suPass")} /></div>
              </div>
              <div className="field"><label htmlFor="suIndustry">What are you coming from?</label>
                <select className="inp" id="suIndustry" value={f.suIndustry} onChange={set("suIndustry")}>
                  <option value="">Choose your current field</option>
                  {INDUSTRIES.map((o) => <option key={o}>{o}</option>)}
                </select></div>
              <div className="field"><label htmlFor="suDream">What&apos;s the dream role?</label>
                <select className="inp" id="suDream" value={f.suDream} onChange={set("suDream")}>
                  <option value="">Choose your target</option>
                  {DREAMS.map((o) => <option key={o}>{o}</option>)}
                </select></div>
              <div className="field"><label htmlFor="suGoal">Your goal, in one sentence</label>
                <input className="inp" id="suGoal" placeholder="Land my first HR role within 6 months" value={f.suGoal} onChange={set("suGoal")} /></div>
              <button className="btn btn-t btn-full" style={{ marginTop: 8 }} disabled={busy} onClick={() => { void doSignUp(); }}>Create account</button>
              <GoogleButton label="Create account with Google" />
              <p style={{ fontSize: 11.5, color: "var(--slate-2)", textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>
                Your progress saves to your account, so it follows you to any device.</p>
            </div>
          ) : (
            <div>
              <h2>Start your pivot</h2>
              <p className="lede">Pick a plan first, then come back here to create your account. Already paid? Use the link in your welcome email, or enter your access code on the plans page.</p>
              <button className="btn btn-t btn-full" onClick={() => router.push("/")}>See the two options →</button>
            </div>
          )}

          <div className="skip-wrap">
            <button className="skip-btn" onClick={() => router.push("/preview")}>Skip sign in and explore the beta →</button>
            <p>Opens a preview with example data filled in. Act 1 is open to explore. Nothing you do in the beta touches a real account.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
