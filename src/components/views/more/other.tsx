"use client";
/** Dashboard sprint card and extra depth for the premium hub. */
import { useApp } from "../../AppProvider";
import { Chk, Note, Tpl } from "../../ui";
import { Doodle } from "../../Doodle";
import { SPRINT_TITLES, sprintDone, sprintToday } from "@/lib/sprint";
import { txt } from "@/lib/state";

export function SprintCard() {
  const { S, go } = useApp();
  const start = txt(S, "sprintStart");
  const todayN = sprintToday(start);
  const done = sprintDone(S.chk);
  const day = todayN ? SPRINT_TITLES[todayN - 1] : null;
  return (
    <div className="card">
      <h3 className="sec">The 30 Day Sprint</h3>
      <p className="sub">{start ? done + " of 30 days done." : "One lesson and one action a day. Thirty days."}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", background: "var(--fog)", padding: 20, borderRadius: 16 }}>
        <Doodle name="rocket" size={38} />
        <div style={{ flex: 1, minWidth: 180 }}>
          {day ? (
            <>
              <div className="pill">Day {todayN} of 30</div>
              <b style={{ display: "block", fontFamily: "var(--dsp)", fontSize: 18, marginTop: 9 }}>{day}</b>
              <span style={{ fontSize: 13.5, color: "var(--slate)", display: "block", marginTop: 4 }}>{S.chk["sprint_d" + todayN] ? "Done for today. Nice." : "One lesson, one action. Twenty to forty minutes."}</span>
            </>
          ) : start && done >= 30 ? (
            <b style={{ display: "block", fontFamily: "var(--dsp)", fontSize: 18 }}>Thirty days, done. Set a new date and run it again.</b>
          ) : (
            <b style={{ display: "block", fontFamily: "var(--dsp)", fontSize: 18 }}>{start ? "Your sprint is set. Check back on day one." : "Pick a start date and go."}</b>
          )}
        </div>
        <button className="btn btn-t" onClick={() => go("sprint")}>{day ? "Open today →" : "Open the sprint →"}</button>
      </div>
    </div>
  );
}

export function PremiumMore() {
  return (
    <>
      <div className="card">
        <h3 className="sec">Before our kickoff call</h3>
        <p className="sub">Do these and the call goes twice as far.</p>
        <Chk k="m_kick" items={[
          "Take the career assessment and write down your result, even if you disagree with it",
          "Have your current resume ready, whatever state it is in. I would rather see the real one",
          "Write your one sentence target: role, kind of company, place",
          "List the three things you are most worried about in this search",
          "Write down what you want to be true 90 days from now, specifically",
          "Book the call with the button above and put it on your calendar",
        ]} />
      </div>

      <div className="card">
        <h3 className="sec">How to message me so I can help fast</h3>
        <p className="body">I read every message. The ones I can answer in ten minutes instead of a day are the ones that give me what I need in the first three lines. Use this shape.</p>
        <Tpl label="Message shape" text={"WHAT: one line. (A screen tomorrow. An offer to compare. A resume bullet I cannot fix.)\n\nCONTEXT: two or three lines. The role, the company, where you are in the process.\n\nTHE ASK: one line. What do you want from me? A read, a yes or no, a script, a gut check.\n\n(Paste the thing below if there is a thing.)"} />
        <Note kind="rec" label="What I will ask you most weeks"><p>What did you send, what came back, what is on the calendar, and what are you avoiding. The last one is where the work is. Be honest with me about it and I can help. Tell me what you think I want to hear and we both waste a week.</p></Note>
      </div>
    </>
  );
}
