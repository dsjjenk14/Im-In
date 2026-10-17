/** Additions to Act 1 content. Open in the beta preview, so nothing paid belongs here. */

type Choice = { q: string; a: [string, "right" | "wrong"][]; e: string };

/** More rows for the title translator. */
export const MORE_DECODE_MAP = [
  { base: "HR Assistant", tech: "People Ops Associate, People Team Coordinator", law: "HR Assistant, Human Resources Administrator", gov: "Human Resources Assistant (OA), HR Clerk", health: "HR Assistant, HR Service Center Representative", startup: "People Ops Associate, Office and People Coordinator" },
  { base: "Sourcer", tech: "Talent Sourcer, Sourcing Partner, Technical Sourcer", law: "Recruiting Researcher, Legal Recruiting Specialist", gov: "Staffing Specialist, Outreach Specialist", health: "Talent Sourcer, Clinical Sourcing Specialist", startup: "Sourcer, Talent Researcher" },
  { base: "HRIS Analyst", tech: "People Systems Analyst, People Analytics Associate", law: "HRIS Specialist, HR Systems Administrator", gov: "HR Specialist (Information Systems)", health: "HRIS Analyst, Workday Analyst", startup: "People Ops Analyst, Systems and Data Coordinator" },
  { base: "Talent Acquisition Specialist", tech: "Recruiter, Talent Partner", law: "Recruiting Specialist, Attorney Recruiting Coordinator", gov: "HR Specialist (Recruitment and Placement)", health: "Talent Acquisition Specialist, Healthcare Recruiter", startup: "Recruiter, Talent Lead" },
];

/** Five more rounds for the decoder game. */
export const MORE_DECODE_QZ: Choice[] = [
  { q: "A posting says \"3 to 5 years of HR experience required.\" You have 7 years in retail management and none in HR. Apply?", a: [["Yes, if the duties match what you have done, and say so in the letter", "right"], ["No, never apply without the years listed", "wrong"], ["Only if you lie about the years", "wrong"], ["Only after you get a certification", "wrong"]], e: "Years listed on a posting are a wish, not a law. If the day to day duties match work you have actually done, apply and let the letter connect the dots. Recruiters interview people under the stated years constantly when the fit is there." },
  { q: "The title says \"HR Generalist\" but the duties are all scheduling interviews, posting jobs, and updating the ATS. What is this job?", a: [["A recruiting coordinator role with a generous title", "right"], ["A true generalist role", "wrong"], ["An HR manager role", "wrong"], ["A payroll role", "wrong"]], e: "Read the duties, not the title. Small companies hand out big titles. This is coordinator work, which is good news if that is your lane, and a warning if you wanted employee relations and benefits." },
  { q: "You see \"People Operations\" in a posting. Which world are you most likely looking at?", a: [["A tech company or a startup", "right"], ["A federal agency", "wrong"], ["A hospital", "wrong"], ["A law firm", "wrong"]], e: "People Ops is tech and startup language for the HR function. If you only search HR, you will miss nearly every one of these companies." },
  { q: "A posting lists \"Workday experience preferred.\" You have never used Workday. What do you do?", a: [["Apply, name the systems you have used, and say you learn systems fast", "right"], ["Skip it, preferred means required", "wrong"], ["List Workday on your resume anyway", "wrong"], ["Email them asking if it is really required", "wrong"]], e: "Preferred is a nice to have. Name what you have actually used, with how fast you picked it up. Claiming a system you have not touched falls apart on the first follow up question and costs you the job." },
  { q: "Same job, two postings: one on a job board for 6 weeks, one on the company site posted yesterday. Which do you apply through?", a: [["The company site, today", "right"], ["The job board, it is easier", "wrong"], ["Both, twice, to be safe", "wrong"], ["Neither, six weeks means it is filled", "wrong"]], e: "Apply direct and early. A six week old board posting is often a stale copy. The company site shows the real date, and recruiters review the first applicants first." },
];

