/** Additions to paid content: more game rounds, more interview questions, more challenges. */

type Choice = { q: string; a: [string, "right" | "wrong"][]; e: string };

/** Eight more rounds of "You be the recruiter". */
export const MORE_GAME: { w: string; s: string; e: string }[] = [
  { w: "Managed social media accounts for the business.", s: "Grew the location's Instagram from 400 to 6,200 followers in a year and turned it into the top source of walk-in job applicants.", e: "Growth with numbers, and a result that connects to hiring. That is a recruiting bullet hiding in a retail job." },
  { w: "Assisted with inventory and ordering.", s: "Owned weekly ordering for a $180K inventory and cut stockouts by 40% by rebuilding the count process.", e: "Owned, a dollar figure, a percent, and the fix. Four signals of someone I can trust with a process." },
  { w: "Provided excellent customer service in a fast paced environment.", s: "Served 300+ guests a shift and held the highest guest rating on the team for five straight quarters.", e: "Fast paced is what every posting says. Three hundred a shift is what fast paced actually means. Show me, do not tell me." },
  { w: "Handled confidential employee information.", s: "Maintained personnel and medical files for 140 staff with zero audit findings over three years.", e: "Confidentiality plus a clean audit record is exactly what HR hires for. The weak version could be anyone." },
  { w: "Worked with vendors and suppliers.", s: "Managed eight vendor relationships and renegotiated two contracts, saving $14K a year.", e: "Vendor management and savings in one line. I now know you can negotiate, which is a recruiting skill too." },
  { w: "Supported the manager with daily tasks.", s: "Ran the store for 12 hours a week in the manager's absence, including opening, closing, and handling escalations solo.", e: "Supported tells me nothing. Ran the store solo tells me you were trusted with the keys. Say the bigger thing." },
  { w: "Participated in the hiring process.", s: "Screened 60+ applicants and ran first round interviews for 15 hires, 13 of whom stayed past a year.", e: "Retention is the number nobody puts on a resume and every HR person cares about. Thirteen of fifteen is a story." },
  { w: "Responsible for safety compliance.", s: "Led monthly safety checks for a 45 person warehouse and brought recordable incidents from 6 a year to 1.", e: "Six to one is a real outcome. Compliance work with a number is rare and it reads as judgment, not paperwork." },
];

/** Five more phone screen calls. */
export const MORE_SCREEN_GAME: Choice[] = [
  { q: "Recruiter asks: \"Why are you moving into HR from retail?\" Best shape of answer?", a: [["Two sentences: the people part of my work is what I do best, and I have been moving toward HR on purpose", "right"], ["A full history starting with your first job", "wrong"], ["Retail is exhausting and I need a change", "wrong"], ["I am open to anything, really", "wrong"]], e: "Short, intentional, forward looking. The screen is checking whether this is a real decision or an escape. Two sentences says real decision." },
  { q: "They ask about a six month gap on your resume. Best move?", a: [["Name it plainly in one sentence and move on", "right"], ["Change the subject", "wrong"], ["Apologize at length", "wrong"], ["Say your resume must be wrong", "wrong"]], e: "I took six months to care for a parent and I am fully ready to go. One sentence, no apology, no story. Gaps only become problems when people get weird about them." },
  { q: "The recruiter is clearly rushed and interrupts you twice. What do you do?", a: [["Shorten your answers and let them drive", "right"], ["Keep going, you prepared this answer", "wrong"], ["Ask if they would like to reschedule", "wrong"], ["Speed up and talk faster", "wrong"]], e: "A rushed recruiter is judging whether you can read a room. Shorter answers, let them lead, and they will remember you as easy to work with." },
  { q: "They ask if you have used Workday. You have not. Best answer?", a: [["No. I used [your system] daily and picked it up in two weeks, so I would expect the same", "right"], ["Yes, a little", "wrong"], ["No, but I am a fast learner", "wrong"], ["Is that required?", "wrong"]], e: "Honest, specific, and it names the proof. A fast learner with no evidence is a phrase. Two weeks on a named system is a fact." },
  { q: "End of the call, they say: \"We will be in touch.\" Best response?", a: [["Thank them, ask when they expect to decide, and ask if it is okay to follow up after that", "right"], ["Say thanks and hang up", "wrong"], ["Ask if you are the top candidate", "wrong"], ["Ask what the salary is", "wrong"]], e: "A date to follow up turns a vague ending into a next step. It also signals that you are organized, which is the job." },
];

