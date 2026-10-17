"use client";
/** Extra depth for Act 2. Paid content. */
import { Acc, Band, Chk, Mark, Note, Rec, Tpl } from "../../ui";
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
function BA({ w, s }: { w: string; s: string }) {
  return (
    <div className="ba">
      <div className="before"><div className="lab">What people write</div><p>{w}</p></div>
      <div className="after"><div className="lab">What gets read</div><p>{s}</p></div>
    </div>
  );
}

/* ───── STEP 6 · HOW RECRUITERS THINK, more ───── */
const MORE_DECODE: [string, string][] = [
  ["We decided to go with an internal candidate.", "Usually true, and usually decided before you applied. The posting went up because policy required it. Nothing you did would have changed it. Connect with the recruiter anyway, because the internal person's old seat just opened."],
  ["The role has been put on hold.", "Budget, a reorg, or a hiring manager who left. Not about you. Ask if it is okay to check back in a month, then actually do it. Roles come off hold and the recruiter calls the people who stayed warm."],
  ["You are overqualified.", "Sometimes they mean you will leave the minute something better comes. Sometimes they mean you will cost too much. Answer both: say why this role is the deliberate next step, and say your range fits theirs."],
  ["Can you tell me a bit more about the gap?", "They have to ask. They do not care much. One plain sentence and move on. The longer you talk, the more it sounds like a problem."],
  ["We are looking for someone who can hit the ground running.", "They do not have time to train. Name the system you learned fastest and how long it took. Then say the sentence: I would come in and help the team without needing a lot of hand holding."],
  ["Let us keep in touch.", "Sometimes polite nothing. Sometimes real. Make it real by sending one message every six to eight weeks with a specific update, like a certification registered or a related project done. The ones who do this get the next call."],
];

export function PsychMore() {
  return (
    <>
      <div className="card">
        <Mark icon="clock" label="From the other side of the desk" />
        <h3 className="sec">A recruiter&apos;s actual Tuesday</h3>
        <Squiggle />
        <p className="body">You will deal with recruiters at every stage, so here is what we are doing while you wait for a reply. It explains a lot of the silence.</p>
        <table className="tbl"><tbody>
          <tr><td style={{ whiteSpace: "nowrap", width: 70 }}>8:00</td><td>Inbox and the ATS. Overnight applications on six open roles, maybe 80 new ones. Ten seconds each on the first pass.</td></tr>
          <tr><td>9:00</td><td>Hiring manager check-ins. Two are unhappy with the candidate flow. One has not reviewed the candidates I sent last week.</td></tr>
          <tr><td>10:00</td><td>Phone screens, back to back. Fifteen minutes each. I am deciding who is worth an hour of a manager&apos;s time.</td></tr>
          <tr><td>12:00</td><td>Lunch at the desk. Scheduling interviews, chasing feedback from Thursday&apos;s panel.</td></tr>
          <tr><td>1:00</td><td>Sourcing for the role nobody is applying to. Sending messages on LinkedIn to people who are not looking.</td></tr>
          <tr><td>3:00</td><td>An offer negotiation. A candidate wants more than the band. I go to the manager with market data.</td></tr>
          <tr><td>4:00</td><td>Rejections and updates. The part everyone hates and the part that gets skipped when the day runs long. That is where your silence comes from.</td></tr>
          <tr><td>5:00</td><td>Reports. Time to fill, pipeline by stage, offers out. These numbers are how I am judged.</td></tr>
        </tbody></table>
        <Note kind="decode" label="What this means for you"><p>A recruiter who has not replied is almost never ignoring you on purpose. They are between 4:00 and 5:00 on a Tuesday with twelve things ahead of your email. A polite follow up a week later lands in a calmer moment. That is why it works.</p></Note>
      </div>

      <div className="card">
        <h3 className="sec">How recruiters are measured, and why it matters to you</h3>
        <p className="body">Every recruiter has a scoreboard. Once you know what is on it, you know how to make their job easier, and candidates who make the job easier get moved forward.</p>
        <table className="tbl">
          <thead><tr><th>The number</th><th>What it is</th><th>How to help them hit it</th></tr></thead>
          <tbody>
            <tr><td>Time to fill</td><td>Days from posting to accepted offer</td><td>Reply fast. Be available for screens within a day or two. Have your references ready.</td></tr>
            <tr><td>Pipeline by stage</td><td>How many candidates at each step for each role</td><td>Do not go quiet. If you are no longer interested, say so. Silence clogs their pipeline and they remember.</td></tr>
            <tr><td>Offer acceptance rate</td><td>Share of offers that get accepted</td><td>Be honest about your range and your other processes early. Surprises at offer stage hurt this number and they hurt you.</td></tr>
            <tr><td>Hiring manager satisfaction</td><td>Whether the managers trust the recruiter&apos;s judgment</td><td>Show up prepared. A candidate who makes the recruiter look good gets recommended for the next role too.</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 className="sec">Six more things you will hear</h3>
        <p className="sub">And what they usually mean.</p>
        {MORE_DECODE.map((d) => (
          <Acc key={d[0]} q={<><span className="pill navy" style={{ marginRight: 9 }}>They say</span>{d[0]}</>}>
            <div className="qa strong"><div className="qlab">What it usually means</div><p>{d[1]}</p></div>
          </Acc>
        ))}
      </div>

      <div className="card">
        <h3 className="sec">The ATS, without the scare stories</h3>
        <p className="body">An applicant tracking system is a database. It stores applications, lets recruiters search them, and moves people through stages. Here is what it actually does and does not do, because the internet has made it into a monster.</p>
        <ul style={ladder}>
          <Rung title="It does not auto reject you for a missing keyword">A recruiter searches it the way you search LinkedIn: by title, by skill, by system name. If your resume does not contain the words, you do not show up in the search. That is different from being rejected, and it is why keywords matter.</Rung>
          <Rung title="It does reject you on knockout questions">Are you authorized to work here, can you work this shift, do you have this license. Answer those honestly. A no on a true must have ends it, and that is fair.</Rung>
          <Rung title="It scrambles tables, columns, and text boxes">The parser reads top to bottom, left to right. Two column resumes come out interleaved. Keep it to one column, standard headings, plain text.</Rung>
          <Rung title="It keeps your old applications">If you applied to the same company a year ago with a worse resume, the recruiter can see both. Not a problem. Just be aware that the new one should be better.</Rung>
        </ul>
      </div>

      <div className="card">
        <h3 className="sec">Why you never heard back: the seven real reasons</h3>
        <p className="sub">In rough order of how often each one is the cause.</p>
        <ul style={ladder}>
          <Rung title="1 · An internal or referred candidate was already in front">Nothing you did. Keep going.</Rung>
          <Rung title="2 · Your most recent title did not match and the summary did not explain">The ten second pass needs to see the pivot at the top. Fix the summary.</Rung>
          <Rung title="3 · You applied on day nine of a posting that had 200 applicants by day three">Apply in the first 48 hours. Set the alerts.</Rung>
          <Rung title="4 · The role was put on hold or cancelled">Common. Nobody tells the applicants. Follow up once and move on.</Rung>
          <Rung title="5 · A knockout question">Shift, location, authorization, a license. Check the must haves before you spend the evening.</Rung>
          <Rung title="6 · The salary field">You entered a number above their band. Leave it blank where you can, or enter the bottom of a researched range.</Rung>
          <Rung title="7 · The resume had an error in the first three lines">A typo in the summary is an automatic no for many recruiters. Read it out loud once.</Rung>
        </ul>
        <Band icon="bulb" color="#8EDBC2"><b>Five of these seven have nothing to do with whether you could do the job.</b> That is why one rejection, or ten, tells you almost nothing about you. Fix the ones you control and keep moving.</Band>
      </div>
    </>
  );
}

