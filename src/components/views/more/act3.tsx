"use client";
/** Extra depth for Act 3. Paid content. */
import { useApp } from "../../AppProvider";
import { Band, Chk, Mark, Note, Rec, TA, Tpl } from "../../ui";
import { Squiggle } from "../../Doodle";

const ladder = { listStyle: "none", display: "flex", flexDirection: "column", gap: 11 } as const;
function Rung({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li style={{ background: "var(--fog)", padding: "16px 18px", borderRadius: 13 }}>
      <b style={{ fontFamily: "var(--dsp)" }}>{title}</b>
      <p className="body" style={{ fontSize: 14, margin: "5px 0 0" }}>{children}</p>
    </li>
  );
}

/* ───── STEP 11 · 90-DAY PLAN, more ───── */
export function PlanMore() {
  return (
    <>
      <div className="card">
        <Mark icon="clock" label="Two schedules" />
        <h3 className="sec">What a search week looks like, hour by hour</h3>
        <Squiggle />
        <p className="body">The plan gives you four tasks a week. Here is where those tasks go when you have a job, or kids, or both. Two versions. Pick the one that is true, not the one you wish was true.</p>
        <table className="tbl">
          <thead><tr><th>Day</th><th>About 10 hours a week</th><th>About 4 hours a week</th></tr></thead>
          <tbody>
            <tr><td>Monday</td><td>45 min: alerts, pick the week&apos;s five roles, read each posting properly</td><td>30 min: alerts, pick two roles</td></tr>
            <tr><td>Tuesday</td><td>2 hours: two tailored applications with notes to someone at each company</td><td>Off</td></tr>
            <tr><td>Wednesday</td><td>1 hour: three outreach messages, three LinkedIn comments, follow ups</td><td>1 hour: one tailored application, one outreach message</td></tr>
            <tr><td>Thursday</td><td>2 hours: three more applications, log everything</td><td>Off</td></tr>
            <tr><td>Friday</td><td>1 hour: phone screens if any, interview prep, agency check-ins</td><td>1 hour: one application, one comment, all follow ups</td></tr>
            <tr><td>Saturday</td><td>2 hours: one coffee chat, story practice out loud, work on the next journey step</td><td>1 hour: a coffee chat or the next journey step</td></tr>
            <tr><td>Sunday</td><td>30 min: weekly review, set next week&apos;s targets</td><td>15 min: weekly review</td></tr>
          </tbody>
        </table>
        <Rec><p>Four hours a week lands jobs. It just takes more weeks. The schedule that fails is the one where you do nothing for twelve days and then eight hours on a Sunday. Consistency beats intensity in a search, because replies and interviews come on other people&apos;s schedules and you need to be there when they do.</p></Rec>
      </div>

      <div className="card">
        <h3 className="sec">The weekly review</h3>
        <p className="sub">Ten minutes on Sunday. Write it here so you can look back.</p>
        <Tpl label="Four questions" text={"1. What did I actually do this week? (count: applications, messages, replies, screens, interviews)\n2. What did I learn about my target roles or the companies?\n3. What is one thing I will do differently next week?\n4. What is one thing I am proud of, however small?"} />
        <TA k="m_weekreview" ph="Week of... \n\nI did:\nI learned:\nNext week I will change:\nProud of:" rows={7} label="Weekly review notes" />
      </div>

      <div className="card">
        <h3 className="sec">When the plan is not working: the signal and the fix</h3>
        <p className="sub">Every stage of a search can stall. Each stall has a specific cause and a specific fix. Find your stall in the left column.</p>
        <table className="tbl">
          <thead><tr><th>What you see</th><th>What is usually wrong</th><th>The fix</th></tr></thead>
          <tbody>
            <tr><td>Messages sent, almost no replies</td><td>Targets too senior, or the message asks for too much, or no real reason for picking them</td><td>Message people one to two years ahead of you. Cut the message to four sentences. Name one true reason you chose them.</td></tr>
            <tr><td>Applications sent, no screens</td><td>The summary does not explain the pivot, keywords missing, applying late, or the roles are a stretch</td><td>Rewrite the summary. Run the ten minute keyword pass. Apply within 48 hours. Add two agencies.</td></tr>
            <tr><td>Screens, but no interviews</td><td>The 90 second answer rambles, the salary conversation went badly, or the pivot sounds like an escape</td><td>Record the 90 second answer and cut it. Practice saying the range. Rewrite the why HR answer so it is forward looking.</td></tr>
            <tr><td>Interviews, but no offers</td><td>Stories without results, no questions asked, or you did not say you want the job</td><td>Land every story on a number. Ask three questions. Say it out loud: I want this job.</td></tr>
            <tr><td>Offers, but you keep saying no</td><td>Targets are wrong, or you are not sure about the lane</td><td>Go back to Step 5 and be honest. Then narrow the target list to roles you would actually accept.</td></tr>
            <tr><td>Nothing at all for three weeks</td><td>You slowed down quietly</td><td>Start the 30 day sprint. One thing a day rebuilds momentum faster than any plan.</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 className="sec">Week thirteen and beyond</h3>
        <p className="body">If you reach the end of the twelve weeks without an offer, you are not starting over. You are in the middle. Your materials are built, your network is warmer than it was, and your numbers tell you where to push. Run weeks five through twelve again. Add one new agency. Widen the target list by five companies. Keep every open process warm.</p>
        <Band icon="heart" color="#8EDBC2"><b>Most career changers land somewhere between week six and week twenty.</b> The ones who do not are almost always the ones who stopped around week eight. Do not stop at week eight.</Band>
      </div>
    </>
  );
}

