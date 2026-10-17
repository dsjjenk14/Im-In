"use client";
/** Extra depth for Act 4. Paid content. */
import { useState } from "react";
import { useApp } from "../../AppProvider";
import { Acc, Band, Chk, Inp, Mark, Note, Rec, TA, Tpl } from "../../ui";
import { Squiggle } from "../../Doodle";
import { txt } from "@/lib/state";

const ladder = { listStyle: "none", display: "flex", flexDirection: "column", gap: 11 } as const;
function Rung({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li style={{ background: "var(--fog)", padding: "16px 18px", borderRadius: 13 }}>
      <b style={{ fontFamily: "var(--dsp)" }}>{title}</b>
      <p className="body" style={{ fontSize: 14, margin: "5px 0 0" }}>{children}</p>
    </li>
  );
}

/* ───── STEP 14 · PHONE SCREEN, more ───── */
export function PhoneMore() {
  const { S, toast } = useApp();
  const [out, setOut] = useState<string | null>(null);
  const build = () => {
    const a = txt(S, "m_s90_now").trim(), b = txt(S, "m_s90_thread").trim(), c = txt(S, "m_s90_why").trim();
    if (!a || !b || !c) { toast("Fill in all three parts first."); return; }
    setOut(a + "\n\n" + b + "\n\n" + c);
  };
  return (
    <>
      <div className="card">
        <Mark icon="phone" label="Build it, then time it" />
        <h3 className="sec">Your 90 second answer</h3>
        <Squiggle />
        <p className="body">Walk me through your background is the first thing you will hear on almost every screen. Three parts, ninety seconds, then you stop talking. Fill in the three parts and I will put them together.</p>
        <div className="field"><label>1 · Now. What you do, for how long, and the biggest thing you did there with a number.</label>
          <TA k="m_s90_now" ph="I have spent seven years in retail, most recently running a 14 person team across two locations, where I trained 22 new hires and held the lowest turnover in the district." rows={3} label="Now" /></div>
        <div className="field"><label>2 · The thread. The part of that work that is the core of this role.</label>
          <TA k="m_s90_thread" ph="The part I have always done best is the people side: hiring, training, scheduling, and keeping things steady when it gets busy. That is coordination work, which is what this role is." rows={3} label="The thread" /></div>
        <div className="field"><label>3 · Why this. What you have done on purpose, and one specific reason this role.</label>
          <TA k="m_s90_why" ph="I have been moving toward HR deliberately, registered for the aPHR and talking to people in the field. This role stood out because your team is growing and I want to be the person who keeps the hiring process moving." rows={3} label="Why this" /></div>
        <button className="btn btn-t btn-sm" onClick={build}>Put it together</button>
        <div style={{ marginTop: 14 }}>{out ? <Tpl label="Say this with a timer running. Under 90 seconds, then stop." text={out} /> : null}</div>
        <Rec><p>Record it on your phone and listen once. You are listening for two things: filler words and the moment your voice drops. Fix those two. Ignore everything else. Then say it ten times standing up, until it comes out the same way without thinking.</p></Rec>
      </div>

      <div className="card">
        <h3 className="sec">Questions to ask on a screen</h3>
        <p className="sub">You get two, maybe three. Pick the ones that get you information you need.</p>
        <Chk k="m_scask" items={[
          "What does the interview process look like from here, and how many steps?",
          "Who would this role report to, and how big is the team?",
          "Is this a new role or a backfill? If a backfill, where did the last person go?",
          "What is the timeline for a decision?",
          "Is it okay if I follow up after that date if I have not heard?",
        ]} />
        <Note kind="rec" label="Recruiter's notes"><p>Save remote days, PTO, and benefits for the offer stage. On a screen, those questions read as what can I get before you have shown what you bring. The one exception: if the posting says onsite and you need hybrid, ask now. Nobody benefits from finding that out at the offer.</p></Note>
      </div>

      <div className="card">
        <h3 className="sec">After the screen</h3>
        <p className="body">Send a short note within a few hours. Not a thank you essay. Three lines that make the recruiter&apos;s job easier when they summarize you for the hiring manager.</p>
        <Tpl label="After the screen" text={"Hi [Name], thank you for the call today. To make your notes easy: [X years in field], [the biggest relevant number], moving into HR on purpose, available [date], comfortable in the [range] range.\n\nI am very interested in the [Role] and I look forward to the next step. Thank you."} />
      </div>

      <div className="card">
        <h3 className="sec">If they ask about a gap, a short stint, or why you left</h3>
        <p className="sub">One sentence each. Then stop. The silence after is theirs to fill, not yours.</p>
        <Tpl label="The gap" text="I took [time] to [reason, three words] and I am fully ready to go." />
        <Tpl label="The short stint" text="It was not the right fit for either side and we both knew it early. I learned [one thing] from it." />
        <Tpl label="Why you are leaving" text="I have gotten what I can from [current role], and the part I want to keep doing is the people part. That is HR. So I am going toward it instead of waiting." />
        <Note kind="mistake" label="Common mistakes"><p>Explaining for ninety seconds. Apologizing. Saying anything negative about the old manager. The screen is not asking for the story. It is checking whether you can answer a slightly uncomfortable question like an adult. One sentence proves you can.</p></Note>
      </div>

      <div className="card">
        <h3 className="sec">Red flags on their side</h3>
        <p className="body">A screen is a two way filter. Notice these.</p>
        <ul style={ladder}>
          <Rung title="They cannot tell you why the role is open">A backfill with no explanation sometimes means the last three people left fast. Ask directly, and listen to how the answer sounds.</Rung>
          <Rung title="The duties on the call do not match the posting">Common at small companies. Ask which version is right. If the real job is bigger, the pay should be too.</Rung>
          <Rung title="They push hard for your current salary">In many places they cannot ask. Everywhere, you can answer with your target range instead. If they push a third time, note it.</Rung>
          <Rung title="They want you to start Monday">Urgency is fine. Pressure to skip notice at your current job is not. A company that wants you to burn a bridge for them will not protect yours.</Rung>
        </ul>
      </div>
    </>
  );
}