/* ───── STEP 7 · TRANSFERABLE SKILLS, more ───── */
const INDUSTRIES: { name: string; rows: [string, string][] }[] = [
  { name: "Retail", rows: [
    ["Worked the sales floor and register", "Served 250+ customers a shift, handled cash and card transactions with zero drawer discrepancies over 18 months, and resolved returns and complaints on the spot"],
    ["Opened and closed the store", "Held keyholder responsibility for a $1.5M location, opening and closing solo four days a week with full accountability for cash, alarms, and staff"],
    ["Helped with hiring", "Interviewed 40+ seasonal applicants and onboarded 15 hires, building the floor training checklist the store still uses"],
    ["Made the schedule", "Built weekly schedules for 20 associates across three shifts, cut overtime by 12% and held coverage through two holiday seasons"],
  ] },
  { name: "Hospitality and restaurants", rows: [
    ["Server or bartender", "Managed a 25 table section on 300 cover nights, holding a 4.8 guest rating while training six new servers on the POS and the menu"],
    ["Front desk", "Handled check-in, billing, and guest issues for a 180 room property, resolving 20+ escalations a week without a manager"],
    ["Shift lead", "Ran 12 person shifts including scheduling, cash reconciliation, and inventory counts, with the lowest shrink of five locations"],
    ["Event work", "Coordinated setup and staffing for 40+ events a year, up to 400 guests, managing vendors, timelines, and a team of 10"],
  ] },
  { name: "Healthcare and medical offices", rows: [
    ["Patient intake", "Registered 60+ patients a day, verified insurance, and kept intake errors below 1% under monthly audit"],
    ["Scheduling", "Managed appointment scheduling for six providers, cut no-shows 18% with a reminder process I built"],
    ["Medical records", "Maintained HIPAA compliant records for 2,000+ patients with zero compliance findings in three annual audits"],
    ["CNA or care work", "Provided direct care for 12 residents a shift, documented changes in condition, and trained four new aides"],
  ] },
  { name: "Call center and customer service", rows: [
    ["Took inbound calls", "Handled 80+ inbound calls a day in a metrics driven environment, holding a 94% satisfaction score for six straight quarters"],
    ["Escalations", "Owned tier two escalations for a 40 person team, resolving 90% without further escalation and documenting each in the CRM"],
    ["Trained new reps", "Trained 18 new representatives on systems and scripts, and wrote the escalation guide the floor still uses"],
    ["Quality or metrics", "Met or beat handle time, resolution, and quality targets every month for two years, with top five ranking on a floor of 120"],
  ] },
  { name: "Military", rows: [
    ["Led a squad or team", "Led a 9 person team through a 6 month deployment at 100% readiness, responsible for training, welfare, and daily accountability"],
    ["Admin or personnel", "Processed personnel actions, awards, and evaluations for a 140 person unit with zero late submissions over two years"],
    ["Logistics or supply", "Managed $2M in equipment with 100% accountability across three inspections"],
    ["Training", "Trained 60+ new arrivals on unit procedures and safety, and rewrote the onboarding checklist adopted across the battalion"],
  ] },
  { name: "Education", rows: [
    ["Classroom teacher", "Managed instruction and behavior for 140 students across five sections, maintaining communication with families and resolving 30+ escalations a semester"],
    ["Paraprofessional or aide", "Supported 25 students with individualized plans, tracked progress data daily, and coordinated with four teachers and two specialists"],
    ["School office", "Ran front office operations for a 600 student school: attendance, records, substitute scheduling, and parent communication"],
    ["Coaching or activities", "Recruited, scheduled, and managed 30 student athletes and a staff of three assistants across two seasons"],
  ] },
  { name: "Administration and office", rows: [
    ["Administrative assistant", "Supported three directors with calendars, travel, and expense reporting, maintaining 100% on time submissions for two years"],
    ["Receptionist", "First point of contact for 100+ daily visitors and calls, managed conference room scheduling and vendor deliveries for a 150 person office"],
    ["Data entry or records", "Maintained records for 500+ accounts at 99.5% accuracy under weekly QA, and built the intake template that cut rework by a third"],
    ["Office manager", "Ran operations for a 60 person office: onboarding new staff, vendors, supplies, and a $90K annual budget"],
  ] },
  { name: "Banking and finance", rows: [
    ["Teller", "Processed 150+ transactions daily with zero cash discrepancies in 30 months, and referred 40+ customers to lending and accounts"],
    ["Personal banker", "Opened 300+ accounts a year and held the branch's top customer satisfaction score for three quarters"],
    ["Collections or loans", "Managed a portfolio of 400 accounts, resolving delinquencies through documented, compliant customer conversations"],
    ["Compliance support", "Reviewed 200+ account files a month for regulatory completeness with no audit findings"],
  ] },
  { name: "Operations and logistics", rows: [
    ["Warehouse associate", "Picked and packed 400+ orders a shift at 99.8% accuracy, trained eight new hires on scanners and safety"],
    ["Dispatcher", "Coordinated 30 drivers and 200 daily deliveries, reducing late deliveries 22% by rebuilding route handoffs"],
    ["Team lead", "Supervised a 15 person shift including scheduling, safety checks, and performance conversations, with the lowest turnover of four shifts"],
    ["Inventory", "Owned cycle counts for a $3M inventory and brought variance under 0.5%"],
  ] },
];