/* ───── STEP 12 · NETWORKING, more ───── */
export function NetworkMore() {
  return (
    <>
      <div className="card">
        <Mark icon="people" label="Eight more situations" />
        <h3 className="sec">A message for every moment</h3>
        <Squiggle />
        <p className="body">The three templates above cover the basics. These cover the moments people get stuck on. Same rules: short, one real reason, one small ask.</p>
        <Tpl label="Someone from your school" text={"Hi [Name], fellow [School] grad here. I noticed you are in HR at [Company] and I am in the middle of a move into the field from [your background]. Would you have fifteen minutes to tell me how you got started? I would really appreciate it, and I will keep it to fifteen."} />
        <Tpl label="A recruiter at a company you just applied to" text={"Hi [Name], I applied for the [Role] opening this morning and wanted to put a face to the application. [One line: your biggest relevant number.] I am moving into HR on purpose, and this role is exactly the kind of coordination work I have been doing without the title. Happy to share anything that would help."} />
        <Tpl label="The hiring manager, after you applied" text={"Hi [Name], I applied for the [Role] on your team and wanted to reach out directly. In my current role I [one specific, relevant thing with a number]. I know your team is [one true thing about the team or company]. If it would be useful, I would welcome a quick conversation. Either way, thank you for your time."} />
        <Tpl label="Someone who did not reply the first time" text={"Hi [Name], floating this back up once in case it got buried, no worries if the timing is bad. I am still working toward [role] and would love twenty minutes to hear how you got into HR. If not, I appreciate you anyway."} />
        <Tpl label="After an event or a webinar" text={"Hi [Name], I was at [event] yesterday and your point about [specific thing] stuck with me. I am moving into HR from [field] and I am trying to learn from people doing the work. Would you be open to a short conversation sometime in the next few weeks?"} />
        <Tpl label="Asking for an introduction" text={"Hi [Name], you mentioned [Person] at [Company] when we talked. Would you be comfortable introducing us? I would like to ask them about [specific thing]. If it is easier, I can send you a short blurb to forward. Thank you either way."} />
        <Tpl label="The blurb they can forward" text={"[Your name] is moving into HR after [X] years in [field], where they [one number]. They are targeting [role] roles and would love fifteen minutes to hear how you got into the field. They are easy to talk to and will not waste your time. [Your email and LinkedIn]."} />
        <Tpl label="After someone refers you" text={"[Name], thank you for referring me for the [Role]. I will keep you posted on how it goes, and I will make sure I represent you well. If there is ever anything I can do for you, say the word."} />
      </div>

      <div className="card">
        <h3 className="sec">The coffee chat, minute by minute</h3>
        <p className="sub">Twenty minutes. You run it, politely, so they do not have to.</p>
        <table className="tbl">
          <thead><tr><th>Minutes</th><th>What happens</th><th>Your job</th></tr></thead>
          <tbody>
            <tr><td>0 to 2</td><td>Hello, thank you, a sentence about why you reached out</td><td>Be warm, be brief, and say what you are moving toward in one line</td></tr>
            <tr><td>2 to 5</td><td>Your background, the short version</td><td>Ninety seconds. Then stop and hand it to them with a question</td></tr>
            <tr><td>5 to 15</td><td>Their story and their advice</td><td>Ask the five coffee chat questions. Listen. Write down two specific things</td></tr>
            <tr><td>15 to 18</td><td>The ask</td><td>Is there anyone else you would suggest I talk to? That is the whole ask</td></tr>
            <tr><td>18 to 20</td><td>Close</td><td>Thank them, say the one thing you will do because of this call, offer to update them</td></tr>
          </tbody>
        </table>
        <Note kind="rec" label="Recruiter's notes"><p>End on time. If they want to keep going, they will say so. Ending early and on time is the most respectful thing you can do with a stranger&apos;s afternoon, and it is why they will take your second call.</p></Note>
      </div>

      <div className="card">
        <h3 className="sec">The follow up cadence</h3>
        <p className="sub">How often to touch base without becoming the person they avoid.</p>
        <ul style={ladder}>
          <Rung title="Same day">Thank you message. Mention the one specific thing they said that helped. This is not optional.</Rung>
          <Rung title="One week">If they offered an introduction, a gentle nudge. If they did not reply to your first outreach at all, one follow up. One.</Rung>
          <Rung title="Three to four weeks">An update, with substance. I registered for the aPHR. I had my first screen. I took your advice about X and here is what happened. Updates with substance are welcome. Just checking in is not.</Rung>
          <Rung title="Every six to eight weeks after that">A short update until you land. Then the message that matters most: I got the job, and your advice about X was part of it. Thank you.</Rung>
        </ul>
      </div>

      <div className="card">
        <h3 className="sec">Keep notes on people</h3>
        <p className="body">After every conversation, before you do anything else, write four things: what they do, what they told you, what you said you would do, and who they suggested. The tracker above holds the stage. This holds the substance. In three months you will have forgotten every detail and this will be the difference between a warm network and a list of names.</p>
        <TA k="m_netnotes" ph="Maria Lopez, Cardinal Health. Told me healthcare wants a certification first. I said I would register for the aPHR. Suggested I talk to Chris Odom at Nationwide." rows={6} label="Notes on people" />
      </div>

      <div className="card">
        <h3 className="sec">If networking makes you cringe</h3>
        <p className="body">It made me cringe too, which is why I did it inside a building I already worked in. If the word is the problem, stop using it. You are not networking. You are asking people about their jobs. Nobody has ever been offended by a polite, specific question about how they got where they are. <strong>Most people love talking about it,</strong> and most people were helped the same way once and remember it.</p>
        <Band icon="bulb" color="#8EDBC2"><b>Start with the people you already know.</b> Then the people they know. You will be three conversations in before you ever message a stranger, and by then it will not feel strange.</Band>
      </div>
    </>
  );
}