/* ───── STEP 15 · INTERVIEW ACADEMY, more ───── */
const ROLE_QS: { role: string; qs: [string, string][] }[] = [
  { role: "Recruiting Coordinator", qs: [
    ["Walk me through how you would schedule a panel interview with four interviewers in two time zones.", "Show a method: check calendars first, propose two slots, confirm with the candidate, send invites with the details, confirm the morning of. The method matters more than the answer."],
    ["A candidate emails that they are running late to an onsite. What do you do?", "Tell the interviewers immediately, adjust the schedule, meet the candidate calmly. Communication first, then logistics, no drama."],
    ["How do you keep track of fifteen open roles at once?", "Name the tool, the daily habit, and the weekly report. The ATS, a morning check, a Friday summary to the recruiters."],
    ["How would you handle a hiring manager who has not given feedback in a week?", "A polite nudge with a specific ask and a deadline, then an escalation to the recruiter. Chasing feedback is half the job."],
    ["Tell me about a time you caught an error before it went out.", "A real story with the error, how you caught it, and what you changed so it does not happen again."],
  ] },
  { role: "HR Assistant or Coordinator", qs: [
    ["An employee asks you about a coworker's pay. What do you say?", "A kind, firm no. I cannot share that, and I would not share yours either. Then offer what you can help with."],
    ["Walk me through onboarding a new hire from offer acceptance to day one.", "Offer letter, background check, paperwork, I-9, systems access, orientation, a first day check-in. Order matters. Show you know there is an order."],
    ["How do you prioritize when three managers need something today?", "Ask what is deadline driven, do the legal or payroll item first, communicate the order to all three. Say that out loud."],
    ["What would you do if you noticed a file was missing a required document?", "Flag it, fix it, check whether others are missing the same thing, and tell your manager. Audits find patterns, not single files."],
    ["How comfortable are you with Excel or Google Sheets?", "Be honest and specific. Sorting, filtering, basic formulas, pivot tables if true. Name the last thing you built in a spreadsheet."],
  ] },
  { role: "Agency Recruiter", qs: [
    ["How would you find candidates for a role nobody is applying to?", "Boolean search, LinkedIn, the database, referrals from candidates you already placed, calling people who are not looking. Show you know sourcing is active."],
    ["How do you handle rejection, from candidates and from clients?", "Honestly. It is daily. Say what you do with it: log it, learn from it, make the next call."],
    ["A client wants someone for less than the market pays. What do you do?", "Show them the data, present the best candidate you can at their number, and tell them plainly what they are trading away."],
    ["How do you keep a candidate warm through a slow process?", "A check-in cadence, honest updates even when there is nothing new, and knowing what else they are interviewing for."],
    ["What number would you want to be measured on?", "Placements, but also submittal to interview ratio and offer acceptance. Knowing the second two tells them you understand the job."],
  ] },
];