const VERBS: [string, string][] = [
  ["When you were in charge of something", "Owned, Ran, Led, Managed, Coordinated, Oversaw, Directed"],
  ["When you made something better", "Cut, Reduced, Increased, Improved, Rebuilt, Streamlined, Fixed"],
  ["When you built something new", "Built, Created, Launched, Designed, Wrote, Introduced, Established"],
  ["When you worked with people", "Trained, Onboarded, Coached, Resolved, De-escalated, Mentored, Advised"],
  ["When you handled volume", "Processed, Handled, Served, Managed, Scheduled, Maintained, Tracked"],
  ["Verbs to delete", "Helped with, Assisted, Responsible for, Participated in, Was involved in, Worked on"],
];

export function SkillsMore() {
  return (
    <>
      <div className="card">
        <Mark icon="scan" label="Your industry, translated" />
        <h3 className="sec">Translation tables, by where you are coming from</h3>
        <Squiggle />
        <p className="body">Find your field. Each row is a thing people write on the left and the version that gets read on the right. Your numbers will be different. The shape is the same.</p>
        {INDUSTRIES.map((ind) => (
          <Acc key={ind.name} q={<><span className="pill" style={{ marginRight: 9 }}>From</span>{ind.name}</>}>
            {ind.rows.map((r) => <BA key={r[0]} w={r[0]} s={r[1]} />)}
          </Acc>
        ))}
        <Rec><p>Every one of these right hand bullets is an HR bullet in disguise. Training is onboarding. Scheduling is workforce coordination. Escalations are employee relations. Records at 99% accuracy is HRIS work. Say the HR word next to your word and the recruiter does the translation for you.</p></Rec>
      </div>

      <div className="card">
        <h3 className="sec">The verbs that get read</h3>
        <p className="sub">Start every bullet with one from the first five rows. Never from the last.</p>
        <table className="tbl"><tbody>
          {VERBS.map((v) => <tr key={v[0]}><td>{v[0]}</td><td style={v[0].startsWith("Verbs to delete") ? { color: "#B8523C" } : undefined}>{v[1]}</td></tr>)}
        </tbody></table>
      </div>

      <div className="card">
        <h3 className="sec">Numbers you have and forgot about</h3>
        <p className="sub">Check every one you could put a real figure on. Then go put it on.</p>
        <Chk k="m_nums" items={[
          "How many people were on my team or shift",
          "How many customers, calls, patients, students, or orders I handled in a day or week",
          "How much money I was trusted with: sales, cash, budget, inventory, accounts",
          "How many people I trained, onboarded, or interviewed",
          "How long I held a responsibility without a miss, in months",
          "A score or rating I held: satisfaction, quality, audit, ranking",
          "Something that went down because of me: errors, wait times, no-shows, turnover, overtime",
          "Something that went up because of me: sales, ratings, retention, speed",
        ]} />
      </div>

      <div className="card">
        <h3 className="sec">The words HR postings actually use</h3>
        <p className="sub">Use these exact phrases in your skills section and your bullets where they are true. These are the words recruiters type into the search box.</p>
        <Tpl label="Coordination and admin" text={"Interview scheduling · Calendar management · Onboarding support · New hire orientation · Records management · Document management · Data entry · File audits · Offer letters"} />
        <Tpl label="Systems" text={"Applicant tracking system (ATS) · HRIS · Workday · ADP · BambooHR · Greenhouse · Lever · UKG · Paylocity · Microsoft Excel · Google Workspace · Scheduling software"} />
        <Tpl label="People" text={"Candidate communication · Employee relations support · Conflict resolution · De-escalation · Customer service · Training and development · Cross-functional collaboration · Stakeholder communication"} />
        <Tpl label="Judgment" text={"Confidentiality · Compliance support · Attention to detail · Process improvement · Prioritization · Time management · Discretion · HIPAA (if true) · I-9 and onboarding paperwork (if true)"} />
        <Note kind="mistake" label="Common mistakes"><p>Do not list a system you have never opened. If a posting wants Workday and you have used ADP, write ADP and say in your letter that you learn systems fast, with the proof. Listing Workday to beat the search gets you a screen, and the screen ends the moment they ask about it.</p></Note>
      </div>
    </>
  );
}