/* ───── STEP 13 · APPLICATION STRATEGY, more ───── */
export function ApplyMore() {
  const { go } = useApp();
  return (
    <>
      <div className="card">
        <Mark icon="scan" label="Before you spend the evening" />
        <h3 className="sec">Does this posting deserve an application?</h3>
        <Squiggle />
        <p className="body">Five questions, two minutes. If you get at least three yeses, apply properly. If you get one, skip it and save the energy for one you fit.</p>
        <Chk k="m_apfilter" items={[
          "The duties describe work I have actually done, even if my title was different",
          "I clear the one true must have: the system, the credential, the schedule, the location",
          "It was posted in the last week, or it is on the company site with a recent date",
          "The salary range, if shown, overlaps my researched range",
          "I can name one real thing about this company in a sentence",
        ]} />
      </div>

      <div className="card">
        <h3 className="sec">Building your target company list</h3>
        <p className="sub">Fifteen companies you would be glad to work for, found before they post anything.</p>
        <p className="body">Five ways to find them, in the order I would use them.</p>
        <ul style={ladder}>
          <Rung title="1 · Where your contacts work">Every person in your networking tracker works somewhere. Those companies have HR teams and your contact is a warm introduction.</Rung>
          <Rung title="2 · Who is hiring a lot in your lane">Search your target title with no company name and note which companies show up three times in a month. Volume means openings keep coming.</Rung>
          <Rung title="3 · The biggest employers in your metro">Hospitals, universities, headquarters, large retailers, logistics hubs. Big employers have structured HR teams and real coordinator seats.</Rung>
          <Rung title="4 · Companies you already use and like">Your bank, your gym, the brand you buy. Caring about the product is a real reason, and it shows in the letter.</Rung>
          <Rung title="5 · Agencies that staff the companies above">Many large employers fill coordinator roles through one or two agencies. Find out which, and register there.</Rung>
        </ul>
        <TA k="m_targets" ph="1. Company · why · one HR person there\n2.\n3." rows={8} label="My target companies" />
      </div>

      <div className="card">
        <h3 className="sec">Working with an agency recruiter</h3>
        <p className="body">Agency recruiters are paid by the company when you get hired, which means they want you to land as much as you do. They are also busy and they remember candidates who make their job easy. Here is how to be that candidate.</p>
        <div className="grid2">
          <div style={{ background: "#EDF9F3", padding: 20, borderRadius: 14 }}>
            <div className="pill mint">Do</div>
            <ul style={{ margin: "12px 0 0 18px", fontSize: 14, lineHeight: 1.7, color: "var(--navy)" }}>
              <li>Tell them your real salary range and your real start date</li>
              <li>Reply the same day. Agency roles move in hours</li>
              <li>Tell them about every other process you are in. They can protect you from double submissions</li>
              <li>Send a clean resume and let them format it their way</li>
              <li>Check in every three weeks with a one line update</li>
            </ul>
          </div>
          <div style={{ background: "var(--coral-bg)", padding: 20, borderRadius: 14 }}>
            <div className="pill coral">Do not</div>
            <ul style={{ margin: "12px 0 0 18px", fontSize: 14, lineHeight: 1.7, color: "var(--navy)" }}>
              <li>Apply directly to a company they already submitted you to</li>
              <li>Go quiet after an interview they arranged</li>
              <li>Inflate your experience. They will find out before the client does</li>
              <li>Take it personally when they do not have anything this week</li>
              <li>Expect them to rewrite your resume or coach you. That is this platform&apos;s job</li>
            </ul>
          </div>
        </div>
        <Tpl label="The three week check-in" text="Hi [Name], quick update. Still targeting [role] in the [range] range, available with two weeks notice. Since we last spoke I [registered for the aPHR / had two screens / finished a course]. Anything on your desk that fits?" />
      </div>

      <div className="card">
        <h3 className="sec">Your funnel numbers</h3>
        <p className="sub">Rough, but close enough to tell you where to push.</p>
        <table className="tbl">
          <thead><tr><th>Stage</th><th>A healthy search, cold applications</th><th>With a referral or an agency</th></tr></thead>
          <tbody>
            <tr><td>Applications to screens</td><td>About 1 in 10</td><td>About 1 in 3</td></tr>
            <tr><td>Screens to interviews</td><td>About 1 in 3</td><td>About 1 in 2</td></tr>
            <tr><td>Interviews to offers</td><td>About 1 in 3 or 4</td><td>About 1 in 3</td></tr>
            <tr><td>So, for one offer</td><td>Around 100 applications</td><td>Around 20 applications</td></tr>
          </tbody>
        </table>
        <Note kind="decode" label="What this means"><p>The right column is the whole argument for networking and agencies. A referral does not just get you read. It changes every ratio after it. Spend one hour on a referral before you spend five hours on cold applications.</p></Note>
      </div>

      <div className="card">
        <h3 className="sec">Easy Apply, direct, or both</h3>
        <p className="body">Easy Apply on LinkedIn sends your profile and resume with one click, which is exactly why a posting gets 300 of them. Applying on the company site takes ten minutes longer and puts you in their system with a real date stamp, which is where the recruiter actually works. <strong>When both exist, apply on the company site, then send the recruiter a note on LinkedIn.</strong> When only Easy Apply exists, use it, but make sure your LinkedIn profile is finished first, because that is what they see.</p>
      </div>

      <div className="card">
        <h3 className="sec">The 48 hours after you apply</h3>
        <Chk k="m_after48" items={[
          "Log it in the tracker above with the date",
          "Find the recruiter or a team member on LinkedIn and send the short note",
          "Save the posting text somewhere. Postings get taken down and you will want it before the interview",
          "Set a reminder for one week to follow up once if you have heard nothing",
          "Move on to the next one. Do not refresh your inbox",
        ]} />
        <div style={{ marginTop: 18 }}><button className="btn btn-g btn-sm" onClick={() => go("network")}>Back to the networking templates</button></div>
      </div>
    </>
  );
}