const IV_FAQ: [string, string][] = [
  ["What do I wear?", "One step more formal than the people who work there. For most HR teams that is business casual: a collared shirt or blouse, no jeans for the first round. On video, the same from the waist up, and a plain background."],
  ["Can I bring notes?", "Yes, and you should. A single page with your three stories, your numbers, and your questions. Glance at it, do not read from it. On video, a sticky note next to the camera."],
  ["How early should I arrive?", "Ten minutes early to the building, five minutes early to the room or the video link. Earlier than that is awkward for them."],
  ["Can I ask about remote work and PTO?", "At the offer stage, yes, all of it. In a first interview, only if the posting was unclear about onsite versus hybrid and it would change whether you take the job."],
  ["What if I do not know an answer?", "Say so, then say what you would do. I have not worked in that system. I picked up our current one in two weeks and I would expect the same. That beats a bluff every time."],
  ["Should I send a thank you note?", "Yes, within 24 hours, to each person you met, each one different. Short. Reference one thing they said. It is the easiest point you can score and most people skip it."],
  ["How long until I hear back?", "Ask at the end of the interview. Then one follow up a few days after that date. Silence is usually internal delay, not rejection."],
];

export function InterviewMore() {
  return (
    <>
      <div className="card">
        <Mark icon="scan" label="By role" />
        <h3 className="sec">The questions each role actually asks</h3>
        <Squiggle />
        <p className="body">The question bank above covers the big ones every interview has. These are the role specific ones, with what a good answer contains. Prepare the set for your lane.</p>
        {ROLE_QS.map((r) => (
          <Acc key={r.role} q={<><span className="pill" style={{ marginRight: 9 }}>Role</span>{r.role}</>}>
            {r.qs.map((q) => (
              <div className="qa" key={q[0]} style={{ marginTop: 14 }}>
                <div className="qlab" style={{ color: "var(--navy)" }}>{q[0]}</div>
                <p>{q[1]}</p>
              </div>
            ))}
          </Acc>
        ))}
      </div>

      <div className="card">
        <h3 className="sec">The panel interview</h3>
        <p className="body">Three to five people, one of you, forty five minutes. It feels like a tribunal and it is not. Each person is there for one thing: the manager wants to know if you can do the work, the peer wants to know if you will make their life easier, the skip level wants to know if you have judgment.</p>
        <ul style={ladder}>
          <Rung title="Answer the person who asked, then include the room">Start with eye contact on the asker. Finish by glancing at the others. On video, look at the camera for the key sentence.</Rung>
          <Rung title="Get names in the first minute">Write them down in order of where they sit. Using a name once in an answer lands.</Rung>
          <Rung title="Expect the same question twice in different words">That is on purpose. Give the same story with a different detail, not a different story.</Rung>
          <Rung title="Have one question for each person">Ask the peer what a good week looks like. Ask the manager what success at six months is. Ask the skip level where the team is going.</Rung>
        </ul>
      </div>

      <div className="card">
        <h3 className="sec">Second rounds and finals: what changes</h3>
        <p className="body">By the second round, they believe you can do the job. The question has changed to whether they want you on the team and whether you will stay. So the answers change too. <strong>Less about what you did, more about how you work with people and what you want next.</strong> Shorter answers. More questions from you. And at the final, the person across the table usually just wants to know you are steady and you want it.</p>
        <Tpl label="Final round close" text="I have met [number] people here now and I want this job. The reason I would be good at it is [one sentence]. The reason I would stay is [one true thing about the team or the path]. What does the next step look like?" />
      </div>

      <div className="card">
        <h3 className="sec">Work samples and take home tasks</h3>
        <p className="sub">Common for coordinator and assistant roles. Here is what they look like and how to do them.</p>
        <table className="tbl">
          <thead><tr><th>The task</th><th>What they are checking</th><th>How to do it</th></tr></thead>
          <tbody>
            <tr><td>Schedule three interviews from a messy email thread</td><td>Can you read carefully and communicate clearly</td><td>Make a simple table of who, when, where. Draft the confirmation emails. Note the one conflict and how you would resolve it.</td></tr>
            <tr><td>Draft a rejection email to a candidate</td><td>Tone and judgment</td><td>Short, warm, specific, no false hope. Thank them, say the decision, wish them well, leave the door open if true.</td></tr>
            <tr><td>Clean up a spreadsheet of applicants</td><td>Basic Excel and attention to detail</td><td>Fix the obvious errors, sort it sensibly, add a column for stage, and write two lines about what you changed and why.</td></tr>
            <tr><td>Write a short onboarding checklist</td><td>Whether you understand the order of things</td><td>Offer, background check, paperwork, systems, orientation, first week check-in. Order matters more than detail.</td></tr>
            <tr><td>A timed typing or data entry test</td><td>Speed and accuracy</td><td>Accuracy first. A slower clean result beats a fast messy one for HR work every time.</td></tr>
          </tbody>
        </table>
        <Note kind="rec" label="Recruiter's notes"><p>Take home tasks should take one to two hours. If they ask for a weekend of work for a coordinator role, that is a signal about the company. Do the task well, note the time it took, and keep going with other processes.</p></Note>
      </div>

      <div className="card">
        <h3 className="sec">When salary comes up in the interview</h3>
        <p className="body">On the screen you gave a range. In the interview a hiring manager may ask again, usually to make sure you are still in the band before they invest more time. Same answer, same calm. <strong>Do not negotiate in the interview.</strong> Negotiation happens when there is an offer. For now you are confirming fit.</p>
        <Tpl label="If the manager asks" text="I talked through my range with [recruiter], and it lines up with the band for the role. I am more focused right now on whether this is the right fit on both sides, and so far it feels like it is." />
      </div>

      <div className="card">
        <h3 className="sec">The day before and the morning of</h3>
        <Chk k="m_ivday" items={[
          "Reread the posting and your application. They will ask about something you wrote",
          "Reread your notes from the screen: who you met, what they said the role needs",
          "Say your three stories out loud once, landing each on the result",
          "Lay out clothes, charge the laptop, test the link, print the page of notes",
          "Look up each interviewer. One line each: role, how long there, one thing you share",
          "Morning of: eat, water, ten minutes of silence, no news, no inbox",
          "Say your three cues: breathe then answer, say I not we, end on the number",
        ]} />
      </div>

      <div className="card">
        <h3 className="sec">Interview questions I get every week</h3>
        {IV_FAQ.map((f) => (
          <Acc key={f[0]} q={f[0]}><div className="qa strong"><div className="qlab">Straight answer</div><p>{f[1]}</p></div></Acc>
        ))}
      </div>
    </>
  );
}