/* ───── STEP 8 · RESUME LAB, more ───── */
const RESUME_FAQ: [string, string][] = [
  ["One page or two?", "One page if you have under ten years of experience or if your experience before HR is mostly in one field. Two pages is fine past ten years, and only if the second page is real. Nobody has ever been rejected for a tight one pager."],
  ["Should I include a photo?", "Not in the US. It creates bias problems for the employer and many ATS parsers choke on it. Your photo belongs on LinkedIn."],
  ["Objective or summary?", "Summary. An objective tells them what you want. A summary tells them what you bring. Nobody has used an objective seriously in years."],
  ["Do I put my full address?", "City and state only. Recruiters need to know your location for commute and legal reasons. They do not need your street."],
  ["References available on request?", "Delete that line. Everyone knows references are available. It wastes a line you could use for a number."],
  ["What about jobs from fifteen years ago?", "Title, company, dates, one line at most. Or drop them if they do not help the story. A resume is a sales document, not a legal record."],
  ["Should I list my GPA?", "Only if you graduated in the last two years and it is above 3.5. Otherwise it reads as reaching."],
  ["PDF or Word?", "PDF unless the posting says otherwise. It looks the same everywhere. The download here is Word so you can edit it, then save as PDF from there."],
];

export function ResumeMore() {
  return (
    <>
      <div className="card">
        <Mark icon="note" label="Section by section" />
        <h3 className="sec">What goes where, and why</h3>
        <Squiggle />
        <ul style={ladder}>
          <Rung title="Header">Name, city and state, phone, email, LinkedIn URL. One line. No photo, no street address, no three fonts. Your email should be some version of your name, not the one from high school.</Rung>
          <Rung title="Summary, three sentences">What you have been doing and for how long. The two or three things from that work that map to HR. Where you are going, and the certification if you have started one. This is the only place a career changer gets to explain the pivot before the recruiter sees a non HR title.</Rung>
          <Rung title="Experience, most recent first">Three bullets with numbers for your current or last role. Two or three for the one before. One line for anything older than ten years. Exact months on every role. If you had two titles at one company, list both under the company so it reads as growth.</Rung>
          <Rung title="Skills">The exact words from your target postings, grouped loosely: systems, coordination, people, judgment. Every system you have actually used, by name. This section is for the search box, not for a human, so keep it dense.</Rung>
          <Rung title="Education and certifications">Degree, school, year if recent. Certifications in progress count the day you register: aPHR, in progress, exam scheduled for [month]. That line does real work for a career changer.</Rung>
          <Rung title="Volunteer and side work, when it helps">If you have ever recruited volunteers, run a schedule for a church or a league, onboarded people, or handled sensitive information in a volunteer role, it goes on with the same bullet formula. Unpaid coordination is still coordination.</Rung>
        </ul>
      </div>

      <div className="card">
        <h3 className="sec">Three summaries, before and after</h3>
        <p className="sub">Same people, same facts. Different words.</p>
        <div className="ba">
          <div className="before"><div className="lab">Before · retail</div><p>Hardworking retail professional with excellent customer service and communication skills seeking a position in Human Resources where I can grow.</p></div>
          <div className="after"><div className="lab">After</div><p>Retail leader with 7 years of experience, most recently running a 14 person team across two locations. Background in hiring, onboarding, scheduling, and resolving escalations, with 22 hires trained and the highest retention in the district. Moving into HR coordination deliberately and currently studying for the aPHR.</p></div>
        </div>
        <div className="ba">
          <div className="before"><div className="lab">Before · call center</div><p>Experienced customer service representative looking to transition into HR. Passionate about people and detail oriented.</p></div>
          <div className="after"><div className="lab">After</div><p>Customer service professional with 5 years in a high volume call center, handling 80+ calls a day at a 94% satisfaction score. Trained 18 new representatives and wrote the escalation guide still in use. Targeting recruiting coordinator roles where fast, careful communication with strangers is the whole job.</p></div>
        </div>
        <div className="ba">
          <div className="before"><div className="lab">Before · military</div><p>Veteran with leadership experience seeking an entry level HR role.</p></div>
          <div className="after"><div className="lab">After</div><p>Former Army team leader with 6 years of service, responsible for the training, readiness, and personnel actions of a 9 person team and the administrative records of a 140 person unit. Experienced in onboarding, documentation under audit, and confidential personnel matters. Transitioning to HR generalist work and registered for the aPHR.</p></div>
        </div>
        <Rec><p>Notice what disappeared: hardworking, passionate, detail oriented, seeking. Those are claims. What replaced them is scale and proof. A recruiter cannot argue with 80 calls a day. They can ignore passionate.</p></Rec>
      </div>

      <div className="card">
        <h3 className="sec">Gaps, short stints, and the other things you are worried about</h3>
        <p className="sub">Each one has a plain way to handle it on the page and a plain sentence for when they ask.</p>
        <Acc q="A gap of six months or more">
          <p className="body" style={{ fontSize: 14.5 }}>On the resume: if you did anything during it, a course, caregiving, freelance, volunteer work, give it one line with dates, like any job. If you did not, leave the gap and let the dates show it. Do not fudge the months.</p>
          <Tpl label="When they ask" text="I took [time] to [care for a parent / recover from surgery / finish a program], and I am fully ready to go. Happy to say more, but that is the whole story." />
        </Acc>
        <Acc q="A layoff">
          <p className="body" style={{ fontSize: 14.5 }}>Layoffs are common and carry no stigma with recruiters. Do not explain it on the resume. If asked, one sentence, neutral, forward looking.</p>
          <Tpl label="When they ask" text="The company cut about a third of the team in [month], including my whole department. I used the time since to [specific thing], and it pushed me to make the move into HR on purpose instead of waiting." />
        </Acc>
        <Acc q="Several short jobs in a row">
          <p className="body" style={{ fontSize: 14.5 }}>Group them if they were similar: Customer Service Roles, 2019 to 2022, with the companies listed underneath. Then one set of bullets for the group. It reads as a chapter instead of chaos.</p>
          <Tpl label="When they ask" text="I was figuring out what I wanted, and I was honest with myself that none of those were it. The common thread was the people part, which is why I am here. I am looking for somewhere to stay and grow." />
        </Acc>
        <Acc q="You were let go for cause">
          <p className="body" style={{ fontSize: 14.5 }}>Nothing on the resume. Background checks confirm dates and title, not reasons. If asked directly, do not lie, do not over explain, and do not blame anyone.</p>
          <Tpl label="When they ask" text="That role ended on their terms. I made a mistake with [general area], I owned it, and I learned [specific lesson] from it. I would rather tell you that plainly than have you wonder." />
        </Acc>
        <Acc q="You are going back to work after years away">
          <p className="body" style={{ fontSize: 14.5 }}>Lead with the summary and with anything recent: a course, volunteer coordination, a certification registration. Put your older experience in with full bullets. Recruiters care more that you are current than that you were continuous.</p>
          <Tpl label="When they ask" text="I stepped out for [reason] and I am stepping back in on purpose. In the last [time] I have [specific things], and the skills from before, [two of them], did not go anywhere." />
        </Acc>
      </div>

      <div className="card">
        <h3 className="sec">The ten minute keyword pass</h3>
        <p className="sub">Do this for every application. It is the whole tailoring step.</p>
        <Chk k="m_kw" items={[
          "Read the posting once and highlight every skill, system, and task they name",
          "Find the three that matter most, usually the ones in the first few bullets",
          "Put those three exact phrases in your summary or top bullets, where true",
          "Add any system they name that you have actually used to your skills section",
          "Mirror their title in your summary: targeting [their exact title] roles",
          "Read the top third of your resume once more as the recruiter. Can they see the match in ten seconds?",
        ]} />
      </div>

      <div className="card">
        <h3 className="sec">Three layouts for a career changer</h3>
        <p className="body"><strong>Chronological with a strong summary</strong> is what I recommend for almost everyone. Jobs in order, numbers in the bullets, the pivot explained up top. Recruiters trust it because it hides nothing.</p>
        <p className="body"><strong>Hybrid</strong> adds a short skills or highlights block under the summary with three or four of your best HR-relevant bullets pulled from across your jobs, then the normal chronological section. Good if your best HR evidence is scattered across several roles.</p>
        <p className="body"><strong>Functional</strong>, where you group everything by skill and bury the dates, is the one I would avoid. Recruiters read it as hiding something, and ATS parsers struggle with it. If you are tempted by it, you want the hybrid instead.</p>
      </div>

      <div className="card">
        <h3 className="sec">Resume questions I get every week</h3>
        {RESUME_FAQ.map((f) => (
          <Acc key={f[0]} q={f[0]}><div className="qa strong"><div className="qlab">Straight answer</div><p>{f[1]}</p></div></Acc>
        ))}
      </div>
    </>
  );
}

