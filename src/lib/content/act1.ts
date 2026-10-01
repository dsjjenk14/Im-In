/** Act 1 content (open in the beta preview). Word for word from the prototype. */

export interface ChoiceQ { q: string; a: [string, "right" | "wrong"][]; e: string }

export const QZ: { q: string; a: [string, string][] }[] = [
  { q: "What sounds more like a good day at work?",
    a: [["Talking to fifteen new people and moving deals forward", "ta"], ["Solving one complicated situation really well", "gen"],
      ["A mix, as long as I am not doing the same thing all day", "both"], ["Getting through a clean list of tasks with nothing dropped", "ops"]] },
  { q: "How do you feel about being measured on a number every week?",
    a: [["Bring it on, I want the scoreboard", "ta"], ["I would rather be judged on quality than quantity", "gen"],
      ["Fine with it if the target is fair", "both"], ["I prefer accuracy targets over volume targets", "ops"]] },
  { q: "Someone comes to you upset about a coworker. Your instinct?",
    a: [["Listen, then get them to the right person fast", "ta"], ["Dig in, ask questions, help them work it out", "gen"],
      ["Depends entirely on the situation", "both"], ["Document it properly and follow the process", "ops"]] },
  { q: "Which would you rather be known for?",
    a: [["Being the person who always closes", "ta"], ["Being the person everyone trusts", "gen"],
      ["Being the person who can do a bit of everything", "both"], ["Being the person who never lets anything slip", "ops"]] },
  { q: "What are you best at right now?",
    a: [["Building rapport with strangers quickly", "ta"], ["Handling sensitive or difficult conversations", "gen"],
      ["Adapting to whatever the day throws at me", "both"], ["Keeping records, systems, and details straight", "ops"]] },
  { q: "Which pressure would bother you less?",
    a: [["A monthly target I have to hit", "ta"], ["Carrying confidential information I cannot discuss", "gen"],
      ["Honestly, neither would break me", "both"], ["A compliance audit of my work", "ops"]] },
];


export const QZR = {
  ta: { path: "Talent Acquisition", role: "Agency Recruiter or Recruiting Coordinator",
    d: "You are built for momentum and accountability. Recruiting will give you a scoreboard and a fast feedback loop, and agency work especially will teach you sourcing, pipeline management, and negotiation faster than any other entry point. This is the door I went through.",
    next: "Target agency recruiter and recruiting coordinator roles. Firms like Robert Half, Beacon Hill, Aerotek, Insight Global, and Randstad hire recruiters constantly and care more about drive than credentials." },
  gen: { path: "HR Generalist", role: "HR Coordinator or HR Assistant",
    d: "You lean toward the human and organizational side. The generalist track rewards judgment, discretion, and steadiness, and it leads to HR Business Partner, HR Manager, and eventually director level work. It is a steadier climb, but do not mistake steady for easy.",
    next: "Target HR Coordinator and HR Assistant roles at companies with a real HR department. Look into the aPHR certification while you are applying. It signals you are serious." },
  both: { path: "Either path, start broad", role: "HR Coordinator",
    d: "You have not committed yet, and that is genuinely fine this early. The smart move is a role that touches both sides so you can find out from the inside instead of guessing from the outside.",
    next: "Target HR Coordinator roles specifically. They blend recruiting support with benefits and employee relations, which means you get to sample both careers before you commit to one." },
  ops: { path: "People Operations", role: "HR Assistant or HR Operations Coordinator",
    d: "You are precise and process minded, and that is worth more in HR than people admit. Payroll, HRIS, compliance, and records are where careful people become indispensable fast, because the cost of getting them wrong is enormous.",
    next: "Target HR Assistant, HR Operations, and HRIS Coordinator roles. Get comfortable naming specific systems like Workday, ADP, or BambooHR. That fluency alone separates you from most applicants." },
};