/* ───── STEP 16 · REFERENCES, more ───── */
export function RefsMore() {
  return (
    <>
      <div className="card">
        <Mark icon="people" label="The hard cases" />
        <h3 className="sec">If you cannot use your current manager</h3>
        <Squiggle />
        <p className="body">Most people cannot, because their current manager does not know they are looking. Recruiters know this. Here is who to use instead, in order of strength.</p>
        <ul style={ladder}>
          <Rung title="A former manager from a previous job">Strongest option. They managed you, they are not at risk, and they can speak to your work.</Rung>
          <Rung title="A former manager from your current company who has since left">Nearly as strong. They know your recent work and they are not in the building.</Rung>
          <Rung title="A senior coworker or a team lead">Fine, especially if they trained you or worked beside you daily. Brief them on what to emphasize.</Rung>
          <Rung title="A client, a vendor, or someone you served">Good for customer facing roles. They can speak to how you handle people, which is the HR skill.</Rung>
          <Rung title="A volunteer coordinator or a coach">Usable if the role involved responsibility. Not for all three slots.</Rung>
        </ul>
        <Tpl label="What to tell the recruiter" text="My current manager does not know I am looking yet, so I would ask that they not be contacted until there is an offer. I have three references who know my recent work well and can speak to it today." />
      </div>

      <div className="card">
        <h3 className="sec">Asking someone to be a reference</h3>
        <p className="sub">Before you ever list them. Short, clear, easy to say yes to.</p>
        <Tpl label="The ask" text={"Hi [Name], I am moving into HR and starting to interview for [role] roles. Would you be comfortable being a reference for me?\n\nIf a company reaches out they would mostly ask what I was like to work with, what I did well, and whether you would hire me again. I will always give you a heads up before anyone calls, and I will tell you what the role is about so it is easy.\n\nThank you. It means a lot."} />
        <Tpl label="If they say yes" text="Thank you. Can I confirm the best phone and email for you? And is there any time of day that works better for a call? I will make sure they know." />
      </div>

      <div className="card">
        <h3 className="sec">What a background check actually checks</h3>
        <p className="sub">For most HR coordinator and assistant roles. It varies by employer and by state, so read your consent form.</p>
        <table className="tbl">
          <thead><tr><th>Usually checked</th><th>What they confirm</th><th>What to do now</th></tr></thead>
          <tbody>
            <tr><td>Employment history</td><td>Dates and title at each job, sometimes whether you are eligible for rehire</td><td>Match your resume to your pay stubs. Exact months, exact titles.</td></tr>
            <tr><td>Education</td><td>Degree earned, school, year</td><td>Never list a degree you did not finish as finished. Coursework toward is honest and fine.</td></tr>
            <tr><td>Criminal record</td><td>Convictions within the window the law allows, often seven years</td><td>Answer honestly where asked. A disclosed old issue with a short explanation rarely ends an offer. A hidden one does.</td></tr>
            <tr><td>Identity and work authorization</td><td>That you are who you say and can work here</td><td>Have your documents ready for the I-9 on day one.</td></tr>
            <tr><td>Sometimes: credit</td><td>Only for roles handling money, and only where allowed</td><td>Rare for HR coordination. If it comes up, ask why.</td></tr>
            <tr><td>Sometimes: driving record</td><td>Only if the role involves driving</td><td>Not your problem for most HR roles.</td></tr>
            <tr><td>Almost never: social media, references</td><td>References are a separate step, not part of the check</td><td>Still clean up the public parts of your profiles. Recruiters are people and people look.</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 className="sec">Explaining the things people worry about</h3>
        <p className="sub">Three scripts. One sentence each, said plainly, then stop.</p>
        <Tpl label="A gap" text="I took [time] to [reason, briefly]. I am fully ready to go, and the skills did not go anywhere." />
        <Tpl label="A layoff" text="The company cut about a third of the team, including my department. I used the time to make this move on purpose." />
        <Tpl label="A termination" text="That role ended on their terms. I made a mistake with [general area], I owned it, and I learned [specific thing]. I would rather tell you that plainly than have you wonder." />
        <Note kind="rec" label="Recruiter's notes"><p>I have hired people with every one of those on their record. The ones who lost the offer were not the ones with the gap or the termination. They were the ones who hid it and got found out at the check. Honest and brief wins. Hidden and discovered loses.</p></Note>
      </div>

      <div className="card">
        <h3 className="sec">If a reference goes quiet</h3>
        <p className="body">It happens. People get busy, calls go to voicemail, emails get buried. If a recruiter tells you they cannot reach someone, do two things the same day: message the reference with the recruiter&apos;s name and the best time to expect a call, and offer the recruiter a fourth name right away. <strong>Keep a fourth reference in your pocket for exactly this.</strong> An offer should never wait on one person&apos;s voicemail.</p>
        <div className="field" style={{ maxWidth: 420 }}><label>My backup reference</label>
          <Inp k="m_ref4" ph="Name, how they know you, phone or email" label="My backup reference" /></div>
      </div>
    </>
  );
}