/* ───── STEP 9 · COVER LETTER LAB, more ───── */
export function CoverMore() {
  return (
    <>
      <div className="card">
        <Mark icon="note" label="Two full letters" />
        <h3 className="sec">What a finished one looks like</h3>
        <Squiggle />
        <p className="body">Two complete letters for two common pivots. Do not copy them. Read them for shape and length, then write yours in the builder above.</p>
        <Tpl label="Retail to HR Coordinator" text={"Dear Ms. Okafor,\n\nSeven years running a retail team taught me hiring, onboarding, and how to keep good people from quitting. I am applying for the HR Coordinator position at Northwind Health.\n\nAt Regional Retail Group I interviewed and onboarded 22 new hires over three years and built the training checklist the store still uses. New staff ramped in about half the time they had before, and my location had the lowest turnover in a district of twelve. I also ran the weekly schedule for 14 people across two sites, which is to say I have been doing coordination work for years without the title.\n\nYour careers page talks about promoting from within, and the coordinator who held this role before moved into recruiting, which is exactly the kind of people team I want to learn under.\n\nI am moving into HR deliberately, not accidentally. The work I have always done best is the people part, and I have been building toward this by talking to HR professionals, registering for the aPHR, and learning how hiring actually works from the inside. I am not leaving my background behind. I am bringing all of it with me.\n\nI would welcome the chance to talk about the HR Coordinator role and what I could bring to your team. Thank you for your time.\n\nJordan Ellis"} />
        <Tpl label="Call center to Recruiting Coordinator" text={"Dear Hiring Team,\n\nFive years of talking to eighty strangers a day taught me how to build trust fast, stay steady with upset people, and keep a lot of moving pieces straight at once. I am applying for the Recruiting Coordinator role at Beacon Logistics.\n\nIn my current role I handle 80+ inbound calls a day in a metrics driven environment and have held a 94% satisfaction score for six straight quarters. I also trained 18 new representatives on our systems and wrote the escalation guide the floor still uses. Candidate communication is the same skill with a different audience, and scheduling across calendars is the kind of puzzle I am good at.\n\nI noticed you are opening two new distribution centers this year, which means a lot of hiring, and I want to be the person who keeps that process moving.\n\nI am making this move on purpose. I have spent the last few months talking to recruiters about what the work really looks like, I have started the aPHR, and the more I learn, the more sure I am. My background is not a gap. It is five years of practice at the hardest part of this job.\n\nI would love to talk about the Recruiting Coordinator role. Thank you for considering me.\n\nSam Rivera"} />
        <Note kind="rec" label="Recruiter's notes"><p>Both letters are under 300 words. Both name one real thing about the company. Both have at least two numbers. And both say, directly, that the pivot is on purpose. That is the whole formula.</p></Note>
      </div>

      <div className="card">
        <h3 className="sec">The ten minute customization</h3>
        <p className="sub">Once the pivot paragraph is written, each new letter takes about this long.</p>
        <Chk k="m_clcustom" items={[
          "Swap the company name and role title, then search the letter for the old company name to be sure",
          "Rewrite the hook sentence so it points at this role's biggest requirement",
          "Pick the one proof story that matches what this posting cares about most",
          "Find one true, specific thing about this company and put it in its own sentence",
          "Paste the pivot paragraph unchanged",
          "Read it out loud once. Fix anything you stumbled on",
          "Save as FirstName_LastName_CoverLetter_Company.pdf",
        ]} />
      </div>

      <div className="card">
        <h3 className="sec">If you email it instead of uploading it</h3>
        <p className="body">Some roles, especially through agencies and small companies, want an email. The letter becomes the body of the email, shortened, and the resume is attached. The subject line matters more than people think, because it is the only thing they see before opening.</p>
        <Tpl label="Subject line" text="HR Coordinator application · Jordan Ellis · 7 years retail leadership, 22 hires trained" />
        <Tpl label="Email body" text={"Hi [Name],\n\nI am applying for the [Role] position. [Hook sentence from your letter.]\n\n[Proof paragraph, trimmed to two sentences.]\n\n[Pivot paragraph, trimmed to two or three sentences.]\n\nMy resume is attached. I would welcome a conversation whenever is convenient. Thank you.\n\n[Name]\n[Phone]\n[LinkedIn URL]"} />
      </div>

      <div className="card">
        <h3 className="sec">When not to send one</h3>
        <p className="body">When the application form has no place for it and no free text field, do not force it into the resume. When a recruiter asks you to just send your resume, send your resume, and put a two sentence version of your pivot in the email body. And when you are applying through an agency, the recruiter is your cover letter. Brief them well instead.</p>
        <Band icon="bulb" color="#8EDBC2"><b>A cover letter is for the moment a human might read it.</b> When no human will, spend the ten minutes on a note to someone at the company instead.</Band>
      </div>
    </>
  );
}

