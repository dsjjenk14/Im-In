"use client";
/** Extra depth for Act 1. Open in the beta preview, so this file imports no paid content. */
import { useApp } from "../../AppProvider";
import { Acc, Band, Chk, Mark, Note, Rec, TA, Tpl } from "../../ui";
import { Squiggle } from "../../Doodle";
import { CERTS, DAY_IN_LIFE } from "@/lib/content/extra-act1";

const ladder = { listStyle: "none", display: "flex", flexDirection: "column", gap: 11 } as const;
function Rung({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li style={{ background: "var(--fog)", padding: "16px 18px", borderRadius: 13 }}>
      <b style={{ fontFamily: "var(--dsp)" }}>{title}</b>
      <p className="body" style={{ fontSize: 14, margin: "5px 0 0" }}>{children}</p>
    </li>
  );
}

/* ───── STEP 1 · WELCOME, more ───── */
const FAQ: [string, string][] = [
  ["Do I need an HR degree?", "No. Most people in HR do not have one, and mine is not in HR. What postings for coordinator and assistant roles actually ask for is organization, communication, systems, and discretion. A degree in anything helps for some corporate roles. No degree at all is still workable, especially through agencies, where I started."],
  ["I am over 45. Is that a problem?", "It is an advantage you have to frame. You have handled more difficult people, more pressure, and more change than someone five years out of school. Lead with scale and judgment. Keep the resume to the last 10 to 15 years, drop graduation dates, and get the LinkedIn photo current. Then let the stories do the work."],
  ["I have a gap. Caregiving, health, a layoff, school.", "Name it in one plain sentence and move on. I took eighteen months to care for a parent and I am fully ready to go. Gaps become problems only when people get awkward about them. Recruiters see them every day."],
  ["Can I do this while working full time?", "Yes, and most people do. The dated plan runs on about four to ten hours a week. The sprint is twenty to forty minutes a day. The key is doing a little most days instead of a lot on one weekend and then nothing."],
  ["I have never worked in an office.", "Neither had I when I started answering calls. Office norms are learnable in a month. What is not learnable in a month is staying calm with an angry person, which you already have. Say that plainly, and pick a first role with a real HR team above you so you can learn the office part from people who will answer questions."],
  ["How long does this take?", "Honest answer: two to six months of real effort for most career changers in this market. Faster through an agency or a referral. Slower if you only use job boards. The plan in this platform is built for twelve weeks and then repeats."],
  ["What if I get in and hate it?", "Then you will have HR experience, a network, and a better idea of what you want, which is more than you have today. Coordinator roles touch recruiting and generalist work, so most people find out within a year which side they prefer. Plenty switch sides. Some leave HR for operations or project roles and take the people skills with them. Nothing here is wasted."],
  ["Do I need to know employment law?", "Not to get a coordinator or assistant role. You need to know that it exists and that you will escalate rather than guess. The aPHR covers the basics in a few weeks of study. The deep stuff comes with experience and with the people above you."],
];

export function WelcomeMore() {
  return (
    <>
      <div className="card">
        <Mark icon="clock" label="Fit it into a real life" />
        <h3 className="sec">How to use this when your week is already full</h3>
        <Squiggle />
        <p className="body">Nobody doing this has a free month. You have a job, or kids, or both, or you are looking while you still work shifts. So here is what this platform looks like at three different speeds. Pick one and do not feel bad about it.</p>
        <table className="tbl">
          <thead><tr><th>You have</th><th>What to do</th><th>What to expect</th></tr></thead>
          <tbody>
            <tr><td>About 10 hours a week</td><td>One step every two days. Start the 30 day sprint alongside it. Apply to five roles a week once your resume is built.</td><td>Materials done in two weeks. Real conversations by week three. The full timeline in this platform.</td></tr>
            <tr><td>About 4 hours a week</td><td>Two steps a week, in order. Run the sprint at one day every two days. Two tailored applications a week.</td><td>Materials in a month. Slower but steadier, and the search is still running by week six.</td></tr>
            <tr><td>About 1 hour a week</td><td>One step a week. Skip the sprint for now. Do the one action in each step and nothing else.</td><td>Honest: this is a slow build. It still works, it just takes a season. Protect that hour like an appointment.</td></tr>
          </tbody>
        </table>
        <Rec><p>Whatever speed you pick, do the writing parts. The reflections, the bullets, the stories. Reading alone changes nothing. The people who land are the ones who leave this platform with a folder of things they wrote.</p></Rec>
      </div>

      <div className="card">
        <h3 className="sec">The questions I get asked most</h3>
        <p className="sub">Straight answers. Tap any of them.</p>
        {FAQ.map((f) => (
          <Acc key={f[0]} q={f[0]}>
            <div className="qa strong"><div className="qlab">Straight answer</div><p>{f[1]}</p></div>
          </Acc>
        ))}
      </div>

      <div className="card">
        <h3 className="sec">What a good first week looks like</h3>
        <p className="sub">Do these in your first seven days on the platform and you are ahead of most people.</p>
        <Chk k="m_w1" items={[
          "Read Steps 1 through 3 and write the two reflections, not just think about them",
          "Take the career assessment and tell one person which lane you picked",
          "Set five job alerts using the titles from the Decoder",
          "Write down ten numbers from your current or most recent job",
          "Message one person who already knows your work",
          "Pick a day to start the 30 day sprint",
        ]} />
      </div>
    </>
  );
}