/* ───── STEP 17 · OFFER, more ───── */
export function OfferMore() {
  const { S } = useApp();
  const n = (k: string) => parseFloat(String(txt(S, k)).replace(/[^0-9.]/g, "")) || 0;
  const base = n("m_tc_base"), bonus = n("m_tc_bonus"), match = n("m_tc_match"), pto = n("m_tc_pto"), prem = n("m_tc_prem"), commute = n("m_tc_commute");
  const matchVal = base * (match / 100);
  const ptoVal = pto * (base / 260);
  const total = base + bonus + matchVal + ptoVal - prem * 12 - commute * 12;
  const money = (v: number) => "$" + Math.round(v).toLocaleString("en-US");
  return (
    <>
      <div className="card">
        <Mark icon="note" label="Line by line" />
        <h3 className="sec">Reading the offer letter</h3>
        <Squiggle />
        <p className="body">An offer letter is short and every line matters. Here is what each one means and what to check before you sign.</p>
        <table className="tbl">
          <thead><tr><th>The line</th><th>What it means</th><th>Check</th></tr></thead>
          <tbody>
            <tr><td>Base salary, or hourly rate</td><td>The number everything else is built on</td><td>Annual or hourly? Hourly times 2,080 is the annual equivalent.</td></tr>
            <tr><td>Exempt or non-exempt</td><td>Non-exempt means you are paid overtime. Exempt means you are not.</td><td>Coordinator roles are often non-exempt. If the role is exempt, ask what a typical week looks like in hours.</td></tr>
            <tr><td>Bonus</td><td>Target, not a guarantee, unless it says guaranteed</td><td>Ask what percent of people hit target last year.</td></tr>
            <tr><td>Start date</td><td>When they expect you</td><td>Make sure it leaves two full weeks of notice at your current job.</td></tr>
            <tr><td>Benefits eligibility</td><td>When health insurance and other benefits begin</td><td>Day one, or after 30, 60, or 90 days? A gap means you may need to bridge coverage.</td></tr>
            <tr><td>PTO</td><td>Days off, and how they accrue</td><td>Accrued from day one, or available after a waiting period? Can you use it in the first 90 days?</td></tr>
            <tr><td>Contingencies</td><td>What has to clear before this is real</td><td>Background check, references, sometimes a drug screen. Do not resign until these are done.</td></tr>
            <tr><td>At-will</td><td>Either side can end it at any time</td><td>Standard in most of the US. Not a red flag on its own.</td></tr>
            <tr><td>Expiration</td><td>How long you have to respond</td><td>Usually a few days. If you need more, ask. Most will give you until Monday.</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 className="sec">Total compensation, roughly</h3>
        <p className="sub">Base is not the whole picture. Fill these in and see what the offer is actually worth to you each year.</p>
        <div className="row2">
          <div className="field"><label>Base salary</label><Inp k="m_tc_base" ph="54000" label="Base salary" /></div>
          <div className="field"><label>Expected annual bonus, if any</label><Inp k="m_tc_bonus" ph="0" label="Expected annual bonus" /></div>
        </div>
        <div className="row2">
          <div className="field"><label>401k match, percent of salary</label><Inp k="m_tc_match" ph="4" label="401k match percent" /></div>
          <div className="field"><label>PTO days</label><Inp k="m_tc_pto" ph="15" label="PTO days" /></div>
        </div>
        <div className="row2">
          <div className="field"><label>Your monthly health premium</label><Inp k="m_tc_prem" ph="150" label="Monthly health premium" /></div>
          <div className="field"><label>Monthly commute or parking cost</label><Inp k="m_tc_commute" ph="80" label="Monthly commute cost" /></div>
        </div>
        <div style={{ background: "var(--navy)", color: "#fff", padding: 22, borderRadius: 16, marginTop: 6 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".16em", color: "var(--mint)", marginBottom: 10 }}>ROUGH YEARLY VALUE</div>
          <div style={{ fontFamily: "var(--dsp)", fontSize: 32, fontWeight: 700 }}>{base ? money(total) : "$0"}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)", marginTop: 8, lineHeight: 1.6 }}>
            Base {money(base)} + bonus {money(bonus)} + match {money(matchVal)} + PTO value {money(ptoVal)}, minus premiums {money(prem * 12)} and commute {money(commute * 12)}.
          </div>
        </div>
        <Note kind="decode" label="What this is for"><p>Comparing two offers, or deciding whether a lower base with a day one 401k match and cheap insurance beats a higher base with a 90 day benefits wait and a long drive. It usually does. This is a rough estimate, not tax advice.</p></Note>
      </div>

      <div className="card">
        <h3 className="sec">Negotiating by email</h3>
        <p className="sub">Most negotiation happens in writing now. Same scripts as above, in email form, so you can send them calmly instead of saying them nervously.</p>
        <Tpl label="Asking for more base" text={"Hi [Name],\n\nThank you for the offer. I am genuinely excited about the role and the team.\n\nBased on my research for [role] in [city], and what I will bring from day one, I was hoping we could get the base closer to $[X]. Is there flexibility there?\n\nIf it helps, I can turn this around quickly once we land on a number. Thank you for working through it with me.\n\n[Name]"} />
        <Tpl label="When base is fixed, asking for the other pieces" text={"Hi [Name],\n\nI understand the base is set, and I appreciate you being straight about it. Could we look at the other pieces? Any of these would make a real difference: a performance review at six months instead of twelve, one additional week of PTO, a signing bonus, or a professional development budget to cover the aPHR.\n\nI want to make this work. Thank you.\n\n[Name]"} />
        <Tpl label="Buying time when you have another process" text={"Hi [Name],\n\nThank you for the offer. I want to give it the consideration it deserves and I am also finishing one other conversation this week. Would it be possible to have until [day] to respond? I would rather answer you with certainty than quickly.\n\n[Name]"} />
      </div>

      <div className="card">
        <h3 className="sec">Accepting, declining, and resigning</h3>
        <Tpl label="Accepting" text={"Hi [Name],\n\nI am pleased to accept the offer for [Role] at a base of $[X], starting [date]. Thank you for the conversations along the way. I am looking forward to getting started.\n\nPlease let me know the next steps for paperwork and the background check.\n\n[Name]"} />
        <Tpl label="Declining gracefully" text={"Hi [Name],\n\nThank you for the offer and for the time your team spent with me. After careful thought I have decided to accept another role that is a closer fit for where I am headed. This was not an easy decision.\n\nI would like to stay in touch, and I hope our paths cross again.\n\n[Name]"} />
        <Tpl label="Resignation letter" text={"[Date]\n\nDear [Manager],\n\nPlease accept this as notice of my resignation from [Role] at [Company]. My last day will be [date, two weeks out].\n\nThank you for the opportunity to work here. I will do everything I can to make the transition smooth, including documenting my work and training whoever picks it up.\n\nSincerely,\n[Name]"} />
        <Note kind="rec" label="Recruiter's notes"><p>Tell your manager in person or on a call before the letter lands. Keep it to a minute: I have accepted another role, my last day is this date, I will make the handover clean. Do not list grievances, do not negotiate a counteroffer unless you would truly stay, and do not announce it to coworkers before your manager knows. How you leave follows you into HR, where everyone knows everyone.</p></Note>
      </div>

      <div className="card">
        <h3 className="sec">When to walk away</h3>
        <p className="body">Not every offer is a yes. Walk away when the base is below the bottom of your range and nothing else moves. When they pressured you to skip your notice period. When the duties on the offer do not match the interviews and nobody can explain why. When you asked about the last person in the seat and got a strange answer. <strong>A bad first HR job can cost you a year.</strong> A few more weeks of searching costs you a few more weeks.</p>
        <Band icon="bulb" color="#8EDBC2"><b>If you walk away, do it warmly and in writing.</b> The same recruiter may have a better role in three months, and they remember who was gracious.</Band>
      </div>
    </>
  );
}

