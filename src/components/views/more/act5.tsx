"use client";
/** Extra depth for Act 5. Paid content. */
import { useApp } from "../../AppProvider";
import { Band, Chk, Mark, Note, Rec, TA, Tpl } from "../../ui";
import { Squiggle } from "../../Doodle";
import type { ViewId } from "@/lib/journey";

/* ───── STEP 19 · FIRST YEAR, more ───── */
export function FirstYearMore() {
  return (
    <>
      <div className="card">
        <Mark icon="clock" label="The whole arc" />
        <h3 className="sec">Twelve months, month by month</h3>
        <Squiggle />
        <p className="body">So you know what is normal when it happens to you. Not everyone hits these on the exact month. Everyone hits them.</p>
        <table className="tbl">
          <thead><tr><th>Month</th><th>What it usually feels like</th><th>What to do</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Everything is new and you are slow at all of it</td><td>Learn the systems, meet everyone, say yes, keep the question list</td></tr>
            <tr><td>2</td><td>You can do the basics. You still feel like a guest</td><td>Own one small process. Start the brag document if you have not</td></tr>
            <tr><td>3</td><td>The 90 day mark. Someone will ask how it is going</td><td>Bring one documented improvement. Ask what the next level looks like</td></tr>
            <tr><td>4</td><td>Comfortable. Maybe a little bored with the basics</td><td>Ask for something harder. Build a relationship with a hiring manager outside HR</td></tr>
            <tr><td>5</td><td>You start to see what is broken around you</td><td>Fix one thing, quietly, with the person who owns it. Do not announce a crusade</td></tr>
            <tr><td>6</td><td>Mid year review, maybe. Also when the first real mistake lands</td><td>Own the mistake fast. Bring the brag document to the review</td></tr>
            <tr><td>7</td><td>The wall. The patience is gone and you are expected to just know</td><td>Reread this step. Keep showing up. It passes</td></tr>
            <tr><td>8</td><td>Out the other side. You are the person people ask</td><td>Say yes to training the next new person. Register for the certification if you have not</td></tr>
            <tr><td>9</td><td>You know which side of HR you prefer</td><td>Say it to your manager. Ask for work on that side</td></tr>
            <tr><td>10</td><td>Recruiters start messaging you on LinkedIn</td><td>Reply politely, stay put, note what they are offering. That is market data for your review</td></tr>
            <tr><td>11</td><td>You are planning your review conversation</td><td>Pull the ten best lines from the brag document. Research the market rate for your role now</td></tr>
            <tr><td>12</td><td>The review, and the growth conversation</td><td>Ask for the next level with evidence. If there is no path, you now know, from strength</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 className="sec">The one on one with your manager</h3>
        <p className="sub">Most managers do not run these well. You can, quietly, from your side of the table.</p>
        <Tpl label="One on one agenda, every time" text={"1. Wins since last time (two, with numbers if possible)\n2. What I am working on, and where I am stuck\n3. One question I need an answer to\n4. Anything you need from me\n5. Every third one: how am I doing, honestly, and what should I do more of or less of"} />
        <Rec><p>Send that agenda the morning of. A manager who gets an agenda walks in prepared and leaves thinking you are organized. That impression, repeated every two weeks for a year, is what a promotion is made of.</p></Rec>
      </div>

      <div className="card">
        <h3 className="sec">Asking for more money at year one</h3>
        <p className="body">You may have started at the bottom of the range. That was fine then. At a year, with a brag document full of numbers, it is time to have the conversation. The same way you negotiated the offer: with data, not feelings.</p>
        <Chk k="m_raiseprep" items={[
          "Pull the ten best lines from the brag document, with numbers",
          "Find the current market midpoint for your role in your city",
          "Know what you are asking for: a number or a percent, and a title change if one fits",
          "Pick the moment: a scheduled one on one, two to four weeks before review decisions get made, not the day of",
          "Prepare for no: ask what you would need to show, and by when, and write it down",
        ]} />
        <Tpl label="The ask" text="I want to talk about my compensation. In the past year I [two or three wins with numbers]. The market midpoint for this role in [city] is around $[X], and I started at $[Y]. I would like to move to $[Z]. I know this is a conversation, not a demand, and if the answer is not yet, I would like to know what I would need to show and by when." />
      </div>

      <div className="card">
        <h3 className="sec">Certification timeline</h3>
        <p className="body">If you did the aPHR while breaking in, good. If not, the first year is the time. Register in month three or four when you know you are staying, study for six to ten weeks, and sit it before month eight. Then stop. The PHR or SHRM-CP needs real experience behind it, and you will know when it is time. Ask your company whether they pay for exams. Many do, and many people never ask.</p>
      </div>

      <div className="card">
        <h3 className="sec">When your manager leaves, or everything gets reorganized</h3>
        <p className="body">It happens in year one more often than you would think. Your manager takes a new job, the team gets folded into another, and suddenly the person who hired you is gone. <strong>Your brag document is now your resume inside the company.</strong> Meet the new manager in week one with the agenda above and the ten best lines. Make it easy for them to see what you do. The people who disappear in a reorg are the ones nobody could describe.</p>
      </div>

      <div className="card">
        <h3 className="sec">Protecting your energy in HR</h3>
        <p className="body">You will carry things. Terminations you knew about before the person did. Medical leaves. Investigations. The weight is real and it is part of why the job matters. Two rules that have kept people in this field for twenty years: <strong>you do not take it home, and you do not carry it alone.</strong> Find one person in HR, not at your company, who you can talk to in general terms. And leave the building at a reasonable hour at least three days a week, on purpose, because the inbox will be there tomorrow.</p>
        <Band icon="heart" color="#8EDBC2"><b>Discretion is not the same as isolation.</b> You keep the details confidential. You do not have to keep the weight to yourself.</Band>
      </div>
    </>
  );
}