/* ───── STEP 2 · HOW I GOT IN, more ───── */
export function StoryMore() {
  return (
    <>
      <div className="card">
        <Mark icon="scan" label="The honest math" />
        <h3 className="sec">How jobs actually get filled</h3>
        <Squiggle />
        <p className="body">People imagine hiring as a fair contest: a posting goes up, everyone applies, the best resume wins. Here is what it looks like from the inside, in rough numbers that vary by company but not by much.</p>
        <table className="tbl">
          <thead><tr><th>How the seat gets filled</th><th>How often, roughly</th><th>What it means for you</th></tr></thead>
          <tbody>
            <tr><td>Someone inside already knew the person</td><td>A large share, often the biggest</td><td>Referrals and warm introductions are not a bonus strategy. They are the main road.</td></tr>
            <tr><td>A recruiter found them, not the other way around</td><td>Common, especially for hard to fill roles</td><td>Your LinkedIn headline and keywords matter as much as your applications.</td></tr>
            <tr><td>A staffing agency placed them</td><td>Common for coordinator, assistant, and admin roles</td><td>Two agencies who know your name is worth more than fifty applications.</td></tr>
            <tr><td>They applied cold through a job board</td><td>It happens, and it happened to me twice</td><td>Keep applying. Just do it in the first 48 hours, tailored, with a note to a human.</td></tr>
            <tr><td>Promoted or moved from inside</td><td>Often, before the posting is even public</td><td>Once you are in anywhere, the next role is easier. Get in.</td></tr>
          </tbody>
        </table>
        <Note kind="decode" label="What this means in practice"><p>A posted role can get a few hundred applicants. The ones with a name attached, a referral, an agency, a recruiter who found them, get read every time. The rest get ten seconds each, if that. You want to be in the first group as often as possible, and the rest of this platform is how.</p></Note>
      </div>

      <div className="card">
        <h3 className="sec">What to do with your five names this week</h3>
        <p className="sub">You wrote them down above. Here is what to send each kind of person. Pick the one that fits and send it today.</p>
        <Tpl label="A former manager" text={"Hi [Name], hope you are well. I wanted to let you know I am making a move into HR and recruiting, which, looking back, is the part of the job at [Company] I was always best at.\n\nTwo things, if you are open to them. Would you be comfortable being a reference for me? And do you know anyone in HR I could talk to for twenty minutes about how they got in?\n\nEither way, thank you for everything back then. It mattered."} />
        <Tpl label="A former coworker" text={"Hey [Name], it has been a while. I am working on a move into HR and recruiting, and I am talking to people about how they got in.\n\nYou always knew everybody. Is there anyone at [their company] or anywhere else in HR you would introduce me to? Even a name I could reach out to myself would help. And I would love to catch up regardless."} />
        <Tpl label="A friend who runs a business" text={"Hi [Name], quick one. I am moving into HR and recruiting. You hire people, so I have a question: when you need someone, who do you call or what do you do first? I am trying to understand how hiring actually works from the owner side.\n\nTwenty minutes whenever is easy. Coffee is on me."} />
        <Tpl label="Someone from church, a club, or your community" text={"Hi [Name], I am making a career change into HR and recruiting and I am trying to meet people who work in that world. I know you know a lot of people. If anyone comes to mind who works in HR, would you be willing to connect us? I would be grateful."} />
        <Tpl label="A former customer or client who liked you" text={"Hi [Name], I hope things are going well at [Company]. I am moving into HR and recruiting, and I remembered you mentioning your HR team. Would you be open to introducing me to someone there for a short conversation about how they got into the field? No pressure at all, and thank you for considering it."} />
        <Rec><p>Notice that none of these ask for a job. They ask for a conversation or an introduction, which is something the person can actually give you in thirty seconds. Ask for what people can give. The jobs follow.</p></Rec>
      </div>

      <div className="card">
        <h3 className="sec">Two kinds of luck</h3>
        <p className="body">People hear my story and say I got lucky, knowing someone who owned a staffing firm. I did. But there are two kinds of luck. The first kind is being in the right place. The second kind is being the person they think of when they are in the right place. <strong>You cannot control the first. You can absolutely build the second,</strong> and it is built out of being reliable, being known by more people, and telling them clearly what you are working toward.</p>
        <Band icon="people" color="#8EDBC2"><b>Every person on your list of five is a chance at the second kind of luck.</b> They cannot think of you for something if they do not know you are looking.</Band>
      </div>
    </>
  );
}