/* ───── STEP 18 · FIRST 90 DAYS, more ───── */
export function NinetyMore() {
  return (
    <>
      <div className="card">
        <Mark icon="clock" label="Week one, scripted" />
        <h3 className="sec">The questions to ask your manager in week one</h3>
        <Squiggle />
        <p className="body">Ask these in your first one on one. Write the answers down. Then you know what the job actually is, which is not always what the posting said.</p>
        <Chk k="m_wk1q" items={[
          "What does doing well look like at 30, 60, and 90 days?",
          "What is the one thing you would want me to own first?",
          "How do you like to get updates: a weekly note, a quick check-in, or only when something is wrong?",
          "Who should I meet in the first two weeks, inside HR and outside it?",
          "What is the thing that goes wrong most often in this role, and how would you like me to handle it?",
          "What systems should I learn first, and who is the best person to show me?",
          "What did the last person in this seat do well that you want to keep?",
        ]} />
      </div>

      <div className="card">
        <h3 className="sec">Introducing yourself to the team</h3>
        <p className="body">You will meet a lot of people fast. Have one version of yourself ready so you are not inventing it in the hallway.</p>
        <Tpl label="The thirty second intro" text="I am [Name], the new [Role]. I am coming from [X years in field], where I [one line, the people part]. I am here to [the thing you own]. If there is anything on your plate I can take, I would rather be too busy than too idle in the first month." />
        <Note kind="win" label="Quick win"><p>That last sentence gets you the small tasks nobody wants in week one. Those tasks are how you learn where everything is, and how people decide you are useful. Say yes to them.</p></Note>
      </div>

      <div className="card">
        <h3 className="sec">The brag document</h3>
        <p className="sub">Start it on day one. Fifteen minutes every Friday. It is your review, your raise, and your next resume, all at once.</p>
        <Tpl label="Brag document template" text={"BRAG DOC · [Name] · started [date]\n\nWEEK OF [date]\n- Did: [thing, with a number if there is one]\n- Fixed or improved: [thing]\n- Learned: [system, process, person]\n- Nice words from someone: [paste it, with who and when]\n- Question for my manager: [thing]\n\n(Repeat every Friday. Before your review, read the whole thing and pull the ten best lines.)"} />
        <TA k="m_brag" ph="Week one...\n- Did:\n- Fixed:\n- Learned:\n- Nice words:" rows={6} label="Brag document" />
      </div>

      <div className="card">
        <h3 className="sec">Learning the ATS or HRIS: a two week plan</h3>
        <Chk k="m_sys" items={[
          "Day 1 to 2: watch someone use it for real tasks. Ask them to narrate what they are doing and why",
          "Day 3: get a sandbox or test record and click every menu. You cannot break a sandbox",
          "Day 4 to 5: do your real tasks in it with someone next to you. Make a one page cheat sheet as you go",
          "Week 2: do the tasks alone. Keep a list of every question. Ask them in one batch at the end of each day",
          "End of week 2: give your cheat sheet to the next new person. It is now the team's guide and you are the one who wrote it",
        ]} />
      </div>

      <div className="card">
        <h3 className="sec">Mistakes in month one, and the recovery</h3>
        <p className="sub">You will make one of these. Here is what to do in the next ten minutes.</p>
        <Acc q="You sent the wrong document, or the wrong email, to the wrong person">
          <p className="body" style={{ fontSize: 14.5 }}>Tell your manager immediately, before they hear it from anyone else. Say what went out, to whom, and what you have already done. If it contained personal information, that is a potential privacy issue and the company has a process. Let them run it. Then write down what you will change: a second look at the To line, a rule that attachments get opened before sending.</p>
        </Acc>
        <Acc q="You missed a deadline or an interview slot">
          <p className="body" style={{ fontSize: 14.5 }}>Fix it first, apologize second, explain third, and keep the explanation to one sentence. Then build the thing that prevents it: a calendar block the day before, a checklist, a confirmation email the morning of.</p>
        </Acc>
        <Acc q="You told someone something you should not have">
          <p className="body" style={{ fontSize: 14.5 }}>This is the serious one in HR. Tell your manager the same day, exactly what was said and to whom. Do not minimize it. The recovery is in how fast and how honestly you report it. Then adopt the rule for good: if you are not sure it is shareable, it is not.</p>
        </Acc>
        <Acc q="You feel in over your head and are hiding it">
          <p className="body" style={{ fontSize: 14.5 }}>Everyone does at week three. Say it out loud to your manager in a one on one: I am keeping up on A and B, I am behind on C, here is what I think I need. Managers trust the person who says that. They worry about the person who looks fine until something breaks.</p>
        </Acc>
      </div>

      <div className="card">
        <h3 className="sec">The 30, 60, 90 answer for your interviews</h3>
        <p className="body">Interviewers for coordinator roles love to ask what you would do in your first 90 days. You now know the answer, because you just read it. Say it in this shape.</p>
        <Tpl label="Interview version" text="First 30 days, I learn: the systems, the people, the lifecycle, and what good looks like at 90 days, which I would ask you directly. Days 31 to 60, I take ownership of one process end to end, even a small one, and I start tracking my own numbers. Days 61 to 90, I bring you one documented improvement with a number on it, and I ask what the next level looks like from here." />
      </div>
    </>
  );
}