/** Six more background check cases. */
export const MORE_BG_GAME: { q: string; v: "clear" | "flag"; e: string }[] = [
  { q: "You rounded your last salary up by $5K on the application. The check includes employment verification.", v: "flag", e: "Most verifications confirm dates and title only, but some confirm salary, and an inflated number is treated as a lie. Leave salary fields blank where you can, and tell the truth where you cannot." },
  { q: "You list a job from 2015 you worked for four months. The company has since closed.", v: "clear", e: "Closed companies are common and verifiers know it. Keep a pay stub or W-2 if you have one, and note that the company closed. Nobody is pulling an offer over a short stint a decade ago." },
  { q: "You put \"Bachelor of Arts, in progress\" for a degree you have not touched in eight years.", v: "flag", e: "In progress means you are enrolled. If you are not, say \"coursework toward\" or list the credits. The difference between those sounds small and it is not." },
  { q: "Your current employer's HR will only confirm your dates and title, not give a reference.", v: "clear", e: "Totally normal. Many companies have a policy of confirming dates and title only. That is why your personal references matter and why you brief them." },
  { q: "You had a misdemeanor eight years ago and the application asks if you have ever been convicted.", v: "clear", e: "Answer honestly where asked. Many places limit what employers can ask and how far back, and a disclosed old issue with a short explanation rarely ends an HR offer. A discovered hidden one does." },
  { q: "You left a job after a conflict with a manager and listed a coworker, not that manager, as the reference.", v: "clear", e: "Choosing your references is your right. A coworker who can speak to your work is a fine reference. Just be ready to answer, neutrally, why you left." },
];

/** Six more questions for the interview bank. */
export const MORE_IVQ = [
  { id: "q7", cat: "Fit", q: "Why this company?",
    why: "I want to know you did the homework. People who did not look us up leave fast, and I am the one who has to refill the seat.",
    ev: "Preparation and genuine interest, not flattery.",
    weak: "I saw the posting and it looked like a great opportunity. You have a good reputation and I would love to be part of the team.",
    strong: "Two reasons. Your careers page talks about promoting from inside, and the coordinator who held this role before moved into recruiting, which is exactly the path I want. And you are growing in [specific area], which means the hiring volume is real and I would learn fast.",
    note: "Name one specific true thing. The careers page, a news item, a person you talked to, a product you have used. Specific beats glowing every time." },
  { id: "q8", cat: "Behavioral", q: "Tell me about a time you disagreed with a manager.",
    why: "HR sits between employees and managers all day. I need to know you can push back respectfully and still execute when the decision does not go your way.",
    ev: "Judgment, respect, and whether you can disagree without drama.",
    weak: "I do not really disagree with managers. I just do what I am asked.",
    strong: "My manager wanted to cut Saturday staffing to save hours. I pulled the last eight Saturdays and showed that two of them had our highest sales. I suggested cutting Tuesday mornings instead. She agreed, we saved the same hours, and Saturday service held. If she had said no, I would have run her plan and tracked the results.",
    note: "Show the data, show the respect, and show that you would have executed either way. That last part is what HR people need to hear." },
  { id: "q9", cat: "Judgment", q: "How do you handle confidential information?",
    why: "In HR you will know salaries, medical leaves, investigations, and terminations before anyone else does. One slip ends careers, sometimes yours.",
    ev: "Whether you understand that discretion is the job, not a nice trait.",
    weak: "I am a very trustworthy person and I would never share anything I was not supposed to.",
    strong: "I treat it as a rule, not a judgment call. At my last job I handled schedule changes that revealed medical leaves, and the rule was simple: it goes in the file, not in conversation, even when a coworker asks and even when I think they already know. If I am not sure whether something is shareable, I assume it is not and ask the person who owns it.",
    note: "Give the rule you actually use. Interviewers can hear the difference between a value and a practice." },
  { id: "q10", cat: "Learning", q: "Tell me about a time you had to learn something quickly.",
    why: "Every HR job runs on systems and processes you have not used yet. I am estimating your ramp time.",
    ev: "How you learn, not just that you can.",
    weak: "I am a quick learner. I picked up everything at my last job really fast.",
    strong: "We switched point of sale systems with a week of notice. I spent two evenings in the training sandbox, wrote a one page cheat sheet for the registers, and trained the other six people on my shift. We had the fewest errors of any location in the first month. The cheat sheet became the store's official guide.",
    note: "Name the method. Sandbox, cheat sheet, training others. A method is reusable, and the interviewer knows it." },
  { id: "q11", cat: "Prioritizing", q: "Tell me about a time you had too many things to do at once.",
    why: "Coordinator and assistant roles are nothing but competing priorities. I want to see how you choose, not whether you can do it all.",
    ev: "Whether you can triage, communicate, and let the right things wait.",
    weak: "I just worked harder and stayed late until it was all done. I am good at multitasking.",
    strong: "Friday afternoon: a customer escalation, a new hire's first day paperwork, and the weekend schedule all due by five. I handled the escalation first because it was live. I told the new hire exactly when I would be back and gave them the handbook to read. Then I did the schedule. I told my manager at three what was done and what would be late. Nothing was late, but she would have known if it was.",
    note: "Multitasking is not an answer. Order, communication, and telling your manager early is the answer." },
  { id: "q12", cat: "Closing", q: "Where do you see yourself in three years?",
    why: "I am checking whether this role is a stop on a path you have thought about, or a random exit. Both of us want you to still be here in year two.",
    ev: "Realistic ambition and whether this company fits into it.",
    weak: "Honestly I am not sure. I just want to get my foot in the door and see what happens.",
    strong: "In this role, I want to own the coordination process end to end within the first year and be the person the recruiters do not have to check on. In three years I would like to be a recruiter or a generalist, depending on which side I find I am best at, and I would rather grow into that here than somewhere else. I have already started the aPHR.",
    note: "Say the next role in plain words, say you want to grow here, and name one thing you have already done about it." },
];