/* ───── STEP 3 · IS HR RIGHT FOR YOU, more ───── */
export function IsRightMore() {
  return (
    <>
      <div className="card">
        <Mark icon="clock" label="Not the highlights, the Tuesday" />
        <h3 className="sec">A day in the life of each door</h3>
        <Squiggle />
        <p className="body">I told you to ask people what their Tuesday looks like. Until you can, here is mine, for each of the four entry roles. These are typical days, not glamorous ones. If one of them sounds like a day you would be good at, that is useful information.</p>
        {DAY_IN_LIFE.map((d) => (
          <Acc key={d.role} q={<><span className="pill navy" style={{ marginRight: 9 }}>A day as</span>{d.role}</>}>
            <table className="tbl"><tbody>
              {d.day.map((row) => <tr key={row[0]}><td style={{ whiteSpace: "nowrap", width: 70 }}>{row[0]}</td><td>{row[1]}</td></tr>)}
            </tbody></table>
          </Acc>
        ))}
        <Note kind="win" label="Quick win"><p>Read the four days and notice which one made you tired just reading it, and which one made you want to start. That reaction is worth more than any quiz.</p></Note>
      </div>

      <div className="card">
        <h3 className="sec">Certifications, decoded</h3>
        <p className="sub">What each one is for, who it is for, and when it is worth your money. Check the official sites for current fees and rules, they change.</p>
        <table className="tbl">
          <thead><tr><th>Certification</th><th>For</th><th>What it takes</th><th>My take</th></tr></thead>
          <tbody>
            {CERTS.map((c) => <tr key={c[0]}><td>{c[0]}</td><td>{c[1]}</td><td>{c[2]}</td><td>{c[3]}</td></tr>)}
          </tbody></table>
        <Rec><p>The aPHR is the only one I would start before you have an HR job, and only once your resume and LinkedIn are done, because those get you interviews and the certification mostly gets you confidence. Put it on your resume as in progress the day you register. That is honest and it signals intent.</p></Rec>
      </div>

      <div className="card">
        <h3 className="sec">Questions to ask someone on each path</h3>
        <p className="sub">For your coffee chats. Pick the list for the lane you are leaning toward.</p>
        <div className="grid2">
          <div style={{ background: "var(--fog)", padding: 20, borderRadius: 14 }}>
            <div className="pill">Ask a recruiter</div>
            <ul style={{ ...ladder, marginTop: 12, gap: 8, fontSize: 14, color: "var(--navy)", paddingLeft: 18, listStyle: "disc" }}>
              <li>What number are you measured on, and how often?</li>
              <li>How much of your week is talking to people versus the ATS?</li>
              <li>What does a bad week look like?</li>
              <li>Did you start in an agency or corporate, and would you do it the same way?</li>
              <li>What do new coordinators get wrong in their first month?</li>
            </ul>
          </div>
          <div style={{ background: "var(--fog)", padding: 20, borderRadius: 14 }}>
            <div className="pill">Ask a generalist or coordinator</div>
            <ul style={{ ...ladder, marginTop: 12, gap: 8, fontSize: 14, color: "var(--navy)", paddingLeft: 18, listStyle: "disc" }}>
              <li>What is the hardest conversation you had this month?</li>
              <li>How much of the job is systems and paperwork versus people?</li>
              <li>What did you wish you knew before your first employee relations issue?</li>
              <li>Which certification actually changed something for you?</li>
              <li>What does the path from coordinator to generalist look like at your company?</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="sec">If you pick the wrong lane</h3>
        <p className="body">You will not know for sure until you are in it. Here is how people find out, and what they do about it.</p>
        <ul style={ladder}>
          <Rung title="You went recruiting and the scoreboard is wearing you down">That is a normal reaction to agency pace, not a sign you are in the wrong field. Try corporate recruiting first, which is calmer. If it is the selling you dislike, move toward coordinator and generalist work. Your sourcing and screening skills come with you.</Rung>
          <Rung title="You went generalist and you miss the pace">Ask to help with hiring. Most HR teams will hand recruiting work to anyone who wants it. Six months of that on your resume and you can move to a recruiter role without starting over.</Rung>
          <Rung title="You like the systems more than the people">That is a real lane, not a failure. HRIS, payroll, and people analytics pay well and are short on people who are careful. Say it out loud to your manager and watch what opens up.</Rung>
        </ul>
        <Note kind="rec" label="Recruiter's notes"><p>Switching lanes inside HR is common and nobody holds it against you. Switching companies every six months to do it is what hurts you. Change the work before you change the employer.</p></Note>
      </div>
    </>
  );
}

