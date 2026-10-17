"use client";
import { useApp } from "../AppProvider";
import { Band, ChkItem, HeroDoodle, Rec, TA, Tpl } from "../ui";
import { Doodle } from "../Doodle";
import { rich } from "../rich";
import { SPRINT_DAYS } from "@/lib/content/sprint";
import { txt } from "@/lib/state";
import { sprintDone, sprintToday } from "@/lib/sprint";

const fmtDate = (d: Date) => d.toLocaleDateString(undefined, { month: "short", day: "numeric" });

export function Sprint() {
  const { S, setTxt, update, toast, go } = useApp();
  const start = txt(S, "sprintStart");
  const todayN = sprintToday(start);
  const done = sprintDone(S.chk);

  const toggle = (n: number) => update((s) => {
    const key = "sprint_d" + n;
    const chk = { ...s.chk, [key]: !s.chk[key] };
    let badges = s.badges;
    if (sprintDone(chk) >= SPRINT_DAYS.length && !s.badges.sprinter) {
      badges = { ...s.badges, sprinter: true };
      setTimeout(() => toast("Badge unlocked. Thirty days, done."), 0);
    }
    return { ...s, chk, badges };
  });

  return (
    <>
      <div className="hero">
        <HeroDoodle name="rocket" />
        <div className="eyebrow">Daily practice · 30 days</div>
        <h1>One thing a day, for thirty days.</h1>
        <p>The journey teaches you how this works. The sprint makes you do it. A short lesson and one action every day, dated from the day you choose to start. Thirty days from now you will have a running job search instead of a plan to start one.</p>
      </div>

      <div className="card">
        <h3 className="sec">When does your sprint start?</h3>
        <p className="sub">Pick a day. Today is a fine choice. I will date all thirty days from it.</p>
        <div className="field" style={{ maxWidth: 260 }}><label htmlFor="sprintStart">My sprint starts</label>
          <input className="inp" type="date" id="sprintStart" value={start} onChange={(e) => setTxt("sprintStart", e.target.value)} /></div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", background: "var(--fog)", padding: "16px 20px", borderRadius: 14 }}>
          <Doodle name="clock" size={34} />
          <div style={{ flex: 1, minWidth: 180 }}>
            <b style={{ fontFamily: "var(--dsp)", fontSize: 16 }}>{done} of {SPRINT_DAYS.length} days done</b>
            <div style={{ height: 7, background: "var(--fog-2)", borderRadius: 4, overflow: "hidden", marginTop: 8 }}>
              <div style={{ height: "100%", width: (done / SPRINT_DAYS.length) * 100 + "%", background: "linear-gradient(90deg,var(--mint),var(--teal))", transition: "width .6s" }} /></div>
          </div>
          {todayN ? <span className="pill">Today is day {todayN}</span> : null}
        </div>
        <Rec><p>Each day takes twenty to forty minutes. Miss one? Do not double up tomorrow. Just do tomorrow. The streak you are protecting is showing up, not perfection. If you want the bigger picture while you do this, keep the 90 day plan open too. The sprint is the daily version of the same thing.</p></Rec>
      </div>

      {SPRINT_DAYS.map((d, i) => {
        const n = i + 1;
        const key = "sprint_d" + n;
        const on = !!S.chk[key];
        const isNow = todayN === n;
        let date = "";
        if (start) { const s = new Date(start + "T00:00:00"); s.setDate(s.getDate() + i); date = fmtDate(s); }
        const head = i === 0 || SPRINT_DAYS[i - 1].theme !== d.theme ? <div className="rail-lbl" style={{ padding: "22px 0 10px", color: "var(--slate)" }}>{d.theme}</div> : null;
        return (
          <div key={key}>
            {head}
            <div className={"pweek" + (isNow ? " now" : "")} id={"day-" + n}>
              <div className="pwtop">
                <span className="pwk">Day {n} · {d.t}{isNow ? <> <span className="pill" style={{ marginLeft: 6 }}>You are here</span></> : null}</span>
                <span className="pwd">{date || "set a date above"}</span>
              </div>
              {d.lesson.map((p, k) => <p className="body" key={k}>{rich(p)}</p>)}
              {d.note ? <Rec><p>{d.note}</p></Rec> : null}
              {d.tpl ? <Tpl label={d.tpl.label} text={d.tpl.text} /> : null}
              <div style={{ margin: "16px 0 12px" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--teal-2)", fontWeight: 600, marginBottom: 8 }}>Today&apos;s one thing</div>
                <ul className="chk"><ChkItem on={on} onToggle={() => toggle(n)}>{d.action}</ChkItem></ul>
              </div>
              <div className="field" style={{ marginBottom: 0 }}><label>Write it down</label>
                <TA k={"sprint_n" + n} ph={d.prompt} rows={3} label={"Day " + n + " notes"} /></div>
            </div>
          </div>
        );
      })}

      <div className="card">
        <h3 className="sec">After day thirty</h3>
        <Band icon="heart" color="#8EDBC2"><b>Set a new start date and run it again.</b> The second time through, most days take ten minutes because the building is done. Keep the parts that got replies and interviews. Drop the rest. And keep the dated plan running alongside it.</Band>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="btn btn-t" onClick={() => go("plan")}>Open the 90 day plan →</button>
          <button className="btn btn-g" onClick={() => go("dashboard")}>Back to dashboard</button>
        </div>
      </div>
    </>
  );
}