export const DECODE_MAP = [
  { base: "HR Generalist", tech: "People Partner, People Ops Generalist", law: "HR Generalist, Human Resources Coordinator", gov: "Human Resources Specialist (GS-0201)", health: "HR Business Partner, Employee Relations Specialist", startup: "People Ops Manager, First HR Hire" },
  { base: "Recruiter", tech: "Talent Partner, Technical Recruiter", law: "Legal Recruiting Coordinator, Recruiting Specialist", gov: "Human Resources Specialist (Recruitment & Placement)", health: "Talent Acquisition Partner, Nurse Recruiter", startup: "Founding Recruiter, Talent Lead" },
  { base: "Recruiting Coordinator", tech: "Recruiting Coordinator, TA Coordinator", law: "Legal Recruiting Assistant, Recruiting Coordinator", gov: "HR Assistant (OA)", health: "Talent Acquisition Coordinator", startup: "Recruiting Ops, People Coordinator" },
  { base: "HR Manager", tech: "People Manager, Head of People (small co)", law: "HR Manager, Director of Administration", gov: "Supervisory HR Specialist", health: "HR Manager, Employee Relations Manager", startup: "Head of People, People Lead" },
  { base: "HR Business Partner", tech: "People Partner, HRBP", law: "HR Business Partner, Practice Group HR Lead", gov: "Human Resources Officer", health: "HRBP, HR Consultant", startup: "People Partner" },
];


export const IND_OPEN = [
  { ind: "Staffing & agencies", open: "g", note: "The most open door in the field. They hire for drive over pedigree, and a temp role converts to permanent all the time." },
  { ind: "Startups & small companies", open: "g", note: "Often need their first HR hire and cannot be picky about background. If you can wear many hats, they will take a chance on you." },
  { ind: "Retail, hospitality, high-volume", open: "g", note: "Constant hiring, constant turnover, and they value people who have actually worked the floor. Your operations background is an asset here." },
  { ind: "Tech", open: "y", note: "Open to non-traditional paths, but you must speak their language. Search \"People Ops\" and \"Talent Partner,\" not \"HR Generalist,\" or you will never see the roles." },
  { ind: "Healthcare", open: "y", note: "Huge and always hiring, but often wants some HR exposure or a certification first. A coordinator role is your way in." },
  { ind: "Professional services & law firms", open: "y", note: "Values polish, discretion, and stability. They hire heavily through staffing agencies for support roles, which is your side door." },
  { ind: "Government & federal", open: "r", note: "The most credential-driven and the slowest. USAJOBS is its own skill, and the process can take months. Worth it for stability, but not the fast door." },
];


export const DECODE_QZ: ChoiceQ[] = [
  { q: "A tech company is hiring a \"People Partner.\" In plain terms, what is that?", a: [["An HR Generalist or HRBP", "right"], ["A recruiter only", "wrong"], ["An office manager", "wrong"], ["A payroll clerk", "wrong"]], e: "People Partner is what most tech companies call an HR Generalist or Business Partner. If you only search \"HR,\" you miss every one of these roles." },
  { q: "You want recruiting roles in government. What do you actually search on USAJOBS?", a: [["Human Resources Specialist", "right"], ["Recruiter", "wrong"], ["Talent Partner", "wrong"], ["People Ops", "wrong"]], e: "Government wraps almost everything into \"Human Resources Specialist\" with a parenthetical. \"Recruiter\" barely returns federal results." },
  { q: "Which of these is usually the FASTEST door in for a career changer?", a: [["A staffing agency", "right"], ["A federal agency", "wrong"], ["A large law firm, direct", "wrong"], ["A FAANG tech company", "wrong"]], e: "Staffing agencies hire for hustle and convert temp to permanent constantly. It is the door I walked through, and the one most people overlook." },
  { q: "A startup posts \"Founding Recruiter, wear many hats.\" Good or bad sign for a career changer?", a: [["Good, they cannot be picky and value range", "right"], ["Bad, they only want experts", "wrong"], ["Bad, it is a scam", "wrong"], ["Neutral", "wrong"]], e: "\"Wear many hats\" usually means they need someone capable and adaptable more than someone credentialed. That is often you." },
  { q: "In healthcare, what should you probably get while applying?", a: [["A certification like aPHR", "right"], ["A law degree", "wrong"], ["Nothing, they do not care", "wrong"], ["A nursing license", "wrong"]], e: "Healthcare tends to want some proof you are serious. An aPHR while you apply signals commitment and helps you clear the first screen." },
];