/* ───── STEP 4 · DECODER, more ───── */
export function DecoderMore() {
  return (
    <>
      <div className="card">
        <Mark icon="scan" label="Three minutes, four lines" />
        <h3 className="sec">How to read a job posting</h3>
        <Squiggle />
        <p className="body">Most people read a posting top to bottom and decide based on how it makes them feel. Read it like I do instead. Four things, three minutes, and you know whether it is worth your evening.</p>
        <ul style={ladder}>
          <Rung title="1 · Required versus preferred">Required is the real bar, and even that is softer than it reads. Preferred is a wish list. If you clear most of the required list in substance, not in exact words, apply.</Rung>
          <Rung title="2 · The years line">Three to five years means they would love three to five years. It also means someone with seven years of relevant adjacent work and a clear letter gets a look. Years are a filter for people who have nothing. You have something.</Rung>
          <Rung title="3 · The duties, not the title">Read what you would actually do on a Tuesday. A posting called HR Generalist that is all scheduling and ATS updates is a coordinator job. A posting called Coordinator with employee relations in it is a bigger job than the title says.</Rung>
          <Rung title="4 · The one must have">Every posting has one thing that is actually non negotiable, and it is usually a system, a credential, or a schedule. Find it. If you have it, say so in the first line of the letter. If you do not, that is the one place honesty plus a learning plan has to do the work.</Rung>
        </ul>
      </div>

      <div className="card">
        <h3 className="sec">Green flags and red flags in a posting</h3>
        <p className="sub">What the wording tells you before you ever talk to anyone.</p>
        <table className="tbl">
          <thead><tr><th>You see</th><th>It usually means</th><th>Do this</th></tr></thead>
          <tbody>
            <tr><td>A named manager or team you would report to</td><td>Someone cared enough to write it. Real role, real team.</td><td>Find that person on LinkedIn. Mention the team in your letter.</td></tr>
            <tr><td>A salary range posted</td><td>They are complying with transparency rules and they know their budget.</td><td>Anchor to it on the screen. Easy.</td></tr>
            <tr><td>Wear many hats, fast paced, self starter, all in one posting</td><td>Understaffed, and the role is bigger than the title.</td><td>Ask what happened to the last person and how many open roles the team has.</td></tr>
            <tr><td>Posted and reposted every few weeks for months</td><td>High turnover, or an unrealistic bar, or a hiring manager who cannot decide.</td><td>Still apply if it fits, but ask directly why it is still open.</td></tr>
            <tr><td>Like a family, work hard play hard</td><td>Sometimes warm. Sometimes long hours with no overtime and no boundaries.</td><td>Ask about typical hours and how the team handles busy seasons.</td></tr>
            <tr><td>Must be able to lift 25 pounds, in an HR assistant posting</td><td>Boilerplate from another job description. Sloppy, not sinister.</td><td>Ignore it. Watch for other signs of a careless HR team though.</td></tr>
            <tr><td>Entry level, then five years of experience required</td><td>Someone pasted two postings together.</td><td>Apply. Those two lines mean the bar is not real.</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 className="sec">Search terms by lane</h3>
        <p className="sub">Copy the list for your lane into your job alerts. Five to eight terms, each as its own alert.</p>
        <Tpl label="Recruiting lane" text={"Recruiting Coordinator\nTalent Acquisition Coordinator\nRecruiting Assistant\nTalent Coordinator\nSourcer\nAgency Recruiter\nStaffing Coordinator\nRecruiter (entry level)"} />
        <Tpl label="Generalist lane" text={"HR Coordinator\nHR Assistant\nHuman Resources Administrator\nPeople Operations Coordinator\nHR Generalist (entry level)\nBenefits Coordinator\nOnboarding Coordinator\nHR Associate"} />
        <Tpl label="Operations and systems lane" text={"HR Operations Coordinator\nHRIS Coordinator\nPayroll and HR Assistant\nPeople Operations Associate\nHR Data Coordinator\nHR Service Center Representative\nWorkday Coordinator"} />
        <Note kind="win" label="Quick win"><p>Set one extra alert with no title at all, just the words human resources plus your city or the word remote. It catches the strangely named roles every other search misses.</p></Note>
      </div>

      <div className="card">
        <h3 className="sec">Remote, hybrid, onsite: how to search each one</h3>
        <p className="body">Remote HR coordinator roles exist and they are the most competitive postings in the field, because everyone in the country is applying. Hybrid roles are where most of the opportunity is right now. Onsite roles, especially in healthcare, manufacturing, and retail headquarters, get the fewest applicants and are often the fastest door in.</p>
        <p className="body">If you need remote, search it, but also search hybrid within an hour of you and be honest about how many days you could come in. <strong>Two days a week onsite is the difference between a hundred applicants and twenty.</strong></p>
        <TA k="m_remote" ph="My honest answer on remote, hybrid, and onsite. What I need, and what I could live with." rows={3} label="Remote, hybrid, onsite notes" />
      </div>
    </>
  );
}