/** Day in the life, hour by hour, for the four doors in. */
export const DAY_IN_LIFE: { role: string; day: [string, string][] }[] = [
  { role: "Recruiting Coordinator", day: [
    ["8:30", "Check the ATS for overnight applications and any interview changes. Confirm today's interviews with candidates by email."],
    ["9:30", "Scheduling. Line up next week's panel interviews across four calendars. This is the heart of the job and it is a puzzle every day."],
    ["11:00", "Post two new roles the recruiters opened yesterday. Make sure the posting reads clean on LinkedIn and the careers page."],
    ["12:30", "Lunch, usually at the desk during a busy week. Candidates email back at lunch too."],
    ["1:30", "Greet an onsite candidate, walk them to the room, make sure water and the interviewers show up on time."],
    ["3:00", "Update the ATS. Move candidates through stages, send rejection emails with care, note feedback from interviewers."],
    ["4:30", "Pull a quick report for the recruiting lead: how many in process, how many offers out, where things are stuck."],
  ] },
  { role: "HR Assistant", day: [
    ["8:30", "Process new hire paperwork from yesterday's start. I-9s, direct deposit, benefits enrollment forms, all checked and filed."],
    ["10:00", "Enter changes in the HRIS: a promotion, two address changes, one leave of absence."],
    ["11:30", "Answer employee questions. Where is my pay stub, how do I add a dependent, when does my PTO reset."],
    ["1:00", "Prep onboarding packets and the room for Monday's new hire orientation."],
    ["2:30", "Audit a file for compliance. Make sure every required document is there and dated."],
    ["3:30", "Support the HR manager on a project: pull a headcount report, format a policy update."],
    ["4:30", "Clear the shared HR inbox. The volume is real, and the follow through is what builds trust."],
  ] },
  { role: "HR Coordinator", day: [
    ["8:30", "Check in with a manager about an employee relations concern that came in overnight. Take notes, loop in the generalist."],
    ["9:30", "Schedule three candidate interviews and send the calendar holds."],
    ["11:00", "Benefits question from an employee going on leave. Walk them through the forms and the timeline."],
    ["12:30", "Lunch."],
    ["1:30", "Run new hire orientation for two people. Badges, systems, the handbook, the tour."],
    ["3:00", "Update the ATS and the HRIS. Two systems, both have to be right."],
    ["4:00", "Draft the monthly engagement survey email for the HR manager to review."],
  ] },
  { role: "Agency Recruiter", day: [
    ["8:00", "Review new candidate applications and the inbox. Call the three strongest before anyone else does."],
    ["9:00", "Sourcing block. Search LinkedIn and the database for a hard to fill role, send twenty messages."],
    ["10:30", "Phone screens, back to back. Fifteen minutes each, five in a row."],
    ["12:00", "Call a client hiring manager with two candidates to present. Sell, honestly."],
    ["1:30", "Interview prep call with a candidate going onsite tomorrow."],
    ["2:30", "Chase feedback from two clients who went quiet. Chasing is the job."],
    ["4:00", "Negotiate an offer. Candidate wants 5 more. Make the case to the client with market data."],
    ["5:30", "Log everything. Tomorrow starts with the numbers."],
  ] },
];

/** The certifications people ask about, in plain language. Check the official sites for current fees. */
export const CERTS: [string, string, string, string][] = [
  ["aPHR", "Breaking in, no HR experience needed", "No experience required. A few hundred dollars for the exam. A few weeks of study.", "The only one worth doing before you have the job. It signals you are serious, and it teaches the vocabulary."],
  ["PHR", "One to four years in, generalist track", "One to four years of HR experience depending on your degree. Roughly double the aPHR cost.", "The mid career standard for generalists. Do not rush it. Experience first."],
  ["SHRM-CP", "One to four years in, generalist track", "Experience required, similar to the PHR. Comparable cost.", "The other mid career standard. Employers rarely prefer one over the other. Pick the one your mentors have."],
  ["SPHR / SHRM-SCP", "Senior, strategic roles", "Four to seven years of experience. More expensive, harder exam.", "Years away. Know it exists, then forget about it until you are a manager."],
  ["Recruiting certificates (AIRS, LinkedIn Recruiter, etc.)", "Recruiting and sourcing track", "No experience required for most. Costs vary widely. Some are free.", "Nice to have for sourcing roles. Far less important than a real placement or two on your resume."],
];