/* ───── STEP 20 · CONGRATULATIONS, more ───── */
const TOOLKIT: { title: string; items: [string, ViewId][] }[] = [
  { title: "Decide", items: [["Who to message first, five scripts", "story"], ["A day in the life, four roles", "isright"], ["Certifications decoded", "isright"], ["Search terms by lane", "decoder"]] },
  { title: "Prepare", items: [["Translation tables for your industry", "skills"], ["Resume, section by section", "resume"], ["Gaps and short stints, scripts", "resume"], ["Two full cover letters", "cover"], ["Headline formulas and three About sections", "linkedin"], ["Five kinds of LinkedIn posts", "linkedin"]] },
  { title: "Hunt", items: [["Two weekly schedules", "plan"], ["When the plan stalls, the fix table", "plan"], ["Eleven networking messages", "network"], ["The coffee chat, minute by minute", "network"], ["Working with an agency recruiter", "apply"], ["Your funnel numbers", "apply"]] },
  { title: "Land", items: [["The 90 second answer builder", "phone"], ["Twelve interview questions with strong answers", "interview"], ["Questions by role", "interview"], ["What a background check checks", "refs"], ["Reading the offer letter", "offer"], ["Total compensation worksheet", "offer"], ["Accept, decline, resign, three letters", "offer"], ["Week one questions and the brag document", "ninety"]] },
  { title: "Grow", items: [["Twelve months, month by month", "firstyear"], ["The one on one agenda", "firstyear"], ["Asking for more money at year one", "firstyear"], ["The 30 Day Sprint", "sprint"]] },
];

export function GradMore() {
  const { go } = useApp();
  return (
    <>
      <div className="card">
        <h3 className="sec">Your toolkit, in one place</h3>
        <p className="sub">Everything you built and every template you will come back to. Tap any of them.</p>
        {TOOLKIT.map((g) => (
          <div key={g.title} style={{ marginBottom: 18 }}>
            <div className="pill navy" style={{ marginBottom: 10 }}>{g.title}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {g.items.map((it) => <button key={it[0]} className="btn btn-g btn-sm" onClick={() => go(it[1])}>{it[0]}</button>)}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="sec">Tell me your win</h3>
        <p className="body">When you land it, I want to know. Not because it is polite. Because every story from someone who did this makes the next person believe they can. Write the short version here, then send it to me from the contact page.</p>
        <TA k="m_win" ph="The role, the company, how long it took, and the one thing from this platform that made the difference..." rows={4} label="My win" />
        <div style={{ marginTop: 14 }}><button className="btn btn-t btn-sm" onClick={() => go("contact")}>Send it to Dominique →</button></div>
      </div>
    </>
  );
}

/* ───── STEP 21 · NEXT STEPS, more ───── */
export function NextMore() {
  const { go } = useApp();
  return (
    <>
      <div className="card" style={{ border: "2px solid var(--mint)" }}>
        <Mark icon="rocket" label="Daily practice" />
        <h3 className="sec">Start the 30 Day Sprint</h3>
        <Squiggle />
        <p className="body">You have read the whole journey. Now the daily version. One lesson and one action a day for thirty days, dated from the day you choose. It turns everything you just learned into a search that is actually running, and it is the thing I would do first if I were you.</p>
        <button className="btn btn-t" onClick={() => go("sprint")}>Open the 30 Day Sprint →</button>
      </div>

      <div className="card">
        <h3 className="sec">Three months, six months, a year from now</h3>
        <p className="sub">Check these off as they happen. Come back and look at the list when you forget how far you have come.</p>
        <Chk k="m_horizon" items={[
          "Three months: I have a running search with a weekly rhythm, or I have landed",
          "Three months: at least ten people in HR know my name and what I am moving toward",
          "Six months: I am in an HR role, or I have had real interviews and know exactly what to fix",
          "Six months: the aPHR is registered or done",
          "One year: I own a process at work and have a brag document to prove it",
          "One year: I have had the growth conversation and know my next level",
          "One year: I have helped one person who is where I was",
        ]} />
      </div>

      <div className="card">
        <h3 className="sec">Paying it forward</h3>
        <p className="body">Somebody is going to message you in a year and ask how you got into HR. Take the call. Twenty minutes, the five coffee chat questions, and the honest version of your story including the part where it was slow. That conversation is how this field works. It is how I got in, and it is how you did.</p>
        <Note kind="story" label="One last thing"><p>You were never unqualified. You were undertranslated. Now you have the words, and the next person needs them from you.</p></Note>
      </div>
    </>
  );
}