/* ───── STEP 5 · ASSESSMENT RESULT, more ───── */
export function AssessMore() {
  const { S } = useApp();
  const next: Record<string, [string, string][]> = {
    ta: [["First role", "Recruiting Coordinator or Agency Recruiter"], ["12 to 24 months later", "Recruiter or Sourcer, owning your own searches"], ["3 to 5 years", "Senior Recruiter, then TA Lead"], ["The fork", "Some recruiters move into HR Business Partner work later. The door stays open."]],
    gen: [["First role", "HR Coordinator or HR Assistant"], ["12 to 24 months later", "HR Generalist, owning onboarding, benefits, and first line employee relations"], ["3 to 5 years", "HR Business Partner or HR Manager"], ["The fork", "Generalists who love hiring often move to recruiting leadership. Also open."]],
    both: [["First role", "HR Coordinator, specifically, because it touches both sides"], ["12 to 24 months later", "Pick a side based on what you were best at, Recruiter or Generalist"], ["3 to 5 years", "Senior Recruiter or HR Business Partner"], ["The fork", "You get to make this choice with real information instead of a guess. That is the whole point of starting broad."]],
    ops: [["First role", "HR Assistant, HR Operations Coordinator, or HRIS Coordinator"], ["12 to 24 months later", "HRIS Analyst or Payroll and Benefits Specialist"], ["3 to 5 years", "People Systems Manager or HR Operations Manager"], ["The fork", "Operations people are rare and companies hold onto them. The pay climbs faster than people expect."]],
  };
  return (
    <>
      <div className="card">
        <h3 className="sec">What your result does not mean</h3>
        <p className="body">Six questions cannot see your whole life, and the result is a lean, not a verdict. It does not mean you would fail at the other paths. It does not mean you have to stay in this lane for ten years. It means that today, with what you know, this is the door most likely to open fast and feel right once you are through it.</p>
        <p className="body">If the result surprised you, sit with it for a day. Then read the day in the life for that role in Step 3. If reading it made you want to start, trust the result. If it made you tired, retake the quiz honestly instead of aspirationally, because that is usually what happened the first time.</p>
      </div>

      <div className="card">
        <h3 className="sec">The road after the first role</h3>
        <p className="sub">For your lane. So you know this is a path and not a dead end.</p>
        <table className="tbl"><tbody>
          {(next[S.quiz ?? "both"] ?? next.both).map((r) => <tr key={r[0]}><td style={{ whiteSpace: "nowrap" }}>{r[0]}</td><td>{r[1]}</td></tr>)}
        </tbody></table>
      </div>

      <div className="card">
        <h3 className="sec">Find the real number for your city</h3>
        <p className="sub">National ranges are a starting point. Your offer will be local.</p>
        <Chk k="m_salres" items={[
          "Search your target title plus your metro on Glassdoor and note the midpoint",
          "Do the same on Salary.com and LinkedIn Salary and note where they disagree",
          "Find three current postings for the role in your area that show a range and write them down",
          "Ask one person on a coffee chat what the role pays where they are, in a range, not a number",
          "Write your target range below, with the bottom being a number you would actually accept",
        ]} />
        <div className="field" style={{ maxWidth: 360, marginTop: 16 }}><label>My researched range for my city</label>
          <TA k="m_salcity" ph="$52,000 to $60,000, based on..." rows={2} label="My researched range for my city" /></div>
        <Rec><p>If you are moving from a job that paid more than these ranges, say so plainly in interviews before they ask. I know this is a step back in pay and I am making it on purpose, because the path from here goes somewhere I want to be. That sentence stops the awkward question before it happens.</p></Rec>
      </div>
    </>
  );
}