/* ───── STEP 10 · LINKEDIN LAB, more ───── */
export function LinkedInMore() {
  return (
    <>
      <div className="card">
        <Mark icon="scan" label="Five shapes" />
        <h3 className="sec">Headline formulas that get found</h3>
        <Squiggle />
        <p className="body">Your headline has about 220 characters. Use them for search terms and proof, not for inspiration. Five shapes that work, with examples.</p>
        <Tpl label="1 · The target plus proof" text="Aspiring HR Coordinator · 7 years retail leadership · 22 hires trained · aPHR in progress" />
        <Tpl label="2 · The translation" text="Customer Service Lead moving into Recruiting · 80 calls a day, 94% satisfaction · Trained 18 reps" />
        <Tpl label="3 · The two lanes" text="HR Coordinator or Recruiting Coordinator · Scheduling, onboarding, candidate communication · Columbus, OH" />
        <Tpl label="4 · The veteran" text="Army Team Leader transitioning to HR · Personnel records for 140, training for 60+ · Open to relocation" />
        <Tpl label="5 · The certification forward" text="aPHR Candidate · Hospitality manager with 6 years leading teams of 18 · Targeting HR Generalist roles" />
        <Note kind="mistake" label="Common mistakes"><p>Open to new opportunities. Seeking my next challenge. Passionate people person. None of those words get typed into a recruiter search. Every word in your headline should be something I would search for or something that proves you can do it.</p></Note>
      </div>

      <div className="card">
        <h3 className="sec">Three About sections, in full</h3>
        <p className="sub">Read for shape. Yours should sound like you, not like these.</p>
        <Tpl label="Retail to HR Coordinator" text={"I spent seven years in retail, most recently running a 14 person team across two locations. The part I was always best at was the people side: hiring, training, scheduling, and keeping everyone steady when it got busy.\n\nOver three years I interviewed and onboarded 22 people and built the training checklist the store still uses. My location had the lowest turnover in the district. I did not call it HR at the time. It was.\n\nI am now moving into HR coordination on purpose. I am registered for the aPHR and I have been talking to people in the field about what the work really looks like.\n\nIf you are hiring for HR Coordinator or Recruiting Coordinator roles, or you work in HR and are open to a quick conversation, I would genuinely like to connect."} />
        <Tpl label="Call center to Recruiter" text={"Eighty calls a day for five years teaches you a few things. How to earn trust with a stranger in ninety seconds. How to stay steady when someone is upset with you. How to hit a number every single day.\n\nThose are recruiting skills. I just learned them in a headset.\n\nI held a 94% satisfaction score for six straight quarters, trained 18 new reps, and wrote the escalation guide my floor still uses. I am moving into recruiting because the fast, people heavy, scoreboard kind of work is the kind I am good at.\n\nTargeting Recruiting Coordinator and agency recruiter roles. If that is your world, I would love to hear how you got in."} />
        <Tpl label="Military to HR Generalist" text={"Six years in the Army, the last three as a team leader responsible for nine soldiers and the personnel records of a 140 person unit. Evaluations, awards, onboarding new arrivals, confidential matters handled correctly, every time, under inspection.\n\nI am transitioning to HR because it is the closest civilian version of the work I was best at: taking care of people and keeping the paperwork that protects them straight.\n\nRegistered for the aPHR. Open to HR Assistant, HR Coordinator, and HR Generalist roles, and open to relocation.\n\nIf you are a veteran in HR or you hire veterans, I would be grateful for twenty minutes of your time."} />
      </div>

      <div className="card">
        <h3 className="sec">Your experience section</h3>
        <p className="body">Copy your resume bullets into each role on LinkedIn, numbers and all. LinkedIn is searchable, so the same keywords that matter on the resume matter here. Then add one line at the top of your most recent role that a resume would not have room for: a sentence about what the job was really like. <strong>That sentence is where a recruiter decides you are a person.</strong></p>
        <Tpl label="Example first line" text="Ran the front end of a busy location through two holiday seasons. Hiring, training, scheduling, and the hard conversations, all of it." />
      </div>

      <div className="card">
        <h3 className="sec">The fifteen minute daily routine</h3>
        <p className="sub">This is all LinkedIn needs from you. Most days, less.</p>
        <Chk k="m_liroutine" items={[
          "Check messages and connection requests. Reply to anything real within a day",
          "Leave one real comment on a post by someone in HR or recruiting",
          "Send one connection request with a note, or one outreach message",
          "Look at who viewed your profile. If it is a recruiter, send a short hello",
          "Once a week: check your job alerts and save the two best postings",
          "Once a week: post something, even one paragraph",
        ]} />
      </div>

      <div className="card">
        <h3 className="sec">Five kinds of posts that work for a career changer</h3>
        <p className="sub">You do not need to be a writer. You need to be a real person who is clearly moving somewhere.</p>
        <Acc q="1 · The announcement">
          <Tpl label="Template" text={"I am making a move into HR and recruiting.\n\nAfter [X] years in [field], I have realized the part of my work I am best at is the people part: [two examples]. So I am going toward it on purpose.\n\nI am targeting [role] roles in [place]. If you work in HR and have twenty minutes to tell me how you got in, I would be grateful. And if you know someone hiring, I am ready.\n\n[Optional: a sentence on what you have already done, like a certification registration.]"} />
        </Acc>
        <Acc q="2 · The lesson from your old job">
          <Tpl label="Template" text={"Something [field] taught me that I did not expect to use in HR:\n\n[One specific story in three or four sentences, with a number.]\n\nI used to think that was just [customer service / shift work / the job]. It was training, or onboarding, or employee relations, depending on the day. I just did not have the words yet.\n\nWhat did your first career teach you that you still use?"} />
        </Acc>
        <Acc q="3 · The thing you learned this week">
          <Tpl label="Template" text={"Learning the HR vocabulary this week. Three things that surprised me:\n\n1. [Thing, one line]\n2. [Thing, one line]\n3. [Thing, one line]\n\nIf you are in HR, what do you wish career changers understood before their first day?"} />
        </Acc>
        <Acc q="4 · The thank you">
          <Tpl label="Template" text={"Thank you to [Name] for twenty minutes this week that changed how I am approaching my search.\n\nThe thing that stuck with me: [one specific piece of advice, one or two sentences].\n\nIf you are early in a career change, go have those conversations. People are more generous than you expect."} />
        </Acc>
        <Acc q="5 · The milestone">
          <Tpl label="Template" text={"Small milestone: [registered for the aPHR / first interview / fifth coffee chat / resume rewritten with real numbers].\n\n[One or two sentences on what it took.]\n\nNext up: [the next thing]. Onward."} />
        </Acc>
        <Rec><p>One post a week is plenty. One post every two weeks still works. The point is not to go viral. It is that when a recruiter clicks your profile after seeing your comment, they find a person who is clearly, actively moving toward the work, with proof.</p></Rec>
      </div>

      <div className="card">
        <h3 className="sec">Connection requests that get accepted</h3>
        <p className="sub">Always add a note. Three to send, depending on who it is.</p>
        <Tpl label="To someone in HR you do not know" text="Hi [Name], I am moving into HR from [field] and I am trying to learn from people doing the work. Your post about [topic] was the clearest thing I have read on it. Would love to connect." />
        <Tpl label="To a recruiter at a company you applied to" text="Hi [Name], I applied for the [Role] opening yesterday. Seven years leading retail teams, 22 hires trained, and I am moving into HR on purpose. Would love to connect either way." />
        <Tpl label="To someone you met at an event or on a call" text="Hi [Name], great meeting you at [event / on our call]. Thank you for the advice on [specific thing]. I am going to [action] this week because of it. Would love to stay in touch." />
      </div>

      <div className="card">
        <h3 className="sec">Open to Work, the settings that matter</h3>
        <p className="body">Turn it on. If you are still employed and worried about your current company seeing it, choose recruiters only, which hides the green banner and shows the signal to people using LinkedIn Recruiter. Fill in the job titles field with your five search terms, set the location to your metro plus remote if you want it, and set the start date to within a month. Recruiters filter on all of those.</p>
        <Note kind="win" label="Quick win"><p>The job titles you enter in Open to Work are matched against what recruiters search. Use the exact titles from the Decoder, not creative versions. People Operations Coordinator is a title. Future HR Rockstar is not.</p></Note>
      </div>
    </>
  );
}
