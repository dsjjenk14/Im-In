"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../Toast";
import { priceLabel } from "@/config/site";
import { buy } from "@/lib/checkout";

export function GateView() {
  const { toast } = useToast();
  const router = useRouter();
  const [code, setCode] = useState("");

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    if (q.get("need") === "plan") toast("Pick a plan first. Your account opens as soon as you have paid.");
    if (q.get("pay") === "pending") toast("Your payment is still going through. Give it a minute, then use the link in your email.");
  }, [toast]);

  const unlock = async () => {
    const c = code.trim();
    if (!c) { toast("Enter the access code you were given."); document.getElementById("gateCode")?.focus(); return; }
    const r = await fetch("/api/redeem", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: c }) }).catch(() => null);
    const j = r ? await r.json().catch(() => ({})) : {};
    if (!r || !r.ok) { toast("That code did not match. Check it and try again."); return; }
    router.push(j.next);
    router.refresh();
    if (j.next !== "/app") setTimeout(() => toast("You are in. Create your account to save your progress."), 400);
  };

  return (
    <div id="gate">
      <div className="auth-glow" />
      <div className="gate-in">
        <div className="gate-head">
          <div className="brandmark"><div className="bm-dot">HR</div><div className="bm-txt">The HR Blueprint</div></div>
          <div className="gate-eyebrow">By a recruiter who has hired hundreds</div>
          <h1>Stop guessing. <em>Get hired</em> in HR.</h1>
          <p>The full platform that walks you from wherever you are now into a real HR, recruiting, or talent acquisition job. Built by someone who makes the hiring call, not a career blog.</p>
        </div>

        <div className="tiers">
          <div className="tier">
            <h3>The Blueprint</h3>
            <div className="tprice">{priceLabel("basic")}</div>
            <div className="tsub">One time. Yours for good. Everything you need to do this yourself.</div>
            <ul>
              <li><span className="ck">✓</span> All 21 steps, start to hired</li>
              <li><span className="ck">✓</span> Resume, cover letter &amp; LinkedIn labs</li>
              <li><span className="ck">✓</span> Interview &amp; phone screen academies</li>
              <li><span className="ck">✓</span> Your dated 90-day search plan</li>
              <li><span className="ck">✓</span> Every tracker, template &amp; game</li>
              <li className="lock"><span className="ck">✕</span> No 1:1 time with me</li>
            </ul>
            <button className="btn btn-g btn-full" onClick={() => { void buy("basic", toast); }}>Get instant access</button>
          </div>

          <div className="tier feat">
            <div className="tier-flag">Most support · limited spots</div>
            <h3>Blueprint + 90 Days With Me</h3>
            <div className="tprice">{priceLabel("premium")}</div>
            <div className="tsub">Everything above, plus me in your corner for 90 days until you land it.</div>
            <ul>
              <li><span className="ck">✓</span> The complete Blueprint platform</li>
              <li><span className="ck">✓</span> A private kickoff call to build your plan</li>
              <li><span className="ck">✓</span> Personal resume &amp; LinkedIn review from me</li>
              <li><span className="ck">✓</span> Two live mock interviews with feedback</li>
              <li><span className="ck">✓</span> Direct message access for 90 days</li>
              <li><span className="ck">✓</span> Warm introductions where I can make them</li>
            </ul>
            <button className="btn btn-t btn-full" onClick={() => { void buy("premium", toast); }}>Work with me →</button>
          </div>
        </div>

        <div className="trust">🔒 Secure checkout · powered by your card processor, not this page</div>

        <div className="gate-foot">
          <button onClick={() => router.push("/preview")}>Take a free look inside</button>
          <span className="sep">·</span>
          <button onClick={() => router.push("/signin")}>I already have an account</button>
          <div className="code-row">
            <input className="inp" id="gateCode" placeholder="Paid already? Enter your access code" aria-label="Access code"
              value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") void unlock(); }} />
            <button className="btn btn-p btn-sm" onClick={() => { void unlock(); }}>Unlock</button>
          </div>
        </div>
      </div>
    </div>
  );
}
