"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../Toast";
import { DREAMS, INDUSTRIES } from "@/lib/options";

export function OnboardingView({ name: initial }: { name: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const [f, setF] = useState({ name: initial, industry: "", dream: "", goal: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const save = async () => {
    if (!f.name.trim()) { toast("Add your name so I know who I am talking to."); return; }
    const r = await fetch("/api/profile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) }).catch(() => null);
    if (!r?.ok) { toast("That did not go through. Try again in a moment."); return; }
    router.push("/app/welcome");
    router.refresh();
    setTimeout(() => toast("Welcome in, " + f.name.trim().split(" ")[0] + ". Let us get to work."), 700);
  };
  return (
    <div id="auth" style={{ gridTemplateColumns: "1fr" }}>
      <div className="auth-glow" />
      <div className="auth-right" style={{ background: "transparent" }}>
        <div className="auth-card">
          <h2>Start your pivot</h2>
          <p className="lede">Three questions so I can tailor this to you.</p>
          <div className="field"><label htmlFor="obName">Your name</label>
            <input className="inp" id="obName" placeholder="First and last" value={f.name} onChange={set("name")} /></div>
          <div className="field"><label htmlFor="obIndustry">What are you coming from?</label>
            <select className="inp" id="obIndustry" value={f.industry} onChange={set("industry")}>
              <option value="">Choose your current field</option>
              {INDUSTRIES.map((o) => <option key={o}>{o}</option>)}
            </select></div>
          <div className="field"><label htmlFor="obDream">What&apos;s the dream role?</label>
            <select className="inp" id="obDream" value={f.dream} onChange={set("dream")}>
              <option value="">Choose your target</option>
              {DREAMS.map((o) => <option key={o}>{o}</option>)}
            </select></div>
          <div className="field"><label htmlFor="obGoal">Your goal, in one sentence</label>
            <input className="inp" id="obGoal" placeholder="Land my first HR role within 6 months" value={f.goal} onChange={set("goal")} /></div>
          <button className="btn btn-t btn-full" style={{ marginTop: 8 }} onClick={() => { void save(); }}>Let&apos;s go</button>
        </div>
      </div>
    </div>
  );
}
